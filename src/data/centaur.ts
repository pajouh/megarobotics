// Content for the unlisted CENTAUR-1 landing page at /centaur (and /de/centaur).
//
// The page is reachable by its URL only: nothing on the site links to it, it is
// not in the sitemap, llms.txt or the feed, and it carries noindex. Keep it that
// way unless the launch is decided.
//
// Sources: patent/usecase/MegaRobotics_CENTAUR1_UseCases_EN_2026 (application
// overview, 2026-09-24) and patent/usecase/Centaur Anwendungsflyer.pdf (German
// flyer, same date, which adds fields 09–12). Rotation, tilt, docking accuracy
// and latency are design values from the IP filing, not measurements on a series
// machine; images and clips are renderings. The hero clips live on the media
// host under /megarobotics/centaur/ (staged in Website/product-hero-sliders/
// media-upload/megarobotics/centaur), the stills in public/images/centaur.

import type { Locale } from '@/i18n/config'

type L = { en: string; de: string }

export const CENTAUR_MEDIA = '/megarobotics/centaur'

const IMG = '/images/centaur'

export interface CentaurField {
  n: string
  title: L
  body: L
  separated?: L
}

const content = {
  meta: {
    title: {
      en: 'CENTAUR-1 · Coupling system for two autonomous robots | MegaRobotics',
      de: 'CENTAUR-1 · Kopplungssystem für zwei autonome Roboter | MegaRobotics',
    },
    description: {
      en: 'CENTAUR joins a humanoid upper body and a quadruped into one hybrid robot and separates them on command. Four operating modes, twelve fields of use.',
      de: 'CENTAUR koppelt einen humanoiden Oberkörper und einen Vierbeiner zu einem Hybrid und trennt beide auf Befehl. Vier Betriebsmodi, zwölf Anwendungsfelder.',
    },
  },

  hero: {
    carousel: { en: 'CENTAUR-1 in application', de: 'CENTAUR-1 im Einsatz' },
    chooseSlide: { en: 'Choose application', de: 'Anwendung wählen' },
    useCases: { en: 'Use cases', de: 'Einsatzfälle' },
    pause: { en: 'Pause video', de: 'Video anhalten' },
    play: { en: 'Play video', de: 'Video abspielen' },
    ctaPrimary: { en: 'Assess your use case', de: 'Anwendungsfall bewerten' },
    ctaSecondary: { en: '12 fields of use', de: '12 Anwendungsfelder' },
  },

  intro: {
    eyebrow: { en: 'MegaRobotics in-house development', de: 'Eigenentwicklung von MegaRobotics' },
    title: { en: 'Two robots. One system.', de: 'Zwei Roboter. Ein System.' },
    lead: {
      en: 'CENTAUR joins a self-operating humanoid upper body to a self-operating quadruped, forming one coordinated hybrid. On command it separates them again, and neither robot loses its autonomy.',
      de: 'CENTAUR verbindet ein autonomes humanoides Oberkörpermodul mit einem autonomen Vierbeiner zu einem koordinierten Hybrid – und trennt beide auf Befehl wieder, ohne dass eines der Systeme seine Autonomie verliert.',
    },
    body: {
      en: 'Today, mobility and manipulation are bought separately. Wheeled platforms stop at thresholds and stairs. Quadrupeds reach that ground but carry only sensors. Bipedal humanoids bring the arms, but on uneven terrain they are the least stable of the three. CENTAUR brings the strengths of each together, and only when the task calls for it.',
      de: 'Mobilität und Manipulation sind heute zwei getrennte Beschaffungen: Radplattformen scheitern an Schwellen und Treppen, Vierbeiner tragen nur Sensorik, und zweibeinige Humanoide sind im Gelände am wenigsten stabil. CENTAUR bringt die Stärken zusammen – genau dann, wenn die Aufgabe es verlangt.',
    },
    status: { en: 'Development status: prototype phase', de: 'Entwicklungsstand: Prototypphase' },
    image: `${IMG}/centaur-supply-basket.jpg`,
    imageAlt: {
      en: 'Rendering of CENTAUR-1: humanoid torso coupled to a wheeled quadruped, carrying a supply basket',
      de: 'Rendering von CENTAUR-1: humanoider Torso, gekoppelt mit einem Vierbeiner auf Rädern, mit Versorgungskorb',
    },
  },

  system: {
    eyebrow: { en: 'The system', de: 'Das System' },
    title: { en: 'Not a quadruped with an arm bolted on.', de: 'Kein Vierbeiner mit aufgesetztem Arm.' },
    body: {
      en: 'Other designs either mount a manipulator on a quadruped as a peripheral, or fuse the two halves into one machine for good. CENTAUR defines a mechanical, electrical and communication interface between two robots that each stay fully operational before and after coupling.',
      de: 'Andere Konzepte setzen einem Vierbeiner einen Manipulator als Peripherie auf oder verschmelzen beide Hälften dauerhaft zu einer Maschine. CENTAUR definiert eine mechanische, elektrische und kommunikative Schnittstelle zwischen zwei Robotern, die vor und nach dem Koppeln voll einsatzfähig bleiben.',
    },
    figures: [
      {
        label: { en: 'Rotation θ', de: 'Rotation θ' },
        value: '360°',
        body: {
          en: 'Powered slewing bearing, endless ±n × 360°. The working envelope turns while the chassis stays put.',
          de: 'Angetriebener Drehkranz, endlos ±n × 360°. Der Arbeitsraum dreht, das Fahrwerk bleibt stehen.',
        },
      },
      {
        label: { en: 'Tilt φ', de: 'Neigung φ' },
        value: '±45°',
        body: {
          en: 'Active gravity compensation keeps the torso level on slopes, and with it a carried tray or sample.',
          de: 'Aktiver Schwerkraftausgleich hält Torso und Last am Hang waagerecht – auch ein Tablett oder eine Probe.',
        },
      },
      {
        label: { en: 'Architecture', de: 'Architektur' },
        value: { en: '2 primaries', de: '2 × autonom' },
        body: {
          en: 'The chassis leads locomotion, the torso leads manipulation. Neither is a peripheral of the other.',
          de: 'Das Fahrwerk führt die Fortbewegung, der Torso die Handhabung. Keiner ist Peripherie des anderen.',
        },
      },
      {
        label: { en: 'Docking', de: 'Andocken' },
        value: '±5 mm',
        body: {
          en: 'Optical markers guide the chassis under the torso, a form-fit lock holds it. The compensation loop runs in under 10 ms.',
          de: 'Optische Marker führen das Fahrwerk unter den Torso, eine formschlüssige Verriegelung hält ihn. Regelung unter 10 ms.',
        },
      },
    ],
    note: {
      en: 'Rotation angle, tilt range, docking accuracy and latency are design values from the IP filing, not measurements on a series machine.',
      de: 'Rotationswinkel, Neigungsbereich, Andockgenauigkeit und Latenz sind Auslegungswerte aus der Schutzrechtsanmeldung, keine Messwerte einer Serienmaschine.',
    },
  },

  modes: {
    eyebrow: { en: 'One procurement', de: 'Eine Beschaffung' },
    title: { en: 'Four operating modes', de: 'Vier Betriebsmodi' },
    subtitle: {
      en: 'Coupled or apart, both robots keep working. One purchase covers four ways of using them.',
      de: 'Gekoppelt oder getrennt – beide Roboter bleiben im Einsatz. Eine Beschaffung deckt vier Einsatzarten ab.',
    },
    items: [
      {
        title: { en: 'CENTAUR compound', de: 'CENTAUR-Verbund' },
        body: {
          en: 'Terrain mobility and two-handed manipulation at the same time.',
          de: 'Geländegängig und beidhändig zugleich.',
        },
      },
      {
        title: { en: 'Chassis solo', de: 'Fahrwerk solo' },
        body: {
          en: 'The quadruped carries on alone as an inspection or patrol robot with a sensor payload.',
          de: 'Eigenständiger Inspektions- oder Streifenroboter mit Sensorik.',
        },
      },
      {
        title: { en: 'Torso stationary', de: 'Torso stationär' },
        body: {
          en: 'The upper body works on a stand or platform as a two-handed manipulator.',
          de: 'Zweiarmiger Manipulator auf Ständer oder Plattform.',
        },
      },
      {
        title: { en: 'Hand locomotion', de: 'Handfortbewegung' },
        body: {
          en: 'The decoupled torso moves short distances on its grippers, through gaps the compound cannot pass.',
          de: 'Der Torso bewegt sich auf seinen Greifern durch enge Lücken, die der Verbund nicht passiert.',
        },
      },
    ],
  },

  band: {
    eyebrow: { en: 'One coupling system', de: 'Ein Kopplungssystem' },
    title: {
      en: 'Opens the door. Holds the load. Hands it over.',
      de: 'Tür öffnen. Last halten. Übergeben.',
    },
    body: {
      en: 'Two autonomous robots, four operating modes, twelve fields of use.',
      de: 'Zwei autonome Roboter, vier Betriebsmodi, zwölf Anwendungsfelder.',
    },
    video: 'medication-transport',
  },

  fields: {
    eyebrow: { en: 'Fields of use', de: 'Anwendungsfelder' },
    title: { en: 'Where terrain and two hands come together.', de: 'Wo Gelände und zwei Hände zusammenkommen.' },
    subtitle: {
      en: 'One criterion: the task needs travel over ground a wheeled chassis cannot safely cross, and handling that one arm cannot finish.',
      de: 'Das Kriterium: Die Aufgabe verlangt Wege, die ein Radfahrwerk nicht sicher bewältigt, und Handhabung, die ein einzelner Arm nicht leistet.',
    },
    separatedLabel: { en: 'Separated', de: 'Getrennt' },
    groups: [
      {
        title: { en: 'Industry & infrastructure', de: 'Industrie & Infrastruktur' },
        images: [
          {
            src: `${IMG}/centaur-substation-thermal.jpg`,
            alt: { en: 'CENTAUR-1 inspecting a switch cabinet in a substation', de: 'CENTAUR-1 bei der Inspektion eines Schaltschranks im Umspannwerk' },
            caption: { en: 'Substation · inspection', de: 'Umspannwerk · Inspektion' },
          },
          {
            src: `${IMG}/centaur-substation.jpg`,
            alt: { en: 'CENTAUR-1 crossing a wet gravel yard in a substation', de: 'CENTAUR-1 auf nassem Schotter im Umspannwerk' },
            caption: { en: 'Gravel and cable trenches', de: 'Schotter und Kabelkanäle' },
          },
        ],
        items: [
          {
            n: '01',
            title: { en: 'Production & intralogistics', de: 'Produktion & Intralogistik' },
            body: {
              en: 'Material supply and line feeding. Two-handed transfer while the chassis keeps moving; the torso turns to the rack face without repositioning the base.',
              de: 'Materialversorgung und Linienbelieferung – beidhändige Übergabe, während das Fahrwerk weiterfährt; der Torso dreht sich zum Regal, ohne dass die Basis neu ansetzt.',
            },
            separated: { en: 'torso as a stationary picking cell off-peak.', de: 'Torso als stationäre Kommissionierzelle.' },
          },
          {
            n: '02',
            title: { en: 'Plant inspection & maintenance', de: 'Inspektion & Instandhaltung' },
            body: {
              en: 'Reading gauges, taking samples, operating valves and flaps. One hand holds the tool, the other the counter-hold, with a free working direction at the cabinet.',
              de: 'Anzeigen ablesen, Proben nehmen, Ventile betätigen – Werkzeug in der einen, Gegenhalt in der anderen Hand.',
            },
            separated: { en: 'the quadruped alone on the daily sensor round.', de: 'Vierbeiner allein auf dem täglichen Sensorrundgang.' },
          },
          {
            n: '03',
            title: { en: 'Energy & grid infrastructure', de: 'Energie- & Netzinfrastruktur' },
            body: {
              en: 'Switchgear and transformer checks, switching operations. Two-handed work on gravel and around tower bases while clearance distances are kept.',
              de: 'Schaltanlagen- und Trafokontrollen, Schalthandlungen auf Schotter unter Einhaltung der Schutzabstände.',
            },
            separated: { en: 'continuous substation patrol, no torso.', de: 'kontinuierliche Umspannwerk-Streife.' },
          },
          {
            n: '04',
            title: { en: 'Construction & tunnelling', de: 'Bau & Tunnelbau' },
            body: {
              en: 'Surveying, material handling, picking up components. The tilt axis keeps the torso upright on ramps and rubble, so arm poses stay accurate.',
              de: 'Vermessung, Materialhandling, Bauteilaufnahme – die Neigeachse hält den Torso auf Rampen und Schutt aufrecht.',
            },
            separated: { en: 'tight spots reached in hand-locomotion mode.', de: 'enge Stellen im Modus Handfortbewegung.' },
          },
          {
            n: '05',
            title: { en: 'Hazardous areas & decommissioning', de: 'Gefahrenbereiche & Rückbau' },
            body: {
              en: 'Reconnaissance, clearing obstacles, first entry. Clearing and navigating happen in one pass instead of two sorties.',
              de: 'Erkundung, Hindernisräumung, Ersteinstieg – Räumen und Navigieren in einem Einsatz statt in zweien.',
            },
            separated: { en: 'endurance extended by swapping the chassis.', de: 'längere Einsatzdauer durch Tausch des Fahrwerks.' },
          },
          {
            n: '06',
            title: { en: 'Agriculture & forestry', de: 'Land- & Forstwirtschaft' },
            body: {
              en: 'Harvesting and tending, livestock checks, sampling. Two hands at the plant, with the tilt axis compensating for the hillside.',
              de: 'Ernte- und Pflegegriffe, Tierkontrolle, Probenahme – die Neigeachse gleicht die Hanglage aus.',
            },
            separated: { en: 'the quadruped alone for stock monitoring.', de: 'Vierbeiner allein für die Bestandskontrolle.' },
          },
        ] as CentaurField[],
      },
      {
        title: { en: 'Health, service & security', de: 'Gesundheit, Service & Sicherheit' },
        images: [
          {
            src: `${IMG}/centaur-patient-room.jpg`,
            alt: { en: 'CENTAUR-1 opening the door to a patient room', de: 'CENTAUR-1 öffnet die Tür zu einem Patientenzimmer' },
            caption: { en: 'Clinic', de: 'Klinik' },
          },
          {
            src: `${IMG}/centaur-cold-store.jpg`,
            alt: { en: 'CENTAUR-1 retrieving supplies from a refrigerated cabinet', de: 'CENTAUR-1 entnimmt Material aus einem Kühlschrank' },
            caption: { en: 'Cold store', de: 'Kühllager' },
          },
          {
            src: `${IMG}/centaur-patient-mobility.jpg`,
            alt: { en: 'CENTAUR-1 walking alongside a patient on a ward corridor', de: 'CENTAUR-1 begleitet einen Patienten auf dem Stationsflur' },
            caption: { en: 'Care', de: 'Pflege' },
          },
          {
            src: `${IMG}/centaur-assisted-living.jpg`,
            alt: { en: 'CENTAUR-1 carrying a tray in a living room', de: 'CENTAUR-1 trägt ein Tablett im Wohnzimmer' },
            caption: { en: 'Assisted living', de: 'Wohnen' },
          },
          {
            src: `${IMG}/centaur-doorstep.jpg`,
            alt: { en: 'CENTAUR-1 handing over parcels at a front door', de: 'CENTAUR-1 übergibt Pakete an einer Haustür' },
            caption: { en: 'Delivery', de: 'Zustellung' },
          },
        ],
        items: [
          {
            n: '07',
            title: { en: 'Security & site protection', de: 'Sicherheit & Objektschutz' },
            body: {
              en: 'Patrols that can intervene, not only report: opening doors and gates, moving an obstacle, operating a keypad, at night, on stairs and along fence lines.',
              de: 'Streife mit Eingriffsmöglichkeit: Türen und Tore öffnen, Hindernisse bewegen, Tastenfelder bedienen – nachts, auf Treppen und entlang von Zäunen.',
            },
            separated: { en: 'night patrol as chassis, torso at the gatehouse.', de: 'Nachtstreife als Fahrwerk, Torso an der Pforte.' },
          },
          {
            n: '08',
            title: { en: 'Clinical & laboratory logistics', de: 'Klinik- & Laborlogistik' },
            body: {
              en: 'Transport to the destination and handover to a person. It opens the door and holds the load in one go, the step that stops wheeled carts at thresholds and lift gaps.',
              de: 'Medikamente und Proben transportieren, aus Kühlschränken entnehmen, Türen und Aufzüge selbst bedienen – und an einen Menschen übergeben.',
            },
            separated: { en: 'torso as lab workstation, chassis as transporter.', de: 'Torso als Laborarbeitsplatz, Fahrwerk als Transporter.' },
          },
          {
            n: '09',
            title: { en: 'Care & patient mobility', de: 'Pflege & Patientenmobilität' },
            body: {
              en: 'Support when patients are moved in a bed or wheelchair, and company along ward corridors.',
              de: 'Unterstützung beim Transport im Bett oder Rollstuhl und Begleitung auf Stationsfluren.',
            },
          },
          {
            n: '10',
            title: { en: 'Assisted living', de: 'Betreutes Wohnen & Assistenz' },
            body: {
              en: 'Fetching, carrying and handing things over at home. Tilt compensation keeps trays level.',
              de: 'Bringdienste und Handreichungen im Wohnumfeld – Tabletts bleiben dank Neigungsausgleich waagerecht.',
            },
          },
          {
            n: '11',
            title: { en: 'Hotels & facility services', de: 'Hotellerie & Facility Services' },
            body: {
              en: 'Distributing linen, towels and consumables to every floor, lift rides included.',
              de: 'Wäsche, Handtücher und Verbrauchsmaterial auf die Etagen verteilen – per Aufzug.',
            },
          },
          {
            n: '12',
            title: { en: 'Delivery & last mile', de: 'Zustellung & letzte Meile' },
            body: {
              en: 'Handover at the front door to a person, over thresholds, steps, kerbs and building entrances.',
              de: 'Übergabe an der Haustür an eine Person – über Schwellen und Stufen, Bordsteine und Hauseingänge inklusive.',
            },
          },
        ] as CentaurField[],
      },
    ],
  },

  videos: {
    eyebrow: { en: 'Visualisations', de: 'Visualisierungen' },
    title: { en: 'See CENTAUR at work', de: 'CENTAUR im Einsatz' },
    subtitle: {
      en: 'Rendered scenes from the clinical, care and energy applications. They show the intended workflow, not footage of a series machine.',
      de: 'Gerenderte Szenen aus Klinik, Pflege und Energie. Sie zeigen den vorgesehenen Ablauf, keine Aufnahmen einer Serienmaschine.',
    },
    items: [
      { id: 'night-shift-logistics', title: { en: 'Night-shift supply run', de: 'Versorgung in der Nachtschicht' } },
      { id: 'lab-sample-transport', title: { en: 'Lab sample transport', de: 'Probentransport ins Labor' } },
      { id: 'medication-transport', title: { en: 'Medication from the cold store', de: 'Medikamente aus dem Kühllager' } },
      { id: 'substation-inspection', title: { en: 'Substation inspection', de: 'Inspektion im Umspannwerk' } },
      { id: 'wheelchair-assist', title: { en: 'Wheelchair transport', de: 'Transport im Rollstuhl' } },
      { id: 'bed-transport', title: { en: 'Bed transport', de: 'Bettentransport' } },
      { id: 'linen-supply', title: { en: 'Linen and towels', de: 'Wäsche und Handtücher' } },
    ],
  },

  cases: {
    eyebrow: { en: 'First applications', de: 'Erste Anwendungen' },
    title: { en: 'Starting where doors, lifts and handovers matter', de: 'Dort beginnen, wo Türen, Aufzüge und Übergaben zählen' },
    items: [
      {
        tag: { en: 'Case A · in discussion', de: 'Fall A · in Gespräch' },
        title: { en: 'Clinical and laboratory logistics', de: 'Klinik- und Laborlogistik' },
        body: {
          en: 'Night-shift supply runs, medication and sample transport, linen and consumables, retrieval from refrigerated cabinets, door and lift handling. A German university hospital has invited a campus case study.',
          de: 'Versorgungsfahrten in der Nachtschicht, Medikamenten- und Probentransport, Wäsche und Verbrauchsmaterial, Entnahme aus Kühlschränken, Türen und Aufzüge. Ein deutsches Universitätsklinikum hat zu einer Campus-Fallstudie eingeladen.',
        },
      },
      {
        tag: { en: 'Case B · in discussion', de: 'Fall B · in Gespräch' },
        title: { en: 'Campus inspection and security', de: 'Campus-Inspektion und Sicherheit' },
        body: {
          en: 'Night inspection and security patrol across the same hospital campus. The chassis does the round alone, and the torso joins where an intervention is needed. One fleet, two shifts, two configurations.',
          de: 'Nachtinspektion und Sicherheitsstreife auf demselben Klinikcampus. Das Fahrwerk läuft die Runde allein, der Torso kommt hinzu, wo ein Eingriff nötig ist. Eine Flotte, zwei Schichten, zwei Konfigurationen.',
        },
      },
    ],
  },

  honest: {
    eyebrow: { en: 'Honestly', de: 'Ehrlich gesagt' },
    title: { en: 'When CENTAUR is the wrong answer', de: 'Wann CENTAUR nicht die richtige Wahl ist' },
    body: {
      en: 'On level, tidy floors with a fixed route, an AMR is faster and cheaper. For repeated grips at one location, a stationary six-axis robot wins on accuracy and cycle time. The compound earns its place only when terrain, two-handed work and changing working directions occur together.',
      de: 'Auf ebenen Böden mit fester Route ist ein AMR schneller und günstiger, für wiederholte Griffe an einem Ort ein stationärer Sechsachser genauer und im Takt überlegen. CENTAUR lohnt sich, wenn Gelände, beidhändige Arbeit und wechselnde Arbeitsrichtungen zusammentreffen.',
    },
  },

  ip: {
    eyebrow: { en: 'Development & IP', de: 'Entwicklung & Schutzrechte' },
    title: { en: 'Developed and protected in Germany', de: 'In Deutschland entwickelt und geschützt' },
    body: {
      en: 'CENTAUR is an in-house development of MegaForce GmbH (brand MegaRobotics), Kaarst, invented by Masoud Pajouh. It is covered by registered designs EU 015138894-0001 and -0002 (EUIPO) and international registration DM/256721 (WIPO, Hague). A German utility model covering the coupling system and the control method has been filed at the DPMA. All rights are held by the company.',
      de: 'CENTAUR ist eine Eigenentwicklung der MegaForce GmbH (Marke MegaRobotics), Kaarst, Erfinder Masoud Pajouh. Geschützt durch die eingetragenen Designs EU 015138894-0001 und -0002 (EUIPO) und die internationale Eintragung DM/256721 (WIPO, Haag). Ein deutsches Gebrauchsmuster für das Kopplungssystem und das Steuerungsverfahren ist beim DPMA angemeldet. Alle Rechte liegen beim Unternehmen.',
    },
    open: {
      en: 'The CENTAUR Coupling Specification is intended for publication as an open, cross-vendor robot-to-robot interface. It is expressly not part of the protected claims.',
      de: 'Die CENTAUR Coupling Specification soll als offene, herstellerübergreifende Roboter-zu-Roboter-Schnittstelle veröffentlicht werden und ist ausdrücklich nicht Teil der geschützten Ansprüche.',
    },
  },

  cta: {
    eyebrow: { en: 'CENTAUR-1', de: 'CENTAUR-1' },
    title: { en: 'Assess your use case with us', de: 'Ihren Anwendungsfall mit uns bewerten' },
    body: {
      en: 'Tell us about the route, the handling task and the environment. We will tell you honestly whether CENTAUR fits, or whether a simpler machine does the job.',
      de: 'Beschreiben Sie Weg, Handhabungsaufgabe und Umgebung. Wir sagen Ihnen ehrlich, ob CENTAUR passt oder eine einfachere Maschine die Aufgabe löst.',
    },
    button: { en: 'Discuss your project', de: 'Projekt besprechen' },
  },

  disclaimer: {
    en: 'Technical values are design values from the IP filing, not measurements on a series machine. Images and videos are renderings of the registered design. Development status: prototype phase.',
    de: 'Technische Angaben sind Auslegungswerte aus der Schutzrechtsanmeldung, keine Messwerte einer Serienmaschine. Abbildungen und Videos sind Renderings des eingetragenen Designs. Entwicklungsstand: Prototypphase.',
  },
}

type Content = typeof content

/** Swaps every { en, de } leaf for the string in `locale`. */
type Localized<T> = T extends L
  ? string
  : T extends string
    ? string
    : T extends (infer U)[]
      ? Localized<U>[]
      : T extends object
        ? { [K in keyof T]: Localized<T[K]> }
        : T

function localize<T>(node: T, locale: Locale): Localized<T> {
  if (Array.isArray(node)) return node.map((n) => localize(n, locale)) as Localized<T>
  if (node && typeof node === 'object') {
    const keys = Object.keys(node)
    if (keys.length === 2 && 'en' in node && 'de' in node) return (node as unknown as L)[locale] as Localized<T>
    return Object.fromEntries(keys.map((k) => [k, localize((node as Record<string, unknown>)[k], locale)])) as Localized<T>
  }
  return node as Localized<T>
}

export function getCentaurContent(locale: Locale): Localized<Content> {
  return localize(content, locale)
}
