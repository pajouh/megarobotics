/**
 * Fetch manufacturer logos from a public logo service and upload to Sanity.
 *
 * Tries sources in order until one works:
 *   1. Logo.dev free endpoint (https://img.logo.dev/<domain>)
 *      — sometimes serves a true brand logo, no API key needed for low volume
 *   2. Google S2 favicons (https://www.google.com/s2/favicons?domain=<d>&sz=128)
 *      — always returns SOMETHING for known domains, 128x128 PNG
 *
 * Quality varies. For ASAP use this gets recognizable brand marks onto
 * the cards immediately. Replace with high-resolution logos in Studio
 * later if needed.
 *
 * What it does for each manufacturer slug specified below:
 *   1. Skips if manufacturer.logo is already set in Sanity
 *   2. Fetches logo from Clearbit using the brand's primary domain
 *   3. Uploads the binary to Sanity as a new image asset
 *   4. Patches manufacturer.logo to reference the asset
 *
 * Safety:
 * - Dry-run by default. Prints which logos would be fetched.
 * - --apply required for any network fetch or mutation.
 * - Skips manufacturers that already have a logo (no overwrite).
 * - Trademarks remain property of their respective owners. The site's
 *   existing trademark disclaimer already covers brand identification
 *   use; no claims of distributor/agent status are introduced by this
 *   script.
 *
 * Usage:
 *   node scripts/fetch-manufacturer-logos.mjs           # dry-run
 *   node scripts/fetch-manufacturer-logos.mjs --apply   # fetch & upload
 *
 * Requires SANITY_API_TOKEN (write-scoped) in .env.local for --apply.
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const APPLY = process.argv.includes('--apply')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId) {
  console.error('❌ NEXT_PUBLIC_SANITY_PROJECT_ID is not set')
  process.exit(1)
}
if (APPLY && !token) {
  console.error('❌ SANITY_API_TOKEN (write-scoped) is required for --apply')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

// Map: manufacturer slug → primary domain. The Clearbit endpoint
// returns the company logo registered for that domain.
const BRAND_DOMAINS = {
  'siemens': 'siemens.com',
  'beckhoff-automation': 'beckhoff.com',
  'schneider-electric': 'se.com',
  'rockwell-automation': 'rockwellautomation.com',
  'mitsubishi-electric': 'mitsubishielectric.com',
  'festo': 'festo.com',
  'smc-corporation': 'smcworld.com',
  'bosch-rexroth': 'boschrexroth.com',
  'parker-hannifin': 'parker.com',
  'iai-corporation': 'intelligentactuator.com',
  'schunk': 'schunk.com',
  'onrobot': 'onrobot.com',
  'robotiq': 'robotiq.com',
  'zimmer-group': 'zimmer-group.com',
  'sick': 'sick.com',
  'keyence': 'keyence.com',
  'pilz': 'pilz.com',
  'hilscher': 'hilscher.com',
  'hirschmann': 'belden.com',
  'inductive-automation': 'inductiveautomation.com',
}

async function fetchManufacturers() {
  return client.fetch(
    `*[_type == "manufacturer" && slug.current in $slugs]{_id, _rev, "slug": slug.current, name, "hasLogo": defined(logo)}`,
    { slugs: Object.keys(BRAND_DOMAINS) },
  )
}

async function tryFetch(url) {
  try {
    const res = await fetch(url, { redirect: 'follow' })
    if (!res.ok) return null
    const ct = res.headers.get('content-type') || 'image/png'
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length < 200) return null // likely an error stub or empty 1x1
    return { buf, contentType: ct, source: url }
  } catch {
    return null
  }
}

async function fetchLogo(domain) {
  // 1. Logo.dev free endpoint — sometimes a real brand logo
  const a = await tryFetch(`https://img.logo.dev/${domain}?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ&size=200&format=png&fallback=404`)
  if (a) return a
  // 2. Google S2 favicons — reliable fallback for any known domain
  const b = await tryFetch(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`)
  if (b) return b
  throw new Error(`no source returned a usable image for ${domain}`)
}

async function main() {
  console.log(`▶  Project: ${projectId}/${dataset}`)
  console.log(`▶  Mode: ${APPLY ? 'APPLY (will fetch & mutate)' : 'DRY-RUN (no fetch, no mutation)'}`)
  console.log()

  const manufacturers = await fetchManufacturers()
  if (!manufacturers.length) {
    console.error('❌ No matching manufacturers found in Sanity.')
    console.error('   Did seed-component-products.mjs run first?')
    process.exit(1)
  }

  const toProcess = []
  const skipped = []

  for (const m of manufacturers) {
    if (m.hasLogo) {
      skipped.push({ slug: m.slug, reason: 'logo already set' })
      continue
    }
    const domain = BRAND_DOMAINS[m.slug]
    if (!domain) {
      skipped.push({ slug: m.slug, reason: 'no domain mapping' })
      continue
    }
    toProcess.push({ ...m, domain })
  }

  console.log(`📦 Plan:`)
  console.log(`   ${toProcess.length} manufacturer(s) will get a logo fetched and uploaded.`)
  if (toProcess.length) {
    console.log(toProcess.map((m) => `     - ${m.slug.padEnd(22)} (${m.domain})`).join('\n'))
  }
  if (skipped.length) {
    console.log(`   ${skipped.length} skipped:`)
    console.log(skipped.map((s) => `     · ${s.slug.padEnd(22)} (${s.reason})`).join('\n'))
  }
  console.log()

  if (!APPLY) {
    console.log('To apply: re-run with --apply')
    return
  }

  if (!toProcess.length) {
    console.log('Nothing to do.')
    return
  }

  let ok = 0
  let failed = 0

  for (const m of toProcess) {
    process.stdout.write(`  ${m.slug.padEnd(22)} ... `)
    try {
      const { buf, contentType } = await fetchLogo(m.domain)
      const ext = contentType.includes('svg') ? 'svg' : contentType.includes('jpeg') ? 'jpg' : 'png'
      const asset = await client.assets.upload('image', buf, {
        filename: `${m.slug}-logo.${ext}`,
        contentType,
      })
      await client
        .patch(m._id)
        .ifRevisionId(m._rev)
        .set({ logo: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } })
        .commit()
      console.log(`✅ uploaded (${(buf.length / 1024).toFixed(1)} KB, asset ${asset._id})`)
      ok++
    } catch (err) {
      console.log(`❌ ${err.message}`)
      failed++
    }
  }

  console.log()
  console.log(`Done. ${ok} logo(s) uploaded, ${failed} failed.`)
  if (failed > 0) {
    console.log('For failed brands, upload the logo manually in /studio →')
    console.log('Manufacturer → open the doc → drop a logo image into the Logo field.')
  }
}

main().catch((err) => {
  console.error('❌ Script failed:', err.message)
  process.exit(1)
})
