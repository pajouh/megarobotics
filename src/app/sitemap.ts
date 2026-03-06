import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'

const baseUrl = 'https://megarobotics.de'
const locales = ['en', 'de']

function localizedEntries(
  path: string,
  options: { lastModified?: Date; changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency']; priority?: number }
): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${baseUrl}/${locale}${path}`,
    lastModified: options.lastModified || new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: {
      languages: Object.fromEntries([
        ...locales.map((l) => [l, `${baseUrl}/${l}${path}`]),
        ['x-default', `${baseUrl}/en${path}`],
      ]),
    },
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all content from Sanity
  const [articles, categories, products, productCategories, manufacturers, buyersGuides] = await Promise.all([
    client?.fetch(`*[_type == "article"]{ "slug": slug.current, _updatedAt }`) || [],
    client?.fetch(`*[_type == "category"]{ "slug": slug.current, _updatedAt }`) || [],
    client?.fetch(`*[_type == "product"]{ "slug": slug.current, _updatedAt }`) || [],
    client?.fetch(`*[_type == "productCategory"]{ "slug": slug.current, _updatedAt }`) || [],
    client?.fetch(`*[_type == "manufacturer"]{ "slug": slug.current, _updatedAt }`) || [],
    client?.fetch(`*[_type == "buyersGuide"]{ "slug": slug.current, _updatedAt }`) || [],
  ])

  // Static pages with locale variants
  const staticPages: MetadataRoute.Sitemap = [
    ...localizedEntries('', { changeFrequency: 'daily', priority: 1 }),
    ...localizedEntries('/articles', { changeFrequency: 'daily', priority: 0.9 }),
    ...localizedEntries('/products', { changeFrequency: 'daily', priority: 0.9 }),
    ...localizedEntries('/guides', { changeFrequency: 'weekly', priority: 0.9 }),
    ...localizedEntries('/manufacturers', { changeFrequency: 'weekly', priority: 0.8 }),
    ...localizedEntries('/about', { changeFrequency: 'monthly', priority: 0.5 }),
    ...localizedEntries('/contact', { changeFrequency: 'monthly', priority: 0.5 }),
    ...localizedEntries('/privacy', { changeFrequency: 'monthly', priority: 0.3 }),
    ...localizedEntries('/imprint', { changeFrequency: 'monthly', priority: 0.3 }),
  ]

  // Dynamic pages with locale variants
  const articlePages: MetadataRoute.Sitemap = (articles || []).flatMap((article: { slug: string; _updatedAt: string }) =>
    localizedEntries(`/articles/${article.slug}`, {
      lastModified: new Date(article._updatedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  )

  const categoryPages: MetadataRoute.Sitemap = (categories || []).flatMap((category: { slug: string; _updatedAt: string }) =>
    localizedEntries(`/category/${category.slug}`, {
      lastModified: new Date(category._updatedAt),
      changeFrequency: 'daily',
      priority: 0.7,
    })
  )

  const productPages: MetadataRoute.Sitemap = (products || []).flatMap((product: { slug: string; _updatedAt: string }) =>
    localizedEntries(`/products/${product.slug}`, {
      lastModified: new Date(product._updatedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  )

  const productCategoryPages: MetadataRoute.Sitemap = (productCategories || []).flatMap((cat: { slug: string; _updatedAt: string }) =>
    localizedEntries(`/products/category/${cat.slug}`, {
      lastModified: new Date(cat._updatedAt),
      changeFrequency: 'daily',
      priority: 0.7,
    })
  )

  const manufacturerPages: MetadataRoute.Sitemap = (manufacturers || []).flatMap((manufacturer: { slug: string; _updatedAt: string }) =>
    localizedEntries(`/manufacturers/${manufacturer.slug}`, {
      lastModified: new Date(manufacturer._updatedAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  )

  const buyersGuidePages: MetadataRoute.Sitemap = (buyersGuides || []).flatMap((guide: { slug: string; _updatedAt: string }) =>
    localizedEntries(`/guides/${guide.slug}`, {
      lastModified: new Date(guide._updatedAt),
      changeFrequency: 'weekly',
      priority: 0.9,
    })
  )

  return [
    ...staticPages,
    ...articlePages,
    ...categoryPages,
    ...productPages,
    ...productCategoryPages,
    ...manufacturerPages,
    ...buyersGuidePages,
  ]
}
