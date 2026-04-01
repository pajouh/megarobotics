// Populate professional SEO metadata for all content in Sanity
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'wudur8e8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

function truncate(str, max) {
  if (!str) return ''
  str = str.replace(/\n/g, ' ').trim()
  return str.length > max ? str.substring(0, max - 3) + '...' : str
}

async function populateArticleSEO() {
  const articles = await client.fetch('*[_type == "article"]{_id, title, excerpt, "cat": category->title}')
  console.log(`\n=== ARTICLES (${articles.length}) ===`)

  const seoData = {
    // LimX Dynamics
    '40L5ChlweOHtktuIUILmV0': {
      en: {
        metaTitle: 'LimX Dynamics Raises $200M Series B for Humanoid Robots',
        metaDescription: 'LimX Dynamics secures $200 million in Series B financing from Stone Venture, JD, NIO Capital and more to accelerate humanoid robot R&D, TRON 2 platform, and Agentic OS development.',
        keywords: ['LimX Dynamics', 'Series B', 'humanoid robots', 'TRON 2', 'LimX COSA', 'robotics funding', 'physical AI', 'modular robots'],
      },
      de: {
        metaTitle: 'LimX Dynamics sammelt 200 Mio. $ in Serie B für humanoide Roboter',
        metaDescription: 'LimX Dynamics sichert sich 200 Millionen US-Dollar in Serie-B-Finanzierung von Stone Venture, JD, NIO Capital und weiteren Investoren für die Entwicklung humanoider Roboter und KI-Systeme.',
      },
    },
    // PUDU D5 Series
    '72211483-a9a6-4f74-ad83-0fb4bb87608b': {
      en: {
        metaTitle: 'PUDU D5 Series: Industry-Grade Autonomous Quadruped Robots',
        metaDescription: 'Discover the PUDU D5 and D5-W autonomous quadruped robots featuring NVIDIA Orin, dual LiDAR, IP67 rating, and 275 TOPS AI performance for industrial inspection and security.',
        keywords: ['Pudu D5', 'Pudu D5-W', 'quadruped robot', 'autonomous robot', 'industrial inspection', 'NVIDIA Orin', 'IP67 robot'],
      },
      de: {
        metaTitle: 'PUDU D5 Serie: Autonome Vierbeinroboter für die Industrie',
        metaDescription: 'Entdecken Sie die PUDU D5 und D5-W autonomen Vierbeinroboter mit NVIDIA Orin, dualem LiDAR, IP67-Schutz und 275 TOPS KI-Leistung für industrielle Inspektion und Sicherheit.',
      },
    },
    // Game-Changing Quadruped Robot (D5)
    '7fa39557-580d-46ac-b3ce-78483f71158e': {
      en: {
        metaTitle: 'Pudu D5: Game-Changing Industrial Quadruped Robot | MegaRobotics',
        metaDescription: 'The Pudu D5 industrial quadruped robot delivers 275 TOPS AI, dual 360° LiDAR, IP67 certification, and conquers 25cm steps. Next-gen robotics for logistics, security, and inspection.',
        keywords: ['Pudu D5', 'quadruped robot', 'industrial robot', 'autonomous inspection', 'security robot', 'DACH robotics'],
      },
      de: {
        metaTitle: 'Pudu D5: Bahnbrechender industrieller Vierbeinroboter',
        metaDescription: 'Der Pudu D5 Vierbeinroboter bietet 275 TOPS KI-Leistung, duale 360° LiDAR-Wahrnehmung und IP67-Zertifizierung für Logistik, Sicherheit und Inspektion im DACH-Raum.',
      },
    },
    // Quadruped Robots Applications
    'd6b5f877-2695-4fe2-822d-8c2df908dff6': {
      en: {
        metaTitle: 'Quadruped Robot Applications: Industrial Use Cases & Brand Guide',
        metaDescription: 'Comprehensive guide to quadruped robot applications in industry. Compare Unitree, DEEP Robotics, Boston Dynamics, and ANYbotics with real-world deployment examples and specifications.',
        keywords: ['quadruped robots', 'robot applications', 'Unitree', 'Boston Dynamics', 'ANYbotics', 'DEEP Robotics', 'industrial robots', 'robot dogs'],
      },
      de: {
        metaTitle: 'Vierbeinroboter-Anwendungen: Industrielle Einsatzbereiche & Markenvergleich',
        metaDescription: 'Umfassender Leitfaden zu industriellen Anwendungen von Vierbeinrobotern. Vergleichen Sie Unitree, DEEP Robotics, Boston Dynamics und ANYbotics mit realen Einsatzbeispielen.',
      },
    },
    // Unitree article
    'yMJzGHAEZV7PCtoICkgJd1': {
      en: {
        metaTitle: 'How Unitree Robotics Is Changing the World | MegaRobotics',
        metaDescription: 'From factory floors to farms to disaster zones — discover how Unitree\'s affordable quadruped and humanoid robots are revolutionizing manufacturing, agriculture, search & rescue, and healthcare.',
        keywords: ['Unitree Robotics', 'Unitree Go2', 'Unitree G1', 'humanoid robot', 'quadruped robot', 'affordable robotics', 'robot dog'],
      },
      de: {
        metaTitle: 'Wie Unitree Robotics die Welt verändert | MegaRobotics',
        metaDescription: 'Von Fabrikhallen bis zu Katastrophengebieten — erfahren Sie, wie Unitrees erschwingliche Roboter die Industrie, Landwirtschaft und Rettungseinsätze revolutionieren.',
      },
    },
  }

  for (const article of articles) {
    const data = seoData[article._id]
    if (data) {
      await client.patch(article._id).set({
        seo: {
          metaTitle: { en: data.en.metaTitle, de: data.de.metaTitle },
          metaDescription: { en: data.en.metaDescription, de: data.de.metaDescription },
          keywords: data.en.keywords,
        },
      }).commit()
      console.log(`  ✓ ${truncate(article.title?.en || article.title?.de, 60)}`)
    }
  }
}

