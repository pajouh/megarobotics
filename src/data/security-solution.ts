// Content for the security solution page at /solutions/security (and /de/...).
//
// Public counterpart of the unlisted /security presentation (public/security.html),
// without CENTAUR. Sources: M1 catalogue DE 2026 and M40/M100 catalogue 2026
// (projects/Rheinkalk/Kataloge). Figures are base configuration, unloaded unless
// stated, as of 11/2026. M40 endurance: the spec table says 5.5 h, the model
// summary says up to 5 h; both pages carry that note until it is confirmed.
//
// Images: m1-*.jpg are manufacturer photos of the M1. app-*.{webp,jpg} are
// manufacturer renders of example payload configurations (no model is claimed
// for them); *-visualisation.jpg are AI-generated scenes. Every caption says which.

import type { Locale } from '@/i18n/config'

type L = { en: string; de: string }

export const SECURITY_MEDIA = '/megarobotics/security'

const IMG = '/images/security'
const CDN = 'https://cdn.sanity.io/images/wudur8e8/production'

export type NeedKey = 'stairs' | 'ip67' | 'fast' | 'long' | 'heavy' | 'light' | 'auto' | 'voice' | 'surround' | 'lights'
export type SeriesKey = 'm1' | 'm40' | 'm100'

export interface SecurityModel {
  slug: string
  name: string
  series: SeriesKey
  drive: 'walk' | 'wl'
  image: string
  tag: L
  /** weight kg, payload kg, speed m/s, endurance h (unloaded), obstacle cm */
  weight: number
  payload: number
  speed: number
  endurance: number
  enduranceLabel: L
  obstacle: number
  ip: 'IP66' | 'IP67'
  needs: NeedKey[]
}

// Finder tags must stay true to the catalogues. M40-series stairs: 20 cm steps
// for all three models (catalogue p. 08), so M40W climbs stairs as well.
export const SECURITY_MODELS: SecurityModel[] = [
  {
    slug: 'm1', name: 'M1', series: 'm1', drive: 'wl',
    image: `${CDN}/b77f658571e745f6460eb161405484f78e9720a4-652x545.png`,
    tag: { en: 'Wheel-legged quadruped: fast on the flat, walks where wheels give up.', de: 'Rad-Bein-Vierbeiner: schnell auf ebener Fläche, läuft dort, wo Räder aufgeben.' },
    weight: 41, payload: 30, speed: 6, endurance: 5, enduranceLabel: { en: '5 h / 29 km', de: '5 h / 29 km' }, obstacle: 80, ip: 'IP67',
    needs: ['stairs', 'ip67', 'fast', 'long', 'light', 'lights'],
  },
  {
    slug: 'm1-pro', name: 'M1 Pro', series: 'm1', drive: 'wl',
    image: `${CDN}/d28948390f9d22967e998fbdde44a58267ce4128-579x471.png`,
    tag: { en: 'The M1 with navigation, follow mode and two-way voice built in.', de: 'Der M1 mit Navigation, Folgemodus und Sprechfunktion ab Werk.' },
    weight: 41, payload: 30, speed: 6, endurance: 5, enduranceLabel: { en: '5 h / 29 km', de: '5 h / 29 km' }, obstacle: 80, ip: 'IP67',
    needs: ['stairs', 'ip67', 'fast', 'long', 'light', 'lights', 'auto', 'voice'],
  },
  {
    slug: 'm1-ultra', name: 'M1 Ultra', series: 'm1', drive: 'wl',
    image: `${CDN}/d28948390f9d22967e998fbdde44a58267ce4128-579x471.png`,
    tag: { en: '720° surround perception and 128 TOPS on the M1 platform.', de: '720°-Rundumwahrnehmung und 128 TOPS auf der M1-Plattform.' },
    weight: 41, payload: 30, speed: 6, endurance: 5, enduranceLabel: { en: '5 h / 29 km', de: '5 h / 29 km' }, obstacle: 80, ip: 'IP67',
    needs: ['stairs', 'ip67', 'fast', 'long', 'light', 'lights', 'auto', 'voice', 'surround'],
  },
  {
    slug: 'm40', name: 'M40', series: 'm40', drive: 'walk',
    image: `${CDN}/be06eb98e716cdfc9df4e99fbe6802fbc79e0acd-1048x862.png`,
    tag: { en: 'Compact walking robot for stairs, pipe racks and tight inspection routes.', de: 'Kompakter Laufroboter für Treppen, Rohrbrücken und enge Inspektionswege.' },
    weight: 36, payload: 30, speed: 5, endurance: 5.5, enduranceLabel: { en: '5.5 h / ~20 km*', de: '5,5 h / ~20 km*' }, obstacle: 30, ip: 'IP66',
    needs: ['stairs', 'fast', 'light'],
  },
  {
    slug: 'm40w', name: 'M40W', series: 'm40', drive: 'wl',
    image: `${CDN}/0a58d94c196edd7f27e9e47b257450d852775f19-1008x962.png`,
    tag: { en: 'Wheels for speed, legs for kerbs and stairs: the fast patroller of the M40 series.', de: 'Räder für Tempo, Beine für Kanten und Treppen: der schnelle Streifenroboter der M40-Serie.' },
    weight: 43.5, payload: 30, speed: 5, endurance: 6, enduranceLabel: { en: '6 h / ~25.5 km', de: '6 h / ~25,5 km' }, obstacle: 30, ip: 'IP66',
    needs: ['stairs', 'fast', 'long', 'light'],
  },
  {
    slug: 'm40ws', name: 'M40WS', series: 'm40', drive: 'wl',
    image: `${CDN}/513e3bc6f7edf7d82e95c2b9b9b5752a72c66f90-1083x920.png`,
    tag: { en: 'Wheel-legged M40 for narrow spaces, stairs and multi-level sites.', de: 'Rad-Bein-M40 für enge Räume, Treppen und mehrstöckige Anlagen.' },
    weight: 42, payload: 40, speed: 5, endurance: 6, enduranceLabel: { en: '6 h / ~25 km', de: '6 h / ~25 km' }, obstacle: 30, ip: 'IP66',
    needs: ['stairs', 'fast', 'long', 'light'],
  },
  {
    slug: 'm100', name: 'M100', series: 'm100', drive: 'walk',
    image: `${CDN}/ac9dd07d42712e2c0eb2f97bae7676a3bc281ef2-1162x1051.png`,
    tag: { en: 'Heavy-duty walking robot: 50 kg payload, IP67, long outdoor shifts.', de: 'Schwerlast-Laufroboter: 50 kg Nutzlast, IP67, lange Einsätze im Freien.' },
    weight: 68, payload: 50, speed: 3, endurance: 5.5, enduranceLabel: { en: '5.5 h / ~20 km', de: '5,5 h / ~20 km' }, obstacle: 30, ip: 'IP67',
    needs: ['stairs', 'ip67', 'heavy'],
  },
  {
    slug: 'm100w', name: 'M100W', series: 'm100', drive: 'wl',
    image: `${CDN}/3599ad8632cba34cba26ac8d29033ffea2d7f107-1138x1048.png`,
    tag: { en: 'Heavy-duty wheel-legged platform: 50 kg payload, up to 6 h, 40 cm obstacles.', de: 'Schwerlast auf Rädern und Beinen: 50 kg Nutzlast, bis 6 h, 40 cm Hindernisse.' },
    weight: 79, payload: 50, speed: 3, endurance: 6, enduranceLabel: { en: '6 h / ~25 km', de: '6 h / ~25 km' }, obstacle: 40, ip: 'IP67',
    needs: ['stairs', 'ip67', 'heavy', 'long'],
  },
  {
    slug: 'm100ws', name: 'M100WS', series: 'm100', drive: 'wl',
    image: `${CDN}/b1e3d4ff745bedcf98522d7ce4538c89732be01e-1640x1500.png`,
    tag: { en: 'The carrier: 100 kg payload while moving, the longest runtime in the range.', de: 'Der Träger: 100 kg Nutzlast in Fahrt, die längste Laufzeit im Programm.' },
    weight: 79, payload: 100, speed: 3, endurance: 7.5, enduranceLabel: { en: '7.5 h / 35 km', de: '7,5 h / 35 km' }, obstacle: 30, ip: 'IP67',
    needs: ['ip67', 'heavy', 'long'],
  },
]

