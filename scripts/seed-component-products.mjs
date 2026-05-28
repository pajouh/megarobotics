/**
 * Seed PLC, actuator, and gripper products into Sanity for the
 * distributor catalog.
 *
 * Safe defaults (no claims implied, no prices):
 * - Every manufacturer is created with relationshipStatus = 'information_only'
 *   (zero claims of distributor/reseller/partner status).
 * - Every product is created with:
 *     inquiryOnly: true            → price hidden, "Inquiry only" badge shown
 *     availabilityStatus: 'sourcing_on_request'
 *   So nothing on the live site implies an authorized commercial
 *   relationship with these brands.
 *
 * Schema dependencies satisfied:
 * - Creates the 12 productFamily docs (slug + title only) if missing,
 *   so products can reference them and surface on
 *   /products/categories/<family>. Family page CONTENT continues to
 *   come from messages JSON (Phase B fallback path).
 * - Creates a stub productCategory "industrial-automation-components"
 *   to satisfy the existing required `category` field on product.
 *
 * Idempotent: scans existing slugs first. Skips any manufacturer,
 * family, or product that already exists.
 *
 * Safety:
 * - Dry-run by default. Prints exactly what would be created.
 * - --apply required to actually mutate.
 * - SANITY_API_TOKEN (write-scoped) required for --apply.
 *
 * Usage:
 *   node scripts/seed-component-products.mjs           # dry-run
 *   node scripts/seed-component-products.mjs --apply   # create
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
  console.error('❌ SANITY_API_TOKEN (write-scoped) is required for --apply')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

// ---------- Reference data ----------

const FAMILIES = [
  { slug: 'robot-platforms', title: 'Robot Platforms' },
  { slug: 'end-effectors-robot-tooling', title: 'End Effectors & Robot Tooling' },
  { slug: 'motion-actuators-drives', title: 'Motion, Actuators & Drives' },
  { slug: 'plc-control-industrial-automation', title: 'PLC, Control & Industrial Automation' },
  { slug: 'sensors-vision-perception', title: 'Sensors, Vision & Perception' },
  { slug: 'safety-machine-protection', title: 'Safety & Machine Protection' },
  { slug: 'industrial-communication-connectivity', title: 'Industrial Communication & Connectivity' },
  { slug: 'software-hmi-scada-digital-twin', title: 'Software, HMI, SCADA & Digital Twin' },
  { slug: 'robotic-cells-application-packages', title: 'Robotic Cells & Application Packages' },
  { slug: 'service-cleaning-facility-robots', title: 'Service, Cleaning & Facility Robots' },
  { slug: 'research-education-embodied-ai', title: 'Research, Education & Embodied AI' },
  { slug: 'spare-parts-modules-accessories', title: 'Spare Parts, Modules & Accessories' },
]

const STUB_CATEGORY = {
  slug: 'industrial-automation-components',
  name: 'Industrial Automation Components',
  description:
    'Catalog stub for distributor-listed automation components (PLCs, actuators, grippers, etc.). Products in this category live under the new product families.',
  order: 999,
}

const MANUFACTURERS = [
  {
    slug: 'siemens',
    name: 'Siemens',
    headquarters: 'Munich, Germany',
    website: 'https://www.siemens.com',
    description:
      'German multinational technology company. SIMATIC controllers and TIA Portal are widely used in European industrial automation and manufacturing.',
    specialties: ['PLC systems', 'Industrial communication', 'Drives'],
  },
  {
    slug: 'beckhoff-automation',
    name: 'Beckhoff Automation',
    headquarters: 'Verl, Germany',
    website: 'https://www.beckhoff.com',
    description:
      'German automation supplier focused on PC-based control and EtherCAT real-time industrial networking.',
    specialties: ['Industrial PCs', 'EtherCAT', 'Motion control'],
  },
  {
    slug: 'schneider-electric',
    name: 'Schneider Electric',
    headquarters: 'Rueil-Malmaison, France',
    website: 'https://www.se.com',
    description:
      'French multinational specializing in energy management and industrial automation. Modicon PLCs are used widely across European process and discrete manufacturing.',
    specialties: ['PLC systems', 'Drives', 'Power distribution'],
  },
  {
    slug: 'rockwell-automation',
    name: 'Rockwell Automation',
    headquarters: 'Milwaukee, USA',
    website: 'https://www.rockwellautomation.com',
    description:
      'US industrial automation company. Allen-Bradley ControlLogix and Studio 5000 are common in North American and global production environments.',
    specialties: ['PLC systems', 'Motion control', 'MES software'],
  },
  {
    slug: 'mitsubishi-electric',
    name: 'Mitsubishi Electric',
    headquarters: 'Tokyo, Japan',
    website: 'https://www.mitsubishielectric.com',
    description:
      'Japanese multinational supplying industrial automation, drives, robots and PLCs (MELSEC series).',
    specialties: ['PLC systems', 'Servo drives', 'Industrial robots'],
  },
  {
    slug: 'festo',
    name: 'Festo',
    headquarters: 'Esslingen am Neckar, Germany',
    website: 'https://www.festo.com',
    description:
      'German automation supplier specializing in pneumatic and electric drive technology for industrial and process automation.',
    specialties: ['Pneumatic actuators', 'Electric actuators', 'Grippers'],
  },
  {
    slug: 'smc-corporation',
    name: 'SMC Corporation',
    headquarters: 'Tokyo, Japan',
    website: 'https://www.smcworld.com',
    description:
      'Japanese pneumatic and electric automation component manufacturer with a broad catalog of cylinders, valves and actuators.',
    specialties: ['Pneumatic cylinders', 'Electric actuators', 'Valves'],
  },
  {
    slug: 'bosch-rexroth',
    name: 'Bosch Rexroth',
    headquarters: 'Lohr am Main, Germany',
    website: 'https://www.boschrexroth.com',
    description:
      'German drive and control technology supplier covering industrial hydraulics, electric drives and linear motion.',
    specialties: ['Servo drives', 'Linear motion', 'Industrial hydraulics'],
  },
  {
    slug: 'parker-hannifin',
    name: 'Parker Hannifin',
    headquarters: 'Cleveland, USA',
    website: 'https://www.parker.com',
    description:
      'US motion and control technologies manufacturer covering pneumatic, hydraulic, and electromechanical drive components.',
    specialties: ['Electric actuators', 'Pneumatics', 'Fluid power'],
  },
  {
    slug: 'iai-corporation',
    name: 'IAI Corporation',
    headquarters: 'Shizuoka, Japan',
    website: 'https://www.intelligentactuator.com',
    description:
      'Japanese specialist in electric actuators, focused on cost-effective replacement for pneumatic systems in factory automation.',
    specialties: ['Electric linear actuators', 'Cartesian robots'],
  },
  {
    slug: 'schunk',
    name: 'SCHUNK',
    headquarters: 'Lauffen am Neckar, Germany',
    website: 'https://schunk.com',
    description:
      'German specialist in gripping systems and clamping technology for industrial robots and machine tools.',
    specialties: ['Mechanical grippers', 'Tool changers', 'Clamping'],
  },
  {
    slug: 'onrobot',
    name: 'OnRobot',
    headquarters: 'Odense, Denmark',
    website: 'https://onrobot.com',
    description:
      'Danish supplier of plug-and-play end-of-arm tooling for collaborative and light industrial robots — grippers, force/torque sensors, vision.',
    specialties: ['Cobot grippers', 'Force-torque sensors', 'Vacuum tools'],
  },
  {
    slug: 'robotiq',
    name: 'Robotiq',
    headquarters: 'Lévis, Canada',
    website: 'https://robotiq.com',
    description:
      'Canadian end-of-arm tooling supplier focused on collaborative robotics — adaptive grippers, vision systems and force-controlled tools.',
    specialties: ['Adaptive grippers', 'Cobot tooling', 'Vision'],
  },
  {
    slug: 'zimmer-group',
    name: 'Zimmer Group',
    headquarters: 'Rheinau, Germany',
    website: 'https://www.zimmer-group.com',
    description:
      'German manufacturer of handling components — grippers, dampers, rotary modules — for industrial automation.',
    specialties: ['Mechanical grippers', 'Electric grippers', 'Rotary modules'],
  },
]

const PRODUCTS = [
  // ----- PLCs -----
  {
    slug: 'siemens-simatic-s7-1500',
    name: 'SIMATIC S7-1500 PLC',
    manufacturerSlug: 'siemens',
    familySlug: 'plc-control-industrial-automation',
    subcategory: 'PLC systems',
    tagline: 'Mid- to high-end PLC platform widely used in European industrial automation.',
    description:
      'Modular controller for discrete and process automation. Integrates with TIA Portal engineering, PROFINET / PROFIBUS networks and SIMATIC HMI panels.',
    features: [
      'PROFINET IRT and PROFIBUS DP support',
      'Integrated diagnostics and trace functions',
      'Optional Safety Integrated for functional safety',
    ],
    applications: ['Line control', 'Machine control', 'Robotic cell supervision'],
  },
  {
    slug: 'siemens-simatic-et-200sp',
    name: 'SIMATIC ET 200SP Distributed I/O',
    manufacturerSlug: 'siemens',
    familySlug: 'plc-control-industrial-automation',
    subcategory: 'Remote I/O',
    tagline: 'Compact distributed I/O system for PROFINET networks.',
    description:
      'Decentral I/O system designed for use with S7-1500 / S7-1200 PLCs over PROFINET. Modular, swappable in operation, supports safety modules.',
    features: ['Hot-swap I/O modules', 'Integrated safety options', 'IP20 protection'],
    applications: ['Decentral cell wiring', 'Distributed safety', 'Mixed signal collection'],
  },
  {
    slug: 'beckhoff-cx5230-industrial-pc',
    name: 'CX5230 Industrial PC',
    manufacturerSlug: 'beckhoff-automation',
    familySlug: 'plc-control-industrial-automation',
    subcategory: 'Industrial PCs / IPC',
    tagline: 'Embedded PC for TwinCAT PLC, motion and IoT applications.',
    description:
      'Fanless embedded PC running TwinCAT 3 for combined PLC, motion control and IoT gateway tasks. Direct EtherCAT integration.',
    features: ['Intel Atom-class CPU', 'EtherCAT master onboard', 'TwinCAT 3 software stack'],
    applications: ['Motion control', 'PLC consolidation', 'Edge IoT'],
  },
  {
    slug: 'schneider-modicon-m580',
    name: 'Modicon M580 ePAC',
    manufacturerSlug: 'schneider-electric',
    familySlug: 'plc-control-industrial-automation',
    subcategory: 'PLC systems',
    tagline: 'Ethernet PAC for high-availability process and infrastructure automation.',
    description:
      'Programmable Automation Controller with native EtherNet/IP backplane, suited to process industries and critical infrastructure.',
    features: ['Native EtherNet/IP backplane', 'Hot-standby redundancy', 'Cybersecurity features'],
    applications: ['Process automation', 'Water / energy infrastructure', 'Discrete production'],
  },
  {
    slug: 'rockwell-controllogix-5580',
    name: 'Allen-Bradley ControlLogix 5580',
    manufacturerSlug: 'rockwell-automation',
    familySlug: 'plc-control-industrial-automation',
    subcategory: 'PLC systems',
    tagline: 'High-performance PLC for large discrete and hybrid systems.',
    description:
      'High-capacity programmable controller designed for complex applications. Integrates with Studio 5000 engineering environment and FactoryTalk.',
    features: ['1 GB user memory option', 'Embedded EtherNet/IP', 'Integrated motion'],
    applications: ['Automotive lines', 'Large material handling', 'Multi-axis motion'],
  },

  // ----- Actuators / Drives -----
  {
    slug: 'festo-egsl-electric-slide',
    name: 'EGSL Electric Slide',
    manufacturerSlug: 'festo',
    familySlug: 'motion-actuators-drives',
    subcategory: 'Electric linear actuators',
    tagline: 'Compact electric linear actuator for precision positioning.',
    description:
      'Electric slide with integrated motor and ball-screw spindle for short, precise stroke movements in handling and assembly applications.',
    features: ['Ball-screw drive', 'Compact form factor', 'Suitable for high-precision tasks'],
    applications: ['Pick-and-place', 'Assembly support', 'Test stations'],
  },
  {
    slug: 'smc-lefb-electric-actuator',
    name: 'LEFB Series Electric Actuator',
    manufacturerSlug: 'smc-corporation',
    familySlug: 'motion-actuators-drives',
    subcategory: 'Electric linear actuators',
    tagline: 'Belt-drive electric linear actuator for long-stroke transport.',
    description:
      'Belt-driven linear actuator suited to long-stroke handling and transport in light to medium-payload automation.',
    features: ['Belt-drive long stroke', 'Multiple bus protocol options', 'Modular configuration'],
    applications: ['Material transport', 'Handling axes', 'Conveyor automation'],
  },
  {
    slug: 'bosch-rexroth-ms2n-servo-motor',
    name: 'MS2N Servo Motor',
    manufacturerSlug: 'bosch-rexroth',
    familySlug: 'motion-actuators-drives',
    subcategory: 'Servo motors',
    tagline: 'High-dynamic servo motor for ctrlX / IndraDrive systems.',
    description:
      'Servo motor with high power density and integrated digital encoder, designed for dynamic positioning tasks in industrial machinery.',
    features: ['Single-cable connectivity', 'High torque density', 'Multi-encoder options'],
    applications: ['Machine tool axes', 'Packaging machinery', 'Robotic auxiliary axes'],
  },
  {
    slug: 'parker-eth-electric-cylinder',
    name: 'ETH Electric Cylinder',
    manufacturerSlug: 'parker-hannifin',
    familySlug: 'motion-actuators-drives',
    subcategory: 'Electric linear actuators',
    tagline: 'High-force electric linear cylinder for replacing hydraulics.',
    description:
      'Electromechanical actuator with planetary roller screw, suited as a clean electric replacement for hydraulic cylinders in many press and forming tasks.',
    features: ['Planetary roller screw', 'High dynamic force', 'IP65 options'],
    applications: ['Press and forming', 'Test rigs', 'Heavy positioning'],
  },
  {
    slug: 'iai-rcp6-linear-actuator',
    name: 'RCP6 Series Linear Actuator',
    manufacturerSlug: 'iai-corporation',
    familySlug: 'motion-actuators-drives',
    subcategory: 'Electric linear actuators',
    tagline: 'Cost-effective electric linear actuator with battery-less absolute encoder.',
    description:
      'Electric linear actuator family designed as a replacement for pneumatic cylinders. Offers absolute positioning without a battery backup.',
    features: ['Battery-less absolute encoder', 'Wide stroke range', 'PROFINET / EtherCAT options'],
    applications: ['Light handling', 'Assembly automation', 'Pneumatic replacement'],
  },

  // ----- Grippers / End effectors -----
  {
    slug: 'schunk-pgn-plus-p-parallel-gripper',
    name: 'PGN-plus-P Parallel Gripper',
    manufacturerSlug: 'schunk',
    familySlug: 'end-effectors-robot-tooling',
    subcategory: 'Mechanical grippers',
    tagline: 'Universal pneumatic 2-finger parallel gripper used widely in industrial automation.',
    description:
      'Pneumatic 2-finger parallel gripper with multi-tooth guidance and a long service life. A staple for industrial handling tasks.',
    features: ['Multi-tooth guidance', 'High maximum moments', 'Many size options'],
    applications: ['Machine tending', 'Assembly handling', 'Palletizing'],
  },
  {
    slug: 'onrobot-rg2-ft-gripper',
    name: 'RG2-FT Gripper with Force-Torque',
    manufacturerSlug: 'onrobot',
    familySlug: 'end-effectors-robot-tooling',
    subcategory: 'Electric grippers',
    tagline: 'Collaborative-robot gripper with built-in 6-axis force-torque sensing.',
    description:
      'Two-finger electric gripper for collaborative robots with integrated force / torque sensor for sensitive assembly and insertion tasks.',
    features: ['Built-in F/T sensor', 'Plug-and-play with major cobot platforms', 'Up to 2 kg payload'],
    applications: ['Cobot assembly', 'Insertion / press-fit', 'Quality handling'],
  },
  {
    slug: 'robotiq-2f-85-adaptive-gripper',
    name: '2F-85 Adaptive Gripper',
    manufacturerSlug: 'robotiq',
    familySlug: 'end-effectors-robot-tooling',
    subcategory: 'Adaptive grippers',
    tagline: 'Plug-and-play adaptive gripper for collaborative robots.',
    description:
      'Two-finger adaptive electric gripper for cobots. Handles a wide range of part shapes and sizes without custom tooling.',
    features: ['85 mm stroke', 'Adaptive grip on irregular shapes', 'Direct cobot integration'],
    applications: ['Pick-and-place', 'Machine tending', 'Lab automation'],
  },
  {
    slug: 'zimmer-geh6000il-electric-gripper',
    name: 'GEH6000IL Electric Gripper',
    manufacturerSlug: 'zimmer-group',
    familySlug: 'end-effectors-robot-tooling',
    subcategory: 'Electric grippers',
    tagline: 'IO-Link electric 2-finger gripper for industrial handling.',
    description:
      'Electric 2-finger parallel gripper with IO-Link connectivity for industrial automation. Long-life design with adjustable gripping force.',
    features: ['IO-Link interface', 'Adjustable gripping force', 'Industrial-grade lifetime'],
    applications: ['Industrial pick-and-place', 'Assembly', 'Quality handling'],
  },
  {
    slug: 'festo-dhef-vacuum-gripper',
    name: 'DHEF Vacuum Gripper',
    manufacturerSlug: 'festo',
    familySlug: 'end-effectors-robot-tooling',
    subcategory: 'Vacuum grippers',
    tagline: 'Compact vacuum gripper system for picking flat and porous parts.',
    description:
      'Vacuum gripper for handling of cardboard, sheet metal, glass and other flat parts. Integrates with standard vacuum generators.',
    features: ['Modular suction cup options', 'Suits a wide part range', 'Simple mounting'],
    applications: ['Carton handling', 'Sheet handling', 'Packaging lines'],
  },
]

// ---------- Helpers ----------

function localized(text) {
  // Schema uses {en, de} objects. Write English only; coalesce falls back to en.
  return { en: text, de: text }
}

function localizedArr(arr) {
  return { en: arr, de: arr }
}

async function fetchExistingSlugs(type) {
  return new Set(
    await client.fetch(
      `*[_type == $type && defined(slug.current)].slug.current`,
      { type },
    ),
  )
}

async function fetchExistingByType(type) {
  return await client.fetch(
    `*[_type == $type && defined(slug.current)]{_id, "slug": slug.current}`,
    { type },
  )
}

// ---------- Main ----------

async function main() {
  console.log(`▶  Project: ${projectId}/${dataset}`)
  console.log(`▶  Mode: ${APPLY ? 'APPLY (will mutate)' : 'DRY-RUN (no changes)'}`)
  console.log()

  // Pre-scan existing slugs
  const existingFamilies = await fetchExistingSlugs('productFamily')
  const existingCategories = await fetchExistingSlugs('productCategory')
  const existingManufacturers = await fetchExistingSlugs('manufacturer')
  const existingProducts = await fetchExistingSlugs('product')

  console.log(`✓ Existing in Sanity: ${existingFamilies.size} families, ${existingCategories.size} categories, ${existingManufacturers.size} manufacturers, ${existingProducts.size} products`)
  console.log()

  // ----- Plan -----
  const familiesToCreate = FAMILIES.filter((f) => !existingFamilies.has(f.slug))
  const needStubCategory = !existingCategories.has(STUB_CATEGORY.slug)
  const manufacturersToCreate = MANUFACTURERS.filter((m) => !existingManufacturers.has(m.slug))
  const productsToCreate = PRODUCTS.filter((p) => !existingProducts.has(p.slug))

  console.log(`📦 Plan:`)
  console.log(`   Product families to create: ${familiesToCreate.length} of ${FAMILIES.length}`)
  if (familiesToCreate.length)
    console.log(`     ${familiesToCreate.map((f) => f.slug).join(', ')}`)
  console.log(`   Stub category to create: ${needStubCategory ? 'yes' : 'no (already exists)'}`)
  console.log(`   Manufacturers to create: ${manufacturersToCreate.length} of ${MANUFACTURERS.length}`)
  if (manufacturersToCreate.length)
    console.log(`     ${manufacturersToCreate.map((m) => m.name).join(', ')}`)
  console.log(`   Products to create: ${productsToCreate.length} of ${PRODUCTS.length}`)
  if (productsToCreate.length)
    console.log(productsToCreate.map((p) => `     - ${p.name}  (${p.manufacturerSlug} → ${p.familySlug})`).join('\n'))
  console.log()

  if (!APPLY) {
    console.log('To apply: re-run with --apply')
    console.log('Safety defaults that WILL be set on every created doc:')
    console.log('  manufacturer.relationshipStatus = "information_only"  (no claims)')
    console.log('  product.inquiryOnly = true                            (no price shown)')
    console.log('  product.availabilityStatus = "sourcing_on_request"')
    return
  }

  // ----- Apply -----

  // 1. Product families (minimal — title only; full content lives in messages JSON)
  for (const f of familiesToCreate) {
    await client.create({
      _type: 'productFamily',
      _id: `productFamily.${f.slug}`,
      title: localized(f.title),
      slug: { _type: 'slug', current: f.slug },
      isActive: true,
      order: FAMILIES.indexOf(f) * 10,
    })
    console.log(`✅ productFamily: ${f.slug}`)
  }

  // 2. Stub productCategory (required ref on product schema)
  if (needStubCategory) {
    await client.create({
      _type: 'productCategory',
      _id: `productCategory.${STUB_CATEGORY.slug}`,
      name: localized(STUB_CATEGORY.name),
      slug: { _type: 'slug', current: STUB_CATEGORY.slug },
      description: localized(STUB_CATEGORY.description),
      order: STUB_CATEGORY.order,
    })
    console.log(`✅ productCategory: ${STUB_CATEGORY.slug}`)
  }

  // 3. Manufacturers
  for (const m of manufacturersToCreate) {
    await client.create({
      _type: 'manufacturer',
      _id: `manufacturer.${m.slug}`,
      name: m.name,
      slug: { _type: 'slug', current: m.slug },
      description: localized(m.description),
      website: m.website,
      headquarters: m.headquarters,
      specialties: localizedArr(m.specialties),
      featured: false,
      relationshipStatus: 'information_only',
    })
    console.log(`✅ manufacturer: ${m.slug}  [information_only]`)
  }

  // 4. Re-fetch manufacturer + family IDs so refs resolve
  const familyRefs = Object.fromEntries(
    (await fetchExistingByType('productFamily')).map((d) => [d.slug, d._id]),
  )
  const manufacturerRefs = Object.fromEntries(
    (await fetchExistingByType('manufacturer')).map((d) => [d.slug, d._id]),
  )
  const stubCategoryId = (await fetchExistingByType('productCategory')).find(
    (d) => d.slug === STUB_CATEGORY.slug,
  )?._id

  if (!stubCategoryId) {
    console.error('❌ Stub category id not found after create — aborting product creation.')
    process.exit(1)
  }

  // 5. Products
  for (const p of productsToCreate) {
    const familyRef = familyRefs[p.familySlug]
    const mfrRef = manufacturerRefs[p.manufacturerSlug]
    if (!familyRef) {
      console.warn(`⚠  Skip ${p.slug}: family ${p.familySlug} not found in Sanity`)
      continue
    }
    if (!mfrRef) {
      console.warn(`⚠  Skip ${p.slug}: manufacturer ${p.manufacturerSlug} not found in Sanity`)
      continue
    }
    await client.create({
      _type: 'product',
      _id: `product.${p.slug}`,
      name: p.name,
      slug: { _type: 'slug', current: p.slug },
      manufacturer: { _type: 'reference', _ref: mfrRef },
      category: { _type: 'reference', _ref: stubCategoryId },
      productFamily: { _type: 'reference', _ref: familyRef },
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
    })
    console.log(`✅ product: ${p.slug}  (${p.manufacturerSlug})  [inquiry_only, sourcing_on_request]`)
  }

  console.log()
  console.log('Done. New products are LIVE within the ISR revalidate window (~60s).')
  console.log('Edit any field in Studio at /studio. To delete a product, open it')
  console.log('and use the Studio "Delete" action.')
}

main().catch((err) => {
  console.error('❌ Script failed:', err.message)
  if (err.statusCode === 409) {
    console.error('   Conflict — a doc with the same _id already exists.')
    console.error('   The script tried to create something that the pre-scan said was missing.')
    console.error('   Re-run the script — pre-scan will pick up the new state.')
  }
  process.exit(1)
})
