// Video heroes for product pages: a full-width slider of muted application
// clips with the product's key specs and use cases beside them.
//
// Clips and posters are self-hosted at media.megarobotics.de under
// /agile/hero/<product>/, each poster being the clip's path with .jpg — the
// same convention VideoEmbed uses. The staged set (61.6 MB) lives in Dropbox
// at Website/product-hero-sliders/media-upload, laid out to copy straight
// onto the media box.
//
// Sources: Agile Robots datasheets/brochures and agile-robots.com product
// pages (retrieved 2026-10-30). Specs show only values the sources agree on;
// Diana 7 IP rating and weight are left out because datasheet and flyer
// disagree. Copyright in the footage belongs to Agile Robots SE.

import type { Locale } from '@/i18n/config'

type L = { en: string; de: string }

interface HeroSpec {
  value: number | string
  unit?: string
  label: L
  prefix?: string
  decimals?: number
}

interface HeroSlide {
  id: string
  eyebrow: L
  tagline: L
  /** Path below the media base, e.g. /agile/hero/diana-7/surface-finishing.mp4 */
  video?: string
  /** Full image URL, for products without footage yet; needs `duration`. */
  image?: string
  /** Repeat a short clip for `duration` seconds instead of advancing when it ends. */
  loop?: boolean
  duration?: number
  /** Slides the video left so the subject clears the text panel, e.g. "-16%". */
  shift?: string
  /** Percent of the frame height to push below the fold, for burnt-in subtitles. */
  cropBottom?: number
  /** Which part of the clip stays in view when cropped (object-position); default "center top". */
  focus?: string
  /** Small caption over the media, e.g. to mark footage as AI-generated. */
  note?: L
  useCases: [L, L][]
}

interface ProductHero {
  /** Display name, used where the hero runs outside the product's own page. */
  name: string
  specs: HeroSpec[]
  slides: HeroSlide[]
}

/** Overridable so a preview build can point at a local copy of the clips. */
export const HERO_MEDIA_BASE = process.env.NEXT_PUBLIC_HERO_MEDIA_BASE || 'https://media.megarobotics.de'

