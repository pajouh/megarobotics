/**
 * Import the Atom Robot (atomrobot.ai) cobot-palletizer line as separate Sanity products.
 * - Creates/uses an "Atom Robot" manufacturer (relationshipStatus: information_only — no
 *   verified-distributor claim).
 * - Downloads each model's render + specification-sheet image from atomrobot.ai and uploads
 *   them to Sanity (render images are shared across models, so uploads are de-duped by URL).
 * - Creates 11 products in the "Robotic Cells & Application Packages" family (EN+DE),
 *   availabilityStatus: sourcing_on_request, inquiry-only.
 * - Deletes the old generic "Cobot Palletizer (AM Series)" product (slug cobot-palletizer-am-series).
 *
 * All docs get normal random ids (never dotted). Run:
 *   SANITY_API_TOKEN=... node scripts/import-atomrobot-palletizers.mjs [--dry]
 */
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'

for (const line of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
}
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN
if (!token) { console.error('✗ Need SANITY_API_TOKEN'); process.exit(1) }

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wudur8e8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01', token, useCdn: false,
})
const DRY = process.argv.includes('--dry')

const HOST = 'https://www.atomrobot.ai'
const RDIR = '/filespath/files/协作码垛/' // "collaborative palletizing"
const u = (sub) => HOST + encodeURI(RDIR + sub)

const VERSION = {
  fixed:   { en: 'Fixed',   de: 'Feste Version' },
  lifting: { en: 'Lifting', de: 'Hubversion' },
  mobile:  { en: 'Mobile',  de: 'Mobile Version' },
}

