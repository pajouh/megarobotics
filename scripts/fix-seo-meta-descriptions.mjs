/**
 * Rewrites product `seo.metaDescription` values that were hard-truncated at 160
 * characters by an earlier import (they end mid-word with "..."). Replacements
 * are complete sentences under ~155 characters, drawn only from facts already
 * present in each product's own description — no new claims.
 *
 * Several products also carried the English text in the German field; those get
 * a real German description here.
 *
 * Usage: node --env-file=.env.local scripts/fix-seo-meta-descriptions.mjs [--dry]
 */
import { createClient } from '@sanity/client'

const DRY = process.argv.includes('--dry')

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error('Missing SANITY_API_TOKEN. Run with: node --env-file=.env.local ...')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wudur8e8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// id -> { en?, de? }. Omitting a locale leaves that value untouched.
const DESCRIPTIONS = {
  '27ec1a25-fd10-4f04-8f6b-cc89aa068a17': {
    en: 'Pudu D9 high-capacity delivery robot: open-tray design for busy restaurants, large hotels and commercial kitchens. Request availability from MegaRobotics.',
    de: 'Pudu D9 Lieferroboter mit hoher Kapazität: offenes Tablettdesign für Restaurants, Hotels und Großküchen. Verfügbarkeit bei MegaRobotics anfragen.',
  },
  '3368f057-cd60-42b7-8a3d-06e897756e9b': {
    en: 'BellaBot Pro by Pudu Robotics: premium delivery robot with improved navigation and a larger payload for restaurants and hotels. Enquire at MegaRobotics.',
    de: 'BellaBot Pro von Pudu Robotics: Premium-Lieferroboter mit verbesserter Navigation und höherer Nutzlast für Restaurants und Hotels. Jetzt anfragen.',
  },
  '3a808880-3833-4a90-8416-4343a0c439e2': {
    en: 'Pudu FlashBot: high-speed delivery robot for fast-paced restaurants, built for large delivery volumes with intelligent navigation. Enquire at MegaRobotics.',
    de: 'Pudu FlashBot: Hochgeschwindigkeits-Lieferroboter für stark frequentierte Restaurants, mit intelligenter Navigation. Bei MegaRobotics anfragen.',
  },
  'e5fdc4dd-00c5-4072-b4ae-879e06a01d1d': {
    en: 'Pudu PuduBot 2: intelligent delivery robot with multiple trays for multi-order service in restaurants and hotels. Request availability from MegaRobotics.',
    de: 'Pudu PuduBot 2: intelligenter Lieferroboter mit mehreren Ablagen für Mehrfachlieferungen in Restaurants und Hotels. Verfügbarkeit anfragen.',
  },
  'f17037e6-9872-4c5b-a665-a071e3a71e5b': {
    en: 'KettyBot Pro by Pudu Robotics: service robot combining delivery, reception and promotion on a large display. For restaurants, hotels and retail.',
    de: 'KettyBot Pro von Pudu Robotics: Serviceroboter mit großem Display für Lieferung, Empfang und Werbung. Für Restaurants, Hotels und Einzelhandel.',
  },
  'ff07a5f7-7a30-4ac5-adb8-cc9d4dadc8d9': {
    en: 'PUDU D5-W industrial quadruped robot: NVIDIA Orin + RK3588 with 275 TOPS, dual 3D LiDAR and 360° perception. Request availability from MegaRobotics.',
    de: 'PUDU D5-W Vierbeinroboter für die Industrie: NVIDIA Orin + RK3588 mit 275 TOPS, zwei 3D-LiDAR und 360°-Wahrnehmung. Verfügbarkeit anfragen.',
  },
  'product-agibot-d1ultra': {
    en: 'AGIBOT D1 Ultra: industrial compact quadruped with IP54 protection, reinforcement-learning gait control and 48 N·m peak torque motors.',
    de: 'AGIBOT D1 Ultra: kompakter Industrie-Vierbeiner mit IP54-Schutz, Reinforcement-Learning-Gangsteuerung und 48 N·m Spitzendrehmoment.',
  },
  'product-autel-evo-ii-pro': {
    en: 'Autel EVO II Pro: 1-inch CMOS sensor, 6K video, 40-minute flight time and advanced obstacle avoidance for professional aerial photography.',
    de: 'Autel EVO II Pro: 1-Zoll-CMOS-Sensor, 6K-Video, 40 Minuten Flugzeit und Hindernisvermeidung für professionelle Luftaufnahmen.',
  },
  // EN already reads as a complete sentence — only the German was truncated.
  'product-autel-evo-nano-plus': {
    de: 'EVO Nano+: Drohne unter 250 g mit 1/1,28-Zoll-CMOS-Sensor, 4K-HDR-Video und 3-Wege-Hindernisvermeidung in kompaktem Design.',
  },
  'product-dji-mavic-3-pro': {
    de: 'DJI Mavic 3 Pro: Dreifachkamerasystem mit Hasselblad-Hauptkamera, mittlerem Tele und Teleobjektiv für maximale kreative Flexibilität.',
  },
  'product-dobot-magician': {
    en: 'Dobot Magician: the first desktop-grade 4-axis robot arm. 3D printing, laser engraving, drawing and pick-and-place. CES 2018 Innovation Award winner.',
    de: 'Dobot Magician: der erste 4-Achsen-Roboterarm im Desktop-Format. 3D-Druck, Lasergravur, Zeichnen und Pick-and-Place. CES 2018 Innovation Award.',
  },
  'product-elite-robot-ec66': {
    de: 'Der EC66 ist ein vielseitiger 6-Achsen-Cobot für die sichere Mensch-Roboter-Kollaboration in industriellen Anwendungen.',
  },
  'product-hai-robotics-acr-a42t': {
    en: 'Hai Robotics A42T: flagship autonomous case-handling robot (ACR) that picks and transports totes at heights up to 10 metres in warehouses.',
    de: 'Hai Robotics A42T: ACR-Flaggschiff, das Behälter in Höhen bis 10 Meter aufnimmt und transportiert — für moderne Lagerlogistik.',
  },
  'product-hikrobot-amr-latent': {
    en: 'Hikrobot Latent Mobile Robot: AMR for intelligent manufacturing that navigates complex factory environments and transports materials autonomously.',
    de: 'Hikrobot Latent Mobile Robot: AMR für die intelligente Fertigung, der komplexe Produktionsumgebungen autonom navigiert und Material transportiert.',
  },
  'product-keenon-t8': {
    en: 'KEENON T8: service robot for luxury hotels with autonomous delivery, elevator integration and elegant guest interaction.',
    de: 'KEENON T8: Serviceroboter für Luxushotels mit autonomer Lieferung, Aufzugsanbindung und eleganter Gästeinteraktion.',
  },
  'product-keenon-w3-cleaning': {
    en: 'KEENON W3: commercial cleaning robot that autonomously scrubs and vacuums large floor areas in malls, airports and office buildings.',
    de: 'KEENON W3: gewerblicher Reinigungsroboter, der große Flächen in Einkaufszentren, Flughäfen und Bürogebäuden autonom schrubbt und saugt.',
  },
  'product-limx-oli': {
    en: 'LimX OLI: full-size humanoid robot, 165 cm tall with 31 degrees of freedom, reinforcement-learning motion control and a modular design.',
    de: 'LimX OLI: humanoider Roboter in Vollgröße, 165 cm hoch mit 31 Freiheitsgraden, Reinforcement-Learning-Bewegungssteuerung und modularem Aufbau.',
  },
  'product-limx-tron2': {
    en: 'LimX TRON 2: multi-form robot with dual-arm, wheeled-leg and sole configurations plus an all-in-one VLA platform for embodied AI.',
    de: 'LimX TRON 2: multiformer Roboter mit Doppelarm-, Radbein- und Sohlen-Konfiguration sowie All-in-One-VLA-Plattform für verkörperte KI.',
  },
  'product-orionstar-lucki': {
    en: 'OrionStar Lucki: service robot for retail, offering customer assistance, product recommendations and interactive in-store experiences.',
    de: 'OrionStar Lucki: Serviceroboter für den Einzelhandel mit Kundenberatung, Produktempfehlungen und interaktiven Erlebnissen im Store.',
  },
  // Source description is a mangled spec dump; reduced to what it actually states.
  'product-siasun-scr5-cobot': {
    en: 'SIASUN GCR5-910: 6-axis collaborative robot from the GCR series, combining cobot safety and ease of use with higher payload and reach.',
    de: 'SIASUN GCR5-910: 6-Achsen-Cobot der GCR-Serie — kollaborative Sicherheit und einfache Bedienung bei hoher Nutzlast und Reichweite.',
  },
  'product-siasun-sr210c': {
    en: 'SIASUN SR210C: heavy-duty industrial robot with 210 kg payload for automotive manufacturing, heavy material handling and spot welding.',
    de: 'SIASUN SR210C: Schwerlast-Industrieroboter mit 210 kg Nutzlast für Automobilfertigung, schwere Materialhandhabung und Punktschweißen.',
  },
  'product-unitree-a2': {
    en: 'Unitree A2 Stellar Explorer: 37 kg industrial quadruped with dual-sided LiDAR, hot-swappable batteries and a 100 kg standing load.',
    de: 'Unitree A2 Stellar Explorer: 37 kg schwerer Industrie-Vierbeiner mit beidseitigem LiDAR, Hot-Swap-Akkus und 100 kg Standlast.',
  },
  'product-unitree-go2': {
    en: 'Unitree Go2: consumer-grade quadruped robot with GPT-4 integration, advanced terrain adaptation and outstanding price-to-performance.',
    de: 'Unitree Go2: Vierbeinroboter der Consumer-Klasse mit GPT-4-Integration, fortschrittlicher Geländeanpassung und starkem Preis-Leistungs-Verhältnis.',
  },

  // --- MagicLab: complete sentences, but 169-218 chars, so Google cuts them off
  // in results. Same visible symptom as the truncated set above, different cause.
  '054486b8-67d6-41bb-ae4e-970cdb4816a7': {
    en: 'MagicLab MagicDog-W wheeled quadruped: 17 motors, ≥3 m/s, 10 kg payload, ≥60 cm climbing. For research, events and patrol. Enquire at MegaRobotics.',
    de: 'MagicLab MagicDog-W Rad-Quadruped: 17 Motoren, ≥3 m/s, 10 kg Nutzlast, ≥60 cm Steighöhe. Für Forschung, Events und Patrouille. Jetzt anfragen.',
  },
  '30ebd688-635d-4f91-a29a-caa03dfd9230': {
    en: 'MagicLab MagicDog Pro quadruped: 15.8 kg, 3 m/s, 5 kg payload, LiDAR and 4K vision. For demonstration, education and development. Enquire now.',
    de: 'MagicLab MagicDog Pro Vierbeiner: 15,8 kg, 3 m/s, 5 kg Nutzlast, LiDAR und 4K-Kamera. Für Vorführung, Ausbildung und Entwicklung. Jetzt anfragen.',
  },
  '515e0f40-2741-485e-a4ee-c17381cf0a9a': {
    en: 'MagicLab MagicBot Z1 guided-tour humanoid with automated routing and narration for showrooms, museums and bank branches. 1369 mm, 24–50 DOF.',
    de: 'MagicLab MagicBot Z1 humanoider Führungsroboter mit automatischer Tour und Sprachvortrag für Showrooms, Museen und Bankfilialen. 1369 mm, 24–50 DOF.',
  },
  '7bb18a8b-d87b-4bbf-b9b9-1eb34ef0cf07': {
    en: 'MagicLab MagicDog Edu quadruped for secondary development: open SDK, sensor interfaces and sample projects for robotics teaching and research.',
    de: 'MagicLab MagicDog Edu Vierbeiner für die Zweitentwicklung: offenes SDK, Sensorschnittstellen und Beispielprojekte für Lehre und Forschung.',
  },
  '7d0afb43-c1ea-45cb-acde-778a59fbbd35': {
    en: 'MagicLab MagicBot Z1 half-size humanoid developer robot: 1369 mm, 24–50 DOF, 3 kg arm payload, 2.5 m/s. For embodied AI research and teaching.',
    de: 'MagicLab MagicBot Z1 humanoider Entwickler-Roboter, halbe Baugröße: 1369 mm, 24–50 DOF, 3 kg Armtraglast, 2,5 m/s. Für Embodied-AI-Forschung.',
  },
  '89a9663b-a626-4748-848f-e3040ef7ebbb': {
    en: 'MagicLab MagicDog-W Laser wheeled quadruped with LiDAR for mapping, localisation and autonomous navigation. 17 motors, ≥3 m/s, 10 kg payload.',
    de: 'MagicLab MagicDog-W Laser Rad-Quadruped mit LiDAR für Kartierung, Lokalisierung und autonome Navigation. 17 Motoren, ≥3 m/s, 10 kg Nutzlast.',
  },
  '90cd6050-63ae-4b5c-8a8c-7570702a57b3': {
    en: 'MagicLab MagicBot Z1 humanoid with 11-DOF tactile dexterous hands and 0.1 N resolution for manipulation research and embodied AI data collection.',
    de: 'MagicLab MagicBot Z1 humanoider Roboter mit taktilen Fünffingerhänden (11 DOF, 0,1 N) für Manipulationsforschung und Embodied-AI-Datenerfassung.',
  },
  'c06fe1ba-91b3-4edb-9240-bbee9e86d7bf': {
    en: 'MagicLab MagicBot Gen1 full-size humanoid: 1740 mm, 42 DOF, 7.5 kg arm payload, 100 TOPS. For guided tours, embodied AI research and data collection.',
    de: 'MagicLab MagicBot Gen1 humanoider Roboter in voller Baugröße: 1740 mm, 42 DOF, 7,5 kg Armtraglast, 100 TOPS. Für Führungen und Embodied-AI-Forschung.',
  },
  'cc54014a-c68c-4369-9177-16bb6384ad91': {
    en: 'MagicLab MagicDog Y1 industrial quadruped: IP67, −20 to 55 °C, 150 kg payload, 6 m/s, 157 TOPS. For inspection, patrol and emergency response.',
    de: 'MagicLab MagicDog Y1 Industrie-Quadruped: IP67, −20 bis 55 °C, 150 kg Traglast, 6 m/s, 157 TOPS. Für Inspektion, Patrouille und Notfalleinsätze.',
  },
  'd1a1011b-9ccd-4121-ab70-89e07e583830': {
    en: 'MagicLab MagicHand S01 five-finger tactile hand: 11 DOF, 9.1 kg grip force, 5 kg payload, 0.1 N resolution, RS485/EtherCAT, C++ SDK.',
    de: 'MagicLab MagicHand S01 taktile Fünffingerhand: 11 DOF, 9,1 kg Greifkraft, 5 kg Traglast, 0,1 N Auflösung, RS485/EtherCAT, C++-SDK.',
  },

  // --- German field held a verbatim copy of the English text, so /de/ product
  // pages shipped an English meta description. EN left as-is where it was fine.
  'product-estun-ecr5': {
    de: 'Der ESTUN ECR5 ist ein Cobot mit 5 kg Nutzlast für die sichere Zusammenarbeit mit Menschen — intuitiv programmierbar und flexibel einsetzbar.',
  },
  'product-estun-er20-1780': {
    de: 'Der ESTUN ER20 ist ein vielseitiger 6-Achsen-Industrieroboter mit 20 kg Nutzlast und 1780 mm Reichweite für Schweißen, Handhabung und Montage.',
  },
  'product-fourier-gr-1': {
    de: 'Der GR-1 ist der humanoide Allzweckroboter von Fourier Intelligence — entwickelt für Forschung und den praktischen Einsatz.',
  },
  'product-geekplus-p800': {
    de: 'Der P800 ist ein autonomer mobiler Roboter (AMR) mit hoher Kapazität für die Lagerkommissionierung mit Nutzlasten bis 1000 kg.',
  },
  'product-hai-robotics-haipick-a3': {
    de: 'Der HaiPick A3 ist ein kompakter Behälter-Handhabungsroboter (ACR) für den flexiblen Einsatz in Lagern mit geringerer Deckenhöhe.',
  },
  'product-hikrobot-mv-cs-camera': {
    de: 'Die Industriekameras der MV-CS-Serie liefern hochauflösende Bilder für Qualitätsprüfung, Messtechnik und Automatisierung in der Fertigung.',
  },
  'product-pudu-bellabot': {
    de: 'BellaBot ist ein Lieferroboter im Katzendesign für Restaurants — mit ausdrucksstarker Interaktion und zuverlässiger etagenübergreifender Lieferung.',
  },
  'product-pudu-kettybot': {
    de: 'KettyBot verbindet Lieferfunktionen mit einem großen Display für Werbung und interaktive Kundenansprache.',
  },
  'product-ubtech-walker-x': {
    de: 'Walker X ist der fortschrittlichste humanoide Roboter von UBTECH — er geht, greift und interagiert in komplexen Umgebungen.',
  },
  'product-unitree-b2': {
    de: 'Der Unitree B2 ist für Industrieinspektion, Sicherheitspatrouille und Forschung ausgelegt — robuste Leistung auch unter rauen Bedingungen.',
  },
  'product-unitree-g1': {
    de: 'Der Unitree G1 ist ein humanoider Roboter, dessen Preis zweibeinige Robotik für Forschung, Entwicklung und Enthusiasten zugänglich macht.',
  },
  'product-unitree-go2-w': {
    de: 'Der Go2-W verbindet die Agilität eines Vierbeinroboters mit der Effizienz von Rädern und erreicht bis zu 25 km/h.',
  },
}

