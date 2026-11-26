// Content for the cobot buying page at /pages/cobots (and /de/pages/cobots).
//
// All figures come from the products' published Sanity entries
// (specifications, tagline, description, features). A dash in the comparison
// means the manufacturer gives no value. When a product entry changes, change
// it here too.
//
// Images: mainImage from Sanity, except Thor 3 and Thor 7, whose mainImage is a
// 5400 × 1300 banner; their cards use the first gallery picture (cut-out).
// Mobile FR3 Duo and Tactile Mobile Robot share the same base, but their
// Sanity entries differ (125 kg / 1.5 m/s vs. 100 kg / 1.75 m/s); each card
// shows its own entry and the fine print says so.

import { CDN, NONE, same, type LandingContent, type LandingModel } from './types'

const S = {
  payload: { en: 'Payload', de: 'Traglast' },
  armPayload: { en: 'Payload per arm', de: 'Traglast pro Arm' },
  reach: { en: 'Reach', de: 'Reichweite' },
  armReach: { en: 'Reach per arm', de: 'Reichweite pro Arm' },
  rep: { en: 'Repeatability', de: 'Wiederholgenauigkeit' },
  ip: { en: 'Protection', de: 'Schutzart' },
  weight: { en: 'Robot weight', de: 'Eigengewicht' },
  force: { en: 'Force control accuracy', de: 'Kraftregelgenauigkeit' },
  dof: { en: 'Degrees of freedom', de: 'Freiheitsgrade' },
  speed: { en: 'Max. speed', de: 'Max. Geschwindigkeit' },
}

const COLLISION = { en: 'Collision detection', de: 'Kollisionserkennung' }

