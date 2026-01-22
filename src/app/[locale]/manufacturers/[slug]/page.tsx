import { Metadata } from 'next'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { notFound } from 'next/navigation'
import { ArrowLeft, Globe, MapPin, Calendar, Package } from 'lucide-react'
import {
  getManufacturer,
  getProductsByManufacturer,
  getAllManufacturerSlugs,
  urlFor,
  type Locale
} from '@/lib/sanity'
import ProductCard from '@/components/ProductCard'
import { generateAlternates, generateManufacturerSchema, generateBreadcrumbSchema } from '@/lib/structured-data'
import StructuredData from '@/components/StructuredData'
import Breadcrumbs from '@/components/Breadcrumbs'

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

  return {
    title: `${manufacturer.name} - Robotics Products`,
    description: manufacturer.description || `Browse robotics products from ${manufacturer.name}.`,
    alternates: generateAlternates(`/manufacturers/${slug}`),
    openGraph: {
      title: manufacturer.name,
      description: manufacturer.description || `Browse robotics products from ${manufacturer.name}.`,
      images: manufacturer.logo
        ? [
            {
              url: urlFor(manufacturer.logo).width(1200).height(630).url(),
              width: 1200,
              height: 630,
            },
          ]
        : undefined,
    },
  }
}

export async function generateStaticParams() {
  const slugs = await getAllManufacturerSlugs()
  return slugs
}

export const revalidate = 60

export default async function ManufacturerPage({ params }: Props) {
  const { slug, locale } = await params
  const [manufacturer, products] = await Promise.all([
    getManufacturer(slug, locale as Locale),
    getProductsByManufacturer(slug, undefined, locale as Locale),
  ])

  if (!manufacturer) {
    notFound()
  }

  const manufacturerSchema = generateManufacturerSchema({
    name: manufacturer.name,
    description: manufacturer.description,
    slug: slug,
    logo: manufacturer.logo ? urlFor(manufacturer.logo).width(400).height(400).url() : undefined,
    website: manufacturer.website,
    headquarters: manufacturer.headquarters,
    founded: manufacturer.founded,
  })

  const breadcrumbItems = [
    { name: 'Manufacturers', href: '/manufacturers' },
    { name: manufacturer.name, href: `/manufacturers/${slug}` },
  ]

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems)

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <StructuredData data={manufacturerSchema} />
      <StructuredData data={breadcrumbSchema} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        {/* Back Link */}
        <Link
          href="/manufacturers"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          All Manufacturers
        </Link>

        {/* Manufacturer Header */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              {manufacturer.logo ? (
                <div className="w-32 h-32 bg-white rounded-2xl p-4 flex items-center justify-center border border-gray-200">
                  <Image
                    src={urlFor(manufacturer.logo).width(200).height(200).fit('max').url()}
                    alt={manufacturer.name}
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">
                    {manufacturer.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-grow">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {manufacturer.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
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
                      className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm font-medium border border-gray-200"
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
                  className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
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
