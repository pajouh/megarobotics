import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'

// Cache sitemap for 1 hour to prevent excessive Sanity API calls from crawlers
export const revalidate = 3600

const baseUrl = 'https://www.megarobotics.de'
const locales = ['en', 'de']

// next-intl runs with localePrefix: 'as-needed', so the default locale (en) is
// served WITHOUT a prefix and `/en/...` 307-redirects to the unprefixed path.
// The sitemap must therefore list the canonical (unprefixed) EN URL — never the
// redirecting `/en/...` form — and annotate hreflang with the same canonical URLs.
function localeUrl(locale: string, path: string): string {
  return locale === 'en' ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`
}

function localizedEntries(
  path: string,
  options: { lastModified?: Date; changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency']; priority?: number }
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries([
    ...locales.map((l) => [l, localeUrl(l, path)]),
    ['x-default', localeUrl('en', path)],
  ])
  return locales.map((locale) => ({
    url: localeUrl(locale, path),
    lastModified: options.lastModified || new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: { languages },
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all content from Sanity
  const [articles, categories, products, productFamilies, manufacturers, buyersGuides, institutes, instituteCountries] = await Promise.all([
    client?.fetch(`*[_type == "article"]{ "slug": slug.current, _updatedAt }`) || [],
    client?.fetch(`*[_type == "category"]{ "slug": slug.current, _updatedAt }`) || [],
    client?.fetch(`*[_type == "product"]{ "slug": slug.current, _updatedAt }`) || [],
    client?.fetch(`*[_type == "productFamily" && isActive != false]{ "slug": slug.current, _updatedAt }`) || [],
    client?.fetch(`*[_type == "manufacturer"]{ "slug": slug.current, _updatedAt }`) || [],
    client?.fetch(`*[_type == "buyersGuide"]{ "slug": slug.current, _updatedAt }`) || [],
    client?.fetch(`*[_type == "institute" && profileStatus in ["Ready", "Foundational"]]{ "slug": slug.current, _updatedAt }`) || [],
    client?.fetch(`array::unique(*[_type == "institute" && profileStatus in ["Ready", "Foundational"]].country)`) || [],
  ])

  // Static pages with locale variants
  const staticPages: MetadataRoute.Sitemap = [
    ...localizedEntries('', { changeFrequency: 'daily', priority: 1 }),
    ...localizedEntries('/articles', { changeFrequency: 'daily', priority: 0.9 }),
    ...localizedEntries('/products', { changeFrequency: 'daily', priority: 0.9 }),
    ...localizedEntries('/guides', { changeFrequency: 'weekly', priority: 0.9 }),
    ...localizedEntries('/manufacturers', { changeFrequency: 'weekly', priority: 0.8 }),
    ...localizedEntries('/institutes', { changeFrequency: 'weekly', priority: 0.8 }),
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

  const productFamilyPages: MetadataRoute.Sitemap = (productFamilies || []).flatMap((fam: { slug: string; _updatedAt: string }) =>
    localizedEntries(`/products/categories/${fam.slug}`, {
      lastModified: new Date(fam._updatedAt),
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

  const institutePages: MetadataRoute.Sitemap = (institutes || []).flatMap((inst: { slug: string; _updatedAt: string }) =>
    localizedEntries(`/institutes/${inst.slug}`, {
      lastModified: new Date(inst._updatedAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  )

  const instituteCountryPages: MetadataRoute.Sitemap = (instituteCountries || []).flatMap((country: string) =>
    localizedEntries(`/institutes/country/${country.toLowerCase().replace(/\s+/g, '-')}`, {
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  )

  return [
    ...staticPages,
    ...articlePages,
    ...categoryPages,
    ...productPages,
    ...productFamilyPages,
    ...manufacturerPages,
    ...buyersGuidePages,
    ...institutePages,
    ...instituteCountryPages,
  ]
}
