/**
 * Add the Franka.de catalog items that were missing from the
 * MegaRobotics product list.
 *
 * Source: https://franka.de/products + https://franka.de/accessories
 * (audited manually). Existing items already in Sanity (FR3, FR3 Duo,
 * Mobile FR3 Duo, Franka GELLO & GELLO Duo, Franka Hand, Tactile Mobile
 * Robot) are left alone — they're matched by slug and skipped.
 *
 * All items use the same safety defaults as other seeded catalog
 * products:
 *   inquiryOnly: true
 *   availabilityStatus: 'sourcing_on_request'
 * No price is set. The Franka Robotics manufacturer.relationshipStatus
 * stays at 'information_only' (no distributor / authorized-reseller
 * claim implied).
 *
 * Several items are partner-made (Schmalz vacuum, Haption Virtuose,
 * Bota Systems, murrplastik, PickNik MoveIt Pro, Roboception RC_VISARD).
 * Franka resells them through franka.de so they're kept under the
 * Franka Robotics manufacturer here, with the partner attribution in
 * the description.
 *
 * Safety: dry-run by default, --apply required.
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const APPLY = process.argv.includes('--apply')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN
if (!projectId) {
  console.error('❌ NEXT_PUBLIC_SANITY_PROJECT_ID is not set')
  process.exit(1)
}
if (APPLY && !token) {
  console.error('❌ SANITY_API_TOKEN required for --apply')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

const FRANKA_MFR_ID = 'manufacturer-franka-robotics'

const PRODUCTS = [
  // ----- Software interfaces -----
  {
    slug: 'franka-control-interface-fci',
    name: 'Franka Control Interface (FCI)',
    familySlug: 'software-hmi-scada-digital-twin',
    subcategory: 'Robot programming',
    tagline: 'Low-latency real-time interface for low-level FR3 control and sensor access.',
    description:
      'Real-time control interface for Franka Research 3 — direct access to torque commands, joint positions, end-effector pose and sensor data at 1 kHz. Designed for research and AI workloads needing fine-grained control.',
    features: ['1 kHz control rate', 'Joint torque / position / velocity commands', 'C++ libfranka and ROS 2 wrappers'],
    applications: ['Research', 'Robot learning', 'Force-controlled tasks'],
  },
  {
    slug: 'franka-desk-interface',
    name: 'Franka Desk Interface',
    familySlug: 'software-hmi-scada-digital-twin',
    subcategory: 'HMI',
    tagline: 'Browser-based workflow programming environment for Franka Research 3.',
    description:
      'Graphical, no-code programming interface for the FR3 — drag-and-drop "apps" composed into tasks. Intended for rapid prototyping and demo setups.',
    features: ['Browser-based UI', 'App-based task composition', 'No SDK install required'],
    applications: ['Rapid prototyping', 'Lab demos', 'Education'],
  },
  {
    slug: 'franka-ride-interface',
    name: 'Franka RIDE Interface',
    familySlug: 'software-hmi-scada-digital-twin',
    subcategory: 'Robot programming',
    tagline: 'Research-oriented integrated development environment for FR3.',
    description:
      'Integrated environment combining Desk and FCI capabilities for research groups building experiments around Franka Research 3.',
    features: ['FCI + Desk integration', 'Experiment scaffolding', 'Built-in controllers'],
    applications: ['Robotics research', 'Robot learning experiments', 'Tactile / manipulation studies'],
  },

  // ----- End-effectors / grippers -----
  {
    slug: 'franka-cobot-pump-schmalz',
    name: 'Cobot Pump (by Schmalz)',
    familySlug: 'end-effectors-robot-tooling',
    subcategory: 'Vacuum grippers',
    tagline: 'Electric vacuum generator for handling airtight and slightly porous parts on FR3.',
    description:
      'Intelligent electric vacuum generator developed with Schmalz, sold via the Franka accessory catalog. Plug-and-play with Franka Research 3 for vacuum handling of flat and porous workpieces.',
    features: ['Electric vacuum (no compressed air)', 'Integrated control', 'Schmalz partner product'],
    applications: ['Pick-and-place', 'Sheet handling', 'Cardboard / packaging'],
  },
  {
    slug: 'franka-match-end-of-arm-platform',
    name: 'MATCH End-of-Arm Platform',
    familySlug: 'end-effectors-robot-tooling',
    subcategory: 'Tool changers',
    tagline: 'Multi-functional EOA platform for switching between vacuum and mechanical grippers.',
    description:
      'End-of-arm interface allowing one Franka Research 3 to swap between vacuum and mechanical grippers without manual reconfiguration. Used as a tool-change hub for cells running mixed tasks.',
    features: ['Vacuum + mechanical gripper support', 'Plug-and-play with FR3', 'Quick swap'],
    applications: ['Mixed pick-and-place', 'Bench cells', 'Research environments'],
  },
  {
    slug: 'franka-ecbpmi-match-vacuum-generator',
    name: 'ECBPMi MATCH Electric Vacuum Generator',
    familySlug: 'end-effectors-robot-tooling',
    subcategory: 'Vacuum grippers',
    tagline: 'Electric vacuum generator integrated with the MATCH ecosystem.',
    description:
      'Compact electric vacuum generator designed for the MATCH platform — plug-and-play vacuum handling on Franka Research 3.',
    features: ['Electric (no air supply)', 'MATCH-native integration', 'Compact form factor'],
    applications: ['Vacuum pick-and-place', 'Light handling tasks'],
  },
  {
    slug: 'franka-lwr50l-03-electric-gripper',
    name: 'LWR50L-03 Electric Parallel Gripper',
    familySlug: 'end-effectors-robot-tooling',
    subcategory: 'Electric grippers',
    tagline: 'Lightweight electric 2-finger parallel gripper compatible with MATCH.',
    description:
      'Compact electric parallel gripper for FR3 with MATCH-compatible mounting. Suitable for assembly and handling of small parts.',
    features: ['Electric drive', 'MATCH-compatible', 'Lightweight design'],
    applications: ['Small-part assembly', 'Lab automation', 'Light handling'],
  },

  // ----- Teleoperation -----
  {
    slug: 'franka-virtuose-haption',
    name: 'Virtuose 6D Force-Feedback (by Haption)',
    familySlug: 'research-education-embodied-ai',
    subcategory: 'Teleoperation systems',
    tagline: 'Six-axis haptic teleoperation device with force feedback for FR3 control.',
    description:
      'Haption Virtuose haptic device offered through the Franka accessory catalog. Provides 6-DoF position + force-feedback control for tele-manipulation studies on Franka Research 3.',
    features: ['6 degrees of freedom', 'Active force feedback', 'Haption partner product'],
    applications: ['Tele-manipulation research', 'Bilateral control studies', 'Demo / training'],
  },

  // ----- Sensors -----
  {
    slug: 'franka-rc-visard-vision-sensor',
    name: 'RC_VISARD 3D Vision Sensor',
    familySlug: 'sensors-vision-perception',
    subcategory: '3D cameras',
    tagline: 'Self-contained 3D machine vision sensor for FR3-side perception tasks.',
    description:
      'Stereo machine vision sensor (by Roboception) integrated into the Franka catalog. Generates depth data, object pose and SLAM-ready streams without an external PC.',
    features: ['On-device processing', 'Depth + RGB', 'ROS / GigE interfaces'],
    applications: ['Bin picking', '3D registration', 'Mobile manipulation'],
  },
  {
    slug: 'franka-sensone-kit-force-torque',
    name: 'SensONE Kit (6-axis force-torque sensor)',
    familySlug: 'sensors-vision-perception',
    subcategory: 'Force sensors',
    tagline: 'Compact 6-axis force-torque sensor mountable at the FR3 flange.',
    description:
      'Compact 6-axis force / torque sensor (by Bota Systems) offered as an FR3 accessory. Provides external high-bandwidth force sensing for tasks where FR3 joint torques are not sufficient.',
    features: ['6-axis F/T measurement', 'Flange mount on FR3', 'Bota Systems partner product'],
    applications: ['Force-controlled assembly', 'Polishing / deburring research', 'Contact-rich manipulation'],
  },

  // ----- Cables / mounting / cell-building -----
  {
    slug: 'franka-cable-management-murrplastik',
    name: 'Cable Management System (by murrplastik)',
    familySlug: 'spare-parts-modules-accessories',
    subcategory: 'Cables',
    tagline: 'Customized cable routing for Franka Research 3 by murrplastik.',
    description:
      'Cable management kit by murrplastik adapted to the FR3 joint layout. Protects cables during repeated motion and prevents cable wear in research cells.',
    features: ['FR3-specific routing', 'murrplastik partner kit', 'Protects against cable wear'],
    applications: ['Permanent FR3 installations', 'Cells with end-effector cabling'],
  },
  {
    slug: 'franka-gripper-extension-cable-bota',
    name: 'Gripper Extension Cable (by Bota Systems)',
    familySlug: 'spare-parts-modules-accessories',
    subcategory: 'Cables',
    tagline: 'Extension cable for Franka Hand and compatible end-effectors.',
    description:
      'Pre-assembled extension cable for the Franka Hand and other end-effectors, offered through the Franka accessory catalog (Bota Systems).',
    features: ['Bota Systems partner product', 'Franka Hand compatible', 'Plug-and-play'],
    applications: ['Custom end-effector mounts', 'Long-reach extensions'],
  },

  // ----- Software / cell design -----
  {
    slug: 'franka-machine-builder',
    name: 'Franka Machine Builder',
    familySlug: 'software-hmi-scada-digital-twin',
    subcategory: 'Simulation',
    tagline: 'Browser-based 3D design platform for FR3 robotic cells.',
    description:
      'Web-based 3D cell-design tool for laying out Franka Research 3 cells, evaluating reach and fixture placement before procurement.',
    features: ['Browser-based 3D', 'FR3 kinematic model included', 'Cell layout export'],
    applications: ['Cell design', 'Sales / quoting', 'Pre-procurement validation'],
  },
  {
    slug: 'franka-moveit-pro',
    name: 'MoveIt Pro for FR3',
    familySlug: 'software-hmi-scada-digital-twin',
    subcategory: 'Robot programming',
    tagline: 'Advanced manipulation development platform with AI capabilities for FR3.',
    description:
      'MoveIt Pro (by PickNik Robotics) configured for Franka Research 3 — production-grade motion planning, behavior trees and AI manipulation tooling.',
    features: ['Behavior-tree authoring', 'AI manipulation primitives', 'PickNik partner product'],
    applications: ['Advanced manipulation research', 'Production motion planning', 'AI-integrated cells'],
  },
]

function localized(text) {
  return { en: text, de: text }
}
function localizedArr(arr) {
  return { en: arr ?? [], de: arr ?? [] }
}

async function main() {
  console.log(`▶  Project: ${projectId}/${dataset}`)
  console.log(`▶  Mode: ${APPLY ? 'APPLY' : 'DRY-RUN'}`)
  console.log()

  // Verify Franka manufacturer + the productFamily docs we'll reference
  const mfr = await client.fetch(`*[_id == $id][0]{_id, name}`, { id: FRANKA_MFR_ID })
  if (!mfr) {
    console.error('❌ Franka Robotics manufacturer doc not found')
    process.exit(1)
  }
  console.log(`✓  Manufacturer: ${mfr.name} (${mfr._id})`)

  const families = await client.fetch(
    `*[_type == "productFamily" && slug.current in $slugs]{_id, "slug": slug.current}`,
    { slugs: [...new Set(PRODUCTS.map((p) => p.familySlug))] },
  )
  const familyId = Object.fromEntries(families.map((f) => [f.slug, f._id]))
  const missingFamilies = [...new Set(PRODUCTS.map((p) => p.familySlug))].filter((s) => !familyId[s])
  if (missingFamilies.length) {
    console.error(`❌ Missing productFamily docs: ${missingFamilies.join(', ')}`)
    process.exit(1)
  }

  // Resolve the stub category that other seeded distributor products use
  const stubCat = await client.fetch(
    `*[_type == "productCategory" && slug.current == "industrial-automation-components"][0]{_id}`,
  )

  const existing = new Set(
    await client.fetch(`*[_type == "product" && slug.current in $slugs].slug.current`, {
      slugs: PRODUCTS.map((p) => p.slug),
    }),
  )

  const toCreate = PRODUCTS.filter((p) => !existing.has(p.slug))
  console.log(`📦 ${toCreate.length} of ${PRODUCTS.length} to create (${existing.size} already exist)`)
  toCreate.forEach((p) => console.log(`     - ${p.slug.padEnd(48)} → ${p.familySlug}`))
  console.log()

  if (!APPLY) {
    console.log('To apply: re-run with --apply')
    return
  }

  let ok = 0
  let failed = 0
  for (const p of toCreate) {
    try {
      const doc = {
        _type: 'product',
        _id: `product.${p.slug}`,
        name: p.name,
        slug: { _type: 'slug', current: p.slug },
        manufacturer: { _type: 'reference', _ref: FRANKA_MFR_ID },
        productFamily: { _type: 'reference', _ref: familyId[p.familySlug] },
        subcategory: p.subcategory,
        tagline: localized(p.tagline),
        description: localized(p.description),
        features: localizedArr(p.features),
        applications: localizedArr(p.applications),
        availabilityStatus: 'sourcing_on_request',
        inquiryOnly: true,
        isActive: true,
        featured: false,
        isNew: true,
      }
      if (stubCat?._id) {
        doc.category = { _type: 'reference', _ref: stubCat._id }
      }
      await client.createIfNotExists(doc)
      console.log(`✅ ${p.slug}`)
      ok++
    } catch (err) {
      console.log(`❌ ${p.slug}: ${err.message}`)
      failed++
    }
  }
  console.log()
  console.log(`Summary: ${ok} created, ${failed} failed.`)
}

main().catch((err) => {
  console.error('❌ Script failed:', err.message)
  process.exit(1)
})
