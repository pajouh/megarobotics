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
  const [articles, categories, products, productFamilies, manufacturers, buyersGuides, institutes, instituteCountries, solutions, cmsPages] = await Promise.all([
    client?.fetch(`*[_type == "article"]{ "slug": slug.current, _updatedAt }`) || [],
    client?.fetch(`*[_type == "category"]{ "slug": slug.current, _updatedAt }`) || [],
    client?.fetch(`*[_type == "product"]{ "slug": slug.current, _updatedAt }`) || [],
    client?.fetch(`*[_type == "productFamily" && isActive != false]{ "slug": slug.current, _updatedAt }`) || [],
    client?.fetch(`*[_type == "manufacturer"]{ "slug": slug.current, _updatedAt }`) || [],
    client?.fetch(`*[_type == "buyersGuide"]{ "slug": slug.current, _updatedAt }`) || [],
    client?.fetch(`*[_type == "institute" && profileStatus in ["Ready", "Foundational"]]{ "slug": slug.current, _updatedAt }`) || [],
    client?.fetch(`array::unique(*[_type == "institute" && profileStatus in ["Ready", "Foundational"]].country)`) || [],
    client?.fetch(`*[_type == "solution"]{ "slug": slug.current, _updatedAt }`) || [],
    client?.fetch(`*[_type == "page"]{ "slug": slug.current, _updatedAt }`) || [],
  ])

  // Static pages with locale variants
  const staticPages: MetadataRoute.Sitemap = [
    ...localizedEntries('', { changeFrequency: 'daily', priority: 1 }),
    ...localizedEntries('/articles', { changeFrequency: 'daily', priority: 0.9 }),
    ...localizedEntries('/products', { changeFrequency: 'daily', priority: 0.9 }),
    ...localizedEntries('/guides', { changeFrequency: 'weekly', priority: 0.9 }),
    ...localizedEntries('/manufacturers', { changeFrequency: 'weekly', priority: 0.8 }),
    ...localizedEntries('/institutes', { changeFrequency: 'weekly', priority: 0.8 }),
    ...localizedEntries('/solutions', { changeFrequency: 'weekly', priority: 0.9 }),
    ...localizedEntries('/industries', { changeFrequency: 'weekly', priority: 0.8 }),
    ...localizedEntries('/robot-technologies', { changeFrequency: 'weekly', priority: 0.8 }),
    ...localizedEntries('/robot-distributor', { changeFrequency: 'monthly', priority: 0.8 }),
    ...localizedEntries('/automation-components', { changeFrequency: 'monthly', priority: 0.8 }),
    ...localizedEntries('/technology-network', { changeFrequency: 'monthly', priority: 0.7 }),
    ...localizedEntries('/projects', { changeFrequency: 'monthly', priority: 0.7 }),
    ...localizedEntries('/for-customers', { changeFrequency: 'monthly', priority: 0.6 }),
    ...localizedEntries('/for-manufacturers', { changeFrequency: 'monthly', priority: 0.6 }),
    ...localizedEntries('/about', { changeFrequency: 'monthly', priority: 0.5 }),
    ...localizedEntries('/contact', { changeFrequency: 'monthly', priority: 0.5 }),
    ...localizedEntries('/privacy', { changeFrequency: 'monthly', priority: 0.3 }),
    ...localizedEntries('/imprint', { changeFrequency: 'monthly', priority: 0.3 }),
    ...localizedEntries('/agb', { changeFrequency: 'monthly', priority: 0.3 }),
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

  const solutionPages: MetadataRoute.Sitemap = (solutions || []).flatMap((solution: { slug: string; _updatedAt: string }) =>
    localizedEntries(`/solutions/${solution.slug}`, {
      lastModified: new Date(solution._updatedAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  )

  // CMS-driven pages at /pages/<slug>. Three of the five page documents are
  // also served by dedicated routes that are already listed above, and BOTH
  // copies self-canonicalise — /pages/privacy and /privacy each declare
  // themselves canonical, as do the imprint and about pairs. Listing both
  // would ask search engines to index the same text twice. The dedicated
  // route wins because it is the one linked from the site chrome; the
  // /pages/ twin is excluded here until the duplication is resolved properly
  // (by redirecting or cross-canonicalising it — tracked separately).
  //
  // data-deletion is withheld for a different reason: its H1 renders as the
  // raw slug "data-deletion" because the document has no title, so it is not
  // fit to be indexed yet. Remove it from this set once the title is set.
  const EXCLUDED_PAGE_SLUGS = new Set(['privacy', 'imprint', 'about-megarobotics', 'data-deletion'])

  const cmsPagePages: MetadataRoute.Sitemap = (cmsPages || [])
    .filter((page: { slug: string }) => page.slug && !EXCLUDED_PAGE_SLUGS.has(page.slug))
    .flatMap((page: { slug: string; _updatedAt: string }) =>
      localizedEntries(`/pages/${page.slug}`, {
        lastModified: new Date(page._updatedAt),
        changeFrequency: 'monthly',
        priority: 0.3,
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
    ...solutionPages,
    ...cmsPagePages,
  ]
}
