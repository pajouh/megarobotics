import { createClient, type SanityClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImage, Article, Category, Author, Product, ProductCategory, Manufacturer } from '@/types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Default locale for queries
export type Locale = 'en' | 'de'
const defaultLocale: Locale = 'en'

// Create a null-safe client that handles missing configuration
function createSanityClient(): SanityClient | null {
  if (!projectId) {
    console.warn('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable')
    return null
  }
  return createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    useCdn: process.env.NODE_ENV === 'production',
  })
}

export const client = createSanityClient()

const builder = client ? imageUrlBuilder(client) : null

// Create a chainable placeholder for when builder is not available
function createPlaceholder(): ReturnType<typeof imageUrlBuilder>['image'] {
  const placeholder = {
    url: () => '/placeholder.jpg',
    width: () => placeholder,
    height: () => placeholder,
    fit: () => placeholder,
    auto: () => placeholder,
    quality: () => placeholder,
    format: () => placeholder,
    crop: () => placeholder,
    blur: () => placeholder,
    sharpen: () => placeholder,
    rect: () => placeholder,
    flipHorizontal: () => placeholder,
    flipVertical: () => placeholder,
    orientation: () => placeholder,
    minWidth: () => placeholder,
    maxWidth: () => placeholder,
    minHeight: () => placeholder,
    maxHeight: () => placeholder,
    size: () => placeholder,
    focalPoint: () => placeholder,
    saturation: () => placeholder,
    dpr: () => placeholder,
    pad: () => placeholder,
    bg: () => placeholder,
    image: () => placeholder,
  } as unknown as ReturnType<ReturnType<typeof imageUrlBuilder>['image']>
  return () => placeholder
}

export function urlFor(source: SanityImage) {
  if (!builder) {
    // Return a placeholder during build or when config is missing
    return createPlaceholder()(source)
  }
  return builder.image(source)
}

// Helper to create localized field projections with fallback
function localizedField(field: string, locale: Locale = defaultLocale): string {
  const fallback = locale === 'en' ? 'de' : 'en'
  return `coalesce(${field}.${locale}, ${field}.${fallback}, ${field})`
}

// Helper for localized array fields
function localizedArrayField(field: string, locale: Locale = defaultLocale): string {
  const fallback = locale === 'en' ? 'de' : 'en'
  return `coalesce(${field}.${locale}, ${field}.${fallback}, ${field})`
}


// GROQ Queries - Articles
function getArticleFields(locale: Locale = defaultLocale) {
  return `
    _id,
    _type,
    "title": ${localizedField('title', locale)},
    slug,
    "excerpt": ${localizedField('excerpt', locale)},
    mainImage,
    publishedAt,
    readTime,
    featured,
    category->{
      _id,
      "title": ${localizedField('title', locale)},
      slug,
      "description": ${localizedField('description', locale)},
      icon,
      color
    },
    author->{
      _id,
      name,
      slug,
      image,
      bio,
      twitter,
      linkedin
    }
  `
}

function getArticleWithBodyFields(locale: Locale = defaultLocale) {
  return `
    ${getArticleFields(locale)},
    "body": ${localizedField('body', locale)}
  `
}

// Get all articles with optional limit
export async function getArticles(limit?: number, locale: Locale = defaultLocale): Promise<Article[]> {
  if (!client) return []
  const limitQuery = limit ? `[0...${limit}]` : ''
  return client.fetch(
    `*[_type == "article"] | order(publishedAt desc)${limitQuery} {
      ${getArticleFields(locale)}
    }`
  )
}

// Get a single article by slug
export async function getArticle(slug: string, locale: Locale = defaultLocale): Promise<Article | null> {
  if (!client) return null
  return client.fetch(
    `*[_type == "article" && slug.current == $slug][0] {
      ${getArticleWithBodyFields(locale)}
    }`,
    { slug }
  )
}

// Get featured articles
export async function getFeaturedArticles(limit: number = 3, locale: Locale = defaultLocale): Promise<Article[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "article" && featured == true] | order(publishedAt desc)[0...${limit}] {
      ${getArticleFields(locale)}
    }`
  )
}

// Get articles by category
export async function getArticlesByCategory(categorySlug: string, limit?: number, locale: Locale = defaultLocale): Promise<Article[]> {
  if (!client) return []
  const limitQuery = limit ? `[0...${limit}]` : ''
  return client.fetch(
    `*[_type == "article" && category->slug.current == $categorySlug] | order(publishedAt desc)${limitQuery} {
      ${getArticleFields(locale)}
    }`,
    { categorySlug }
  )
}

// Get all categories
export async function getCategories(locale: Locale = defaultLocale): Promise<Category[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "category"] | order(title.${locale} asc) {
      _id,
      "title": ${localizedField('title', locale)},
      slug,
      "description": ${localizedField('description', locale)},
      icon,
      color
    }`
  )
}

