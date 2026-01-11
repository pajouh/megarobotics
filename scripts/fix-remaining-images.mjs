// Fix remaining 5 products that failed in the first script
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

// Fixed URLs found from official manufacturer websites
const productImages = {
  // Elite Robot EC66 - from eliterobots.com
  'elite-robot-ec66': {
    url: 'https://cdn.prod.website-files.com/6606a41edd35aa51454cc948/6606a41edd35aa51454cceab_EC-66-1-middle.png',
    alt: 'Elite Robot EC66 collaborative robot arm'
  },

  // Fourier GR-1 - from fftai.com
  'fourier-gr-1': {
    url: 'https://www.fftai.com/static/cms//images/x-gr1.png',
    alt: 'Fourier GR-1 humanoid robot'
  },

  // Hai Robotics ACR A42T - from hairobotics.com (using A42 image)
  'hai-robotics-acr-a42t': {
    url: 'https://www.hairobotics.com/sites/default/files/2024-11/a42-g-e6s_2_670x900.png',
    alt: 'Hai Robotics HaiPick A42 autonomous case-handling robot'
  },

  // Hai Robotics HaiPick A3 - from hairobotics.com
  'hai-robotics-haipick-a3': {
    url: 'https://www.hairobotics.com/sites/default/files/2022-09/haipick-a3-robots-overseas.png',
    alt: 'Hai Robotics HaiPick A3 picking robot'
  },

  // Hikrobot MV-CS Camera - from hikrobotics.com machine vision
  'hikrobot-mv-cs-camera': {
    url: 'https://www.hikrobotics.com/en2/source/vision/image/2022/4/26/MV-CS_016.png',
    alt: 'Hikrobot MV-CS industrial machine vision camera'
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
        let redirectUrl = res.headers.location
        // Handle relative redirects
        if (redirectUrl.startsWith('/')) {
          redirectUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}${redirectUrl}`
        }
        console.log(`  Redirecting to: ${redirectUrl}`)
        downloadImage(redirectUrl).then(resolve).catch(reject)
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

async function fixRemainingImages() {
  console.log('=' .repeat(70))
  console.log('FIXING REMAINING 5 PRODUCT IMAGES')
  console.log('=' .repeat(70))

  const results = {
    success: [],
    failed: []
  }

  for (const [slug, imageData] of Object.entries(productImages)) {
    console.log(`\n📦 ${slug}`)
    console.log(`   URL: ${imageData.url.substring(0, 70)}...`)

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
    })
  }

  return results
}

fixRemainingImages()
  .then(results => {
    if (results.failed.length === 0) {
      console.log('\n🎉 All remaining images fixed successfully!')
    }
  })
  .catch(console.error)
