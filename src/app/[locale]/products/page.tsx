import { Metadata } from 'next'
import { Suspense } from 'react'
import { Package } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { getProducts, getProductCategories, getManufacturers, getFeaturedProducts, searchProducts, type Locale } from '@/lib/sanity'
import ProductCard from '@/components/ProductCard'
import ProductFilter from '@/components/ProductFilter'
import Disclaimer from '@/components/Disclaimer'
import { generateAlternates } from '@/lib/structured-data'

export function generateMetadata(): Metadata {
  return {
    title: 'Robotics Products',
    description: 'Browse our catalog of robotics products from leading Chinese manufacturers. From humanoid robots to industrial automation.',
    alternates: generateAlternates('/products'),
  }
}

export const revalidate = 60

interface Props {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ q?: string }>
}

export default async function ProductsPage({ params, searchParams }: Props) {
  const { locale } = await params
  const searchParamsResolved = await searchParams
  const searchQuery = searchParamsResolved.q
  const tDisclaimers = await getTranslations('disclaimers')

  const [products, categories, manufacturers, featuredProducts] = await Promise.all([
    searchQuery ? searchProducts(searchQuery, locale as Locale) : getProducts(undefined, locale as Locale),
    getProductCategories(locale as Locale),
    getManufacturers(locale as Locale),
    getFeaturedProducts(4, locale as Locale),
  ])

  // Show featured products only when not searching
  const showFeatured = !searchQuery && featuredProducts.length > 0

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Robotics Products
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Discover cutting-edge robotics products from leading manufacturers.
            From consumer quadrupeds to industrial automation solutions.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <Suspense fallback={<div className="h-24 bg-gray-100 rounded-xl animate-pulse" />}>
            <ProductFilter
              categories={categories}
              manufacturers={manufacturers}
            />
          </Suspense>
        </div>

        {/* Search Results Label */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-gray-600">
              {products.length} results for &quot;{searchQuery}&quot;
            </p>
          </div>
        )}

        {/* Featured Products */}
        {showFeatured && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* All Products */}
        <section>
          {!showFeatured && <h2 className="text-xl font-bold text-gray-900 mb-6">All Products</h2>}
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
                {searchQuery ? 'No products found' : 'No products yet'}
              </h2>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchQuery
                  ? 'Try adjusting your search terms or browse all products.'
                  : 'Check back soon for our robotics product catalog.'}
              </p>
            </div>
          )}
        </section>

        {/* Legal Disclaimer */}
        <Disclaimer
          variant="productListing"
          translations={{ productListing: tDisclaimers('productListing') }}
        />
      </div>
    </div>
  )
}