async function populateProductSEO() {
  const products = await client.fetch('*[_type == "product" && !(_id in path("drafts.**"))]{_id, name, tagline, description, "mfr": manufacturer->name, "cat": category->name}')
  console.log(`\n=== PRODUCTS (${products.length}) ===`)

  for (const p of products) {
    const mfr = p.mfr || ''
    const cat = p.cat?.en || p.cat?.de || ''
    const desc = p.description?.en || p.description?.de || ''
    const tagline = p.tagline?.en || p.tagline?.de || ''

    // Build professional SEO
    const enTitle = `${p.name}${mfr ? ` by ${mfr}` : ''} | MegaRobotics`
    const deTitle = `${p.name}${mfr ? ` von ${mfr}` : ''} | MegaRobotics`

    const enDesc = truncate(desc || tagline || `Discover the ${p.name} from ${mfr}. Browse specifications, features, and pricing at MegaRobotics.`, 160)
    const deDesc = truncate(
      p.description?.de || p.tagline?.de || `Entdecken Sie den ${p.name} von ${mfr}. Spezifikationen, Funktionen und Preise bei MegaRobotics.`,
      160
    )

    // Generate relevant keywords
    const keywords = [p.name, mfr, cat].filter(Boolean)
    if (cat.includes('Service')) keywords.push('service robot', 'delivery robot')
    else if (cat.includes('Humanoid') || cat.includes('Legged')) keywords.push('humanoid robot', 'legged robot')
    else if (cat.includes('Drone') || cat.includes('Aerial')) keywords.push('drone', 'UAV', 'aerial robot')
    else if (cat.includes('Industrial') || cat.includes('Cobot')) keywords.push('cobot', 'collaborative robot', 'industrial automation')
    else if (cat.includes('Warehouse') || cat.includes('Logistics')) keywords.push('AMR', 'warehouse robot', 'logistics automation')
    else if (cat.includes('Education')) keywords.push('education robot', 'STEM robotics')
    keywords.push('robotics', 'buy robot', 'robot specifications')

    await client.patch(p._id).set({
      seo: {
        metaTitle: { en: truncate(enTitle, 60), de: truncate(deTitle, 60) },
        metaDescription: { en: enDesc, de: deDesc },
        keywords: [...new Set(keywords)],
      },
    }).commit()
    console.log(`  ✓ ${p.name}`)
  }
}

