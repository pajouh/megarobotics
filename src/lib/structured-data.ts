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
  priceRange?: string
  manufacturer: string
  category: string
  availability?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    url: `${baseUrl}/products/${product.slug}`,
    image: product.image || `${baseUrl}/og-image.png`,
    brand: {
      '@type': 'Brand',
      name: product.manufacturer,
    },
    category: product.category,
    offers: product.priceRange ? {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      availability: product.availability === 'Available'
        ? 'https://schema.org/InStock'
        : product.availability === 'Pre-order'
          ? 'https://schema.org/PreOrder'
          : 'https://schema.org/OutOfStock',
      description: product.priceRange,
    } : undefined,
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

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
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
