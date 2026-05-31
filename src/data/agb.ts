/**
 * Allgemeine Geschäftsbedingungen (AGB) — MEGAFORCE GmbH
 * Source: MEGAFORCE_GmbH_AGB_Mai2026.docx
 *
 * Static legal text. The German wording is authoritative — see § 12.3.
 * Edit cautiously; always keep this in sync with the signed PDF kept
 * by the company.
 */

export const AGB_VERSION = 'Mai 2026'
export const AGB_TITLE = 'Allgemeine Geschäftsbedingungen (AGB)'
export const AGB_SUBTITLE = 'der MEGAFORCE GmbH für den Verkauf von Produkten sowie die Erbringung von Werk- und Dienstleistungen'

export interface AgbItem {
  n: string
  text: string
}
export interface AgbSection {
  n: string
  title: string
  items: AgbItem[]
}

export const AGB_SECTIONS: AgbSection[] = [
  {
    n: '1',
    title: 'Geltungsbereich',
    items: [
      {
        n: '1.1',
        text:
          'Diese Allgemeinen Geschäftsbedingungen („AGB“) gelten für alle Geschäftsbeziehungen zwischen der MEGAFORCE GmbH, Wacholderweg 8, 41564 Kaarst („MegaForce“ – auftretend auch unter der Marke „MegaRobotics“) und ihren jeweiligen Kunden („Kunde“). Sie gelten nur, wenn der Kunde Unternehmer (§ 14 BGB), eine juristische Person des öffentlichen Rechts oder ein öffentlich-rechtliches Sondervermögen im Sinne des § 310 BGB ist.',
      },
      {
        n: '1.2',
        text:
          'Alle Angebote, Vereinbarungen, Lieferungen und Leistungen erfolgen ausschließlich auf Grundlage dieser AGB. Sie gelten stets ausschließlich; entgegenstehende oder von diesen AGB abweichende Bedingungen des Kunden werden hiermit ausdrücklich zurückgewiesen. Sie werden nur dann Vertragsbestandteil, wenn MegaForce ihrer Geltung im Einzelfall ausdrücklich in Textform zustimmt. Dies gilt auch dann, wenn MegaForce in Kenntnis solcher Bedingungen Leistungen vorbehaltlos erbringt.',
      },
      {
        n: '1.3',
        text:
          'Diese AGB gelten für jeden einzelnen Kauf-, Dienst- oder Werkvertrag („Kauf-/Dienst-/Werkvertrag“) zwischen MegaForce und dem Kunden.',
      },
      {
        n: '1.4',
        text: 'Diese AGB gelten auch für alle künftigen Verträge zwischen MegaForce und dem Kunden.',
      },
      {
        n: '1.5',
        text:
          'Rechtserhebliche Erklärungen des Kunden gegenüber MegaForce im Rahmen der Geschäftsbeziehung (z. B. Fristsetzungen, Mängelanzeigen, Rücktrittserklärungen) bedürfen zu ihrer Wirksamkeit mindestens der Textform. Auf das Textformerfordernis kann nur in (mindestens) Textform verzichtet werden.',
      },
    ],
  },
  {
    n: '2',
    title: 'Vertragsschluss, Leistungsumfang',
    items: [
      {
        n: '2.1',
        text:
          'Alle Angebote von MegaForce sind freibleibend und unverbindlich. Bestellungen des Kunden gelten erst mit Bestätigung oder Ausführung durch MegaForce als angenommen.',
      },
      {
        n: '2.2',
        text:
          'Der Umfang der Liefer- und Leistungspflichten von MegaForce bestimmt sich ausschließlich nach der Auftragsbestätigung von MegaForce oder ausdrücklichen abweichenden Vereinbarungen.',
      },
      {
        n: '2.3',
        text:
          'Soweit Angebote und Verträge einer Ausfuhrgenehmigung bedürfen (z. B. bei Embargos), stehen sie unter der aufschiebenden Bedingung der Erteilung dieser Genehmigung. Liefer- und Leistungspflichten können von der Genehmigung der zuständigen Exportkontrollbehörden (Deutschland, USA, andere Staaten) abhängig sein. Dies gilt insbesondere, da von MegaForce vertriebene Produkte von Herstellern und Vorlieferanten bezogen werden, deren Lieferfähigkeit ihrerseits exportkontrollrechtlichen Beschränkungen unterliegen kann.',
      },
    ],
  },
  {
    n: '3',
    title: 'Lieferung, Lieferfristen, Lieferverzug, Gefahrübergang',
    items: [
      { n: '3.1', text: 'Erfüllungsort ist, soweit nichts anderes vereinbart ist, der Sitz von MegaForce.' },
      {
        n: '3.2',
        text:
          'Liefertermine und -fristen sind nur verbindlich, wenn MegaForce sie ausdrücklich in Textform als verbindlich bestätigt hat.',
      },
      {
        n: '3.3',
        text:
          'Soweit nichts anderes vereinbart ist, erfolgt die Lieferung „FCA“ (Incoterms 2020) an einem von MegaForce bestimmten Ort in Deutschland; die konkrete Lieferadresse wird dem Kunden in der Auftragsbestätigung mitgeteilt. Die Produkte werden nach Wahl von MegaForce und auf Kosten des Kunden verpackt. Der Kunde ist verpflichtet, die Produkte innerhalb von fünf Werktagen nach Zugang der Bereitstellungsanzeige abzuholen oder durch einen Transportführer („Frachtführer“) abholen zu lassen. Die Lieferung gilt als bewirkt, sobald MegaForce die Produkte dem vom Kunden benannten Frachtführer übergeben hat. Die Gefahr geht auf den Kunden über, sobald die Produkte verladen und dem Frachtführer übergeben worden sind, auch bei vereinbarter Teilleistung hinsichtlich der jeweiligen Teilleistung; dies gilt unabhängig davon, ob weitere Leistungen (z. B. beim Kunden vor Ort) vereinbart sind. Andere Lieferungen (z. B. „DAP“ Incoterms 2020) erfolgen nur auf Wunsch und auf Kosten des Kunden und bedürfen einer ausdrücklichen Vereinbarung bei Auftragserteilung.',
      },
      {
        n: '3.4',
        text:
          'Kann MegaForce einen verbindlichen Liefertermin aus Gründen nicht einhalten, die MegaForce nicht zu vertreten hat, wird MegaForce den Kunden hierüber unverzüglich informieren und zugleich die voraussichtliche Verzögerung sowie einen neuen Liefertermin mitteilen. Ist die Leistung auch innerhalb der neuen Lieferfrist nicht bei einem Vorlieferanten von MegaForce verfügbar, ist MegaForce berechtigt, ganz oder teilweise vom Vertrag zurückzutreten. Gesetzliche Rechte des Kunden wegen verzögerter Lieferung bleiben unberührt.',
      },
      {
        n: '3.5',
        text:
          'Nachträgliche Änderungs- oder Ergänzungswünsche des Kunden verlängern die Lieferzeit in angemessenem Umfang. Gleiches gilt in Fällen höherer Gewalt gemäß Ziffer 3.9. MegaForce hat die vorgenannten Umstände auch dann nicht zu vertreten, wenn sie während eines bereits bestehenden Lieferverzugs eintreten.',
      },
      { n: '3.6', text: 'MegaForce ist zu Teillieferungen berechtigt, soweit dies dem Kunden zumutbar ist.' },
      {
        n: '3.7',
        text:
          'Befindet sich der Kunde im Annahmeverzug, verletzt er sonstige Mitwirkungspflichten oder verzögert sich die Leistung aus anderen, vom Kunden zu vertretenden Gründen, ist MegaForce unbeschadet ihrer sonstigen Rechte berechtigt, die Produkte auf Gefahr und Kosten des Kunden in angemessener Weise einzulagern und dem Kunden die Transport- und Lagerkosten in Rechnung zu stellen.',
      },
      {
        n: '3.8',
        text:
          'Soweit eine Abnahme des Vertragsgegenstands zu erfolgen hat, gilt diese als erteilt, wenn (i) die Lieferung und – soweit MegaForce hierzu vertraglich verpflichtet ist – die Installation abgeschlossen ist, (ii) MegaForce den Kunden hierauf unter Hinweis auf die fingierte Abnahme nach dieser Ziffer 3.8 hingewiesen und ihn zur Abnahme aufgefordert hat, (iii) seit Lieferung oder Installation vierzehn Werktage verstrichen sind oder der Kunde den Vertragsgegenstand bereits in Gebrauch genommen hat (z. B. in Betrieb genommen hat) und in diesem Fall seit Lieferung oder Installation sechs Werktage verstrichen sind, und (iv) der Kunde die Abnahme innerhalb dieses Zeitraums nicht unter Angabe wesentlicher Mängel verweigert hat.',
      },
      {
        n: '3.9',
        text:
          'Beruht die Nichtlieferung oder Nichteinhaltung eines vereinbarten Liefer- oder Leistungstermins – auch während eines Verzugs – auf höherer Gewalt (z. B. Krieg, Sabotage, Naturkatastrophen, Epidemien, Pandemien, Betriebsstörungen, Feuer, Überschwemmungen, Unwetter, Streiks, Aussperrungen, politische Maßnahmen oder behördliche Anordnungen, Embargos, Zölle, weltweite Transportprobleme, Roh- oder Vormaterialmangel oder Ausfall von Vorlieferanten usw.) oder auf sonstigen, von MegaForce nicht zu vertretenden Umständen, verlängert sich der Liefer-/Leistungstermin unter Berücksichtigung der durch die Ereignisse verursachten Verzögerung. Dies gilt auch, wenn diese Umstände bei Vorlieferanten von MegaForce oder deren Vorlieferanten eintreten. Führt eine solche Störung zu einer Leistungsverzögerung von mehr als vier Monaten, sind beide Parteien zum Rücktritt berechtigt, der Kunde jedoch erst nach Setzung einer angemessenen Nachfrist zur Lieferung. Gesetzliche Rücktrittsrechte bleiben unberührt.',
      },
    ],
  },
  {
    n: '4',
    title: 'Preise, Zahlungsbedingungen, Zahlungsverzug, Leistungsverweigerung',
    items: [
      {
        n: '4.1',
        text:
          'Soweit nichts anderes vereinbart ist, verstehen sich alle Preise auf Basis „FCA“ (Incoterms 2020) an dem dem Kunden mitgeteilten Ort, zuzüglich etwaiger Nebenkosten (z. B. Verpackung), der am Rechnungstag geltenden Umsatzsteuer sowie sonstiger Steuern, Abgaben und Zölle.',
      },
      {
        n: '4.2',
        text:
          'Erhöhen sich zwischen Vertragsschluss und Leistungszeitpunkt die Kosten infolge einer Änderung des Marktpreises von Rohstoffen, der Kosten von Zukaufteilen, der Personalkosten oder der Entgelte beteiligter Dritter um mehr als 5 %, kann MegaForce einen entsprechend höheren Preis verlangen. Beträgt die Erhöhung 20 % oder mehr gegenüber dem vereinbarten Preis, hat der Kunde das Recht, vom Vertrag zurückzutreten; dieses Recht kann nur unverzüglich nach Mitteilung des erhöhten Preises ausgeübt werden. Bei einer Verringerung der genannten Kosten um mehr als 5 % gibt MegaForce dies entsprechend im Preis weiter.',
      },
      {
        n: '4.3',
        text:
          'Soweit nichts anderes vereinbart ist, sind Zahlungen innerhalb von 14 Tagen ab Rechnungsdatum ohne Abzug und durch Überweisung auf das von MegaForce angegebene Konto zu leisten. Für die Rechtzeitigkeit der Zahlung kommt es auf den Zahlungseingang an. Erfolgt die Zahlung nicht innerhalb der maßgeblichen Zahlungsfrist, gerät der Kunde ohne weitere Mahnung in Verzug. Während des Verzugs wird der ausstehende Betrag mit dem gesetzlichen Verzugszinssatz verzinst. Die Geltendmachung weiteren Verzugsschadens und gesetzlicher Ansprüche bleibt vorbehalten.',
      },
      {
        n: '4.4',
        text:
          'Bei Zahlungsverzug ist MegaForce ferner berechtigt, die weitere Erbringung von Lieferungen und Leistungen (einschließlich fälliger Teillieferungen und Teilleistungen) zurückzuhalten und von der Zahlung sämtlicher offener Posten durch den Kunden abhängig zu machen, bei zuvor vereinbarten Teilzahlungen die gesamte Restschuld fällig zu stellen sowie generell auf Vorkasse umzustellen und/oder Sicherheiten zu verlangen; MegaForce ist zudem nicht verpflichtet, weitere Maßnahmen zur Einhaltung etwaiger Liefertermine und -mengen zu treffen (z. B. Beschaffung, Produktionsvorbereitung usw.).',
      },
      {
        n: '4.5',
        text:
          'Ein Leistungsverweigerungs-, Zurückbehaltungs- oder Aufrechnungsrecht steht dem Kunden nur mit Gegenansprüchen aus demselben Vertragsverhältnis zu, die rechtskräftig festgestellt, entscheidungsreif oder von MegaForce anerkannt sind.',
      },
    ],
  },
  {
    n: '5',
    title: 'Eigentumsvorbehalt',
    items: [
      {
        n: '5.1',
        text:
          'MegaForce bleibt Eigentümerin des Vertragsgegenstands („Vorbehaltsware“), bis alle bestehenden oder künftigen Forderungen (einschließlich Kontokorrentsaldoforderungen) von MegaForce gegen den Kunden beglichen sind. Dies gilt auch für alle künftigen Lieferungen, auch wenn MegaForce sich hierauf nicht stets ausdrücklich beruft.',
      },
      {
        n: '5.2',
        text:
          'Solange das Eigentum noch nicht auf den Kunden übergegangen ist, ist der Kunde verpflichtet, die Vorbehaltsware pfleglich zu behandeln und erforderliche Wartungs- und Inspektionsarbeiten rechtzeitig auf eigene Kosten durchzuführen. Der Kunde ist verpflichtet, die Vorbehaltsware auf eigene Kosten gegen versicherbare Schäden zu versichern, und tritt seine Ansprüche auf etwaige Versicherungsleistungen in Höhe des Auftragspreises sicherungshalber an MegaForce ab. MegaForce nimmt diese Abtretung an.',
      },
      {
        n: '5.3',
        text:
          'Der Kunde ist berechtigt, die Vorbehaltsware im ordentlichen Geschäftsgang weiterzuveräußern, solange er sich nicht in Zahlungsverzug befindet. Der Kunde tritt bereits jetzt die ihm aus der Weiterveräußerung gegen seinen Abnehmer zustehenden Forderungen an MegaForce ab. MegaForce nimmt diese Abtretung an. Im Falle der Verarbeitung steht MegaForce ein Miteigentumsanteil am verarbeiteten Erzeugnis entsprechend dem Wert ihres Vorbehaltseigentums zu.',
      },
      {
        n: '5.4',
        text:
          'Der Kunde ist ermächtigt, die abgetretenen Forderungen für Rechnung und im eigenen Namen treuhänderisch für MegaForce einzuziehen, solange MegaForce diese Ermächtigung nicht widerruft und der Kunde seinen Zahlungspflichten ordnungsgemäß nachkommt. Auf Verlangen von MegaForce hat der Kunde die Schuldner der abgetretenen Forderungen zu benennen.',
      },
      {
        n: '5.5',
        text:
          'Bei Vertragsverletzung durch den Kunde, insbesondere bei Zahlungsverzug, ist der Kunde verpflichtet, die Schuldner der abgetretenen Forderungen auf eigene Kosten von der Abtretung zu unterrichten und MegaForce alle zur Forderungsdurchsetzung erforderlichen Unterlagen und Informationen herauszugeben. Der Kunde hat MegaForce unverzüglich zu unterrichten, wenn ein Insolvenzantrag über sein Vermögen gestellt wird oder Dritte auf die Vorbehaltsware zugreifen (z. B. Pfändungen, Beschlagnahmen). Die Kosten einer Intervention von MegaForce trägt der Kunde.',
      },
      {
        n: '5.6',
        text:
          'Bei Vertragsverletzung durch den Kunde, insbesondere bei Zahlungsverzug, ist MegaForce nach Mahnung und Setzung einer angemessenen Zahlungsfrist berechtigt, vom Vertrag zurückzutreten, die Herausgabe der noch im Eigentum von MegaForce stehenden Vorbehaltsware zu verlangen und diese zu verwerten sowie – bei Verschulden des Kunden – Schadensersatz zu verlangen. Im Übrigen gelten die gesetzlichen Vorschriften.',
      },
      {
        n: '5.7',
        text:
          'MegaForce ist verpflichtet, die ihr zustehenden Sicherheiten auf Verlangen des Kunden freizugeben, soweit ihr realisierbarer Wert die zu sichernden Forderungen um mehr als 10 % übersteigt; die Auswahl der freizugebenden Sicherheiten obliegt MegaForce.',
      },
    ],
  },
  {
    n: '6',
    title: 'Exportkontrolle',
    items: [
      {
        n: '6.1',
        text:
          'Vertragliche Informationen sowie Leistungen und/oder Lieferungen können exportkontrollrechtlichen Gesetzen und Vorschriften unterliegen. Der Kunde hält alle Export- und/oder Importbedingungen und -beschränkungen ein und gibt vertrauliche Informationen, Leistungen und/oder Lieferungen nicht ohne Einhaltung aller einschlägigen Gesetze und Vorschriften sowie ohne Einholung aller erforderlichen Lizenzen und Genehmigungen weiter, aus oder wieder aus.',
      },
      {
        n: '6.2',
        text:
          'Der Kunde wird (a) keine von MegaForce gelieferten oder im Zusammenhang mit Lieferungen und Leistungen von MegaForce stehenden Güter, die in den Anwendungsbereich von Artikel 12g der EU-Verordnung Nr. 833/2014 fallen, mittelbar oder unmittelbar an die Russische Föderation oder zur Verwendung in der Russischen Föderation verkaufen, ausführen oder wieder ausführen; (b) keine solchen Güter, die in den Anwendungsbereich von Artikel 8g der EG-Verordnung Nr. 765/2006 fallen, mittelbar oder unmittelbar nach Belarus oder zur Verwendung in Belarus verkaufen, ausführen oder wieder ausführen; und (c) keine im Zusammenhang mit Lieferungen und Leistungen von MegaForce lizenzierten oder übertragenen Schutzrechte, Geschäftsgeheimnisse oder sonstigen Informationen in Verbindung mit Gütern verwenden, die in den Anwendungsbereich von Artikel 12ga der EU-Verordnung Nr. 833/2014 fallen und zum Verkauf, zur Lieferung, zur Verbringung oder zur Ausfuhr nach Russland oder Belarus oder zur Verwendung dort bestimmt sind, und dies auch etwaigen Unterlizenznehmern untersagen. Der Kunde unterhält einen angemessenen Überwachungsmechanismus, um ein dem Zweck dieser Klausel zuwiderlaufendes Verhalten Dritter in der nachgelagerten Lieferkette (einschließlich möglicher Wiederverkäufer) zu erkennen. Ein Verstoß gegen diese Bestimmung stellt einen wesentlichen Vertragsverstoß dar und berechtigt MegaForce zu angemessenen Rechtsbehelfen einschließlich der Kündigung des Vertrags. Der Kunde unterrichtet MegaForce unverzüglich über Probleme oder Verstöße und stellt auf Verlangen einschlägige Informationen zur Einhaltung dieser Bestimmung bereit.',
      },
      {
        n: '6.3',
        text:
          'Sind Kunden, Lieferanten oder sonstige unmittelbar oder mittelbar an der Vertragsdurchführung beteiligte Personen auf deutschen, europäischen oder US-amerikanischen Sanktionslisten geführt, wird der Vertrag nur unter der aufschiebenden Bedingung geschlossen, dass das Rechtsgeschäft exportkontrollrechtlich zulässig ist. Werden solche Personen nach Vertragsschluss in entsprechende Sanktionslisten aufgenommen, ist MegaForce zum Rücktritt oder zur Kündigung berechtigt. Nach Erklärung des Rücktritts oder der Kündigung sind sämtliche Schadensersatzansprüche gegen MegaForce ausgeschlossen.',
      },
    ],
  },
  {
    n: '7',
    title: 'Besondere Bestimmungen für Dienst- und Werkleistungen',
    items: [
      {
        n: '7.1',
        text:
          'Soweit eine Installation, Montage und/oder Inbetriebnahme beim Kunden vereinbart ist oder soweit in Dienst- und/oder Werkverträgen nichts anderes vereinbart ist, gilt: Der Kunde ist verpflichtet, MegaForce bei Installation, Montage und/oder Inbetriebnahme auf eigene Kosten technische Unterstützung zu leisten. Dies umfasst insbesondere die Bereitstellung geeigneter Montagehelfer, erforderlicher Geräte, Hebezeuge und Werkzeuge, der erforderlichen Verbrauchsgüter und Materialien, von Heizung, Beleuchtung, Betriebsstrom und Wasser nebst Anschlüssen, trockener und verschließbarer Räume zur Aufbewahrung von Werkzeug und Gegenständen des Personals von MegaForce, geeigneter Aufenthalts- und Arbeitsräume einschließlich Sanitäreinrichtungen sowie etwaiger besonderer Schutzkleidung und Schutzvorrichtungen.',
      },
      {
        n: '7.2',
        text:
          'Der Kunde stellt sicher, dass die Installation/Montage unmittelbar nach Eintreffen des Montagepersonals von MegaForce begonnen und bis zur Abnahme durch MegaForce ohne Verzögerung durchgeführt werden kann. Dem Montagepersonal von MegaForce ist eine ununterbrochene Arbeitszeit zwischen 7:00 Uhr und 18:00 Uhr zu gewähren.',
      },
      {
        n: '7.3',
        text:
          'Der Kunde trifft die zum Schutz von Personen und Sachen am Installations- oder Montageort erforderlichen besonderen Maßnahmen und unterrichtet das Personal von MegaForce über bestehende besondere Sicherheitsvorschriften, soweit diese für das Personal von Bedeutung sind.',
      },
      {
        n: '7.4',
        text:
          'Vor Beginn der Installation/Montage müssen die hierfür erforderlichen Materialien und Gegenstände des Kunden am Installations- oder Montageort bereitstehen und alle erforderlichen Vorarbeiten so weit fortgeschritten sein, dass mit der Installation oder Montage vereinbarungsgemäß begonnen und sie ohne Unterbrechung durchgeführt werden kann. Zufahrtswege und der Installations- oder Montageort sind vom Kunden zu ebnen und freizuräumen.',
      },
      {
        n: '7.5',
        text:
          'Unmittelbar nach Mitteilung der Fertigstellung der Installation erfolgt eine gemeinsame Überprüfung der Anlagenteile und Anlagen. Es wird ein gemeinsam unterzeichnetes schriftliches Protokoll erstellt, das die abgeschlossene Installation bestätigt; etwaige Restarbeiten und festgestellte Mängel sind im Protokoll festzuhalten.',
      },
      {
        n: '7.6',
        text:
          'Ist eine Dienst- und/oder Werkleistung außerhalb der Mängelhaftung am Sitz oder den Geschäftsräumen von MegaForce zu erbringen, ist der Kunde für die Versendung des Vertragsgegenstands an MegaForce verantwortlich. Der Kunde beachtet die Transporthinweise, insbesondere zur ordnungsgemäßen Transportverpackung, und haftet für Schäden an der Ware infolge unsachgemäßer Verpackung.',
      },
    ],
  },
  {
    n: '8',
    title: 'Gewährleistung',
    items: [
      {
        n: '8.1',
        text:
          'Liegt ein Mangel der Lieferungen oder Leistungen von MegaForce vor und sind etwaige gesetzliche oder vertragliche Untersuchungs- und Rügepflichten erfüllt, leistet MegaForce nach ihrer Wahl Nacherfüllung durch unentgeltliche Mangelbeseitigung oder Neulieferung, sofern der Mangel bereits zum Zeitpunkt des Gefahrübergangs vorlag. Rückgriffsansprüche bleiben hiervon ohne Einschränkung unberührt.',
      },
      {
        n: '8.2',
        text:
          'Zur Mangelbeseitigung kann MegaForce nach ihrer Wahl (i) die mangelhaften Lieferungen oder Leistungen an einen von ihr benannten Ort senden lassen oder (ii) den Mangel vor Ort beseitigen lassen. Der Kunde verwendet für den Versand ausschließlich die Originalverpackung und haftet für Schäden infolge unsachgemäßer Verpackung. Bei berechtigter Beanstandung erstattet MegaForce die Kosten des kostengünstigsten Versandwegs. Ansprüche des Kunden auf Aufwendungen zum Zweck der Nacherfüllung, insbesondere Transport-, Wege-, Arbeits- und Materialkosten, sind ausgeschlossen, soweit sich die Aufwendungen erhöhen, weil der Vertragsgegenstand nachträglich an einen anderen als den vereinbarten Lieferort verbracht wurde, es sei denn, dies entspricht seinem bestimmungsgemäßen Gebrauch. Im Übrigen kann MegaForce die Nacherfüllung verweigern, wenn sie mit unverhältnismäßigen Kosten verbunden ist.',
      },
      { n: '8.3', text: 'Der Kunde gewährt MegaForce die nach billigem Ermessen erforderliche Zeit und Gelegenheit zur Mangelbeseitigung.' },
      {
        n: '8.4',
        text:
          'Ansprüche des Kunden aus Mängelhaftung nach dieser Ziffer 8 verjähren zwölf (12) Monate nach Lieferung der Ware bei Kauf- und Werkverträgen oder – sofern vereinbart – nach Inbetriebnahme der Ware bzw. Abnahme der Leistung. Die vorgenannte Verjährungsfrist gilt nicht für Schadensersatzansprüche sowie für Lieferungen und Leistungen für Bauwerke im Sinne von § 438 Abs. 1 Nr. 2 und § 634a Abs. 1 Nr. 2 BGB oder für den Unternehmerrückgriff nach § 478 BGB; insoweit gelten die gesetzlichen Fristen. Etwaige Rückgriffsrechte des Kunden beim Verbrauchsgüterkauf nach §§ 478, 479 BGB bleiben unberührt, bestehen jedoch nur, soweit der Kunde mit seinem Abnehmer keine über die gesetzlichen Mängelansprüche hinausgehenden Vereinbarungen getroffen hat.',
      },
    ],
  },
  {
    n: '9',
    title: 'Haftung',
    items: [
      {
        n: '9.1',
        text:
          'Bei Vorsatz oder grober Fahrlässigkeit, bei schuldhafter Verletzung des Lebens, des Körpers oder der Gesundheit sowie nach den Vorschriften des Produkthaftungsgesetzes haftet MegaForce nach den gesetzlichen Bestimmungen.',
      },
      {
        n: '9.2',
        text:
          'Bei einfacher Fahrlässigkeit haftet MegaForce nur bei Verletzung einer wesentlichen Vertragspflicht, begrenzt auf den Ersatz des vorhersehbaren, typischerweise eintretenden Schadens. Eine wesentliche Vertragspflicht ist eine Pflicht, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht und auf deren Einhaltung der Kunde regelmäßig vertrauen darf.',
      },
      { n: '9.3', text: 'Im Übrigen ist die Haftung von MegaForce – soweit gesetzlich zulässig – ausgeschlossen.' },
      {
        n: '9.4',
        text:
          'Soweit die Haftung von MegaForce ausgeschlossen oder beschränkt ist, gilt dies auch für die persönliche Haftung ihrer gesetzlichen Vertreter, Mitarbeiter, Organe und Erfüllungsgehilfen.',
      },
      {
        n: '9.5',
        text:
          'Der Kunde trifft alle erforderlichen und zumutbaren Maßnahmen zur Schadensverhütung und -minderung, insbesondere zur regelmäßigen Sicherung von Programmen und Daten. Für die Wiederherstellung von Daten haftet MegaForce unter den Voraussetzungen der Ziffern 9.1 bis 9.2 nur, wenn der Kunde sichergestellt hat, dass diese Daten mit vertretbarem Aufwand aus anderem Datenmaterial rekonstruierbar sind.',
      },
      { n: '9.6', text: 'Eine Änderung der Beweislast zum Nachteil des Kunden ist mit dieser Ziffer 9 nicht verbunden.' },
    ],
  },
  {
    n: '10',
    title: 'Schutzrechte / Geistiges Eigentum',
    items: [
      {
        n: '10.1',
        text:
          'MegaForce behält sich alle Eigentums-, Urheber- und gewerblichen Schutzrechte an allen dem Kunden überlassenen Unterlagen, Materialien und sonstigen Gegenständen vor (z. B. Auftragsunterlagen, Pläne, Zeichnungen, Abbildungen, Berechnungen, Produktbeschreibungen und Spezifikationen, Handbücher, Muster, Modelle sowie sonstige physische und/oder elektronische Unterlagen, Informationen und Gegenstände). Dies umfasst auch die von MegaForce entwickelten Schutzrechte an modularen Robotiksystemen und zugehörigen Spezifikationen.',
      },
      {
        n: '10.2',
        text:
          'Ohne vorherige schriftliche Zustimmung von MegaForce darf der Kunde die vorgenannten Gegenstände Dritten weder zugänglich machen noch offenlegen, verwerten, vervielfältigen oder verändern. Der Kunde verwendet sie ausschließlich zu Vertragszwecken und gibt sie auf Verlangen von MegaForce vollständig zurück bzw. vernichtet (oder löscht) vorhandene Kopien, soweit er sie nicht im ordentlichen Geschäftsgang und nach gesetzlichen Aufbewahrungspflichten benötigt.',
      },
      {
        n: '10.3',
        text:
          'Soweit nichts anderes vereinbart ist, räumt MegaForce dem Kunden das nicht ausschließliche, unwiderrufliche, räumlich, zeitlich und inhaltlich unbeschränkte Recht ein, die in den gelieferten Produkten enthaltene Software zum vertraglichen Zweck zu nutzen.',
      },
      {
        n: '10.4',
        text:
          'Der Kunde erkennt sämtliche Schutzrechte, insbesondere gewerbliche Schutzrechte und Urheberrechte sowie Know-how („Schutzrechte“) von MegaForce, ihrer Hersteller/Vorlieferanten oder Dritter an und wird keine Produkte beschaffen, vertreiben, vermarkten oder verkaufen, die Nachahmungen der Produkte darstellen oder Schutzrechte verletzen.',
      },
      {
        n: '10.5',
        text:
          'Sämtliche Schutzrechte an den Produkten und Leistungen von MegaForce verbleiben jederzeit im alleinigen Eigentum von MegaForce, ihrer Hersteller/Vorlieferanten oder des jeweiligen Dritten. Der Kunde darf diese Schutzrechte nur entsprechend dem Zweck des Kauf-/Dienst-/Werkvertrags nutzen oder verwerten.',
      },
      {
        n: '10.6',
        text:
          'Der Kunde hält die Lizenzbedingungen für in den Produkten enthaltene oder im Zusammenhang gelieferte Software („Softwareprodukte“) ein. Mit Lieferung erhält der Kunde ein nicht ausschließliches, zeitlich unbefristetes, auf den vertraglich vorgesehenen Zweck beschränktes Nutzungsrecht, das mit dem vereinbarten Entgelt abgegolten ist. Der Kunde darf Sicherungskopien erstellen; im Übrigen ist es ihm – außer in zwingend gesetzlich erlaubten Fällen oder soweit Open-Source-Lizenzen dies gestatten – untersagt, (a) technische Schutzmechanismen zu umgehen, (b) die Softwareprodukte ganz oder teilweise an Dritte zu übertragen, zu vertreiben, zu verkaufen, zu vermieten, zu verleihen, zu lizenzieren, zur Verfügung zu stellen oder kommerziell zu verwerten, (c) die Softwareprodukte zu vervielfältigen, zu übersetzen, zu ändern, zu dekompilieren, zu disassemblieren, zurückzuentwickeln oder den Quellcode zu erlangen, oder (d) Logos, Marken, Schutzrechts- oder Vertraulichkeitshinweise zu entfernen oder zu verändern.',
      },
      {
        n: '10.7',
        text:
          'Enthalten die Softwareprodukte Schutzrechte Dritter, hält der Kunde die von MegaForce überlassenen Lizenzbedingungen ein und stellt sicher, dass alle berechtigten Nutzer (einschließlich verbundener Unternehmen) diese Bedingungen einhalten. Der Kunde haftet für Verstöße seiner berechtigten Nutzer und verbundenen Unternehmen.',
      },
      {
        n: '10.8',
        text:
          'Soweit Produktspezifikationen für den Kunden entwickelt werden, stehen MegaForce sämtliche Schutzrechte an diesen Produktspezifikationen und den damit verbundenen Produkten oder Softwareprodukten zu. Klarstellend gilt: Unbeschadet etwaiger Nutzungsrechte des Kunden und vorbehaltlich allgemeiner Vertraulichkeitspflichten ist MegaForce berechtigt, die Produktspezifikationen unbeschränkt und vergütungsfrei für beliebige Zwecke, insbesondere für andere Kundenaufträge und eigene Produktentwicklungen, zu verwenden.',
      },
      {
        n: '10.9',
        text:
          'MegaForce gewährleistet, dass die von ihr gelieferten Produkte einschließlich enthaltener Software keine Schutzrechte Dritter in den Ländern des Europäischen Wirtschaftsraums oder der Schweiz verletzen. Eine weitergehende Gewährleistung der Schutzrechtsfreiheit, insbesondere in Herstellungs- oder Drittländern, wird nicht übernommen.',
      },
      {
        n: '10.10',
        text:
          'Der Kunde und MegaForce unterrichten einander unverzüglich, wenn gegen MegaForce oder den Kunden Ansprüche wegen Verletzung vertragsrelevanter Schutzrechte geltend gemacht werden.',
      },
    ],
  },
  {
    n: '11',
    title: 'Integritätsklausel',
    items: [
      {
        n: '11.1',
        text:
          'Der Kunde sichert zu, dass er im Einklang mit den geltenden gesetzlichen Bestimmungen handelt, insbesondere von korruptem Verhalten und sonstigen Straftaten Abstand nimmt und alle erforderlichen Vorkehrungen zu deren Vermeidung getroffen hat. Der Kunde verpflichtet sich insbesondere, im In- und Ausland Vorkehrungen gegen schwerwiegendes Fehlverhalten zu treffen. Schwerwiegendes Fehlverhalten ist – unabhängig von der Beteiligungsform, Anstiftung oder Beihilfe: (a) Straftaten im Geschäftsverkehr, insbesondere Geldwäsche, Betrug, Untreue, Urkundenfälschung, Fälschung technischer Aufzeichnungen oder beweiserheblicher Daten, mittelbare Falschbeurkundung, Urkundenunterdrückung sowie wettbewerbsbeschränkende Absprachen bei Ausschreibungen. (b) Terrorismusstraftaten, Beteiligung an einer kriminellen Vereinigung, Geldwäsche und Terrorismusfinanzierung. (c) Verstöße gegen das Verbot von Zwangsarbeit, moderner Sklavenarbeit und Arbeit unter Freiheitsentzug. (d) Anbieten, Versprechen oder Gewähren ungerechtfertigter Vorteile an in- oder ausländische Amtsträger oder Personen mit besonderen öffentlichen Dienstpflichten, die an der Vergabe oder Ausführung von Aufträgen beteiligt sind. (e) Anbieten, Versprechen, Gewähren oder Fordern, Sichversprechenlassen und Annehmen von Vorteilen von Geschäftspartnern als Gegenleistung für eine unlautere Bevorzugung im in- oder ausländischen Geschäftsverkehr. (f) Verstöße gegen Vorschriften zum Schutz des unbeschränkten Wettbewerbs, insbesondere gegen nationales und europäisches Wettbewerbs- und Kartellrecht.',
      },
      {
        n: '11.2',
        text:
          'Bei einem Verstoß des Kunden gegen eine Pflicht nach dieser Ziffer 11 ist MegaForce zum Rücktritt (bzw. bei Dauerschuldverhältnissen zur Kündigung) berechtigt, wenn ihr ein Festhalten am Vertrag nicht zuzumuten ist. Im Falle einer solchen Kündigung oder eines solchen Rücktritts ist MegaForce von jeder Leistungspflicht befreit.',
      },
      {
        n: '11.3',
        text:
          'Der Kunde stellt MegaForce und ihre Mitarbeiter von sämtlichen Schäden frei, soweit diese auf einer schuldhaften Verletzung der Pflichten des Kunden nach dieser Ziffer 11 beruhen.',
      },
    ],
  },
  {
    n: '12',
    title: 'Anwendbares Recht, Gerichtsstand, Vertragssprache',
    items: [
      {
        n: '12.1',
        text:
          'Diese AGB und alle Rechtsbeziehungen zwischen MegaForce und dem Kunden unterliegen ausschließlich dem Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG) sowie der Kollisionsnormen des internationalen Privatrechts.',
      },
      {
        n: '12.2',
        text:
          'Ausschließlicher – auch internationaler – Gerichtsstand für alle unmittelbar oder mittelbar aus dem Vertragsverhältnis entstehenden Streitigkeiten ist der Sitz von MegaForce in Kaarst bzw. das für Kaarst zuständige Gericht (Amtsgericht/Landgericht im Bezirk Neuss). MegaForce ist zudem berechtigt, nach eigenem Ermessen am allgemeinen Gerichtsstand des Kunden zu klagen.',
      },
      {
        n: '12.3',
        text:
          'Maßgeblich ist die deutsche Fassung dieser AGB. Bei Überlassung einer fremdsprachigen Fassung dient diese nur der Verständigung; im Zweifel und bei Widersprüchen geht die deutsche Fassung vor.',
      },
    ],
  },
  {
    n: '13',
    title: 'Schlussbestimmungen',
    items: [
      {
        n: '13.1',
        text:
          'Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam oder undurchführbar sein oder werden, berührt dies die Wirksamkeit der übrigen Bestimmungen nicht. An die Stelle der unwirksamen oder undurchführbaren Bestimmung tritt die gesetzlich zulässige Regelung, die dem wirtschaftlichen Zweck der unwirksamen Bestimmung am nächsten kommt.',
      },
      {
        n: '13.2',
        text:
          'Änderungen und Ergänzungen dieser AGB sowie etwaiger Individualvereinbarungen bedürfen mindestens der Textform. Dies gilt auch für die Änderung dieses Textformerfordernisses. Individuelle Vertragsabreden haben Vorrang vor diesen AGB.',
      },
    ],
  },
]
