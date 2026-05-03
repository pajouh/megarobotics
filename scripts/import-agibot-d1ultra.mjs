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
  console.log('Starting AGIBOT D1 Ultra import...\n')

  // 1. Check/Create AGIBOT manufacturer
  console.log('1. Checking AGIBOT manufacturer...')
  const existingManufacturer = await client.fetch(
    `*[_type == "manufacturer" && _id == "manufacturer-agibot"][0]`
  )

  if (existingManufacturer) {
    console.log('  ✓ AGIBOT manufacturer already exists\n')
  } else {
    console.log('  Creating AGIBOT manufacturer...')
    const manufacturerDoc = {
      _id: 'manufacturer-agibot',
      _type: 'manufacturer',
      name: 'AGIBOT',
      slug: { _type: 'slug', current: 'agibot' },
      description: {
        en: 'AGIBOT (formerly Zhiyuan Robot) is a leading Chinese robotics company specializing in humanoid and quadruped robots, embodied AI, and intelligent machines. Founded in Shanghai, AGIBOT develops a wide range of robots including full-size humanoids, quadruped robots, and commercial service robots. Ranked No.1 worldwide in humanoid robot shipments by Omdia in 2025, with over 5,000 mass-produced humanoid robots delivered.',
        de: 'AGIBOT (ehemals Zhiyuan Robot) ist ein führendes chinesisches Robotikunternehmen, das sich auf humanoide und vierbeinige Roboter, verkörperte KI und intelligente Maschinen spezialisiert hat. AGIBOT mit Sitz in Shanghai entwickelt eine breite Palette von Robotern, darunter vollwertigen Humanoiden, Vierbeiner-Roboter und kommerzielle Serviceroboter. Von Omdia 2025 als Nr. 1 weltweit bei Auslieferungen humanoider Roboter eingestuft, mit über 5.000 in Serie produzierten humanoiden Robotern.',
      },
      website: 'https://www.agibot.com',
      headquarters: 'Shanghai, China',
      founded: '2023',
      specialties: {
        en: ['Humanoid Robots', 'Quadruped Robots', 'Embodied AI', 'Intelligent Manufacturing', 'Commercial Service Robots'],
        de: ['Humanoide Roboter', 'Vierbeiner-Roboter', 'Verkörperte KI', 'Intelligente Fertigung', 'Kommerzielle Serviceroboter'],
      },
      featured: true,
    }

    // Upload logo
    const logoUrl = 'https://www.agibot.com/public/static/index/en/images/logo2.png'
    const logo = await uploadImage(logoUrl, 'agibot-logo.png')
    if (logo) {
      manufacturerDoc.logo = logo
    }

    await client.createOrReplace(manufacturerDoc)
    console.log('  ✓ AGIBOT manufacturer created\n')
  }

  // 2. Create D1 Ultra product
  console.log('2. Creating AGIBOT D1 Ultra product...')

  // Upload main image (banner)
  const mainImageUrl = 'https://www.agibot.com/public/static/index/en/images/D1Ultra/proD1-banner.jpg'
  const mainImage = await uploadImage(mainImageUrl, 'agibot-d1ultra-main.jpg')

  // Upload gallery images
  const galleryUrls = [
    { url: 'https://www.agibot.com/public/static/index/en/images/D1Ultra/proD1Two-img1.jpg', name: 'd1ultra-dustproof-waterproof.jpg' },
    { url: 'https://www.agibot.com/public/static/index/en/images/D1Ultra/proD1Two-img2.jpg', name: 'd1ultra-terrain-mobility.jpg' },
    { url: 'https://www.agibot.com/public/static/index/en/images/D1Ultra/proD1Two-img3.jpg', name: 'd1ultra-high-performance-motor.jpg' },
    { url: 'https://www.agibot.com/public/static/index/en/images/D1Ultra/proD1Two-img4.jpg', name: 'd1ultra-flexible-development.jpg' },
    { url: 'https://www.agibot.com/public/static/index/en/images/D1Ultra/proD1Four-img1.jpg', name: 'd1ultra-security-inspection.jpg' },
    { url: 'https://www.agibot.com/public/static/index/en/images/D1Ultra/proD1Four-img2.jpg', name: 'd1ultra-research-education.jpg' },
    { url: 'https://www.agibot.com/public/static/index/en/images/D1Ultra/proD1Four-img3.jpg', name: 'd1ultra-special-applications.jpg' },
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
    _id: 'product-agibot-d1ultra',
    _type: 'product',
    name: 'AGIBOT D1 Ultra',
    slug: { _type: 'slug', current: 'agibot-d1ultra' },
    manufacturer: { _type: 'reference', _ref: 'manufacturer-agibot' },
    category: { _type: 'reference', _ref: 'productCategory-humanoid-legged-robots' },
    tagline: {
      en: 'Industrial-Grade Compact Quadruped Robot — Designed for Specialized and Industrial Applications',
      de: 'Kompakter Vierbeiner-Roboter in Industriequalität — Entwickelt für spezialisierte und industrielle Anwendungen',
    },
    description: {
      en: 'The AGIBOT D1 Ultra is an industrial-grade compact quadruped robot built for specialized and demanding environments. Featuring IP54 dust and water resistance, reinforcement learning-based gait control, and high-performance 48N·m peak torque motors, it handles complex terrains with ease. With a maximum speed of 3.7 m/s, stair climbing capability up to 16cm, and flexible SDK development support compatible with Isaac Sim and MuJoCo, the D1 Ultra is ideal for security inspection, special operations, research, and education.',
      de: 'Der AGIBOT D1 Ultra ist ein kompakter Vierbeiner-Roboter in Industriequalität, der für spezialisierte und anspruchsvolle Umgebungen entwickelt wurde. Mit IP54 Staub- und Wasserschutz, Reinforcement Learning-basierter Gangsteuerung und Hochleistungsmotoren mit 48 N·m Spitzendrehmoment bewältigt er komplexe Gelände mit Leichtigkeit. Mit einer Höchstgeschwindigkeit von 3,7 m/s, Treppensteigfähigkeit bis 16 cm und flexibler SDK-Entwicklungsunterstützung kompatibel mit Isaac Sim und MuJoCo ist der D1 Ultra ideal für Sicherheitsinspektion, Spezialeinsätze, Forschung und Bildung.',
    },
    mainImage: mainImage,
    gallery: gallery,
    specifications: [
      { label: 'Brand / Model', value: 'AGIBOT D1 Ultra' },
      { label: 'Product Positioning', value: 'Compact yet Powerful — Industry Grade' },
      { label: 'Standing Dimensions', value: '63 × 36 × 42 cm' },
      { label: 'Folded Dimensions', value: '67 × 43 × 15 cm' },
      { label: 'Operation & Control', value: 'Standard RL-based (Reinforcement Learning) gait control' },
      { label: 'Maximum Speed', value: '3.7 m/s (limit ~5 m/s)' },
      { label: 'Static Load Capacity', value: '≈8 kg (limit ~10 kg)' },
      { label: 'Unloaded Range (1.8 m/s)', value: '6 km' },
      { label: 'Loaded Range (5 kg)', value: '4 km' },
      { label: 'Protection Level', value: 'IP54' },
      { label: 'Stable Operating Time (Extreme Environments)', value: '200 hours' },
      { label: 'Peak Output Power (Whole Machine)', value: '~3,500 W' },
      { label: 'Joint Motor Peak Torque', value: '48 N·m' },
      { label: 'Joint Motor Peak Power Density', value: '2 kW/kg' },
      { label: 'Joint Control Mode', value: 'Dual encoding' },
      { label: 'Maximum Slope Climbing Angle', value: '≥30°' },
      { label: 'Forward/Upward Jump', value: 'Up to 35 cm above ground' },
      { label: 'Stair Climbing', value: 'Continuous stairs up to 16 cm high' },
      { label: 'Expansion Interfaces', value: 'Ethernet port, USB port, Power port (12V/24V), SBUS port, UART port' },
      { label: 'Supported Expansions', value: '3D LiDAR, depth camera, RTK module, 4G/5G module, image transmission module, follow-up module' },
      { label: 'Simulation Support', value: 'URDF modeling, Isaac Sim, MuJoCo' },
    ],
    features: {
      en: [
        'IP54 dustproof and waterproof with high-standard structural design',
        'Vacuum press-forming aluminum alloy shafts with sealed core component protection',
        'RL (Reinforcement Learning) based gait control for complex terrain adaptation',
        'Self-balancing, anti-tipping, and disturbance rejection capabilities',
        'Maximum running speed of 3.7 m/s (limit ~5 m/s)',
        'Forward/upward jumping up to 35 cm above ground',
        'Continuous stair climbing up to 16 cm step height',
        '48 N·m peak torque high-performance motors with impact resistance',
        'Dual-encoder controller — no zero-position calibration needed, ready on startup',
        'Open SDK for secondary development and payload mounting',
        'Compatible with 3D LiDAR, depth camera, RTK, 4G/5G modules',
        'URDF modeling support for Isaac Sim and MuJoCo simulation platforms',
        'Compact foldable design (67×43×15 cm folded)',
        '200 hours stable operation in extreme environments',
      ],
      de: [
        'IP54 staub- und wasserdicht mit hochwertigem Strukturdesign',
        'Vakuumgepresste Aluminiumlegierungswellen mit versiegeltem Kernkomponentenschutz',
        'RL (Reinforcement Learning) basierte Gangsteuerung für komplexe Geländeanpassung',
        'Selbstbalancierung, Kippschutz und Störungsunterdrückung',
        'Maximale Laufgeschwindigkeit von 3,7 m/s (Limit ~5 m/s)',
        'Vorwärts-/Aufwärtssprung bis 35 cm über dem Boden',
        'Kontinuierliches Treppensteigen bis 16 cm Stufenhöhe',
        '48 N·m Spitzendrehmoment Hochleistungsmotoren mit Stoßfestigkeit',
        'Dual-Encoder-Controller — keine Nullpunktkalibrierung nötig, sofort einsatzbereit',
        'Offenes SDK für Sekundärentwicklung und Nutzlastmontage',
        'Kompatibel mit 3D-LiDAR, Tiefenkamera, RTK, 4G/5G-Modulen',
        'URDF-Modellierungsunterstützung für Isaac Sim und MuJoCo Simulationsplattformen',
        'Kompaktes faltbares Design (67×43×15 cm gefaltet)',
        '200 Stunden stabiler Betrieb in extremen Umgebungen',
      ],
    },
    applications: {
      en: [
        'Security Inspection & Patrol',
        'Special Operations & Emergency Response',
        'Industrial Facility Inspection',
        'Scientific Research & Education',
        'Reinforcement Learning Development',
        'Quadruped Robotics Research',
        'Entertainment & Exhibitions',
        'Surveying & Mapping',
      ],
      de: [
        'Sicherheitsinspektion und Patrouille',
        'Spezialeinsätze und Notfallreaktion',
        'Industrielle Anlageninspektion',
        'Wissenschaftliche Forschung und Bildung',
        'Reinforcement Learning-Entwicklung',
        'Vierbeiner-Robotik-Forschung',
        'Unterhaltung und Ausstellungen',
        'Vermessung und Kartierung',
      ],
    },
    priceRange: 'Contact for pricing',
    availability: 'contact',
    productUrl: 'https://www.agibot.com/products/D1Ultra',
    featured: true,
    isNew: true,
    publishedAt: new Date().toISOString(),
    order: 3,
  }

  try {
    await client.createOrReplace(productDoc)
    console.log('  ✓ AGIBOT D1 Ultra product created\n')
  } catch (error) {
    console.error('  ✗ Failed to create product:', error.message)
    return
  }

  console.log('✅ Import complete!')
  console.log('\nProduct URL will be: https://megarobotics.de/products/agibot-d1ultra')
}

importData().catch(console.error)
