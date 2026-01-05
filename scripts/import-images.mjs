import { createClient } from '@sanity/client'

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wudur8e8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Verified product image URLs
const productImages = {
  'unitree-go2': {
    main: 'https://cdn.shopify.com/s/files/1/0580/0965/1498/files/Go2_Pro_1200x.png?v=1700187665',
    alt: 'Unitree Go2 quadruped robot'
  },
  'unitree-g1': {
    main: 'https://cdn.shopify.com/s/files/1/0580/0965/1498/files/G1_1200x.png?v=1717637619',
    alt: 'Unitree G1 humanoid robot'
  },
  'unitree-h1': {
    main: 'https://cdn.shopify.com/s/files/1/0580/0965/1498/files/H1_1200x.png?v=1711004398',
    alt: 'Unitree H1 humanoid robot'
  },
  'unitree-b2': {
    main: 'https://cdn.shopify.com/s/files/1/0580/0965/1498/files/B2_1200x.png?v=1711004159',
    alt: 'Unitree B2 industrial quadruped'
  },
  'dji-mavic-3-pro': {
    main: 'https://se-cdn.djiits.com/tpc/uploads/spu/cover/9b1bb4e6929cb9c5d0ea22bf33eedffd@ultra.png',
    alt: 'DJI Mavic 3 Pro drone'
  },
  'dji-mini-4-pro': {
    main: 'https://www-cdn.djiits.com/cms/uploads/ae5d8b9987be8d5ecdeb5d502a1e887c@374*374.png',
    alt: 'DJI Mini 4 Pro drone'
  },
}

async function downloadImage(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/*,*/*;q=0.8',
        'Referer': 'https://www.google.com/'
      }
    })
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const contentType = response.headers.get('content-type') || 'image/png'
    return { buffer, contentType }
  } catch (error) {
    console.error(`  Failed to download: ${error.message}`)
    return null
  }
}

async function uploadImageToSanity(buffer, contentType, filename) {
  try {
    const asset = await client.assets.upload('image', buffer, {
      filename,
      contentType
    })
    return asset
  } catch (error) {
    console.error(`  Failed to upload: ${error.message}`)
    return null
  }
}

async function updateProductImage(productSlug, imageAsset, alt) {
  try {
    await client
      .patch(`product-${productSlug}`)
      .set({
        mainImage: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id
          },
          alt: alt
        }
      })
      .commit()
    return true
  } catch (error) {
    console.error(`  Failed to update product: ${error.message}`)
    return false
  }
}

async function importProductImages() {
  console.log('Importing product images...\n')

  for (const [slug, imageData] of Object.entries(productImages)) {
    console.log(`Processing: ${slug}`)

    const downloaded = await downloadImage(imageData.main)
    if (!downloaded) {
      console.log(`  Skipped (download failed)\n`)
      continue
    }

    console.log(`  Downloaded ${downloaded.buffer.length} bytes`)

    const ext = downloaded.contentType.includes('png') ? 'png' : 'jpg'
    const asset = await uploadImageToSanity(
      downloaded.buffer,
      downloaded.contentType,
      `${slug}-main.${ext}`
    )

    if (!asset) {
      console.log(`  Skipped (upload failed)\n`)
      continue
    }

    console.log(`  Uploaded as ${asset._id}`)

    const updated = await updateProductImage(slug, asset, imageData.alt)
    if (updated) {
      console.log(`  ✓ Image linked to product\n`)
    }
  }

  console.log('\n✅ Product images import complete!')
}

// Run the import
importProductImages().catch(console.error)