// model, version, payload, stacking height, render sub-path, spec sub-path
const PALLETIZERS = [
  ['AM-20-G', 'fixed', '20 kg', '1700 mm', '渲染图/20260318095123(1).png', '20251120093755.jpg'],
  ['AM-20-S', 'lifting', '20 kg', '2200 mm', '渲染图/20260318095123(1).png', '20251120093906.jpg'],
  ['AM-20-H', 'lifting', '20 kg', '2300 mm', '渲染图/20260318095124.png', '20251120093957.jpg'],
  ['AM-20 Ultra', 'fixed', '20 kg', '2100 mm', '渲染图/20260318095124.png', '20251120094216.jpg'],
  ['AM-30-G', 'fixed', '30 kg', '1700 mm', '渲染图/20260318095123(1).png', '20251120094305.jpg'],
  ['AM-30-S', 'lifting', '30 kg', '2200 mm', '渲染图/20260318095123(1).png', '20251120094359.jpg'],
  ['AM-30-H', 'lifting', '30 kg', '2300 mm', '渲染图/20260318095124.png', '20251120094537.jpg'],
  ['AM-30 Ultra', 'fixed', '30 kg', '2100 mm', '渲染图/20260318095124.png', '20251120164244.jpg'],
  ['AM-40-G', 'fixed', '40 kg', '2000 mm', '渲染图/20260318095123(1).png', '20251120094746.jpg'],
  ['ATM-MMD20G', 'mobile', '20 kg', '1500 mm', '渲染图/20260318095123(1).png', '20251122105101.jpg'],
]

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const assetCache = new Map()
async function upload(url, filename) {
  if (assetCache.has(url)) return assetCache.get(url)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`fetch ${res.status} for ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  const contentType = url.endsWith('.png') ? 'image/png' : 'image/jpeg'
  const asset = await client.assets.upload('image', buf, { filename, contentType })
  assetCache.set(url, asset._id)
  return asset._id
}
const imageField = (ref) => ({ _type: 'image', asset: { _type: 'reference', _ref: ref } })

async function run() {
  // 1. Atom Robot manufacturer
  let mfgId = await client.fetch(`*[_type=="manufacturer" && slug.current=="atom-robot"][0]._id`)
  if (!mfgId && !DRY) {
    const mfg = await client.create({
      _type: 'manufacturer',
      name: 'Atom Robot',
      slug: { _type: 'slug', current: 'atom-robot' },
      description: {
        en: 'Atom Robot is a Chinese robotics manufacturer specialising in high-speed delta robots, cobot palletizers, SCARA robots and humanoid platforms for industrial automation.',
        de: 'Atom Robot ist ein chinesischer Roboterhersteller, spezialisiert auf Hochgeschwindigkeits-Delta-Roboter, Cobot-Palettierer, SCARA-Roboter und humanoide Plattformen für die Industrieautomation.',
      },
      website: 'https://www.atomrobot.ai',
      headquarters: 'China',
      specialties: {
        en: ['Cobot palletizers', 'Delta robots', 'SCARA robots', 'Humanoid robots'],
        de: ['Cobot-Palettierer', 'Delta-Roboter', 'SCARA-Roboter', 'Humanoide Roboter'],
      },
      relationshipStatus: 'information_only',
    })
    mfgId = mfg._id
  }
  console.log(`Manufacturer Atom Robot: ${mfgId || '(dry)'}`)

  // 2. Product family
  const familyId = await client.fetch(`*[_type=="productFamily" && slug.current=="robotic-cells-application-packages"][0]._id`)
  if (!familyId) throw new Error('family robotic-cells-application-packages not found')

  // 3. Build + create products
  const baseFeatures = {
    en: ['Graphical programming — set up in about an hour, no coding expertise required', 'Integrated, light and flexible design', 'Small footprint', 'Fast task changeover for high-mix production lines'],
    de: ['Grafische Programmierung — Einrichtung in etwa einer Stunde, keine Programmierkenntnisse nötig', 'Integriertes, leichtes und flexibles Design', 'Geringe Stellfläche', 'Schneller Aufgabenwechsel für variantenreiche Produktionslinien'],
  }
  const baseApps = {
    en: ['Food', 'Pharmaceutical', '3C electronics', 'Daily chemicals', 'Printing'],
    de: ['Lebensmittel', 'Pharma', '3C-Elektronik', 'Chemie / Haushaltschemie', 'Druck'],
  }

  const docs = []
  let order = 10
  for (const [model, ver, payload, height, render, spec] of PALLETIZERS) {
    const name = `Cobot Palletizer ${model}`
    const slug = slugify(name)
    const v = VERSION[ver]
    docs.push({
      _type: 'product',
      name,
      slug: { _type: 'slug', current: slug },
      manufacturer: { _type: 'reference', _ref: mfgId },
      productFamily: { _type: 'reference', _ref: familyId },
      subcategory: 'Cobot palletizers',
      tagline: {
        en: `Collaborative palletizing robot — ${payload} payload, ${v.en.toLowerCase()} version, up to ${height} stacking height`,
        de: `Kollaborativer Palettierroboter — ${payload} Traglast, ${v.de}, Stapelhöhe bis ${height}`,
      },
      description: {
        en: `Graphical-programming cobot palletizer for food, pharmaceutical, 3C electronics, daily-chemical and printing lines. Integrated, light and flexible with a small footprint; new palletizing tasks can be deployed in about an hour.`,
        de: `Per grafischer Programmierung bedienbarer Cobot-Palettierroboter für Lebensmittel-, Pharma-, 3C-, Chemie- und Druckanwendungen. Integriert, leicht und flexibel bei kleiner Stellfläche; neue Palettieraufgaben sind in etwa einer Stunde einsatzbereit.`,
      },
      specifications: [
        { _key: 'k1', label: 'Type', value: 'Cobot palletizer' },
        { _key: 'k2', label: 'Payload', value: payload },
        { _key: 'k3', label: 'Version', value: v.en },
        { _key: 'k4', label: 'Max. vertical stacking height', value: height },
      ],
      features: baseFeatures,
      applications: baseApps,
      __render: u(render),
      __spec: u(spec),
      __specAlt: `${name} specifications`,
      availabilityStatus: 'sourcing_on_request',
      inquiryOnly: true,
      isActive: true,
      isNew: true,
      order: order++,
      productUrl: `${HOST}/robot/Palletizer_${model.replace(/ /g, '_')}`,
    })
  }

  // Safety fence (accessory)
  docs.push({
    _type: 'product',
    name: 'Palletizer Standard Safety Fence',
    slug: { _type: 'slug', current: 'palletizer-standard-safety-fence' },
    manufacturer: { _type: 'reference', _ref: mfgId },
    productFamily: { _type: 'reference', _ref: familyId },
    subcategory: 'Safety accessories',
    tagline: {
      en: 'Standard light-curtain safety fence for cobot palletizing cells',
      de: 'Standard-Lichtvorhang-Schutzzaun für Cobot-Palettierzellen',
    },
    description: {
      en: 'Standard safety fence with light curtains for guarding cobot palletizing cells, providing area protection around the working envelope.',
      de: 'Standard-Schutzzaun mit Lichtvorhängen zur Absicherung von Cobot-Palettierzellen und zum Flächenschutz rund um den Arbeitsbereich.',
    },
    specifications: [
      { _key: 'k1', label: 'Type', value: 'Safety accessory' },
      { _key: 'k2', label: 'Light curtains', value: '2 sets' },
      { _key: 'k3', label: 'Detection height', value: '145–1370 mm' },
      { _key: 'k4', label: 'Detection length', value: '2000 mm' },
    ],
    applications: baseApps,
    __render: u('渲染图/20260318095124(1).png'),
    __spec: u('20251122102413.jpg'),
    __specAlt: 'Palletizer Standard Safety Fence specifications',
    availabilityStatus: 'sourcing_on_request',
    inquiryOnly: true,
    isActive: true,
    isNew: true,
    order: order++,
    productUrl: `${HOST}/robot/Palletizer_Standard_Safety_Fence`,
  })

  console.log(`Prepared ${docs.length} products.`)
  if (DRY) {
    for (const d of docs) console.log(`  [dry] ${d.name}  (${d.slug.current})  render=${d.__render.slice(-30)} spec=${d.__spec.slice(-20)}`)
    return
  }

  for (const d of docs) {
    const existing = await client.fetch(`*[_type=="product" && slug.current==$s][0]._id`, { s: d.slug.current })
    if (existing) { console.log(`  · exists, skipping ${d.name}`); continue }
    const mainRef = await upload(d.__render, `${d.slug.current}.png`)
    const specRef = await upload(d.__spec, `${d.slug.current}-spec.jpg`)
    const { __render, __spec, __specAlt, ...fields } = d
    fields.mainImage = imageField(mainRef)
    fields.gallery = [{ _type: 'image', _key: 'spec', alt: __specAlt, asset: { _type: 'reference', _ref: specRef } }]
    fields.publishedAt = new Date().toISOString()
    const created = await client.create(fields)
    console.log(`  ✓ ${d.name} -> ${created._id}`)
  }

  // 4. Delete the old generic product (+ any draft)
  const old = await client.fetch(`*[_type=="product" && slug.current=="cobot-palletizer-am-series"]._id`)
  for (const id of old) { await client.delete(id); console.log(`  ✓ removed old generic ${id}`) }
  await client.delete(`drafts.product.cobot-palletizer-am-series`).catch(() => {})

  console.log('\n✅ Import complete.')
}
run().catch((e) => { console.error('\n✗ FAILED:', e.message || e); process.exit(1) })
