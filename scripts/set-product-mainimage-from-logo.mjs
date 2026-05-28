/**
 * Set product.mainImage = manufacturer.logo for products that have no
 * mainImage of their own.
 *
 * Why: round-1 and round-2 seeded products (PLC / actuators / grippers /
 * sensors / safety / comm / software) have no product photography. The
 * card layout shows a faint robot emoji when mainImage is missing —
 * acceptable but weak. Borrowing the manufacturer's logo as the
 * product's main image keeps the card visually branded for a
 * presentation without scraping copyrighted product imagery.
 *
 * Only touches products where:
 *   - mainImage is NOT already set
 *   - manufacturer.logo IS set
 *
 * Re-uses the existing logo asset (no duplicate upload).
 *
 * Safety:
 * - Dry-run by default. --apply required.
 * - Idempotent (skips products that already have a mainImage).
 * - The user can replace mainImage in Studio at any time with a real
 *   product photo; that takes precedence on subsequent runs.
 *
 * Usage:
 *   node scripts/set-product-mainimage-from-logo.mjs           # dry-run
 *   node scripts/set-product-mainimage-from-logo.mjs --apply
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

async function main() {
  console.log(`▶  Project: ${projectId}/${dataset}`)
  console.log(`▶  Mode: ${APPLY ? 'APPLY (will mutate)' : 'DRY-RUN (no changes)'}`)
  console.log()

  // Find products with no mainImage, where the manufacturer has a logo
  const candidates = await client.fetch(`
    *[_type == "product" && !defined(mainImage) && defined(manufacturer)]{
      _id,
      _rev,
      name,
      "slug": slug.current,
      "manufacturerName": manufacturer->name,
      "manufacturerLogoAssetId": manufacturer->logo.asset._ref
    }
  `)

  const toUpdate = candidates.filter((p) => p.manufacturerLogoAssetId)
  const skipped = candidates.filter((p) => !p.manufacturerLogoAssetId)

  console.log(`📦 Plan:`)
  console.log(`   ${toUpdate.length} product(s) will get mainImage = manufacturer logo.`)
  if (toUpdate.length) {
    console.log(toUpdate.map((p) => `     - ${p.slug.padEnd(40)} ← ${p.manufacturerName}`).join('\n'))
  }
  if (skipped.length) {
    console.log(`   ${skipped.length} skipped (manufacturer has no logo):`)
    console.log(skipped.map((p) => `     · ${p.slug}`).join('\n'))
  }
  console.log()

  if (!APPLY) {
    console.log('To apply: re-run with --apply')
    return
  }

  if (!toUpdate.length) {
    console.log('Nothing to do.')
    return
  }

  let ok = 0
  let failed = 0
  for (const p of toUpdate) {
    try {
      await client
        .patch(p._id)
        .ifRevisionId(p._rev)
        .set({
          mainImage: {
            _type: 'image',
            asset: { _type: 'reference', _ref: p.manufacturerLogoAssetId },
          },
        })
        .commit()
      console.log(`✅ ${p.slug}`)
      ok++
    } catch (err) {
      console.log(`❌ ${p.slug}: ${err.message}`)
      failed++
    }
  }
  console.log()
  console.log(`Done. ${ok} updated, ${failed} failed.`)
}

main().catch((err) => {
  console.error('❌ Script failed:', err.message)
  process.exit(1)
})