async function populateManufacturerSEO() {
  const manufacturers = await client.fetch('*[_type == "manufacturer"]{_id, name, description, headquarters, specialties}')
  console.log(`\n=== MANUFACTURERS (${manufacturers.length}) ===`)

  for (const m of manufacturers) {
    const specs = m.specialties?.en || m.specialties?.de || []
    const specStr = specs.slice(0, 3).join(', ')
    const hq = m.headquarters || ''

    const enTitle = `${m.name} Robotics Products & Solutions | MegaRobotics`
    const deTitle = `${m.name} Robotik-Produkte & Lösungen | MegaRobotics`

    const enDesc = truncate(
      m.description?.en || `Browse ${m.name} robotics products${specStr ? ` specializing in ${specStr}` : ''}. Compare models, specs, and pricing at MegaRobotics.`,
      160
    )
    const deDesc = truncate(
      m.description?.de || `Entdecken Sie Robotik-Produkte von ${m.name}${specStr ? ` mit Fokus auf ${specStr}` : ''}. Modelle, Spezifikationen und Preise bei MegaRobotics.`,
      160
    )

    const keywords = [m.name, 'robotics', 'robots']
    if (hq) keywords.push(hq)
    specs.forEach(s => keywords.push(s.toLowerCase()))
    keywords.push('buy robots', 'robot manufacturer')

    await client.patch(m._id).set({
      seo: {
        metaTitle: { en: truncate(enTitle, 60), de: truncate(deTitle, 60) },
        metaDescription: { en: enDesc, de: deDesc },
        keywords: [...new Set(keywords)],
      },
    }).commit()
    console.log(`  ✓ ${m.name}`)
  }
}

async function populateProductCategorySEO() {
  const categories = await client.fetch('*[_type == "productCategory"]{_id, name, description}')
  console.log(`\n=== PRODUCT CATEGORIES (${categories.length}) ===`)

  const catKeywords = {
    'Service Robots': ['service robot', 'delivery robot', 'hospitality robot', 'restaurant robot'],
    'Humanoid & Legged Robots': ['humanoid robot', 'bipedal robot', 'quadruped robot', 'legged robot', 'robot dog'],
    'Drones & Aerial': ['drone', 'UAV', 'aerial robot', 'quadcopter', 'eVTOL'],
    'Industrial & Cobots': ['collaborative robot', 'cobot', 'industrial robot', 'robot arm', 'automation'],
    'Warehouse & Logistics': ['warehouse robot', 'AMR', 'AGV', 'logistics automation', 'fulfillment robot'],
    'Education & Research': ['education robot', 'STEM robot', 'research robot', 'robot kit'],
  }

  for (const c of categories) {
    const name = c.name?.en || c.name?.de || ''
    const enTitle = `${name} — Browse & Compare | MegaRobotics`
    const deTitle = `${name} — Vergleichen & Kaufen | MegaRobotics`

    const enDesc = truncate(
      c.description?.en || `Browse and compare ${name.toLowerCase()} from top manufacturers. Specifications, pricing, and expert reviews at MegaRobotics.`,
      160
    )
    const deDesc = truncate(
      c.description?.de || `Vergleichen Sie ${name} von führenden Herstellern. Spezifikationen, Preise und Expertenberichte bei MegaRobotics.`,
      160
    )

    const keywords = [name, 'robotics', 'buy robots', 'compare robots']
    const extra = catKeywords[name] || []
    keywords.push(...extra)

    await client.patch(c._id).set({
      seo: {
        metaTitle: { en: truncate(enTitle, 60), de: truncate(deTitle, 60) },
        metaDescription: { en: enDesc, de: deDesc },
        keywords: [...new Set(keywords)],
      },
    }).commit()
    console.log(`  ✓ ${name}`)
  }
}