// Google renders roughly 155-160 characters of a description; past that it cuts
// mid-phrase, which is the symptom this script exists to remove.
const MAX = 155

async function run() {
  const ids = Object.keys(DESCRIPTIONS)

  // Guard: a length regression here would put truncated text back on the site.
  let invalid = 0
  for (const [id, v] of Object.entries(DESCRIPTIONS)) {
    for (const [loc, text] of Object.entries(v)) {
      if (text.length > MAX) {
        console.error(`✗ ${id}.${loc} is ${text.length} chars (max ${MAX})`)
        invalid++
      }
      if (/\.\.\.$|…$/.test(text.trim())) {
        console.error(`✗ ${id}.${loc} still ends in an ellipsis`)
        invalid++
      }
    }
  }
  if (invalid) {
    console.error(`\n${invalid} replacement(s) failed validation — nothing written.`)
    process.exit(1)
  }

  // Patch drafts too where they exist, otherwise a later publish would restore
  // the truncated text.
  const draftIds = await client.fetch(
    `*[_id in $ids]._id`,
    { ids: ids.map((id) => `drafts.${id}`) }
  )
  if (draftIds.length) {
    console.log(`Found ${draftIds.length} draft(s) that also need patching:`, draftIds)
  }

  let tx = client.transaction()
  let count = 0

  for (const [id, values] of Object.entries(DESCRIPTIONS)) {
    const set = Object.fromEntries(
      Object.entries(values).map(([loc, text]) => [`seo.metaDescription.${loc}`, text])
    )
    const targets = [id, ...(draftIds.includes(`drafts.${id}`) ? [`drafts.${id}`] : [])]
    for (const target of targets) {
      console.log(`${DRY ? '[dry] ' : ''}${target}`)
      for (const [k, v] of Object.entries(set)) console.log(`   ${k} (${v.length}) -> ${v}`)
      tx = tx.patch(target, (p) => p.set(set))
      count++
    }
  }

  if (DRY) {
    console.log(`\n[dry run] ${count} document patch(es) prepared, nothing written.`)
    return
  }

  await tx.commit()
  console.log(`\n✅ Patched ${count} document(s).`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
