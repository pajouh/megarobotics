// One-off migration: industrial content docs were imported with reserved-namespace
// ids of the form `<type>.<slug>` (e.g. robotTechnology.amr-agv). Sanity treats the
// segment before the first dot as a namespace, so these docs are excluded from the
// public/anonymous content projection the live site reads. Recreate each with a normal
// random id (all fields incl. slug preserved) and delete the dotted-id original.
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'

// load .env.local
for (const line of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-11-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const TYPES = ['robotTechnology', 'solution', 'industry', 'projectStudy']
const DRY = process.argv.includes('--dry')

const isDotted = (id) => /^(robotTechnology|solution|industry|projectStudy)\./.test(id)

const run = async () => {
  // raw perspective: see published + any drafts with their real ids
  const docs = await client.fetch(
    `*[_type in $types]{...}`, { types: TYPES }, { perspective: 'raw' }
  )
  const dotted = docs.filter((d) => isDotted(d._id) && !d._id.startsWith('drafts.'))
  const drafts = docs.filter((d) => d._id.startsWith('drafts.'))
  const normal = docs.filter((d) => !isDotted(d._id) && !d._id.startsWith('drafts.'))

  console.log(`Found ${docs.length} docs across ${TYPES.join(', ')}`)
  console.log(`  dotted published (to migrate): ${dotted.length}`)
  console.log(`  already-normal published:      ${normal.length}`)
  console.log(`  drafts:                        ${drafts.length}`)
  if (drafts.length) console.log('  draft ids:', drafts.map((d) => d._id).join(', '))

  let migrated = 0
  for (const doc of dotted) {
    const { _id, _rev, _createdAt, _updatedAt, _system, ...fields } = doc
    if (DRY) {
      console.log(`[dry] would recreate ${_id} (slug=${doc.slug?.current}) with new id, then delete`)
      continue
    }
    const created = await client.create(fields) // fresh random _id, all fields incl. slug
    await client.delete(_id)
    migrated++
    console.log(`✓ ${_id} -> ${created._id} (slug=${created.slug?.current})`)
  }
  console.log(DRY ? 'Dry run complete.' : `Done. Migrated ${migrated} docs.`)
}

run().catch((e) => { console.error('FAILED:', e.message); process.exit(1) })
