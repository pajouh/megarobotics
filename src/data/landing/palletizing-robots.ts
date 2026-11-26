// Content for the palletizing buying page at /pages/palletizing-robots (and /de/...).
//
// All figures come from the products' published Sanity entries (specifications,
// tagline, description, features). Atom Robot's Sanity specifications give type,
// payload, version and stacking height only, so cycle rate, footprint, IP class
// and weight of the palletizers stay off this page. The spec-sheet images in the
// product galleries show more values; they are not in the specifications field.
// Images: transparent manufacturer renderings (mainImage); the intro picture is
// the image of the Sanity solution page "palletizing-end-of-line".

import { CDN, NONE, same, type LandingContent, type LandingModel } from './types'

type L2 = { en: string; de: string }

const S = {
  payload: { en: 'Payload', de: 'Traglast' },
  stack: { en: 'Stacking height', de: 'Stapelhöhe' },
  version: { en: 'Version', de: 'Version' },
  stroke: { en: 'Stroke', de: 'Hub' },
  air: { en: 'Air flow', de: 'Luftstrom' },
  weight: { en: 'Weight', de: 'Gewicht' },
  ip: { en: 'Protection', de: 'Schutzart' },
}

const FIXED: L2 = { en: 'Fixed', de: 'Fest' }
const LIFTING: L2 = { en: 'Lifting axis', de: 'Hubachse' }
const MOBILE: L2 = { en: 'Mobile', de: 'Mobil' }
const ATOM = same('Atom Robot')
const ONROBOT = same('OnRobot')
const GRAPHICAL: L2 = { en: 'Graphical programming', de: 'Grafische Programmierung' }


const IMG_G = `${CDN}/4ac08d052cd1531f80d2d4ffc6c26a98986cc71f-600x600.png`
const IMG_H = `${CDN}/dc521c88929e077305333afe8ad35557c71ff3a2-600x600.png`

