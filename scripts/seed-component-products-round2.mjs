/**
 * Round 2: fill the previously empty families with well-known products.
 *
 * Adds:
 * - 6 new manufacturers (SICK, Keyence, Pilz, Hilscher, Hirschmann,
 *   Inductive Automation)
 * - 14 new products covering 4 families that had no entries after
 *   round 1: sensors-vision-perception, safety-machine-protection,
 *   industrial-communication-connectivity, software-hmi-scada-digital-twin
 *
 * Same safety defaults as round 1:
 * - manufacturer.relationshipStatus = "information_only"  (no claims)
 * - product.inquiryOnly = true                            (no price)
 * - product.availabilityStatus = "sourcing_on_request"
 *
 * Re-uses productFamily and stub productCategory created by round 1.
 * Idempotent — skips any slug that already exists.
 *
 * Usage:
 *   node scripts/seed-component-products-round2.mjs           # dry-run
 *   node scripts/seed-component-products-round2.mjs --apply
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

const STUB_CATEGORY_SLUG = 'industrial-automation-components'

const MANUFACTURERS = [
  {
    slug: 'sick',
    name: 'SICK',
    headquarters: 'Waldkirch, Germany',
    website: 'https://www.sick.com',
    description:
      'German sensor and safety solution manufacturer. Widely used industrial sensors, vision systems, safety scanners and identification products.',
    specialties: ['Industrial sensors', 'Safety scanners', '3D vision'],
  },
  {
    slug: 'keyence',
    name: 'Keyence',
    headquarters: 'Osaka, Japan',
    website: 'https://www.keyence.com',
    description:
      'Japanese supplier of sensors, vision systems, measuring instruments and laser markers used widely in factory automation.',
    specialties: ['Vision systems', 'Sensors', 'Measurement'],
  },
  {
    slug: 'pilz',
    name: 'Pilz',
    headquarters: 'Ostfildern, Germany',
    website: 'https://www.pilz.com',
    description:
      'German specialist in functional safety: safety controllers, sensor technology, safety relays and CE-conformity services.',
    specialties: ['Functional safety', 'Safety controllers', 'CE coordination'],
  },
  {
    slug: 'hilscher',
    name: 'Hilscher',
    headquarters: 'Hattersheim, Germany',
    website: 'https://www.hilscher.com',
    description:
      'German industrial communication technology supplier. netX-based modules and gateways for the major real-time Ethernet protocols.',
    specialties: ['Industrial communication', 'Real-time Ethernet', 'Gateways'],
  },
  {
    slug: 'hirschmann',
    name: 'Hirschmann (Belden)',
    headquarters: 'Neckartenzlingen, Germany',
    website: 'https://www.belden.com/brands/hirschmann',
    description:
      'German manufacturer of industrial network infrastructure — managed and unmanaged Ethernet switches, security appliances and wireless products. Part of Belden.',
    specialties: ['Industrial Ethernet', 'Network security', 'Wireless'],
  },
  {
    slug: 'inductive-automation',
    name: 'Inductive Automation',
    headquarters: 'Folsom, USA',
    website: 'https://inductiveautomation.com',
    description:
      'US software vendor focused on Ignition — a SCADA, HMI, MES and IIoT platform built on a web technology stack with unlimited licensing.',
    specialties: ['SCADA', 'HMI', 'IIoT platform'],
  },
]

const PRODUCTS = [
  // ----- Sensors / Vision -----
  {
    slug: 'sick-w4f-2-photoelectric-sensor',
    name: 'SICK W4F-2 Photoelectric Sensor',
    manufacturerSlug: 'sick',
    familySlug: 'sensors-vision-perception',
    subcategory: 'Photoelectric sensors',
    tagline: 'Compact photoelectric sensor with high optical performance for industrial detection.',
    description:
      'Photoelectric sensor for reliable object detection in conveyor, packaging and material handling applications. IO-Link option.',
    features: ['IO-Link interface', 'Compact housing', 'High switching frequency'],
    applications: ['Object presence', 'Counting', 'Position detection'],
  },
  {
    slug: 'sick-visionary-s-3d-camera',
    name: 'SICK Visionary-S 3D Camera',
    manufacturerSlug: 'sick',
    familySlug: 'sensors-vision-perception',
    subcategory: '3D cameras',
    tagline: 'Snapshot 3D camera for high-resolution depth data.',
    description:
      'Stereo-based 3D camera for capturing depth and color data in factory automation, logistics and bin-picking applications.',
    features: ['Snapshot 3D imaging', 'GigE Vision interface', 'IP67 rated housing'],
    applications: ['Bin picking', 'Volume measurement', 'Logistics inspection'],
  },
  {
    slug: 'keyence-iv3-g500-vision-system',
    name: 'Keyence IV3-G500 Vision System',
    manufacturerSlug: 'keyence',
    familySlug: 'sensors-vision-perception',
    subcategory: 'Machine vision systems',
    tagline: 'AI-powered vision sensor for inspection without programming.',
    description:
      'Self-contained smart camera with built-in AI for defect detection, presence verification and pattern matching. Designed for fast deployment.',
    features: ['Built-in AI inference', 'No PC required', 'Ethernet integration'],
    applications: ['Quality inspection', 'Defect detection', 'Presence verification'],
  },
  {
    slug: 'keyence-lr-x-laser-sensor',
    name: 'Keyence LR-X Laser Sensor',
    manufacturerSlug: 'keyence',
    familySlug: 'sensors-vision-perception',
    subcategory: 'Photoelectric sensors',
    tagline: 'All-purpose laser sensor for stable detection across surface variation.',
    description:
      'Laser-class photoelectric sensor with built-in algorithms for detecting targets that vary in color, gloss or transparency.',
    features: ['Wide setting range', 'IO-Link support', 'Stable on difficult targets'],
    applications: ['Edge detection', 'Bottle / glass detection', 'Reflective parts'],
  },

  // ----- Safety / Machine Protection -----
  {
    slug: 'pilz-pnoz-x3-safety-relay',
    name: 'Pilz PNOZ X3 Safety Relay',
    manufacturerSlug: 'pilz',
    familySlug: 'safety-machine-protection',
    subcategory: 'Safety relays',
    tagline: 'Industry-standard safety relay for emergency stop and safety gate monitoring.',
    description:
      'Compact safety relay for monitoring E-stop circuits, safety gates and two-hand controls. Up to PL e / SIL CL 3 depending on wiring.',
    features: ['E-stop / safety gate monitoring', 'Up to PL e / SIL CL 3', 'Plug-in terminals'],
    applications: ['E-stop circuits', 'Safety gate monitoring', 'Two-hand controls'],
  },
  {
    slug: 'pilz-psen-cs-coded-switch',
    name: 'Pilz PSEN cs Coded Safety Switch',
    manufacturerSlug: 'pilz',
    familySlug: 'safety-machine-protection',
    subcategory: 'Safety doors and interlocks',
    tagline: 'Non-contact RFID-coded safety switch for movable guards.',
    description:
      'RFID-coded non-contact safety switch with high tampering resistance. Used to monitor movable guards on robotic cells and machinery.',
    features: ['RFID coding (no defeat with magnets)', 'Series wiring up to 20 switches', 'Compact housing'],
    applications: ['Guard door monitoring', 'Robotic cell access', 'Machine enclosures'],
  },
  {
    slug: 'sick-microscan3-safety-laser-scanner',
    name: 'SICK microScan3 Safety Laser Scanner',
    manufacturerSlug: 'sick',
    familySlug: 'safety-machine-protection',
    subcategory: 'Safety scanners',
    tagline: 'Safety laser scanner for area protection around robots and AGVs.',
    description:
      'Type 3 safety laser scanner with up to 9 m protective field range. Multiple configurable monitoring cases for dynamic safety control.',
    features: ['Up to 9 m protective field', 'Multiple monitoring cases', 'EFI-pro / EtherNet/IP CIP Safety'],
    applications: ['Robot cell area protection', 'AGV / AMR safety', 'Press / machine safety'],
  },
  {
    slug: 'sick-detec4-safety-light-curtain',
    name: 'SICK deTec4 Safety Light Curtain',
    manufacturerSlug: 'sick',
    familySlug: 'safety-machine-protection',
    subcategory: 'Light curtains',
    tagline: 'Type 4 safety light curtain for hazardous-point protection.',
    description:
      'PL e safety light curtain for finger or hand protection at hazardous points and access points to robotic cells.',
    features: ['Type 4 / PL e / SIL 3', 'Resolution from 14 mm', 'Up to 8 m range'],
    applications: ['Point-of-operation guarding', 'Access guarding', 'Robot cell entry'],
  },

  // ----- Industrial Communication & Connectivity -----
  {
    slug: 'hilscher-netrapid-90',
    name: 'Hilscher netRAPID 90 Embedded Module',
    manufacturerSlug: 'hilscher',
    familySlug: 'industrial-communication-connectivity',
    subcategory: 'Gateways',
    tagline: 'Embedded communication module supporting all major real-time Ethernet protocols.',
    description:
      'netX-based embedded module to add PROFINET, EtherCAT, EtherNet/IP, Modbus TCP or other real-time Ethernet protocols to a device.',
    features: ['Multi-protocol via firmware', 'Compact SMD module', 'PROFINET / EtherCAT / EtherNet/IP / Modbus TCP'],
    applications: ['Drive integration', 'Smart sensor connectivity', 'OEM device communication'],
  },
  {
    slug: 'hilscher-nettap-protocol-gateway',
    name: 'Hilscher netTAP Protocol Gateway',
    manufacturerSlug: 'hilscher',
    familySlug: 'industrial-communication-connectivity',
    subcategory: 'Gateways',
    tagline: 'Stand-alone gateway to bridge between industrial protocols.',
    description:
      'Industrial gateway that connects two real-time Ethernet or fieldbus protocols. Useful for integrating legacy systems with modern factory networks.',
    features: ['Wide protocol matrix', 'DIN-rail mounting', 'Configurable via Hilscher tools'],
    applications: ['Protocol bridging', 'Legacy integration', 'PLC ↔ MES connectivity'],
  },
  {
    slug: 'hirschmann-spider-iii-ethernet-switch',
    name: 'Hirschmann SPIDER III Industrial Ethernet Switch',
    manufacturerSlug: 'hirschmann',
    familySlug: 'industrial-communication-connectivity',
    subcategory: 'Industrial routers',
    tagline: 'Compact unmanaged industrial Ethernet switch for in-cabinet use.',
    description:
      'Unmanaged industrial Ethernet switch with rugged design for in-cabinet networking of PLCs, drives and IO devices.',
    features: ['DIN-rail mount', 'Wide temperature range', 'Auto-negotiation / MDIX'],
    applications: ['Cabinet networking', 'PLC ↔ IO connectivity', 'Industrial Ethernet expansion'],
  },

  // ----- Software / HMI / SCADA / Digital Twin -----
  {
    slug: 'siemens-tia-portal',
    name: 'Siemens TIA Portal Engineering Suite',
    manufacturerSlug: 'siemens',
    familySlug: 'software-hmi-scada-digital-twin',
    subcategory: 'Robot programming',
    tagline: 'Engineering framework for SIMATIC controllers, drives and HMI in one environment.',
    description:
      'Totally Integrated Automation Portal: the engineering tool for SIMATIC PLCs, SINAMICS drives, SIMATIC HMI panels and safety configuration.',
    features: ['Unified PLC / HMI / drive engineering', 'Library and reuse support', 'Integrated safety configuration'],
    applications: ['SIMATIC engineering', 'Machine commissioning', 'Plant control'],
  },
  {
    slug: 'beckhoff-twincat-3',
    name: 'Beckhoff TwinCAT 3 Automation Software',
    manufacturerSlug: 'beckhoff-automation',
    familySlug: 'software-hmi-scada-digital-twin',
    subcategory: 'Robot programming',
    tagline: 'PC-based automation software platform with PLC, motion and HMI in one runtime.',
    description:
      'TwinCAT 3 turns an industrial PC into a PLC + motion controller + HMI + IoT gateway. Native EtherCAT master with broad device support.',
    features: ['PLC + motion + HMI in one runtime', 'Native EtherCAT master', 'Visual Studio integration'],
    applications: ['Centralized cell control', 'Motion-intensive machines', 'Edge IIoT'],
  },
  {
    slug: 'inductive-automation-ignition',
    name: 'Inductive Automation Ignition Platform',
    manufacturerSlug: 'inductive-automation',
    familySlug: 'software-hmi-scada-digital-twin',
    subcategory: 'SCADA',
    tagline: 'Web-based SCADA, HMI, MES and IIoT platform with unlimited licensing.',
    description:
      'Cross-platform SCADA / HMI / MES / IIoT software built on Java with a web-based deployment model. Unlimited tags, clients and connections per server license.',
    features: ['Web-based HMI / SCADA', 'Unlimited tags / clients per server', 'MQTT, OPC UA and major fieldbus drivers'],
    applications: ['Plant-wide SCADA', 'Operator HMI', 'IIoT integration'],
  },
]

// ---------- Helpers ----------

function localized(text) {
  return { en: text, de: text }
}
function localizedArr(arr) {
  return { en: arr, de: arr }
}
async function fetchSlugs(type) {
  return new Set(
    await client.fetch(`*[_type == $type && defined(slug.current)].slug.current`, { type }),
  )
}
async function fetchBySlug(type, slug) {
  return await client.fetch(
    `*[_type == $type && slug.current == $slug][0]{_id}`,
    { type, slug },
  )
}

// ---------- Main ----------

async function main() {
  console.log(`▶  Project: ${projectId}/${dataset}`)
  console.log(`▶  Mode: ${APPLY ? 'APPLY (will mutate)' : 'DRY-RUN (no changes)'}`)
  console.log()

  const existingFamilies = await fetchSlugs('productFamily')
  const existingManufacturers = await fetchSlugs('manufacturer')
  const existingProducts = await fetchSlugs('product')

  // Verify productFamilies and stub category from round 1 are present
  const stubCategory = await fetchBySlug('productCategory', STUB_CATEGORY_SLUG)
  if (!stubCategory) {
    console.error(`❌ Stub category "${STUB_CATEGORY_SLUG}" not found.`)
    console.error('   Run scripts/seed-component-products.mjs --apply first.')
    process.exit(1)
  }
  const requiredFamilies = new Set(PRODUCTS.map((p) => p.familySlug))
  const missingFamilies = [...requiredFamilies].filter((s) => !existingFamilies.has(s))
  if (missingFamilies.length) {
    console.error(`❌ Missing productFamily docs: ${missingFamilies.join(', ')}`)
    console.error('   Run scripts/seed-component-products.mjs --apply first.')
    process.exit(1)
  }

  const manufacturersToCreate = MANUFACTURERS.filter(
    (m) => !existingManufacturers.has(m.slug),
  )
  const productsToCreate = PRODUCTS.filter((p) => !existingProducts.has(p.slug))

  console.log(`📦 Plan:`)
  console.log(`   Manufacturers to create: ${manufacturersToCreate.length} of ${MANUFACTURERS.length}`)
  if (manufacturersToCreate.length)
    console.log(`     ${manufacturersToCreate.map((m) => m.name).join(', ')}`)
  console.log(`   Products to create: ${productsToCreate.length} of ${PRODUCTS.length}`)
  if (productsToCreate.length)
    console.log(productsToCreate.map((p) => `     - ${p.name}  (${p.manufacturerSlug} → ${p.familySlug})`).join('\n'))
  console.log()

  if (!APPLY) {
    console.log('To apply: re-run with --apply')
    return
  }

  // Manufacturers
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

  // Re-fetch ID maps
  const mfrById = Object.fromEntries(
    (await client.fetch(`*[_type == "manufacturer" && defined(slug.current)]{_id, "slug": slug.current}`)).map(
      (d) => [d.slug, d._id],
    ),
  )
  const familyById = Object.fromEntries(
    (await client.fetch(`*[_type == "productFamily" && defined(slug.current)]{_id, "slug": slug.current}`)).map(
      (d) => [d.slug, d._id],
    ),
  )

  // Products
  for (const p of productsToCreate) {
    const mfrRef = mfrById[p.manufacturerSlug]
    const familyRef = familyById[p.familySlug]
    if (!mfrRef || !familyRef) {
      console.warn(`⚠  Skip ${p.slug}: missing refs (mfr=${!!mfrRef}, family=${!!familyRef})`)
      continue
    }
    await client.create({
      _type: 'product',
      _id: `product.${p.slug}`,
      name: p.name,
      slug: { _type: 'slug', current: p.slug },
      manufacturer: { _type: 'reference', _ref: mfrRef },
      category: { _type: 'reference', _ref: stubCategory._id },
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
  console.log('Done. New products are LIVE within ~60s.')
}

main().catch((err) => {
  console.error('❌ Script failed:', err.message)
  process.exit(1)
})
