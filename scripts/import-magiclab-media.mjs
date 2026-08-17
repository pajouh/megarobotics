/**
 * Replace the MagicLab product imagery with frames taken from MagicLab's own
 * product films (oss-cdn.magiclab.top), and attach the official YouTube video
 * to each product.
 *
 * Why this exists: the MagicLab catalogue was built from blindly-grabbed video
 * frames. MagicDog Edu's "product image" was frame 1 of the MagicDog film — a
 * circuit-board title card with no robot in it — and MagicBot Z1 with Dexterous
 * Hands was abstract light trails. MagicDog-W Standard and -W Laser had their
 * two assets cross-wired, each using the other's image as its main. MagicLab
 * publishes no high-res product stills (their site carries ~500px nav renders
 * and 1080p films), so deliberately chosen frames are the best source available.
 *
 * Frames were picked by eye against three rules: the robot is actually in shot,
 * no burnt-in marketing text (much of the Z1 and MagicHand footage is captioned
 * in Chinese or English), and each product gets visually distinct images so
 * sibling SKUs do not look identical.
 *
 * Usage: node scripts/import-magiclab-media.mjs [--dry-run]
 */
import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'node:fs'
import { config } from 'dotenv'

config({ path: '.env.local' })

const DRY = process.argv.includes('--dry-run')
const FRAMES = '/tmp/ml/frames'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

/**
 * mode 'replace' rewrites the gallery outright — used where the existing
 * gallery is itself wrong (the cross-wired MagicDog-W pair, or a gallery whose
 * only entry was a title card). 'append' keeps what is already there.
 */
const PICKS = JSON.parse(readFileSync('/tmp/ml/picks.json', 'utf8'))

const ALT = {
  dog_09: 'MagicDog quadruped robot walking through a modern living space',
  dog_07: 'MagicDog quadruped robot interacting with a family at home',
  dog_08: 'MagicDog quadruped robot beside a child in a living room',
  dog_03: 'MagicDog quadruped robot leg and actuator detail in the laboratory',
  z1_b_02: 'MagicBot Z1 humanoid robot striking a ball on grass',
  z1_b_04: 'MagicBot Z1 humanoid robot recovering its balance after a kick',
  z1_b_01: 'MagicBot Z1 humanoid robot walking across open grass',
  z1_b_03: 'MagicBot Z1 humanoid robot demonstrating dynamic balance outdoors',
  hand_05: 'MagicHand S01 dexterous robotic hand grasping a hand-held tool',
  hand_10: 'MagicLab humanoid robot fitted with MagicHand S01 dexterous hands',
  dogw_b_03: 'MagicDog-W wheeled quadruped robot crossing rocky ground',
  dogw_f_02: 'MagicDog-W wheeled quadruped robot sensor head in close-up',
  dogw_c_03: 'MagicDog-W wheeled quadruped robot traversing a low wall',
  dogw_a_02: 'Two MagicDog-W wheeled quadruped robots moving across a lawn',
  dogw_e_04: 'MagicDog-W wheeled quadruped robot navigating a public plaza',
  dogw_d_03: 'MagicDog-W wheeled quadruped robot climbing stone steps',
  dogw_c_04: 'MagicDog-W wheeled quadruped robot on a grassed embankment',
  dogw_b_02: 'MagicDog-W wheeled quadruped robot on uneven woodland terrain',
  dogw_e_03: 'MagicDog-W wheeled quadruped robot operating in a public square',
  dogy_c_04: 'MagicDog Y1 industrial quadruped robot walking on open ground',
  dogy_b_01: 'MagicDog Y1 industrial quadruped robot moving through bamboo forest',
  dogy_a_02: 'MagicDog Y1 industrial quadruped robot climbing exterior steps',
  dogy_c_02: 'MagicDog Y1 industrial quadruped robot on an outdoor inspection route',
  dogy_e_03: 'MagicDog Y1 industrial quadruped robot performing a LiDAR inspection in a car park',
  human_b_02: 'MagicBot humanoid robots walking along a tree-lined street',
  human_b_03: 'MagicBot humanoid robot crossing a road beside a quadruped robot',
  human_b_07: 'MagicBot humanoid robot walking through an urban plaza',
  human_c_01: 'MagicBot humanoid robots working on a production line',
  human_c_03: 'MagicBot humanoid robot picking parts from a logistics bin',
}

/** MagicLab's official channel (@MagicLab_Robot) — no third-party re-uploads. */
const VIDEOS = JSON.parse(readFileSync('/tmp/ml/videos.json', 'utf8'))

async function uploadFrame(name) {
  const path = `${FRAMES}/${name}.jpg`
  if (!existsSync(path)) throw new Error(`missing frame ${path}`)
  // A dry run must not write to the dataset — resolve the frame and stop there.
  if (DRY) return `dry-${name}`
  const asset = await client.assets.upload('image', readFileSync(path), {
    filename: `magiclab-${name}.jpg`,
  })
  return asset._id
}

const imageRef = (id, alt) => ({
  _type: 'image',
  asset: { _type: 'reference', _ref: id },
  ...(alt ? { alt } : {}),
})

async function main() {
  const slugs = Object.keys(PICKS)
  const docs = await client.fetch(
    `*[_type == "product" && slug.current in $slugs]{_id, "slug": slug.current, name, "gallery": gallery}`,
    { slugs }
  )
  const bySlug = Object.fromEntries(docs.map((d) => [d.slug, d]))
  const missing = slugs.filter((s) => !bySlug[s])
  if (missing.length) throw new Error(`no product for slug(s): ${missing.join(', ')}`)

  const cache = new Map()
  const upload = async (n) => {
    if (!cache.has(n)) cache.set(n, await uploadFrame(n))
    return cache.get(n)
  }

  for (const slug of slugs) {
    const pick = PICKS[slug]
    const doc = bySlug[slug]
    const patch = {}

    if (pick.main !== 'KEEP') {
      patch.mainImage = imageRef(await upload(pick.main), ALT[pick.main])
    }

    if (pick.gallery.length) {
      const fresh = []
      for (const n of pick.gallery) {
        fresh.push({ ...imageRef(await upload(n), ALT[n]), _key: `ml-${n}` })
      }
      patch.gallery = pick.mode === 'append' ? [...(doc.gallery || []), ...fresh] : fresh
    }

    const video = VIDEOS[slug]
    if (video) patch.videoUrl = video

    if (DRY) {
      console.log(`[dry] ${slug}: ${Object.keys(patch).join(', ')}`)
      continue
    }
    await client.patch(doc._id).set(patch).commit()
    console.log(
      `${slug}: main=${pick.main !== 'KEEP' ? pick.main : '(kept)'} gallery=${pick.gallery.length} (${pick.mode})${video ? ' +video' : ''}`
    )
  }

  // Products keeping their imagery but still due a video.
  for (const [slug, url] of Object.entries(VIDEOS)) {
    if (PICKS[slug]) continue
    const doc = await client.fetch(`*[_type == "product" && slug.current == $slug][0]{_id}`, { slug })
    if (!doc) {
      console.log(`  ! no product for ${slug}, skipping video`)
      continue
    }
    if (DRY) {
      console.log(`[dry] ${slug}: videoUrl only`)
      continue
    }
    await client.patch(doc._id).set({ videoUrl: url }).commit()
    console.log(`${slug}: +video only`)
  }

  console.log(`\n${cache.size} unique assets uploaded.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
