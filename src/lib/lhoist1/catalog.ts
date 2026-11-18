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
    id: 'prozess',
    title: 'Werk & Prozess',
    intro:
      'So haben wir Ihren Ablauf im Gespräch verstanden. Bitte korrigieren und ergänzen Sie, wo wir falsch liegen.',
    mediaHint: 'Hilfreich: Lageplan oder Luftbild des Werks, Übersichtsfotos der Bereiche.',
    questions: [
      {
        id: 'p_ablauf',
        type: 'long',
        label: 'Stimmt unsere Prozessbeschreibung? Was fehlt oder läuft anders?',
        hint: 'Kalkstein aus dem Steinbruch, per SKW zu den Bandanlagen, ins Werk, gewaschen, gebrochen und klassiert, weiterverarbeitet, Versand per LKW.',
      },
      {
        id: 'p_bereiche',
        type: 'multi',
        label: 'Welche Bereiche kommen für einen Inspektionsroboter grundsätzlich in Frage?',
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
        id: 'p_schicht',
        type: 'text',
        label: 'In welchem Schichtmodell läuft das Werk, und wann ist es am dünnsten besetzt?',
      },
      {
        id: 'p_groesse',
        type: 'text',
        label: 'Wie groß ist das Werksgelände ungefähr, und wie weit liegen die Bereiche auseinander?',
      },
    ],
  },
  {
    id: 'rundgang',
    title: 'Inspektionsrundgänge heute',
    intro: 'Die Rundgänge, die Ihre Mitarbeiter heute zu Fuß machen, sind der Maßstab für jede Route des Roboters.',
    mediaHint: 'Hilfreich: ein mit dem Handy gefilmter Rundgang, Fotos der Kontrollpunkte, eine Checkliste.',
    questions: [
      {
        id: 'r_liste',
        type: 'long',
        label: 'Welche regelmäßigen Rundgänge gibt es?',
        hint: 'Je Rundgang: Bereich, Strecke, Dauer, Häufigkeit, Anzahl der Personen.',
      },
      { id: 'r_zeit', type: 'text', label: 'Welcher Rundgang bindet heute die meiste Zeit?' },
      {
        id: 'r_pruef',
        type: 'multi',
        label: 'Was wird auf den Rundgängen kontrolliert?',
        options: [
          'Temperaturen (Lager, Motoren, Getriebe)',
          'Geräusche und Vibrationen',
          'Leckagen (Öl, Wasser, Luft)',
          'Staubaustritt',
          'Anzeigen, Manometer, Füllstände',
          'Bandlauf und Bandzustand',
          'Verschmutzung und Materialanbackungen',
          'Türen, Tore, Absperrungen',
        ],
      },
      {
        id: 'r_doku',
        type: 'single',
        label: 'Wie werden die Ergebnisse heute dokumentiert?',
        options: [
          'Papier oder Checkliste',
          'Tablet oder App',
          'Direkt im Leitsystem',
          'Im Instandhaltungssystem',
          'Mündlich oder gar nicht',
        ],
      },
      { id: 'r_luecke', type: 'long', label: 'Was fällt heute zu spät oder gar nicht auf?' },
    ],
  },
  {
    id: 'stoerung',
    title: 'Störungen & Außendienst',
    intro: 'Bei einer Meldung geht heute ein Außendienstmitarbeiter zur Stelle und sieht nach. Uns interessiert, wie oft und weshalb.',
    mediaHint: 'Hilfreich: Fotos typischer Störstellen, eine anonymisierte Störungsliste.',
    questions: [
      {
        id: 's_haeufig',
        type: 'text',
        label: 'Wie oft rückt ein Außendienstmitarbeiter wegen einer Meldung aus?',
        placeholder: 'z. B. pro Schicht oder pro Woche',
      },
      { id: 's_ursachen', type: 'long', label: 'Welches sind die häufigsten Anlässe?' },
      { id: 's_weg', type: 'text', label: 'Wie lange dauert es typischerweise, bis jemand vor Ort ist?' },
      {
        id: 's_fehl',
        type: 'text',
        label: 'Welcher Anteil dieser Einsätze stellt sich als Fehlalarm oder Kleinigkeit heraus?',
      },
      {
        id: 's_roboter',
        type: 'long',
        label: 'Bei welchen Meldungen würde es helfen, wenn zuerst ein Roboter hinfährt und Bild, Ton und Messwerte liefert?',
      },
    ],
  },
  {
    id: 'leitstand',
    title: 'Zentraler Leitstand & IT',
    intro: 'Im Leitstand laufen Prozessparameter und Kamerabilder zusammen. Dort sollen auch die Daten des Roboters ankommen.',
    mediaHint: 'Hilfreich: ein Foto der Leitstand-Arbeitsplätze, eine Übersicht der vorhandenen Systeme.',
    questions: [
      {
        id: 'l_system',
        type: 'text',
        label: 'Welches Prozessleitsystem und welches Kamerasystem nutzen Sie im Leitstand?',
      },
      {
        id: 'l_ziel',
        type: 'multi',
        label: 'Wohin sollen Messwerte, Bilder und Alarme des Roboters fließen?',
        options: [
          'Eigene Web-Oberfläche im Leitstand',
          'Einbindung ins Prozessleitsystem (z. B. OPC UA, Modbus, MQTT)',
          'Videobild ins bestehende Kamerasystem',
          'Störmeldung im Instandhaltungssystem',
          'E-Mail oder SMS an die Bereitschaft',
          'Noch offen',
        ],
      },
      {
        id: 'l_netz',
        type: 'multi',
        label: 'Welche Funkabdeckung gibt es entlang der möglichen Routen?',
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
        type: 'long',
        label: 'Welche IT-Vorgaben müssen wir kennen?',
        hint: 'z. B. Cloud-Nutzung, getrennte Netze, Fernzugriff, Freigabeprozess.',
      },
      {
        id: 'l_bedienung',
        type: 'text',
        label: 'Wer soll den Roboter im Alltag überwachen?',
        placeholder: 'z. B. Leitstand, Instandhaltung, Werkschutz',
      },
    ],
  },
  {
    id: 'band',
    title: 'Förderbänder & Tragrollen',
    intro: 'Eine Rolle kündigt ihren Ausfall meist durch Quietschen an. Der Roboter soll das entlang der Bänder am Geräusch erkennen.',
    mediaHint: 'Besonders hilfreich: ein kurzes Video oder eine Tonaufnahme einer quietschenden Rolle, dazu Fotos vom Laufsteg.',
    questions: [
      {
        id: 'b_umfang',
        type: 'long',
        label: 'Wie viele Bandanlagen gibt es, und wie lang sind sie insgesamt?',
        hint: 'Gern mit den Längen der wichtigsten Strecken. Grobe Zahlen reichen.',
      },
      {
        id: 'b_bauart',
        type: 'multi',
        label: 'Wie verlaufen die Bänder?',
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
        hint: 'Laufsteg ein- oder beidseitig, Breite, Gitterrost oder Beton, Treppen, Schutzgitter.',
      },
      { id: 'b_schaeden', type: 'text', label: 'Wie viele Tragrollen fallen pro Jahr ungefähr aus?' },
      { id: 'b_erkennung', type: 'long', label: 'Wie wird eine defekte Rolle heute erkannt, und wie früh?' },
      {
        id: 'b_folgen',
        type: 'long',
        label: 'Was passiert, wenn eine Rolle zu spät bemerkt wird?',
        hint: 'Bandschaden, Brandgefahr, Stillstand. Gern mit der Größenordnung der Kosten.',
      },
      {
        id: 'b_laerm',
        type: 'text',
        label: 'Wie laut ist die Umgebung an den Bändern, und aus welcher Entfernung hört man eine quietschende Rolle?',
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
    intro: 'Bei einem Rohrbruch steigt die Staubkonzentration in der Luft. Das soll erkannt und als Alarm gemeldet werden.',
    mediaHint: 'Hilfreich: Fotos oder Videos eines früheren Staubaustritts, Fotos der betroffenen Leitungen.',
    questions: [
      {
        id: 'd_wo',
        type: 'long',
        label: 'Wo treten Rohrbrüche oder Staubaustritte auf?',
        hint: 'Leitung, Medium, Innen- oder Außenbereich.',
      },
      { id: 'd_haeufig', type: 'text', label: 'Wie oft kommt das vor?' },
      {
        id: 'd_heute',
        type: 'long',
        label: 'Wie wird ein Staubaustritt heute bemerkt, und wie viel Zeit vergeht bis dahin?',
      },
      {
        id: 'd_sensor',
        type: 'single',
        label: 'Gibt es in diesen Bereichen bereits fest installierte Staub- oder Drucksensoren?',
        options: ['Ja, flächendeckend', 'Ja, punktuell', 'Nein', 'Unklar'],
      },
      { id: 'd_reaktion', type: 'text', label: 'Wie schnell muss der Alarm im Leitstand ankommen?' },
      {
        id: 'd_alarm',
        type: 'multi',
        label: 'Was soll bei erhöhter Staubkonzentration passieren?',
        options: [
          'Alarm im Leitstand',
          'Livebild der Stelle',
          'Messwert mit Ort und Uhrzeit',
          'Meldung an die Bereitschaft',
          'Automatische Kontrollfahrt zur Stelle',
        ],
      },
      {
        id: 'd_sicht',
        type: 'text',
        label: 'Wie sind Licht und Sicht in diesen Bereichen?',
        placeholder: 'z. B. beleuchtet, dunkel, dauerhaft staubig',
      },
    ],
  },
  {
    id: 'zaun',
    title: 'Zaun & Werksgelände',
    intro: 'Die Zauninspektion soll zeigen, ob Unbefugte das Gelände betreten haben.',
    mediaHint: 'Hilfreich: Fotos typischer Zaunabschnitte und des Wegs entlang des Zauns, ein Lageplan mit dem Zaunverlauf.',
    questions: [
      { id: 'z_laenge', type: 'text', label: 'Wie lang ist der Werkszaun, und welche Abschnitte sind kritisch?' },
      {
        id: 'z_weg',
        type: 'long',
        label: 'Wie ist der Weg entlang des Zauns beschaffen?',
        hint: 'Befestigt, Schotter, Wiese, Böschung, Bewuchs, Steigungen.',
      },
      {
        id: 'z_vorfaelle',
        type: 'text',
        label: 'Wie oft gab es in den letzten Jahren unbefugtes Betreten oder Diebstahl?',
      },
      {
        id: 'z_heute',
        type: 'multi',
        label: 'Wie wird das Gelände heute gesichert?',
        options: ['Wachdienst vor Ort', 'Streifenfahrten', 'Feste Kameras', 'Zaunsensorik', 'Keine besondere Sicherung'],
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
      { id: 'z_reaktion', type: 'text', label: 'An wen geht der Alarm, und was passiert dann?' },
      {
        id: 'z_datenschutz',
        type: 'long',
        label: 'Gibt es Vorgaben von Betriebsrat oder Datenschutz zu Videoaufnahmen auf dem Gelände?',
      },
    ],
  },
  {
    id: 'umgebung',
    title: 'Strecke & Umgebung',
    intro: 'Stufen, Staub, Nässe und Hitze entscheiden, welche Plattform in Frage kommt. Hier zählen Maße und Fotos mehr als Beschreibungen.',
    mediaHint: 'Besonders hilfreich: Fotos von Treppen, Gitterrosten, Engstellen und Türen, am besten mit Zollstock im Bild.',
    questions: [
      {
        id: 'u_hindernisse',
        type: 'long',
        label: 'Welche Stufen, Treppen, Roste, Rampen und Engstellen liegen auf den Routen?',
        hint: 'Wenn möglich mit Maßen: Stufenhöhe, Treppenneigung, schmalste Durchgangsbreite.',
      },
      { id: 'u_tueren', type: 'text', label: 'Müssen Türen, Tore oder Aufzüge passiert werden?' },
      {
        id: 'u_ex',
        type: 'single',
        label: 'Gibt es eingestufte Ex-Zonen entlang der Routen?',
        options: YES_NO,
      },
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
        label: 'Welche Temperaturen treten an den heißesten und kältesten Punkten auf?',
      },
      {
        id: 'u_verkehr',
        type: 'long',
        label: 'Wo kreuzt die Route Fahrzeugverkehr (SKW, Radlader, LKW)?',
      },
      {
        id: 'u_laden',
        type: 'text',
        label: 'Wo könnte eine Ladestation stehen?',
        placeholder: 'geschützt, mit Stromanschluss und Funkabdeckung',
      },
    ],
  },
  {
    id: 'projekt',
    title: 'Prioritäten & Projekt',
    intro: 'Zum Schluss: Was ist Ihnen am wichtigsten, und wie soll es weitergehen?',
    mediaHint: 'Hier können Sie alles hochladen, was in keinen anderen Abschnitt passt.',
    questions: [
      { id: 'x_prio_rundgang', type: 'scale', label: 'Priorität: Inspektionsrundgänge in der Anlage' },
      { id: 'x_prio_band', type: 'scale', label: 'Priorität: Förderbänder und Tragrollen' },
      { id: 'x_prio_staub', type: 'scale', label: 'Priorität: Staub- und Rohrbrucherkennung' },
      { id: 'x_prio_zaun', type: 'scale', label: 'Priorität: Zaun- und Geländeinspektion' },
      { id: 'x_erfolg', type: 'long', label: 'Woran würden Sie einen erfolgreichen Test messen?' },
      {
        id: 'x_beteiligte',
        type: 'long',
        label: 'Wer muss intern eingebunden werden?',
        hint: 'z. B. Arbeitssicherheit, Betriebsrat, IT, Instandhaltung, Einkauf.',
      },
      {
        id: 'x_zeit',
        type: 'text',
        label: 'Welchen Zeitrahmen haben Sie für Begehung, Test und Entscheidung im Blick?',
      },
      { id: 'x_begehung', type: 'text', label: 'Welche Termine kommen für eine Begehung in Wülfrath in Frage?' },
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
const MAX_TEXT = 8000

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
