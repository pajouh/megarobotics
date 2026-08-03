/**
 * Replaces the `htmlEmbed`-only bodies of two articles with real portable text.
 *
 * Both articles stored their entire body as a single `htmlEmbed` block holding a
 * complete HTML document. ArticleBody renders that in a sandboxed
 * `<iframe srcDoc>`, and crawlers do not index iframe content — so both pages
 * shipped with a title, an excerpt and nothing else for Google or AI search to
 * read. The pudu-d5-w article additionally held the SAME German HTML in both
 * body.en and body.de, so its English URL served German copy.
 *
 * The replacement blocks were generated from the embedded HTML itself and are
 * checked in at scripts/data/article-bodies-portable-text.json, mapping onto the
 * block types in sanity/schemas/blockContent.ts (statsGrid, featureGrid,
 * infoTable, highlightBox, quoteBox, ctaBox) so the articles pick up the site's
 * own design instead of the embed's bespoke CSS.
 *
 * The previous bodies are written to a timestamped backup file before anything
 * is patched, so this is reversible.
 *
 * Usage:
 *   node --env-file=.env.local scripts/convert-html-embed-articles.mjs --dry
 *   node --env-file=.env.local scripts/convert-html-embed-articles.mjs
 */
import { createClient } from '@sanity/client'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const DRY = process.argv.includes('--dry')
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

const BODIES = JSON.parse(
  fs.readFileSync(path.join(here, 'data/article-bodies-portable-text.json'), 'utf8')
)

function summarise(blocks) {
  const counts = {}
  for (const b of blocks) counts[b._type] = (counts[b._type] || 0) + 1
  const text = blocks
    .flatMap((b) => b.children || [])
    .map((c) => c.text || '')
    .join(' ')
  return { counts, chars: text.length }
}

async function run() {
  const slugs = Object.keys(BODIES)
  const docs = await client.fetch(
    `*[_type == "article" && slug.current in $slugs]{ _id, "slug": slug.current, body }`,
    { slugs }
  )

  const found = new Set(docs.map((d) => d.slug))
  const missing = slugs.filter((s) => !found.has(s))
  if (missing.length) {
    console.error(`Article(s) not found in Sanity: ${missing.join(', ')}`)
    process.exit(1)
  }

  // Back up current bodies before touching anything.
  const backupPath = path.join(here, `data/article-bodies-backup-${docs[0]._id.slice(0, 8)}.json`)
  const backup = Object.fromEntries(docs.map((d) => [d.slug, d.body]))
  if (!DRY) {
    fs.writeFileSync(backupPath, JSON.stringify(backup, null, 1))
    console.log(`Backed up existing bodies -> ${path.relative(process.cwd(), backupPath)}\n`)
  }

  let tx = client.transaction()

  for (const doc of docs) {
    const next = BODIES[doc.slug]
    console.log(`${DRY ? '[dry] ' : ''}${doc.slug} (${doc._id})`)

    for (const locale of ['en', 'de']) {
      const before = doc.body?.[locale] || []
      const beforeTypes = before.map((b) => b._type).join(', ') || '(empty)'
      const after = summarise(next[locale])
      console.log(`   ${locale}: [${beforeTypes}] -> ${next[locale].length} blocks`)
      console.log(`       ${JSON.stringify(after.counts)}, ${after.chars} chars of indexable text`)
    }

    tx = tx.patch(doc._id, (p) =>
      p.set({ 'body.en': next.en, 'body.de': next.de })
    )
  }

  if (DRY) {
    console.log('\n[dry run] nothing written.')
    return
  }

  await tx.commit()
  console.log('\n✅ Bodies replaced. Verify the pages, then delete the backup file if happy.')
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
