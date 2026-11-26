// Content for the quadruped buying page at /pages/quadruped-robots (and /de/...).
//
// Carries over the structure, keywords and facts of the Sanity page rewrite of
// 2026-11-25. Every figure comes from the products' published Sanity entries
// (specifications first, then tagline and description). A dash in the
// comparison means the manufacturer gives no value there.
//
// M-series images are renderings of the base configuration; M1 Pro and
// M1 Ultra share one rendering in Sanity. MagicLab images are manufacturer photos.

import { CDN, NONE, same, type L, type LandingContent, type LandingModel } from './types'

const S = {
  weight: { en: 'Weight', de: 'Gewicht' },
  payload: { en: 'Continuous payload', de: 'Dauernutzlast' },
  payloadWalk: { en: 'Payload while walking', de: 'Nutzlast beim Laufen' },
  payloadMove: { en: 'Payload on the move', de: 'Nutzlast in Fahrt' },
  dynPayload: { en: 'Dynamic payload', de: 'Dynamische Nutzlast' },
  effPayload: { en: 'Effective payload', de: 'Effektive Nutzlast' },
  speed: { en: 'Speed', de: 'Tempo' },
  runtime: { en: 'Runtime', de: 'Laufzeit' },
  range: { en: 'Range unloaded', de: 'Reichweite ohne Last' },
  stairs: { en: 'Stairs', de: 'Treppen' },
  obstacle: { en: 'Single obstacle', de: 'Einzelnes Hindernis' },
  climb: { en: 'Climbing height', de: 'Steighöhe' },
  ip: { en: 'Protection', de: 'Schutzart' },
  radio: { en: 'Radio range', de: 'Funkreichweite' },
  nav: { en: 'Navigation and mapping', de: 'Navigation und Kartierung' },
  follow: { en: 'Follow mode', de: 'Folgemodus' },
  cameras: { en: 'Cameras', de: 'Kameras' },
  compute: { en: 'Onboard compute', de: 'Rechenleistung' },
  perception: { en: 'Surround view', de: 'Rundumsicht' },
  lidar: { en: 'LiDAR', de: 'LiDAR' },
  dev: { en: 'Development', de: 'Entwicklung' },
  dims: { en: 'Dimensions standing', de: 'Maße stehend' },
  dof: { en: 'Degrees of freedom', de: 'Freiheitsgrade' },
  battery: { en: 'Battery', de: 'Akku' },
  torque: { en: 'Joint torque', de: 'Gelenkmoment' },
}

const LEGS: L = { en: 'Legs', de: 'Beine' }
const WHEEL_LEGS: L = { en: 'Wheel-legs', de: 'Rad-Beine' }

const M1_ROW = {
  drive: WHEEL_LEGS,
  weight: same('41 kg'),
  payload: { en: '30 kg (walking)', de: '30 kg (beim Laufen)' },
  speed: { en: '6 m/s, peaks 8 m/s', de: '6 m/s, Spitze 8 m/s' },
  runtime: { en: '5 h unloaded, 3.5 h at full load', de: '5 h ohne Last, 3,5 h mit voller Last' },
  ip: same('IP67'),
  climb: { en: 'Steps 25 cm, 45°', de: 'Stufen 25 cm, 45°' },
}

const MAGICDOG_W_ROW = {
  drive: WHEEL_LEGS,
  weight: { en: 'approx. 22.5 kg', de: 'ca. 22,5 kg' },
  payload: { en: 'up to 10 kg', de: 'bis 10 kg' },
  speed: same('≥ 3 m/s'),
  runtime: same('2–4 h'),
  ip: NONE,
  climb: same('≥ 60 cm, ≥ 40°'),
}

const MAGICDOG_ROW = {
  drive: LEGS,
  weight: { en: '15.8 kg (without battery)', de: '15,8 kg (ohne Akku)' },
  payload: { en: '5 kg (effective)', de: '5 kg (effektiv)' },
  speed: same('3 m/s'),
  runtime: NONE,
  ip: NONE,
  climb: same('15 cm'),
}

