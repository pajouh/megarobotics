import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImage, Article, Category, Author } from '@/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImage) {
  return builder.image(source)
}

// GROQ Queries
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
  const limitQuery = limit ? `[0...${limit}]` : ''
  return client.fetch(
    `*[_type == "article"] | order(publishedAt desc)${limitQuery} {
      ${articleFields}
    }`
  )
}

// Get a single article by slug
export async function getArticle(slug: string): Promise<Article | null> {
  return client.fetch(
    `*[_type == "article" && slug.current == $slug][0] {
      ${articleWithBodyFields}
    }`,
    { slug }
  )
}

// Get featured articles
export async function getFeaturedArticles(limit: number = 3): Promise<Article[]> {
  return client.fetch(
    `*[_type == "article" && featured == true] | order(publishedAt desc)[0...${limit}] {
      ${articleFields}
    }`
  )
}

// Get articles by category
export async function getArticlesByCategory(categorySlug: string, limit?: number): Promise<Article[]> {
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
  return client.fetch(
    `*[_type == "article" && _id != $articleId && category->slug.current == $categorySlug] | order(publishedAt desc)[0...${limit}] {
      ${articleFields}
    }`,
    { articleId, categorySlug }
  )
}

// Search articles
export async function searchArticles(query: string): Promise<Article[]> {
  return client.fetch(
    `*[_type == "article" && (title match $query || excerpt match $query)] | order(publishedAt desc) {
      ${articleFields}
    }`,
    { query: `*${query}*` }
  )
}

// Get all article slugs (for static generation)
export async function getAllArticleSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(
    `*[_type == "article" && defined(slug.current)][].slug.current`
  ).then((slugs: string[]) => slugs.map(slug => ({ slug })))
}

// Get all category slugs (for static generation)
export async function getAllCategorySlugs(): Promise<{ slug: string }[]> {
  return client.fetch(
    `*[_type == "category" && defined(slug.current)][].slug.current`
  ).then((slugs: string[]) => slugs.map(slug => ({ slug })))
}