// Get a single category by slug
export async function getCategory(slug: string, locale: Locale = defaultLocale): Promise<Category | null> {
  if (!client) return null
  return client.fetch(
    `*[_type == "category" && slug.current == $slug][0] {
      _id,
      "title": ${localizedField('title', locale)},
      slug,
      "description": ${localizedField('description', locale)},
      icon,
      color
    }`,
    { slug }
  )
}

// Get all authors
export async function getAuthors(): Promise<Author[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "author"] | order(name asc) {
      _id,
      name,
      slug,
      image,
      bio,
      twitter,
      linkedin
    }`
  )
}

// Get related articles (same category, excluding current)
export async function getRelatedArticles(articleId: string, categorySlug: string, limit: number = 3, locale: Locale = defaultLocale): Promise<Article[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "article" && _id != $articleId && category->slug.current == $categorySlug] | order(publishedAt desc)[0...${limit}] {
      ${getArticleFields(locale)}
    }`,
    { articleId, categorySlug }
  )
}

// Search articles
export async function searchArticles(searchTerm: string, locale: Locale = defaultLocale): Promise<Article[]> {
  if (!client) return []
  const searchQuery = `*${searchTerm}*`
  return client.fetch<Article[]>(
    `*[_type == "article" && (title.${locale} match $searchQuery || title.en match $searchQuery || excerpt.${locale} match $searchQuery)] | order(publishedAt desc) {
      ${getArticleFields(locale)}
    }`,
    { searchQuery }
  )
}

// Get all article slugs (for static generation)
export async function getAllArticleSlugs(): Promise<{ slug: string }[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "article" && defined(slug.current)][].slug.current`
  ).then((slugs: string[]) => slugs.map(slug => ({ slug })))
}

// Get all category slugs (for static generation)
export async function getAllCategorySlugs(): Promise<{ slug: string }[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "category" && defined(slug.current)][].slug.current`
  ).then((slugs: string[]) => slugs.map(slug => ({ slug })))
}


// ==========================================
// PRODUCT SYSTEM QUERIES
// ==========================================

function getManufacturerFields(locale: Locale = defaultLocale) {
  return `
    _id,
    _type,
    name,
    slug,
    logo,
    "description": ${localizedField('description', locale)},
    website,
    headquarters,
    founded,
    "specialties": ${localizedArrayField('specialties', locale)},
    featured
  `
}

function getProductCategoryFields(locale: Locale = defaultLocale) {
  return `
    _id,
    _type,
    "name": ${localizedField('name', locale)},
    slug,
    "description": ${localizedField('description', locale)},
    icon,
    image,
    order
  `
}

function getProductFields(locale: Locale = defaultLocale) {
  return `
    _id,
    _type,
    name,
    slug,
    "tagline": ${localizedField('tagline', locale)},
    "description": ${localizedField('description', locale)},
    mainImage,
    priceRange,
    availability,
    featured,
    isNew,
    publishedAt,
    order,
    manufacturer->{
      ${getManufacturerFields(locale)}
    },
    category->{
      ${getProductCategoryFields(locale)}
    }
  `
}

function getProductWithFullFields(locale: Locale = defaultLocale) {
  return `
    ${getProductFields(locale)},
    "fullDescription": ${localizedField('fullDescription', locale)},
    gallery,
    videoUrl,
    specifications,
    "features": ${localizedArrayField('features', locale)},
    "applications": ${localizedArrayField('applications', locale)},
    productUrl,
    datasheetUrl
  `
}

// Get all products with optional limit
export async function getProducts(limit?: number, locale: Locale = defaultLocale): Promise<Product[]> {
  if (!client) return []
  const limitQuery = limit ? `[0...${limit}]` : ''
  return client.fetch(
    `*[_type == "product"] | order(order asc, name asc)${limitQuery} {
      ${getProductFields(locale)}
    }`
  )
}

// Get a single product by slug
export async function getProduct(slug: string, locale: Locale = defaultLocale): Promise<Product | null> {
  if (!client) return null
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      ${getProductWithFullFields(locale)}
    }`,
    { slug }
  )
}

// Get featured products
export async function getFeaturedProducts(limit: number = 6, locale: Locale = defaultLocale): Promise<Product[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "product" && featured == true] | order(order asc, name asc)[0...${limit}] {
      ${getProductFields(locale)}
    }`
  )
}

