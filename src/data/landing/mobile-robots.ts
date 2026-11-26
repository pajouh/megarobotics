// Content for the buying page /pages/mobile-robots (and /de/pages/mobile-robots):
// AMRs, lifting AMRs, autonomous forklifts, fleet software and controllers,
// all from SEER Robotics.
//
// Every figure comes from the products' published Sanity entries
// (specifications, tagline, description). A dash means SEER gives no value or
// the value does not apply. Where Sanity names a CE version of a model
// (SSR-1400 and SSR-1400US -> SSR-1400EU, SFL-CPD20-Y -> SCB-2000EU,
// SFL-CPD30-Y -> SCB-3000EU, SFL-300L -> SOF-300EU), only the CE version has a
// card; the others are mentioned in the group points.

import { CDN, NONE, same, type LandingContent, type LandingModel } from './types'

const S = {
  load: { en: 'Rated load', de: 'Nennlast' },
  lift: { en: 'Lift height', de: 'Hubhöhe' },
  stroke: { en: 'Lifting stroke', de: 'Hub' },
  battery: { en: 'Battery life', de: 'Akkulaufzeit' },
  aisle: { en: 'Min. aisle width', de: 'Min. Gangbreite' },
  speed: { en: 'Speed', de: 'Geschwindigkeit' },
  weight: { en: 'Weight with battery', de: 'Gewicht mit Akku' },
  accuracy: { en: 'Position accuracy', de: 'Positioniergenauigkeit' },
  turning: { en: 'Turning radius', de: 'Wenderadius' },
  width: { en: 'Width', de: 'Breite' },
  height: { en: 'Height', de: 'Höhe' },
  map: { en: 'Map area', de: 'Kartenfläche' },
  ip: { en: 'IP rating', de: 'Schutzart' },
  safety: { en: 'Safety', de: 'Sicherheit' },
  power: { en: 'Power draw', de: 'Leistungsaufnahme' },
  type: { en: 'Type', de: 'Typ' },
}

type L2 = { en: string; de: string }
const SLAM5: L2 = { en: 'Laser SLAM, ±5 mm', de: 'Laser-SLAM, ±5 mm' }
const SLAM10: L2 = { en: 'Laser SLAM, ±10 mm', de: 'Laser-SLAM, ±10 mm' }

const NO_VEHICLE = { load: NONE, lift: NONE, nav: NONE, speed: NONE, battery: NONE, aisle: NONE }

