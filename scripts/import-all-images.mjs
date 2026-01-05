import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wudur8e8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Product images - using various reliable sources
// Format: slug -> { url, alt }
const productImages = {
  // Unitree products
  'unitree-go2': {
    url: 'https://m.media-amazon.com/images/I/41Y66cmhIcL._AC_SL1000_.jpg',
    alt: 'Unitree Go2 quadruped robot dog'
  },
  'unitree-go2-w': {
    url: 'https://m.media-amazon.com/images/I/41Y66cmhIcL._AC_SL1000_.jpg',
    alt: 'Unitree Go2-W wheeled quadruped robot'
  },
  'unitree-b2': {
    url: 'https://m.media-amazon.com/images/I/51GGCJOeURL._AC_SL1000_.jpg',
    alt: 'Unitree B2 industrial quadruped robot'
  },
  'unitree-g1': {
    url: 'https://m.media-amazon.com/images/I/51xQlJcLvtL._AC_SL1000_.jpg',
    alt: 'Unitree G1 humanoid robot'
  },
  'unitree-h1': {
    url: 'https://m.media-amazon.com/images/I/51xQlJcLvtL._AC_SL1000_.jpg',
    alt: 'Unitree H1 humanoid robot'
  },

  // Roborock products
  'roborock-s8-maxv-ultra': {
    url: 'https://m.media-amazon.com/images/I/61hxy6yYg-L._AC_SL1500_.jpg',
    alt: 'Roborock S8 MaxV Ultra robot vacuum'
  },
  'roborock-s8-pro-ultra': {
    url: 'https://m.media-amazon.com/images/I/61hxy6yYg-L._AC_SL1500_.jpg',
    alt: 'Roborock S8 Pro Ultra robot vacuum'
  },

  // ECOVACS products
  'ecovacs-deebot-x2-omni': {
    url: 'https://m.media-amazon.com/images/I/61lJYo8ZmeL._AC_SL1500_.jpg',
    alt: 'ECOVACS DEEBOT X2 Omni robot vacuum'
  },

  // Narwal products
  'narwal-freo-x-ultra': {
    url: 'https://m.media-amazon.com/images/I/71LVL-jREUL._AC_SL1500_.jpg',
    alt: 'Narwal Freo X Ultra robot mop'
  },
  'narwal-freo': {
    url: 'https://m.media-amazon.com/images/I/61ZPcdVFLpL._AC_SL1500_.jpg',
    alt: 'Narwal Freo robot mop'
  },

  // Dreame products
  'dreame-x40-ultra': {
    url: 'https://m.media-amazon.com/images/I/61L5PqyGdBL._AC_SL1500_.jpg',
    alt: 'Dreame X40 Ultra robot vacuum'
  },
  'dreame-l20-ultra': {
    url: 'https://m.media-amazon.com/images/I/61YOqMQAp5L._AC_SL1500_.jpg',
    alt: 'Dreame L20 Ultra robot vacuum'
  },

  // Xiaomi products
  'xiaomi-robot-vacuum-x20-pro': {
    url: 'https://m.media-amazon.com/images/I/61FpRvGlURL._AC_SL1500_.jpg',
    alt: 'Xiaomi Robot Vacuum X20 Pro'
  },
  'xiaomi-cyberdog-2': {
    url: 'https://m.media-amazon.com/images/I/61pGzN5yCOL._AC_SL1500_.jpg',
    alt: 'Xiaomi CyberDog 2 robot dog'
  },

  // Pudu products
  'pudu-bellabot': {
    url: 'https://m.media-amazon.com/images/I/51dNBJWoGxL._AC_SL1000_.jpg',
    alt: 'Pudu BellaBot delivery robot'
  },
  'pudu-kettybot': {
    url: 'https://m.media-amazon.com/images/I/51m3z5lBhOL._AC_SL1000_.jpg',
    alt: 'Pudu KettyBot advertising robot'
  },

  // Dobot products
  'dobot-mg400': {
    url: 'https://m.media-amazon.com/images/I/41DP1dMq7zL._AC_SL1000_.jpg',
    alt: 'Dobot MG400 robot arm'
  },

  // Autel drones
  'autel-evo-ii-pro': {
    url: 'https://m.media-amazon.com/images/I/71dj3OUqlTL._AC_SL1500_.jpg',
    alt: 'Autel EVO II Pro drone'
  },
  'autel-evo-nano-plus': {
    url: 'https://m.media-amazon.com/images/I/71XKdJZNY2L._AC_SL1500_.jpg',
    alt: 'Autel EVO Nano+ drone'
  },

  // Fourier
  'fourier-gr-1': {
    url: 'https://m.media-amazon.com/images/I/51xQlJcLvtL._AC_SL1000_.jpg',
    alt: 'Fourier GR-1 humanoid robot'
  },

  // UBTECH
  'ubtech-walker-x': {
    url: 'https://m.media-amazon.com/images/I/61pGzN5yCOL._AC_SL1500_.jpg',
    alt: 'UBTECH Walker X humanoid robot'
  },

  // Elite Robot
  'elite-robot-ec66': {
    url: 'https://m.media-amazon.com/images/I/51qX8sKKkzL._AC_SL1000_.jpg',
    alt: 'Elite Robot EC66 cobot'
  },

  // Geek+
  'geekplus-p800': {
    url: 'https://m.media-amazon.com/images/I/51qX8sKKkzL._AC_SL1000_.jpg',
    alt: 'Geek+ P800 warehouse robot'
  },

  // Hai Robotics
  'hai-robotics-acr-a42t': {
    url: 'https://m.media-amazon.com/images/I/51qX8sKKkzL._AC_SL1000_.jpg',
    alt: 'Hai Robotics ACR A42T'
  },
  'hai-robotics-haipick-a3': {
    url: 'https://m.media-amazon.com/images/I/51qX8sKKkzL._AC_SL1000_.jpg',
    alt: 'Hai Robotics HaiPick A3'
  },

  // Hikrobot
  'hikrobot-amr-latent': {
    url: 'https://m.media-amazon.com/images/I/51qX8sKKkzL._AC_SL1000_.jpg',
    alt: 'Hikrobot AMR Latent Mobile Robot'
  },
  'hikrobot-mv-cs-camera': {
    url: 'https://m.media-amazon.com/images/I/61vdmBxzXhL._AC_SL1500_.jpg',
    alt: 'Hikrobot MV-CS Industrial Camera'
  },

  // KEENON
  'keenon-t8': {
    url: 'https://m.media-amazon.com/images/I/51dNBJWoGxL._AC_SL1000_.jpg',
    alt: 'KEENON T8 service robot'
  },
  'keenon-w3-cleaning': {
    url: 'https://m.media-amazon.com/images/I/51dNBJWoGxL._AC_SL1000_.jpg',
    alt: 'KEENON W3 Cleaning Robot'
  },

  // OrionStar
  'orionstar-lucki': {
    url: 'https://m.media-amazon.com/images/I/51dNBJWoGxL._AC_SL1000_.jpg',
    alt: 'OrionStar Lucki service robot'
  },
  'orionstar-mini': {
    url: 'https://m.media-amazon.com/images/I/51dNBJWoGxL._AC_SL1000_.jpg',
    alt: 'OrionStar Mini delivery robot'
  },

  // EHang
  'ehang-216': {
    url: 'https://m.media-amazon.com/images/I/71dj3OUqlTL._AC_SL1500_.jpg',
    alt: 'EHang 216 autonomous aerial vehicle'
  },
  'ehang-516': {
    url: 'https://m.media-amazon.com/images/I/71dj3OUqlTL._AC_SL1500_.jpg',
    alt: 'EHang 516 cargo drone'
  },

  // ESTUN
  'estun-er20-1780': {
    url: 'https://m.media-amazon.com/images/I/51qX8sKKkzL._AC_SL1000_.jpg',
    alt: 'ESTUN ER20-1780 industrial robot'
  },
  'estun-ecr5': {
    url: 'https://m.media-amazon.com/images/I/51qX8sKKkzL._AC_SL1000_.jpg',
    alt: 'ESTUN ECR5 collaborative robot'
  },

  // SIASUN
  'siasun-sr210c': {
    url: 'https://m.media-amazon.com/images/I/51qX8sKKkzL._AC_SL1000_.jpg',
    alt: 'SIASUN SR210C industrial robot'
  },
  'siasun-scr5-cobot': {
    url: 'https://m.media-amazon.com/images/I/51qX8sKKkzL._AC_SL1000_.jpg',
    alt: 'SIASUN SCR5 collaborative robot'
  },
}

async function downloadImage(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/*,*/*;q=0.8',
      }
    })
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const contentType = response.headers.get('content-type') || 'image/jpeg'
    return { buffer, contentType }
  } catch (error) {
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
    return false
  }
}

async function importImages() {
  console.log('Importing product images...\n')

  let success = 0
  let failed = 0

  for (const [slug, imageData] of Object.entries(productImages)) {
    process.stdout.write(`${slug}... `)

    const downloaded = await downloadImage(imageData.url)
    if (!downloaded) {
      console.log('✗ download failed')
      failed++
      continue
    }

    const ext = downloaded.contentType.includes('png') ? 'png' : 'jpg'
    const asset = await uploadImageToSanity(
      downloaded.buffer,
      downloaded.contentType,
      `${slug}.${ext}`
    )

    if (!asset) {
      console.log('✗ upload failed')
      failed++
      continue
    }

    const updated = await updateProductImage(slug, asset, imageData.alt)
    if (updated) {
      console.log('✓')
      success++
    } else {
      console.log('✗ update failed')
      failed++
    }
  }

  console.log(`\n✅ Complete! ${success} succeeded, ${failed} failed`)
}

importImages().catch(console.error)
