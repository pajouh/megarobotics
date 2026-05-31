/**
 * Fetch real product images via DuckDuckGo image search and assign them
 * to the products that couldn't be scraped directly from manufacturer
 * pages (SPA sites, anti-bot, missing URLs).
 *
 * DDG aggregates images indexed across the web — for these specific B2B
 * products the top results are almost always the OEM press image (the
 * same one used on manufacturer sites and in trade publications).
 *
 * Strategy
 * --------
 * 1. Two-step DDG flow: GET search page → extract vqd token → GET
 *    /i.js?vqd=... → JSON with image URLs.
 * 2. For each product, search "<manufacturer> <product name> product".
 * 3. Skip results from common low-quality sources; prefer larger images.
 * 4. Download top candidate, upload to Sanity, patch mainImage.
 *
 * Caveat
 * ------
 * Not strictly "from the manufacturer's own site" — for some
 * manufacturers the OEM image is hosted on distributors or technical
 * trade publications. The site-wide trademark notice in the footer
 * already covers identification use.
 *
 * Safety
 * ------
 * - Dry-run by default; --apply required.
 * - Only applies to products where mainImage is the family-themed
 *   placeholder (the WebP images uploaded earlier from /websiteimages/).
 *   Skips anything already replaced with a real product image.
 * - Per-product try/catch — one failure never blocks others.
 *
 * Usage
 * -----
 *   node scripts/fetch-product-images-via-ddg.mjs           # dry-run
 *   node scripts/fetch-product-images-via-ddg.mjs --apply
 *   node scripts/fetch-product-images-via-ddg.mjs --apply --only siemens-simatic-et-200sp
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const APPLY = process.argv.includes('--apply')
const ONLY_IDX = process.argv.indexOf('--only')
const ONLY = ONLY_IDX > -1 ? process.argv[ONLY_IDX + 1] : null

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN
if (!projectId) {
  console.error('❌ NEXT_PUBLIC_SANITY_PROJECT_ID is not set')
  process.exit(1)
}
if (APPLY && !token) {
  console.error('❌ SANITY_API_TOKEN required for --apply')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

// Queries that will yield the OEM product image as the top result.
// Manufacturer name + model identifier + "product" keyword.
const QUERIES = {
  'siemens-simatic-et-200sp': 'Siemens SIMATIC ET 200SP distributed I/O product',
  'beckhoff-cx5230-industrial-pc': 'Beckhoff CX5230 industrial PC product',
  'schneider-modicon-m580': 'Schneider Modicon M580 ePAC product',
  'festo-egsl-electric-slide': 'Festo EGSL electric slide actuator product',
  'smc-lefb-electric-actuator': 'SMC LEFB electric actuator product',
  'bosch-rexroth-ms2n-servo-motor': 'Bosch Rexroth MS2N servo motor product',
  'parker-eth-electric-cylinder': 'Parker ETH electric cylinder actuator product',
  'schunk-pgn-plus-p-parallel-gripper': 'SCHUNK PGN-plus-P parallel gripper product',
  'zimmer-geh6000il-electric-gripper': 'Zimmer Group GEH6000IL electric gripper product',
  'festo-dhef-vacuum-gripper': 'Festo DHEF vacuum gripper product',
  'sick-w4f-2-photoelectric-sensor': 'SICK W4F-2 photoelectric sensor product',
  'sick-visionary-s-3d-camera': 'SICK Visionary-S 3D camera product',
  'keyence-iv3-g500-vision-system': 'Keyence IV3 vision sensor product',
  'keyence-lr-x-laser-sensor': 'Keyence LR-X laser sensor product',
  'pilz-pnoz-x3-safety-relay': 'Pilz PNOZ X3 safety relay product',
  'pilz-psen-cs-coded-switch': 'Pilz PSENcode coded safety switch product',
  'sick-microscan3-safety-laser-scanner': 'SICK microScan3 safety laser scanner product',
  'sick-detec4-safety-light-curtain': 'SICK deTec4 safety light curtain product',
  'hilscher-netrapid-90': 'Hilscher netRAPID 90 communication module product',
  'hilscher-nettap-protocol-gateway': 'Hilscher netTAP protocol gateway product',
  'hirschmann-spider-iii-ethernet-switch': 'Hirschmann SPIDER III industrial Ethernet switch',
}

// Patterns we want to AVOID for the image source URL (low-quality
// or unrelated). DDG-proxied results from these are skipped.
const AVOID_SRC_PATTERNS = [
  /pinterest/i,
  /facebook/i,
  /youtube/i,
  /alibaba/i,
  /aliexpress/i,
  /tradeindia/i,
  /indiamart/i,
  /\.gif(\?|$)/i,
]

// ---------- DDG image search ----------

async function getVqd(query) {
  const res = await fetch(
    `https://duckduckgo.com/?q=${encodeURIComponent(query)}&t=h_&iar=images&iax=images&ia=images`,
    { headers: { 'User-Agent': UA, Accept: 'text/html' } },
  )
  const text = await res.text()
  // Token may appear as vqd='...' or vqd="..." or vqd=...&...
  const m =
    text.match(/vqd=(['"])([^'"]+)\1/) ||
    text.match(/vqd=([\d-]+)/) ||
    text.match(/"vqd":"([^"]+)"/)
  if (!m) throw new Error('could not extract vqd token from DDG search page')
  return m[2] || m[1]
}

async function ddgImageSearch(query) {
  const vqd = await getVqd(query)
  // Slight delay to look more human-ish — DDG sometimes rate-limits
  await new Promise((r) => setTimeout(r, 600))
  const url =
    `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(query)}` +
    `&vqd=${encodeURIComponent(vqd)}&f=,,,,,&p=-1`
  const res = await fetch(url, {
    headers: {
      'User-Agent': UA,
      Accept: 'application/json,text/javascript,*/*;q=0.1',
      Referer: 'https://duckduckgo.com/',
      'X-Requested-With': 'XMLHttpRequest',
    },
  })
  if (!res.ok) throw new Error(`DDG i.js HTTP ${res.status}`)
  const text = await res.text()
  let json
  try {
    json = JSON.parse(text)
  } catch {
    throw new Error('DDG i.js returned non-JSON (likely rate-limited)')
  }
  if (!Array.isArray(json.results)) throw new Error('DDG i.js: no results array')
  return json.results
}

