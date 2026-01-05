import { Suspense } from 'react'
import Link from 'next/link'
import { Bot, TrendingUp, Cpu, Users, ArrowRight, Package } from 'lucide-react'
import { getArticles, getFeaturedArticles, getCategories, getFeaturedProducts } from '@/lib/sanity'
import ArticleCard from '@/components/ArticleCard'
import FeaturedArticle from '@/components/FeaturedArticle'
import CategoryFilter from '@/components/CategoryFilter'
import NewsletterForm from '@/components/NewsletterForm'
import ProductCard from '@/components/ProductCard'
import StructuredData from '@/components/StructuredData'
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/structured-data'

const stats = [
  { label: 'Global Market', value: '$185B+', icon: TrendingUp, detail: '+14% YoY Growth' },
  { label: 'Humanoid CAGR', value: '138%', icon: Bot, detail: '2024-2030 Forecast' },
  { label: 'Industrial Robots', value: '4.2M', icon: Cpu, detail: 'Units Deployed' },
  { label: 'Industry Jobs', value: '2.1M', icon: Users, detail: 'Created by 2030' },
]

export const revalidate = 60

export default async function HomePage() {
  const [articles, featuredArticles, categories, featuredProducts] = await Promise.all([
    getArticles(9),
    getFeaturedArticles(1),
    getCategories(),
    getFeaturedProducts(4),
  ])

  const featuredArticle = featuredArticles[0]
  const gridArticles = articles.filter((a) => a._id !== featuredArticle?._id).slice(0, 6)

  const structuredData = [
    generateOrganizationSchema(),
    generateWebSiteSchema(),
  ]

  return (
    <div className="min-h-screen">
      <StructuredData data={structuredData} />

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 grid-bg" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-sm text-gray-600 font-medium">
                Live Robotics Intelligence
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              The Future of{' '}
              <span className="gradient-text">Robotics</span>
              <br />Starts Here
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Your trusted source for robotics news, in-depth analysis, and industry insights.
              From industrial automation to humanoid innovations.
            </p>

            {/* Newsletter Signup */}
            <div className="flex justify-center mb-16" id="newsletter">
              <NewsletterForm />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-5 md:p-6 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
              >
                <stat.icon className="w-5 h-5 text-emerald-600 mb-3" />
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-900">{stat.label}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-3">
                  <Package className="w-4 h-4" />
                  Featured Products
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Discover Robotics Products
                </h2>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-gray-900 hover:text-emerald-600 font-medium transition-colors"
              >
                View All Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Article Section */}
      {featuredArticle && (
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FeaturedArticle article={featuredArticle} />
          </div>
        </section>
      )}

      {/* Latest Articles Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Latest News
              </h2>
              <p className="text-gray-600">
                Stay informed with the latest developments in robotics
              </p>
            </div>
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-gray-900 hover:text-emerald-600 font-medium transition-colors"
            >
              View All Articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Category Filter */}
          <div className="mb-10">
            <Suspense fallback={<div className="h-10 bg-gray-100 rounded-full animate-pulse" />}>
              <CategoryFilter categories={categories} />
            </Suspense>
          </div>

          {/* Articles Grid */}
          {gridArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridArticles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl">
              <Bot className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles yet</h3>
              <p className="text-gray-500">
                Check back soon for the latest robotics news and insights.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Never Miss a Breakthrough
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Get weekly insights on AI-powered robots, industry trends, and exclusive analysis
              delivered straight to your inbox.
            </p>
            <div className="flex justify-center">
              <NewsletterForm variant="dark" />
            </div>
            <p className="text-gray-500 text-sm mt-6">
              Join 50,000+ robotics professionals and enthusiasts
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