const HEROES: Record<string, ProductHero> = {
  'diana-7': {
    name: 'Diana 7',
    specs: [
      { value: 7, label: { en: 'Axes', de: 'Achsen' } },
      { value: 7, unit: 'kg', label: { en: 'Payload', de: 'Traglast' } },
      { value: 923, unit: 'mm', label: { en: 'Reach', de: 'Reichweite' } },
      { value: 0.05, unit: 'mm', prefix: '±', decimals: 2, label: { en: 'Repeatability', de: 'Wiederholgenauigkeit' } },
      { value: 0.5, unit: 'N', decimals: 1, label: { en: 'Force control', de: 'Kraftregelung' } },
      { value: 'PL d', label: { en: 'Safety · Cat. 3', de: 'Sicherheit · Kat. 3' } },
    ],
    slides: [
      {
        id: 'surface-finishing',
        eyebrow: { en: 'Surface finishing', de: 'Oberflächenbearbeitung' },
        tagline: {
          en: 'Seven torque-sensing joints keep contact force constant across curved body panels.',
          de: 'Sieben drehmomentsensible Gelenke halten die Anpresskraft auch auf gewölbten Karosserieteilen konstant.',
        },
        video: '/agile/hero/diana-7/surface-finishing.mp4',
        cropBottom: 20, // Agile's cut carries English subtitles along the bottom
        useCases: [
          [{ en: 'Primer sanding', de: 'Füller schleifen' }, { en: 'automotive paint shop', de: 'Lackiererei im Automobilbau' }],
          [{ en: 'Polishing', de: 'Polieren' }, { en: 'constant-force finishing', de: 'mit konstanter Kraft' }],
          [{ en: 'Multi-arm cells', de: 'Mehrarm-Zellen' }, { en: 'four arms on one body', de: 'vier Arme an einer Karosse' }],
        ],
      },
      {
        id: 'precision-assembly',
        eyebrow: { en: 'Precision assembly', de: 'Präzisionsmontage' },
        tagline: {
          en: '±0.05 mm repeatability and a 7th axis to reach around fixtures in tight cells.',
          de: '±0,05 mm Wiederholgenauigkeit und eine siebte Achse, die in engen Zellen um Vorrichtungen herumgreift.',
        },
        video: '/agile/hero/diana-7/precision-assembly.mp4',
        shift: '-16%',
        useCases: [
          [{ en: 'Pick & place', de: 'Pick & Place' }, { en: 'small, delicate parts', de: 'kleine, empfindliche Teile' }],
          [{ en: '3C electronics', de: '3C-Elektronik' }, { en: 'precise part handling', de: 'präzises Teilehandling' }],
          [{ en: 'Machine tending', de: 'Maschinenbeschickung' }, { en: 'intelligent production lines', de: 'intelligente Fertigungslinien' }],
        ],
      },
      {
        id: 'safe-collaboration',
        eyebrow: { en: 'Safe collaboration', de: 'Sichere Kollaboration' },
        tagline: {
          en: 'Impedance control and collision detection let people and robot share the workspace.',
          de: 'Impedanzregelung und Kollisionserkennung lassen Mensch und Roboter denselben Arbeitsraum teilen.',
        },
        video: '/agile/hero/diana-7/safe-collaboration.mp4',
        shift: '-20%',
        useCases: [
          [{ en: 'Hand-guiding', de: 'Handführung' }, { en: 'teach by moving the arm', de: 'Teachen durch Führen des Arms' }],
          [{ en: 'Compliant contact', de: 'Nachgiebiger Kontakt' }, { en: 'impedance-based motion', de: 'impedanzgeregelte Bewegung' }],
          [{ en: 'Research', de: 'Forschung' }, { en: 'real-time control via FCI', de: 'Echtzeitsteuerung über FCI' }],
        ],
      },
      {
        id: 'automotive-wiring-harness',
        eyebrow: { en: 'Automotive', de: 'Automobil' },
        tagline: {
          en: 'Force-sensitive insertion and routing for flexible, hard-to-automate parts.',
          de: 'Kraftsensitives Stecken und Verlegen biegeschlaffer Teile, die sich sonst kaum automatisieren lassen.',
        },
        video: '/agile/hero/diana-7/automotive-wiring-harness.mp4',
        shift: '-8%',
        useCases: [
          [{ en: 'Wiring harness', de: 'Kabelbaum' }, { en: 'compliant insertion & routing', de: 'nachgiebiges Stecken & Verlegen' }],
          [{ en: 'Connector mating', de: 'Steckverbindungen' }, { en: 'force-controlled', de: 'kraftgeregelt' }],
          [{ en: 'Quality inspection', de: 'Qualitätsprüfung' }, { en: 'in-line checks', de: 'Prüfung in der Linie' }],
        ],
      },
    ],
  },

  'agile-one': {
    name: 'Agile ONE',
    specs: [
      { value: 174, unit: 'cm', label: { en: 'Height', de: 'Größe' } },
      { value: 69, unit: 'kg', label: { en: 'Weight', de: 'Gewicht' } },
      { value: 2.0, unit: 'm/s', decimals: 1, label: { en: 'Walking speed', de: 'Gehgeschwindigkeit' } },
      { value: 20, unit: 'kg', label: { en: 'Payload', de: 'Traglast' } },
      { value: 21, label: { en: 'Joints per hand', de: 'Gelenke pro Hand' } },
      { value: 'Lidar', label: { en: '+ cameras', de: '+ Kameras' } },
    ],
    slides: [
      {
        id: 'humanoid-robot',
        eyebrow: { en: 'Humanoid robot', de: 'Humanoider Roboter' },
        tagline: {
          en: 'Physical AI for the production floor: a life-sized humanoid that works autonomously, precisely and safely.',
          de: 'Physical AI für die Fertigung: ein lebensgroßer Humanoider, der selbstständig, präzise und sicher arbeitet.',
        },
        video: '/agile/hero/agile-one/stage.mp4',
        shift: '-18%',
        useCases: [
          [{ en: 'Manufacturing', de: 'Fertigung' }, { en: 'assembly & part handling', de: 'Montage & Teilehandling' }],
          [{ en: 'Logistics', de: 'Logistik' }, { en: 'moving goods between stations', de: 'Material zwischen Stationen bewegen' }],
          [{ en: 'Human teams', de: 'Im Team mit Menschen' }, { en: 'a co-worker, not a cage', de: 'Kollege statt Schutzzaun' }],
        ],
      },
      {
        id: 'designed-for-industry',
        eyebrow: { en: 'Designed for industry', de: 'Für die Industrie gebaut' },
        tagline: {
          en: 'Moves on its own between workstations and plugs into the existing line instead of replacing it.',
          de: 'Wechselt selbstständig zwischen Arbeitsplätzen und fügt sich in bestehende Linien ein, statt sie zu ersetzen.',
        },
        video: '/agile/hero/agile-one/factory-topshot.mp4',
        useCases: [
          [{ en: 'Station to station', de: 'Von Station zu Station' }, { en: 'autonomous navigation', de: 'autonome Navigation' }],
          [{ en: 'Mixed fleets', de: 'Gemischte Flotten' }, { en: 'works with Diana, Thor & AMRs', de: 'mit Diana, Thor & AMRs' }],
          [{ en: 'AgileCore', de: 'AgileCore' }, { en: 'one software ecosystem', de: 'ein Software-Ökosystem' }],
        ],
      },
      {
        id: 'sees-and-moves',
        eyebrow: { en: 'Sees and moves', de: 'Sieht und bewegt sich' },
        tagline: {
          en: 'Cameras, lidar and speech recognition. It tracks movement and spots obstacles, even behind an oversized load.',
          de: 'Kameras, Lidar und Spracherkennung. Agile ONE verfolgt Bewegungen und erkennt Hindernisse, selbst hinter sperriger Last.',
        },
        video: '/agile/hero/agile-one/sees-and-moves.mp4',
        shift: '-10%',
        useCases: [
          [{ en: 'Warehouse aisles', de: 'Lagergassen' }, { en: 'walks at 2 m/s', de: 'mit 2 m/s unterwegs' }],
          [{ en: 'Bulky carries', de: 'Sperrige Lasten' }, { en: 'sees past the load', de: 'sieht an der Last vorbei' }],
          [{ en: 'Voice & display', de: 'Sprache & Display' }, { en: 'status at a glance', de: 'Status auf einen Blick' }],
        ],
      },
      {
        id: 'dexterity',
        eyebrow: { en: 'Human-like dexterity', de: 'Menschliche Geschicklichkeit' },
        tagline: {
          en: 'Modular fingers with 21 joints per hand and force and tactile sensing, for delicate and powerful grips alike.',
          de: 'Modulare Finger mit 21 Gelenken pro Hand sowie Kraft- und Tastsensorik für feinfühlige wie kräftige Griffe.',
        },
        video: '/agile/hero/agile-one/dexterity.mp4',
        shift: '-6%',
        useCases: [
          [{ en: 'Small parts', de: 'Kleinteile' }, { en: 'nuts, fittings, fasteners', de: 'Muttern, Fittings, Befestiger' }],
          [{ en: 'Tool handling', de: 'Werkzeughandling' }, { en: 'firm, stable grasps', de: 'fester, sicherer Griff' }],
          [{ en: 'Varied objects', de: 'Wechselnde Objekte' }, { en: 'no gripper changes', de: 'ohne Greiferwechsel' }],
        ],
      },
      {
        id: 'learns-on-the-line',
        eyebrow: { en: 'Learns on the line', de: 'Lernt in der Linie' },
        tagline: {
          en: 'Robot Foundation Models trained on real factory data, simulation and teleoperation get better with every task.',
          de: 'Robot Foundation Models, trainiert mit echten Fabrikdaten, Simulation und Teleoperation, werden mit jeder Aufgabe besser.',
        },
        video: '/agile/hero/agile-one/learns-on-the-line.mp4',
        shift: '-12%',
        useCases: [
          [{ en: 'Line-side work', de: 'An der Linie' }, { en: 'loading & handling parts', de: 'Teile laden & handhaben' }],
          [{ en: 'Changeovers', de: 'Umrüsten' }, { en: 'adapts to new tasks', de: 'passt sich neuen Aufgaben an' }],
          [{ en: 'Physical AI', de: 'Physical AI' }, { en: 'trained on industrial data', de: 'trainiert mit Industriedaten' }],
        ],
      },
    ],
  },

  // No official footage yet (2026-10-30), so a still from the product's Sanity
  // gallery stands in. Specs match the Sanity product and NVIDIA's launch release.
  'agile-one-s': {
    name: 'Agile ONE S',
    specs: [
      { value: 140, unit: 'cm', label: { en: 'Height', de: 'Größe' } },
      { value: 40, unit: 'kg', label: { en: 'Weight', de: 'Gewicht' } },
      { value: 31, label: { en: 'DoF (body)', de: 'Freiheitsgrade (Körper)' } },
      { value: 3, unit: 'kg', label: { en: 'Payload per arm', de: 'Traglast pro Arm' } },
      { value: 13, label: { en: 'DoF per hand', de: 'Freiheitsgrade pro Hand' } },
      { value: 'Jetson Thor', label: { en: 'Onboard AI', de: 'KI an Bord' } },
    ],
    slides: [
      {
        id: 'research-platform',
        eyebrow: { en: 'Research humanoid', de: 'Forschungs-Humanoid' },
        tagline: {
          en: 'A compact humanoid with an open software stack, so labs and developers can run their own models and frameworks.',
          de: 'Ein kompakter Humanoid mit offenem Software-Stack – Labore und Entwickler bringen eigene Modelle und Frameworks mit.',
        },
        image: 'https://cdn.sanity.io/images/wudur8e8/production/44ab7fc6ae3a186c295cb450acd729790667d346-4000x2500.jpg',
        duration: 10,
        shift: '-14%',
        useCases: [
          [{ en: 'Embodied AI', de: 'Embodied AI' }, { en: 'research & imitation learning', de: 'Forschung & Imitation Learning' }],
          [{ en: 'Skill development', de: 'Fähigkeiten entwickeln' }, { en: 'URDF & USD for simulation', de: 'URDF & USD für die Simulation' }],
          [{ en: 'Universities', de: 'Hochschulen' }, { en: 'teaching & labs', de: 'Lehre & Labore' }],
        ],
      },
    ],
  },

  // Clip cut from Agile Robots' Agile ONE SN video (partner footage, 720p);
  // copyright stays with Agile Robots. Specs from the product's Sanity entry.
  'agile-one-sn': {
    name: 'Agile ONE SN',
    specs: [
      { value: 140, unit: 'cm', label: { en: 'Height', de: 'Größe' } },
      { value: 43, unit: 'kg', label: { en: 'Weight', de: 'Gewicht' } },
      { value: 31, label: { en: 'DoF (body)', de: 'Freiheitsgrade' } },
      { value: 3, unit: 'kg', label: { en: 'Payload per arm', de: 'Traglast pro Arm' } },
      { value: 2, label: { en: 'Tactile hands', de: 'Taktile Hände' } },
      { value: 'GR00T 1.7', label: { en: 'Preinstalled', de: 'Vorinstalliert' } },
    ],
    slides: [
      {
        id: 'research-lab',
        eyebrow: { en: 'Humanoid for physical AI', de: 'Humanoid für Physical AI' },
        tagline: {
          en: 'Agile ONE S with tactile Wuji hands and NVIDIA Isaac GR00T, ready from simulation to real-world tests.',
          de: 'Agile ONE S mit taktilen Wuji-Händen und NVIDIA Isaac GR00T – startklar von der Simulation bis zur Realität.',
        },
        video: '/agile/hero/agile-one-sn/research-lab.mp4',
        shift: '-14%',
        useCases: [
          [{ en: 'Physical AI', de: 'Physical AI' }, { en: 'GR00T 1.7 & whole-body control', de: 'GR00T 1.7 & Ganzkörpersteuerung' }],
          [{ en: 'Simulation to real', de: 'Von der Simulation in die Realität' }, { en: 'Isaac Sim & Isaac Lab', de: 'Isaac Sim & Isaac Lab' }],
          [{ en: 'Dexterous grasping', de: 'Geschicktes Greifen' }, { en: 'tactile five-finger hands', de: 'taktile Fünffingerhände' }],
        ],
      },
    ],
  },

  'agile-hand': {
    name: 'Agile Hand',
    specs: [
      { value: 21, label: { en: 'Joints', de: 'Gelenke' } },
      { value: 16, label: { en: 'DoF (max.)', de: 'Freiheitsgrade (max.)' } },
      { value: 1.5, unit: 'kg', decimals: 1, label: { en: 'Weight', de: 'Gewicht' } },
      { value: 10, unit: 'N', label: { en: 'Fingertip force', de: 'Fingerspitzenkraft' } },
      { value: 360, unit: '°/s', label: { en: 'Joint velocity', de: 'Gelenkgeschwindigkeit' } },
      { value: 1, unit: 'kHz', label: { en: 'Control rate', de: 'Regeltakt' } },
    ],
    slides: [
      {
        id: 'dexterity',
        eyebrow: { en: 'Human-like dexterity', de: 'Menschliche Geschicklichkeit' },
        tagline: {
          en: "Five identical, modular fingers shaped like a human hand. It takes on delicate work where people can't lend a hand.",
          de: 'Fünf identische, modulare Finger nach dem Vorbild der menschlichen Hand – für Feinarbeit, wo Menschen nicht zugreifen können.',
        },
        video: '/agile/hero/agile-hand/dexterity-loop.mp4',
        loop: true,
        duration: 11.7,
        shift: '-10%',
        useCases: [
          [{ en: 'Research', de: 'Forschung' }, { en: 'grasping & manipulation algorithms', de: 'Greif- & Manipulationsalgorithmen' }],
          [{ en: 'Manufacturing', de: 'Fertigung' }, { en: 'small or hazardous parts', de: 'kleine oder gefährliche Teile' }],
          [{ en: 'Space', de: 'Raumfahrt' }, { en: 'a space-qualified version has been tested', de: 'eine raumfahrttaugliche Version wurde erprobt' }],
        ],
      },
      {
        id: 'modular-design',
        eyebrow: { en: 'Modular by design', de: 'Modular aufgebaut' },
        tagline: {
          en: 'Actuators, electronics, sensors and transmission sit inside every finger, so the hand is simple to service and reconfigure.',
          de: 'Antriebe, Elektronik, Sensorik und Getriebe stecken in jedem Finger – das macht Wartung und Umbau einfach.',
        },
        video: '/agile/hero/agile-hand/modular-design.mp4',
        loop: true,
        duration: 7.8,
        shift: '-18%',
        useCases: [
          [{ en: 'Maintenance', de: 'Wartung' }, { en: 'swap a single finger', de: 'einzelne Finger tauschen' }],
          [{ en: 'Reconfiguration', de: 'Umkonfiguration' }, { en: 'adapt the hand to the task', de: 'Hand an die Aufgabe anpassen' }],
          [{ en: 'Any cobot', de: 'Jeder Cobot' }, { en: 'ISO 9409-1-50-4-M6 quick changer', de: 'Schnellwechsler nach ISO 9409-1-50-4-M6' }],
        ],
      },
      {
        id: 'sensitive-control',
        eyebrow: { en: 'Sensitive control', de: 'Feinfühlige Regelung' },
        tagline: {
          en: 'Torque and position sensing in every actuated joint, with active compliant control that is safe around people.',
          de: 'Drehmoment- und Positionssensorik in jedem angetriebenen Gelenk, mit aktiv nachgiebiger Regelung für die Arbeit neben Menschen.',
        },
        video: '/agile/hero/agile-hand/sensitive-control.mp4',
        loop: true,
        duration: 9.5,
        useCases: [
          [{ en: 'Human-robot work', de: 'Mensch-Roboter-Arbeit' }, { en: 'compliant, human-friendly', de: 'nachgiebig und menschenfreundlich' }],
          [{ en: 'Fragile objects', de: 'Empfindliche Objekte' }, { en: 'firm but delicate grip', de: 'fester, aber feinfühliger Griff' }],
          [{ en: 'Developers', de: 'Entwickler' }, { en: 'C++, Python & ROS over EtherCAT', de: 'C++, Python & ROS über EtherCAT' }],
        ],
      },
    ],
  },

  // No footage yet, so the product's main Sanity render stands in. Specs from
  // Franka's two-pager (February 2026); base payload and max. speed updated to
  // Franka's system version 0.2 data, which match the Sanity entry. Franka
  // still lists it as a prototype.
  'mobile-fr3-duo': {
    name: 'Mobile FR3 Duo',
    specs: [
      { value: 855, unit: 'mm', label: { en: 'Reach per arm', de: 'Reichweite pro Arm' } },
      { value: 3, unit: 'kg', label: { en: 'Payload per arm', de: 'Traglast pro Arm' } },
      { value: 125, unit: 'kg', label: { en: 'Base payload', de: 'Traglast Basis' } },
      { value: 1.5, unit: 'm/s', decimals: 1, label: { en: 'Max. speed', de: 'Max. Geschwindigkeit' } },
      { value: 7, label: { en: 'Cameras', de: 'Kameras' } },
      { value: 1, unit: 'kHz', label: { en: 'Control (FCI)', de: 'Regelung (FCI)' } },
    ],
    slides: [
      {
        id: 'mobile-manipulation',
        eyebrow: { en: 'Prototype · mobile dual-arm', de: 'Prototyp · mobil, zweiarmig' },
        tagline: {
          en: 'FR3 Duo on an omnidirectional base: teleoperation, data collection and policy execution beyond the fixed workcell.',
          de: 'FR3 Duo auf einer omnidirektionalen Basis: Teleoperation, Datenerfassung und Policy-Ausführung jenseits der festen Arbeitszelle.',
        },
        image: 'https://cdn.sanity.io/images/wudur8e8/production/a5d9c63b7e561bcca2f1599580dba2541c26b33d-2000x1125.png',
        duration: 10,
        useCases: [
          [{ en: 'Mobile manipulation', de: 'Mobile Manipulation' }, { en: 'whole-body coordination', de: 'Ganzkörperkoordination' }],
          [{ en: 'Embodied AI', de: 'Embodied AI' }, { en: 'datasets & policy learning', de: 'Datensätze & Policy Learning' }],
          [{ en: 'Pre-integrated', de: 'Vorintegriert' }, { en: 'base, arms & software', de: 'Basis, Arme & Software' }],
        ],
      },
    ],
  },

  // Clip cut from Franka Robotics' "Teleoperation with FR3 Duo" (YouTube,
  // XdNF77wBLfM); copyright stays with Franka Robotics. Specs from the
  // product's Sanity entry (franka.de/fr3-duo).
  'franka-research-3-duo': {
    name: 'Franka Research 3 Duo',
    specs: [
      { value: 855, unit: 'mm', label: { en: 'Reach per arm', de: 'Reichweite pro Arm' } },
      { value: 3, unit: 'kg', label: { en: 'Payload per arm', de: 'Traglast pro Arm' } },
      { value: 7, label: { en: 'DoF per arm', de: 'Freiheitsgrade pro Arm' } },
      { value: 14, label: { en: 'Torque sensors', de: 'Drehmomentsensoren' } },
      { value: 1, unit: 'kHz', label: { en: 'Real-time control', de: 'Echtzeitsteuerung' } },
      { value: 3, label: { en: 'Cameras', de: 'Kameras' } },
    ],
    slides: [
      {
        id: 'teleoperation',
        eyebrow: { en: 'Physical AI research', de: 'Physical-AI-Forschung' },
        tagline: {
          en: 'A dual-arm reference platform for teleoperation, data collection and policy execution on one system.',
          de: 'Eine zweiarmige Referenzplattform für Teleoperation, Datenerfassung und Policy-Ausführung in einem System.',
        },
        video: '/franka/hero/franka-research-3-duo/teleoperation.mp4',
        shift: '-10%',
        useCases: [
          [{ en: 'Imitation learning', de: 'Imitation Learning' }, { en: 'teleoperated demonstrations', de: 'teleoperierte Demonstrationen' }],
          [{ en: 'Bimanual skills', de: 'Zweihändige Fähigkeiten' }, { en: 'two arms, one shared workspace', de: 'zwei Arme, ein gemeinsamer Arbeitsraum' }],
          [{ en: 'Datasets', de: 'Datensätze' }, { en: 'reproducible across institutions', de: 'reproduzierbar über Institute hinweg' }],
        ],
      },
    ],
  },

  // Clip cut from LimX Dynamics' "Oli-Clean.mp4" (partner footage);
  // copyright stays with LimX Dynamics. Specs from the product's Sanity
  // entry; "up to" figures are the Super version.
  'limx-oli': {
    name: 'LimX Oli',
    specs: [
      { value: 175, unit: 'cm', label: { en: 'Height, up to', de: 'Größe, bis zu' } },
      { value: 43, label: { en: 'Active DoF, up to', de: 'Aktive Freiheitsgrade, bis zu' } },
      { value: 7, label: { en: 'DoF per arm', de: 'Freiheitsgrade pro Arm' } },
      { value: 5, unit: 'kg', label: { en: 'Payload per arm, up to', de: 'Traglast pro Arm, bis zu' } },
      { value: 5, unit: 'km/h', label: { en: 'Walking speed', de: 'Gehgeschwindigkeit' } },
      { value: 157, unit: 'TOPS', label: { en: 'Perception (Orin NX)', de: 'Wahrnehmung (Orin NX)' } },
    ],
    slides: [
      {
        id: 'whole-body-motion',
        eyebrow: { en: 'Full-size humanoid', de: 'Humanoider in voller Größe' },
        tagline: {
          en: 'A general-purpose humanoid for embodied-AI research and development, with whole-body control and an open Python SDK.',
          de: 'Ein universeller Humanoider für Forschung und Entwicklung in Embodied AI, mit Ganzkörpersteuerung und offenem Python-SDK.',
        },
        video: '/oli/hero/limx-oli/whole-body-motion.mp4',
        shift: '-14%',
        useCases: [
          [{ en: 'Embodied AI', de: 'Embodied AI' }, { en: 'whole-body loco-manipulation', de: 'Ganzkörper-Lokomanipulation' }],
          [{ en: 'Simulation to real', de: 'Von der Simulation in die Realität' }, { en: 'Isaac Sim, MuJoCo, Gazebo', de: 'Isaac Sim, MuJoCo, Gazebo' }],
          [{ en: 'Teaching & labs', de: 'Lehre & Labore' }, { en: 'EDU version for universities', de: 'EDU-Version für Hochschulen' }],
        ],
      },
    ],
  },

  // Clips cut from MagicLab's "MagicBot-Z1 Stunt Actions" and "MagicBot-Z1"
  // films (partner footage, companies/MagicLab/06_Media/Z1); only shots without
  // burnt-in captions are used. Copyright stays with MagicLab. Specs from the
  // product's Sanity entry (MagicBot Z1 Standard).
  'magicbot-z1-standard': {
    name: 'MagicBot Z1',
    specs: [
      { value: 1369, unit: 'mm', label: { en: 'Height', de: 'Größe' } },
      { value: '40+', unit: 'kg', label: { en: 'Weight, with battery', de: 'Gewicht mit Akku' } },
      { value: '24–50', label: { en: 'Joint motors (DoF)', de: 'Gelenkmotoren (DoF)' } },
      { value: 130, unit: 'N·m', label: { en: 'Knee torque, max.', de: 'Knie-Drehmoment, max.' } },
      { value: 3, unit: 'kg', label: { en: 'Arm payload, max.', de: 'Armtraglast, max.' } },
      { value: 2.5, unit: 'm/s', prefix: '≥', decimals: 1, label: { en: 'Trotting speed', de: 'Laufgeschwindigkeit' } },
    ],
    slides: [
      {
        id: 'whole-body-control',
        eyebrow: { en: 'Half-size humanoid', de: 'Humanoid in halber Baugröße' },
        tagline: {
          en: 'A developer humanoid with up to 50 joint motors and 130 N·m at the knee, built for fast, dynamic whole-body motion.',
          de: 'Ein Entwickler-Humanoid mit bis zu 50 Gelenkmotoren und 130 N·m am Knie, gebaut für schnelle, dynamische Ganzkörperbewegung.',
        },
        video: '/magiclab/hero/magicbot-z1/whole-body-control.mp4',
        shift: '-16%',
        useCases: [
          [{ en: 'Embodied AI', de: 'Embodied AI' }, { en: 'research & development', de: 'Forschung & Entwicklung' }],
          [{ en: 'Locomotion research', de: 'Fortbewegungsforschung' }, { en: 'walking, running, balance', de: 'Gehen, Laufen, Balance' }],
          [{ en: 'Teaching & labs', de: 'Lehre & Labore' }, { en: 'universities and institutes', de: 'Hochschulen und Institute' }],
        ],
      },
      {
        id: 'outdoor-terrain',
        eyebrow: { en: 'Indoors and out', de: 'Drinnen wie draußen' },
        tagline: {
          en: 'Walks and runs on grass, gravel and slopes, and gets back on its feet by itself after a fall.',
          de: 'Geht und läuft auf Rasen, Schotter und Hängen und steht nach einem Sturz von selbst wieder auf.',
        },
        video: '/magiclab/hero/magicbot-z1/outdoor-terrain.mp4',
        shift: '-12%',
        useCases: [
          [{ en: '360° perception', de: '360°-Wahrnehmung' }, { en: '3D lidar, depth & fisheye cameras', de: '3D-Lidar, Tiefen- & Fisheye-Kameras' }],
          [{ en: 'Swappable battery', de: 'Wechselakku' }, { en: '10000 mAh quick-release', de: '10000 mAh, schnell tauschbar' }],
          [{ en: 'Developer kit', de: 'Entwicklungskit' }, { en: 'secondary development & OTA', de: 'Zweitentwicklung & OTA' }],
        ],
      },
    ],
  },

  // Clips are OrionStar's own 3D product renders from en.orionstar.com/autodoor.html
  // (downloaded 2026-11-08, originals in companies/Orionstar/06_Media); copyright
  // stays with OrionStar. Their storage clip says "138L" against 69 L on the
  // product sheet, so it is not used. Specs from the product's Sanity entry.
  'orionstar-luckibot-pro-autodoor': {
    name: 'LuckiBot Pro Autodoor',
    specs: [
      { value: 69, unit: 'L', label: { en: 'Sealed compartment', de: 'Geschlossenes Fach' } },
      { value: 20, unit: 'kg', label: { en: 'Payload per tray, max.', de: 'Traglast pro Ebene, max.' } },
      { value: 1.2, unit: 'm/s', decimals: 1, label: { en: 'Speed, max.', de: 'Geschwindigkeit, max.' } },
      { value: 12, unit: 'h', label: { en: 'Runtime', de: 'Laufzeit' } },
      { value: 4.5, unit: 'h', decimals: 1, label: { en: 'Charging time', de: 'Ladezeit' } },
      { value: 14, unit: 'in', label: { en: 'Touchscreen, 1080p', de: 'Touchscreen, 1080p' } },
    ],
    slides: [
      {
        id: 'falcon-wing-door',
        eyebrow: { en: 'Enclosed delivery', de: 'Geschlossene Lieferung' },
        tagline: {
          en: 'A four-part falcon-wing door closes off the 69 L compartment, so orders arrive out of sight and untouched.',
          de: 'Eine vierteilige Falcon-Wing-Tür verschließt das 69-L-Fach. Bestellungen kommen diskret und unberührt an.',
        },
        video: '/orionstar/hero/luckibot-pro-autodoor/falcon-wing-door.mp4',
        shift: '-22%',
        useCases: [
          [{ en: 'Hotels', de: 'Hotels' }, { en: 'room service to the door', de: 'Zimmerservice bis an die Tür' }],
          [{ en: 'Hospitals', de: 'Krankenhäuser' }, { en: 'discreet, hygienic transport', de: 'diskreter, hygienischer Transport' }],
          [{ en: 'Restaurants & venues', de: 'Restaurants & Lokale' }, { en: 'private-room service', de: 'Service in Separees' }],
        ],
      },
      {
        id: 'passcode-lock',
        eyebrow: { en: 'Passcode lock', de: 'Passwortschloss' },
        tagline: {
          en: 'The compartment opens only with the right code, entered on the 14-inch screen.',
          de: 'Das Fach öffnet sich nur mit dem richtigen Code, eingegeben am 14-Zoll-Bildschirm.',
        },
        video: '/orionstar/hero/luckibot-pro-autodoor/passcode-lock.mp4',
        shift: '-22%',
        useCases: [
          [{ en: 'Navigation', de: 'Navigation' }, { en: 'three RGBD cameras + lidar', de: 'drei RGBD-Kameras + Lidar' }],
          [{ en: 'Long shifts', de: 'Lange Schichten' }, { en: '12 h runtime, 4.5 h to charge', de: '12 h Laufzeit, 4,5 h Ladezeit' }],
          [{ en: 'Factories', de: 'Fabriken' }, { en: 'parts and documents between areas', de: 'Teile und Dokumente zwischen Bereichen' }],
        ],
      },
    ],
  },

  // Specs and wording from the MegaRobotics M100WS catalogue 2026 (values as of
  // 11/2026, base configuration). Design values only: the 200 kg short-term peak
  // stays off the hero. The clip is an AI-generated film, not footage of a real
  // unit, and it plays in a plant setting while the robot has no explosion
  // protection, so the note and the first use case say what applies.
  m100ws: {
    name: 'M100WS',
    specs: [
      { value: 100, unit: 'kg', label: { en: 'Continuous payload', de: 'Dauernutzlast' } },
      { value: 79, unit: 'kg', label: { en: 'Weight', de: 'Gewicht' } },
      { value: 3, unit: 'm/s', label: { en: 'Top speed', de: 'Höchstgeschwindigkeit' } },
      { value: 7.5, unit: 'h', decimals: 1, label: { en: 'Runtime, unloaded', de: 'Laufzeit ohne Last' } },
      { value: 30, unit: 'cm', label: { en: 'Step height', de: 'Stufenhöhe' } },
      { value: 'IP67', label: { en: 'Protection', de: 'Schutzart' } },
    ],
    slides: [
      {
        id: 'plant-patrol',
        eyebrow: { en: 'Wheel-legged carrier', de: 'Rad-Bein-Träger' },
        tagline: {
          en: 'Wheels where the ground allows, legs where it does not. Built for heavy payloads, long routes and rough ground.',
          de: 'Räder, wo der Boden es erlaubt. Beine, wo nicht. Gebaut für schwere Nutzlasten, lange Strecken und unwegsames Gelände.',
        },
        video: '/megarobotics/hero/m100ws/plant-patrol.mp4',
        shift: '-10%',
        focus: '28% bottom', // the robot rolls along the lower left of the frame
        note: {
          en: 'AI-generated visualisation. Payloads not included.',
          de: 'KI-generierte Visualisierung. Nutzlasten nicht im Lieferumfang.',
        },
        useCases: [
          [{ en: 'Plant patrol', de: 'Anlagenrundgang' }, { en: 'outside classified Ex zones', de: 'außerhalb eingestufter Ex-Zonen' }],
          [{ en: 'Power utilities', de: 'Energieversorgung' }, { en: 'substations, cable tunnels, switchgear', de: 'Umspannwerke, Kabeltunnel, Schaltanlagen' }],
          [{ en: 'Fire and rescue', de: 'Feuerwehr und Rettung' }, { en: 'lighting and equipment in smoke', de: 'Licht und Ausrüstung im Rauch' }],
        ],
      },
    ],
  },
}