export const MODELS: LandingModel[] = [
  // ── Thor: 6-axis industrial cobots ─────────────────────────────────────
  {
    slug: 'thor-3',
    name: same('Thor 3'),
    type: { en: 'Compact 6-axis cobot', de: 'Kompakter 6-Achs-Cobot' },
    image: `${CDN}/58852208f548228260193f593d5ea89b0d024e27-1500x1600.png`,
    fit: 'contain',
    blurb: {
      en: 'The smallest Thor, for light assembly, electronics handling and automated workstations where space is tight. Collision detection, graphical programming and joint speeds up to 400°/s. Agile Robots currently offers it in the APAC region only, so ask us about sourcing for Europe.',
      de: 'Der kleinste Thor, für Leichtmontage, Elektronik-Handling und automatisierte Arbeitsplätze mit wenig Platz. Kollisionserkennung, grafische Programmierung und Gelenkgeschwindigkeiten bis 400°/s. Agile Robots bietet ihn derzeit nur in der APAC-Region an. Sprechen Sie uns zur Beschaffung für Europa an.',
    },
    specs: [
      { label: S.payload, value: same('3 kg') },
      { label: S.reach, value: same('600 mm') },
      { label: S.rep, value: { en: '±0.03 mm', de: '±0,03 mm' } },
      { label: S.ip, value: same('IP20') },
    ],
    tags: ['industry'],
    row: {
      axes: same('6'),
      payload: same('3 kg'),
      reach: same('600 mm'),
      rep: { en: '±0.03 mm', de: '±0,03 mm' },
      weight: same('14 kg'),
      ip: same('IP20'),
      force: COLLISION,
    },
  },
  {
    slug: 'thor-7',
    name: same('Thor 7'),
    type: { en: '6-axis cobot', de: '6-Achs-Cobot' },
    image: `${CDN}/dfc75a5daa9f42ca337f5323a3cd50fd3e42f24f-1500x1600.png`,
    fit: 'contain',
    blurb: {
      en: 'Made for assembly, machine tending and loading and unloading. A compact wrist and joint speeds up to 440°/s help with short cycle times. IP54 and built-in collision detection.',
      de: 'Für Montage, Maschinenbeschickung sowie Be- und Entladen. Das kompakte Handgelenk und Gelenkgeschwindigkeiten bis 440°/s helfen bei kurzen Taktzeiten. Schutzart IP54 und integrierte Kollisionserkennung.',
    },
    specs: [
      { label: S.payload, value: same('7 kg') },
      { label: S.reach, value: same('900 mm') },
      { label: S.rep, value: { en: '±0.03 mm', de: '±0,03 mm' } },
      { label: S.ip, value: same('IP54') },
    ],
    tags: ['industry'],
    row: {
      axes: same('6'),
      payload: same('7 kg'),
      reach: same('900 mm'),
      rep: { en: '±0.03 mm', de: '±0,03 mm' },
      weight: same('32 kg'),
      ip: same('IP54'),
      force: COLLISION,
    },
  },
  {
    slug: 'thor-7-pro',
    name: same('Thor 7 Pro'),
    type: { en: 'Force-controlled 6-axis cobot', de: 'Kraftgeregelter 6-Achs-Cobot' },
    image: `${CDN}/12d34bbb56d955624d73c56703d9485d36addb8c-930x620.jpg`,
    fit: 'cover',
    blurb: {
      en: 'The force-controlled version of Thor 7. Torque sensors in every joint give it 0.5 N relative force accuracy, collision detection and hand-guided teaching. For force-controlled assembly, polishing, sanding and quality inspection.',
      de: 'Die kraftgeregelte Version des Thor 7. Drehmomentsensoren in jedem Gelenk bringen 0,5 N relative Kraftgenauigkeit, Kollisionserkennung und Teachen per Handführung. Für kraftgeregelte Montage, Polieren, Schleifen und Qualitätsprüfung.',
    },
    specs: [
      { label: S.payload, value: same('7 kg') },
      { label: S.reach, value: same('900 mm') },
      { label: S.force, value: { en: '0.5 N', de: '0,5 N' } },
      { label: S.ip, value: same('IP54') },
    ],
    tags: ['industry', 'force'],
    row: {
      axes: same('6'),
      payload: same('7 kg'),
      reach: same('900 mm'),
      rep: { en: '±0.03 mm', de: '±0,03 mm' },
      weight: same('38 kg'),
      ip: same('IP54'),
      force: { en: 'Joint torque sensors, 0.5 N', de: 'Gelenk-Drehmomentsensoren, 0,5 N' },
    },
  },
  {
    slug: 'thor-12',
    name: same('Thor 12'),
    type: { en: '6-axis cobot, long reach', de: '6-Achs-Cobot mit großer Reichweite' },
    image: `${CDN}/d714ab599c1e5ce96b53a398f0001b165e2a2fa0-1500x1600.jpg`,
    fit: 'cover',
    blurb: {
      en: '12 kg payload and 1,300 mm reach on a compact footprint, for assembly, handling, palletizing and machine tending. Quick-change end flanges with dragging buttons make tool changes fast. IP54, ±0.05 mm and a TCP speed of up to 3.7 m/s.',
      de: '12 kg Traglast und 1.300 mm Reichweite auf kompakter Stellfläche, für Montage, Handhabung, Palettierung und Maschinenbeschickung. Schnellwechselflansche mit Tasten für die Handführung machen den Werkzeugwechsel schnell. IP54, ±0,05 mm und bis zu 3,7 m/s am TCP.',
    },
    specs: [
      { label: S.payload, value: same('12 kg') },
      { label: S.reach, value: { en: '1,300 mm', de: '1.300 mm' } },
      { label: S.rep, value: { en: '±0.05 mm', de: '±0,05 mm' } },
      { label: S.ip, value: same('IP54') },
    ],
    tags: ['industry'],
    row: {
      axes: same('6'),
      payload: same('12 kg'),
      reach: { en: '1,300 mm', de: '1.300 mm' },
      rep: { en: '±0.05 mm', de: '±0,05 mm' },
      weight: same('35 kg'),
      ip: same('IP54'),
      force: COLLISION,
    },
  },
  {
    slug: 'thor-20',
    name: same('Thor 20'),
    type: { en: 'Heavy-payload 6-axis cobot', de: 'Schwerlast-Cobot, 6 Achsen' },
    image: `${CDN}/e0358e795aa5468eee56cced5edf399c6adb937c-930x620.jpg`,
    fit: 'cover',
    blurb: {
      en: 'The heavy cobot of the range: 20 kg payload and a 1,700 mm working radius for heavy-load assembly, palletizing, loading and unloading and automotive parts. IP54 at the wrist, Modbus RTU and programming by graphics, script or API.',
      de: 'Der schwere Cobot der Reihe: 20 kg Traglast und 1.700 mm Arbeitsradius für Montage schwerer Teile, Palettierung, Be- und Entladen und Automobilkomponenten. IP54 am Handgelenk, Modbus RTU und Programmierung grafisch, per Skript oder API.',
    },
    specs: [
      { label: S.payload, value: same('20 kg') },
      { label: S.reach, value: { en: '1,700 mm', de: '1.700 mm' } },
      { label: S.rep, value: { en: '±0.1 mm', de: '±0,1 mm' } },
      { label: S.weight, value: same('72 kg') },
    ],
    tags: ['industry'],
    row: {
      axes: same('6'),
      payload: same('20 kg'),
      reach: { en: '1,700 mm', de: '1.700 mm' },
      rep: { en: '±0.1 mm', de: '±0,1 mm' },
      weight: same('72 kg'),
      ip: { en: 'IP54 (wrist)', de: 'IP54 (Handgelenk)' },
      force: COLLISION,
    },
  },

  // ── Diana: 7-axis force-control cobots ────────────────────────────────
  {
    slug: 'diana-7',
    name: same('Diana 7'),
    type: { en: '7-axis force-control cobot', de: 'Kraftgeregelter 7-Achs-Cobot' },
    image: `${CDN}/4578280c0220b3ba290b7224007ed4830fe7646c-1280x770.png`,
    fit: 'contain',
    blurb: {
      en: 'The flagship of the Diana series. A torque sensor in each of its 7 joints, impedance control and null-space control for confined workspaces. Diana 7 supports the Franka Control Interface at 1 kHz and dual-arm setups, so it works on the production line and in the research lab.',
      de: 'Das Spitzenmodell der Diana-Reihe. Ein Drehmomentsensor in jedem der 7 Gelenke, Impedanzregelung und Nullraumregelung für enge Arbeitsräume. Diana 7 unterstützt das Franka Control Interface mit 1 kHz und Zweiarm-Aufbauten. Damit passt er an die Linie ebenso wie ins Forschungslabor.',
    },
    specs: [
      { label: S.payload, value: same('7 kg') },
      { label: S.reach, value: same('923 mm') },
      { label: S.force, value: { en: '0.5 N', de: '0,5 N' } },
      { label: S.rep, value: { en: '±0.05 mm', de: '±0,05 mm' } },
    ],
    tags: ['industry', 'research', 'force', 'seven'],
    row: {
      axes: same('7'),
      payload: same('7 kg'),
      reach: same('923 mm'),
      rep: { en: '±0.05 mm', de: '±0,05 mm' },
      weight: same('28 kg'),
      ip: same('IP50'),
      force: { en: '7 joint torque sensors, 0.5 N', de: '7 Gelenk-Drehmomentsensoren, 0,5 N' },
    },
  },
  {
    slug: 'diana-3',
    name: same('Diana 3'),
    type: { en: 'Compact 7-axis force-control cobot', de: 'Kompakter kraftgeregelter 7-Achs-Cobot' },
    image: `${CDN}/214cb98cf405e841cebee5ff5aff7f37f24210f2-1200x1600.jpg`,
    fit: 'cover',
    blurb: {
      en: 'Derived from Diana 7: 3 kg, torque sensors in all 7 joints and only 19 kg robot weight. It mounts at any angle and has the Franka Control Interface built in; according to Agile Robots, code from Franka Research 3 and Diana 7 carries over unchanged. iF Design Award 2023.',
      de: 'Abgeleitet vom Diana 7: 3 kg, Drehmomentsensoren in allen 7 Gelenken und nur 19 kg Eigengewicht. Er lässt sich in jedem Winkel montieren und hat das Franka Control Interface eingebaut. Laut Agile Robots läuft Code von Franka Research 3 und Diana 7 unverändert weiter. iF Design Award 2023.',
    },
    specs: [
      { label: S.payload, value: same('3 kg') },
      { label: S.reach, value: same('772 mm') },
      { label: S.rep, value: { en: '±0.05 mm', de: '±0,05 mm' } },
      { label: S.weight, value: same('19 kg') },
    ],
    tags: ['industry', 'research', 'force', 'seven'],
    row: {
      axes: same('7'),
      payload: same('3 kg'),
      reach: same('772 mm'),
      rep: { en: '±0.05 mm', de: '±0,05 mm' },
      weight: same('19 kg'),
      ip: same('IP54'),
      force: { en: '7 joint torque sensors, 0.5 N', de: '7 Gelenk-Drehmomentsensoren, 0,5 N' },
    },
  },
  {
    slug: 'diana-7-med',
    name: same('Diana 7 Med'),
    type: { en: '7-axis robot for medical applications', de: '7-Achs-Roboter für die Medizintechnik' },
    image: `${CDN}/7e7d7867ef9151992acdaff9f32cd9dfa2408763-1500x1600.jpg`,
    fit: 'cover',
    blurb: {
      en: 'The medical version of Diana 7, which according to Agile Robots meets IEC 60601-1 and IEC 60601-1-2. Impedance control with stiffness and damping set per axis, automatic load compensation and an alcohol-resistant matte coating that does not disturb optical tracking. For robot-assisted surgery, ultrasound diagnostics and rehabilitation.',
      de: 'Die Medizinversion des Diana 7, die laut Agile Robots IEC 60601-1 und IEC 60601-1-2 erfüllt. Impedanzregelung mit Steifigkeit und Dämpfung je Achse, automatische Lasterkennung und eine alkoholbeständige, matte Beschichtung, die optisches Tracking nicht stört. Für robotergestützte Chirurgie, Ultraschalldiagnostik und Rehabilitation.',
    },
    specs: [
      { label: S.payload, value: same('7 kg') },
      { label: S.reach, value: same('916 mm') },
      { label: S.rep, value: { en: '±0.03 mm', de: '±0,03 mm' } },
      { label: S.weight, value: same('30 kg') },
    ],
    tags: ['force', 'seven'],
    row: {
      axes: same('7'),
      payload: same('7 kg'),
      reach: same('916 mm'),
      rep: { en: '±0.03 mm', de: '±0,03 mm' },
      weight: same('30 kg'),
      ip: NONE,
      force: { en: '7 joint torque sensors, 0.5 N', de: '7 Gelenk-Drehmomentsensoren, 0,5 N' },
    },
  },

  // ── Franka research arms ──────────────────────────────────────────────
  {
    slug: 'franka-research-3',
    name: same('Franka Research 3'),
    type: { en: '7-axis research robot arm', de: '7-Achs-Roboterarm für die Forschung' },
    image: `${CDN}/d7d6f1a175453ce52ae63877dfe3a0be0c02d116-1000x750.jpg`,
    fit: 'cover',
    blurb: {
      en: 'The reference arm for robotics and AI research: 7 axes, a torque sensor in every joint and 1 kHz real-time access through the Franka Control Interface. Command joint torque, position, velocity or Cartesian pose, and work with URDF models, ROS 2, MoveIt, Gazebo, MATLAB and Simulink. Engineered and manufactured in Germany.',
      de: 'Der Referenzarm für Robotik- und KI-Forschung: 7 Achsen, ein Drehmomentsensor in jedem Gelenk und Echtzeitzugriff mit 1 kHz über das Franka Control Interface. Vorgaben als Gelenkmoment, -position, -geschwindigkeit oder kartesische Pose, dazu URDF-Modelle, ROS 2, MoveIt, Gazebo, MATLAB und Simulink. In Deutschland entwickelt und gefertigt.',
    },
    specs: [
      { label: S.payload, value: same('3 kg') },
      { label: S.reach, value: same('855 mm') },
      { label: S.rep, value: { en: '<±0.1 mm', de: '<±0,1 mm' } },
      { label: { en: 'Real-time control', de: 'Echtzeitregelung' }, value: same('1 kHz (FCI)') },
    ],
    tags: ['research', 'force', 'seven'],
    row: {
      axes: same('7'),
      payload: same('3 kg'),
      reach: same('855 mm'),
      rep: { en: '<±0.1 mm', de: '<±0,1 mm' },
      weight: NONE,
      ip: NONE,
      force: { en: '7 joint torque sensors', de: '7 Gelenk-Drehmomentsensoren' },
    },
  },
  {
    slug: 'franka-research-3-duo',
    name: same('Franka Research 3 Duo'),
    type: { en: 'Dual-arm research platform', de: 'Zweiarm-Forschungsplattform' },
    image: `${CDN}/9007984c4a2fe6ca5e18f2bd45ee592d2f6b1f90-2000x1125.png`,
    fit: 'cover',
    blurb: {
      en: 'Two FR3 arms on a shared mount, with a head camera and two wrist cameras. One system for teleoperation, data collection and policy execution. The kinematics are tuned for tabletop work with maximum overlap between the arms, so datasets stay reproducible across labs.',
      de: 'Zwei FR3-Arme auf gemeinsamem Montagesatz, mit Kopfkamera und zwei Handgelenkkameras. Ein System für Teleoperation, Datenerhebung und Policy-Ausführung. Die Kinematik ist auf Arbeiten am Tisch mit größtmöglicher Überlappung der Arme ausgelegt, damit Datensätze zwischen Laboren vergleichbar bleiben.',
    },
    specs: [
      { label: S.armPayload, value: same('3 kg') },
      { label: S.armReach, value: same('855 mm') },
      { label: S.dof, value: { en: '2 × 7', de: '2 × 7' } },
      { label: { en: 'Torque sensors', de: 'Drehmomentsensoren' }, value: same('14') },
    ],
    tags: ['research', 'force', 'seven'],
    row: {
      axes: same('2 × 7'),
      payload: { en: '3 kg per arm', de: '3 kg pro Arm' },
      reach: { en: '855 mm per arm', de: '855 mm pro Arm' },
      rep: NONE,
      weight: NONE,
      ip: NONE,
      force: { en: '14 joint torque sensors', de: '14 Gelenk-Drehmomentsensoren' },
    },
  },
  {
    slug: 'franka-gello',
    name: same('Franka GELLO & GELLO Duo'),
    type: { en: 'Teleoperation device for FR3', de: 'Teleoperationsgerät für FR3' },
    image: `${CDN}/2c27dcbb38d431b69b12ef14841ff53c19b4a6e3-1536x1024.png`,
    fit: 'contain',
    blurb: {
      en: 'Open-source teleoperation for FR3 (GELLO) and FR3 Duo (GELLO Duo). You move the device by hand, the robot follows at joint level with low latency, and the demonstrations feed imitation learning. STL files and software are public: build it yourself or order the tested, pre-assembled version.',
      de: 'Open-Source-Teleoperation für FR3 (GELLO) und FR3 Duo (GELLO Duo). Sie führen das Gerät von Hand, der Roboter folgt mit geringer Latenz auf Gelenkebene, und die Vorführungen dienen als Daten für Imitation Learning. STL-Dateien und Software sind öffentlich: selbst bauen oder die geprüfte, vormontierte Version bestellen.',
    },
    specs: [
      { label: { en: 'Versions', de: 'Versionen' }, value: { en: 'Single and dual arm', de: 'Ein- und Zweiarm' } },
      { label: { en: 'Grippers', de: 'Greifer' }, value: same('Franka Hand, Robotiq') },
      { label: { en: 'Software', de: 'Software' }, value: { en: 'ROS 2, open source', de: 'ROS 2, Open Source' } },
    ],
    tags: ['research'],
    row: {
      axes: NONE,
      payload: NONE,
      reach: NONE,
      rep: NONE,
      weight: NONE,
      ip: NONE,
      force: NONE,
    },
  },

  // ── Mobile manipulators ───────────────────────────────────────────────
  {
    slug: 'mobile-fr3-duo',
    name: same('Mobile FR3 Duo'),
    type: { en: 'Dual-arm mobile manipulator', de: 'Mobiler Zweiarm-Manipulator' },
    image: `${CDN}/a5d9c63b7e561bcca2f1599580dba2541c26b33d-2000x1125.png`,
    fit: 'cover',
    blurb: {
      en: 'FR3 Duo on the omnidirectional Tactile Mobile Robot, with mechanics, electronics and software interfaces pre-integrated. Two arms with 14 torque sensors, 2 LiDARs and a Jetson AGX Orin take data collection and policy execution beyond a fixed workcell. The grippers and cameras shown are the separate Vision & Manipulation Kit.',
      de: 'FR3 Duo auf dem omnidirektionalen Tactile Mobile Robot, mit vorintegrierter Mechanik, Elektrik und Softwareschnittstelle. Zwei Arme mit 14 Drehmomentsensoren, 2 LiDARs und ein Jetson AGX Orin bringen Datenerhebung und Policy-Ausführung aus der festen Zelle heraus. Greifer und Kameras im Bild sind das separate Vision & Manipulation Kit.',
    },
    specs: [
      { label: S.armPayload, value: same('3 kg') },
      { label: S.armReach, value: same('855 mm') },
      { label: { en: 'Base payload', de: 'Traglast der Basis' }, value: same('125 kg') },
      { label: S.speed, value: { en: '1.5 m/s', de: '1,5 m/s' } },
    ],
    tags: ['research', 'force', 'seven', 'mobile'],
    row: {
      axes: { en: '2 × 7 (arms)', de: '2 × 7 (Arme)' },
      payload: { en: '3 kg per arm', de: '3 kg pro Arm' },
      reach: { en: '855 mm per arm', de: '855 mm pro Arm' },
      rep: NONE,
      weight: NONE,
      ip: NONE,
      force: { en: '14 joint torque sensors', de: '14 Gelenk-Drehmomentsensoren' },
    },
  },
  {
    slug: 'amr350-01',
    name: same('AMR350-01'),
    type: { en: 'AMR with force-controlled arm', de: 'AMR mit kraftgeregeltem Arm' },
    image: `${CDN}/d40e3b1dd6f12aaa90f5133c5261d9472b16baae-1120x1160.jpg`,
    fit: 'cover',
    blurb: {
      en: 'An autonomous mobile robot with a force-controlled collaborative arm, a flexible end effector and machine vision. It picks, places and inspects parts and moves material between lines, machine tools and workshops without changes to the site. For machine tending, line-side supply and CNC machining.',
      de: 'Ein autonomer mobiler Roboter mit kraftgeregeltem kollaborativem Arm, flexiblem Endeffektor und Bildverarbeitung. Er erkennt, greift, platziert und prüft Teile und bringt Material zwischen Linien, Werkzeugmaschinen und Werkstätten, ohne Umbau vor Ort. Für Maschinenbeschickung, Materialversorgung an der Linie und CNC-Bearbeitung.',
    },
    specs: [
      { label: { en: 'Platform', de: 'Plattform' }, value: { en: 'Autonomous mobile robot', de: 'Autonomer mobiler Roboter' } },
      { label: { en: 'Arm', de: 'Arm' }, value: { en: 'Force-controlled cobot arm', de: 'Kraftgeregelter Cobot-Arm' } },
      { label: { en: 'Tasks', de: 'Aufgaben' }, value: { en: 'Pick, place, inspect, transport', de: 'Greifen, Platzieren, Prüfen, Transport' } },
    ],
    tags: ['industry', 'force', 'mobile'],
    row: {
      axes: NONE,
      payload: NONE,
      reach: NONE,
      rep: NONE,
      weight: NONE,
      ip: NONE,
      force: { en: 'Force-controlled arm', de: 'Kraftgeregelter Arm' },
    },
  },
  {
    slug: 'h10-w',
    name: same('H10-W'),
    type: { en: 'Dual-arm robot on wheels', de: 'Zweiarm-Roboter auf Rädern' },
    image: `${CDN}/93dc81d28831b9c8d849bebac19194dccbb751e6-1120x1160.jpg`,
    fit: 'contain',
    // The photo's own backdrop, carried on to the sides.
    backdrop: 'linear-gradient(#cad2df, #e1e5ee 25%, #f0f2f7 66%, #f9fafc 69%, #f4f5f9)',
    blurb: {
      en: 'Two torque-sensing 7-DoF arms based on Diana 3, a height-adjustable torso and a differential-drive base. H10-W takes voice commands to pick, carry and place objects, for research, education and service tasks.',
      de: 'Zwei drehmomentsensitive 7-DoF-Arme auf Basis des Diana 3, ein höhenverstellbarer Torso und eine Basis mit Differenzialantrieb. H10-W greift, trägt und platziert Objekte auf Sprachbefehl, für Forschung, Lehre und Serviceaufgaben.',
    },
    specs: [
      { label: S.armPayload, value: { en: '3 kg, max. 7 kg', de: '3 kg, max. 7 kg' } },
      { label: S.dof, value: { en: '21+ (without hands)', de: '21+ (ohne Hände)' } },
      { label: { en: 'Weight', de: 'Gewicht' }, value: { en: '230 kg with battery', de: '230 kg mit Akku' } },
      { label: S.speed, value: same('6 km/h') },
    ],
    tags: ['research', 'force', 'seven', 'mobile'],
    row: {
      axes: { en: '2 × 7 (arms)', de: '2 × 7 (Arme)' },
      payload: { en: '3 kg, max. 7 kg per arm', de: '3 kg, max. 7 kg pro Arm' },
      reach: NONE,
      rep: NONE,
      weight: { en: '230 kg (whole robot)', de: '230 kg (Gesamtsystem)' },
      ip: NONE,
      force: { en: 'Torque sensing in both arms', de: 'Drehmomentsensorik in beiden Armen' },
    },
  },
  {
    slug: 'tactile-mobile-robot',
    name: same('Tactile Mobile Robot'),
    type: { en: 'Mobile base for Franka arms', de: 'Mobile Basis für Franka-Arme' },
    image: `${CDN}/abb7c4f57078c9ba895262cdd9dd96cae84476a7-2284x1272.png`,
    fit: 'contain',
    blurb: {
      en: 'The omnidirectional base under Mobile FR3 Duo, also available on its own to put Franka Research 3 on wheels. Pre-configured interfaces for the Franka ecosystem, FCI at 1 kHz, ROS 2, 2 LiDARs, 4 cameras and a Jetson AGX Orin.',
      de: 'Die omnidirektionale Basis unter dem Mobile FR3 Duo, auch einzeln erhältlich, um Franka Research 3 mobil zu machen. Vorkonfigurierte Schnittstellen für das Franka-Ökosystem, FCI mit 1 kHz, ROS 2, 2 LiDARs, 4 Kameras und ein Jetson AGX Orin.',
    },
    specs: [
      { label: { en: 'Base payload', de: 'Traglast der Basis' }, value: same('100 kg') },
      { label: S.speed, value: { en: '1.75 m/s', de: '1,75 m/s' } },
      { label: { en: 'Operating time', de: 'Betriebszeit' }, value: { en: '8 h at 460 W', de: '8 h bei 460 W' } },
      { label: { en: 'Dimensions', de: 'Abmessungen' }, value: same('800 × 580 × 294 mm') },
    ],
    tags: ['research', 'mobile'],
    row: {
      axes: NONE,
      payload: { en: '100 kg (base)', de: '100 kg (Basis)' },
      reach: NONE,
      rep: NONE,
      weight: NONE,
      ip: NONE,
      force: NONE,
    },
  },
]

