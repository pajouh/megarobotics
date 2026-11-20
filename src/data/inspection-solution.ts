// Content for /solutions/inspection-security (and /de/...): the full M-series
// page for inspection and security. It is the public counterpart of the
// unlisted /security presentation (public/security.html), without CENTAUR.
//
// Per-model features, applications and spec tables are NOT kept here: the page
// reads them from the Sanity products (m1 … m100ws), so they stay in step with
// the product pages. This file holds the page copy; key figures, the finder and
// the comparison come from src/data/security-solution.ts.
//
// Sources for the copy: M1 catalogue DE 2026 and M40/M100 catalogue 2026
// (projects/Rheinkalk/Kataloge), as of 11/2026. Images: m1-*.jpg are
// manufacturer photos of the M1; app-*.{webp,jpg} are manufacturer renders or
// photos of example payload configurations (no model is claimed for them);
// *-visualisation.jpg are AI-generated scenes. Every caption says which.

import type { Locale } from '@/i18n/config'
import { localize, type Localized } from '@/data/security-solution'

const IMG = '/images/security'

export const M_SERIES_SLUGS = ['m1', 'm1-pro', 'm1-ultra', 'm40', 'm40w', 'm40ws', 'm100', 'm100w', 'm100ws']

const content = {
  meta: {
    title: {
      en: 'Inspection and security robots: the M series | MegaRobotics',
      de: 'Inspektions- und Sicherheitsroboter: die M-Serie | MegaRobotics',
    },
    description: {
      en: 'Nine quadruped and wheel-legged robots for inspection rounds and security patrols: all models, features, specifications, payloads and use cases. Supply and integration in DACH.',
      de: 'Neun Lauf- und Rad-Bein-Roboter für Inspektionsrundgänge und Sicherheitsstreifen: alle Modelle, Funktionen, technische Daten, Nutzlasten und Einsatzfälle. Lieferung und Integration in DACH.',
    },
    serviceName: { en: 'Inspection and security robotics with the M series', de: 'Inspektions- und Sicherheitsrobotik mit der M-Serie' },
    crumbSolutions: { en: 'Solutions', de: 'Lösungen' },
    crumb: { en: 'Inspection and security', de: 'Inspektion und Sicherheit' },
  },

  hero: {
    carousel: { en: 'M series on inspection rounds', de: 'M-Serie auf dem Inspektionsrundgang' },
    chooseSlide: { en: 'Choose scene', de: 'Szene wählen' },
    useCases: { en: 'Use cases', de: 'Einsatzfälle' },
    pause: { en: 'Pause video', de: 'Video anhalten' },
    play: { en: 'Play video', de: 'Video abspielen' },
    ctaPrimary: { en: 'Discuss your route', de: 'Route besprechen' },
    ctaSecondary: { en: 'All nine models', de: 'Alle neun Modelle' },
  },

  intro: {
    eyebrow: { en: 'Solutions · Inspection & security', de: 'Lösungen · Inspektion & Sicherheit' },
    title: { en: 'Inspection and security robots that go where wheels can’t', de: 'Inspektions- und Sicherheitsroboter, die dorthin gehen, wo Räder nicht hinkommen' },
    lead: {
      en: 'The M series is nine quadruped and wheel-legged robots in three weight classes. They walk the inspection round and the night patrol on stairs, grating, gravel and in the rain, and bring back images, temperatures and readings from the same checkpoints every time.',
      de: 'Die M-Serie umfasst neun Lauf- und Rad-Bein-Roboter in drei Gewichtsklassen. Sie gehen Inspektionsrundgang und Nachtstreife auf Treppen, Gitterrosten, Schotter und im Regen und bringen Bilder, Temperaturen und Messwerte jedes Mal von denselben Kontrollpunkten mit.',
    },
    body: {
      en: 'MegaRobotics supplies, integrates and services the M series in Germany, Austria and Switzerland. On this page you find every model with its features and specifications, the sensors we integrate, and the jobs the robots are used for.',
      de: 'MegaRobotics liefert, integriert und betreut die M-Serie in Deutschland, Österreich und der Schweiz. Auf dieser Seite finden Sie jedes Modell mit Funktionen und technischen Daten, die Sensorik, die wir integrieren, und die Aufgaben, für die die Roboter eingesetzt werden.',
    },
    facts: [
      { value: { en: '9', de: '9' }, label: { en: 'models in three series', de: 'Modelle in drei Serien' } },
      { value: { en: '36–79 kg', de: '36–79 kg' }, label: { en: 'robot weight', de: 'Eigengewicht' } },
      { value: { en: '30–100 kg', de: '30–100 kg' }, label: { en: 'payload', de: 'Nutzlast' } },
      { value: { en: 'IP66 / IP67', de: 'IP66 / IP67' }, label: { en: 'on every model', de: 'bei jedem Modell' } },
    ],
    images: [
      { src: `${IMG}/app-legged-multisensor.webp`, alt: { en: 'Quadruped robot with an enclosed PTZ camera and sensor modules on its top deck', de: 'Vierbeiner mit gekapselter PTZ-Kamera und Sensormodulen auf dem Oberdeck' } },
    ],
    imageCaption: { en: 'Example configuration · manufacturer render', de: 'Beispielkonfiguration · Hersteller-Rendering' },
  },

  jobs: {
    eyebrow: { en: 'What the robots do', de: 'Was die Roboter tun' },
    title: { en: 'Eight jobs on one round', de: 'Acht Aufgaben auf einem Rundgang' },
    subtitle: {
      en: 'The robot is the carrier. Which of these jobs it does depends on the sensors and software we integrate for your site.',
      de: 'Der Roboter ist der Träger. Welche dieser Aufgaben er übernimmt, hängt von der Sensorik und Software ab, die wir für Ihren Standort integrieren.',
    },
    withLabel: { en: 'With', de: 'Mit' },
    items: [
      {
        icon: 'Thermometer',
        title: { en: 'Thermal checks', de: 'Wärmebildkontrolle' },
        body: {
          en: 'Temperature readings at fixed checkpoints: transformers, switchgear, bearings, motors. A hot spot shows up against the last round.',
          de: 'Temperaturwerte an festen Kontrollpunkten: Trafos, Schaltanlagen, Lager, Motoren. Ein Hotspot fällt im Vergleich zur letzten Runde auf.',
        },
        with: { en: 'Radiometric thermal camera or dual-light PTZ, per project', de: 'Radiometrische Wärmebildkamera oder Dual-Light-PTZ, je Projekt' },
      },
      {
        icon: 'Gauge',
        title: { en: 'Visual checks and gauges', de: 'Sichtkontrolle und Anzeigen' },
        body: {
          en: 'The zoom camera photographs the same gauge, valve position or seal from the same angle on every round, so changes are easy to see.',
          de: 'Die Zoomkamera fotografiert dieselbe Anzeige, Ventilstellung oder Dichtung auf jeder Runde aus demselben Winkel. Veränderungen sind so leicht zu erkennen.',
        },
        with: { en: 'PTZ camera; automatic reading set up per project', de: 'PTZ-Kamera; automatische Auswertung je Projekt' },
      },
      {
        icon: 'Wind',
        title: { en: 'Gas and leak detection', de: 'Gas- und Leckageerkennung' },
        body: {
          en: 'Gas readings along the route and before people enter a room. An acoustic camera locates leaks and electrical discharge by sound.',
          de: 'Gaswerte entlang der Route und bevor Personen einen Raum betreten. Eine Akustikkamera ortet Leckagen und elektrische Entladungen über das Geräusch.',
        },
        with: { en: 'Multi-gas module, acoustic camera, per project. Not for Ex zones.', de: 'Multigas-Modul, Akustikkamera, je Projekt. Nicht für Ex-Zonen.' },
      },
      {
        icon: 'Scan',
        title: { en: 'Mapping and 3D scans', de: 'Kartierung und 3D-Scans' },
        body: {
          en: 'LiDAR builds a map and a point cloud of the site. The robot uses it to navigate; you can use it to see what has changed.',
          de: 'LiDAR erzeugt eine Karte und eine Punktwolke des Geländes. Der Roboter navigiert damit; Sie sehen daran, was sich verändert hat.',
        },
        with: { en: 'M1: two 3D LiDARs as standard. M40 and M100: Pro package', de: 'M1: zwei 3D-LiDAR serienmäßig. M40 und M100: Pro-Paket' },
      },
      {
        icon: 'MonitorPlay',
        title: { en: 'Remote look', de: 'Blick aus der Ferne' },
        body: {
          en: 'Live video from places nobody should enter first. An operator drives the robot remotely and decides what happens next.',
          de: 'Live-Video von Orten, die niemand als Erster betreten sollte. Ein Bediener steuert den Roboter aus der Ferne und entscheidet, was als Nächstes geschieht.',
        },
        with: { en: 'Radio up to 500 m on M40W and M40WS; 4G/5G or mesh per project', de: 'Funk bis 500 m bei M40W und M40WS; 4G/5G oder Mesh je Projekt' },
      },
      {
        icon: 'Shield',
        title: { en: 'Security patrol', de: 'Sicherheitsstreife' },
        body: {
          en: 'Fixed routes after hours, along buildings, gates and fence lines, with a voice channel to the control room.',
          de: 'Feste Routen nach Feierabend, entlang von Gebäuden, Toren und Zäunen, mit Sprechkanal zur Leitstelle.',
        },
        with: { en: 'Navigation and voice standard on M1 Pro and M1 Ultra', de: 'Navigation und Sprechanlage serienmäßig bei M1 Pro und M1 Ultra' },
        href: '/solutions/security',
        linkLabel: { en: 'Security solution', de: 'Sicherheitslösung' },
      },
      {
        icon: 'Package',
        title: { en: 'Carrying equipment', de: 'Ausrüstung tragen' },
        body: {
          en: 'Masts, measuring gear, tools or extra batteries. In follow mode the M1 Pro carries material behind a technician.',
          de: 'Masten, Messtechnik, Werkzeug oder Zusatzakkus. Im Folgemodus trägt der M1 Pro Material hinter Ihren Technikern her.',
        },
        with: { en: 'Up to 100 kg while moving on the M100WS', de: 'Bis 100 kg in Fahrt beim M100WS' },
      },
      {
        icon: 'ClipboardCheck',
        title: { en: 'Documented rounds', de: 'Dokumentierte Rundgänge' },
        body: {
          en: 'Same route, same checkpoints, images and readings with time and place. The round is proven, not just signed off.',
          de: 'Gleiche Route, gleiche Kontrollpunkte, Bilder und Messwerte mit Zeit und Ort. Der Rundgang ist belegt, nicht nur abgezeichnet.',
        },
        with: { en: 'Link to your systems via SDK and ROS 2, per project', de: 'Anbindung an Ihre Systeme über SDK und ROS 2, je Projekt' },
      },
    ],
  },

  models: {
    eyebrow: { en: 'All nine models', de: 'Alle neun Modelle' },
    title: { en: 'Every M-series robot, with features and specifications', de: 'Jeder Roboter der M-Serie, mit Funktionen und technischen Daten' },
    subtitle: {
      en: 'Pick a series, then a model. Each one shows its key figures, all features, typical applications and the full specification table.',
      de: 'Wählen Sie eine Serie, dann ein Modell. Jedes zeigt Eckdaten, alle Funktionen, typische Anwendungen und die vollständige Spezifikationstabelle.',
    },
    series: {
      m1: {
        name: { en: 'M1 series', de: 'M1-Serie' },
        kicker: { en: 'Fast wheel-legged patrol · 41 kg', de: 'Schnelle Rad-Bein-Streife · 41 kg' },
        lead: {
          en: 'Twelve joint motors for walking and four hub motors in the feet. The M1 rolls fast on flat ground and switches to walking for steps, kerbs and rough terrain. Three variants on one platform: you choose how much autonomy comes built in.',
          de: 'Zwölf Gelenkmotoren zum Laufen und vier Nabenmotoren in den Füßen. Der M1 rollt zügig auf ebenem Boden und wechselt bei Stufen, Bordsteinen und unwegsamem Gelände ins Laufen. Drei Varianten auf einer Plattform: Sie wählen, wie viel Autonomie ab Werk dabei ist.',
        },
      },
      m40: {
        name: { en: 'M40 series', de: 'M40-Serie' },
        kicker: { en: 'Compact and stair-ready · 36 to 43.5 kg', de: 'Kompakt und treppentauglich · 36 bis 43,5 kg' },
        lead: {
          en: 'The lightest robots in the range. They walk where wheeled robots get stuck: stairs, grating, rubble and tight service corridors. A top deck takes the inspection sensors your site needs.',
          de: 'Die leichtesten Roboter im Programm. Sie laufen dort, wo Radroboter hängen bleiben: auf Treppen, Gitterrosten, Schutt und in engen Versorgungsgängen. Das Oberdeck trägt die Inspektionssensorik, die Ihr Standort braucht.',
        },
      },
      m100: {
        name: { en: 'M100 series', de: 'M100-Serie' },
        kicker: { en: 'Heavy duty · 50 to 100 kg payload', de: 'Schwerlast · 50 bis 100 kg Nutzlast' },
        lead: {
          en: 'For long shifts outdoors and heavy equipment. IP67, a 2,081 Wh battery that swaps quickly, and up to 100 kg of continuous payload on the M100WS.',
          de: 'Für lange Einsätze im Freien und schwere Ausrüstung. IP67, ein schnell wechselbarer 2.081-Wh-Akku und beim M100WS bis zu 100 kg Dauernutzlast.',
        },
      },
    },
    labels: {
      chooseSeries: { en: 'Choose series', de: 'Serie wählen' },
      chooseModel: { en: 'Choose model', de: 'Modell wählen' },
      features: { en: 'Features', de: 'Funktionen' },
      applications: { en: 'Typical applications', de: 'Typische Anwendungen' },
      specs: { en: 'Full specifications', de: 'Vollständige technische Daten' },
      productPage: { en: 'Product page', de: 'Produktseite' },
      request: { en: 'Request this model', de: 'Modell anfragen' },
      rendering: { en: 'Rendering · base configuration', de: 'Rendering · Grundkonfiguration' },
      weight: { en: 'Weight', de: 'Gewicht' },
      payload: { en: 'Payload', de: 'Nutzlast' },
      speed: { en: 'Top speed', de: 'Höchsttempo' },
      endurance: { en: 'Endurance, unloaded', de: 'Laufzeit ohne Last' },
      obstacle: { en: 'Max. obstacle', de: 'Max. Hindernis' },
      ip: { en: 'Protection', de: 'Schutzart' },
      walk: { en: 'Walking', de: 'Laufend' },
      wl: { en: 'Wheel-legged', de: 'Rad-Bein' },
    },
    matrixTitle: { en: 'M1, M1 Pro or M1 Ultra?', de: 'M1, M1 Pro oder M1 Ultra?' },
    matrixLead: { en: 'Same platform, three levels of built-in autonomy.', de: 'Gleiche Plattform, drei Stufen an Autonomie ab Werk.' },
    matrixHead: [
      { en: 'Function', de: 'Funktion' },
      { en: 'M1', de: 'M1' },
      { en: 'M1 Pro', de: 'M1 Pro' },
      { en: 'M1 Ultra', de: 'M1 Ultra' },
    ],
    matrix: [
      [{ en: 'Navigation and mapping', de: 'Navigation und Kartierung' }, { en: 'Option', de: 'Option' }, { en: 'Standard', de: 'Serie' }, { en: 'Standard', de: 'Serie' }],
      [{ en: 'Follow mode (UWB, LiDAR, vision)', de: 'Folgemodus (UWB, LiDAR, Kamera)' }, { en: '–', de: '–' }, { en: '✓', de: '✓' }, { en: '✓', de: '✓' }],
      [{ en: 'Voice intercom and broadcast', de: 'Sprechanlage und Durchsage' }, { en: '–', de: '–' }, { en: '✓', de: '✓' }, { en: '✓', de: '✓' }],
      [{ en: 'Ultrasonic sensors', de: 'Ultraschallsensoren' }, { en: '–', de: '–' }, { en: '✓', de: '✓' }, { en: '✓', de: '✓' }],
      [{ en: '720° surround perception', de: '720°-Rundumwahrnehmung' }, { en: '–', de: '–' }, { en: '–', de: '–' }, { en: '✓', de: '✓' }],
      [{ en: 'Cameras', de: 'Kameras' }, { en: '2 × 8 MP', de: '2 × 8 MP' }, { en: '2 × 8 MP', de: '2 × 8 MP' }, { en: '4 × fisheye + 2 × stereo', de: '4 × Fischauge + 2 × Stereo' }],
      [{ en: 'Compute', de: 'Rechenleistung' }, { en: '100 TOPS', de: '100 TOPS' }, { en: '100 TOPS', de: '100 TOPS' }, { en: '128 TOPS', de: '128 TOPS' }],
    ],
  },

  videos: {
    eyebrow: { en: 'On video', de: 'Im Video' },
    title: { en: 'See the M series move', de: 'Die M-Serie in Bewegung' },
    items: [
      { id: 'terrain-stairs', title: { en: 'M40 series on gravel, slopes and stairs · real footage', de: 'M40-Serie auf Schotter, Steigung und Treppe · Realaufnahmen' } },
      { id: 'plant-patrol', title: { en: 'M100WS on a plant round · AI-generated visualisation, payloads not included', de: 'M100WS auf Anlagenrundgang · KI-generierte Visualisierung, Nutzlasten nicht im Lieferumfang' } },
    ],
  },

  cases: {
    eyebrow: { en: 'Where they work', de: 'Wo sie arbeiten' },
    title: { en: 'Six fields of use and the models we would start with', de: 'Sechs Einsatzfelder und die Modelle, mit denen wir anfangen würden' },
    subtitle: {
      en: 'Click a model to jump to its details above.',
      de: 'Ein Klick auf ein Modell springt zu den Details weiter oben.',
    },
    items: [
      {
        icon: 'Zap',
        title: { en: 'Power utilities and substations', de: 'Energieversorgung und Umspannwerke' },
        body: {
          en: 'Rounds through switch rooms, cable tunnels and gravel yards. Thermal checks on transformers and switchgear, acoustic checks for discharge, and the fence in view on the way.',
          de: 'Rundgänge durch Schalträume, Kabeltunnel und Schotterflächen. Wärmebildkontrolle an Trafos und Schaltanlagen, akustische Prüfung auf Entladungen und der Zaun unterwegs im Blick.',
        },
        models: ['m40', 'm100', 'm100w'],
        image: `${IMG}/substation-visualisation.jpg`,
        caption: { en: 'AI-generated visualisation', de: 'KI-generierte Visualisierung' },
        fit: 'cover',
      },
      {
        icon: 'Factory',
        title: { en: 'Process plants, pipe racks, tank farms', de: 'Prozessanlagen, Rohrbrücken, Tanklager' },
        body: {
          en: 'Stairs, grating and multi-level walkways outside classified Ex zones. Gauges, valves, flanges and pumps are photographed and measured on every round.',
          de: 'Treppen, Gitterroste und mehrstöckige Laufwege außerhalb eingestufter Ex-Zonen. Anzeigen, Ventile, Flansche und Pumpen werden auf jeder Runde fotografiert und gemessen.',
        },
        models: ['m40', 'm40ws', 'm100w', 'm100ws'],
        image: `${IMG}/plant-visualisation.jpg`,
        caption: { en: 'AI-generated visualisation', de: 'KI-generierte Visualisierung' },
        fit: 'cover',
      },
      {
        icon: 'Route',
        title: { en: 'Pipe galleries and tunnels', de: 'Rohrkanäle und Tunnel' },
        body: {
          en: 'Utility tunnels, cable ducts and underground infrastructure: narrow, wet, dusty and dark. M40 and M100 wade through 30 cm of water; the M100 series is IP67.',
          de: 'Versorgungstunnel, Kabelkanäle und unterirdische Infrastruktur: eng, nass, staubig und dunkel. M40 und M100 haben 30 cm Wattiefe; die M100-Serie ist IP67.',
        },
        models: ['m40', 'm100', 'm100w'],
        image: `${IMG}/m1-water.jpg`,
        caption: { en: 'M1 in water · manufacturer photo', de: 'M1 im Wasser · Herstellerfoto' },
        fit: 'cover',
      },
      {
        icon: 'Warehouse',
        title: { en: 'Industrial parks, warehouses, data centres', de: 'Industrieparks, Lager, Rechenzentren' },
        body: {
          en: 'Security patrols on fixed routes after hours, with navigation, voice and lights. The same robot checks doors, gates and plant rooms on its way.',
          de: 'Sicherheitsstreifen auf festen Routen nach Feierabend, mit Navigation, Sprechfunktion und Licht. Derselbe Roboter kontrolliert unterwegs Türen, Tore und Technikräume.',
        },
        models: ['m1-pro', 'm1-ultra', 'm40w', 'm100w'],
        image: `${IMG}/m1-patrol.jpg`,
        caption: { en: 'M1 · manufacturer photo', de: 'M1 · Herstellerfoto' },
        fit: 'cover',
      },
      {
        icon: 'Flame',
        title: { en: 'Fire and rescue support', de: 'Unterstützung für Feuerwehr und Rettung' },
        body: {
          en: 'The robot goes in first and sends a live picture and a thermal view, or carries equipment to the scene. Not for explosive atmospheres.',
          de: 'Der Roboter geht zuerst hinein und liefert Livebild und Wärmebild oder trägt Ausrüstung an den Einsatzort. Nicht für explosionsfähige Atmosphären.',
        },
        models: ['m100', 'm100ws', 'm40w'],
        image: `${IMG}/app-legged-ptz-antennas.webp`,
        caption: { en: 'Example configuration · manufacturer render', de: 'Beispielkonfiguration · Hersteller-Rendering' },
        fit: 'contain',
      },
      {
        icon: 'Map',
        title: { en: 'Large outdoor sites', de: 'Große Außengelände' },
        body: {
          en: 'Logistics yards, campuses, solar parks and construction sites. Wheels cover the distance, legs take ditches, kerbs and unpaved ground.',
          de: 'Logistikhöfe, Campus, Solarparks und Baustellen. Räder machen Strecke, Beine nehmen Gräben, Bordsteine und unbefestigten Boden.',
        },
        models: ['m100ws', 'm1', 'm40ws'],
        image: `${IMG}/m1-terrain.jpg`,
        caption: { en: 'M1 · manufacturer photo', de: 'M1 · Herstellerfoto' },
        fit: 'cover',
      },
    ],
  },

  equip: {
    eyebrow: { en: 'Equipment and options', de: 'Ausstattung und Optionen' },
    title: { en: 'What comes built in, and what you can add', de: 'Was ab Werk dabei ist und was Sie ergänzen können' },
    subtitle: {
      en: 'Standard equipment differs by series. Options and inspection payloads are confirmed per quotation.',
      de: 'Die Serienausstattung unterscheidet sich je Serie. Optionen und Inspektionsnutzlasten werden je Angebot bestätigt.',
    },
    standardLabel: { en: 'Standard', de: 'Serie' },
    optionsLabel: { en: 'Options', de: 'Optionen' },
    series: [
      {
        name: { en: 'M1 series', de: 'M1-Serie' },
        standard: [
          { en: 'Two 3D LiDARs (front and rear), depth camera, RTK, IMU', de: 'Zwei 3D-LiDAR (vorn und hinten), Tiefenkamera, RTK, IMU' },
          { en: 'Two 8 MP wide-angle cameras and four fill lights', de: 'Zwei 8-MP-Weitwinkelkameras und vier Zusatzleuchten' },
          { en: 'Two hot-swap batteries, 1,010 Wh, charged in under 2 h', de: 'Zwei Wechselakkus, 1.010 Wh, in unter 2 h geladen' },
          { en: 'Charger, charging dock, remote control, transport case', de: 'Ladegerät, Ladedock, Fernbedienung, Transportkoffer' },
        ],
        options: [
          { en: 'Navigation package for the M1 (standard on Pro and Ultra)', de: 'Navigationspaket für den M1 (Serie bei Pro und Ultra)' },
          { en: 'Charging station for autonomous recharging', de: 'Ladestation für autonomes Nachladen' },
          { en: 'Wide-temperature battery, −40 to +80 °C', de: 'Weittemperatur-Akku, −40 bis +80 °C' },
          { en: 'Point-foot kit; Jetson Orin NX 16 GB module (M1, M1 Pro)', de: 'Punktfuß-Kit; Jetson-Orin-NX-Modul 16 GB (M1, M1 Pro)' },
        ],
      },
      {
        name: { en: 'M40 series', de: 'M40-Serie' },
        standard: [
          { en: 'Two ultrasonic sensors and a wide-angle camera (M40W: 130°)', de: 'Zwei Ultraschallsensoren und eine Weitwinkelkamera (M40W: 130°)' },
          { en: 'Swappable 936 Wh battery', de: 'Wechselbarer 936-Wh-Akku' },
          { en: 'Gigabit Ethernet, USB-C, 12/24 V and battery-voltage outputs, Wi-Fi 6', de: 'Gigabit-Ethernet, USB-C, Ausgänge 12/24 V und Akkuspannung, Wi-Fi 6' },
        ],
        options: [
          { en: 'Pro package: Jetson Orin NX 8 GB (70 TOPS), two LiDARs, second camera', de: 'Pro-Paket: Jetson Orin NX 8 GB (70 TOPS), zwei LiDAR, zweite Kamera' },
          { en: 'With Pro: SLAM mapping, autonomous navigation, obstacle avoidance, point-cloud view', de: 'Mit Pro: SLAM-Kartierung, autonome Navigation, Hinderniserkennung, Punktwolkenansicht' },
          { en: '4G, GPS and RTK', de: '4G, GPS und RTK' },
          { en: 'Autonomous following, automatic docking and charging', de: 'Autonomes Folgen, automatisches Andocken und Laden' },
        ],
      },
      {
        name: { en: 'M100 series', de: 'M100-Serie' },
        standard: [
          { en: 'M100 and M100W: LiDAR and two wide-angle cameras', de: 'M100 und M100W: LiDAR und zwei Weitwinkelkameras' },
          { en: 'M100WS: deck with 12 × M8 points, 12/24/48 V, prepared for LiDAR and HD camera', de: 'M100WS: Deck mit 12 × M8-Punkten, 12/24/48 V, vorbereitet für LiDAR und HD-Kamera' },
          { en: '2,081 Wh battery with quick swap', de: '2.081-Wh-Akku mit Schnellwechsel' },
        ],
        options: [
          { en: 'Pro package: Jetson Orin NX 8 GB (70 TOPS) and 4G module', de: 'Pro-Paket: Jetson Orin NX 8 GB (70 TOPS) und 4G-Modul' },
          { en: 'With Pro: SLAM mapping, obstacle avoidance, point-cloud view; autonomous navigation at demo stage', de: 'Mit Pro: SLAM-Kartierung, Hinderniserkennung, Punktwolkenansicht; autonome Navigation im Demo-Stadium' },
          { en: 'RTK, autonomous following, automatic charging', de: 'RTK, autonomes Folgen, automatisches Laden' },
          { en: 'Fast charging: 2.5 h instead of 4.5 h (M100, M100W)', de: 'Schnellladen: 2,5 h statt 4,5 h (M100, M100W)' },
        ],
      },
    ],
    payloadsTitle: { en: 'Inspection payloads we integrate', de: 'Inspektionsnutzlasten, die wir integrieren' },
    payloadsLead: {
      en: 'Selected for what your round has to detect. They are not part of the standard scope of supply, so the quotation lists exactly what you get.',
      de: 'Ausgewählt nach dem, was Ihr Rundgang erkennen muss. Sie gehören nicht zum Standard-Lieferumfang, das Angebot nennt also genau, was Sie bekommen.',
    },
  },

  gallery: {
    eyebrow: { en: 'Gallery', de: 'Galerie' },
    title: { en: 'Configurations and field photos', de: 'Konfigurationen und Fotos aus dem Feld' },
    subtitle: {
      en: 'How the robots look with inspection and security payloads on the deck. Click an image to enlarge it.',
      de: 'So sehen die Roboter mit Inspektions- und Sicherheitsnutzlasten auf dem Deck aus. Ein Klick vergrößert das Bild.',
    },
    labels: {
      open: { en: 'Enlarge image', de: 'Bild vergrößern' },
      close: { en: 'Close', de: 'Schließen' },
      prev: { en: 'Previous image', de: 'Vorheriges Bild' },
      next: { en: 'Next image', de: 'Nächstes Bild' },
    },
    items: [
      { src: `${IMG}/app-real-ptz-detail.jpg`, w: 764, h: 797, bg: 'photo', alt: { en: 'Real unit with a caged PTZ camera, sensor box and LiDAR on the deck', de: 'Reales Gerät mit PTZ-Kamera im Schutzkorb, Sensorbox und LiDAR auf dem Deck' }, caption: { en: 'Real unit: PTZ head, sensor box and LiDAR · photo', de: 'Reales Gerät: PTZ-Kopf, Sensorbox und LiDAR · Foto' } },
      { src: `${IMG}/app-legged-multisensor.webp`, w: 1144, h: 1125, bg: 'light', alt: { en: 'Quadruped with enclosed PTZ camera and sensor modules', de: 'Vierbeiner mit gekapselter PTZ-Kamera und Sensormodulen' }, caption: { en: 'Multi-sensor deck · render', de: 'Multisensor-Deck · Rendering' } },
      { src: `${IMG}/app-wheel-legged-payload.jpg`, w: 1600, h: 1000, bg: 'photo', alt: { en: 'Wheel-legged robot with sensor head and roll bar', de: 'Rad-Bein-Roboter mit Sensorkopf und Schutzbügel' }, caption: { en: 'Wheel-legged with sensor head · render', de: 'Rad-Bein mit Sensorkopf · Rendering' } },
      { src: `${IMG}/app-legged-ptz-1.webp`, w: 997, h: 880, bg: 'white', alt: { en: 'Quadruped with caged PTZ camera and LiDAR', de: 'Vierbeiner mit PTZ-Kamera im Schutzkorb und LiDAR' }, caption: { en: 'PTZ camera and LiDAR · render', de: 'PTZ-Kamera und LiDAR · Rendering' } },
      { src: `${IMG}/app-legged-ptz-antennas.webp`, w: 985, h: 884, bg: 'white', alt: { en: 'Red and white quadruped with PTZ camera and two long antennas', de: 'Rot-weißer Vierbeiner mit PTZ-Kamera und zwei langen Antennen' }, caption: { en: 'PTZ and long-range antennas · render', de: 'PTZ und Antennen für große Reichweite · Rendering' } },
      { src: `${IMG}/app-wheel-legged-top.jpg`, w: 1600, h: 1000, bg: 'photo', alt: { en: 'Wheel-legged robot from above with pan-tilt camera and payload modules', de: 'Rad-Bein-Roboter von oben mit Schwenk-Neige-Kamera und Nutzlastmodulen' }, caption: { en: 'Payload deck from above · render', de: 'Nutzlastdeck von oben · Rendering' } },
      { src: `${IMG}/app-legged-ptz-2.webp`, w: 1163, h: 831, bg: 'white', alt: { en: 'Quadruped with caged PTZ camera, side view', de: 'Vierbeiner mit PTZ-Kamera im Schutzkorb, Seitenansicht' }, caption: { en: 'PTZ head, side view · render', de: 'PTZ-Kopf, Seitenansicht · Rendering' } },
      { src: `${IMG}/app-park-patrol.webp`, w: 1200, h: 1174, bg: 'dark', alt: { en: 'Quadruped with a three-lens camera head for site patrol', de: 'Vierbeiner mit Dreifach-Kamerakopf für die Geländestreife' }, caption: { en: 'Site-patrol configuration · manufacturer visualisation', de: 'Konfiguration für die Geländestreife · Hersteller-Visualisierung' } },
      { src: `${IMG}/app-concept-arm.webp`, w: 1200, h: 1255, bg: 'white', alt: { en: 'Quadruped with a manipulator arm and camera on its deck', de: 'Vierbeiner mit Manipulatorarm und Kamera auf dem Deck' }, caption: { en: 'Concept: manipulator arm · not a standard option', de: 'Konzept: Manipulatorarm · keine Standardoption' } },
      { src: `${IMG}/m1-patrol.jpg`, w: 1447, h: 766, bg: 'photo', alt: { en: 'M1 next to outdoor cabinets with a technician', de: 'M1 neben Außenschränken mit einem Techniker' }, caption: { en: 'M1 on a site round · manufacturer photo', de: 'M1 auf dem Geländerundgang · Herstellerfoto' } },
      { src: `${IMG}/m1-stairs.jpg`, w: 1447, h: 766, bg: 'photo', alt: { en: 'M1 on stairs next to a LiDAR point cloud of the scene', de: 'M1 auf einer Treppe neben der LiDAR-Punktwolke der Szene' }, caption: { en: 'M1 on stairs, with point cloud · manufacturer photo', de: 'M1 auf der Treppe, mit Punktwolke · Herstellerfoto' } },
      { src: `${IMG}/m1-terrain.jpg`, w: 1447, h: 766, bg: 'photo', alt: { en: 'M1 on rough ground outdoors', de: 'M1 auf unwegsamem Gelände im Freien' }, caption: { en: 'M1 on rough ground · manufacturer photo', de: 'M1 im Gelände · Herstellerfoto' } },
      { src: `${IMG}/m1-water.jpg`, w: 1447, h: 766, bg: 'photo', alt: { en: 'M1 driving through shallow water', de: 'M1 fährt durch flaches Wasser' }, caption: { en: 'M1 in water · manufacturer photo', de: 'M1 im Wasser · Herstellerfoto' } },
    ],
    note: {
      en: 'Renders and visualisations show example configurations. Payloads shown are not included in the standard scope of supply.',
      de: 'Renderings und Visualisierungen zeigen Beispielkonfigurationen. Gezeigte Nutzlasten gehören nicht zum Standard-Lieferumfang.',
    },
  },

  software: {
    eyebrow: { en: 'Software and integration', de: 'Software und Integration' },
    title: { en: 'Open enough to fit into your systems', de: 'Offen genug für Ihre Systeme' },
    items: [
      {
        icon: 'Cpu',
        title: { en: 'SDK and ROS 2', de: 'SDK und ROS 2' },
        body: {
          en: 'M1: open SDK in C++, ROS 2 Humble with Nav2, URDF models and simulator. M40 and M100: high- and low-level SDK, ROS 1 / ROS 2, simulation models and OTA updates.',
          de: 'M1: offenes SDK in C++, ROS 2 Humble mit Nav2, URDF-Modelle und Simulator. M40 und M100: High- und Low-Level-SDK, ROS 1 / ROS 2, Simulationsmodelle und OTA-Updates.',
        },
      },
      {
        icon: 'Cable',
        title: { en: 'Interfaces and power', de: 'Schnittstellen und Strom' },
        body: {
          en: 'Ethernet and USB on every model, plus RS232, RS485 and SBUS on the M1. Payload power at 12, 24 and 48 V or battery voltage, depending on the series.',
          de: 'Ethernet und USB bei jedem Modell, beim M1 zusätzlich RS232, RS485 und SBUS. Nutzlastversorgung mit 12, 24 und 48 V oder Akkuspannung, je nach Serie.',
        },
      },
      {
        icon: 'Radio',
        title: { en: 'Connectivity', de: 'Verbindung' },
        body: {
          en: 'Wi-Fi on board. 4G comes with the Pro package or as an option; a 5G router or mesh radio is added per project.',
          de: 'WLAN an Bord. 4G kommt mit dem Pro-Paket oder als Option; 5G-Router oder Mesh-Funk ergänzen wir je Projekt.',
        },
      },
      {
        icon: 'Network',
        title: { en: 'Your systems', de: 'Ihre Systeme' },
        body: {
          en: 'We connect the robot to your control room or maintenance system. What is delivered is fixed in the quotation, not promised in a brochure.',
          de: 'Wir binden den Roboter an Ihre Leitstelle oder Ihr Instandhaltungssystem an. Was geliefert wird, steht im Angebot und nicht nur im Prospekt.',
        },
      },
    ],
  },

  finder: {
    eyebrow: { en: 'Interactive', de: 'Interaktiv' },
    title: { en: 'Find the robot for your route', de: 'Den Roboter für Ihre Route finden' },
    subtitle: {
      en: 'Tick what your site needs. The models that meet every point stay lit.',
      de: 'Wählen Sie, was Ihr Standort braucht. Die Modelle, die alle Punkte erfüllen, bleiben hervorgehoben.',
    },
  },

  limits: {
    eyebrow: { en: 'Good to know', de: 'Gut zu wissen' },
    title: { en: 'What to know before you plan', de: 'Was Sie vor der Planung wissen sollten' },
    items: [
      {
        title: { en: 'No explosion protection', de: 'Kein Explosionsschutz' },
        body: { en: 'No M-series model is Ex-protected. Routes must stay outside classified Ex zones.', de: 'Kein Modell der M-Serie ist explosionsgeschützt. Routen müssen außerhalb eingestufter Ex-Zonen bleiben.' },
      },
      {
        title: { en: 'CE conformity in preparation', de: 'CE-Konformität in Vorbereitung' },
        body: { en: 'We tell you the status for your model when we quote.', de: 'Den Stand für Ihr Modell nennen wir mit dem Angebot.' },
      },
      {
        title: { en: 'Sensors are project scope', de: 'Sensorik ist Projektumfang' },
        body: { en: 'Thermal, gas, acoustic and PTZ payloads are selected and integrated per project and listed in the quotation.', de: 'Wärmebild-, Gas-, Akustik- und PTZ-Nutzlasten werden je Projekt ausgewählt, integriert und im Angebot aufgeführt.' },
      },
      {
        title: { en: 'Autonomy differs by model', de: 'Autonomie je nach Modell' },
        body: { en: 'Navigation is standard on M1 Pro and M1 Ultra and part of the Pro package on the M40 series. On M100 and M100W it is at demo stage.', de: 'Navigation ist Serie bei M1 Pro und M1 Ultra und Teil des Pro-Pakets der M40-Serie. Bei M100 und M100W ist sie im Demo-Stadium.' },
      },
      {
        title: { en: 'Figures are unloaded maxima', de: 'Werte sind Maxima ohne Last' },
        body: { en: 'Base configuration, as of 11/2026. Payload shortens runtime; speeds are not stated under load.', de: 'Grundkonfiguration, Stand 11/2026. Nutzlast verkürzt die Laufzeit; Geschwindigkeiten sind nicht unter Last angegeben.' },
      },
      {
        title: { en: 'Images', de: 'Abbildungen' },
        body: { en: 'Product images are renderings and may differ from the delivered unit. Visualisations are marked as such.', de: 'Produktbilder sind Renderings und können vom gelieferten Gerät abweichen. Visualisierungen sind als solche gekennzeichnet.' },
      },
    ],
    oem: {
      en: 'The M series is built for MegaRobotics by OEM manufacturing partners. All values are subject to change; the quotation confirms the exact scope.',
      de: 'Die M-Serie wird für MegaRobotics von OEM-Fertigungspartnern hergestellt. Änderungen vorbehalten; das Angebot bestätigt den genauen Umfang.',
    },
  },

  faq: {
    eyebrow: { en: 'Questions', de: 'Fragen' },
    title: { en: 'Inspection robots: frequent questions', de: 'Inspektionsroboter: häufige Fragen' },
    items: [
      {
        q: { en: 'What can an inspection robot check?', de: 'Was kann ein Inspektionsroboter prüfen?' },
        a: {
          en: 'Whatever its sensors can see, hear or measure from the route: temperatures with a thermal camera, gauges and valve positions with a zoom camera, gas concentrations, and leaks or electrical discharge with an acoustic camera. The sensors are chosen per project.',
          de: 'Alles, was seine Sensorik von der Route aus sehen, hören oder messen kann: Temperaturen mit der Wärmebildkamera, Anzeigen und Ventilstellungen mit der Zoomkamera, Gaskonzentrationen sowie Leckagen oder elektrische Entladungen mit der Akustikkamera. Die Sensorik wird je Projekt gewählt.',
        },
      },
      {
        q: { en: 'Which model climbs stairs?', de: 'Welches Modell steigt Treppen?' },
        a: {
          en: 'The M1 models take steps up to 25 cm. All three M40 models and the M100 and M100W climb stairs with 20 cm steps. The M100WS handles single steps up to 30 cm.',
          de: 'Die M1-Modelle nehmen Stufen bis 25 cm. Alle drei M40-Modelle sowie M100 und M100W steigen Treppen mit 20 cm Stufen. Der M100WS überwindet einzelne Stufen bis 30 cm.',
        },
      },
      {
        q: { en: 'Do the robots drive their route on their own?', de: 'Fahren die Roboter ihre Route selbstständig?' },
        a: {
          en: 'M1 Pro and M1 Ultra come with navigation and mapping as standard. The M1 gets it with the navigation package and the M40 series with the Pro package. On M100 and M100W autonomous navigation is at demo stage, so plan them with remote operation for now.',
          de: 'M1 Pro und M1 Ultra haben Navigation und Kartierung serienmäßig. Der M1 bekommt sie mit dem Navigationspaket, die M40-Serie mit dem Pro-Paket. Bei M100 und M100W ist die autonome Navigation im Demo-Stadium, planen Sie dort vorerst mit Fernsteuerung.',
        },
      },
      {
        q: { en: 'Are thermal cameras and other sensors included?', de: 'Sind Wärmebildkameras und andere Sensoren enthalten?' },
        a: {
          en: 'No. Inspection payloads are selected for your site and integrated by us. The quotation lists exactly what is included.',
          de: 'Nein. Inspektionsnutzlasten wählen wir für Ihren Standort aus und integrieren sie. Das Angebot nennt genau, was enthalten ist.',
        },
      },
      {
        q: { en: 'How long does a robot run, and how long does it charge?', de: 'Wie lange läuft ein Roboter und wie lange lädt er?' },
        a: {
          en: 'Unloaded between 5 and 7.5 hours, depending on the model. The M1 charges in under 2 hours and the M40W and M40WS in about 2 hours. M100 and M100W take 4.5 hours, or 2.5 with the fast-charging option. Batteries can be swapped on every series.',
          de: 'Ohne Last je nach Modell 5 bis 7,5 Stunden. Der M1 lädt in unter 2 Stunden, M40W und M40WS in rund 2 Stunden. M100 und M100W brauchen 4,5 Stunden, mit der Schnelllade-Option 2,5. Die Akkus sind bei jeder Serie wechselbar.',
        },
      },
      {
        q: { en: 'Can the robots be used in Ex zones?', de: 'Können die Roboter in Ex-Zonen eingesetzt werden?' },
        a: {
          en: 'No. No M-series model has explosion protection. They are meant for areas outside classified Ex zones.',
          de: 'Nein. Kein Modell der M-Serie hat Explosionsschutz. Sie sind für Bereiche außerhalb eingestufter Ex-Zonen vorgesehen.',
        },
      },
      {
        q: { en: 'Can we try a robot on our own route?', de: 'Können wir einen Roboter auf unserer eigenen Route erproben?' },
        a: {
          en: 'Yes. We run a pilot on your real route before acceptance, so you see what the robot can and can’t take over.',
          de: 'Ja. Vor der Abnahme fahren wir einen Pilot auf Ihrer echten Route. So sehen Sie, was der Roboter übernehmen kann und was nicht.',
        },
      },
    ],
    related: { en: 'Security patrols and site protection with the M series', de: 'Sicherheitsstreife und Objektschutz mit der M-Serie' },
  },

  cta: {
    eyebrow: { en: 'Your route', de: 'Ihre Route' },
    title: { en: 'Show us the round. We’ll tell you which robot can walk it.', de: 'Zeigen Sie uns den Rundgang. Wir sagen Ihnen, welcher Roboter ihn gehen kann.' },
    body: {
      en: 'Send a site plan, a few photos of the route and what has to be checked. You get a model, a sensor set and an honest view of what a robot can take over.',
      de: 'Schicken Sie einen Lageplan, ein paar Fotos der Route und was geprüft werden soll. Sie bekommen Modell, Sensorik und eine ehrliche Einschätzung, was ein Roboter übernehmen kann.',
    },
    button: { en: 'Discuss your project', de: 'Projekt besprechen' },
  },
}

export type InspectionContent = Localized<typeof content>

export function getInspectionContent(locale: Locale): InspectionContent {
  return localize(content, locale)
}