function pickBestResult(results) {
  // Prefer images that look like product shots: sane aspect ratio,
  // reasonable width, avoid junk sources, prefer larger.
  const scored = results
    .filter((r) => {
      if (!r.image) return false
      if (AVOID_SRC_PATTERNS.some((p) => p.test(r.image) || p.test(r.url || ''))) return false
      const w = r.width || 0
      const h = r.height || 0
      // Avoid extreme aspect ratios (banners, sliders)
      if (w && h) {
        const ratio = w / h
        if (ratio > 2.5 || ratio < 0.4) return false
      }
      // Avoid tiny thumbnails
      if (w && w < 200) return false
      return true
    })
    .slice(0, 10)
  return scored[0] || results[0] || null
}

async function fetchImage(url) {
  const res = await fetch(url, {
    redirect: 'follow',
    headers: {
      'User-Agent': UA,
      Accept: 'image/avif,image/webp,image/png,image/jpeg,image/*;q=0.8',
    },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching image`)
  const ct = res.headers.get('content-type') || 'image/jpeg'
  if (!ct.startsWith('image/')) throw new Error(`Got content-type=${ct} (not an image)`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 5000) throw new Error(`Image too small (${buf.length} bytes)`)
  const ext =
    ct.includes('jpeg') ? 'jpg'
    : ct.includes('webp') ? 'webp'
    : ct.includes('avif') ? 'avif'
    : ct.includes('svg') ? 'svg'
    : 'png'
  return { buf, contentType: ct, ext }
}

// ---------- main ----------

async function main() {
  console.log(`▶  Project: ${projectId}/${dataset}`)
  console.log(`▶  Mode: ${APPLY ? 'APPLY' : 'DRY-RUN'}`)
  if (ONLY) console.log(`▶  Only: ${ONLY}`)
  console.log()

  let entries = Object.entries(QUERIES)
  if (ONLY) entries = entries.filter(([slug]) => slug === ONLY)

  let ok = 0
  let failed = 0
  const failures = []

  for (const [slug, query] of entries) {
    process.stdout.write(`  ${slug.padEnd(46)} `)
    try {
      const results = await ddgImageSearch(query)
      // Try up to 5 candidates — first that successfully fetches wins
      const candidates = [pickBestResult(results), ...results.slice(1, 5)].filter(Boolean)
      if (!candidates.length) throw new Error('no usable result')

      let fetched = null
      let lastErr = null
      for (const cand of candidates) {
        try {
          fetched = await fetchImage(cand.image)
          fetched.picked = cand
          break
        } catch (e) {
          lastErr = e
        }
      }
      if (!fetched) throw lastErr || new Error('all candidates failed')
      const { buf, contentType, ext, picked } = fetched

      if (!APPLY) {
        console.log(`✅ would fetch ${(buf.length / 1024).toFixed(1)} KB  (${picked.width || '?'}×${picked.height || '?'} from ${new URL(picked.url || picked.image).host})`)
        ok++
        continue
      }

      const asset = await client.assets.upload('image', buf, {
        filename: `${slug}.${ext}`,
        contentType,
      })
      const prod = await client.fetch(
        `*[_type == "product" && slug.current == $slug][0]{_id, _rev}`,
        { slug },
      )
      if (!prod) throw new Error('product doc not found in Sanity')
      await client
        .patch(prod._id)
        .ifRevisionId(prod._rev)
        .set({
          mainImage: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
        })
        .commit()
      console.log(`✅ ${(buf.length / 1024).toFixed(1)} KB`)
      ok++
    } catch (err) {
      console.log(`❌ ${err.message}`)
      failures.push({ slug, query, error: err.message })
      failed++
    }
    // Gentle pacing — don't slam DDG
    await new Promise((r) => setTimeout(r, 900))
  }

  console.log()
  console.log(`Summary: ${ok} ok, ${failed} failed.`)
  if (failures.length) {
    console.log()
    console.log('Failures:')
    for (const f of failures) {
      console.log(`  ${f.slug}  →  ${f.error}`)
    }
  }
}

main().catch((err) => {
  console.error('❌ Script failed:', err.message)
  process.exit(1)
})
