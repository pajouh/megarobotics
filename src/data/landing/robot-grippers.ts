// Content for the robot gripper buying page at /pages/robot-grippers (and /de/...).
//
// Every figure comes from the products' published Sanity entries
// (specifications, tagline, features, description). A dash in the comparison
// means the manufacturer gives no value there, or the column does not apply
// (tool changers, sensors, vision and process tools have no gripping force).
// The Franka accessories LWR50L-03, Cobot Pump, ECBPMi and MATCH have no
// specifications in Sanity yet, so their cards carry no figures.

import { CDN, NONE, same, type LandingContent, type LandingModel } from './types'

const S = {
  payload: { en: 'Payload', de: 'Traglast' },
  formFit: { en: 'Payload, form fit', de: 'Traglast Formschluss' },
  forceFit: { en: 'Payload, force fit', de: 'Traglast Kraftschluss' },
  stroke: { en: 'Stroke', de: 'Hub' },
  gripRange: { en: 'Grip range, external', de: 'Greifbereich außen' },
  gripDia: { en: 'Grip diameter, external', de: 'Greifdurchmesser außen' },
  force: { en: 'Gripping force', de: 'Greifkraft' },
  weight: { en: 'Weight', de: 'Gewicht' },
  ip: { en: 'Protection', de: 'Schutzart' },
  cups: { en: 'Vacuum cups', de: 'Sauger' },
  channels: { en: 'Channels', de: 'Kanäle' },
  airflow: { en: 'Air flow', de: 'Luftstrom' },
  dof: { en: 'Degrees of freedom', de: 'Freiheitsgrade' },
  flange: { en: 'Flange', de: 'Flansch' },
  interface: { en: 'Interface', de: 'Schnittstelle' },
  repeat: { en: 'Repeatability', de: 'Wiederholgenauigkeit' },
  drive: { en: 'Drive', de: 'Antrieb' },
  robot: { en: 'Robot', de: 'Roboter' },
}

const ELECTRIC = { en: 'Electric', de: 'Elektrisch' }

const T = {
  parallel: { en: '2-finger parallel', de: '2-Finger-Parallel' },
  three: { en: '3-finger centric', de: '3-Finger-Zentrisch' },
  vacuum: { en: 'Vacuum, electric', de: 'Vakuum, elektrisch' },
  changer: { en: 'Tool changer', de: 'Werkzeugwechsler' },
}

