const baseUrl = 'https://www.megarobotics.de'

// Stable node ids so every schema on a page points at the same company entity.
const ORGANIZATION_ID = `${baseUrl}/#organization`
const WEBSITE_ID = `${baseUrl}/#website`
const LOGO = { '@type': 'ImageObject', url: `${baseUrl}/icon-512.png`, width: 512, height: 512 }

// Full enough to validate on pages that don't also emit the Organization node.
const PUBLISHER = { '@type': 'Organization', '@id': ORGANIZATION_ID, name: 'MegaRobotics', logo: LOGO }

const inLanguage = (locale: string) => (locale === 'de' ? 'de-DE' : 'en')

// "MegaRobotics Editorial" is a team, not a Person: claiming otherwise fails
// Google's author guidance.
function authorNode(name: string) {
  return /megarobotics/i.test(name) ? { '@type': 'Organization', '@id': ORGANIZATION_ID, name } : { '@type': 'Person', name }
}

const ORGANIZATION_DESCRIPTION: Record<string, string> = {
  en: 'Germany-based robot distributor and automation technology partner. Supporting European customers with robot sourcing, evaluation and integration across manufacturing, logistics, inspection, cleaning, research and service environments.',
  de: 'Roboter-Distributor und Automatisierungspartner aus Deutschland. Wir unterstützen Kunden in Europa bei Beschaffung, Evaluierung und Integration von Robotern für Fertigung, Logistik, Inspektion, Reinigung, Forschung und Service.',
}

export function generateOrganizationSchema(locale: string = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'MegaRobotics',
    legalName: 'MEGAFORCE GmbH',
    url: baseUrl,
    logo: LOGO,
    image: `${baseUrl}/og-image.png`,
    description: ORGANIZATION_DESCRIPTION[locale] ?? ORGANIZATION_DESCRIPTION.en,
    vatID: 'DE813764801',
    areaServed: ['DE', 'AT', 'CH', 'EU'],
    knowsAbout: [
      'Industrial robotics',
      'Humanoid robots',
      'Collaborative robots',
      'Automation technology',
      'End effectors and grippers',
      'Robotic palletizing',
      'Service and cleaning robots',
      'Research robotics',
    ],
    sameAs: [
      'https://x.com/megarobotics_de',
      'https://www.linkedin.com/company/megarobotics',
      'https://www.youtube.com/@megaroboticsDE',
      'https://www.instagram.com/megarobotics.de/',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'info@megarobotics.de',
      telephone: '+49-172-2008875',
      availableLanguage: ['English', 'German'],
      areaServed: 'EU',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Wacholderweg 8',
      postalCode: '41564',
      addressLocality: 'Kaarst',
      addressCountry: 'DE',
    },
  }
}

export function generateWebSiteSchema(locale: string = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'MegaRobotics',
    url: baseUrl,
    inLanguage: ['en', 'de-DE'],
    publisher: { '@id': ORGANIZATION_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${localizedUrl('/products', locale)}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/** AboutPage / ContactPage wrapper for the company pages. */
export function generateWebPageSchema(page: {
  type: 'AboutPage' | 'ContactPage'
  name: string
  description: string
  path: string
  locale: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': page.type,
    name: page.name,
    description: page.description,
    url: localizedUrl(page.path, page.locale),
    inLanguage: inLanguage(page.locale),
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORGANIZATION_ID },
  }
}

export function generateArticleSchema(article: {
  title: string
  excerpt: string
  slug: string
  locale?: string
  publishedAt?: string
  updatedAt?: string
  author: { name: string; image?: string }
  mainImage?: string
  category?: string
  keywords?: string[]
}) {
  const url = localizedUrl(`/articles/${article.slug}`, article.locale ?? 'en')
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    url,
    inLanguage: inLanguage(article.locale ?? 'en'),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: authorNode(article.author.name),
    publisher: PUBLISHER,
    image: article.mainImage || `${baseUrl}/og-image.png`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    articleSection: article.category,
    keywords: article.keywords?.length ? article.keywords.join(', ') : undefined,
  }
}

