// Content for the humanoid landing page at /pages/humanoid-robots (and /de/...).
//
// All figures come from the products' published Sanity entries; a dash in the
// comparison means the manufacturer gives no value there. When a product entry
// changes, change it here too. The page drops models that are no longer active
// in Sanity, so no card ever links to a 404.
//
// Mobile FR3 Duo is a Franka research prototype. Its figures follow Franka's
// prototype documentation (as on the product page); Franka's February 2026
// brochure gives 100 kg and 1.75 m/s for the base, which the fine print says.
// Images are manufacturer photos and renderings from the Sanity galleries.

import type { Locale } from '@/i18n/config'
import { localize } from '@/data/security-solution'

type L = { en: string; de: string }

const CDN = 'https://cdn.sanity.io/images/wudur8e8/production'
const same = (v: string): L => ({ en: v, de: v })
const NONE: L = { en: '–', de: '–' }

export type BrandKey = 'franka' | 'agile' | 'limx' | 'magiclab' | 'seer'
export type FilterKey = 'production' | 'research' | 'public' | 'legs' | 'wheels' | 'hands'

export const FILTER_KEYS: FilterKey[] = ['production', 'research', 'public', 'legs', 'wheels', 'hands']

/** Slides of the page's hero, in this order (product-heroes.ts has the clips). */
export const HUMANOID_HERO_SLUGS = [
  'mobile-fr3-duo',
  'agile-one',
  'agile-one-sn',
  'agile-one-s',
  'limx-oli',
  'magicbot-z1-standard',
  'seer-x1-pro',
]

interface HumanoidModel {
  slug: string
  name: L
  brand: BrandKey
  type: L
  image: string
  /** 'cover' for photos, 'contain' for cut-outs on a plain panel. */
  fit: 'cover' | 'contain'
  position?: string
  /** CSS background behind a 'contain' picture that brings its own backdrop. */
  backdrop?: string
  blurb: L
  specs: { label: L; value: L }[]
  tags: FilterKey[]
  row: { drive: L; height: L; weight: L; dof: L; payload: L; speed: L; runtime: L }
}

const S = {
  height: { en: 'Height', de: 'Größe' },
  weight: { en: 'Weight', de: 'Gewicht' },
  dof: { en: 'Degrees of freedom', de: 'Freiheitsgrade' },
  armPayload: { en: 'Payload per arm', de: 'Traglast pro Arm' },
  payload: { en: 'Payload', de: 'Traglast' },
  speed: { en: 'Speed', de: 'Tempo' },
  runtime: { en: 'Runtime', de: 'Laufzeit' },
  hands: { en: 'Hands', de: 'Hände' },
  compute: { en: 'Onboard AI', de: 'KI an Bord' },
}

const LEGS: L = { en: 'Two legs', de: 'Zwei Beine' }
const WHEELS: L = { en: 'Wheels', de: 'Räder' }

