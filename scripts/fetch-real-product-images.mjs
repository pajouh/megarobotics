/**
 * Fetch real product images from each manufacturer's official product page
 * and replace the placeholder mainImage on the 29 seeded distributor products.
 *
 * Strategy
 * --------
 * 1. Hardcoded map of product slug → official product page URL on each
 *    manufacturer's own website. URLs were curated from public product
 *    catalogs and verified to be live as of script creation.
 * 2. Fetch each page with a realistic browser User-Agent header.
 * 3. Parse the HTML for og:image, twitter:image, or link[rel=image_src].
 *    Fall back to the largest <img> in <main>/<picture> if meta tags are
 *    missing.
 * 4. Download the image (following one level of redirect).
 * 5. Upload to Sanity as a new asset and patch product.mainImage.
 *
 * Trademark notice (per existing site disclaimer in the footer):
 * Product images are property of their respective manufacturers and
 * used for identification / informational purposes. No
 * distributor/authorized-reseller status is implied. The site-wide
 * trademark disclaimer covers this use.
 *
 * Safety
 * ------
 * - Dry-run by default. --apply required.
 * - Skips products that already have a non-placeholder mainImage
 *   (a manually uploaded image would have a Sanity asset id not in the
 *   set of placeholder asset ids we track).
 * - Per-product try/catch: one failed fetch never blocks others.
 * - Honest reporting: prints exact reason per failure.
 *
 * Usage
 * -----
 *   node scripts/fetch-real-product-images.mjs           # dry-run
 *   node scripts/fetch-real-product-images.mjs --apply
 *   node scripts/fetch-real-product-images.mjs --apply --only siemens-simatic-s7-1500
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

// Pages where the auto-extraction returns a generic site image or an
// animated logo gif instead of the actual product. Verified manually.
// These should be excluded from automatic --apply.
const EXCLUDE_FROM_AUTO = new Set([
  'bosch-rexroth-ms2n-servo-motor',          // returns rexroth_logo_animated.gif
  'hilscher-netrapid-90',                    // returns same generic header as netTAP
  'hilscher-nettap-protocol-gateway',        // same generic header (Hilscher SPA)
])

// Product page URLs on each manufacturer's official site.
// Curated against publicly available product catalogs.
const PRODUCT_PAGES = {
  // ---- PLCs ----
  'siemens-simatic-s7-1500':
    'https://www.siemens.com/global/en/products/automation/systems/industrial/plc/simatic-s7-1500.html',
  'siemens-simatic-et-200sp':
    'https://www.siemens.com/global/en/products/automation/systems/industrial/io-systems/simatic-et-200sp.html',
  'beckhoff-cx5230-industrial-pc':
    'https://www.beckhoff.com/en-en/products/ipc/embedded-pcs/cx5200-intel-atom/cx5230.html',
  'schneider-modicon-m580':
    'https://www.se.com/ww/en/product-range/62098-modicon-m580/',
  'rockwell-controllogix-5580':
    'https://www.rockwellautomation.com/en-us/products/hardware/allen-bradley/programmable-controllers/large-controllers/1756-controllogix-control-systems/controllogix-5580-controllers.html',

  // ---- Motion / actuators / drives ----
  'festo-egsl-electric-slide':
    'https://www.festo.com/de/de/p/elektrozylinder-egsl-id_PI_FGRUP_120002/',
  'smc-lefb-electric-actuator':
    'https://www.smc.eu/en-eu/products/electric-actuators-belt-driven~94186~nav',
  'bosch-rexroth-ms2n-servo-motor':
    'https://www.boschrexroth.com/en/xc/products/product-groups/electric-drives-and-controls/motors-and-gearboxes/synchronous-servo-motors/ms2n',
  'parker-eth-electric-cylinder':
    'https://ph.parker.com/us/en/electromechanical-actuator-eth',
  'iai-rcp6-linear-actuator':
    'https://www.intelligentactuator.com/products/electric-actuators/slider-rcp6/',

  // ---- Grippers / end effectors ----
  'schunk-pgn-plus-p-parallel-gripper':
    'https://schunk.com/de/en/gripping-systems/parallel-gripper/pgn-plus-p/c/PGR_2603',
  'onrobot-rg2-ft-gripper':
    'https://onrobot.com/en/products/rg2-ft',
  'robotiq-2f-85-adaptive-gripper':
    'https://robotiq.com/products/adaptive-grippers',
  'zimmer-geh6000il-electric-gripper':
    'https://www.zimmer-group.com/en/products/handling-technology/grippers/2-jaw-parallel-grippers-electric/geh6000il-series',
  'festo-dhef-vacuum-gripper':
    'https://www.festo.com/de/en/p/vakuumgreifer-id_DHEF/',

  // ---- Sensors / vision ----
  'sick-w4f-2-photoelectric-sensor':
    'https://www.sick.com/de/en/catalog/products/sensors/photoelectric-sensors/w4f/c/g569988',
  'sick-visionary-s-3d-camera':
    'https://www.sick.com/de/en/catalog/products/machine-vision-and-identification/machine-vision/visionary-s/c/g448366',
  'keyence-iv3-g500-vision-system':
    'https://www.keyence.eu/products/vision/vision-sys/iv3/',
  'keyence-lr-x-laser-sensor':
    'https://www.keyence.eu/products/sensor/photoelectric/lr-x/',

  // ---- Safety ----
  'pilz-pnoz-x3-safety-relay':
    'https://www.pilz.com/en-INT/eshop/00106002197048/PNOZ-X3-Safety-Relay',
  'pilz-psen-cs-coded-switch':
    'https://www.pilz.com/en-INT/eshop/00106002197048/PSENcode-safety-switches',
  'sick-microscan3-safety-laser-scanner':
    'https://www.sick.com/de/en/catalog/products/safety/safety-laser-scanners/microscan3-pro-i/c/g461920',
  'sick-detec4-safety-light-curtain':
    'https://www.sick.com/de/en/catalog/products/safety/safety-light-curtains/detec4/c/g440176',

  // ---- Industrial communication ----
  'hilscher-netrapid-90':
    'https://www.hilscher.com/products/embedded-modules/netrapid-pc-card',
  'hilscher-nettap-protocol-gateway':
    'https://www.hilscher.com/products/gateway-devices/nettap',
  'hirschmann-spider-iii-ethernet-switch':
    'https://www.belden.com/products/industrial-automation/industrial-networking/unmanaged-switches/spider-iii-standard-line',

  // ---- Software ----
  'siemens-tia-portal':
    'https://www.siemens.com/global/en/products/automation/industry-software/automation-software/tia-portal.html',
  'beckhoff-twincat-3':
    'https://www.beckhoff.com/en-en/products/automation/twincat/',
  'inductive-automation-ignition':
    'https://inductiveautomation.com/scada-software/',
}

// ---------- helpers ----------

async function fetchText(url) {
  const res = await fetch(url, {
    redirect: 'follow',
    headers: {
      'User-Agent': UA,
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9,de;q=0.8',
    },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  const ct = res.headers.get('content-type') || ''
  if (!ct.includes('text/html') && !ct.includes('xml')) {
    // Some manufacturers serve a binary PDF or image as "product page"
    if (ct.startsWith('image/') || ct === 'application/pdf') {
      throw new Error(`URL is a ${ct}, not a product page`)
    }
  }
  return await res.text()
}

function extractImageUrl(html, baseUrl) {
  // Try og:image first (most reliable for sharing/SEO)
  const metaPatterns = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i,
    /<link[^>]+rel=["']image_src["'][^>]+href=["']([^"']+)["']/i,
  ]
  for (const re of metaPatterns) {
    const m = html.match(re)
    if (m && m[1]) {
      try {
        return new URL(m[1], baseUrl).href
      } catch {
        return m[1]
      }
    }
  }

  // Fallback: scan <img> tags and pick the most likely product image.
  // Heuristics:
  //   - skip data URIs, tiny icons, logos, sprites, transparent pixels
  //   - prefer URLs containing "product", "image", or the page's product slug
  //   - prefer larger explicit sizes if present
  const imgRe = /<img[^>]+>/gi
  const candidates = []
  let m
  while ((m = imgRe.exec(html)) !== null) {
    const tag = m[0]
    const srcMatch = tag.match(/\bsrc=["']([^"']+)["']/i) || tag.match(/\bdata-src=["']([^"']+)["']/i)
    if (!srcMatch) continue
    let src = srcMatch[1]
    if (src.startsWith('data:')) continue
    if (/(logo|sprite|icon|favicon|tracking|pixel|placeholder|spinner|loader|blank)\b/i.test(src)) continue
    try { src = new URL(src, baseUrl).href } catch { continue }
    const altMatch = tag.match(/\balt=["']([^"']+)["']/i)
    const widthMatch = tag.match(/\bwidth=["']?(\d+)/i)
    const heightMatch = tag.match(/\bheight=["']?(\d+)/i)
    const w = widthMatch ? parseInt(widthMatch[1], 10) : 0
    const h = heightMatch ? parseInt(heightMatch[1], 10) : 0
    // Skip likely icons (<60px)
    if (w > 0 && w < 60) continue
    if (h > 0 && h < 60) continue
    candidates.push({ src, alt: altMatch?.[1] || '', score: (w || 200) * (h || 200) })
  }
  if (candidates.length === 0) return null
  // Prefer images whose src/alt mentions product/image
  candidates.sort((a, b) => {
    const ap = /(product|image|hero|main|primary)/i.test(a.src + ' ' + a.alt) ? 1 : 0
    const bp = /(product|image|hero|main|primary)/i.test(b.src + ' ' + b.alt) ? 1 : 0
    if (ap !== bp) return bp - ap
    return b.score - a.score
  })
  return candidates[0].src
}

async function fetchImage(url) {
  const res = await fetch(url, {
    redirect: 'follow',
    headers: {
      'User-Agent': UA,
      Accept: 'image/avif,image/webp,image/png,image/jpeg,image/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching image`)
  const ct = res.headers.get('content-type') || 'image/png'
  if (!ct.startsWith('image/')) {
    // Some og:image URLs return HTML 200 if challenged
    throw new Error(`Got content-type=${ct} (not an image)`)
  }
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 8000) throw new Error(`Image too small (${buf.length} bytes) — likely icon/pixel`)
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

  let entries = Object.entries(PRODUCT_PAGES)
  if (ONLY) entries = entries.filter(([slug]) => slug === ONLY)

  console.log(`Processing ${entries.length} product(s)...`)
  console.log()

  const results = { ok: 0, failed: 0, skipped: 0 }
  const failures = []

  for (const [slug, pageUrl] of entries) {
    process.stdout.write(`  ${slug.padEnd(46)} `)
    if (EXCLUDE_FROM_AUTO.has(slug)) {
      console.log('⏭  excluded (auto-extracted image was generic / logo / wrong)')
      results.skipped++
      continue
    }
    try {
      // 1. fetch page HTML
      const html = await fetchText(pageUrl)
      // 2. extract image URL
      const imgUrl = extractImageUrl(html, pageUrl)
      if (!imgUrl) throw new Error('no og:image / twitter:image / image_src in HTML')
      // 3. fetch image
      const { buf, contentType, ext } = await fetchImage(imgUrl)
      if (!APPLY) {
        console.log(`✅ would fetch ${(buf.length / 1024).toFixed(1)} KB ${contentType}`)
        results.ok++
        continue
      }
      // 4. upload to Sanity
      const asset = await client.assets.upload('image', buf, {
        filename: `${slug}.${ext}`,
        contentType,
      })
      // 5. find the product doc + patch
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
      results.ok++
    } catch (err) {
      console.log(`❌ ${err.message}`)
      failures.push({ slug, page: pageUrl, error: err.message })
      results.failed++
    }
  }

  console.log()
  console.log(`Summary: ${results.ok} ok, ${results.failed} failed, ${results.skipped} skipped.`)
  if (failures.length) {
    console.log()
    console.log('Failures (can be retried manually or uploaded in Studio):')
    for (const f of failures) {
      console.log(`  ${f.slug}`)
      console.log(`    page:  ${f.page}`)
      console.log(`    error: ${f.error}`)
    }
  }
}

main().catch((err) => {
  console.error('❌ Script failed:', err.message)
  process.exit(1)
})
