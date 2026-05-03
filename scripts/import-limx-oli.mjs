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
  console.log('Starting LimX Dynamics OLI import...\n')

  // Check if manufacturer exists
  console.log('1. Checking LIMX Dynamics manufacturer...')
  const existingManufacturer = await client.fetch(
    `*[_type == "manufacturer" && _id == "manufacturer-limx-dynamics"][0]`
  )

  if (existingManufacturer) {
    console.log('  ✓ LIMX Dynamics manufacturer already exists\n')
  } else {
    // Create manufacturer if not exists
    console.log('  Creating LIMX Dynamics manufacturer...')
    const manufacturerDoc = {
      _id: 'manufacturer-limx-dynamics',
      _type: 'manufacturer',
      name: 'LimX Dynamics',
      slug: { _type: 'slug', current: 'limx-dynamics' },
      description: {
        en: 'LimX Dynamics is an embodied intelligence robotics company driving the innovation of full-size general-purpose humanoid robots. Committed to disruptive technology in Embodied AI, with the mission to unlock the generalization of Artificial General Intelligence (AGI) in the real world.',
        de: 'LimX Dynamics ist ein Unternehmen für verkörperte Intelligenz in der Robotik, das die Innovation von vollwertigen Allzweck-Humanoiden vorantreibt. Das Unternehmen ist der disruptiven Technologie in der verkörperten KI verpflichtet.',
      },
      website: 'https://www.limxdynamics.com/en',
      headquarters: 'Shenzhen, China',
      founded: '2022',
      specialties: {
        en: ['Humanoid Robots', 'Embodied AI', 'Motion Control', 'Reinforcement Learning'],
        de: ['Humanoide Roboter', 'Verkörperte KI', 'Bewegungssteuerung', 'Reinforcement Learning'],
      },
      featured: true,
    }

    const logoUrl = 'https://cdn.limxdynamics.com/uploads/logo_01_1_8f987b4e79.png'
    const logo = await uploadImage(logoUrl, 'limx-dynamics-logo.png')
    if (logo) {
      manufacturerDoc.logo = logo
    }

    await client.createOrReplace(manufacturerDoc)
    console.log('  ✓ LIMX Dynamics manufacturer created\n')
  }

  // 2. Create OLI product
  console.log('2. Creating LimX OLI product...')

  // Upload main image
  const mainImageUrl = 'https://www.limxdynamics.com/static/oli/robot.png'
  const mainImage = await uploadImage(mainImageUrl, 'limx-oli-main.png')

  // Upload gallery images
  const galleryUrls = [
    { url: 'https://www.limxdynamics.com/static/oli/f1.png', name: 'oli-full-body.png' },
    { url: 'https://www.limxdynamics.com/static/oli/head.png', name: 'oli-head-2dof.png' },
    { url: 'https://www.limxdynamics.com/static/oli/arm.png', name: 'oli-arm-7dof.png' },
    { url: 'https://www.limxdynamics.com/static/oli/waist.png', name: 'oli-waist-3dof.png' },
    { url: 'https://www.limxdynamics.com/static/oli/leg.png', name: 'oli-leg-6dof.png' },
    { url: 'https://www.limxdynamics.com/static/oli/f2.png', name: 'oli-end-effectors.png' },
    { url: 'https://www.limxdynamics.com/static/oli/f4.png', name: 'oli-modular-design.png' },
    { url: 'https://www.limxdynamics.com/static/oli/hey.png', name: 'oli-developer-tools.png' },
  ]

  const gallery = []
  for (const img of galleryUrls) {
    const uploaded = await uploadImage(img.url, img.name)
    if (uploaded) {
      uploaded.alt = img.name.replace(/-/g, ' ').replace('.png', '').replace('.jpg', '')
      gallery.push(uploaded)
    }
  }

  const productDoc = {
    _id: 'product-limx-oli',
    _type: 'product',
    name: 'LimX OLI',
    slug: { _type: 'slug', current: 'limx-oli' },
    manufacturer: { _type: 'reference', _ref: 'manufacturer-limx-dynamics' },
    category: { _type: 'reference', _ref: 'productCategory-humanoid-legged-robots' },
    tagline: {
      en: 'Full-Size General-Purpose Humanoid Robot - Cross the Limits with Oli',
      de: 'Vollwertiger Allzweck-Humanoider Roboter - Grenzen überschreiten mit Oli',
    },
    description: {
      en: 'LimX OLI is a full-size general-purpose humanoid robot standing 165cm tall with 31 degrees of freedom. Featuring industry-leading motion control powered by reinforcement learning, comprehensive multi-sensor perception, and a modular design for rapid development. Available in three versions (Lite, EDU, Super) to meet different research and application needs. OLI provides an ideal platform for embodied AI research, reinforcement learning development, and humanoid robotics innovation.',
      de: 'LimX OLI ist ein vollwertiger Allzweck-Humanoider Roboter mit einer Höhe von 165cm und 31 Freiheitsgraden. Er verfügt über branchenführende Bewegungssteuerung durch Reinforcement Learning, umfassende Multi-Sensor-Wahrnehmung und ein modulares Design für schnelle Entwicklung. Erhältlich in drei Versionen (Lite, EDU, Super) für verschiedene Forschungs- und Anwendungsanforderungen. OLI bietet eine ideale Plattform für verkörperte KI-Forschung, Reinforcement Learning-Entwicklung und humanoide Robotik-Innovation.',
    },
    mainImage: mainImage,
    gallery: gallery,
    videoUrl: 'https://www.youtube.com/@LimXDynamics',
    specifications: [
      // Mechanical Parameters - EDU Version (Standard)
      { label: 'Height', value: '165cm / 5\'5" (Lite/EDU), 175cm / 5\'9" (Super)' },
      { label: 'Shoulder Width', value: '55cm / 21.7in (Lite/EDU), 60cm / 23.6in (Super)' },
      { label: 'Arm Length', value: '70cm / 27.6in (Lite/EDU), 80cm / 31.5in (Super)' },
      { label: 'Weight (Battery Included)', value: '≤55kg / 121.3lbs (Lite/EDU), ≤60kg / 132.3lbs (Super)' },
      { label: 'Maximum Load Capacity (Single Arm)', value: '3kg / 6.6lbs (Lite/EDU), 5kg / 11.0lbs (Super)' },
      { label: 'Maximum Moving Speed', value: '5 km/h' },
      { label: 'Maximum Joint Torque', value: '150 N·m (Lite/EDU), 250 N·m (Super)' },
      // Degrees of Freedom
      { label: 'Total Active DoF', value: '31 (Lite), 33 (EDU), 43 (Super)' },
      { label: 'Single Leg DoF', value: '6 DoF' },
      { label: 'Single Arm DoF', value: '7 DoF' },
      { label: 'Waist DoF', value: '3 DoF' },
      { label: 'Neck DoF', value: '2 DoF' },
      // End Effectors
      { label: 'Humanoid Hand', value: 'Standard on all versions' },
      { label: '2-Finger Gripper (1 DoF)', value: 'EDU & Super' },
      { label: '5-Finger Hand (6 DoF)', value: 'Optional (EDU), Standard (Super)' },
      // Perception Sensors
      { label: 'IMU', value: '6-Axis Self-Developed (9-Axis on Super)' },
      { label: 'Head Depth Camera', value: 'Intel RealSense D435i (EDU/Super)' },
      { label: 'Chest Depth Camera', value: 'Intel RealSense D435i (EDU/Super)' },
      { label: 'LiDAR', value: 'Super version only' },
      // Communication
      { label: 'WiFi', value: 'WiFi 6' },
      { label: 'Bluetooth', value: 'BLE 5.4' },
      { label: 'USB Ports', value: 'USB 3.0/3.2 (EDU/Super)' },
      { label: 'Ethernet', value: '1000Mbps RJ45 (EDU/Super)' },
      { label: '5G', value: 'Super version only' },
      // Power
      { label: 'Power Interfaces', value: '24V 5A, 12V 5A (EDU: x2 each, Super: x4 each)' },
      // Battery
      { label: 'Battery Capacity', value: '9,500mAh' },
      { label: 'Battery Life', value: '~2h (Lite), ~1.5h (EDU/Super)' },
      { label: 'Charger', value: '58.8V 10A' },
      { label: 'Slide-Out Battery Module', value: 'EDU (x1), Super (x2)' },
      // Computing
      { label: 'Motion Control Computing', value: 'RK3588/8G/64G (Lite/EDU), RK3588/16G/256G (Super)' },
      { label: 'Perception Computing', value: 'NVIDIA Orin NX (157 TOPS)/16G/1-2T (EDU/Super)' },
      { label: 'Computing Backpack (Optional)', value: 'NVIDIA AGX Orin, 64GB RAM, 275 TOPS' },
      // Software
      { label: 'Development Support', value: 'Full Python, Modular SDK' },
      { label: 'Simulation Platforms', value: 'NVIDIA Isaac Sim, MuJoCo, Gazebo' },
      { label: 'OTA Updates', value: 'Supported' },
      // Warranty
      { label: 'Warranty', value: '12 Months' },
    ],
    features: {
      en: [
        'Full-Size Humanoid: 165cm tall, 55kg weight with human-like proportions',
        '31 Degrees of Freedom: 7 DoF per arm, 6 DoF per leg, 3 DoF waist, 2 DoF neck',
        'Industry-Leading Motion Control: Reinforcement learning-based agile movement',
        'Multi-Sensor Fusion: 6-Axis IMU, Intel RealSense D435i depth cameras',
        'Multiple End-Effectors: Humanoid hands, grippers, optional 5-finger dexterous hands',
        'Modular Design: Fast disassembly and assembly for research flexibility',
        'Full Python Development Support with Modular SDK',
        'High-Level & Low-Level Control Interfaces',
        'Zero-Gap URDF for Sim2Real transfer',
        'Compatible with NVIDIA Isaac Sim, MuJoCo, Gazebo',
        'Voice Interaction Module (EDU/Super)',
        'OTA Updates for continuous improvements',
        'Three Versions: Lite (entry), EDU (research), Super (advanced)',
      ],
      de: [
        'Vollwertiger Humanoid: 165cm groß, 55kg Gewicht mit menschenähnlichen Proportionen',
        '31 Freiheitsgrade: 7 DoF pro Arm, 6 DoF pro Bein, 3 DoF Taille, 2 DoF Hals',
        'Branchenführende Bewegungssteuerung: Reinforcement Learning-basierte agile Bewegung',
        'Multi-Sensor-Fusion: 6-Achsen-IMU, Intel RealSense D435i Tiefenkameras',
        'Mehrere Endeffektoren: Humanoide Hände, Greifer, optionale 5-Finger-Geschicklichkeitshände',
        'Modulares Design: Schnelle Demontage und Montage für Forschungsflexibilität',
        'Vollständige Python-Entwicklungsunterstützung mit modularem SDK',
        'High-Level & Low-Level Steuerungsschnittstellen',
        'Zero-Gap URDF für Sim2Real-Transfer',
        'Kompatibel mit NVIDIA Isaac Sim, MuJoCo, Gazebo',
        'Sprachinteraktionsmodul (EDU/Super)',
        'OTA-Updates für kontinuierliche Verbesserungen',
        'Drei Versionen: Lite (Einstieg), EDU (Forschung), Super (Fortgeschritten)',
      ],
    },
    applications: {
      en: [
        'Embodied AI Research',
        'Reinforcement Learning Development',
        'Humanoid Robotics Education',
        'Bipedal Locomotion Research',
        'Human-Robot Interaction Studies',
        'Motion Capture & Imitation Learning',
        'Service Robotics Prototyping',
        'VLA (Vision-Language-Action) Training',
        'Academic Research Labs',
        'AI/ML Development Teams',
      ],
      de: [
        'Verkörperte KI-Forschung',
        'Reinforcement Learning-Entwicklung',
        'Humanoide Robotik-Ausbildung',
        'Forschung zur zweibeinigen Fortbewegung',
        'Studien zur Mensch-Roboter-Interaktion',
        'Motion Capture & Imitationslernen',
        'Serviceroboter-Prototyping',
        'VLA (Vision-Language-Action) Training',
        'Akademische Forschungslabore',
        'KI/ML-Entwicklungsteams',
      ],
    },
    priceRange: 'Contact for pricing',
    availability: 'contact',
    productUrl: 'https://www.limxdynamics.com/en/oli',
    datasheetUrl: 'https://cms.limxdynamics.com/uploads/oli_6833fcec73.pdf',
    featured: true,
    isNew: true,
    publishedAt: new Date().toISOString(),
    order: 2,
  }

  try {
    await client.createOrReplace(productDoc)
    console.log('  ✓ LimX OLI product created\n')
  } catch (error) {
    console.error('  ✗ Failed to create product:', error.message)
    return
  }

  console.log('✅ Import complete!')
  console.log('\nProduct URL will be: https://megarobotics.de/products/limx-oli')
}

importData().catch(console.error)
