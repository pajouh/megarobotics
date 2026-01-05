import { createClient, type SanityClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImage, Article, Category, Author, Product, ProductCategory, Manufacturer } from '@/types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

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

export function urlFor(source: SanityImage) {
  if (!builder) {
    // Return a placeholder during build or when config is missing
    return { url: () => '/placeholder.jpg', width: () => ({ height: () => ({ url: () => '/placeholder.jpg' }) }) }
  }
  return builder.image(source)
}


// GROQ Queries - Articles
const articleFields = `
  _id,
  _type,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  readTime,
  featured,
  category->{
    _id,
    title,
    slug,
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

const articleWithBodyFields = `
  ${articleFields},
  body
`

// Get all articles with optional limit
export async function getArticles(limit?: number): Promise<Article[]> {
  if (!client) return []
  const limitQuery = limit ? `[0...${limit}]` : ''
  return client.fetch(
    `*[_type == "article"] | order(publishedAt desc)${limitQuery} {
      ${articleFields}
    }`
  )
}

// Get a single article by slug
export async function getArticle(slug: string): Promise<Article | null> {
  if (!client) return null
  return client.fetch(
    `*[_type == "article" && slug.current == $slug][0] {
      ${articleWithBodyFields}
    }`,
    { slug }
  )
}

// Get featured articles
export async function getFeaturedArticles(limit: number = 3): Promise<Article[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "article" && featured == true] | order(publishedAt desc)[0...${limit}] {
      ${articleFields}
    }`
  )
}

// Get articles by category
export async function getArticlesByCategory(categorySlug: string, limit?: number): Promise<Article[]> {
  if (!client) return []
  const limitQuery = limit ? `[0...${limit}]` : ''
  return client.fetch(
    `*[_type == "article" && category->slug.current == $categorySlug] | order(publishedAt desc)${limitQuery} {
      ${articleFields}
    }`,
    { categorySlug }
  )
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
      description,
      icon,
      color
    }`
  )
}

// Get a single category by slug
export async function getCategory(slug: string): Promise<Category | null> {
  if (!client) return null
  return client.fetch(
    `*[_type == "category" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
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
export async function getRelatedArticles(articleId: string, categorySlug: string, limit: number = 3): Promise<Article[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "article" && _id != $articleId && category->slug.current == $categorySlug] | order(publishedAt desc)[0...${limit}] {
      ${articleFields}
    }`,
    { articleId, categorySlug }
  )
}

// Search articles
export async function searchArticles(searchTerm: string): Promise<Article[]> {
  if (!client) return []
  const searchQuery = `*${searchTerm}*`
  return client.fetch<Article[]>(
    `*[_type == "article" && (title match $searchQuery || excerpt match $searchQuery)] | order(publishedAt desc) {
      ${articleFields}
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

const manufacturerFields = `
  _id,
  _type,
  name,
  slug,
  logo,
  description,
  website,
  headquarters,
  founded,
  specialties,
  featured
`

const productCategoryFields = `
  _id,
  _type,
  name,
  slug,
  description,
  icon,
  image,
  order
`

const productFields = `
  _id,
  _type,
  name,
  slug,
  tagline,
  description,
  mainImage,
  priceRange,
  availability,
  featured,
  isNew,
  publishedAt,
  order,
  manufacturer->{
    ${manufacturerFields}
  },
  category->{
    ${productCategoryFields}
  }
`

const productWithFullFields = `
  ${productFields},
  fullDescription,
  gallery,
  videoUrl,
  specifications,
  features,
  applications,
  productUrl,
  datasheetUrl
`

// Get all products with optional limit
export async function getProducts(limit?: number): Promise<Product[]> {
  if (!client) return []
  const limitQuery = limit ? `[0...${limit}]` : ''
  return client.fetch(
    `*[_type == "product"] | order(order asc, name asc)${limitQuery} {
      ${productFields}
    }`
  )
}

// Get a single product by slug
export async function getProduct(slug: string): Promise<Product | null> {
  if (!client) return null
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      ${productWithFullFields}
    }`,
    { slug }
  )
}

// Get featured products
export async function getFeaturedProducts(limit: number = 6): Promise<Product[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "product" && featured == true] | order(order asc, name asc)[0...${limit}] {
      ${productFields}
    }`
  )
}

