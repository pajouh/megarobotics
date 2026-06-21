// Populate solution documents (icon, related industries, SEO, body) derived
// from existing excerpt / applications / robot-type content. Idempotent:
// re-running overwrites the same fields with the same values.
import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { randomUUID } from 'node:crypto'

config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wudur8e8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const INDUSTRY_IDS = {
  automotive: 'XuGkglS3BiA4fLkYuRj0FX',
  'daily-chemical': 'QGxHPXHFgKeZjQ8KE49j6l',
  electronics: 'BcZlIXMtUldsliYl5NpeYi',
  'facility-service': 'XuGkglS3BiA4fLkYuRj0Rc',
  'food-beverage': 'QGxHPXHFgKeZjQ8KE49jhg',
  'inspection-security': 'BcZlIXMtUldsliYl5Npedw',
  logistics: 'BcZlIXMtUldsliYl5NpehQ',
  pharma: 'XuGkglS3BiA4fLkYuRj0mK',
  'research-education': 'QGxHPXHFgKeZjQ8KE49jtz',
}

// One paragraph helper -> a portable-text block array
const blocks = (...paras) =>
  paras.map((text) => ({
    _type: 'block',
    _key: randomUUID().slice(0, 12),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: randomUUID().slice(0, 12), text, marks: [] }],
  }))

const refs = (...slugs) =>
  slugs.map((s) => ({ _type: 'reference', _key: randomUUID().slice(0, 12), _ref: INDUSTRY_IDS[s] }))

// Short excerpts (existing) reused as SEO meta descriptions.
const EXCERPTS = {
  'industrial-arms': {
    en: 'Articulated and collaborative robots for assembly, machine tending, handling and quality tasks across discrete and process manufacturing.',
    de: 'Knickarm- und kollaborative Roboter für Montage, Maschinenbestückung, Handling und Qualitätsaufgaben in der diskreten und Prozess-Fertigung.',
  },
  'high-speed-picking': {
    en: 'Delta and parallel kinematic robots for high-throughput pick-and-place, packaging and end-of-line tasks in consumer goods, food and pharma.',
    de: 'Delta- und parallelkinematische Roboter für Pick-and-Place mit hoher Taktrate, Verpackung und End-of-Line-Aufgaben in Konsumgütern, Lebensmitteln und Pharma.',
  },
  'amr-agv': {
    en: 'Mobile robots for material transport, autonomous pallet movement and goods-to-person concepts across warehouses and production lines.',
    de: 'Mobile Roboter für Materialtransport, autonomen Palettentransport und Goods-to-Person-Konzepte in Lagern und Produktionslinien.',
  },
  'sanding-polishing-painting': {
    en: 'Surface-finishing cells for automotive aftermarket and metalworking environments combining force-controlled arms and end-effectors.',
    de: 'Oberflächenbearbeitungs-Zellen für den Automotive-Aftermarket und die Metallverarbeitung, die kraftgeregelte Arme und Endeffektoren kombinieren.',
  },
  'inspection-security': {
    en: 'Mobile, legged and stationary inspection systems for factory patrol, thermal imaging and remote monitoring.',
    de: 'Mobile, schreitende und stationäre Inspektionssysteme für Anlagen-Patrouillen, Thermografie und Fernüberwachung.',
  },
  'cleaning-facility': {
    en: 'Commercial and industrial cleaning robots for floors, large surfaces and recurring facility tasks.',
    de: 'Gewerbliche und industrielle Reinigungsroboter für Böden, große Flächen und wiederkehrende Anlagenaufgaben.',
  },
  'research-education': {
    en: 'Platform evaluation and procurement support for universities, applied-research labs and robotics teaching environments.',
    de: 'Plattform-Evaluierung und Beschaffungsunterstützung für Universitäten, anwendungsorientierte Forschungslabore und robotische Lehrumgebungen.',
  },
  'humanoid-embodied-ai': {
    en: 'Early-stage feasibility and pilot work with humanoid and embodied-AI platforms in controlled industrial and service environments.',
    de: 'Frühphasen-Machbarkeitsstudien und Pilotarbeiten mit humanoiden und Embodied-AI-Plattformen in kontrollierten industriellen und Service-Umgebungen.',
  },
}

