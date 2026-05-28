import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Package, ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import {
  getProductsWithFilters,
  getFeaturedProducts,
  type Locale,
} from '@/lib/sanity'
import ProductCard from '@/components/ProductCard'
import ProductFilter from '@/components/ProductFilter'
import Disclaimer from '@/components/Disclaimer'
import SectionHeader from '@/components/industrial/SectionHeader'
import { generateAlternates } from '@/lib/structured-data'
import { productFamilyFallbacks } from '@/data/product-families'

interface FamilyContent {
  title: string
  shortDescription?: string
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'industrial.catalog.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: generateAlternates('/products'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'MegaRobotics Catalog' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/og-image.png'],
    },
  }
}

export const revalidate = 60

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

  const [products, featuredProducts] = await Promise.all([
    getProductsWithFilters(
      { search: searchQuery, familySlug, availabilityStatus },
      locale as Locale,
    ),
    getFeaturedProducts(4, locale as Locale),
  ])

  const showFeatured = !hasAnyFilter && featuredProducts.length > 0
  const families = tCatalog.raw('families') as Record<string, FamilyContent>

  return (
    <div className="min-h-screen">
      {/* Industrial header */}
      <section className="relative ind-section-dark overflow-hidden pt-24 md:pt-28 pb-12">
        <div className="absolute inset-0 ind-grid-bg pointer-events-none" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="ind-eyebrow ind-eyebrow-light mb-4">
            <span className="inline-block w-8 h-px bg-blue-400" aria-hidden="true" />
            {tCatalog('page.eyebrow')}
          </div>
          <h1 className="ind-h1 text-white mb-5 max-w-4xl">{tCatalog('page.title')}</h1>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-3xl mb-8">
            {tCatalog('page.intro')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="ind-btn-primary">
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
            {productFamilyFallbacks.map((f) => {
              const c = families[f.slug]
              if (!c) return null
              return (
                <Link
                  key={f.slug}
                  href={`/products/categories/${f.slug}`}
                  className="ind-card group block h-full"
                >
                  <div className="ind-h3 text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {c.title}
                  </div>
                  {c.shortDescription && (
                    <p className="text-sm text-gray-600 leading-relaxed">{c.shortDescription}</p>
                  )}
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              )
            })}
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
            <Suspense fallback={<div className="h-24 bg-white border border-gray-200 rounded animate-pulse" />}>
              <ProductFilter />
            </Suspense>
          </div>

          {searchQuery && (
            <div className="mb-6">
              <p className="text-gray-600">
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
            <div className="text-center py-20 bg-white border border-gray-200 rounded">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {searchQuery ? 'No products found' : 'No products yet'}
              </h2>
              <p className="text-gray-500 max-w-md mx-auto text-sm">
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
              <span className="inline-block w-8 h-px bg-blue-400" aria-hidden="true" />
              {tCatalog('componentsTeaser.eyebrow')}
            </div>
            <h2 className="ind-h2 text-white mb-4">{tCatalog('componentsTeaser.title')}</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              {tCatalog('componentsTeaser.body')}
            </p>
            <Link href="/automation-components" className="ind-btn-primary">
              {tCatalog('componentsTeaser.cta')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div>
            <div className="ind-eyebrow ind-eyebrow-light mb-3">
              <span className="inline-block w-8 h-px bg-orange-400" aria-hidden="true" />
              {tCatalog('distributorTeaser.eyebrow')}
            </div>
            <h2 className="ind-h2 text-white mb-4">{tCatalog('distributorTeaser.title')}</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
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