// No `offers`: every product is priced on request, and Google requires a numeric
// price on Offer / AggregateOffer. An offer without one is an error in Search
// Console and can't earn a rich result, so the page simply makes no price claim.
export function generateProductSchema(product: {
  name: string
  description: string
  slug: string
  locale?: string
  image?: string
  mainImage?: string
  manufacturer?: string
  category?: string
  specifications?: { label: string; value: string }[]
}) {
  const url = localizedUrl(`/products/${product.slug}`, product.locale ?? 'en')
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    name: product.name,
    description: product.description,
    url,
    image: product.mainImage || product.image || `${baseUrl}/og-image.png`,
    brand: product.manufacturer ? { '@type': 'Brand', name: product.manufacturer } : undefined,
    manufacturer: product.manufacturer ? { '@type': 'Organization', name: product.manufacturer } : undefined,
    category: product.category,
    additionalProperty: product.specifications?.map((spec) => ({
      '@type': 'PropertyValue',
      name: spec.label,
      value: spec.value,
    })),
  }
}

export function generateManufacturerSchema(manufacturer: {
  name: string
  description?: string
  slug: string
  locale?: string
  logo?: string
  website?: string
  headquarters?: string
  founded?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: manufacturer.name,
    description: manufacturer.description,
    url: localizedUrl(`/manufacturers/${manufacturer.slug}`, manufacturer.locale ?? 'en'),
    logo: manufacturer.logo,
    sameAs: manufacturer.website ? [manufacturer.website] : undefined,
    foundingDate: manufacturer.founded,
    address: manufacturer.headquarters ? {
      '@type': 'PostalAddress',
      addressLocality: manufacturer.headquarters,
    } : undefined,
  }
}

export function generateBreadcrumbSchema(items: { name: string; href?: string; url?: string }[], locale: string = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const path = item.href || item.url || ''
      const absolute = /^https?:\/\//i.test(path)
        ? path
        : localizedUrl(path === '/' ? '' : path.startsWith('/') ? path : `/${path}`, locale)
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: absolute,
      }
    }),
  }
}

// Helper to generate hreflang alternates for Next.js metadata.
//
// The site runs next-intl with `localePrefix: 'as-needed'`, so the default
// locale (en) is served WITHOUT a prefix and `/en/...` 307-redirects to the
// unprefixed path. Therefore:
//  - the EN canonical/hreflang URL must be unprefixed (`/about`, not `/en/about`)
//  - the canonical must reflect the CURRENT locale (a `/de/...` page must be
//    self-canonical, not point at the English page)
export function localizedUrl(path: string, locale: string): string {
  return locale === 'en' ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`
}

export function generateAlternates(
  path: string,
  locale: string = 'en',
  locales: string[] = ['en', 'de'],
) {
  const languages: Record<string, string> = {}
  locales.forEach((l) => {
    languages[l] = localizedUrl(path, l)
  })
  languages['x-default'] = localizedUrl(path, 'en')

  return {
    canonical: localizedUrl(path, locale),
    languages,
  }
}

/** A listing page (catalogue, product family) and the products it links to. */
export function generateCollectionSchema(collection: {
  name: string
  description?: string
  path: string
  locale: string
  items: { name: string; path: string }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.name,
    description: collection.description,
    url: localizedUrl(collection.path, collection.locale),
    inLanguage: inLanguage(collection.locale),
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: collection.items.length,
      itemListElement: collection.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: localizedUrl(item.path, collection.locale),
      })),
    },
  }
}

export function generateServiceSchema(service: {
  name: string
  description?: string
  path: string
  locale: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: localizedUrl(service.path, service.locale),
    image: service.image,
    provider: PUBLISHER,
    areaServed: ['DE', 'AT', 'CH', 'EU'],
  }
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Buyers' guides are articles. They were marked up as HowTo, which needs
// step-by-step content they don't have, and Google has retired that rich result.
export function generateGuideSchema(guide: {
  title: string
  description: string
  slug: string
  publishedAt?: string
  updatedAt?: string
  author: string
  mainImage?: string
  tags?: string[]
}) {
  const url = localizedUrl(`/guides/${guide.slug}`, 'en')
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    url,
    inLanguage: 'en',
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt || guide.publishedAt,
    author: authorNode(guide.author),
    publisher: PUBLISHER,
    image: guide.mainImage || `${baseUrl}/og-image.png`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: guide.tags?.join(', '),
  }
}
