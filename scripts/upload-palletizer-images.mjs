/**
 * One-shot: upload the Cobot Palletizer (AM Series) images to Sanity,
 * attach them to the draft product, and publish it live.
 *
 * USAGE (from the repo root, in your WSL terminal):
 *
 *   1. Put the 4 image files in ./palletizer-images/  (names below)
 *        am40.jpg         -> main image  (AM cobot cell)
 *        mmd20.jpg        -> gallery     (mobile cobot MMD-20)
 *        system.jpg       -> gallery     (labelled system layout)
 *        app_pharma.jpg   -> gallery     (real in-line deployment)
 *
 *   2. Run:
 *        SANITY_WRITE_TOKEN=YOUR_TOKEN node scripts/upload-palletizer-images.mjs
 *
 *   (Optional) pass a different folder:  node scripts/upload-palletizer-images.mjs ./some-dir
 *
 * The token is read from the environment — it is NOT stored in this file.
 */
import { createClient } from '@sanity/client'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join, extname } from 'node:path'

const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN
if (!token) {
  console.error('✗ Set SANITY_WRITE_TOKEN (or SANITY_API_TOKEN) in the environment.')
  process.exit(1)
}

const client = createClient({
  projectId: 'wudur8e8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const DIR = process.argv[2] || './palletizer-images'
const DRAFT_ID = 'drafts.product.cobot-palletizer-am-series'
// NOTE: do NOT publish to a dotted id like `product.cobot-palletizer-am-series`.
// Sanity treats the segment before the first `.` as a reserved namespace, which
// excludes the doc from the anonymous/CDN projection the live site reads — it would
// be invisible on megarobotics.de. The app queries products by slug.current, never by
// _id, so we publish with a fresh random id (slug preserved) instead.

// main image first, then gallery (in order). alt text per image.
const PLAN = [
  { file: 'am40.jpg',       role: 'main',    alt: 'AM-Series cobot palletizer cell' },
  { file: 'mmd20.jpg',      role: 'gallery', alt: 'MMD-20 mobile cobot palletizer' },
  { file: 'system.jpg',     role: 'gallery', alt: 'Palletizing cell system layout' },
  { file: 'app_pharma.jpg', role: 'gallery', alt: 'In-line cobot palletizing deployment' },
]

async function uploadOne(file, alt) {
  const path = join(DIR, file)
  if (!existsSync(path)) throw new Error(`Missing file: ${path}`)
  const asset = await client.assets.upload('image', readFileSync(path), { filename: file })
  console.log(`  ✓ uploaded ${file} -> ${asset._id}`)
  return asset._id
}

async function run() {
  if (!existsSync(DIR)) {
    console.error(`✗ Folder not found: ${DIR}`)
    console.error(`  Create it and drop the images in, e.g.:  mkdir -p ${DIR}`)
    console.error(`  Files present should be: ${PLAN.map((p) => p.file).join(', ')}`)
    if (existsSync('.')) console.error(`  (cwd has: ${readdirSync('.').slice(0, 20).join(', ')})`)
    process.exit(1)
  }

  console.log('Uploading images…')
  let mainRef = null
  const gallery = []
  let gi = 0
  for (const item of PLAN) {
    const assetId = await uploadOne(item.file, item.alt)
    if (item.role === 'main') {
      mainRef = { _type: 'image', asset: { _type: 'reference', _ref: assetId } }
    } else {
      gallery.push({
        _type: 'image',
        _key: `g${gi++}`,
        alt: item.alt,
        asset: { _type: 'reference', _ref: assetId },
      })
    }
  }

  console.log('Attaching images to the draft product…')
  await client
    .patch(DRAFT_ID)
    .set({ mainImage: mainRef, gallery })
    .commit()

  console.log('Publishing the product live…')
  const draft = await client.getDocument(DRAFT_ID)
  if (!draft) throw new Error(`Draft not found: ${DRAFT_ID}`)
  // Strip system fields and the dotted draft id; let Sanity assign a fresh random
  // _id so the published product is visible to anonymous/CDN reads (see NOTE above).
  const { _id, _rev, _createdAt, _updatedAt, _system, ...fields } = draft
  const published = await client.create(fields)
  await client.delete(DRAFT_ID)

  console.log(`\n✅ Done — “Cobot Palletizer (AM Series)” is live with images.`)
  console.log(`   published _id: ${published._id} (slug: ${published.slug?.current})`)
  console.log('   /products/cobot-palletizer-am-series')
}

run().catch((err) => {
  console.error('\n✗ Failed:', err.message || err)
  process.exit(1)
})
