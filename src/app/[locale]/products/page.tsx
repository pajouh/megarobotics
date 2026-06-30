import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Package, ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import {
  getProductsWithFilters,
  getFeaturedProducts,
  getProductFamilies,
  type Locale,
} from '@/lib/sanity'
import ProductCard from '@/components/ProductCard'
import ProductFilter from '@/components/ProductFilter'
import Disclaimer from '@/components/Disclaimer'
import SectionHeader from '@/components/industrial/SectionHeader'
import { pageSeo } from '@/lib/page-seo'
import { productFamilyFallbacks } from '@/data/product-families'

interface FamilyContent {
  title: string
  shortDescription?: string
}

type FamilyCard = { slug: string; title: string; shortDescription?: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'industrial.catalog.meta' })
  return pageSeo({ title: t('title'), description: t('description'), path: '/products', locale })
}

// product/productFamily publishes revalidate /products via /api/revalidate;
// this timer is just a fallback, so keep it long to cut background regeneration.
export const revalidate = 3600

interface Props {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ q?: string; family?: string; availability?: string }>
}

export default async function ProductsPage({ params, searchParams }: Props) {
  const { locale } = await params
  const sp = await searchParams
  const searchQuery = sp.q
  const familySlug = sp.family
  const availabilityStatus = sp.availability
  const hasAnyFilter = Boolean(searchQuery || familySlug || availabilityStatus)
  const tDisclaimers = await getTranslations('disclaimers')
  const tCatalog = await getTranslations('industrial.catalog')

  const [products, featuredProducts, sanityFamilies] = await Promise.all([
    getProductsWithFilters(
      { search: searchQuery, familySlug, availabilityStatus },
      locale as Locale,
    ),
    getFeaturedProducts(4, locale as Locale),
    getProductFamilies(locale as Locale),
  ])

  const showFeatured = !hasAnyFilter && featuredProducts.length > 0
  const families = tCatalog.raw('families') as Record<string, FamilyContent>

  // Family grid is CMS-driven: when Sanity has productFamily docs, the list, order and
  // text come from Studio (per-field), falling back to the bundled list + i18n JSON for
  // any field an editor hasn't filled in. If Sanity returns nothing, use the static list.
  const familyCards: FamilyCard[] = sanityFamilies.length
    ? sanityFamilies.map((f) => ({
        slug: f.slug.current,
        title: f.title || families[f.slug.current]?.title || f.slug.current,
        shortDescription: f.shortDescription || families[f.slug.current]?.shortDescription,
      }))
    : productFamilyFallbacks.flatMap((f) => {
        const c = families[f.slug]
        return c ? [{ slug: f.slug, title: c.title, shortDescription: c.shortDescription }] : []
      })

  return (
    <div className="min-h-screen">
      {/* Industrial header */}
      <section className="relative ind-section-dark overflow-hidden pt-24 md:pt-28 pb-12">
        <div className="absolute inset-0 ind-grid-bg pointer-events-none" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="ind-eyebrow ind-eyebrow-light mb-4">
            <span className="inline-block w-8 h-px bg-[color:var(--mr-accent)]" aria-hidden="true" />
            {tCatalog('page.eyebrow')}
          </div>
          <h1 className="ind-h1 text-white mb-5 max-w-4xl">{tCatalog('page.title')}</h1>
          <p className="text-base md:text-lg text-[color:var(--mr-steel-on-dark)] leading-relaxed max-w-3xl mb-8">
            {tCatalog('page.intro')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[color:var(--mr-accent)] text-[color:var(--mr-dark)] font-semibold text-[15px] hover:bg-white transition-colors"
            >
              {tCatalog('page.ctaInquiry')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="ind-btn-secondary-dark">
              {tCatalog('page.ctaProject')}
            </Link>
          </div>
        </div>
      </section>

      {/* Product family cards */}
      <section className="py-16 md:py-20 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={tCatalog('familiesSection.eyebrow')}
            title={tCatalog('familiesSection.title')}
            subtitle={tCatalog('familiesSection.subtitle')}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {familyCards.map((c) => (
              <Link
                key={c.slug}
                href={`/products/categories/${c.slug}`}
                className="ind-card group block h-full"
              >
                <div className="ind-h3 text-[color:var(--mr-ink)] mb-2 group-hover:text-[color:var(--mr-accent-ink)] transition-colors">
                  {c.title}
                </div>
                {c.shortDescription && (
                  <p className="text-sm text-[color:var(--mr-ink-2)] leading-relaxed">{c.shortDescription}</p>
                )}
                <div className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.1em] font-medium text-[color:var(--mr-accent-ink)]">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured distributor products */}
      {showFeatured && (
        <section className="py-12 md:py-16 ind-section-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow={tCatalog('catalogSection.eyebrow')}
              title={tCatalog('catalogSection.featured')}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filterable catalog */}
      <section className="py-12 md:py-16 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={tCatalog('catalogSection.title')}
            subtitle={tCatalog('catalogSection.subtitle')}
          />
          <div className="mb-8">
            <Suspense fallback={<div className="h-24 bg-[color:var(--mr-white)] border border-[color:var(--mr-line)] animate-pulse" />}>
              <ProductFilter />
            </Suspense>
          </div>

          {searchQuery && (
            <div className="mb-6">
              <p className="font-mono text-sm text-[color:var(--mr-ink-2)]">
                {products.length} results for &quot;{searchQuery}&quot;
              </p>
            </div>
          )}

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[color:var(--mr-white)] border border-[color:var(--mr-line)]">
              <Package className="w-12 h-12 text-[color:var(--mr-steel)] mx-auto mb-4" strokeWidth={1.25} />
              <h2 className="ind-h3 text-[color:var(--mr-ink)] mb-2">
                {searchQuery ? 'No products found' : 'No products yet'}
              </h2>
              <p className="text-[color:var(--mr-ink-2)] max-w-md mx-auto text-sm">
                {searchQuery
                  ? 'Try adjusting your search terms or browse all products.'
                  : 'Check back soon for our robotics product catalog.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Components teaser */}
      <section className="py-12 md:py-16 ind-section-graphite relative overflow-hidden">
        <div className="absolute inset-0 ind-grid-bg pointer-events-none" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="ind-eyebrow ind-eyebrow-light mb-3">
              <span className="inline-block w-8 h-px bg-[color:var(--mr-accent)]" aria-hidden="true" />
              {tCatalog('componentsTeaser.eyebrow')}
            </div>
            <h2 className="ind-h2 text-white mb-4">{tCatalog('componentsTeaser.title')}</h2>
            <p className="text-[color:var(--mr-steel-on-dark)] leading-relaxed mb-6">
              {tCatalog('componentsTeaser.body')}
            </p>
            <Link href="/automation-components" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[color:var(--mr-accent)] text-[color:var(--mr-dark)] font-semibold text-[15px] hover:bg-white transition-colors">
              {tCatalog('componentsTeaser.cta')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div>
            <div className="ind-eyebrow ind-eyebrow-light mb-3">
              <span className="inline-block w-8 h-px bg-[color:var(--mr-accent)]" aria-hidden="true" />
              {tCatalog('distributorTeaser.eyebrow')}
            </div>
            <h2 className="ind-h2 text-white mb-4">{tCatalog('distributorTeaser.title')}</h2>
            <p className="text-[color:var(--mr-steel-on-dark)] leading-relaxed mb-6">
              {tCatalog('distributorTeaser.body')}
            </p>
            <Link href="/robot-distributor" className="ind-btn-secondary-dark">
              {tCatalog('distributorTeaser.cta')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Legal disclaimer (preserved) */}
      <div className="ind-section-light pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Disclaimer
            variant="productListing"
            translations={{ productListing: tDisclaimers('productListing') }}
          />
        </div>
      </div>
    </div>
  )
}
