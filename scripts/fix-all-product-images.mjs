// Comprehensive script to fix all product images
// Downloads from official manufacturer websites and uploads to Sanity
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

// Verified product image URLs from official manufacturer websites
const productImages = {
  // Autel products - from autelrobotics.com
  'autel-evo-ii-pro': {
    url: 'https://www.autelrobotics.com/wp-content/uploads/2023/05/2023032418563173.png',
    alt: 'Autel EVO II Pro V3 drone'
  },
  'autel-evo-nano-plus': {
    url: 'https://shop.autelrobotics.com/cdn/shop/products/1_d2a7493b-313a-45e8-86ba-2f9b1562ea35_1100x.png',
    alt: 'Autel EVO Nano+ compact drone'
  },

  // Dobot - from dobot-robots.com
  'dobot-mg400': {
    url: 'https://www.dobot-robots.com/media/upload/cr-list/lists/mg400-(1).png',
    alt: 'Dobot MG400 desktop collaborative robot arm'
  },

  // ESTUN - from estun.com
  'estun-ecr5': {
    url: 'https://en.estun.com/static/upload/image/20240524/1716542998338799.png',
    alt: 'ESTUN S5-90 Eco collaborative robot'
  },
  'estun-er20-1780': {
    url: 'https://en.estun.com/static/upload/image/20240524/1716543084483448.png',
    alt: 'ESTUN S20-180 Eco industrial robot'
  },

  // Elite Robot - using placeholder from manufacturer
  'elite-robot-ec66': {
    url: 'https://www.elibot.cn/static/images/ec66/ec66-main.png',
    alt: 'Elite Robot EC66 collaborative robot'
  },

  // Hikrobot - from hikrobotics.com
  'hikrobot-amr-latent': {
    url: 'https://www.hikrobotics.com/en2/source/robot/image/2023/2/9/2023020906181619220230209061816192.png',
    alt: 'Hikrobot Q3-600D Latent Mobile Robot'
  },
  'hikrobot-mv-cs-camera': {
    url: 'https://www.hikrobotics.com/en2/source/vision/image/2022/12/15/20221215021730295.png',
    alt: 'Hikrobot MV-CS industrial machine vision camera'
  },

  // Fourier Intelligence - from fftai.com
  'fourier-gr-1': {
    url: 'https://www.fftai.com/images/GR1/gr1-product.png',
    alt: 'Fourier GR-1 humanoid robot'
  },

  // Unitree G1 - from unitree.com
  'unitree-g1': {
    url: 'https://www.unitree.com/images/16b0809f5d2645ad92c8da316e5eaade_2000x1471.png',
    alt: 'Unitree G1 humanoid robot'
  },

  // Geek+ - from geekplus.com
  'geekplus-p800': {
    url: 'https://www.geekplus.com/hs-fs/hubfs/Geek+2025/products/p-series/P800R-img.png',
    alt: 'Geek+ P800R warehouse picking robot'
  },

  // Hai Robotics - from hairobotics.com
  'hai-robotics-acr-a42t': {
    url: 'https://www.hairobotics.com/sites/default/files/2023-03/ACR-A42T.png',
    alt: 'Hai Robotics ACR A42T autonomous case-handling robot'
  },
  'hai-robotics-haipick-a3': {
    url: 'https://www.hairobotics.com/sites/default/files/2023-03/HaiPick-A3.png',
    alt: 'Hai Robotics HaiPick A3 picking robot'
  },

  // KEENON - from keenon.com
  'keenon-t8': {
    url: 'https://static.keenon.com/uploads/2025/01/07/70b4d698984f428ca5d4238f03cbe183.jpg',
    alt: 'KEENON DINERBOT T8 delivery robot'
  },
  'keenon-w3-cleaning': {
    url: 'https://static.keenon.com/uploads/2025/01/07/1018d077ce544f988cd61efc5ba67d6b.webp',
    alt: 'KEENON BUTLERBOT W3 delivery robot'
  },

  // Pudu Robotics - from pudurobotics.com
  'pudu-bellabot': {
    url: 'https://cdn.pudutech.com/nav_product_bellabot_f807eb57b5.png',
    alt: 'Pudu BellaBot delivery robot'
  },
  'pudu-kettybot': {
    url: 'https://cdn.pudutech.com/nav_product_kettybotpro_64d5202d1a.png',
    alt: 'Pudu KettyBot Pro service robot'
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
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/*,*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': `${parsedUrl.protocol}//${parsedUrl.hostname}/`,
      },
      timeout: 30000,
    }

    const req = protocol.request(options, (res) => {
      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log(`  Redirecting to: ${res.headers.location}`)
        downloadImage(res.headers.location).then(resolve).catch(reject)
        return
      }

      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`))
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
    req.on('timeout', () => {
      req.destroy()
      reject(new Error('Request timeout'))
    })
    req.end()
  })
}

async function uploadImageToSanity(buffer, filename, contentType) {
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType
  })
  return asset._id
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
  console.log('=' .repeat(70))
  console.log('FIXING PRODUCT IMAGES')
  console.log('=' .repeat(70))
  console.log(`\nProcessing ${Object.keys(productImages).length} products...\n`)

  const results = {
    success: [],
    failed: []
  }

  for (const [slug, imageData] of Object.entries(productImages)) {
    console.log(`\n📦 ${slug}`)
    console.log(`   URL: ${imageData.url.substring(0, 60)}...`)

    try {
      // Download image
      console.log('   ⬇️  Downloading...')
      const { buffer, contentType } = await downloadImage(imageData.url)
      console.log(`   ✅ Downloaded: ${buffer.length} bytes`)

      // Upload to Sanity
      console.log('   ⬆️  Uploading to Sanity...')
      const ext = contentType.includes('png') ? 'png' :
                  contentType.includes('webp') ? 'webp' : 'jpg'
      const assetId = await uploadImageToSanity(buffer, `${slug}.${ext}`, contentType)
      console.log(`   ✅ Uploaded: ${assetId}`)

      // Update product
      console.log('   🔄 Updating product...')
      const productId = await updateProductImage(slug, assetId, imageData.alt)
      console.log(`   ✅ Updated: ${productId}`)

      results.success.push(slug)
    } catch (error) {
      console.log(`   ❌ ERROR: ${error.message}`)
      results.failed.push({ slug, error: error.message, url: imageData.url })
    }

    // Small delay between requests
    await new Promise(r => setTimeout(r, 500))
  }

  // Summary
  console.log('\n' + '=' .repeat(70))
  console.log('SUMMARY')
  console.log('=' .repeat(70))

  console.log(`\n✅ Success: ${results.success.length}`)
  results.success.forEach(s => console.log(`   - ${s}`))

  if (results.failed.length > 0) {
    console.log(`\n❌ Failed: ${results.failed.length}`)
    results.failed.forEach(f => {
      console.log(`   - ${f.slug}: ${f.error}`)
      console.log(`     URL: ${f.url}`)
    })
  }

  return results
}

fixProductImages()
  .then(results => {
    if (results.failed.length === 0) {
      console.log('\n🎉 All images fixed successfully!')
    } else {
      console.log(`\n⚠️  ${results.failed.length} images need manual attention`)
    }
  })
  .catch(console.error)
