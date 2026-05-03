// Fix Terms (add German translation) and Privacy (add English translation)
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'wudur8e8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

function block(key, style, children) {
  return { _type: 'block', _key: key, style, markDefs: [], children }
}
function span(key, text, marks = []) {
  return { _type: 'span', _key: key, marks, text }
}

// ============================
// GERMAN TERMS OF SERVICE
// ============================
const termsDE = [
  block('t1', 'h2', [span('t1s', 'NUTZUNGSBEDINGUNGEN')]),
  block('t2', 'normal', [span('t2s', 'Letzte Aktualisierung: Januar 2026', ['em'])]),

  block('t3', 'h4', [span('t3s', '1. Geltungsbereich')]),
  block('t4', 'normal', [span('t4s', 'Diese Nutzungsbedingungen regeln die Verwendung der Website megarobotics.de und aller damit verbundenen Dienste.')]),
  block('t5', 'normal', [span('t5s', 'Mit dem Zugriff auf oder der Nutzung dieser Website erklären Sie sich mit diesen Bedingungen einverstanden. Falls Sie nicht einverstanden sind, nutzen Sie die Website bitte nicht.')]),

  block('t6', 'h4', [span('t6s', '2. Anbieterinformationen')]),
  block('t7', 'normal', [
    span('t7a', 'Megaforce GmbH', ['strong']),
    span('t7b', '\nWacholderweg 8\n41564 Kaarst\nDeutschland'),
  ]),
  block('t8', 'normal', [span('t8s', 'Handelsregister: HRB 23872\nRegistergericht: Amtsgericht Neuss')]),
  block('t9', 'normal', [span('t9s', 'Geschäftsführer: Masoud Pajouh')]),
  block('t10', 'normal', [span('t10s', 'E-Mail: info@megarobotics.de\nTelefon: +49 172 2008875')]),

  block('t11', 'h4', [span('t11s', '3. Angebotene Dienste')]),
  block('t12', 'normal', [span('t12s', 'Die Website megarobotics.de bietet Informationen über:')]),
  block('t13', 'normal', [span('t13s', '• Robotik-Technologien und -Lösungen\n• Produkte, Dienstleistungen und Forschung im Bereich fortschrittlicher Robotik\n• Unternehmensinformationen und Kontaktmöglichkeiten\n• Newsletter und Informationsinhalte')]),
  block('t14', 'normal', [span('t14s', 'Die Inhalte dienen ausschließlich Informations- und Geschäftszwecken und stellen kein verbindliches Angebot dar, sofern nicht ausdrücklich anders angegeben.')]),

  block('t15', 'h4', [span('t15s', '4. Nutzung der Website')]),
  block('t16', 'normal', [span('t16s', 'Die Nutzer verpflichten sich:')]),
  block('t17', 'normal', [span('t17s', '• Die Website nur für rechtmäßige Zwecke zu nutzen\n• Die Sicherheit oder Funktionalität der Website nicht zu stören oder zu beeinträchtigen\n• Kontaktformulare, Newsletter-Anmeldungen oder andere interaktive Funktionen nicht zu missbrauchen')]),
  block('t18', 'normal', [span('t18s', 'Unbefugter automatisierter Zugriff (z. B. Scraping, Crawling über die normale Indexierung hinaus) ist ohne ausdrückliche Genehmigung untersagt.')]),

  block('t19', 'h4', [span('t19s', '5. Geistiges Eigentum')]),
  block('t20', 'normal', [span('t20s', 'Alle Inhalte dieser Website, einschließlich, aber nicht beschränkt auf Texte, Bilder, Logos, Videos, Grafiken und Softwarekomponenten, sind durch das Urheberrecht und Gesetze zum Schutz geistigen Eigentums geschützt.')]),
  block('t21', 'normal', [span('t21s', 'Jede Vervielfältigung, Bearbeitung, Verbreitung oder gewerbliche Nutzung ohne vorherige schriftliche Zustimmung der Megaforce GmbH ist untersagt.')]),

  block('t22', 'h4', [span('t22s', '6. Richtigkeit der Informationen')]),
  block('t23', 'normal', [span('t23s', 'Wir bemühen uns, die auf dieser Website bereitgestellten Informationen korrekt und aktuell zu halten. Wir übernehmen jedoch keine Gewähr für die Vollständigkeit, Richtigkeit, Zuverlässigkeit oder Aktualität der Inhalte.')]),
  block('t24', 'normal', [span('t24s', 'Technische Spezifikationen, Produktbeschreibungen und Verfügbarkeit können ohne Vorankündigung geändert werden.')]),

  block('t25', 'h4', [span('t25s', '7. Externe Links')]),
  block('t26', 'normal', [span('t26s', 'Diese Website kann Links zu Websites Dritter enthalten.')]),
  block('t27', 'normal', [span('t27s', 'Wir haben keinen Einfluss auf die Inhalte externer Websites und übernehmen keine Haftung für deren Inhalte. Die Verantwortung liegt beim jeweiligen Betreiber der verlinkten Seiten.')]),

  block('t28', 'h4', [span('t28s', '8. Newsletter')]),
  block('t29', 'normal', [span('t29s', 'Mit der Anmeldung zu unserem Newsletter erklären Sie sich damit einverstanden, Informations-E-Mails von uns zu erhalten.')]),
  block('t30', 'normal', [span('t30s', '• Die Anmeldung erfolgt im Double-Opt-In-Verfahren\n• Jeder Newsletter enthält einen Abmeldelink\n• Weitere Einzelheiten finden Sie in unserer Datenschutzerklärung.')]),

  block('t31', 'h4', [span('t31s', '9. Kontaktformulare & Kommunikation')]),
  block('t32', 'normal', [span('t32s', 'Bei der Kontaktaufnahme über Formulare oder E-Mail:')]),
  block('t33', 'normal', [span('t33s', '• Müssen Sie wahrheitsgemäße und korrekte Angaben machen\n• Dürfen Sie keine rechtswidrigen, missbräuchlichen oder irreführenden Inhalte übermitteln\n• Wir behalten uns vor, den Missbrauch von Kommunikationskanälen zu ignorieren oder zu blockieren.')]),

  block('t34', 'h4', [span('t34s', '10. Verfügbarkeit der Website')]),
  block('t35', 'normal', [span('t35s', 'Wir bemühen uns um eine kontinuierliche Verfügbarkeit, garantieren jedoch keinen unterbrechungsfreien Zugang.')]),
  block('t36', 'normal', [span('t36s', 'Wartungsarbeiten, Updates oder technische Probleme können zu vorübergehenden Ausfällen führen. Aus solchen Unterbrechungen können keine Ansprüche abgeleitet werden.')]),

  block('t37', 'h4', [span('t37s', '11. Haftungsbeschränkung')]),
  block('t38', 'normal', [span('t38s', 'Im gesetzlich zulässigen Rahmen:')]),
  block('t39', 'normal', [span('t39s', '• Haften wir nicht für indirekte Schäden oder Folgeschäden\n• Haften wir nicht für Datenverlust, entgangenen Gewinn oder Betriebsunterbrechungen')]),
  block('t40', 'normal', [span('t40s', 'Dies gilt nicht für die Haftung bei:')]),
  block('t41', 'normal', [span('t41s', '• Vorsatz oder grober Fahrlässigkeit\n• Verletzung von Leben, Körper oder Gesundheit\n• Zwingenden gesetzlichen Haftungsvorschriften')]),

  block('t42', 'h4', [span('t42s', '12. Datenschutz')]),
  block('t43', 'normal', [span('t43s', 'Die Verarbeitung personenbezogener Daten ist in unserer Datenschutzerklärung geregelt, die integraler Bestandteil dieser Nutzungsbedingungen ist.')]),

  block('t44', 'h4', [span('t44s', '13. Änderungen der Nutzungsbedingungen')]),
  block('t45', 'normal', [span('t45s', 'Wir behalten uns das Recht vor, diese Nutzungsbedingungen jederzeit zu ändern.')]),
  block('t46', 'normal', [span('t46s', 'Änderungen treten mit der Veröffentlichung auf dieser Website in Kraft. Die fortgesetzte Nutzung der Website gilt als Zustimmung zu den aktualisierten Bedingungen.')]),

  block('t47', 'h4', [span('t47s', '14. Anwendbares Recht')]),
  block('t48', 'normal', [span('t48s', 'Diese Nutzungsbedingungen unterliegen dem Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG).')]),

  block('t49', 'h4', [span('t49s', '15. Gerichtsstand')]),
  block('t50', 'normal', [span('t50s', 'Soweit gesetzlich zulässig, ist Gerichtsstand Neuss, Deutschland.')]),

  block('t51', 'h4', [span('t51s', '16. Salvatorische Klausel')]),
  block('t52', 'normal', [span('t52s', 'Sollte eine Bestimmung dieser Nutzungsbedingungen unwirksam sein oder werden, bleiben die übrigen Bestimmungen davon unberührt.')]),
]