export interface ResolvedHeroSpec {
  value: number | string
  unit?: string
  label: string
  prefix?: string
  decimals?: number
}

export interface ResolvedHeroSlide {
  id: string
  eyebrow: string
  tagline: string
  video?: string
  image?: string
  poster?: string
  loop?: boolean
  duration?: number
  shift?: string
  cropBottom?: number
  focus?: string
  note?: string
  useCases: [string, string][]
  /** Set when slides of several products share one slider (homepage). */
  product?: { slug: string; name: string; specs: ResolvedHeroSpec[] }
}

export interface ResolvedProductHero {
  specs: ResolvedHeroSpec[]
  slides: ResolvedHeroSlide[]
}

function resolveSpecs(hero: ProductHero, locale: Locale): ResolvedHeroSpec[] {
  return hero.specs.map((s) => ({ ...s, label: s.label[locale] }))
}

function resolveSlide(s: HeroSlide, locale: Locale): ResolvedHeroSlide {
  const video = s.video ? HERO_MEDIA_BASE + s.video : undefined
  return {
    id: s.id,
    eyebrow: s.eyebrow[locale],
    tagline: s.tagline[locale],
    video,
    image: s.image,
    poster: video?.replace(/\.mp4$/, '.jpg'),
    loop: s.loop,
    duration: s.duration,
    shift: s.shift,
    cropBottom: s.cropBottom,
    focus: s.focus,
    note: s.note?.[locale],
    useCases: s.useCases.map(([what, detail]) => [what[locale], detail[locale]] as [string, string]),
  }
}

