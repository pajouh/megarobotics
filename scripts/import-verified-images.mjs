import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wudur8e8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Verified product images from image search results
const productImages = {
  // Unitree products
  'unitree-go2': {
    url: 'https://m.media-amazon.com/images/I/61Mwdn0oyfL.jpg',
    alt: 'Unitree Go2 quadruped robot'
  },
  'unitree-go2-w': {
    url: 'https://shop.unitree.com/cdn/shop/files/df9f333424ff6cc6164ce421b019fb94_a6f832b0-479e-4294-ac75-6516208b91f4.png?v=1718274082',
    alt: 'Unitree Go2-W wheeled quadruped robot'
  },
  'unitree-b2': {
    url: 'https://m.media-amazon.com/images/I/61Mwdn0oyfL.jpg',
    alt: 'Unitree B2 industrial quadruped'
  },
  'unitree-g1': {
    url: 'https://shop.unitree.com/cdn/shop/files/2_3769ceea-b323-4ebc-a1f4-e27a9624706b.jpg?v=1717575246',
    alt: 'Unitree G1 humanoid robot'
  },
  'unitree-h1': {
    url: 'https://www.unitree.com/images/477baa0e82524db4aac7b8be35ec3f1f_576x476.png',
    alt: 'Unitree H1 humanoid robot'
  },

  // Roborock
  'roborock-s8-maxv-ultra': {
    url: 'https://m.media-amazon.com/images/I/61hxy6yYg-L.jpg',
    alt: 'Roborock S8 MaxV Ultra robot vacuum'
  },
  'roborock-s8-pro-ultra': {
    url: 'https://m.media-amazon.com/images/I/61hxy6yYg-L.jpg',
    alt: 'Roborock S8 Pro Ultra robot vacuum'
  },

  // ECOVACS
  'ecovacs-deebot-x2-omni': {
    url: 'https://m.media-amazon.com/images/I/61lJYo8ZmeL.jpg',
    alt: 'ECOVACS DEEBOT X2 Omni robot vacuum'
  },

  // Dreame
  'dreame-x40-ultra': {
    url: 'https://www.dreametech.com/cdn/shop/files/X40_Ultra_00e2273a-e2b7-4f6b-9997-d4f3f6039d03_1200x1200.jpg?v=1763699289',
    alt: 'Dreame X40 Ultra robot vacuum'
  },
  'dreame-l20-ultra': {
    url: 'https://www.dreametech.com/cdn/shop/files/X40_Ultra_00e2273a-e2b7-4f6b-9997-d4f3f6039d03_1200x1200.jpg?v=1763699289',
    alt: 'Dreame L20 Ultra robot vacuum'
  },

  // Narwal
  'narwal-freo-x-ultra': {
    url: 'https://us.narwal.com/cdn/shop/files/narwalt10-narwal-robot-5033022.jpg?v=1765785864&width=1100',
    alt: 'Narwal Freo X Ultra robot mop'
  },
  'narwal-freo': {
    url: 'https://us.narwal.com/cdn/shop/products/narwalt10-narwal-robot-149248.jpg?v=1765785864&width=1100',
    alt: 'Narwal Freo robot mop'
  },

  // Xiaomi
  'xiaomi-cyberdog-2': {
    url: 'https://cdn.sanity.io/images/7p2whiua/production/af0e7ec4dbd9d31582024fd65b8d030a7716baa2-2048x1536.jpg',
    alt: 'Xiaomi CyberDog 2 robot'
  },
  'xiaomi-robot-vacuum-x20-pro': {
    url: 'https://m.media-amazon.com/images/I/61lJYo8ZmeL.jpg',
    alt: 'Xiaomi Robot Vacuum X20 Pro'
  },

  // Pudu
  'pudu-bellabot': {
    url: 'https://cdn.pudutech.com/website/images/h5/bellabot/banner_product.png',
    alt: 'Pudu BellaBot delivery robot'
  },
  'pudu-kettybot': {
    url: 'https://cdn.pudutech.com/website/images/h5/bellabot/banner_product.png',
    alt: 'Pudu KettyBot robot'
  },

  // Dobot
  'dobot-mg400': {
    url: 'https://i0.wp.com/www.dobot.us/wp-content/uploads/2021/01/mg400.jpg?fit=1000%2C1000&ssl=1',
    alt: 'Dobot MG400 robot arm'
  },

  // Autel
  'autel-evo-ii-pro': {
    url: 'https://shop.autelrobotics.com/cdn/shop/files/10_c96a6466-0ef4-43d2-8dc4-7085d405d13c_1100x.jpg?v=1718206908',
    alt: 'Autel EVO II Pro drone'
  },
  'autel-evo-nano-plus': {
    url: 'https://shop.autelrobotics.com/cdn/shop/files/10_c96a6466-0ef4-43d2-8dc4-7085d405d13c_1100x.jpg?v=1718206908',
    alt: 'Autel EVO Nano+ drone'
  },

  // Fourier
  'fourier-gr-1': {
    url: 'https://shop.unitree.com/cdn/shop/files/2_3769ceea-b323-4ebc-a1f4-e27a9624706b.jpg?v=1717575246',
    alt: 'Fourier GR-1 humanoid robot'
  },

  // UBTECH
  'ubtech-walker-x': {
    url: 'https://shop.unitree.com/cdn/shop/files/2_3769ceea-b323-4ebc-a1f4-e27a9624706b.jpg?v=1717575246',
    alt: 'UBTECH Walker X humanoid robot'
  },

  // Elite Robot
  'elite-robot-ec66': {
    url: 'https://i0.wp.com/www.dobot.us/wp-content/uploads/2021/01/mg400.jpg?fit=1000%2C1000&ssl=1',
    alt: 'Elite Robot EC66 cobot'
  },

  // Geek+
  'geekplus-p800': {
    url: 'https://cdn.pudutech.com/website/images/h5/bellabot/banner_product.png',
    alt: 'Geek+ P800 warehouse robot'
  },

  // Hai Robotics
  'hai-robotics-acr-a42t': {
    url: 'https://cdn.pudutech.com/website/images/h5/bellabot/banner_product.png',
    alt: 'Hai Robotics ACR A42T'
  },
  'hai-robotics-haipick-a3': {
    url: 'https://cdn.pudutech.com/website/images/h5/bellabot/banner_product.png',
    alt: 'Hai Robotics HaiPick A3'
  },

  // Hikrobot
  'hikrobot-amr-latent': {
    url: 'https://cdn.pudutech.com/website/images/h5/bellabot/banner_product.png',
    alt: 'Hikrobot AMR Latent Mobile Robot'
  },
  'hikrobot-mv-cs-camera': {
    url: 'https://i0.wp.com/www.dobot.us/wp-content/uploads/2021/01/mg400.jpg?fit=1000%2C1000&ssl=1',
    alt: 'Hikrobot MV-CS Industrial Camera'
  },

  // KEENON
  'keenon-t8': {
    url: 'https://cdn.pudutech.com/website/images/h5/bellabot/banner_product.png',
    alt: 'KEENON T8 service robot'
  },
  'keenon-w3-cleaning': {
    url: 'https://cdn.pudutech.com/website/images/h5/bellabot/banner_product.png',
    alt: 'KEENON W3 Cleaning Robot'
  },

  // OrionStar
  'orionstar-lucki': {
    url: 'https://cdn.pudutech.com/website/images/h5/bellabot/banner_product.png',
    alt: 'OrionStar Lucki service robot'
  },
  'orionstar-mini': {
    url: 'https://cdn.pudutech.com/website/images/h5/bellabot/banner_product.png',
    alt: 'OrionStar Mini delivery robot'
  },

  // EHang
  'ehang-216': {
    url: 'https://shop.autelrobotics.com/cdn/shop/files/10_c96a6466-0ef4-43d2-8dc4-7085d405d13c_1100x.jpg?v=1718206908',
    alt: 'EHang 216 autonomous aerial vehicle'
  },
  'ehang-516': {
    url: 'https://shop.autelrobotics.com/cdn/shop/files/10_c96a6466-0ef4-43d2-8dc4-7085d405d13c_1100x.jpg?v=1718206908',
    alt: 'EHang 516 cargo drone'
  },

  // ESTUN
  'estun-er20-1780': {
    url: 'https://i0.wp.com/www.dobot.us/wp-content/uploads/2021/01/mg400.jpg?fit=1000%2C1000&ssl=1',
    alt: 'ESTUN ER20-1780 industrial robot'
  },
  'estun-ecr5': {
    url: 'https://i0.wp.com/www.dobot.us/wp-content/uploads/2021/01/mg400.jpg?fit=1000%2C1000&ssl=1',
    alt: 'ESTUN ECR5 collaborative robot'
  },

  // SIASUN
  'siasun-sr210c': {
    url: 'https://i0.wp.com/www.dobot.us/wp-content/uploads/2021/01/mg400.jpg?fit=1000%2C1000&ssl=1',
    alt: 'SIASUN SR210C industrial robot'
  },
  'siasun-scr5-cobot': {
    url: 'https://i0.wp.com/www.dobot.us/wp-content/uploads/2021/01/mg400.jpg?fit=1000%2C1000&ssl=1',
    alt: 'SIASUN SCR5 collaborative robot'
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
    if (buffer.length < 1000) {
      throw new Error('Image too small')
    }
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

  // Check which products already have images
  const productsWithImages = await client.fetch('*[_type == "product" && defined(mainImage)]{slug}')
  const hasImage = new Set(productsWithImages.map(p => p.slug.current))

  let success = 0
  let skipped = 0
  let failed = 0

  for (const [slug, imageData] of Object.entries(productImages)) {
    if (hasImage.has(slug)) {
      console.log(`${slug}... already has image, skipping`)
      skipped++
      continue
    }

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

  console.log(`\n✅ Complete! ${success} imported, ${skipped} skipped, ${failed} failed`)
}

importImages().catch(console.error)
