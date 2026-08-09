/**
 * Import the MagicLab MagicBot X1 full-size humanoid robot into Sanity.
 *
 * Source: https://www.magiclab.top/en/x1 — copy, specification table (X1 and
 * X1 Ultra columns) and product renders all come from that page.
 *
 * The MagicLab manufacturer already exists (manufacturer-magiclab), so this
 * script only creates/updates the product. It joins the existing MagicLab
 * humanoid block (MagicBot Gen1 = 30, Z1 = 31–33) at order 29, i.e. ahead of
 * them as the current flagship.
 *
 * Idempotent: the product is matched by slug and an existing document keeps its
 * _id, so re-running updates in place rather than duplicating. Images are only
 * uploaded when the document has none yet (or with --force-images).
 *
 * Note on image fetching: magiclab.top redirects every path without a locale
 * prefix to /en/..., where the static assets 404. Sending the site's own
 * `i18n_redirected=en` cookie skips that redirect and returns the real PNG.
 *
 * Run:
 *   node --env-file=.env.local scripts/import-magiclab-x1.mjs --dry
 *   node --env-file=.env.local scripts/import-magiclab-x1.mjs
 */
import { createClient } from '@sanity/client'

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error('✗ SANITY_API_TOKEN missing. Run with: node --env-file=.env.local scripts/import-magiclab-x1.mjs')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wudur8e8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const DRY = process.argv.includes('--dry')
const FORCE_IMAGES = process.argv.includes('--force-images')

const SLUG = 'magicbot-x1'
const MANUFACTURER_ID = 'manufacturer-magiclab'
const FAMILY_SLUG = 'robot-platforms'
const PRODUCT_URL = 'https://www.magiclab.top/en/x1'

const IMAGE_BASE = 'https://www.magiclab.top/imgs/x1'
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'

const MAIN_IMAGE = { file: 'x1-banner.png', alt: 'MagicLab MagicBot X1 full-size humanoid robot' }
const GALLERY = [
  { file: 'x1-power.png', alt: 'MagicBot X1 running — joint modules with ≥400 N·m maximum torque' },
  { file: 'x1-flexibility.png', alt: 'MagicBot X1 arm and hand — key joint range of motion increased by ≥50 %' },
  { file: 'x1-armor.png', alt: 'MagicBot X1 aerospace-grade composite chassis' },
  { file: 'x1-uptime.png', alt: 'MagicBot X1 hot-swappable dual-battery system' },
  { file: 'x1-ecosystem.png', alt: 'MagicBot X1 developer edition with open motion control board' },
  { file: 'x1-packaging.png', alt: 'MagicBot X1 transport case and autonomous unboxing' },
  { file: 'x1-scene-1.png', alt: 'MagicBot X1 on autonomous patrol and security inspection duty' },
  { file: 'x1-scene-3.png', alt: 'MagicBot X1 in smart logistics and autonomous delivery' },
  { file: 'x1-scene-7.png', alt: 'MagicBot X1 handling material transfer in an industrial setting' },
]

