// Fragenkatalog for the Rheinkalk / Lhoist inspection-robot project.
// Shared by the page (rendering) and the API (validation), so a question id
// that is not listed here can never be written to storage.

export type QuestionType = 'text' | 'long' | 'single' | 'multi' | 'scale'

export type Question = {
  id: string
  type: QuestionType
  label: string
  hint?: string
  placeholder?: string
  options?: string[]
}

export type Section = {
  id: string
  title: string
  /** What this section's answers let us choose or configure. */
  decides: string
  intro: string
  /** What to photograph, film or record for this area. */
  mediaHint: string
  questions: Question[]
}

export const PROCESS_STEPS = [
  'Steinbruch',
  'SKW-Transport',
  'Bandanlagen',
  'Wäsche',
  'Brechen & Klassieren',
  'Weiterverarbeitung',
  'Verladung per LKW',
]

export const DEFAULT_PEOPLE = ['Michael Joswig', 'Lena Weisheit']

const YES_NO = ['Ja', 'Nein', 'Unklar']

export const SECTIONS: Section[] = [
  {
    id: 'aufgaben',
    title: 'Aufgaben & Prioritäten',
    decides: 'Sensorpaket und Reihenfolge der Umsetzung',
    intro: 'Was der Roboter erkennen soll, legt fest, welche Sensoren er trägt. Die Prioritäten zeigen uns, womit wir anfangen.',
    mediaHint: 'Hilfreich: Lageplan oder Luftbild des Werks mit den Bereichen, um die es geht.',
    questions: [
      {
        id: 'p_bereiche',
        type: 'multi',
        label: 'In welchen Bereichen soll der Roboter eingesetzt werden?',
        options: [
          'Steinbruch',
          'Förderbänder und Bandstrecken',
          'Wäsche',
          'Brech- und Siebanlagen',
          'Weiterverarbeitung (Öfen, Mahlanlagen)',
          'Silos und Verladung',
          'Werkszaun und Außengelände',
        ],
      },
      {
        id: 'a_aufgaben',
        type: 'multi',
        label: 'Was soll der Roboter erkennen oder erfassen?',
        options: [
          'Quietschende oder defekte Tragrollen (Geräusch)',
          'Heißlaufende Lager, Motoren, Getriebe (Wärmebild)',
          'Staubaustritt, z. B. nach Rohrbruch',
          'Leckagen (Öl, Wasser, Druckluft)',
          'Anzeigen, Manometer, Füllstände ablesen',
          'Bandlauf und Bandzustand (Bild)',
          'Personen auf dem Gelände',
          'Beschädigter oder geöffneter Zaun, offene Tore',
        ],
      },
      { id: 'x_prio_rundgang', type: 'scale', label: 'Priorität: Inspektionsrundgänge in der Anlage' },
      { id: 'x_prio_band', type: 'scale', label: 'Priorität: Förderbänder und Tragrollen' },
      { id: 'x_prio_staub', type: 'scale', label: 'Priorität: Staub- und Rohrbrucherkennung' },
      { id: 'x_prio_zaun', type: 'scale', label: 'Priorität: Zaun- und Geländeinspektion' },
      {
        id: 'a_einsatz',
        type: 'single',
        label: 'Soll der Leitstand den Roboter bei einer Störmeldung gezielt zu einer Stelle schicken können?',
        hint: 'Heute geht ein Außendienstmitarbeiter hin und sieht nach.',
        options: ['Ja, das ist wichtig', 'Wäre hilfreich', 'Nein, feste Rundgänge genügen'],
      },
    ],
  },
  {
    id: 'route',
    title: 'Route & Gelände',
    decides: 'Modell (M1, M40, M100) und Antrieb: Beine, Räder oder Punktfüße',
    intro: 'Streckenlänge, Untergrund, Stufen und Engstellen bestimmen Baugröße, Antrieb und Akku. Hier zählen Maße und Fotos mehr als Beschreibungen.',
    mediaHint: 'Besonders hilfreich: Fotos von Treppen, Gitterrosten, Engstellen und Türen, am besten mit Zollstock im Bild. Dazu ein mit dem Handy gefilmter Rundgang.',
    questions: [
      {
        id: 'r_liste',
        type: 'long',
        label: 'Welche Strecken soll der Roboter abgehen?',
        hint: 'Je Strecke: Bereich, ungefähre Länge und wie oft pro Tag oder Schicht.',
      },
      {
        id: 'g_untergrund',
        type: 'multi',
        label: 'Welcher Untergrund kommt auf den Strecken vor?',
        options: [
          'Beton oder Asphalt',
          'Schotter',
          'Gitterrost',
          'Unbefestigt, Schlamm',
          'Wiese, Böschung',
          'Schienen oder Kabelkanäle zum Übersteigen',
        ],
      },
      {
        id: 'u_hindernisse',
        type: 'long',
        label: 'Welche Stufen und Treppen liegen auf den Strecken?',
        hint: 'Höchste Einzelstufe, Stufenhöhe und Neigung der Treppen, Gitterrost- oder Betonstufen.',
      },
      {
        id: 'g_breite',
        type: 'text',
        label: 'Wie breit ist die schmalste Stelle, durch die der Roboter muss?',
        placeholder: 'z. B. Laufsteg 60 cm, Tür 80 cm',
      },
      { id: 'g_steigung', type: 'text', label: 'Welche Steigungen oder Rampen gibt es?' },
      {
        id: 'u_tueren',
        type: 'text',
        label: 'Müssen Türen, Tore oder Aufzüge passiert werden, und öffnen sie automatisch?',
      },
      {
        id: 'u_verkehr',
        type: 'text',
        label: 'Wo kreuzt die Strecke Fahrzeugverkehr (SKW, Radlader, LKW)?',
      },
    ],
  },
  {
    id: 'umgebung',
    title: 'Umgebungsbedingungen',
    decides: 'Schutzart, Ausführung und Grenzen des Einsatzes',
    intro: 'Staub, Nässe, Hitze und Ex-Zonen entscheiden, welche Ausführung in Frage kommt und wo der Roboter nicht fahren darf.',
    mediaHint: 'Hilfreich: Fotos der staubigsten, nassesten und heißesten Stellen.',
    questions: [
      {
        id: 'u_belastung',
        type: 'multi',
        label: 'Welchen Belastungen wäre der Roboter ausgesetzt?',
        options: [
          'Kalkstaub (alkalisch)',
          'Nässe und Schlamm',
          'Strahlwasser bei der Reinigung',
          'Hitze in Ofennähe',
          'Frost, Schnee und Eis',
          'Starke Vibrationen',
        ],
      },
      {
        id: 'u_temp',
        type: 'text',
        label: 'Welche Temperaturen treten an den heißesten und kältesten Punkten der Strecken auf?',
      },
      {
        id: 'u_ex',
        type: 'single',
        label: 'Gibt es eingestufte Ex-Zonen entlang der Strecken?',
        options: YES_NO,
      },
      {
        id: 'g_licht',
        type: 'multi',
        label: 'Bei welchem Licht soll der Roboter arbeiten?',
        options: ['Tageslicht', 'Beleuchtete Hallen und Wege', 'Dunkelheit ohne Beleuchtung', 'Dauerhaft staubige Luft'],
      },
      {
        id: 'g_reinigung',
        type: 'single',
        label: 'Kann der Roboter regelmäßig abgespült oder abgeblasen werden?',
        options: ['Ja, mit Wasser', 'Ja, mit Druckluft', 'Nein', 'Unklar'],
      },
    ],
  },
  {
    id: 'band',
    title: 'Förderbänder & Tragrollen',
    decides: 'Akustiksensor, Wärmebildkamera und deren Anbau',
    intro: 'Eine Rolle kündigt ihren Ausfall meist durch Quietschen an. Abstand, Umgebungslärm und Zugang bestimmen, welche Akustik- und Wärmebildsensorik passt.',
    mediaHint: 'Besonders hilfreich: ein kurzes Video oder eine Tonaufnahme einer quietschenden Rolle, dazu Fotos vom Laufsteg.',
    questions: [
      {
        id: 'b_umfang',
        type: 'long',
        label: 'Welche Bandstrecken sollen überwacht werden, und wie lang sind sie?',
        hint: 'Grobe Zahlen reichen.',
      },
      {
        id: 'b_bauart',
        type: 'multi',
        label: 'Wie verlaufen diese Bänder?',
        options: [
          'Offen im Freien',
          'Überdacht',
          'Eingehaust',
          'Auf Bandbrücken in der Höhe',
          'Im Tunnel oder unterirdisch',
          'Mit Steigungen',
        ],
      },
      {
        id: 'b_zugang',
        type: 'long',
        label: 'Wie kommt man an die Rollen heran?',
        hint: 'Laufsteg ein- oder beidseitig, Breite, Abstand zu den Rollen, Schutzgitter davor.',
      },
      {
        id: 'b_laerm',
        type: 'text',
        label: 'Wie laut ist es an den Bändern, und aus welcher Entfernung hört man eine quietschende Rolle?',
      },
      {
        id: 'b_waerme',
        type: 'single',
        label: 'Sollen heißlaufende Lager zusätzlich per Wärmebild erfasst werden?',
        options: YES_NO,
      },
      { id: 'b_takt', type: 'text', label: 'Wie oft sollte jede Bandstrecke abgegangen werden?' },
    ],
  },
  {
    id: 'staub',
    title: 'Staub & Rohrbruch',
    decides: 'Staubsensor, Kamera und Abstand der Kontrollfahrten',
    intro: 'Bei einem Rohrbruch steigt die Staubkonzentration in der Luft. Ort und geforderte Reaktionszeit bestimmen Sensor und Fahrplan.',
    mediaHint: 'Hilfreich: Fotos oder Videos eines früheren Staubaustritts und der betroffenen Leitungen.',
    questions: [
      {
        id: 'd_wo',
        type: 'long',
        label: 'Wo treten Rohrbrüche oder Staubaustritte auf?',
        hint: 'Leitung, Medium, Innen- oder Außenbereich.',
      },
      {
        id: 'd_sensor',
        type: 'single',
        label: 'Gibt es in diesen Bereichen bereits fest installierte Staub- oder Drucksensoren?',
        options: ['Ja, flächendeckend', 'Ja, punktuell', 'Nein', 'Unklar'],
      },
      {
        id: 'd_reaktion',
        type: 'text',
        label: 'Wie schnell muss ein Staubaustritt spätestens erkannt sein?',
        placeholder: 'z. B. innerhalb von 30 Minuten',
      },
      {
        id: 'd_alarm',
        type: 'multi',
        label: 'Was soll der Roboter bei erhöhter Staubkonzentration liefern?',
        options: ['Alarm im Leitstand', 'Livebild der Stelle', 'Messwert mit Ort und Uhrzeit', 'Wärmebild der Stelle'],
      },
    ],
  },
  {
    id: 'zaun',
    title: 'Zaun & Werksgelände',
    decides: 'Kameras für Tag und Nacht, Reichweite und Fahrplan',
    intro: 'Die Zauninspektion soll zeigen, ob Unbefugte das Gelände betreten haben. Zaunlänge, Weg und Uhrzeit bestimmen Kamera und Akkureichweite.',
    mediaHint: 'Hilfreich: Fotos typischer Zaunabschnitte und des Wegs entlang des Zauns, ein Lageplan mit dem Zaunverlauf.',
    questions: [
      { id: 'z_laenge', type: 'text', label: 'Wie lang ist der Zaunabschnitt, der kontrolliert werden soll?' },
      {
        id: 'z_weg',
        type: 'long',
        label: 'Wie ist der Weg entlang des Zauns beschaffen?',
        hint: 'Befestigt, Schotter, Wiese, Böschung, Bewuchs, Steigungen.',
      },
      {
        id: 'z_zeiten',
        type: 'multi',
        label: 'Wann soll kontrolliert werden?',
        options: ['Nachts', 'Am Wochenende', 'Rund um die Uhr', 'Nur anlassbezogen'],
      },
      {
        id: 'z_erkennen',
        type: 'multi',
        label: 'Was soll erkannt werden?',
        options: [
          'Personen auf dem Gelände',
          'Beschädigter oder geöffneter Zaun',
          'Fahrzeuge',
          'Offene Tore und Türen',
        ],
      },
      {
        id: 'z_datenschutz',
        type: 'text',
        label: 'Gibt es Einschränkungen für Videoaufnahmen auf dem Gelände?',
        placeholder: 'z. B. Vorgaben von Betriebsrat oder Datenschutz',
      },
    ],
  },
  {
    id: 'leitstand',
    title: 'Leitstand, Funk & Laden',
    decides: 'Funkmodul, Software-Anbindung und Ladestation',
    intro: 'Im Leitstand laufen Prozessparameter und Kamerabilder zusammen. Dort sollen auch die Daten des Roboters ankommen.',
    mediaHint: 'Hilfreich: ein Foto möglicher Standorte für die Ladestation.',
    questions: [
      {
        id: 'l_ziel',
        type: 'multi',
        label: 'Wohin sollen Messwerte, Bilder und Alarme des Roboters fließen?',
        options: [
          'Eigene Web-Oberfläche im Leitstand',
          'Einbindung ins Prozessleitsystem (z. B. OPC UA, Modbus, MQTT)',
          'Videobild ins bestehende Kamerasystem',
          'E-Mail oder SMS an die Bereitschaft',
          'Noch offen',
        ],
      },
      {
        id: 'l_system',
        type: 'text',
        label: 'Welches Prozessleitsystem und welches Kamerasystem nutzen Sie im Leitstand?',
      },
      {
        id: 'l_netz',
        type: 'multi',
        label: 'Welche Funkabdeckung gibt es entlang der Strecken?',
        options: [
          'Werks-WLAN flächendeckend',
          'WLAN nur punktuell',
          'Öffentlicher Mobilfunk (LTE / 5G)',
          'Eigenes Campusnetz',
          'Abschnitte ohne jede Abdeckung',
          'Unbekannt',
        ],
      },
      {
        id: 'l_it',
        type: 'text',
        label: 'Welche IT-Vorgaben gelten für das Gerät?',
        placeholder: 'z. B. keine Cloud, getrenntes Netz, kein Fernzugriff',
      },
      {
        id: 'u_laden',
        type: 'text',
        label: 'Wo könnte eine Ladestation stehen?',
        placeholder: 'geschützt, mit Stromanschluss und Funkabdeckung',
      },
      { id: 'x_sonst', type: 'long', label: 'Was haben wir nicht gefragt, sollten es aber wissen?' },
    ],
  },
]

