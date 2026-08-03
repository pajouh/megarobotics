import { createClient } from '@sanity/client'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

// Token: SANITY_API_TOKEN, or fall back to the Sanity CLI login (`npx sanity login`)
function resolveToken() {
  if (process.env.SANITY_API_TOKEN) return process.env.SANITY_API_TOKEN
  try {
    const cfg = JSON.parse(
      fs.readFileSync(path.join(os.homedir(), '.config/sanity/config.json'), 'utf8')
    )
    return cfg.authToken
  } catch {
    return undefined
  }
}

const token = resolveToken()
if (!token) {
  console.error('No Sanity token. Run `npx sanity login` or set SANITY_API_TOKEN.')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wudur8e8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const OSS = 'https://limx-video.oss-cn-beijing.aliyuncs.com/limx-website/products'

// Alt text is taken from LimX Dynamics' own product pages where available.
const PRODUCTS = [
  {
    id: 'product-limx-luna',
    label: 'LimX Luna',
    mainImage: { url: `${OSS}/luna/luna-2-1.png`, file: 'limx-luna-main.png' },
    gallery: [
      { url: `${OSS}/luna/luna-3-1.png`, file: 'luna-design-detail.png', alt: 'Luna head and shoulder design detail' },
      { url: `${OSS}/luna/luna-6-1.png`, file: 'luna-fall-mitigation.png', alt: 'Active Fall Mitigation' },
      { url: `${OSS}/luna/luna-6-2.png`, file: 'luna-force-sensing.png', alt: 'External Force Sensing' },
      { url: `${OSS}/luna/luna-6-3.png`, file: 'luna-hardware-estop.png', alt: 'Hardware E-Stop' },
      { url: `${OSS}/luna/luna-6-4.png`, file: 'luna-safe-action-override.png', alt: 'Safe Action Override' },
      { url: `${OSS}/luna/luna-9-1.png`, file: 'luna-video-to-motion.png', alt: 'Video to Motion' },
      { url: `${OSS}/luna/luna-9-2.png`, file: 'luna-kinesthetic-teaching.png', alt: 'Kinesthetic Teaching' },
      { url: `${OSS}/luna/luna-9-3.png`, file: 'luna-preloaded-routines.png', alt: 'Preloaded Routines' },
      { url: `${OSS}/luna/luna-11-1.png`, file: 'luna-shopping-malls.png', alt: 'Shopping Malls' },
      { url: `${OSS}/luna/luna-11-2.png`, file: 'luna-museums.png', alt: 'Museums' },
      { url: `${OSS}/luna/luna-11-3.png`, file: 'luna-theme-parks.png', alt: 'Theme Parks' },
      { url: `${OSS}/luna/luna-11-4.png`, file: 'luna-live-stages.png', alt: 'Live Stages' },
    ],
  },
  {
    id: 'product-limx-tron1',
    label: 'LimX TRON 1',
    mainImage: { url: `${OSS}/tron1/home/1.png`, file: 'limx-tron1-main.png' },
    gallery: [
      { url: `${OSS}/tron1/home/2.png`, file: 'tron1-sole-configuration.png', alt: 'TRON 1 in sole configuration' },
      { url: `${OSS}/tron1/home/9.png`, file: 'tron1-wheeled-configuration.png', alt: 'TRON 1 in wheeled configuration' },
      { url: `${OSS}/tron1/foot1.png`, file: 'tron1-point-foot.png', alt: 'Point-foot foot-end' },
      { url: `${OSS}/tron1/foot2.png`, file: 'tron1-sole-foot.png', alt: 'Sole foot-end' },
      { url: `${OSS}/tron1/foot3.png`, file: 'tron1-wheeled-foot.png', alt: 'Wheeled foot-end' },
      {
        url: `${OSS}/tron1/kits/908_8dfbada101.png`,
        file: 'tron1-arm-expansion-kit.png',
        alt: 'TRON 1 with Arm Expansion Kit',
      },
    ],
  },
]

async function uploadImage(url, filename) {
  console.log(`  Uploading ${filename}...`)
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`)
  const buffer = Buffer.from(await response.arrayBuffer())
  const asset = await client.assets.upload('image', buffer, { filename })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function run() {
  for (const product of PRODUCTS) {
    console.log(`\n${product.label} (${product.id})`)

    const mainImage = await uploadImage(product.mainImage.url, product.mainImage.file)

    const gallery = []
    for (const img of product.gallery) {
      const uploaded = await uploadImage(img.url, img.file)
      gallery.push({ ...uploaded, _key: img.file.replace(/[^a-z0-9]/gi, '').slice(0, 24), alt: img.alt })
    }

    // Patch the draft — publishing stays a separate, deliberate step.
    await client.patch(`drafts.${product.id}`).set({ mainImage, gallery }).commit()
    console.log(`  ✓ ${product.label}: main image + ${gallery.length} gallery images attached`)
  }

  console.log('\n✅ Images attached to drafts. Publish them in the Studio (or via the Sanity MCP) when ready.')
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