export const content: LandingContent = {
  meta: {
    title: {
      en: 'Buy Cobots: Collaborative Robots up to 20 kg | MegaRobotics',
      de: 'Cobot kaufen: Kollaborative Roboter bis 20 kg | MegaRobotics',
    },
    description: {
      en: 'Buy a cobot: Thor, Diana and Franka Research 3 compared. Collaborative robots with 3 to 20 kg payload, up to 1,700 mm reach and force control.',
      de: 'Cobot kaufen: Thor, Diana und Franka Research 3 im Vergleich. Kollaborative Roboter mit 3 bis 20 kg Traglast, bis 1.700 mm Reichweite und Kraftregelung.',
    },
    crumb: { en: 'Cobots', de: 'Cobots' },
  },

  heroSlugs: ['diana-7', 'diana-3', 'franka-research-3', 'franka-research-3-duo'],

  hero: { carousel: { en: 'Cobots in our range', de: 'Cobots in unserem Programm' } },

  intro: {
    eyebrow: { en: 'Collaborative robots', de: 'Kollaborative Roboter' },
    title: { en: 'Buy cobots: collaborative robot arms', de: 'Cobot kaufen: kollaborative Roboterarme' },
    lead: {
      en: '{count} cobots, robot arms and mobile manipulators from Agile Robots and Franka Robotics on one page, from the 3 kg research arm to the 20 kg heavy cobot.',
      de: '{count} Cobots, Roboterarme und mobile Manipulatoren von Agile Robots und Franka Robotics auf einer Seite, vom 3-kg-Forschungsarm bis zum schweren Cobot mit 20 kg.',
    },
    body: {
      en: 'A cobot, short for collaborative robot, is a robot arm built to work next to people instead of behind a fence. If you want to buy a cobot, three questions decide most of it: how much it has to carry including the tool, how far it has to reach, and whether the task involves contact that calls for force control.',
      de: 'Ein Cobot, kurz für kollaborativer Roboter, ist ein Roboterarm, der neben Menschen arbeitet statt hinter einem Zaun. Wer einen Cobot kaufen möchte, klärt vor allem drei Fragen: Wie viel muss er samt Werkzeug tragen, wie weit muss er reichen, und hat die Aufgabe Kontakt, der Kraftregelung braucht?',
    },
    jobs: [
      {
        icon: 'Factory',
        title: { en: 'Assembly and machine tending', de: 'Montage und Maschinenbeschickung' },
        body: { en: 'Six axes, short cycle times and up to 20 kg.', de: 'Sechs Achsen, kurze Taktzeiten und bis zu 20 kg.' },
        models: ['thor-7', 'thor-12', 'thor-20'],
      },
      {
        icon: 'Hand',
        title: { en: 'Contact tasks with force control', de: 'Kontaktaufgaben mit Kraftregelung' },
        body: { en: 'Insertion, polishing and sanding with torque sensors in every joint.', de: 'Fügen, Polieren und Schleifen mit Drehmomentsensoren in jedem Gelenk.' },
        models: ['thor-7-pro', 'diana-7', 'diana-3'],
      },
      {
        icon: 'FlaskConical',
        title: { en: 'Research and physical AI', de: 'Forschung und Physical AI' },
        body: { en: 'Real-time control at 1 kHz, teleoperation and data collection.', de: 'Echtzeitregelung mit 1 kHz, Teleoperation und Datenerhebung.' },
        models: ['franka-research-3', 'franka-research-3-duo', 'franka-gello'],
      },
      {
        icon: 'Route',
        title: { en: 'Mobile manipulation', de: 'Mobile Manipulation' },
        body: { en: 'The arm drives to the work instead of waiting for it.', de: 'Der Arm fährt zur Arbeit, statt auf sie zu warten.' },
        models: ['mobile-fr3-duo', 'amr350-01', 'h10-w'],
      },
    ],
  },

  facts: [
    { value: same('3–20 kg'), label: { en: 'payload of the cobot arms', de: 'Traglast der Cobot-Arme' } },
    { value: { en: '1,700 mm', de: '1.700 mm' }, label: { en: 'maximum reach (Thor 20)', de: 'maximale Reichweite (Thor 20)' } },
    { value: { en: '±0.03 mm', de: '±0,03 mm' }, label: { en: 'best repeatability', de: 'beste Wiederholgenauigkeit' } },
    { value: same('7'), label: { en: 'axes with a torque sensor each (Diana, FR3)', de: 'Achsen mit je einem Drehmomentsensor (Diana, FR3)' } },
    { value: { en: '0.5 N', de: '0,5 N' }, label: { en: 'force control accuracy (Diana, Thor 7 Pro)', de: 'Kraftregelgenauigkeit (Diana, Thor 7 Pro)' } },
    { value: same('1 kHz'), label: { en: 'real-time control via FCI', de: 'Echtzeitregelung über FCI' } },
  ],

  groups: [
    {
      id: 'thor-industrial-cobots',
      nav: same('Thor'),
      eyebrow: { en: 'Agile Robots · Thor series', de: 'Agile Robots · Thor-Reihe' },
      title: { en: 'Thor: 6-axis industrial cobots up to 20 kg', de: 'Thor: 6-Achs-Cobots für die Industrie bis 20 kg' },
      lead: {
        en: 'Five six-axis cobots for assembly, handling, machine tending and palletizing, from the compact Thor 3 to the heavy Thor 20.',
        de: 'Fünf sechsachsige Cobots für Montage, Handhabung, Maschinenbeschickung und Palettierung, vom kompakten Thor 3 bis zum schweren Thor 20.',
      },
      body: {
        en: 'Thor 3 and Thor 7 suit small parts and short cycle times. Thor 12 and Thor 20 handle larger parts, longer distances and palletizing. If your task needs force control on six axes, the Thor 7 Pro adds torque sensors in every joint.',
        de: 'Thor 3 und Thor 7 passen zu kleinen Teilen und kurzen Taktzeiten. Thor 12 und Thor 20 übernehmen größere Teile, weitere Wege und das Palettieren. Braucht Ihre Aufgabe Kraftregelung auf sechs Achsen, bringt der Thor 7 Pro Drehmomentsensoren in jedem Gelenk mit.',
      },
      points: [
        { en: '6 axes, 3 to 20 kg payload', de: '6 Achsen, 3 bis 20 kg Traglast' },
        { en: 'Repeatability ±0.03 to ±0.1 mm', de: 'Wiederholgenauigkeit ±0,03 bis ±0,1 mm' },
        { en: 'Built-in collision detection', de: 'Integrierte Kollisionserkennung' },
        { en: 'Graphical, script and API programming', de: 'Programmierung grafisch, per Skript oder API' },
      ],
      manufacturer: 'agile-robots',
      feature: 'thor-12',
      models: ['thor-3', 'thor-7', 'thor-7-pro', 'thor-20'],
    },
    {
      id: 'diana-force-control-cobots',
      nav: same('Diana'),
      eyebrow: { en: 'Agile Robots · Diana series', de: 'Agile Robots · Diana-Reihe' },
      title: { en: 'Diana: 7-axis robot arms with force control', de: 'Diana: 7-Achs-Roboterarme mit Kraftregelung' },
      lead: {
        en: 'Diana has seven axes and a torque sensor in every joint. That gives it a fine sense of contact and room to move around obstacles in a tight cell.',
        de: 'Diana hat sieben Achsen und in jedem Gelenk einen Drehmomentsensor. So spürt er Kontakt sehr fein und kann in einer engen Zelle Hindernissen ausweichen.',
      },
      body: {
        en: 'Diana 7 is the all-rounder for force-controlled assembly, pick and place and research. Diana 3 is the lighter version for small parts and lab automation. Both speak the Franka Control Interface, so research code can move between them and Franka Research 3. Diana 7 Med is the version for medical technology.',
        de: 'Diana 7 ist der Allrounder für kraftgeregelte Montage, Pick-and-Place und Forschung. Diana 3 ist die leichtere Version für kleine Teile und Laborautomation. Beide unterstützen das Franka Control Interface, sodass Forschungscode zwischen ihnen und Franka Research 3 wechseln kann. Diana 7 Med ist die Version für die Medizintechnik.',
      },
      points: [
        { en: 'Torque sensor in each of the 7 joints', de: 'Drehmomentsensor in jedem der 7 Gelenke' },
        { en: '0.5 N force control accuracy', de: '0,5 N Kraftregelgenauigkeit' },
        { en: 'Franka Control Interface at 1 kHz (Diana 3, Diana 7)', de: 'Franka Control Interface mit 1 kHz (Diana 3, Diana 7)' },
        { en: 'Diana 7 Med: IEC 60601-1 and IEC 60601-1-2', de: 'Diana 7 Med: IEC 60601-1 und IEC 60601-1-2' },
      ],
      manufacturer: 'agile-robots',
      feature: 'diana-7',
      models: ['diana-3', 'diana-7-med'],
    },
    {
      id: 'franka-research-arms',
      nav: same('Franka'),
      eyebrow: { en: 'Franka Robotics · Research', de: 'Franka Robotics · Forschung' },
      title: { en: 'Franka Research 3 (FR3) and FR3 Duo for research', de: 'Franka Research 3 (FR3) und FR3 Duo für die Forschung' },
      lead: {
        en: 'FR3 is the force-sensitive robot arm many labs work with. FR3 Duo doubles it for two-handed tasks, and GELLO is the matching teleoperation device.',
        de: 'FR3 ist der kraftsensitive Roboterarm, mit dem viele Labore arbeiten. FR3 Duo verdoppelt ihn für beidhändige Aufgaben, GELLO ist das passende Gerät für die Teleoperation.',
      },
      body: {
        en: 'All three work with the same software: the Franka Control Interface with 1 kHz real-time data, ROS 2, MATLAB and Simulink. A typical path runs from demonstrating a task with GELLO to recording data and running a trained policy on the robot.',
        de: 'Alle drei nutzen dieselbe Software: das Franka Control Interface mit Echtzeitdaten in 1 kHz, ROS 2, MATLAB und Simulink. Ein typischer Ablauf führt von der Vorführung mit GELLO über die Datenaufnahme bis zur trainierten Policy auf dem Roboter.',
      },
      points: [
        { en: '7 axes, 3 kg and 855 mm per arm', de: '7 Achsen, 3 kg und 855 mm pro Arm' },
        { en: 'Torque sensor in every joint', de: 'Drehmomentsensor in jedem Gelenk' },
        { en: 'FCI with 1 kHz, ROS 2, MATLAB & Simulink', de: 'FCI mit 1 kHz, ROS 2, MATLAB & Simulink' },
        { en: 'FR3: engineered and manufactured in Germany', de: 'FR3: in Deutschland entwickelt und gefertigt' },
      ],
      manufacturer: 'franka-robotics',
      feature: 'franka-research-3',
      models: ['franka-research-3-duo', 'franka-gello'],
    },
    {
      id: 'mobile-manipulators',
      nav: { en: 'Mobile', de: 'Mobil' },
      eyebrow: { en: 'Agile Robots and Franka Robotics', de: 'Agile Robots und Franka Robotics' },
      title: { en: 'Mobile manipulators: cobot arms on a mobile base', de: 'Mobile Manipulatoren: Cobot-Arme auf mobiler Basis' },
      lead: {
        en: 'Put a collaborative arm on wheels and it can serve several machines, carry parts between stations or collect data outside a fixed cell.',
        de: 'Auf Rädern bedient ein kollaborativer Arm mehrere Maschinen, bringt Teile von Station zu Station oder sammelt Daten außerhalb einer festen Zelle.',
      },
      body: {
        en: 'For the factory, AMR350-01 combines an autonomous mobile robot with a force-controlled arm and machine vision. For research, Mobile FR3 Duo and H10-W bring two torque-sensing arms each. The Tactile Mobile Robot is the base for building your own mobile Franka setup.',
        de: 'Für die Fabrik verbindet der AMR350-01 einen autonomen mobilen Roboter mit kraftgeregeltem Arm und Bildverarbeitung. Für die Forschung bringen Mobile FR3 Duo und H10-W jeweils zwei drehmomentsensitive Arme mit. Der Tactile Mobile Robot ist die Basis für einen eigenen mobilen Franka-Aufbau.',
      },
      feature: 'mobile-fr3-duo',
      models: ['amr350-01', 'h10-w', 'tactile-mobile-robot'],
    },
  ],

  explainer: {
    eyebrow: { en: 'Basics', de: 'Grundlagen' },
    title: {
      en: 'What is a cobot? Human-robot collaboration explained',
      de: 'Was ist ein Cobot? Mensch-Roboter-Kollaboration (MRK) erklärt',
    },
    paragraphs: [
      {
        en: 'A collaborative robot, or cobot, is a robot arm designed to share its workspace with people. It detects contact and can work at a bench or a machine next to an operator, often without a full safety cell. In German this is called Mensch-Roboter-Kollaboration, or MRK.',
        de: 'Ein kollaborativer Roboter, kurz Cobot, ist ein Roboterarm, der sich den Arbeitsraum mit Menschen teilt. Er erkennt Kontakt und kann an der Werkbank oder an der Maschine neben einem Mitarbeiter arbeiten, oft ohne vollständige Schutzzelle. Diese Form der Zusammenarbeit heißt Mensch-Roboter-Kollaboration, kurz MRK.',
      },
      {
        en: 'Cobots sense contact in different ways. Thor 3, 7, 12 and 20 come with built-in collision detection. Diana, Thor 7 Pro and Franka Research 3 go further with a torque sensor in every joint. They measure contact forces and can control the force they apply, which matters for insertion, polishing and sanding. Diana and Thor 7 Pro state a force control accuracy of 0.5 N.',
        de: 'Cobots erkennen Kontakt auf unterschiedliche Weise. Thor 3, 7, 12 und 20 haben eine integrierte Kollisionserkennung. Diana, Thor 7 Pro und Franka Research 3 gehen weiter und haben in jedem Gelenk einen Drehmomentsensor. Sie messen Kontaktkräfte und regeln die Kraft, mit der sie arbeiten. Das zählt beim Fügen, Polieren und Schleifen. Für Diana und Thor 7 Pro nennt der Hersteller 0,5 N Kraftregelgenauigkeit.',
      },
      {
        en: 'Six or seven axes? A 6-axis cobot such as Thor can reach a point in its workspace at any orientation, which covers most industrial tasks. A 7-axis robot arm such as Diana or FR3 has one extra joint. It can move its elbow while the tool stays in place, known as null-space motion, and so work around obstacles in tight cells.',
        de: 'Sechs oder sieben Achsen? Ein 6-Achs-Cobot wie Thor erreicht einen Punkt in seinem Arbeitsraum in jeder Orientierung. Das genügt für die meisten Industrieaufgaben. Ein 7-Achs-Roboterarm wie Diana oder FR3 hat ein Gelenk mehr. Er kann den Ellbogen bewegen, während das Werkzeug stehen bleibt, die sogenannte Nullraumbewegung, und so in engen Zellen Hindernissen ausweichen.',
      },
      {
        en: 'Whether a cobot application is safe depends on the whole application, not only the robot: the tool, the workpiece, the speed and the people nearby. The standards an application is usually assessed against are ISO 10218 for industrial robots and ISO/TS 15066 for collaborative operation. For Diana 7, Agile Robots lists EN ISO 10218-1:2011 and EN ISO 13849-1 PL d / Cat. 3 among its safety standards; for other models we request the manufacturer documents with your enquiry.',
        de: 'Ob eine Cobot-Anwendung sicher ist, hängt von der ganzen Anwendung ab, nicht nur vom Roboter: von Werkzeug, Werkstück, Geschwindigkeit und den Menschen in der Nähe. Bewertet wird sie in der Regel nach ISO 10218 für Industrieroboter und ISO/TS 15066 für den kollaborierenden Betrieb. Für den Diana 7 nennt Agile Robots unter anderem EN ISO 10218-1:2011 und EN ISO 13849-1 PL d / Kat. 3. Für andere Modelle fordern wir die Herstellerunterlagen mit Ihrer Anfrage an.',
      },
      {
        en: 'Typical cobot jobs are assembly, machine tending, loading and unloading, palletizing, quality inspection and lab automation. In research, force-sensitive robot arms are a common tool for motion control, imitation learning and physical AI. On a mobile base, the same arm moves between stations.',
        de: 'Typische Aufgaben für Cobots sind Montage, Maschinenbeschickung, Be- und Entladen, Palettierung, Qualitätsprüfung und Laborautomation. In der Forschung sind kraftsensitive Roboterarme ein gängiges Werkzeug für Bewegungsregelung, Imitation Learning und Physical AI. Auf einer mobilen Basis fährt derselbe Arm von Station zu Station.',
      },
    ],
  },

  compare: {
    eyebrow: { en: 'Comparison', de: 'Vergleich' },
    title: { en: 'Compare cobots: all models side by side', de: 'Cobots im Vergleich: alle Modelle nebeneinander' },
    subtitle: {
      en: 'Pick what matters and the table narrows down. All values are manufacturer data.',
      de: 'Wählen Sie, was zählt, dann wird die Tabelle kürzer. Alle Werte sind Herstellerangaben.',
    },
    filters: [
      { key: 'industry', label: { en: 'Industry', de: 'Industrie' } },
      { key: 'research', label: { en: 'Research & teaching', de: 'Forschung & Lehre' } },
      { key: 'force', label: { en: 'Force / torque sensing', de: 'Kraft-/Momentensensorik' } },
      { key: 'seven', label: { en: '7 axes', de: '7 Achsen' } },
      { key: 'mobile', label: { en: 'Mobile base', de: 'Mobile Basis' } },
    ],
    cols: [
      { key: 'axes', label: { en: 'Axes', de: 'Achsen' } },
      { key: 'payload', label: { en: 'Payload', de: 'Traglast' } },
      { key: 'reach', label: { en: 'Reach', de: 'Reichweite' } },
      { key: 'rep', label: { en: 'Repeatability', de: 'Wiederholgenauigkeit' } },
      { key: 'weight', label: { en: 'Robot weight', de: 'Eigengewicht' } },
      { key: 'ip', label: { en: 'IP rating', de: 'Schutzart' } },
      { key: 'force', label: { en: 'Force / torque sensing', de: 'Kraft-/Momentensensorik' } },
    ],
    foot: {
      en: '– means the manufacturer gives no value. For dual-arm systems, payload and reach are per arm; for the Tactile Mobile Robot, payload is the load on the base. GELLO is a teleoperation device, so robot data do not apply. All values are manufacturer data.',
      de: '– bedeutet: Der Hersteller nennt keinen Wert. Bei Zweiarmsystemen gelten Traglast und Reichweite pro Arm, beim Tactile Mobile Robot ist die Traglast die Zuladung der Basis. GELLO ist ein Teleoperationsgerät, Roboterdaten entfallen. Alle Werte sind Herstellerangaben.',
    },
  },

  choose: {
    eyebrow: { en: 'Before you buy', de: 'Vor dem Kauf' },
    title: { en: 'How to choose the right cobot', de: 'So finden Sie den passenden Cobot' },
    items: [
      {
        title: { en: 'Payload', de: 'Traglast' },
        body: {
          en: 'Add up workpiece and gripper, and leave some margin. The lightest arms here, Thor 3, Diana 3 and FR3, carry 3 kg, and the gripper counts toward that.',
          de: 'Rechnen Sie Werkstück und Greifer zusammen und lassen Sie Reserve. Die leichtesten Arme hier, Thor 3, Diana 3 und FR3, tragen 3 kg, und der Greifer zählt mit.',
        },
      },
      {
        title: { en: 'Reach', de: 'Reichweite' },
        body: {
          en: 'Measure from the mounting point to the farthest pick point, not just to the place position. In our range reach runs from 600 mm (Thor 3) to 1,700 mm (Thor 20).',
          de: 'Messen Sie vom Montagepunkt bis zum entferntesten Greifpunkt, nicht nur bis zur Ablage. In unserem Programm reicht die Spanne von 600 mm (Thor 3) bis 1.700 mm (Thor 20).',
        },
      },
      {
        title: { en: 'Force control or not', de: 'Kraftregelung oder nicht' },
        body: {
          en: 'Contact tasks such as insertion, polishing or sanding benefit from torque sensors in every joint. For plain pick and place, a cobot with collision detection is often enough.',
          de: 'Aufgaben mit Kontakt wie Fügen, Polieren oder Schleifen profitieren von Drehmomentsensoren in jedem Gelenk. Für reines Umsetzen reicht oft ein Cobot mit Kollisionserkennung.',
        },
      },
      {
        title: { en: 'Six or seven axes', de: 'Sechs oder sieben Achsen' },
        body: {
          en: 'Six axes cover most industrial jobs. Choose a 7-axis arm such as Diana or FR3 when the cell is tight or the robot has to reach around obstacles.',
          de: 'Sechs Achsen decken die meisten Industrieaufgaben ab. Wählen Sie einen 7-Achs-Arm wie Diana oder FR3, wenn die Zelle eng ist oder der Roboter um Hindernisse herum greifen muss.',
        },
      },
      {
        title: { en: 'Environment', de: 'Umgebung' },
        body: {
          en: 'Protection ratings in this range run from IP20 (Thor 3) to IP54 (Thor 7, Thor 12, Diana 3). In dusty or damp conditions that is a real selection criterion.',
          de: 'Die Schutzart reicht in diesem Programm von IP20 (Thor 3) bis IP54 (Thor 7, Thor 12, Diana 3). In staubiger oder feuchter Umgebung ist das ein echtes Auswahlkriterium.',
        },
      },
      {
        title: { en: 'Software and interfaces', de: 'Software und Schnittstellen' },
        body: {
          en: 'Thor and Diana offer graphical, script and API programming. For research, check for real-time access: FR3, Diana 3 and Diana 7 support the Franka Control Interface at 1 kHz, FR3 also ROS 2, MATLAB and Simulink.',
          de: 'Thor und Diana lassen sich grafisch, per Skript oder über eine API programmieren. Für die Forschung zählt der Echtzeitzugriff: FR3, Diana 3 und Diana 7 unterstützen das Franka Control Interface mit 1 kHz, FR3 außerdem ROS 2, MATLAB und Simulink.',
        },
      },
    ],
  },

  faq: {
    eyebrow: { en: 'Questions', de: 'Fragen' },
    title: { en: 'Cobots: frequent questions', de: 'Cobots: häufige Fragen' },
    items: [
      {
        q: { en: 'How much does a cobot cost?', de: 'Was kostet ein Cobot?' },
        a: {
          en: 'That depends on the model and its configuration: controller, software, gripper and accessories such as a mobile base. That is why we give the price in a quote for your configuration. Tell us the task, and we list every item it needs.',
          de: 'Das hängt vom Modell und seiner Konfiguration ab: Steuerung, Software, Greifer und Zubehör wie eine mobile Basis. Deshalb nennen wir den Preis im Angebot für Ihre Konfiguration. Beschreiben Sie uns die Aufgabe, dann führen wir alle nötigen Positionen auf.',
        },
      },
      {
        q: { en: 'What is the difference between a cobot and an industrial robot?', de: 'Was unterscheidet einen Cobot von einem Industrieroboter?' },
        a: {
          en: 'A cobot is designed to share a workspace with people and detects collisions. Classic industrial robots usually run faster with heavier loads, but behind guarding. The collaborative robots on this page carry 3 to 20 kg.',
          de: 'Ein Cobot ist dafür ausgelegt, sich den Arbeitsraum mit Menschen zu teilen, und erkennt Kollisionen. Klassische Industrieroboter arbeiten meist schneller und mit höheren Lasten, dafür hinter Schutzeinrichtungen. Die kollaborativen Roboter auf dieser Seite tragen 3 bis 20 kg.',
        },
      },
      {
        q: { en: 'Does a cobot still need guarding?', de: 'Braucht ein Cobot in der MRK trotzdem eine Schutzeinrichtung?' },
        a: {
          en: 'That is decided by the risk assessment of the actual application, not by the robot alone. A sharp workpiece, a heavy tool or high speed can call for extra measures. ISO 10218 and ISO/TS 15066 are the standards a collaborative application is usually assessed against. We gather the manufacturer documents for you; the risk assessment itself is done by the integrator or operator.',
          de: 'Das entscheidet die Risikobeurteilung der konkreten Anwendung, nicht der Roboter allein. Ein scharfkantiges Werkstück, ein schweres Werkzeug oder hohe Geschwindigkeit können zusätzliche Maßnahmen nötig machen. Bewertet wird eine MRK-Anwendung in der Regel nach ISO 10218 und ISO/TS 15066. Wir besorgen Ihnen die Herstellerunterlagen, die Risikobeurteilung selbst erstellt der Integrator oder Betreiber.',
        },
      },
      {
        q: { en: 'Thor or Diana: which cobot fits better?', de: 'Thor oder Diana: Welcher Cobot passt besser?' },
        a: {
          en: 'Thor has six axes and covers larger loads, up to 20 kg on the Thor 20. Diana has seven axes and a torque sensor in every joint, which helps in tight workspaces and on force-controlled tasks; Diana 7 carries 7 kg at 923 mm reach. If you want force control on six axes, the Thor 7 Pro is the alternative.',
          de: 'Thor hat sechs Achsen und deckt größere Lasten ab, beim Thor 20 bis 20 kg. Diana hat sieben Achsen und in jedem Gelenk einen Drehmomentsensor. Das hilft in engen Arbeitsräumen und bei kraftgeregelten Aufgaben, der Diana 7 trägt 7 kg bei 923 mm Reichweite. Wer Kraftregelung mit sechs Achsen möchte, nimmt den Thor 7 Pro.',
        },
      },
      {
        q: { en: 'What is a 7-axis robot arm good for?', de: 'Wofür eignet sich ein 7-Achs-Roboterarm?' },
        a: {
          en: 'The seventh joint lets the arm change its posture while the tool keeps its position. Diana 3, Diana 7 and Franka Research 3 use this to work around obstacles in confined spaces. With a torque sensor in every joint, these arms also suit force-controlled tasks and research on motion control.',
          de: 'Mit dem siebten Gelenk kann der Arm seine Haltung ändern, während das Werkzeug an Ort und Stelle bleibt. Diana 3, Diana 7 und Franka Research 3 nutzen das, um in engen Räumen Hindernissen auszuweichen. Mit einem Drehmomentsensor in jedem Gelenk eignen sich diese Arme außerdem für kraftgeregelte Aufgaben und für die Forschung an Bewegungsregelung.',
        },
      },
      {
        q: { en: 'Which cobot for heavy loads? What does the Thor 20 carry?', de: 'Welcher Cobot für schwere Lasten? Was trägt der Thor 20?' },
        a: {
          en: 'The heaviest cobot on this page is the Thor 20: 20 kg payload, 1,700 mm working radius, ±0.1 mm repeatability and 72 kg robot weight. Below it, the Thor 12 carries 12 kg over 1,300 mm. Remember that the payload has to include the gripper. Agile Robots lists the Thor 20 as coming soon, so ask us about its current status.',
          de: 'Der schwerste Cobot auf dieser Seite ist der Thor 20: 20 kg Traglast, 1.700 mm Arbeitsradius, ±0,1 mm Wiederholgenauigkeit und 72 kg Eigengewicht. Darunter trägt der Thor 12 12 kg über 1.300 mm. Denken Sie daran, dass der Greifer zur Traglast zählt. Agile Robots führt den Thor 20 als demnächst verfügbar, fragen Sie uns nach dem aktuellen Stand.',
        },
      },
      {
        q: { en: 'Franka Research 3, Franka Duo or GELLO: what do I need?', de: 'Franka Research 3, Franka Duo oder GELLO: Was brauche ich?' },
        a: {
          en: 'FR3 is the single arm: 3 kg, 855 mm, 7 axes and 1 kHz real-time control. Franka Research 3 Duo puts two arms on a shared mount with a head camera and two wrist cameras, for bimanual teleoperation, data collection and policy execution. GELLO and GELLO Duo are the matching open-source teleoperation devices for one or two arms.',
          de: 'FR3 ist der Einzelarm: 3 kg, 855 mm, 7 Achsen und Echtzeitregelung mit 1 kHz. Franka Research 3 Duo setzt zwei Arme auf einen gemeinsamen Montagesatz, mit Kopfkamera und zwei Handgelenkkameras, für beidhändige Teleoperation, Datenerhebung und Policy-Ausführung. GELLO und GELLO Duo sind die passenden Open-Source-Teleoperationsgeräte für einen oder zwei Arme.',
        },
      },
      {
        q: { en: 'Can code move between Diana and Franka Research 3?', de: 'Lässt sich Code zwischen Diana und Franka Research 3 übertragen?' },
        a: {
          en: 'Diana 3 and Diana 7 support the Franka Control Interface (FCI) at 1 kHz, the same interface as Franka Research 3. According to Agile Robots, code and toolchains from FR3 and Diana 7 carry over to Diana 3 unchanged. Diana 7 adds 7 kg payload, against 3 kg on FR3.',
          de: 'Diana 3 und Diana 7 unterstützen das Franka Control Interface (FCI) mit 1 kHz, dieselbe Schnittstelle wie Franka Research 3. Laut Agile Robots laufen Code und Toolchains von FR3 und Diana 7 auf dem Diana 3 unverändert. Diana 7 bringt 7 kg Traglast mit, FR3 3 kg.',
        },
      },
      {
        q: { en: 'Which cobot manufacturers do you offer?', de: 'Welche Cobot-Hersteller bieten Sie an?' },
        a: {
          en: 'On this page: Agile Robots with the Thor and Diana series and mobile manipulators, and Franka Robotics with the Franka Research 3 family and the Tactile Mobile Robot. We compare models across both manufacturers and quote the configuration that fits your task.',
          de: 'Auf dieser Seite: Agile Robots mit den Reihen Thor und Diana sowie mobilen Manipulatoren und Franka Robotics mit der Familie Franka Research 3 und dem Tactile Mobile Robot. Wir vergleichen die Modelle beider Hersteller und bieten die Konfiguration an, die zu Ihrer Aufgabe passt.',
        },
      },
    ],
  },

  related: [
    { href: '/solutions/industrial-arms', label: { en: 'Industrial automation and robot arms', de: 'Industrielle Automatisierung und Roboterarme' } },
    { href: '/solutions/sanding-polishing-painting', label: { en: 'Robotic sanding, polishing and painting', de: 'Robotisches Schleifen, Polieren und Lackieren' } },
    { href: '/solutions/research-education', label: { en: 'Research and education robotics', de: 'Forschungs- und Bildungsrobotik' } },
    { href: '/pages/robot-grippers', label: { en: 'Robot grippers for cobots', de: 'Robotergreifer für Cobots' } },
    { href: '/pages/mobile-robots', label: { en: 'Mobile robots', de: 'Mobile Roboter' } },
    { href: '/pages/humanoid-robots', label: { en: 'Humanoid robots', de: 'Humanoide Roboter' } },
    { href: '/manufacturers/agile-robots', label: { en: 'All products from Agile Robots', de: 'Alle Produkte von Agile Robots' } },
    { href: '/manufacturers/franka-robotics', label: { en: 'All products from Franka Robotics', de: 'Alle Produkte von Franka Robotics' } },
    { href: '/ip-ratings', label: { en: 'IP ratings explained', de: 'IP-Schutzarten erklärt' } },
  ],

  cta: {
    eyebrow: { en: 'Advice and quote', de: 'Beratung und Angebot' },
    title: { en: 'Tell us what your cobot should do', de: 'Sagen Sie uns, was Ihr Cobot tun soll' },
    body: {
      en: 'Send us the workpiece, cycle time and environment. We come back with the cobots that fit and a quote.',
      de: 'Nennen Sie uns Werkstück, Taktzeit und Umgebung. Wir melden uns mit passenden Cobots und einem Angebot.',
    },
    button: { en: 'Send an enquiry', de: 'Anfrage senden' },
    subject: { en: 'Cobots', de: 'Cobots' },
  },

  fine: [
    {
      en: 'Technical data are manufacturer information and may change. The binding data are those in the quote.',
      de: 'Technische Daten sind Herstellerangaben und können sich ändern. Verbindlich sind die Angaben im Angebot.',
    },
    {
      en: 'Availability as stated by Agile Robots: Thor 3 is currently offered in the APAC region only, and Thor 20 is listed as coming soon. We check sourcing for Europe with each enquiry.',
      de: 'Verfügbarkeit laut Agile Robots: Thor 3 wird derzeit nur in der APAC-Region angeboten, Thor 20 ist als demnächst verfügbar gelistet. Die Beschaffung für Europa prüfen wir bei jeder Anfrage.',
    },
    {
      en: 'Mobile FR3 Duo and Tactile Mobile Robot use the same base, but the figures differ: 125 kg payload and 1.5 m/s for Mobile FR3 Duo, 100 kg and 1.75 m/s for the Tactile Mobile Robot. Each card shows the figures from its own product data.',
      de: 'Mobile FR3 Duo und Tactile Mobile Robot nutzen dieselbe Basis, die Angaben weichen aber ab: 125 kg Traglast und 1,5 m/s beim Mobile FR3 Duo, 100 kg und 1,75 m/s beim Tactile Mobile Robot. Jede Karte zeigt die Werte aus den eigenen Produktdaten.',
    },
    {
      en: 'Images are photos and renderings by the manufacturers. Product names and trademarks belong to their owners.',
      de: 'Bilder sind Fotos und Visualisierungen der Hersteller. Produktnamen und Marken gehören ihren Inhabern.',
    },
  ],
}
