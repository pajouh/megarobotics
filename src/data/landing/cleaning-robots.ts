// Content for the cleaning robot buying page at /pages/cleaning-robots (and /de/...).
//
// Figures come from the published Sanity entries of the five products
// (specifications, description, features). The 55 dB of the S55 Pro and the
// 20 kPa of the K1 are stated in the product descriptions, not in the
// specification lists. SEER lists no CE marking for the SCL-AWG50; the page
// says so wherever the model appears.

import { CDN, NONE, same, type LandingContent, type LandingModel } from './types'

const S = {
  area: { en: 'Max. area rate', de: 'Max. Flächenleistung' },
  width: { en: 'Cleaning width', de: 'Reinigungsbreite' },
  tanks: { en: 'Clean / waste water', de: 'Frisch- / Schmutzwasser' },
  runtime: { en: 'Runtime', de: 'Laufzeit' },
  weight: { en: 'Weight', de: 'Gewicht' },
  noise: { en: 'Noise', de: 'Geräusch' },
  passage: { en: 'Min. passage', de: 'Min. Durchgang' },
}

export const MODELS: LandingModel[] = [
  {
    slug: 'orionstar-cleanibot-c5',
    name: same('OrionStar CleaniBot C5'),
    type: { en: 'Autonomous scrubber-dryer', de: 'Autonomer Scheuersaugroboter' },
    image: `${CDN}/3cfcfc5248b771fc31d86b05068a0cea619cc259-588x720.webp`,
    fit: 'contain',
    blurb: {
      en: 'OrionStar’s flagship for medium to large sites such as warehouses, campuses and transport hubs. Scrubs with 25 kg of brush pressure, carries 45 L of clean and 45 L of waste water and rinses its own tanks.',
      de: 'Das Flaggschiff von OrionStar für mittlere bis große Flächen wie Lager, Campusgelände und Verkehrsknoten. Schrubbt mit 25 kg Bürstenanpressdruck, fasst je 45 L Frisch- und Schmutzwasser und spült seine Tanks selbst.',
    },
    specs: [
      { label: S.area, value: { en: '1,980 m²/h', de: '1.980 m²/h' } },
      { label: S.width, value: same('550 mm') },
      { label: S.tanks, value: same('45 L / 45 L') },
      { label: S.runtime, value: { en: '3 h scrubbing', de: '3 h Schrubben' } },
    ],
    tags: ['scrub', 'large', 'industry'],
    row: {
      modes: { en: 'Scrubbing, mopping', de: 'Schrubben, Wischen' },
      area: { en: '1,980 m²/h', de: '1.980 m²/h' },
      width: same('550 mm'),
      tanks: same('45 / 45 L'),
      runtime: { en: '3 h scrubbing, 8 h mopping', de: '3 h Schrubben, 8 h Wischen' },
      weight: same('170 kg'),
      noise: same('< 68 dB(A)'),
    },
  },
  {
    slug: 'orionstar-cleanibot-m1',
    name: same('OrionStar CleaniBot M1'),
    type: { en: 'Commercial scrubber with water station', de: 'Scheuersaugroboter mit Wasserstation' },
    image: `${CDN}/19595bab00a89d63186db3fb1904068a7ea4b4ed-588x720.webp`,
    fit: 'contain',
    blurb: {
      en: 'Scrubs, sweeps and dust mops in one machine. A water station refills and charges it, 11 sensors watch for obstacles, and tasks run on a schedule with a digital cleaning report afterwards.',
      de: 'Schrubbt, kehrt und wischt Staub in einer Maschine. Eine Wasserstation füllt nach und lädt, 11 Sensoren erkennen Hindernisse, und Aufgaben laufen nach Zeitplan, mit digitalem Reinigungsbericht danach.',
    },
    specs: [
      { label: S.area, value: { en: '1,200 m²/h', de: '1.200 m²/h' } },
      { label: S.width, value: same('500 mm') },
      { label: S.tanks, value: same('35 L / 33 L') },
      { label: S.runtime, value: { en: '3.5 h scrubbing', de: '3,5 h Schrubben' } },
    ],
    tags: ['scrub', 'large', 'occupied', 'industry'],
    row: {
      modes: { en: 'Scrubbing, sweeping, dust mopping', de: 'Schrubben, Kehren, Staubwischen' },
      area: { en: '1,200 m²/h', de: '1.200 m²/h' },
      width: same('500 mm'),
      tanks: same('35 / 33 L'),
      runtime: { en: '3.5 h scrubbing, 8 h mopping', de: '3,5 h Schrubben, 8 h Wischen' },
      weight: { en: '121.7 kg', de: '121,7 kg' },
      noise: NONE,
    },
  },
  {
    slug: 'orionstar-cleanibot-s55-pro',
    name: same('OrionStar CleaniBot S55 Pro'),
    type: { en: 'All-in-one floor cleaning robot', de: 'All-in-one-Reinigungsroboter' },
    image: `${CDN}/45e47434bf4d16f463f41c118823ec8815bd51ca-588x720.webp`,
    fit: 'contain',
    blurb: {
      en: 'Sweeps, scrubs, vacuums, mops and disinfects in a single cycle. At 55 dB and with a 700 mm minimum passage it works in hotels, offices, malls, schools and exhibition halls while people are around.',
      de: 'Kehrt, schrubbt, saugt, wischt und desinfiziert in einem Durchgang. Mit 55 dB und 700 mm Mindestdurchgang arbeitet er in Hotels, Büros, Einkaufszentren, Schulen und Messehallen, auch wenn Menschen unterwegs sind.',
    },
    specs: [
      { label: { en: 'Scrubbing', de: 'Schrubben' }, value: { en: '1,197 m²/h', de: '1.197 m²/h' } },
      { label: { en: 'Sweeping & vacuuming', de: 'Kehren & Saugen' }, value: { en: '1,368 m²/h', de: '1.368 m²/h' } },
      { label: S.passage, value: same('700 mm') },
      { label: S.noise, value: same('55 dB') },
    ],
    tags: ['scrub', 'vacuum', 'large', 'occupied'],
    row: {
      modes: { en: 'Sweeping, scrubbing, vacuuming, mopping, disinfecting', de: 'Kehren, Schrubben, Saugen, Wischen, Desinfizieren' },
      area: { en: '1,197 (scrub) / 1,368 m²/h', de: '1.197 (Schrubben) / 1.368 m²/h' },
      width: NONE,
      tanks: same('22 / 15 L'),
      runtime: { en: '4.5 h scrubbing, up to 28 h dust mopping', de: '4,5 h Schrubben, bis 28 h Staubwischen' },
      weight: same('70 kg'),
      noise: same('55 dB'),
    },
  },
  {
    slug: 'orionstar-cleanibot-k1',
    name: same('OrionStar CleaniBot K1'),
    type: { en: 'Compact carpet vacuuming robot', de: 'Kompakter Saugroboter für Teppich' },
    image: `${CDN}/a89471ae3a81cad0eb916a5eee36a120ca10b4e8-588x720.webp`,
    fit: 'contain',
    blurb: {
      en: 'A compact vacuum robot for carpets and hard floors in tight spaces. 20 kPa of suction and a V-shaped anti-tangle roller brush keep hair from wrapping. Connects over Wi-Fi or 4G.',
      de: 'Ein kompakter Saugroboter für Teppiche und Hartböden in engen Bereichen. 20 kPa Saugleistung und eine V-förmige Walzenbürste, an der sich keine Haare aufwickeln. Verbindung über WLAN oder 4G.',
    },
    specs: [
      { label: S.area, value: same('700 m²/h') },
      { label: S.width, value: same('440 mm') },
      { label: { en: 'Dust bin', de: 'Staubbehälter' }, value: same('10 L') },
      { label: S.runtime, value: { en: '8 h vacuuming', de: '8 h Saugen' } },
    ],
    tags: ['vacuum', 'carpet', 'occupied'],
    row: {
      modes: { en: 'Vacuuming, mopping', de: 'Saugen, Wischen' },
      area: same('700 m²/h'),
      width: same('440 mm'),
      tanks: { en: '10 L dust bin', de: '10 L Staubbehälter' },
      runtime: { en: '8 h vacuuming, 4 h mopping', de: '8 h Saugen, 4 h Wischen' },
      weight: same('46 kg'),
      noise: same('< 75 dB(A)'),
    },
  },
  {
    slug: 'seer-scl-awg50',
    name: same('SEER SCL-AWG50'),
    type: { en: 'Floor cleaning robot for industry, on request', de: 'Bodenreinigungsroboter für die Industrie, auf Anfrage' },
    image: `${CDN}/0ec5f4203ce3a5c16944485d89e1035e0a08d014-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'Wet cleaning for production halls and warehouses on tile, cement, stone, terrazzo and epoxy floors. Charges, takes in fresh water and empties its dirty water on its own, and runs alongside other SEER robots via SEER’s RDS software. SEER lists no CE marking for this model, so we check EU use with SEER before any order.',
      de: 'Nassreinigung für Produktionshallen und Lager auf Fliesen-, Zement-, Stein-, Terrazzo- und Epoxidböden. Lädt, tankt Frischwasser und lässt Schmutzwasser selbst ab und fährt über die RDS-Software von SEER zusammen mit anderen SEER-Robotern. SEER nennt für dieses Modell keine CE-Kennzeichnung, den Einsatz in der EU klären wir deshalb vor jeder Bestellung mit SEER.',
    },
    specs: [
      { label: S.area, value: { en: 'up to 1,800 m²/h', de: 'bis 1.800 m²/h' } },
      { label: S.width, value: same('500 mm') },
      { label: S.tanks, value: same('34 L / 34 L') },
      { label: { en: 'Min. aisle width', de: 'Min. Gangbreite' }, value: same('900 mm') },
    ],
    tags: ['scrub', 'large', 'industry'],
    row: {
      modes: { en: 'Mopping, dust push', de: 'Wischen, Staubschieben' },
      area: { en: 'up to 1,800 m²/h', de: 'bis 1.800 m²/h' },
      width: same('500 mm'),
      tanks: same('34 / 34 L'),
      runtime: { en: '2–4 h mopping, 8–10 h dust push', de: '2–4 h Wischen, 8–10 h Staubschieben' },
      weight: same('140 ± 10 kg'),
      noise: same('< 70 dB(A)'),
    },
  },
]

export const content: LandingContent = {
  meta: {
    title: {
      en: 'Cleaning Robots & Floor Scrubber Robots | MegaRobotics',
      de: 'Reinigungsroboter kaufen: autonome Bodenreinigung | MegaRobotics',
    },
    description: {
      en: 'Commercial cleaning robots from OrionStar and SEER compared: floor scrubber robots and vacuum robots by area rate, tank size, runtime and noise level.',
      de: 'Reinigungsroboter für große Flächen: Scheuersaugroboter und Saugroboter von OrionStar und SEER im Vergleich, mit Flächenleistung, Tanks, Laufzeit und Geräusch.',
    },
    crumb: { en: 'Cleaning robots', de: 'Reinigungsroboter' },
  },

  heroSlugs: [],
  heroImage: {
    src: `${CDN}/3cfcfc5248b771fc31d86b05068a0cea619cc259-588x720.webp`,
    alt: {
      en: 'OrionStar CleaniBot C5 autonomous floor scrubber robot',
      de: 'OrionStar CleaniBot C5, autonomer Scheuersaugroboter',
    },
  },
  hero: {
    carousel: { en: 'Cleaning robots in our range', de: 'Reinigungsroboter in unserem Programm' },
  },

  intro: {
    eyebrow: { en: 'Cleaning robots', de: 'Reinigungsroboter' },
    title: { en: 'Buy cleaning robots for commercial floors', de: 'Reinigungsroboter kaufen: autonome Bodenreinigung' },
    lead: {
      en: 'All our cleaning robots on one page: {count} models from OrionStar and SEER, from the compact carpet vacuum to the floor scrubber robot for large halls.',
      de: 'Alle unsere Reinigungsroboter auf einer Seite: {count} Modelle von OrionStar und SEER, vom kompakten Teppichsauger bis zum Scheuersaugroboter für große Hallen.',
    },
    body: {
      en: 'Which commercial cleaning robot fits depends on three things: how much floor you need to clean in the time available, what the floor is made of, and how narrow the tightest passage on the route is. Start there and the choice gets short.',
      de: 'Welcher Reinigungsroboter passt, hängt von drei Dingen ab: wie viel Fläche in der verfügbaren Zeit sauber werden muss, welcher Bodenbelag liegt und wie schmal der engste Durchgang auf der Route ist. Wer das klärt, hat schnell eine kurze Auswahl.',
    },
    jobs: [
      {
        icon: 'Warehouse',
        title: { en: 'Warehouses and production halls', de: 'Lager und Produktionshallen' },
        body: { en: 'Large hard floors, big tanks, high area rate.', de: 'Große Hartböden, große Tanks, hohe Flächenleistung.' },
        models: ['orionstar-cleanibot-c5', 'seer-scl-awg50'],
      },
      {
        icon: 'Building2',
        title: { en: 'Office complexes, malls and schools', de: 'Bürokomplexe, Einkaufszentren und Schulen' },
        body: { en: 'Scheduled scrubbing with little staff time.', de: 'Schrubben nach Zeitplan, mit wenig Personalaufwand.' },
        models: ['orionstar-cleanibot-m1', 'orionstar-cleanibot-s55-pro'],
      },
      {
        icon: 'Hotel',
        title: { en: 'Hotels and exhibition halls', de: 'Hotels und Messehallen' },
        body: { en: 'Quiet operation and several cleaning modes in one cycle.', de: 'Leiser Betrieb und mehrere Reinigungsarten in einem Durchgang.' },
        models: ['orionstar-cleanibot-s55-pro'],
      },
      {
        icon: 'Sparkles',
        title: { en: 'Carpets and tight spaces', de: 'Teppich und enge Bereiche' },
        body: { en: 'Compact vacuuming for corridors, rooms and smaller floors.', de: 'Kompaktes Saugen für Flure, Zimmer und kleinere Flächen.' },
        models: ['orionstar-cleanibot-k1'],
      },
    ],
  },

  facts: [
    { value: { en: '700–1,980 m²/h', de: '700–1.980 m²/h' }, label: { en: 'max. area rate, K1 to C5', de: 'max. Flächenleistung, K1 bis C5' } },
    { value: same('440–550 mm'), label: { en: 'cleaning width', de: 'Reinigungsbreite' } },
    { value: same('90 L'), label: { en: 'water on board the C5 (45 L + 45 L)', de: 'Wasser an Bord des C5 (45 L + 45 L)' } },
    { value: { en: 'up to 4.5 h', de: 'bis 4,5 h' }, label: { en: 'scrubbing per charge (S55 Pro)', de: 'Schrubben pro Ladung (S55 Pro)' } },
    { value: same('700 mm'), label: { en: 'narrowest passage for the S55 Pro', de: 'engster Durchgang für den S55 Pro' } },
    { value: same('55 dB'), label: { en: 'S55 Pro in operation', de: 'S55 Pro im Betrieb' } },
  ],

  groups: [
    {
      id: 'scrubber-dryers',
      nav: { en: 'Scrubber-dryers', de: 'Scheuersaugroboter' },
      eyebrow: { en: 'OrionStar · China', de: 'OrionStar · China' },
      title: { en: 'Floor scrubber robots for large areas', de: 'Scheuersaugroboter für große Flächen' },
      lead: {
        en: 'The CleaniBot C5 and M1 scrub hard floors with brushes and water and pick up the dirty water again. The C5 covers the most floor in the range, the M1 refills and charges at its water station.',
        de: 'CleaniBot C5 und M1 schrubben Hartböden mit Bürsten und Wasser und nehmen das Schmutzwasser gleich wieder auf. Der C5 schafft die meiste Fläche im Programm, der M1 füllt und lädt an seiner Wasserstation.',
      },
      body: {
        en: 'Both suit warehouses, factories, office complexes and transport hubs. The C5 carries 90 L of water in total and works up to 1,980 m²/h. The M1 is lighter at 121.7 kg, cleans up to 1,200 m²/h and climbs slopes of up to 8°.',
        de: 'Beide passen zu Lagern, Fabriken, Bürokomplexen und Verkehrsknoten. Der C5 fasst insgesamt 90 L Wasser und reinigt bis zu 1.980 m²/h. Der M1 ist mit 121,7 kg leichter, schafft bis zu 1.200 m²/h und fährt Steigungen bis 8°.',
      },
      points: [
        { en: 'C5: 550 mm cleaning width, 25 kg brush pressure', de: 'C5: 550 mm Reinigungsbreite, 25 kg Anpressdruck' },
        { en: 'C5: automatic tank cleaning, 1.5 h charging', de: 'C5: automatische Tankreinigung, 1,5 h Ladezeit' },
        { en: 'M1: 50 cm dual roller brushes, 68 cm squeegee', de: 'M1: 50-cm-Doppelwalzenbürsten, 68 cm Sauglippe' },
        { en: 'M1: scheduled tasks and digital cleaning reports', de: 'M1: Aufgaben nach Zeitplan, digitale Reinigungsberichte' },
      ],
      manufacturer: 'orionstar',
      feature: 'orionstar-cleanibot-c5',
      models: ['orionstar-cleanibot-m1'],
    },
    {
      id: 'all-in-one',
      nav: { en: 'All-in-one', de: 'All-in-one' },
      eyebrow: { en: 'OrionStar · China', de: 'OrionStar · China' },
      title: { en: 'CleaniBot S55 Pro: all-in-one cleaning robot for hotels and offices', de: 'CleaniBot S55 Pro: Reinigungsroboter für Hotels und Büros' },
      lead: {
        en: 'One machine for the whole floor routine: it sweeps, scrubs, vacuums, mops and disinfects in a single cycle, with several cleaning modes you can adjust.',
        de: 'Eine Maschine für die ganze Bodenroutine: Der S55 Pro kehrt, schrubbt, saugt, wischt und desinfiziert in einem Durchgang, mit mehreren einstellbaren Reinigungsmodi.',
      },
      body: {
        en: 'At 55 dB it can run while guests and staff are in the building, and it fits through passages from 700 mm. Scrubbing it covers 1,197 m²/h, sweeping and vacuuming 1,368 m²/h. The modular build keeps maintenance simple.',
        de: 'Mit 55 dB kann er arbeiten, während Gäste und Mitarbeitende im Haus sind, und er passt durch Durchgänge ab 700 mm. Beim Schrubben schafft er 1.197 m²/h, beim Kehren und Saugen 1.368 m²/h. Der modulare Aufbau hält die Wartung einfach.',
      },
      points: [
        { en: '22 L clean water, 15 L waste water', de: '22 L Frischwasser, 15 L Schmutzwasser' },
        { en: '4.5 h scrubbing, up to 28 h dust mopping', de: '4,5 h Schrubben, bis 28 h Staubwischen' },
        { en: '70 kg, 650 × 580 × 550 mm', de: '70 kg, 650 × 580 × 550 mm' },
      ],
      manufacturer: 'orionstar',
      feature: 'orionstar-cleanibot-s55-pro',
      models: [],
    },
    {
      id: 'carpet-vacuum',
      nav: { en: 'Carpet', de: 'Teppich' },
      eyebrow: { en: 'OrionStar · China', de: 'OrionStar · China' },
      title: { en: 'Commercial vacuum robot for carpets', de: 'Saugroboter fürs Gewerbe: Teppich und enge Bereiche' },
      lead: {
        en: 'Scrubber-dryers are made for hard floors. For carpeted corridors, hotel rooms and offices, the CleaniBot K1 vacuums with 20 kPa and an anti-tangle roller brush.',
        de: 'Scheuersaugroboter sind für Hartböden gemacht. Für Teppichflure, Hotelzimmer und Büros saugt der CleaniBot K1 mit 20 kPa und einer Walzenbürste, die sich nicht verfilzt.',
      },
      body: {
        en: 'At 46 kg it is the lightest robot on this page. It vacuums for up to 8 hours per charge, holds 10 L of dust and also mops for up to 4 hours.',
        de: 'Mit 46 kg ist er der leichteste Roboter auf dieser Seite. Er saugt bis zu 8 Stunden pro Ladung, fasst 10 L Staub und wischt außerdem bis zu 4 Stunden.',
      },
      manufacturer: 'orionstar',
      feature: 'orionstar-cleanibot-k1',
      models: [],
    },
    {
      id: 'industrial-floor-cleaning',
      nav: { en: 'Industry', de: 'Industrie' },
      eyebrow: { en: 'SEER Robotics · China', de: 'SEER Robotics · China' },
      title: { en: 'Floor cleaning robot for industrial halls', de: 'Bodenreinigungsroboter für die Industrie' },
      lead: {
        en: 'The SEER SCL-AWG50 is built for production halls and warehouses. It navigates by laser SLAM, cleans up to 1,800 m²/h and handles charging, fresh water and dirty water on its own.',
        de: 'Der SEER SCL-AWG50 ist für Produktionshallen und Lager gebaut. Er navigiert per Laser-SLAM, reinigt bis zu 1.800 m²/h und kümmert sich selbst um Laden, Frischwasser und Schmutzwasser.',
      },
      body: {
        en: 'If you already run other SEER robots, SEER’s RDS software can dispatch the SCL-AWG50 together with them. SEER lists no CE marking for this model. We clarify with SEER whether and how it can be used in the EU before you order.',
        de: 'Wer bereits andere Roboter von SEER einsetzt, kann den SCL-AWG50 über die RDS-Software von SEER gemeinsam mit ihnen steuern. SEER nennt für dieses Modell keine CE-Kennzeichnung. Ob und wie er in der EU eingesetzt werden kann, klären wir vor Ihrer Bestellung mit SEER.',
      },
      points: [
        { en: 'Aisles from 900 mm, slopes below 8°', de: 'Gänge ab 900 mm, Steigungen unter 8°' },
        { en: '3D camera and lidar for obstacle detection', de: '3D-Kamera und Lidar zur Hinderniserkennung' },
        { en: '24 V / 50 Ah LiFePO4 battery, 1 h charging', de: 'LiFePO4-Akku 24 V / 50 Ah, 1 h Ladezeit' },
        { en: 'Ethernet and Wi-Fi', de: 'Ethernet und WLAN' },
      ],
      manufacturer: 'seer-robotics',
      feature: 'seer-scl-awg50',
      models: [],
    },
  ],

  explainer: {
    eyebrow: { en: 'Basics', de: 'Grundlagen' },
    title: { en: 'Autonomous floor cleaning: how it works and what it brings', de: 'Autonome Bodenreinigung: so funktioniert sie, das sind die Vorteile' },
    paragraphs: [
      {
        en: 'A cleaning robot is a floor cleaning machine that drives itself. It learns the site once, then follows set routes and schedules and steers around people and obstacles with its sensors. In commercial cleaning there are three main types: floor scrubber robots (scrubber-dryers) for hard floors, vacuum robots for carpet, and all-in-one machines that combine several cleaning modes.',
        de: 'Ein Reinigungsroboter ist eine Bodenreinigungsmaschine, die selbst fährt. Er lernt das Gebäude einmal kennen, folgt dann festen Routen und Zeitplänen und weicht mit seiner Sensorik Menschen und Hindernissen aus. In der Gebäudereinigung gibt es drei Grundtypen: Scheuersaugroboter für Hartböden, Saugroboter für Teppich und All-in-one-Geräte, die mehrere Reinigungsarten verbinden.',
      },
      {
        en: 'A scrubber-dryer works like a ride-on scrubber without a driver. Brushes scrub the floor with fresh water from one tank, a squeegee behind them lifts the dirty water into a second tank. Tank size and area rate decide how much floor it covers before it needs water or a charge. The CleaniBot M1 refills at its water station, and the SEER SCL-AWG50 also empties its dirty water by itself. That matters most at night, when nobody is there.',
        de: 'Ein Scheuersaugroboter arbeitet wie ein Aufsitz-Scheuersaugautomat ohne Fahrer. Bürsten schrubben den Boden mit Frischwasser aus einem Tank, eine Sauglippe dahinter nimmt das Schmutzwasser in einen zweiten Tank auf. Tankgröße und Flächenleistung bestimmen, wie viel Fläche er schafft, bevor er Wasser oder Strom braucht. Der CleaniBot M1 füllt an seiner Wasserstation nach, der SEER SCL-AWG50 lässt auch das Schmutzwasser selbst ab. Das zählt vor allem nachts, wenn niemand vor Ort ist.',
      },
      {
        en: 'The advantages of autonomous floor cleaning are mostly about consistency and time. The robot cleans the same route the same way every day, and the cleaning staff spend their hours on edges, stairs, sanitary areas and spot cleaning instead of pushing a machine across open floor. Models with reports, such as the M1, also document what was cleaned and when.',
        de: 'Die Vorteile autonomer Bodenreinigung liegen vor allem in Gleichmäßigkeit und Zeit. Der Roboter reinigt dieselbe Route jeden Tag auf dieselbe Weise, und das Reinigungspersonal nutzt seine Stunden für Kanten, Treppen, Sanitärbereiche und Detailarbeit, statt eine Maschine über freie Flächen zu schieben. Modelle mit Berichtsfunktion wie der M1 dokumentieren zudem, was wann gereinigt wurde.',
      },
      {
        en: 'Cleaning robotics does not replace the whole team. Stairs, corners, heavy soiling and cluttered floors still need people, and the floor has to be reasonably clear before a run. For planning, treat the manufacturer’s area rate as a ceiling: layout, obstacles and turns bring the real figure down, so plan your daily area well below it.',
        de: 'Reinigungsrobotik ersetzt nicht das ganze Team. Treppen, Ecken, starke Verschmutzung und zugestellte Flächen brauchen weiterhin Menschen, und der Boden sollte vor einer Fahrt weitgehend frei sein. Für die Planung gilt die Flächenleistung des Herstellers als Obergrenze: Grundriss, Hindernisse und Wendemanöver drücken den echten Wert, planen Sie die tägliche Fläche also deutlich darunter.',
      },
    ],
  },

  compare: {
    eyebrow: { en: 'Comparison', de: 'Vergleich' },
    title: { en: 'All cleaning robots side by side', de: 'Alle Reinigungsroboter im Vergleich' },
    subtitle: {
      en: 'Choose what matters and the table narrows down. All values are manufacturer data.',
      de: 'Wählen Sie, was zählt, dann wird die Tabelle kürzer. Alle Werte sind Herstellerangaben.',
    },
    filters: [
      { key: 'scrub', label: { en: 'Wet cleaning / scrubbing', de: 'Nassreinigung / Schrubben' } },
      { key: 'vacuum', label: { en: 'Vacuuming', de: 'Saugen' } },
      { key: 'large', label: { en: 'Large areas (from 1,200 m²/h)', de: 'Große Flächen (ab 1.200 m²/h)' } },
      { key: 'occupied', label: { en: 'Offices, hotels, retail', de: 'Büro, Hotel, Handel' } },
      { key: 'industry', label: { en: 'Warehouse & production', de: 'Lager & Produktion' } },
      { key: 'carpet', label: { en: 'Carpet', de: 'Teppich' } },
    ],
    cols: [
      { key: 'modes', label: { en: 'Cleaning modes', de: 'Reinigungsarten' } },
      { key: 'area', label: { en: 'Max. area rate', de: 'Max. Flächenleistung' } },
      { key: 'width', label: { en: 'Cleaning width', de: 'Reinigungsbreite' } },
      { key: 'tanks', label: { en: 'Tanks (clean / waste)', de: 'Tanks (frisch / schmutzig)' } },
      { key: 'runtime', label: { en: 'Runtime per charge', de: 'Laufzeit pro Ladung' } },
      { key: 'weight', label: { en: 'Weight', de: 'Gewicht' } },
      { key: 'noise', label: { en: 'Noise', de: 'Geräusch' } },
    ],
    foot: {
      en: '– means the manufacturer gives no value. Area rates are maximum values under ideal conditions. The S55 Pro’s second figure is for sweeping and vacuuming; the K1 has a dust bin instead of water tanks. Runtime depends on the mode.',
      de: '– bedeutet: Der Hersteller nennt keinen Wert. Flächenleistungen sind Höchstwerte unter idealen Bedingungen. Der zweite Wert beim S55 Pro gilt für Kehren und Saugen, der K1 hat statt Wassertanks einen Staubbehälter. Die Laufzeit hängt von der Reinigungsart ab.',
    },
  },

  choose: {
    eyebrow: { en: 'Before you buy', de: 'Vor dem Kauf' },
    title: { en: 'How to choose the right cleaning robot', de: 'So finden Sie den passenden Reinigungsroboter' },
    items: [
      {
        title: { en: 'Area and time', de: 'Fläche und Zeit' },
        body: {
          en: 'Divide the daily floor area by the hours you have for cleaning. Compare that with the area rate, but stay well below the manufacturer’s maximum.',
          de: 'Teilen Sie die tägliche Fläche durch die Stunden, die für die Reinigung zur Verfügung stehen. Vergleichen Sie das mit der Flächenleistung, bleiben Sie aber deutlich unter dem Höchstwert des Herstellers.',
        },
      },
      {
        title: { en: 'Floor covering', de: 'Bodenbelag' },
        body: {
          en: 'Hard floors call for a scrubber-dryer such as the C5, M1 or SCL-AWG50. Carpet points to the K1. Mixed buildings often end up with one of each.',
          de: 'Hartböden sprechen für einen Scheuersaugroboter wie C5, M1 oder SCL-AWG50, Teppich für den K1. In gemischten Gebäuden landet man oft bei je einem Gerät.',
        },
      },
      {
        title: { en: 'Narrowest passage', de: 'Engster Durchgang' },
        body: {
          en: 'Measure the tightest point on the route. OrionStar gives 700 mm for the S55 Pro, SEER 900 mm aisles for the SCL-AWG50. For the other models, check the dimensions on the product page.',
          de: 'Messen Sie die engste Stelle der Route. OrionStar nennt für den S55 Pro 700 mm, SEER für den SCL-AWG50 Gänge ab 900 mm. Bei den anderen Modellen helfen die Maße auf der Produktseite.',
        },
      },
      {
        title: { en: 'Noise and opening hours', de: 'Geräusch und Betriebszeiten' },
        body: {
          en: 'If the robot runs while people are around, noise counts. The S55 Pro works at 55 dB, the C5 below 68 dB(A), the SCL-AWG50 below 70 dB(A) and the K1 below 75 dB(A).',
          de: 'Läuft der Roboter, während Menschen im Haus sind, zählt das Geräusch. Der S55 Pro arbeitet mit 55 dB, der C5 unter 68 dB(A), der SCL-AWG50 unter 70 dB(A) und der K1 unter 75 dB(A).',
        },
      },
      {
        title: { en: 'Water and charging', de: 'Wasser und Laden' },
        body: {
          en: 'Find out who refills and empties the tanks. The M1 uses a water station, the SCL-AWG50 handles water and charging itself, and the C5 cleans its own tanks.',
          de: 'Klären Sie, wer die Tanks füllt und leert. Der M1 nutzt eine Wasserstation, der SCL-AWG50 erledigt Wasser und Laden selbst, und der C5 reinigt seine Tanks automatisch.',
        },
      },
      {
        title: { en: 'Ramps, network and paperwork', de: 'Rampen, Netzwerk und Unterlagen' },
        body: {
          en: 'Check ramps (the M1 manages up to 8°, the SCL-AWG50 below 8°) and the network on site (Wi-Fi, 4G or Ethernet). For the SCL-AWG50, SEER lists no CE marking, which we clarify before an order.',
          de: 'Prüfen Sie Rampen (der M1 schafft bis 8°, der SCL-AWG50 unter 8°) und das Netz vor Ort (WLAN, 4G oder Ethernet). Für den SCL-AWG50 nennt SEER keine CE-Kennzeichnung, das klären wir vor einer Bestellung.',
        },
      },
    ],
  },

  faq: {
    eyebrow: { en: 'Questions', de: 'Fragen' },
    title: { en: 'Cleaning robots: frequent questions', de: 'Reinigungsroboter: häufige Fragen' },
    items: [
      {
        q: { en: 'How much does a cleaning robot cost?', de: 'Was kostet ein Reinigungsroboter?' },
        a: {
          en: 'It depends on the model and its equipment, for example whether a water station is part of the setup, and on how many units you need. That is why we give the price in a quote for your site. For the business case, compare it with the staff hours the robot takes over on open floors.',
          de: 'Das hängt von Modell und Ausstattung ab, etwa davon, ob eine Wasserstation dazugehört, und von der Zahl der Geräte. Deshalb nennen wir den Preis im Angebot für Ihren Einsatz. Für die Wirtschaftlichkeit lohnt der Vergleich mit den Personalstunden, die der Roboter auf freien Flächen übernimmt.',
        },
      },
      {
        q: { en: 'Which cleaning robot suits large areas?', de: 'Welcher Reinigungsroboter eignet sich für große Flächen?' },
        a: {
          en: 'The CleaniBot C5 has the highest area rate in our range at up to 1,980 m²/h and carries 45 L of clean and 45 L of waste water. The SEER SCL-AWG50 manages up to 1,800 m²/h in industrial halls, the CleaniBot M1 up to 1,200 m²/h. All three are maximum values, so plan below them.',
          de: 'Der CleaniBot C5 hat mit bis zu 1.980 m²/h die höchste Flächenleistung in unserem Programm und fasst je 45 L Frisch- und Schmutzwasser. Der SEER SCL-AWG50 schafft in Industriehallen bis zu 1.800 m²/h, der CleaniBot M1 bis zu 1.200 m²/h. Alle drei Werte sind Höchstwerte, planen Sie darunter.',
        },
      },
      {
        q: { en: 'What is a floor scrubber robot?', de: 'Was ist ein Scheuersaugroboter?' },
        a: {
          en: 'An autonomous scrubber-dryer: it scrubs hard floors with brushes and fresh water and picks the dirty water up again with a squeegee, in one pass. The OrionStar CleaniBot C5 and M1 work this way, as does the SEER SCL-AWG50.',
          de: 'Ein autonomer Scheuersaugautomat: Er schrubbt Hartböden mit Bürsten und Frischwasser und nimmt das Schmutzwasser im selben Durchgang mit einer Sauglippe wieder auf. So arbeiten der OrionStar CleaniBot C5 und M1 sowie der SEER SCL-AWG50.',
        },
      },
      {
        q: { en: 'Which cleaning robot suits hotels and offices?', de: 'Welcher Reinigungsroboter passt zu Hotels und Büros?' },
        a: {
          en: 'The CleaniBot S55 Pro is a good starting point. It sweeps, scrubs, vacuums, mops and disinfects in one cycle, runs at 55 dB and fits through 700 mm passages. For carpeted corridors and rooms, add the K1.',
          de: 'Der CleaniBot S55 Pro ist ein guter Ausgangspunkt. Er kehrt, schrubbt, saugt, wischt und desinfiziert in einem Durchgang, arbeitet mit 55 dB und passt durch 700 mm breite Durchgänge. Für Teppichflure und Zimmer kommt der K1 dazu.',
        },
      },
      {
        q: { en: 'Is there a commercial vacuum robot for carpet?', de: 'Gibt es einen Saugroboter fürs Gewerbe, der Teppich schafft?' },
        a: {
          en: 'Yes, the CleaniBot K1. It vacuums carpets and hard floors with 20 kPa of suction and a V-shaped roller brush that does not tangle with hair. It covers up to 700 m²/h with a 440 mm cleaning width and runs up to 8 hours per charge.',
          de: 'Ja, den CleaniBot K1. Er saugt Teppiche und Hartböden mit 20 kPa und einer V-förmigen Walzenbürste, an der sich keine Haare aufwickeln. Er schafft bis zu 700 m²/h bei 440 mm Reinigungsbreite und saugt bis zu 8 Stunden pro Ladung.',
        },
      },
      {
        q: { en: 'How long does a cleaning robot run on one charge?', de: 'Wie lange arbeitet ein Reinigungsroboter mit einer Akkuladung?' },
        a: {
          en: 'Wet cleaning has the shortest runtime: 3 h on the C5, 3.5 h on the M1 and 4.5 h on the S55 Pro, 2 to 4 h of mopping on the SCL-AWG50. Dry modes last longer, for example 8 h of vacuuming on the K1 or up to 28 h of dust mopping on the S55 Pro. Charging takes between 1 h (SCL-AWG50) and under 4 h (S55 Pro).',
          de: 'Bei der Nassreinigung ist die Laufzeit am kürzesten: 3 h beim C5, 3,5 h beim M1 und 4,5 h beim S55 Pro, 2 bis 4 h Wischen beim SCL-AWG50. Trockene Modi halten länger, etwa 8 h Saugen beim K1 oder bis zu 28 h Staubwischen beim S55 Pro. Das Laden dauert zwischen 1 h (SCL-AWG50) und unter 4 h (S55 Pro).',
        },
      },
      {
        q: { en: 'What are the advantages of autonomous floor cleaning?', de: 'Welche Vorteile hat autonome Bodenreinigung?' },
        a: {
          en: 'The floor is cleaned the same way every day, also at night or on weekends, and your staff can focus on the work a machine cannot do. Models with scheduling and reports, such as the CleaniBot M1, show what was cleaned and when. A robot does not replace the team, though: stairs, edges and heavy soiling stay manual work.',
          de: 'Der Boden wird jeden Tag gleich gereinigt, auch nachts oder am Wochenende, und Ihr Personal kümmert sich um das, was eine Maschine nicht kann. Modelle mit Zeitplan und Berichten wie der CleaniBot M1 zeigen, was wann gereinigt wurde. Das Team ersetzt ein Roboter aber nicht: Treppen, Kanten und starke Verschmutzung bleiben Handarbeit.',
        },
      },
      {
        q: { en: 'Can the SEER SCL-AWG50 be used in the EU?', de: 'Kann der SEER SCL-AWG50 in der EU eingesetzt werden?' },
        a: {
          en: 'SEER lists no CE marking for this model. Before an order we check with SEER whether and how it can be used in the EU and which documents are available. Until that is settled, the OrionStar scrubbers are the alternative for industrial halls.',
          de: 'SEER nennt für dieses Modell keine CE-Kennzeichnung. Vor einer Bestellung klären wir mit SEER, ob und wie er in der EU eingesetzt werden kann und welche Unterlagen es gibt. Bis das geklärt ist, sind die Scheuersaugroboter von OrionStar die Alternative für Industriehallen.',
        },
      },
    ],
  },

  related: [
    { href: '/solutions/cleaning-facility', label: { en: 'Cleaning and facility automation', de: 'Reinigung und Gebäudeautomatisierung' } },
    { href: '/products/categories/service-cleaning-facility-robots', label: { en: 'All service, cleaning and facility robots', de: 'Alle Service-, Reinigungs- und Facility-Roboter' } },
    { href: '/pages/service-robots', label: { en: 'Service robots', de: 'Serviceroboter' } },
    { href: '/pages/mobile-robots', label: { en: 'Mobile robots', de: 'Mobile Roboter' } },
    { href: '/manufacturers/orionstar', label: { en: 'All products from OrionStar', de: 'Alle Produkte von OrionStar' } },
    { href: '/manufacturers/seer-robotics', label: { en: 'All products from SEER Robotics', de: 'Alle Produkte von SEER Robotics' } },
  ],

  cta: {
    eyebrow: { en: 'Advice and quote', de: 'Beratung und Angebot' },
    title: { en: 'Tell us about your floors', de: 'Erzählen Sie uns von Ihren Flächen' },
    body: {
      en: 'Give us the floor area, the floor coverings, the narrowest passage and your cleaning hours. We come back with the models that fit and a quote.',
      de: 'Nennen Sie uns Fläche, Bodenbeläge, den engsten Durchgang und Ihre Reinigungszeiten. Wir melden uns mit passenden Modellen und einem Angebot.',
    },
    button: { en: 'Send an enquiry', de: 'Anfrage senden' },
    subject: { en: 'Cleaning robots', de: 'Reinigungsroboter' },
  },

  fine: [
    {
      en: 'Technical data are manufacturer information and may change. Area rates are maximum values; the binding data are those in the quote.',
      de: 'Technische Daten sind Herstellerangaben und können sich ändern. Flächenleistungen sind Höchstwerte, verbindlich sind die Angaben im Angebot.',
    },
    {
      en: 'S55 Pro noise (55 dB) and K1 suction (20 kPa) are from OrionStar’s product descriptions; the specification lists give no value for them. OrionStar gives no noise figure for the M1.',
      de: 'Geräusch des S55 Pro (55 dB) und Saugleistung des K1 (20 kPa) stammen aus den Produktbeschreibungen von OrionStar, die Datenblätter nennen dafür keinen Wert. Für den M1 nennt OrionStar keinen Geräuschwert.',
    },
    {
      en: 'SEER lists no CE marking for the SCL-AWG50. Use in the EU is clarified with SEER before any order.',
      de: 'SEER nennt für den SCL-AWG50 keine CE-Kennzeichnung. Der Einsatz in der EU wird vor jeder Bestellung mit SEER geklärt.',
    },
    {
      en: 'Images are product photos by the manufacturers. Product names and trademarks belong to their owners.',
      de: 'Bilder sind Produktfotos der Hersteller. Produktnamen und Marken gehören ihren Inhabern.',
    },
  ],
}
