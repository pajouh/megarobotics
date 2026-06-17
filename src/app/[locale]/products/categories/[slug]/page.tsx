import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import HeroIndustrial from '@/components/industrial/HeroIndustrial'
import SectionHeader from '@/components/industrial/SectionHeader'
import CTASection from '@/components/industrial/CTASection'
import SafeNotice from '@/components/industrial/SafeNotice'
import ProductCard from '@/components/ProductCard'
import { getProductFamily, getProductsByFamily, type Locale } from '@/lib/sanity'
import { getFamilyFallback } from '@/data/product-families'
import { pageSeo } from '@/lib/page-seo'
import PageBody from '@/components/PageBody'
import { PortableTextBlock } from '@portabletext/types'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

interface FamilyContent {
  title: string
  shortDescription?: string
  intro?: string
  body?: string[]
  subcategories?: string[]
  applications?: string[]
  selectionCriteria?: string[]
  meta?: { title?: string; description?: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const tCatalog = await getTranslations({ locale, namespace: 'industrial.catalog' })
  const families = tCatalog.raw('families') as Record<string, FamilyContent> | undefined
  const content = families?.[slug]
  if (!content) return {}
  const title = content.meta?.title ?? `${content.title} | MegaRobotics`
  const description = content.meta?.description ?? content.shortDescription ?? ''
  return pageSeo({ title, description, path: `/products/categories/${slug}`, locale })
}

export const revalidate = 3600

export default async function ProductCategoryPage({ params }: Props) {
  const { locale, slug } = await params
  const fallback = getFamilyFallback(slug)
  const tCatalog = await getTranslations('industrial.catalog')
  const tFamily = await getTranslations('industrial.catalog.family')
  const tNotice = await getTranslations('industrial.safeNotice')
  const tCta = await getTranslations('industrial.home.finalCta')

  const families = tCatalog.raw('families') as Record<string, FamilyContent> | undefined
  const content = families?.[slug]

  // Look up the Sanity family doc first — it drives the page content (per-field), the
  // related products and the reference ecosystems.
  const sanityFamily = await getProductFamily(slug, locale as Locale)

  // Unknown slug — no Sanity doc, no hardcoded fallback, no JSON content
  if (!fallback && !content && !sanityFamily) {
    notFound()
  }

  const relatedProducts = sanityFamily
    ? await getProductsByFamily(sanityFamily._id, 8, locale as Locale)
    : []

  const ecosystems = sanityFamily?.referenceEcosystems ?? []

  // Per-field CMS preference: any field filled in Studio overrides the i18n JSON fallback,
  // so the page is genuinely Studio-driven without losing the existing bundled content.
  const title = sanityFamily?.title || content?.title || slug
  const intro = sanityFamily?.shortDescription || content?.intro || content?.shortDescription || ''
  const sanityBody =
    sanityFamily && Array.isArray(sanityFamily.body) ? (sanityFamily.body as PortableTextBlock[]) : []
  const jsonBody = content?.body ?? []
  const subcategories = sanityFamily?.subcategories?.length
    ? sanityFamily.subcategories
    : content?.subcategories ?? []
  const applications = sanityFamily?.applications?.length
    ? sanityFamily.applications
    : content?.applications ?? []
  const selectionCriteria = sanityFamily?.selectionCriteria?.length
    ? sanityFamily.selectionCriteria
    : content?.selectionCriteria ?? []

  return (
    <div className="min-h-screen">
      <HeroIndustrial eyebrow={tCatalog('page.eyebrow')} title={title} subtitle={intro} />

      {/* Back-to-catalog */}
      <div className="ind-section-light pt-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {tFamily('backToCatalog')}
          </Link>
        </div>
      </div>

      {/* Body — Sanity rich text when present, otherwise the i18n JSON paragraphs */}
      {(sanityBody.length > 0 || jsonBody.length > 0) && (
        <section className="ind-section-light pt-8 pb-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-4">
            {sanityBody.length > 0 ? (
              <PageBody body={sanityBody} />
            ) : (
              jsonBody.map((p, idx) => (
                <p key={idx} className="text-base md:text-lg text-gray-700 leading-relaxed">
                  {p}
                </p>
              ))
            )}
          </div>
        </section>
      )}

      {/* Subcategories + applications + selection criteria */}
      <section className="py-12 md:py-16 ind-section-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {subcategories.length > 0 && (
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                  {tFamily('labelSubcategories')}
                </div>
                <ul className="space-y-1.5">
                  {subcategories.map((s) => (
                    <li key={s} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5" aria-hidden="true">›</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {applications.length > 0 && (
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                  {tFamily('labelApplications')}
                </div>
                <ul className="space-y-1.5">
                  {applications.map((a) => (
                    <li key={a} className="text-sm text-gray-700">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {selectionCriteria.length > 0 && (
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                  {tFamily('labelSelectionCriteria')}
                </div>
                <ul className="space-y-1.5">
                  {selectionCriteria.map((c) => (
                    <li key={c} className="text-sm text-blue-700">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related products (from Sanity, only if family doc exists) */}
      {relatedProducts.length > 0 ? (
        <section className="py-12 md:py-16 ind-section-light">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader title={tFamily('labelRelatedProducts')} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-12 md:py-16 ind-section-light">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="ind-card text-center">
              <h3 className="ind-h3 text-gray-900 mb-2">{tFamily('noProductsTitle')}</h3>
              <p className="text-sm text-gray-600 mb-5">{tFamily('noProductsBody')}</p>
              <Link href="/contact" className="ind-btn-primary">
                {tFamily('noProductsCta')}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Reference ecosystems (only shown if explicitly tagged in Sanity) */}
      {ecosystems.length > 0 && (
        <section className="py-12 md:py-16 ind-section-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader title={tFamily('labelEcosystems')} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
              {ecosystems.map((e) => (
                <div
                  key={e._id}
                  className="p-4 border border-[color:var(--ind-steel-200)] rounded bg-white"
                >
                  <div className="text-sm font-semibold text-gray-900">{e.name}</div>
                  {e.shortDescription && (
                    <div className="text-xs text-gray-500 mt-1">{e.shortDescription}</div>
                  )}
                </div>
              ))}
            </div>
            <div className="max-w-3xl">
              <SafeNotice label={tNotice('label')} accent="blue">
                {tFamily('ecosystemsDisclaimer')}
              </SafeNotice>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <CTASection
        eyebrow={tCta('eyebrow')}
        title={tFamily('inquiryCtaTitle')}
        body={tFamily('inquiryCtaBody')}
        ctaLabel={tFamily('inquiryCtaButton')}
        ctaHref="/contact"
        tone="dark"
      />
    </div>
  )
}
