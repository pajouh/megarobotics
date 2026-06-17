/**
 * Seed the 12 productFamily docs in Sanity with the content that currently lives in the
 * i18n JSON fallback (messages/{en,de}.json -> industrial.catalog.families.<slug>), so the
 * families become fully editable from Studio. The pages already prefer Sanity per-field and
 * fall back to JSON, so this brings Studio to parity without changing the rendered output.
 *
 * Mapping (localized {en,de}):
 *   shortDescription <- JSON.shortDescription      (short text; used by the /products cards)
 *   body             <- PortableText of [intro, ...JSON.body]   (intro preserved in body)
 *   subcategories / applications / selectionCriteria <- direct
 *   seo.metaTitle / seo.metaDescription <- JSON.meta.{title,description}
 *
 * Leaves title, slug, icon, image, order, featured, isActive untouched.
 *
 *   SANITY_API_TOKEN=... node scripts/seed-family-content.mjs [--dry]
 */
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'

for (const line of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
}

const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN
if (!token) { console.error('✗ Set SANITY_API_TOKEN with write access.'); process.exit(1) }

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wudur8e8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const DRY = process.argv.includes('--dry')
const en = JSON.parse(readFileSync(new URL('../messages/en.json', import.meta.url), 'utf8')).industrial.catalog.families
const de = JSON.parse(readFileSync(new URL('../messages/de.json', import.meta.url), 'utf8')).industrial.catalog.families

// Build PortableText blocks from a list of plain paragraphs, prefixed with the slug+locale
// so _key values are unique and stable across re-runs.
function toBlocks(paragraphs, prefix) {
  return paragraphs
    .filter((p) => p && p.trim())
    .map((text, i) => ({
      _type: 'block',
      _key: `${prefix}-b${i}`,
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: `${prefix}-b${i}-s0`, text, marks: [] }],
    }))
}

function bodyParas(fam) {
  const intro = fam.intro?.trim()
  const body = Array.isArray(fam.body) ? fam.body : []
  const paras = intro && intro !== body[0]?.trim() ? [intro, ...body] : body
  return paras
}

const loc = (e, d) => ({ en: e ?? '', de: d ?? e ?? '' })
const locArr = (e, d) => ({ en: e ?? [], de: d ?? e ?? [] })

async function run() {
  const slugs = Object.keys(en)
  console.log(`Seeding ${slugs.length} families${DRY ? ' [dry]' : ''}…`)
  let done = 0
  for (const slug of slugs) {
    const e = en[slug]
    const d = de[slug] || {}
    const id = await client.fetch(`*[_type=="productFamily" && slug.current==$slug][0]._id`, { slug })
    if (!id) { console.log(`  ! no doc for ${slug}, skipping`); continue }

    const patch = {
      shortDescription: loc(e.shortDescription, d.shortDescription),
      body: {
        en: toBlocks(bodyParas(e), `${slug}-en`),
        de: toBlocks(bodyParas(d.body ? d : e), `${slug}-de`),
      },
      subcategories: locArr(e.subcategories, d.subcategories),
      applications: locArr(e.applications, d.applications),
      selectionCriteria: locArr(e.selectionCriteria, d.selectionCriteria),
    }
    if (e.meta || d.meta) {
      patch.seo = {
        metaTitle: loc(e.meta?.title, d.meta?.title),
        metaDescription: loc(e.meta?.description, d.meta?.description),
      }
    }

    if (DRY) {
      console.log(`  [dry] ${slug}: sd, body(${patch.body.en.length}p), subcat(${patch.subcategories.en.length}), app(${patch.applications.en.length}), sel(${patch.selectionCriteria.en.length})${patch.seo ? ', seo' : ''}`)
      continue
    }
    await client.patch(id).set(patch).commit()
    done++
    console.log(`  ✓ ${slug}`)
  }
  console.log(DRY ? 'Dry run complete.' : `Done. Seeded ${done} families.`)
}

run().catch((e) => { console.error('✗ FAILED:', e.message || e); process.exit(1) })
