import type { Metadata } from 'next'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, FileText, Mail, Check, MessageSquare, ShieldCheck } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import {
  getProduct,
  getRelatedProducts,
  getProductsBySameManufacturer,
  getAllProductSlugs,
  urlFor,
  type Locale,
} from '@/lib/sanity'
import type { AvailabilityStatus, RelationshipStatus } from '@/types'
import ProductCard from '@/components/ProductCard'
import ProductGallery from '@/components/ProductGallery'
import SpecificationsTable from '@/components/SpecificationsTable'
import ArticleBody from '@/components/ArticleBody'
import StructuredData from '@/components/StructuredData'
import Breadcrumbs from '@/components/Breadcrumbs'
import Disclaimer from '@/components/Disclaimer'
import SafeNotice from '@/components/industrial/SafeNotice'
import {
  generateProductSchema,
  generateBreadcrumbSchema,
  generateAlternates,
} from '@/lib/structured-data'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const product = await getProduct(slug, locale as Locale)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  const alternates = generateAlternates(`/products/${slug}`)
  const metaTitle =
    product.seo?.metaTitle || `${product.name} | ${product.manufacturer?.name || 'MegaRobotics'}`
  const metaDescription = product.seo?.metaDescription || product.description || product.tagline
  const imageUrl = product.mainImage
    ? urlFor(product.mainImage).width(1200).height(630).url()
    : undefined

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: product.seo?.keywords,
    alternates,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'website',
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: product.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

export async function generateStaticParams() {
  return getAllProductSlugs()
}

export const revalidate = 60

const VERIFIED_RELATIONSHIPS: RelationshipStatus[] = [
  'official_distributor',
  'authorized_reseller',
  'sales_partner',
  'technology_partner',
]

function buildContactHref(
  inquiry: 'availability' | 'project' | 'datasheet',
  product: { name: string; manufacturer?: { name?: string } | null; productFamily?: { slug?: { current?: string } } },
): string {
  const params = new URLSearchParams()
  params.set('inquiry', inquiry)
  params.set('product', product.name)
  if (product.manufacturer?.name) params.set('manufacturer', product.manufacturer.name)
  if (product.productFamily?.slug?.current) params.set('family', product.productFamily.slug.current)
  return `/contact?${params.toString()}`
}

