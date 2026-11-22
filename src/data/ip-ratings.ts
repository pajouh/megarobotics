// Content for the IP ratings reference page at /ip-ratings (and /de/ip-ratings).
//
// A general explainer of the IP code (IEC 60529, in Europe EN 60529, in Germany
// DIN EN 60529 / VDE 0470-1), written to be linked from product and solution
// pages: every common rating has its own anchor (#ip54, #ip65, #ip67 …) and the
// interactive lab opens on any code via #decode-67.
//
// Figures follow IEC 60529 edition 2.2 (2013): probe sizes, water volumes,
// pressures and durations are the standard's test conditions. IP69K is ISO 20653
// (road vehicles), not IEC 60529. The NEMA table is NEMA's own one-way
// comparison (a NEMA type meets at least that IP code, not the other way round).
// Nothing here is a statement about a specific product's certification.

import type { Locale } from '@/i18n/config'
import { localize, type Localized } from '@/data/security-solution'

const L = (en: string, de: string) => ({ en, de })

export const SOLID_KEYS = ['X', '0', '1', '2', '3', '4', '5', '6'] as const
export const LIQUID_KEYS = ['X', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const

/** Ratings that have their own card and anchor on the page. */
export const COMMON_CODES = ['20', '44', '54', '55', '65', '66', '67', '68', '69'] as const

const content = {
  meta: {
    title: L(
      'IP ratings explained: IP65, IP67, IP68 and IP69K | MegaRobotics',
      'IP-Schutzarten erklärt: IP65, IP67, IP68, IP69K | MegaRobotics',
    ),
    description: L(
      'What every IP rating means: both digits, test conditions, IP54 to IP69K compared, common myths and an interactive decoder. Based on IEC 60529.',
      'Was jede IP-Schutzart bedeutet: beide Kennziffern, Prüfbedingungen, IP54 bis IP69K im Vergleich, Irrtümer und ein interaktiver Decoder. Nach DIN EN 60529.',
    ),
    headline: L('IP ratings explained: what every IP code means', 'IP-Schutzarten erklärt: was jeder IP-Code bedeutet'),
    crumb: L('IP ratings', 'IP-Schutzarten'),
    keywords: [
      'IP rating', 'IP code', 'ingress protection', 'IEC 60529', 'IP54', 'IP65', 'IP66', 'IP67', 'IP68', 'IP69K',
      'IP-Schutzart', 'Schutzart', 'DIN EN 60529',
    ],
  },

  hero: {
    eyebrow: L('Reference · IEC 60529', 'Nachschlagewerk · DIN EN 60529'),
    title: L('IP ratings, decoded', 'IP-Schutzarten, entschlüsselt'),
    lead: L(
      'Two digits tell you how well an enclosure keeps out fingers, tools, dust and water. This page explains every one of them, with the test behind each number.',
      'Zwei Ziffern sagen, wie gut ein Gehäuse Finger, Werkzeug, Staub und Wasser fernhält. Diese Seite erklärt jede davon, mit der Prüfung, die hinter der Zahl steht.',
    ),
    ctaLab: L('Open the decoder', 'Decoder öffnen'),
    ctaChart: L('Jump to the chart', 'Zur Übersicht'),
    cycleLabel: L('Example codes', 'Beispielcodes'),
    stats: [
      { value: L('7', '7'), label: L('levels against solids, 0 to 6', 'Stufen gegen Fremdkörper, 0 bis 6') },
      { value: L('10', '10'), label: L('levels against water, 0 to 9', 'Stufen gegen Wasser, 0 bis 9') },
      { value: L('1976', '1976'), label: L('first edition of the standard', 'erste Ausgabe der Norm') },
      { value: L('80 °C', '80 °C'), label: L('water in the IPX9 test', 'Wassertemperatur der IPX9-Prüfung') },
    ],
  },

  toc: {
    label: L('On this page', 'Auf dieser Seite'),
    items: [
      { href: '#anatomy', label: L('How to read a code', 'Code lesen') },
      { href: '#lab', label: L('Interactive decoder', 'Interaktiver Decoder') },
      { href: '#solids', label: L('First digit', 'Erste Kennziffer') },
      { href: '#water', label: L('Second digit', 'Zweite Kennziffer') },
      { href: '#common', label: L('Common ratings', 'Häufige Schutzarten') },
      { href: '#advisor', label: L('Which rating do I need?', 'Welche Schutzart brauche ich?') },
      { href: '#myths', label: L('Myths', 'Irrtümer') },
      { href: '#letters', label: L('Letters', 'Buchstaben') },
      { href: '#nema', label: L('IP vs NEMA', 'IP und NEMA') },
      { href: '#faq', label: L('FAQ', 'FAQ') },
    ],
  },

  anatomy: {
    eyebrow: L('How to read a code', 'So liest man den Code'),
    title: L('Four parts, two of them always there', 'Vier Teile, zwei davon immer vorhanden'),
    body: L(
      'IP stands for International Protection, often read as Ingress Protection. The code is defined in IEC 60529 and published in Europe as EN 60529. The two digits are independent: the first rates solids, the second rates water. A higher digit is not a quality score, it names a specific test the enclosure has passed.',
      'IP steht für International Protection, oft als Ingress Protection gelesen. Der Code ist in IEC 60529 festgelegt und in Deutschland als DIN EN 60529 (VDE 0470-1) veröffentlicht. Die beiden Kennziffern sind voneinander unabhängig: Die erste bewertet Fremdkörper, die zweite Wasser. Eine höhere Ziffer ist keine Qualitätsnote, sie benennt eine bestimmte Prüfung, die das Gehäuse bestanden hat.',
    ),
    parts: [
      {
        token: 'IP',
        name: L('Code letters', 'Code-Buchstaben'),
        body: L('Always the same two letters. No hyphen follows them: “IP-67” is not a valid code.', 'Immer dieselben zwei Buchstaben. Danach folgt kein Bindestrich: „IP-67“ ist kein gültiger Code.'),
      },
      {
        token: '6',
        name: L('First digit: solids', 'Erste Kennziffer: Fremdkörper'),
        body: L('0 to 6. Protection of people against touching hazardous parts, and of the equipment against solid objects and dust.', '0 bis 6. Schutz von Personen gegen das Berühren gefährlicher Teile und des Geräts gegen feste Fremdkörper und Staub.'),
      },
      {
        token: '7',
        name: L('Second digit: water', 'Zweite Kennziffer: Wasser'),
        body: L('0 to 9. Protection against harmful ingress of water, from drips to hot high-pressure jets.', '0 bis 9. Schutz gegen schädliches Eindringen von Wasser, vom Tropfen bis zum heißen Hochdruckstrahl.'),
      },
      {
        token: 'M',
        name: L('Optional letters', 'Optionale Buchstaben'),
        body: L('An additional letter (A to D) and a supplementary letter (H, M, S, W) can follow. Most products carry none.', 'Ein zusätzlicher Buchstabe (A bis D) und ein ergänzender Buchstabe (H, M, S, W) können folgen. Die meisten Produkte tragen keinen.'),
      },
    ],
    xNote: L(
      'An X in place of a digit means that characteristic was not tested or is not stated. IPX7 says nothing about dust, it does not mean “no dust protection”.',
      'Ein X anstelle einer Ziffer heißt: Diese Eigenschaft wurde nicht geprüft oder nicht angegeben. IPX7 sagt nichts über Staub aus und bedeutet nicht „kein Staubschutz“.',
    ),
  },

  lab: {
    eyebrow: L('Interactive decoder', 'Interaktiver Decoder'),
    title: L('Build any IP code and watch its test', 'Beliebigen IP-Code bauen und die Prüfung ansehen'),
    subtitle: L(
      'Change the digits. The simulation shows what the first digit keeps out and the water test behind the second digit.',
      'Ändern Sie die Ziffern. Die Simulation zeigt, was die erste Kennziffer abhält, und die Wasserprüfung hinter der zweiten.',
    ),
    solidLabel: L('First digit · solids', 'Erste Kennziffer · Fremdkörper'),
    liquidLabel: L('Second digit · water', 'Zweite Kennziffer · Wasser'),
    up: L('Higher', 'Höher'),
    down: L('Lower', 'Niedriger'),
    meansLabel: L('What it means', 'Was es bedeutet'),
    testLabel: L('How it is tested', 'Wie geprüft wird'),
    quickLabel: L('Common ratings', 'Häufige Schutzarten'),
    matrixTitle: L('All 70 digit combinations', 'Alle 70 Ziffernkombinationen'),
    matrixLead: L(
      'Rows are the first digit, columns the second. Highlighted cells are the ratings you meet most often. Click any cell to decode it.',
      'Zeilen sind die erste Kennziffer, Spalten die zweite. Hervorgehoben sind die Schutzarten, die am häufigsten vorkommen. Ein Klick auf eine Zelle entschlüsselt sie.',
    ),
    matrixRow: L('Solids', 'Fremdkörper'),
    matrixCol: L('Water', 'Wasser'),
    legendBlocked: L('kept out', 'abgehalten'),
    legendIn: L('gets in', 'dringt ein'),
    legendWater: L('water test', 'Wasserprüfung'),
    pause: L('Pause simulation', 'Simulation anhalten'),
    play: L('Play simulation', 'Simulation starten'),
    copy: L('Copy link to this code', 'Link zu diesem Code kopieren'),
    copied: L('Link copied', 'Link kopiert'),
    simAlt: L('Animated simulation of the selected IP code', 'Animierte Simulation des gewählten IP-Codes'),
    details: L('Read the full entry', 'Zum vollständigen Eintrag'),
    solidClasses: [L('hand', 'Hand'), L('finger', 'Finger'), L('tool', 'Werkzeug'), L('wire', 'Draht'), L('dust', 'Staub')],
    untested: L('not rated', 'nicht bewertet'),
  },

  solids: {
    eyebrow: L('First digit', 'Erste Kennziffer'),
    title: L('Protection against solid objects and dust', 'Schutz gegen Fremdkörper und Staub'),
    subtitle: L(
      'The first digit does two jobs at once: it keeps people away from hazardous parts and keeps solid objects out of the equipment.',
      'Die erste Kennziffer leistet zwei Dinge zugleich: Sie hält Personen von gefährlichen Teilen fern und feste Fremdkörper aus dem Gerät.',
    ),
    cols: [L('Digit', 'Ziffer'), L('Protected against', 'Schutz gegen'), L('What that means', 'Was das bedeutet'), L('Test', 'Prüfung')],
    scaleTitle: L('The test probes, drawn to scale', 'Die Prüfsonden, maßstäblich gezeichnet'),
    scale: [
      { mm: 50, code: 'IP1X', label: L('Back of the hand · 50 mm', 'Handrücken · 50 mm') },
      { mm: 12.5, code: 'IP2X', label: L('Finger · 12.5 mm', 'Finger · 12,5 mm') },
      { mm: 2.5, code: 'IP3X', label: L('Tool · 2.5 mm', 'Werkzeug · 2,5 mm') },
      { mm: 1, code: 'IP4X', label: L('Wire · 1 mm', 'Draht · 1 mm') },
      { mm: 0, code: 'IP5X · IP6X', label: L('Dust · talcum powder', 'Staub · Talkumpuder') },
    ],
    items: {
      X: {
        name: L('Not rated', 'Nicht bewertet'),
        summary: L('solids not rated', 'Fremdkörperschutz nicht bewertet'),
        detail: L('No test result is stated for solids. The enclosure may or may not be protected.', 'Für Fremdkörper ist kein Prüfergebnis angegeben. Das Gehäuse kann geschützt sein oder nicht.'),
        test: L('None stated.', 'Keine angegeben.'),
      },
      '0': {
        name: L('No protection', 'Kein Schutz'),
        summary: L('no protection against solids', 'kein Schutz gegen Fremdkörper'),
        detail: L('No protection against contact or against solid objects.', 'Kein Schutz gegen Berührung oder gegen feste Fremdkörper.'),
        test: L('No test.', 'Keine Prüfung.'),
      },
      '1': {
        name: L('Objects ≥ 50 mm', 'Fremdkörper ≥ 50 mm'),
        summary: L('protected against objects of 50 mm and larger', 'geschützt gegen Fremdkörper ab 50 mm'),
        detail: L('Keeps out large body surfaces such as the back of a hand. No protection against deliberate access with a finger.', 'Hält große Körperflächen wie den Handrücken ab. Kein Schutz gegen absichtliches Hineingreifen mit dem Finger.'),
        test: L('A rigid 50 mm sphere, pressed with 50 N, must not pass.', 'Eine starre Kugel mit 50 mm Durchmesser darf bei 50 N nicht eindringen.'),
      },
      '2': {
        name: L('Objects ≥ 12.5 mm', 'Fremdkörper ≥ 12,5 mm'),
        summary: L('protected against fingers and objects of 12.5 mm and larger', 'geschützt gegen Finger und Fremdkörper ab 12,5 mm'),
        detail: L('Finger-safe. The usual minimum for equipment indoors, for example inside control cabinets.', 'Fingersicher. Das übliche Minimum für Geräte in Innenräumen, etwa in Schaltschränken.'),
        test: L('A 12.5 mm sphere must not pass, and a jointed test finger (12 mm, 80 mm long) must stay clear of hazardous parts.', 'Eine 12,5-mm-Kugel darf nicht eindringen, und der gegliederte Prüffinger (12 mm, 80 mm lang) muss Abstand zu gefährlichen Teilen halten.'),
      },
      '3': {
        name: L('Objects ≥ 2.5 mm', 'Fremdkörper ≥ 2,5 mm'),
        summary: L('protected against tools and objects of 2.5 mm and larger', 'geschützt gegen Werkzeug und Fremdkörper ab 2,5 mm'),
        detail: L('Keeps out tools, thick wires and similar objects.', 'Hält Werkzeuge, dicke Drähte und Ähnliches ab.'),
        test: L('A rigid 2.5 mm rod, pressed with 3 N, must not pass.', 'Ein starrer Stab mit 2,5 mm Durchmesser darf bei 3 N nicht eindringen.'),
      },
      '4': {
        name: L('Objects ≥ 1 mm', 'Fremdkörper ≥ 1 mm'),
        summary: L('protected against wires and objects of 1 mm and larger', 'geschützt gegen Drähte und Fremdkörper ab 1 mm'),
        detail: L('Keeps out most wires, slender screws and small insects. Fine dust still gets in.', 'Hält die meisten Drähte, dünne Schrauben und kleine Insekten ab. Feiner Staub dringt weiterhin ein.'),
        test: L('A rigid 1 mm wire, pressed with 1 N, must not pass.', 'Ein starrer Draht mit 1 mm Durchmesser darf bei 1 N nicht eindringen.'),
      },
      '5': {
        name: L('Dust-protected', 'Staubgeschützt'),
        summary: L('dust-protected', 'staubgeschützt'),
        detail: L('Dust may enter, but not in an amount that interferes with operation or safety. Full protection against contact.', 'Staub darf eindringen, aber nicht in einer Menge, die Betrieb oder Sicherheit beeinträchtigt. Vollständiger Berührungsschutz.'),
        test: L('Dust chamber with circulating talcum powder, up to 8 hours, with or without the enclosure under vacuum, depending on its type.', 'Staubkammer mit umgewälztem Talkumpuder, bis zu 8 Stunden, je nach Gehäuseart mit oder ohne Unterdruck im Gehäuse.'),
      },
      '6': {
        name: L('Dust-tight', 'Staubdicht'),
        summary: L('dust-tight', 'staubdicht'),
        detail: L('No dust enters at all. Full protection against contact. The highest level for solids.', 'Es dringt kein Staub ein. Vollständiger Berührungsschutz. Die höchste Stufe für Fremdkörper.'),
        test: L('Dust chamber with talcum powder and the enclosure under vacuum, up to 8 hours. No dust may be found inside.', 'Staubkammer mit Talkumpuder und Unterdruck im Gehäuse, bis zu 8 Stunden. Im Inneren darf kein Staub zu finden sein.'),
      },
    },
  },

  water: {
    eyebrow: L('Second digit', 'Zweite Kennziffer'),
    title: L('Protection against water', 'Schutz gegen Wasser'),
    subtitle: L(
      'Levels 1 to 6 build on each other. From 7 upward they do not: immersion and jets are different tests, so IPX7 or IPX8 does not include IPX5 or IPX6.',
      'Die Stufen 1 bis 6 bauen aufeinander auf. Ab 7 gilt das nicht mehr: Untertauchen und Strahlwasser sind unterschiedliche Prüfungen, IPX7 oder IPX8 schließt IPX5 oder IPX6 also nicht ein.',
    ),
    cols: [L('Digit', 'Ziffer'), L('Protected against', 'Schutz gegen'), L('What that means', 'Was das bedeutet'), L('Test conditions', 'Prüfbedingungen')],
    items: {
      X: {
        name: L('Not rated', 'Nicht bewertet'),
        summary: L('water not rated', 'Wasserschutz nicht bewertet'),
        detail: L('No test result is stated for water.', 'Für Wasser ist kein Prüfergebnis angegeben.'),
        test: L('None stated.', 'Keine angegeben.'),
        sim: L('no water rating', 'keine Wasserbewertung'),
      },
      '0': {
        name: L('No protection', 'Kein Schutz'),
        summary: L('no protection against water', 'kein Schutz gegen Wasser'),
        detail: L('No protection against water. For dry indoor locations only.', 'Kein Schutz gegen Wasser. Nur für trockene Innenräume.'),
        test: L('No test.', 'Keine Prüfung.'),
        sim: L('no protection: water gets in', 'kein Schutz: Wasser dringt ein'),
      },
      '1': {
        name: L('Dripping water', 'Tropfwasser'),
        summary: L('protected against vertically dripping water', 'geschützt gegen senkrecht fallendes Tropfwasser'),
        detail: L('Vertically falling drops, such as condensation dripping from above, cause no harm.', 'Senkrecht fallende Tropfen, etwa Kondenswasser von oben, richten keinen Schaden an.'),
        test: L('Drip box, 1 mm of water per minute, 10 minutes, enclosure upright on a turntable.', 'Tropfkasten, 1 mm Wasser pro Minute, 10 Minuten, Gehäuse aufrecht auf einem Drehtisch.'),
        sim: L('drip box · 1 mm/min · 10 min', 'Tropfkasten · 1 mm/min · 10 min'),
      },
      '2': {
        name: L('Dripping water, tilted 15°', 'Tropfwasser bei 15° Neigung'),
        summary: L('protected against dripping water when tilted up to 15°', 'geschützt gegen Tropfwasser bei bis zu 15° Neigung'),
        detail: L('Dripping water causes no harm even when the enclosure is tilted up to 15° from its normal position.', 'Tropfwasser richtet auch dann keinen Schaden an, wenn das Gehäuse bis zu 15° aus der Normallage geneigt ist.'),
        test: L('Drip box, 3 mm of water per minute, 2.5 minutes in each of four tilted positions.', 'Tropfkasten, 3 mm Wasser pro Minute, je 2,5 Minuten in vier geneigten Lagen.'),
        sim: L('drip box · 15° tilt · 3 mm/min', 'Tropfkasten · 15° Neigung · 3 mm/min'),
      },
      '3': {
        name: L('Spraying water', 'Sprühwasser'),
        summary: L('protected against spraying water', 'geschützt gegen Sprühwasser'),
        detail: L('Water sprayed at any angle up to 60° from the vertical causes no harm. Roughly: rain.', 'Wasser, das in einem Winkel bis 60° zur Senkrechten gesprüht wird, richtet keinen Schaden an. Vereinfacht: Regen.'),
        test: L('Oscillating tube, 10 minutes, or a spray nozzle with shield: 10 l/min at 50 to 150 kPa, at least 5 minutes.', 'Schwenkrohr, 10 Minuten, oder Brause mit Abschirmung: 10 l/min bei 50 bis 150 kPa, mindestens 5 Minuten.'),
        sim: L('spray up to 60° · 10 l/min', 'Sprühen bis 60° · 10 l/min'),
      },
      '4': {
        name: L('Splashing water', 'Spritzwasser'),
        summary: L('protected against splashing water from any direction', 'geschützt gegen Spritzwasser aus allen Richtungen'),
        detail: L('Water splashing against the enclosure from any direction causes no harm.', 'Wasser, das aus beliebiger Richtung gegen das Gehäuse spritzt, richtet keinen Schaden an.'),
        test: L('Oscillating tube through almost 360°, 10 minutes, or the spray nozzle without shield, at least 5 minutes.', 'Schwenkrohr über nahezu 360°, 10 Minuten, oder die Brause ohne Abschirmung, mindestens 5 Minuten.'),
        sim: L('splashing from all sides · 10 min', 'Spritzwasser allseitig · 10 min'),
      },
      '5': {
        name: L('Water jets', 'Strahlwasser'),
        summary: L('protected against water jets', 'geschützt gegen Strahlwasser'),
        detail: L('A jet of water from a nozzle, from any direction, causes no harm. Roughly: hosing down.', 'Ein Wasserstrahl aus einer Düse, aus beliebiger Richtung, richtet keinen Schaden an. Vereinfacht: Abspritzen mit dem Schlauch.'),
        test: L('6.3 mm nozzle, 12.5 l/min, from 2.5 to 3 m, 1 minute per m² of surface and at least 3 minutes.', 'Düse 6,3 mm, 12,5 l/min, aus 2,5 bis 3 m, 1 Minute je m² Oberfläche und mindestens 3 Minuten.'),
        sim: L('6.3 mm nozzle · 12.5 l/min · 3 m', 'Düse 6,3 mm · 12,5 l/min · 3 m'),
      },
      '6': {
        name: L('Powerful water jets', 'Starkes Strahlwasser'),
        summary: L('protected against powerful water jets', 'geschützt gegen starkes Strahlwasser'),
        detail: L('Powerful jets from any direction cause no harm. Roughly: heavy seas on deck or a fire hose.', 'Starke Wasserstrahlen aus beliebiger Richtung richten keinen Schaden an. Vereinfacht: schwere See an Deck oder ein Feuerwehrschlauch.'),
        test: L('12.5 mm nozzle, 100 l/min, from 2.5 to 3 m, 1 minute per m² of surface and at least 3 minutes.', 'Düse 12,5 mm, 100 l/min, aus 2,5 bis 3 m, 1 Minute je m² Oberfläche und mindestens 3 Minuten.'),
        sim: L('12.5 mm nozzle · 100 l/min · 3 m', 'Düse 12,5 mm · 100 l/min · 3 m'),
      },
      '7': {
        name: L('Temporary immersion', 'Zeitweiliges Untertauchen'),
        summary: L('protected against temporary immersion, 1 m for 30 minutes', 'geschützt bei zeitweiligem Untertauchen, 1 m für 30 Minuten'),
        detail: L('No harmful quantity of water enters when the enclosure is immersed for a limited time. It says nothing about water jets.', 'Beim zeitlich begrenzten Untertauchen dringt kein Wasser in schädlicher Menge ein. Über Strahlwasser sagt das nichts aus.'),
        test: L('30 minutes under water, lowest point 1 m below the surface (tall enclosures: top at least 0.15 m below).', '30 Minuten unter Wasser, tiefster Punkt 1 m unter der Oberfläche (hohe Gehäuse: Oberkante mindestens 0,15 m darunter).'),
        sim: L('immersion · 1 m · 30 min', 'Untertauchen · 1 m · 30 min'),
      },
      '8': {
        name: L('Continuous immersion', 'Dauerndes Untertauchen'),
        summary: L('protected against continuous immersion under conditions the manufacturer specifies', 'geschützt bei dauerndem Untertauchen unter vom Hersteller genannten Bedingungen'),
        detail: L('Suitable for continuous immersion. Depth and time are not fixed by the standard: the manufacturer must state them, and they must be more severe than for IPX7.', 'Geeignet für dauerndes Untertauchen. Tiefe und Dauer legt die Norm nicht fest: Der Hersteller muss sie nennen, und sie müssen strenger sein als bei IPX7.'),
        test: L('Agreed between manufacturer and user. Always ask for the depth and the duration behind an IP68 claim.', 'Zwischen Hersteller und Anwender vereinbart. Fragen Sie bei IP68 immer nach Tiefe und Dauer.'),
        sim: L('continuous immersion · depth per manufacturer', 'Dauerndes Untertauchen · Tiefe laut Hersteller'),
      },
      '9': {
        name: L('High-pressure, high-temperature jets', 'Hochdruck- und Dampfstrahlreinigung'),
        summary: L('protected against high-pressure, high-temperature water jets', 'geschützt gegen Wasser bei Hochdruck- und Dampfstrahlreinigung'),
        detail: L('Withstands close-range cleaning with hot water at high pressure, as used in food processing and vehicle washdown.', 'Hält der Reinigung mit heißem Wasser unter hohem Druck aus kurzer Distanz stand, wie sie in der Lebensmittelverarbeitung und bei Fahrzeugen üblich ist.'),
        test: L('80 °C water at 80 to 100 bar, 14 to 16 l/min, from 0.10 to 0.15 m, 30 seconds from each of four angles on a turntable.', 'Wasser mit 80 °C bei 80 bis 100 bar, 14 bis 16 l/min, aus 0,10 bis 0,15 m, je 30 Sekunden aus vier Winkeln auf dem Drehtisch.'),
        sim: L('80 °C · 80–100 bar · 0.10–0.15 m', '80 °C · 80–100 bar · 0,10–0,15 m'),
      },
    },
  },

  common: {
    eyebrow: L('Common ratings', 'Häufige Schutzarten'),
    title: L('The nine IP ratings you meet most often', 'Die neun Schutzarten, die am häufigsten vorkommen'),
    subtitle: L(
      'What each one means in practice, where you typically find it, and where its limits are.',
      'Was jede in der Praxis bedeutet, wo man sie typischerweise findet und wo ihre Grenzen liegen.',
    ),
    usesLabel: L('Typical uses', 'Typische Anwendungen'),
    limitLabel: L('Keep in mind', 'Zu beachten'),
    decode: L('Decode', 'Entschlüsseln'),
    items: [
      {
        code: '20',
        tag: L('Finger-safe, dry rooms', 'Fingersicher, trockene Räume'),
        means: L('Fingers cannot reach hazardous parts. No protection against water at all.', 'Finger erreichen keine gefährlichen Teile. Keinerlei Schutz gegen Wasser.'),
        uses: L('Power supplies, terminals and devices inside control cabinets; office and lab equipment.', 'Netzteile, Klemmen und Geräte im Schaltschrank; Büro- und Laborgeräte.'),
        limit: L('Needs a dry, clean environment or an enclosure around it.', 'Braucht eine trockene, saubere Umgebung oder ein umgebendes Gehäuse.'),
      },
      {
        code: '44',
        tag: L('Splash-proof', 'Spritzwassergeschützt'),
        means: L('Keeps out objects over 1 mm and splashing water from any direction.', 'Hält Fremdkörper über 1 mm und Spritzwasser aus allen Richtungen ab.'),
        uses: L('Outdoor sockets under a roof, bathroom luminaires, small motors and pumps.', 'Außensteckdosen unter Dach, Badleuchten, kleine Motoren und Pumpen.'),
        limit: L('Not dust-protected and not for hosing down.', 'Nicht staubgeschützt und nicht zum Abspritzen geeignet.'),
      },
      {
        code: '54',
        tag: L('Dust-protected, splash-proof', 'Staub- und spritzwassergeschützt'),
        means: L('Dust cannot enter in harmful amounts; splashing water causes no harm.', 'Staub dringt nicht in schädlicher Menge ein; Spritzwasser richtet keinen Schaden an.'),
        uses: L('Industrial control cabinets, robot arms and controllers on the shop floor, power tools.', 'Industrielle Schaltschränke, Roboterarme und Steuerungen in der Fertigung, Elektrowerkzeuge.'),
        limit: L('The workhorse rating indoors. Not for water jets or permanent outdoor exposure.', 'Die Standard-Schutzart für die Halle. Nicht für Strahlwasser oder dauerhaften Außeneinsatz.'),
      },
      {
        code: '55',
        tag: L('Dust-protected, jet-proof', 'Staubgeschützt, strahlwassergeschützt'),
        means: L('Dust-protected, and withstands water jets from any direction.', 'Staubgeschützt und beständig gegen Strahlwasser aus allen Richtungen.'),
        uses: L('Outdoor enclosures, motors, charging stations, equipment that is hosed down occasionally.', 'Gehäuse im Freien, Motoren, Ladestationen, Geräte, die gelegentlich abgespritzt werden.'),
        limit: L('Some dust still gets in over time. For fine or conductive dust choose IP6X.', 'Etwas Staub dringt mit der Zeit ein. Bei feinem oder leitfähigem Staub besser IP6X.'),
      },
      {
        code: '65',
        tag: L('Dust-tight, jet-proof', 'Staubdicht, strahlwassergeschützt'),
        means: L('No dust enters, and water jets from any direction cause no harm.', 'Es dringt kein Staub ein, und Strahlwasser aus allen Richtungen richtet keinen Schaden an.'),
        uses: L('Sensors, operator panels, outdoor LED lighting, cameras, machine-mounted electronics.', 'Sensoren, Bedienpanels, LED-Außenbeleuchtung, Kameras, Elektronik direkt an der Maschine.'),
        limit: L('Not rated for immersion or for powerful jets.', 'Nicht für Untertauchen und nicht für starkes Strahlwasser bewertet.'),
      },
      {
        code: '66',
        tag: L('Dust-tight, heavy weather', 'Staubdicht, für raues Wetter'),
        means: L('Dust-tight, and withstands powerful water jets: 100 litres per minute in the test.', 'Staubdicht und beständig gegen starkes Strahlwasser: 100 Liter pro Minute in der Prüfung.'),
        uses: L('Outdoor cabinets, marine and offshore equipment, mobile robots for outdoor patrols.', 'Schaltschränke im Freien, Schiffs- und Offshore-Ausrüstung, mobile Roboter für Außenstreifen.'),
        limit: L('Jets yes, immersion no: IP66 says nothing about being under water.', 'Strahlwasser ja, Untertauchen nein: IP66 sagt nichts über den Betrieb unter Wasser.'),
      },
      {
        code: '67',
        tag: L('Dust-tight, survives a dunking', 'Staubdicht, übersteht Untertauchen'),
        means: L('Dust-tight, and protected when immersed 1 m deep for 30 minutes.', 'Staubdicht und geschützt beim Untertauchen in 1 m Tiefe für 30 Minuten.'),
        uses: L('M12 connectors, field sensors, smartphones, robots that cross puddles and flooded ground.', 'M12-Steckverbinder, Feldsensoren, Smartphones, Roboter, die Pfützen und überflutete Flächen queren.'),
        limit: L('Immersion is not a jet test. If it will be hosed down too, look for IP66/IP67.', 'Untertauchen ist keine Strahlwasserprüfung. Wird zusätzlich abgespritzt, auf IP66/IP67 achten.'),
      },
      {
        code: '68',
        tag: L('Dust-tight, continuous immersion', 'Staubdicht, dauerhaft unter Wasser'),
        means: L('Dust-tight, and suitable for continuous immersion under the conditions the manufacturer names.', 'Staubdicht und geeignet für dauerndes Untertauchen unter den vom Hersteller genannten Bedingungen.'),
        uses: L('Submersible pumps, underwater sensors and lights, cable glands, many smartphones.', 'Tauchpumpen, Unterwassersensoren und -leuchten, Kabelverschraubungen, viele Smartphones.'),
        limit: L('Without depth and duration the claim is incomplete: IP68 at 1.5 m for 30 minutes and IP68 at 10 m for a week are both “IP68”.', 'Ohne Tiefe und Dauer ist die Angabe unvollständig: IP68 bei 1,5 m für 30 Minuten und IP68 bei 10 m für eine Woche heißen beide „IP68“.'),
      },
      {
        code: '69',
        tag: L('Dust-tight, hot high-pressure washdown', 'Staubdicht, heißer Hochdruckstrahl'),
        means: L('Dust-tight, and withstands 80 °C water at 80 to 100 bar from close range. Often written IP69K.', 'Staubdicht und beständig gegen 80 °C heißes Wasser mit 80 bis 100 bar aus kurzer Distanz. Oft als IP69K geschrieben.'),
        uses: L('Food, beverage and pharmaceutical production, vehicle and construction equipment.', 'Lebensmittel-, Getränke- und Pharmaproduktion, Fahrzeuge und Baumaschinen.'),
        limit: L('Does not include immersion. Equipment for both carries a double rating such as IP68/IP69.', 'Schließt Untertauchen nicht ein. Geräte für beides tragen eine Doppelangabe wie IP68/IP69.'),
      },
    ],
  },

  advisor: {
    eyebrow: L('Selection help', 'Auswahlhilfe'),
    title: L('Which IP rating do I need?', 'Welche Schutzart brauche ich?'),
    subtitle: L(
      'Pick the harshest condition the equipment will actually see. The result is a minimum, not a specification.',
      'Wählen Sie die härteste Bedingung, der das Gerät tatsächlich ausgesetzt ist. Das Ergebnis ist ein Minimum, keine Spezifikation.',
    ),
    solidQ: L('Solids and dust', 'Fremdkörper und Staub'),
    waterQ: L('Water', 'Wasser'),
    extraQ: L('It is also hosed down or pressure-washed', 'Es wird zusätzlich abgespritzt oder hochdruckgereinigt'),
    resultLabel: L('Minimum rating', 'Mindest-Schutzart'),
    openLab: L('See it in the decoder', 'Im Decoder ansehen'),
    solidOptions: [
      { digit: '2', label: L('Clean indoor space, people nearby', 'Sauberer Innenraum, Personen in der Nähe') },
      { digit: '4', label: L('Small parts, wires, insects', 'Kleinteile, Drähte, Insekten') },
      { digit: '5', label: L('Workshop or outdoor dust', 'Werkstatt- oder Außenstaub') },
      { digit: '6', label: L('Fine, abrasive or conductive dust', 'Feiner, abrasiver oder leitfähiger Staub') },
    ],
    waterOptions: [
      { digit: '0', label: L('Always dry', 'Immer trocken') },
      { digit: '2', label: L('Condensation, drips', 'Kondenswasser, Tropfen') },
      { digit: '4', label: L('Rain and splashes', 'Regen und Spritzer') },
      { digit: '5', label: L('Hosing down', 'Abspritzen mit dem Schlauch') },
      { digit: '6', label: L('Heavy jets, waves, storms', 'Starke Strahlen, Wellen, Sturm') },
      { digit: '7', label: L('May end up under water briefly', 'Kann kurz unter Wasser geraten') },
      { digit: '8', label: L('Works under water', 'Arbeitet unter Wasser') },
      { digit: '9', label: L('Hot high-pressure cleaning', 'Heiße Hochdruckreinigung') },
    ],
    notes: {
      dual: L(
        'Immersion and jets are separate tests. Ask for a double rating, written with a slash.',
        'Untertauchen und Strahlwasser sind getrennte Prüfungen. Verlangen Sie eine Doppelangabe mit Schrägstrich.',
      ),
      ip68: L(
        'For IP68, agree depth and duration with the manufacturer in writing.',
        'Vereinbaren Sie bei IP68 Tiefe und Dauer schriftlich mit dem Hersteller.',
      ),
      indoor: L(
        'With no water rating, the equipment belongs in a dry room or inside a rated enclosure.',
        'Ohne Wasserschutz gehört das Gerät in einen trockenen Raum oder in ein Gehäuse mit passender Schutzart.',
      ),
      general: L(
        'IP covers dust and fresh water only. Check chemicals, salt, UV, temperature and impact separately.',
        'IP deckt nur Staub und Süßwasser ab. Chemikalien, Salz, UV, Temperatur und Schlag sind gesondert zu prüfen.',
      ),
    },
  },

  myths: {
    eyebrow: L('Common mistakes', 'Häufige Irrtümer'),
    title: L('Six things people get wrong about IP ratings', 'Sechs Irrtümer rund um IP-Schutzarten'),
    mythLabel: L('Myth', 'Irrtum'),
    factLabel: L('Fact', 'Richtig ist'),
    items: [
      {
        myth: L('“IP68 is better than IP66 in every way.”', '„IP68 ist in jeder Hinsicht besser als IP66.“'),
        fact: L(
          'They are different tests. IP68 is about lying under still water, IP66 about powerful jets. A device can pass one and fail the other. Equipment that meets both is marked IP66/IP68.',
          'Es sind unterschiedliche Prüfungen. Bei IP68 geht es um ruhendes Wasser, bei IP66 um starke Strahlen. Ein Gerät kann die eine bestehen und an der anderen scheitern. Geräte, die beides erfüllen, tragen IP66/IP68.',
        ),
      },
      {
        myth: L('“IP67 means waterproof.”', '„IP67 heißt wasserdicht.“'),
        fact: L(
          'It means the enclosure passed 30 minutes at 1 m in fresh water, in new condition. The standard never uses the word waterproof.',
          'Es heißt, dass das Gehäuse im Neuzustand 30 Minuten in 1 m Tiefe in Süßwasser bestanden hat. Das Wort wasserdicht kommt in der Norm nicht vor.',
        ),
      },
      {
        myth: L('“IPX4 means no dust protection.”', '„IPX4 heißt: kein Staubschutz.“'),
        fact: L(
          'X means not tested or not stated. Zero would mean no protection. An IPX4 headphone may be quite dust-resistant, it just has no rating for it.',
          'X heißt nicht geprüft oder nicht angegeben. Erst die 0 bedeutet kein Schutz. Ein Kopfhörer mit IPX4 kann durchaus staubunempfindlich sein, er hat nur keine Bewertung dafür.',
        ),
      },
      {
        myth: L('“An IP rating covers salt water, oil and chemicals.”', '„Die Schutzart gilt auch für Salzwasser, Öl und Chemikalien.“'),
        fact: L(
          'Tests use fresh water. Salt water, coolants, oils, cleaning agents and solvents attack seals differently and need their own proof.',
          'Geprüft wird mit Süßwasser. Salzwasser, Kühlschmierstoffe, Öle, Reinigungsmittel und Lösemittel greifen Dichtungen anders an und brauchen einen eigenen Nachweis.',
        ),
      },
      {
        myth: L('“Once IP67, always IP67.”', '„Einmal IP67, immer IP67.“'),
        fact: L(
          'The rating describes a new, correctly assembled unit. Seals age, covers get opened, cable glands loosen and impacts deform housings.',
          'Die Schutzart beschreibt ein neues, korrekt montiertes Gerät. Dichtungen altern, Deckel werden geöffnet, Kabelverschraubungen lockern sich und Stöße verformen Gehäuse.',
        ),
      },
      {
        myth: L('“IP69 and IP69K are the same thing.”', '„IP69 und IP69K sind dasselbe.“'),
        fact: L(
          'Almost. IP69K comes from ISO 20653 for road vehicles; IEC 60529 added the equivalent test as IPX9 in 2013. The water test is essentially the same, the standard behind it is not.',
          'Fast. IP69K stammt aus ISO 20653 für Straßenfahrzeuge; IEC 60529 hat die entsprechende Prüfung 2013 als IPX9 aufgenommen. Die Wasserprüfung ist im Wesentlichen gleich, die Norm dahinter nicht.',
        ),
      },
    ],
  },

  letters: {
    eyebrow: L('Optional letters', 'Optionale Buchstaben'),
    title: L('The letters after the digits', 'Die Buchstaben hinter den Ziffern'),
    subtitle: L(
      'Rare on consumer products, more common on switchgear and machines.',
      'Bei Verbraucherprodukten selten, bei Schaltanlagen und Maschinen häufiger.',
    ),
    additionalTitle: L('Additional letter: access to hazardous parts', 'Zusätzlicher Buchstabe: Zugang zu gefährlichen Teilen'),
    additionalLead: L(
      'Used when people are better protected than the first digit says, or when the first digit is X. Example: IP1XB keeps out only 50 mm objects, but a finger still cannot touch live parts.',
      'Wird verwendet, wenn Personen besser geschützt sind, als die erste Kennziffer aussagt, oder wenn diese X ist. Beispiel: IP1XB hält nur Fremdkörper ab 50 mm ab, ein Finger erreicht spannungsführende Teile trotzdem nicht.',
    ),
    additional: [
      { letter: 'A', meaning: L('Back of the hand', 'Handrücken'), probe: L('50 mm sphere', 'Kugel 50 mm') },
      { letter: 'B', meaning: L('Finger', 'Finger'), probe: L('Test finger, 12 mm × 80 mm', 'Prüffinger 12 mm × 80 mm') },
      { letter: 'C', meaning: L('Tool', 'Werkzeug'), probe: L('Rod, 2.5 mm × 100 mm', 'Stab 2,5 mm × 100 mm') },
      { letter: 'D', meaning: L('Wire', 'Draht'), probe: L('Wire, 1.0 mm × 100 mm', 'Draht 1,0 mm × 100 mm') },
    ],
    supplementaryTitle: L('Supplementary letter: extra information', 'Ergänzender Buchstabe: Zusatzinformation'),
    supplementary: [
      { letter: 'H', meaning: L('High-voltage apparatus', 'Hochspannungsgeräte') },
      { letter: 'M', meaning: L('Water test done with moving parts running', 'Wasserprüfung bei laufenden beweglichen Teilen') },
      { letter: 'S', meaning: L('Water test done with moving parts at standstill', 'Wasserprüfung bei stillstehenden beweglichen Teilen') },
      { letter: 'W', meaning: L('Suitable for specified weather conditions', 'Geeignet für festgelegte Wetterbedingungen') },
    ],
    kNote: L(
      'The letter K (IP6K9K, IPX6K) belongs to ISO 20653 for road vehicles and is not part of IEC 60529.',
      'Der Buchstabe K (IP6K9K, IPX6K) gehört zu ISO 20653 für Straßenfahrzeuge und ist nicht Teil von IEC 60529.',
    ),
  },

  beyond: {
    eyebrow: L('Limits of the code', 'Grenzen des Codes'),
    title: L('What an IP rating does not tell you', 'Was eine Schutzart nicht aussagt'),
    items: [
      { icon: 'Hammer', title: L('Impact', 'Schlag'), body: L('Mechanical impact has its own code: IK00 to IK10 under IEC 62262.', 'Mechanische Schläge haben einen eigenen Code: IK00 bis IK10 nach IEC 62262.') },
      { icon: 'FlaskConical', title: L('Chemicals and corrosion', 'Chemikalien und Korrosion'), body: L('Salt spray, oils, coolants and cleaning agents are outside the scope.', 'Salznebel, Öle, Kühlschmierstoffe und Reinigungsmittel liegen außerhalb des Geltungsbereichs.') },
      { icon: 'Flame', title: L('Explosive atmospheres', 'Explosionsfähige Atmosphäre'), body: L('IP is not explosion protection. Ex zones need ATEX or IECEx certification.', 'IP ist kein Explosionsschutz. Ex-Zonen erfordern eine ATEX- oder IECEx-Zertifizierung.') },
      { icon: 'ThermometerSun', title: L('Temperature, UV, ice', 'Temperatur, UV, Eis'), body: L('Heat, cold, sunlight and icing are not tested.', 'Hitze, Kälte, Sonnenlicht und Vereisung werden nicht geprüft.') },
      { icon: 'Droplets', title: L('Condensation', 'Kondensation'), body: L('A sealed enclosure can still collect moisture from inside as it breathes with temperature.', 'Auch ein dichtes Gehäuse kann von innen Feuchte sammeln, wenn es mit der Temperatur atmet.') },
      { icon: 'Clock', title: L('Ageing', 'Alterung'), body: L('The test is done on a new unit. How long the seals last is a design and maintenance question.', 'Geprüft wird ein neues Gerät. Wie lange die Dichtungen halten, ist eine Frage von Konstruktion und Wartung.') },
    ],
  },

  nema: {
    eyebrow: L('North America', 'Nordamerika'),
    title: L('IP ratings and NEMA types', 'IP-Schutzarten und NEMA-Typen'),
    body: L(
      'In the United States enclosures are usually classified by NEMA 250 types. The two systems are not equivalent: NEMA types also cover things like corrosion, icing and gasket ageing. The table works in one direction only. A NEMA type meets at least the IP code shown; an IP code does not earn a NEMA type.',
      'In den USA werden Gehäuse meist nach den Typen der NEMA 250 eingestuft. Die beiden Systeme sind nicht gleichwertig: NEMA-Typen umfassen auch Punkte wie Korrosion, Vereisung und Dichtungsalterung. Die Tabelle gilt nur in eine Richtung. Ein NEMA-Typ erfüllt mindestens den genannten IP-Code; ein IP-Code begründet keinen NEMA-Typ.',
    ),
    cols: [L('NEMA type', 'NEMA-Typ'), L('Meets at least', 'Erfüllt mindestens'), L('Typical use', 'Typischer Einsatz')],
    rows: [
      { type: '1', ip: 'IP20', use: L('Indoor, general purpose', 'Innenraum, allgemein') },
      { type: '2', ip: 'IP22', use: L('Indoor, dripping water', 'Innenraum, Tropfwasser') },
      { type: '3R', ip: 'IP24', use: L('Outdoor, rain and sleet', 'Außen, Regen und Schneeregen') },
      { type: '3, 3S', ip: 'IP55', use: L('Outdoor, windblown dust and rain', 'Außen, Flugstaub und Regen') },
      { type: '4, 4X', ip: 'IP66', use: L('Hose-down; 4X adds corrosion resistance', 'Abspritzen; 4X zusätzlich korrosionsbeständig') },
      { type: '5', ip: 'IP53', use: L('Indoor, settling dust', 'Innenraum, sich absetzender Staub') },
      { type: '6', ip: 'IP67', use: L('Occasional temporary submersion', 'Gelegentliches kurzes Untertauchen') },
      { type: '6P', ip: 'IP68', use: L('Prolonged submersion', 'Längeres Untertauchen') },
      { type: '12, 12K, 13', ip: 'IP54', use: L('Indoor industrial: dust, drips, oil', 'Industrie innen: Staub, Tropfen, Öl') },
    ],
  },

  robots: {
    eyebrow: L('In robotics', 'In der Robotik'),
    title: L('Why IP ratings matter for robots', 'Warum Schutzarten bei Robotern zählen'),
    body: L(
      'A robot is an enclosure that moves. Joints, connectors and sensor windows are all places where dust and water try to get in, and the rating tells you where the machine can work: IP54 is usual for arms on a clean shop floor, IP65 and above for washdown and machine tending with coolant, IP66 or IP67 for mobile robots that patrol outdoors in rain.',
      'Ein Roboter ist ein Gehäuse, das sich bewegt. Gelenke, Steckverbinder und Sensorfenster sind Stellen, an denen Staub und Wasser eindringen wollen, und die Schutzart sagt, wo die Maschine arbeiten kann: IP54 ist üblich für Arme in einer sauberen Halle, IP65 und höher für Nassreinigung und Maschinenbeladung mit Kühlschmierstoff, IP66 oder IP67 für mobile Roboter, die im Regen draußen Streife gehen.',
    ),
    examplesLabel: L('Examples from our range', 'Beispiele aus unserem Programm'),
    examples: [
      { name: 'M40 · M40W · M40WS', code: 'IP66', href: '/products/m40', note: L('Compact inspection robots', 'Kompakte Inspektionsroboter') },
      { name: 'M1 · M1 Pro · M1 Ultra', code: 'IP67', href: '/products/m1-pro', note: L('Wheel-legged patrol robots', 'Rad-Bein-Streifenroboter') },
      { name: 'M100 · M100W · M100WS', code: 'IP67', href: '/products/m100ws', note: L('Heavy-duty carriers', 'Schwerlast-Träger') },
    ],
    examplesNote: L(
      'Ratings as stated in the product data, base configuration. The quotation confirms the exact scope.',
      'Schutzarten laut Produktdaten, Grundkonfiguration. Das Angebot bestätigt den genauen Umfang.',
    ),
    links: [
      { href: '/solutions/inspection-security', label: L('Inspection and security robots', 'Inspektions- und Sicherheitsroboter') },
      { href: '/products', label: L('All products', 'Alle Produkte') },
    ],
  },

  faq: {
    eyebrow: L('Questions', 'Fragen'),
    title: L('IP ratings: frequent questions', 'IP-Schutzarten: häufige Fragen'),
    items: [
      {
        q: L('What does IP stand for?', 'Wofür steht IP?'),
        a: L(
          'International Protection, as defined in IEC 60529. It is widely read as Ingress Protection, which describes the idea well: how far solids and water can get into an enclosure.',
          'Für International Protection nach IEC 60529. Verbreitet ist auch die Lesart Ingress Protection, die den Gedanken gut trifft: wie weit Fremdkörper und Wasser in ein Gehäuse eindringen können.',
        ),
      },
      {
        q: L('What is the difference between IP67 and IP68?', 'Was ist der Unterschied zwischen IP67 und IP68?'),
        a: L(
          'Both are dust-tight. IP67 is a fixed test: 1 m deep for 30 minutes. IP68 means continuous immersion under conditions the manufacturer specifies, which must be more severe than IP67. So IP68 is only meaningful together with a depth and a duration.',
          'Beide sind staubdicht. IP67 ist eine feste Prüfung: 1 m Tiefe für 30 Minuten. IP68 bedeutet dauerndes Untertauchen unter Bedingungen, die der Hersteller festlegt und die strenger sein müssen als bei IP67. IP68 ist daher nur zusammen mit Tiefe und Dauer aussagekräftig.',
        ),
      },
      {
        q: L('Is IP65 enough for outdoor use?', 'Reicht IP65 für den Außeneinsatz?'),
        a: L(
          'For rain, dust and occasional hosing down, yes. For storms with driving water, wave impact or pressure washing, look at IP66 or IP69. For places that can flood, IP67. Sunlight, frost and corrosion are separate questions the IP code does not answer.',
          'Für Regen, Staub und gelegentliches Abspritzen ja. Bei Sturm mit Schlagregen, Wellenschlag oder Hochdruckreinigung sind IP66 oder IP69 angebracht. Wo es überfluten kann, IP67. Sonnenlicht, Frost und Korrosion sind eigene Fragen, die der IP-Code nicht beantwortet.',
        ),
      },
      {
        q: L('What does the X in IPX7 mean?', 'Was bedeutet das X in IPX7?'),
        a: L(
          'That the first characteristic, protection against solids, was not tested or is not stated. It does not mean zero protection.',
          'Dass die erste Eigenschaft, der Schutz gegen Fremdkörper, nicht geprüft oder nicht angegeben wurde. Es bedeutet nicht null Schutz.',
        ),
      },
      {
        q: L('Does a higher second digit include all lower ones?', 'Schließt eine höhere zweite Kennziffer alle niedrigeren ein?'),
        a: L(
          'Up to 6, yes. From 7 on, no: IPX7 and IPX8 are immersion tests and IPX9 is a hot high-pressure test, and none of them automatically includes the jet tests IPX5 and IPX6. That is why you see double ratings such as IP66/IP68.',
          'Bis 6 ja. Ab 7 nicht mehr: IPX7 und IPX8 sind Tauchprüfungen, IPX9 ist eine Prüfung mit heißem Hochdruckstrahl, und keine davon schließt die Strahlwasserprüfungen IPX5 und IPX6 automatisch ein. Deshalb gibt es Doppelangaben wie IP66/IP68.',
        ),
      },
      {
        q: L('Who certifies an IP rating?', 'Wer bescheinigt eine Schutzart?'),
        a: L(
          'There is no central authority. The manufacturer declares the rating, based on its own tests or on a report from a test laboratory. For critical applications ask for the test report and which parts of the product it covers.',
          'Eine zentrale Stelle gibt es nicht. Der Hersteller erklärt die Schutzart, gestützt auf eigene Prüfungen oder den Bericht eines Prüflabors. Bei kritischen Anwendungen sollten Sie den Prüfbericht verlangen und klären, welche Teile des Produkts er abdeckt.',
        ),
      },
      {
        q: L('What is IP69K?', 'Was ist IP69K?'),
        a: L(
          'A rating from ISO 20653 for road vehicles: dust-tight and resistant to close-range jets of 80 °C water at 80 to 100 bar. IEC 60529 contains the equivalent water test as IPX9, so outside the vehicle industry the correct code is IP69.',
          'Eine Schutzart aus ISO 20653 für Straßenfahrzeuge: staubdicht und beständig gegen 80 °C heißes Wasser mit 80 bis 100 bar aus kurzer Distanz. IEC 60529 enthält die entsprechende Wasserprüfung als IPX9, außerhalb der Fahrzeugindustrie lautet der korrekte Code also IP69.',
        ),
      },
      {
        q: L('Is the IK code part of the IP rating?', 'Gehört der IK-Code zur Schutzart?'),
        a: L(
          'No. IK ratings (IK00 to IK10, IEC 62262) describe resistance to mechanical impact and are stated separately, for example IP66 IK10.',
          'Nein. IK-Angaben (IK00 bis IK10, IEC 62262) beschreiben die Schlagfestigkeit und werden getrennt angegeben, zum Beispiel IP66 IK10.',
        ),
      },
    ],
  },

  sources: {
    title: L('Standards behind this page', 'Normen hinter dieser Seite'),
    items: [
      L('IEC 60529, edition 2.2 (2013): Degrees of protection provided by enclosures (IP Code). In Europe EN 60529, in Germany DIN EN 60529 (VDE 0470-1).', 'IEC 60529, Ausgabe 2.2 (2013): Schutzarten durch Gehäuse (IP-Code). In Europa EN 60529, in Deutschland DIN EN 60529 (VDE 0470-1).'),
      L('ISO 20653: Road vehicles, degrees of protection (IP code). Source of the K ratings such as IP69K.', 'ISO 20653: Straßenfahrzeuge, Schutzarten (IP-Code). Quelle der K-Angaben wie IP69K.'),
      L('IEC 62262: Degrees of protection against external mechanical impacts (IK code).', 'IEC 62262: Schutzarten gegen äußere mechanische Beanspruchungen (IK-Code).'),
      L('NEMA 250: Enclosures for electrical equipment, with NEMA’s comparison to IEC 60529.', 'NEMA 250: Gehäuse für elektrische Betriebsmittel, mit dem NEMA-Vergleich zu IEC 60529.'),
    ],
    note: L(
      'This page is a plain-language summary for orientation. For design and procurement decisions the wording of the current standard applies.',
      'Diese Seite ist eine allgemeinverständliche Zusammenfassung zur Orientierung. Für Konstruktions- und Beschaffungsentscheidungen gilt der Wortlaut der aktuellen Norm.',
    ),
  },

  cta: {
    eyebrow: L('Your environment', 'Ihre Umgebung'),
    title: L('Not sure which rating your application needs?', 'Unsicher, welche Schutzart Ihre Anwendung braucht?'),
    body: L(
      'Tell us where the robot has to work: dust, water, cleaning, temperature. We tell you which models fit and where the limits are.',
      'Sagen Sie uns, wo der Roboter arbeiten soll: Staub, Wasser, Reinigung, Temperatur. Wir sagen Ihnen, welche Modelle passen und wo die Grenzen liegen.',
    ),
    button: L('Talk to us', 'Sprechen Sie uns an'),
  },
}

export type IpContent = Localized<typeof content>

export function getIpContent(locale: Locale): IpContent {
  return localize(content, locale)
}
