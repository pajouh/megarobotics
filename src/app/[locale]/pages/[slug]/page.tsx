import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import type { PortableTextBlock } from '@portabletext/types'
import { getPage, getAllPageSlugs, getProductsBySlugs, type Locale } from '@/lib/sanity'
import PageBody from '@/components/PageBody'
import HubSchema from '@/components/HubSchema'
import ProductCard from '@/components/ProductCard'
import StructuredData from '@/components/StructuredData'
import { LANDING_PAGE_SLUGS } from '@/data/landing-pages'
import { generateAlternates, generateCollectionSchema } from '@/lib/structured-data'
import { DEFAULT_OG_IMAGE, brandedTitle, clampDescription, ogBase } from '@/lib/page-seo'

type Props = {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPageSlugs()
  // humanoid-robots has its own static route next to this folder.
  return slugs.filter(({ slug }) => slug !== 'humanoid-robots').map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const page = await getPage(slug, locale as Locale)

  if (!page) {
    return { title: 'Page Not Found' }
  }

  // Returning a bare string let the root layout's "%s | MegaRobotics" template
  // append the brand on top of Sanity metaTitle values that already ended with
  // it, shipping "Terms of Service | MegaRobotics | MegaRobotics". brandedTitle
  // normalises to exactly one suffix and returns { absolute }, which bypasses
  // the template.
  const rawTitle = page.seo?.metaTitle || page.title
  const brandedMetaTitle = brandedTitle(rawTitle)
  const title = brandedMetaTitle.absolute
  const description = clampDescription(page.seo?.metaDescription || page.subtitle)

  return {
    title: brandedMetaTitle,
    description,
    alternates: generateAlternates(`/pages/${slug}`, locale),
    openGraph: {
      ...ogBase(`/pages/${slug}`, locale),
      title,
      description,
      type: 'website',
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  }
}

export const revalidate = 3600

/** Slugs of the products a page links to, in order of first mention. */
function linkedProductSlugs(body: PortableTextBlock[]): string[] {
  const slugs = body.flatMap((block) =>
    (block.markDefs ?? []).flatMap((mark) => {
      const href = (mark as { href?: unknown }).href
      const match = typeof href === 'string' ? href.match(/^(?:\/de)?\/products\/([\w-]+)$/) : null
      return match ? [match[1]] : []
    })
  )
  return [...new Set(slugs)]
}

export default async function DynamicPage({ params }: Props) {
  const { slug, locale } = await params
  const page = await getPage(slug, locale as Locale)

  if (!page) {
    notFound()
  }

  const t = await getTranslations('industrial.landingPages')
  const path = `/pages/${slug}`
  const body: PortableTextBlock[] = page.body ?? []

  // Buying pages show the models they talk about right after the introduction.
  const isLandingPage = (LANDING_PAGE_SLUGS as readonly string[]).includes(slug)
  const products = isLandingPage ? await getProductsBySlugs(linkedProductSlugs(body), locale as Locale) : []
  const firstHeading = body.findIndex((block) => block.style === 'h2')
  const introEnd = products.length > 0 && firstHeading > 0 ? firstHeading : 0

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <HubSchema name={page.title} description={page.subtitle || undefined} path={path} type="WebPage" />
      {products.length > 0 && (
        <StructuredData
          data={generateCollectionSchema({
            name: page.title,
            description: page.subtitle || undefined,
            path,
            locale,
            items: products.map((p) => ({ name: p.name, path: `/products/${p.slug.current}` })),
          })}
        />
      )}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {page.title}
          </h1>
          {page.subtitle && (
            <p className="text-lg text-gray-600">{page.subtitle}</p>
          )}
          {page.lastUpdated && (
            <p className="text-sm text-gray-400 mt-4">
              {t('lastUpdated')}: {new Date(page.lastUpdated).toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-GB')}
            </p>
          )}
        </header>

        {introEnd > 0 && (
          <div className="prose prose-gray max-w-none">
            <PageBody body={body.slice(0, introEnd)} />
          </div>
        )}
      </div>

      {products.length > 0 && (
        <section aria-labelledby="models" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h2 id="models" className="text-2xl font-bold text-gray-900 mb-6">
            {t('models')}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <li key={product._id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {body.length > 0 && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray max-w-none">
            <PageBody body={body.slice(introEnd)} />
          </div>
        </div>
      )}
    </div>
  )
}
