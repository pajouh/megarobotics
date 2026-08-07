/**
 * Replace the Agile Robots Diana 7 and Thor 20 main images.
 *
 * Both products used a 5400x1300 marketing banner with the model name and
 * strapline burnt into the artwork. That reads badly in a square product tile:
 * shown whole it is a thin strip, and cropping to fit chops the robot.
 *
 * Thor 3 and Thor 7 use the same banners but have hand-set crops in the Studio
 * that isolate the robot cleanly, so they are deliberately left alone.
 *
 * This swaps in the plain product renders from agile-robots.com:
 *   Diana 7  1280x770 on white
 *   Thor 20   930x620 on dark
 *
 * Run:
 *   node --env-file=.env.local scripts/fix-agile-robots-images.mjs --dry
 *   node --env-file=.env.local scripts/fix-agile-robots-images.mjs
 */
import { createClient } from '@sanity/client'

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error('✗ SANITY_API_TOKEN missing. Run with: node --env-file=.env.local scripts/fix-agile-robots-images.mjs')
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
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'

const TARGETS = [
  {
    slug: 'agile-robots-diana-7',
    name: 'Diana 7',
    url: 'https://www.agile-robots.com/media/_processed_/6/9/csm_DIA7_DRK_CLA_P14_IMG01_V02_32dd37e695.png',
    filename: 'agile-robots-diana-7.png',
    contentType: 'image/png',
  },
  {
    slug: 'agile-robots-thor-20',
    name: 'Thor 20',
    url: 'https://www.agile-robots.com/media/files/New_website/Solutions/Thor_series/AgileRobots-ThorSeries-Thor20.jpg',
    filename: 'agile-robots-thor-20.jpg',
    contentType: 'image/jpeg',
  },
]

async function run() {
  console.log(DRY ? '— DRY RUN, nothing will be written —\n' : '— LIVE RUN —\n')

  for (const t of TARGETS) {
    // Match on name within the Agile Robots brand rather than guessing the slug.
    const doc = await client.fetch(
      `*[_type=="product" && manufacturer->slug.current=="agile-robots" && name==$name][0]{
         _id, name, "slug": slug.current,
         "w": mainImage.asset->metadata.dimensions.width,
         "h": mainImage.asset->metadata.dimensions.height,
         "file": mainImage.asset->originalFilename,
         "hasCrop": defined(mainImage.crop)
       }`,
      { name: t.name },
    )
    if (!doc) {
      console.log(`  !! ${t.name}: product not found, skipping`)
      continue
    }
    if (doc.hasCrop) {
      console.log(`  skip ${t.name}: has a hand-set crop, leaving it alone`)
      continue
    }

    console.log(`  ${t.name}`)
    console.log(`    was: ${doc.file} ${doc.w}x${doc.h}`)

    if (DRY) {
      console.log(`    new: ${t.url.split('/').pop()}  (dry run, not fetched)\n`)
      continue
    }

    const res = await fetch(t.url, { headers: { 'User-Agent': UA } })
    if (!res.ok) throw new Error(`fetch ${res.status} for ${t.url}`)
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length < 5000) throw new Error(`suspiciously small image (${buf.length} B) for ${t.url}`)

    const asset = await client.assets.upload('image', buf, {
      filename: t.filename,
      contentType: t.contentType,
    })

    await client
      .patch(doc._id)
      .set({ mainImage: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } })
      .commit()

    console.log(`    new: ${t.filename} ${asset.metadata.dimensions.width}x${asset.metadata.dimensions.height} ✓\n`)
  }

  console.log(DRY ? 'Dry run complete. Re-run without --dry to write.' : '✅ Done.')
}

run().catch((e) => {
  console.error('\n✗ Failed:', e.message)
  process.exit(1)
})