// Get products by category
export async function getProductsByCategory(categorySlug: string, limit?: number, locale: Locale = defaultLocale): Promise<Product[]> {
  if (!client) return []
  const limitQuery = limit ? `[0...${limit}]` : ''
  return client.fetch(
    `*[_type == "product" && category->slug.current == $categorySlug] | order(order asc, name asc)${limitQuery} {
      ${getProductFields(locale)}
    }`,
    { categorySlug }
  )
}

// Get products by manufacturer
export async function getProductsByManufacturer(manufacturerSlug: string, limit?: number, locale: Locale = defaultLocale): Promise<Product[]> {
  if (!client) return []
  const limitQuery = limit ? `[0...${limit}]` : ''
  return client.fetch(
    `*[_type == "product" && manufacturer->slug.current == $manufacturerSlug] | order(order asc, name asc)${limitQuery} {
      ${getProductFields(locale)}
    }`,
    { manufacturerSlug }
  )
}

// Get related products (same category, excluding current)
export async function getRelatedProducts(productId: string, categorySlug: string, limit: number = 4, locale: Locale = defaultLocale): Promise<Product[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "product" && _id != $productId && category->slug.current == $categorySlug] | order(order asc, name asc)[0...${limit}] {
      ${getProductFields(locale)}
    }`,
    { productId, categorySlug }
  )
}

// Get products by same manufacturer (excluding current)
export async function getProductsBySameManufacturer(productId: string, manufacturerSlug: string, limit: number = 4, locale: Locale = defaultLocale): Promise<Product[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "product" && _id != $productId && manufacturer->slug.current == $manufacturerSlug] | order(order asc, name asc)[0...${limit}] {
      ${getProductFields(locale)}
    }`,
    { productId, manufacturerSlug }
  )
}

// Get all manufacturers
export async function getManufacturers(locale: Locale = defaultLocale): Promise<Manufacturer[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "manufacturer"] | order(name asc) {
      ${getManufacturerFields(locale)},
      "productCount": count(*[_type == "product" && references(^._id)])
    }`
  )
}

// Get featured manufacturers
export async function getFeaturedManufacturers(limit: number = 8, locale: Locale = defaultLocale): Promise<Manufacturer[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "manufacturer" && featured == true] | order(name asc)[0...${limit}] {
      ${getManufacturerFields(locale)},
      "productCount": count(*[_type == "product" && references(^._id)])
    }`
  )
}

// Get a single manufacturer by slug
export async function getManufacturer(slug: string, locale: Locale = defaultLocale): Promise<Manufacturer | null> {
  if (!client) return null
  return client.fetch(
    `*[_type == "manufacturer" && slug.current == $slug][0] {
      ${getManufacturerFields(locale)},
      "productCount": count(*[_type == "product" && references(^._id)])
    }`,
    { slug }
  )
}

// Get all product categories
export async function getProductCategories(locale: Locale = defaultLocale): Promise<ProductCategory[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "productCategory"] | order(order asc, name.${locale} asc) {
      ${getProductCategoryFields(locale)},
      "productCount": count(*[_type == "product" && references(^._id)])
    }`
  )
}

// Get a single product category by slug
export async function getProductCategory(slug: string, locale: Locale = defaultLocale): Promise<ProductCategory | null> {
  if (!client) return null
  return client.fetch(
    `*[_type == "productCategory" && slug.current == $slug][0] {
      ${getProductCategoryFields(locale)},
      "productCount": count(*[_type == "product" && references(^._id)])
    }`,
    { slug }
  )
}

// Search products
export async function searchProducts(searchTerm: string, locale: Locale = defaultLocale): Promise<Product[]> {
  if (!client) return []
  const searchQuery = `*${searchTerm}*`
  return client.fetch<Product[]>(
    `*[_type == "product" && (name match $searchQuery || description.${locale} match $searchQuery || tagline.${locale} match $searchQuery)] | order(name asc) {
      ${getProductFields(locale)}
    }`,
    { searchQuery }
  )
}

// Get all product slugs (for static generation)
export async function getAllProductSlugs(): Promise<{ slug: string }[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "product" && defined(slug.current)][].slug.current`
  ).then((slugs: string[]) => slugs.map(slug => ({ slug })))
}

// Get all manufacturer slugs (for static generation)
export async function getAllManufacturerSlugs(): Promise<{ slug: string }[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "manufacturer" && defined(slug.current)][].slug.current`
  ).then((slugs: string[]) => slugs.map(slug => ({ slug })))
}

// Get all product category slugs (for static generation)
export async function getAllProductCategorySlugs(): Promise<{ slug: string }[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "productCategory" && defined(slug.current)][].slug.current`
  ).then((slugs: string[]) => slugs.map(slug => ({ slug })))
}


// ==========================================
// BUYERS GUIDE QUERIES
// ==========================================

