/**
 * Import the OnRobot end-of-arm tooling catalogue (22 products) into Sanity.
 *
 * - Updates the existing "OnRobot" manufacturer: relationshipStatus becomes
 *   official_distributor (MegaRobotics is an authorized OnRobot distributor),
 *   plus a real German description, founding year and specialties. The previous
 *   German description was the English text copied verbatim.
 * - Downloads each product render from onrobot.com and uploads it to Sanity.
 *   Uploads are de-duped by source URL and skipped when the product already
 *   carries a mainImage (re-runs do not re-upload).
 * - Creates or updates 22 products in the "End Effectors & Robot Tooling"
 *   family (EN + DE), availabilityStatus available_on_request, inquiry-only.
 *
 * Idempotent: products are matched by slug, and an existing document keeps its
 * _id, so re-running updates in place rather than duplicating. All ids are
 * normal random ids (never dotted).
 *
 * Content and specifications come from scripts/data/onrobot-end-effectors.json,
 * which was derived from the onrobot.com product pages and the official OnRobot
 * datasheets linked from each product's datasheetUrl.
 *
 * Run:
 *   node --env-file=.env.local scripts/import-onrobot-end-effectors.mjs --dry
 *   node --env-file=.env.local scripts/import-onrobot-end-effectors.mjs
 */
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error('✗ SANITY_API_TOKEN missing. Run with: node --env-file=.env.local scripts/import-onrobot-end-effectors.mjs')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wudur8e8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const DRY = process.argv.includes('--dry')
// Re-upload every product render even when the document already has one. Used
// after onrobot-image-urls.json was repointed from the ~288 px nav thumbnails
// to the full-resolution originals under /storage/products/.
const FORCE_IMAGES = process.argv.includes('--force-images')
const here = (p) => new URL(p, import.meta.url)
const data = JSON.parse(readFileSync(here('./data/onrobot-end-effectors.json'), 'utf8'))
const imageUrls = JSON.parse(readFileSync(here('./data/onrobot-image-urls.json'), 'utf8'))

const FAMILY_SLUG = 'end-effectors-robot-tooling'
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'

const assetCache = new Map()
async function uploadImage(basename, filename) {
  if (assetCache.has(basename)) return assetCache.get(basename)
  const url = imageUrls[basename]
  if (!url) throw new Error(`no source URL for image ${basename}`)
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`fetch ${res.status} for ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 1000) throw new Error(`suspiciously small image (${buf.length} B) for ${url}`)
  const asset = await client.assets.upload('image', buf, { filename, contentType: 'image/png' })
  assetCache.set(basename, asset._id)
  return asset._id
}

const imageField = (ref) => ({ _type: 'image', asset: { _type: 'reference', _ref: ref } })

/** Trim to <= max chars on a word boundary so meta descriptions stay in range. */
function clamp(text, max = 158) {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).replace(/[.,;:]$/, '')}…`
}

async function run() {
  console.log(DRY ? '— DRY RUN, nothing will be written —\n' : '— LIVE RUN —\n')

  // 1. Manufacturer -----------------------------------------------------
  const m = data.manufacturer
  const existingMfr = await client.fetch(
    `*[_type=="manufacturer" && slug.current==$slug][0]{_id, relationshipStatus}`,
    { slug: m.slug },
  )
  if (!existingMfr) throw new Error(`manufacturer ${m.slug} not found — expected it to exist`)
  const mfrId = existingMfr._id

  const mfrPatch = {
    description: m.description,
    specialties: m.specialties,
    website: m.website,
    headquarters: m.headquarters,
    founded: m.founded,
    relationshipStatus: m.relationshipStatus,
  }
  console.log(`Manufacturer ${m.name} (${mfrId})`)
  console.log(`  relationshipStatus: ${existingMfr.relationshipStatus} → ${m.relationshipStatus}`)
  if (!DRY) await client.patch(mfrId).set(mfrPatch).commit()

  // 2. Product family ---------------------------------------------------
  const familyId = await client.fetch(
    `*[_type=="productFamily" && slug.current==$slug][0]._id`,
    { slug: FAMILY_SLUG },
  )
  if (!familyId) throw new Error(`product family ${FAMILY_SLUG} not found`)
  console.log(`Family ${FAMILY_SLUG} (${familyId})\n`)

  // 3. Products ---------------------------------------------------------
  const publishedAt = new Date().toISOString()
  let created = 0
  let updated = 0

  for (const p of data.products) {
    const existing = await client.fetch(
      `*[_type=="product" && slug.current==$slug][0]{_id, "hasImage": defined(mainImage)}`,
      { slug: p.slug },
    )

    let mainImageRef = null
    if (!DRY && (FORCE_IMAGES || !existing?.hasImage)) {
      mainImageRef = await uploadImage(p.image, `onrobot-${p.model.toLowerCase().replace(/\s+/g, '-')}.png`)
    }

    const metaTitle = {
      en: `${p.name} | OnRobot`,
      de: `${p.name} | OnRobot`,
    }
    const metaDescription = {
      en: clamp(p.tagline.en),
      de: clamp(p.tagline.de),
    }

    const doc = {
      _type: 'product',
      name: p.name,
      slug: { _type: 'slug', current: p.slug },
      manufacturer: { _type: 'reference', _ref: mfrId },
      productFamily: { _type: 'reference', _ref: familyId },
      subcategory: p.subcategory,
      tagline: p.tagline,
      description: p.description,
      features: p.features,
      applications: p.applications,
      specifications: p.specifications.map((s, i) => ({
        _key: `spec${String(i).padStart(2, '0')}`,
        _type: 'object',
        label: s.label,
        value: s.value,
      })),
      productUrl: p.productUrl,
      datasheetUrl: p.datasheetUrl,
      availabilityStatus: 'available_on_request',
      inquiryOnly: true,
      isActive: true,
      featured: false,
      isNew: false,
      order: p.order,
      publishedAt,
      seo: {
        metaTitle,
        metaDescription,
        keywords: [
          p.model,
          `OnRobot ${p.model}`,
          p.subcategory,
          'end effector',
          'Endeffektor',
          'cobot',
        ],
      },
    }

    if (existing) {
      doc._id = existing._id
      // Preserve an image that is already attached, unless we are replacing it.
      if (existing.hasImage && !FORCE_IMAGES) {
        const current = await client.fetch(`*[_id==$id][0].mainImage`, { id: existing._id })
        if (current) doc.mainImage = current
      }
    }
    if (mainImageRef) doc.mainImage = imageField(mainImageRef)

    const verb = existing ? 'update' : 'create'
    if (existing) updated++
    else created++

    if (DRY) {
      console.log(
        `  ${verb.padEnd(6)} ${p.slug.padEnd(42)} ${String(p.specifications.length).padStart(2)} specs  ` +
          `${p.features.en.length} feat  img=${p.image}`,
      )
    } else {
      // create() lets Sanity mint a normal random id; createOrReplace() needs
      // the _id we carried over from the existing document.
      const saved = existing ? await client.createOrReplace(doc) : await client.create(doc)
      console.log(`  ${verb.padEnd(6)} ${p.slug.padEnd(42)} ✓ ${saved._id}`)
    }
  }

  console.log(`\n${data.products.length} products — ${created} to create, ${updated} to update`)
  if (DRY) console.log('\nDry run complete. Re-run without --dry to write.')
  else console.log('\n✅ Import complete.')
}

run().catch((e) => {
  console.error('\n✗ Failed:', e.message)
  process.exit(1)
})
