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
  /** Anchor of the slow zoom-out (transform-origin); default "center". "center top" keeps heads near the top edge in frame. */
  zoomFrom?: string
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
  // gallery stands in. Specs from Agile Robots' Agile One S datasheet
  // (companies/Agile/04_Products/Agile_One_S.pdf), which matches NVIDIA's launch release.
  'agile-one-s': {
    name: 'Agile ONE S',
    specs: [
      { value: 140, unit: 'cm', label: { en: 'Height', de: 'Größe' } },
      { value: 43, unit: 'kg', label: { en: 'Weight', de: 'Gewicht' } },
      { value: 31, label: { en: 'DoF (body)', de: 'Freiheitsgrade (Körper)' } },
      { value: 3, unit: 'kg', label: { en: 'Payload per arm', de: 'Traglast pro Arm' } },
      { value: 140, unit: 'N·m', label: { en: 'Peak joint torque', de: 'Max. Gelenkmoment' } },
      { value: 'Jetson Thor', label: { en: 'Onboard AI', de: 'KI an Bord' } },
    ],
    slides: [
      {
        id: 'research-platform',
        eyebrow: { en: 'Research humanoid', de: 'Forschungs-Humanoid' },
        tagline: {
          en: 'A compact humanoid with an open software stack, so labs and developers can run their own models. Swappable battery, about two hours per charge.',
          de: 'Ein kompakter Humanoid mit offenem Software-Stack für eigene Modelle. Wechselakku mit rund zwei Stunden Laufzeit.',
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
      // upper-body, studio: photos from Agile Robots' "Agile ONE S Flyer with
      // spec" (Nov 2026, companies/Agile/04_Products) on a gradient taken from
      // each photo. Copyright stays with Agile Robots SE.
      {
        id: 'perception',
        eyebrow: { en: 'Perception', de: 'Wahrnehmung' },
        tagline: {
          en: 'Three RGB-D cameras, a 360° LiDAR and a six-microphone array, with NVIDIA Jetson Thor for on-board AI.',
          de: 'Drei RGB-D-Kameras, ein 360°-LiDAR und ein Sechs-Mikrofon-Array, dazu NVIDIA Jetson Thor für KI an Bord.',
        },
        image: `${HERO_MEDIA_BASE}/agile/hero/agile-one-s/upper-body.jpg`,
        duration: 9,
        useCases: [
          [{ en: 'Perception research', de: 'Wahrnehmungsforschung' }, { en: 'RGB-D and LiDAR', de: 'RGB-D und LiDAR' }],
          [{ en: 'Voice interaction', de: 'Sprachinteraktion' }, { en: 'sound-source localisation', de: 'Ortung von Schallquellen' }],
          [{ en: 'On-board AI', de: 'KI an Bord' }, { en: 'Jetson Thor T5000', de: 'Jetson Thor T5000' }],
        ],
      },
      {
        id: 'hands',
        eyebrow: { en: 'Hands of your choice', de: 'Hände nach Wahl' },
        tagline: {
          en: 'Ships with dummy hands. A Pinza gripper (1 DoF) or a four-finger dexterous hand (13 DoF) are available as options.',
          de: 'Ausgeliefert mit Attrappen-Händen. Optional gibt es den Pinza-Greifer (1 Freiheitsgrad) oder eine Vierfingerhand (13 Freiheitsgrade).',
        },
        image: `${HERO_MEDIA_BASE}/agile/hero/agile-one-s/studio.jpg`,
        duration: 9,
        useCases: [
          [{ en: 'Whole-body control', de: 'Ganzkörperregelung' }, { en: '31 DoF in the body', de: '31 Freiheitsgrade im Körper' }],
          [{ en: 'Grasping', de: 'Greifen' }, { en: 'gripper or dexterous hand', de: 'Greifer oder Geschickhand' }],
          [{ en: 'Simulation', de: 'Simulation' }, { en: 'URDF & USD assets', de: 'URDF- & USD-Modelle' }],
        ],
      },
    ],
  },

  // research-lab: cut from Agile Robots' Agile ONE SN video (partner footage, 720p).
  // anatomy, physical-ai-stack: cut from the vertical reel "Agile Robots is bringing
  // another humanoid into the Physical AI race" (companies/Agile/media), cropped
  // above its burnt-in captions and set on a 16:9 frame filled from the studio
  // background. Footage copyright stays with its owners. Specs from the product's
  // Sanity entry; torque and sensors from the Agile One S datasheet.
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
        id: 'anatomy',
        eyebrow: { en: 'Built for the lab', de: 'Gebaut fürs Labor' },
        tagline: {
          en: '1.4 m and 43 kg, with 31 joints in the body and two tactile five-finger hands that sense contact.',
          de: '1,4 m und 43 kg, 31 Gelenke im Körper und zwei taktile Fünffingerhände, die Berührung spüren.',
        },
        video: '/agile/hero/agile-one-sn/anatomy.mp4',
        focus: '25% top',
        useCases: [
          [{ en: 'Whole-body motion', de: 'Ganzkörperbewegung' }, { en: '31 DoF, up to 140 N·m per joint', de: '31 Freiheitsgrade, bis 140 N·m pro Gelenk' }],
          [{ en: 'Tactile hands', de: 'Taktile Hände' }, { en: 'fingertips that register contact', de: 'Fingerkuppen, die Kontakt erfassen' }],
          [{ en: 'Perception', de: 'Wahrnehmung' }, { en: '3D LiDAR & RGB-D cameras', de: '3D-LiDAR & RGB-D-Kameras' }],
        ],
      },
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
      {
        id: 'physical-ai-stack',
        eyebrow: { en: 'Software included', de: 'Software inklusive' },
        tagline: {
          en: 'Ships with NVIDIA Isaac GR00T 1.7, a vision-language-action model, plus whole-body control, running on Jetson Thor.',
          de: 'Ab Werk mit NVIDIA Isaac GR00T 1.7, einem Vision-Language-Action-Modell, und Ganzkörpersteuerung auf Jetson Thor.',
        },
        video: '/agile/hero/agile-one-sn/physical-ai-stack.mp4',
        focus: '25% top',
        useCases: [
          [{ en: 'Vision-language-action', de: 'Vision-Language-Action' }, { en: 'GR00T 1.7 preinstalled', de: 'GR00T 1.7 vorinstalliert' }],
          [{ en: 'Onboard AI', de: 'KI an Bord' }, { en: 'NVIDIA Jetson Thor T5000', de: 'NVIDIA Jetson Thor T5000' }],
          [{ en: 'Open interfaces', de: 'Offene Schnittstellen' }, { en: 'USB 3.2, Gigabit Ethernet, RS485, GMSL2', de: 'USB 3.2, Gigabit-Ethernet, RS485, GMSL2' }],
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

  // design: two short passes cut from Agile Robots' "Diana3 Dark Shooting.mp4"
  // (partner footage, companies/Agile/media). compact-lab, dual-arm: product
  // renders from Agile Robots' "Diana Series + Franka Combo Flyer" (Nov 2026,
  // companies/Agile/04_Products), set on a 16:9 studio gradient. Specs from the
  // same flyer. Copyright in footage and renders stays with Agile Robots SE.
  'diana-3': {
    name: 'Diana 3',
    specs: [
      { value: 7, label: { en: 'Axes', de: 'Achsen' } },
      { value: 3, unit: 'kg', label: { en: 'Payload', de: 'Traglast' } },
      { value: 772, unit: 'mm', label: { en: 'Reach', de: 'Reichweite' } },
      { value: 0.05, unit: 'mm', prefix: '±', decimals: 2, label: { en: 'Repeatability', de: 'Wiederholgenauigkeit' } },
      { value: 0.5, unit: 'N', decimals: 1, label: { en: 'Force control', de: 'Kraftregelung' } },
      { value: 'IP54', label: { en: 'Protection', de: 'Schutzart' } },
    ],
    slides: [
      {
        id: 'design',
        eyebrow: { en: 'Force control', de: 'Kraftregelung' },
        tagline: {
          en: 'Torque sensors in all seven joints and 0.5 N relative force-control accuracy, the same core figures as the industrial Diana 7.',
          de: 'Drehmomentsensoren in allen sieben Gelenken und 0,5 N relative Kraftregelgenauigkeit, dieselben Kernwerte wie beim industriellen Diana 7.',
        },
        video: '/agile/hero/diana-3/design.mp4',
        loop: true,
        duration: 10,
        useCases: [
          [{ en: 'Precision manipulation', de: 'Präzise Manipulation' }, { en: 'force-control research', de: 'Kraftregelungsforschung' }],
          [{ en: 'Contact tasks', de: 'Kontaktaufgaben' }, { en: 'compliant, sensitive motion', de: 'nachgiebige, feinfühlige Bewegung' }],
          [{ en: 'Collision detection', de: 'Kollisionserkennung' }, { en: 'torque sensing in every joint', de: 'Drehmomentmessung in jedem Gelenk' }],
        ],
      },
      {
        id: 'compact-lab',
        eyebrow: { en: 'Built for the lab', de: 'Fürs Labor gebaut' },
        tagline: {
          en: '3 kg payload, 772 mm reach and IP54 protection against dust and splashes, in a 19 kg arm for laboratory work.',
          de: '3 kg Traglast, 772 mm Reichweite und Schutzart IP54 gegen Staub und Spritzwasser, in einem 19 kg leichten Arm für die Laborarbeit.',
        },
        image: `${HERO_MEDIA_BASE}/agile/hero/diana-3/compact-lab.jpg`,
        duration: 9,
        useCases: [
          [{ en: 'Lab automation', de: 'Laborautomatisierung' }, { en: 'sample handling', de: 'Probenhandhabung' }],
          [{ en: 'Medical research', de: 'Medizinische Forschung' }, { en: 'research assistance', de: 'Assistenz in der Forschung' }],
          [{ en: 'Universities', de: 'Hochschulen' }, { en: 'first experiments to long-term research', de: 'vom ersten Versuch bis zur Langzeitforschung' }],
        ],
      },
      {
        id: 'open-interface',
        eyebrow: { en: 'Open interface', de: 'Offene Schnittstelle' },
        tagline: {
          en: 'Built-in Franka Control Interface at 1 kHz, the same as on Franka Research 3 and Diana 7, so code and toolchains carry over directly.',
          de: 'Integrierte Franka Control Interface mit 1 kHz, wie bei Franka Research 3 und Diana 7. Code und Toolchains lassen sich direkt übernehmen.',
        },
        image: `${HERO_MEDIA_BASE}/agile/hero/diana-3/dual-arm.jpg`,
        duration: 9,
        useCases: [
          [{ en: 'libfranka', de: 'libfranka' }, { en: 'real-time C++ control', de: 'Echtzeitsteuerung in C++' }],
          [{ en: 'ROS 2', de: 'ROS 2' }, { en: 'MoveIt and Gazebo', de: 'MoveIt und Gazebo' }],
          [{ en: 'MATLAB', de: 'MATLAB' }, { en: 'and Simulink', de: 'und Simulink' }],
        ],
      },
    ],
  },

  // Product renders from Agile Robots' "Diana Series + Franka Combo Flyer"
  // (Nov 2026, companies/Agile/04_Products), set on a 16:9 studio gradient.
  // Specs from the same flyer. Copyright stays with Agile Robots / Franka Robotics.
  'franka-research-3': {
    name: 'Franka Research 3',
    specs: [
      { value: 7, label: { en: 'Axes', de: 'Achsen' } },
      { value: 3, unit: 'kg', label: { en: 'Payload', de: 'Traglast' } },
      { value: 855, unit: 'mm', label: { en: 'Reach', de: 'Reichweite' } },
      { value: 0.1, unit: 'mm', prefix: '±', decimals: 1, label: { en: 'Repeatability', de: 'Wiederholgenauigkeit' } },
      { value: 94.5, unit: '%', decimals: 1, label: { en: 'Workspace coverage', de: 'Arbeitsraumabdeckung' } },
      { value: 1, unit: 'kHz', label: { en: 'Real-time control', de: 'Echtzeitsteuerung' } },
    ],
    slides: [
      {
        id: 'research-arm',
        eyebrow: { en: 'Reference platform', de: 'Referenzplattform' },
        tagline: {
          en: 'Seven axes with a torque sensor in every joint, engineered and built in Germany for robotics and AI research.',
          de: 'Sieben Achsen mit Drehmomentsensor in jedem Gelenk, entwickelt und gebaut in Deutschland für Robotik- und KI-Forschung.',
        },
        image: `${HERO_MEDIA_BASE}/franka/hero/franka-research-3/research-arm.jpg`,
        duration: 9,
        useCases: [
          [{ en: 'Control research', de: 'Regelungsforschung' }, { en: 'torque and impedance at 1 kHz', de: 'Drehmoment und Impedanz mit 1 kHz' }],
          [{ en: 'Hand guiding', de: 'Handführung' }, { en: 'sensitive contact detection', de: 'feinfühlige Kontakterkennung' }],
          [{ en: 'Teaching', de: 'Lehre' }, { en: 'ROS 2 and MATLAB', de: 'ROS 2 und MATLAB' }],
        ],
      },
      {
        id: 'fci-family',
        eyebrow: { en: 'One interface, three arms', de: 'Eine Schnittstelle, drei Arme' },
        tagline: {
          en: 'Diana 3, Diana 7 and Franka Research 3 all support the Franka Control Interface, so research code moves between them.',
          de: 'Diana 3, Diana 7 und Franka Research 3 unterstützen alle die Franka Control Interface. Forschungscode wandert mit.',
        },
        image: `${HERO_MEDIA_BASE}/franka/hero/franka-research-3/fci-family.jpg`,
        duration: 9,
        useCases: [
          [{ en: 'libfranka', de: 'libfranka' }, { en: 'open-source C++', de: 'Open Source in C++' }],
          [{ en: 'franka_ros 2', de: 'franka_ros 2' }, { en: 'MoveIt, RViz, Gazebo', de: 'MoveIt, RViz, Gazebo' }],
          [{ en: 'MATLAB', de: 'MATLAB' }, { en: 'and Simulink', de: 'und Simulink' }],
        ],
      },
      {
        id: 'dual-arm',
        eyebrow: { en: 'Dual-arm research', de: 'Zweiarmige Forschung' },
        tagline: {
          en: 'Two FR3 arms on one column make the Franka Research 3 Duo for bimanual research.',
          de: 'Zwei FR3-Arme an einer Säule ergeben den Franka Research 3 Duo für zweihändige Forschung.',
        },
        image: `${HERO_MEDIA_BASE}/franka/hero/franka-research-3/dual-arm.jpg`,
        duration: 9,
        useCases: [
          [{ en: 'Bimanual skills', de: 'Zweihändige Fähigkeiten' }, { en: 'two arms, one workspace', de: 'zwei Arme, ein Arbeitsraum' }],
          [{ en: 'Same arm', de: 'Derselbe Arm' }, { en: 'same FCI and toolchain', de: 'dieselbe FCI und Toolchain' }],
          [{ en: 'Start small', de: 'Klein anfangen' }, { en: 'one arm first, a second later', de: 'erst ein Arm, später ein zweiter' }],
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

  // Clip is SEER's own computer animation "06_Smart Sorting.mp4" (companies/Seer,
  // 12 s, 1080p, "Intelligent Sorting" on seer-robotics.ai); copyright stays with
  // SEER, so the note marks it as an animation. The head reads "X1". Specs are
  // SEER's claims for the X1-PRO, seer-robotics.ai/media/287 (2025-10-29), same in
  // the Chinese version; applications from media/291 (2025-12-04). SEER's European
  // catalogue 2026 does not list the robot, so no CE or availability claims here.
  'seer-x1-pro': {
    name: 'SEER X1-PRO',
    specs: [
      { value: 40, label: { en: 'Degrees of freedom, max.', de: 'Freiheitsgrade, max.' } },
      { value: 7, label: { en: 'Axes per arm', de: 'Achsen pro Arm' } },
      { value: 6, unit: 'kg', label: { en: 'Load per arm', de: 'Last pro Arm' } },
      { value: 16, unit: 'kg', label: { en: 'Both arms, short-term', de: 'Beide Arme, kurzzeitig' } },
      { value: 700, unit: 'mm', label: { en: 'Lifting height', de: 'Hubhöhe' } },
      { value: 45, unit: '°', label: { en: 'Bending angle, max.', de: 'Beugewinkel, max.' } },
    ],
    slides: [
      {
        id: 'smart-sorting',
        eyebrow: { en: 'Wheeled humanoid', de: 'Humanoider auf Rädern' },
        tagline: {
          en: 'Picks the item from the shelf and brings it to the counter. Built to take its tasks in plain language.',
          de: 'Nimmt die Ware aus dem Regal und bringt sie an die Theke. Ausgelegt auf Aufgaben in natürlicher Sprache.',
        },
        video: '/seer/hero/x1-pro/smart-sorting.mp4',
        focus: '64% top',
        shift: '-20%',
        note: { en: 'Computer animation by SEER Robotics', de: 'Computeranimation von SEER Robotics' },
        useCases: [
          [{ en: 'Store orders', de: 'Bestellungen im Laden' }, { en: 'picking from the shelf', de: 'Entnahme aus dem Regal' }],
          [{ en: 'Sorting', de: 'Sortieren' }, { en: 'tabletop pick and place', de: 'Pick-and-place am Tisch' }],
          [{ en: 'Production', de: 'Produktion' }, { en: 'loading and unloading', de: 'Be- und Entladen' }],
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

  // Hero of /solutions/inspection-security, the full M-series page. No product
  // has this slug. Same clips as the security hero, inspection wording.
  inspection: {
    name: 'M series',
    specs: [
      { value: 9, label: { en: 'Models in three series', de: 'Modelle in drei Serien' } },
      { value: 7.5, unit: 'h', decimals: 1, label: { en: 'Runtime, unloaded (M100WS)', de: 'Laufzeit ohne Last (M100WS)' } },
      { value: 35, unit: 'km', label: { en: 'Range, unloaded (M100WS)', de: 'Reichweite ohne Last (M100WS)' } },
      { value: 100, unit: 'kg', label: { en: 'Payload (M100WS)', de: 'Nutzlast (M100WS)' } },
      { value: 'IP66/67', label: { en: 'Protection', de: 'Schutzart' } },
      { value: '−20…55', unit: '°C', label: { en: 'Operating range', de: 'Betriebstemperatur' } },
    ],
    slides: [
      {
        id: 'terrain-stairs',
        eyebrow: { en: 'Inspection round', de: 'Inspektionsrundgang' },
        tagline: {
          en: 'Gravel, a 45° slope, then the stairs. The M series walks the route your technicians walk and brings the readings back.',
          de: 'Schotter, 45° Steigung, dann die Treppe. Die M-Serie geht die Route Ihrer Techniker und bringt die Messwerte mit.',
        },
        video: '/megarobotics/security/terrain-stairs.mp4',
        focus: 'center',
        note: { en: 'M40 series · real footage', de: 'M40-Serie · Realaufnahmen' },
        useCases: [
          [{ en: 'Process plants', de: 'Prozessanlagen' }, { en: 'pipe racks and tank farms, outside Ex zones', de: 'Rohrbrücken und Tanklager, außerhalb von Ex-Zonen' }],
          [{ en: 'Power utilities', de: 'Energieversorgung' }, { en: 'substations and cable tunnels', de: 'Umspannwerke und Kabeltunnel' }],
          [{ en: 'Tunnels', de: 'Tunnel' }, { en: 'pipe galleries and utility tunnels', de: 'Rohrkanäle und Versorgungstunnel' }],
        ],
      },
      {
        id: 'plant-patrol',
        eyebrow: { en: 'Heavy carrier', de: 'Schwerlastträger' },
        tagline: {
          en: 'The M100WS carries up to 100 kg of sensors and equipment across the plant and runs up to 7.5 hours unloaded.',
          de: 'Der M100WS trägt bis zu 100 kg Sensorik und Ausrüstung durch die Anlage und läuft ohne Last bis zu 7,5 Stunden.',
        },
        video: '/megarobotics/security/plant-patrol.mp4',
        shift: '-10%',
        focus: '28% bottom',
        note: {
          en: 'M100WS · AI-generated visualisation. Payloads not included.',
          de: 'M100WS · KI-generierte Visualisierung. Nutzlasten nicht im Lieferumfang.',
        },
        useCases: [
          [{ en: 'Thermal checks', de: 'Wärmebildkontrolle' }, { en: 'transformers, switchgear, bearings', de: 'Trafos, Schaltanlagen, Lager' }],
          [{ en: 'Gas and leaks', de: 'Gas und Leckagen' }, { en: 'sensors chosen per project', de: 'Sensorik je Projekt' }],
          [{ en: 'Security patrol', de: 'Sicherheitsstreife' }, { en: 'sites, fence lines, perimeters', de: 'Gelände, Zäune, Perimeter' }],
        ],
      },
      {
        id: 'all-weather',
        eyebrow: { en: 'Any weather', de: 'Bei jedem Wetter' },
        tagline: {
          en: 'IP66 or IP67 on every model and an operating range of −20 to +55 °C. Rain doesn’t cancel the round.',
          de: 'IP66 oder IP67 bei jedem Modell und −20 bis +55 °C Betriebstemperatur. Regen sagt den Rundgang nicht ab.',
        },
        image: '/images/security/m1-water.jpg',
        duration: 9,
        focus: 'center',
        note: { en: 'M1 · manufacturer photo', de: 'M1 · Herstellerfoto' },
        useCases: [
          [{ en: 'Outdoor routes', de: 'Außenrouten' }, { en: 'yards, campuses, solar parks', de: 'Höfe, Campus, Solarparks' }],
          [{ en: 'Night rounds', de: 'Nachtrunden' }, { en: 'four fill lights on every M1', de: 'vier Zusatzleuchten bei jedem M1' }],
          [{ en: 'Around the clock', de: 'Rund um die Uhr' }, { en: 'swappable batteries, charging station option', de: 'Wechselakkus, Ladestation als Option' }],
        ],
      },
    ],
  },

  // Hero of the security solution page (/solutions/security). There is no
  // product with this slug, so it never reaches a product page. Figures are
  // range maxima from the M1 and M40/M100 catalogues 2026 (base configuration,
  // unloaded). The M40 clip is real footage; the M100WS film is AI-generated.
  security: {
    name: 'M series',
    specs: [
      { value: 9, label: { en: 'Models in three series', de: 'Modelle in drei Serien' } },
      { value: 7.5, unit: 'h', decimals: 1, label: { en: 'Runtime, unloaded (M100WS)', de: 'Laufzeit ohne Last (M100WS)' } },
      { value: 35, unit: 'km', label: { en: 'Range, unloaded (M100WS)', de: 'Reichweite ohne Last (M100WS)' } },
      { value: 100, unit: 'kg', label: { en: 'Payload (M100WS)', de: 'Nutzlast (M100WS)' } },
      { value: 'IP66/67', label: { en: 'Protection', de: 'Schutzart' } },
      { value: '−20…55', unit: '°C', label: { en: 'Operating range', de: 'Betriebstemperatur' } },
    ],
    slides: [
      {
        id: 'plant-patrol',
        eyebrow: { en: 'Night patrol', de: 'Nachtstreife' },
        tagline: {
          en: 'The round still happens at 3 a.m., in the rain, past the fence and through the plant. It just doesn’t have to be a person every time.',
          de: 'Der Rundgang findet auch um 3 Uhr nachts statt, im Regen, am Zaun entlang und durch die Anlage. Nur muss nicht jedes Mal ein Mensch gehen.',
        },
        video: '/megarobotics/security/plant-patrol.mp4',
        shift: '-10%',
        focus: '28% bottom',
        note: {
          en: 'M100WS · AI-generated visualisation. Payloads not included.',
          de: 'M100WS · KI-generierte Visualisierung. Nutzlasten nicht im Lieferumfang.',
        },
        useCases: [
          [{ en: 'Site patrol', de: 'Objektstreife' }, { en: 'industrial parks, yards, warehouses', de: 'Industrieparks, Höfe, Lager' }],
          [{ en: 'Critical infrastructure', de: 'Kritische Infrastruktur' }, { en: 'substations, utilities, tunnels', de: 'Umspannwerke, Versorger, Tunnel' }],
          [{ en: 'Perimeter', de: 'Perimeter' }, { en: 'fence lines and large outdoor sites', de: 'Zaunlinien und große Freiflächen' }],
        ],
      },
      {
        id: 'terrain-stairs',
        eyebrow: { en: 'Where wheels give up', de: 'Wo Räder aufgeben' },
        tagline: {
          en: 'Legs take the stairs, the embankment and the gravel that stop wheeled robots. Wheels on the feet add speed on the flat.',
          de: 'Beine nehmen Treppe, Böschung und Schotter, an denen Radroboter scheitern. Räder an den Füßen bringen Tempo auf ebener Strecke.',
        },
        video: '/megarobotics/security/terrain-stairs.mp4',
        focus: 'center',
        note: { en: 'M40 series · real footage', de: 'M40-Serie · Realaufnahmen' },
        useCases: [
          [{ en: 'Stairs and grating', de: 'Treppen und Gitterroste' }, { en: 'steps up to 20 cm', de: 'Stufen bis 20 cm' }],
          [{ en: 'Rough ground', de: 'Unwegsames Gelände' }, { en: 'gravel, kerbs, 45° slopes', de: 'Schotter, Kanten, 45° Steigung' }],
          [{ en: 'Tight spaces', de: 'Enge Räume' }, { en: 'service corridors and plant rooms', de: 'Versorgungsgänge und Technikräume' }],
        ],
      },
      {
        id: 'site-round',
        eyebrow: { en: 'Patrol at speed', de: 'Streife mit Tempo' },
        tagline: {
          en: 'The M1 Pro rolls its route at up to 6 m/s, stops at each checkpoint and lets the control room talk to people it meets.',
          de: 'Der M1 Pro fährt seine Route mit bis zu 6 m/s ab, hält an jedem Kontrollpunkt und lässt die Leitstelle mit Personen vor Ort sprechen.',
        },
        image: '/images/security/m1-patrol.jpg',
        duration: 9,
        focus: '55% center',
        note: { en: 'M1 platform · manufacturer photo', de: 'M1-Plattform · Herstellerfoto' },
        useCases: [
          [{ en: 'Waypoint patrol', de: 'Wegpunkt-Streife' }, { en: 'navigation standard on M1 Pro', de: 'Navigation serienmäßig beim M1 Pro' }],
          [{ en: 'Two-way voice', de: 'Sprechverbindung' }, { en: 'intercom and broadcast', de: 'Gegensprechen und Durchsagen' }],
          [{ en: 'Around the clock', de: 'Rund um die Uhr' }, { en: 'hot-swap batteries, charging station', de: 'Wechselakkus, Ladestation' }],
        ],
      },
    ],
  },

  // MegaRobotics' own development, shown only on the unlisted /centaur page
  // (src/data/centaur.ts). There is no Sanity product with this slug, so the
  // hero never reaches a product or manufacturer page; keep it out of
  // HOME_SLIDES. Clips are renderings from patent/usecase; specs are design
  // values from the IP filing.
  centaur: {
    name: 'CENTAUR-1',
    specs: [
      { value: 360, unit: '°', label: { en: 'Torso rotation, endless', de: 'Torso-Rotation, endlos' } },
      { value: 45, unit: '°', prefix: '±', label: { en: 'Active tilt compensation', de: 'Aktiver Neigungsausgleich' } },
      { value: 5, unit: 'mm', prefix: '±', label: { en: 'Docking accuracy', de: 'Andockgenauigkeit' } },
      { value: 10, unit: 'ms', prefix: '<', label: { en: 'Compensation loop', de: 'Regelschleife' } },
      { value: 4, label: { en: 'Operating modes', de: 'Betriebsmodi' } },
      { value: 2, label: { en: 'Autonomous robots, one system', de: 'Autonome Roboter, ein System' } },
    ],
    slides: [
      {
        id: 'night-shift-logistics',
        eyebrow: { en: 'Two robots. One system.', de: 'Zwei Roboter. Ein System.' },
        tagline: {
          en: 'A humanoid upper body and a quadruped, coupled into one hybrid and separated again on command. Neither loses its autonomy.',
          de: 'Ein humanoider Oberkörper und ein Vierbeiner, gekoppelt zu einem Hybrid und auf Befehl wieder getrennt. Keiner verliert seine Autonomie.',
        },
        video: '/megarobotics/centaur/night-shift-logistics-v2.mp4',
        zoomFrom: 'center top',
        shift: '-14%',
        note: { en: 'Visualisation · prototype phase', de: 'Visualisierung · Prototypphase' },
        useCases: [
          [{ en: 'Night-shift supply runs', de: 'Versorgung in der Nachtschicht' }, { en: 'medication, samples, linen', de: 'Medikamente, Proben, Wäsche' }],
          [{ en: 'Doors and lifts', de: 'Türen und Aufzüge' }, { en: 'operated by the robot itself', de: 'vom Roboter selbst bedient' }],
          [{ en: 'Handover', de: 'Übergabe' }, { en: 'to a person, not a drop-off point', de: 'an einen Menschen, nicht an eine Ablage' }],
        ],
      },
      {
        id: 'substation-inspection',
        eyebrow: { en: 'Substation inspection', de: 'Inspektion im Umspannwerk' },
        tagline: {
          en: 'The chassis crosses gravel and cable trenches; both hands do the checks and switching while clearances are kept.',
          de: 'Das Fahrwerk bewältigt Schotter und Kabelkanäle, beide Hände übernehmen Kontrollen und Schalthandlungen – mit Schutzabstand.',
        },
        video: '/megarobotics/centaur/substation-inspection.mp4',
        zoomFrom: 'center top',
        shift: '-22%',
        note: { en: 'Visualisation · prototype phase', de: 'Visualisierung · Prototypphase' },
        useCases: [
          [{ en: 'Switchgear & transformers', de: 'Schaltanlagen & Trafos' }, { en: 'checks and switching operations', de: 'Kontrollen und Schalthandlungen' }],
          [{ en: 'Two-handed work', de: 'Beidhändig' }, { en: 'tool in one hand, counter-hold in the other', de: 'Werkzeug in der einen, Gegenhalt in der anderen Hand' }],
          [{ en: 'Chassis solo', de: 'Fahrwerk solo' }, { en: 'continuous patrol without the torso', de: 'kontinuierliche Streife ohne Torso' }],
        ],
      },
      {
        id: 'lab-sample-transport',
        eyebrow: { en: 'Laboratory logistics', de: 'Laborlogistik' },
        tagline: {
          en: 'Samples go from the ward to the lab and are handed to a person. The tilt axis keeps the tray level the whole way.',
          de: 'Proben gehen von der Station ins Labor und werden an einen Menschen übergeben. Die Neigeachse hält das Tablett den ganzen Weg waagerecht.',
        },
        video: '/megarobotics/centaur/lab-sample-transport-v2.mp4',
        zoomFrom: 'center top',
        shift: '-14%',
        note: { en: 'Visualisation · prototype phase', de: 'Visualisierung · Prototypphase' },
        useCases: [
          [{ en: 'Sample transport', de: 'Probentransport' }, { en: 'ward to laboratory', de: 'Station zum Labor' }],
          [{ en: 'Level carrying', de: 'Waagerecht tragen' }, { en: '±45° active compensation', de: '±45° aktiver Ausgleich' }],
          [{ en: 'Torso stationary', de: 'Torso stationär' }, { en: 'as a lab workstation when decoupled', de: 'als Laborarbeitsplatz, wenn entkoppelt' }],
        ],
      },
      {
        id: 'medication-transport',
        eyebrow: { en: 'Cold store & medication', de: 'Kühllager & Medikamente' },
        tagline: {
          en: 'Retrieves supplies from refrigerated cabinets and carries medication across the ward.',
          de: 'Entnimmt Material aus Kühlschränken und bringt Medikamente über die Station.',
        },
        video: '/megarobotics/centaur/medication-transport-v2.mp4',
        zoomFrom: 'center top',
        shift: '-14%',
        note: { en: 'Visualisation · prototype phase', de: 'Visualisierung · Prototypphase' },
        useCases: [
          [{ en: 'Refrigerated cabinets', de: 'Kühlschränke' }, { en: 'opened and emptied with two hands', de: 'beidhändig geöffnet und entnommen' }],
          [{ en: 'Medication runs', de: 'Medikamentenfahrten' }, { en: 'pharmacy to ward', de: 'Apotheke zur Station' }],
          [{ en: 'Thresholds & lift gaps', de: 'Schwellen & Aufzugsspalte' }, { en: 'where wheeled carts stop', de: 'wo Rollwagen stehen bleiben' }],
        ],
      },
      {
        id: 'wheelchair-assist',
        eyebrow: { en: 'Care & patient mobility', de: 'Pflege & Patientenmobilität' },
        tagline: {
          en: 'Supports moving patients in a wheelchair and keeps them company along ward corridors.',
          de: 'Unterstützt beim Transport im Rollstuhl und begleitet Patienten auf Stationsfluren.',
        },
        video: '/megarobotics/centaur/wheelchair-assist-v2.mp4',
        zoomFrom: 'center top',
        shift: '-12%',
        note: { en: 'Visualisation · prototype phase', de: 'Visualisierung · Prototypphase' },
        useCases: [
          [{ en: 'Wheelchair transport', de: 'Rollstuhltransport' }, { en: 'on the ward', de: 'auf der Station' }],
          [{ en: 'Bed transport', de: 'Bettentransport' }, { en: 'corridors and lifts', de: 'Flure und Aufzüge' }],
          [{ en: 'Assisted living', de: 'Betreutes Wohnen' }, { en: 'fetching and carrying at home', de: 'Bringdienste im Wohnumfeld' }],
        ],
      },
      {
        id: 'linen-supply',
        eyebrow: { en: 'Linen & consumables', de: 'Wäsche & Verbrauchsmaterial' },
        tagline: {
          en: 'Distributes linen, towels and consumables to every floor, lift rides included.',
          de: 'Verteilt Wäsche, Handtücher und Verbrauchsmaterial auf die Etagen – per Aufzug.',
        },
        video: '/megarobotics/centaur/linen-supply-v2.mp4',
        zoomFrom: 'center top',
        loop: true,
        duration: 9,
        shift: '-12%',
        note: { en: 'Visualisation · prototype phase', de: 'Visualisierung · Prototypphase' },
        useCases: [
          [{ en: 'Hospitals', de: 'Kliniken' }, { en: 'linen and consumables', de: 'Wäsche und Verbrauchsmaterial' }],
          [{ en: 'Hotels & facility', de: 'Hotellerie & Facility' }, { en: 'towels to the floors', de: 'Handtücher auf die Etagen' }],
          [{ en: 'Shelf picking', de: 'Regalentnahme' }, { en: 'with both hands', de: 'mit beiden Händen' }],
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
  zoomFrom?: string
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
    zoomFrom: s.zoomFrom,
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
  { slug: 'seer-x1-pro', slide: 'smart-sorting' },
]

/**
 * Hero for a manufacturer page, built from that brand's products in the order
 * given. With one product that has a hero, its full slide set runs (`product`
 * names it); with several, each gets one slide (its homepage clip, else its
 * first) carrying its own name and specs. Null when none of them has a hero.
 */
export function getManufacturerHero(
  productSlugs: string[],
  locale: Locale,
): (ResolvedProductHero & { product?: { slug: string; name: string } }) | null {
  const slugs = productSlugs.filter((s) => HEROES[s])
  if (!slugs.length) return null
  if (slugs.length === 1) {
    const [slug] = slugs
    return { ...getProductHero(slug, locale)!, product: { slug, name: HEROES[slug].name } }
  }
  const homeSlide = new Map(HOME_SLIDES.map((h) => [h.slug, h.slide]))
  const slides = slugs.map((slug) => {
    const hero = HEROES[slug]
    const s = hero.slides.find((x) => x.id === homeSlide.get(slug)) ?? hero.slides[0]
    return { ...resolveSlide(s, locale), id: slug, product: { slug, name: hero.name, specs: resolveSpecs(hero, locale) } }
  })
  return { specs: [], slides }
}

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
