/**
 * Imports the "LimX Luna for Research and Development" evaluation article.
 *
 * The document is checked in at scripts/data/article-limx-luna-research.json.
 * Every quantitative claim in the body comes from the specification set already
 * stored on product-limx-luna (sourced from LimX Dynamics' own /spec pages), and
 * every image reuses an asset already uploaded for that product — so this script
 * uploads nothing and invents nothing.
 *
 * Creates a draft by default so the article can be reviewed in the Studio before
 * it goes live. Pass --publish to publish in the same run.
 *
 * Usage:
 *   node --env-file=.env.local scripts/import-article-limx-luna-research.mjs --dry
 *   node --env-file=.env.local scripts/import-article-limx-luna-research.mjs
 *   node --env-file=.env.local scripts/import-article-limx-luna-research.mjs --publish
 */
import { createClient } from '@sanity/client'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const DRY = process.argv.includes('--dry')
const PUBLISH = process.argv.includes('--publish')
const here = path.dirname(fileURLToPath(import.meta.url))

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error('Missing SANITY_API_TOKEN. Run with: node --env-file=.env.local ...')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wudur8e8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const doc = JSON.parse(
  fs.readFileSync(path.join(here, 'data/article-limx-luna-research.json'), 'utf8')
)

function imageRefs(blocks) {
  return blocks.filter((b) => b._type === 'image').map((b) => b.asset._ref)
}

async function run() {
  // Referenced documents and assets must all exist, or the article renders with
  // holes that are easy to miss in a 60-block body.
  const refs = [
    doc.category._ref,
    doc.author._ref,
    doc.mainImage.asset._ref,
    ...imageRefs(doc.body.en),
    ...imageRefs(doc.body.de),
  ]
  const unique = [...new Set(refs)]
  const found = await client.fetch(`*[_id in $ids]._id`, { ids: unique })
  const missing = unique.filter((id) => !found.includes(id))
  if (missing.length) {
    console.error('Referenced documents/assets not found:')
    for (const m of missing) console.error(`  - ${m}`)
    process.exit(1)
  }
  console.log(`✓ all ${unique.length} referenced documents and assets resolve`)

  const existing = await client.fetch(
    `*[_type == "article" && (slug.current == $slug || _id == $id)]{ _id, "slug": slug.current }`,
    { slug: doc.slug.current, id: doc._id }
  )
  const clash = existing.find((e) => e._id !== doc._id)
  if (clash) {
    console.error(`Slug "${doc.slug.current}" is already used by ${clash._id}.`)
    process.exit(1)
  }

  const counts = {}
  for (const b of doc.body.en) counts[b._type] = (counts[b._type] || 0) + 1

  console.log(`\n${DRY ? '[dry] ' : ''}${doc._id}`)
  console.log(`   title    ${doc.title.en}`)
  console.log(`   slug     /articles/${doc.slug.current}`)
  console.log(`   body     ${doc.body.en.length} en / ${doc.body.de.length} de blocks`)
  console.log(`   blocks   ${JSON.stringify(counts)}`)
  console.log(`   target   ${PUBLISH ? 'published' : 'draft (review in Studio, then publish)'}`)

  if (DRY) {
    console.log('\n[dry run] nothing written.')
    return
  }

  if (PUBLISH) {
    await client.createOrReplace(doc)
    console.log('\n✅ Published.')
  } else {
    await client.createOrReplace({ ...doc, _id: `drafts.${doc._id}` })
    console.log('\n✅ Draft created. Publish it in the Studio, or re-run with --publish.')
  }
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
