/**
 * Create the 12 productFamily documents the catalog expects.
 *
 * Why: products were imported with references like
 *   productFamily._ref = "productFamily.<slug>"
 * but the productFamily documents themselves were never created, so every
 * /products/categories/<slug> page resolves no family and shows the empty
 * "no products yet" state. Creating these docs (with _id matching the refs)
 * wires the existing queries up — no schema/query/code changes.
 *
 * Idempotent: uses createIfNotExists, so existing docs are never overwritten.
 * Reversible: delete the 12 `productFamily.*` docs to undo.
 *
 * Run: node scripts/create-product-families.mjs
 * Needs SANITY_API_TOKEN (write) in .env.local
 */
import { createClient } from '@sanity/client'
import { config } from 'dotenv'
config({ path: '.env.local' })

const token = process.env.SANITY_API_TOKEN || process.env.SANITY_API_WRITE_TOKEN
if (!token) {
  console.error('Missing SANITY_API_TOKEN in .env.local — aborting.')
  process.exit(1)
}

const client = createClient({
  projectId: 'wudur8e8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// slug -> [order, title.en, title.de]
const families = [
  ['robot-platforms', 10, 'Robot Platforms', 'Roboterplattformen'],
  ['end-effectors-robot-tooling', 20, 'End Effectors & Robot Tooling', 'Endeffektoren & Roboterwerkzeuge'],
  ['motion-actuators-drives', 30, 'Motion, Actuators & Drives', 'Bewegung, Aktoren & Antriebe'],
  ['plc-control-industrial-automation', 40, 'PLC, Control & Industrial Automation', 'SPS, Steuerung & industrielle Automatisierung'],
  ['sensors-vision-perception', 50, 'Sensors, Vision & Perception', 'Sensoren, Vision & Wahrnehmung'],
  ['safety-machine-protection', 60, 'Safety & Machine Protection', 'Sicherheit & Maschinenschutz'],
  ['industrial-communication-connectivity', 70, 'Industrial Communication & Connectivity', 'Industrielle Kommunikation & Konnektivität'],
  ['software-hmi-scada-digital-twin', 80, 'Software, HMI, SCADA & Digital Twin', 'Software, HMI, SCADA & Digital Twin'],
  ['robotic-cells-application-packages', 90, 'Robotic Cells & Application Packages', 'Robotische Zellen & Anwendungspakete'],
  ['service-cleaning-facility-robots', 100, 'Service, Cleaning & Facility Robots', 'Service-, Reinigungs- & Facility-Roboter'],
  ['research-education-embodied-ai', 110, 'Research, Education & Embodied AI', 'Forschung, Bildung & Embodied AI'],
  ['spare-parts-modules-accessories', 120, 'Spare Parts, Modules & Accessories', 'Ersatzteile, Module & Zubehör'],
]

async function run() {
  for (const [slug, order, en, de] of families) {
    const _id = `productFamily.${slug}`
    const doc = {
      _id,
      _type: 'productFamily',
      title: { en, de },
      slug: { _type: 'slug', current: slug },
      order,
      isActive: true,
    }
    const res = await client.createIfNotExists(doc)
    const count = await client.fetch(
      `count(*[_type=="product" && productFamily._ref==$id])`,
      { id: _id },
    )
    console.log(`${res._id.padEnd(48)}  products: ${count}`)
  }
  console.log('\nDone. Family pages will reflect changes within the page revalidate window (1h) or on next deploy.')
}

run().catch((e) => {
  console.error(e.message)
  process.exit(1)
})
