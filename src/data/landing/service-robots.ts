// Content for the service robot buying page at /pages/service-robots (and /de/...).
//
// All figures come from the products' published Sanity entries (specifications,
// tagline, description, features, applications). A dash in the comparison means
// the manufacturer gives no value there. Cleaning robots have their own page
// (/pages/cleaning-robots) and are not listed here.
//
// Hera, Zeus 3 and Zeus 4 are Agile Robots' facility monitoring robots. In Sanity
// they are inspection and operation robots for electrical rooms, switchgear and
// substations, and the page describes them that way.
//
// Sanity gives no lift or door interface for any of these models, so the page
// does not claim one; the comparison shows navigation instead.

import { CDN, NONE, same, type LandingContent, type LandingModel } from './types'

const S = {
  trays: { en: 'Trays', de: 'Tabletts' },
  payload: { en: 'Payload', de: 'Traglast' },
  runtime: { en: 'Runtime', de: 'Laufzeit' },
  display: { en: 'Display', de: 'Display' },
  weight: { en: 'Weight', de: 'Gewicht' },
  speed: { en: 'Speed', de: 'Tempo' },
  navigation: { en: 'Navigation', de: 'Navigation' },
  compartment: { en: 'Compartment', de: 'Fach' },
  languages: { en: 'Languages', de: 'Sprachen' },
}

const FHD14: { en: string; de: string } = { en: '14-inch FHD', de: '14 Zoll, FHD' }