export const MODELS: LandingModel[] = [
  // Two-finger parallel grippers
  {
    slug: 'onrobot-2fg7-parallel-gripper',
    name: same('OnRobot 2FG7'),
    type: { en: 'Electric parallel gripper', de: 'Elektrischer Parallelgreifer' },
    image: `${CDN}/c6c244ac1bd5daab7c4d7994b025c0b1925508d1-434x680.png`,
    fit: 'contain',
    blurb: {
      en: 'Compact two-finger gripper for machine tending, assembly and electronics. IP67 and ISO Class 5 cleanroom certified, with grip and lost-grip detection, and it holds the part if power is lost.',
      de: 'Kompakter Zweifingergreifer für Maschinenbeschickung, Montage und Elektronikfertigung. IP67 und Reinraum nach ISO-Klasse 5, mit Grifferkennung und Erkennung verlorener Griffe. Bei Stromausfall hält er das Teil.',
    },
    specs: [
      { label: S.formFit, value: same('11 kg') },
      { label: S.gripRange, value: same('1–73 mm') },
      { label: S.force, value: same('20–140 N') },
      { label: S.ip, value: same('IP67') },
    ],
    tags: ['finger', 'ip67'],
    row: {
      type: T.parallel,
      payload: same('7 / 11 kg*'),
      range: { en: '1–73 mm (ext.)', de: '1–73 mm (außen)' },
      force: same('20–140 N'),
      weight: { en: '1.1 kg', de: '1,1 kg' },
      energy: ELECTRIC,
      ip: same('IP67'),
    },
  },
  {
    slug: 'onrobot-2fg14-parallel-gripper',
    name: same('OnRobot 2FG14'),
    type: { en: 'High-force parallel gripper', de: 'Parallelgreifer mit hoher Kraft' },
    image: `${CDN}/c4a475a49a7c61505ace3d72f9e2ed64fdab5e4a-680x680.png`,
    fit: 'contain',
    blurb: {
      en: 'For heavier CNC workpieces. IP67 against coolant and chips, a reinforced finger platform for your own fingers and a force sensor in one finger.',
      de: 'Für schwerere Werkstücke an der CNC-Maschine. IP67 gegen Kühlschmierstoff und Späne, eine verstärkte Fingerplattform für eigene Finger und ein Kraftsensor in einem Finger.',
    },
    specs: [
      { label: S.formFit, value: same('20 kg') },
      { label: S.gripRange, value: same('5–105 mm') },
      { label: S.force, value: same('40–280 N') },
      { label: S.ip, value: same('IP67') },
    ],
    tags: ['finger', 'ip67'],
    row: {
      type: T.parallel,
      payload: same('14 / 20 kg*'),
      range: { en: '5–105 mm (ext.)', de: '5–105 mm (außen)' },
      force: same('40–280 N'),
      weight: { en: '1.5 kg', de: '1,5 kg' },
      energy: ELECTRIC,
      ip: same('IP67'),
    },
  },
  {
    slug: 'onrobot-rg2-finger-gripper',
    name: same('OnRobot RG2'),
    type: { en: 'Electric finger gripper, long stroke', de: 'Elektrischer Fingergreifer, langer Hub' },
    image: `${CDN}/9ce5b7eb0b731dfdf94129c2c6eee876338acc94-299x680.png`,
    fit: 'contain',
    blurb: {
      en: 'One tool for many part sizes: the stroke adjusts up to 110 mm. Calculates TCP and payload by itself and keeps the fingers parallel to the work surface.',
      de: 'Ein Werkzeug für viele Teilegrößen: Der Hub lässt sich bis 110 mm einstellen. Berechnet TCP und Traglast selbst und hält die Finger parallel zur Arbeitsfläche.',
    },
    specs: [
      { label: S.formFit, value: same('5 kg') },
      { label: S.stroke, value: same('0–110 mm') },
      { label: S.force, value: same('3–40 N') },
      { label: S.weight, value: { en: '0.78 kg', de: '0,78 kg' } },
    ],
    tags: ['finger'],
    row: {
      type: { en: '2-finger, angular', de: '2-Finger, Schwenkfinger' },
      payload: same('2 / 5 kg*'),
      range: { en: '0–110 mm (stroke)', de: '0–110 mm (Hub)' },
      force: same('3–40 N'),
      weight: { en: '0.78 kg', de: '0,78 kg' },
      energy: ELECTRIC,
      ip: same('IP54'),
    },
  },
  {
    slug: 'onrobot-rg2-ft-finger-gripper',
    name: same('OnRobot RG2-FT'),
    type: { en: 'Finger gripper with fingertip sensing', de: 'Fingergreifer mit Sensorik in den Fingerspitzen' },
    image: `${CDN}/084abd2d6acdd65a62eddf927dc98b238c15ded8-268x680.png`,
    fit: 'contain',
    blurb: {
      en: 'A six-axis force/torque sensor in each fingertip and a proximity sensor up to 100 mm. Detects the risk of slipping before it happens, which helps with fragile parts.',
      de: 'Ein Sechs-Achs-Kraft-Momenten-Sensor in jeder Fingerspitze und ein Näherungssensor bis 100 mm. Erkennt drohendes Rutschen, bevor es passiert, das hilft bei empfindlichen Teilen.',
    },
    specs: [
      { label: S.formFit, value: same('4 kg') },
      { label: S.stroke, value: same('0–100 mm') },
      { label: S.force, value: same('3–40 N') },
      { label: { en: 'Proximity range', de: 'Näherungssensor' }, value: same('0–100 mm') },
    ],
    tags: ['finger'],
    row: {
      type: { en: '2-finger, F/T sensing', de: '2-Finger, Kraftsensorik' },
      payload: same('2 / 4 kg*'),
      range: { en: '0–100 mm (stroke)', de: '0–100 mm (Hub)' },
      force: same('3–40 N'),
      weight: { en: '0.98 kg', de: '0,98 kg' },
      energy: ELECTRIC,
      ip: same('IP54'),
    },
  },
  {
    slug: 'onrobot-rg6-finger-gripper',
    name: same('OnRobot RG6'),
    type: { en: 'Electric finger gripper, 160 mm stroke', de: 'Elektrischer Fingergreifer, 160 mm Hub' },
    image: `${CDN}/23ef2028f444f4f4b1407c7069f3a23fe3a88712-422x680.png`,
    fit: 'contain',
    blurb: {
      en: 'The larger sibling of the RG2, for big and varied workpieces. Built-in Quick Changer, automatic TCP and payload calculation, customisable fingertips.',
      de: 'Der größere Bruder des RG2, für große und wechselnde Werkstücke. Mit eingebautem Quick Changer, automatischer TCP- und Traglastberechnung und anpassbaren Fingerspitzen.',
    },
    specs: [
      { label: S.formFit, value: same('10 kg') },
      { label: S.stroke, value: same('0–160 mm') },
      { label: S.force, value: same('25–120 N') },
      { label: S.weight, value: { en: '1.25 kg', de: '1,25 kg' } },
    ],
    tags: ['finger'],
    row: {
      type: { en: '2-finger, angular', de: '2-Finger, Schwenkfinger' },
      payload: same('6 / 10 kg*'),
      range: { en: '0–160 mm (stroke)', de: '0–160 mm (Hub)' },
      force: same('25–120 N'),
      weight: { en: '1.25 kg', de: '1,25 kg' },
      energy: ELECTRIC,
      ip: same('IP54'),
    },
  },
  {
    slug: 'tekken-d',
    name: same('Agile Robots Tekken D'),
    type: { en: 'Electric gripper with force control', de: 'Elektrogreifer mit Kraftregelung' },
    image: `${CDN}/230c1295c9cb47c0a3b416f40d79ea9b0cbc644f-1120x1160.jpg`,
    fit: 'cover',
    blurb: {
      en: 'Two-finger gripper for automation and research, with position, force and tactile control modes. The fingertips can take the VT10-G vision-based tactile sensor. Modbus RTU over RS-485.',
      de: 'Zweifingergreifer für Automatisierung und Forschung, mit Positions-, Kraft- und Tastregelung. An den Fingerspitzen lässt sich der optische Tastsensor VT10-G montieren. Modbus RTU über RS-485.',
    },
    specs: [
      { label: S.payload, value: same('3 kg') },
      { label: S.stroke, value: same('80 mm') },
      { label: { en: 'Max. gripping force', de: 'Max. Greifkraft' }, value: same('80 N') },
      { label: S.repeat, value: { en: '±0.05 mm', de: '±0,05 mm' } },
    ],
    tags: ['finger'],
    row: {
      type: T.parallel,
      payload: same('3 kg'),
      range: { en: '80 mm (stroke)', de: '80 mm (Hub)' },
      force: { en: 'max. 80 N', de: 'max. 80 N' },
      weight: { en: '1.2 kg (2.0 kg with VT10-G)', de: '1,2 kg (2,0 kg mit VT10-G)' },
      energy: ELECTRIC,
      ip: NONE,
    },
  },

  // Franka
  {
    slug: 'franka-hand',
    name: same('Franka Hand'),
    type: { en: 'Two-finger gripper for Franka arms', de: 'Zweifingergreifer für Franka-Arme' },
    image: `${CDN}/e550fc7cd3eecb7e6e6868ba9d734e316ee021ca-1455x1200.png`,
    fit: 'contain',
    blurb: {
      en: 'The standard gripper for Franka robot arms, designed and built by Franka Robotics in Germany. Power and data run through the robot flange, so there is no external cabling and no separate controller. You activate it in the Desk interface, and the fingertips can be adapted or 3D-printed for your parts.',
      de: 'Der Standardgreifer für Franka-Roboterarme, entwickelt und gebaut von Franka Robotics in Deutschland. Strom und Daten laufen über den Roboterflansch, es gibt also keine externe Verkabelung und keinen eigenen Controller. Aktiviert wird er in der Oberfläche Desk, die Fingerspitzen lassen sich anpassen oder im 3D-Druck fertigen.',
    },
    specs: [
      { label: S.weight, value: same('730 g') },
      { label: S.flange, value: same('DIN ISO 9409-1-A50') },
      { label: { en: 'Power and data', de: 'Strom und Daten' }, value: { en: 'Through the robot flange', de: 'Über den Roboterflansch' } },
      { label: { en: 'Dimensions (W × L × H)', de: 'Maße (B × L × H)' }, value: same('63 × 205 × 127 mm') },
    ],
    tags: ['finger'],
    row: {
      type: T.parallel,
      payload: NONE,
      range: NONE,
      force: NONE,
      weight: same('730 g'),
      energy: ELECTRIC,
      ip: NONE,
    },
  },
  {
    slug: 'franka-lwr50l-03-electric-gripper',
    name: same('LWR50L-03 Electric Parallel Gripper'),
    type: { en: 'Electric parallel gripper for FR3', de: 'Elektrischer Parallelgreifer für den FR3' },
    image: `${CDN}/d42acaec3e5c2d2b396d7963eb8a83db9e06ccf1-450x355.jpg`,
    fit: 'cover',
    blurb: {
      en: 'Lightweight two-finger gripper for the Franka Research 3 with MATCH-compatible mounting, for assembly and small parts.',
      de: 'Leichter Zweifingergreifer für den Franka Research 3 mit MATCH-kompatibler Montage, für Montage und Kleinteile.',
    },
    specs: [
      { label: S.drive, value: ELECTRIC },
      { label: { en: 'Mounting', de: 'Montage' }, value: { en: 'MATCH-compatible', de: 'MATCH-kompatibel' } },
    ],
    tags: ['finger'],
    row: {
      type: T.parallel,
      payload: NONE,
      range: NONE,
      force: NONE,
      weight: NONE,
      energy: ELECTRIC,
      ip: NONE,
    },
  },
  {
    slug: 'franka-cobot-pump-schmalz',
    name: same('Cobot Pump (by Schmalz)'),
    type: { en: 'Electric vacuum generator for FR3', de: 'Elektrischer Vakuumerzeuger für den FR3' },
    image: `${CDN}/7e1d21aa3cd4dbba836409ddced87638d405f7be-806x665.png`,
    fit: 'contain',
    blurb: {
      en: 'Developed with Schmalz and sold through the Franka accessory catalogue. Plug and play on the Franka Research 3 for flat, airtight and slightly porous parts, without compressed air.',
      de: 'Zusammen mit Schmalz entwickelt und über den Zubehörkatalog von Franka erhältlich. Plug and play am Franka Research 3 für flache, luftdichte und leicht poröse Teile, ohne Druckluft.',
    },
    specs: [
      { label: { en: 'Vacuum', de: 'Vakuum' }, value: { en: 'Electric, no compressed air', de: 'Elektrisch, ohne Druckluft' } },
      { label: S.robot, value: same('Franka Research 3') },
    ],
    tags: ['vacuum'],
    row: {
      type: T.vacuum,
      payload: NONE,
      range: NONE,
      force: NONE,
      weight: NONE,
      energy: ELECTRIC,
      ip: NONE,
    },
  },
  {
    slug: 'franka-ecbpmi-match-vacuum-generator',
    name: same('ECBPMi MATCH Vacuum Generator'),
    type: { en: 'Electric vacuum generator for MATCH', de: 'Elektrischer Vakuumerzeuger für MATCH' },
    image: `${CDN}/4e27a8b11ffaa329980cc95d7e1205ccd082eea7-400x400.png`,
    fit: 'contain',
    blurb: {
      en: 'Compact electric vacuum generator made for the MATCH platform, for vacuum pick and place on the Franka Research 3.',
      de: 'Kompakter elektrischer Vakuumerzeuger für die MATCH-Plattform, für Pick and Place mit Vakuum am Franka Research 3.',
    },
    specs: [
      { label: { en: 'Vacuum', de: 'Vakuum' }, value: { en: 'Electric, no air supply', de: 'Elektrisch, ohne Druckluft' } },
      { label: { en: 'Platform', de: 'Plattform' }, value: same('MATCH') },
    ],
    tags: ['vacuum'],
    row: {
      type: T.vacuum,
      payload: NONE,
      range: NONE,
      force: NONE,
      weight: NONE,
      energy: ELECTRIC,
      ip: NONE,
    },
  },
  {
    slug: 'franka-match-end-of-arm-platform',
    name: same('MATCH End-of-Arm Platform'),
    type: { en: 'Tool-change platform for FR3', de: 'Werkzeugwechsel-Plattform für den FR3' },
    image: `${CDN}/0ae506d5aa78c4e62af964fb52f3833fda7039e6-1000x1000.jpg`,
    fit: 'cover',
    blurb: {
      en: 'Lets one Franka Research 3 switch between vacuum and mechanical grippers without manual changeover. Useful for cells that run mixed tasks.',
      de: 'Damit wechselt ein Franka Research 3 ohne manuelles Umrüsten zwischen Vakuum- und Mechanikgreifern. Sinnvoll für Zellen mit gemischten Aufgaben.',
    },
    specs: [
      { label: { en: 'Switches between', de: 'Wechselt zwischen' }, value: { en: 'Vacuum and mechanical grippers', de: 'Vakuum- und Mechanikgreifern' } },
      { label: S.robot, value: same('Franka Research 3') },
    ],
    tags: ['tooling'],
    row: {
      type: T.changer,
      payload: NONE,
      range: NONE,
      force: NONE,
      weight: NONE,
      energy: NONE,
      ip: NONE,
    },
  },

  // Three-finger grippers
  {
    slug: 'onrobot-3fg15-three-finger-gripper',
    name: same('OnRobot 3FG15'),
    type: { en: 'Centric three-finger gripper', de: 'Zentrischer Dreifingergreifer' },
    image: `${CDN}/f2f60ff79824acb96b5d741b1c21032ec3d5d6db-487x680.png`,
    fit: 'contain',
    blurb: {
      en: 'Three contact points centre cylindrical parts by themselves, which makes it a good fit for loading lathe chucks. Grips outside and inside, with four fingertip types in steel and silicone.',
      de: 'Drei Kontaktpunkte zentrieren zylindrische Teile von selbst, das passt gut zum Beladen von Drehfuttern. Greift außen und innen, mit vier Fingerspitzen aus Stahl und Silikon.',
    },
    specs: [
      { label: S.formFit, value: same('15 kg') },
      { label: S.gripDia, value: same('4–152 mm') },
      { label: S.force, value: same('10–240 N') },
      { label: S.ip, value: same('IP67') },
    ],
    tags: ['finger', 'ip67'],
    row: {
      type: T.three,
      payload: same('10 / 15 kg*'),
      range: { en: 'Ø 4–152 mm (ext.)', de: 'Ø 4–152 mm (außen)' },
      force: same('10–240 N'),
      weight: { en: '1.15 kg', de: '1,15 kg' },
      energy: ELECTRIC,
      ip: same('IP67'),
    },
  },
  {
    slug: 'onrobot-3fg25-three-finger-gripper',
    name: same('OnRobot 3FG25'),
    type: { en: 'Heavy-duty three-finger gripper', de: 'Dreifingergreifer für schwere Teile' },
    image: `${CDN}/66bbeb1efa31e9da51e8049bd725e9c0d8b4a9a8-551x680.png`,
    fit: 'contain',
    blurb: {
      en: 'For heavier round parts up to 25 kg and up to 450 N gripping force. The fingers mount in three positions for different force and diameter ranges.',
      de: 'Für schwerere runde Teile bis 25 kg und bis 450 N Greifkraft. Die Finger lassen sich in drei Positionen montieren, je nach Kraft- und Durchmesserbereich.',
    },
    specs: [
      { label: S.formFit, value: same('25 kg') },
      { label: S.gripDia, value: same('18–155 mm') },
      { label: S.force, value: same('50–450 N') },
      { label: S.ip, value: same('IP67') },
    ],
    tags: ['finger', 'ip67'],
    row: {
      type: T.three,
      payload: same('15 / 25 kg*'),
      range: { en: 'Ø 18–155 mm (ext.)', de: 'Ø 18–155 mm (außen)' },
      force: same('50–450 N'),
      weight: { en: '1.6 kg', de: '1,6 kg' },
      energy: ELECTRIC,
      ip: same('IP67'),
    },
  },

  // Vacuum and palletizing grippers
  {
    slug: 'onrobot-vgp20-vacuum-gripper',
    name: same('OnRobot VGP20'),
    type: { en: 'Electric vacuum gripper for palletizing', de: 'Elektrischer Vakuumgreifer zum Palettieren' },
    image: `${CDN}/fbfa7fbca8f6d23a45986080d4a9bd9f68d3807f-1275x680.png`,
    fit: 'contain',
    blurb: {
      en: 'OnRobot’s strongest electric vacuum gripper, with four independent channels and 48 L/min air flow. It also holds porous material such as thin and recycled cardboard. Optional air-flow monitoring stops the robot if vacuum is lost.',
      de: 'Der stärkste elektrische Vakuumgreifer von OnRobot, mit vier unabhängigen Kanälen und 48 L/min Luftstrom. Er hält auch poröses Material wie dünne und recycelte Kartonage. Eine optionale Luftstromüberwachung stoppt den Roboter, wenn das Vakuum abreißt.',
    },
    specs: [
      { label: S.payload, value: { en: '10 kg typical, 20 kg max.', de: '10 kg typisch, 20 kg max.' } },
      { label: S.channels, value: same('4') },
      { label: S.airflow, value: same('48 L/min') },
      { label: S.weight, value: { en: '2.55 kg', de: '2,55 kg' } },
    ],
    tags: ['vacuum'],
    row: {
      type: T.vacuum,
      payload: { en: '10 kg (max. 20 kg)', de: '10 kg (max. 20 kg)' },
      range: { en: '1–16 cups (24)', de: '1–16 Sauger (24)' },
      force: NONE,
      weight: { en: '2.55 kg', de: '2,55 kg' },
      energy: ELECTRIC,
      ip: same('IP54'),
    },
  },
  {
    slug: 'onrobot-vgc10-vacuum-gripper',
    name: same('OnRobot VGC10'),
    type: { en: 'Compact electric vacuum gripper', de: 'Kompakter elektrischer Vakuumgreifer' },
    image: `${CDN}/990a6433bf5c1ac92f20f97ac2fe4ec1dc3b883a-487x680.png`,
    fit: 'contain',
    blurb: {
      en: 'Small enough for tight spaces and light robot arms. Two independent channels, an adaptor plate with seven holes for your own cup layout and an integrated pump.',
      de: 'Klein genug für enge Bauräume und leichte Roboterarme. Zwei unabhängige Kanäle, eine Adapterplatte mit sieben Bohrungen für eigene Saugerbilder und eine integrierte Pumpe.',
    },
    specs: [
      { label: S.payload, value: { en: '6 kg, up to 15 kg customised', de: '6 kg, angepasst bis 15 kg' } },
      { label: S.channels, value: same('2') },
      { label: S.cups, value: same('1–7') },
      { label: S.weight, value: { en: '0.814 kg', de: '0,814 kg' } },
    ],
    tags: ['vacuum'],
    row: {
      type: T.vacuum,
      payload: { en: '6 kg (up to 15 kg)', de: '6 kg (bis 15 kg)' },
      range: { en: '1–7 cups', de: '1–7 Sauger' },
      force: NONE,
      weight: { en: '0.814 kg', de: '0,814 kg' },
      energy: ELECTRIC,
      ip: same('IP54'),
    },
  },
  {
    slug: 'onrobot-vg10-vacuum-gripper',
    name: same('OnRobot VG10'),
    type: { en: 'Electric vacuum gripper, adjustable arms', de: 'Elektrischer Vakuumgreifer, verstellbare Arme' },
    image: `${CDN}/ddc5923e6e97f95c9ba22efe8d1c92c0d54b8796-600x259.png`,
    fit: 'contain',
    blurb: {
      en: 'Four arms that you adjust by hand through 270°, so the gripper adapts to different box and part sizes. Two independent channels for picking two items in one cycle.',
      de: 'Vier Arme, die sich von Hand um 270° verstellen lassen, so passt sich der Greifer an verschiedene Karton- und Teilegrößen an. Zwei unabhängige Kanäle für zwei Teile in einem Zyklus.',
    },
    specs: [
      { label: S.payload, value: { en: '10 kg rated, 15 kg max.', de: '10 kg Nennlast, 15 kg max.' } },
      { label: S.cups, value: same('1–16') },
      { label: { en: 'Arm adjustment', de: 'Armverstellung' }, value: same('0–270°') },
      { label: S.weight, value: { en: '1.62 kg', de: '1,62 kg' } },
    ],
    tags: ['vacuum'],
    row: {
      type: T.vacuum,
      payload: { en: '10 kg (max. 15 kg)', de: '10 kg (max. 15 kg)' },
      range: { en: '1–16 cups', de: '1–16 Sauger' },
      force: NONE,
      weight: { en: '1.62 kg', de: '1,62 kg' },
      energy: ELECTRIC,
      ip: same('IP54'),
    },
  },
  {
    slug: 'onrobot-vgp30-vacuum-gripper',
    name: same('OnRobot VGP30'),
    type: { en: 'Pneumatic vacuum gripper', de: 'Pneumatischer Vakuumgreifer' },
    image: `${CDN}/617460e05b4af73ea641f0635187254163618291-1174x680.png`,
    fit: 'contain',
    blurb: {
      en: 'Runs on compressed air at 3 to 7 bar and moves up to 440 L/min, for high-mix palletizing of cardboard boxes. The vacuum control adapts to each box and interlayer.',
      de: 'Arbeitet mit Druckluft von 3 bis 7 bar und bewegt bis 440 L/min, für die Palettierung gemischter Kartons. Die Vakuumregelung stellt sich auf jeden Karton und jede Zwischenlage ein.',
    },
    specs: [
      { label: { en: 'Payload, boxes', de: 'Traglast Kartons' }, value: same('30 kg') },
      { label: S.airflow, value: same('440 L/min') },
      { label: S.cups, value: same('20') },
      { label: S.weight, value: { en: '3.1 kg', de: '3,1 kg' } },
    ],
    tags: ['vacuum'],
    row: {
      type: { en: 'Vacuum, pneumatic', de: 'Vakuum, pneumatisch' },
      payload: { en: '30 kg (boxes)', de: '30 kg (Kartons)' },
      range: { en: '20 cups', de: '20 Sauger' },
      force: NONE,
      weight: { en: '3.1 kg', de: '3,1 kg' },
      energy: { en: 'Compressed air, 3–7 bar', de: 'Druckluft, 3–7 bar' },
      ip: same('IP54'),
    },
  },
  {
    slug: 'onrobot-2fgp20-palletizing-gripper',
    name: same('OnRobot 2FGP20'),
    type: { en: 'Palletizing gripper, fingers and vacuum', de: 'Palettiergreifer, Finger und Vakuum' },
    image: `${CDN}/2d911b122c39d64047e23aa379d3e04fe960440b-658x680.png`,
    fit: 'contain',
    blurb: {
      en: 'Grips open boxes and containers that vacuum cannot hold, with 260 mm stroke. The built-in vacuum unit picks slip sheets and interlayers. A KLT finger set is available for small load carriers.',
      de: 'Greift offene Kartons und Behälter, die Vakuum nicht halten kann, mit 260 mm Hub. Die eingebaute Vakuumeinheit nimmt Zwischenlagen auf. Für Kleinladungsträger gibt es einen KLT-Fingersatz.',
    },
    specs: [
      { label: { en: 'Payload, fingers', de: 'Traglast Finger' }, value: same('20 kg') },
      { label: { en: 'Grip width', de: 'Greifweite' }, value: same('170–430 mm') },
      { label: S.force, value: same('80–400 N') },
      { label: { en: 'Payload, vacuum', de: 'Traglast Vakuum' }, value: { en: '2.5 kg', de: '2,5 kg' } },
    ],
    tags: ['finger', 'vacuum'],
    row: {
      type: { en: 'Fingers + vacuum', de: 'Finger + Vakuum' },
      payload: { en: '20 kg (vacuum 2.5 kg)', de: '20 kg (Vakuum 2,5 kg)' },
      range: same('170–430 mm'),
      force: same('80–400 N'),
      weight: { en: '5.07 kg', de: '5,07 kg' },
      energy: ELECTRIC,
      ip: same('IP54'),
    },
  },

  // Magnetic, adhesive and soft grippers
  {
    slug: 'onrobot-mg10-magnetic-gripper',
    name: same('OnRobot MG10'),
    type: { en: 'Electric magnetic gripper', de: 'Elektrischer Magnetgreifer' },
    image: `${CDN}/bf73a20eee7c8d38bd4b7a7f766c60aa2c04ea9c-462x680.png`,
    fit: 'contain',
    blurb: {
      en: 'For ferromagnetic parts, including perforated, abrasive and dusty ones. The magnetic force adjusts in 10 steps for destacking sheet metal, a proximity sensor confirms the pick, and the grip holds through a power loss or emergency stop.',
      de: 'Für ferromagnetische Teile, auch gelochte, abrasive und staubige. Die Magnetkraft lässt sich zum Vereinzeln von Blechen in 10 Stufen einstellen, ein Näherungssensor bestätigt die Aufnahme, und der Griff hält bei Stromausfall oder Not-Halt.',
    },
    specs: [
      { label: S.payload, value: { en: '10 kg (no pads, parallel)', de: '10 kg (ohne Pads, parallel)' } },
      { label: { en: 'Pulling force', de: 'Zugkraft' }, value: same('300 N') },
      { label: { en: 'Force setting', de: 'Kraftstufen' }, value: same('10') },
      { label: S.ip, value: same('IP67') },
    ],
    tags: ['special', 'ip67'],
    row: {
      type: { en: 'Magnetic', de: 'Magnet' },
      payload: same('max. 10 kg'),
      range: NONE,
      force: { en: '300 N (pull)', de: '300 N (Zugkraft)' },
      weight: { en: '0.8 kg', de: '0,8 kg' },
      energy: ELECTRIC,
      ip: same('IP67'),
    },
  },
  {
    slug: 'onrobot-gecko-gripper',
    name: same('OnRobot Gecko'),
    type: { en: 'Adhesive gripper', de: 'Haftgreifer' },
    image: `${CDN}/c98ff20a2f027b4f83c8840a439f7e3c5c5f3dd3-487x680.png`,
    fit: 'contain',
    blurb: {
      en: 'Holds by van der Waals forces, the way a gecko’s feet do. No marks, not even on polished surfaces, and it handles perforated parts such as PCBs and aluminium mesh. Needs neither electricity nor air.',
      de: 'Hält über Van-der-Waals-Kräfte, wie die Füße eines Geckos. Keine Abdrücke, auch nicht auf polierten Flächen, und er greift gelochte Teile wie Leiterplatten und Aluminiumgitter. Braucht weder Strom noch Luft.',
    },
    specs: [
      { label: { en: 'Payload SP1 / SP3 / SP5', de: 'Traglast SP1 / SP3 / SP5' }, value: same('1 / 3 / 5 kg') },
      { label: S.weight, value: { en: 'from 0.267 kg', de: 'ab 0,267 kg' } },
      { label: { en: 'Pad change', de: 'Padwechsel' }, value: { en: '~200,000 cycles', de: '~200.000 Zyklen' } },
      { label: S.ip, value: same('IP42') },
    ],
    tags: ['special'],
    row: {
      type: { en: 'Adhesive (gecko)', de: 'Haftend (Gecko)' },
      payload: same('1 / 3 / 5 kg'),
      range: NONE,
      force: NONE,
      weight: { en: '0.267–0.318 kg', de: '0,267–0,318 kg' },
      energy: { en: 'None needed', de: 'Keine nötig' },
      ip: same('IP42'),
    },
  },
  {
    slug: 'onrobot-soft-gripper',
    name: same('OnRobot Soft Gripper'),
    type: { en: 'Food-grade silicone gripper', de: 'Lebensmitteltauglicher Silikongreifer' },
    image: `${CDN}/d77e564b813787e7fcea17a29dbd11f1608a8352-1243x2302.png`,
    fit: 'contain',
    blurb: {
      en: 'Three interchangeable silicone tools that wrap around delicate, irregular objects such as food. The cups comply with FDA 21 CFR 177.2600 and EC 1935/2004 and are dishwasher-safe.',
      de: 'Drei wechselbare Silikonwerkzeuge, die sich um empfindliche, unregelmäßige Objekte wie Lebensmittel legen. Die Aufsätze entsprechen FDA 21 CFR 177.2600 und EG 1935/2004 und sind spülmaschinenfest.',
    },
    specs: [
      { label: S.payload, value: { en: 'max. 2.2 kg', de: 'max. 2,2 kg' } },
      { label: { en: 'Grip size', de: 'Greifgröße' }, value: same('11–118 mm') },
      { label: { en: 'Gripping rate', de: 'Greifrate' }, value: { en: 'up to 32/min', de: 'bis 32/min' } },
      { label: { en: 'Tool life', de: 'Standzeit Werkzeug' }, value: { en: '2,000,000 cycles', de: '2.000.000 Zyklen' } },
    ],
    tags: ['special', 'ip67'],
    row: {
      type: { en: 'Soft (silicone)', de: 'Soft (Silikon)' },
      payload: { en: 'max. 2.2 kg', de: 'max. 2,2 kg' },
      range: { en: '11–118 mm (by cup)', de: '11–118 mm (je Aufsatz)' },
      force: NONE,
      weight: { en: '0.77 kg (base)', de: '0,77 kg (Basis)' },
      energy: ELECTRIC,
      ip: { en: 'IP67 (base)', de: 'IP67 (Basis)' },
    },
  },

  // Dexterous robot hands
  {
    slug: 'agile-hand',
    name: same('Agile Hand'),
    type: { en: 'Five-finger robot hand, 16 DoF', de: 'Fünffinger-Roboterhand, 16 Freiheitsgrade' },
    image: `${CDN}/8ecb8911ee5aeb0feb4bd1434a3db6871a69df29-768x815.png`,
    fit: 'contain',
    blurb: {
      en: 'An anthropomorphic hand built from identical, modular fingers that match the human hand closely in joints, size and shape. Torque and position sensors in every actuated joint and active compliance make it safe to work next to people. Tactile sensors are an option.',
      de: 'Eine menschenähnliche Hand aus gleichen, modularen Fingern, die in Gelenken, Größe und Form der menschlichen Hand nahekommen. Drehmoment- und Positionssensoren in jedem angetriebenen Gelenk und aktive Nachgiebigkeit machen die Arbeit neben Menschen sicher. Taktile Sensoren gibt es als Option.',
    },
    specs: [
      { label: S.dof, value: { en: '16 (21 joints)', de: '16 (21 Gelenke)' } },
      { label: S.weight, value: { en: '1.5 kg', de: '1,5 kg' } },
      { label: S.interface, value: { en: 'EtherCAT, 1 kHz', de: 'EtherCAT, 1 kHz' } },
      { label: { en: 'API', de: 'API' }, value: same('C++, Python, ROS') },
    ],
    tags: ['hands'],
    row: {
      type: { en: '5 fingers, 16 DoF', de: '5 Finger, 16 DoF' },
      payload: NONE,
      range: NONE,
      force: { en: '10 N (fingertip)', de: '10 N (Fingerspitze)' },
      weight: { en: '1.5 kg', de: '1,5 kg' },
      energy: NONE,
      ip: NONE,
    },
  },
  {
    slug: 'magichand-s01',
    name: same('MagicLab MagicHand S01'),
    type: { en: 'Tactile five-finger hand, 11 DoF', de: 'Taktile Fünffingerhand, 11 Freiheitsgrade' },
    image: `${CDN}/46bb681fd914db784cc7b2fc9730ef8303f21bae-1920x1080.jpg`,
    fit: 'cover',
    blurb: {
      en: 'For pinching, grasping, pressing, lifting and pushing. 3D tactile feedback at 0.1 N resolution plus ToF proximity sensing, an aluminium body tested over 100,000 cycles, RS485 and EtherCAT with a C++ SDK.',
      de: 'Zum Greifen, Kneifen, Drücken, Heben und Schieben. Taktiles 3D-Feedback mit 0,1 N Auflösung und ToF-Näherungssensorik, ein Aluminiumgehäuse, getestet über 100.000 Zyklen, dazu RS485 und EtherCAT mit C++-SDK.',
    },
    specs: [
      { label: S.dof, value: { en: '11 (6 motors)', de: '11 (6 Motoren)' } },
      { label: { en: 'Full-hand payload', de: 'Traglast ganze Hand' }, value: same('5 kg') },
      { label: { en: 'Tactile resolution', de: 'Taktile Auflösung' }, value: { en: '0.1 N', de: '0,1 N' } },
      { label: S.weight, value: same('≤ 650 g') },
    ],
    tags: ['hands'],
    row: {
      type: { en: '5 fingers, 11 DoF', de: '5 Finger, 11 DoF' },
      payload: { en: '5 kg (full hand)', de: '5 kg (ganze Hand)' },
      range: NONE,
      force: { en: '9.1 kg (four fingers)', de: '9,1 kg (vier Finger)' },
      weight: same('≤ 650 g'),
      energy: ELECTRIC,
      ip: NONE,
    },
  },

  // Tool changers, sensors, vision
  {
    slug: 'onrobot-quick-changer',
    name: same('OnRobot Quick Changer'),
    type: { en: 'Manual tool changer', de: 'Manueller Werkzeugwechsler' },
    image: `${CDN}/439dc984d7d22bf51ee7ce736d4dc44f3731981c-2000x2000.png`,
    fit: 'contain',
    blurb: {
      en: 'Swaps end effectors in under five seconds without screws, with a redundant locking mechanism. The robot-side unit weighs only 60 g, so it takes almost nothing from the robot’s payload.',
      de: 'Wechselt Endeffektoren in unter fünf Sekunden ohne Schrauben, mit redundanter Verriegelung. Die roboterseitige Einheit wiegt nur 60 g und nimmt dem Roboter kaum Traglast.',
    },
    specs: [
      { label: { en: 'Rated payload', de: 'Nennlast' }, value: same('25 kg') },
      { label: S.repeat, value: { en: '±0.02 mm', de: '±0,02 mm' } },
      { label: S.flange, value: same('ISO 9409-1') },
      { label: S.ip, value: same('IP67') },
    ],
    tags: ['tooling', 'ip67'],
    row: {
      type: T.changer,
      payload: same('25 kg'),
      range: NONE,
      force: NONE,
      weight: { en: '0.06 kg (robot side)', de: '0,06 kg (Roboterseite)' },
      energy: NONE,
      ip: same('IP67'),
    },
  },
  {
    slug: 'onrobot-dual-quick-changer',
    name: same('OnRobot Dual Quick Changer'),
    type: { en: 'Tool changer for two tools', de: 'Werkzeugwechsler für zwei Werkzeuge' },
    image: `${CDN}/f54f58a088b598e2d7ddb32f5a23dfe95bfdf1be-731x690.png`,
    fit: 'contain',
    blurb: {
      en: 'Carries two end effectors at once, for example two grippers in one machine-tending cycle: unload the finished part and load the blank without an extra trip.',
      de: 'Trägt zwei Endeffektoren gleichzeitig, etwa zwei Greifer in einem Zyklus an der Maschine: Fertigteil entnehmen und Rohteil einlegen, ohne zusätzliche Fahrt.',
    },
    specs: [
      { label: { en: 'Rated payload', de: 'Nennlast' }, value: same('30 kg') },
      { label: { en: 'Permissible force', de: 'Zulässige Kraft' }, value: same('600 N') },
      { label: S.repeat, value: { en: '±0.02 mm', de: '±0,02 mm' } },
      { label: S.weight, value: { en: '0.41 kg', de: '0,41 kg' } },
    ],
    tags: ['tooling', 'ip67'],
    row: {
      type: T.changer,
      payload: same('30 kg'),
      range: NONE,
      force: NONE,
      weight: { en: '0.41 kg', de: '0,41 kg' },
      energy: NONE,
      ip: same('IP67'),
    },
  },
  {
    slug: 'onrobot-dual-mounting-kit',
    name: same('OnRobot Dual Mounting Kit'),
    type: { en: 'Two Quick Changers, free orientation', de: 'Zwei Quick Changer, frei ausrichtbar' },
    image: `${CDN}/3fb794a8897c84585b4ccd51913a26de11f1d143-1899x1211.png`,
    fit: 'contain',
    blurb: {
      en: 'Two independent Quick Changers that you place and orient as the application needs, with tidier cable routing than the Dual Quick Changer. Supplied with two QC-R v3 units and a splitter.',
      de: 'Zwei unabhängige Quick Changer, die Sie so platzieren und ausrichten, wie die Anwendung es verlangt, mit aufgeräumterer Kabelführung als beim Dual Quick Changer. Geliefert mit zwei QC-R v3 und einem Splitter.',
    },
    specs: [
      { label: { en: 'Rated payload', de: 'Nennlast' }, value: same('25 kg') },
      { label: { en: 'Permissible force', de: 'Zulässige Kraft' }, value: same('400 N') },
      { label: S.repeat, value: { en: '±0.02 mm', de: '±0,02 mm' } },
      { label: S.ip, value: same('IP67') },
    ],
    tags: ['tooling', 'ip67'],
    row: {
      type: T.changer,
      payload: same('25 kg'),
      range: NONE,
      force: NONE,
      weight: { en: '0.06 kg per QC', de: '0,06 kg je QC' },
      energy: NONE,
      ip: same('IP67'),
    },
  },
  {
    slug: 'onrobot-hex-force-torque-sensor',
    name: same('OnRobot HEX'),
    type: { en: '6-axis force/torque sensor', de: '6-Achs-Kraft-Momenten-Sensor' },
    image: `${CDN}/b5bb30f8d383279c8022b32357e71be4ae5ecb0e-705x680.png`,
    fit: 'contain',
    blurb: {
      en: 'Gives the robot a sense of touch: constant contact force for sanding and polishing, hand guiding, path recording and collision detection. Optical sensing that copes with sudden shocks, as HEX-E QC or the higher-torque HEX-H QC.',
      de: 'Gibt dem Roboter einen Tastsinn: konstante Anpresskraft beim Schleifen und Polieren, Handführung, Bahnaufzeichnung und Kollisionserkennung. Optische Messung, die auch Stöße verträgt, als HEX-E QC oder als HEX-H QC mit höherem Moment.',
    },
    specs: [
      { label: { en: 'Nominal force (Fxy, Fz)', de: 'Nennkraft (Fxy, Fz)' }, value: same('200 N') },
      { label: { en: 'Nominal torque Txy', de: 'Nennmoment Txy' }, value: { en: '10 Nm (HEX-H: 20 Nm)', de: '10 Nm (HEX-H: 20 Nm)' } },
      { label: S.weight, value: { en: '0.347 kg', de: '0,347 kg' } },
      { label: S.ip, value: same('IP67') },
    ],
    tags: ['tooling', 'ip67'],
    row: {
      type: { en: 'F/T sensor', de: 'Kraft-Momenten-Sensor' },
      payload: NONE,
      range: NONE,
      force: NONE,
      weight: { en: '0.347 kg', de: '0,347 kg' },
      energy: same('7–24 V'),
      ip: same('IP67'),
    },
  },
  {
    slug: 'onrobot-eyes-vision-system',
    name: same('OnRobot Eyes'),
    type: { en: '2.5D vision system', de: '2,5D-Bildverarbeitung' },
    image: `${CDN}/70d5520163926d742be207947731d66b44454f58-1210x680.png`,
    fit: 'contain',
    blurb: {
      en: 'Lets the robot find parts before it grips them. Calibration and part recognition each take one picture, several objects are detected in one shot, and it inspects colour and contour. Mounts on the wrist or externally.',
      de: 'Damit findet der Roboter Teile, bevor er sie greift. Kalibrierung und Teileerkennung brauchen je ein Bild, mehrere Objekte werden in einer Aufnahme erkannt, dazu prüft das System Farbe und Kontur. Montage am Handgelenk oder extern.',
    },
    specs: [
      { label: { en: 'Working distance', de: 'Arbeitsabstand' }, value: same('400–1000 mm') },
      { label: { en: 'Accuracy at 500 mm', de: 'Genauigkeit bei 500 mm' }, value: same('2 mm') },
      { label: { en: 'Processing time', de: 'Verarbeitungszeit' }, value: { en: '0.5 s typical', de: '0,5 s typisch' } },
      { label: S.weight, value: { en: '0.260 kg', de: '0,260 kg' } },
    ],
    tags: ['tooling'],
    row: {
      type: { en: '2.5D vision', de: '2,5D-Vision' },
      payload: NONE,
      range: NONE,
      force: NONE,
      weight: { en: '0.260 kg', de: '0,260 kg' },
      energy: NONE,
      ip: same('IP54'),
    },
  },

  // Process tools
  {
    slug: 'onrobot-screwdriver',
    name: same('OnRobot Screwdriver'),
    type: { en: 'Robot screwdriver', de: 'Roboterschrauber' },
    image: `${CDN}/df8babdca145abf4fc12e4b83fc4100d39ee640b-744x680.png`,
    fit: 'contain',
    blurb: {
      en: 'Its own axis drives the screw, so the robot arm stays still. Detects pick, length and insertion errors, retracts screws up to 35 mm while moving and stops on excessive axial force. ESD safe for electronics.',
      de: 'Die eigene Achse treibt die Schraube, der Roboterarm bleibt dabei stehen. Erkennt Fehler beim Aufnehmen, bei der Länge und beim Eindrehen, zieht Schrauben bis 35 mm während der Fahrt ein und stoppt bei zu hoher Axialkraft. ESD-sicher für die Elektronik.',
    },
    specs: [
      { label: { en: 'Torque', de: 'Drehmoment' }, value: { en: '0.15–5 Nm', de: '0,15–5 Nm' } },
      { label: { en: 'Screws', de: 'Schrauben' }, value: { en: 'M1.6–M6, up to 50 mm', de: 'M1,6–M6, bis 50 mm' } },
      { label: { en: 'Speed', de: 'Drehzahl' }, value: { en: 'up to 340 RPM', de: 'bis 340 U/min' } },
      { label: S.weight, value: { en: '2.5 kg', de: '2,5 kg' } },
    ],
    tags: ['tooling'],
    row: {
      type: { en: 'Screwdriver', de: 'Schrauber' },
      payload: NONE,
      range: NONE,
      force: NONE,
      weight: { en: '2.5 kg', de: '2,5 kg' },
      energy: ELECTRIC,
      ip: same('IP54'),
    },
  },
  {
    slug: 'onrobot-sander',
    name: same('OnRobot Sander'),
    type: { en: 'Electric random orbital sander', de: 'Elektrischer Exzenterschleifer' },
    image: `${CDN}/46f78e6b36f772febfe5dc07a1f791f6c4802872-1866x1308.png`,
    fit: 'contain',
    blurb: {
      en: 'For sanding, buffing and polishing with standard 3M Hookit discs. Paths come from hand guiding, a shape or points. With the HEX sensor it keeps the contact force constant, and an optional Grit Changer swaps discs unattended.',
      de: 'Zum Schleifen, Polieren und Glänzen mit Standardscheiben 3M Hookit. Die Bahnen entstehen per Handführung, aus einer Form oder aus Punkten. Mit dem HEX-Sensor bleibt die Anpresskraft konstant, ein optionaler Grit Changer wechselt die Scheiben ohne Bediener.',
    },
    specs: [
      { label: { en: 'Power', de: 'Leistung' }, value: { en: '200 W (v2)', de: '200 W (v2)' } },
      { label: { en: 'Speed', de: 'Drehzahl' }, value: { en: '1,000–10,000 RPM', de: '1.000–10.000 U/min' } },
      { label: { en: 'Pad', de: 'Schleifteller' }, value: same('127 mm') },
      { label: S.weight, value: { en: '1.2 kg', de: '1,2 kg' } },
    ],
    tags: ['tooling'],
    row: {
      type: { en: 'Orbital sander', de: 'Exzenterschleifer' },
      payload: NONE,
      range: NONE,
      force: NONE,
      weight: { en: '1.2 kg', de: '1,2 kg' },
      energy: ELECTRIC,
      ip: same('IP54'),
    },
  },
]