// ============================
// ENGLISH PRIVACY POLICY
// ============================
const privacyEN = [
  block('p1', 'normal', [span('p1s', 'PRIVACY POLICY', ['strong'])]),
  block('p2', 'normal', [span('p2s', '(in accordance with GDPR)', ['em'])]),

  block('p3', 'h4', [span('p3s', '1. Data Controller')]),
  block('p4', 'normal', [span('p4s', 'The party responsible for data processing on this website is:')]),
  block('p5', 'normal', [
    span('p5a', 'Megaforce GmbH', ['strong']),
    span('p5b', '\nWacholderweg 8\n41564 Kaarst\nGermany'),
  ]),
  block('p6', 'normal', [span('p6s', 'Phone: +49 172 2008875\nEmail: info@megarobotics.de')]),

  block('p7', 'h4', [span('p7s', '2. Hosting')]),
  block('p8', 'normal', [span('p8s', 'This website is hosted by Vercel Inc. The hosting provider is used for the purpose of secure, fast, and efficient delivery of our online services. The following data is automatically collected:')]),
  block('p9', 'normal', [span('p9s', '• IP address\n• Date and time of the request\n• Browser type and version\n• Operating system\n• Referrer URL')]),
  block('p10', 'normal', [span('p10s', 'This data is technically necessary to correctly deliver the website.')]),

  block('p11', 'h4', [span('p11s', '3. Content Management System (CMS)')]),
  block('p12', 'normal', [span('p12s', 'We use Sanity.io for content management. Sanity processes content and metadata exclusively as part of our editorial operations. No personal visitor data is transmitted to Sanity.')]),

  block('p13', 'h4', [span('p13s', '4. Access Data / Server Log Files')]),
  block('p14', 'normal', [span('p14s', 'When visiting the website, information is automatically stored in server log files. This data is not combined with other data sources.')]),
  block('p15', 'normal', [span('p15s', 'Legal basis: Art. 6(1)(f) GDPR (legitimate interest in technically error-free presentation).')]),

  block('p16', 'h4', [span('p16s', '5. Cookies')]),
  block('p17', 'normal', [span('p17s', 'Our website uses cookies.')]),

  block('p18', 'h4', [span('p18s', 'a) Technically Necessary Cookies')]),
  block('p19', 'normal', [span('p19s', 'These cookies are required to ensure basic website functionality.\nLegal basis: Art. 6(1)(f) GDPR.')]),

  block('p20', 'h4', [span('p20s', 'b) Analytics and Marketing Cookies')]),
  block('p21', 'normal', [span('p21s', 'If analytics or tracking tools are used (e.g., Google Analytics, Plausible, or Vercel Analytics), they are only activated with your prior consent. You may revoke your consent at any time.')]),

  block('p22', 'h4', [span('p22s', '6. Analytics Tools')]),
  block('p23', 'normal', [span('p23s', 'Depending on configuration, the following services may be used:')]),
  block('p24', 'normal', [span('p24s', '• Google Analytics (with IP anonymization)\n• Plausible Analytics\n• Vercel Analytics')]),
  block('p25', 'normal', [span('p25s', 'These tools are only used with your consent. You may revoke your consent at any time.')]),

  block('p26', 'h4', [span('p26s', '7. Contact Form')]),
  block('p27', 'normal', [span('p27s', 'When you send us inquiries via the contact form, your information is stored for the purpose of processing the request.')]),
  block('p28', 'normal', [span('p28s', 'Data processed:\n• Name\n• Email address\n• Message')]),
  block('p29', 'normal', [span('p29s', 'Legal basis: Art. 6(1)(b) GDPR (contract/pre-contractual measures) or Art. 6(1)(f) GDPR.')]),

  block('p30', 'h4', [span('p30s', '8. Newsletter')]),
  block('p31', 'normal', [span('p31s', 'If you subscribe to our newsletter, your email address will be used exclusively for sending the newsletter.')]),
  block('p32', 'normal', [span('p32s', '• Double opt-in procedure\n• Every newsletter contains an unsubscribe link')]),
  block('p33', 'normal', [span('p33s', 'Legal basis: Art. 6(1)(a) GDPR.')]),

  block('p34', 'h4', [span('p34s', '9. Embedded Content (YouTube & Social Media)')]),
  block('p35', 'normal', [span('p35s', 'Our website may embed content from third-party providers (e.g., YouTube, social media widgets).')]),
  block('p36', 'normal', [span('p36s', 'When accessing such content, your IP address may be transmitted to the respective provider. Embedding only occurs after consent.')]),

  block('p37', 'h4', [span('p37s', '10. Data Transfer to Third Countries')]),
  block('p38', 'normal', [span('p38s', 'If services based outside the EU (e.g., USA) are used, data transfer is based on:')]),
  block('p39', 'normal', [span('p39s', '• EU Standard Contractual Clauses\n• or Adequacy decisions by the European Commission')]),

  block('p40', 'h4', [span('p40s', '11. Data Retention')]),
  block('p41', 'normal', [span('p41s', 'Personal data is stored only as long as necessary to fulfill the respective purpose or as required by legal retention obligations.')]),

  block('p42', 'h4', [span('p42s', '12. Your Rights')]),
  block('p43', 'normal', [span('p43s', 'You have the right at any time to:')]),
  block('p44', 'normal', [span('p44s', '• Access (Art. 15 GDPR)\n• Rectification (Art. 16 GDPR)\n• Erasure (Art. 17 GDPR)\n• Restriction of processing (Art. 18 GDPR)\n• Data portability (Art. 20 GDPR)\n• Objection (Art. 21 GDPR)')]),
  block('p45', 'normal', [span('p45s', 'You may lodge complaints with the competent supervisory authority.')]),

  block('p46', 'h4', [span('p46s', '13. Withdrawal of Consent')]),
  block('p47', 'normal', [span('p47s', 'You may withdraw any consent given at any time with effect for the future.')]),

  block('p48', 'h4', [span('p48s', '14. SSL Encryption')]),
  block('p49', 'normal', [span('p49s', 'This website uses SSL encryption for security reasons.')]),

  block('p50', 'h4', [span('p50s', '15. Changes to this Privacy Policy')]),
  block('p51', 'normal', [span('p51s', 'We reserve the right to update this privacy policy to comply with legal requirements or changes to our services. The current version is always available on this website.')]),
]

async function main() {
  // Fix Terms: replace DE body with proper German
  console.log('Updating Terms of Service (German)...')
  await client.patch('589c896f-3dc4-4787-8d7b-090c95ae643e')
    .set({ 'body.de': termsDE, 'title.de': 'Nutzungsbedingungen' })
    .commit()
  console.log('  ✓ Terms DE updated')

  // Fix Privacy: add English body
  console.log('Updating Privacy Policy (English)...')
  const privacyIds = ['TWXh6LKTUVPc83vQPBRyzA', 'drafts.TWXh6LKTUVPc83vQPBRyzA']
  for (const id of privacyIds) {
    try {
      await client.patch(id)
        .set({ 'body.en': privacyEN })
        .commit()
      console.log(`  ✓ Privacy EN updated (${id})`)
    } catch (e) {
      console.log(`  - Skipped ${id} (${e.message?.substring(0, 50)})`)
    }
  }

  console.log('\n✅ Done!')
  console.log('  Terms DE: https://www.megarobotics.de/de/terms')
  console.log('  Privacy EN: https://www.megarobotics.de/en/privacy')
}

main().catch(console.error)