async function uploadImage(file) {
  const url = `${IMAGE_BASE}/${file}`
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Cookie: 'i18n_redirected=en' },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`fetch ${res.status} for ${url}`)
  const type = res.headers.get('content-type') || ''
  if (!type.startsWith('image/')) throw new Error(`expected an image, got ${type} for ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 1000) throw new Error(`suspiciously small image (${buf.length} B) for ${url}`)
  const asset = await client.assets.upload('image', buf, {
    filename: `magicbot-${file}`,
    contentType: 'image/png',
  })
  console.log(`  uploaded ${file} (${Math.round(buf.length / 1024)} kB) → ${asset._id}`)
  return asset._id
}

const imageField = (ref, extra = {}) => ({
  _type: 'image',
  asset: { _type: 'reference', _ref: ref },
  ...extra,
})

// Specifications follow the X1 / X1 Ultra comparison table on the product page.
// Where the two variants differ, the Ultra value is called out in the value.
const SPECIFICATIONS = [
  { label: 'Dimensions (H × W × D)', value: '1800 × 554 × 280 mm' },
  { label: 'Arm span', value: '158 cm' },
  { label: 'Leg length', value: '92 cm' },
  { label: 'Total weight', value: '70 kg' },
  { label: 'Total active DOF', value: '31' },
  { label: 'Head active DOF', value: '2' },
  { label: 'Arm active DOF', value: '7 per arm' },
  { label: 'Waist active DOF', value: '3' },
  { label: 'Leg active DOF', value: '6 per leg' },
  { label: 'Peak joint torque', value: '≥350 N·m' },
  { label: 'Maximum joint torque', value: '≥400 N·m' },
  {
    label: 'Chassis materials',
    value: 'Aerospace-grade lightweight aluminium alloy, titanium alloy, high-strength engineering plastics',
  },
  { label: 'Cooling system', value: 'Air cooling' },
  { label: 'Power supply', value: 'Dual battery system' },
  { label: 'Battery type', value: 'Hot-swappable (zero-downtime replacement)' },
  { label: 'Battery capacity', value: '18 Ah' },
  {
    label: 'Base compute',
    value: '8-core high-performance CPU (X1: locked · X1 Ultra: locked base plus unlocked developer CPU)',
  },
  { label: 'AI compute', value: 'X1: NVIDIA Orin NX · X1 Ultra: up to NVIDIA Jetson AGX Thor (2070 TOPS)' },
  { label: 'Wireless', value: 'Wi-Fi 6 and Bluetooth 5.2' },
  {
    label: 'Perception sensors',
    value: 'Stereo camera module, head RGB-D camera, waist RGB-D camera, LiDAR (optional)',
  },
  { label: 'Secondary development', value: 'X1: not supported · X1 Ultra: supported' },
]

const doc = {
  _type: 'product',
  name: 'MagicBot X1',
  slug: { _type: 'slug', current: SLUG },
  manufacturer: { _type: 'reference', _ref: MANUFACTURER_ID },
  subcategory: 'Humanoid robots',
  tagline: {
    en: 'Full-size humanoid — 180 cm, 31 DOF, ≥400 N·m joints, hot-swappable dual battery',
    de: 'Humanoider Roboter in voller Baugröße — 180 cm, 31 DOF, ≥400 N·m, Wechselakku-System',
  },
  description: {
    en:
      'Full-size humanoid robot with 31 active degrees of freedom and newly developed joint modules delivering ≥350 N·m peak and ≥400 N·m maximum torque, with the range of motion in the key joints widened by ≥50 %. An aerospace-grade chassis of titanium alloy, lightweight aluminium alloy and high-strength engineering plastics is paired with a hot-swappable dual-battery system for continuous 24/7 operation. The X1 Ultra developer edition adds an unlocked developer CPU, AI compute up to NVIDIA Jetson AGX Thor (2070 TOPS) and support for secondary development.',
    de:
      'Humanoider Roboter in voller Baugröße mit 31 aktiven Freiheitsgraden und neu entwickelten Gelenkmodulen mit ≥350 N·m Spitzen- und ≥400 N·m Maximaldrehmoment; der Bewegungsbereich der Hauptgelenke wurde um ≥50 % erweitert. Ein Chassis aus Titanlegierung, leichter Aluminiumlegierung und hochfesten Konstruktionskunststoffen in Luftfahrtqualität wird mit einem Dual-Akku-System mit Hot-Swap für den 24/7-Dauerbetrieb kombiniert. Die Entwicklerversion X1 Ultra ergänzt eine freigeschaltete Entwickler-CPU, KI-Rechenleistung bis NVIDIA Jetson AGX Thor (2070 TOPS) und Unterstützung für Zweitentwicklung.',
  },
  features: {
    en: [
      'Self-developed joint modules with ≥350 N·m peak and ≥400 N·m maximum torque',
      'Topology-optimised structure for more strength at lower weight',
      'Range of motion in the key joints increased by ≥50 % for stiffness-free movement',
      'Aerospace-grade composite chassis: titanium alloy, magnesium-aluminium alloy and TPU',
      'Hot-swappable dual-battery system for zero-downtime, round-the-clock operation',
      'Built-in open motion control board runs onboard algorithms without an external PC',
      'AI compute configurable up to NVIDIA Jetson AGX Thor (2070 TOPS) on the X1 Ultra',
      'Compact transport case with autonomous unboxing and boxing for rapid deployment',
    ],
    de: [
      'Eigenentwickelte Gelenkmodule mit ≥350 N·m Spitzen- und ≥400 N·m Maximaldrehmoment',
      'Topologieoptimierte Struktur für mehr Kraft bei geringerem Gewicht',
      'Um ≥50 % erweiterter Bewegungsbereich der Hauptgelenke für flüssige Bewegungen',
      'Verbundchassis in Luftfahrtqualität: Titanlegierung, Magnesium-Aluminium-Legierung und TPU',
      'Dual-Akku-System mit Hot-Swap für unterbrechungsfreien Dauerbetrieb',
      'Integrierte offene Motion-Control-Platine führt Algorithmen ohne externen PC aus',
      'KI-Rechenleistung beim X1 Ultra konfigurierbar bis NVIDIA Jetson AGX Thor (2070 TOPS)',
      'Kompakter Transportkoffer mit autonomem Aus- und Einpacken für schnelle Inbetriebnahme',
    ],
  },
  applications: {
    en: [
      'Patrol and security — all-weather autonomous inspection and emergency response',
      'Public security and integrated police collaboration',
      'Smart logistics — autonomous delivery, visual sorting and terrain-adaptive navigation',
      'Guided tours and narration in museums, galleries and exhibition centres',
      'Events and entertainment — performances and synchronised formation shows',
      'Research and education — embodied AI, algorithm validation, practical training',
      'Pan-industrial material transfer, bulky item handling and warehouse operations',
    ],
    de: [
      'Patrouille und Sicherheit — autonome Inspektion bei jedem Wetter und Notfallreaktion',
      'Öffentliche Sicherheit und integrierte Zusammenarbeit mit Einsatzkräften',
      'Smarte Logistik — autonome Zustellung, visuelle Sortierung, geländeadaptive Navigation',
      'Führungen und Narration in Museen, Galerien und Ausstellungszentren',
      'Events und Entertainment — Auftritte und synchronisierte Formationsshows',
      'Forschung und Lehre — Embodied AI, Algorithmus-Validierung, praktische Ausbildung',
      'Materialtransport in der Industrie, Handhabung sperriger Güter und Lagerbetrieb',
    ],
  },
  specifications: SPECIFICATIONS.map((s, i) => ({
    _key: `s${i + 1}`,
    _type: 'object',
    label: s.label,
    value: s.value,
  })),
  productUrl: PRODUCT_URL,
  availabilityStatus: 'sourcing_on_request',
  inquiryOnly: true,
  isActive: true,
  featured: false,
  isNew: true,
  order: 29,
  seo: {
    metaTitle: {
      en: 'MagicBot X1 Humanoid Robot | 180 cm, 31 DOF | MegaRobotics',
      de: 'MagicBot X1 Humanoider Roboter | 180 cm, 31 DOF | MegaRobotics',
    },
    metaDescription: {
      en: 'MagicLab MagicBot X1 full-size humanoid robot: 180 cm, 70 kg, 31 DOF, ≥400 N·m joint torque, hot-swap dual battery, AI compute up to Jetson AGX Thor.',
      de: 'MagicLab MagicBot X1 humanoider Roboter: 180 cm, 70 kg, 31 DOF, ≥400 N·m Gelenkdrehmoment, Hot-Swap-Dual-Akku, KI-Rechenleistung bis Jetson AGX Thor.',
    },
    keywords: [
      'MagicBot X1',
      'MagicBot X1 Ultra',
      'MagicLab humanoid robot',
      'full-size humanoid robot',
      'humanoider Roboter kaufen',
      'Jetson AGX Thor humanoid',
    ],
  },
}

async function run() {
  console.log(DRY ? '— DRY RUN, nothing will be written —\n' : '— LIVE RUN —\n')

  const manufacturer = await client.fetch(`*[_id==$id][0]{_id, name}`, { id: MANUFACTURER_ID })
  if (!manufacturer) throw new Error(`manufacturer ${MANUFACTURER_ID} not found`)
  console.log(`Manufacturer ${manufacturer.name} (${manufacturer._id})`)

  const familyId = await client.fetch(`*[_type=="productFamily" && slug.current==$slug][0]._id`, {
    slug: FAMILY_SLUG,
  })
  if (!familyId) throw new Error(`product family ${FAMILY_SLUG} not found`)
  console.log(`Family ${FAMILY_SLUG} (${familyId})`)

  const existing = await client.fetch(
    `*[_type=="product" && slug.current==$slug][0]{_id, mainImage, gallery, "hasImage": defined(mainImage)}`,
    { slug: SLUG },
  )
  console.log(existing ? `Existing product ${existing._id} — will update` : 'No existing product — will create')

  doc.productFamily = { _type: 'reference', _ref: familyId }
  doc.publishedAt = new Date().toISOString()
  if (existing) doc._id = existing._id

  const needsImages = FORCE_IMAGES || !existing?.hasImage
  if (needsImages && !DRY) {
    console.log(`\nUploading ${1 + GALLERY.length} images...`)
    doc.mainImage = imageField(await uploadImage(MAIN_IMAGE.file))
    doc.gallery = []
    for (const [i, img] of GALLERY.entries()) {
      const ref = await uploadImage(img.file)
      doc.gallery.push(imageField(ref, { _key: `g${i + 1}`, alt: img.alt }))
    }
  } else if (existing?.hasImage) {
    // Keep the images already attached to the document.
    doc.mainImage = existing.mainImage
    if (existing.gallery) doc.gallery = existing.gallery
  }

  if (DRY) {
    console.log(
      `\nWould ${existing ? 'update' : 'create'} ${SLUG}: ${SPECIFICATIONS.length} specs, ` +
        `${doc.features.en.length} features, ${doc.applications.en.length} applications, ` +
        `${needsImages ? 1 + GALLERY.length : 0} images to upload`,
    )
    console.log('\nDry run complete. Re-run without --dry to write.')
    return
  }

  const saved = existing ? await client.createOrReplace(doc) : await client.create(doc)
  console.log(`\n✅ ${existing ? 'Updated' : 'Created'} ${saved._id}`)
  console.log('   https://megarobotics.de/en/products/magicbot-x1')
}

run().catch((e) => {
  console.error('\n✗ Failed:', e.message)
  process.exit(1)
})
