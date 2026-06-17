/**
 * One-off migration: product / productFamily / manufacturer docs were created with
 * reserved-namespace ids of the form `<type>.<slug>` (e.g. `productFamily.robot-platforms`,
 * `product.siemens-tia-portal`, `manufacturer.festo`). Sanity treats the segment before the
 * first dot as a namespace, so these docs are EXCLUDED from the public/anonymous (CDN)
 * content projection the live site reads — they only render via the server-side token.
 *
 * This recreates every dotted doc with a normal random id (all fields incl. slug preserved),
 * repoints every reference that pointed at an old id, then deletes the dotted originals in a
 * single atomic transaction (so mutual product<->family / product<->manufacturer references
 * never block the deletes).
 *
 * The app queries product/family/manufacturer by `slug.current`, never by `_id`, so changing
 * the `_id` is invisible to the website.
 *
 *   Dry run:   SANITY_API_TOKEN=... node scripts/migrate-dotted-ids.mjs --dry
 *   Execute:   SANITY_API_TOKEN=... node scripts/migrate-dotted-ids.mjs
 *
 * A full backup of every touched doc is written to ./.sanity-backup-dotted-ids.json first.
 */
import { createClient } from '@sanity/client'
import { readFileSync, writeFileSync } from 'node:fs'
import { randomUUID } from 'node:crypto'

// load .env.local (SANITY_API_TOKEN) if not already in the environment
try {
  for (const line of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
} catch { /* .env.local optional if token already exported */ }

const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN
if (!token) {
  console.error('✗ Set SANITY_API_TOKEN (or SANITY_WRITE_TOKEN) with write access.')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wudur8e8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const TYPES = ['product', 'productFamily', 'manufacturer']
const DRY = process.argv.includes('--dry')
const dottedRe = /^(product|productFamily|manufacturer)\./

const baseId = (id) => (id.startsWith('drafts.') ? id.slice('drafts.'.length) : id)
const isDottedPublished = (id) => !id.startsWith('drafts.') && dottedRe.test(id)

// Recursively rewrite any { _ref } that points at a remapped id.
function remapRefs(node, idMap) {
  if (Array.isArray(node)) return node.map((n) => remapRefs(n, idMap))
  if (node && typeof node === 'object') {
    const out = {}
    for (const k of Object.keys(node)) {
      if (k === '_ref' && typeof node[k] === 'string' && idMap.has(node[k])) {
        out[k] = idMap.get(node[k])
      } else {
        out[k] = remapRefs(node[k], idMap)
      }
    }
    return out
  }
  return node
}

const stripSystem = (doc) => {
  const { _rev, _updatedAt, _system, ...rest } = doc
  return rest
}

async function run() {
  const docs = await client.fetch(`*[_type in $types]`, { types: TYPES }, { perspective: 'raw' })

  // 1. id map: every dotted published doc -> fresh uuid
  const idMap = new Map()
  for (const d of docs) if (isDottedPublished(d._id)) idMap.set(d._id, randomUUID())

  // 2. classify
  const toMigrate = docs.filter((d) => isDottedPublished(d._id))
  const referencers = docs.filter((d) => {
    if (isDottedPublished(d._id)) return false
    return JSON.stringify(remapRefs(d, idMap)) !== JSON.stringify(d)
  })

  console.log(`Fetched ${docs.length} docs across ${TYPES.join(', ')}`)
  console.log(`  dotted to migrate:        ${toMigrate.length}`)
  console.log(`    products:               ${toMigrate.filter((d) => d._type === 'product').length}`)
  console.log(`    productFamilies:        ${toMigrate.filter((d) => d._type === 'productFamily').length}`)
  console.log(`    manufacturers:          ${toMigrate.filter((d) => d._type === 'manufacturer').length}`)
  console.log(`  referencers to repoint:   ${referencers.length} (incl. drafts)`)

  // backup before any writes
  const backup = { generatedFor: TYPES, idMap: Object.fromEntries(idMap), docs }
  writeFileSync(new URL('../.sanity-backup-dotted-ids.json', import.meta.url), JSON.stringify(backup, null, 2))
  console.log('  backup written: .sanity-backup-dotted-ids.json')

  if (DRY) {
    console.log('\n[dry] sample id remaps:')
    for (const [oldId, newId] of [...idMap].slice(0, 6)) console.log(`  ${oldId}  ->  ${newId}`)
    console.log('[dry] no changes written.')
    return
  }

  // 3. Do it all in ONE atomic transaction. Sanity validates strong-reference
  //    integrity against the FINAL state of the transaction, so create+repoint+delete
  //    resolve together: new docs exist, every ref points at an existing doc, and the
  //    old dotted docs are only referenced by other docs deleted in the same tx.
  console.log('\nCommitting atomic transaction (create + repoint + delete)…')
  const tx = client.transaction()
  for (const d of toMigrate) {
    const fields = stripSystem(remapRefs(d, idMap))
    fields._id = idMap.get(d._id)
    delete fields._createdAt
    tx.create(fields)
  }
  for (const d of referencers) {
    tx.createOrReplace(stripSystem(remapRefs(d, idMap)))
  }
  for (const oldId of idMap.keys()) tx.delete(oldId)
  await tx.commit()
  console.log(`  created ${toMigrate.length}, repointed ${referencers.length}, deleted ${idMap.size}`)

  console.log('\n✅ Migration complete.')
}

run().catch((e) => { console.error('\n✗ FAILED:', e.message || e); process.exit(1) })
