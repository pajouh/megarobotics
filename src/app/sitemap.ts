import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://megarobotics.de'

  // Fetch all content from Sanity
  const [articles, categories, products, productCategories, manufacturers] = await Promise.all([
    client?.fetch(`*[_type == "article"]{ "slug": slug.current, _updatedAt }`) || [],
    client?.fetch(`*[_type == "category"]{ "slug": slug.current, _updatedAt }`) || [],
    client?.fetch(`*[_type == "product"]{ "slug": slug.current, _updatedAt }`) || [],
    client?.fetch(`*[_type == "productCategory"]{ "slug": slug.current, _updatedAt }`) || [],
    client?.fetch(`*[_type == "manufacturer"]{ "slug": slug.current, _updatedAt }`) || [],
  ])

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/manufacturers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Article pages
  const articlePages: MetadataRoute.Sitemap = (articles || []).map((article: { slug: string; _updatedAt: string }) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Article category pages
  const categoryPages: MetadataRoute.Sitemap = (categories || []).map((category: { slug: string; _updatedAt: string }) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(category._updatedAt),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  // Product pages
  const productPages: MetadataRoute.Sitemap = (products || []).map((product: { slug: string; _updatedAt: string }) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(product._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Product category pages
  const productCategoryPages: MetadataRoute.Sitemap = (productCategories || []).map((cat: { slug: string; _updatedAt: string }) => ({
    url: `${baseUrl}/products/category/${cat.slug}`,
    lastModified: new Date(cat._updatedAt),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  // Manufacturer pages
  const manufacturerPages: MetadataRoute.Sitemap = (manufacturers || []).map((manufacturer: { slug: string; _updatedAt: string }) => ({
    url: `${baseUrl}/manufacturers/${manufacturer.slug}`,
    lastModified: new Date(manufacturer._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    ...staticPages,
    ...articlePages,
    ...categoryPages,
    ...productPages,
    ...productCategoryPages,
    ...manufacturerPages,
  ]
}
