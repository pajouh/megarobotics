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
  console.log('Starting LIMX Dynamics TRON2 import...\n')

  // 1. Create LIMX Dynamics manufacturer
  console.log('1. Creating LIMX Dynamics manufacturer...')

  const manufacturerDoc = {
    _id: 'manufacturer-limx-dynamics',
    _type: 'manufacturer',
    name: 'LimX Dynamics',
    slug: { _type: 'slug', current: 'limx-dynamics' },
    description: {
      en: 'LimX Dynamics is an embodied intelligence robotics company driving the innovation of full-size general-purpose humanoid robots. Committed to disruptive technology in Embodied AI, with the mission to unlock the generalization of Artificial General Intelligence (AGI) in the real world. They focus on three core technologies: hardware design and manufacturing, RL-based motion control, and embodied AI training paradigms.',
      de: 'LimX Dynamics ist ein Unternehmen für verkörperte Intelligenz in der Robotik, das die Innovation von vollwertigen Allzweck-Humanoiden vorantreibt. Das Unternehmen ist der disruptiven Technologie in der verkörperten KI verpflichtet und hat die Mission, die Generalisierung von Artificial General Intelligence (AGI) in der realen Welt zu ermöglichen. Sie konzentrieren sich auf drei Kerntechnologien: Hardware-Design und -Fertigung, RL-basierte Bewegungssteuerung und Trainingsparadigmen für verkörperte KI.',
    },
    website: 'https://www.limxdynamics.com/en',
    headquarters: 'Shenzhen, China',
    founded: '2022',
    specialties: {
      en: ['Humanoid Robots', 'Embodied AI', 'Motion Control', 'VLA Platform', 'Bipedal & Wheeled Robots'],
      de: ['Humanoide Roboter', 'Verkörperte KI', 'Bewegungssteuerung', 'VLA-Plattform', 'Zweibeiner & Radroboter'],
    },
    featured: true,
  }

  // Upload logo
  const logoUrl = 'https://cdn.limxdynamics.com/uploads/logo_01_1_8f987b4e79.png'
  const logo = await uploadImage(logoUrl, 'limx-dynamics-logo.png')
  if (logo) {
    manufacturerDoc.logo = logo
  }

  try {
    await client.createOrReplace(manufacturerDoc)
    console.log('  ✓ LIMX Dynamics manufacturer created\n')
  } catch (error) {
    console.error('  ✗ Failed to create manufacturer:', error.message)
    return
  }

  // 2. Create TRON2 product
  console.log('2. Creating TRON2 product...')

  // Upload main image
  const mainImageUrl = 'https://cdn.limxdynamics.com/uploads/Tron_2_KV_Final_789f432db1.jpg'
  const mainImage = await uploadImage(mainImageUrl, 'limx-tron2-main.jpg')

  // Upload gallery images
  const galleryUrls = [
    { url: 'https://cdn.limxdynamics.com/uploads/Frame_47_9311884d65.jpg', name: 'tron2-hero-mobile.jpg' },
    { url: 'https://cdn.limxdynamics.com/uploads/a1_b9bc2ace61.jpg', name: 'tron2-motion-control.jpg' },
    { url: 'https://cdn.limxdynamics.com/uploads/a2_ea832f76e1.jpg', name: 'tron2-7dof-arm.jpg' },
    { url: 'https://cdn.limxdynamics.com/uploads/a3_c933d9440a.jpg', name: 'tron2-perception.jpg' },
    { url: 'https://cdn.limxdynamics.com/uploads/a4_f5bcc6cde7.jpg', name: 'tron2-safety.jpg' },
    { url: 'https://cdn.limxdynamics.com/uploads/a5_851c1660e3.jpg', name: 'tron2-vla-platform.jpg' },
    { url: 'https://cdn.limxdynamics.com/uploads/10kg_8a24e81939.jpg', name: 'tron2-10kg-payload.jpg' },
    { url: 'https://cdn.limxdynamics.com/uploads/boundry_af8c6258a4.jpg', name: 'tron2-workspace.jpg' },
  ]

  const gallery = []
  for (const img of galleryUrls) {
    const uploaded = await uploadImage(img.url, img.name)
    if (uploaded) {
      uploaded.alt = img.name.replace(/-/g, ' ').replace('.jpg', '')
      gallery.push(uploaded)
    }
  }

  const productDoc = {
    _id: 'product-limx-tron2',
    _type: 'product',
    name: 'LimX TRON 2',
    slug: { _type: 'slug', current: 'limx-tron2' },
    manufacturer: { _type: 'reference', _ref: 'manufacturer-limx-dynamics' },
    category: { _type: 'reference', _ref: 'productCategory-humanoid-legged-robots' },
    tagline: {
      en: 'Multi-Form Embodied Robot with Cutting-edge Algorithms',
      de: 'Multiform-Verkörperter Roboter mit modernsten Algorithmen',
    },
    description: {
      en: 'TRON 2 is a multi-form embodied robot featuring tri-form configurations (Dual Arms, Wheeled Legs, Sole), industry-leading motion control, and an all-in-one VLA platform. With its unique modular configuration, TRON 2 lets you freely configure dual-arm, bipedal, or wheeled setups to fit your mission.',
      de: 'TRON 2 ist ein multiformer verkörperter Roboter mit drei Konfigurationen (Doppelarm, Radfahrwerk, Sohle), branchenführender Bewegungssteuerung und einer All-in-One VLA-Plattform. Mit seiner einzigartigen modularen Konfiguration können Sie TRON 2 frei für Doppelarm-, Zweibein- oder Rad-Setups konfigurieren.',
    },
    mainImage: mainImage,
    gallery: gallery,
    videoUrl: 'https://www.youtube.com/watch?v=example', // Will need actual video URL
    specifications: [
      // Mechanical Parameters
      { label: 'Material', value: 'Aluminum alloy, plastic' },
      { label: 'Degrees of Freedom (Single Arm)', value: '7 DoF' },
      { label: 'Degrees of Freedom (Single Leg)', value: '5 DoF' },
      { label: 'Active Vision Head DoF', value: '2 DoF' },
      // Dual-Arms Configuration
      { label: 'Maximum End Effector Load', value: '5kg per arm (3kg extended)' },
      { label: 'Maximum End Effector Speed', value: '5 m/s' },
      { label: 'Maximum End Effector Acceleration', value: '36 m/s²' },
      { label: 'Repeat Positioning Accuracy', value: '± 0.5mm' },
      { label: 'Teleoperation Delay', value: '100ms' },
      { label: 'End Effector Type', value: 'Gripper / Dexterous hand' },
      { label: 'Gripping Force', value: '20N Maximum' },
      { label: 'Gripping Width', value: '85mm' },
      // Sole/Wheeled Configuration
      { label: 'Maximum Movement Speed', value: 'Sole: 2-3 m/s, Wheeled: 3-5 m/s' },
      { label: 'Maximum Climbing Slope', value: 'Sole: 15°, Wheeled: 30°' },
      { label: 'Maximum Step Height', value: '20cm' },
      { label: 'Maximum Load Capacity', value: '30kg (flat ground), 20kg (stair climbing)' },
      // Electrical Parameters
      { label: 'Battery Output Voltage', value: '46.8V' },
      { label: 'Maximum Battery Power', value: '2,800W' },
      { label: 'Battery Type', value: 'Ternary lithium battery' },
      { label: 'Battery Capacity', value: '9Ah' },
      { label: 'Charging Time', value: '30min (20-80%), 54min (20-100%)' },
      // Sensor Configuration
      { label: 'Waist RGBD Camera', value: 'Yes' },
      { label: 'Head RGBD Camera', value: 'Yes (Dual-Arms only)' },
      { label: 'Wrist RGBD Camera', value: 'Yes (Dual-Arms only)' },
      { label: 'IMU', value: 'Yes' },
      // AI Computing Box
      { label: 'CPU', value: '11th Gen Intel Core i7-1165G7 @ 2.80GHz' },
      { label: 'Storage Capacity', value: '2TB' },
      // Communication Interfaces
      { label: 'Communication Ports', value: '1x Ethernet, 1x USB 3.0, 2x EtherCAT, 1x RS485' },
      { label: 'Power Output Ports', value: '12V, 24V, 48V' },
    ],
    features: {
      en: [
        'Tri-Form Configuration: Dual Arms, Wheeled Legs, or Sole',
        '7-DoF per arm with 70cm reach - largest workspace in its class',
        '10kg dual-arm payload capacity',
        'Industry-leading motion control with 100ms teleoperation latency',
        'Full-field perception with multiple RGBD cameras',
        'Active safety boundaries to prevent collisions',
        'All-in-One VLA Platform for data acquisition and training',
        'Compatible with ROS1 & ROS2, Python, C++',
        'Supports NVIDIA Isaac Sim, MuJoCo, Gazebo simulators',
        'Auto-recharging capability',
      ],
      de: [
        'Drei-Form-Konfiguration: Doppelarme, Radfahrwerk oder Sohle',
        '7 Freiheitsgrade pro Arm mit 70cm Reichweite - größter Arbeitsbereich seiner Klasse',
        '10kg Doppelarm-Nutzlastkapazität',
        'Branchenführende Bewegungssteuerung mit 100ms Teleoperationslatenz',
        'Vollfeld-Wahrnehmung mit mehreren RGBD-Kameras',
        'Aktive Sicherheitsgrenzen zur Kollisionsvermeidung',
        'All-in-One VLA-Plattform für Datenerfassung und Training',
        'Kompatibel mit ROS1 & ROS2, Python, C++',
        'Unterstützt NVIDIA Isaac Sim, MuJoCo, Gazebo Simulatoren',
        'Auto-Aufladefunktion',
      ],
    },
    applications: {
      en: [
        'Research & Development',
        'VLA/Embodied AI Training',
        'Industrial Automation',
        'Service Robotics',
        'Education & Training',
        'Teleoperation Applications',
        'Warehouse & Logistics',
        'Desktop Task Automation',
      ],
      de: [
        'Forschung & Entwicklung',
        'VLA/Verkörpertes KI-Training',
        'Industrieautomatisierung',
        'Serviceroboter',
        'Bildung & Training',
        'Teleoperationsanwendungen',
        'Lager & Logistik',
        'Desktop-Aufgabenautomatisierung',
      ],
    },
    priceRange: 'Contact for pricing',
    availability: 'contact',
    productUrl: 'https://www.limxdynamics.com/en/tron2',
    datasheetUrl: 'https://cdn.limxdynamics.com/uploads/LIMX_TRON_2_ea9823aa16.pdf',
    featured: true,
    isNew: true,
    publishedAt: new Date().toISOString(),
    order: 1,
  }

  try {
    await client.createOrReplace(productDoc)
    console.log('  ✓ TRON2 product created\n')
  } catch (error) {
    console.error('  ✗ Failed to create product:', error.message)
    return
  }

  console.log('✅ Import complete!')
  console.log('\nProduct URL will be: https://megarobotics.de/products/limx-tron2')
}

importData().catch(console.error)