async function populatePageSEO() {
  const pages = await client.fetch('*[_type == "page"]{_id, title, pageType, seo}')
  console.log(`\n=== PAGES (${pages.length}) ===`)

  const pageSEO = {
    about: {
      en: {
        metaTitle: 'About MegaRobotics — Your Robotics Partner in Europe',
        metaDescription: 'MegaRobotics is Europe\'s leading robotics marketplace connecting businesses with top manufacturers. Discover our mission, team, and commitment to advancing robotics technology.',
        keywords: ['MegaRobotics', 'robotics company', 'robot marketplace', 'Europe robotics', 'DACH region', 'robotics partner'],
      },
      de: {
        metaTitle: 'Über MegaRobotics — Ihr Robotik-Partner in Europa',
        metaDescription: 'MegaRobotics ist Europas führender Robotik-Marktplatz. Entdecken Sie unsere Mission, unser Team und unser Engagement für die Weiterentwicklung der Robotik-Technologie.',
      },
    },
    imprint: {
      en: {
        metaTitle: 'Imprint & Legal Notice | MegaRobotics',
        metaDescription: 'Legal information and imprint (Impressum) for MegaRobotics. Company details, contact information, and regulatory disclosures as required by German law.',
        keywords: ['MegaRobotics imprint', 'Impressum', 'legal notice', 'company information'],
      },
      de: {
        metaTitle: 'Impressum & Rechtliche Hinweise | MegaRobotics',
        metaDescription: 'Impressum und rechtliche Informationen von MegaRobotics. Firmenangaben, Kontaktinformationen und gesetzliche Pflichtangaben gemäß deutschem Recht.',
      },
    },
    privacy: {
      en: {
        metaTitle: 'Privacy Policy | MegaRobotics',
        metaDescription: 'Learn how MegaRobotics collects, uses, and protects your personal data. Our privacy policy complies with GDPR and German data protection regulations.',
        keywords: ['privacy policy', 'data protection', 'GDPR', 'MegaRobotics privacy'],
      },
      de: {
        metaTitle: 'Datenschutzerklärung | MegaRobotics',
        metaDescription: 'Erfahren Sie, wie MegaRobotics Ihre personenbezogenen Daten erhebt, verwendet und schützt. Unsere Datenschutzerklärung entspricht der DSGVO.',
      },
    },
    terms: {
      en: {
        metaTitle: 'Terms of Service | MegaRobotics',
        metaDescription: 'Read the terms and conditions governing the use of the MegaRobotics platform, including product listings, ordering, and liability.',
        keywords: ['terms of service', 'terms and conditions', 'MegaRobotics terms'],
      },
      de: {
        metaTitle: 'Nutzungsbedingungen | MegaRobotics',
        metaDescription: 'Lesen Sie die Allgemeinen Geschäftsbedingungen für die Nutzung der MegaRobotics-Plattform, einschließlich Produktangebote, Bestellung und Haftung.',
      },
    },
    contact: {
      en: {
        metaTitle: 'Contact MegaRobotics — Get a Quote or Ask a Question',
        metaDescription: 'Contact MegaRobotics for robotics inquiries, product quotes, partnership opportunities, or technical support. We respond within 24 hours.',
        keywords: ['contact MegaRobotics', 'robot quote', 'robotics inquiry', 'buy robot Germany'],
      },
      de: {
        metaTitle: 'Kontakt MegaRobotics — Angebot anfordern',
        metaDescription: 'Kontaktieren Sie MegaRobotics für Robotik-Anfragen, Produktangebote, Partnerschaften oder technischen Support. Wir antworten innerhalb von 24 Stunden.',
      },
    },
  }

  for (const page of pages) {
    const data = pageSEO[page.pageType]
    if (data) {
      await client.patch(page._id).set({
        seo: {
          metaTitle: { en: data.en.metaTitle, de: data.de.metaTitle },
          metaDescription: { en: data.en.metaDescription, de: data.de.metaDescription },
          keywords: data.en.keywords,
        },
      }).commit()
      console.log(`  ✓ ${page.pageType} page`)
    }
  }
}

async function main() {
  console.log('Populating SEO metadata for all content...\n')
  await populateArticleSEO()
  await populateProductSEO()
  await populateManufacturerSEO()
  await populateProductCategorySEO()
  await populatePageSEO()
  console.log('\n✅ Done! All SEO metadata populated.')
  console.log('View in Sanity Studio: https://www.megarobotics.de/studio')
}

main().catch(console.error)
