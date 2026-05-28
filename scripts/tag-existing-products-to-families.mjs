/**
 * Bulk-tag existing products with the right productFamily based on
 * their legacy productCategory.
 *
 * Why: the existing 50 products are tagged via the legacy productCategory
 * schema but have NO productFamily ref, so the new
 * /products/categories/<family> landing pages don't surface them.
 *
 * Mapping (applied only to products where productFamily is currently
 * unset — never overwrites a manual choice):
 *   industrial-cobots         → robot-platforms
 *   humanoid-legged-robots    → robot-platforms
 *   warehouse-logistics       → robot-platforms       (AMR / AGV)
 *   drones-aerial             → robot-platforms
 *   service-robots            → service-cleaning-facility-robots
 *
 * Safety:
 * - Dry-run by default. --apply required.
 * - Only patches products with productFamily NOT set (idempotent + safe
 *   if a user has manually tagged a product in Studio).
 * - Does NOT touch the product's legacy `category` — both fields can
 *   coexist; the family is purely additive.
 *
 * Usage:
 *   node scripts/tag-existing-products-to-families.mjs           # dry-run
 *   node scripts/tag-existing-products-to-families.mjs --apply
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

const CATEGORY_TO_FAMILY = {
  'industrial-cobots': 'robot-platforms',
  'humanoid-legged-robots': 'robot-platforms',
  'warehouse-logistics': 'robot-platforms',
  'drones-aerial': 'robot-platforms',
  'service-robots': 'service-cleaning-facility-robots',
}

async function main() {
  console.log(`▶  Project: ${projectId}/${dataset}`)
  console.log(`▶  Mode: ${APPLY ? 'APPLY (will mutate)' : 'DRY-RUN (no changes)'}`)
  console.log()

  // Resolve family IDs
  const familyIds = Object.fromEntries(
    (
      await client.fetch(
        `*[_type == "productFamily" && slug.current in $slugs]{_id, "slug": slug.current}`,
        { slugs: [...new Set(Object.values(CATEGORY_TO_FAMILY))] },
      )
    ).map((f) => [f.slug, f._id]),
  )

  const missing = [...new Set(Object.values(CATEGORY_TO_FAMILY))].filter((s) => !familyIds[s])
  if (missing.length) {
    console.error(`❌ Missing productFamily docs: ${missing.join(', ')}`)
    console.error('   Run scripts/seed-component-products.mjs --apply first.')
    process.exit(1)
  }

  // Fetch all unfamilied products whose legacy category we care about
  const products = await client.fetch(
    `*[_type == "product" && isActive != false && !defined(productFamily) && category->slug.current in $categorySlugs]{
      _id, _rev, name, "slug": slug.current, "categorySlug": category->slug.current
    } | order(categorySlug, name)`,
    { categorySlugs: Object.keys(CATEGORY_TO_FAMILY) },
  )

  // Group by target family
  const byFamily = {}
  for (const p of products) {
    const familySlug = CATEGORY_TO_FAMILY[p.categorySlug]
    if (!familySlug) continue
    if (!byFamily[familySlug]) byFamily[familySlug] = []
    byFamily[familySlug].push(p)
  }

  console.log(`📦 Plan:`)
  for (const familySlug of Object.keys(byFamily)) {
    const list = byFamily[familySlug]
    console.log(`   → ${familySlug}: tag ${list.length} product(s)`)
    list.forEach((p) => console.log(`       - ${p.slug.padEnd(32)} (legacy: ${p.categorySlug})`))
  }
  if (!products.length) console.log('   Nothing to do — every relevant product already has a productFamily.')
  console.log()

  if (!APPLY) {
    console.log('To apply: re-run with --apply')
    return
  }

  let ok = 0
  let failed = 0
  for (const p of products) {
    const familySlug = CATEGORY_TO_FAMILY[p.categorySlug]
    const familyRef = familyIds[familySlug]
    try {
      await client
        .patch(p._id)
        .ifRevisionId(p._rev)
        .set({
          productFamily: { _type: 'reference', _ref: familyRef },
        })
        .commit()
      ok++
    } catch (err) {
      console.log(`❌ ${p.slug}: ${err.message}`)
      failed++
    }
  }

  console.log(`Done. ${ok} tagged, ${failed} failed.`)
}

main().catch((err) => {
  console.error('❌ Script failed:', err.message)
  process.exit(1)
})
