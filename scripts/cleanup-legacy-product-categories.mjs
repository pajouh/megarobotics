/**
 * Final cleanup after the unify-categories-to-families refactor.
 *
 * 1. Unsets `category` from every product doc (the legacy ref).
 * 2. Deletes every productCategory doc (now orphan; schema is gone).
 *
 * After this runs, Sanity Studio will no longer show "Product Category"
 * as a doc type, and Product docs will only carry the productFamily ref.
 *
 * Safety:
 * - Dry-run by default. --apply required.
 * - Backs up the list of productCategory docs (id + slug + name) to a
 *   timestamped JSON file in /tmp/ before deletion.
 * - Uses ifRevisionId optimistic concurrency on every patch.
 * - Idempotent.
 *
 * Usage:
 *   node scripts/cleanup-legacy-product-categories.mjs           # dry-run
 *   node scripts/cleanup-legacy-product-categories.mjs --apply
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { writeFileSync, mkdirSync } from 'fs'
import { dirname } from 'path'

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

const stamp = new Date().toISOString().replace(/[:.]/g, '-')
const backupPath = `/tmp/sanity-productCategory-backup-${stamp}.json`

async function main() {
  console.log(`▶  Project: ${projectId}/${dataset}`)
  console.log(`▶  Mode: ${APPLY ? 'APPLY (will mutate)' : 'DRY-RUN (no changes)'}`)
  console.log()

  // 1. Products with category set
  const productsWithCategory = await client.fetch(
    `*[_type == "product" && defined(category)]{ _id, _rev, name, "categoryRef": category._ref }`,
  )
  console.log(`📦 Products with a legacy category ref: ${productsWithCategory.length}`)

  // 2. productCategory docs (incl. drafts)
  const categoryDocs = await client.fetch(
    `*[_type == "productCategory"]{ _id, _rev, "slug": slug.current, "name": name.en }`,
  )
  console.log(`📦 productCategory docs to delete: ${categoryDocs.length}`)
  categoryDocs.forEach((d) => console.log(`     - ${d._id}  (${d.slug || '(no slug)'})  ${d.name || ''}`))
  console.log()

  if (!APPLY) {
    console.log('To apply: re-run with --apply')
    return
  }

  // Backup category docs before delete
  if (categoryDocs.length) {
    mkdirSync(dirname(backupPath), { recursive: true })
    writeFileSync(
      backupPath,
      JSON.stringify(
        {
          takenAt: new Date().toISOString(),
          project: `${projectId}/${dataset}`,
          productCategoryDocs: categoryDocs,
          productsWithCategoryRef: productsWithCategory,
        },
        null,
        2,
      ),
    )
    console.log(`💾 Backup: ${backupPath}`)
  }

  // 3. Unset category on every product
  let unset = 0
  for (const p of productsWithCategory) {
    try {
      await client
        .patch(p._id)
        .ifRevisionId(p._rev)
        .unset(['category'])
        .commit()
      unset++
    } catch (err) {
      console.error(`  ❌ unset failed on ${p._id}: ${err.message}`)
    }
  }
  console.log(`✅ Unset category on ${unset}/${productsWithCategory.length} products`)

  // 4. Delete productCategory docs (incl. drafts.* siblings)
  let deleted = 0
  for (const d of categoryDocs) {
    try {
      await client.delete(d._id)
      deleted++
    } catch (err) {
      console.error(`  ❌ delete failed on ${d._id}: ${err.message}`)
    }
  }
  console.log(`✅ Deleted ${deleted}/${categoryDocs.length} productCategory docs`)

  console.log()
  console.log('Done. Studio will reflect the change on next refresh.')
  if (categoryDocs.length) console.log(`To restore the deleted docs: see ${backupPath}`)
}

main().catch((err) => {
  console.error('❌ Script failed:', err.message)
  process.exit(1)
})