export const MODELS: LandingModel[] = [
  // Inspection and security
  {
    slug: 'm100',
    name: same('M100'),
    type: { en: 'Heavy-duty quadruped robot', de: 'Schwerlast-Laufroboter' },
    image: `${CDN}/ac9dd07d42712e2c0eb2f97bae7676a3bc281ef2-1162x1051.png`,
    fit: 'contain',
    blurb: {
      en: 'The heavy walker of the M series, for outdoor sites, tunnels and industrial plants. It carries 50 kg continuously, wades through 30 cm of water and runs on a 2,081 Wh battery that swaps quickly. A LiDAR and two wide-angle cameras are standard; the Pro package adds a Jetson Orin NX, 4G and SLAM mapping.',
      de: 'Der schwere Läufer der M-Serie, für Außengelände, Tunnel und Industrieanlagen. Er trägt dauerhaft 50 kg, watet durch 30 cm Wasser und läuft mit einem 2.081-Wh-Akku, der sich schnell wechseln lässt. LiDAR und zwei Weitwinkelkameras sind Standard, das Pro-Paket ergänzt Jetson Orin NX, 4G und SLAM-Kartierung.',
    },
    specs: [
      { label: S.weight, value: same('68 kg') },
      { label: S.payload, value: same('50 kg') },
      { label: S.runtime, value: { en: '5.5 h unloaded, 2.5 h at 50 kg', de: '5,5 h ohne Last, 2,5 h mit 50 kg' } },
      { label: S.ip, value: same('IP67') },
    ],
    tags: ['legs', 'outdoor', 'heavy'],
    row: {
      drive: LEGS,
      weight: same('68 kg'),
      payload: same('50 kg'),
      speed: { en: '3 m/s (5 m/s sprint)', de: '3 m/s (Sprint 5 m/s)' },
      runtime: { en: '5.5 h unloaded, 2.5 h at 50 kg', de: '5,5 h ohne Last, 2,5 h mit 50 kg' },
      ip: same('IP67'),
      climb: { en: 'Steps 20 cm, 45°', de: 'Stufen 20 cm, 45°' },
    },
  },
  {
    slug: 'm40',
    name: same('M40'),
    type: { en: 'Compact quadruped for inspection', de: 'Kompakter Laufroboter für die Inspektion' },
    image: `${CDN}/be06eb98e716cdfc9df4e99fbe6802fbc79e0acd-1048x862.png`,
    fit: 'contain',
    blurb: {
      en: 'Four legs, 36 kg and a top deck for whatever the inspection needs. The M40 walks where wheeled robots get stuck: stairs, grating, rubble and narrow service corridors. The Pro package adds two LiDARs, a second camera and a Jetson Orin NX for mapping and autonomous navigation.',
      de: 'Vier Beine, 36 kg und ein Oberdeck für alles, was die Inspektion braucht. Der M40 läuft dort, wo Radroboter hängen bleiben: auf Treppen, Gitterrosten, Schutt und in engen Versorgungsgängen. Das Pro-Paket ergänzt zwei LiDAR, eine zweite Kamera und einen Jetson Orin NX für Kartierung und autonome Navigation.',
    },
    specs: [
      { label: S.weight, value: same('36 kg') },
      { label: S.payload, value: { en: '30 kg on flat ground', de: '30 kg auf ebenem Boden' } },
      { label: S.stairs, value: { en: 'Steps up to 20 cm', de: 'Stufen bis 20 cm' } },
      { label: S.ip, value: same('IP66') },
    ],
    tags: ['legs', 'outdoor', 'heavy', 'navigation'],
    row: {
      drive: LEGS,
      weight: same('36 kg'),
      payload: same('30 kg'),
      speed: { en: 'up to 5 m/s', de: 'bis 5 m/s' },
      runtime: { en: '5.5 h* unloaded, 2.5 h at 30 kg', de: '5,5 h* ohne Last, 2,5 h mit 30 kg' },
      ip: same('IP66'),
      climb: { en: 'Steps 20 cm, 45°', de: 'Stufen 20 cm, 45°' },
    },
  },
  {
    slug: 'magicdog-y1',
    name: same('MagicDog Y1'),
    type: { en: 'Industrial quadruped robot', de: 'Industrie-Laufroboter' },
    image: `${CDN}/47ec53708507a423cfb97272e8a44405f61b2ef7-1920x1080.jpg`,
    fit: 'cover',
    blurb: {
      en: 'MagicLab’s industrial quadruped for inspection in sand, dust, rain and snow. IP67, a 2,400 Wh battery that swaps without a stop, and interfaces for a thermal imager, dual-light PTZ camera, gas sensor, acoustic imager and partial discharge sensor.',
      de: 'Der Industrie-Vierbeiner von MagicLab für die Inspektion bei Sand, Staub, Regen und Schnee. IP67, ein 2.400-Wh-Akku, der sich ohne Stillstand wechseln lässt, und Anschlüsse für Wärmebildkamera, Dual-Light-PTZ-Kamera, Gassensor, akustische Kamera und Teilentladungssensor.',
    },
    specs: [
      { label: S.weight, value: { en: '70 kg with battery', de: '70 kg mit Akku' } },
      { label: S.dynPayload, value: same('45 kg') },
      { label: S.runtime, value: same('4–6 h') },
      { label: S.ip, value: same('IP67') },
    ],
    tags: ['legs', 'outdoor', 'heavy'],
    row: {
      drive: LEGS,
      weight: same('70 kg'),
      payload: { en: '45 kg (dynamic)', de: '45 kg (dynamisch)' },
      speed: same('6 m/s'),
      runtime: { en: '4–6 h, > 4 h at 20 kg', de: '4–6 h, > 4 h mit 20 kg' },
      ip: same('IP67'),
      climb: same('≥ 60 cm, ≥ 45°'),
    },
  },
  {
    slug: 'magicdog-t1',
    name: same('MagicDog T1'),
    type: { en: 'Lightweight industrial quadruped', de: 'Leichter Industrie-Vierbeiner' },
    image: `${CDN}/1516b6816f7fed86664c7cab106279ce06880b83-1360x1008.jpg`,
    fit: 'cover',
    blurb: {
      en: 'Built to be carried and deployed by one person: folded it measures 568 × 356 × 256 mm. A 16-channel LiDAR plus RGB and RGB-D cameras handle autonomous navigation and obstacle avoidance. Open interfaces for your own payloads and software.',
      de: 'Gebaut für Transport und Einsatz durch eine Person: Zusammengefaltet misst er 568 × 356 × 256 mm. Ein 16-Kanal-LiDAR sowie RGB- und RGB-D-Kameras übernehmen autonome Navigation und Hindernisvermeidung. Offene Schnittstellen für eigene Nutzlasten und Software.',
    },
    specs: [
      { label: S.weight, value: { en: 'approx. 19 kg', de: 'ca. 19 kg' } },
      { label: S.payload, value: { en: 'approx. 15 kg', de: 'ca. 15 kg' } },
      { label: S.runtime, value: { en: 'up to 6 h unloaded', de: 'bis 6 h ohne Last' } },
      { label: S.ip, value: same('IP54') },
    ],
    tags: ['legs', 'navigation'],
    row: {
      drive: LEGS,
      weight: { en: 'approx. 19 kg', de: 'ca. 19 kg' },
      payload: { en: 'approx. 15 kg', de: 'ca. 15 kg' },
      speed: { en: '5 m/s (restricted release)', de: '5 m/s (eingeschränkte Freigabe)' },
      runtime: { en: '6 h unloaded, 4 h at 10 kg', de: '6 h ohne Last, 4 h mit 10 kg' },
      ip: same('IP54'),
      climb: { en: 'Steps 18 cm, 30° (max. 40°)', de: 'Stufen 18 cm, 30° (max. 40°)' },
    },
  },

  // Wheel-legged robots
  {
    slug: 'm100ws',
    name: same('M100WS'),
    type: { en: 'Wheel-legged heavy-load carrier', de: 'Rad-Bein-Träger für schwere Lasten' },
    image: `${CDN}/b1e3d4ff745bedcf98522d7ce4538c89732be01e-1640x1500.png`,
    fit: 'contain',
    blurb: {
      en: 'Wheels where the ground allows, legs where it does not. The M100WS carries 100 kg continuously while moving and covers up to 35 km unloaded. The robot is the carrier: sensors, lights or equipment go on the top deck with 12 M8 mounting points and are chosen for each project.',
      de: 'Räder, wo der Boden es zulässt, Beine, wo nicht. Der M100WS trägt in Fahrt dauerhaft 100 kg und schafft ohne Last bis zu 35 km. Der Roboter ist der Träger: Sensorik, Licht oder Ausrüstung sitzen auf dem Oberdeck mit 12 M8-Befestigungspunkten und werden je Projekt ausgewählt.',
    },
    specs: [
      { label: S.weight, value: same('79 kg') },
      { label: S.payloadMove, value: same('100 kg') },
      { label: S.range, value: { en: '7.5 h / 35 km', de: '7,5 h / 35 km' } },
      { label: S.ip, value: same('IP67') },
    ],
    tags: ['wheels', 'outdoor', 'heavy'],
    row: {
      drive: WHEEL_LEGS,
      weight: same('79 kg'),
      payload: { en: '100 kg (on the move)', de: '100 kg (in Fahrt)' },
      speed: same('0–3 m/s'),
      runtime: { en: '7.5 h unloaded, 5.5 h at 50 kg', de: '7,5 h ohne Last, 5,5 h mit 50 kg' },
      ip: same('IP67'),
      climb: { en: 'Step height 30 cm, 45°', de: 'Stufenhöhe 30 cm, 45°' },
    },
  },
  {
    slug: 'm100w',
    name: same('M100W'),
    type: { en: 'Heavy-duty wheel-legged robot', de: 'Schwerlast-Rad-Bein-Roboter' },
    image: `${CDN}/3599ad8632cba34cba26ac8d29033ffea2d7f107-1138x1048.png`,
    fit: 'contain',
    blurb: {
      en: 'The M100 on 200 mm wheels. It rolls efficiently over long distances and gets more out of the same 2,081 Wh battery than the walking model, while still stepping over single obstacles up to 40 cm. For outdoor sites, campuses and large plants.',
      de: 'Der M100 auf 200-mm-Rädern. Er rollt sparsam über lange Strecken und holt aus demselben 2.081-Wh-Akku mehr heraus als das Laufmodell, steigt aber weiterhin über einzelne Hindernisse bis 40 cm. Für Außengelände, Werksgelände und große Anlagen.',
    },
    specs: [
      { label: S.weight, value: same('79 kg') },
      { label: S.payload, value: same('50 kg') },
      { label: S.range, value: { en: '6 h / about 25 km', de: '6 h / rund 25 km' } },
      { label: S.obstacle, value: same('40 cm') },
    ],
    tags: ['wheels', 'outdoor', 'heavy'],
    row: {
      drive: WHEEL_LEGS,
      weight: same('79 kg'),
      payload: same('50 kg'),
      speed: { en: '3 m/s (5 m/s sprint)', de: '3 m/s (Sprint 5 m/s)' },
      runtime: { en: '6 h unloaded, 3.5 h at 50 kg', de: '6 h ohne Last, 3,5 h mit 50 kg' },
      ip: same('IP67'),
      climb: { en: 'Steps 20 cm, 45°', de: 'Stufen 20 cm, 45°' },
    },
  },
  {
    slug: 'm40w',
    name: same('M40W'),
    type: { en: 'Fast wheel-legged patrol robot', de: 'Schneller Rad-Bein-Streifenroboter' },
    image: `${CDN}/0a58d94c196edd7f27e9e47b257450d852775f19-1008x962.png`,
    fit: 'contain',
    blurb: {
      en: 'Driven wheels at the ends of its legs: on open ground it rolls at up to 5 m/s, on rough routes it steps over 30 cm obstacles. For long patrols on large sites and remote-controlled reconnaissance in places people should not enter first.',
      de: 'Angetriebene Räder an den Beinenden: Auf freier Fläche rollt er mit bis zu 5 m/s, auf rauen Wegen steigt er über Hindernisse bis 30 cm. Für lange Streifen auf großen Geländen und ferngesteuerte Erkundung an Orten, die Menschen nicht als Erste betreten sollten.',
    },
    specs: [
      { label: S.weight, value: { en: '43.5 kg', de: '43,5 kg' } },
      { label: S.payload, value: same('30 kg') },
      { label: S.speed, value: { en: 'up to 5 m/s on wheels', de: 'bis 5 m/s auf Rädern' } },
      { label: S.radio, value: { en: 'up to 500 m', de: 'bis 500 m' } },
    ],
    tags: ['wheels', 'outdoor', 'heavy'],
    row: {
      drive: WHEEL_LEGS,
      weight: { en: '43.5 kg', de: '43,5 kg' },
      payload: same('30 kg'),
      speed: { en: 'up to 5 m/s', de: 'bis 5 m/s' },
      runtime: { en: 'up to 6 h unloaded', de: 'bis 6 h ohne Last' },
      ip: same('IP66'),
      climb: { en: 'Obstacles 30 cm, 45°', de: 'Hindernisse 30 cm, 45°' },
    },
  },
  {
    slug: 'm40ws',
    name: same('M40WS'),
    type: { en: 'Wheel-legged robot for tight spaces', de: 'Rad-Bein-Roboter für enge Räume' },
    image: `${CDN}/513e3bc6f7edf7d82e95c2b9b9b5752a72c66f90-1083x920.png`,
    fit: 'contain',
    blurb: {
      en: 'Wheels and legs in a compact, folding leg design. It drives forwards and backwards without turning, which helps in narrow aisles, and with 40 kg it carries the most in the M40 series. The Pro package adds two LiDARs and a Jetson Orin NX for autonomous navigation.',
      de: 'Räder und Beine in kompakter, einklappbarer Bauform. Er fährt vorwärts und rückwärts, ohne zu wenden, was in engen Gängen hilft, und trägt mit 40 kg am meisten in der M40-Serie. Das Pro-Paket ergänzt zwei LiDAR und einen Jetson Orin NX für autonome Navigation.',
    },
    specs: [
      { label: S.weight, value: same('42 kg') },
      { label: S.payload, value: { en: '40 kg on flat ground', de: '40 kg auf ebenem Boden' } },
      { label: S.range, value: { en: '6 h / about 25 km', de: '6 h / rund 25 km' } },
      { label: S.ip, value: same('IP66') },
    ],
    tags: ['wheels', 'outdoor', 'heavy', 'navigation'],
    row: {
      drive: WHEEL_LEGS,
      weight: same('42 kg'),
      payload: same('40 kg'),
      speed: { en: 'up to 5 m/s', de: 'bis 5 m/s' },
      runtime: { en: '6 h unloaded, 3 h at 30 kg', de: '6 h ohne Last, 3 h mit 30 kg' },
      ip: same('IP66'),
      climb: { en: 'Steps 20 cm, 45°', de: 'Stufen 20 cm, 45°' },
    },
  },
  {
    slug: 'm1',
    name: same('M1'),
    type: { en: 'Wheel-legged quadruped', de: 'Rad-Bein-Vierbeiner' },
    image: `${CDN}/b77f658571e745f6460eb161405484f78e9720a4-652x545.png`,
    fit: 'contain',
    blurb: {
      en: 'Twelve joint motors for walking and four hub motors in the feet. The M1 rolls fast on the flat and walks up steps, kerbs and rough ground. Two 3D LiDARs, a depth camera and RTK are standard; navigation is available as an option.',
      de: 'Zwölf Gelenkmotoren zum Laufen und vier Nabenmotoren in den Füßen. Der M1 rollt schnell auf ebener Fläche und läuft über Stufen, Bordsteine und unebenes Gelände. Zwei 3D-LiDAR, Tiefenkamera und RTK sind Standard, die Navigation gibt es als Option.',
    },
    specs: [
      { label: S.weight, value: same('41 kg') },
      { label: S.payloadWalk, value: same('30 kg') },
      { label: S.speed, value: { en: '6 m/s, peaks of 8 m/s', de: '6 m/s, in der Spitze 8 m/s' } },
      { label: S.stairs, value: { en: 'Steps up to 25 cm', de: 'Stufen bis 25 cm' } },
    ],
    tags: ['wheels', 'outdoor', 'heavy', 'navigation'],
    row: M1_ROW,
  },
  {
    slug: 'm1-pro',
    name: same('M1 Pro'),
    type: { en: 'M1 with autonomy built in', de: 'M1 mit Autonomie ab Werk' },
    image: `${CDN}/d28948390f9d22967e998fbdde44a58267ce4128-579x471.png`,
    fit: 'contain',
    blurb: {
      en: 'The M1 ready for autonomous work out of the box. It runs planned inspection and patrol routes on its own, follows a person or vehicle and has a voice intercom with broadcast for talking to people on site.',
      de: 'Der M1, fertig für autonome Einsätze. Er läuft geplante Inspektions- und Streifenrouten selbstständig ab, folgt einer Person oder einem Fahrzeug und hat eine Sprechanlage mit Durchsagefunktion für Gespräche vor Ort.',
    },
    specs: [
      { label: S.nav, value: { en: 'Standard', de: 'Serienmäßig' } },
      { label: S.follow, value: { en: 'UWB, LiDAR and vision', de: 'UWB, LiDAR und Kamera' } },
      { label: S.payloadWalk, value: same('30 kg') },
      { label: S.ip, value: same('IP67') },
    ],
    tags: ['wheels', 'outdoor', 'heavy', 'navigation'],
    row: M1_ROW,
  },
  {
    slug: 'm1-ultra',
    name: same('M1 Ultra'),
    type: { en: 'Top model with 720° perception', de: 'Spitzenmodell mit 720°-Wahrnehmung' },
    image: `${CDN}/d28948390f9d22967e998fbdde44a58267ce4128-579x471.png`,
    fit: 'contain',
    blurb: {
      en: 'For sites where the robot has to see everything around it. Four fisheye and two stereo cameras give 720° surround perception, and 128 TOPS run perception and autonomy on board. Everything from the M1 Pro is included.',
      de: 'Für Einsätze, bei denen der Roboter sein ganzes Umfeld im Blick haben muss. Vier Fischaugen- und zwei Stereokameras liefern 720°-Rundumwahrnehmung, 128 TOPS rechnen Wahrnehmung und Autonomie an Bord. Alles aus dem M1 Pro ist enthalten.',
    },
    specs: [
      { label: S.cameras, value: same('4 × 3 MP fisheye + 2 × 2 MP stereo') },
      { label: S.compute, value: same('128 TOPS') },
      { label: S.perception, value: { en: '720°, standard', de: '720°, serienmäßig' } },
      { label: S.ip, value: same('IP67') },
    ],
    tags: ['wheels', 'outdoor', 'heavy', 'navigation'],
    row: M1_ROW,
  },
  {
    slug: 'magicdog-w-standard',
    name: same('MagicDog-W Standard'),
    type: { en: 'Wheeled quadruped robot', de: 'Vierbeiner auf Rädern' },
    image: `${CDN}/ba6b030f913328fc529b311ecce675a519564d73-1920x1080.jpg`,
    fit: 'cover',
    blurb: {
      en: 'Legs with 7-inch pneumatic tyres for quick moves across mixed ground. Seventeen motors, one of them for the head, and an emotion engine for interaction by voice, vision and touch.',
      de: 'Beine mit 7-Zoll-Luftreifen für flinke Fahrt über wechselnden Untergrund. Siebzehn Motoren, einer davon für den Kopf, und eine Emotions-Engine für Interaktion über Sprache, Bild und Berührung.',
    },
    specs: [
      { label: S.weight, value: { en: 'approx. 22.5 kg', de: 'ca. 22,5 kg' } },
      { label: { en: 'Payload', de: 'Nutzlast' }, value: { en: 'up to 10 kg', de: 'bis 10 kg' } },
      { label: S.speed, value: same('≥ 3 m/s') },
      { label: S.runtime, value: same('2–4 h') },
    ],
    tags: ['wheels'],
    row: MAGICDOG_W_ROW,
  },
  {
    slug: 'magicdog-w-laser',
    name: same('MagicDog-W Laser'),
    type: { en: 'Wheeled quadruped with LiDAR', de: 'Vierbeiner auf Rädern mit LiDAR' },
    image: `${CDN}/bdcda683d3169996628350f86d61c5cc43984a07-1920x1080.jpg`,
    fit: 'cover',
    blurb: {
      en: 'The MagicDog-W with laser scanning for mapping, localisation and autonomous navigation. For patrol, survey and inspection work where the robot builds and follows a map instead of being driven by hand.',
      de: 'Der MagicDog-W mit Laserabtastung für Kartierung, Lokalisierung und autonome Navigation. Für Streifen, Vermessung und Inspektion, bei denen der Roboter eine Karte aufbaut und ihr folgt, statt von Hand gesteuert zu werden.',
    },
    specs: [
      { label: S.lidar, value: { en: 'Mapping and navigation', de: 'Kartierung und Navigation' } },
      { label: { en: 'Payload', de: 'Nutzlast' }, value: { en: 'up to 10 kg', de: 'bis 10 kg' } },
      { label: S.speed, value: same('≥ 3 m/s') },
      { label: S.climb, value: same('≥ 60 cm') },
    ],
    tags: ['wheels', 'navigation'],
    row: MAGICDOG_W_ROW,
  },

  // Teaching, research and events
  {
    slug: 'magicdog-pro',
    name: same('MagicDog Pro'),
    type: { en: 'Interactive robot dog', de: 'Interaktiver Roboterhund' },
    image: `${CDN}/7ccf735f1bbbf2692c157e1e0e8249c3e4bb4c6a-3840x2160.jpg`,
    fit: 'cover',
    blurb: {
      en: 'A compact robot dog that responds to voice, vision and touch, with LED lighting, an HD display and a motion library. It slows down when people come close and has collision protection, which suits demonstrations and public venues.',
      de: 'Ein kompakter Roboterhund, der auf Sprache, Bild und Berührung reagiert, mit LED-Beleuchtung, HD-Display und Bewegungsbibliothek. Er bremst, wenn Menschen nahe kommen, und hat einen Kollisionsschutz. Das passt zu Vorführungen und Besucherbetrieb.',
    },
    specs: [
      { label: S.weight, value: { en: '15.8 kg without battery', de: '15,8 kg ohne Akku' } },
      { label: S.effPayload, value: same('5 kg') },
      { label: S.speed, value: same('3 m/s') },
      { label: S.climb, value: same('15 cm') },
    ],
    tags: ['legs', 'teaching'],
    row: MAGICDOG_ROW,
  },
  {
    slug: 'magicdog-edu',
    name: same('MagicDog Edu'),
    type: { en: 'Robot dog for teaching and labs', de: 'Roboterhund für Lehre und Labor' },
    image: `${CDN}/0091912883d43cd996b146a8812e6ef4d03a3aa6-1920x1080.jpg`,
    fit: 'cover',
    blurb: {
      en: 'MagicDog in the education configuration, supplied for your own development. Open SDK, graphical programming, sensor interfaces and sample projects for university courses, lab work and student projects.',
      de: 'MagicDog in der Bildungskonfiguration, ausgeliefert für die eigene Entwicklung. Offenes SDK, grafische Programmierung, Sensorschnittstellen und Beispielprojekte für Hochschulkurse, Laborarbeit und studentische Projekte.',
    },
    specs: [
      { label: S.dev, value: { en: 'SDK, graphical programming', de: 'SDK, grafische Programmierung' } },
      { label: S.effPayload, value: same('5 kg') },
      { label: S.speed, value: same('3 m/s') },
      { label: S.weight, value: { en: '15.8 kg without battery', de: '15,8 kg ohne Akku' } },
    ],
    tags: ['legs', 'teaching'],
    row: MAGICDOG_ROW,
  },
  {
    slug: 'magic-panda',
    name: same('Magic Panda'),
    type: { en: 'Walking panda, limited edition', de: 'Laufender Panda, limitierte Edition' },
    image: `${CDN}/81430d4559d75056f9a2771fcf869447e24a1e01-1409x1485.jpg`,
    fit: 'cover',
    blurb: {
      en: 'MagicLab’s bionic panda: a walking quadruped in a soft black-and-white coat, with patrol mode and motion stunts. For brand activations, museums, visitor attractions and STEM outreach. Each unit comes with a numbered coin and certificate; availability is confirmed per request.',
      de: 'Der bionische Panda von MagicLab: ein laufender Vierbeiner mit weichem schwarz-weißem Fell, Patrouillenmodus und Bewegungsstunts. Für Markenaktionen, Museen, Besucherattraktionen und MINT-Vermittlung. Jedes Exemplar kommt mit nummerierter Münze und Zertifikat, die Verfügbarkeit bestätigen wir je Anfrage.',
    },
    specs: [
      { label: S.dims, value: same('110 × 65 × 46 cm') },
      { label: S.dof, value: same('12') },
      { label: S.battery, value: { en: '240.7 Wh, quick-release', de: '240,7 Wh, Schnellwechsel' } },
      { label: S.torque, value: { en: 'approx. 37.5 N·m', de: 'ca. 37,5 N·m' } },
    ],
    tags: ['legs', 'teaching'],
    row: {
      drive: LEGS,
      weight: NONE,
      payload: NONE,
      speed: NONE,
      runtime: NONE,
      ip: NONE,
      climb: NONE,
    },
  },
]

