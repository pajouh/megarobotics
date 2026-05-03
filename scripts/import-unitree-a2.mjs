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
  console.log('Starting Unitree A2 import...\n')

  // Check if Unitree manufacturer already exists
  console.log('1. Checking for existing Unitree manufacturer...')
  const existingManufacturer = await client.fetch(`*[_type == "manufacturer" && slug.current == "unitree-robotics"][0]`)

  if (existingManufacturer) {
    console.log('  ✓ Unitree Robotics manufacturer already exists\n')
  } else {
    console.log('  Creating Unitree Robotics manufacturer...')
    const manufacturerDoc = {
      _id: 'manufacturer-unitree',
      _type: 'manufacturer',
      name: 'Unitree Robotics',
      slug: { _type: 'slug', current: 'unitree-robotics' },
      description: {
        en: 'Unitree Robotics is a world-leading company in the development and production of consumer and enterprise-class quadruped robots, humanoid robots, and robotic components. Founded in 2016, Unitree is committed to making advanced robotics accessible and practical for various industries and consumers.',
        de: 'Unitree Robotics ist ein weltweit führendes Unternehmen in der Entwicklung und Produktion von Verbraucher- und Unternehmens-Vierbeiner-Robotern, humanoiden Robotern und Roboterkomponenten. 2016 gegründet, setzt sich Unitree dafür ein, fortschrittliche Robotik für verschiedene Branchen und Verbraucher zugänglich und praktisch zu machen.',
      },
      website: 'https://www.unitree.com',
      headquarters: 'Hangzhou, China',
      founded: '2016',
      specialties: {
        en: ['Quadruped Robots', 'Humanoid Robots', 'Robot Actuators', 'Motion Control', 'AI Robotics'],
        de: ['Vierbeiner-Roboter', 'Humanoide Roboter', 'Roboter-Aktuatoren', 'Bewegungssteuerung', 'KI-Robotik'],
      },
      featured: true,
    }
    try {
      await client.createOrReplace(manufacturerDoc)
      console.log('  ✓ Unitree Robotics manufacturer created\n')
    } catch (error) {
      console.error('  ✗ Failed to create manufacturer:', error.message)
    }
  }

  // Get manufacturer reference
  const manufacturer = await client.fetch(`*[_type == "manufacturer" && (slug.current == "unitree-robotics" || _id == "manufacturer-unitree")][0]`)
  if (!manufacturer) {
    console.error('  ✗ Could not find Unitree manufacturer')
    return
  }

  // 2. Create A2 product
  console.log('2. Creating Unitree A2 product...')

  // Upload main image
  const mainImageUrl = 'https://www.unitree.com/images/3d0ef2032b2440e79841c86b5b5db233_3841x2952.jpg'
  const mainImage = await uploadImage(mainImageUrl, 'unitree-a2-main.jpg')

  // Upload gallery images
  const galleryUrls = [
    { url: 'https://www.unitree.com/images/a9853f90254e4809a537884a5cb75a5d_2380x1196.jpg', name: 'unitree-a2-action-1.jpg' },
    { url: 'https://www.unitree.com/images/6d08f583c53c4651b05d78db96f8cb9a_2380x1196.jpg', name: 'unitree-a2-action-2.jpg' },
    { url: 'https://www.unitree.com/images/4bdd76b2475e4401a495f9449d6f6393_2380x1196.jpg', name: 'unitree-a2-action-3.jpg' },
    { url: 'https://www.unitree.com/images/77f4f4fe22a4405397e461af8d503242_2380x1196.jpg', name: 'unitree-a2-action-4.jpg' },
    { url: 'https://www.unitree.com/images/af140d9f1e484d9ca11c4c9bc27b2d22_2380x1196.jpg', name: 'unitree-a2-action-5.jpg' },
    { url: 'https://www.unitree.com/images/182892cad68f4c90a6c344e42d020c4c_1920x1080.png', name: 'unitree-a2-perception.png' },
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
    _id: 'product-unitree-a2',
    _type: 'product',
    name: 'Unitree A2',
    slug: { _type: 'slug', current: 'unitree-a2' },
    manufacturer: { _type: 'reference', _ref: manufacturer._id },
    category: { _type: 'reference', _ref: 'productCategory-humanoid-legged-robots' },
    tagline: {
      en: 'Stellar Explorer - Agile, Swift, Industrial-Grade Quadruped',
      de: 'Stellar Explorer - Agiler, schneller, industrietauglicher Vierbeiner',
    },
    description: {
      en: 'The Unitree A2 "Stellar Explorer" is an agile and swift industrial-grade quadruped robot weighing around 37kg. With dual-sided LiDAR perception for zero blind spots, hot-swappable dual batteries for unlimited runtime, and the ability to carry 100kg standing load, the A2 is designed for logistics, industrial inspection, and emergency rescue operations. Available in A2 and A2-PRO variants with optional wheel-leg configuration.',
      de: 'Der Unitree A2 "Stellar Explorer" ist ein agiler und schneller industrietauglicher Vierbeiner-Roboter mit einem Gewicht von etwa 37 kg. Mit beidseitiger LiDAR-Wahrnehmung für null tote Winkel, Hot-Swap-fähigen Doppelbatterien für unbegrenzte Laufzeit und der Fähigkeit, 100 kg Standlast zu tragen, ist der A2 für Logistik, industrielle Inspektion und Notfallrettung konzipiert. Erhältlich als A2 und A2-PRO mit optionaler Rad-Bein-Konfiguration.',
    },
    mainImage: mainImage,
    gallery: gallery,
    videoUrl: 'https://www.youtube.com/watch?v=ve9USu7zpLU',
    specifications: [
      // Mechanical Parameters
      { label: 'Standing Size', value: '820 × 440 × 570 mm' },
      { label: 'Lying Prone Size', value: '720 × 550 × 220 mm' },
      { label: 'Material', value: 'Aluminum Alloy + High-Strength Engineering Plastic' },
      { label: 'Weight (without battery)', value: 'About 31 kg' },
      { label: 'Weight (with battery)', value: 'About 37 kg' },
      { label: 'Degrees of Freedom', value: '12 (Joint Motors)' },
      { label: 'Joint Bearings', value: 'Industrial-grade crossed roller bearings' },
      { label: 'Joint Motors', value: 'Low-inertia, high-speed inner rotor PMSM' },
      { label: 'Max Joint Torque', value: 'About 180 N.m' },
      // Electrical
      { label: 'Supply Voltage', value: '50.4V' },
      { label: 'Joint Encoder', value: 'Dual encoders' },
      { label: 'Cooling System', value: 'Local air cooling' },
      { label: 'Battery Capacity', value: 'Single: 9000mAh (453.6Wh), Dual: 18000mAh (907.2Wh)' },
      { label: 'Connectivity', value: 'Wi-Fi 6, Bluetooth 5.2' },
      { label: 'Sensor (A2)', value: 'LiDAR × 1 + HD Camera × 1' },
      { label: 'Sensor (A2-PRO)', value: 'LiDAR × 2 + HD Camera × 1' },
      { label: 'Control & Compute', value: '8-Core CPU + Intel Core i7' },
      { label: 'External Interfaces', value: 'RS485 ×2, CAN ×2, Gigabit Ethernet ×2, USB3.0-TypeC ×4' },
      { label: 'Power Output', value: '12V / 24V / BAT' },
      // Performance
      { label: 'Operating Temperature', value: '-20°C to 55°C' },
      { label: 'Battery Life (No Load)', value: '>5 hours, approx. 20 km' },
      { label: 'Battery Life (25kg Load)', value: '>3 hours, approx. 12.5 km' },
      { label: 'Max Standing Load', value: 'About 100 kg' },
      { label: 'Continuous Walking Load', value: 'About 25 kg' },
      { label: 'Slope Walking', value: 'About 45°' },
      { label: 'Max Step Height', value: '30 cm' },
      { label: 'Max Climb Height', value: 'About 0.5-1 m' },
      { label: 'Speed', value: '0-3.7 m/s (Up to ~5 m/s)' },
      { label: 'Ingress Protection (A2)', value: 'IP56' },
      { label: 'Ingress Protection (A2-PRO)', value: 'IP56-IP67 (Core components IP67)' },
      { label: 'Warranty', value: '12 Months' },
    ],
    features: {
      en: [
        'Lightweight at 37kg with extended 5-hour/20km endurance',
        'Dual-sided LiDAR perception for zero blind spots',
        'Hot-swappable dual battery system for unlimited runtime',
        '100kg maximum standing load capacity',
        'Climb steps up to 30cm and obstacles up to 1m',
        'Maximum speed up to 5 m/s',
        'Optional wheel-leg configuration for greater performance',
        '-20°C to 55°C operating temperature range',
        'Intel Core i7 + 8-Core CPU computing platform',
        'Open for rapid secondary development',
        'IP56/IP67 protection rating',
        'Wi-Fi 6 and Bluetooth 5.2 connectivity',
      ],
      de: [
        'Leichtgewicht mit 37 kg und erweiterter 5-Stunden/20 km Ausdauer',
        'Beidseitige LiDAR-Wahrnehmung für null tote Winkel',
        'Hot-Swap-fähiges Doppelbatteriesystem für unbegrenzte Laufzeit',
        '100 kg maximale Standlastkapazität',
        'Treppen bis 30 cm und Hindernisse bis 1 m erklimmen',
        'Höchstgeschwindigkeit bis zu 5 m/s',
        'Optionale Rad-Bein-Konfiguration für höhere Leistung',
        '-20°C bis 55°C Betriebstemperaturbereich',
        'Intel Core i7 + 8-Core CPU Rechenplattform',
        'Offen für schnelle Sekundärentwicklung',
        'IP56/IP67 Schutzklasse',
        'Wi-Fi 6 und Bluetooth 5.2 Konnektivität',
      ],
    },
    applications: {
      en: [
        'Industrial Inspection',
        'Logistics & Delivery',
        'Emergency Rescue',
        'Security Patrol',
        'Research & Development',
        'Construction Monitoring',
        'Mining Operations',
        'Field Exploration',
      ],
      de: [
        'Industrielle Inspektion',
        'Logistik & Lieferung',
        'Notfallrettung',
        'Sicherheitspatrouille',
        'Forschung & Entwicklung',
        'Baustellenüberwachung',
        'Bergbau-Operationen',
        'Felderkundung',
      ],
    },
    priceRange: 'Contact for pricing',
    availability: 'contact',
    productUrl: 'https://www.unitree.com/A2',
    featured: true,
    isNew: true,
    publishedAt: new Date().toISOString(),
    order: 3,
  }

  try {
    await client.createOrReplace(productDoc)
    console.log('  ✓ Unitree A2 product created\n')
  } catch (error) {
    console.error('  ✗ Failed to create product:', error.message)
    return
  }

  console.log('✅ Import complete!')
  console.log('\nProduct URL will be: https://megarobotics.de/products/unitree-a2')
}

importData().catch(console.error)
