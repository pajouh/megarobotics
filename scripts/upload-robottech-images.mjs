// One-off: populate the robotTechnology `image` field in Sanity from the existing
// site images (public/images/industrial/*). Slugs without a source image are skipped.
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'

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

const MAP = [
  ['industrial-arms', 'industrial-automation.webp'],
  ['cobots', 'industrial-automation.webp'],
  ['amr-agv', 'mobile-robots-intralogistics.webp'],
  ['humanoid', 'humanoid-ai-robotics.webp'],
  ['end-effectors-components', 'components-end-effectors.webp'],
]

const run = async () => {
  for (const [slug, file] of MAP) {
    const id = await client.fetch(
      '*[_type=="robotTechnology" && slug.current==$slug][0]._id', { slug }
    )
    if (!id) { console.log(`! no doc for slug ${slug}, skipping`); continue }
    const buf = readFileSync(new URL(`../public/images/industrial/${file}`, import.meta.url))
    const asset = await client.assets.upload('image', buf, { filename: file })
    await client.patch(id).set({
      image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
    }).commit()
    console.log(`✓ ${slug} <- ${file} (${asset._id})`)
  }
  console.log('Done.')
}

run().catch((e) => { console.error('FAILED:', e.message); process.exit(1) })