export const content: LandingContent = {
  meta: {
    title: {
      en: 'Robot Grippers: Electric, Vacuum & Robot Hands | MegaRobotics',
      de: 'Robotergreifer kaufen: Parallel- & Vakuumgreifer | MegaRobotics',
    },
    description: {
      en: 'Robot grippers from OnRobot, Agile Robots, Franka and MagicLab: electric parallel grippers, vacuum and suction grippers, robot hands and tool changers compared.',
      de: 'Robotergreifer von OnRobot, Agile Robots, Franka und MagicLab: Parallelgreifer, Vakuum- und Sauggreifer, Roboterhände und Werkzeugwechsler im Vergleich.',
    },
    crumb: { en: 'Robot grippers', de: 'Robotergreifer' },
  },

  heroSlugs: ['agile-hand'],
  hero: { carousel: { en: 'Grippers and robot hands in our range', de: 'Greifer und Roboterhände in unserem Programm' } },

  intro: {
    eyebrow: { en: 'Robot grippers', de: 'Robotergreifer' },
    title: { en: 'Buy robot grippers for cobots and industrial robots', de: 'Robotergreifer kaufen: Greifer für Cobots und Industrieroboter' },
    lead: {
      en: '{count} grippers, robot hands and tools from OnRobot, Agile Robots, Franka and MagicLab on one page, sorted by how they hold the part.',
      de: '{count} Greifer, Roboterhände und Werkzeuge von OnRobot, Agile Robots, Franka und MagicLab auf einer Seite, sortiert nach dem Prinzip, mit dem sie das Teil halten.',
    },
    body: {
      en: 'The right robot gripper depends mainly on the workpiece: its shape, weight, surface and material. Payloads here are manufacturer data and often depend on the type of grip. Tell us the part and the robot, and we compare the grippers that fit.',
      de: 'Welcher Robotergreifer passt, entscheidet vor allem das Werkstück: Form, Gewicht, Oberfläche und Material. Die Traglasten hier sind Herstellerangaben und hängen oft von der Griffart ab. Nennen Sie uns Teil und Roboter, dann vergleichen wir die passenden Greifer.',
    },
    jobs: [
      {
        icon: 'Factory',
        title: { en: 'Machine tending and CNC', de: 'Maschinenbeschickung und CNC' },
        body: { en: 'IP67 grippers for heavy parts, coolant and lathe chucks.', de: 'IP67-Greifer für schwere Teile, Kühlschmierstoff und Drehfutter.' },
        models: ['onrobot-2fg14-parallel-gripper', 'onrobot-3fg15-three-finger-gripper', 'onrobot-3fg25-three-finger-gripper'],
      },
      {
        icon: 'Package',
        title: { en: 'Palletizing and packaging', de: 'Palettieren und Verpacken' },
        body: { en: 'Vacuum and finger grippers for boxes, trays and interlayers.', de: 'Vakuum- und Fingergreifer für Kartons, Trays und Zwischenlagen.' },
        models: ['onrobot-vgp20-vacuum-gripper', 'onrobot-vgp30-vacuum-gripper', 'onrobot-2fgp20-palletizing-gripper'],
      },
      {
        icon: 'Wrench',
        title: { en: 'Assembly and small parts', de: 'Montage und Kleinteile' },
        body: { en: 'Fine force control, fingertip sensing and screwdriving.', de: 'Feine Kraftregelung, Sensorik in den Fingern und Schrauben.' },
        models: ['onrobot-2fg7-parallel-gripper', 'onrobot-rg2-ft-finger-gripper', 'onrobot-screwdriver'],
      },
      {
        icon: 'FlaskConical',
        title: { en: 'Research and dexterous manipulation', de: 'Forschung und Feinmanipulation' },
        body: { en: 'Robot hands and grippers with open interfaces for the lab.', de: 'Roboterhände und Greifer mit offenen Schnittstellen fürs Labor.' },
        models: ['agile-hand', 'magichand-s01', 'franka-hand'],
      },
    ],
  },

  facts: [
    { value: { en: 'up to 30 kg', de: 'bis 30 kg' }, label: { en: 'payload on cardboard boxes (VGP30)', de: 'Traglast bei Kartons (VGP30)' } },
    { value: { en: 'up to 450 N', de: 'bis 450 N' }, label: { en: 'gripping force (3FG25)', de: 'Greifkraft (3FG25)' } },
    { value: { en: 'up to 430 mm', de: 'bis 430 mm' }, label: { en: 'grip width (2FGP20)', de: 'Greifweite (2FGP20)' } },
    { value: same('16'), label: { en: 'degrees of freedom in one robot hand (Agile Hand)', de: 'Freiheitsgrade in einer Roboterhand (Agile Hand)' } },
    { value: { en: '±0.05 mm', de: '±0,05 mm' }, label: { en: 'gripper repeatability (Tekken D)', de: 'Wiederholgenauigkeit (Tekken D)' } },
    { value: { en: '< 5 s', de: '< 5 s' }, label: { en: 'tool change with the Quick Changer', de: 'Werkzeugwechsel mit dem Quick Changer' } },
  ],

  groups: [
    {
      id: 'parallel-grippers',
      nav: { en: 'Parallel grippers', de: 'Parallelgreifer' },
      eyebrow: { en: 'Two fingers', de: 'Zwei Finger' },
      title: { en: 'Electric parallel grippers with two fingers', de: 'Elektrische Parallelgreifer mit zwei Fingern' },
      lead: {
        en: 'The most common robot gripper. Two fingers close on the part, driven by an electric motor, so you set force, speed and stroke in software and need no compressed air.',
        de: 'Der häufigste Robotergreifer. Zwei Finger schließen sich um das Teil, angetrieben von einem Elektromotor. Kraft, Geschwindigkeit und Hub stellen Sie in der Software ein, Druckluft brauchen Sie nicht.',
      },
      body: {
        en: 'The 2FG7 and 2FG14 are compact and sealed to IP67 for machining. RG2 and RG6 have long adjustable strokes for changing part sizes, the RG2-FT feels with its fingertips, and the Tekken D from Agile Robots adds force control and an optional tactile sensor.',
        de: '2FG7 und 2FG14 sind kompakt und nach IP67 für die Zerspanung abgedichtet. RG2 und RG6 haben lange, einstellbare Hübe für wechselnde Teilegrößen, der RG2-FT tastet mit den Fingerspitzen, und der Tekken D von Agile Robots bringt Kraftregelung und einen optionalen Tastsensor mit.',
      },
      points: [
        { en: 'Small electric grippers from 0.78 kg (RG2)', de: 'Kleine Elektrogreifer ab 0,78 kg (RG2)' },
        { en: 'Grip width up to 105 mm external (2FG14)', de: 'Greifbereich bis 105 mm außen (2FG14)' },
        { en: 'OnRobot models hold the part if power is lost (2FG7, 2FG14, RG2)', de: 'Halten das Teil bei Stromausfall (2FG7, 2FG14, RG2)' },
      ],
      feature: 'onrobot-2fg7-parallel-gripper',
      models: [
        'onrobot-2fg14-parallel-gripper',
        'onrobot-rg2-finger-gripper',
        'onrobot-rg2-ft-finger-gripper',
        'onrobot-rg6-finger-gripper',
        'tekken-d',
      ],
    },
    {
      id: 'franka-hand',
      nav: { en: 'Franka Hand', de: 'Franka Hand' },
      eyebrow: { en: 'Franka Robotics · Germany', de: 'Franka Robotics · Deutschland' },
      title: { en: 'Franka Hand and Franka gripper accessories', de: 'Franka Hand und Greifer-Zubehör für Franka' },
      lead: {
        en: 'The Franka Hand is the two-finger gripper made for Franka robot arms. It connects through the flange, with no extra cable and no extra controller.',
        de: 'Die Franka Hand ist der Zweifingergreifer für die Roboterarme von Franka. Sie wird über den Flansch angeschlossen, ohne zusätzliches Kabel und ohne eigenen Controller.',
      },
      body: {
        en: 'For other tasks on the Franka Research 3 there is the MATCH end-of-arm platform, which switches between vacuum and mechanical grippers, plus the LWR50L-03 parallel gripper and two electric vacuum generators. We source these accessories on request.',
        de: 'Für andere Aufgaben am Franka Research 3 gibt es die End-of-Arm-Plattform MATCH, die zwischen Vakuum- und Mechanikgreifern wechselt, dazu den Parallelgreifer LWR50L-03 und zwei elektrische Vakuumerzeuger. Dieses Zubehör beschaffen wir auf Anfrage.',
      },
      manufacturer: 'franka-robotics',
      feature: 'franka-hand',
      models: [
        'franka-lwr50l-03-electric-gripper',
        'franka-cobot-pump-schmalz',
        'franka-ecbpmi-match-vacuum-generator',
        'franka-match-end-of-arm-platform',
      ],
    },
    {
      id: 'three-finger-grippers',
      nav: { en: 'Three-finger', de: 'Dreifinger' },
      eyebrow: { en: 'Three fingers', de: 'Drei Finger' },
      title: { en: 'Three-finger grippers for round parts', de: 'Drei-Finger-Greifer für runde Teile' },
      lead: {
        en: 'Three fingers that close towards the centre position cylindrical parts by themselves. That is what a lathe chuck needs, and it works from outside and inside.',
        de: 'Drei Finger, die sich zur Mitte schließen, richten zylindrische Teile von selbst aus. Genau das braucht ein Drehfutter, und es funktioniert außen wie innen.',
      },
      manufacturer: 'onrobot',
      models: ['onrobot-3fg15-three-finger-gripper', 'onrobot-3fg25-three-finger-gripper'],
    },
    {
      id: 'vacuum-grippers',
      nav: { en: 'Vacuum grippers', de: 'Vakuumgreifer' },
      eyebrow: { en: 'Vacuum and palletizing', de: 'Vakuum und Palettieren' },
      title: { en: 'Vacuum grippers and robot suction grippers', de: 'Vakuumgreifer und Sauggreifer für Roboter' },
      lead: {
        en: 'A vacuum gripper holds smooth, flat surfaces with suction cups, and can pick several items in one go. VGC10, VG10 and VGP20 make their vacuum with a built-in electric pump. The VGP30 runs on compressed air for high air flow.',
        de: 'Ein Vakuumgreifer hält glatte, flache Flächen mit Saugern und kann mehrere Teile auf einmal aufnehmen. VGC10, VG10 und VGP20 erzeugen ihr Vakuum mit einer eingebauten elektrischen Pumpe. Der VGP30 arbeitet für hohen Luftstrom mit Druckluft.',
      },
      body: {
        en: 'For open boxes that suction cannot hold, the 2FGP20 grips with fingers and picks the interlayer with its own vacuum unit.',
        de: 'Für offene Kartons, die sich nicht ansaugen lassen, greift der 2FGP20 mit Fingern und nimmt die Zwischenlage mit seiner eigenen Vakuumeinheit auf.',
      },
      manufacturer: 'onrobot',
      feature: 'onrobot-vgp20-vacuum-gripper',
      models: [
        'onrobot-vgc10-vacuum-gripper',
        'onrobot-vg10-vacuum-gripper',
        'onrobot-vgp30-vacuum-gripper',
        'onrobot-2fgp20-palletizing-gripper',
      ],
    },
    {
      id: 'magnetic-adhesive-soft',
      nav: { en: 'Magnetic & soft', de: 'Magnet & Soft' },
      eyebrow: { en: 'Special grippers', de: 'Sondergreifer' },
      title: { en: 'Magnetic, adhesive and soft grippers', de: 'Magnet-, Haft- und Softgreifer' },
      lead: {
        en: 'For parts that fingers and suction cups handle badly: sheet metal and perforated steel, polished or perforated flat parts, and soft, irregular food.',
        de: 'Für Teile, mit denen Finger und Sauger schlecht zurechtkommen: Bleche und gelochter Stahl, polierte oder gelochte flache Teile und weiche, unregelmäßige Lebensmittel.',
      },
      manufacturer: 'onrobot',
      models: ['onrobot-mg10-magnetic-gripper', 'onrobot-gecko-gripper', 'onrobot-soft-gripper'],
    },
    {
      id: 'robot-hands',
      nav: { en: 'Robot hands', de: 'Roboterhände' },
      eyebrow: { en: 'Five fingers', de: 'Fünf Finger' },
      title: { en: 'Dexterous robot hands', de: 'Roboterhände mit fünf Fingern' },
      lead: {
        en: 'A robot hand grasps, pinches and presses like a human hand. That matters for humanoid robots, for manipulation research and for tools made for people.',
        de: 'Eine Roboterhand greift, kneift und drückt wie eine menschliche Hand. Das zählt bei humanoiden Robotern, in der Manipulationsforschung und bei Werkzeugen, die für Menschen gemacht sind.',
      },
      body: {
        en: 'The Agile Hand has 16 degrees of freedom and sensors in every actuated joint. The MagicHand S01 is lighter at 650 g at most and carries 5 kg with the whole hand.',
        de: 'Die Agile Hand hat 16 Freiheitsgrade und Sensoren in jedem angetriebenen Gelenk. Die MagicHand S01 ist mit höchstens 650 g leichter und trägt mit der ganzen Hand 5 kg.',
      },
      feature: 'agile-hand',
      models: ['magichand-s01'],
    },
    {
      id: 'tool-changers-sensors',
      nav: { en: 'Changers & sensors', de: 'Wechsler & Sensoren' },
      eyebrow: { en: 'Around the gripper', de: 'Rund um den Greifer' },
      title: { en: 'Tool changers, force sensors and vision', de: 'Werkzeugwechsler, Kraftsensoren und Bildverarbeitung' },
      lead: {
        en: 'The parts that turn a gripper into a working end effector: a Quick Changer to swap tools, the HEX sensor for force control, and OnRobot Eyes so the robot finds the part.',
        de: 'Die Teile, die aus einem Greifer einen einsatzfähigen Endeffektor machen: ein Quick Changer für den Werkzeugwechsel, der HEX-Sensor für die Kraftregelung und OnRobot Eyes, damit der Roboter das Teil findet.',
      },
      manufacturer: 'onrobot',
      models: [
        'onrobot-quick-changer',
        'onrobot-dual-quick-changer',
        'onrobot-dual-mounting-kit',
        'onrobot-hex-force-torque-sensor',
        'onrobot-eyes-vision-system',
      ],
    },
    {
      id: 'process-tools',
      nav: { en: 'Process tools', de: 'Prozesswerkzeuge' },
      eyebrow: { en: 'Screwing and sanding', de: 'Schrauben und Schleifen' },
      title: { en: 'Process tools: screwdriver and sander', de: 'Prozesswerkzeuge: Schrauber und Schleifer' },
      lead: {
        en: 'Not every end effector grips. The OnRobot Screwdriver tightens screws with controlled torque, the Sander sands and polishes surfaces.',
        de: 'Nicht jeder Endeffektor greift. Der OnRobot Screwdriver zieht Schrauben mit geregeltem Drehmoment an, der Sander schleift und poliert Oberflächen.',
      },
      manufacturer: 'onrobot',
      models: ['onrobot-screwdriver', 'onrobot-sander'],
    },
  ],

  explainer: {
    eyebrow: { en: 'Basics', de: 'Grundlagen' },
    title: { en: 'Types of robot grippers and how they work', de: 'Arten von Robotergreifern und wie sie funktionieren' },
    paragraphs: [
      {
        en: 'A robot gripper is the end effector that sits on the robot flange and holds the workpiece. It decides what the robot can pick and place at all. Industrial grippers fall into a few families: finger grippers, vacuum grippers, magnetic grippers, adhesive and soft grippers, and multi-finger robot hands.',
        de: 'Ein Robotergreifer ist der Endeffektor am Roboterflansch, der das Werkstück hält. Er entscheidet, was der Roboter überhaupt aufnehmen und ablegen kann. Industrielle Greifer lassen sich in wenige Familien einteilen: Fingergreifer, Vakuumgreifer, Magnetgreifer, Haft- und Softgreifer sowie Roboterhände mit mehreren Fingern.',
      },
      {
        en: 'Finger grippers close two or three fingers on the part. Parallel grippers move their fingers in a straight line, three-finger grippers centre round parts. They hold either by friction (force fit) or by enclosing the part (form fit), which allows the higher payload. Electric grippers set force and position in software, pneumatic grippers need compressed air.',
        de: 'Fingergreifer schließen zwei oder drei Finger um das Teil. Parallelgreifer bewegen die Finger geradlinig, Dreifingergreifer zentrieren runde Teile. Sie halten entweder über Reibung (Kraftschluss) oder indem sie das Teil umschließen (Formschluss), was die höhere Traglast erlaubt. Elektrogreifer stellen Kraft und Position in der Software ein, pneumatische Greifer brauchen Druckluft.',
      },
      {
        en: 'Vacuum grippers, also called suction grippers, hold smooth and flat surfaces such as boxes, sheets and glass. The vacuum comes either from a built-in electric pump or from compressed air through an ejector. Porous material like cardboard needs more air flow, which is why palletizing grippers have several channels.',
        de: 'Vakuumgreifer, auch Sauggreifer genannt, halten glatte und flache Flächen wie Kartons, Bleche und Glas. Das Vakuum kommt entweder aus einer eingebauten elektrischen Pumpe oder aus Druckluft über einen Ejektor. Poröses Material wie Karton braucht mehr Luftstrom, deshalb haben Palettiergreifer mehrere Kanäle.',
      },
      {
        en: 'Magnetic grippers hold ferromagnetic parts, even perforated or dusty ones. Adhesive grippers like the OnRobot Gecko use van der Waals forces on smooth surfaces and need no power. Soft grippers made of silicone wrap around delicate food. Robot hands with five fingers copy the human hand and are used in humanoid robots and research.',
        de: 'Magnetgreifer halten ferromagnetische Teile, auch gelochte oder staubige. Haftgreifer wie der OnRobot Gecko nutzen Van-der-Waals-Kräfte auf glatten Flächen und brauchen keine Energie. Softgreifer aus Silikon legen sich um empfindliche Lebensmittel. Roboterhände mit fünf Fingern bilden die menschliche Hand nach und kommen bei humanoiden Robotern und in der Forschung zum Einsatz.',
      },
      {
        en: 'In robot handling systems the gripper rarely works alone. A tool changer swaps it for another tool, a force/torque sensor adds a sense of touch, and a camera tells the robot where the part lies. Together they make the end effector.',
        de: 'In Roboterhandlinganlagen arbeitet der Greifer selten allein. Ein Werkzeugwechsler tauscht ihn gegen ein anderes Werkzeug, ein Kraft-Momenten-Sensor ergänzt den Tastsinn, und eine Kamera sagt dem Roboter, wo das Teil liegt. Zusammen ergeben sie den Endeffektor.',
      },
    ],
  },

  compare: {
    eyebrow: { en: 'Comparison', de: 'Vergleich' },
    title: { en: 'All grippers and tools side by side', de: 'Alle Greifer und Werkzeuge im Vergleich' },
    subtitle: {
      en: 'Filter by gripping principle and the table narrows down. Values are manufacturer data.',
      de: 'Filtern Sie nach Greifprinzip, dann wird die Tabelle kürzer. Alle Werte sind Herstellerangaben.',
    },
    filters: [
      { key: 'finger', label: { en: 'Finger grippers', de: 'Fingergreifer' } },
      { key: 'vacuum', label: { en: 'Vacuum', de: 'Vakuum' } },
      { key: 'special', label: { en: 'Magnetic, adhesive, soft', de: 'Magnet, Haft, Soft' } },
      { key: 'hands', label: { en: 'Robot hands', de: 'Roboterhände' } },
      { key: 'tooling', label: { en: 'Changers, sensors, tools', de: 'Wechsler, Sensoren, Werkzeuge' } },
      { key: 'ip67', label: same('IP67') },
    ],
    cols: [
      { key: 'type', label: { en: 'Type', de: 'Bauart' } },
      { key: 'payload', label: { en: 'Payload', de: 'Traglast' } },
      { key: 'range', label: { en: 'Stroke, grip range or cups', de: 'Hub, Greifbereich oder Sauger' } },
      { key: 'force', label: { en: 'Gripping force', de: 'Greifkraft' } },
      { key: 'weight', label: { en: 'Weight', de: 'Gewicht' } },
      { key: 'energy', label: { en: 'Energy supply', de: 'Energieversorgung' } },
      { key: 'ip', label: { en: 'Protection', de: 'Schutzart' } },
    ],
    foot: {
      en: '– means no published value, or the column does not apply (tool changers, sensors, vision, process tools). * Force fit / form fit. MG10: without pads, parallel to the ground. Gecko: SP1 / SP3 / SP5. Tool changers: rated payload.',
      de: '– bedeutet: kein veröffentlichter Wert, oder die Spalte trifft nicht zu (Werkzeugwechsler, Sensoren, Vision, Prozesswerkzeuge). * Kraftschluss / Formschluss. MG10: ohne Pads, parallel zum Boden. Gecko: SP1 / SP3 / SP5. Werkzeugwechsler: Nennlast.',
    },
  },

  choose: {
    eyebrow: { en: 'Before you buy', de: 'Vor dem Kauf' },
    title: { en: 'How to choose the right robot gripper', de: 'So finden Sie den passenden Robotergreifer' },
    items: [
      {
        title: { en: 'Start with the workpiece', de: 'Beim Werkstück anfangen' },
        body: {
          en: 'Shape, surface and material decide the principle. Round parts suit three fingers, flat and smooth ones vacuum, steel sheet a magnet, soft food silicone.',
          de: 'Form, Oberfläche und Material bestimmen das Prinzip. Runde Teile passen zu drei Fingern, flache und glatte zu Vakuum, Stahlblech zum Magneten, weiche Lebensmittel zu Silikon.',
        },
      },
      {
        title: { en: 'Payload with the right grip', de: 'Traglast zur Griffart' },
        body: {
          en: 'Use the figure for your grip. The 2FG7 carries 7 kg in force fit and 11 kg in form fit. Vacuum payloads depend on the surface and the cups.',
          de: 'Rechnen Sie mit dem Wert für Ihre Griffart. Der 2FG7 trägt 7 kg im Kraftschluss und 11 kg im Formschluss. Bei Vakuum hängt die Traglast von Oberfläche und Saugern ab.',
        },
      },
      {
        title: { en: 'Tool weight counts', de: 'Das Werkzeuggewicht zählt' },
        body: {
          en: 'Gripper plus part must stay within the robot’s payload. A 5.07 kg 2FGP20 leaves less for the box than a 0.814 kg VGC10.',
          de: 'Greifer plus Teil müssen innerhalb der Traglast des Roboters bleiben. Ein 2FGP20 mit 5,07 kg lässt weniger für den Karton übrig als ein VGC10 mit 0,814 kg.',
        },
      },
      {
        title: { en: 'Stroke and grip range', de: 'Hub und Greifbereich' },
        body: {
          en: 'If part sizes change, a long stroke saves a tool change: the RG2 adjusts up to 110 mm, the RG6 up to 160 mm, the 2FGP20 grips 170 to 430 mm.',
          de: 'Wechseln die Teilegrößen, spart ein langer Hub den Werkzeugwechsel: Der RG2 lässt sich bis 110 mm einstellen, der RG6 bis 160 mm, der 2FGP20 greift 170 bis 430 mm.',
        },
      },
      {
        title: { en: 'Electric or compressed air', de: 'Elektrisch oder Druckluft' },
        body: {
          en: 'Electric grippers need no air supply and are easy to program. Compressed air pays off where it is already on site and high air flow is needed, as with the VGP30.',
          de: 'Elektrische Greifer brauchen keine Druckluftversorgung und lassen sich leicht programmieren. Druckluft lohnt sich, wo sie ohnehin anliegt und hoher Luftstrom gefragt ist, wie beim VGP30.',
        },
      },
      {
        title: { en: 'Environment and interface', de: 'Umgebung und Schnittstelle' },
        body: {
          en: 'Check the protection class for coolant and dust, cleanroom or food needs, and the flange and communication of your robot. The Quick Changer uses ISO 9409-1.',
          de: 'Prüfen Sie die Schutzart gegen Kühlschmierstoff und Staub, Anforderungen an Reinraum oder Lebensmittel sowie Flansch und Kommunikation Ihres Roboters. Der Quick Changer nutzt ISO 9409-1.',
        },
      },
    ],
  },

  faq: {
    eyebrow: { en: 'Questions', de: 'Fragen' },
    title: { en: 'Robot grippers: frequent questions', de: 'Robotergreifer: häufige Fragen' },
    items: [
      {
        q: { en: 'What types of robot grippers are there?', de: 'Welche Arten von Robotergreifern gibt es?' },
        a: {
          en: 'The main types are finger grippers (two-finger parallel and three-finger), vacuum or suction grippers, magnetic grippers, adhesive and soft grippers, and five-finger robot hands. On this page you find all of them, from the OnRobot 2FG7 parallel gripper and VGP20 vacuum gripper to the MG10 magnetic gripper and the Agile Hand. Tool changers, force sensors and process tools such as screwdrivers are end effectors too.',
          de: 'Die wichtigsten Arten sind Fingergreifer (Zweifinger-Parallelgreifer und Dreifingergreifer), Vakuum- oder Sauggreifer, Magnetgreifer, Haft- und Softgreifer sowie Roboterhände mit fünf Fingern. Auf dieser Seite finden Sie alle davon, vom Parallelgreifer OnRobot 2FG7 und dem Vakuumgreifer VGP20 bis zum Magnetgreifer MG10 und der Agile Hand. Auch Werkzeugwechsler, Kraftsensoren und Prozesswerkzeuge wie Schrauber zählen zu den Endeffektoren.',
        },
      },
      {
        q: { en: 'Finger or vacuum gripper: which is the better choice?', de: 'Finger- oder Vakuumgreifer: Was ist die bessere Wahl?' },
        a: {
          en: 'Vacuum suits smooth, flat surfaces and several parts in one grip. Fingers also hold where material or shape makes suction hard, such as open boxes or round machined parts. The OnRobot 2FGP20 combines both for palletizing: fingers for the box, vacuum for the interlayer.',
          de: 'Vakuum eignet sich für glatte, flache Flächen und mehrere Teile im selben Griff. Finger greifen auch dort sicher, wo Material oder Form das Ansaugen schwer machen, etwa bei offenen Kartons oder runden Drehteilen. Der OnRobot 2FGP20 verbindet beides für die Palettierung: Finger für den Karton, Vakuum für die Zwischenlage.',
        },
      },
      {
        q: { en: 'What do force fit and form fit mean for payload?', de: 'Was bedeuten Kraftschluss und Formschluss bei der Traglast?' },
        a: {
          en: 'In a force fit, only friction between finger and workpiece holds the part. In a form fit, the fingers enclose it, so the permitted load is higher: the 2FG14 carries 14 kg in force fit and 20 kg in form fit. Use the figure that matches your grip when sizing the gripper.',
          de: 'Beim Kraftschluss hält nur die Reibung zwischen Finger und Werkstück. Beim Formschluss umschließen die Finger das Teil, deshalb ist die zulässige Last höher: Der 2FG14 trägt 14 kg im Kraftschluss und 20 kg im Formschluss. Für die Auslegung zählt der Wert, der zu Ihrem Griff passt.',
        },
      },
      {
        q: { en: 'Which gripper fits a Franka robot? What is the Franka Hand?', de: 'Welcher Greifer passt an einen Franka-Roboter? Was ist die Franka Hand?' },
        a: {
          en: 'The Franka Hand is Franka’s own two-finger parallel gripper. It weighs 730 g, mounts on a DIN ISO 9409-1-A50 flange and takes power and data through the robot flange, so it needs no cable or controller of its own. For vacuum on the Franka Research 3 there are the Cobot Pump by Schmalz and the ECBPMi generator, and the MATCH platform switches between vacuum and mechanical grippers.',
          de: 'Die Franka Hand ist der eigene Zweifinger-Parallelgreifer von Franka. Sie wiegt 730 g, sitzt auf einem Flansch nach DIN ISO 9409-1-A50 und bezieht Strom und Daten über den Roboterflansch, braucht also weder eigenes Kabel noch Controller. Für Vakuum am Franka Research 3 gibt es die Cobot Pump von Schmalz und den Vakuumerzeuger ECBPMi, die Plattform MATCH wechselt zwischen Vakuum- und Mechanikgreifern.',
        },
      },
      {
        q: { en: 'Will the gripper fit my robot?', de: 'Passt der Greifer an meinen Roboter?' },
        a: {
          en: 'OnRobot states that its tools work with all leading robot brands, and its Quick Changer uses an ISO 9409-1 flange. The Franka Hand, on the other hand, is built for Franka arms. Also check the communication and the tool weight against the robot’s payload; we do that check with you before the quote.',
          de: 'OnRobot gibt an, dass seine Werkzeuge mit allen führenden Robotermarken arbeiten, der Quick Changer nutzt einen Flansch nach ISO 9409-1. Die Franka Hand ist dagegen für Franka-Arme gebaut. Prüfen Sie außerdem Kommunikation und Werkzeuggewicht im Verhältnis zur Traglast des Roboters, das klären wir mit Ihnen vor dem Angebot.',
        },
      },
      {
        q: { en: 'Electric or pneumatic gripper?', de: 'Elektrischer oder pneumatischer Greifer?' },
        a: {
          en: 'Electric grippers like the 2FG7 or RG6 need only power and let you set force and stroke in software. The VGC10, VG10 and VGP20 vacuum grippers have their own electric pump. The VGP30 runs on compressed air at 3 to 7 bar and reaches 440 L/min, which helps with porous cardboard at high payloads.',
          de: 'Elektrische Greifer wie der 2FG7 oder RG6 brauchen nur Strom, Kraft und Hub stellen Sie in der Software ein. Die Vakuumgreifer VGC10, VG10 und VGP20 haben eine eigene elektrische Pumpe. Der VGP30 arbeitet mit Druckluft von 3 bis 7 bar und erreicht 440 L/min, was bei porösem Karton und hohen Lasten hilft.',
        },
      },
      {
        q: { en: 'Which gripper suits palletizing?', de: 'Welcher Greifer eignet sich zum Palettieren?' },
        a: {
          en: 'For closed boxes, the VGP20 lifts up to 20 kg all-electric and the VGP30 up to 30 kg with compressed air. For open boxes and containers, the 2FGP20 grips 170 to 430 mm wide with up to 20 kg. Our palletizing page shows the matching robots.',
          de: 'Für geschlossene Kartons hebt der VGP20 vollelektrisch bis 20 kg und der VGP30 mit Druckluft bis 30 kg. Für offene Kartons und Behälter greift der 2FGP20 170 bis 430 mm breit mit bis 20 kg. Passende Roboter zeigt unsere Seite zum Palettieren.',
        },
      },
      {
        q: { en: 'When is a robot hand better than a gripper?', de: 'Wann ist eine Roboterhand besser als ein Greifer?' },
        a: {
          en: 'When the robot has to handle many different objects or use tools made for people, as in humanoid robots and manipulation research. The Agile Hand has 16 degrees of freedom and EtherCAT at 1 kHz, the MagicHand S01 has 11 degrees of freedom, tactile sensing at 0.1 N and carries 5 kg. For a single repeated task, a two-finger gripper is usually simpler and sturdier.',
          de: 'Wenn der Roboter viele verschiedene Objekte handhaben oder Werkzeuge für Menschen benutzen soll, etwa bei humanoiden Robotern und in der Manipulationsforschung. Die Agile Hand hat 16 Freiheitsgrade und EtherCAT mit 1 kHz, die MagicHand S01 hat 11 Freiheitsgrade, taktile Sensorik mit 0,1 N und trägt 5 kg. Für eine einzelne, wiederkehrende Aufgabe ist ein Zweifingergreifer meist einfacher und robuster.',
        },
      },
      {
        q: { en: 'What does a robot gripper cost?', de: 'Was kostet ein Robotergreifer?' },
        a: {
          en: 'It depends on the type and the configuration, for example fingertips, cups, Quick Changer and cables for your robot. That is why we give the price in a quote for your setup.',
          de: 'Das hängt von Bauart und Konfiguration ab, etwa von Fingerspitzen, Saugern, Quick Changer und Kabeln für Ihren Roboter. Deshalb nennen wir den Preis im Angebot für Ihre Konfiguration.',
        },
      },
    ],
  },

  related: [
    { href: '/pages/cobots', label: { en: 'Cobots for your gripper', de: 'Cobots für Ihren Greifer' } },
    { href: '/pages/palletizing-robots', label: { en: 'Palletizing robots', de: 'Palettierroboter' } },
    { href: '/pages/humanoid-robots', label: { en: 'Humanoid robots', de: 'Humanoide Roboter' } },
    { href: '/products/categories/end-effectors-robot-tooling', label: { en: 'All end effectors and robot tooling', de: 'Alle Endeffektoren und Roboterwerkzeuge' } },
    { href: '/solutions/sanding-polishing-painting', label: { en: 'Robotic sanding, polishing and painting', de: 'Robotisches Schleifen, Polieren und Lackieren' } },
    { href: '/solutions/palletizing-end-of-line', label: { en: 'Palletizing and end-of-line automation', de: 'Palettieren und End-of-Line-Automatisierung' } },
    { href: '/manufacturers/onrobot', label: { en: 'All OnRobot products', de: 'Alle Produkte von OnRobot' } },
    { href: '/manufacturers/franka-robotics', label: { en: 'All Franka Robotics products', de: 'Alle Produkte von Franka Robotics' } },
  ],

  cta: {
    eyebrow: { en: 'Advice and quote', de: 'Beratung und Angebot' },
    title: { en: 'Tell us what your robot should grip', de: 'Sagen Sie uns, was Ihr Roboter greifen soll' },
    body: {
      en: 'Give us the workpiece, its weight and your robot. We come back with the grippers that fit and a quote.',
      de: 'Nennen Sie uns Werkstück, Gewicht und Roboter. Wir melden uns mit passenden Greifern und einem Angebot.',
    },
    button: { en: 'Send an enquiry', de: 'Anfrage senden' },
    subject: { en: 'Robot grippers', de: 'Robotergreifer' },
  },

  fine: [
    {
      en: 'Technical data are manufacturer information and may change. The binding data are those in the quote.',
      de: 'Technische Daten sind Herstellerangaben und können sich ändern. Verbindlich sind die Angaben im Angebot.',
    },
    {
      en: 'Payloads apply under the manufacturer’s test conditions. The real value depends on grip type, part shape, surface, friction and robot speed.',
      de: 'Traglasten gelten unter den Prüfbedingungen des Herstellers. Der tatsächliche Wert hängt von Griffart, Teilegeometrie, Oberfläche, Reibung und Robotergeschwindigkeit ab.',
    },
    {
      en: 'For the Franka accessories LWR50L-03, Cobot Pump, ECBPMi and MATCH we have no published figures yet. We request the data from the manufacturer with each enquiry.',
      de: 'Für das Franka-Zubehör LWR50L-03, Cobot Pump, ECBPMi und MATCH liegen uns noch keine veröffentlichten Werte vor. Die Daten fragen wir bei jeder Anfrage beim Hersteller an.',
    },
    {
      en: 'Images are photos and renderings by the manufacturers. Product names and trademarks belong to their owners.',
      de: 'Bilder sind Fotos und Visualisierungen der Hersteller. Produktnamen und Marken gehören ihren Inhabern.',
    },
  ],
}
