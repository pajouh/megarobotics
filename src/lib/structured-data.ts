const baseUrl = 'https://megarobotics.de'

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MegaRobotics',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'Your premier source for robotics news, product reviews, and industry analysis. Covering humanoid robots, quadrupeds, industrial automation, AI integration, and the future of intelligent machines.',
    sameAs: [
      'https://twitter.com/megarobotics',
      'https://linkedin.com/company/megarobotics',
      'https://youtube.com/@megarobotics',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@megarobotics.de',
      availableLanguage: ['English', 'German'],
    },
    address: {
      '@type': 'PostalAddress',
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
    description: 'Robotics News, Reviews & Industry Insights',
    publisher: {
      '@type': 'Organization',
      name: 'MegaRobotics',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
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
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.href || item.url || ''}`,
    })),
  }
}

// Helper to generate hreflang alternates for Next.js metadata
export function generateAlternates(path: string, locales: string[] = ['en', 'de']) {
  const languages: Record<string, string> = {}
  locales.forEach(locale => {
    languages[locale] = `${baseUrl}/${locale}${path}`
  })
  languages['x-default'] = `${baseUrl}/en${path}`

  return {
    canonical: `${baseUrl}${path}`,
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