export const SCALE_LABELS = ['unwichtig', 'eher unwichtig', 'mittel', 'wichtig', 'sehr wichtig']

const QUESTIONS = new Map<string, Question>(
  SECTIONS.flatMap((s) => s.questions.map((q) => [q.id, q] as const)),
)

export const QUESTION_COUNT = QUESTIONS.size
export const SECTION_IDS = new Set(SECTIONS.map((s) => s.id))

export type AnswerValue = string | string[]
export type Answers = Record<string, AnswerValue>

export const NOTE_SUFFIX = '__note'
export const MAX_TEXT = 8000

/**
 * Validates one answer. Returns the cleaned value, `null` to clear the answer,
 * or `undefined` when the key or value is not acceptable.
 */
export function cleanAnswer(key: string, value: unknown): AnswerValue | null | undefined {
  const isNote = key.endsWith(NOTE_SUFFIX)
  const q = QUESTIONS.get(isNote ? key.slice(0, -NOTE_SUFFIX.length) : key)
  if (!q) return undefined

  if (isNote || q.type === 'text' || q.type === 'long') {
    if (typeof value !== 'string') return undefined
    const text = value.slice(0, MAX_TEXT)
    return text.trim() ? text : null
  }
  if (q.type === 'single') {
    if (value === '' || value === null) return null
    return typeof value === 'string' && q.options!.includes(value) ? value : undefined
  }
  if (q.type === 'scale') {
    if (value === '' || value === null) return null
    return typeof value === 'string' && /^[1-5]$/.test(value) ? value : undefined
  }
  // multi
  if (!Array.isArray(value)) return undefined
  const picked = q.options!.filter((o) => value.includes(o))
  return picked.length ? picked : null
}

export function isAnswered(value: AnswerValue | undefined): boolean {
  if (value === undefined) return false
  return Array.isArray(value) ? value.length > 0 : value.trim().length > 0
}

/** Number of catalog questions (notes excluded) a person has answered. */
export function countAnswered(answers: Answers): number {
  let n = 0
  for (const id of QUESTIONS.keys()) if (isAnswered(answers[id])) n++
  return n
}

export function slugifyName(name: string): string {
  return name
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ß/g, 'ss')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

export const MEDIA_PREFIX = 'lhoist1/media/'