export const NEED_KEYS: NeedKey[] = ['stairs', 'ip67', 'fast', 'long', 'heavy', 'light', 'lights', 'auto', 'voice', 'surround']

const content = {
  meta: {
    title: {
      en: 'Security robots for patrol and site protection | MegaRobotics',
      de: 'Sicherheitsroboter für Streife und Objektschutz | MegaRobotics',
    },
    description: {
      en: 'Quadruped and wheel-legged robots for night patrols, substations, plants and perimeters. Nine M-series models, robot finder, comparison and integration in DACH.',
      de: 'Lauf- und Rad-Bein-Roboter für Nachtstreifen, Umspannwerke, Anlagen und Perimeter. Neun Modelle der M-Serie, Roboter-Finder, Vergleich und Integration in DACH.',
    },
    serviceName: { en: 'Security and site protection with the M series', de: 'Sicherheit und Objektschutz mit der M-Serie' },
    crumbSolutions: { en: 'Solutions', de: 'Lösungen' },
    crumb: { en: 'Security', de: 'Sicherheit' },
  },

  hero: {
    carousel: { en: 'M series on security rounds', de: 'M-Serie auf dem Sicherheitsrundgang' },
    chooseSlide: { en: 'Choose scene', de: 'Szene wählen' },
    useCases: { en: 'Use cases', de: 'Einsatzfälle' },
    pause: { en: 'Pause video', de: 'Video anhalten' },
    play: { en: 'Play video', de: 'Video abspielen' },
    ctaPrimary: { en: 'Plan your patrol', de: 'Streife planen' },
    ctaSecondary: { en: 'Find your robot', de: 'Roboter finden' },
  },

  intro: {
    eyebrow: { en: 'Solutions · Security & site protection', de: 'Lösungen · Sicherheit & Objektschutz' },
    title: { en: 'Security robots that walk the round for you', de: 'Sicherheitsroboter, die den Rundgang für Sie gehen' },
    lead: {
      en: 'Nine quadruped and wheel-legged robots in three series for night patrols, critical infrastructure and large sites. They take the routine round. Your people take the decisions.',
      de: 'Neun Lauf- und Rad-Bein-Roboter in drei Serien für Nachtstreifen, kritische Infrastruktur und große Gelände. Sie übernehmen den Routinerundgang. Ihre Leute treffen die Entscheidungen.',
    },
    body: {
      en: 'MegaRobotics supplies, integrates and services the M series in Germany, Austria and Switzerland. We pick the robot and the sensors for your route, connect them to your control room and stay your contact after go-live.',
      de: 'MegaRobotics liefert, integriert und betreut die M-Serie in Deutschland, Österreich und der Schweiz. Wir wählen Roboter und Sensorik für Ihre Route, binden beides an Ihre Leitstelle an und bleiben nach dem Start Ihr Ansprechpartner.',
    },
    status: { en: 'Supply · integration · service in DACH', de: 'Lieferung · Integration · Service in DACH' },
    image: `${IMG}/app-legged-multisensor.webp`,
    imageAlt: {
      en: 'Quadruped robot with an enclosed PTZ camera, sensor modules and antenna on its top deck',
      de: 'Vierbeiniger Roboter mit gekapselter PTZ-Kamera, Sensormodulen und Antenne auf dem Oberdeck',
    },
    imageCaption: { en: 'Example configuration · manufacturer render', de: 'Beispielkonfiguration · Hersteller-Rendering' },
  },

  why: {
    eyebrow: { en: 'Why robots on the round', de: 'Warum Roboter auf den Rundgang' },
    title: {
      en: 'The round has to happen every night. It doesn’t have to be a person every time.',
      de: 'Der Rundgang muss jede Nacht stattfinden. Er muss nicht jedes Mal ein Mensch sein.',
    },
    items: [
      {
        n: '01',
        title: { en: 'Same route, every shift', de: 'Gleiche Route, jede Schicht' },
        body: {
          en: 'With navigation the robot follows the same route and stops at the same checkpoints each time. What changed since yesterday stands out, because the baseline stays put.',
          de: 'Mit Navigation folgt der Roboter jedes Mal derselben Route und hält an denselben Kontrollpunkten. Was sich seit gestern verändert hat, fällt auf, weil die Basis gleich bleibt.',
        },
      },
      {
        n: '02',
        title: { en: 'Where nobody wants to be at 3 a.m.', de: 'Wo um 3 Uhr niemand sein will' },
        body: {
          en: 'Rain, cold, dust, cable tunnels and roofs. IP66 or IP67 and an operating range of −20 to +55 °C on every model.',
          de: 'Regen, Kälte, Staub, Kabeltunnel und Dächer. IP66 oder IP67 und −20 bis +55 °C Betriebstemperatur bei jedem Modell.',
        },
      },
      {
        n: '03',
        title: { en: 'Stairs, grating, gravel', de: 'Treppen, Gitterroste, Schotter' },
        body: {
          en: 'Legs climb stairs and cross grating, kerbs and rubble that stop wheeled robots. The wheel-legged models add speed on the flat stretches.',
          de: 'Beine steigen Treppen und überwinden Gitterroste, Bordsteine und Schutt, an denen Radroboter scheitern. Die Rad-Bein-Modelle bringen auf ebenen Abschnitten Tempo dazu.',
        },
      },
      {
        n: '04',
        title: { en: 'People where they matter', de: 'Menschen dort, wo sie zählen' },
        body: {
          en: 'Guards and technicians react to what the robot finds instead of walking the route themselves. The robot reports, people decide.',
          de: 'Sicherheitskräfte und Techniker reagieren auf das, was der Roboter findet, statt die Route selbst abzulaufen. Der Roboter meldet, Menschen entscheiden.',
        },
      },
    ],
  },

  round: {
    eyebrow: { en: 'On the round', de: 'Auf dem Rundgang' },
    title: { en: 'What a security robot does between two checkpoints', de: 'Was ein Sicherheitsroboter zwischen zwei Kontrollpunkten tut' },
    subtitle: {
      en: 'Six jobs, and on which models you get them. “Per project” means we select, integrate and quote it for your site.',
      de: 'Sechs Aufgaben und auf welchen Modellen es sie gibt. „Je Projekt“ heißt: Wir wählen es für Ihren Standort aus, integrieren es und nennen es im Angebot.',
    },
    availableLabel: { en: 'Available', de: 'Verfügbar' },
    items: [
      {
        icon: 'Route',
        title: { en: 'Waypoint patrol', de: 'Wegpunkt-Streife' },
        body: {
          en: 'The route is mapped once. After that the robot drives it on schedule, stops at each checkpoint and avoids obstacles on the way.',
          de: 'Die Route wird einmal kartiert. Danach fährt der Roboter sie nach Zeitplan ab, hält an jedem Kontrollpunkt und weicht Hindernissen aus.',
        },
        available: {
          en: 'Standard on M1 Pro and M1 Ultra. M1, M40 and M100 series with the navigation or Pro package; on M100 and M100W autonomous navigation is at demo stage.',
          de: 'Serie bei M1 Pro und M1 Ultra. M1-, M40- und M100-Serie mit Navigations- bzw. Pro-Paket; bei M100 und M100W ist die autonome Navigation im Demo-Stadium.',
        },
      },
      {
        icon: 'Moon',
        title: { en: 'Eyes in the dark', de: 'Augen in der Nacht' },
        body: {
          en: 'Fill lights for night and indoor work, a dual-light PTZ head that combines a zoom camera with thermal imaging, and on the M1 Ultra a 720° view around the robot.',
          de: 'Zusatzleuchten für Nacht- und Innenbereiche, ein Dual-Light-PTZ-Kopf, der Zoomkamera und Wärmebild kombiniert, und beim M1 Ultra 720° Sicht rund um den Roboter.',
        },
        available: {
          en: 'Four fill lights on every M1. Dual-light PTZ on all series, per project. 720° on the M1 Ultra.',
          de: 'Vier Zusatzleuchten bei jedem M1. Dual-Light-PTZ für alle Serien, je Projekt. 720° beim M1 Ultra.',
        },
      },
      {
        icon: 'Megaphone',
        title: { en: 'Talk to people on site', de: 'Mit Personen vor Ort sprechen' },
        body: {
          en: 'The control room speaks through the robot: ask a visitor for their badge, send a recorded message, switch on a warning light.',
          de: 'Die Leitstelle spricht über den Roboter: einen Besucher nach dem Ausweis fragen, eine Durchsage abspielen, eine Warnleuchte einschalten.',
        },
        available: {
          en: 'Intercom and broadcast standard on M1 Pro and M1 Ultra. Warning light and PA speaker per project.',
          de: 'Gegensprechen und Durchsage serienmäßig bei M1 Pro und M1 Ultra. Warnleuchte und Lautsprecher je Projekt.',
        },
      },
      {
        icon: 'MonitorPlay',
        title: { en: 'Look first, then send people', de: 'Erst hinsehen, dann Leute schicken' },
        body: {
          en: 'When an alarm goes off, the robot gets there first and streams live video. An operator can take over remotely and decide whether a guard has to go out.',
          de: 'Löst ein Alarm aus, ist der Roboter zuerst vor Ort und überträgt Live-Video. Ein Bediener kann ihn aus der Ferne steuern und entscheidet, ob jemand rausfahren muss.',
        },
        available: {
          en: 'All series, per project. Link chosen per site: mesh radio, 4G or 5G.',
          de: 'Alle Serien, je Projekt. Verbindung je Standort: Mesh-Funk, 4G oder 5G.',
        },
      },
      {
        icon: 'ScanEye',
        title: { en: 'Detect what matters', de: 'Erkennen, worauf es ankommt' },
        body: {
          en: 'With an AI module the robot can flag people, vehicles, unusual behaviour, smoke and fire on its round. We test the detection on your site before you rely on it.',
          de: 'Mit KI-Modul kann der Roboter auf dem Rundgang Personen, Fahrzeuge, auffälliges Verhalten, Rauch und Feuer melden. Wir testen die Erkennung an Ihrem Standort, bevor Sie sich darauf verlassen.',
        },
        available: {
          en: 'M1 series with AI module, per project. Other series on request.',
          de: 'M1-Serie mit KI-Modul, je Projekt. Andere Serien auf Anfrage.',
        },
      },
      {
        icon: 'BatteryCharging',
        title: { en: 'Around the clock', de: 'Rund um die Uhr' },
        body: {
          en: 'A charging station with autonomous return lets the robot top up between rounds. Swappable batteries cover the shifts in between.',
          de: 'Eine Ladestation mit autonomer Rückkehr lässt den Roboter zwischen den Runden nachladen. Wechselakkus überbrücken die Schichten dazwischen.',
        },
        available: {
          en: 'Autonomous charging as an option on all series. M1: 1,010 Wh hot-swap batteries, charged in under 2 h.',
          de: 'Autonomes Laden als Option für alle Serien. M1: 1.010-Wh-Wechselakkus, in unter 2 h geladen.',
        },
      },
    ],
  },

  band: {
    eyebrow: { en: 'M40 series · real footage', de: 'M40-Serie · Realaufnahmen' },
    title: { en: 'Gravel, stairs, a 45° slope. Same robot, same night.', de: 'Schotter, Treppe, 45° Steigung. Gleicher Roboter, gleiche Nacht.' },
    body: {
      en: 'Legs are the reason a security robot can follow the route a guard would take, not just the paved part of it.',
      de: 'Beine sind der Grund, warum ein Sicherheitsroboter die Route gehen kann, die auch eine Wachperson nimmt, und nicht nur den asphaltierten Teil davon.',
    },
    video: 'terrain-stairs',
  },

  cases: {
    eyebrow: { en: 'Use cases', de: 'Einsatzfälle' },
    title: { en: 'Where the M series works in security', de: 'Wo die M-Serie in der Sicherheit arbeitet' },
    subtitle: {
      en: 'Typical jobs and the models we would start with. Click a model to open its data sheet.',
      de: 'Typische Aufgaben und die Modelle, mit denen wir anfangen würden. Ein Klick auf ein Modell öffnet das Datenblatt.',
    },
    items: [
      {
        title: { en: 'Night patrol on industrial sites', de: 'Nachtstreife auf Industriegeländen' },
        body: {
          en: 'Fixed routes after hours, along buildings, gates and fence lines, in industrial parks, warehouses and data centres. Navigation, voice and fill lights come built in on the M1 Pro.',
          de: 'Feste Routen nach Feierabend, entlang von Gebäuden, Toren und Zäunen, in Industrieparks, Lagern und Rechenzentren. Navigation, Sprechfunktion und Zusatzleuchten bringt der M1 Pro ab Werk mit.',
        },
        models: ['m1-pro', 'm1-ultra', 'm40w', 'm100w'],
        image: `${IMG}/m1-patrol.jpg`,
        caption: { en: 'M1 · manufacturer photo', de: 'M1 · Herstellerfoto' },
        fit: 'cover',
      },
      {
        title: { en: 'Substations and power utilities', de: 'Umspannwerke und Energieversorgung' },
        body: {
          en: 'Rounds through switch rooms, cable tunnels and gravel yards, with thermal checks on transformers and switchgear and a watch on the fence at the same time.',
          de: 'Rundgänge durch Schalträume, Kabeltunnel und Schotterflächen, mit Wärmebildkontrolle an Trafos und Schaltanlagen und dem Zaun gleich mit im Blick.',
        },
        models: ['m40', 'm100', 'm100w'],
        image: `${IMG}/substation-visualisation.jpg`,
        caption: { en: 'AI-generated visualisation', de: 'KI-generierte Visualisierung' },
        fit: 'cover',
      },
      {
        title: { en: 'Plants, pipe racks and tank farms', de: 'Anlagen, Rohrbrücken und Tanklager' },
        body: {
          en: 'Stairs, grating and multi-level walkways in process areas outside classified Ex zones. One round covers security and the first look at the plant.',
          de: 'Treppen, Gitterroste und mehrstöckige Laufwege in Prozessbereichen außerhalb eingestufter Ex-Zonen. Ein Rundgang deckt Sicherheit und den ersten Blick auf die Anlage ab.',
        },
        models: ['m40', 'm40ws', 'm100w'],
        image: `${IMG}/plant-visualisation.jpg`,
        caption: { en: 'AI-generated visualisation', de: 'KI-generierte Visualisierung' },
        fit: 'cover',
      },
      {
        title: { en: 'Perimeter and large sites', de: 'Perimeter und große Gelände' },
        body: {
          en: 'Long distances on mixed ground: logistics yards, campuses, solar parks. Wheels carry the robot along the fence, legs take the ditch and the kerb.',
          de: 'Lange Strecken auf wechselndem Untergrund: Logistikhöfe, Campus, Solarparks. Räder tragen den Roboter am Zaun entlang, Beine nehmen Graben und Bordstein.',
        },
        models: ['m100ws', 'm1', 'm40ws'],
        image: `${IMG}/m1-terrain.jpg`,
        caption: { en: 'M1 · manufacturer photo', de: 'M1 · Herstellerfoto' },
        fit: 'cover',
      },
      {
        title: { en: 'Tunnels and underground infrastructure', de: 'Tunnel und unterirdische Infrastruktur' },
        body: {
          en: 'Pipe galleries, utility tunnels and car parks: wet, dusty and dark. M40 and M100 wade through 30 cm of water; the M100 series is IP67.',
          de: 'Rohrkanäle, Versorgungstunnel und Tiefgaragen: nass, staubig und dunkel. M40 und M100 haben 30 cm Wattiefe; die M100-Serie ist IP67.',
        },
        models: ['m40', 'm100', 'm100w'],
        image: `${IMG}/m1-water.jpg`,
        caption: { en: 'M1 in water · manufacturer photo', de: 'M1 im Wasser · Herstellerfoto' },
        fit: 'cover',
      },
      {
        title: { en: 'Incident reconnaissance', de: 'Erkundung bei Ereignissen' },
        body: {
          en: 'Send the robot in first: a live picture, a thermal view and, with the right sensors, a gas reading before anyone enters. Not for explosive atmospheres.',
          de: 'Den Roboter zuerst hineinschicken: Livebild, Wärmebild und mit passender Sensorik ein Gaswert, bevor jemand den Bereich betritt. Nicht für explosionsfähige Atmosphären.',
        },
        models: ['m100', 'm100ws'],
        image: `${IMG}/app-legged-ptz-antennas.webp`,
        caption: { en: 'Example configuration · manufacturer render', de: 'Beispielkonfiguration · Hersteller-Rendering' },
        fit: 'contain',
      },
    ],
  },

  series: {
    eyebrow: { en: 'The M series', de: 'Die M-Serie' },
    title: { en: 'Three series. One idea: go where wheels can’t.', de: 'Drei Serien. Eine Idee: dorthin, wo Räder nicht hinkommen.' },
    subtitle: {
      en: 'Each series comes as a walking robot or with wheels on its feet. Pick by weight class and payload, then by how much autonomy you want built in.',
      de: 'Jede Serie gibt es als Laufroboter oder mit Rädern an den Füßen. Wählen Sie nach Gewichtsklasse und Nutzlast, dann nach dem Grad an Autonomie ab Werk.',
    },
    items: [
      {
        key: 'm1',
        kicker: { en: 'Fast wheel-legged patrol', de: 'Schnelle Rad-Bein-Streife' },
        name: { en: 'M1 series', de: 'M1-Serie' },
        image: `${CDN}/d28948390f9d22967e998fbdde44a58267ce4128-579x471.png`,
        points: [
          { en: 'M1 · M1 Pro · M1 Ultra', de: 'M1 · M1 Pro · M1 Ultra' },
          { en: '41 kg, 6 m/s, IP67', de: '41 kg, 6 m/s, IP67' },
          { en: 'Up to 29 km on hot-swap batteries', de: 'Bis zu 29 km mit Wechselakkus' },
          { en: 'Navigation, follow mode and voice from the M1 Pro', de: 'Navigation, Folgemodus und Sprechanlage ab M1 Pro' },
        ],
        href: '/products/m1-pro',
      },
      {
        key: 'm40',
        kicker: { en: 'Compact and light', de: 'Kompakt und leicht' },
        name: { en: 'M40 series', de: 'M40-Serie' },
        image: `${CDN}/0a58d94c196edd7f27e9e47b257450d852775f19-1008x962.png`,
        points: [
          { en: 'M40 · M40W · M40WS', de: 'M40 · M40W · M40WS' },
          { en: '36 to 43.5 kg, up to 5 m/s, IP66', de: '36 bis 43,5 kg, bis 5 m/s, IP66' },
          { en: 'Stairs with 20 cm steps on all three models', de: 'Treppen mit 20 cm Stufen bei allen drei Modellen' },
          { en: 'Pro package for SLAM and navigation', de: 'Pro-Paket für SLAM und Navigation' },
        ],
        href: '/products/m40w',
      },
      {
        key: 'm100',
        kicker: { en: 'Heavy duty', de: 'Schwerlast' },
        name: { en: 'M100 series', de: 'M100-Serie' },
        image: `${CDN}/b1e3d4ff745bedcf98522d7ce4538c89732be01e-1640x1500.png`,
        points: [
          { en: 'M100 · M100W · M100WS', de: 'M100 · M100W · M100WS' },
          { en: '50 to 100 kg continuous payload, IP67', de: '50 bis 100 kg Dauernutzlast, IP67' },
          { en: '2,081 Wh battery, up to 7.5 h', de: '2.081-Wh-Akku, bis zu 7,5 h' },
          { en: 'Carrier for masts and heavy sensor kits', de: 'Träger für Masten und schwere Sensorik' },
        ],
        href: '/products/m100ws',
      },
    ],
    more: { en: 'Data sheet', de: 'Datenblatt' },
    rendering: { en: 'Rendering', de: 'Rendering' },
  },

  explorer: {
    eyebrow: { en: 'Interactive', de: 'Interaktiv' },
    title: { en: 'Which robot fits your round?', de: 'Welcher Roboter passt zu Ihrem Rundgang?' },
    subtitle: {
      en: 'Tick what your site needs. The models that meet every point stay lit.',
      de: 'Wählen Sie, was Ihr Standort braucht. Die Modelle, die alle Punkte erfüllen, bleiben hervorgehoben.',
    },
    reset: { en: 'Reset', de: 'Zurücksetzen' },
    countAll: { en: 'All 9 models shown. Pick your requirements.', de: 'Alle 9 Modelle. Wählen Sie Ihre Anforderungen.' },
    countSome: { en: '{n} of 9 models meet every requirement', de: '{n} von 9 Modellen erfüllen alle Anforderungen' },
    empty: {
      en: 'No single model covers all of these. That is common, and often two robots share the job. Talk to us and we’ll work it out with you.',
      de: 'Kein einzelnes Modell deckt alles ab. Das ist häufig so, oft teilen sich zwei Roboter die Aufgabe. Sprechen Sie uns an, wir finden die Lösung gemeinsam.',
    },
    needs: {
      stairs: { en: 'Climbs stairs', de: 'Steigt Treppen' },
      ip67: { en: 'IP67 sealing', de: 'Schutzart IP67' },
      fast: { en: 'Fast: 5 m/s or more', de: 'Schnell: ab 5 m/s' },
      long: { en: 'Long routes: 25 km or more', de: 'Lange Routen: ab 25 km' },
      heavy: { en: 'Payload of 50 kg or more', de: 'Nutzlast ab 50 kg' },
      light: { en: 'Light: under 45 kg', de: 'Leicht: unter 45 kg' },
      lights: { en: 'Lights built in', de: 'Leuchten ab Werk' },
      auto: { en: 'Navigation built in', de: 'Navigation ab Werk' },
      voice: { en: 'Talks to people on site', de: 'Spricht mit Personen vor Ort' },
      surround: { en: '720° surround view', de: '720°-Rundumsicht' },
    },
    drive: {
      walk: { en: 'Walking', de: 'Laufend' },
      wl: { en: 'Wheel-legged', de: 'Rad-Bein' },
    },
    open: { en: 'Data sheet', de: 'Datenblatt' },
    compareTitle: { en: 'All nine models side by side', de: 'Alle neun Modelle im Vergleich' },
    compareLead: {
      en: 'Click a column to sort. Click a model to open its data sheet.',
      de: 'Klick auf eine Spalte sortiert. Klick auf ein Modell öffnet das Datenblatt.',
    },
    cols: {
      model: { en: 'Model', de: 'Modell' },
      drive: { en: 'Drive', de: 'Antrieb' },
      weight: { en: 'Weight', de: 'Gewicht' },
      payload: { en: 'Payload', de: 'Nutzlast' },
      speed: { en: 'Speed', de: 'Tempo' },
      endurance: { en: 'Endurance, unloaded', de: 'Laufzeit ohne Last' },
      obstacle: { en: 'Obstacle', de: 'Hindernis' },
      ip: { en: 'Protection', de: 'Schutzart' },
    },
    sortBy: { en: 'Sort by', de: 'Sortieren nach' },
    foot: {
      en: 'Maximum values, base configuration, as of 11/2026. Speeds are not stated under load. M100 and M100W: 0–3 m/s, 5 m/s sprint in the lab, unloaded. M1 payload while walking, endurance measured at 1 m/s. M100WS payload while moving; obstacle = step height. M40W dimensions on request. *M40: specification table value; the manufacturer’s model summary states up to 5 h, to be confirmed.',
      de: 'Maximalwerte, Grundkonfiguration, Stand 11/2026. Geschwindigkeiten ohne Angabe unter Last. M100 und M100W: 0–3 m/s, 5 m/s Sprint im Labor ohne Last. M1: Nutzlast beim Laufen, Laufzeit gemessen bei 1 m/s. M100WS: Nutzlast in Fahrt; Hindernis = Stufenhöhe. M40W: Abmessungen auf Anfrage. *M40: Wert laut Spezifikationstabelle; die Modellübersicht des Herstellers nennt bis zu 5 h, noch zu bestätigen.',
    },
  },

  payloads: {
    eyebrow: { en: 'Sensors and payloads', de: 'Sensorik und Nutzlasten' },
    title: { en: 'The robot is the carrier. The sensors do the security work.', de: 'Der Roboter ist der Träger. Die Sensorik macht die Sicherheitsarbeit.' },
    subtitle: {
      en: 'We select the payload for what your round has to detect, mount it and connect it. It is not part of the standard scope of supply, so the quotation lists exactly what you get.',
      de: 'Wir wählen die Nutzlast danach, was Ihr Rundgang erkennen muss, montieren und binden sie an. Sie gehört nicht zum Standard-Lieferumfang, das Angebot nennt also genau, was Sie bekommen.',
    },
    items: [
      { title: { en: 'Dual-light PTZ head', de: 'Dual-Light-PTZ-Kopf' }, body: { en: 'Zoom camera and thermal imager on one pan-tilt head, for fence lines and dark corners.', de: 'Zoomkamera und Wärmebild auf einem Schwenk-Neige-Kopf, für Zaunlinien und dunkle Ecken.' } },
      { title: { en: 'Radiometric thermal camera', de: 'Radiometrische Wärmebildkamera' }, body: { en: 'Temperature readings at checkpoints: transformers, cabinets, bearings, hot spots.', de: 'Temperaturwerte an Kontrollpunkten: Trafos, Schaltschränke, Lager, Hotspots.' } },
      { title: { en: 'Multi-gas module', de: 'Multigas-Modul' }, body: { en: 'Gas readings along the route and before people enter a room.', de: 'Gaswerte entlang der Route und bevor Personen einen Raum betreten.' } },
      { title: { en: 'Acoustic camera', de: 'Akustikkamera' }, body: { en: 'Locates leaks and electrical discharge by sound.', de: 'Ortet Leckagen und elektrische Entladungen über das Geräusch.' } },
      { title: { en: 'Warning light and PA speaker', de: 'Warnleuchte und Lautsprecher' }, body: { en: 'Visible presence at night and announcements from the control room.', de: 'Sichtbare Präsenz bei Nacht und Durchsagen aus der Leitstelle.' } },
      { title: { en: 'RTK, 4G/5G or mesh radio', de: 'RTK, 4G/5G oder Mesh-Funk' }, body: { en: 'Precise positioning outdoors and a stable link wherever the route goes.', de: 'Genaue Position im Freien und eine stabile Verbindung, wo immer die Route hinführt.' } },
    ],
    gallery: [
      {
        src: `${IMG}/app-real-ptz-detail.jpg`,
        bg: 'photo',
        alt: { en: 'Real unit with a caged PTZ camera, sensor box and LiDAR on the deck', de: 'Reales Gerät mit PTZ-Kamera im Schutzkorb, Sensorbox und LiDAR auf dem Deck' },
        caption: { en: 'Real unit: PTZ head and LiDAR · photo', de: 'Reales Gerät: PTZ-Kopf und LiDAR · Foto' },
      },
      {
        src: `${IMG}/app-legged-ptz-1.webp`,
        bg: 'white',
        alt: { en: 'Quadruped robot with a caged PTZ camera and LiDAR on its top deck', de: 'Vierbeiner mit PTZ-Kamera im Schutzkorb und LiDAR auf dem Oberdeck' },
        caption: { en: 'PTZ camera and LiDAR · render', de: 'PTZ-Kamera und LiDAR · Rendering' },
      },
      {
        src: `${IMG}/app-wheel-legged-payload.jpg`,
        bg: 'photo',
        alt: { en: 'Wheel-legged robot with a sensor head and roll bar on its back', de: 'Rad-Bein-Roboter mit Sensorkopf und Schutzbügel auf dem Rücken' },
        caption: { en: 'Wheel-legged with sensor head · render', de: 'Rad-Bein mit Sensorkopf · Rendering' },
      },
      {
        src: `${IMG}/app-legged-ptz-antennas.webp`,
        bg: 'white',
        alt: { en: 'Red and white quadruped with PTZ camera and two long antennas', de: 'Rot-weißer Vierbeiner mit PTZ-Kamera und zwei langen Antennen' },
        caption: { en: 'PTZ and long-range antennas · render', de: 'PTZ und Antennen für Reichweite · Rendering' },
      },
      {
        src: `${IMG}/app-wheel-legged-top.jpg`,
        bg: 'photo',
        alt: { en: 'Wheel-legged robot seen from above with a pan-tilt camera and payload boxes', de: 'Rad-Bein-Roboter von oben mit Schwenk-Neige-Kamera und Nutzlastmodulen' },
        caption: { en: 'Payload deck from above · render', de: 'Nutzlastdeck von oben · Rendering' },
      },
      {
        src: `${IMG}/app-legged-ptz-2.webp`,
        bg: 'white',
        alt: { en: 'Quadruped robot with a caged PTZ camera, side view', de: 'Vierbeiner mit PTZ-Kamera im Schutzkorb, Seitenansicht' },
        caption: { en: 'PTZ head, side view · render', de: 'PTZ-Kopf, Seitenansicht · Rendering' },
      },
    ],
    galleryLabels: {
      open: { en: 'Enlarge image', de: 'Bild vergrößern' },
      close: { en: 'Close', de: 'Schließen' },
      prev: { en: 'Previous image', de: 'Vorheriges Bild' },
      next: { en: 'Next image', de: 'Nächstes Bild' },
    },
    galleryNote: {
      en: 'Example configurations: manufacturer renders and one photo of a real unit. Payloads shown are not included in the standard scope of supply. Click an image to enlarge it.',
      de: 'Beispielkonfigurationen: Hersteller-Renderings und ein Foto eines realen Geräts. Gezeigte Nutzlasten gehören nicht zum Standard-Lieferumfang. Ein Klick vergrößert das Bild.',
    },
  },

  operate: {
    eyebrow: { en: 'Integration and operation', de: 'Integration und Betrieb' },
    title: { en: 'Three ways to run security robots', de: 'Drei Wege, Sicherheitsroboter zu betreiben' },
    items: [
      {
        icon: 'MonitorCog',
        title: { en: 'From your control room', de: 'Aus Ihrer Leitstelle' },
        body: {
          en: 'Findings, images and live video go to the operators you already have. We connect the robot to your systems via SDK and ROS 2; the scope is fixed in the quotation.',
          de: 'Meldungen, Bilder und Live-Video gehen an die Leitstelle, die Sie schon haben. Wir binden den Roboter über SDK und ROS 2 an Ihre Systeme an; der Umfang steht im Angebot.',
        },
      },
      {
        icon: 'Users',
        title: { en: 'Alongside guards on site', de: 'Neben der Wache vor Ort' },
        body: {
          en: 'The robot takes the routine rounds, the far corners and the night hours. Guards get a finding with location and image and go where they are actually needed.',
          de: 'Der Roboter übernimmt die Routinerunden, die entlegenen Ecken und die Nachtstunden. Die Wache bekommt eine Meldung mit Ort und Bild und geht dorthin, wo sie wirklich gebraucht wird.',
        },
      },
      {
        icon: 'Building2',
        title: { en: 'Through a security service provider', de: 'Über einen Sicherheitsdienstleister' },
        body: {
          en: 'Guarding companies can run the robots as part of their contract across several sites. We supply, integrate and service, the provider operates.',
          de: 'Bewachungsunternehmen können die Roboter als Teil ihres Auftrags über mehrere Standorte betreiben. Wir liefern, integrieren und betreuen, der Dienstleister betreibt.',
        },
      },
    ],
  },

  before: {
    eyebrow: { en: 'Before you deploy', de: 'Vor dem Einsatz' },
    title: { en: 'Six things to settle before the first round', de: 'Sechs Punkte, die vor der ersten Runde geklärt sein sollten' },
    items: [
      {
        title: { en: 'Data protection', de: 'Datenschutz' },
        body: {
          en: 'A camera robot records people. What is recorded, where it is stored and for how long is decided with your data protection officer before go-live.',
          de: 'Ein Kameraroboter erfasst Personen. Was aufgezeichnet wird, wo es liegt und wie lange, klären Sie vor dem Start mit dem Datenschutzbeauftragten Ihres Hauses.',
        },
      },
      {
        title: { en: 'Works council', de: 'Betriebsrat' },
        body: {
          en: 'Where the robot can see employees, the works council usually has a say. Involve it early; it saves weeks later.',
          de: 'Wo der Roboter Beschäftigte sehen kann, hat der Betriebsrat in der Regel mitzureden. Früh einbinden spart später Wochen.',
        },
      },
      {
        title: { en: 'Safety around people', de: 'Sicherheit im Umfeld von Personen' },
        body: {
          en: 'Routes through shared areas need a risk assessment: speed, distances, crossing points. We plan it with your safety officer.',
          de: 'Routen durch gemeinsam genutzte Bereiche brauchen eine Gefährdungsbeurteilung: Tempo, Abstände, Kreuzungspunkte. Wir planen sie mit Ihrer Fachkraft für Arbeitssicherheit.',
        },
      },
      {
        title: { en: 'CE conformity', de: 'CE-Konformität' },
        body: {
          en: 'CE conformity for the M series is in preparation. We tell you the status for your model when we quote.',
          de: 'Die CE-Konformität der M-Serie ist in Vorbereitung. Den Stand für Ihr Modell nennen wir mit dem Angebot.',
        },
      },
      {
        title: { en: 'No Ex protection', de: 'Kein Ex-Schutz' },
        body: {
          en: 'No M-series model is explosion-protected. Routes must stay outside classified Ex zones.',
          de: 'Kein Modell der M-Serie ist explosionsgeschützt. Routen müssen außerhalb eingestufter Ex-Zonen bleiben.',
        },
      },
      {
        title: { en: 'Detect and report, not intervene', de: 'Erkennen und melden, nicht eingreifen' },
        body: {
          en: 'The robot sees, speaks and alerts. It does not stop anyone or open anything. Plan who responds to what it reports.',
          de: 'Der Roboter sieht, spricht und alarmiert. Er hält niemanden auf und öffnet nichts. Planen Sie, wer auf seine Meldungen reagiert.',
        },
      },
    ],
  },

  steps: {
    eyebrow: { en: 'How we deliver', de: 'So liefern wir' },
    title: { en: 'From your site plan to a robot on the round', de: 'Vom Lageplan zum Roboter auf dem Rundgang' },
    subtitle: {
      en: 'One contact from the first walk-through to service, in Germany, Austria and Switzerland.',
      de: 'Ein Ansprechpartner von der ersten Begehung bis zum Service, in Deutschland, Österreich und der Schweiz.',
    },
    items: [
      { title: { en: 'Site walk-through', de: 'Begehung' }, body: { en: 'Route, ground, checkpoints and what the robot has to detect.', de: 'Route, Untergrund, Kontrollpunkte und was der Roboter erkennen muss.' } },
      { title: { en: 'Robot and payload', de: 'Roboter und Sensorik' }, body: { en: 'Model, drive and sensors, and a plain answer if a simpler solution does the job.', de: 'Modell, Antrieb und Sensorik, und eine ehrliche Antwort, wenn eine einfachere Lösung reicht.' } },
      { title: { en: 'Integration', de: 'Integration' }, body: { en: 'Sensors, software and the link to your systems, scope fixed in the quotation.', de: 'Sensorik, Software und Anbindung an Ihre Systeme, Umfang im Angebot festgelegt.' } },
      { title: { en: 'Pilot on the real route', de: 'Pilot auf der echten Route' }, body: { en: 'Mapping, checkpoints and a trial run on your site before acceptance. Your team is trained on site.', de: 'Kartierung, Kontrollpunkte und Probelauf an Ihrem Standort vor der Abnahme. Ihr Team wird vor Ort geschult.' } },
      { title: { en: 'Service', de: 'Service' }, body: { en: 'Support, maintenance and repairs handled from Germany.', de: 'Betreuung, Wartung und Reparatur aus Deutschland.' } },
    ],
  },

  faq: {
    eyebrow: { en: 'Questions', de: 'Fragen' },
    title: { en: 'Security robots: frequent questions', de: 'Sicherheitsroboter: häufige Fragen' },
    items: [
      {
        q: { en: 'Can a security robot replace a guard?', de: 'Kann ein Sicherheitsroboter eine Wachperson ersetzen?' },
        a: {
          en: 'It replaces the routine round, not the judgement. The robot walks the route, documents and reports; people decide what happens next and intervene where needed.',
          de: 'Er ersetzt den Routinerundgang, nicht das Urteilsvermögen. Der Roboter läuft die Route, dokumentiert und meldet; Menschen entscheiden, was als Nächstes passiert, und greifen ein, wo es nötig ist.',
        },
      },
      {
        q: { en: 'Which model should we start with for night patrols?', de: 'Mit welchem Modell fangen wir bei Nachtstreifen an?' },
        a: {
          en: 'Usually the M1 Pro, because navigation, two-way voice and fill lights come built in. For longer routes with stairs the M40W with the Pro package, and for heavy sensor kits the M100W.',
          de: 'Meist mit dem M1 Pro, weil Navigation, Sprechfunktion und Zusatzleuchten ab Werk dabei sind. Für längere Routen mit Treppen der M40W mit Pro-Paket, für schwere Sensorik der M100W.',
        },
      },
      {
        q: { en: 'Do the robots work at night and in bad weather?', de: 'Arbeiten die Roboter nachts und bei schlechtem Wetter?' },
        a: {
          en: 'Yes. Every model is sealed to IP66 or IP67 and rated for −20 to +55 °C. The M1 has four fill lights; a thermal camera is added per project.',
          de: 'Ja. Jedes Modell hat Schutzart IP66 oder IP67 und ist für −20 bis +55 °C ausgelegt. Der M1 hat vier Zusatzleuchten; eine Wärmebildkamera kommt je Projekt dazu.',
        },
      },
      {
        q: { en: 'How long can a robot patrol?', de: 'Wie lange kann ein Roboter auf Streife gehen?' },
        a: {
          en: 'Between 5 and 7.5 hours unloaded, depending on the model; payload shortens it. With a charging station and autonomous return, or swappable batteries, rounds continue through the night.',
          de: 'Je nach Modell 5 bis 7,5 Stunden ohne Last; Nutzlast verkürzt das. Mit Ladestation und autonomer Rückkehr oder Wechselakkus laufen die Runden die ganze Nacht weiter.',
        },
      },
      {
        q: { en: 'Can the robots be used in explosion-protected areas?', de: 'Können die Roboter in explosionsgeschützten Bereichen eingesetzt werden?' },
        a: {
          en: 'No. No M-series model has explosion protection. Routes must stay outside classified Ex zones.',
          de: 'Nein. Kein Modell der M-Serie ist explosionsgeschützt. Die Routen müssen außerhalb eingestufter Ex-Zonen bleiben.',
        },
      },
      {
        q: { en: 'Can we test a robot on our site first?', de: 'Können wir einen Roboter zuerst an unserem Standort testen?' },
        a: {
          en: 'Yes. We run a pilot on your real route before acceptance, so you see what the robot can and can’t take over before you commit to a fleet.',
          de: 'Ja. Vor der Abnahme fahren wir einen Pilot auf Ihrer echten Route. So sehen Sie, was der Roboter übernehmen kann und was nicht, bevor Sie sich für eine Flotte entscheiden.',
        },
      },
    ],
    related: { en: 'Inspection and security robots in general', de: 'Inspektions- und Sicherheitsroboter allgemein' },
  },

  fine: {
    eyebrow: { en: 'Good to know', de: 'Gut zu wissen' },
    items: [
      {
        en: 'All values are for the base configuration, as of 11/2026, and subject to change. The quotation confirms the exact scope.',
        de: 'Alle Werte gelten für die Grundkonfiguration, Stand 11/2026, Änderungen vorbehalten. Das Angebot bestätigt den genauen Umfang.',
      },
      {
        en: 'M100 and M100W: autonomous navigation in the Pro package is currently at demo stage. SLAM mapping, obstacle avoidance and point-cloud view are available.',
        de: 'M100 und M100W: Die autonome Navigation im Pro-Paket befindet sich derzeit im Demo-Stadium. SLAM-Kartierung, Hinderniserkennung und Punktwolkenansicht sind verfügbar.',
      },
      {
        en: 'The M series is built for MegaRobotics by OEM manufacturing partners. Product images are renderings and may differ from the delivered unit.',
        de: 'Die M-Serie wird für MegaRobotics von OEM-Fertigungspartnern hergestellt. Produktbilder sind Renderings und können vom gelieferten Gerät abweichen.',
      },
      {
        en: 'Images marked as visualisations are AI-generated, not footage of a real unit. Payloads shown in renders and visualisations are not included.',
        de: 'Als Visualisierung gekennzeichnete Bilder sind KI-generiert und keine Aufnahmen eines realen Geräts. In Renderings und Visualisierungen gezeigte Nutzlasten sind nicht enthalten.',
      },
    ],
  },

  cta: {
    eyebrow: { en: 'Your route', de: 'Ihre Route' },
    title: { en: 'Let’s walk your route together.', de: 'Lassen Sie uns Ihre Route gemeinsam ablaufen.' },
    body: {
      en: 'Send us a site plan or a few photos of the route. We’ll come back with a model, a sensor set and an honest view of what a robot can take over.',
      de: 'Schicken Sie uns einen Lageplan oder ein paar Fotos der Route. Wir melden uns mit Modell, Sensorik und einer ehrlichen Einschätzung, was ein Roboter übernehmen kann.',
    },
    button: { en: 'Discuss your project', de: 'Projekt besprechen' },
  },
}

type Content = typeof content

/** Swaps every { en, de } leaf for the string in `locale`. */
export type Localized<T> = T extends L
  ? string
  : T extends string
    ? string
    : T extends (infer U)[]
      ? Localized<U>[]
      : T extends object
        ? { [K in keyof T]: Localized<T[K]> }
        : T

export function localize<T>(node: T, locale: Locale): Localized<T> {
  if (Array.isArray(node)) return node.map((n) => localize(n, locale)) as Localized<T>
  if (node && typeof node === 'object') {
    const keys = Object.keys(node)
    if (keys.length === 2 && 'en' in node && 'de' in node) return (node as unknown as L)[locale] as Localized<T>
    return Object.fromEntries(keys.map((k) => [k, localize((node as Record<string, unknown>)[k], locale)])) as Localized<T>
  }
  return node as Localized<T>
}

export type SecurityContent = Localized<Content>

export function getSecurityContent(locale: Locale): SecurityContent {
  return localize(content, locale)
}