export const MODELS: LandingModel[] = [
  // Fixed versions
  {
    slug: 'cobot-palletizer-am-40-g',
    name: same('AM-40-G'),
    type: { en: 'Fixed cobot palletizer', de: 'Fester Cobot-Palettierer' },
    image: IMG_G,
    fit: 'contain',
    blurb: {
      en: 'The strongest palletizer in the range: 40 kg payload and stacks up to 2,000 mm. The choice for heavy cartons and cases at the end of the line.',
      de: 'Der stärkste Palettierer im Programm: 40 kg Traglast und Stapel bis 2.000 mm. Die Wahl für schwere Kartons und Gebinde am Linienende.',
    },
    specs: [
      { label: S.payload, value: same('40 kg') },
      { label: S.stack, value: { en: 'up to 2,000 mm', de: 'bis 2.000 mm' } },
      { label: S.version, value: FIXED },
    ],
    tags: ['fixed', 'heavy'],
    row: {
      version: FIXED,
      maker: ATOM,
      payload: same('40 kg'),
      stack: { en: '2,000 mm', de: '2.000 mm' },
      air: NONE,
      ip: NONE,
      detail: GRAPHICAL,
    },
  },
  {
    slug: 'cobot-palletizer-am-20-g',
    name: same('AM-20-G'),
    type: { en: 'Fixed cobot palletizer', de: 'Fester Cobot-Palettierer' },
    image: IMG_G,
    fit: 'contain',
    blurb: {
      en: 'The entry model for cartons up to 20 kg and pallets up to 1,700 mm high. Set up through graphical programming, with no coding needed.',
      de: 'Das Einstiegsmodell für Kartons bis 20 kg und Paletten bis 1.700 mm Höhe. Eingerichtet per grafischer Programmierung, ganz ohne Programmierkenntnisse.',
    },
    specs: [
      { label: S.payload, value: same('20 kg') },
      { label: S.stack, value: { en: 'up to 1,700 mm', de: 'bis 1.700 mm' } },
      { label: S.version, value: FIXED },
    ],
    tags: ['fixed'],
    row: {
      version: FIXED,
      maker: ATOM,
      payload: same('20 kg'),
      stack: { en: '1,700 mm', de: '1.700 mm' },
      air: NONE,
      ip: NONE,
      detail: GRAPHICAL,
    },
  },
  {
    slug: 'cobot-palletizer-am-20-ultra',
    name: same('AM-20 Ultra'),
    type: { en: 'Fixed cobot palletizer', de: 'Fester Cobot-Palettierer' },
    image: IMG_H,
    fit: 'contain',
    blurb: {
      en: '20 kg payload like the AM-20-G, but stacks up to 2,100 mm without a lifting axis.',
      de: '20 kg Traglast wie beim AM-20-G, stapelt aber ohne Hubachse bis 2.100 mm.',
    },
    specs: [
      { label: S.payload, value: same('20 kg') },
      { label: S.stack, value: { en: 'up to 2,100 mm', de: 'bis 2.100 mm' } },
      { label: S.version, value: FIXED },
    ],
    tags: ['fixed'],
    row: {
      version: FIXED,
      maker: ATOM,
      payload: same('20 kg'),
      stack: { en: '2,100 mm', de: '2.100 mm' },
      air: NONE,
      ip: NONE,
      detail: GRAPHICAL,
    },
  },
  {
    slug: 'cobot-palletizer-am-30-g',
    name: same('AM-30-G'),
    type: { en: 'Fixed cobot palletizer', de: 'Fester Cobot-Palettierer' },
    image: IMG_G,
    fit: 'contain',
    blurb: {
      en: 'For heavier cases: 30 kg payload on a fixed base, stacking up to 1,700 mm.',
      de: 'Für schwerere Gebinde: 30 kg Traglast auf fester Basis, Stapelhöhe bis 1.700 mm.',
    },
    specs: [
      { label: S.payload, value: same('30 kg') },
      { label: S.stack, value: { en: 'up to 1,700 mm', de: 'bis 1.700 mm' } },
      { label: S.version, value: FIXED },
    ],
    tags: ['fixed', 'heavy'],
    row: {
      version: FIXED,
      maker: ATOM,
      payload: same('30 kg'),
      stack: { en: '1,700 mm', de: '1.700 mm' },
      air: NONE,
      ip: NONE,
      detail: GRAPHICAL,
    },
  },
  {
    slug: 'cobot-palletizer-am-30-ultra',
    name: same('AM-30 Ultra'),
    type: { en: 'Fixed cobot palletizer', de: 'Fester Cobot-Palettierer' },
    image: IMG_H,
    fit: 'contain',
    blurb: {
      en: '30 kg payload and stacks up to 2,100 mm. The fixed model for heavy cartons on tall pallets.',
      de: '30 kg Traglast und Stapel bis 2.100 mm. Das feste Modell für schwere Kartons auf hohen Paletten.',
    },
    specs: [
      { label: S.payload, value: same('30 kg') },
      { label: S.stack, value: { en: 'up to 2,100 mm', de: 'bis 2.100 mm' } },
      { label: S.version, value: FIXED },
    ],
    tags: ['fixed', 'heavy'],
    row: {
      version: FIXED,
      maker: ATOM,
      payload: same('30 kg'),
      stack: { en: '2,100 mm', de: '2.100 mm' },
      air: NONE,
      ip: NONE,
      detail: GRAPHICAL,
    },
  },

  // Versions with a lifting axis
  {
    slug: 'cobot-palletizer-am-30-h',
    name: same('AM-30-H'),
    type: { en: 'Cobot palletizer with lifting axis', de: 'Cobot-Palettierer mit Hubachse' },
    image: IMG_H,
    fit: 'contain',
    blurb: {
      en: 'The highest stack in the range with the higher payload: 30 kg and up to 2,300 mm.',
      de: 'Die höchsten Stapel im Programm bei der höheren Traglast: 30 kg und bis 2.300 mm.',
    },
    specs: [
      { label: S.payload, value: same('30 kg') },
      { label: S.stack, value: { en: 'up to 2,300 mm', de: 'bis 2.300 mm' } },
      { label: S.version, value: LIFTING },
    ],
    tags: ['lifting', 'heavy'],
    row: {
      version: LIFTING,
      maker: ATOM,
      payload: same('30 kg'),
      stack: { en: '2,300 mm', de: '2.300 mm' },
      air: NONE,
      ip: NONE,
      detail: GRAPHICAL,
    },
  },
  {
    slug: 'cobot-palletizer-am-20-s',
    name: same('AM-20-S'),
    type: { en: 'Cobot palletizer with lifting axis', de: 'Cobot-Palettierer mit Hubachse' },
    image: IMG_G,
    fit: 'contain',
    blurb: {
      en: '20 kg payload with a lifting axis for stacks up to 2,200 mm.',
      de: '20 kg Traglast mit Hubachse für Stapel bis 2.200 mm.',
    },
    specs: [
      { label: S.payload, value: same('20 kg') },
      { label: S.stack, value: { en: 'up to 2,200 mm', de: 'bis 2.200 mm' } },
      { label: S.version, value: LIFTING },
    ],
    tags: ['lifting'],
    row: {
      version: LIFTING,
      maker: ATOM,
      payload: same('20 kg'),
      stack: { en: '2,200 mm', de: '2.200 mm' },
      air: NONE,
      ip: NONE,
      detail: GRAPHICAL,
    },
  },
  {
    slug: 'cobot-palletizer-am-20-h',
    name: same('AM-20-H'),
    type: { en: 'Cobot palletizer with lifting axis', de: 'Cobot-Palettierer mit Hubachse' },
    image: IMG_H,
    fit: 'contain',
    blurb: {
      en: '20 kg payload and the full 2,300 mm stacking height. For lighter cartons on tall pallets.',
      de: '20 kg Traglast und die vollen 2.300 mm Stapelhöhe. Für leichtere Kartons auf hohen Paletten.',
    },
    specs: [
      { label: S.payload, value: same('20 kg') },
      { label: S.stack, value: { en: 'up to 2,300 mm', de: 'bis 2.300 mm' } },
      { label: S.version, value: LIFTING },
    ],
    tags: ['lifting'],
    row: {
      version: LIFTING,
      maker: ATOM,
      payload: same('20 kg'),
      stack: { en: '2,300 mm', de: '2.300 mm' },
      air: NONE,
      ip: NONE,
      detail: GRAPHICAL,
    },
  },
  {
    slug: 'cobot-palletizer-am-30-s',
    name: same('AM-30-S'),
    type: { en: 'Cobot palletizer with lifting axis', de: 'Cobot-Palettierer mit Hubachse' },
    image: IMG_G,
    fit: 'contain',
    blurb: {
      en: '30 kg payload with a lifting axis for stacks up to 2,200 mm.',
      de: '30 kg Traglast mit Hubachse für Stapel bis 2.200 mm.',
    },
    specs: [
      { label: S.payload, value: same('30 kg') },
      { label: S.stack, value: { en: 'up to 2,200 mm', de: 'bis 2.200 mm' } },
      { label: S.version, value: LIFTING },
    ],
    tags: ['lifting', 'heavy'],
    row: {
      version: LIFTING,
      maker: ATOM,
      payload: same('30 kg'),
      stack: { en: '2,200 mm', de: '2.200 mm' },
      air: NONE,
      ip: NONE,
      detail: GRAPHICAL,
    },
  },

  // Mobile version
  {
    slug: 'cobot-palletizer-atm-mmd20g',
    name: same('ATM-MMD20G'),
    type: { en: 'Mobile cobot palletizer', de: 'Mobiler Cobot-Palettierer' },
    image: IMG_G,
    fit: 'contain',
    blurb: {
      en: 'The mobile version of the Atom Robot palletizer, with 20 kg payload and stacks up to 1,500 mm. Programmed the same graphical way as the fixed models.',
      de: 'Die mobile Version des Atom-Robot-Palettierers mit 20 kg Traglast und Stapeln bis 1.500 mm. Programmiert wird sie grafisch wie die festen Modelle.',
    },
    specs: [
      { label: S.payload, value: same('20 kg') },
      { label: S.stack, value: { en: 'up to 1,500 mm', de: 'bis 1.500 mm' } },
      { label: S.version, value: MOBILE },
    ],
    tags: ['mobile'],
    row: {
      version: MOBILE,
      maker: ATOM,
      payload: same('20 kg'),
      stack: { en: '1,500 mm', de: '1.500 mm' },
      air: NONE,
      ip: NONE,
      detail: GRAPHICAL,
    },
  },

  // Grippers and guarding
  {
    slug: 'onrobot-vgp30-vacuum-gripper',
    name: same('OnRobot VGP30'),
    type: { en: 'Pneumatic vacuum gripper', de: 'Pneumatischer Vakuumgreifer' },
    image: `${CDN}/617460e05b4af73ea641f0635187254163618291-1174x680.png`,
    fit: 'contain',
    blurb: {
      en: 'Runs on compressed air and reaches 440 L/min of air flow and 30 kg on cardboard boxes. Its vacuum control adjusts the flow to each box or interlayer, which saves air on mixed loads.',
      de: 'Arbeitet mit Druckluft und erreicht 440 L/min Luftstrom und 30 kg bei Kartons. Die Vakuumregelung passt den Luftstrom an jeden Karton und jede Zwischenlage an und spart so bei gemischten Lasten Luft.',
    },
    specs: [
      { label: S.payload, value: { en: '30 kg (cardboard boxes)', de: '30 kg (Kartons)' } },
      { label: S.air, value: same('0–440 L/min') },
      { label: S.weight, value: { en: '3.1 kg', de: '3,1 kg' } },
      { label: S.ip, value: same('IP54') },
    ],
    tags: ['tooling', 'heavy'],
    row: {
      version: { en: 'Vacuum gripper', de: 'Vakuumgreifer' },
      maker: ONROBOT,
      payload: { en: '30 kg (boxes)', de: '30 kg (Kartons)' },
      stack: NONE,
      air: { en: 'Yes, 3–7 bar', de: 'Ja, 3–7 bar' },
      ip: same('IP54'),
      detail: { en: '2 channels, 20 cups', de: '2 Kanäle, 20 Sauger' },
    },
  },
  {
    slug: 'onrobot-vgp20-vacuum-gripper',
    name: same('OnRobot VGP20'),
    type: { en: 'Electric vacuum gripper', de: 'Elektrischer Vakuumgreifer' },
    image: `${CDN}/fbfa7fbca8f6d23a45986080d4a9bd9f68d3807f-1275x680.png`,
    fit: 'contain',
    blurb: {
      en: 'All-electric, with no compressed air. Four independent channels and 48 L/min give enough suction for porous, thin and recycled cardboard and light shipping bags.',
      de: 'Vollelektrisch, ohne Druckluft. Vier unabhängige Kanäle und 48 L/min liefern genug Saugleistung für poröse, dünne und recycelte Kartonagen und leichte Versandbeutel.',
    },
    specs: [
      { label: S.payload, value: { en: '10 kg typical, 20 kg max.', de: '10 kg typisch, max. 20 kg' } },
      { label: S.air, value: same('0–48 L/min') },
      { label: S.weight, value: { en: '2.55 kg', de: '2,55 kg' } },
      { label: S.ip, value: same('IP54') },
    ],
    tags: ['tooling', 'electric'],
    row: {
      version: { en: 'Vacuum gripper', de: 'Vakuumgreifer' },
      maker: ONROBOT,
      payload: { en: '10 kg typ., 20 kg max.', de: '10 kg typ., max. 20 kg' },
      stack: NONE,
      air: { en: 'No, electric pump', de: 'Nein, elektrische Pumpe' },
      ip: same('IP54'),
      detail: { en: '4 channels, 48 L/min', de: '4 Kanäle, 48 L/min' },
    },
  },
  {
    slug: 'onrobot-2fgp20-palletizing-gripper',
    name: same('OnRobot 2FGP20'),
    type: { en: 'Finger gripper with vacuum unit', de: 'Fingergreifer mit Vakuumeinheit' },
    image: `${CDN}/2d911b122c39d64047e23aa379d3e04fe960440b-658x680.png`,
    fit: 'contain',
    blurb: {
      en: 'Grips open or heavy boxes, shelf-ready packaging and containers that suction cannot hold, with 260 mm stroke. The built-in vacuum picks the slip sheet between layers without a tool change.',
      de: 'Greift offene oder schwere Kartons, regalfertige Verpackungen und Behälter, die sich nicht ansaugen lassen, mit 260 mm Hub. Die eingebaute Vakuumeinheit nimmt die Zwischenlage ohne Werkzeugwechsel auf.',
    },
    specs: [
      { label: S.payload, value: { en: '20 kg (fingers)', de: '20 kg (Finger)' } },
      { label: S.stroke, value: same('260 mm') },
      { label: { en: 'Grip width', de: 'Greifbreite' }, value: same('170–430 mm') },
      { label: S.weight, value: { en: '5.07 kg', de: '5,07 kg' } },
    ],
    tags: ['tooling', 'electric'],
    row: {
      version: { en: 'Finger + vacuum gripper', de: 'Finger- + Vakuumgreifer' },
      maker: ONROBOT,
      payload: { en: '20 kg / 2.5 kg vacuum', de: '20 kg / 2,5 kg Vakuum' },
      stack: NONE,
      air: { en: 'No, fully electric', de: 'Nein, vollelektrisch' },
      ip: same('IP54'),
      detail: { en: '260 mm stroke', de: '260 mm Hub' },
    },
  },
  {
    slug: 'palletizer-standard-safety-fence',
    name: { en: 'Standard safety fence', de: 'Standard-Schutzzaun' },
    type: { en: 'Light-curtain guarding for palletizing cells', de: 'Lichtvorhang-Absicherung für Palettierzellen' },
    image: `${CDN}/f43c72f5cca5326daa46d5241dc24571d39e0f03-600x600.png`,
    fit: 'contain',
    blurb: {
      en: 'Area protection around the working envelope of an Atom Robot palletizing cell, with two light curtain sets.',
      de: 'Bereichsabsicherung rund um den Arbeitsraum einer Atom-Robot-Palettierzelle, mit zwei Lichtvorhang-Sets.',
    },
    specs: [
      { label: { en: 'Light curtains', de: 'Lichtvorhänge' }, value: { en: '2 sets', de: '2 Sets' } },
      { label: { en: 'Detection height', de: 'Erfassungshöhe' }, value: { en: '145–1,370 mm', de: '145–1.370 mm' } },
      { label: { en: 'Detection length', de: 'Erfassungslänge' }, value: { en: '2,000 mm', de: '2.000 mm' } },
    ],
    tags: ['tooling'],
    row: {
      version: { en: 'Safety fence', de: 'Schutzzaun' },
      maker: ATOM,
      payload: NONE,
      stack: NONE,
      air: NONE,
      ip: NONE,
      detail: { en: '2 light curtains, 2,000 mm', de: '2 Lichtvorhänge, 2.000 mm' },
    },
  },
]