const SOLUTIONS = [
  {
    _id: 'BcZlIXMtUldsliYl5Npfp6',
    slug: 'industrial-arms',
    icon: 'Cog',
    industries: ['electronics', 'automotive', 'pharma'],
    titleEn: 'Industrial automation and robotic arms',
    titleDe: 'Industrielle Automatisierung und Roboterarme',
    bodyEn: [
      'Articulated and collaborative robots handle assembly, machine tending, handling and quality tasks across discrete and process manufacturing. The right configuration depends on payload, reach, cycle time and how closely the robot has to work alongside people.',
      'MegaRobotics helps you compare 6-axis industrial arms, collaborative robots and dual-arm cells across manufacturers, then scope integration, tooling and commissioning for your application.',
    ],
    bodyDe: [
      'Knickarm- und kollaborative Roboter übernehmen Montage, Maschinenbestückung, Handling und Qualitätsaufgaben in der diskreten und in der Prozessfertigung. Die passende Konfiguration hängt von Traglast, Reichweite, Taktzeit und der erforderlichen Mensch-Roboter-Zusammenarbeit ab.',
      'MegaRobotics vergleicht mit Ihnen herstellerübergreifend 6-Achs-Industriearme, kollaborative Roboter und Dual-Arm-Zellen und plant Integration, Werkzeuge und Inbetriebnahme für Ihre Anwendung.',
    ],
  },
  {
    _id: 'QGxHPXHFgKeZjQ8KE49lB6',
    slug: 'high-speed-picking',
    icon: 'Package',
    industries: ['food-beverage', 'daily-chemical', 'pharma'],
    titleEn: 'High-speed picking, packaging and parallel robotics',
    titleDe: 'High-Speed-Picking, Verpackung und Parallelrobotik',
    bodyEn: [
      'Delta and parallel kinematic robots drive high-throughput pick-and-place, packaging and end-of-line tasks in consumer goods, food and pharma, where cycle time and hygiene requirements shape the cell design.',
      'We help evaluate delta and parallel robots, top-load packers and vision-guided picking systems, and structure the technical and commercial steps toward a high-throughput line.',
    ],
    bodyDe: [
      'Delta- und parallelkinematische Roboter treiben Pick-and-Place mit hoher Taktrate, Verpackung und End-of-Line-Aufgaben in Konsumgütern, Lebensmitteln und Pharma an, wo Taktzeit und Hygieneanforderungen das Zellendesign bestimmen.',
      'Wir bewerten mit Ihnen Delta- und Parallelroboter, Top-Load-Packer und bildgeführte Picking-Systeme und strukturieren die technischen und kommerziellen Schritte zu einer Hochleistungslinie.',
    ],
  },
  {
    _id: 'XuGkglS3BiA4fLkYuRj23i',
    slug: 'amr-agv',
    icon: 'Truck',
    industries: ['logistics'],
    titleEn: 'AMR, AGV and intralogistics',
    titleDe: 'AMR, AGV und Intralogistik',
    bodyEn: [
      'Mobile robots move materials, automate pallet transport and enable goods-to-person concepts across warehouses and production lines, reducing manual transport and freeing staff for higher-value work.',
      'MegaRobotics supports the selection and rollout of AMRs, AGVs, unmanned forklifts and tunnel AMRs, including fleet concepts and integration with your warehouse systems.',
    ],
    bodyDe: [
      'Mobile Roboter transportieren Material, automatisieren den Palettentransport und ermöglichen Goods-to-Person-Konzepte in Lagern und Produktionslinien – das reduziert manuelle Transporte und entlastet Mitarbeitende für höherwertige Aufgaben.',
      'MegaRobotics unterstützt Auswahl und Rollout von AMRs, AGVs, fahrerlosen Staplern und Tunnel-AMRs – inklusive Flottenkonzepten und Anbindung an Ihre Lagersysteme.',
    ],
  },
  {
    _id: 'BcZlIXMtUldsliYl5Npg0Q',
    slug: 'sanding-polishing-painting',
    icon: 'Paintbrush',
    industries: ['automotive'],
    titleEn: 'Robotic sanding, polishing and painting',
    titleDe: 'Robotisches Schleifen, Polieren und Lackieren',
    bodyEn: [
      'Surface-finishing cells for automotive aftermarket and metalworking environments combine force-controlled arms and specialised end-effectors to deliver consistent results on demanding geometries.',
      'We help specify force-controlled arms, compliant end-effectors and paint robots for repeatable surface-finishing results in demanding shop-floor conditions.',
    ],
    bodyDe: [
      'Oberflächenbearbeitungs-Zellen für den Automotive-Aftermarket und die Metallverarbeitung kombinieren kraftgeregelte Arme und spezialisierte Endeffektoren für konsistente Ergebnisse an anspruchsvollen Geometrien.',
      'Wir unterstützen die Spezifikation kraftgeregelter Arme, nachgiebiger Endeffektoren und Lackierroboter für reproduzierbare Oberflächenergebnisse unter anspruchsvollen Werkstattbedingungen.',
    ],
  },
  {
    _id: 'QGxHPXHFgKeZjQ8KE49lbT',
    slug: 'inspection-security',
    icon: 'ShieldCheck',
    industries: ['inspection-security', 'facility-service'],
    titleEn: 'Industrial inspection and security robotics',
    titleDe: 'Industrielle Inspektions- und Sicherheitsrobotik',
    bodyEn: [
      'Mobile, legged and stationary inspection systems carry out factory patrol, thermal imaging and remote monitoring, including in hazardous areas where continuous human presence is impractical.',
      'MegaRobotics helps evaluate quadruped robots, indoor AMRs and pan-tilt-zoom inspection stations for autonomous patrol, thermal inspection and remote monitoring.',
    ],
    bodyDe: [
      'Mobile, schreitende und stationäre Inspektionssysteme übernehmen Anlagen-Patrouillen, Thermografie und Fernüberwachung – auch in Gefahrenbereichen, in denen dauerhafte menschliche Präsenz unpraktisch ist.',
      'MegaRobotics hilft bei der Bewertung von Laufrobotern, Indoor-AMRs und PTZ-Inspektionsstationen für autonome Patrouillen, Thermografie und Fernüberwachung.',
    ],
  },
  {
    _id: 'BcZlIXMtUldsliYl5Npfc2',
    slug: 'cleaning-facility',
    icon: 'Sparkles',
    industries: ['facility-service'],
    titleEn: 'Cleaning and facility automation',
    titleDe: 'Reinigung und Gebäudeautomatisierung',
    bodyEn: [
      'Commercial and industrial cleaning robots cover floors, large surfaces and recurring facility tasks, delivering consistent coverage while reducing repetitive manual workload.',
      'We help select autonomous scrubbers, sweepers and service robots for recurring floor-cleaning and facility-upkeep tasks at commercial and industrial scale.',
    ],
    bodyDe: [
      'Gewerbliche und industrielle Reinigungsroboter übernehmen Böden, große Flächen und wiederkehrende Anlagenaufgaben und liefern eine gleichmäßige Abdeckung bei geringerer manueller Routinearbeit.',
      'Wir unterstützen die Auswahl autonomer Scheuersaugmaschinen, Kehrmaschinen und Serviceroboter für wiederkehrende Bodenreinigungs- und Gebäudeaufgaben im gewerblichen und industriellen Maßstab.',
    ],
  },
  {
    _id: 'XuGkglS3BiA4fLkYuRj2oJ',
    slug: 'research-education',
    icon: 'GraduationCap',
    industries: ['research-education'],
    titleEn: 'Research and education robotics',
    titleDe: 'Forschungs- und Bildungsrobotik',
    bodyEn: [
      'Universities, applied-research labs and robotics teaching environments need platforms that match their experiments and budgets, from humanoid and quadruped research to teaching cells.',
      'MegaRobotics provides platform evaluation and procurement support for humanoids, quadrupeds, research-grade arms and mobile manipulators used in teaching and applied research.',
    ],
    bodyDe: [
      'Universitäten, anwendungsorientierte Forschungslabore und robotische Lehrumgebungen benötigen Plattformen, die zu ihren Experimenten und Budgets passen – von Humanoid- und Laufroboter-Forschung bis zu Lehrzellen.',
      'MegaRobotics bietet Plattform-Evaluierung und Beschaffungsunterstützung für Humanoide, Laufroboter, forschungstaugliche Arme und mobile Manipulatoren in Lehre und angewandter Forschung.',
    ],
  },
  {
    _id: 'BcZlIXMtUldsliYl5Npfj0',
    slug: 'humanoid-embodied-ai',
    icon: 'Bot',
    industries: ['research-education', 'facility-service'],
    titleEn: 'Humanoid and embodied AI pilot projects',
    titleDe: 'Humanoide und Embodied-AI-Pilotprojekte',
    bodyEn: [
      'Early-stage feasibility and pilot work with humanoid and embodied-AI platforms takes place in controlled industrial and service environments, where locomotion, manipulation and human-robot interaction are assessed before wider rollout.',
      'We help scope feasibility and pilot projects with humanoid robots, bi-manual platforms and embodied-AI research kits in controlled industrial and service settings.',
    ],
    bodyDe: [
      'Frühphasen-Machbarkeitsstudien und Pilotarbeiten mit humanoiden und Embodied-AI-Plattformen finden in kontrollierten industriellen und Service-Umgebungen statt, in denen Lokomotion, Manipulation und Mensch-Roboter-Interaktion vor einem breiteren Rollout bewertet werden.',
      'Wir unterstützen Machbarkeits- und Pilotprojekte mit humanoiden Robotern, bimanuellen Plattformen und Embodied-AI-Forschungskits in kontrollierten Industrie- und Serviceumgebungen.',
    ],
  },
]

async function run() {
  let tx = client.transaction()
  for (const s of SOLUTIONS) {
    tx = tx.patch(s._id, (p) =>
      p.set({
        icon: s.icon,
        industries: refs(...s.industries),
        body: { en: blocks(...s.bodyEn), de: blocks(...s.bodyDe) },
        seo: {
          metaTitle: { en: `${s.titleEn} | MegaRobotics`, de: `${s.titleDe} | MegaRobotics` },
          metaDescription: {
            en: EXCERPTS[s.slug].en,
            de: EXCERPTS[s.slug].de,
          },
        },
      }),
    )
    console.log(`queued: ${s.slug}`)
  }
  await tx.commit()
  console.log(`\nDone. Patched ${SOLUTIONS.length} solution documents.`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
