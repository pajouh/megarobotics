import { createClient } from '@sanity/client'
import fetch from 'node-fetch'

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wudur8e8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Helper to upload image from URL
async function uploadImage(url, filename) {
  try {
    console.log(`  Uploading image: ${filename}...`)
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`)
    }
    const buffer = await response.buffer()
    const asset = await client.assets.upload('image', buffer, {
      filename: filename,
    })
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    }
  } catch (error) {
    console.error(`  Failed to upload ${filename}:`, error.message)
    return null
  }
}

async function importData() {
  console.log('Starting Deep Robotics X30 import...\n')

  // 1. Create Deep Robotics manufacturer
  console.log('1. Creating Deep Robotics manufacturer...')

  const manufacturerDoc = {
    _id: 'manufacturer-deep-robotics',
    _type: 'manufacturer',
    name: 'Deep Robotics',
    slug: { _type: 'slug', current: 'deep-robotics' },
    description: {
      en: 'DEEP Robotics is a global leader in quadruped robotics, pioneering innovation and application of embodied AI. Founded in 2017 in Hangzhou, China, the company develops advanced quadruped robots for industrial inspection, rescue operations, research, and education. Their proprietary Jueying series robots have been deployed in power utilities, tunnels, hazard rescue, and public service scenarios worldwide.',
      de: 'DEEP Robotics ist ein weltweit führendes Unternehmen in der Vierbeiner-Robotik und Pionier bei Innovation und Anwendung von verkörperter KI. Das 2017 in Hangzhou, China, gegründete Unternehmen entwickelt fortschrittliche Vierbeiner-Roboter für industrielle Inspektion, Rettungseinsätze, Forschung und Bildung. Ihre proprietären Jueying-Roboter wurden in Kraftwerken, Tunneln, Gefahrenrettung und öffentlichen Diensten weltweit eingesetzt.',
    },
    website: 'https://www.deeprobotics.cn/en',
    headquarters: 'Hangzhou, China',
    founded: '2017',
    specialties: {
      en: ['Quadruped Robots', 'Industrial Inspection', 'Embodied AI', 'Motion Control', 'Rescue Robotics'],
      de: ['Vierbeiner-Roboter', 'Industrielle Inspektion', 'Verkörperte KI', 'Bewegungssteuerung', 'Rettungsrobotik'],
    },
    featured: true,
  }

  // Upload logo
  const logoUrl = 'https://www.deeprobotics.cn/public/static/robot/images/logo_.png'
  const logo = await uploadImage(logoUrl, 'deep-robotics-logo.png')
  if (logo) {
    manufacturerDoc.logo = logo
  }

  try {
    await client.createOrReplace(manufacturerDoc)
    console.log('  ✓ Deep Robotics manufacturer created\n')
  } catch (error) {
    console.error('  ✗ Failed to create manufacturer:', error.message)
    return
  }

  // 2. Create X30 product
  console.log('2. Creating X30 product...')

  // Upload main image
  const mainImageUrl = 'https://www.deeprobotics.cn/public/static/robot/demo/x30.jpg'
  const mainImage = await uploadImage(mainImageUrl, 'deep-robotics-x30-main.jpg')

  // Upload gallery images
  const galleryUrls = [
    { url: 'https://www.deeprobotics.cn/public/static/robot/demo/p1.jpg', name: 'x30-extreme-weather.jpg' },
    { url: 'https://www.deeprobotics.cn/public/static/robot/demo/p8.jpg', name: 'x30-work-efficiency.jpg' },
    { url: 'https://www.deeprobotics.cn/public/static/robot/images/nav_x30.png', name: 'x30-nav-icon.png' },
  ]

  const gallery = []
  for (const img of galleryUrls) {
    const uploaded = await uploadImage(img.url, img.name)
    if (uploaded) {
      uploaded.alt = img.name.replace(/-/g, ' ').replace('.jpg', '').replace('.png', '')
      gallery.push(uploaded)
    }
  }

  const productDoc = {
    _id: 'product-deep-robotics-x30',
    _type: 'product',
    name: 'Deep Robotics X30',
    slug: { _type: 'slug', current: 'deep-robotics-x30' },
    manufacturer: { _type: 'reference', _ref: 'manufacturer-deep-robotics' },
    category: { _type: 'reference', _ref: 'productCategory-humanoid-legged-robots' },
    tagline: {
      en: 'Industrial Quadruped Robot Born for Extreme Environments',
      de: 'Industrieller Vierbeiner-Roboter für extreme Umgebungen',
    },
    description: {
      en: 'X30 is a flagship industrial quadruped robot designed to meet core industry needs in inspection, investigation, security, surveying and mapping. With IP67 protection, operation from -20°C to 55°C, and the ability to climb 45° stairs, the X30 delivers unstoppable performance in extreme conditions. Available in X30 and X30 Pro variants.',
      de: 'X30 ist ein Flaggschiff-Vierbeiner-Industrieroboter, der für Kernbedürfnisse in Inspektion, Untersuchung, Sicherheit, Vermessung und Kartierung entwickelt wurde. Mit IP67-Schutz, Betrieb von -20°C bis 55°C und der Fähigkeit, 45°-Treppen zu erklimmen, liefert der X30 unaufhaltsame Leistung unter extremen Bedingungen. Verfügbar als X30 und X30 Pro.',
    },
    mainImage: mainImage,
    gallery: gallery,
    videoUrl: 'https://www.youtube.com/watch?v=wGE1RrTtoXM',
    specifications: [
      // X30 Standard Specs
      { label: 'Standing Size (X30)', value: '1000 × 695 × 470 mm' },
      { label: 'Standing Size (X30 Pro)', value: '1000 × 715 × 470 mm' },
      { label: 'Weight (X30)', value: '56 kg (battery included)' },
      { label: 'Weight (X30 Pro)', value: '59 kg (battery included)' },
      // Motion
      { label: 'Maximum Speed', value: '≥4 m/s' },
      { label: 'Maximum Slope', value: '≤45°' },
      { label: 'Step/Obstacle Height', value: '≥20 cm' },
      // Protection
      { label: 'Ingress Protection', value: 'IP67' },
      { label: 'Operating Temperature', value: '-20°C to 55°C' },
      // Battery
      { label: 'Endurance', value: '2.5-4 hours' },
      { label: 'Mileage', value: '≥10 km' },
      // Communication (X30)
      { label: 'Interface (X30)', value: 'Ethernet, Output power supply (72V BAT)' },
      { label: 'Interface (X30 Pro)', value: 'USB2.0, USB3.0, Ethernet, WiFi, Output power (5V, 12V, 24V)' },
      // Perception
      { label: 'Fusion Perception', value: 'Autonomous navigation in darkness, strong light, flickering' },
      { label: 'Auto-Dodge', value: 'Detects and avoids obstacles, strangers, and objects' },
    ],
    features: {
      en: [
        'Unstoppable operation in extreme weather (-20°C to 55°C)',
        'IP67 waterproof and dustproof protection',
        'Climb stairs at 45° angle with industrial stair capability',
        'Fusion perception for autonomous navigation in any lighting',
        'Auto-dodge technology to avoid obstacles and strangers',
        'Quick battery swap for extended operations',
        '25% improved endurance over previous models',
        '≥10 km range on single charge',
        'Traverse obstacles up to 20cm height',
        'Industrial-grade reliability for 24/7 operation',
      ],
      de: [
        'Unaufhaltsamer Betrieb bei extremen Wetterbedingungen (-20°C bis 55°C)',
        'IP67 wasserdicht und staubdicht',
        'Treppensteigen im 45°-Winkel mit Industrietreppen-Fähigkeit',
        'Fusionswahrnehmung für autonome Navigation bei jeder Beleuchtung',
        'Auto-Ausweich-Technologie zur Vermeidung von Hindernissen und Fremden',
        'Schneller Batteriewechsel für erweiterte Einsätze',
        '25% verbesserte Ausdauer gegenüber Vorgängermodellen',
        '≥10 km Reichweite mit einer Ladung',
        'Hindernisse bis 20cm Höhe überwinden',
        'Industrielle Zuverlässigkeit für 24/7 Betrieb',
      ],
    },
    applications: {
      en: [
        'Power & Utilities Inspection',
        'Rescue Operations',
        'Tunnel Inspection',
        'Metal & Mining Operations',
        'Construction Site Monitoring',
        'Security Patrol',
        'Surveying & Mapping',
        'Research & Education',
      ],
      de: [
        'Inspektion von Kraftwerken und Versorgungsunternehmen',
        'Rettungseinsätze',
        'Tunnelinspektion',
        'Metall- und Bergbau-Operationen',
        'Baustellenüberwachung',
        'Sicherheitspatrouille',
        'Vermessung und Kartierung',
        'Forschung und Bildung',
      ],
    },
    priceRange: 'Contact for pricing',
    availability: 'contact',
    productUrl: 'https://www.deeprobotics.cn/en/index/product3.html',
    featured: true,
    isNew: false,
    publishedAt: new Date().toISOString(),
    order: 2,
  }

  try {
    await client.createOrReplace(productDoc)
    console.log('  ✓ X30 product created\n')
  } catch (error) {
    console.error('  ✗ Failed to create product:', error.message)
    return
  }

  console.log('✅ Import complete!')
  console.log('\nProduct URL will be: https://megarobotics.de/products/deep-robotics-x30')
}

importData().catch(console.error)