/** Hero for a product slug in the given locale, or null if the product has none. */
export function getProductHero(slug: string, locale: Locale): ResolvedProductHero | null {
  const hero = HEROES[slug]
  if (!hero) return null
  return {
    specs: resolveSpecs(hero, locale),
    slides: hero.slides.map((s) => resolveSlide(s, locale)),
  }
}

// Homepage hero: one slide per product, in this order. Add a product by
// adding its slug and the id of the slide to feature.
const HOME_SLIDES: { slug: string; slide: string }[] = [
  { slug: 'agile-one-sn', slide: 'research-lab' },
  { slug: 'agile-one-s', slide: 'research-platform' },
  { slug: 'agile-one', slide: 'humanoid-robot' },
  { slug: 'diana-7', slide: 'precision-assembly' },
  { slug: 'franka-research-3-duo', slide: 'teleoperation' },
  { slug: 'mobile-fr3-duo', slide: 'mobile-manipulation' },
  { slug: 'limx-oli', slide: 'whole-body-motion' },
  { slug: 'magicbot-z1-standard', slide: 'whole-body-control' },
  { slug: 'm100ws', slide: 'plant-patrol' },
  { slug: 'orionstar-luckibot-pro-autodoor', slide: 'falcon-wing-door' },
]

/** Slides for the homepage hero, each carrying its product's name and specs. */
export function getHomeProductHero(locale: Locale): ResolvedProductHero {
  const slides = HOME_SLIDES.flatMap(({ slug, slide }) => {
    const hero = HEROES[slug]
    const s = hero?.slides.find((x) => x.id === slide)
    if (!hero || !s) return []
    return [{ ...resolveSlide(s, locale), id: slug, product: { slug, name: hero.name, specs: resolveSpecs(hero, locale) } }]
  })
  return { specs: [], slides }
}