// Get products by category
export async function getProductsByCategory(categorySlug: string, limit?: number): Promise<Product[]> {
  if (!client) return []
  const limitQuery = limit ? `[0...${limit}]` : ''
  return client.fetch(
    `*[_type == "product" && category->slug.current == $categorySlug] | order(order asc, name asc)${limitQuery} {
      ${productFields}
    }`,
    { categorySlug }
  )
}

// Get products by manufacturer
export async function getProductsByManufacturer(manufacturerSlug: string, limit?: number): Promise<Product[]> {
  if (!client) return []
  const limitQuery = limit ? `[0...${limit}]` : ''
  return client.fetch(
    `*[_type == "product" && manufacturer->slug.current == $manufacturerSlug] | order(order asc, name asc)${limitQuery} {
      ${productFields}
    }`,
    { manufacturerSlug }
  )
}

// Get related products (same category, excluding current)
export async function getRelatedProducts(productId: string, categorySlug: string, limit: number = 4): Promise<Product[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "product" && _id != $productId && category->slug.current == $categorySlug] | order(order asc, name asc)[0...${limit}] {
      ${productFields}
    }`,
    { productId, categorySlug }
  )
}

// Get products by same manufacturer (excluding current)
export async function getProductsBySameManufacturer(productId: string, manufacturerSlug: string, limit: number = 4): Promise<Product[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "product" && _id != $productId && manufacturer->slug.current == $manufacturerSlug] | order(order asc, name asc)[0...${limit}] {
      ${productFields}
    }`,
    { productId, manufacturerSlug }
  )
}

// Get all manufacturers
export async function getManufacturers(): Promise<Manufacturer[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "manufacturer"] | order(name asc) {
      ${manufacturerFields},
      "productCount": count(*[_type == "product" && references(^._id)])
    }`
  )
}

// Get featured manufacturers
export async function getFeaturedManufacturers(limit: number = 8): Promise<Manufacturer[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "manufacturer" && featured == true] | order(name asc)[0...${limit}] {
      ${manufacturerFields},
      "productCount": count(*[_type == "product" && references(^._id)])
    }`
  )
}

// Get a single manufacturer by slug
export async function getManufacturer(slug: string): Promise<Manufacturer | null> {
  if (!client) return null
  return client.fetch(
    `*[_type == "manufacturer" && slug.current == $slug][0] {
      ${manufacturerFields},
      "productCount": count(*[_type == "product" && references(^._id)])
    }`,
    { slug }
  )
}

// Get all product categories
export async function getProductCategories(): Promise<ProductCategory[]> {
  if (!client) return []
  return client.fetch(
    `*[_type == "productCategory"] | order(order asc, name asc) {
      ${productCategoryFields},
      "productCount": count(*[_type == "product" && references(^._id)])
    }`
  )
}

// Get a single product category by slug
export async function getProductCategory(slug: string): Promise<ProductCategory | null> {
  if (!client) return null
  return client.fetch(
    `*[_type == "productCategory" && slug.current == $slug][0] {
      ${productCategoryFields},
      "productCount": count(*[_type == "product" && references(^._id)])
    }`,
    { slug }
  )
}

// Search products
export async function searchProducts(searchTerm: string): Promise<Product[]> {
  if (!client) return []
  const searchQuery = `*${searchTerm}*`
  return client.fetch<Product[]>(
    `*[_type == "product" && (name match $searchQuery || description match $searchQuery || tagline match $searchQuery)] | order(name asc) {
      ${productFields}
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
