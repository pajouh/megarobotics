import { Metadata } from 'next'
import { Suspense } from 'react'
import { Link } from '@/i18n/navigation'
import { Bot, TrendingUp, Cpu, Users, ArrowRight, Package } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { getArticles, getFeaturedArticles, getCategories, getFeaturedProducts, type Locale } from '@/lib/sanity'
import ArticleCard from '@/components/ArticleCard'
import FeaturedArticle from '@/components/FeaturedArticle'
import CategoryFilter from '@/components/CategoryFilter'
import NewsletterForm from '@/components/NewsletterForm'
import ProductCard from '@/components/ProductCard'
import StructuredData from '@/components/StructuredData'
import HeroBannerWrapper from '@/components/HeroBannerWrapper'
import { generateOrganizationSchema, generateWebSiteSchema, generateAlternates } from '@/lib/structured-data'

export function generateMetadata(): Metadata {
  return {
    alternates: generateAlternates(''),
  }
}

export const revalidate = 60

type Props = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations('home')
  const tCommon = await getTranslations('common')
  const tArticles = await getTranslations('articles')

  const [articles, featuredArticles, categories, featuredProducts] = await Promise.all([
    getArticles(9, locale as Locale),
    getFeaturedArticles(1, locale as Locale),
    getCategories(locale as Locale),
    getFeaturedProducts(4, locale as Locale),
  ])

  const featuredArticle = featuredArticles[0]
  const gridArticles = articles.filter((a) => a._id !== featuredArticle?._id).slice(0, 6)

  const stats = [
    { label: t('stats.globalMarket'), value: '$185B+', icon: TrendingUp, detail: t('stats.globalMarketDetail') },
    { label: t('stats.humanoidCagr'), value: '138%', icon: Bot, detail: t('stats.humanoidCagrDetail') },
    { label: t('stats.industrialRobots'), value: '4.2M', icon: Cpu, detail: t('stats.industrialRobotsDetail') },
    { label: t('stats.industryJobs'), value: '2.1M', icon: Users, detail: t('stats.industryJobsDetail') },
  ]

  const structuredData = [
    generateOrganizationSchema(),
    generateWebSiteSchema(),
  ]

  return (
    <div className="min-h-screen">
      <StructuredData data={structuredData} />

      {/* Hero Banner from Sanity */}
      <Suspense fallback={<div className="h-[500px] md:h-[600px] lg:h-[700px] bg-gray-100 animate-pulse" />}>
        <HeroBannerWrapper />
      </Suspense>

      {/* Stats Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                  {t('featuredProducts')}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {t('featuredProductsSubtitle')}
                </h2>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-gray-900 hover:text-emerald-600 font-medium transition-colors"
              >
                {t('viewAllProducts')}
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
                {t('latestNews')}
              </h2>
              <p className="text-gray-600">
                {t('latestNewsSubtitle')}
              </p>
            </div>
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-gray-900 hover:text-emerald-600 font-medium transition-colors"
            >
              {t('viewAllNews')}
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{tArticles('noArticles')}</h3>
              <p className="text-gray-500">
                {t('noArticlesDescription')}
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
              {t('ctaTitle')}
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              {t('ctaSubtitle')}
            </p>
            <div className="flex justify-center">
              <NewsletterForm variant="dark" />
            </div>
            <p className="text-gray-500 text-sm mt-6">
              {t('ctaNote')}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
