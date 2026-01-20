import { Metadata } from 'next'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, FileText, Mail, Check } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import {
  getProduct,
  getRelatedProducts,
  getProductsBySameManufacturer,
  getAllProductSlugs,
  urlFor,
  type Locale
} from '@/lib/sanity'
import ProductCard from '@/components/ProductCard'
import ProductGallery from '@/components/ProductGallery'
import SpecificationsTable from '@/components/SpecificationsTable'
import ArticleBody from '@/components/ArticleBody'
import StructuredData from '@/components/StructuredData'
import Breadcrumbs from '@/components/Breadcrumbs'
import Disclaimer from '@/components/Disclaimer'
import { generateProductSchema, generateBreadcrumbSchema, generateAlternates } from '@/lib/structured-data'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const product = await getProduct(slug, locale as Locale)

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  const alternates = generateAlternates(`/products/${slug}`)

  return {
    title: `${product.name} by ${product.manufacturer?.name || 'Unknown'}`,
    description: product.description || product.tagline,
    alternates,
    openGraph: {
      title: product.name,
      description: product.description || product.tagline,
      type: 'website',
      images: product.mainImage
        ? [
            {
              url: urlFor(product.mainImage).width(1200).height(630).url(),
              width: 1200,
              height: 630,
            },
          ]
        : undefined,
    },
  }
}

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs()
  return slugs
}

export default async function ProductPage({ params }: Props) {
  const { slug, locale } = await params
  const product = await getProduct(slug, locale as Locale)
  const t = await getTranslations('products')
  const tCommon = await getTranslations('common')
  const tDisclaimers = await getTranslations('disclaimers')

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

  // Generate structured data schemas
  const productSchema = generateProductSchema({
    name: product.name,
    description: product.description || product.tagline || '',
    slug: slug,
    manufacturer: product.manufacturer?.name,
    category: product.category?.name,
    mainImage: product.mainImage ? urlFor(product.mainImage).width(800).height(600).url() : undefined,
    priceRange: product.priceRange,
    availability: product.availability,
    specifications: product.specifications,
  })

  const breadcrumbItems = [
    { name: 'Products', href: '/products' },
    ...(product.category
      ? [{ name: product.category.name, href: `/products/category/${product.category.slug.current}` }]
      : []),
    { name: product.name, href: `/products/${slug}` },
  ]

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems)

  const availabilityLabels: Record<string, string> = {
    available: t('availability.available'),
    preorder: t('availability.preorder'),
    coming_soon: t('availability.comingSoon'),
    contact: t('availability.contact'),
  }

  const availabilityColors: Record<string, string> = {
    available: 'bg-emerald-100 text-emerald-700',
    preorder: 'bg-blue-100 text-blue-700',
    coming_soon: 'bg-amber-100 text-amber-700',
    contact: 'bg-gray-100 text-gray-700',
  }

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
            {/* Category & Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {product.category && (
                <Link
                  href={`/products/category/${product.category.slug.current}`}
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                >
                  {product.category.icon} {product.category.name}
                </Link>
              )}
              {product.isNew && (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500 text-white">
                  New
                </span>
              )}
              {product.availability && (
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${availabilityColors[product.availability] || availabilityColors.contact}`}>
                  {availabilityLabels[product.availability] || product.availability}
                </span>
              )}
            </div>

            {/* Manufacturer */}
            {product.manufacturer && (
              <Link
                href={`/manufacturers/${product.manufacturer.slug.current}`}
                className="inline-flex items-center gap-3 mb-4 group"
              >
                {product.manufacturer.logo && (
                  <div className="w-10 h-10 rounded-lg bg-gray-100 p-1.5">
                    <Image
                      src={urlFor(product.manufacturer.logo).width(64).height(64).url()}
                      alt={product.manufacturer.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <span className="text-gray-600 group-hover:text-emerald-600 transition-colors font-medium">
                  {product.manufacturer.name}
                </span>
              </Link>
            )}

            {/* Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Tagline */}
            {product.tagline && (
              <p className="text-lg text-gray-600 mb-4">
                {product.tagline}
              </p>
            )}

            {/* Price */}
            {product.priceRange && (
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  {product.priceRange}
                </span>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <p className="text-gray-600 mb-6">
                {product.description}
              </p>
            )}

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                  {t('features')}
                </h3>
                <ul className="space-y-2">
                  {product.features.slice(0, 5).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              {product.productUrl && (
                <a
                  href={product.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  {t('visitOfficialSite')}
                </a>
              )}
              {product.datasheetUrl && (
                <a
                  href={product.datasheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-medium transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  {t('downloadDatasheet')}
                </a>
              )}
              <Link
                href="/about#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 hover:border-gray-300 text-gray-900 rounded-lg font-medium transition-colors"
              >
                <Mail className="w-4 h-4" />
                {t('requestQuote')}
              </Link>
            </div>
          </div>
        </div>

        {/* Specifications */}
        {product.specifications && product.specifications.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('specifications')}</h2>
            <SpecificationsTable specifications={product.specifications} />
          </section>
        )}

        {/* Full Description */}
        {product.fullDescription && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('description')}</h2>
            <div className="prose-light max-w-none">
              <ArticleBody body={product.fullDescription} />
            </div>
          </section>
        )}

        {/* Applications */}
        {product.applications && product.applications.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('applications')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.applications.map((application, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                >
                  <span className="text-gray-700">{application}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Video */}
        {product.videoUrl && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('video')}</h2>
            <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100">
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
              <h2 className="text-2xl font-bold text-gray-900">
                {t('moreFrom', { manufacturer: product.manufacturer?.name })}
              </h2>
              {product.manufacturer && (
                <Link
                  href={`/manufacturers/${product.manufacturer.slug.current}`}
                  className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                >
                  {tCommon('viewAll')}
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
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('relatedProducts')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct._id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}

        {/* Legal Disclaimer */}
        <Disclaimer
          variant="product"
          manufacturerName={product.manufacturer?.name}
          translations={{ product: tDisclaimers('product') }}
        />
      </div>
    </div>
  )
}
