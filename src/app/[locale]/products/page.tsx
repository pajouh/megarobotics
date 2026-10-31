import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getProductsWithFilters, getProductFamilies, urlFor, type Locale } from '@/lib/sanity'
import Disclaimer from '@/components/Disclaimer'
import CatalogExplorer from '@/components/catalog/CatalogExplorer'
import type { CatalogBrand, CatalogFamily, CatalogItem, CatalogQuery, FlagshipItem } from '@/components/catalog/types'
import { pageSeo } from '@/lib/page-seo'
import { productFamilyFallbacks } from '@/data/product-families'
import { authorizedPartners } from '@/data/authorized-partners'
import { getHomeProductHero, getProductHero } from '@/data/product-heroes'
import type { Product } from '@/types'

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
  searchParams: Promise<Record<string, string | undefined>>
}

const PARTNERS = new Map(authorizedPartners.map((p) => [p.slug, p]))

function toBrand(m: Product['manufacturer']): CatalogBrand | undefined {
  if (!m?.slug?.current) return undefined
  const partner = PARTNERS.get(m.slug.current)
  return {
    slug: m.slug.current,
    name: m.name,
    logo: partner?.logo ?? (m.logo ? urlFor(m.logo).height(64).url() : undefined),
    logoWidth: partner?.logoWidth,
    logoHeight: partner?.logoHeight,
    authorized: Boolean(partner),
  }
}

function toItem(p: Product, rank: number): CatalogItem {
  return {
    id: p._id,
    slug: p.slug.current,
    name: p.name,
    tagline: p.tagline,
    image: p.mainImage ? urlFor(p.mainImage).maxWidth(640).maxHeight(640).url() : undefined,
    imageAlt: p.mainImage?.alt,
    brand: toBrand(p.manufacturer),
    family: p.productFamily?.slug?.current
      ? { slug: p.productFamily.slug.current, title: p.productFamily.title }
      : undefined,
    subcategory: p.subcategory,
    availability: p.availabilityStatus,
    isNew: Boolean(p.isNew),
    featured: Boolean(p.featured),
    rank,
  }
}

const pick = <T extends string>(v: string | undefined, allowed: readonly T[], fallback: T): T =>
  allowed.includes(v as T) ? (v as T) : fallback

export default async function ProductsPage({ params, searchParams }: Props) {
  const { locale } = await params
  const sp = await searchParams
  const tDisclaimers = await getTranslations('disclaimers')
  const tCatalog = await getTranslations('industrial.catalog')

  // The whole catalogue (~100 products) ships once; filtering runs in the browser.
  const [products, sanityFamilies] = await Promise.all([
    getProductsWithFilters({}, locale as Locale),
    getProductFamilies(locale as Locale),
  ])

  // Sanity's German family titles are still English, so the translated message
  // titles win where they exist.
  const familyTitles = tCatalog.raw('families') as Record<string, { title: string }>
  const familyTitle = (slug: string, fallback?: string) => familyTitles[slug]?.title || fallback || slug

  const items = products.map((p, i) => {
    const item = toItem(p, i)
    return item.family ? { ...item, family: { ...item.family, title: familyTitle(item.family.slug, item.family.title) } } : item
  })

  // The clip a product uses on the homepage is its cleanest; fall back to its first clip.
  const homeClips = new Map(
    getHomeProductHero(locale as Locale).slides.filter((sl) => sl.video).map((sl) => [sl.id, sl]),
  )

  // Featured products, in catalogue order, with footage and key figures from the
  // product heroes where a product has one.
  const flagships: FlagshipItem[] = products
    .map((p, i) => ({ p, item: items[i] }))
    .filter(({ item }) => item.featured)
    .map(({ p, item }) => {
      const hero = getProductHero(item.slug, locale as Locale)
      const clip = homeClips.get(item.slug) ?? hero?.slides.find((sl) => sl.video)
      return {
        ...item,
        tall: p.mainImage ? urlFor(p.mainImage).maxWidth(720).maxHeight(900).url() : undefined,
        video: clip?.video,
        poster: clip?.poster,
        specs: hero?.specs ?? [],
      }
    })

  const families: CatalogFamily[] = sanityFamilies.length
    ? sanityFamilies.map((f) => ({ slug: f.slug.current, title: familyTitle(f.slug.current, f.title) }))
    : productFamilyFallbacks.map((f) => ({ slug: f.slug, title: familyTitle(f.slug) }))

  // Old links used ?family=…&availability=…&q=…; those still work, plus brand, sort and view.
  const initial: CatalogQuery = {
    q: sp.q?.slice(0, 80) ?? '',
    brand: sp.brand ?? '',
    family: sp.family ?? '',
    availability: sp.availability ?? '',
    sort: pick(sp.sort, ['recommended', 'name', 'new'] as const, 'recommended'),
    view: pick(sp.view, ['grid', 'list'] as const, 'grid'),
  }

  return (
    <div className="min-h-screen ind-section-light">
      <CatalogExplorer items={items} flagships={flagships} families={families} initial={initial} />

      {/* Components and distributor teasers */}
      <section className="py-12 md:py-16 ind-section-graphite relative overflow-hidden">
        <div className="absolute inset-0 ind-grid-bg pointer-events-none" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="ind-eyebrow ind-eyebrow-light mb-3">
              <span className="inline-block w-8 h-px bg-[color:var(--mr-accent)]" aria-hidden="true" />
              {tCatalog('componentsTeaser.eyebrow')}
            </div>
            <h2 className="ind-h2 text-[color:var(--mr-ink)] mb-4">{tCatalog('componentsTeaser.title')}</h2>
            <p className="text-[color:var(--mr-steel-on-dark)] leading-relaxed mb-6">
              {tCatalog('componentsTeaser.body')}
            </p>
            <Link href="/automation-components" className="mr-btn-accent">
              {tCatalog('componentsTeaser.cta')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div>
            <div className="ind-eyebrow ind-eyebrow-light mb-3">
              <span className="inline-block w-8 h-px bg-[color:var(--mr-accent)]" aria-hidden="true" />
              {tCatalog('distributorTeaser.eyebrow')}
            </div>
            <h2 className="ind-h2 text-[color:var(--mr-ink)] mb-4">{tCatalog('distributorTeaser.title')}</h2>
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
      <div className="ind-section-light py-12">
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