const MODELS: HumanoidModel[] = [
  {
    slug: 'mobile-fr3-duo',
    name: same('Mobile FR3 Duo'),
    brand: 'franka',
    type: { en: 'Mobile dual-arm system', de: 'Mobiles Zweiarmsystem' },
    image: `${CDN}/bbd6a46fe2226d3e24064ec16c8f715d9980bd0d-2000x1125.png`,
    fit: 'cover',
    blurb: {
      en: 'Two Franka Research 3 arms on a lifting column and an omnidirectional base.',
      de: 'Zwei Arme Franka Research 3 auf Hubsäule und omnidirektionaler Basis.',
    },
    specs: [],
    tags: ['research', 'wheels'],
    row: {
      drive: { en: 'Omnidirectional base', de: 'Omnidirektionale Basis' },
      height: NONE,
      weight: NONE,
      dof: { en: '2 × 7 (arms)', de: '2 × 7 (Arme)' },
      payload: same('3 kg'),
      speed: { en: '1.5 m/s', de: '1,5 m/s' },
      runtime: NONE,
    },
  },
  {
    slug: 'agile-one',
    name: same('Agile ONE'),
    brand: 'agile',
    type: { en: 'Full-size industrial humanoid', de: 'Industrie-Humanoid in Menschengröße' },
    image: `${CDN}/95aa5ee13334401c13957835f407219318221c32-1050x591.jpg`,
    fit: 'cover',
    blurb: {
      en: 'Made for the production floor. Agile ONE walks between workstations on its own, works next to people and takes on changing tasks with hands that have 21 joints each, plus force and tactile sensing. Agile Robots trains its robot foundation models on real industrial data, simulation and teleoperation.',
      de: 'Für die Produktion gemacht. Agile ONE geht selbstständig von Arbeitsplatz zu Arbeitsplatz, arbeitet neben Menschen und übernimmt wechselnde Aufgaben mit Händen, die je 21 Gelenke sowie Kraft- und Tastsensoren haben. Agile Robots trainiert die Robot Foundation Models mit echten Industriedaten, Simulation und Teleoperation.',
    },
    specs: [
      { label: S.height, value: same('174 cm') },
      { label: S.weight, value: same('69 kg') },
      { label: S.payload, value: same('20 kg') },
      { label: S.speed, value: { en: '2.0 m/s', de: '2,0 m/s' } },
    ],
    tags: ['production', 'legs', 'hands'],
    row: {
      drive: LEGS,
      height: same('174 cm'),
      weight: same('69 kg'),
      dof: { en: '21 per hand', de: '21 pro Hand' },
      payload: same('20 kg*'),
      speed: { en: '2.0 m/s', de: '2,0 m/s' },
      runtime: NONE,
    },
  },
  {
    slug: 'agile-one-s',
    name: same('Agile ONE S'),
    brand: 'agile',
    type: { en: 'Compact research humanoid', de: 'Kompakter Forschungs-Humanoid' },
    image: `${CDN}/4fd5a8fdedd4fd7bbaecd94b639bea68d7caca1b-1280x1006.png`,
    fit: 'contain',
    blurb: {
      en: 'Open software stack for your own models and frameworks. Ships with passive hand models; a four-finger hand or two-finger gripper is optional. URDF and USD assets are included.',
      de: 'Offener Software-Stack für eigene Modelle und Frameworks. Ab Werk mit passiven Handmodellen, optional mit Vierfingerhand oder Zweifingergreifer. URDF- und USD-Modelle sind dabei.',
    },
    specs: [
      { label: S.height, value: { en: 'approx. 140 cm', de: 'ca. 140 cm' } },
      { label: S.weight, value: same('43 kg') },
      { label: S.dof, value: { en: '31 (without hands)', de: '31 (ohne Hände)' } },
      { label: S.compute, value: same('Jetson Thor T5000') },
    ],
    tags: ['research', 'legs', 'hands'],
    row: {
      drive: LEGS,
      height: { en: 'approx. 140 cm', de: 'ca. 140 cm' },
      weight: same('43 kg'),
      dof: { en: '31 (without hands)', de: '31 (ohne Hände)' },
      payload: { en: 'up to 3 kg', de: 'bis 3 kg' },
      speed: NONE,
      runtime: { en: 'approx. 2 h', de: 'ca. 2 h' },
    },
  },
  {
    slug: 'agile-one-sn',
    name: same('Agile ONE SN'),
    brand: 'agile',
    type: { en: 'Reference platform for NVIDIA Isaac GR00T', de: 'Referenzplattform für NVIDIA Isaac GR00T' },
    image: `${CDN}/38d281959857a4c9d5e44a400f71a908a11279d3-1280x1006.png`,
    fit: 'contain',
    blurb: {
      en: 'Agile ONE S with two Wuji tactile five-finger hands and wrist cameras, preconfigured with Isaac GR00T 1.7 and whole-body control. Assets for Isaac Sim and Isaac Lab are included.',
      de: 'Agile ONE S mit zwei taktilen Wuji-Fünffingerhänden und Handgelenkkameras, vorkonfiguriert mit Isaac GR00T 1.7 und Ganzkörpersteuerung. Modelle für Isaac Sim und Isaac Lab sind dabei.',
    },
    specs: [
      { label: S.height, value: same('140 cm') },
      { label: S.weight, value: same('43 kg') },
      { label: S.hands, value: { en: '2 × five fingers, tactile', de: '2 × fünf Finger, taktil' } },
      { label: S.compute, value: same('Jetson Thor T5000') },
    ],
    tags: ['research', 'legs', 'hands'],
    row: {
      drive: LEGS,
      height: same('140 cm'),
      weight: same('43 kg'),
      dof: { en: '31 (without hands)', de: '31 (ohne Hände)' },
      payload: same('3 kg'),
      speed: NONE,
      runtime: { en: 'approx. 2 h', de: 'ca. 2 h' },
    },
  },
  {
    slug: 'h10-w',
    name: same('H10-W'),
    brand: 'agile',
    type: { en: 'Humanoid torso on wheels', de: 'Humanoider Torso auf Rädern' },
    image: `${CDN}/93dc81d28831b9c8d849bebac19194dccbb751e6-1120x1160.jpg`,
    fit: 'contain',
    // The photo's own backdrop, carried on to the sides.
    backdrop: 'linear-gradient(#cad2df, #e1e5ee 25%, #f0f2f7 66%, #f9fafc 69%, #f4f5f9)',
    blurb: {
      en: 'Two torque-sensing 7-DoF arms based on Diana 3, a height-adjustable torso and a differential-drive base. Takes voice commands to pick, carry and place objects.',
      de: 'Zwei drehmomentsensitive 7-DoF-Arme auf Basis des Diana 3, höhenverstellbarer Torso und Basis mit Differenzialantrieb. Greift, trägt und platziert Objekte auf Sprachbefehl.',
    },
    specs: [
      { label: { en: 'Dimensions', de: 'Abmessungen' }, value: same('934 × 929 × 1820 mm') },
      { label: S.weight, value: { en: '230 kg with battery', de: '230 kg mit Akku' } },
      { label: S.dof, value: { en: '21+ (without hands)', de: '21+ (ohne Hände)' } },
      { label: S.armPayload, value: { en: '3 kg, max. 7 kg', de: '3 kg, max. 7 kg' } },
    ],
    tags: ['research', 'public', 'wheels', 'hands'],
    row: {
      drive: WHEELS,
      height: same('182 cm'),
      weight: same('230 kg'),
      dof: { en: '21+ (without hands)', de: '21+ (ohne Hände)' },
      payload: { en: '3 kg, max. 7 kg', de: '3 kg, max. 7 kg' },
      speed: same('6 km/h'),
      runtime: NONE,
    },
  },
  {
    slug: 'limx-oli',
    name: same('LimX Oli'),
    brand: 'limx',
    type: { en: 'Full-size humanoid in three versions', de: 'Humanoid in voller Größe, drei Versionen' },
    image: `${CDN}/8816b1d2b9e11f8aa576b4b4661dccd9a8f9b2f4-3200x1800.jpg`,
    fit: 'cover',
    blurb: {
      en: 'A modular humanoid for embodied-AI research and reinforcement learning, as Lite, EDU or Super. Python SDK with high-level and low-level control, URDF for sim-to-real transfer, and support for Isaac Sim, MuJoCo and Gazebo. EDU and Super add depth cameras and an Orin NX; LiDAR and 5G come with Super.',
      de: 'Ein modularer Humanoid für Embodied-AI-Forschung und Reinforcement Learning, als Lite, EDU oder Super. Python-SDK mit High-Level- und Low-Level-Steuerung, URDF für den Sim2Real-Transfer, dazu Isaac Sim, MuJoCo und Gazebo. EDU und Super bringen Tiefenkameras und Orin NX mit, LiDAR und 5G gibt es beim Super.',
    },
    specs: [
      { label: S.height, value: { en: '165 cm (Super: 175 cm)', de: '165 cm (Super: 175 cm)' } },
      { label: S.weight, value: { en: '≤ 55 kg (Super: ≤ 60 kg)', de: '≤ 55 kg (Super: ≤ 60 kg)' } },
      { label: { en: 'Active DoF', de: 'Aktive Freiheitsgrade' }, value: same('31 / 33 / 43') },
      { label: S.armPayload, value: { en: '3 kg (Super: 5 kg)', de: '3 kg (Super: 5 kg)' } },
    ],
    tags: ['research', 'legs', 'hands'],
    row: {
      drive: LEGS,
      height: same('165 / 175 cm'),
      weight: same('≤ 55 / ≤ 60 kg'),
      dof: same('31 / 33 / 43'),
      payload: same('3 / 5 kg'),
      speed: same('5 km/h'),
      runtime: { en: '~2 h (Lite), ~1.5 h', de: '~2 h (Lite), ~1,5 h' },
    },
  },
  {
    slug: 'limx-luna',
    name: same('LimX Luna'),
    brand: 'limx',
    type: { en: 'Humanoid for stage and visitors', de: 'Humanoid für Bühne und Publikum' },
    image: `${CDN}/c3d0f29b4a7745baf3bcabf258896a843cecc4a8-2500x1406.jpg`,
    fit: 'cover',
    blurb: {
      en: 'Made for shopping malls, museums, theme parks and live stages. Ships with 20 dance routines and 20 motion actions, learns moves from video and by hand guiding, and swaps its two batteries on the go.',
      de: 'Für Einkaufszentren, Museen, Freizeitparks und Bühnen. Bringt 20 Tanzroutinen und 20 Bewegungsaktionen mit, lernt Bewegungen aus Videos und durch Handführung und wechselt seine zwei Akkus im Betrieb.',
    },
    specs: [
      { label: S.height, value: same('160 cm') },
      { label: S.weight, value: { en: '56 kg with battery', de: '56 kg mit Akku' } },
      { label: { en: 'Active DoF', de: 'Aktive Freiheitsgrade' }, value: same('27') },
      { label: S.runtime, value: same('≈ 4 h') },
    ],
    tags: ['public', 'legs', 'hands'],
    row: {
      drive: LEGS,
      height: same('160 cm'),
      weight: same('56 kg'),
      dof: same('27'),
      payload: { en: 'max. 3 kg', de: 'max. 3 kg' },
      speed: same('5 km/h'),
      runtime: same('≈ 4 h'),
    },
  },
  {
    slug: 'limx-tron2',
    name: same('LimX TRON 2'),
    brand: 'limx',
    type: { en: 'Dual-arm, biped or wheeled', de: 'Doppelarm, Zweibeiner oder auf Rädern' },
    image: `${CDN}/8cbde5f80eac7043d855da19e9412e8cc354a2dc-2560x1489.jpg`,
    fit: 'cover',
    blurb: {
      en: 'One modular robot in three forms: dual arms, sole feet or wheeled legs. With teleoperation, data collection and VLA training on one platform; ROS 1 and 2, Python and C++.',
      de: 'Ein modularer Roboter in drei Formen: Doppelarm, Sohlenfüße oder Radbeine. Teleoperation, Datenerfassung und VLA-Training auf einer Plattform, mit ROS 1 und 2, Python und C++.',
    },
    specs: [
      { label: { en: 'DoF per arm / leg', de: 'Freiheitsgrade Arm / Bein' }, value: same('7 / 5') },
      { label: S.armPayload, value: { en: '5 kg (3 kg extended)', de: '5 kg (gestreckt 3 kg)' } },
      { label: { en: 'Repeatability', de: 'Wiederholgenauigkeit' }, value: { en: '±0.5 mm', de: '±0,5 mm' } },
      { label: S.speed, value: { en: 'up to 5 m/s on wheels', de: 'bis 5 m/s auf Rädern' } },
    ],
    tags: ['research', 'legs', 'wheels', 'hands'],
    row: {
      drive: { en: 'Legs or wheels', de: 'Beine oder Räder' },
      height: NONE,
      weight: NONE,
      dof: { en: '7 per arm, 5 per leg', de: '7 pro Arm, 5 pro Bein' },
      payload: same('5 kg'),
      speed: { en: '2–3 m/s, wheels 3–5 m/s', de: '2–3 m/s, Räder 3–5 m/s' },
      runtime: NONE,
    },
  },
  {
    slug: 'limx-tron1',
    name: same('LimX TRON 1'),
    brand: 'limx',
    type: { en: 'Biped research platform', de: 'Zweibeinige Forschungsplattform' },
    image: `${CDN}/a029251e3db91f492efed0ed0e13edadd0a34b22-3000x2880.png`,
    fit: 'contain',
    blurb: {
      en: 'A two-legged platform for a first step into reinforcement learning, with three interchangeable foot-ends, an open SDK and Python support. The arm kit shown is an option.',
      de: 'Zweibeinige Plattform für den Einstieg ins Reinforcement Learning, mit drei wechselbaren Fußenden, offenem SDK und Python-Unterstützung. Das gezeigte Arm-Kit ist eine Option.',
    },
    specs: [
      { label: S.height, value: { en: '≤ 845 mm (without arm)', de: '≤ 845 mm (ohne Arm)' } },
      { label: S.weight, value: same('≤ 20 kg') },
      { label: S.payload, value: same('≤ 10 kg') },
      { label: S.runtime, value: same('≤ 2 h') },
    ],
    tags: ['research', 'legs', 'wheels'],
    row: {
      drive: { en: 'Legs or wheels', de: 'Beine oder Räder' },
      height: same('≤ 85 cm'),
      weight: same('≤ 20 kg'),
      dof: NONE,
      payload: same('≤ 10 kg*'),
      speed: { en: '< 1 m/s, wheels ≤ 3 m/s', de: '< 1 m/s, Räder ≤ 3 m/s' },
      runtime: same('≤ 2 h'),
    },
  },
  {
    slug: 'magicbot-x1',
    name: same('MagicBot X1'),
    brand: 'magiclab',
    type: { en: 'Full-size humanoid', de: 'Humanoid in voller Größe' },
    image: `${CDN}/bbbbcf733267148e716c04f40c0af0dcdc100d76-1920x1080.png`,
    fit: 'cover',
    blurb: {
      en: 'MagicLab’s 1.80 m humanoid, with at least 350 N·m peak torque in the joints according to the manufacturer and two batteries that swap without a stop. The X1 Ultra developer edition adds an unlocked CPU, up to an NVIDIA Jetson AGX Thor, and support for your own development.',
      de: 'Der 1,80 m große Humanoid von MagicLab, laut Hersteller mit mindestens 350 N·m Spitzendrehmoment in den Gelenken und zwei Akkus, die sich ohne Stillstand wechseln lassen. Die Entwicklerversion X1 Ultra bringt eine freigeschaltete CPU, bis zu einem NVIDIA Jetson AGX Thor, und die Möglichkeit eigener Entwicklung mit.',
    },
    specs: [
      { label: S.height, value: same('180 cm') },
      { label: S.weight, value: same('70 kg') },
      { label: { en: 'Active DoF', de: 'Aktive Freiheitsgrade' }, value: same('31') },
      { label: { en: 'Batteries', de: 'Akkus' }, value: { en: '2, hot-swappable', de: '2, Wechsel im Betrieb' } },
    ],
    tags: ['production', 'research', 'public', 'legs'],
    row: {
      drive: LEGS,
      height: same('180 cm'),
      weight: same('70 kg'),
      dof: same('31'),
      payload: NONE,
      speed: NONE,
      runtime: NONE,
    },
  },
  {
    slug: 'magicbot-gen1',
    name: same('MagicBot Gen1'),
    brand: 'magiclab',
    type: { en: 'Full-size humanoid', de: 'Humanoid in voller Größe' },
    image: `${CDN}/80ba5728f45096c3b35fec1206ceecf90381efaa-1920x1080.jpg`,
    fit: 'cover',
    blurb: {
      en: 'For guided tours, embodied-AI research and precise handling. Tour mode with graphical task planning; tactile five-finger hands with 11 degrees of freedom are optional.',
      de: 'Für Führungen, Embodied-AI-Forschung und präzises Greifen. Führungsmodus mit grafischer Aufgabenplanung, optional taktile Fünffingerhände mit 11 Freiheitsgraden.',
    },
    specs: [
      { label: S.height, value: same('174 cm') },
      { label: S.weight, value: same('≈ 70 kg') },
      { label: S.dof, value: same('42') },
      { label: S.armPayload, value: { en: 'max. 7.5 kg', de: 'max. 7,5 kg' } },
    ],
    tags: ['research', 'public', 'legs', 'hands'],
    row: {
      drive: LEGS,
      height: same('174 cm'),
      weight: same('≈ 70 kg'),
      dof: same('42'),
      payload: { en: 'max. 7.5 kg', de: 'max. 7,5 kg' },
      speed: same('≥ 5 km/h'),
      runtime: NONE,
    },
  },
  {
    slug: 'magicbot-d1',
    name: same('MagicBot D1'),
    brand: 'magiclab',
    type: { en: 'Wheeled humanoid for industry', de: 'Humanoid auf Rädern für die Industrie' },
    image: `${CDN}/fe062059b12f38da32a8bc0769a2944db7709205-720x1280.jpg`,
    fit: 'cover',
    position: 'center 18%',
    blurb: {
      en: 'Two force-controlled 7-axis arms, 80 to 230 cm working height and a base that turns on the spot. Returns to its charging station by itself, and several units can be coordinated across a site.',
      de: 'Zwei kraftgeregelte 7-Achs-Arme, 80 bis 230 cm Arbeitshöhe und ein Fahrwerk, das auf der Stelle dreht. Fährt selbst zur Ladestation, mehrere Einheiten lassen sich im Werk koordinieren.',
    },
    specs: [
      { label: S.height, value: { en: 'approx. 122–179 cm', de: 'ca. 122–179 cm' } },
      { label: S.weight, value: { en: 'approx. 185 kg', de: 'ca. 185 kg' } },
      { label: S.armPayload, value: same('5 kg') },
      { label: S.compute, value: same('Jetson Thor') },
    ],
    tags: ['production', 'wheels', 'hands'],
    row: {
      drive: { en: 'Omnidirectional base', de: 'Omnidirektionale Basis' },
      height: same('122–179 cm'),
      weight: { en: 'approx. 185 kg', de: 'ca. 185 kg' },
      dof: { en: '2 × 7 (arms) + 7', de: '2 × 7 (Arme) + 7' },
      payload: same('5 kg'),
      speed: { en: '1.5 m/s', de: '1,5 m/s' },
      runtime: { en: 'approx. 4 h per battery set', de: 'ca. 4 h je Akkusatz' },
    },
  },
  {
    slug: 'magicbot-z1-standard',
    name: same('MagicBot Z1'),
    brand: 'magiclab',
    type: { en: 'Half-size developer humanoid', de: 'Entwickler-Humanoid, halbe Baugröße' },
    image: `${CDN}/441d07c40da13efd6032c177dc4d736ca0e48f98-3200x1840.jpg`,
    fit: 'cover',
    blurb: {
      en: 'Compact platform for locomotion and embodied AI. Walks, runs and gets back up after a fall; 3D LiDAR, depth and fisheye cameras, quick-release battery and a development kit.',
      de: 'Kompakte Plattform für Fortbewegung und Embodied AI. Geht, läuft und steht nach einem Sturz wieder auf, mit 3D-LiDAR, Tiefen- und Fischaugenkameras, Wechselakku und Entwicklungskit.',
    },
    specs: [
      { label: S.height, value: same('137 cm') },
      { label: S.weight, value: { en: '40 kg+ with battery', de: '40 kg+ mit Akku' } },
      { label: { en: 'Joint motors', de: 'Gelenkmotoren' }, value: same('24–50') },
      { label: S.armPayload, value: { en: 'max. 3 kg', de: 'max. 3 kg' } },
    ],
    tags: ['research', 'legs'],
    row: {
      drive: LEGS,
      height: same('137 cm'),
      weight: same('40 kg+'),
      dof: same('24–50'),
      payload: { en: 'max. 3 kg', de: 'max. 3 kg' },
      speed: { en: '≥ 2.5 m/s', de: '≥ 2,5 m/s' },
      runtime: NONE,
    },
  },
  {
    slug: 'magicbot-z1-dexterous-hands',
    name: { en: 'MagicBot Z1 with Dexterous Hands', de: 'MagicBot Z1 mit Fünffingerhänden' },
    brand: 'magiclab',
    type: { en: 'Z1 for fine manipulation', de: 'Z1 für die Feinmanipulation' },
    image: `${CDN}/29db80498e2fccb7525844a0a5e0564d1bb4cc31-3200x1840.jpg`,
    fit: 'cover',
    blurb: {
      en: 'The Z1 with tactile five-finger hands, 11 degrees of freedom each and 0.1 N sensor resolution, for grasping, pressing, lifting and pushing.',
      de: 'Der Z1 mit taktilen Fünffingerhänden, je 11 Freiheitsgrade und 0,1 N Sensorauflösung, zum Greifen, Drücken, Heben und Schieben.',
    },
    specs: [
      { label: S.height, value: same('137 cm') },
      { label: S.weight, value: { en: '40 kg+ with battery', de: '40 kg+ mit Akku' } },
      { label: S.hands, value: { en: '11 DoF per hand, tactile', de: '11 DoF pro Hand, taktil' } },
      { label: S.armPayload, value: { en: 'max. 3 kg', de: 'max. 3 kg' } },
    ],
    tags: ['research', 'legs', 'hands'],
    row: {
      drive: LEGS,
      height: same('137 cm'),
      weight: same('40 kg+'),
      dof: { en: '11 per hand', de: '11 pro Hand' },
      payload: { en: 'max. 3 kg', de: 'max. 3 kg' },
      speed: NONE,
      runtime: NONE,
    },
  },
  {
    slug: 'magicbot-z1-auto-tour-narration',
    name: same('MagicBot Z1 Auto Tour & Narration'),
    brand: 'magiclab',
    type: { en: 'Z1 as a tour guide', de: 'Z1 als Tourguide' },
    image: `${CDN}/9a7f2fbe467b2971a8a0dd0134056f5c6dddef11-3200x1840.jpg`,
    fit: 'cover',
    blurb: {
      en: 'The Z1 set up for guided tours: plans the route, walks ahead and explains. For showrooms, museums, visitor centres and bank branches.',
      de: 'Der Z1 für Führungen: plant die Route, geht voran und erklärt. Für Showrooms, Museen, Besucherzentren und Bankfilialen.',
    },
    specs: [
      { label: S.height, value: same('137 cm') },
      { label: S.weight, value: { en: '40 kg+ with battery', de: '40 kg+ mit Akku' } },
      { label: { en: 'Joint motors', de: 'Gelenkmotoren' }, value: same('24–50') },
      { label: S.speed, value: { en: '≥ 2.5 m/s', de: '≥ 2,5 m/s' } },
    ],
    tags: ['public', 'legs'],
    row: {
      drive: LEGS,
      height: same('137 cm'),
      weight: same('40 kg+'),
      dof: same('24–50'),
      payload: NONE,
      speed: { en: '≥ 2.5 m/s', de: '≥ 2,5 m/s' },
      runtime: NONE,
    },
  },
  {
    slug: 'seer-x1-pro',
    name: same('SEER X1-PRO'),
    brand: 'seer',
    type: { en: 'Wheeled humanoid, on request', de: 'Humanoid auf Rädern, auf Anfrage' },
    image: `${CDN}/8d7a509f6b2624e57e92fb03cd3ba724e31f5fbc-1200x1200.jpg`,
    fit: 'cover',
    position: 'center 12%',
    blurb: {
      en: 'For picking from shelves, sorting and loading. Two 7-axis arms carry 6 kg each, the body lifts by 700 mm and bends by up to 45°. According to SEER it takes its tasks in natural language. We check delivery to Europe and the conformity documents with SEER for each enquiry.',
      de: 'Für Entnahme aus dem Regal, Sortieren und Beladen. Zwei 7-Achs-Arme tragen je 6 kg, der Körper hebt um 700 mm und beugt sich bis 45°. Nach Angaben von SEER nimmt er Aufgaben in natürlicher Sprache entgegen. Liefermöglichkeit in Europa und Konformitätsunterlagen klären wir bei jeder Anfrage mit SEER.',
    },
    specs: [
      { label: S.dof, value: { en: 'up to 40', de: 'bis 40' } },
      { label: S.armPayload, value: same('6 kg') },
      { label: { en: 'Both arms, short-term', de: 'Beide Arme, kurzzeitig' }, value: same('16 kg') },
      { label: { en: 'Lift', de: 'Hub' }, value: same('700 mm') },
    ],
    tags: ['production', 'wheels'],
    row: {
      drive: { en: 'Omnidirectional base', de: 'Omnidirektionale Basis' },
      height: NONE,
      weight: NONE,
      dof: { en: 'up to 40', de: 'bis 40' },
      payload: same('6 kg'),
      speed: NONE,
      runtime: NONE,
    },
  },
]