export const content: LandingContent = {
  meta: {
    title: {
      en: 'Buy Quadruped Robots: Industrial Robot Dogs | MegaRobotics',
      de: 'Laufroboter kaufen: Roboterhunde für die Industrie | MegaRobotics',
    },
    description: {
      en: 'Compare quadruped robots and robot dogs for inspection, security and research: legged and wheel-legged models, up to 100 kg payload and up to IP67.',
      de: 'Laufroboter und Roboterhunde im Vergleich: Vierbeiner und Rad-Bein-Roboter für Inspektion, Sicherheit und Forschung, bis 100 kg Nutzlast und bis IP67.',
    },
    crumb: { en: 'Quadruped robots', de: 'Laufroboter' },
  },

  heroSlugs: ['m100ws'],
  hero: { carousel: { en: 'Quadruped and wheel-legged robots', de: 'Laufroboter und Rad-Bein-Roboter' } },

  intro: {
    eyebrow: { en: 'Quadrupeds · robot dogs · wheel-legged robots', de: 'Vierbeiner · Roboterhunde · Rad-Bein-Roboter' },
    title: { en: 'Buy quadruped robots and robot dogs', de: 'Laufroboter und Roboterhunde kaufen' },
    lead: {
      en: '{count} four-legged and wheel-legged robots from MegaRobotics and MagicLab for inspection, security, research and events.',
      de: '{count} Vierbeiner- und Rad-Bein-Roboter von MegaRobotics und MagicLab für Inspektion, Sicherheit, Forschung und Events.',
    },
    body: {
      en: 'Quadruped robots walk on four legs to places wheels can’t reach: over stairs, grating, gravel and thresholds. Most people call them robot dogs; data sheets say quadruped or legged robot. Our range runs from a robot dog for teaching and research to a wheel-legged platform that carries 100 kg on the move.',
      de: 'Laufroboter gehen auf vier Beinen dorthin, wo Räder nicht weiterkommen: über Treppen, Gitterroste, Schotter und Schwellen. Im Alltag heißen sie Roboterhund oder Robot Dog, in Datenblättern Vierbeiner-Roboter oder Quadruped. Unser Programm reicht vom Roboterhund für Lehre und Forschung bis zur Rad-Bein-Plattform, die in Fahrt 100 kg trägt.',
    },
    jobs: [
      {
        icon: 'ShieldCheck',
        title: { en: 'Inspection and patrol', de: 'Inspektion und Streife' },
        body: {
          en: 'Stairs, grating and outdoor sites, with room for thermal, gas or acoustic sensors.',
          de: 'Treppen, Gitterroste und Außengelände, mit Platz für Wärmebild-, Gas- oder Akustiksensorik.',
        },
        models: ['m100', 'm40', 'magicdog-y1'],
      },
      {
        icon: 'Route',
        title: { en: 'Long routes and large sites', de: 'Lange Wege und große Gelände' },
        body: {
          en: 'Wheels for distance, legs for steps and kerbs.',
          de: 'Räder für die Strecke, Beine für Stufen und Bordsteine.',
        },
        models: ['m100ws', 'm40w', 'm1-pro'],
      },
      {
        icon: 'GraduationCap',
        title: { en: 'Teaching and research', de: 'Lehre und Forschung' },
        body: {
          en: 'Open SDKs, ROS 2 and interfaces for your own sensors.',
          de: 'Offene SDKs, ROS 2 und Schnittstellen für eigene Sensorik.',
        },
        models: ['magicdog-edu', 'magicdog-t1', 'm1'],
      },
      {
        icon: 'Sparkles',
        title: { en: 'Visitors and events', de: 'Besucher und Events' },
        body: {
          en: 'Robot dogs people can come up close to, for stands, museums and shows.',
          de: 'Roboterhunde, an die Menschen nah herankommen dürfen, für Messestände, Museen und Shows.',
        },
        models: ['magicdog-pro', 'magic-panda', 'magicdog-w-standard'],
      },
    ],
  },

  facts: [
    { value: same('100 kg'), label: { en: 'carried on the move by the M100WS', de: 'trägt der M100WS in Fahrt' } },
    { value: same('6 m/s'), label: { en: 'M1 series and MagicDog Y1, the M1 peaks at 8 m/s', de: 'M1-Serie und MagicDog Y1, der M1 in der Spitze 8 m/s' } },
    { value: { en: '7.5 h', de: '7,5 h' }, label: { en: 'runtime unloaded, M100WS', de: 'Laufzeit ohne Last, M100WS' } },
    { value: same('IP67'), label: { en: 'on seven models, IP66 on three more', de: 'bei sieben Modellen, IP66 bei drei weiteren' } },
    { value: same('45°'), label: { en: 'slopes for M40, M100 and M1 families', de: 'Steigung bei den Familien M40, M100 und M1' } },
  ],

  groups: [
    {
      id: 'inspection-security',
      nav: { en: 'Inspection', de: 'Inspektion' },
      eyebrow: { en: 'Legged · MegaRobotics and MagicLab', de: 'Auf Beinen · MegaRobotics und MagicLab' },
      title: { en: 'Quadruped robots for inspection and security', de: 'Laufroboter für Inspektion und Sicherheit' },
      lead: {
        en: 'Four legs are the answer when the route has stairs, grating, rubble or narrow service corridors. These inspection robots carry the sensors and walk the round.',
        de: 'Vier Beine sind die Antwort, wenn der Weg über Treppen, Gitterroste, Schutt oder enge Versorgungsgänge führt. Diese Inspektionsroboter tragen die Sensorik und laufen die Runde.',
      },
      body: {
        en: 'Inspection payloads such as thermal cameras, gas detectors or acoustic cameras are chosen and integrated for each project. On the M series they are not part of the standard scope of supply. The MagicDog Y1 has interfaces for these sensors ready.',
        de: 'Inspektionssensorik wie Wärmebildkameras, Gasdetektoren oder akustische Kameras wählen und integrieren wir je Projekt. Bei der M-Serie gehört sie nicht zum Standard-Lieferumfang. Der MagicDog Y1 bringt die Schnittstellen dafür mit.',
      },
      points: [
        { en: 'M100: 50 kg continuous payload, IP67, wades through 30 cm of water', de: 'M100: 50 kg Dauernutzlast, IP67, watet durch 30 cm Wasser' },
        { en: 'M40: 36 kg, steps up to 20 cm, IP66', de: 'M40: 36 kg, Stufen bis 20 cm, IP66' },
        { en: 'MagicDog Y1: 45 kg dynamic payload, 4 to 6 h, IP67', de: 'MagicDog Y1: 45 kg dynamische Nutzlast, 4 bis 6 h, IP67' },
        { en: 'MagicDog T1: about 19 kg, folds small enough for one person to carry', de: 'MagicDog T1: rund 19 kg, zusammengefaltet trägt ihn eine Person' },
      ],
      feature: 'm100',
      models: ['m40', 'magicdog-y1', 'magicdog-t1'],
    },
    {
      id: 'wheel-legged',
      nav: { en: 'Wheel-legged', de: 'Rad-Bein' },
      eyebrow: { en: 'Wheels on the legs · MegaRobotics and MagicLab', de: 'Räder an den Beinen · MegaRobotics und MagicLab' },
      title: { en: 'Wheel-legged robots for long routes', de: 'Rad-Bein-Roboter für lange Strecken' },
      lead: {
        en: 'Wheel-legged robots have driven wheels at the ends of their legs. They roll on roads and shop floors and step over obstacles when they have to.',
        de: 'Rad-Bein-Roboter haben angetriebene Räder an den Beinenden. Auf Straßen und Hallenböden rollen sie, an Stufen und Hindernissen steigen sie.',
      },
      body: {
        en: 'Rolling uses less energy than walking, so the same battery goes further: the M100W runs up to 6 hours unloaded, the walking M100 up to 5.5. For autonomy, the M1 Pro and M1 Ultra come with navigation and mapping as standard; on the M1 it is an option, on the M40WS part of the Pro package.',
        de: 'Rollen braucht weniger Energie als Laufen, deshalb reicht derselbe Akku weiter: Der M100W läuft ohne Last bis zu 6 Stunden, der laufende M100 bis zu 5,5. Navigation und Kartierung sind beim M1 Pro und M1 Ultra serienmäßig, beim M1 eine Option, beim M40WS Teil des Pro-Pakets.',
      },
      points: [
        { en: 'M100WS: 100 kg on the move, 7.5 h or 35 km unloaded', de: 'M100WS: 100 kg in Fahrt, 7,5 h oder 35 km ohne Last' },
        { en: 'M1 series: 6 m/s, steps up to 25 cm, IP67', de: 'M1-Serie: 6 m/s, Stufen bis 25 cm, IP67' },
        { en: 'M40WS: drives forwards and backwards without turning', de: 'M40WS: fährt vorwärts und rückwärts, ohne zu wenden' },
        { en: 'MagicDog-W: 7-inch pneumatic tyres, Laser version with LiDAR', de: 'MagicDog-W: 7-Zoll-Luftreifen, Version Laser mit LiDAR' },
      ],
      feature: 'm100ws',
      models: ['m100w', 'm40w', 'm40ws', 'm1', 'm1-pro', 'm1-ultra', 'magicdog-w-standard', 'magicdog-w-laser'],
    },
    {
      id: 'teaching-research-events',
      nav: { en: 'Teaching & events', de: 'Lehre & Events' },
      eyebrow: { en: 'MagicLab · China', de: 'MagicLab · China' },
      title: { en: 'Robot dogs for teaching, research and events', de: 'Roboterhunde für Lehre, Forschung und Events' },
      lead: {
        en: 'Smaller robot dogs for lecture halls, labs, trade-fair stands and visitor venues, where people come up close.',
        de: 'Kleinere Roboterhunde für Hörsaal, Labor, Messestand und Besucherbetrieb, überall dort, wo Menschen nah herankommen.',
      },
      body: {
        en: 'MagicDog Pro and MagicDog Edu share the same body: 15.8 kg without battery, 5 kg effective payload and 3 m/s. The Pro is set up for interaction and shows, the Edu for your own code with an SDK and sample projects.',
        de: 'MagicDog Pro und MagicDog Edu teilen sich dieselbe Plattform: 15,8 kg ohne Akku, 5 kg effektive Nutzlast und 3 m/s. Der Pro ist auf Interaktion und Vorführung ausgelegt, der Edu auf eigenen Code mit SDK und Beispielprojekten.',
      },
      manufacturer: 'magiclab',
      feature: 'magicdog-pro',
      models: ['magicdog-edu', 'magic-panda'],
    },
  ],

  explainer: {
    eyebrow: { en: 'Basics', de: 'Grundlagen' },
    title: { en: 'What a legged robot does, and where it fits', de: 'Was ein Laufroboter kann und wo er hinpasst' },
    paragraphs: [
      {
        en: 'A legged robot is any robot that walks on legs. A quadruped robot, or robot dog, has four of them. Each leg usually has three joint motors, so the robot can place its feet one by one, keep its balance on uneven ground and climb steps. That is the main reason to buy a robot dog instead of a wheeled robot: it handles stairs, grating, gravel and thresholds without ramps or lifts.',
        de: 'Laufroboter ist der Oberbegriff für Roboter auf Beinen. Ein Vierbeiner-Roboter, auch Roboterhund genannt, hat vier davon. Jedes Bein hat meist drei Gelenkmotoren, so setzt der Roboter die Füße einzeln, hält auf unebenem Boden das Gleichgewicht und steigt Stufen. Das ist der Hauptgrund, einen Roboterhund zu kaufen statt eines Radroboters: Er kommt über Treppen, Gitterroste, Schotter und Schwellen, ohne Rampen oder Aufzüge.',
      },
      {
        en: 'A wheel-legged robot adds driven wheels at the ends of the legs. The M1, for example, has twelve joint motors and four hub motors in its feet. On flat ground it rolls, which is faster and saves battery; at a kerb or a flight of stairs it walks. For long patrol routes on large sites this is often the better choice.',
        de: 'Ein Rad-Bein-Roboter hat zusätzlich angetriebene Räder an den Beinenden. Der M1 etwa hat zwölf Gelenkmotoren und vier Nabenmotoren in den Füßen. Auf ebenem Boden rollt er, das ist schneller und schont den Akku, an Bordstein oder Treppe läuft er. Für lange Streifenwege auf großen Geländen ist das oft die bessere Wahl.',
      },
      {
        en: 'In industry, a quadruped robot works mostly as an inspection robot. It walks a fixed round through plants, tunnels, substations or tank farms and carries thermal cameras, gas detectors or acoustic cameras. With navigation and mapping it follows the route on its own; people still decide what happens when it reports something.',
        de: 'In der Industrie arbeitet ein vierbeiniger Roboter meist als Inspektionsroboter. Er läuft eine feste Runde durch Anlagen, Tunnel, Umspannwerke oder Tanklager und trägt Wärmebildkameras, Gasdetektoren oder akustische Kameras. Mit Navigation und Kartierung folgt er der Route selbstständig, was bei einer Meldung passiert, entscheiden weiterhin Menschen.',
      },
      {
        en: 'For outdoor use, look at the ingress protection. The M100, M100W, M100WS, the M1 series and the MagicDog Y1 are rated IP67, the M40, M40W and M40WS IP66. None of the M-series models has explosion protection, so they do not belong in classified Ex zones.',
        de: 'Für den Einsatz im Freien zählt die Schutzart. M100, M100W, M100WS, die M1-Serie und der MagicDog Y1 haben IP67, M40, M40W und M40WS IP66. Keines der Modelle der M-Serie hat Explosionsschutz, sie gehören daher nicht in eingestufte Ex-Zonen.',
      },
    ],
  },

  compare: {
    eyebrow: { en: 'Comparison', de: 'Vergleich' },
    title: { en: 'All quadruped robots side by side', de: 'Alle Laufroboter nebeneinander' },
    subtitle: {
      en: 'Pick what matters and the table narrows down. Values are manufacturer data.',
      de: 'Wählen Sie, was zählt, dann wird die Tabelle kürzer. Alle Werte sind Herstellerangaben.',
    },
    filters: [
      { key: 'legs', label: { en: 'Legs only', de: 'Nur Beine' } },
      { key: 'wheels', label: { en: 'Wheel-legs', de: 'Rad-Beine' } },
      { key: 'outdoor', label: { en: 'IP66 or IP67', de: 'IP66 oder IP67' } },
      { key: 'heavy', label: { en: '30 kg payload or more', de: 'Ab 30 kg Nutzlast' } },
      { key: 'navigation', label: { en: 'Navigation available', de: 'Navigation verfügbar' } },
      { key: 'teaching', label: { en: 'Teaching & events', de: 'Lehre & Events' } },
    ],
    cols: [
      { key: 'drive', label: { en: 'Moves on', de: 'Antrieb' } },
      { key: 'weight', label: { en: 'Weight', de: 'Gewicht' } },
      { key: 'payload', label: { en: 'Payload', de: 'Nutzlast' } },
      { key: 'speed', label: { en: 'Max. speed', de: 'Max. Tempo' } },
      { key: 'runtime', label: { en: 'Runtime', de: 'Laufzeit' } },
      { key: 'ip', label: { en: 'IP rating', de: 'Schutzart' } },
      { key: 'climb', label: { en: 'Stairs / slope', de: 'Treppen / Steigung' } },
    ],
    foot: {
      en: 'A dash means the manufacturer gives no value. All figures are manufacturer data as of 11/2026, mostly measured unloaded or under lab conditions. Payload is the continuous value unless marked; short-term peaks are not design values. Weight includes the battery unless marked. "Navigation available" means standard or as an option. * See notes.',
      de: 'Ein Strich bedeutet, dass der Hersteller keinen Wert angibt. Alle Zahlen sind Herstellerangaben, Stand 11/2026, meist ohne Last oder unter Laborbedingungen gemessen. Nutzlast ist der Dauerwert, sofern nicht anders vermerkt; kurzzeitige Höchstwerte sind keine Auslegungswerte. Gewicht mit Akku, sofern nicht anders vermerkt. „Navigation verfügbar“ heißt serienmäßig oder als Option. * Siehe Hinweise.',
    },
  },

  choose: {
    eyebrow: { en: 'Buying advice', de: 'Kaufberatung' },
    title: { en: 'How to choose the right model', de: 'So finden Sie das passende Modell' },
    items: [
      {
        title: { en: 'Ground', de: 'Untergrund' },
        body: {
          en: 'Stairs, grating and rubble call for legs. Long paved routes call for wheels on the legs.',
          de: 'Treppen, Gitterroste und Schutt sprechen für Beine, lange befestigte Wege für Räder an den Beinen.',
        },
      },
      {
        title: { en: 'Payload', de: 'Nutzlast' },
        body: {
          en: 'Add up camera, sensors and mounts, then compare with the continuous payload. Short-term peaks such as 100 kg standing load on the M40 are not design values.',
          de: 'Rechnen Sie Kamera, Sensorik und Halterung zusammen und vergleichen Sie mit der Dauernutzlast. Kurzzeitige Höchstwerte wie die 100 kg Standlast beim M40 sind kein Auslegungswert.',
        },
      },
      {
        title: { en: 'Runtime', de: 'Laufzeit' },
        body: {
          en: 'Unloaded figures shrink with weight. On the M100, 5.5 hours become 2.5 hours with 50 kg. Swappable batteries keep longer shifts going.',
          de: 'Angaben ohne Last schrumpfen mit Gewicht. Beim M100 werden aus 5,5 Stunden mit 50 kg 2,5 Stunden. Wechselakkus halten längere Schichten am Laufen.',
        },
      },
      {
        title: { en: 'Protection', de: 'Schutzart' },
        body: {
          en: 'Outdoors, look at IP66 and IP67. The MagicDog T1 has IP54 and fits indoor and sheltered use better.',
          de: 'Für draußen kommen IP66 und IP67 infrage. Der MagicDog T1 hat IP54 und passt besser nach drinnen oder unter Dach.',
        },
      },
      {
        title: { en: 'Autonomy', de: 'Autonomie' },
        body: {
          en: 'M1 Pro and M1 Ultra include navigation and mapping. On the M1 it is an option, on the M40 and M40WS part of the Pro package. On M100 and M100W, autonomous navigation is currently at demo stage.',
          de: 'M1 Pro und M1 Ultra bringen Navigation und Kartierung mit. Beim M1 ist sie eine Option, bei M40 und M40WS Teil des Pro-Pakets. Bei M100 und M100W ist die autonome Navigation derzeit im Demo-Stadium.',
        },
      },
      {
        title: { en: 'Hazardous areas', de: 'Ex-Bereiche' },
        body: {
          en: 'The M series has no explosion protection and does not belong in classified Ex zones. Tell us early if your site has them.',
          de: 'Die M-Serie hat keinen Explosionsschutz und gehört nicht in eingestufte Ex-Zonen. Sagen Sie uns früh, wenn Ihr Gelände solche Bereiche hat.',
        },
      },
    ],
  },

  faq: {
    eyebrow: { en: 'Questions', de: 'Fragen' },
    title: { en: 'Frequently asked questions', de: 'Häufige Fragen' },
    items: [
      {
        q: {
          en: 'What is the difference between a legged robot, a quadruped and a robot dog?',
          de: 'Was ist der Unterschied zwischen Laufroboter, Roboterhund und Vierbeiner?',
        },
        a: {
          en: 'A legged robot is any robot that walks on legs. Quadruped and robot dog both mean a legged robot with four of them. Robots on two legs are humanoids, which have their own page.',
          de: 'Laufroboter ist der Oberbegriff für Roboter auf Beinen. Roboterhund, Vierbeiner-Roboter und Quadruped bezeichnen Laufroboter mit vier Beinen. Roboter auf zwei Beinen sind Humanoide, für sie gibt es eine eigene Seite.',
        },
      },
      {
        q: {
          en: 'How much does it cost to buy a robot dog for industry?',
          de: 'Was kostet es, einen Roboterhund für die Industrie zu kaufen?',
        },
        a: {
          en: 'The price depends on the model, sensors, computing and integration. An M40 with the Pro package and a thermal camera is a different project from a MagicDog Edu for a lab. That is why we give the price in a quote for your configuration.',
          de: 'Der Preis hängt von Modell, Sensorik, Rechenleistung und Integration ab. Ein M40 mit Pro-Paket und Wärmebildkamera ist ein anderes Projekt als ein MagicDog Edu fürs Labor. Deshalb nennen wir den Preis im Angebot für Ihre Konfiguration.',
        },
      },
      {
        q: { en: 'Can quadruped robots climb stairs?', de: 'Können Laufroboter Treppen steigen?' },
        a: {
          en: 'Yes. M40, M40WS, M100 and M100W manage steps up to 20 cm, the M1 series up to 25 cm and the MagicDog T1 up to 18 cm. The M-series models handle slopes up to 45°. We check your stairs by step height, width and surface before we recommend a model.',
          de: 'Ja. M40, M40WS, M100 und M100W schaffen Stufen bis 20 cm, die M1-Serie bis 25 cm, der MagicDog T1 bis 18 cm. Die Modelle der M-Serie bewältigen Steigungen bis 45°. Ob Ihre Treppe passt, prüfen wir anhand von Stufenhöhe, Breite und Belag, bevor wir ein Modell empfehlen.',
        },
      },
      {
        q: { en: 'What is a wheel-legged robot?', de: 'Was ist ein Rad-Bein-Roboter?' },
        a: {
          en: 'A quadruped with driven wheels at the ends of its legs. It rolls on flat ground and walks over obstacles. Rolling saves energy: the M100W runs up to 6 hours unloaded, the M100WS up to 7.5 hours or 35 km.',
          de: 'Ein Vierbeiner mit angetriebenen Rädern an den Beinenden. Auf ebenem Boden rollt er, über Hindernisse läuft er. Rollen spart Energie: Der M100W hält ohne Last bis zu 6 Stunden durch, der M100WS bis zu 7,5 Stunden oder 35 km.',
        },
      },
      {
        q: { en: 'Can a robot dog patrol on its own?', de: 'Läuft ein Roboterhund selbstständig Kontrollrunden?' },
        a: {
          en: 'With navigation and mapping it follows planned routes. That is standard on the M1 Pro and M1 Ultra, and the MagicDog-W Laser and MagicDog T1 navigate autonomously too. People still decide on alarms and responses.',
          de: 'Mit Navigation und Kartierung fährt oder läuft er geplante Routen ab. Serienmäßig ist das beim M1 Pro und M1 Ultra, auch MagicDog-W Laser und MagicDog T1 navigieren autonom. Über Alarme und Eingriffe entscheiden weiterhin Menschen.',
        },
      },
      {
        q: { en: 'Which sensors can an inspection robot carry?', de: 'Welche Sensoren kann ein Inspektionsroboter tragen?' },
        a: {
          en: 'Thermal cameras, gas detectors and acoustic cameras are common. On the M series we choose and integrate them per project; they are not part of the standard scope of supply. The MagicDog Y1 supports a thermal imager, dual-light PTZ camera, gas sensor, acoustic imager and partial discharge sensor.',
          de: 'Üblich sind Wärmebildkamera, Gasdetektor und akustische Kamera. Bei der M-Serie wählen und integrieren wir sie je Projekt, sie gehören nicht zum Standard-Lieferumfang. Der MagicDog Y1 unterstützt Wärmebildkamera, Dual-Light-PTZ-Kamera, Gassensor, akustische Kamera und Teilentladungssensor.',
        },
      },
      {
        q: { en: 'How long does a quadruped robot run on one battery?', de: 'Wie lange läuft ein Laufroboter mit einem Akku?' },
        a: {
          en: 'Unloaded, the models with a stated runtime manage 4 to 7.5 hours; the MagicDog-W lists 2 to 4 hours. Load cuts that: the M100 goes from 5.5 hours to 2.5 hours with 50 kg. M40, M100, M1 and MagicDog Y1 use swappable batteries, so a spare keeps the robot going.',
          de: 'Ohne Last schaffen die Modelle mit Laufzeitangabe 4 bis 7,5 Stunden, beim MagicDog-W sind 2 bis 4 Stunden angegeben. Last verkürzt das: Beim M100 werden aus 5,5 Stunden mit 50 kg 2,5 Stunden. M40, M100, M1 und MagicDog Y1 haben Wechselakkus, mit einem Ersatzakku läuft der Roboter weiter.',
        },
      },
      {
        q: { en: 'Do the robots carry the CE mark?', de: 'Haben die Roboter eine CE-Kennzeichnung?' },
        a: {
          en: 'For the M series, CE conformity is in preparation. We state the status of the MagicLab models in the quote.',
          de: 'Bei der M-Serie ist die CE-Konformität in Vorbereitung. Den Stand für die MagicLab-Modelle nennen wir im Angebot.',
        },
      },
    ],
  },

  related: [
    { href: '/solutions/inspection-security', label: { en: 'Inspection and security robots', de: 'Inspektions- und Sicherheitsroboter' } },
    { href: '/solutions/security', label: { en: 'Security and site protection', de: 'Sicherheit und Objektschutz' } },
    { href: '/pages/humanoid-robots', label: { en: 'Humanoid robots', de: 'Humanoide Roboter' } },
    { href: '/ip-ratings', label: { en: 'IP ratings explained', de: 'IP-Schutzarten erklärt' } },
    { href: '/guides/buyers-guide-legged-robots-2026', label: { en: "Buyers' guide 2026: legged robots", de: 'Kaufberatung 2026: Laufroboter' } },
    { href: '/solutions/research-education', label: { en: 'Research and education robotics', de: 'Forschungs- und Bildungsrobotik' } },
    { href: '/products/categories/robot-platforms', label: { en: 'All robot platforms', de: 'Alle Roboterplattformen' } },
    { href: '/manufacturers/magiclab', label: { en: 'All products from MagicLab', de: 'Alle Produkte von MagicLab' } },
  ],

  cta: {
    eyebrow: { en: 'Advice and inquiries', de: 'Beratung und Anfrage' },
    title: { en: 'Which robot dog fits your site?', de: 'Welcher Roboterhund passt zu Ihrem Gelände?' },
    body: {
      en: 'We supply, integrate and service the M series in Germany, Austria and Switzerland; it is built by OEM partners. The MagicDog models come from MagicLab. Tell us what the robot should do and what the site looks like.',
      de: 'Die M-Serie liefern, integrieren und betreuen wir in Deutschland, Österreich und der Schweiz, gefertigt wird sie von OEM-Partnern. Die MagicDog-Modelle kommen von MagicLab. Schreiben Sie uns, was der Roboter tun soll und wie das Gelände aussieht.',
    },
    button: { en: 'Request a quote', de: 'Angebot anfragen' },
    subject: { en: 'Quadruped robots', de: 'Laufroboter' },
  },

  fine: [
    {
      en: 'All figures are manufacturer data as of 11/2026 and may change. M-series images are renderings of the base configuration and may differ from the delivered unit; MagicLab images are by the manufacturer.',
      de: 'Alle Zahlen sind Herstellerangaben, Stand 11/2026, und können sich ändern. Bilder der M-Serie sind Renderings der Grundkonfiguration und können vom gelieferten Gerät abweichen, Bilder der MagicLab-Modelle stammen vom Hersteller.',
    },
    {
      en: '* M40: the specification gives 5.5 h unloaded, while the manufacturer’s model summary states up to 5 h. We confirm the value in the quote.',
      de: '* M40: Das Datenblatt nennt 5,5 h ohne Last, die Modellübersicht des Herstellers bis zu 5 h. Den Wert bestätigen wir im Angebot.',
    },
    {
      en: 'MagicDog T1 figures are based on the T1 EDU and may vary by version. The M100WS is rated IP67 but not tested for water jets (IPX6). MagicDog Pro and Edu weights are without battery.',
      de: 'Die Werte des MagicDog T1 beruhen auf dem T1 EDU und können je Version abweichen. Der M100WS hat IP67, ist aber nicht auf Strahlwasser (IPX6) geprüft. Die Gewichte von MagicDog Pro und Edu gelten ohne Akku.',
    },
  ],
}