export const content: LandingContent = {
  meta: {
    title: {
      en: 'Palletizing Robots: End-of-Line Cobot Palletizers | MegaRobotics',
      de: 'Palettierroboter kaufen: Cobot-Palettierer | MegaRobotics',
    },
    description: {
      en: 'End-of-line palletizing robots from Atom Robot: cobot palletizers with 20 to 40 kg payload and stacks up to 2,300 mm, plus OnRobot grippers and fencing.',
      de: 'Palettierroboter für das Linienende: Cobot-Palettierer von Atom Robot mit 20 bis 40 kg Traglast und Stapeln bis 2.300 mm, dazu OnRobot-Greifer und Schutzzaun.',
    },
    crumb: { en: 'Palletizing robots', de: 'Palettierroboter' },
  },

  heroSlugs: [],
  heroImage: {
    src: `${CDN}/b6996ebabe4b510619cf9a8d4ae0e8def3effaa7-1672x941.webp`,
    fit: 'cover',
    alt: {
      en: 'Cobot palletizer stacking cartons on a pallet at the end of a production line',
      de: 'Cobot-Palettierer stapelt Kartons am Ende einer Produktionslinie auf eine Palette',
    },
  },
  hero: { carousel: { en: 'Palletizing robots in our range', de: 'Palettierroboter in unserem Programm' } },

  intro: {
    eyebrow: { en: 'Palletizing robots', de: 'Palettierroboter' },
    title: {
      en: 'Buy palletizing robots: cobot palletizers for the end of the line',
      de: 'Palettierroboter kaufen: Cobot-Palettierer für das Linienende',
    },
    lead: {
      en: 'All our palletizing solutions on one page: {count} products, from the fixed cobot palletizer to the version with a lifting axis, plus the grippers and guarding that go with them.',
      de: 'Unser gesamtes Palettier-Programm auf einer Seite: {count} Produkte, vom festen Cobot-Palettierer bis zur Version mit Hubachse, dazu passende Greifer und Absicherung.',
    },
    body: {
      en: 'Two numbers matter most when you choose a palletizing robot: the weight of a case including the gripper, and the stacking height. After that comes the setup, fixed, with a lifting axis or mobile. Atom Robot names food, pharma, electronics, chemicals and printing as fields of use.',
      de: 'Für die Wahl eines Palettierroboters zählen vor allem zwei Zahlen: das Gewicht eines Gebindes samt Greifer und die Stapelhöhe. Danach entscheidet die Aufstellung, also fest, mit Hubachse oder mobil. Atom Robot nennt als Einsatzfelder Lebensmittel, Pharma, Elektronik, Chemie und Druck.',
    },
    jobs: [
      {
        icon: 'Package',
        title: { en: 'Cartons at the end of the line', de: 'Kartons am Linienende' },
        body: { en: 'Fixed palletizers for 20, 30 or 40 kg.', de: 'Feste Palettierer für 20, 30 oder 40 kg.' },
        models: ['cobot-palletizer-am-20-g', 'cobot-palletizer-am-30-g', 'cobot-palletizer-am-40-g'],
      },
      {
        icon: 'Layers',
        title: { en: 'Tall pallets', de: 'Hohe Paletten' },
        body: { en: 'Stacks of 2,100 to 2,300 mm.', de: 'Stapel von 2.100 bis 2.300 mm.' },
        models: ['cobot-palletizer-am-30-ultra', 'cobot-palletizer-am-20-h', 'cobot-palletizer-am-30-h'],
      },
      {
        icon: 'Route',
        title: { en: 'Mobile setup', de: 'Mobile Aufstellung' },
        body: { en: 'A palletizer that is not fixed in place.', de: 'Ein Palettierer ohne feste Aufstellung.' },
        models: ['cobot-palletizer-atm-mmd20g'],
      },
      {
        icon: 'Hand',
        title: { en: 'Gripper and guarding', de: 'Greifer und Absicherung' },
        body: { en: 'Suction, fingers and light curtains.', de: 'Vakuum, Finger und Lichtvorhänge.' },
        models: ['onrobot-vgp20-vacuum-gripper', 'onrobot-2fgp20-palletizing-gripper', 'palletizer-standard-safety-fence'],
      },
    ],
  },

  facts: [
    { value: { en: '20–40 kg', de: '20–40 kg' }, label: { en: 'payload of the palletizers', de: 'Traglast der Palettierer' } },
    { value: { en: '2,300 mm', de: '2.300 mm' }, label: { en: 'maximum stacking height', de: 'maximale Stapelhöhe' } },
    { value: same('10'), label: { en: 'cobot palletizers in three versions', de: 'Cobot-Palettierer in drei Versionen' } },
    { value: { en: 'about 1 h', de: 'ca. 1 h' }, label: { en: 'to set up a new task, per Atom Robot', de: 'für eine neue Aufgabe, laut Atom Robot' } },
    { value: same('30 kg'), label: { en: 'on cardboard with the VGP30 gripper', de: 'bei Kartons mit dem Greifer VGP30' } },
  ],

  groups: [
    {
      id: 'fixed-palletizers',
      nav: { en: 'Fixed', de: 'Fest' },
      eyebrow: { en: 'Atom Robot · fixed versions', de: 'Atom Robot · feste Versionen' },
      title: {
        en: 'Fixed palletizer robots with 20 to 40 kg payload',
        de: 'Feste Roboterpalettierer mit 20 bis 40 kg Traglast',
      },
      lead: {
        en: 'Five fixed cobot palletizers. The G models stack up to 1,700 mm, the Ultra models up to 2,100 mm, and the AM-40-G carries 40 kg to 2,000 mm.',
        de: 'Fünf feste Cobot-Palettierer. Die G-Modelle stapeln bis 1.700 mm, die Ultra-Modelle bis 2.100 mm, und der AM-40-G trägt 40 kg bis 2.000 mm.',
      },
      body: {
        en: 'All of them are programmed graphically. According to Atom Robot, a new palletizing task is ready in about an hour and needs no coding skills, which helps on lines that change products often.',
        de: 'Alle werden grafisch programmiert. Laut Atom Robot ist eine neue Palettieraufgabe in etwa einer Stunde einsatzbereit, ohne Programmierkenntnisse. Das hilft auf Linien mit häufigem Produktwechsel.',
      },
      points: [
        { en: 'Payload 20, 30 or 40 kg', de: 'Traglast 20, 30 oder 40 kg' },
        { en: 'Stacking height 1,700 to 2,100 mm', de: 'Stapelhöhe 1.700 bis 2.100 mm' },
        { en: 'Small footprint, integrated design', de: 'Kleine Stellfläche, integrierte Bauweise' },
      ],
      manufacturer: 'atom-robot',
      feature: 'cobot-palletizer-am-40-g',
      models: [
        'cobot-palletizer-am-20-g',
        'cobot-palletizer-am-20-ultra',
        'cobot-palletizer-am-30-g',
        'cobot-palletizer-am-30-ultra',
      ],
    },
    {
      id: 'lifting-axis',
      nav: { en: 'Lifting axis', de: 'Hubachse' },
      eyebrow: { en: 'Atom Robot · lifting versions', de: 'Atom Robot · Hubversionen' },
      title: {
        en: 'Palletizing robots with lifting axis for stacks up to 2,300 mm',
        de: 'Palettierroboter mit Hubachse für Stapel bis 2.300 mm',
      },
      lead: {
        en: 'With a lifting axis the stacking height goes to 2,200 mm (S models) or 2,300 mm (H models), each with 20 or 30 kg payload.',
        de: 'Mit Hubachse steigt die Stapelhöhe auf 2.200 mm (S-Modelle) oder 2.300 mm (H-Modelle), jeweils mit 20 oder 30 kg Traglast.',
      },
      body: {
        en: 'Choose these when your pallets end up taller than the 2,100 mm of the fixed Ultra models. If the pallet stays lower, a fixed version is the simpler setup.',
        de: 'Diese Modelle passen, wenn Ihre Paletten höher werden als die 2.100 mm der festen Ultra-Modelle. Bleibt die Palette niedriger, ist eine feste Version die einfachere Lösung.',
      },
      points: [
        { en: 'AM-20-S and AM-30-S: up to 2,200 mm', de: 'AM-20-S und AM-30-S: bis 2.200 mm' },
        { en: 'AM-20-H and AM-30-H: up to 2,300 mm', de: 'AM-20-H und AM-30-H: bis 2.300 mm' },
        { en: 'Same graphical programming as the fixed models', de: 'Dieselbe grafische Programmierung wie bei den festen Modellen' },
      ],
      manufacturer: 'atom-robot',
      feature: 'cobot-palletizer-am-30-h',
      models: ['cobot-palletizer-am-20-s', 'cobot-palletizer-am-20-h', 'cobot-palletizer-am-30-s'],
    },
    {
      id: 'mobile-palletizer',
      nav: { en: 'Mobile', de: 'Mobil' },
      eyebrow: { en: 'Atom Robot · mobile version', de: 'Atom Robot · mobile Version' },
      title: {
        en: 'Mobile robot palletiser: ATM-MMD20G',
        de: 'Mobiler Roboter-Palettierer: ATM-MMD20G',
      },
      lead: {
        en: 'The mobile version of the Atom Robot palletizer handles 20 kg and stacks up to 1,500 mm.',
        de: 'Die mobile Version des Atom-Robot-Palettierers bewältigt 20 kg und stapelt bis 1.500 mm.',
      },
      body: {
        en: 'Its stacking height is the lowest in the range, so it suits lower pallets. Tell us how you want to place and move it at your line, and we clarify the details with the manufacturer.',
        de: 'Ihre Stapelhöhe ist die niedrigste im Programm, sie passt also zu niedrigeren Paletten. Sagen Sie uns, wie Sie sie an Ihrer Linie aufstellen und umsetzen möchten, dann klären wir die Details mit dem Hersteller.',
      },
      manufacturer: 'atom-robot',
      feature: 'cobot-palletizer-atm-mmd20g',
      models: [],
    },
    {
      id: 'grippers-guarding',
      nav: { en: 'Grippers & fence', de: 'Greifer & Zaun' },
      eyebrow: { en: 'OnRobot · Atom Robot', de: 'OnRobot · Atom Robot' },
      title: {
        en: 'Palletizing grippers and safety fencing',
        de: 'Palettiergreifer und Schutzzaun',
      },
      lead: {
        en: 'Three OnRobot grippers for cartons, open boxes and slip sheets, and the Atom Robot light-curtain fence for the cell.',
        de: 'Drei OnRobot-Greifer für Kartons, offene Kisten und Zwischenlagen, dazu der Lichtvorhang-Schutzzaun von Atom Robot für die Zelle.',
      },
      body: {
        en: 'The gripper weight counts against the robot payload. The 2FGP20 alone weighs 5.07 kg, the VGP20 2.55 kg and the VGP30 3.1 kg, so plan case and gripper together.',
        de: 'Das Greifergewicht geht von der Traglast des Roboters ab. Der 2FGP20 wiegt allein 5,07 kg, der VGP20 2,55 kg und der VGP30 3,1 kg. Planen Sie Gebinde und Greifer deshalb zusammen.',
      },
      points: [
        { en: 'VGP20: electric, no compressed air', de: 'VGP20: elektrisch, ohne Druckluft' },
        { en: 'VGP30: compressed air, 30 kg on cartons', de: 'VGP30: Druckluft, 30 kg bei Kartons' },
        { en: '2FGP20: fingers plus vacuum for slip sheets', de: '2FGP20: Finger plus Vakuum für Zwischenlagen' },
      ],
      feature: 'onrobot-vgp30-vacuum-gripper',
      models: ['onrobot-vgp20-vacuum-gripper', 'onrobot-2fgp20-palletizing-gripper', 'palletizer-standard-safety-fence'],
    },
  ],

  explainer: {
    eyebrow: { en: 'Basics', de: 'Grundlagen' },
    title: {
      en: 'End-of-line palletizing with a cobot: how it works',
      de: 'Palettieren mit Cobot: so funktioniert End-of-Line-Palettierung',
    },
    paragraphs: [
      {
        en: 'An end-of-line palletizer takes the finished cartons off the conveyor and stacks them layer by layer on a pallet. It is the last step before the goods leave the line, and in many plants it is still done by hand. Robotic palletising with a collaborative arm takes over this repetitive lifting.',
        de: 'Ein End-of-Line-Palettierroboter nimmt die fertigen Kartons vom Förderband und stapelt sie Lage für Lage auf eine Palette. Das ist der letzte Schritt, bevor die Ware die Linie verlässt, und in vielen Betrieben noch Handarbeit. Ein kollaborativer Palettierroboter übernimmt dieses wiederkehrende Heben.',
      },
      {
        en: 'The Atom Robot palletizers are integrated end-of-line palletizing systems with a small footprint. You set them up through graphical programming. According to the manufacturer, a new palletizing task is ready in about an hour without coding skills, so switching patterns on a high-mix line takes little effort.',
        de: 'Die Palettierer von Atom Robot sind integrierte Einheiten mit kleiner Stellfläche. Eingerichtet werden sie per grafischer Programmierung. Laut Hersteller ist eine neue Palettieraufgabe in etwa einer Stunde einsatzbereit, ohne Programmierkenntnisse. Ein Musterwechsel auf einer variantenreichen Linie kostet also wenig Aufwand.',
      },
      {
        en: 'Which robot palletiser fits depends on payload and stacking height. The fixed versions stack from 1,700 to 2,100 mm, the versions with a lifting axis to 2,200 or 2,300 mm, and the mobile ATM-MMD20G to 1,500 mm. The payload of 20, 30 or 40 kg has to cover the case plus the gripper.',
        de: 'Welcher Roboterpalettierer passt, hängt von Traglast und Stapelhöhe ab. Die festen Versionen stapeln 1.700 bis 2.100 mm, die Versionen mit Hubachse 2.200 oder 2.300 mm und der mobile ATM-MMD20G 1.500 mm. Die Traglast von 20, 30 oder 40 kg muss Gebinde und Greifer zusammen abdecken.',
      },
      {
        en: 'The gripper follows the packaging. Closed cartons usually pick well with suction, and the VGP20 also copes with porous and recycled cardboard. Open boxes and containers that suction cannot hold need the 2FGP20 finger gripper, which also lifts the slip sheet between layers. For sacks and bags, the gripper decides as well: OnRobot names light shipping bags for the VGP20, and for heavier sacks we check gripper and payload against your product.',
        de: 'Der Greifer richtet sich nach der Verpackung. Geschlossene Kartons lassen sich meist gut ansaugen, und der VGP20 kommt auch mit porösen und recycelten Kartonagen zurecht. Offene Kisten und Behälter, die sich nicht ansaugen lassen, brauchen den Fingergreifer 2FGP20, der auch die Zwischenlage zwischen den Lagen aufnimmt. Auch bei Säcken und Beuteln entscheidet der Greifer: OnRobot nennt leichte Versandbeutel für den VGP20, bei schwereren Säcken prüfen wir Greifer und Traglast an Ihrem Produkt.',
      },
    ],
  },

  compare: {
    eyebrow: { en: 'Comparison', de: 'Vergleich' },
    title: { en: 'All palletizing robots and accessories side by side', de: 'Alle Palettierroboter und Zubehörteile im Vergleich' },
    subtitle: {
      en: 'Filter by version or need and the table narrows down. Values are manufacturer data.',
      de: 'Filtern Sie nach Version oder Bedarf, dann wird die Tabelle kürzer. Alle Werte sind Herstellerangaben.',
    },
    filters: [
      { key: 'fixed', label: { en: 'Fixed', de: 'Fest' } },
      { key: 'lifting', label: { en: 'Lifting axis', de: 'Hubachse' } },
      { key: 'mobile', label: { en: 'Mobile', de: 'Mobil' } },
      { key: 'heavy', label: { en: '30 kg and more', de: 'Ab 30 kg' } },
      { key: 'tooling', label: { en: 'Grippers & guarding', de: 'Greifer & Absicherung' } },
      { key: 'electric', label: { en: 'No compressed air', de: 'Ohne Druckluft' } },
    ],
    cols: [
      { key: 'version', label: { en: 'Version / type', de: 'Version / Art' } },
      { key: 'maker', label: { en: 'Manufacturer', de: 'Hersteller' } },
      { key: 'payload', label: S.payload },
      { key: 'stack', label: { en: 'Max. stacking height', de: 'Max. Stapelhöhe' } },
      { key: 'air', label: { en: 'Compressed air', de: 'Druckluft' } },
      { key: 'ip', label: { en: 'IP class', de: 'Schutzart' } },
      { key: 'detail', label: { en: 'Key data', de: 'Weitere Daten' } },
    ],
    foot: {
      en: '– means the manufacturer gives no value in our product data. Cycle rate and footprint of the palletizers depend on the configuration and come with the quote. "No compressed air" refers to the grippers.',
      de: '– bedeutet: In unseren Produktdaten gibt der Hersteller keinen Wert an. Taktleistung und Stellfläche der Palettierer hängen von der Konfiguration ab und stehen im Angebot. „Ohne Druckluft“ bezieht sich auf die Greifer.',
    },
  },

  choose: {
    eyebrow: { en: 'Before you buy', de: 'Vor dem Kauf' },
    title: { en: 'How to choose the right palletizing robot', de: 'So finden Sie den passenden Palettierroboter' },
    items: [
      {
        title: { en: 'Case weight', de: 'Gebindegewicht' },
        body: {
          en: 'Add the heaviest case to the gripper weight and compare that with the payload of 20, 30 or 40 kg. Leave yourself some margin.',
          de: 'Rechnen Sie das schwerste Gebinde und das Greifergewicht zusammen und vergleichen Sie es mit der Traglast von 20, 30 oder 40 kg. Planen Sie etwas Reserve ein.',
        },
      },
      {
        title: { en: 'Stacking height', de: 'Stapelhöhe' },
        body: {
          en: 'Measure the finished pallet, not the empty one. Up to 2,100 mm a fixed version works, above that you need the lifting axis with up to 2,300 mm.',
          de: 'Messen Sie die fertige Palette, nicht die leere. Bis 2.100 mm reicht eine feste Version, darüber brauchen Sie die Hubachse mit bis zu 2.300 mm.',
        },
      },
      {
        title: { en: 'Fixed, lifting or mobile', de: 'Fest, Hubachse oder mobil' },
        body: {
          en: 'Fixed versions are the simplest setup. The lifting axis adds height, the mobile ATM-MMD20G suits layouts without a fixed station, with stacks up to 1,500 mm.',
          de: 'Feste Versionen sind am einfachsten aufzustellen. Die Hubachse bringt mehr Höhe, der mobile ATM-MMD20G passt zu Layouts ohne festen Platz, mit Stapeln bis 1.500 mm.',
        },
      },
      {
        title: { en: 'Gripper and packaging', de: 'Greifer und Verpackung' },
        body: {
          en: 'Closed cartons usually suit a vacuum gripper, open boxes and trays a finger gripper. If you use slip sheets, the 2FGP20 picks them without a tool change.',
          de: 'Geschlossene Kartons passen meist zum Vakuumgreifer, offene Kisten und Trays zum Fingergreifer. Arbeiten Sie mit Zwischenlagen, nimmt der 2FGP20 sie ohne Werkzeugwechsel auf.',
        },
      },
      {
        title: { en: 'Cycle rate and pattern', de: 'Takt und Packmuster' },
        body: {
          en: 'The achievable rate depends on case, pattern and stacking height. Send us your target rate and pallet format, and we check it against the configuration.',
          de: 'Der erreichbare Takt hängt von Gebinde, Packmuster und Stapelhöhe ab. Nennen Sie uns Zieltakt und Palettenformat, dann prüfen wir das für die Konfiguration.',
        },
      },
      {
        title: { en: 'Guarding', de: 'Absicherung' },
        body: {
          en: 'Whether you need a fence follows from the risk assessment of your installation. The standard safety fence covers the area with two light curtain sets.',
          de: 'Ob ein Schutzzaun nötig ist, ergibt sich aus der Risikobeurteilung Ihrer Anlage. Der Standard-Schutzzaun sichert den Bereich mit zwei Lichtvorhang-Sets ab.',
        },
      },
    ],
  },

  faq: {
    eyebrow: { en: 'Questions', de: 'Fragen' },
    title: { en: 'Palletizing robots: frequent questions', de: 'Palettierroboter: häufige Fragen' },
    items: [
      {
        q: { en: 'How much does a palletizing robot cost?', de: 'Was kostet ein Palettierroboter?' },
        a: {
          en: 'That depends on the model, the gripper, the guarding and how the cell connects to your line. We give the price in a quote for your configuration.',
          de: 'Das hängt vom Modell, vom Greifer, von der Absicherung und von der Anbindung an Ihre Linie ab. Den Preis nennen wir im Angebot für Ihre Konfiguration.',
        },
      },
      {
        q: { en: 'What is an end-of-line palletizer?', de: 'Was ist ein End-of-Line-Palettierroboter?' },
        a: {
          en: 'A robot at the end of the packaging line that takes cartons or cases off the conveyor and stacks them on a pallet in a set pattern. Our cobot palletizers from Atom Robot do this with 20 to 40 kg payload and stacks of 1,500 to 2,300 mm, depending on the version.',
          de: 'Ein Roboter am Ende der Verpackungslinie, der Kartons oder Gebinde vom Förderband nimmt und nach festem Muster auf eine Palette stapelt. Unsere Cobot-Palettierer von Atom Robot schaffen je nach Version 20 bis 40 kg Traglast und Stapel von 1.500 bis 2.300 mm.',
        },
      },
      {
        q: { en: 'Which palletizing robot suits heavy cartons?', de: 'Welcher Palettierroboter eignet sich für schwere Kartons?' },
        a: {
          en: 'The AM-40-G carries 40 kg and stacks up to 2,000 mm. For 30 kg there are the fixed AM-30-G and AM-30 Ultra and the AM-30-S and AM-30-H with lifting axis. Remember that the gripper weight comes off the payload.',
          de: 'Der AM-40-G trägt 40 kg und stapelt bis 2.000 mm. Für 30 kg gibt es die festen AM-30-G und AM-30 Ultra sowie AM-30-S und AM-30-H mit Hubachse. Denken Sie daran, dass das Greifergewicht von der Traglast abgeht.',
        },
      },
      {
        q: { en: 'How high can a cobot palletizer stack?', de: 'Wie hoch stapelt ein Cobot-Palettierer?' },
        a: {
          en: 'In our range from 1,500 mm (mobile ATM-MMD20G) to 2,300 mm (AM-20-H and AM-30-H). The G models reach 1,700 mm, the AM-40-G 2,000 mm, the Ultra models 2,100 mm and the S models 2,200 mm.',
          de: 'In unserem Programm von 1.500 mm (mobiler ATM-MMD20G) bis 2.300 mm (AM-20-H und AM-30-H). Die G-Modelle erreichen 1.700 mm, der AM-40-G 2.000 mm, die Ultra-Modelle 2.100 mm und die S-Modelle 2.200 mm.',
        },
      },
      {
        q: { en: 'How quickly can a cobot palletizer be set up?', de: 'Wie schnell lässt sich ein Cobot-Palettierer einrichten?' },
        a: {
          en: 'Atom Robot states that new palletizing tasks can be deployed in about an hour thanks to graphical programming, without coding skills. That covers the task itself. Allow extra time for connecting it to your line and for guarding.',
          de: 'Atom Robot gibt an, dass neue Palettieraufgaben dank grafischer Programmierung in etwa einer Stunde einsatzbereit sind, ohne Programmierkenntnisse. Das gilt für die Aufgabe selbst. Die Anbindung an Ihre Linie und die Absicherung planen Sie zusätzlich ein.',
        },
      },
      {
        q: { en: 'Vacuum or finger gripper for palletizing cartons?', de: 'Kartons palettieren: Vakuum- oder Fingergreifer?' },
        a: {
          en: 'Closed boxes usually pick well with suction. The VGP20 runs without compressed air and handles porous cardboard, the VGP30 uses compressed air at 3–7 bar and lifts 30 kg on cardboard boxes. With open or heavy boxes, the 2FGP20 finger gripper is less sensitive to material and porosity. It is best to test with your own cases.',
          de: 'Geschlossene Kartons lassen sich meist gut ansaugen. Der VGP20 arbeitet ohne Druckluft und kommt mit porösen Kartonagen zurecht, der VGP30 nutzt Druckluft mit 3–7 bar und hebt 30 kg bei Kartons. Bei offenen oder schweren Kartons reagiert der Fingergreifer 2FGP20 unempfindlicher auf Material und Porosität. Am besten testen Sie mit Ihren eigenen Gebinden.',
        },
      },
      {
        q: { en: 'Does a cobot palletizer need a safety fence?', de: 'Braucht ein Cobot-Palettierer einen Schutzzaun?' },
        a: {
          en: 'That follows from the risk assessment of your installation, where the weight and speed of the cases play a big part. For the area around the working envelope there is the standard safety fence with two light curtain sets, 145 to 1,370 mm detection height and 2,000 mm detection length.',
          de: 'Das ergibt sich aus der Risikobeurteilung Ihrer Anlage. Gewicht und Tempo der Gebinde spielen dabei eine große Rolle. Für den Bereich rund um den Arbeitsraum gibt es den Standard-Schutzzaun mit zwei Lichtvorhang-Sets, 145 bis 1.370 mm Erfassungshöhe und 2.000 mm Erfassungslänge.',
        },
      },
      {
        q: { en: 'Are the palletizers suited to food and pharma palletizing?', de: 'Eignen sich die Palettierer für Lebensmittel und Pharma?' },
        a: {
          en: 'Atom Robot names food, pharmaceuticals, 3C electronics, daily chemicals and printing as fields of use. Hygiene and cleaning requirements differ from plant to plant, so we clarify them with the manufacturer for your application.',
          de: 'Atom Robot nennt Lebensmittel, Pharma, 3C-Elektronik, Haushaltschemie und Druck als Einsatzfelder. Hygiene- und Reinigungsanforderungen unterscheiden sich von Betrieb zu Betrieb, deshalb klären wir sie für Ihre Anwendung mit dem Hersteller.',
        },
      },
      {
        q: { en: 'Can a palletizing robot stack sacks?', de: 'Kann ein Palettierroboter Säcke palettieren?' },
        a: {
          en: 'That depends on the gripper and the weight of the sack. OnRobot names light shipping bags among the materials the VGP20 can hold. For heavier sacks, send us weight, size and material, and we check which gripper and payload fit.',
          de: 'Das hängt vom Greifer und vom Gewicht des Sacks ab. OnRobot nennt leichte Versandbeutel unter den Materialien, die der VGP20 halten kann. Bei schwereren Säcken nennen Sie uns Gewicht, Maße und Material, dann prüfen wir, welcher Greifer und welche Traglast passen.',
        },
      },
    ],
  },

  related: [
    { href: '/solutions/palletizing-end-of-line', label: { en: 'Palletizing and end-of-line automation', de: 'Palettieren und End-of-Line-Automatisierung' } },
    { href: '/pages/cobots', label: { en: 'Cobots', de: 'Cobots' } },
    { href: '/pages/robot-grippers', label: { en: 'Robot grippers', de: 'Robotergreifer' } },
    { href: '/products/categories/robotic-cells-application-packages', label: { en: 'Robotic cells and application packages', de: 'Roboterzellen und Applikationspakete' } },
    { href: '/products/categories/end-effectors-robot-tooling', label: { en: 'End effectors and robot tooling', de: 'Endeffektoren und Roboterwerkzeuge' } },
    { href: '/manufacturers/atom-robot', label: { en: 'All products from Atom Robot', de: 'Alle Produkte von Atom Robot' } },
    { href: '/manufacturers/onrobot', label: { en: 'All products from OnRobot', de: 'Alle Produkte von OnRobot' } },
  ],

  cta: {
    eyebrow: { en: 'Advice and quote', de: 'Beratung und Angebot' },
    title: { en: 'Tell us what you want to palletize', de: 'Sagen Sie uns, was Sie palettieren möchten' },
    body: {
      en: 'Give us case weight, dimensions, pallet format, stacking height and cycle rate. We compare the configurations that fit and send you a quote.',
      de: 'Nennen Sie uns Gebindegewicht, Maße, Palettenformat, Stapelhöhe und Takt. Wir vergleichen die passenden Konfigurationen und schicken Ihnen ein Angebot.',
    },
    button: { en: 'Send an enquiry', de: 'Anfrage senden' },
    subject: { en: 'Palletizing robots', de: 'Palettierroboter' },
  },

  fine: [
    {
      en: 'Technical data are manufacturer information and may change. The binding data are those in the quote.',
      de: 'Technische Daten sind Herstellerangaben und können sich ändern. Verbindlich sind die Angaben im Angebot.',
    },
    {
      en: 'Gripper payloads are OnRobot values: the VGP20 lists 10 kg typical and 20 kg maximum, the VGP30 30 kg for cardboard boxes, the 2FGP20 20 kg with the fingers and 2.5 kg with the vacuum. The usable case weight also depends on the robot payload.',
      de: 'Greifer-Traglasten sind OnRobot-Angaben: beim VGP20 10 kg typisch und maximal 20 kg, beim VGP30 30 kg für Kartons, beim 2FGP20 20 kg mit den Fingern und 2,5 kg mit dem Vakuum. Das nutzbare Gebindegewicht hängt außerdem von der Traglast des Roboters ab.',
    },
    {
      en: 'Images are renderings and illustrations by the manufacturers. Product names and trademarks belong to their owners.',
      de: 'Bilder sind Visualisierungen und Illustrationen der Hersteller. Produktnamen und Marken gehören ihren Inhabern.',
    },
  ],
}