const content = {
  meta: {
    title: {
      en: 'Buy Humanoid Robots: Models Compared | MegaRobotics',
      de: 'Humanoide Roboter kaufen: Modelle im Vergleich | MegaRobotics',
    },
    description: {
      en: 'Humanoid robots from Franka, Agile Robots, LimX, MagicLab and SEER compared: specs, scope of delivery and advice for production, research and events.',
      de: 'Humanoide Roboter von Franka, Agile Robots, LimX, MagicLab und SEER im Vergleich: Daten, Lieferumfang und Beratung für Produktion, Forschung und Events.',
    },
    crumb: { en: 'Humanoid robots', de: 'Humanoide Roboter' },
  },

  hero: {
    carousel: { en: 'Humanoid robots in our range', de: 'Humanoide Roboter in unserem Programm' },
    discover: { en: 'Discover {product}', de: '{product} entdecken' },
    fullSystem: { en: 'See the full system', de: 'Komplettsystem ansehen' },
    request: { en: 'Request a quote', de: 'Angebot anfragen' },
  },

  intro: {
    eyebrow: { en: 'Humanoid robots', de: 'Humanoide Roboter' },
    title: { en: 'Buy humanoid robots', de: 'Humanoide Roboter kaufen' },
    lead: {
      en: 'Everything we offer in humanoids on one page: {count} models from five manufacturers, from the mobile research system to the full-size production humanoid.',
      de: 'Unser gesamtes Angebot an Humanoiden auf einer Seite: {count} Modelle von fünf Herstellern, vom mobilen Forschungssystem bis zum Produktions-Humanoid in Menschengröße.',
    },
    body: {
      en: 'Humanoid robots, or humanoids for short, have a torso, arms and usually a head, and either walk on two legs or drive on wheels. If you want to buy one, start with the job it has to do. That decides the size, the hands and the software.',
      de: 'Humanoide Roboter sind menschenähnliche Roboter mit Rumpf, Armen und meist einem Kopf, die auf zwei Beinen laufen oder auf Rädern fahren. Wer einen kaufen möchte, legt am besten zuerst die Aufgabe fest. Davon hängen Größe, Hände und Software ab.',
    },
    jobs: [
      {
        icon: 'FlaskConical',
        title: { en: 'Physical AI and manipulation research', de: 'Physical AI und Manipulation' },
        body: { en: 'Record, train and run skills with two sensitive arms.', de: 'Fähigkeiten aufzeichnen, trainieren und ausführen, mit zwei feinfühligen Armen.' },
        models: ['mobile-fr3-duo', 'agile-one-sn', 'limx-tron2'],
      },
      {
        icon: 'GraduationCap',
        title: { en: 'Humanoid research and teaching', de: 'Humanoid-Forschung und Lehre' },
        body: { en: 'Open software, simulation models and whole-body control.', de: 'Offene Software, Simulationsmodelle und Ganzkörpersteuerung.' },
        models: ['agile-one-s', 'limx-oli', 'magicbot-z1-standard'],
      },
      {
        icon: 'Factory',
        title: { en: 'Production and logistics', de: 'Produktion und Logistik' },
        body: { en: 'Payload, hands and work beside people.', de: 'Traglast, Hände und Arbeit neben Menschen.' },
        models: ['agile-one', 'magicbot-d1', 'seer-x1-pro'],
      },
      {
        icon: 'Users',
        title: { en: 'Visitors, service and stage', de: 'Besucher, Service und Bühne' },
        body: { en: 'Tours, conversation and shows in front of an audience.', de: 'Führungen, Gespräche und Auftritte vor Publikum.' },
        models: ['limx-luna', 'magicbot-z1-auto-tour-narration', 'h10-w'],
      },
    ],
  },

  nav: {
    label: { en: 'On this page', de: 'Auf dieser Seite' },
    franka: same('Franka'),
    agile: same('Agile Robots'),
    limx: same('LimX'),
    magiclab: same('MagicLab'),
    seer: same('SEER'),
    compare: { en: 'Comparison', de: 'Vergleich' },
    faq: { en: 'Questions', de: 'Fragen' },
  },

  franka: {
    eyebrow: { en: 'Franka Robotics · Germany', de: 'Franka Robotics · Deutschland' },
    title: { en: 'Mobile FR3 Duo: the full system', de: 'Mobile FR3 Duo: das Komplettsystem' },
    lead: {
      en: 'Two Franka Research 3 arms on a lifting column, on a base that drives in any direction. Mobile FR3 Duo works with two arms like a person at a bench, and then drives on to the next one.',
      de: 'Zwei Arme Franka Research 3 auf einer Hubsäule, auf einer Basis, die in jede Richtung fährt. Mobile FR3 Duo arbeitet beidhändig wie ein Mensch am Tisch und fährt danach weiter zum nächsten.',
    },
    body: {
      en: 'Base, arms and software interfaces come pre-integrated, so your team starts with experiments instead of mechanics and wiring. Ordered as a full system, it covers the whole path from the first demonstration to a trained policy running on the robot.',
      de: 'Basis, Arme und Softwareschnittstellen sind vorintegriert, sodass Ihr Team mit Versuchen beginnt und nicht mit Mechanik und Verkabelung. Als Komplettsystem deckt es den ganzen Weg ab, von der ersten Vorführung bis zur trainierten Policy auf dem Roboter.',
    },
    status: { en: 'Research prototype · for research and teaching', de: 'Forschungsprototyp · für Forschung und Lehre' },
    image: `${CDN}/bbd6a46fe2226d3e24064ec16c8f715d9980bd0d-2000x1125.png`,
    imageAlt: {
      en: 'Mobile FR3 Duo with two Franka Research 3 arms, grippers and cameras at a work table',
      de: 'Mobile FR3 Duo mit zwei Armen Franka Research 3, Greifern und Kameras an einem Arbeitstisch',
    },
    imageCaption: {
      en: 'Base system with Vision & Manipulation Kit. Table and objects are not included.',
      de: 'Basissystem mit Vision & Manipulation Kit. Tisch und Objekte gehören nicht zum Lieferumfang.',
    },
    specs: [
      { value: same('2 × 7'), label: { en: 'joints, torque sensor in each', de: 'Gelenke, je mit Drehmomentsensor' } },
      { value: same('855 mm'), label: { en: 'reach per arm', de: 'Reichweite pro Arm' } },
      { value: same('3 kg'), label: { en: 'payload per arm', de: 'Traglast pro Arm' } },
      { value: same('827 mm'), label: { en: 'lift stroke', de: 'Hub der Säule' } },
      { value: same('7'), label: { en: 'cameras with the kit, 2 LiDARs', de: 'Kameras mit Kit, 2 LiDARs' } },
      { value: same('1 kHz'), label: { en: 'real-time control (FCI)', de: 'Echtzeitregelung (FCI)' } },
    ],
    scopeTitle: { en: 'Three items make the full system', de: 'Drei Positionen ergeben das Komplettsystem' },
    scopeLead: {
      en: 'Each has its own Franka article number. Tell us which ones you need; we quote them together.',
      de: 'Jede hat eine eigene Franka-Artikelnummer. Nennen Sie uns, was Sie brauchen, wir bieten alles zusammen an.',
    },
    artNo: { en: 'Art. no.', de: 'Art.-Nr.' },
    scope: [
      {
        name: { en: 'Base system', de: 'Basissystem' },
        art: '10074892',
        what: { en: 'The robot itself', de: 'Der Roboter selbst' },
        items: [
          { en: 'Tactile Mobile Robot: omnidirectional base with 2 × Sick nanoScan3, 4 × RealSense D455, IMU and Jetson AGX Orin (64 GB)', de: 'Tactile Mobile Robot: omnidirektionale Basis mit 2 × Sick nanoScan3, 4 × RealSense D455, IMU und Jetson AGX Orin (64 GB)' },
          { en: 'Franka Spine lifting column with control, 827 mm stroke', de: 'Hubsäule Franka Spine mit Steuerung, 827 mm Hub' },
          { en: '2 × Franka Research 3 with the dual-arm mounting kit', de: '2 × Franka Research 3 mit Montagesatz für beide Arme' },
          { en: 'Franka Control Interface 3 (1 kHz) for both arms', de: 'Franka Control Interface 3 (1 kHz) für beide Arme' },
          { en: 'Charging station, inductive and by cable', de: 'Ladestation, induktiv und per Kabel' },
          { en: '2 emergency stops on the base, 1 FORT wireless emergency stop', de: '2 Not-Halt-Taster an der Basis, 1 Funk-Not-Halt FORT' },
        ],
      },
      {
        name: same('Vision & Manipulation Kit'),
        art: '10075117',
        what: { en: 'Hands and eyes', de: 'Hände und Augen' },
        items: [
          { en: '2 × Robotiq 2F-85 parallel grippers with a shared power supply', de: '2 × Parallelgreifer Robotiq 2F-85 mit gemeinsamem Netzteil' },
          { en: '2 × Intel RealSense D405 wrist cameras with mounts and cabling', de: '2 × Handgelenkkamera Intel RealSense D405 mit Halterung und Verkabelung' },
          { en: '1 × Stereolabs ZED Mini stereo camera on the head bracket', de: '1 × Stereokamera Stereolabs ZED Mini auf der Kopfhalterung' },
        ],
      },
      {
        name: same('Franka GELLO Duo'),
        art: '10075295',
        what: { en: 'Teleoperation and data', de: 'Teleoperation und Daten' },
        items: [
          { en: '2 × GELLO teleoperation arms: a scaled-down kinematic copy of FR3 Duo, with table stand', de: '2 × GELLO-Teleoperationsarm: kinematisch gleich zum FR3 Duo, verkleinert, mit Tischfuß' },
          { en: '2 × OpenRB-150 controllers, connected via USB', de: '2 × Controller OpenRB-150, über USB angeschlossen' },
          { en: 'Franka Labs recording software (Apache 2.0): records in MCAP, exports to LeRobot v2.1', de: 'Aufnahmesoftware Franka Labs (Apache 2.0): zeichnet in MCAP auf, exportiert nach LeRobot v2.1' },
        ],
      },
    ],
    flowTitle: { en: 'From demonstration to policy', de: 'Von der Vorführung zur Policy' },
    flow: [
      { title: { en: 'Demonstrate', de: 'Vormachen' }, body: { en: 'An operator guides both arms with GELLO Duo.', de: 'Eine Person führt beide Arme mit GELLO Duo.' } },
      { title: { en: 'Record', de: 'Aufzeichnen' }, body: { en: 'Franka Labs records in MCAP.', de: 'Franka Labs zeichnet in MCAP auf.' } },
      { title: { en: 'Train', de: 'Trainieren' }, body: { en: 'Export to LeRobot v2.1, then train in your own framework.', de: 'Export nach LeRobot v2.1, danach Training in Ihrem Framework.' } },
      { title: { en: 'Run', de: 'Ausführen' }, body: { en: 'The policy runs on the same robot, via FCI or ROS 2.', de: 'Die Policy läuft auf demselben Roboter, über FCI oder ROS 2.' } },
    ],
    video: 'https://www.youtube.com/watch?v=4DYkcI1BFgU',
    videoTitle: { en: 'Mobile FR3 Duo by Franka Robotics', de: 'Mobile FR3 Duo von Franka Robotics' },
    videoCaption: { en: 'Video: Franka Robotics', de: 'Video: Franka Robotics' },
    ctaPrimary: { en: 'Request the full system', de: 'Komplettsystem anfragen' },
    ctaSubject: { en: 'Mobile FR3 Duo full system', de: 'Mobile FR3 Duo Komplettsystem' },
    ctaSecondary: { en: 'All data on Mobile FR3 Duo', de: 'Alle Daten zum Mobile FR3 Duo' },
    related: { en: 'Also available separately', de: 'Auch einzeln erhältlich' },
    relatedItems: [
      { slug: 'franka-research-3-duo', name: same('Franka Research 3 Duo') },
      { slug: 'tactile-mobile-robot', name: same('Tactile Mobile Robot') },
      { slug: 'franka-gello', name: same('Franka GELLO & GELLO Duo') },
    ],
    note: {
      en: 'Franka lists Mobile FR3 Duo as a prototype: for research, development and teaching in lab environments, not for production use. Specifications are preliminary.',
      de: 'Franka führt Mobile FR3 Duo als Prototyp: für Forschung, Entwicklung und Lehre in Laborumgebungen, nicht für den Produktionseinsatz. Die technischen Daten sind vorläufig.',
    },
  },

  brands: {
    agile: {
      eyebrow: { en: 'Agile Robots · Germany', de: 'Agile Robots · Deutschland' },
      title: { en: 'Agile Robots: from the lab to the line', de: 'Agile Robots: vom Labor bis an die Linie' },
      lead: {
        en: 'Agile ONE is built for the factory, the smaller ONE S and ONE SN for research. H10-W puts a humanoid torso on wheels.',
        de: 'Agile ONE ist für die Fabrik gebaut, die kleineren ONE S und ONE SN für die Forschung. H10-W setzt einen humanoiden Torso auf Räder.',
      },
      manufacturer: 'agile-robots',
      feature: 'agile-one',
      models: ['agile-one-s', 'agile-one-sn', 'h10-w'],
    },
    limx: {
      eyebrow: { en: 'LimX Dynamics · China', de: 'LimX Dynamics · China' },
      title: { en: 'LimX: research, stage and two-legged platforms', de: 'LimX: Forschung, Bühne und Zweibeiner' },
      lead: {
        en: 'Oli is the research humanoid and Luna the performer. TRON 1 and TRON 2 are modular two-legged platforms for labs.',
        de: 'Oli ist der Humanoid für die Forschung, Luna der für den Auftritt. TRON 1 und TRON 2 sind modulare zweibeinige Plattformen fürs Labor.',
      },
      manufacturer: 'limx-dynamics',
      feature: 'limx-oli',
      models: ['limx-luna', 'limx-tron2', 'limx-tron1'],
    },
    magiclab: {
      eyebrow: { en: 'MagicLab · China', de: 'MagicLab · China' },
      title: { en: 'MagicLab: six MagicBots on legs and wheels', de: 'MagicLab: sechs MagicBots auf Beinen und Rädern' },
      lead: {
        en: 'Two full-size humanoids, one on wheels for industry and the compact Z1 in three configurations.',
        de: 'Zwei Humanoide in voller Größe, einer auf Rädern für die Industrie und der kompakte Z1 in drei Konfigurationen.',
      },
      manufacturer: 'magiclab',
      feature: 'magicbot-x1',
      models: ['magicbot-gen1', 'magicbot-d1', 'magicbot-z1-standard', 'magicbot-z1-dexterous-hands', 'magicbot-z1-auto-tour-narration'],
    },
    seer: {
      eyebrow: { en: 'SEER Robotics · China', de: 'SEER Robotics · China' },
      title: { en: 'SEER X1-PRO: a humanoid for picking and loading', de: 'SEER X1-PRO: ein Humanoid fürs Kommissionieren und Beladen' },
      lead: { en: 'One model on an omnidirectional base, on request.', de: 'Ein Modell auf omnidirektionaler Basis, auf Anfrage.' },
      manufacturer: 'seer-robotics',
      feature: 'seer-x1-pro',
      models: [] as string[],
    },
  },

  card: {
    details: { en: 'Details', de: 'Details' },
    request: { en: 'Request a quote', de: 'Angebot anfragen' },
    allFrom: { en: 'All products from {brand}', de: 'Alle Produkte von {brand}' },
  },

  compare: {
    eyebrow: { en: 'Comparison', de: 'Vergleich' },
    title: { en: 'All humanoids side by side', de: 'Alle Humanoiden nebeneinander' },
    subtitle: {
      en: 'Pick what matters and the table narrows down. Values are manufacturer data.',
      de: 'Wählen Sie, was zählt, dann wird die Tabelle kürzer. Alle Werte sind Herstellerangaben.',
    },
    filters: {
      production: { en: 'Production & logistics', de: 'Produktion & Logistik' },
      research: { en: 'Research & teaching', de: 'Forschung & Lehre' },
      public: { en: 'Visitors & service', de: 'Besucher & Service' },
      legs: { en: 'Two legs', de: 'Zwei Beine' },
      wheels: { en: 'Wheels', de: 'Räder' },
      hands: { en: 'Multi-finger hands', de: 'Mehrfingerhände' },
    },
    filterLabel: { en: 'Filter models', de: 'Modelle filtern' },
    reset: { en: 'Reset', de: 'Zurücksetzen' },
    count: { en: '{n} of {total} models', de: '{n} von {total} Modellen' },
    empty: { en: 'No model matches all of these. Remove one criterion.', de: 'Kein Modell erfüllt alles zugleich. Nehmen Sie ein Kriterium heraus.' },
    scroll: { en: 'Swipe the table sideways to see every column.', de: 'Wischen Sie die Tabelle zur Seite, um alle Spalten zu sehen.' },
    cols: {
      model: { en: 'Model', de: 'Modell' },
      drive: { en: 'Moves on', de: 'Antrieb' },
      height: { en: 'Height', de: 'Größe' },
      weight: { en: 'Weight', de: 'Gewicht' },
      dof: { en: 'Degrees of freedom', de: 'Freiheitsgrade' },
      payload: { en: 'Payload per arm', de: 'Traglast pro Arm' },
      speed: { en: 'Speed', de: 'Tempo' },
      runtime: { en: 'Runtime', de: 'Laufzeit' },
    },
    foot: {
      en: '– means no published value. * Total payload, not stated per arm. “Multi-finger hands” means standard or available for the model. Slash values: Oli Lite/EDU and Super.',
      de: '– bedeutet: kein veröffentlichter Wert. * Traglast insgesamt, nicht pro Arm angegeben. „Mehrfingerhände“ heißt serienmäßig oder für das Modell erhältlich. Werte mit Schrägstrich: Oli Lite/EDU und Super.',
    },
  },

  choose: {
    eyebrow: { en: 'Before you buy', de: 'Vor dem Kauf' },
    title: { en: 'How to choose the right model', de: 'So finden Sie das passende Modell' },
    items: [
      {
        title: { en: 'Where it works', de: 'Einsatzort' },
        body: {
          en: 'Production calls for payload and hands, a lab for open software and simulation assets, a public venue for interaction and tour routing.',
          de: 'In der Produktion zählen Traglast und Hände, im Labor offene Software und Simulationsmodelle, im Besucherbetrieb Interaktion und Tourenführung.',
        },
      },
      {
        title: { en: 'Legs or wheels', de: 'Beine oder Räder' },
        body: {
          en: 'Two legs suit steps and spaces built for people. A wheeled base stands firmly but needs a level floor.',
          de: 'Zwei Beine kommen mit Stufen und Umgebungen zurecht, die für Menschen gebaut sind. Ein Radfahrwerk steht stabil, braucht aber ebenen Boden.',
        },
      },
      {
        title: { en: 'Hands or gripper', de: 'Hände oder Greifer' },
        body: {
          en: 'Settle early whether a two-finger gripper is enough. On the LimX Oli it comes with EDU and Super, while the five-finger hand is optional on EDU and standard on Super.',
          de: 'Klären Sie früh, ob ein Zweifingergreifer reicht. Beim LimX Oli gehört er zu EDU und Super, die Fünffingerhand ist bei EDU optional und bei Super Standard.',
        },
      },
      {
        title: { en: 'Software', de: 'Software' },
        body: {
          en: 'Check which framework your team uses. Agile ONE SN is set up for Isaac GR00T, Mobile FR3 Duo for FCI and ROS 2, Oli for Python, Isaac Sim, MuJoCo and Gazebo.',
          de: 'Prüfen Sie, womit Ihr Team arbeitet. Agile ONE SN ist für Isaac GR00T eingerichtet, Mobile FR3 Duo für FCI und ROS 2, Oli für Python, Isaac Sim, MuJoCo und Gazebo.',
        },
      },
      {
        title: { en: 'Runtime', de: 'Laufzeit' },
        body: {
          en: 'Expect one and a half to about four hours per charge, where manufacturers state it. Swappable batteries, as on the MagicBot X1 and Z1, reduce downtime.',
          de: 'Rechnen Sie mit anderthalb bis rund vier Stunden pro Ladung, soweit angegeben. Wechselakkus wie bei MagicBot X1 und Z1 verkürzen Standzeiten.',
        },
      },
      {
        title: { en: 'Safety and paperwork', de: 'Sicherheit und Unterlagen' },
        body: {
          en: 'Some models are research platforms or prototypes. We clarify intended use and conformity documents with the manufacturer before you order.',
          de: 'Manche Modelle sind Forschungsplattformen oder Prototypen. Bestimmungsgemäße Verwendung und Konformitätsunterlagen klären wir mit dem Hersteller, bevor Sie bestellen.',
        },
      },
    ],
  },

  steps: {
    eyebrow: { en: 'How we work', de: 'So arbeiten wir' },
    title: { en: 'One contact for every brand', de: 'Ein Ansprechpartner für alle Marken' },
    items: [
      { title: { en: 'Application', de: 'Anwendung' }, body: { en: 'You describe the task and the environment.', de: 'Sie beschreiben Aufgabe und Umgebung.' } },
      { title: { en: 'Comparison', de: 'Vergleich' }, body: { en: 'We review the technical requirements and compare platforms across manufacturers.', de: 'Wir prüfen die technischen Anforderungen und vergleichen Plattformen über Hersteller hinweg.' } },
      { title: { en: 'Quote', de: 'Angebot' }, body: { en: 'Price and lead time for your configuration, with every item listed.', de: 'Preis und Lieferzeit für Ihre Konfiguration, mit allen Positionen.' } },
      { title: { en: 'Delivery', de: 'Lieferung' }, body: { en: 'We coordinate the suppliers and connect you with integration partners where needed.', de: 'Wir koordinieren die Lieferanten und vermitteln bei Bedarf Partner für die Integration.' } },
    ],
  },

  faq: {
    eyebrow: { en: 'Questions', de: 'Fragen' },
    title: { en: 'Humanoid robots: frequent questions', de: 'Humanoide Roboter: häufige Fragen' },
    items: [
      {
        q: { en: 'How much does a humanoid robot cost?', de: 'Was kostet ein humanoider Roboter?' },
        a: {
          en: 'It depends on the model and its equipment, such as hands and compute. That is why we give the price in a quote for your configuration.',
          de: 'Das hängt von Modell und Ausstattung ab, etwa von Händen und Rechenleistung. Deshalb nennen wir den Preis im Angebot für Ihre Konfiguration.',
        },
      },
      {
        q: { en: 'What does the Mobile FR3 Duo full system include?', de: 'Was gehört zum Komplettsystem Mobile FR3 Duo?' },
        a: {
          en: 'Three items: the base system (mobile base, lifting column, two Franka Research 3 arms, FCI, charging station and emergency stops), the Vision & Manipulation Kit with two grippers and three cameras, and Franka GELLO Duo for teleoperation and data recording. The kit and GELLO Duo are ordered separately.',
          de: 'Drei Positionen: das Basissystem (mobile Basis, Hubsäule, zwei Arme Franka Research 3, FCI, Ladestation und Not-Halt), das Vision & Manipulation Kit mit zwei Greifern und drei Kameras sowie Franka GELLO Duo für Teleoperation und Datenaufnahme. Kit und GELLO Duo werden einzeln bestellt.',
        },
      },
      {
        q: { en: 'Is Mobile FR3 Duo a humanoid robot?', de: 'Ist Mobile FR3 Duo ein humanoider Roboter?' },
        a: {
          en: 'Not in the strict sense: it has no legs and no head. It is a mobile dual-arm system whose upper body works like a person’s, with two arms, adjustable height and cameras. For manipulation research it does the job many teams want a humanoid for, with torque sensing in every arm joint.',
          de: 'Im engen Sinn nicht: Er hat weder Beine noch Kopf. Er ist ein mobiles Zweiarmsystem, dessen Oberkörper wie der eines Menschen arbeitet, mit zwei Armen, verstellbarer Höhe und Kameras. Für die Manipulationsforschung übernimmt er, wofür viele Teams einen Humanoiden suchen, mit Drehmomentsensoren in jedem Armgelenk.',
        },
      },
      {
        q: { en: 'Which humanoid robot suits research?', de: 'Welcher humanoide Roboter eignet sich für die Forschung?' },
        a: {
          en: 'The Agile ONE S suits teams that want to run their own models and frameworks. The Agile ONE SN comes set up for NVIDIA Isaac GR00T. LimX Oli EDU and Super bring depth cameras and an Orin NX. For a first step into reinforcement learning, the smaller LimX TRON 1 is an option.',
          de: 'Der Agile ONE S passt zu Teams, die eigene Modelle und Frameworks einsetzen wollen. Der Agile ONE SN ist bereits für NVIDIA Isaac GR00T eingerichtet. LimX Oli EDU und Super bringen Tiefenkameras und Orin NX mit. Für den Einstieg ins Reinforcement Learning ist der kleinere LimX TRON 1 eine Option.',
        },
      },
      {
        q: { en: 'Can humanoid robots work in production today?', de: 'Können humanoide Roboter schon in der Produktion arbeiten?' },
        a: {
          en: 'The Agile ONE is designed for the production floor, the MagicBot D1 for industrial work on level floors. Whether one fits your task is best settled with a pilot project at a real workstation.',
          de: 'Der Agile ONE ist für die Produktion ausgelegt, der MagicBot D1 für industrielle Aufgaben auf ebenem Boden. Ob einer zu Ihrer Aufgabe passt, klärt am besten ein Pilotprojekt an einem konkreten Arbeitsplatz.',
        },
      },
      {
        q: { en: 'Legs or wheels?', de: 'Auf Beinen oder auf Rädern?' },
        a: {
          en: 'Two-legged models suit steps and spaces built for people. Models on a wheeled base stand firmly but need a level floor. For inspection on rough ground, four-legged quadruped robots and robot dogs are the better fit.',
          de: 'Zweibeinige Modelle kommen mit Stufen und Umgebungen zurecht, die für Menschen gebaut sind. Modelle mit Radfahrwerk stehen stabil, brauchen aber ebenen Boden. Für Inspektion im Gelände passen eher vierbeinige Laufroboter und Roboterhunde.',
        },
      },
      {
        q: { en: 'How tall are humanoid robots?', de: 'Wie groß sind humanoide Roboter?' },
        a: {
          en: 'In our range the two-legged humanoids run from 137 cm (MagicBot Z1) to 180 cm (MagicBot X1). The LimX TRON 1 biped platform is smaller, at 84.5 cm at most.',
          de: 'In unserem Programm reichen die zweibeinigen Humanoiden von 137 cm (MagicBot Z1) bis 180 cm (MagicBot X1). Die zweibeinige Plattform LimX TRON 1 ist mit höchstens 84,5 cm kleiner.',
        },
      },
    ],
    solution: { en: 'Humanoids and embodied AI: our solution page', de: 'Humanoide und Embodied AI: unsere Lösungsseite' },
    quadruped: { en: 'Quadruped robots and robot dogs', de: 'Laufroboter und Roboterhunde' },
    platforms: { en: 'All robot platforms', de: 'Alle Roboterplattformen' },
  },

  cta: {
    eyebrow: { en: 'Advice and quote', de: 'Beratung und Angebot' },
    title: { en: 'Tell us what your humanoid should do', de: 'Sagen Sie uns, was Ihr Humanoid tun soll' },
    body: {
      en: 'Describe the task and the environment. We come back with the models that fit and a quote.',
      de: 'Beschreiben Sie Aufgabe und Umgebung. Wir melden uns mit passenden Modellen und einem Angebot.',
    },
    button: { en: 'Send an enquiry', de: 'Anfrage senden' },
    subject: { en: 'Humanoid robots', de: 'Humanoide Roboter' },
  },

  fine: {
    eyebrow: { en: 'Notes', de: 'Hinweise' },
    items: [
      {
        en: 'Technical data are manufacturer information and may change. The binding data are those in the quote.',
        de: 'Technische Daten sind Herstellerangaben und können sich ändern. Verbindlich sind die Angaben im Angebot.',
      },
      {
        en: 'Mobile FR3 Duo: 125 kg base payload and 1.5 m/s follow Franka’s prototype documentation. Franka’s brochure of February 2026 gives 100 kg and 1.75 m/s.',
        de: 'Mobile FR3 Duo: 125 kg Traglast der Basis und 1,5 m/s nach Franka-Prototypdokumentation. Die Franka-Broschüre vom Februar 2026 nennt 100 kg und 1,75 m/s.',
      },
      {
        en: 'Images are photos and renderings by the manufacturers; some scenes are computer-generated. Product names and trademarks belong to their owners.',
        de: 'Bilder sind Fotos und Visualisierungen der Hersteller, einige Szenen sind am Computer entstanden. Produktnamen und Marken gehören ihren Inhabern.',
      },
    ],
  },
}

export function getHumanoidContent(locale: Locale) {
  return localize(content, locale)
}

export function getHumanoidModels(locale: Locale) {
  return localize(MODELS, locale)
}

export type LocalizedHumanoid = ReturnType<typeof getHumanoidModels>[number]
