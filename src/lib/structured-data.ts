const baseUrl = 'https://www.megarobotics.de'

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MegaRobotics',
    legalName: 'MEGAFORCE GmbH',
    url: baseUrl,
    logo: `${baseUrl}/og-image.png`,
    image: `${baseUrl}/og-image.png`,
    description:
      'Germany-based industrial robotics distributor and automation technology partner. Supporting European customers with robot sourcing, evaluation, and the development of robotic solutions across manufacturing, logistics, inspection, cleaning, research and service environments.',
    foundingLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: 'Kaarst', addressCountry: 'DE' },
    },
    areaServed: ['DE', 'AT', 'CH', 'EU'],
    knowsAbout: [
      'Industrial robotics',
      'Automation technology',
      'Robot platforms',
      'End effectors and grippers',
      'PLC and industrial control',
      'Industrial sensors and vision',
      'Functional safety',
      'Industrial communication',
      'SCADA and HMI software',
    ],
    sameAs: [
      'https://x.com/megarobotics_de',
      'https://linkedin.com/company/megarobotics',
      'https://youtube.com/@megarobotics',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'info@megarobotics.de',
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

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MegaRobotics',
    url: baseUrl,
    description:
      'Industrial robotics and automation solutions — distribution, evaluation, sourcing and integration coordination for European customers.',
    inLanguage: ['en', 'de'],
    publisher: {
      '@type': 'Organization',
      name: 'MegaRobotics',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/og-image.png`,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/products?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateArticleSchema(article: {
  title: string
  excerpt: string
  slug: string
  publishedAt: string
  updatedAt?: string
  author: { name: string; image?: string }
  mainImage?: string
  category?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    url: `${baseUrl}/articles/${article.slug}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'MegaRobotics',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    image: article.mainImage || `${baseUrl}/og-image.png`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/articles/${article.slug}`,
    },
    articleSection: article.category || 'News',
    keywords: ['robotics', 'robots', 'automation', 'AI', article.category].filter(Boolean).join(', '),
  }
}

export function generateProductSchema(product: {
  name: string
  description: string
  slug: string
  image?: string
  mainImage?: string
  priceRange?: string
  manufacturer?: string
  category?: string
  availability?: string
  specifications?: { label: string; value: string }[]
}) {
  const imageUrl = product.mainImage || product.image || `${baseUrl}/og-image.png`

  // Map availability values to schema.org values
  const availabilityMap: Record<string, string> = {
    available: 'https://schema.org/InStock',
    preorder: 'https://schema.org/PreOrder',
    coming_soon: 'https://schema.org/PreSale',
    contact: 'https://schema.org/LimitedAvailability',
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    url: `${baseUrl}/products/${product.slug}`,
    image: imageUrl,
    brand: product.manufacturer ? {
      '@type': 'Brand',
      name: product.manufacturer,
    } : undefined,
    category: product.category,
    offers: product.priceRange ? {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      availability: availabilityMap[product.availability || ''] || 'https://schema.org/LimitedAvailability',
      description: product.priceRange,
    } : undefined,
    additionalProperty: product.specifications?.slice(0, 10).map(spec => ({
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
    url: `${baseUrl}/manufacturers/${manufacturer.slug}`,
    logo: manufacturer.logo,
    sameAs: manufacturer.website ? [manufacturer.website] : undefined,
    foundingDate: manufacturer.founded,
    address: manufacturer.headquarters ? {
      '@type': 'PostalAddress',
      addressLocality: manufacturer.headquarters,
    } : undefined,
  }
}

export function generateBreadcrumbSchema(items: { name: string; href?: string; url?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const path = item.href || item.url || ''
      const absolute = /^https?:\/\//i.test(path)
        ? path
        : `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`
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

export function generateCategorySchema(category: {
  name: string
  description?: string
  slug: string
  productCount?: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description || `Browse ${category.name} products`,
    url: `${baseUrl}/products/category/${category.slug}`,
    numberOfItems: category.productCount,
    mainEntity: {
      '@type': 'ItemList',
      name: category.name,
      numberOfItems: category.productCount,
    },
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

export function generateGuideSchema(guide: {
  title: string
  description: string
  slug: string
  publishedAt: string
  updatedAt?: string
  author: string
  mainImage?: string
  readTime?: number
  tags?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: guide.title,
    description: guide.description,
    url: `${baseUrl}/guides/${guide.slug}`,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt || guide.publishedAt,
    author: {
      '@type': 'Person',
      name: guide.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'MegaRobotics',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    image: guide.mainImage || `${baseUrl}/og-image.png`,
    totalTime: guide.readTime ? `PT${guide.readTime}M` : undefined,
    keywords: guide.tags?.join(', '),
  }
}
