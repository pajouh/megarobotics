import { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { ArrowLeft, Package } from 'lucide-react'
import {
  getProductCategory,
  getProductsByCategory,
  getProductCategories,
  getManufacturers,
  getAllProductCategorySlugs,
  type Locale
} from '@/lib/sanity'
import ProductCard from '@/components/ProductCard'
import ProductFilter from '@/components/ProductFilter'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const category = await getProductCategory(slug, locale as Locale)

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.name} - Robotics Products`,
    description: category.description || `Browse ${category.name} robotics products from MegaRobotics.`,
  }
}

export async function generateStaticParams() {
  const slugs = await getAllProductCategorySlugs()
  return slugs
}

export const revalidate = 60

export default async function ProductCategoryPage({ params }: Props) {
  const { slug, locale } = await params
  const [category, products, categories, manufacturers] = await Promise.all([
    getProductCategory(slug, locale as Locale),
    getProductsByCategory(slug, undefined, locale as Locale),
    getProductCategories(locale as Locale),
    getManufacturers(locale as Locale),
  ])

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          All Products
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {category.icon && (
              <span className="text-4xl">{category.icon}</span>
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {category.name}
            </h1>
          </div>
          {category.description && (
            <p className="text-gray-600 max-w-2xl">
              {category.description}
            </p>
          )}
          {category.productCount !== undefined && (
            <p className="text-sm text-gray-500 mt-2">
              {category.productCount} {category.productCount === 1 ? 'product' : 'products'}
            </p>
          )}
        </div>

        {/* Filters */}
        <div className="mb-8">
          <Suspense fallback={<div className="h-24 bg-gray-100 rounded-xl animate-pulse" />}>
            <ProductFilter
              categories={categories}
              manufacturers={manufacturers}
              activeCategory={slug}
            />
          </Suspense>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl">
            <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              No products in this category yet
            </h2>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              We&apos;re working on adding {category.name.toLowerCase()} products.
              Check back soon!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 rounded-lg transition-all font-medium"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