export const MODELS: LandingModel[] = [
  // Delivery and serving robots
  {
    slug: 'orionstar-luckibot-pro',
    name: same('OrionStar LuckiBot Pro'),
    type: { en: 'Serving robot, 3 or 4 trays', de: 'Servierroboter, 3 oder 4 Tabletts' },
    image: `${CDN}/8bc5a762a098b92b444f9b0557b604cbdeab8b4c-590x720.png`,
    fit: 'contain',
    blurb: {
      en: 'The larger serving robot from OrionStar. It navigates with visual SLAM, recognises obstacles in 3D over 240° and detects the dishes on each tray. The 14-inch display shows your own promotions while it drives.',
      de: 'Der größere Servierroboter von OrionStar. Er navigiert mit visuellem SLAM, erkennt Hindernisse in 3D über 240° und registriert die Teller auf jedem Tablett. Das 14-Zoll-Display zeigt während der Fahrt Ihre eigene Werbung.',
    },
    specs: [
      { label: S.trays, value: { en: '3 or 4, 500 × 420 mm', de: '3 oder 4, 500 × 420 mm' } },
      { label: S.payload, value: { en: '15 kg per tray, 60 kg total', de: '15 kg pro Tablett, 60 kg gesamt' } },
      { label: S.runtime, value: same('12 h') },
      { label: S.display, value: FHD14 },
    ],
    tags: ['hospitality', 'office', 'care'],
    row: {
      type: { en: 'Serving robot', de: 'Servierroboter' },
      trays: { en: '3 or 4 trays', de: '3 oder 4 Tabletts' },
      payload: { en: '15 kg per tray, 60 kg total', de: '15 kg pro Tablett, 60 kg gesamt' },
      runtime: same('12 h'),
      screen: FHD14,
      navigation: { en: 'Visual SLAM', de: 'Visuelles SLAM' },
      weight: same('59 kg'),
    },
  },
  {
    slug: 'orionstar-luckibot',
    name: same('OrionStar LuckiBot'),
    type: { en: 'Serving robot, 3 trays', de: 'Servierroboter, 3 Tabletts' },
    image: `${CDN}/ee9826f611c04f2a3c311b13664c42ccef65ff5d-588x720.png`,
    fit: 'contain',
    blurb: {
      en: 'An autonomous serving robot for restaurants, hotels and canteens. Three adjustable trays carry up to 40 kg, dual SLAM navigation finds the table, and several LuckiBots can share one floor.',
      de: 'Ein autonomer Servierroboter für Restaurants, Hotels und Kantinen. Drei verstellbare Tabletts tragen bis zu 40 kg, die Dual-SLAM-Navigation findet den Tisch, und mehrere LuckiBots teilen sich eine Fläche.',
    },
    specs: [
      { label: S.trays, value: { en: '3, adjustable', de: '3, verstellbar' } },
      { label: S.payload, value: { en: '10 kg per tray, 40 kg total', de: '10 kg pro Tablett, 40 kg gesamt' } },
      { label: S.runtime, value: same('10 h') },
      { label: S.weight, value: same('39 kg') },
    ],
    tags: ['hospitality'],
    row: {
      type: { en: 'Serving robot', de: 'Servierroboter' },
      trays: { en: '3 trays, adjustable', de: '3 Tabletts, verstellbar' },
      payload: { en: '10 kg per tray, 40 kg total', de: '10 kg pro Tablett, 40 kg gesamt' },
      runtime: same('10 h'),
      screen: { en: '10.1-inch touch', de: '10,1 Zoll, Touch' },
      navigation: same('Dual SLAM'),
      weight: same('39 kg'),
    },
  },
  {
    slug: 'orionstar-luckibot-pro-autodoor',
    name: same('OrionStar LuckiBot Pro Autodoor'),
    type: { en: 'Enclosed, lockable delivery robot', de: 'Geschlossener, abschließbarer Lieferroboter' },
    image: `${CDN}/3310f25f1d365a19bc008d5e5abf53c4dfdcb0d9-588x720.png`,
    fit: 'contain',
    blurb: {
      en: 'Delivers in a closed compartment behind a four-fold falcon-wing door with a password lock. Made for hotel room service and other deliveries where privacy and hygiene count. It finds its way with LiDAR and three RGBD cameras.',
      de: 'Liefert in einem geschlossenen Fach hinter einer vierteiligen Falcon-Wing-Tür mit Passwortschloss. Gemacht für den Zimmerservice im Hotel und andere Lieferungen, bei denen Diskretion und Hygiene zählen. Er orientiert sich mit LiDAR und drei RGBD-Kameras.',
    },
    specs: [
      { label: S.compartment, value: same('410 × 480 × 315 mm, 69 L') },
      { label: S.runtime, value: same('12 h') },
      { label: S.display, value: FHD14 },
      { label: S.speed, value: { en: '0.5–1.2 m/s', de: '0,5–1,2 m/s' } },
    ],
    tags: ['hospitality', 'industry'],
    row: {
      type: { en: 'Delivery robot, lockable', de: 'Lieferroboter, abschließbar' },
      trays: { en: 'Closed compartment, 69 L', de: 'Geschlossenes Fach, 69 L' },
      payload: { en: 'max. 20 kg*', de: 'max. 20 kg*' },
      runtime: same('12 h'),
      screen: FHD14,
      navigation: { en: 'LiDAR, 3 RGBD cameras', de: 'LiDAR, 3 RGBD-Kameras' },
      weight: NONE,
    },
  },
  {
    slug: 'orionstar-carrybot',
    name: same('OrionStar CarryBot'),
    type: { en: 'Transport robot up to 150 kg', de: 'Transportroboter bis 150 kg' },
    image: `${CDN}/3d04d9380193ba7cbf8faedc090422e88f44c954-588x720.png`,
    fit: 'contain',
    blurb: {
      en: 'For the heavier runs behind the scenes: CarryBot (D100) moves up to 150 kg in storage areas, micro-fulfilment and production. It navigates with VSLAM to 1 cm, takes interchangeable attachments and coordinates with other robots.',
      de: 'Für die schweren Fahrten hinter den Kulissen: Der CarryBot (D100) bewegt bis zu 150 kg in Lager, Micro-Fulfillment und Fertigung. Er navigiert per VSLAM auf 1 cm genau, nimmt wechselbare Aufbauten auf und stimmt sich mit anderen Robotern ab.',
    },
    specs: [
      { label: S.payload, value: same('150 kg') },
      { label: S.runtime, value: { en: '12 h with 100 kg', de: '12 h mit 100 kg' } },
      { label: { en: 'Positioning', de: 'Positionierung' }, value: same('1 cm') },
      { label: S.weight, value: same('48 kg') },
    ],
    tags: ['industry'],
    row: {
      type: { en: 'Transport robot', de: 'Transportroboter' },
      trays: { en: 'Interchangeable attachments', de: 'Wechselbare Aufbauten' },
      payload: same('150 kg'),
      runtime: { en: '12 h (100 kg load)', de: '12 h (100 kg Last)' },
      screen: NONE,
      navigation: same('VSLAM'),
      weight: same('48 kg'),
    },
  },

  // Reception and guide robots
  {
    slug: 'orionstar-greetingbot-nova',
    name: same('OrionStar GreetingBot Nova'),
    type: { en: 'Reception and tour robot with LLM', de: 'Empfangs- und Führungsroboter mit LLM' },
    image: `${CDN}/4c4cfcac0be67fece765364b7c20a17dae381482-588x720.png`,
    fit: 'contain',
    blurb: {
      en: 'OrionStar’s robot with a large language model. It welcomes visitors, gives guided tours and explains in natural conversation, in over 30 languages. Appearance and content can be adapted to your venue.',
      de: 'Der Roboter von OrionStar mit großem Sprachmodell. Er empfängt Besucher, führt durch Räume und erklärt im freien Gespräch, in über 30 Sprachen. Erscheinungsbild und Inhalte lassen sich an Ihr Haus anpassen.',
    },
    specs: [
      { label: S.languages, value: { en: '30+', de: 'über 30' } },
      { label: S.display, value: FHD14 },
      { label: S.runtime, value: same('12–14 h') },
      { label: S.weight, value: same('56 kg') },
    ],
    tags: ['hospitality', 'retail', 'office', 'care'],
    row: {
      type: { en: 'Reception and guide robot', de: 'Empfangs- und Führungsroboter' },
      trays: NONE,
      payload: NONE,
      runtime: same('12–14 h'),
      screen: FHD14,
      navigation: NONE,
      weight: same('56 kg'),
    },
  },
  {
    slug: 'orionstar-greetingbot-mini',
    name: same('OrionStar GreetingBot Mini'),
    type: { en: 'Compact reception and guide robot', de: 'Kompakter Empfangs- und Leitroboter' },
    image: `${CDN}/a41ac0cfa3620b08d21a3faf828a32b3d9947c3a-588x720.png`,
    fit: 'contain',
    blurb: {
      en: 'A smaller reception robot, 1 m tall, that greets visitors and leads them to where they want to go. It speaks over 30 languages, hears through a six-microphone array with 360° localisation and has a 13 MP camera for photos and video calls.',
      de: 'Ein kleinerer Empfangsroboter, 1 m hoch, der Besucher begrüßt und an ihr Ziel bringt. Er spricht über 30 Sprachen, hört über ein Array aus sechs Mikrofonen mit 360°-Ortung und hat eine 13-MP-Kamera für Fotos und Videoanrufe.',
    },
    specs: [
      { label: S.languages, value: { en: '30+', de: 'über 30' } },
      { label: S.display, value: { en: '14-inch, 1920 × 1080', de: '14 Zoll, 1920 × 1080' } },
      { label: S.runtime, value: same('12 h') },
      { label: S.weight, value: same('21 kg') },
    ],
    tags: ['hospitality', 'retail', 'care'],
    row: {
      type: { en: 'Reception and guide robot', de: 'Empfangs- und Leitroboter' },
      trays: NONE,
      payload: NONE,
      runtime: same('12 h'),
      screen: FHD14,
      navigation: NONE,
      weight: same('21 kg'),
    },
  },
  {
    slug: 'orionstar-greetingbot-ad',
    name: same('OrionStar GreetingBot AD'),
    type: { en: 'Retail greeter and mobile ad display', de: 'Begrüßungsroboter und mobile Werbefläche' },
    image: `${CDN}/8f28ff1d04c68ec75a5f893015deaeb1df1d8182-588x720.png`,
    fit: 'contain',
    blurb: {
      en: 'Built for shops, trade fairs and public areas. A 21.5-inch display carries your advertising, a 14-inch touchscreen and an AI sales assistant answer questions, and the robot walks customers through the store. It docks itself for charging.',
      de: 'Gebaut für Läden, Messen und öffentliche Bereiche. Ein 21,5-Zoll-Display zeigt Ihre Werbung, ein 14-Zoll-Touchscreen und ein KI-Verkaufsassistent beantworten Fragen, und der Roboter führt Kunden durch den Laden. Zum Laden dockt er selbst an.',
    },
    specs: [
      { label: { en: 'Ad display', de: 'Werbedisplay' }, value: { en: '21.5-inch FHD', de: '21,5 Zoll, FHD' } },
      { label: { en: 'Touchscreen', de: 'Touchscreen' }, value: FHD14 },
      { label: S.runtime, value: same('8–10 h') },
      { label: { en: 'Min. aisle width', de: 'Min. Gangbreite' }, value: same('60–65 cm') },
    ],
    tags: ['retail'],
    row: {
      type: { en: 'Greeter and ad robot', de: 'Begrüßungs- und Werberoboter' },
      trays: NONE,
      payload: NONE,
      runtime: same('8–10 h'),
      screen: { en: '21.5" ad + 14" touch', de: '21,5" Werbung + 14" Touch' },
      navigation: { en: 'LiDAR, cameras, IMU', de: 'LiDAR, Kameras, IMU' },
      weight: { en: '32.5 kg', de: '32,5 kg' },
    },
  },

  // Facility monitoring robots
  {
    slug: 'zeus-4',
    name: same('Zeus 4'),
    type: { en: 'Indoor inspection and operation robot', de: 'Inspektions- und Bedienroboter für innen' },
    image: `${CDN}/da07f074211891eca1ac921103df084b0b5d2178-1120x1160.jpg`,
    fit: 'cover',
    blurb: {
      en: 'Works around the clock in indoor power equipment for utilities, rail, petrochemicals and manufacturing. Zeus 4 reads instruments and equipment status, monitors temperature, noise, gas and partial discharge, and presses buttons, turns knobs and opens protective plates.',
      de: 'Arbeitet rund um die Uhr an elektrischen Innenanlagen in Energieversorgung, Bahntechnik, Petrochemie und Fertigung. Zeus 4 liest Messgeräte und Anlagenzustände ab, überwacht Temperatur, Geräusche, Gase und Teilentladungen und bedient Taster, Drehschalter und Schutzklappen.',
    },
    specs: [
      { label: S.navigation, value: { en: 'Laser SLAM, ±5 mm / ±0.5°', de: 'Laser-SLAM, ±5 mm / ±0,5°' } },
      { label: S.speed, value: { en: 'max. 1.2 m/s', de: 'max. 1,2 m/s' } },
      { label: S.runtime, value: { en: '6 h (customisable)', de: '6 h (anpassbar)' } },
      { label: { en: 'Connectivity', de: 'Verbindung' }, value: same('Wi-Fi / 5G') },
    ],
    tags: ['power', 'industry'],
    row: {
      type: { en: 'Inspection and operation robot', de: 'Inspektions- und Bedienroboter' },
      trays: NONE,
      payload: NONE,
      runtime: { en: '6 h (customisable)', de: '6 h (anpassbar)' },
      screen: NONE,
      navigation: { en: 'Laser SLAM, ±5 mm', de: 'Laser-SLAM, ±5 mm' },
      weight: NONE,
    },
  },
  {
    slug: 'hera',
    name: same('Hera'),
    type: { en: 'Rail-mounted inspection robot', de: 'Schienengeführter Inspektionsroboter' },
    image: `${CDN}/5318e8ceef9b5b1546439e539d980b62fc37deb3-1120x1160.jpg`,
    fit: 'cover',
    blurb: {
      en: 'Runs on a rail through distribution, switch and relay rooms. An AI edge engine reads meters, switch and disconnector positions and panel lights, spots damaged insulators, leaks, foreign objects and corrosion, and measures temperature with a thermal camera. Power and data come over the rail.',
      de: 'Fährt auf einer Schiene durch Verteiler-, Schalt- und Relaisräume. Eine KI-Edge-Engine liest Messgeräte, Schalter- und Trennerstellungen sowie Meldeleuchten ab, erkennt beschädigte Isolatoren, Leckagen, Fremdkörper und Korrosion und misst Temperaturen mit der Wärmebildkamera. Strom und Daten kommen über die Schiene.',
    },
    specs: [
      { label: { en: 'Zoom camera', de: 'Zoomkamera' }, value: { en: '25× optical', de: '25-fach optisch' } },
      { label: { en: 'Repeatability', de: 'Wiederholgenauigkeit' }, value: { en: '2 mm horiz., 1 mm vert.', de: '2 mm horiz., 1 mm vert.' } },
      { label: { en: 'Protection', de: 'Schutzart' }, value: same('IP42') },
      { label: S.weight, value: same('21 kg') },
    ],
    tags: ['power'],
    row: {
      type: { en: 'Rail-mounted inspection robot', de: 'Schienengeführter Inspektionsroboter' },
      trays: NONE,
      payload: NONE,
      runtime: NONE,
      screen: NONE,
      navigation: { en: 'Rail-guided', de: 'Schienengeführt' },
      weight: same('21 kg'),
    },
  },
  {
    slug: 'zeus-3',
    name: same('Zeus 3'),
    type: { en: 'Switchgear inspection and operation robot', de: 'Inspektions- und Schaltroboter für Schaltanlagen' },
    image: `${CDN}/61776b2d4f85636d8f5f9052a2b5455d7ee2554a-1120x1160.jpg`,
    fit: 'cover',
    blurb: {
      en: 'A mobile robot for high-voltage switchgear rooms. Staff assign inspection and switching jobs on the software platform; Zeus 3 checks the panels, trips switches and racks breakers in and out on its own, then reports back in real time with automatic reports.',
      de: 'Ein mobiler Roboter für Hochspannungs-Schaltanlagenräume. Das Personal vergibt Inspektions- und Schaltaufträge über die Softwareplattform. Zeus 3 prüft die Schaltfelder, löst Schalter aus, fährt Leistungsschalter selbstständig ein und aus und meldet die Ergebnisse in Echtzeit mit automatischen Berichten.',
    },
    specs: [
      { label: { en: 'Tasks', de: 'Aufgaben' }, value: { en: 'Inspection, switch tripping, breaker racking', de: 'Inspektion, Schalter auslösen, Leistungsschalter ein- und ausfahren' } },
      { label: { en: 'Control', de: 'Regelung' }, value: { en: 'Force control, visual servoing', de: 'Kraftregelung, visuelles Servoing' } },
      { label: { en: 'Environment', de: 'Umgebung' }, value: { en: 'High-voltage switchgear rooms', de: 'Hochspannungs-Schaltanlagen' } },
    ],
    tags: ['power'],
    row: {
      type: { en: 'Switchgear inspection and operation', de: 'Inspektion und Schalthandlungen' },
      trays: NONE,
      payload: NONE,
      runtime: NONE,
      screen: NONE,
      navigation: NONE,
      weight: NONE,
    },
  },
]