const buyersGuideFields = `
  _id,
  _type,
  title,
  slug,
  shortDescription,
  mainImage,
  publishedAt,
  updatedAt,
  author,
  readTime,
  seo,
  news
`

const buyersGuideWithBodyFields = `
  ${buyersGuideFields},
  body[] {
    ...,
    _type == "richImage" => {
      _type,
      alt,
      caption,
      credit,
      sourceUrl,
      licenseUrl,
      image {
        asset,
        hotspot
      }
    }
  }
`

// Get all buyers guides
export async function getBuyersGuides(limit?: number) {
  if (!client) return []
  const limitQuery = limit ? `[0...${limit}]` : ''
  return client.fetch(
    `*[_type == "buyersGuide"] | order(updatedAt desc)${limitQuery} {
      ${buyersGuideFields}
    }`
  )
}

// Get a single buyers guide by slug
export async function getBuyersGuide(slug: string) {
  if (!client) return null
  return client.fetch(
    `*[_type == "buyersGuide" && slug.current == $slug][0] {
      ${buyersGuideWithBodyFields}
    }`,
    { slug }
  )
}

// Get all buyers guide slugs (for static generation)
export async function getAllBuyersGuideSlugs(): Promise<{ slug: string }[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "buyersGuide" && defined(slug.current)][].slug.current`
  ).then((slugs: string[]) => slugs.map(slug => ({ slug })))
}


// ==========================================
// SITE SETTINGS & PAGES QUERIES
// ==========================================

// Get site settings (singleton)
export async function getSiteSettings(locale: Locale = defaultLocale) {
  if (!client) return null
  return client.fetch(
    `*[_type == "siteSettings"][0] {
      siteName,
      "siteTagline": ${localizedField('siteTagline', locale)},
      logo,
      logoWidth,
      logoHeight,
      "footerDescription": ${localizedField('footerDescription', locale)},
      footerLinks[] {
        "title": ${localizedField('title', locale)},
        links[] {
          "label": ${localizedField('label', locale)},
          url
        }
      },
      "copyrightText": ${localizedField('copyrightText', locale)},
      socialLinks,
      contactEmail,
      contactPhone,
      "address": ${localizedField('address', locale)}
    }`
  )
}

// Get a page by slug
export async function getPage(slug: string, locale: Locale = defaultLocale) {
  if (!client) return null
  return client.fetch(
    `*[_type == "page" && slug.current == $slug][0] {
      _id,
      "title": ${localizedField('title', locale)},
      slug,
      pageType,
      "subtitle": ${localizedField('subtitle', locale)},
      "body": ${localizedField('body', locale)},
      seo {
        "metaTitle": ${localizedField('metaTitle', locale)},
        "metaDescription": ${localizedField('metaDescription', locale)}
      },
      lastUpdated
    }`,
    { slug }
  )
}

// Get a page by type (e.g., 'about', 'imprint', 'privacy')
export async function getPageByType(pageType: string, locale: Locale = defaultLocale) {
  if (!client) return null
  return client.fetch(
    `*[_type == "page" && pageType == $pageType][0] {
      _id,
      "title": ${localizedField('title', locale)},
      slug,
      pageType,
      "subtitle": ${localizedField('subtitle', locale)},
      "body": ${localizedField('body', locale)},
      seo {
        "metaTitle": ${localizedField('metaTitle', locale)},
        "metaDescription": ${localizedField('metaDescription', locale)}
      },
      lastUpdated
    }`,
    { pageType }
  )
}

// Get all page slugs (for static generation)
export async function getAllPageSlugs(): Promise<{ slug: string }[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "page" && defined(slug.current)][].slug.current`
  ).then((slugs: string[]) => slugs.map(slug => ({ slug })))
}


// ==========================================
// HERO BANNER QUERIES
// ==========================================

export interface HeroBannerSlide {
  _id: string
  title: string
  subtitle?: string
  mediaType: 'image' | 'video' | 'youtube'
  image?: SanityImage
  video?: {
    asset: {
      _ref: string
      url?: string
    }
  }
  youtubeUrl?: string
  overlayOpacity?: number
  textColor?: 'white' | 'dark'
  ctaButton?: {
    text?: string
    url?: string
    style?: 'primary' | 'secondary'
  }
  secondaryButton?: {
    text?: string
    url?: string
  }
  order: number
  isActive: boolean
}

// Get active hero banner slides
export async function getHeroBannerSlides(): Promise<HeroBannerSlide[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "heroBanner" && isActive == true] | order(order asc) {
      _id,
      title,
      subtitle,
      mediaType,
      image,
      "video": video {
        "asset": asset->{
          _ref,
          url
        }
      },
      youtubeUrl,
      overlayOpacity,
      textColor,
      ctaButton,
      secondaryButton,
      order,
      isActive
    }`
  )
}