export const MODELS: LandingModel[] = [
  // ── AMR bases ───────────────────────────────────────────────────────────
  {
    slug: 'seer-sba-400eu',
    name: same('SBA-400EU'),
    type: { en: 'Flat AMR base, 400 kg', de: 'Flache AMR-Basis, 400 kg' },
    image: `${CDN}/d2d799fbe0babcf2ba363680755fd17d72380dab-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'A mobile base for your own top modules, from roller conveyors to robot arms. The body is 182 mm high without the lidars. Two SICK safety lidars, a safety controller and 3D obstacle cameras are on board, and the protective fields adjust to the driving state. SEER states CE certification to ISO 3691-4.',
      de: 'Eine mobile Basis für eigene Aufbauten, vom Rollenförderer bis zum Roboterarm. Ohne Lidare ist das Gehäuse 182 mm hoch. Zwei SICK-Sicherheitslidare, eine Sicherheitssteuerung und 3D-Hinderniskameras sind an Bord, die Schutzfelder passen sich dem Fahrzustand an. SEER nennt eine CE-Zertifizierung nach ISO 3691-4.',
    },
    specs: [
      { label: S.load, value: same('400 kg') },
      { label: S.height, value: { en: '182 mm (body)', de: '182 mm (Gehäuse)' } },
      { label: S.aisle, value: { en: '771.4 mm', de: '771,4 mm' } },
      { label: S.battery, value: same('8 h') },
    ],
    tags: ['carrier', 'ce'],
    row: {
      type: { en: 'AMR base', de: 'AMR-Basis' },
      load: same('400 kg'),
      lift: NONE,
      nav: SLAM5,
      speed: { en: '≤ 1.5 m/s', de: '≤ 1,5 m/s' },
      battery: same('8 h'),
      aisle: { en: '771.4 mm', de: '771,4 mm' },
    },
  },
  {
    slug: 'seer-amb-150',
    name: same('AMB-150'),
    type: { en: 'Compact AMR base, 150 kg', de: 'Kompakte AMR-Basis, 150 kg' },
    image: `${CDN}/d7b84e7db9d246f37d965a11060d62027534f87d-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'A compact base with four mounting points on top for a lift, rollers, a robot arm or a towing unit. It weighs 66 kg, passes aisles from 700 mm and runs 12 hours per charge. Reflector navigation is optional.',
      de: 'Eine kompakte Basis mit vier Befestigungspunkten für Hubmodul, Rollen, Roboterarm oder Schleppeinheit. Sie wiegt 66 kg, passt durch Gänge ab 700 mm und fährt 12 Stunden pro Akkuladung. Reflektornavigation ist optional.',
    },
    specs: [
      { label: S.load, value: same('150 kg') },
      { label: S.weight, value: same('66 kg') },
      { label: S.aisle, value: same('700 mm') },
      { label: S.battery, value: same('12 h') },
    ],
    tags: ['carrier', 'ce'],
    row: {
      type: { en: 'AMR base', de: 'AMR-Basis' },
      load: same('150 kg'),
      lift: NONE,
      nav: SLAM5,
      speed: { en: '≤ 1.4 m/s', de: '≤ 1,4 m/s' },
      battery: same('12 h'),
      aisle: same('700 mm'),
    },
  },
  {
    slug: 'seer-amb-300',
    name: same('AMB-300'),
    type: { en: 'AMR base, 300 kg', de: 'AMR-Basis, 300 kg' },
    image: `${CDN}/2e004d2c0a31bd91fb4587874e1f2d8376986e15-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'The larger version of the AMB-150, with the same four mounting points for lifts, rollers, robot arms or towing units. QR code positioning and reflector navigation are optional, and the battery can be swapped quickly.',
      de: 'Die größere Ausführung des AMB-150 mit denselben vier Befestigungspunkten für Hubmodule, Rollen, Roboterarme oder Schleppeinheiten. QR-Code-Positionierung und Reflektornavigation sind optional, der Akku lässt sich schnell wechseln.',
    },
    specs: [
      { label: S.load, value: same('300 kg') },
      { label: S.weight, value: same('144 kg') },
      { label: S.aisle, value: same('840 mm') },
      { label: S.battery, value: same('12 h') },
    ],
    tags: ['carrier', 'ce'],
    row: {
      type: { en: 'AMR base', de: 'AMR-Basis' },
      load: same('300 kg'),
      lift: NONE,
      nav: SLAM5,
      speed: { en: '≤ 1.4 m/s', de: '≤ 1,4 m/s' },
      battery: same('12 h'),
      aisle: same('840 mm'),
    },
  },
  {
    slug: 'seer-amb-300xs',
    name: same('AMB-300XS'),
    type: { en: 'AMR base for cleanrooms, 300 kg', de: 'AMR-Basis für Reinräume, 300 kg' },
    image: `${CDN}/c39c1540428475b95d83990bdc6e36a9a17be378-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'SEER states ISO Class 4 cleanliness for this base, so it also suits semiconductor and electronics production. Two SICK nanoScan3 safety lidars secure it, and I/O, CAN and RS485 connect the top module. CE to ISO 3691-4 according to SEER.',
      de: 'SEER nennt für diese Basis die Reinheitsklasse ISO 4, damit passt sie auch in die Halbleiter- und Elektronikfertigung. Zwei SICK-nanoScan3-Sicherheitslidare sichern sie ab, I/O, CAN und RS485 binden den Aufbau an. CE nach ISO 3691-4 laut SEER.',
    },
    specs: [
      { label: S.load, value: same('300 kg') },
      { label: { en: 'Cleanliness', de: 'Reinheitsklasse' }, value: same('ISO 4') },
      { label: S.aisle, value: same('722 mm') },
      { label: S.battery, value: same('12 h') },
    ],
    tags: ['carrier', 'ce'],
    row: {
      type: { en: 'AMR base, cleanroom', de: 'AMR-Basis, Reinraum' },
      load: same('300 kg'),
      lift: NONE,
      nav: SLAM5,
      speed: { en: '≤ 1.5 m/s', de: '≤ 1,5 m/s' },
      battery: same('12 h'),
      aisle: same('722 mm'),
    },
  },

  // ── Lifting AMRs and tote robot ─────────────────────────────────────────
  {
    slug: 'seer-slr-1000eu',
    name: same('SLR-1000EU'),
    type: { en: 'Lifting AMR, 1,000 kg', de: 'Hub-AMR, 1.000 kg' },
    image: `${CDN}/72c0684f006d969fbba5190ebfa23ac4c93e57e3-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'Drives under racks and shelves, lifts them by 60 mm and carries up to 1,000 kg. It recognises different rack types and navigates by laser SLAM without reflectors in the building. Charges automatically. SEER states CE certification to ISO 3691-4.',
      de: 'Fährt unter Gestelle und Regale, hebt sie um 60 mm an und transportiert bis zu 1.000 kg. Er erkennt verschiedene Gestelltypen und navigiert per Laser-SLAM ohne Reflektoren im Gebäude. Lädt automatisch. SEER nennt eine CE-Zertifizierung nach ISO 3691-4.',
    },
    specs: [
      { label: S.load, value: { en: '1,000 kg', de: '1.000 kg' } },
      { label: S.stroke, value: same('60 mm') },
      { label: { en: 'Lifting platform', de: 'Hubplatte' }, value: same('1300 × 920 mm') },
      { label: S.battery, value: same('7 h') },
    ],
    tags: ['carrier', 'ce'],
    row: {
      type: { en: 'Lifting AMR', de: 'Hub-AMR' },
      load: { en: '1,000 kg', de: '1.000 kg' },
      lift: { en: '60 mm stroke', de: '60 mm Hub' },
      nav: SLAM5,
      speed: { en: '≤ 1.5 m/s', de: '≤ 1,5 m/s' },
      battery: same('7 h'),
      aisle: { en: '1,092 mm', de: '1.092 mm' },
    },
  },
  {
    slug: 'seer-amb-300jz',
    name: same('AMB-300JZ'),
    type: { en: 'Small lifting AMR, 300 kg', de: 'Kleiner Hub-AMR, 300 kg' },
    image: `${CDN}/a7b733179d313d15d735ecc24f8397e55aedce7b-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'Drives under shelves and lifts them by 60 mm. At 792 × 580 mm it fits aisles from 640 mm. Lidars plus bumper strips at the front and back protect it. SEER lists no CE marking for this model, so EU use has to be checked first.',
      de: 'Unterfährt Regale und hebt sie um 60 mm an. Mit 792 × 580 mm passt er in Gänge ab 640 mm. Lidare und Bumper-Leisten vorn und hinten sichern ihn ab. SEER nennt für dieses Modell keine CE-Kennzeichnung, ein Einsatz in der EU muss vorab geprüft werden.',
    },
    specs: [
      { label: S.load, value: same('300 kg') },
      { label: S.stroke, value: same('60 mm') },
      { label: S.aisle, value: same('640 mm') },
      { label: S.battery, value: same('8 h') },
    ],
    tags: ['carrier'],
    row: {
      type: { en: 'Lifting AMR', de: 'Hub-AMR' },
      load: same('300 kg'),
      lift: { en: '60 mm stroke', de: '60 mm Hub' },
      nav: SLAM5,
      speed: { en: '≤ 1.5 m/s', de: '≤ 1,5 m/s' },
      battery: same('8 h'),
      aisle: same('640 mm'),
    },
  },
  {
    slug: 'seer-sjv-sw600',
    name: same('SJV-SW600'),
    type: { en: 'Lifting AMR with rotating plate, 600 kg', de: 'Hub-AMR mit Drehplatte, 600 kg' },
    image: `${CDN}/61ef1dee9b9e45951d09f8b3c1f81d94a3cd23c0-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'Vehicle and lifting plate turn independently, so a shelf keeps its orientation while the robot turns in a tight aisle. Carries up to 600 kg and lifts by 60 mm. SEER lists no CE marking for this model, so EU use has to be checked first.',
      de: 'Fahrzeug und Hubplatte drehen sich unabhängig voneinander, das Regal behält also seine Ausrichtung, während der Roboter im engen Gang wendet. Trägt bis zu 600 kg und hebt um 60 mm. SEER nennt für dieses Modell keine CE-Kennzeichnung, ein Einsatz in der EU muss vorab geprüft werden.',
    },
    specs: [
      { label: S.load, value: same('600 kg') },
      { label: S.stroke, value: same('60 mm') },
      { label: S.aisle, value: same('790 mm') },
      { label: S.battery, value: same('8 h') },
    ],
    tags: ['carrier'],
    row: {
      type: { en: 'Lifting AMR, rotating plate', de: 'Hub-AMR, Drehplatte' },
      load: same('600 kg'),
      lift: { en: '60 mm stroke', de: '60 mm Hub' },
      nav: SLAM5,
      speed: { en: '≤ 1.5 m/s', de: '≤ 1,5 m/s' },
      battery: same('8 h'),
      aisle: same('790 mm'),
    },
  },
  {
    slug: 'seer-spk-m50j-zq',
    name: same('SPK-M50J-ZQ'),
    type: { en: 'Tote-handling robot', de: 'Behälterroboter' },
    image: `${CDN}/6ad6cf4851560b0f19cf4614d87496fba0194d68-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'Picks totes of up to 50 kg from shelves between 400 and 4,000 mm high and carries them on 3 to 6 trays. The gripper corrects its position with a 2D camera and reads bar codes. SEER lists no CE marking for this model, so EU use has to be checked first.',
      de: 'Holt Behälter bis 50 kg aus Regalfächern zwischen 400 und 4.000 mm Höhe und transportiert sie auf 3 bis 6 Ablagen. Der Greifer korrigiert seine Position per 2D-Kamera und liest Barcodes. SEER nennt für dieses Modell keine CE-Kennzeichnung, ein Einsatz in der EU muss vorab geprüft werden.',
    },
    specs: [
      { label: { en: 'Load per tote / total', de: 'Last pro Behälter / gesamt' }, value: same('50 / 300 kg') },
      { label: { en: 'Picking height', de: 'Greifhöhe' }, value: { en: '400 to 4,000 mm', de: '400 bis 4.000 mm' } },
      { label: { en: 'Trays', de: 'Ablagen' }, value: { en: '3 to 6', de: '3 bis 6' } },
      { label: S.battery, value: same('≥ 8 h') },
    ],
    tags: ['carrier'],
    row: {
      type: { en: 'Tote-handling robot', de: 'Behälterroboter' },
      load: { en: '50 kg per tote, 300 kg total', de: '50 kg pro Behälter, 300 kg gesamt' },
      lift: { en: 'Picks at 400–4,000 mm', de: 'Greift bei 400–4.000 mm' },
      nav: { en: 'Laser SLAM, QR optional, ±5 mm', de: 'Laser-SLAM, QR optional, ±5 mm' },
      speed: { en: '≤ 1.5 m/s', de: '≤ 1,5 m/s' },
      battery: same('≥ 8 h'),
      aisle: { en: '1,110 / 1,310 mm', de: '1.110 / 1.310 mm' },
    },
  },

  // ── Autonomous pallet trucks ────────────────────────────────────────────
  {
    slug: 'seer-sfl-cbd15',
    name: same('SFL-CBD15 / SFL-CBD15-CE'),
    type: { en: 'Autonomous pallet truck, 1.5 t', de: 'Autonomer Niederhubwagen, 1,5 t' },
    image: `${CDN}/8044ab42587e15fe84b1fc9a8a76a64c6fa750f4-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'Carries pallets of up to 1,500 kg, recognises open and non-standard pallets, racks and cages, and drives in maps of up to 400,000 m². SEER states CE certification to ISO 3691-4 for the SFL-CBD15-CE, which has SICK nanoScan3 safety lidars, 3D obstacle avoidance and pallet recognition as standard.',
      de: 'Transportiert Paletten bis 1.500 kg, erkennt offene und nicht genormte Paletten, Gestelle und Gitterboxen und fährt in Karten bis 400.000 m². Für den SFL-CBD15-CE nennt SEER eine CE-Zertifizierung nach ISO 3691-4, dort sind SICK-nanoScan3-Sicherheitslidare, 3D-Hinderniserkennung und Palettenerkennung Serie.',
    },
    specs: [
      { label: S.load, value: { en: '1,500 kg', de: '1.500 kg' } },
      { label: S.lift, value: same('205 mm') },
      { label: S.battery, value: { en: '4–6 h, CE version 8–10 h', de: '4–6 h, CE-Ausführung 8–10 h' } },
      { label: { en: 'Charging 10–80 %', de: 'Laden 10–80 %' }, value: same('1 h') },
    ],
    tags: ['pallet', 'ce'],
    row: {
      type: { en: 'Pallet truck (low lift)', de: 'Niederhubwagen' },
      load: { en: '1,500 kg', de: '1.500 kg' },
      lift: same('205 mm'),
      nav: SLAM10,
      speed: { en: '2 m/s (CE: 1.4 m/s)', de: '2 m/s (CE: 1,4 m/s)' },
      battery: { en: '4–6 h (CE: 8–10 h)', de: '4–6 h (CE: 8–10 h)' },
      aisle: { en: '2,190 + 200 mm (CE: 2,220 + 200 mm)', de: '2.190 + 200 mm (CE: 2.220 + 200 mm)' },
    },
  },
  {
    slug: 'seer-sfl-cbd20',
    name: same('SFL-CBD20'),
    type: { en: 'Autonomous pallet truck, 2 t', de: 'Autonomer Niederhubwagen, 2 t' },
    image: `${CDN}/62e77446f08865ecd16567af959238322342046a-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'Moves open pallets of up to 2,000 kg in a body 960 mm wide. It runs 10 hours per charge, and the battery swaps in about 3 minutes. SEER lists no CE marking for this model, so EU use has to be checked first.',
      de: 'Bewegt offene Paletten bis 2.000 kg und ist 960 mm breit. Eine Akkuladung reicht für 10 Stunden, der Akku lässt sich in rund 3 Minuten wechseln. SEER nennt für dieses Modell keine CE-Kennzeichnung, ein Einsatz in der EU muss vorab geprüft werden.',
    },
    specs: [
      { label: S.load, value: { en: '2,000 kg', de: '2.000 kg' } },
      { label: S.lift, value: same('205 mm') },
      { label: S.width, value: same('960 mm') },
      { label: S.battery, value: same('10 h') },
    ],
    tags: ['pallet'],
    row: {
      type: { en: 'Pallet truck (low lift)', de: 'Niederhubwagen' },
      load: { en: '2,000 kg', de: '2.000 kg' },
      lift: same('205 mm'),
      nav: SLAM10,
      speed: { en: '1.5 / 1.66 m/s', de: '1,5 / 1,66 m/s' },
      battery: same('10 h'),
      aisle: { en: '1,891 + 200 mm', de: '1.891 + 200 mm' },
    },
  },
  {
    slug: 'seer-sfl-cbd30',
    name: same('SFL-CBD30'),
    type: { en: 'Autonomous pallet truck, 3 t', de: 'Autonomer Niederhubwagen, 3 t' },
    image: `${CDN}/62e77446f08865ecd16567af959238322342046a-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'Moves open pallets of up to 3,000 kg in the same 960 mm wide body as the SFL-CBD20. It runs 8 hours per charge, with a battery swap in about 3 minutes. SEER lists no CE marking for this model, so EU use has to be checked first.',
      de: 'Bewegt offene Paletten bis 3.000 kg und ist mit 960 mm genauso breit wie der SFL-CBD20. Eine Akkuladung reicht für 8 Stunden, der Akkuwechsel dauert rund 3 Minuten. SEER nennt für dieses Modell keine CE-Kennzeichnung, ein Einsatz in der EU muss vorab geprüft werden.',
    },
    specs: [
      { label: S.load, value: { en: '3,000 kg', de: '3.000 kg' } },
      { label: S.lift, value: same('205 mm') },
      { label: S.width, value: same('960 mm') },
      { label: S.battery, value: same('8 h') },
    ],
    tags: ['pallet'],
    row: {
      type: { en: 'Pallet truck (low lift)', de: 'Niederhubwagen' },
      load: { en: '3,000 kg', de: '3.000 kg' },
      lift: same('205 mm'),
      nav: SLAM10,
      speed: { en: '1.5 / 1.66 m/s', de: '1,5 / 1,66 m/s' },
      battery: same('8 h'),
      aisle: { en: '1,891 + 200 mm', de: '1.891 + 200 mm' },
    },
  },
  {
    slug: 'seer-spt-1000',
    name: same('SPT-1000'),
    type: { en: 'Low autonomous pallet truck, 1 t', de: 'Flacher autonomer Niederhubwagen, 1 t' },
    image: `${CDN}/ca2dc1f0f98c480a1726afc5fc086e9613149625-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'Picks up open and closed pallets of up to 1,000 kg. It is only 556 mm high, turns within a 900 mm radius and runs 8 hours per charge. Pallet recognition and 3D obstacle avoidance are optional. SEER lists no CE marking for this model, so EU use has to be checked first.',
      de: 'Nimmt offene und geschlossene Paletten bis 1.000 kg auf. Er ist nur 556 mm hoch, wendet mit 900 mm Radius und fährt 8 Stunden pro Akkuladung. Palettenerkennung und 3D-Hinderniserkennung sind optional. SEER nennt für dieses Modell keine CE-Kennzeichnung, ein Einsatz in der EU muss vorab geprüft werden.',
    },
    specs: [
      { label: S.load, value: { en: '1,000 kg', de: '1.000 kg' } },
      { label: S.height, value: same('556 mm') },
      { label: S.turning, value: same('900 mm') },
      { label: S.battery, value: same('8 h') },
    ],
    tags: ['pallet'],
    row: {
      type: { en: 'Pallet truck (low lift)', de: 'Niederhubwagen' },
      load: { en: '1,000 kg', de: '1.000 kg' },
      lift: same('190 mm'),
      nav: SLAM10,
      speed: { en: '1.1 m/s', de: '1,1 m/s' },
      battery: same('8 h'),
      aisle: { en: '1,800 + 200 mm', de: '1.800 + 200 mm' },
    },
  },
  {
    slug: 'seer-sof-300eu',
    name: same('SOF-300EU'),
    type: { en: 'Single-fork vehicle for tote dollies', de: 'Einzelgabel-Fahrzeug für Behälterroller' },
    image: `${CDN}/252c0d988b083a4f2dca5266324374e0f7682356-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'Moves tote dollies and shelves of up to 300 kg. At 500 mm wide with an 800 mm turning radius it fits narrow aisles and lifts. A depth camera recognises the load carrier without QR codes. SEER states CE certification to ISO 3691-4.',
      de: 'Transportiert Behälterroller und Regale bis 300 kg. Mit 500 mm Breite und 800 mm Wenderadius passt er in schmale Gänge und Aufzüge. Eine Tiefenkamera erkennt den Ladungsträger ohne QR-Code. SEER nennt eine CE-Zertifizierung nach ISO 3691-4.',
    },
    specs: [
      { label: S.load, value: same('300 kg') },
      { label: S.width, value: same('500 mm') },
      { label: S.turning, value: same('800 mm') },
      { label: S.battery, value: same('6 h') },
    ],
    tags: ['carrier', 'ce'],
    row: {
      type: { en: 'Single-fork vehicle', de: 'Einzelgabel-Fahrzeug' },
      load: same('300 kg'),
      lift: same('70–90 mm'),
      nav: SLAM10,
      speed: { en: '0.8 / 1.4 m/s', de: '0,8 / 1,4 m/s' },
      battery: same('6 h'),
      aisle: NONE,
    },
  },

  // ── Autonomous stackers ─────────────────────────────────────────────────
  {
    slug: 'seer-sss-2000eu',
    name: same('SSS-2000EU'),
    type: { en: 'Autonomous stacker, 2 t', de: 'Autonomer Hochhubwagen, 2 t' },
    image: `${CDN}/5d76b96a0ed5667e45498d1695505ce2893471c5-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'Lifts open pallets of up to 2,000 kg, with a mast for 1,600 or 3,000 mm. It is 1,039 mm wide, turns within a 1,336 mm radius and stacks pallets and cages as standard. SEER states CE certification to ISO 3691-4.',
      de: 'Hebt offene Paletten bis 2.000 kg, wahlweise mit Mast für 1.600 oder 3.000 mm. Er ist 1.039 mm breit, wendet mit 1.336 mm Radius und stapelt Paletten und Gitterboxen serienmäßig. SEER nennt eine CE-Zertifizierung nach ISO 3691-4.',
    },
    specs: [
      { label: S.load, value: { en: '2,000 kg', de: '2.000 kg' } },
      { label: S.lift, value: { en: '1,600 / 3,000 mm', de: '1.600 / 3.000 mm' } },
      { label: S.speed, value: { en: '1.5 / 1.8 m/s', de: '1,5 / 1,8 m/s' } },
      { label: S.battery, value: same('10 h') },
    ],
    tags: ['pallet', 'highlift', 'ce'],
    row: {
      type: { en: 'Stacker (high lift)', de: 'Hochhubwagen' },
      load: { en: '2,000 kg', de: '2.000 kg' },
      lift: { en: '1,600 / 3,000 mm', de: '1.600 / 3.000 mm' },
      nav: SLAM10,
      speed: { en: '1.5 / 1.8 m/s', de: '1,5 / 1,8 m/s' },
      battery: same('10 h'),
      aisle: { en: '1,932 + 300 mm', de: '1.932 + 300 mm' },
    },
  },
  {
    slug: 'seer-sss-1500eu',
    name: same('SSS-1500EU'),
    type: { en: 'Autonomous stacker, 1.5 t', de: 'Autonomer Hochhubwagen, 1,5 t' },
    image: `${CDN}/d1fe862241a0a8c29393a749bf6c1c2deb22a33c-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'Stacks open pallets of up to 1,500 kg at heights of up to 2,944 mm. A safety controller, SICK safety lidars and safety encoders adjust the protective field while it drives. SEER states CE certification to ISO 3691-4.',
      de: 'Stapelt offene Paletten bis 1.500 kg in Höhen bis 2.944 mm. Sicherheitssteuerung, SICK-Sicherheitslidare und Sicherheitsencoder passen das Schutzfeld während der Fahrt an. SEER nennt eine CE-Zertifizierung nach ISO 3691-4.',
    },
    specs: [
      { label: S.load, value: { en: '1,500 kg', de: '1.500 kg' } },
      { label: S.lift, value: { en: '2,944 mm', de: '2.944 mm' } },
      { label: S.turning, value: { en: '1,295 mm', de: '1.295 mm' } },
      { label: S.battery, value: same('10 h') },
    ],
    tags: ['pallet', 'highlift', 'ce'],
    row: {
      type: { en: 'Stacker (high lift)', de: 'Hochhubwagen' },
      load: { en: '1,500 kg', de: '1.500 kg' },
      lift: { en: '2,944 mm', de: '2.944 mm' },
      nav: SLAM10,
      speed: { en: '1.0 / 1.5 m/s', de: '1,0 / 1,5 m/s' },
      battery: same('10 h'),
      aisle: { en: '1,920 + 200 mm', de: '1.920 + 200 mm' },
    },
  },
  {
    slug: 'seer-sfl-cdd14',
    name: same('SFL-CDD14 / SSS-1400EU'),
    type: { en: 'Compact autonomous stacker, 1.4 t', de: 'Kompakter autonomer Hochhubwagen, 1,4 t' },
    image: `${CDN}/96cd8d254e40001fd75f6caa3518fb9bd9b87676-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'A small stacker for open pallets of up to 1,400 kg with lifting heights of 1,600 or 3,000 mm. SEER states CE certification to ISO 3691-4 for the SSS-1400EU, which has pallet recognition, pallet stacking and cage stacking as standard.',
      de: 'Ein kleiner Hochhubwagen für offene Paletten bis 1.400 kg mit 1.600 oder 3.000 mm Hubhöhe. Für den SSS-1400EU nennt SEER eine CE-Zertifizierung nach ISO 3691-4, dort sind Palettenerkennung sowie das Stapeln von Paletten und Gitterboxen Serie.',
    },
    specs: [
      { label: S.load, value: { en: '1,400 kg', de: '1.400 kg' } },
      { label: S.lift, value: { en: '1,600 / 3,000 mm', de: '1.600 / 3.000 mm' } },
      { label: S.turning, value: { en: '1,221 mm (SSS-1400EU: 1,269 mm)', de: '1.221 mm (SSS-1400EU: 1.269 mm)' } },
      { label: S.battery, value: same('10 h') },
    ],
    tags: ['pallet', 'highlift', 'ce'],
    row: {
      type: { en: 'Stacker (high lift)', de: 'Hochhubwagen' },
      load: { en: '1,400 kg', de: '1.400 kg' },
      lift: { en: '1,600 / 3,000 mm', de: '1.600 / 3.000 mm' },
      nav: SLAM10,
      speed: { en: '1.2 / 1.5 m/s', de: '1,2 / 1,5 m/s' },
      battery: same('10 h'),
      aisle: { en: '1,885 + 200 mm (EU: from 1,911 + 300 mm)', de: '1.885 + 200 mm (EU: ab 1.911 + 300 mm)' },
    },
  },
  {
    slug: 'seer-sos-1000',
    name: same('SOS-1000'),
    type: { en: 'Omnidirectional stacker, 1 t', de: 'Omnidirektionaler Hochhubwagen, 1 t' },
    image: `${CDN}/0cb21ffc72e1c38ca2792a4f1d47d9f6b81cfd90-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'Drives forwards, sideways and diagonally. With up to 1,000 kg it moves laterally in aisles of 1.8 m and lifts pallets to 1,600 mm. SEER lists no CE marking for this model, so EU use has to be checked first.',
      de: 'Fährt vorwärts, seitwärts und diagonal. Mit bis zu 1.000 kg bewegt er sich in 1,8 m breiten Gängen quer und hebt Paletten auf 1.600 mm. SEER nennt für dieses Modell keine CE-Kennzeichnung, ein Einsatz in der EU muss vorab geprüft werden.',
    },
    specs: [
      { label: S.load, value: { en: '1,000 kg', de: '1.000 kg' } },
      { label: S.lift, value: { en: '1,600 mm', de: '1.600 mm' } },
      { label: S.battery, value: { en: '10 to 12 h', de: '10 bis 12 h' } },
      { label: { en: 'Charging 10–80 %', de: 'Laden 10–80 %' }, value: same('1 h') },
    ],
    tags: ['pallet', 'highlift'],
    row: {
      type: { en: 'Stacker, omnidirectional', de: 'Hochhubwagen, omnidirektional' },
      load: { en: '1,000 kg', de: '1.000 kg' },
      lift: { en: '1,600 mm', de: '1.600 mm' },
      nav: SLAM10,
      speed: { en: '1.0 / 1.5 m/s', de: '1,0 / 1,5 m/s' },
      battery: same('10–12 h'),
      aisle: { en: '1,910 + 200 mm', de: '1.910 + 200 mm' },
    },
  },

  // ── Counterbalance and reach trucks ─────────────────────────────────────
  {
    slug: 'seer-scb-2000eu',
    name: same('SCB-2000EU'),
    type: { en: 'Autonomous counterbalance forklift, 2 t', de: 'Autonomer Gegengewichtsstapler, 2 t' },
    image: `${CDN}/a5877ae3f9c5e7a60eb2e5402ec0ff5dcb4e0c7e-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'Handles open and closed pallets, racks and cages of up to 2,000 kg and lifts to 3,000 or 4,000 mm. The forks adjust from 400 to 700 mm, and one charge lasts 12 to 15 hours. Pallet and cage stacking are standard. SEER states CE certification to ISO 3691-4.',
      de: 'Bewegt offene und geschlossene Paletten, Gestelle und Gitterboxen bis 2.000 kg und hebt auf 3.000 oder 4.000 mm. Die Gabeln sind von 400 bis 700 mm verstellbar, eine Akkuladung reicht für 12 bis 15 Stunden. Paletten- und Gitterboxstapeln sind Serie. SEER nennt eine CE-Zertifizierung nach ISO 3691-4.',
    },
    specs: [
      { label: S.load, value: { en: '2,000 kg', de: '2.000 kg' } },
      { label: S.lift, value: { en: '3,000 / 4,000 mm', de: '3.000 / 4.000 mm' } },
      { label: { en: 'Fork spread', de: 'Gabelaußenbreite' }, value: { en: '400 to 700 mm', de: '400 bis 700 mm' } },
      { label: S.battery, value: { en: '12 to 15 h', de: '12 bis 15 h' } },
    ],
    tags: ['pallet', 'highlift', 'ce'],
    row: {
      type: { en: 'Counterbalance forklift', de: 'Gegengewichtsstapler' },
      load: { en: '2,000 kg', de: '2.000 kg' },
      lift: { en: '3,000 / 4,000 mm', de: '3.000 / 4.000 mm' },
      nav: SLAM10,
      speed: { en: '1.0 / 1.5 m/s', de: '1,0 / 1,5 m/s' },
      battery: same('12–15 h'),
      aisle: { en: '2,985 + 300 / 2,997 + 300 mm', de: '2.985 + 300 / 2.997 + 300 mm' },
    },
  },
  {
    slug: 'seer-scb-3000eu',
    name: same('SCB-3000EU'),
    type: { en: 'Autonomous counterbalance forklift, 3 t', de: 'Autonomer Gegengewichtsstapler, 3 t' },
    image: `${CDN}/99489728e71e3d178533cb542e3ba9ee1ba7281e-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'Handles open and closed pallets, racks and cages of up to 3,000 kg and lifts to 3,000 or 3,500 mm. The forks adjust from 450 to 750 mm, and one charge lasts 10 to 12 hours. SEER states CE certification to ISO 3691-4.',
      de: 'Bewegt offene und geschlossene Paletten, Gestelle und Gitterboxen bis 3.000 kg und hebt auf 3.000 oder 3.500 mm. Die Gabeln sind von 450 bis 750 mm verstellbar, eine Akkuladung reicht für 10 bis 12 Stunden. SEER nennt eine CE-Zertifizierung nach ISO 3691-4.',
    },
    specs: [
      { label: S.load, value: { en: '3,000 kg', de: '3.000 kg' } },
      { label: S.lift, value: { en: '3,000 / 3,500 mm', de: '3.000 / 3.500 mm' } },
      { label: { en: 'Fork spread', de: 'Gabelaußenbreite' }, value: { en: '450 to 750 mm', de: '450 bis 750 mm' } },
      { label: S.battery, value: { en: '10 to 12 h', de: '10 bis 12 h' } },
    ],
    tags: ['pallet', 'highlift', 'ce'],
    row: {
      type: { en: 'Counterbalance forklift', de: 'Gegengewichtsstapler' },
      load: { en: '3,000 kg', de: '3.000 kg' },
      lift: { en: '3,000 / 3,500 mm', de: '3.000 / 3.500 mm' },
      nav: SLAM10,
      speed: { en: '1.0 / 1.5 m/s', de: '1,0 / 1,5 m/s' },
      battery: same('10–12 h'),
      aisle: { en: '3,339 + 300 / 3,417 + 300 mm', de: '3.339 + 300 / 3.417 + 300 mm' },
    },
  },
  {
    slug: 'seer-ssr-1400eu',
    name: same('SSR-1400EU'),
    type: { en: 'Autonomous reach truck, 1.4 t', de: 'Autonomer Schubmaststapler, 1,4 t' },
    image: `${CDN}/b35e932291fe43c0b902b88764065faee7ce2954-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'Moves its mast forward to store pallets of up to 1,400 kg at heights of up to 3 m. It handles open and closed pallets and is 1,192 mm wide. Pallet recognition and stacking are standard. SEER states CE certification to ISO 3691-4.',
      de: 'Schiebt den Mast vor und lagert Paletten bis 1.400 kg in Höhen bis 3 m ein. Er nimmt offene und geschlossene Paletten auf und ist 1.192 mm breit. Palettenerkennung und Stapeln sind Serie. SEER nennt eine CE-Zertifizierung nach ISO 3691-4.',
    },
    specs: [
      { label: S.load, value: { en: '1,400 kg', de: '1.400 kg' } },
      { label: S.lift, value: { en: '3,000 mm', de: '3.000 mm' } },
      { label: S.width, value: { en: '1,192 mm', de: '1.192 mm' } },
      { label: S.battery, value: same('8 h') },
    ],
    tags: ['pallet', 'highlift', 'ce'],
    row: {
      type: { en: 'Reach truck', de: 'Schubmaststapler' },
      load: { en: '1,400 kg', de: '1.400 kg' },
      lift: { en: '3,000 mm', de: '3.000 mm' },
      nav: SLAM10,
      speed: { en: '1.2 / 1.5 m/s', de: '1,2 / 1,5 m/s' },
      battery: same('8 h'),
      aisle: { en: '2,220 + 300 mm', de: '2.220 + 300 mm' },
    },
  },
  {
    slug: 'seer-scb-1400',
    name: same('SCB-1400'),
    type: { en: 'Compact counterbalance forklift, 1.4 t', de: 'Kompakter Gegengewichtsstapler, 1,4 t' },
    image: `${CDN}/29193ee222d9fb04757fb91bf6b33c8357310087-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'Lifts 1,400 kg to 3 m, is 1,196 mm wide and turns within a 1,299 mm radius. The forks adjust from 400 to 700 mm and take open and closed pallets. SEER lists no CE marking for this model, so EU use has to be checked first.',
      de: 'Hebt 1.400 kg auf 3 m, ist 1.196 mm breit und wendet mit 1.299 mm Radius. Die Gabeln sind von 400 bis 700 mm verstellbar und nehmen offene und geschlossene Paletten auf. SEER nennt für dieses Modell keine CE-Kennzeichnung, ein Einsatz in der EU muss vorab geprüft werden.',
    },
    specs: [
      { label: S.load, value: { en: '1,400 kg', de: '1.400 kg' } },
      { label: S.lift, value: { en: '3,000 mm', de: '3.000 mm' } },
      { label: S.turning, value: { en: '1,299 mm', de: '1.299 mm' } },
      { label: S.battery, value: { en: '6 to 8 h', de: '6 bis 8 h' } },
    ],
    tags: ['pallet', 'highlift'],
    row: {
      type: { en: 'Counterbalance forklift', de: 'Gegengewichtsstapler' },
      load: { en: '1,400 kg', de: '1.400 kg' },
      lift: { en: '3,000 mm', de: '3.000 mm' },
      nav: SLAM10,
      speed: { en: '1.0 / 1.5 m/s', de: '1,0 / 1,5 m/s' },
      battery: same('6–8 h'),
      aisle: { en: '2,684 + 200 mm', de: '2.684 + 200 mm' },
    },
  },

  // ── Fleet software ──────────────────────────────────────────────────────
  {
    slug: 'seer-m4',
    name: same('SEER M4'),
    type: { en: 'Fleet and warehouse management', de: 'Flotten- und Lagermanagement' },
    image: `${CDN}/861556ff89174d4de7464c98ee9f7d4a1628b27c-1600x960.jpg`,
    fit: 'contain',
    blurb: {
      en: 'SEER’s management system for robot fleets and automated warehouses. It assigns orders, plans routes and controls traffic for SEER robots and selected third-party models. Workflows are adapted with low code and Python scripts, and the APIs are open.',
      de: 'Das Managementsystem von SEER für Roboterflotten und automatisierte Lager. Es verteilt Aufträge, plant Wege und regelt den Verkehr für SEER-Roboter und ausgewählte Fremdmodelle. Abläufe lassen sich per Low-Code und Python-Skript anpassen, die Schnittstellen sind offen.',
    },
    specs: [
      { label: { en: 'Fleet size (per SEER)', de: 'Flottengröße (laut SEER)' }, value: { en: '100+ mixed or 300+ of one type per zone', de: '100+ gemischt oder 300+ eines Typs pro Zone' } },
      { label: { en: 'Customisation', de: 'Anpassung' }, value: { en: 'Low code, Python, open APIs', de: 'Low-Code, Python, offene APIs' } },
      { label: { en: 'Desktop tool', de: 'Desktop-Werkzeug' }, value: { en: 'M4 Boot for Windows, macOS, Linux', de: 'M4 Boot für Windows, macOS, Linux' } },
    ],
    tags: ['software'],
    row: { type: { en: 'Fleet management software', de: 'Software Flottenmanagement' }, ...NO_VEHICLE },
  },
  {
    slug: 'seer-rds',
    name: same('SEER RDS'),
    type: { en: 'Robot dispatching system', de: 'Leitsystem für Roboter' },
    image: `${CDN}/da5398393f280a5e5d62538e2d2f7195f9ca3150-1600x693.jpg`,
    fit: 'contain',
    blurb: {
      en: 'Dispatches mobile robots and factory logistics devices in one system. It plans paths for all robots together, avoids congestion and resolves deadlocks. Processes are built with a low-code engine or online scripts, and Roboshop Pro handles maps, configuration and commissioning.',
      de: 'Steuert mobile Roboter und Logistikgeräte der Fabrik in einem System. Es plant die Wege aller Roboter gemeinsam, vermeidet Staus und löst Blockaden auf. Abläufe entstehen per Low-Code oder Online-Skript, Karten, Konfiguration und Inbetriebnahme laufen über Roboshop Pro.',
    },
    specs: [
      { label: { en: 'Process engine', de: 'Ablaufsteuerung' }, value: { en: 'Low code, online scripts', de: 'Low-Code, Online-Skripte' } },
      { label: { en: 'Deployment', de: 'Inbetriebnahme' }, value: same('Roboshop Pro') },
      { label: { en: 'Simulation', de: 'Simulation' }, value: { en: 'Business and dispatch', de: 'Abläufe und Disposition' } },
    ],
    tags: ['software'],
    row: { type: { en: 'Dispatch software', de: 'Software Leitsystem' }, ...NO_VEHICLE },
  },
  {
    slug: 'seer-meta-map',
    name: same('SEER Meta-Map'),
    type: { en: '2D live map of the fleet', de: '2D-Live-Karte der Flotte' },
    image: `${CDN}/33f93ac784e91f2f36a0084bff4ce9cded7bb7e6-905x562.jpg`,
    fit: 'cover',
    blurb: {
      en: 'Shows the factory as a 2D map with the live position and state of every robot. Dashboards are put together by drag and drop, and alarms appear with their cause and a proposed solution.',
      de: 'Zeigt die Fabrik als 2D-Karte mit Position und Zustand aller Roboter in Echtzeit. Dashboards entstehen per Drag-and-drop, Alarme erscheinen mit Ursache und Lösungsvorschlag.',
    },
    specs: [
      { label: { en: 'Templates', de: 'Vorlagen' }, value: { en: 'Operation and maintenance; business', de: 'Betrieb und Wartung; Geschäftsprozesse' } },
      { label: { en: 'Dashboards', de: 'Dashboards' }, value: same('Drag-and-drop') },
    ],
    tags: ['software'],
    row: { type: { en: '2D visualisation', de: '2D-Visualisierung' }, ...NO_VEHICLE },
  },
  {
    slug: 'seer-meta-map-pro',
    name: same('SEER Meta-Map Pro'),
    type: { en: '3D live map', de: '3D-Live-Karte' },
    image: `${CDN}/7d66eafa7f72593810be2d414ede88b346609038-1600x864.jpg`,
    fit: 'cover',
    blurb: {
      en: 'Builds the factory in 3D and shows robots, storage locations and goods with their live status. Status cards give each robot’s current task, destination and load. Restricted areas are set in the system.',
      de: 'Bildet die Fabrik in 3D ab und zeigt Roboter, Lagerplätze und Waren mit Live-Status. Statuskarten nennen Auftrag, Ziel und Ladung jedes Roboters. Sperrbereiche werden im System angelegt.',
    },
    specs: [
      { label: { en: 'Shows', de: 'Zeigt' }, value: { en: 'Robots, storage locations, goods', de: 'Roboter, Lagerplätze, Waren' } },
      { label: { en: 'Areas', de: 'Bereiche' }, value: { en: 'Restricted and mutually exclusive', de: 'Sperr- und Ausschlussbereiche' } },
    ],
    tags: ['software'],
    row: { type: { en: '3D visualisation', de: '3D-Visualisierung' }, ...NO_VEHICLE },
  },
  {
    slug: 'seer-meta-world',
    name: same('SEER Meta-World'),
    type: { en: 'Digital twin', de: 'Digitaler Zwilling' },
    image: `${CDN}/e130ae8b80125b6d60d09bfccd8bb071d0f44c9c-1600x864.jpg`,
    fit: 'cover',
    blurb: {
      en: 'Recreates the factory 1:1 as a digital twin and links the robots in it to the real ones in real time. Speed, battery level, destination and load are visible for each robot.',
      de: 'Bildet die Fabrik 1:1 als digitalen Zwilling nach und koppelt die Roboter darin in Echtzeit mit den echten. Geschwindigkeit, Akkustand, Ziel und Ladung sind für jeden Roboter sichtbar.',
    },
    specs: [
      { label: { en: 'Robot data', de: 'Roboterdaten' }, value: { en: 'Speed, battery, destination, load', de: 'Tempo, Akku, Ziel, Ladung' } },
      { label: { en: 'Display', de: 'Darstellung' }, value: { en: 'Realistic or virtual', de: 'Realistisch oder virtuell' } },
    ],
    tags: ['software'],
    row: { type: { en: 'Digital twin', de: 'Digitaler Zwilling' }, ...NO_VEHICLE },
  },

  // ── Controllers ─────────────────────────────────────────────────────────
  {
    slug: 'seer-src-3000fs',
    name: same('SRC-3000FS'),
    type: { en: 'Safety controller for AMRs', de: 'Sicherheitssteuerung für AMR' },
    image: `${CDN}/aed4487a1a6ab458dd8c1ac8ada3764b72e357ee-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'Navigation, motion control and safety functions in one unit. SEER states PL d (Cat. 3) to ISO 13849-1 and SIL 2 to IEC 61508. It offers 24 digital inputs, gigabit Ethernet with TSN and two sin/cos encoder interfaces, and works from −30 to 55 °C.',
      de: 'Navigation, Bewegungssteuerung und Sicherheitsfunktionen in einem Gerät. SEER nennt PL d (Kat. 3) nach ISO 13849-1 und SIL 2 nach IEC 61508. Er bietet 24 Digitaleingänge, Gigabit-Ethernet mit TSN und zwei Sin/Cos-Encoder-Schnittstellen und arbeitet von −30 bis 55 °C.',
    },
    specs: [
      { label: S.safety, value: same('PL d, SIL 2') },
      { label: S.accuracy, value: same('±5 mm, ±1°') },
      { label: S.map, value: { en: '≤ 400,000 m²', de: '≤ 400.000 m²' } },
      { label: S.ip, value: { en: 'IP52 (IP65 with custom housing)', de: 'IP52 (IP65 mit Sondergehäuse)' } },
    ],
    tags: ['controller', 'ce'],
    row: {
      type: { en: 'AMR safety controller', de: 'AMR-Sicherheitssteuerung' },
      load: NONE,
      lift: NONE,
      nav: same('±5 mm, ±1°'),
      speed: same('≤ 2 m/s'),
      battery: NONE,
      aisle: NONE,
    },
  },
  {
    slug: 'seer-src-880',
    name: same('SRC-880'),
    type: { en: 'Entry-level AMR controller', de: 'Einstiegssteuerung für AMR' },
    image: `${CDN}/8b3600e94087768927c0bc1d21928c8ecc6233f8-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'SEER’s entry-level controller for differential-drive robots, as SRC-880-T or SRC-880-Q. It supports two lidars and one obstacle camera, weighs 0.75 kg and draws less than 12 W.',
      de: 'Die Einstiegssteuerung von SEER für Roboter mit Differenzialantrieb, als SRC-880-T oder SRC-880-Q. Sie unterstützt zwei Lidare und eine Hinderniskamera, wiegt 0,75 kg und braucht weniger als 12 W.',
    },
    specs: [
      { label: S.accuracy, value: same('±5 mm, ±1°') },
      { label: S.map, value: { en: '≤ 400,000 m² (T version)', de: '≤ 400.000 m² (T-Version)' } },
      { label: S.power, value: same('< 12 W') },
      { label: S.ip, value: same('IP20') },
    ],
    tags: ['controller', 'ce'],
    row: {
      type: { en: 'AMR controller', de: 'AMR-Steuerung' },
      load: NONE,
      lift: NONE,
      nav: same('±5 mm, ±1°'),
      speed: same('≤ 2 m/s'),
      battery: NONE,
      aisle: NONE,
    },
  },
  {
    slug: 'seer-src-r10',
    name: same('SRC-R10'),
    type: { en: 'Controller for dual-steering robots', de: 'Steuerung für Roboter mit zwei Lenkantrieben' },
    image: `${CDN}/374472760a2f9f678e145cd24adfd71fa8e2075d-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'A compact controller for robots with two steered drive wheels. It supports two lidars and two cameras, weighs 0.75 kg and draws less than 12 W. A Codesys option lets PLC engineers add their own functions.',
      de: 'Eine kompakte Steuerung für Roboter mit zwei gelenkten Antriebsrädern. Sie unterstützt zwei Lidare und zwei Kameras, wiegt 0,75 kg und braucht weniger als 12 W. Per Codesys-Option ergänzen SPS-Programmierer eigene Funktionen.',
    },
    specs: [
      { label: S.accuracy, value: same('±5 mm, ±1°') },
      { label: S.map, value: { en: '≤ 400,000 m²', de: '≤ 400.000 m²' } },
      { label: same('Codesys'), value: { en: 'Optional', de: 'Optional' } },
      { label: S.ip, value: same('IP20') },
    ],
    tags: ['controller', 'ce'],
    row: {
      type: { en: 'AMR controller', de: 'AMR-Steuerung' },
      load: NONE,
      lift: NONE,
      nav: same('±5 mm, ±1°'),
      speed: same('≤ 2 m/s'),
      battery: NONE,
      aisle: NONE,
    },
  },
  {
    slug: 'seer-src-r25',
    name: same('SRC-R25'),
    type: { en: 'AMR controller with 3D SLAM', de: 'AMR-Steuerung mit 3D-SLAM' },
    image: `${CDN}/ee6f3a7719dd12050c771379ba2eb1422230bbce-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'SEER’s newer general-purpose AMR controller with 3D SLAM, EtherCAT, CAN FD and Wi-Fi 6. It runs on 48 V and supports rerouting and deadlock recovery between several robots. Over-the-air updates can be rolled back.',
      de: 'Die neuere universelle AMR-Steuerung von SEER mit 3D-SLAM, EtherCAT, CAN FD und Wi-Fi 6. Sie arbeitet mit 48 V und unterstützt Umfahrungen und das Auflösen von Blockaden zwischen mehreren Robotern. Over-the-Air-Updates lassen sich zurücksetzen.',
    },
    specs: [
      { label: S.accuracy, value: same('±5 mm, ±1°') },
      { label: { en: 'Interfaces', de: 'Schnittstellen' }, value: same('EtherCAT, CAN FD, Wi-Fi 6') },
      { label: { en: 'Supply', de: 'Versorgung' }, value: same('48 V') },
      { label: S.ip, value: same('IP42') },
    ],
    tags: ['controller', 'ce'],
    row: {
      type: { en: 'AMR controller', de: 'AMR-Steuerung' },
      load: NONE,
      lift: NONE,
      nav: { en: '3D SLAM, ±5 mm', de: '3D-SLAM, ±5 mm' },
      speed: same('≤ 2 m/s'),
      battery: NONE,
      aisle: NONE,
    },
  },
  {
    slug: 'seer-src-2000-i-s',
    name: same('SRC-2000-I(S)'),
    type: { en: 'General-purpose AMR controller', de: 'Universelle AMR-Steuerung' },
    image: `${CDN}/6cd50f4048099e5bb202e3979a0e4464db049acb-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'Controls navigation and motion of mobile robots. It maps areas of up to 400,000 m², positions to ±5 mm and connects lidars, drives and peripherals over Ethernet, CAN and RS485. 3D sensors for obstacle detection can be added.',
      de: 'Steuert Navigation und Bewegung mobiler Roboter. Sie kartiert Flächen bis 400.000 m², positioniert auf ±5 mm und bindet Lidare, Antriebe und Peripherie über Ethernet, CAN und RS485 an. 3D-Sensoren zur Hinderniserkennung lassen sich ergänzen.',
    },
    specs: [
      { label: S.accuracy, value: same('±5 mm, ±1°') },
      { label: S.map, value: { en: '≤ 400,000 m²', de: '≤ 400.000 m²' } },
      { label: S.power, value: same('48 W') },
      { label: S.ip, value: same('IP42') },
    ],
    tags: ['controller', 'ce'],
    row: {
      type: { en: 'AMR controller', de: 'AMR-Steuerung' },
      load: NONE,
      lift: NONE,
      nav: same('±5 mm, ±1°'),
      speed: same('≤ 2 m/s'),
      battery: NONE,
      aisle: NONE,
    },
  },
  {
    slug: 'seer-src-f10',
    name: same('SRC-F10'),
    type: { en: 'Controller for pallet robots', de: 'Steuerung für Palettenroboter' },
    image: `${CDN}/c8a2b1f09c227dbea1dccf583097d1eee10307e5-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'A compact controller for pallet robots with one steered drive wheel. It supports three lidars and two cameras, weighs 0.75 kg and draws less than 12 W. A Codesys option lets PLC engineers add their own functions.',
      de: 'Eine kompakte Steuerung für Palettenroboter mit einem gelenkten Antriebsrad. Sie unterstützt drei Lidare und zwei Kameras, wiegt 0,75 kg und braucht weniger als 12 W. Per Codesys-Option ergänzen SPS-Programmierer eigene Funktionen.',
    },
    specs: [
      { label: S.accuracy, value: same('±5 mm, ±1°') },
      { label: S.map, value: { en: '≤ 400,000 m²', de: '≤ 400.000 m²' } },
      { label: same('Codesys'), value: { en: 'Optional', de: 'Optional' } },
      { label: S.ip, value: same('IP20') },
    ],
    tags: ['controller', 'ce'],
    row: {
      type: { en: 'Forklift controller', de: 'Staplersteuerung' },
      load: NONE,
      lift: NONE,
      nav: same('±5 mm, ±1°'),
      speed: same('≤ 2 m/s'),
      battery: NONE,
      aisle: NONE,
    },
  },
  {
    slug: 'seer-src-f25',
    name: same('SRC-F25'),
    type: { en: 'Forklift controller with 3D SLAM', de: 'Staplersteuerung mit 3D-SLAM' },
    image: `${CDN}/0b7e08315e16d79d65bdcea23bb7c51a4931bac5-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'SEER’s newer controller for autonomous forklifts, with 3D SLAM, EtherCAT, CAN FD and Wi-Fi 6. It runs on 24 V. Over-the-air updates can be rolled back, and data is protected if power fails.',
      de: 'Die neuere Steuerung von SEER für autonome Gabelstapler, mit 3D-SLAM, EtherCAT, CAN FD und Wi-Fi 6. Sie arbeitet mit 24 V. Over-the-Air-Updates lassen sich zurücksetzen, Daten bleiben bei Stromausfall geschützt.',
    },
    specs: [
      { label: S.accuracy, value: same('±5 mm, ±1°') },
      { label: { en: 'Interfaces', de: 'Schnittstellen' }, value: same('EtherCAT, CAN FD, Wi-Fi 6') },
      { label: { en: 'Supply', de: 'Versorgung' }, value: same('24 V') },
      { label: S.ip, value: same('IP42') },
    ],
    tags: ['controller', 'ce'],
    row: {
      type: { en: 'Forklift controller', de: 'Staplersteuerung' },
      load: NONE,
      lift: NONE,
      nav: { en: '3D SLAM, ±5 mm', de: '3D-SLAM, ±5 mm' },
      speed: same('≤ 2 m/s'),
      battery: NONE,
      aisle: NONE,
    },
  },
  {
    slug: 'seer-src-2000-f-s',
    name: same('SRC-2000-F(S)'),
    type: { en: 'Forklift controller', de: 'Staplersteuerung' },
    image: `${CDN}/ec80a27488b3e84c19575379c5208c4f44c4848f-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'The forklift version of the SRC-2000. It brings the forklift functions, calibrates vehicles with one steered drive wheel and reaches ±2 mm accuracy with reflectors at speeds of up to 2 m/s.',
      de: 'Die Staplerausführung des SRC-2000. Sie bringt die Staplerfunktionen mit, kalibriert Fahrzeuge mit einem gelenkten Antriebsrad und erreicht mit Reflektoren ±2 mm Genauigkeit bei bis zu 2 m/s.',
    },
    specs: [
      { label: S.accuracy, value: { en: '±2 mm, ±1° (reflector)', de: '±2 mm, ±1° (Reflektor)' } },
      { label: S.map, value: { en: '≤ 400,000 m²', de: '≤ 400.000 m²' } },
      { label: S.power, value: same('48 W') },
      { label: S.ip, value: same('IP42') },
    ],
    tags: ['controller', 'ce'],
    row: {
      type: { en: 'Forklift controller', de: 'Staplersteuerung' },
      load: NONE,
      lift: NONE,
      nav: { en: '±2 mm with reflectors', de: '±2 mm mit Reflektoren' },
      speed: same('≤ 2 m/s'),
      battery: NONE,
      aisle: NONE,
    },
  },
  {
    slug: 'seer-src-3000fs-forklift',
    name: same('SRC-3000FS (Forklift)'),
    type: { en: 'Safety controller for forklifts', de: 'Sicherheitssteuerung für Stapler' },
    image: `${CDN}/a846102f504a7c1540e3b099e8b69920d29fb518-1000x1000.png`,
    fit: 'contain',
    blurb: {
      en: 'The forklift version of the SRC-3000FS adds forklift functions and calibration for vehicles with one steered drive wheel. SEER states PL d to ISO 13849-1, SIL 2 to IEC 61508 and up to ±2 mm accuracy with reflectors.',
      de: 'Die Staplerausführung des SRC-3000FS ergänzt Staplerfunktionen und die Kalibrierung für Fahrzeuge mit einem gelenkten Antriebsrad. SEER nennt PL d nach ISO 13849-1, SIL 2 nach IEC 61508 und bis zu ±2 mm Genauigkeit mit Reflektoren.',
    },
    specs: [
      { label: S.safety, value: same('PL d, SIL 2') },
      { label: S.accuracy, value: { en: '±2 mm, ±1° (reflector)', de: '±2 mm, ±1° (Reflektor)' } },
      { label: S.map, value: { en: '≤ 400,000 m²', de: '≤ 400.000 m²' } },
      { label: S.ip, value: { en: 'IP52 (IP65 with custom housing)', de: 'IP52 (IP65 mit Sondergehäuse)' } },
    ],
    tags: ['controller', 'ce'],
    row: {
      type: { en: 'Forklift safety controller', de: 'Stapler-Sicherheitssteuerung' },
      load: NONE,
      lift: NONE,
      nav: { en: '±2 mm with reflectors', de: '±2 mm mit Reflektoren' },
      speed: same('≤ 2 m/s'),
      battery: NONE,
      aisle: NONE,
    },
  },
]

export const content: LandingContent = {
  meta: {
    title: {
      en: 'AMR, AGV & Autonomous Forklifts Compared | MegaRobotics',
      de: 'AMR, FTS & autonome Gabelstapler kaufen | MegaRobotics',
    },
    description: {
      en: 'Autonomous mobile robots (AMR), AGVs and autonomous forklifts from SEER compared: payload, lift height, laser SLAM navigation and fleet management.',
      de: 'Autonome mobile Roboter (AMR), FTS und fahrerlose Gabelstapler von SEER im Vergleich: Traglast, Hubhöhe, Laser-SLAM-Navigation und Flottenmanagement.',
    },
    crumb: { en: 'Mobile robots', de: 'Mobile Roboter' },
  },

  heroSlugs: [],
  heroImage: {
    src: `${CDN}/e130ae8b80125b6d60d09bfccd8bb071d0f44c9c-1600x864.jpg`,
    fit: 'cover',
    alt: {
      en: 'SEER Meta-World rendering: a lifting AMR with a shelf and autonomous pallet trucks in a warehouse',
      de: 'Darstellung aus SEER Meta-World: Hub-AMR mit Regal und autonome Hubwagen in einem Lager',
    },
  },
  hero: { carousel: { en: 'Mobile robots in our range', de: 'Mobile Roboter in unserem Programm' } },

  intro: {
    eyebrow: { en: 'AMR, AGV and autonomous forklifts', de: 'AMR, FTS und autonome Gabelstapler' },
    title: {
      en: 'Buy mobile robots: AMRs, AGVs and autonomous forklifts',
      de: 'Mobile Roboter kaufen: AMR, FTS und autonome Gabelstapler',
    },
    lead: {
      en: 'Our range for intralogistics on one page: {count} products from SEER Robotics, from the 150 kg AMR base to the 3 t autonomous forklift, plus fleet software and controllers.',
      de: 'Unser Programm für die Intralogistik auf einer Seite: {count} Produkte von SEER Robotics, von der AMR-Basis für 150 kg bis zum autonomen Gabelstapler für 3 t, dazu Flottensoftware und Steuerungen.',
    },
    body: {
      en: 'An autonomous mobile robot finds its own way through the building by laser SLAM. Some carry shelves or totes, others lift pallets into racking. The right one depends on the load carrier, the lift height and how wide your aisles are.',
      de: 'Ein autonomer mobiler Roboter findet seinen Weg durchs Gebäude selbst, per Laser-SLAM. Manche tragen Regale oder Behälter, andere heben Paletten ins Regal. Welcher passt, hängt vom Ladungsträger, von der Hubhöhe und von der Breite Ihrer Gänge ab.',
    },
    jobs: [
      {
        icon: 'Forklift',
        title: { en: 'Pallets in the warehouse', de: 'Paletten im Lager' },
        body: {
          en: 'Goods receipt, dispatch and racking up to 4,000 mm.',
          de: 'Wareneingang, Versand und Einlagern bis 4.000 mm.',
        },
        models: ['seer-sfl-cbd15', 'seer-sss-2000eu', 'seer-scb-2000eu'],
      },
      {
        icon: 'Factory',
        title: { en: 'Line feeding', de: 'Linienversorgung' },
        body: {
          en: 'Shelves, racks and tote dollies to the next station.',
          de: 'Regale, Gestelle und Behälterroller zur nächsten Station.',
        },
        models: ['seer-slr-1000eu', 'seer-sjv-sw600', 'seer-sof-300eu'],
      },
      {
        icon: 'Wrench',
        title: { en: 'Building your own AMR', de: 'Eigenes AMR aufbauen' },
        body: {
          en: 'A base for your top module, or a controller for your own vehicle.',
          de: 'Eine Basis für Ihren Aufbau oder eine Steuerung für Ihr eigenes Fahrzeug.',
        },
        models: ['seer-sba-400eu', 'seer-src-r25', 'seer-src-3000fs'],
      },
      {
        icon: 'Warehouse',
        title: { en: 'Running the fleet', de: 'Flotte steuern' },
        body: {
          en: 'Orders, routes and traffic for many robots, with a live view.',
          de: 'Aufträge, Wege und Verkehr für viele Roboter, mit Live-Ansicht.',
        },
        models: ['seer-m4', 'seer-rds', 'seer-meta-world'],
      },
    ],
  },

  facts: [
    { value: { en: '3,000 kg', de: '3.000 kg' }, label: { en: 'max. rated load (SCB-3000EU, SFL-CBD30)', de: 'max. Nennlast (SCB-3000EU, SFL-CBD30)' } },
    { value: { en: '4,000 mm', de: '4.000 mm' }, label: { en: 'max. lift height (SCB-2000EU)', de: 'max. Hubhöhe (SCB-2000EU)' } },
    { value: same('640 mm'), label: { en: 'narrowest aisle for an AMR (AMB-300JZ)', de: 'schmalster Gang für einen AMR (AMB-300JZ)' } },
    { value: same('12–15 h'), label: { en: 'per charge on the SCB-2000EU', de: 'pro Akkuladung beim SCB-2000EU' } },
    { value: same('±5 mm'), label: { en: 'position accuracy of the AMRs', de: 'Positioniergenauigkeit der AMR' } },
    { value: { en: '400,000 m²', de: '400.000 m²' }, label: { en: 'max. map area of the SEER controllers', de: 'max. Kartenfläche der SEER-Steuerungen' } },
  ],

  groups: [
    {
      id: 'amr-bases',
      nav: { en: 'AMR bases', de: 'AMR-Basis' },
      eyebrow: { en: 'Autonomous mobile robots', de: 'Autonome mobile Roboter' },
      title: { en: 'AMR bases for your own top modules', de: 'AMR-Basisfahrzeuge für eigene Aufbauten' },
      lead: {
        en: 'A mobile base carries whatever you mount on it: a roller conveyor, a lift, a robot arm or a towing unit. The four SEER bases carry 150 to 400 kg and navigate by laser SLAM with ±5 mm position accuracy.',
        de: 'Eine mobile Basis trägt, was Sie darauf montieren: Rollenförderer, Hubmodul, Roboterarm oder Schleppeinheit. Die vier Basisfahrzeuge von SEER tragen 150 bis 400 kg und navigieren per Laser-SLAM mit ±5 mm Positioniergenauigkeit.',
      },
      body: {
        en: 'If you plan a cobot on a mobile base, the base sets the height, the payload and the interfaces. SBA-400EU and AMB-300XS bring I/O, CAN and RS485 for the top module.',
        de: 'Wer einen Cobot auf eine mobile Basis setzen will, legt mit der Basis Höhe, Traglast und Schnittstellen fest. SBA-400EU und AMB-300XS bringen I/O, CAN und RS485 für den Aufbau mit.',
      },
      points: [
        {
          en: 'CE marking for all four according to SEER, with ISO 3691-4 stated for SBA-400EU and AMB-300XS',
          de: 'CE-Kennzeichnung für alle vier laut SEER, ISO 3691-4 genannt für SBA-400EU und AMB-300XS',
        },
        {
          en: 'AMB-300XS: cleanliness ISO Class 4 for electronics and semiconductor production',
          de: 'AMB-300XS: Reinheitsklasse ISO 4 für Elektronik- und Halbleiterfertigung',
        },
        {
          en: '12 h per charge on AMB-150, AMB-300 and AMB-300XS, with fast battery swap',
          de: '12 h pro Akkuladung bei AMB-150, AMB-300 und AMB-300XS, mit schnellem Akkuwechsel',
        },
      ],
      manufacturer: 'seer-robotics',
      feature: 'seer-sba-400eu',
      models: ['seer-amb-150', 'seer-amb-300', 'seer-amb-300xs'],
    },
    {
      id: 'lifting-amr',
      nav: { en: 'Lifting AMRs', de: 'Hub-AMR' },
      eyebrow: { en: 'Shelf and rack transport', de: 'Regal- und Gestelltransport' },
      title: { en: 'Lifting AMRs for shelves, racks and totes', de: 'Hub-AMR für Regale, Gestelle und Behälter' },
      lead: {
        en: 'These robots drive under a shelf or rack, lift it by 60 mm and take it to the next station. Loads range from 300 kg on the AMB-300JZ to 1,000 kg on the SLR-1000EU. The SPK-M50J-ZQ takes totes straight from the shelf instead.',
        de: 'Diese Roboter unterfahren ein Regal oder Gestell, heben es um 60 mm an und bringen es zur nächsten Station. Die Lasten reichen von 300 kg beim AMB-300JZ bis 1.000 kg beim SLR-1000EU. Der SPK-M50J-ZQ holt dagegen Behälter direkt aus dem Regalfach.',
      },
      points: [
        {
          en: 'AMB-300JZ fits aisles from 640 mm',
          de: 'AMB-300JZ passt in Gänge ab 640 mm',
        },
        {
          en: 'SJV-SW600: the lifting plate turns on its own, so the shelf keeps its orientation',
          de: 'SJV-SW600: Die Hubplatte dreht unabhängig, das Regal behält seine Ausrichtung',
        },
        {
          en: 'SLR-1000EU with CE to ISO 3691-4 according to SEER; for AMB-300JZ, SJV-SW600 and SPK-M50J-ZQ SEER lists no CE marking',
          de: 'SLR-1000EU mit CE nach ISO 3691-4 laut SEER; für AMB-300JZ, SJV-SW600 und SPK-M50J-ZQ nennt SEER keine CE-Kennzeichnung',
        },
      ],
      manufacturer: 'seer-robotics',
      feature: 'seer-slr-1000eu',
      models: ['seer-amb-300jz', 'seer-sjv-sw600', 'seer-spk-m50j-zq'],
    },
    {
      id: 'pallet-trucks',
      nav: { en: 'Pallet trucks', de: 'Hubwagen' },
      eyebrow: { en: 'Autonomous pallet trucks', de: 'Autonome Hubwagen' },
      title: { en: 'Autonomous pallet trucks for floor-level transport', de: 'Autonome Palettenhubwagen für den Horizontaltransport' },
      lead: {
        en: 'Low-lift trucks move pallets from goods receipt to the line or to dispatch. SFL-CBD15, SFL-CBD20 and SFL-CBD30 carry 1,500, 2,000 and 3,000 kg and lift by 205 mm. The flat SPT-1000 is 556 mm high and takes 1,000 kg.',
        de: 'Niederhubwagen bringen Paletten vom Wareneingang an die Linie oder in den Versand. SFL-CBD15, SFL-CBD20 und SFL-CBD30 tragen 1.500, 2.000 und 3.000 kg und heben um 205 mm. Der flache SPT-1000 ist 556 mm hoch und nimmt 1.000 kg auf.',
      },
      body: {
        en: 'For tote dollies and small shelves in narrow aisles there is the SOF-300EU, a single-fork vehicle 500 mm wide that turns within an 800 mm radius.',
        de: 'Für Behälterroller und kleine Regale in schmalen Gängen gibt es den SOF-300EU, ein Einzelgabel-Fahrzeug mit 500 mm Breite und 800 mm Wenderadius.',
      },
      points: [
        {
          en: 'SFL-CBD15-CE with SICK safety lidars and 8 to 10 h per charge',
          de: 'SFL-CBD15-CE mit SICK-Sicherheitslidaren und 8 bis 10 h pro Akkuladung',
        },
        {
          en: 'SFL-CBD20 and SFL-CBD30: battery swap in about 3 minutes',
          de: 'SFL-CBD20 und SFL-CBD30: Akkuwechsel in rund 3 Minuten',
        },
        {
          en: 'SFL-300L, 400 mm wide, is the version of the SOF-300EU without CE marking',
          de: 'SFL-300L mit 400 mm Breite ist die Ausführung des SOF-300EU ohne CE-Kennzeichnung',
        },
      ],
      manufacturer: 'seer-robotics',
      feature: 'seer-sfl-cbd15',
      models: ['seer-sfl-cbd20', 'seer-sfl-cbd30', 'seer-spt-1000', 'seer-sof-300eu'],
    },
    {
      id: 'stackers',
      nav: { en: 'Stackers', de: 'Hochhubwagen' },
      eyebrow: { en: 'Autonomous stackers', de: 'Autonome Hochhubwagen' },
      title: { en: 'Driverless stackers for pallets up to 3 m high', de: 'Fahrerlose Hochhubwagen für Paletten bis 3 m' },
      lead: {
        en: 'Stackers put pallets into racking and stack them on the floor. The four models lift 1,000 to 2,000 kg and reach up to 3,000 mm.',
        de: 'Hochhubwagen lagern Paletten ins Regal ein und stapeln sie am Boden. Die vier Modelle heben 1.000 bis 2.000 kg und reichen bis 3.000 mm.',
      },
      body: {
        en: 'The SOS-1000 drives forwards, sideways and diagonally, and with up to 1,000 kg it moves laterally in aisles of 1.8 m.',
        de: 'Der SOS-1000 fährt vorwärts, seitwärts und diagonal und bewegt sich mit bis zu 1.000 kg in 1,8 m breiten Gängen quer.',
      },
      points: [
        {
          en: 'Pallet and cage stacking standard on SSS-2000EU and SSS-1400EU',
          de: 'Paletten- und Gitterboxstapeln serienmäßig bei SSS-2000EU und SSS-1400EU',
        },
        {
          en: 'SSS-1500EU adjusts its protective field while driving, with safety controller, SICK safety lidars and safety encoders',
          de: 'SSS-1500EU passt das Schutzfeld während der Fahrt an, mit Sicherheitssteuerung, SICK-Sicherheitslidaren und Sicherheitsencodern',
        },
        {
          en: 'CE to ISO 3691-4 for SSS-1400EU, SSS-1500EU and SSS-2000EU according to SEER',
          de: 'CE nach ISO 3691-4 für SSS-1400EU, SSS-1500EU und SSS-2000EU laut SEER',
        },
      ],
      manufacturer: 'seer-robotics',
      feature: 'seer-sss-2000eu',
      models: ['seer-sss-1500eu', 'seer-sfl-cdd14', 'seer-sos-1000'],
    },
    {
      id: 'autonomous-forklifts',
      nav: { en: 'Forklifts', de: 'Gabelstapler' },
      eyebrow: { en: 'Counterbalance and reach trucks', de: 'Fahrerlose Gabelstapler' },
      title: { en: 'Autonomous forklifts for loads up to 3 t', de: 'Autonome Gabelstapler: Gegengewicht und Schubmast bis 3 t' },
      lead: {
        en: 'Counterbalance forklifts take open and closed pallets and lift up to 4,000 mm. SCB-2000EU and SCB-3000EU carry 2,000 and 3,000 kg; the reach truck SSR-1400EU stores 1,400 kg at up to 3 m.',
        de: 'Gegengewichtsstapler nehmen offene und geschlossene Paletten auf und heben bis 4.000 mm. SCB-2000EU und SCB-3000EU tragen 2.000 und 3.000 kg, der Schubmaststapler SSR-1400EU lagert 1.400 kg in bis zu 3 m Höhe ein.',
      },
      body: {
        en: 'The SCB-2000EU runs 12 to 15 hours per charge. The forks adjust from 400 to 700 mm on SCB-1400, SCB-2000EU and SSR-1400EU, and from 450 to 750 mm on the SCB-3000EU.',
        de: 'Der SCB-2000EU fährt 12 bis 15 Stunden pro Akkuladung. Die Gabeln sind bei SCB-1400, SCB-2000EU und SSR-1400EU von 400 bis 700 mm verstellbar, beim SCB-3000EU von 450 bis 750 mm.',
      },
      points: [
        {
          en: 'CE to ISO 3691-4 for SCB-2000EU, SCB-3000EU and SSR-1400EU according to SEER',
          de: 'CE nach ISO 3691-4 für SCB-2000EU, SCB-3000EU und SSR-1400EU laut SEER',
        },
        {
          en: 'Reach truck also as SSR-1400 without CE marking and as SSR-1400US, certified to UL 583 for the US according to SEER',
          de: 'Schubmaststapler auch als SSR-1400 ohne CE-Kennzeichnung und als SSR-1400US, laut SEER nach UL 583 für die USA zertifiziert',
        },
        {
          en: 'SFL-CPD20-Y and SFL-CPD30-Y are the versions of SCB-2000EU and SCB-3000EU without CE marking',
          de: 'SFL-CPD20-Y und SFL-CPD30-Y sind die Ausführungen von SCB-2000EU und SCB-3000EU ohne CE-Kennzeichnung',
        },
      ],
      manufacturer: 'seer-robotics',
      feature: 'seer-scb-2000eu',
      models: ['seer-scb-3000eu', 'seer-ssr-1400eu', 'seer-scb-1400'],
    },
    {
      id: 'fleet-management',
      nav: { en: 'Software', de: 'Software' },
      eyebrow: { en: 'Fleet management', de: 'Flottenmanagement' },
      title: { en: 'Fleet management and digital twin', de: 'Flottenmanagement und digitaler Zwilling' },
      lead: {
        en: 'A single robot can work from its own controller. Once several share the floor, a fleet manager assigns orders, plans routes and controls traffic. SEER offers two systems for this, RDS and M4, and three tools to visualise the fleet.',
        de: 'Ein einzelner Roboter kommt mit seiner eigenen Steuerung aus. Sobald sich mehrere die Fläche teilen, verteilt ein Flottenmanager Aufträge, plant Wege und regelt den Verkehr. SEER hat dafür zwei Systeme, RDS und M4, und drei Werkzeuge zur Visualisierung.',
      },
      body: {
        en: 'According to SEER, M4 handles 100 or more robots of mixed types per zone and opens its workflows to low code, Python scripts and open APIs. RDS also dispatches factory logistics devices and comes with Roboshop Pro for maps and commissioning.',
        de: 'Laut SEER steuert M4 pro Zone 100 oder mehr Roboter verschiedener Typen und öffnet seine Abläufe für Low-Code, Python-Skripte und offene Schnittstellen. RDS bindet zusätzlich Logistikgeräte der Fabrik ein und bringt Roboshop Pro für Karten und Inbetriebnahme mit.',
      },
      points: [
        {
          en: 'Meta-Map: 2D live map with drag-and-drop dashboards',
          de: 'Meta-Map: 2D-Live-Karte mit Dashboards per Drag-and-drop',
        },
        {
          en: 'Meta-Map Pro: 3D view of robots, storage locations and goods',
          de: 'Meta-Map Pro: 3D-Ansicht von Robotern, Lagerplätzen und Waren',
        },
        {
          en: 'Meta-World: 1:1 digital twin linked to the real robots in real time',
          de: 'Meta-World: digitaler Zwilling im Maßstab 1:1, in Echtzeit mit den echten Robotern gekoppelt',
        },
      ],
      manufacturer: 'seer-robotics',
      feature: 'seer-m4',
      models: ['seer-rds', 'seer-meta-map', 'seer-meta-map-pro', 'seer-meta-world'],
    },
    {
      id: 'controllers',
      nav: { en: 'Controllers', de: 'Steuerungen' },
      eyebrow: { en: 'Build your own AMR', de: 'Eigene AMR bauen' },
      title: { en: 'Mobile robot controllers for your own vehicle', de: 'Steuerungen für eigene mobile Roboter und FTF' },
      lead: {
        en: 'If you build your own vehicle, a SEER controller handles navigation and motion control. It positions to ±5 mm, supports vehicle speeds up to 2 m/s and connects lidars, drives and peripherals. Most models map areas of up to 400,000 m².',
        de: 'Wer ein eigenes Fahrzeug baut, überlässt Navigation und Bewegungssteuerung einer SEER-Steuerung. Sie positioniert auf ±5 mm, unterstützt bis 2 m/s Fahrgeschwindigkeit und bindet Lidare, Antriebe und Peripherie an. Die meisten Modelle kartieren Flächen bis 400.000 m².',
      },
      body: {
        en: 'SRC-880, SRC-R10, SRC-R25 and SRC-2000-I(S) are made for AMRs; SRC-F10, SRC-F25 and the F(S) versions for forklifts. SRC-3000FS adds safety functions with PL d and SIL 2, according to SEER.',
        de: 'SRC-880, SRC-R10, SRC-R25 und SRC-2000-I(S) sind für AMR gedacht, SRC-F10, SRC-F25 und die F(S)-Ausführungen für Stapler. Der SRC-3000FS ergänzt laut SEER Sicherheitsfunktionen mit PL d und SIL 2.',
      },
      points: [
        {
          en: 'SRC-R25 and SRC-F25: 3D SLAM, EtherCAT, CAN FD and Wi-Fi 6',
          de: 'SRC-R25 und SRC-F25: 3D-SLAM, EtherCAT, CAN FD und Wi-Fi 6',
        },
        {
          en: '±2 mm with reflectors on SRC-2000-F(S) and SRC-3000FS (Forklift)',
          de: '±2 mm mit Reflektoren bei SRC-2000-F(S) und SRC-3000FS (Forklift)',
        },
        {
          en: 'Codesys option on SRC-R10 and SRC-F10 for PLC engineers',
          de: 'Codesys-Option bei SRC-R10 und SRC-F10 für SPS-Programmierer',
        },
      ],
      manufacturer: 'seer-robotics',
      feature: 'seer-src-3000fs',
      models: [
        'seer-src-880',
        'seer-src-r10',
        'seer-src-r25',
        'seer-src-2000-i-s',
        'seer-src-f10',
        'seer-src-f25',
        'seer-src-2000-f-s',
        'seer-src-3000fs-forklift',
      ],
    },
  ],

  explainer: {
    eyebrow: { en: 'Basics', de: 'Grundlagen' },
    title: {
      en: 'AMR vs. AGV: what sets autonomous mobile robots apart',
      de: 'AMR oder FTS? Der Unterschied zwischen AMR und AGV',
    },
    paragraphs: [
      {
        en: 'AGV stands for automated guided vehicle. In German it is an FTF, a fahrerloses Transportfahrzeug, and the whole installation with its control system is an FTS, a fahrerloses Transportsystem. A classic AGV follows a fixed track: magnetic tape, a wire in the floor or a grid of QR codes. That works reliably, but every new route means work on the floor.',
        de: 'AGV steht für Automated Guided Vehicle, auf Deutsch fahrerloses Transportfahrzeug (FTF). Die ganze Anlage mit Leitsteuerung heißt fahrerloses Transportsystem, kurz FTS. Ein klassisches FTF folgt einer festen Spur: Magnetband, Leitdraht im Boden oder ein Raster aus QR-Codes. Das läuft zuverlässig, aber jede neue Strecke bedeutet Arbeit am Boden.',
      },
      {
        en: 'An autonomous mobile robot (AMR) builds a map of the building from its laser scanners and localises itself in it. This is laser SLAM, short for simultaneous localisation and mapping. A new route is a change in the map, not on the floor. Every SEER vehicle on this page navigates by laser SLAM; on several models QR codes or reflectors are optional where a station needs extra precision.',
        de: 'Ein autonomer mobiler Roboter (AMR) erstellt mit seinen Laserscannern eine Karte des Gebäudes und ortet sich darin selbst. Das nennt man Laser-SLAM, kurz für Simultaneous Localization and Mapping. Eine neue Strecke ist eine Änderung in der Karte, nicht am Boden. Alle SEER-Fahrzeuge auf dieser Seite navigieren per Laser-SLAM, bei mehreren Modellen sind QR-Codes oder Reflektoren optional, wenn eine Station mehr Präzision braucht.',
      },
      {
        en: 'In everyday German both are often called FTS, and many AMRs replace classic AGVs today. The practical difference for you: an AMR needs no track in the floor, and the layout can change without construction work.',
        de: 'Im deutschen Sprachgebrauch fasst man beides oft unter FTS zusammen, und viele AMR ersetzen heute klassische FTF. Der praktische Unterschied für Sie: Ein AMR braucht keine Spur im Boden, und das Layout lässt sich ohne Bauarbeiten ändern.',
      },
      {
        en: 'Autonomous forklifts apply the same idea to pallets. Pallet trucks move loads at floor level, stackers and reach trucks put them into racking, and counterbalance forklifts take heavier loads and closed pallets. Pallet recognition identifies the load carrier, and 3D obstacle avoidance adds cameras to the lidars.',
        de: 'Autonome Gabelstapler übertragen das Prinzip auf Paletten. Niederhubwagen bewegen Lasten am Boden, Hochhubwagen und Schubmaststapler lagern sie ins Regal ein, Gegengewichtsstapler nehmen schwerere Lasten und geschlossene Paletten auf. Die Palettenerkennung identifiziert den Ladungsträger, die 3D-Hinderniserkennung ergänzt die Lidare um Kameras.',
      },
      {
        en: 'The safety standard for driverless industrial trucks is ISO 3691-4. SEER states CE certification to it for SBA-400EU, AMB-300XS, SLR-1000EU and the EU versions of its forklifts. For models where SEER lists no CE marking, use in the EU has to be checked before you order. Typical jobs are goods receipt and dispatch, line feeding, production logistics and warehousing, with a fleet manager such as RDS or M4 tying the robots together.',
        de: 'Die Sicherheitsnorm für fahrerlose Flurförderzeuge ist die ISO 3691-4. SEER nennt eine CE-Zertifizierung danach für SBA-400EU, AMB-300XS, SLR-1000EU und die EU-Ausführungen seiner Stapler. Bei Modellen ohne CE-Kennzeichnung laut SEER muss der Einsatz in der EU vor der Bestellung geprüft werden. Typische Aufgaben sind Wareneingang und Versand, Linienversorgung, Produktionslogistik und Lager, verbunden über einen Flottenmanager wie RDS oder M4.',
      },
    ],
  },

  compare: {
    eyebrow: { en: 'Comparison', de: 'Vergleich' },
    title: { en: 'All mobile robots and forklifts side by side', de: 'Alle mobilen Roboter und Stapler im Vergleich' },
    subtitle: {
      en: 'Pick what matters and the table narrows down. All values are SEER data.',
      de: 'Wählen Sie, was zählt, dann wird die Tabelle kürzer. Alle Werte sind Angaben von SEER.',
    },
    filters: [
      { key: 'pallet', label: { en: 'Pallets', de: 'Paletten' } },
      { key: 'highlift', label: { en: 'High lift (1.6 m and more)', de: 'Hochhub (ab 1,6 m)' } },
      { key: 'carrier', label: { en: 'Shelves, totes, top modules', de: 'Regale, Behälter, Aufbauten' } },
      { key: 'ce', label: { en: 'CE marking per SEER', de: 'CE-Kennzeichnung laut SEER' } },
      { key: 'software', label: { en: 'Software', de: 'Software' } },
      { key: 'controller', label: { en: 'Controllers', de: 'Steuerungen' } },
    ],
    cols: [
      { key: 'type', label: { en: 'Type', de: 'Typ' } },
      { key: 'load', label: { en: 'Rated load', de: 'Nennlast' } },
      { key: 'lift', label: { en: 'Lift height', de: 'Hubhöhe' } },
      { key: 'nav', label: { en: 'Navigation, accuracy', de: 'Navigation, Genauigkeit' } },
      { key: 'speed', label: { en: 'Max. speed', de: 'Max. Geschwindigkeit' } },
      { key: 'battery', label: { en: 'Battery life', de: 'Akkulaufzeit' } },
      { key: 'aisle', label: { en: 'Aisle width', de: 'Gangbreite' } },
    ],
    foot: {
      en: '– means SEER gives no value or the value does not apply, as for software and controllers. Speed with a slash: loaded / unloaded; for controllers, the vehicle speed they support. Aisle width: minimum aisle for AMRs; for forklifts the aisle SEER states for an 800 × 1200 mm pallet, written as SEER gives it. Lift for lifting AMRs is the stroke. For SFL-CBD15 and SFL-CDD14 the CE marking applies to the CE versions SFL-CBD15-CE and SSS-1400EU. All values are manufacturer data.',
      de: '– bedeutet: SEER nennt keinen Wert oder der Wert trifft nicht zu, etwa bei Software und Steuerungen. Geschwindigkeit mit Schrägstrich: beladen / unbeladen, bei Steuerungen die unterstützte Fahrgeschwindigkeit. Gangbreite: minimale Gangbreite bei AMR, bei Staplern die Gangbreite, die SEER für eine Palette 800 × 1200 mm angibt, in der Schreibweise von SEER. Bei Hub-AMR ist die Hubhöhe der Hub. Bei SFL-CBD15 und SFL-CDD14 gilt die CE-Kennzeichnung für die CE-Ausführungen SFL-CBD15-CE und SSS-1400EU. Alle Werte sind Herstellerangaben.',
    },
  },

  choose: {
    eyebrow: { en: 'Before you buy', de: 'Vor dem Kauf' },
    title: { en: 'How to choose the right mobile robot', de: 'So finden Sie den passenden mobilen Roboter' },
    items: [
      {
        title: { en: 'Load carrier', de: 'Ladungsträger' },
        body: {
          en: 'Pallet, cage, shelf, tote or tote dolly: the carrier decides the vehicle type. Note the weight of the heaviest load, including the carrier.',
          de: 'Palette, Gitterbox, Regal, Behälter oder Behälterroller: Der Ladungsträger bestimmt den Fahrzeugtyp. Notieren Sie das Gewicht der schwersten Last samt Ladungsträger.',
        },
      },
      {
        title: { en: 'Lift height', de: 'Hubhöhe' },
        body: {
          en: 'Pallet trucks lift by 190 to 205 mm, enough for floor-level transport. Racking needs a stacker or forklift; in our range the masts reach 1,600 to 4,000 mm.',
          de: 'Niederhubwagen heben um 190 bis 205 mm, das genügt für den Transport am Boden. Fürs Regal braucht es einen Hochhubwagen oder Stapler, in unserem Programm reichen die Masten von 1.600 bis 4.000 mm.',
        },
      },
      {
        title: { en: 'Aisles and turning', de: 'Gänge und Wenden' },
        body: {
          en: 'Measure your narrowest aisle and any lifts. The AMB-300JZ manages 640 mm, the SOF-300EU is 500 mm wide; pallet forklifts need far more room.',
          de: 'Messen Sie Ihren schmalsten Gang und eventuelle Aufzüge. Der AMB-300JZ kommt mit 640 mm aus, der SOF-300EU ist 500 mm breit, Palettenstapler brauchen deutlich mehr Platz.',
        },
      },
      {
        title: { en: 'Navigation and accuracy', de: 'Navigation und Genauigkeit' },
        body: {
          en: 'All vehicles here use laser SLAM. AMRs position to ±5 mm, forklifts to ±10 mm. For tighter handover points, reflectors or QR codes are optional on several models.',
          de: 'Alle Fahrzeuge hier navigieren per Laser-SLAM. AMR positionieren auf ±5 mm, Stapler auf ±10 mm. Für engere Übergabestellen sind bei mehreren Modellen Reflektoren oder QR-Codes optional.',
        },
      },
      {
        title: { en: 'Battery and shifts', de: 'Akku und Schichtbetrieb' },
        body: {
          en: 'Runtimes range from 4 to 15 hours per charge, depending on the model. Automatic charging and fast battery swap keep the fleet running across shifts.',
          de: 'Die Laufzeiten reichen je nach Modell von 4 bis 15 Stunden pro Akkuladung. Automatisches Laden und schneller Akkuwechsel halten die Flotte über mehrere Schichten in Betrieb.',
        },
      },
      {
        title: { en: 'CE and safety', de: 'CE und Sicherheit' },
        body: {
          en: 'For the EU, choose models for which SEER states CE to ISO 3691-4. For the others we clarify conformity documents with SEER before you order.',
          de: 'Für die EU wählen Sie Modelle, für die SEER CE nach ISO 3691-4 nennt. Bei den übrigen klären wir die Konformitätsunterlagen mit SEER, bevor Sie bestellen.',
        },
      },
    ],
  },

  faq: {
    eyebrow: { en: 'Questions', de: 'Fragen' },
    title: { en: 'Mobile robots and AMRs: frequent questions', de: 'Mobile Roboter und AMR: häufige Fragen' },
    items: [
      {
        q: { en: 'What does an AMR or an autonomous forklift cost?', de: 'Was kostet ein AMR oder ein fahrerloser Gabelstapler?' },
        a: {
          en: 'That depends on the model and its configuration, for example lift height, safety equipment, charging station and fleet software. We give the price in a quote for your configuration.',
          de: 'Das hängt vom Modell und seiner Ausstattung ab, etwa von Hubhöhe, Sicherheitstechnik, Ladestation und Flottensoftware. Den Preis nennen wir im Angebot für Ihre Konfiguration.',
        },
      },
      {
        q: { en: 'AMR vs. AGV: what is the difference?', de: 'AMR oder FTS: Was ist der Unterschied?' },
        a: {
          en: 'A classic AGV, in German FTF or FTS, follows a fixed track such as magnetic tape or QR codes in the floor. An AMR navigates by laser SLAM on a map of the building, so routes change in software. All SEER vehicles on this page are laser SLAM vehicles, with QR codes or reflectors as an option on several models.',
          de: 'Ein klassisches fahrerloses Transportfahrzeug (FTF, im Gesamtsystem FTS) folgt einer festen Spur wie Magnetband oder QR-Codes im Boden. Ein AMR navigiert per Laser-SLAM auf einer Karte des Gebäudes, Strecken ändern Sie also in der Software. Alle SEER-Fahrzeuge auf dieser Seite fahren mit Laser-SLAM, bei mehreren Modellen sind QR-Codes oder Reflektoren optional.',
        },
      },
      {
        q: { en: 'Which models have a CE marking?', de: 'Welche Modelle haben eine CE-Kennzeichnung?' },
        a: {
          en: 'SEER states CE to ISO 3691-4 for SBA-400EU, AMB-300XS, SLR-1000EU, SOF-300EU, SFL-CBD15-CE, SSS-1400EU, SSS-1500EU, SSS-2000EU, SCB-2000EU, SCB-3000EU and SSR-1400EU, and CE for AMB-150 and AMB-300. For the other vehicles SEER lists no CE marking, so EU use has to be checked first. All SEER controllers carry CE.',
          de: 'SEER nennt CE nach ISO 3691-4 für SBA-400EU, AMB-300XS, SLR-1000EU, SOF-300EU, SFL-CBD15-CE, SSS-1400EU, SSS-1500EU, SSS-2000EU, SCB-2000EU, SCB-3000EU und SSR-1400EU sowie CE für AMB-150 und AMB-300. Für die übrigen Fahrzeuge nennt SEER keine CE-Kennzeichnung, der Einsatz in der EU muss vorab geprüft werden. Alle SEER-Steuerungen tragen CE.',
        },
      },
      {
        q: { en: 'How high can an autonomous forklift lift?', de: 'Wie hoch hebt ein autonomer Gabelstapler?' },
        a: {
          en: 'The SCB-2000EU lifts to 4,000 mm, the SCB-3000EU to 3,500 mm. SSR-1400EU, SCB-1400, SSS-1400EU and the SSS-2000EU with the long mast reach 3,000 mm, the SSS-1500EU 2,944 mm. Pallet trucks such as the SFL-CBD15 lift by 205 mm for floor-level transport only.',
          de: 'Der SCB-2000EU hebt auf 4.000 mm, der SCB-3000EU auf 3.500 mm. SSR-1400EU, SCB-1400, SSS-1400EU und der SSS-2000EU mit langem Mast erreichen 3.000 mm, der SSS-1500EU 2.944 mm. Niederhubwagen wie der SFL-CBD15 heben nur um 205 mm, für den Transport am Boden.',
        },
      },
      {
        q: { en: 'How narrow can the aisles be?', de: 'Wie schmal dürfen die Gänge sein?' },
        a: {
          en: 'Among the AMRs, the AMB-300JZ needs 640 mm and the AMB-150 700 mm. The SOF-300EU is 500 mm wide and turns within 800 mm. For pallet vehicles SEER states the aisle for an 800 × 1200 mm pallet, from 1,800 + 200 mm on the SPT-1000 to 3,417 + 300 mm on the SCB-3000EU with the 3,500 mm mast.',
          de: 'Bei den AMR braucht der AMB-300JZ 640 mm und der AMB-150 700 mm. Der SOF-300EU ist 500 mm breit und wendet mit 800 mm Radius. Für Palettenfahrzeuge nennt SEER die Gangbreite mit einer Palette 800 × 1200 mm, von 1.800 + 200 mm beim SPT-1000 bis 3.417 + 300 mm beim SCB-3000EU mit 3.500-mm-Mast.',
        },
      },
      {
        q: { en: 'How long does the battery last?', de: 'Wie lange hält der Akku?' },
        a: {
          en: 'AMB-150, AMB-300 and AMB-300XS run 12 hours per charge, the SCB-2000EU 12 to 15 hours and the SOF-300EU 6 hours. Most vehicles charge manually or automatically; the AMB bases also allow a fast battery swap, and on the SFL-CBD20 and SFL-CBD30 a swap takes about 3 minutes.',
          de: 'AMB-150, AMB-300 und AMB-300XS fahren 12 Stunden pro Akkuladung, der SCB-2000EU 12 bis 15 Stunden und der SOF-300EU 6 Stunden. Die meisten Fahrzeuge laden manuell oder automatisch, die AMB-Basisfahrzeuge erlauben zusätzlich einen schnellen Akkuwechsel, bei SFL-CBD20 und SFL-CBD30 dauert er rund 3 Minuten.',
        },
      },
      {
        q: { en: 'Do I need fleet management software?', de: 'Brauche ich eine Software für das Flottenmanagement?' },
        a: {
          en: 'As soon as several robots share routes, yes. SEER RDS and M4 assign orders, plan routes and resolve congestion; according to SEER, M4 handles 100 or more robots of mixed types per zone. Meta-Map, Meta-Map Pro and Meta-World add a live 2D or 3D view and a digital twin.',
          de: 'Sobald sich mehrere Roboter die Wege teilen, ja. SEER RDS und M4 verteilen Aufträge, planen Wege und lösen Staus auf, M4 steuert laut SEER pro Zone 100 oder mehr Roboter verschiedener Typen. Meta-Map, Meta-Map Pro und Meta-World ergänzen eine Live-Ansicht in 2D oder 3D und einen digitalen Zwilling.',
        },
      },
      {
        q: { en: 'Can I build my own AMR with a SEER controller?', de: 'Kann ich mit einer SEER-Steuerung ein eigenes AMR bauen?' },
        a: {
          en: 'Yes, that is what the SRC controllers are for. The SRC-880 is the entry model for differential-drive robots, the SRC-R25 and SRC-F25 bring 3D SLAM and EtherCAT, and the SRC-3000FS adds safety functions with PL d and SIL 2 according to SEER. Most models map areas of up to 400,000 m².',
          de: 'Ja, dafür sind die SRC-Steuerungen gedacht. Der SRC-880 ist das Einstiegsmodell für Roboter mit Differenzialantrieb, SRC-R25 und SRC-F25 bringen 3D-SLAM und EtherCAT mit, der SRC-3000FS ergänzt laut SEER Sicherheitsfunktionen mit PL d und SIL 2. Die meisten Modelle kartieren Flächen bis 400.000 m².',
        },
      },
      {
        q: { en: 'Does laser SLAM navigation need reflectors in the building?', de: 'Braucht die Laser-SLAM-Navigation Reflektoren im Gebäude?' },
        a: {
          en: 'No. The SLR-1000EU, for example, navigates without reflectors and reaches ±5 mm. Reflectors are an option where a station needs more precision: the SRC-2000-F(S) forklift controller reaches ±2 mm with them.',
          de: 'Nein. Der SLR-1000EU zum Beispiel navigiert ohne Reflektoren und erreicht ±5 mm. Reflektoren sind eine Option, wenn eine Station mehr Präzision braucht: Die Staplersteuerung SRC-2000-F(S) erreicht damit ±2 mm.',
        },
      },
    ],
  },

  related: [
    { href: '/solutions/amr-agv', label: { en: 'AMR, AGV and intralogistics: our solution page', de: 'AMR, FTS und Intralogistik: unsere Lösungsseite' } },
    { href: '/manufacturers/seer-robotics', label: { en: 'All products from SEER Robotics', de: 'Alle Produkte von SEER Robotics' } },
    { href: '/pages/palletizing-robots', label: { en: 'Palletizing robots', de: 'Palettierroboter' } },
    { href: '/pages/cobots', label: { en: 'Cobots for mobile manipulation', de: 'Cobots für die mobile Manipulation' } },
    { href: '/products/categories/robot-platforms', label: { en: 'All robot platforms', de: 'Alle Roboterplattformen' } },
    { href: '/products/categories/software-hmi-scada-digital-twin', label: { en: 'Software, HMI, SCADA and digital twin', de: 'Software, HMI, SCADA und digitaler Zwilling' } },
    { href: '/products/categories/plc-control-industrial-automation', label: { en: 'PLC, control and industrial automation', de: 'SPS, Steuerung und Industrieautomation' } },
  ],

  cta: {
    eyebrow: { en: 'Advice and quote', de: 'Beratung und Angebot' },
    title: { en: 'Tell us what your robots should move', de: 'Sagen Sie uns, was Ihre Roboter bewegen sollen' },
    body: {
      en: 'Describe the loads, load carriers, aisle widths and lift heights. We come back with the models that fit and a quote.',
      de: 'Beschreiben Sie Lasten, Ladungsträger, Gangbreiten und Hubhöhen. Wir melden uns mit passenden Modellen und einem Angebot.',
    },
    button: { en: 'Send an enquiry', de: 'Anfrage senden' },
    subject: { en: 'Mobile robots and autonomous forklifts', de: 'Mobile Roboter und autonome Gabelstapler' },
  },

  fine: [
    {
      en: 'Technical data are SEER information and may change. The binding data are those in the quote.',
      de: 'Technische Daten sind Angaben von SEER und können sich ändern. Verbindlich sind die Angaben im Angebot.',
    },
    {
      en: 'CE marking and ISO 3691-4 as stated by SEER. Where SEER lists no CE marking, we check intended use and conformity documents with SEER for each enquiry. SFL-CBD15 and SFL-CDD14 entries cover two versions each; their values differ where the table says so.',
      de: 'CE-Kennzeichnung und ISO 3691-4 nach Angabe von SEER. Wo SEER keine CE-Kennzeichnung nennt, klären wir bestimmungsgemäße Verwendung und Konformitätsunterlagen bei jeder Anfrage mit SEER. Die Einträge SFL-CBD15 und SFL-CDD14 umfassen je zwei Ausführungen, ihre Werte unterscheiden sich, wo die Tabelle es angibt.',
    },
    {
      en: 'Images are product pictures, renderings and screenshots by SEER; the opening picture is a rendering from Meta-World. SFL-CBD20 and SFL-CBD30 are shown with the same picture. Product names and trademarks belong to their owners.',
      de: 'Bilder sind Produktfotos, Visualisierungen und Bildschirmansichten von SEER, das Eingangsbild ist eine Darstellung aus Meta-World. SFL-CBD20 und SFL-CBD30 sind mit demselben Bild gezeigt. Produktnamen und Marken gehören ihren Inhabern.',
    },
  ],
}