export const content: LandingContent = {
  meta: {
    title: {
      en: 'Service Robots for Hotels, Restaurants & Retail | MegaRobotics',
      de: 'Serviceroboter kaufen: Servier- & Empfangsroboter | MegaRobotics',
    },
    description: {
      en: 'Service robots compared: serving robots for restaurants, hotel delivery robots, reception and guide robots and facility monitoring robots, with real specs.',
      de: 'Serviceroboter im Vergleich: Servierroboter für die Gastronomie, Lieferroboter fürs Hotel, Empfangsroboter und Roboter zur Anlagenüberwachung, mit echten Daten.',
    },
    crumb: { en: 'Service robots', de: 'Serviceroboter' },
  },

  heroSlugs: ['orionstar-luckibot-pro-autodoor'],
  hero: { carousel: { en: 'Service robots in our range', de: 'Serviceroboter in unserem Programm' } },

  intro: {
    eyebrow: { en: 'Service robots', de: 'Serviceroboter' },
    title: {
      en: 'Buy service robots: serving, delivery and reception',
      de: 'Serviceroboter kaufen: Servieren, Liefern, Empfangen',
    },
    lead: {
      en: '{count} service robots from OrionStar and Agile Robots on one page: serving and delivery robots for restaurants and hotels, reception robots for shops and lobbies, and monitoring robots for electrical rooms.',
      de: '{count} Serviceroboter von OrionStar und Agile Robots auf einer Seite: Servier- und Lieferroboter für Gastronomie und Hotel, Empfangsroboter für Handel und Foyer sowie Überwachungsroboter für Elektroräume.',
    },
    body: {
      en: 'A service robot takes over the routine trips and simple questions so your staff have more time for guests. Start with the job: open trays for the restaurant, a lockable compartment for room service, a screen and voice for the entrance, or sensors for technical rooms.',
      de: 'Ein Serviceroboter übernimmt die Routinewege und einfachen Fragen, damit Ihr Personal mehr Zeit für die Gäste hat. Gehen Sie von der Aufgabe aus: offene Tabletts für das Restaurant, ein abschließbares Fach für den Zimmerservice, Bildschirm und Sprache für den Eingang oder Sensorik für Technikräume.',
    },
    jobs: [
      {
        icon: 'Utensils',
        title: { en: 'Serving in restaurants and canteens', de: 'Servieren in Restaurant und Kantine' },
        body: { en: 'Open trays, up to 60 kg per trip, table by table.', de: 'Offene Tabletts, bis 60 kg pro Fahrt, Tisch für Tisch.' },
        models: ['orionstar-luckibot', 'orionstar-luckibot-pro'],
      },
      {
        icon: 'Hotel',
        title: { en: 'Room service and closed deliveries', de: 'Zimmerservice und geschlossene Lieferung' },
        body: { en: 'A locked compartment for the hotel, 150 kg for the back of house.', de: 'Ein verschlossenes Fach fürs Hotel, 150 kg für den Hintergrund.' },
        models: ['orionstar-luckibot-pro-autodoor', 'orionstar-carrybot'],
      },
      {
        icon: 'ConciergeBell',
        title: { en: 'Reception, guidance and advertising', de: 'Empfang, Wegführung und Werbung' },
        body: { en: 'Greets visitors, answers in over 30 languages and walks ahead.', de: 'Begrüßt Besucher, antwortet in über 30 Sprachen und geht voraus.' },
        models: ['orionstar-greetingbot-nova', 'orionstar-greetingbot-mini', 'orionstar-greetingbot-ad'],
      },
      {
        icon: 'ScanSearch',
        title: { en: 'Monitoring electrical rooms', de: 'Überwachung von Elektroräumen' },
        body: { en: 'Reads meters, checks temperatures and operates switchgear.', de: 'Liest Messgeräte ab, prüft Temperaturen und bedient Schaltanlagen.' },
        models: ['zeus-4', 'hera', 'zeus-3'],
      },
    ],
  },

  facts: [
    { value: same('150 kg'), label: { en: 'max. payload (CarryBot)', de: 'max. Traglast (CarryBot)' } },
    { value: same('60 kg'), label: { en: 'on the trays of the LuckiBot Pro', de: 'auf den Tabletts des LuckiBot Pro' } },
    { value: same('6–14 h'), label: { en: 'runtime per charge, by model', de: 'Laufzeit pro Ladung, je nach Modell' } },
    { value: same('30+'), label: { en: 'languages (GreetingBot Mini and Nova)', de: 'Sprachen (GreetingBot Mini und Nova)' } },
    { value: { en: '21.5"', de: '21,5"' }, label: { en: 'ad display on the GreetingBot AD', de: 'Werbedisplay am GreetingBot AD' } },
    { value: same('24/7'), label: { en: 'inspection in power rooms (Hera, Zeus 4)', de: 'Inspektion in Elektroräumen (Hera, Zeus 4)' } },
  ],

  groups: [
    {
      id: 'delivery-serving-robots',
      nav: { en: 'Serving & delivery', de: 'Servieren & Liefern' },
      eyebrow: { en: 'OrionStar · serving and delivery', de: 'OrionStar · Servieren und Liefern' },
      title: {
        en: 'Serving robots and delivery robots for restaurants and hotels',
        de: 'Servierroboter und Lieferroboter für Gastronomie und Hotel',
      },
      lead: {
        en: 'The LuckiBot family carries food and drinks on open trays from the kitchen to the table. The Autodoor version closes its load behind a locked door, and the CarryBot handles heavy transport away from the guests.',
        de: 'Die LuckiBot-Familie bringt Speisen und Getränke auf offenen Tabletts von der Küche an den Tisch. Die Autodoor-Version verschließt ihre Ladung hinter einer Tür mit Schloss, der CarryBot übernimmt schwere Transporte abseits der Gäste.',
      },
      body: {
        en: 'In a restaurant, a serving robot does the walking between the pass and the table while your team takes orders and looks after guests. Staff load the trays, choose the table on the screen, and the robot drives there at an adjustable 0.5 to 1.2 m/s.',
        de: 'Im Restaurant übernimmt der Servierroboter die Wege zwischen Pass und Tisch, während Ihr Team Bestellungen aufnimmt und sich um die Gäste kümmert. Das Personal belädt die Tabletts, wählt am Bildschirm den Tisch, und der Roboter fährt mit einstellbaren 0,5 bis 1,2 m/s los.',
      },
      points: [
        { en: 'Up to 4 trays and 60 kg on the LuckiBot Pro', de: 'Bis zu 4 Tabletts und 60 kg beim LuckiBot Pro' },
        { en: 'Lockable 69 L compartment on the Autodoor', de: 'Abschließbares 69-L-Fach beim Autodoor' },
        { en: '10 to 12 h runtime, 4.5 h to recharge', de: '10 bis 12 h Laufzeit, 4,5 h Ladezeit' },
        { en: 'Several robots can share one floor', de: 'Mehrere Roboter teilen sich eine Fläche' },
      ],
      manufacturer: 'orionstar',
      feature: 'orionstar-luckibot-pro',
      models: ['orionstar-luckibot', 'orionstar-luckibot-pro-autodoor', 'orionstar-carrybot'],
    },
    {
      id: 'reception-guide-robots',
      nav: { en: 'Reception & guide', de: 'Empfang & Führung' },
      eyebrow: { en: 'OrionStar · reception and guidance', de: 'OrionStar · Empfang und Führung' },
      title: {
        en: 'Reception robots and guide robots for lobbies, shops and exhibitions',
        de: 'Empfangsroboter, Rezeptionsroboter und Werberoboter',
      },
      lead: {
        en: 'The GreetingBot models welcome visitors, answer questions and lead people to their destination. Nova talks through a large language model, Mini is the compact one, and AD adds a large screen for advertising.',
        de: 'Die GreetingBot-Modelle empfangen Besucher, beantworten Fragen und bringen Menschen an ihr Ziel. Nova spricht über ein großes Sprachmodell, Mini ist das kompakte Modell, und AD bringt einen großen Bildschirm für Werbung mit.',
      },
      body: {
        en: 'A reception robot works best where the same questions come up all day: where is the meeting room, which floor is the restaurant, what is on offer this week. Content, languages and routes are set up for your building before go-live.',
        de: 'Ein Empfangsroboter lohnt sich dort, wo den ganzen Tag dieselben Fragen kommen: Wo ist der Besprechungsraum, auf welcher Etage liegt das Restaurant, was ist diese Woche im Angebot? Inhalte, Sprachen und Wege werden vor dem Start auf Ihr Gebäude eingerichtet.',
      },
      points: [
        { en: 'Over 30 languages on Nova and Mini', de: 'Über 30 Sprachen bei Nova und Mini' },
        { en: '14-inch screen on every model', de: '14-Zoll-Bildschirm bei allen Modellen' },
        { en: 'Up to 14 h runtime (Nova)', de: 'Bis 14 h Laufzeit (Nova)' },
      ],
      manufacturer: 'orionstar',
      feature: 'orionstar-greetingbot-nova',
      models: ['orionstar-greetingbot-mini', 'orionstar-greetingbot-ad'],
    },
    {
      id: 'facility-monitoring-robots',
      nav: { en: 'Facility monitoring', de: 'Anlagenüberwachung' },
      eyebrow: { en: 'Agile Robots · facility monitoring', de: 'Agile Robots · Anlagenüberwachung' },
      title: {
        en: 'Facility monitoring robots for switchgear and power rooms',
        de: 'Roboter für die Anlagenüberwachung in Schalt- und Elektroräumen',
      },
      lead: {
        en: 'These robots work in the technical rooms that keep a building or plant running. Hera inspects from a rail, Zeus 3 and Zeus 4 drive through the room and can also operate switches and breakers.',
        de: 'Diese Roboter arbeiten in den Technikräumen, die ein Gebäude oder Werk am Laufen halten. Hera prüft von einer Schiene aus, Zeus 3 und Zeus 4 fahren durch den Raum und bedienen auch Schalter und Leistungsschalter.',
      },
      body: {
        en: 'Regular rounds in distribution rooms, relay rooms and substations take time, and switching in live areas carries risk. A monitoring robot runs the rounds on schedule, records readings and thermal images, and alerts your team when something is off.',
        de: 'Regelmäßige Rundgänge in Verteilerräumen, Relaisräumen und Umspannwerken kosten Zeit, und Schalthandlungen in spannungsführenden Bereichen bergen Risiken. Ein Überwachungsroboter fährt die Runden nach Plan, erfasst Messwerte und Wärmebilder und meldet Ihrem Team, wenn etwas nicht stimmt.',
      },
      manufacturer: 'agile-robots',
      feature: 'zeus-4',
      models: ['hera', 'zeus-3'],
    },
  ],

  explainer: {
    eyebrow: { en: 'Basics', de: 'Grundlagen' },
    title: { en: 'What service robots do and where they work', de: 'Was Serviceroboter leisten und wo sie arbeiten' },
    paragraphs: [
      {
        en: 'Service robots work where people are served or buildings are run: restaurants, hotels, shops, offices, exhibitions and care facilities. In our range they come in three kinds. Serving and delivery robots carry food, drinks and goods. Reception and guide robots greet visitors and show the way. Facility monitoring robots check technical rooms on their own.',
        de: 'Serviceroboter arbeiten dort, wo Menschen bedient oder Gebäude betrieben werden: in Restaurants, Hotels, Läden, Büros, auf Messen und in Pflegeeinrichtungen. In unserem Programm gibt es drei Arten. Servier- und Lieferroboter tragen Speisen, Getränke und Waren. Empfangs- und Führungsroboter begrüßen Besucher und zeigen den Weg. Roboter für die Anlagenüberwachung prüfen Technikräume selbstständig.',
      },
      {
        en: 'A serving robot for a restaurant works with open trays. The OrionStar LuckiBot carries up to 40 kg on three trays, the LuckiBot Pro up to 60 kg on three or four, and the Pro also detects the dishes on each tray. Both find their way with SLAM, a method that builds a map of the room and locates the robot in it.',
        de: 'Ein Servierroboter in der Gastronomie arbeitet mit offenen Tabletts. Der OrionStar LuckiBot trägt bis zu 40 kg auf drei Tabletts, der LuckiBot Pro bis zu 60 kg auf drei oder vier, und der Pro erkennt zusätzlich die Teller auf jedem Tablett. Beide orientieren sich per SLAM, einem Verfahren, das eine Karte des Raums erstellt und den Roboter darin verortet.',
      },
      {
        en: 'A hotel delivery robot needs a closed compartment. The LuckiBot Pro Autodoor locks its 69 L compartment with a password, so towels, room-service orders or small parcels reach the guest unseen. For heavier loads in storage and production areas, the CarryBot moves up to 150 kg.',
        de: 'Ein Lieferroboter im Hotel braucht ein geschlossenes Fach. Der LuckiBot Pro Autodoor sichert sein 69-L-Fach mit einem Passwort, sodass Handtücher, Zimmerservice oder kleine Pakete ungesehen beim Gast ankommen. Für schwerere Lasten in Lager und Fertigung bewegt der CarryBot bis zu 150 kg.',
      },
      {
        en: 'Reception robots stand at the entrance and answer questions. The GreetingBot Nova holds a conversation through a large language model in over 30 languages and leads guests to their destination. The GreetingBot Mini does the same in a smaller format. The GreetingBot AD adds a 21.5-inch screen and works as a mobile advertising robot in retail.',
        de: 'Empfangsroboter stehen am Eingang und beantworten Fragen. Der GreetingBot Nova führt über ein großes Sprachmodell Gespräche in über 30 Sprachen und begleitet Gäste an ihr Ziel. Der GreetingBot Mini macht das im kleineren Format. Der GreetingBot AD hat zusätzlich einen 21,5-Zoll-Bildschirm und arbeitet im Handel als mobiler Werberoboter.',
      },
      {
        en: 'Facility monitoring robots from Agile Robots work away from guests, in distribution rooms, switch rooms and substations. Hera reads meters and switch positions from a rail and measures temperatures with a thermal camera. Zeus 3 and Zeus 4 drive through the room and operate switches, buttons and breakers, so fewer people have to enter live areas.',
        de: 'Die Roboter für die Anlagenüberwachung von Agile Robots arbeiten abseits der Gäste, in Verteiler- und Schalträumen und in Umspannwerken. Hera liest von einer Schiene aus Messgeräte und Schalterstellungen ab und misst Temperaturen mit einer Wärmebildkamera. Zeus 3 und Zeus 4 fahren durch den Raum und bedienen Schalter, Taster und Leistungsschalter, sodass seltener Personal in spannungsführende Bereiche muss.',
      },
    ],
  },

  compare: {
    eyebrow: { en: 'Comparison', de: 'Vergleich' },
    title: { en: 'All service robots side by side', de: 'Alle Serviceroboter im Vergleich' },
    subtitle: {
      en: 'Choose where the robot will work and the table narrows down. Values are manufacturer data.',
      de: 'Wählen Sie den Einsatzort, dann wird die Tabelle kürzer. Alle Werte sind Herstellerangaben.',
    },
    filters: [
      { key: 'hospitality', label: { en: 'Restaurants & hotels', de: 'Gastronomie & Hotel' } },
      { key: 'retail', label: { en: 'Retail & exhibitions', de: 'Handel & Messen' } },
      { key: 'office', label: { en: 'Offices & public buildings', de: 'Büro & öffentliche Gebäude' } },
      { key: 'care', label: { en: 'Care facilities', de: 'Pflegeeinrichtungen' } },
      { key: 'industry', label: { en: 'Warehouse & industry', de: 'Lager & Industrie' } },
      { key: 'power', label: { en: 'Power rooms', de: 'Elektro- & Schalträume' } },
    ],
    cols: [
      { key: 'type', label: { en: 'Type', de: 'Typ' } },
      { key: 'trays', label: { en: 'Trays / compartment', de: 'Tabletts / Fach' } },
      { key: 'payload', label: { en: 'Payload', de: 'Traglast' } },
      { key: 'runtime', label: { en: 'Runtime', de: 'Laufzeit' } },
      { key: 'screen', label: { en: 'Screen', de: 'Bildschirm' } },
      { key: 'navigation', label: { en: 'Navigation', de: 'Navigation' } },
      { key: 'weight', label: { en: 'Weight', de: 'Gewicht' } },
    ],
    foot: {
      en: '– means the manufacturer gives no value. All values are manufacturer data. * OrionStar states the Autodoor payload as “max. 20 kg per tray”; the robot delivers in one closed compartment. Filters follow the applications the manufacturers name.',
      de: '– bedeutet: Der Hersteller nennt keinen Wert. Alle Werte sind Herstellerangaben. * OrionStar gibt die Traglast des Autodoor mit „max. 20 kg pro Tablett“ an; der Roboter liefert in einem geschlossenen Fach. Die Filter folgen den Einsatzbereichen, die die Hersteller nennen.',
    },
  },

  choose: {
    eyebrow: { en: 'Before you buy', de: 'Vor dem Kauf' },
    title: { en: 'How to choose the right service robot', de: 'So finden Sie den passenden Serviceroboter' },
    items: [
      {
        title: { en: 'Open or closed', de: 'Offen oder geschlossen' },
        body: {
          en: 'Plates and glasses travel best on open trays, as on the LuckiBot and LuckiBot Pro. Room service, linen or anything private belongs in a locked compartment like the Autodoor’s.',
          de: 'Teller und Gläser fahren am besten auf offenen Tabletts, wie bei LuckiBot und LuckiBot Pro. Zimmerservice, Wäsche oder Vertrauliches gehört in ein abschließbares Fach wie beim Autodoor.',
        },
      },
      {
        title: { en: 'Load per trip', de: 'Last pro Fahrt' },
        body: {
          en: 'Count what one trip has to carry. The LuckiBot takes 10 kg per tray, the Pro 15 kg. For crates and bulk goods in the back of house, the CarryBot carries up to 150 kg.',
          de: 'Rechnen Sie aus, was eine Fahrt tragen muss. Der LuckiBot nimmt 10 kg pro Tablett, der Pro 15 kg. Für Kisten und Ware im Hintergrund trägt der CarryBot bis zu 150 kg.',
        },
      },
      {
        title: { en: 'Aisles and routes', de: 'Gänge und Wege' },
        body: {
          en: 'Check the narrowest point on the route. OrionStar gives 60 to 65 cm as the minimum aisle width for the GreetingBot AD. For the other models we check your floor plan with the manufacturer.',
          de: 'Prüfen Sie die engste Stelle auf dem Weg. Für den GreetingBot AD nennt OrionStar 60 bis 65 cm als minimale Gangbreite. Für die anderen Modelle prüfen wir Ihren Grundriss mit dem Hersteller.',
        },
      },
      {
        title: { en: 'Runtime and charging', de: 'Laufzeit und Laden' },
        body: {
          en: 'The OrionStar robots run 8 to 14 hours per charge, and most recharge in about 4.5 hours. LuckiBot Pro, GreetingBot Nova and CarryBot can charge at an automatic dock, which suits long opening hours.',
          de: 'Die OrionStar-Roboter laufen 8 bis 14 Stunden pro Ladung, die meisten laden in rund 4,5 Stunden. LuckiBot Pro, GreetingBot Nova und CarryBot können an einer automatischen Station laden, was zu langen Öffnungszeiten passt.',
        },
      },
      {
        title: { en: 'Screen, voice and content', de: 'Bildschirm, Sprache und Inhalte' },
        body: {
          en: 'At the entrance, the screen and the voice matter most. Plan who writes the answers, the routes and the advertising, and in which languages. Nova and Mini handle over 30.',
          de: 'Am Eingang zählen Bildschirm und Sprache. Planen Sie, wer Antworten, Wege und Werbung pflegt und in welchen Sprachen. Nova und Mini beherrschen über 30.',
        },
      },
      {
        title: { en: 'Building and IT', de: 'Gebäude und IT' },
        body: {
          en: 'Lifts, doors, Wi-Fi and, for the Zeus models, the link to your control room decide how far a robot can go. We clarify these points with the manufacturer for your building before you order.',
          de: 'Aufzüge, Türen, WLAN und bei den Zeus-Modellen die Anbindung an Ihre Leitwarte entscheiden, wie weit ein Roboter kommt. Diese Punkte klären wir für Ihr Gebäude mit dem Hersteller, bevor Sie bestellen.',
        },
      },
    ],
  },

  faq: {
    eyebrow: { en: 'Questions', de: 'Fragen' },
    title: { en: 'Service robots: frequent questions', de: 'Serviceroboter: häufige Fragen' },
    items: [
      {
        q: { en: 'How much does a service robot cost?', de: 'Was kostet ein Serviceroboter?' },
        a: {
          en: 'The price depends on the model and its configuration, for example the number of trays, the charging dock or custom content. That is why we give it in a quote for your setup. Tell us the venue and the job, and we put the matching models side by side.',
          de: 'Der Preis hängt von Modell und Ausstattung ab, etwa von der Zahl der Tabletts, der Ladestation oder eigenen Inhalten. Deshalb nennen wir ihn im Angebot für Ihre Konfiguration. Nennen Sie uns Einsatzort und Aufgabe, dann stellen wir die passenden Modelle gegenüber.',
        },
      },
      {
        q: { en: 'What is the difference between a serving robot and a delivery robot?', de: 'Was unterscheidet einen Servierroboter von einem Lieferroboter?' },
        a: {
          en: 'A serving robot carries dishes on open trays to the table, like the OrionStar LuckiBot and LuckiBot Pro. A delivery robot closes its load away, as the LuckiBot Pro Autodoor does with its locked 69 L compartment. The CarryBot is a transport robot for heavier goods up to 150 kg.',
          de: 'Ein Servierroboter bringt Speisen auf offenen Tabletts an den Tisch, etwa der OrionStar LuckiBot und der LuckiBot Pro. Ein Lieferroboter verschließt seine Ladung, wie der LuckiBot Pro Autodoor mit seinem abschließbaren 69-L-Fach. Der CarryBot ist ein Transportroboter für schwerere Waren bis 150 kg.',
        },
      },
      {
        q: { en: 'How much can a serving robot in a restaurant carry?', de: 'Wie viel trägt ein Servierroboter in der Gastronomie?' },
        a: {
          en: 'The LuckiBot carries 10 kg per tray and 40 kg in total on three trays. The LuckiBot Pro takes 15 kg per tray and 60 kg in total on three or four trays measuring 500 × 420 mm. Both run at an adjustable 0.5 to 1.2 m/s.',
          de: 'Der LuckiBot trägt 10 kg pro Tablett und 40 kg insgesamt auf drei Tabletts. Der LuckiBot Pro nimmt 15 kg pro Tablett und 60 kg insgesamt auf drei oder vier Tabletts mit 500 × 420 mm. Beide fahren mit einstellbaren 0,5 bis 1,2 m/s.',
        },
      },
      {
        q: { en: 'Which delivery robot suits a hotel?', de: 'Welcher Lieferroboter eignet sich für das Hotel?' },
        a: {
          en: 'For room service, the LuckiBot Pro Autodoor. It delivers in a 69 L compartment behind a four-fold falcon-wing door with a password lock, so only the guest opens it. It runs 12 hours per charge and has a 14-inch screen for messages to the guest.',
          de: 'Für den Zimmerservice der LuckiBot Pro Autodoor. Er liefert in einem 69-L-Fach hinter einer vierteiligen Falcon-Wing-Tür mit Passwortschloss, sodass nur der Gast es öffnet. Er läuft 12 Stunden pro Ladung und hat einen 14-Zoll-Bildschirm für Hinweise an den Gast.',
        },
      },
      {
        q: { en: 'Can a delivery robot use lifts and doors?', de: 'Kann ein Lieferroboter Aufzug und Türen nutzen?' },
        a: {
          en: 'The manufacturer data on this page do not list a lift or door interface for any model. The Autodoor’s door is the door of its own compartment. Whether a robot can be connected to your lifts and automatic doors depends on the building, and we clarify it with OrionStar before you order.',
          de: 'Die Herstellerangaben auf dieser Seite nennen für keines der Modelle eine Aufzugs- oder Türanbindung. Die Tür des Autodoor ist die Tür seines eigenen Fachs. Ob sich ein Roboter mit Ihren Aufzügen und automatischen Türen verbinden lässt, hängt vom Gebäude ab, und wir klären es vor der Bestellung mit OrionStar.',
        },
      },
      {
        q: { en: 'What can a reception robot or guide robot do?', de: 'Was kann ein Empfangsroboter?' },
        a: {
          en: 'It greets visitors, answers questions and leads them to their destination. The GreetingBot Nova talks through a large language model in over 30 languages and also gives guided tours. The GreetingBot Mini is 1 m tall with a 14-inch screen and a six-microphone array, and the GreetingBot AD adds a 21.5-inch display for advertising in shops.',
          de: 'Er begrüßt Besucher, beantwortet Fragen und bringt sie an ihr Ziel. Der GreetingBot Nova spricht über ein großes Sprachmodell in über 30 Sprachen und übernimmt auch Führungen. Der GreetingBot Mini ist 1 m hoch, hat einen 14-Zoll-Bildschirm und sechs Mikrofone, und der GreetingBot AD hat zusätzlich ein 21,5-Zoll-Display für Werbung im Handel.',
        },
      },
      {
        q: { en: 'How long does a service robot run per charge?', de: 'Wie lange läuft ein Serviceroboter mit einer Akkuladung?' },
        a: {
          en: 'The LuckiBot runs 10 hours, the LuckiBot Pro and Autodoor 12 hours, the GreetingBot Mini 12 hours and the Nova 12 to 14 hours. The CarryBot runs 12 hours with a 100 kg load. Recharging takes about 4.5 hours on these models.',
          de: 'Der LuckiBot läuft 10 Stunden, LuckiBot Pro und Autodoor 12 Stunden, der GreetingBot Mini 12 Stunden und der Nova 12 bis 14 Stunden. Der CarryBot schafft 12 Stunden mit 100 kg Last. Das Laden dauert bei diesen Modellen rund 4,5 Stunden.',
        },
      },
      {
        q: { en: 'What does a facility monitoring robot do?', de: 'Was macht ein Roboter für die Anlagenüberwachung?' },
        a: {
          en: 'It runs inspection rounds in electrical rooms. Hera travels on a rail, reads meters and switch positions and takes thermal images. Zeus 3 trips switches and racks breakers in high-voltage switchgear rooms, and Zeus 4 monitors temperature, noise, gas and partial discharge around the clock, with laser SLAM navigation to ±5 mm.',
          de: 'Er fährt Inspektionsrunden in Elektroräumen. Hera fährt auf einer Schiene, liest Messgeräte und Schalterstellungen ab und nimmt Wärmebilder auf. Zeus 3 löst in Hochspannungs-Schaltanlagen Schalter aus und fährt Leistungsschalter ein und aus, Zeus 4 überwacht rund um die Uhr Temperatur, Geräusche, Gase und Teilentladungen und navigiert per Laser-SLAM auf ±5 mm.',
        },
      },
    ],
  },

  related: [
    { href: '/pages/cleaning-robots', label: { en: 'Cleaning robots', de: 'Reinigungsroboter' } },
    { href: '/pages/mobile-robots', label: { en: 'Mobile robots and AMRs', de: 'Mobile Roboter und AMR' } },
    { href: '/pages/humanoid-robots', label: { en: 'Humanoid robots', de: 'Humanoide Roboter' } },
    { href: '/products/categories/service-cleaning-facility-robots', label: { en: 'All service, cleaning and facility robots', de: 'Alle Service-, Reinigungs- und Facility-Roboter' } },
    { href: '/solutions/cleaning-facility', label: { en: 'Cleaning and facility automation', de: 'Reinigung und Gebäudeautomatisierung' } },
    { href: '/manufacturers/orionstar', label: { en: 'All products from OrionStar', de: 'Alle Produkte von OrionStar' } },
    { href: '/manufacturers/agile-robots', label: { en: 'All products from Agile Robots', de: 'Alle Produkte von Agile Robots' } },
  ],

  cta: {
    eyebrow: { en: 'Advice and quote', de: 'Beratung und Angebot' },
    title: { en: 'Tell us where your service robot will work', de: 'Sagen Sie uns, wo Ihr Serviceroboter arbeiten soll' },
    body: {
      en: 'Describe the venue, the routes and what the robot should carry or say. We come back with the models that fit and a quote.',
      de: 'Beschreiben Sie Einsatzort, Wege und was der Roboter tragen oder sagen soll. Wir melden uns mit passenden Modellen und einem Angebot.',
    },
    button: { en: 'Send an enquiry', de: 'Anfrage senden' },
    subject: { en: 'Service robots', de: 'Serviceroboter' },
  },

  fine: [
    {
      en: 'Technical data are manufacturer information and may change. The binding data are those in the quote.',
      de: 'Technische Daten sind Herstellerangaben und können sich ändern. Verbindlich sind die Angaben im Angebot.',
    },
    {
      en: 'LuckiBot Pro Autodoor: OrionStar states the payload as “max. 20 kg per tray”, although the robot delivers in one closed 69 L compartment. We confirm the load for your use with the manufacturer. No weight is published for this model.',
      de: 'LuckiBot Pro Autodoor: OrionStar gibt die Traglast mit „max. 20 kg pro Tablett“ an, obwohl der Roboter in einem geschlossenen 69-L-Fach liefert. Die Last für Ihren Einsatz bestätigen wir mit dem Hersteller. Ein Gewicht ist für dieses Modell nicht veröffentlicht.',
    },
    {
      en: 'Hera: the specifications give a repeatability of 2 mm horizontally and 1 mm vertically; the feature list mentions a positioning error of ≤ 1 mm. This page uses the specification values.',
      de: 'Hera: Die technischen Daten nennen eine Wiederholgenauigkeit von 2 mm horizontal und 1 mm vertikal, die Merkmalsliste einen Positionierfehler von ≤ 1 mm. Diese Seite verwendet die Werte aus den technischen Daten.',
    },
    {
      en: 'Images are photos and renderings by the manufacturers. Product names and trademarks belong to their owners.',
      de: 'Bilder sind Fotos und Visualisierungen der Hersteller. Produktnamen und Marken gehören ihren Inhabern.',
    },
  ],
}
