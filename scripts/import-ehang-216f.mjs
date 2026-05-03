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
  console.log('Starting EHang 216F import...\n')

  // EHang manufacturer already exists, no need to update

  // Create EH216-F product
  console.log('Creating EH216-F product...')

  // Upload main image
  const mainImageUrl = 'https://www.ehang.com/Public/cn/ehangweb/image/fire/bg.png'
  const mainImage = await uploadImage(mainImageUrl, 'ehang-216f-main.png')

  // Upload gallery images
  const galleryUrls = [
    { url: 'https://www.ehang.com/Public/cn/ehangweb/image/fire/01.jpg', name: 'eh216f-laser-aiming.jpg' },
    { url: 'https://www.ehang.com/Public/cn/ehangweb/image/fire/02.jpg', name: 'eh216f-camera.jpg' },
    { url: 'https://www.ehang.com/Public/cn/ehangweb/image/fire/03.jpg', name: 'eh216f-projectiles.jpg' },
    { url: 'https://www.ehang.com/Public/cn/ehangweb/image/fire/04.jpg', name: 'eh216f-nozzle.jpg' },
    { url: 'https://www.ehang.com/Public/cn/ehangweb/image/fire/05.jpg', name: 'eh216f-foam-tank.jpg' },
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
    _id: 'product-ehang-216f',
    _type: 'product',
    name: 'EHang EH216-F',
    slug: { _type: 'slug', current: 'ehang-216f' },
    manufacturer: { _type: 'reference', _ref: 'manufacturer-ehang' },
    category: { _type: 'reference', _ref: 'productCategory-drones-aerial' },
    tagline: {
      en: 'Intelligent Aerial Firefighting Solution for Urban High-Rise Buildings',
      de: 'Intelligente Luftfeuerbekämpfungslösung für städtische Hochhäuser',
    },
    description: {
      en: 'The EHang 216F is an intelligent aerial firefighting drone designed specifically for urban high-rise fire emergencies. Featuring a large payload capacity, quick response time, and centralized fleet management, it can carry 100L of firefighting foam and 6 fire extinguisher projectiles. With laser aiming, 10x zoom camera, and high-pressure nozzle, it provides rapid first response before ground firefighters arrive, significantly reducing response time and potential casualties.',
      de: 'Der EHang 216F ist eine intelligente Löschdrohne, die speziell für Brandnotfälle in städtischen Hochhäusern entwickelt wurde. Mit großer Nutzlastkapazität, schneller Reaktionszeit und zentralisiertem Flottenmanagement kann sie 100L Löschschaum und 6 Feuerlöscher-Projektile transportieren. Mit Laserzielsystem, 10x Zoom-Kamera und Hochdruckdüse ermöglicht sie eine schnelle Erstreaktion noch vor Eintreffen der Feuerwehr.',
    },
    mainImage: mainImage,
    gallery: gallery,
    videoUrl: 'https://www.youtube.com/watch?v=3oVlwOHszhg',
    specifications: [
      // Dimensions
      { label: 'Length', value: '7.33 m' },
      { label: 'Width', value: '5.61 m' },
      { label: 'Height', value: '2.2 m' },
      // Performance
      { label: 'Max Cruising Speed', value: '130 km/h' },
      { label: 'Designed Endurance', value: '21 minutes' },
      { label: 'Full Charge Time', value: '≤120 minutes' },
      { label: 'Max Flight Altitude', value: '600 m' },
      { label: 'Service Radius', value: '3-5 km from fire station' },
      // Firefighting Capabilities
      { label: 'Firefighting Foam Volume', value: '100 L' },
      { label: 'Fire Extinguisher Projectiles', value: '6 units' },
      { label: 'Projectile Type', value: 'ABC superfine dry powder' },
      { label: 'Spray Duration', value: '3.5 minutes' },
      { label: 'Foam Type', value: 'Microbial water-based or foam agent' },
      // Equipment
      { label: 'Camera', value: 'Visible light 10x zoom' },
      { label: 'Targeting', value: 'Laser aiming device' },
      { label: 'Nozzle', value: 'High pressure spray nozzle' },
      { label: 'Window Breaker', value: 'Integrated for air channel' },
      // Construction
      { label: 'Fuselage Material', value: 'Epoxy carbon fiber composite' },
      { label: 'Bomber Material', value: 'Aluminum alloy' },
      { label: 'Protection', value: 'Fully sealed, waterproof, dustproof' },
      { label: 'EMI Protection', value: 'Anti-electromagnetic interference' },
      // Safety
      { label: 'Redundancy', value: 'Full redundancy design (all components)' },
      { label: 'Fail-safe', value: 'Stable flight on power/GPS loss' },
      { label: 'Extinguishing Method', value: 'Slow release, atomization, total flooding' },
    ],
    features: {
      en: [
        'Purpose-built for urban high-rise firefighting',
        '100L firefighting foam capacity with 3.5-minute spray',
        '6 ABC superfine dry powder fire extinguisher projectiles',
        'Laser aiming device for precision targeting',
        '10x zoom camera for remote fire identification',
        'High-pressure nozzle for direct fire spray',
        'Integrated window breaker for air channel access',
        'Full redundancy design - all components have backups',
        'Stable flight even with power or GPS loss',
        'Distributed deployment across multiple fire stations',
        'Centralized fleet management and dispatch',
        'Quick response - arrives before ground units',
        'Epoxy carbon fiber composite construction',
        'Operates in high temperature, smoke, wind, and rain',
      ],
      de: [
        'Speziell für Hochhausbrandbekämpfung entwickelt',
        '100L Löschschaumkapazität mit 3,5-Minuten-Sprühzeit',
        '6 ABC-Superfeinpulver-Feuerlöscher-Projektile',
        'Laserzielsystem für präzises Zielen',
        '10x Zoom-Kamera für Fernidentifikation von Bränden',
        'Hochdruckdüse für direkten Feuerstrahl',
        'Integrierter Fensterdurchbrecher für Luftzugang',
        'Vollredundantes Design - alle Komponenten haben Backup',
        'Stabiler Flug auch bei Strom- oder GPS-Ausfall',
        'Verteilte Stationierung an mehreren Feuerwachen',
        'Zentralisiertes Flottenmanagement und Disposition',
        'Schnelle Reaktion - vor Bodeneinheiten vor Ort',
        'Epoxid-Kohlefaserverbund-Konstruktion',
        'Einsatz bei hohen Temperaturen, Rauch, Wind und Regen',
      ],
    },
    applications: {
      en: [
        'High-Rise Building Firefighting',
        'Urban Fire Emergency Response',
        'Fire Reconnaissance & Assessment',
        'First Responder Support',
        'Industrial Facility Fire Response',
        'Remote Area Firefighting',
        'Hazardous Environment Fire Suppression',
        'Coordinated Fleet Fire Operations',
      ],
      de: [
        'Hochhaus-Brandbekämpfung',
        'Städtische Brandnotfallreaktion',
        'Brandaufklärung & -bewertung',
        'Ersthelfer-Unterstützung',
        'Industrieanlagen-Brandbekämpfung',
        'Brandbekämpfung in abgelegenen Gebieten',
        'Brandbekämpfung in gefährlichen Umgebungen',
        'Koordinierte Flotten-Brandeinsätze',
      ],
    },
    priceRange: 'Contact for pricing',
    availability: 'contact',
    productUrl: 'https://www.ehang.com/ehang216f/',
    featured: true,
    isNew: false,
    publishedAt: new Date().toISOString(),
    order: 2,
  }

  try {
    await client.createOrReplace(productDoc)
    console.log('  ✓ EH216-F product created\n')
  } catch (error) {
    console.error('  ✗ Failed to create product:', error.message)
    return
  }

  console.log('✅ Import complete!')
  console.log('\nProduct URL will be: https://megarobotics.de/products/ehang-216f')
}

importData().catch(console.error)
