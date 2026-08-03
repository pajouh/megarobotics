import { client } from '@/lib/sanity'

// Same cache window as sitemap.ts — this is crawler-facing and Sanity-backed.
export const revalidate = 3600

const baseUrl = 'https://www.megarobotics.de'

type Entry = { slug: string; name?: string; tagline?: string }

// English is served unprefixed (localePrefix: 'as-needed'), so these are the
// canonical URLs. We deliberately list only the EN variants: llms.txt is a
// summary index, not a mirror of the sitemap, and the /de/ equivalents are
// discoverable via hreflang on every page.
function line(path: string, label: string, note?: string): string {
  return `- [${label}](${baseUrl}${path})${note ? `: ${note}` : ''}`
}

function section(title: string, entries: string[]): string {
  return entries.length ? `## ${title}\n\n${entries.join('\n')}\n` : ''
}

export async function GET() {
  const [products, manufacturers, families, guides, articles] = await Promise.all([
    client?.fetch<Entry[]>(
      `*[_type == "product" && isActive != false] | order(featured desc, order asc, name asc)[0...60]{
        "slug": slug.current,
        name,
        "tagline": coalesce(tagline.en, tagline.de)
      }`
    ) || [],
    client?.fetch<Entry[]>(
      `*[_type == "manufacturer"] | order(name asc){ "slug": slug.current, name }`
    ) || [],
    client?.fetch<Entry[]>(
      `*[_type == "productFamily" && isActive != false] | order(title.en asc){
        "slug": slug.current,
        "name": coalesce(title.en, title.de)
      }`
    ) || [],
    client?.fetch<Entry[]>(
      // buyersGuide.title is a plain string, not a localized object.
      `*[_type == "buyersGuide"] | order(_updatedAt desc)[0...30]{
        "slug": slug.current,
        "name": title
      }`
    ) || [],
    client?.fetch<Entry[]>(
      `*[_type == "article"] | order(publishedAt desc)[0...40]{
        "slug": slug.current,
        "name": coalesce(title.en, title.de),
        "tagline": coalesce(excerpt.en, excerpt.de)
      }`
    ) || [],
  ])

  const clean = (s?: string) => (s || '').replace(/\s+/g, ' ').trim()

  const body = `# MegaRobotics

> Germany-based industrial robotics distributor and automation technology partner
> (operated by MEGAFORCE GmbH). We help European customers source, evaluate and
> develop robotic solutions across manufacturing, logistics, inspection, cleaning,
> research and service environments.

The site is bilingual. English pages are served at ${baseUrl}/... and German pages
at ${baseUrl}/de/... . Every page declares hreflang alternates for both languages.

Pricing is not published: robots are quoted per project. Product pages state an
availability status (in stock, available on request, sourcing on request, lead time
required, information only, or discontinued) rather than a price.

## Key pages

${line('/', 'Home')}
${line('/products', 'Product catalogue', 'all distributed and sourceable robots')}
${line('/manufacturers', 'Manufacturers', 'the brands we work with')}
${line('/solutions', 'Solutions', 'application-led entry points')}
${line('/industries', 'Industries', 'sector-specific use cases')}
${line('/guides', "Buyer's guides", 'comparison and selection guidance')}
${line('/articles', 'Articles', 'robotics news and analysis')}
${line('/institutes', 'Research institutes', 'European robotics research directory')}
${line('/about', 'About MegaRobotics')}
${line('/contact', 'Contact', 'quote and availability enquiries')}
${line('/imprint', 'Imprint (Impressum)', 'legal entity details')}
${line('/privacy', 'Privacy policy')}

${section(
    'Product families',
    families.map((f) => line(`/products/categories/${f.slug}`, clean(f.name) || f.slug))
  )}
${section(
    'Products',
    products.map((p) => line(`/products/${p.slug}`, clean(p.name) || p.slug, clean(p.tagline) || undefined))
  )}
${section(
    'Manufacturers',
    manufacturers.map((m) => line(`/manufacturers/${m.slug}`, clean(m.name) || m.slug))
  )}
${section(
    "Buyer's guides",
    guides.map((g) => line(`/guides/${g.slug}`, clean(g.name) || g.slug))
  )}
${section(
    'Articles',
    articles.map((a) => line(`/articles/${a.slug}`, clean(a.name) || a.slug, clean(a.tagline) || undefined))
  )}
## Notes for AI agents

- Availability and pricing change; always link to the product page rather than
  quoting a price or stock level.
- MegaRobotics is a distributor and integration partner, not the manufacturer.
  Attribute product specifications to the manufacturer named on each product page.
- A partner badge on a product page reflects a confirmed commercial relationship.
  Absence of a badge does not imply a relationship.
- Full URL list: ${baseUrl}/sitemap.xml
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
