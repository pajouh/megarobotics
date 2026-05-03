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
  console.log('Starting EHang EH216-S import...\n')

  // 1. Update EHang manufacturer with more details
  console.log('1. Updating EHang manufacturer...')

  const manufacturerDoc = {
    _id: 'manufacturer-ehang',
    _type: 'manufacturer',
    name: 'EHang',
    slug: { _type: 'slug', current: 'ehang' },
    description: {
      en: 'EHang (Nasdaq: EH) is the world\'s leading advanced air mobility (AAM) technology platform company, committed to making safe, autonomous, and eco-friendly air mobility accessible to everyone. The company develops pilotless electric vertical take-off and landing (eVTOL) aircraft for aerial tourism, urban transport, logistics, and emergency services. Its flagship EH216-S holds the world\'s first type certificate for pilotless eVTOL from the Civil Aviation Administration of China.',
      de: 'EHang (Nasdaq: EH) ist das weltweit führende Technologieunternehmen für fortschrittliche Luftmobilität (AAM), das sich dafür einsetzt, sichere, autonome und umweltfreundliche Luftmobilität für alle zugänglich zu machen. Das Unternehmen entwickelt pilotenlose elektrische Senkrechtstarter (eVTOL) für Lufttourismus, Stadtverkehr, Logistik und Notfalldienste. Sein Flaggschiff EH216-S besitzt das weltweit erste Musterzulassung für pilotenlose eVTOL von der chinesischen Zivilluftfahrtbehörde.',
    },
    website: 'https://www.ehang.com',
    headquarters: 'Guangzhou, China',
    founded: '2014',
    specialties: {
      en: ['eVTOL Aircraft', 'Urban Air Mobility', 'Autonomous Flight', 'Air Taxi', 'Aerial Tourism'],
      de: ['eVTOL-Flugzeuge', 'Urbane Luftmobilität', 'Autonomer Flug', 'Lufttaxi', 'Lufttourismus'],
    },
    featured: true,
  }

  try {
    await client.createOrReplace(manufacturerDoc)
    console.log('  ✓ EHang manufacturer updated\n')
  } catch (error) {
    console.error('  ✗ Failed to update manufacturer:', error.message)
  }

  // 2. Create EH216-S product
  console.log('2. Creating EH216-S product...')

  // Upload main image
  const mainImageUrl = 'https://www.ehang.com/Public/cn/ehangweb/image/216s/216s.png'
  const mainImage = await uploadImage(mainImageUrl, 'ehang-216s-main.png')

  // Upload gallery images
  const galleryUrls = [
    { url: 'https://www.ehang.com/Public/cn/ehangweb/image/216s/4_1.jpg', name: 'eh216s-pilotless.jpg' },
    { url: 'https://www.ehang.com/Public/cn/ehangweb/image/216s/4_2.jpg', name: 'eh216s-vtol.jpg' },
    { url: 'https://www.ehang.com/Public/cn/ehangweb/image/216s/4_3.jpg', name: 'eh216s-electric.jpg' },
    { url: 'https://www.ehang.com/Public/cn/ehangweb/image/216s/9-1.jpg', name: 'eh216s-seat.jpg' },
    { url: 'https://www.ehang.com/Public/cn/ehangweb/image/216s/9-2.jpg', name: 'eh216s-gullwing.jpg' },
    { url: 'https://www.ehang.com/Public/cn/ehangweb/image/216s/9-3.jpg', name: 'eh216s-rotors.jpg' },
    { url: 'https://www.ehang.com/Public/cn/ehangweb/image/216s/9-4.jpg', name: 'eh216s-carbon-fiber.jpg' },
    { url: 'https://www.ehang.com/Public/cn/ehangweb/image/216s/9-5.jpg', name: 'eh216s-landing-gear.jpg' },
    { url: 'https://www.ehang.com/Public/cn/ehangweb/image/216s/new6.jpg', name: 'eh216s-command.jpg' },
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
    _id: 'product-ehang-216s',
    _type: 'product',
    name: 'EHang EH216-S',
    slug: { _type: 'slug', current: 'ehang-216s' },
    manufacturer: { _type: 'reference', _ref: 'manufacturer-ehang' },
    category: { _type: 'reference', _ref: 'productCategory-drones-aerial' },
    tagline: {
      en: 'World\'s First Certified Pilotless Passenger eVTOL Aircraft',
      de: 'Weltweit erstes zertifiziertes pilotenloses Passagier-eVTOL-Flugzeug',
    },
    description: {
      en: 'The EH216-S is the world\'s first commercially operational pilotless human-carrying eVTOL aircraft. Featuring 16 propellers in a coaxial dual-rotor configuration, it offers safe and eco-friendly air mobility with preset flight routes, intelligent navigation, and GNSS positioning. The aircraft holds the first type certificate, production certificate, and standard airworthiness certificate for pilotless eVTOL issued by the Civil Aviation Administration of China.',
      de: 'Der EH216-S ist das weltweit erste kommerziell betriebene pilotenlose eVTOL-Flugzeug mit Passagierbeförderung. Mit 16 Propellern in koaxialer Doppelrotor-Konfiguration bietet er sichere und umweltfreundliche Luftmobilität mit voreingestellten Flugrouten, intelligenter Navigation und GNSS-Positionierung. Das Flugzeug besitzt die erste Musterzulassung, Produktionszertifikat und Standard-Lufttüchtigkeitszertifikat für pilotenlose eVTOL der chinesischen Zivilluftfahrtbehörde.',
    },
    mainImage: mainImage,
    gallery: gallery,
    videoUrl: 'https://www.youtube.com/watch?v=LnceV95h3jE',
    specifications: [
      // Dimensions
      { label: 'Height', value: '1.93 m' },
      { label: 'Width', value: '5.73 m' },
      { label: 'Passenger Capacity', value: '2 passengers' },
      { label: 'Propellers', value: '16 (coaxial dual-rotor)' },
      // Performance
      { label: 'Maximum Takeoff Weight', value: '620 kg' },
      { label: 'Range', value: '30 km' },
      { label: 'Maximum Design Speed', value: '130 km/h' },
      { label: 'Flight Time', value: 'Up to 25 minutes' },
      // Power
      { label: 'Propulsion', value: 'Electric' },
      { label: 'Power System', value: 'Smart battery system with fast charging' },
      // Flight Systems
      { label: 'Flight Mode', value: 'Fully autonomous with preset routes' },
      { label: 'Navigation', value: 'Intelligent navigation with GNSS positioning' },
      { label: 'Take-off/Landing', value: 'Vertical (no runway required)' },
      // Safety
      { label: 'Flight Control', value: 'Multiple redundant systems with voting mechanisms' },
      { label: 'Power Redundancy', value: 'Multiple backup systems' },
      { label: 'Communications', value: 'Encrypted with independent keys' },
      { label: 'Fail-safe System', value: 'Real-time health monitoring with emergency landing' },
      // Materials
      { label: 'Construction', value: 'Lightweight carbon fiber composite' },
      { label: 'Door Design', value: 'Gull-wing doors' },
      { label: 'Seating', value: 'Ergonomic F1-inspired seats' },
      { label: 'Landing Gear', value: 'Sled-style design' },
      // Certifications
      { label: 'Type Certificate', value: 'CAAC (World\'s first for pilotless eVTOL)' },
      { label: 'Production Certificate', value: 'CAAC certified' },
      { label: 'Airworthiness Certificate', value: 'CAAC Standard Airworthiness' },
      // Operations
      { label: 'Countries of Operation', value: '21+ countries' },
      { label: 'Safe Flights Completed', value: '76,000+' },
    ],
    features: {
      en: [
        'World\'s first certified pilotless passenger eVTOL',
        'Fully autonomous flight with preset routes - no pilot required',
        'Vertical take-off and landing - no runway needed',
        'Electric propulsion for eco-friendly operation',
        '16 propellers in coaxial dual-rotor configuration',
        'Multiple redundant flight control systems',
        'Real-time health monitoring with fail-safe emergency landing',
        'Encrypted communications for security',
        'Centralized fleet management and dispatch system',
        'Gull-wing doors and F1-inspired ergonomic seating',
        'Lightweight carbon fiber construction',
        'Proven safety with 76,000+ flights in 21 countries',
      ],
      de: [
        'Weltweit erstes zertifiziertes pilotenloses Passagier-eVTOL',
        'Vollautonomer Flug mit voreingestellten Routen - kein Pilot erforderlich',
        'Vertikaler Start und Landung - keine Landebahn erforderlich',
        'Elektrischer Antrieb für umweltfreundlichen Betrieb',
        '16 Propeller in koaxialer Doppelrotor-Konfiguration',
        'Mehrfach redundante Flugsteuerungssysteme',
        'Echtzeit-Gesundheitsüberwachung mit Notlandungs-Failsafe',
        'Verschlüsselte Kommunikation für Sicherheit',
        'Zentralisiertes Flottenmanagement und Dispositionssystem',
        'Flügeltüren und F1-inspirierte ergonomische Sitze',
        'Leichte Kohlefaserkonstruktion',
        'Bewährte Sicherheit mit über 76.000 Flügen in 21 Ländern',
      ],
    },
    applications: {
      en: [
        'Aerial Tourism & Sightseeing',
        'Urban Air Taxi Services',
        'Intra-city Transportation',
        'VIP Transport',
        'Emergency Medical Services',
        'Scenic Route Flights',
        'Special Events & Entertainment',
        'Resort & Island Connectivity',
      ],
      de: [
        'Lufttourismus & Sightseeing',
        'Urbane Lufttaxi-Dienste',
        'Innerstädtischer Transport',
        'VIP-Transport',
        'Medizinische Notfalldienste',
        'Panoramaflüge',
        'Sonderveranstaltungen & Unterhaltung',
        'Resort- & Inselverbindungen',
      ],
    },
    priceRange: 'Contact for pricing',
    availability: 'contact',
    productUrl: 'https://www.ehang.com/ehang216s/',
    featured: true,
    isNew: true,
    publishedAt: new Date().toISOString(),
    order: 1,
  }

  try {
    await client.createOrReplace(productDoc)
    console.log('  ✓ EH216-S product created\n')
  } catch (error) {
    console.error('  ✗ Failed to create product:', error.message)
    return
  }

  console.log('✅ Import complete!')
  console.log('\nProduct URL will be: https://megarobotics.de/products/ehang-216s')
}

importData().catch(console.error)
