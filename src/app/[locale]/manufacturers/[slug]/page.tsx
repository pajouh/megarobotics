import { Metadata } from 'next'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { notFound } from 'next/navigation'
import { ArrowLeft, Globe, MapPin, Calendar, Package, ShieldCheck } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import {
  getManufacturer,
  getProductsByManufacturer,
  getAllManufacturerSlugs,
  urlFor,
  imageBoxUrl,
  type Locale
} from '@/lib/sanity'
import ProductCard from '@/components/ProductCard'
import { generateAlternates, generateManufacturerSchema } from '@/lib/structured-data'
import StructuredData from '@/components/StructuredData'
import Breadcrumbs from '@/components/Breadcrumbs'
import { brandedTitle } from '@/lib/page-seo'
import { isVerifiedRelationship, relStatusToKey } from '@/lib/relationship'
import { authorizedPartners } from '@/data/authorized-partners'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const manufacturer = await getManufacturer(slug, locale as Locale)

  if (!manufacturer) {
    return {
      title: 'Manufacturer Not Found',
    }
  }

  const metaTitle = manufacturer.seo?.metaTitle || `${manufacturer.name} - Robotics Products`
  const brandedMetaTitle = brandedTitle(metaTitle)
  const metaDescription = manufacturer.seo?.metaDescription || manufacturer.description || `Browse robotics products from ${manufacturer.name}.`
  const logoUrl = manufacturer.logo
    ? urlFor(manufacturer.logo).ignoreImageParams().width(1200).height(630).fit('fill').bg('ffffff').url()
    : undefined

  return {
    title: brandedMetaTitle,
    description: metaDescription,
    keywords: manufacturer.seo?.keywords,
    alternates: generateAlternates(`/manufacturers/${slug}`, locale),
    openGraph: {
      title: brandedMetaTitle.absolute,
      description: metaDescription,
      images: logoUrl
        ? [{ url: logoUrl, width: 1200, height: 630, alt: manufacturer.name }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: brandedMetaTitle.absolute,
      description: metaDescription,
      images: logoUrl ? [logoUrl] : undefined,
    },
  }
}

export async function generateStaticParams() {
  const slugs = await getAllManufacturerSlugs()
  return slugs
}

// manufacturer publishes revalidate this path via /api/revalidate; this timer
// is just a fallback, so keep it long to cut background regeneration.
export const revalidate = 3600

export default async function ManufacturerPage({ params }: Props) {
  const { slug, locale } = await params
  const [manufacturer, products, tDetail] = await Promise.all([
    getManufacturer(slug, locale as Locale),
    getProductsByManufacturer(slug, undefined, locale as Locale),
    getTranslations('industrial.productDetail'),
  ])
  const tPartners = await getTranslations('industrial.partners')
  const partner = authorizedPartners.find((p) => p.slug === slug)

  if (!manufacturer) {
    notFound()
  }

  // Same rule as the product pages: only the four verified statuses render as a
  // badge, so an unset or non-committal relationshipStatus stays silent.
  const showRelationshipBadge = isVerifiedRelationship(manufacturer.relationshipStatus)

  const manufacturerSchema = generateManufacturerSchema({
    name: manufacturer.name,
    description: manufacturer.description,
    slug: slug,
    logo: manufacturer.logo ? imageBoxUrl(manufacturer.logo, 400) : undefined,
    website: manufacturer.website,
    headquarters: manufacturer.headquarters,
    founded: manufacturer.founded,
  })

  const breadcrumbItems = [
    { name: 'Manufacturers', href: '/manufacturers' },
    { name: manufacturer.name, href: `/manufacturers/${slug}` },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <StructuredData data={manufacturerSchema} />
      {/* BreadcrumbList JSON-LD is emitted by <Breadcrumbs> below — don't duplicate it here. */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        {/* Back Link */}
        <Link
          href="/manufacturers"
          className="inline-flex items-center gap-2 text-[color:var(--mr-steel)] hover:text-[color:var(--mr-accent-ink)] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          All Manufacturers
        </Link>

        {/* Manufacturer Header */}
        <div className="relative overflow-hidden rounded-3xl p-8 md:p-10 mb-12 border border-[color:var(--mr-line)] bg-[linear-gradient(140deg,#ffffff_0%,#f1f8f8_60%,#e2f2f1_100%)] shadow-[var(--mr-shadow)] mr-rise">
          <div className="mr-aurora opacity-60" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="absolute inset-0 ind-grid-bg pointer-events-none" aria-hidden="true" />
          {partner && (
            <p className="mr-chip relative mb-6">
              <span className="mr-pulse-dot" aria-hidden="true" />
              {tPartners('eyebrow')}
            </p>
          )}
          <div className="relative flex flex-col md:flex-row md:items-center gap-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              {partner ? (
                <div className="w-56 h-32 bg-white rounded-2xl px-6 flex items-center justify-center border border-[color:var(--mr-accent-line)] shadow-[var(--mr-shadow)]">
                  <Image
                    src={partner.logo}
                    alt={manufacturer.name}
                    width={partner.logoWidth}
                    height={partner.logoHeight}
                    unoptimized
                    className="mr-logo !opacity-90 max-h-16 w-auto max-w-full"
                  />
                </div>
              ) : manufacturer.logo ? (
                <div className="w-32 h-32 bg-white rounded-2xl p-4 flex items-center justify-center border border-[color:var(--mr-line)] shadow-[var(--mr-shadow)]">
                  <Image
                    src={urlFor(manufacturer.logo).maxWidth(200).maxHeight(200).url()}
                    alt={manufacturer.name}
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-2xl bg-[linear-gradient(140deg,var(--mr-accent),var(--mr-accent-ink))] flex items-center justify-center shadow-[var(--mr-shadow)]">
                  <span className="text-4xl font-semibold text-white font-[family-name:var(--font-display)]">
                    {manufacturer.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-grow">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="ind-h2 text-[color:var(--mr-ink)]">
                  {manufacturer.name}
                </h1>
                {showRelationshipBadge && manufacturer.relationshipStatus && (
                  <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.1em] font-semibold text-[color:var(--mr-accent-ink)] bg-white border border-[color:var(--mr-accent-line)]">
                    <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                    {tDetail(`relationship.${relStatusToKey(manufacturer.relationshipStatus)}`)}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-[color:var(--mr-ink-2)] mb-4">
                {manufacturer.headquarters && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {manufacturer.headquarters}
                  </span>
                )}
                {manufacturer.founded && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Founded {manufacturer.founded}
                  </span>
                )}
                {manufacturer.productCount !== undefined && manufacturer.productCount > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Package className="w-4 h-4" />
                    {manufacturer.productCount} {manufacturer.productCount === 1 ? 'Product' : 'Products'}
                  </span>
                )}
              </div>

              {/* Specialties */}
              {manufacturer.specialties && manufacturer.specialties.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {manufacturer.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-3 py-1 bg-white/80 text-[color:var(--mr-ink-2)] rounded-full text-sm font-medium border border-[color:var(--mr-line)]"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              )}

              {/* Website */}
              {manufacturer.website && (
                <a
                  href={manufacturer.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[color:var(--mr-accent-ink)] hover:text-[color:var(--mr-accent)] font-medium transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  Visit Website
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          {manufacturer.description && (
            <p className="text-gray-600 mt-6 max-w-3xl">
              {manufacturer.description}
            </p>
          )}
        </div>

        {/* Products */}
        <section>
          <h2 className="ind-h2 text-[color:var(--mr-ink)] mb-8">
            Products by {manufacturer.name}
          </h2>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No products listed yet
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Products from {manufacturer.name} will be added soon.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
