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
  console.log('Starting Dobot Magician import...\n')

  // 1. Update Dobot manufacturer with more details
  console.log('1. Updating Dobot manufacturer...')

  const manufacturerDoc = {
    _id: 'manufacturer-dobot',
    _type: 'manufacturer',
    name: 'Dobot',
    slug: { _type: 'slug', current: 'dobot' },
    description: {
      en: 'Dobot Robotics, founded in 2015, is the creator of the world\'s first desktop-grade collaborative robot. With over 68,000 collaborative robots sold to 100+ countries, Dobot offers 8 main product lines covering 0.5 to 20 kg payloads. Their Magician series won the CES 2018 Innovation Award and is used in leading educational institutions worldwide including Tsinghua University and Australian University of Technology.',
      de: 'Dobot Robotics, gegründet 2015, ist der Schöpfer des weltweit ersten Desktop-Kollaborationsroboters. Mit über 68.000 verkauften Kollaborationsrobotern in mehr als 100 Ländern bietet Dobot 8 Hauptproduktlinien mit Traglasten von 0,5 bis 20 kg. Die Magician-Serie gewann den CES 2018 Innovation Award und wird in führenden Bildungseinrichtungen weltweit eingesetzt, darunter die Tsinghua-Universität und die Australian University of Technology.',
    },
    website: 'https://www.dobot-robots.com',
    headquarters: 'Shenzhen, China',
    founded: '2015',
    specialties: {
      en: ['Collaborative Robots', 'Desktop Robot Arms', 'STEM Education', 'Industrial Cobots', 'Educational Robotics'],
      de: ['Kollaborationsroboter', 'Desktop-Roboterarme', 'MINT-Bildung', 'Industrie-Cobots', 'Bildungsrobotik'],
    },
    featured: true,
  }

  try {
    await client.createOrReplace(manufacturerDoc)
    console.log('  ✓ Dobot manufacturer updated\n')
  } catch (error) {
    console.error('  ✗ Failed to update manufacturer:', error.message)
  }

  // 2. Create Magician product
  console.log('2. Creating Dobot Magician product...')

  // Upload main image
  const mainImageUrl = 'https://www.dobot-robots.com/media/upload/header/banner-pc/Magician.jpg'
  const mainImage = await uploadImage(mainImageUrl, 'dobot-magician-main.jpg')

  // Upload gallery images
  const galleryUrls = [
    { url: 'https://www.dobot-robots.com/media/upload/industrial/pd_poster.jpg', name: 'dobot-magician-poster.jpg' },
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
    _id: 'product-dobot-magician',
    _type: 'product',
    name: 'Dobot Magician',
    slug: { _type: 'slug', current: 'dobot-magician' },
    manufacturer: { _type: 'reference', _ref: 'manufacturer-dobot' },
    category: { _type: 'reference', _ref: 'productCategory-industrial-cobots' },
    tagline: {
      en: 'Desktop Grade 4-Axis Robot for Advanced STEAM Education',
      de: 'Desktop-4-Achsen-Roboter für fortgeschrittene STEAM-Bildung',
    },
    description: {
      en: 'The Dobot Magician is the world\'s first desktop-grade 4-axis robot arm, winner of the CES 2018 Innovation Award. It can perform a wide range of tasks including 3D printing, laser engraving, calligraphy, drawing, and pick-and-place operations. With 13 interface ports for secondary development, drag-to-teach functionality, and support for multiple programming languages including visual block programming and Python, it\'s ideal for STEM education, research, and light industrial applications.',
      de: 'Der Dobot Magician ist der weltweit erste Desktop-4-Achsen-Roboterarm und Gewinner des CES 2018 Innovation Award. Er kann vielfältige Aufgaben ausführen, darunter 3D-Druck, Lasergravur, Kalligraphie, Zeichnen und Pick-and-Place-Operationen. Mit 13 Schnittstellenports für Sekundärentwicklung, Drag-to-Teach-Funktionalität und Unterstützung für mehrere Programmiersprachen einschließlich visueller Blockprogrammierung und Python ist er ideal für MINT-Bildung, Forschung und leichte Industrieanwendungen.',
    },
    mainImage: mainImage,
    gallery: gallery,
    videoUrl: 'https://vimeo.com/666091899',
    specifications: [
      // Robot Specifications
      { label: 'Number of Axes', value: '4' },
      { label: 'Payload', value: '500 g' },
      { label: 'Maximum Reach', value: '320 mm' },
      { label: 'Repeatability', value: '±0.2 mm' },
      { label: 'Communication', value: 'USB / Wi-Fi / Bluetooth' },
      { label: 'Power Supply', value: '100V - 240V, 50/60 Hz' },
      { label: 'Power Input', value: '12V / 6.5A DC' },
      { label: 'Power Consumption', value: '78W Max' },
      { label: 'Working Temperature', value: '-10°C to 60°C' },
      // Axis Movement
      { label: 'Joint 1 (Base) Range', value: '-120° to +120°' },
      { label: 'Joint 2 (Rear Arm) Range', value: '-5° to +90°' },
      { label: 'Joint 3 (Forearm) Range', value: '-15° to +90°' },
      { label: 'Joint 4 (Rotation) Range', value: '-140° to +140°' },
      { label: 'Max Speed (Joint 1-3)', value: '320°/s' },
      { label: 'Max Speed (Joint 4)', value: '480°/s' },
      // Physical
      { label: 'Net Weight', value: '3.4 kg' },
      { label: 'Gross Weight (Standard)', value: '7.2 kg' },
      { label: 'Gross Weight (Education)', value: '8.0 kg' },
      { label: 'Base Footprint', value: '158 mm × 158 mm' },
      { label: 'Materials', value: 'Aluminum Alloy 6061, ABS Engineering Plastic' },
      { label: 'Robot Mounting', value: 'Desktop' },
      // End Effectors
      { label: '3D Printer Max Size', value: '150 × 150 × 150 mm' },
      { label: '3D Print Material', value: 'PLA' },
      { label: '3D Print Resolution', value: '0.1 mm' },
      { label: 'Laser Power', value: '500 mW (405nm blue laser)' },
      { label: 'Gripper Range', value: '27.5 mm' },
      { label: 'Gripper Force', value: '8 N' },
      { label: 'Suction Cup Diameter', value: '20 mm' },
      // I/O
      { label: 'I/O Ports', value: '10 (configurable analog/PWM)' },
      { label: 'Power Outputs', value: '4 × 12V controllable' },
      { label: 'Stepper Outputs', value: '2' },
    ],
    features: {
      en: [
        'World\'s first desktop-grade 4-axis robot arm',
        'CES 2018 Innovation Award winner',
        '0.2mm positioning repeatability - industrial grade precision',
        'Drag-to-teach programming - simply move the arm to program',
        '13 interface ports for secondary development',
        'Multiple end effectors: gripper, suction cup, pen, laser, 3D printer',
        'Visual block programming with DobotBlockly',
        'Python, C++, and script programming support',
        'Multiple control methods: PC, phone, gesture, voice',
        'Wi-Fi and Bluetooth wireless connectivity',
        'Wide accessory ecosystem: rails, conveyors, vision modules',
        'Compact desktop design at only 3.4 kg',
      ],
      de: [
        'Weltweit erster Desktop-4-Achsen-Roboterarm',
        'CES 2018 Innovation Award Gewinner',
        '0,2mm Positionierungswiederholbarkeit - industrielle Präzision',
        'Drag-to-Teach-Programmierung - einfach den Arm bewegen',
        '13 Schnittstellenports für Sekundärentwicklung',
        'Mehrere Endeffektoren: Greifer, Saugnapf, Stift, Laser, 3D-Drucker',
        'Visuelle Blockprogrammierung mit DobotBlockly',
        'Python-, C++- und Skript-Programmierunterstützung',
        'Mehrere Steuerungsmethoden: PC, Telefon, Geste, Stimme',
        'Wi-Fi und Bluetooth drahtlose Konnektivität',
        'Breites Zubehör-Ökosystem: Schienen, Förderbänder, Visionsmodule',
        'Kompaktes Desktop-Design mit nur 3,4 kg',
      ],
    },
    applications: {
      en: [
        'STEM & STEAM Education',
        'Robotics Research',
        'University Curricula',
        '3D Printing & Prototyping',
        'Laser Engraving',
        'Calligraphy & Drawing',
        'Pick and Place Operations',
        'Light Industrial Automation',
        'Maker Projects',
        'AI & Machine Learning Education',
      ],
      de: [
        'MINT & STEAM-Bildung',
        'Robotik-Forschung',
        'Universitätslehrpläne',
        '3D-Druck & Prototyping',
        'Lasergravur',
        'Kalligraphie & Zeichnen',
        'Pick-and-Place-Operationen',
        'Leichte industrielle Automatisierung',
        'Maker-Projekte',
        'KI & Machine Learning Bildung',
      ],
    },
    priceRange: 'From $1,299',
    availability: 'available',
    productUrl: 'https://www.dobot-robots.com/products/education/magician.html',
    featured: true,
    isNew: false,
    publishedAt: new Date().toISOString(),
    order: 5,
  }

  try {
    await client.createOrReplace(productDoc)
    console.log('  ✓ Dobot Magician product created\n')
  } catch (error) {
    console.error('  ✗ Failed to create product:', error.message)
    return
  }

  console.log('✅ Import complete!')
  console.log('\nProduct URL will be: https://megarobotics.de/products/dobot-magician')
}

importData().catch(console.error)
