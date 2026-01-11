// Script to fix product images by downloading correct ones and uploading to Sanity
import { createClient } from '@sanity/client'
import https from 'https'
import http from 'http'
import { URL } from 'url'

const client = createClient({
  projectId: 'wudur8e8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Product image URLs - official product images from manufacturer websites
const productImages = {
  // Autel products
  'autel-evo-ii-pro': {
    url: 'https://auteldrones.com/cdn/shop/files/EVO-II-Pro-V3_Rugged-Bundle.png?v=1699316022&width=1024',
    alt: 'Autel EVO II Pro drone'
  },
  'autel-evo-nano-plus': {
    url: 'https://auteldrones.com/cdn/shop/files/Autel-EVO-Nano-Plus-Premium-Bundle-Gray_1000x.png?v=1699315993',
    alt: 'Autel EVO Nano+ compact drone'
  },

  // Dobot
  'dobot-mg400': {
    url: 'https://www.dobot-robots.com/wp-content/uploads/2021/07/MG400-1.png',
    alt: 'Dobot MG400 desktop robot arm'
  },

  // ESTUN products
  'estun-ecr5': {
    url: 'https://www.estun.com/uploads/image/20220624/1656059892.png',
    alt: 'ESTUN ECR5 collaborative robot'
  },
  'estun-er20-1780': {
    url: 'https://www.estun.com/uploads/image/20200818/1597742627.png',
    alt: 'ESTUN ER20-1780 industrial robot'
  },

  // Elite Robot
  'elite-robot-ec66': {
    url: 'https://www.elibot.com/uploads/image/20230331/1680251276.png',
    alt: 'Elite Robot EC66 collaborative robot'
  },

  // Hikrobot products
  'hikrobot-mv-cs-camera': {
    url: 'https://www.hikrobotics.com/upload/image/20220426/MV-CS.png',
    alt: 'Hikrobot MV-CS industrial machine vision camera'
  },
  'hikrobot-amr-latent': {
    url: 'https://www.hikrobotics.com/upload/image/20220426/Latent-Mobile-Robot.png',
    alt: 'Hikrobot AMR Latent Mobile Robot'
  },

  // Fourier Intelligence
  'fourier-gr-1': {
    url: 'https://www.fftai.com/images/GR-1/gr1-main.png',
    alt: 'Fourier GR-1 humanoid robot'
  },

  // Unitree G1
  'unitree-g1': {
    url: 'https://oss-global-cdn.unitree.com/static/upload/G1_EDU/G1_EDU.png',
    alt: 'Unitree G1 humanoid robot'
  },

  // Geek+
  'geekplus-p800': {
    url: 'https://www.geekplus.com/uploads/P800.png',
    alt: 'Geek+ P800 warehouse picking robot'
  },

  // Hai Robotics
  'hai-robotics-acr-a42t': {
    url: 'https://www.hairobotics.com/upload/ACR-A42T.png',
    alt: 'Hai Robotics ACR A42T autonomous case-handling robot'
  },
  'hai-robotics-haipick-a3': {
    url: 'https://www.hairobotics.com/upload/HaiPick-A3.png',
    alt: 'Hai Robotics HaiPick A3 picking robot'
  },

  // KEENON
  'keenon-t8': {
    url: 'https://www.keenonrobot.com/upload/T8.png',
    alt: 'KEENON T8 delivery robot'
  },
  'keenon-w3-cleaning': {
    url: 'https://www.keenonrobot.com/upload/W3.png',
    alt: 'KEENON W3 commercial cleaning robot'
  },

  // Pudu Robotics
  'pudu-bellabot': {
    url: 'https://www.pudurobotics.com/images/bellabot/bellabot-main.png',
    alt: 'Pudu BellaBot delivery robot'
  },
  'pudu-kettybot': {
    url: 'https://www.pudurobotics.com/images/kettybot/kettybot-main.png',
    alt: 'Pudu KettyBot service robot'
  },
}

async function downloadImage(imageUrl) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(imageUrl)
    const protocol = parsedUrl.protocol === 'https:' ? https : http

    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/*,*/*',
      }
    }

    const req = protocol.request(options, (res) => {
      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log(`  Redirecting to: ${res.headers.location}`)
        downloadImage(res.headers.location).then(resolve).catch(reject)
        return
      }

      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download: ${res.statusCode}`))
        return
      }

      const chunks = []
      res.on('data', (chunk) => chunks.push(chunk))
      res.on('end', () => {
        const buffer = Buffer.concat(chunks)
        const contentType = res.headers['content-type'] || 'image/png'
        resolve({ buffer, contentType })
      })
    })

    req.on('error', reject)
    req.setTimeout(30000, () => {
      req.destroy()
      reject(new Error('Request timeout'))
    })
    req.end()
  })
}

async function uploadImageToSanity(buffer, filename, contentType) {
  try {
    const asset = await client.assets.upload('image', buffer, {
      filename,
      contentType
    })
    return asset._id
  } catch (error) {
    throw new Error(`Failed to upload to Sanity: ${error.message}`)
  }
}

async function updateProductImage(slug, assetId, altText) {
  const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]`,
    { slug }
  )

  if (!product) {
    throw new Error(`Product not found: ${slug}`)
  }

  await client.patch(product._id)
    .set({
      mainImage: {
        _type: 'image',
        alt: altText,
        asset: {
          _type: 'reference',
          _ref: assetId
        }
      }
    })
    .commit()

  return product._id
}

async function fixProductImages() {
  console.log('Starting product image fix...\n')

  const results = {
    success: [],
    failed: []
  }

  for (const [slug, imageData] of Object.entries(productImages)) {
    console.log(`\nProcessing: ${slug}`)
    console.log(`  URL: ${imageData.url}`)

    try {
      // Download image
      console.log('  Downloading...')
      const { buffer, contentType } = await downloadImage(imageData.url)
      console.log(`  Downloaded: ${buffer.length} bytes (${contentType})`)

      // Upload to Sanity
      console.log('  Uploading to Sanity...')
      const ext = contentType.includes('png') ? 'png' : 'jpg'
      const assetId = await uploadImageToSanity(buffer, `${slug}.${ext}`, contentType)
      console.log(`  Uploaded: ${assetId}`)

      // Update product
      console.log('  Updating product...')
      const productId = await updateProductImage(slug, assetId, imageData.alt)
      console.log(`  Updated product: ${productId}`)

      results.success.push(slug)
    } catch (error) {
      console.log(`  ERROR: ${error.message}`)
      results.failed.push({ slug, error: error.message })
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('SUMMARY')
  console.log('='.repeat(60))
  console.log(`\nSuccess: ${results.success.length}`)
  results.success.forEach(s => console.log(`  ✅ ${s}`))

  console.log(`\nFailed: ${results.failed.length}`)
  results.failed.forEach(f => console.log(`  ❌ ${f.slug}: ${f.error}`))
}

fixProductImages().catch(console.error)