export default async function ProductPage({ params }: Props) {
  const { slug, locale } = await params
  const product = await getProduct(slug, locale as Locale)
  const t = await getTranslations('products')
  const tDetail = await getTranslations('industrial.productDetail')
  const tDisclaimers = await getTranslations('disclaimers')
  const tNotice = await getTranslations('industrial.safeNotice')

  if (!product) {
    notFound()
  }

  const [relatedProducts, sameManufacturerProducts] = await Promise.all([
    product.category
      ? getRelatedProducts(product._id, product.category.slug.current, 4, locale as Locale)
      : Promise.resolve([]),
    product.manufacturer
      ? getProductsBySameManufacturer(product._id, product.manufacturer.slug.current, 4, locale as Locale)
      : Promise.resolve([]),
  ])

  const productSchema = generateProductSchema({
    name: product.name,
    description: product.description || product.tagline || '',
    slug,
    manufacturer: product.manufacturer?.name,
    category: product.category?.name,
    mainImage: product.mainImage
      ? urlFor(product.mainImage).width(800).height(600).url()
      : undefined,
    priceRange: product.priceRange,
    availability: product.availability,
    specifications: product.specifications,
  })

  const breadcrumbItems = [
    { name: 'Products', href: '/products' },
    ...(product.productFamily
      ? [
          {
            name: product.productFamily.title,
            href: `/products/categories/${product.productFamily.slug.current}`,
          },
        ]
      : product.category
        ? [{ name: product.category.name, href: `/products/category/${product.category.slug.current}` }]
        : []),
    { name: product.name, href: `/products/${slug}` },
  ]

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems)

  // Resolve availability label: prefer new vocab, fall back to legacy
  const availStatus: AvailabilityStatus | undefined = product.availabilityStatus
  const availabilityLabel = availStatus
    ? tDetail(`availability.${availStatusToKey(availStatus)}`)
    : product.availability
      ? t(`availability.${legacyAvailToKey(product.availability)}`)
      : null

  // Resolve effective relationship status (per-product override beats manufacturer)
  const relStatus: RelationshipStatus | undefined =
    (product.manufacturerRelationshipStatus as RelationshipStatus | undefined) ||
    product.manufacturer?.relationshipStatus

  const showRelationshipBadge = relStatus && VERIFIED_RELATIONSHIPS.includes(relStatus)

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <StructuredData data={productSchema} />
      <StructuredData data={breadcrumbSchema} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('backToProducts')}
        </Link>

        {/* Product Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {/* Gallery */}
          <ProductGallery
            mainImage={product.mainImage}
            gallery={product.gallery}
            productName={product.name}
          />

          {/* Product Info */}
          <div>
            {/* Family / subcategory / availability badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {product.productFamily && (
                <Link
                  href={`/products/categories/${product.productFamily.slug.current}`}
                  className="inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-colors"
                >
                  {product.productFamily.title}
                </Link>
              )}
              {product.subcategory && (
                <span className="inline-flex items-center px-2.5 py-1 rounded text-xs text-gray-700 bg-gray-100 border border-gray-200">
                  {product.subcategory}
                </span>
              )}
              {product.category && !product.productFamily && (
                <Link
                  href={`/products/category/${product.category.slug.current}`}
                  className="inline-flex items-center px-2.5 py-1 rounded text-xs text-gray-700 bg-gray-100 border border-gray-200 hover:bg-gray-200 transition-colors"
                >
                  {product.category.name}
                </Link>
              )}
              {product.isNew && (
                <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider bg-orange-500 text-white">
                  New
                </span>
              )}
              {availabilityLabel && (
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium ${availabilityChipClass(
                    availStatus ?? product.availability,
                  )}`}
                >
                  {availabilityLabel}
                </span>
              )}
              {product.inquiryOnly && (
                <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold text-orange-700 bg-orange-50 border border-orange-100">
                  {tDetail('inquiryOnlyBadge')}
                </span>
              )}
            </div>

            {/* Manufacturer + optional verified-relationship badge */}
            {product.manufacturer && (
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Link
                  href={`/manufacturers/${product.manufacturer.slug.current}`}
                  className="inline-flex items-center gap-3 group"
                >
                  {product.manufacturer.logo && (
                    <div className="w-10 h-10 rounded bg-gray-100 p-1.5">
                      <Image
                        src={urlFor(product.manufacturer.logo).width(64).height(64).fit('max').url()}
                        alt={product.manufacturer.name}
                        width={32}
                        height={32}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <span className="text-gray-700 group-hover:text-blue-700 transition-colors font-medium">
                    {product.manufacturer.name}
                  </span>
                </Link>
                {showRelationshipBadge && relStatus && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                    {tDetail(`relationship.${relStatusToKey(relStatus)}`)}
                  </span>
                )}
              </div>
            )}

            {/* Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
              {product.name}
            </h1>

            {/* Tagline */}
            {product.tagline && <p className="text-lg text-gray-600 mb-4">{product.tagline}</p>}

            {/* Price — hidden when inquiry-only */}
            {product.priceRange && !product.inquiryOnly && (
              <div className="mb-6">
                <span className="text-2xl font-bold text-gray-900">{product.priceRange}</span>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <p className="text-gray-600 mb-6">{product.description}</p>
            )}

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                  {t('features')}
                </h3>
                <ul className="space-y-2">
                  {product.features.slice(0, 5).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Primary CTAs */}
            <div className="flex flex-wrap gap-2 mb-3">
              <Link href={buildContactHref('availability', product)} className="ind-btn-primary">
                <Mail className="w-4 h-4" />
                {tDetail('cta.requestAvailability')}
              </Link>
              <Link href={buildContactHref('project', product)} className="ind-btn-secondary">
                <MessageSquare className="w-4 h-4" />
                {tDetail('cta.discussApplication')}
              </Link>
            </div>

            {/* Secondary CTAs */}
            <div className="flex flex-wrap gap-3 text-sm">
              {product.datasheetUrl ? (
                <a
                  href={product.datasheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-gray-700 hover:text-blue-700 font-semibold transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  {t('downloadDatasheet')}
                </a>
              ) : (
                <Link
                  href={buildContactHref('datasheet', product)}
                  className="inline-flex items-center gap-1.5 text-gray-700 hover:text-blue-700 font-semibold transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  {tDetail('cta.askForDatasheet')}
                </Link>
              )}
              {product.productUrl && (
                <a
                  href={product.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-gray-700 hover:text-blue-700 font-semibold transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  {t('visitOfficialSite')}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Distributor notice */}
        <div className="mb-12 max-w-3xl">
          <SafeNotice label={tNotice('label')} accent="blue">
            {tDetail('distributorNotice')}
          </SafeNotice>
        </div>

        {/* Specifications */}
        {product.specifications && product.specifications.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">
              {t('specifications')}
            </h2>
            <SpecificationsTable specifications={product.specifications} />
          </section>
        )}

        {/* Full Description */}
        {product.fullDescription && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">
              {t('description')}
            </h2>
            <div className="prose-light max-w-none">
              <ArticleBody body={product.fullDescription} />
            </div>
          </section>
        )}

        {/* Applications */}
        {product.applications && product.applications.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">
              {t('applications')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {product.applications.map((application, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded border border-gray-200 text-sm text-gray-700"
                >
                  {application}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Video */}
        {product.videoUrl && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">
              {t('video')}
            </h2>
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
              <iframe
                src={product.videoUrl.replace('watch?v=', 'embed/')}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </section>
        )}

        {/* More from Manufacturer */}
        {sameManufacturerProducts.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {t('moreFrom', { manufacturer: product.manufacturer?.name })}
              </h2>
              {product.manufacturer && (
                <Link
                  href={`/manufacturers/${product.manufacturer.slug.current}`}
                  className="text-blue-700 hover:text-blue-800 font-semibold text-sm transition-colors"
                >
                  {tDetail('viewManufacturer')}
                </Link>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sameManufacturerProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct._id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">
              {t('relatedProducts')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct._id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}

        {/* Trademark disclaimer (preserved) */}
        <Disclaimer
          variant="product"
          manufacturerName={product.manufacturer?.name}
          translations={{ product: tDisclaimers('product') }}
        />
      </div>
    </div>
  )
}

// ---------- Helpers ----------

function availStatusToKey(s: AvailabilityStatus): string {
  return {
    in_stock: 'inStock',
    available_on_request: 'availableOnRequest',
    sourcing_on_request: 'sourcingOnRequest',
    lead_time_required: 'leadTimeRequired',
    information_only: 'informationOnly',
    discontinued: 'discontinued',
  }[s]
}

function legacyAvailToKey(s: 'available' | 'preorder' | 'coming_soon' | 'contact'): string {
  return { available: 'available', preorder: 'preorder', coming_soon: 'comingSoon', contact: 'contact' }[s]
}

function relStatusToKey(s: RelationshipStatus): string {
  return {
    official_distributor: 'officialDistributor',
    authorized_reseller: 'authorizedReseller',
    sales_partner: 'salesPartner',
    technology_partner: 'technologyPartner',
    sourcing_available: 'sourcingAvailable',
    information_only: 'informationOnly',
    under_evaluation: 'underEvaluation',
    unknown: 'unknown',
  }[s]
}

function availabilityChipClass(s?: string): string {
  switch (s) {
    case 'in_stock':
    case 'available':
      return 'text-emerald-700 bg-emerald-50 border border-emerald-100'
    case 'available_on_request':
    case 'sourcing_on_request':
    case 'preorder':
      return 'text-blue-700 bg-blue-50 border border-blue-100'
    case 'lead_time_required':
    case 'coming_soon':
      return 'text-amber-700 bg-amber-50 border border-amber-100'
    case 'information_only':
    case 'contact':
      return 'text-gray-700 bg-gray-100 border border-gray-200'
    case 'discontinued':
      return 'text-rose-700 bg-rose-50 border border-rose-100'
    default:
      return 'text-gray-700 bg-gray-100 border border-gray-200'
  }
}
