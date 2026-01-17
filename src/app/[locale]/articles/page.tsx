import { Metadata } from 'next'
import { Bot } from 'lucide-react'
import { getArticles, getCategories, type Locale } from '@/lib/sanity'
import ArticleCard from '@/components/ArticleCard'
import CategoryFilter from '@/components/CategoryFilter'

export const metadata: Metadata = {
  title: 'All Articles',
  description: 'Browse all robotics news, reviews, and industry insights from MegaRobotics.',
}

export const revalidate = 60

type Props = {
  params: Promise<{ locale: string }>
}

export default async function ArticlesPage({ params }: Props) {
  const { locale } = await params
  const [articles, categories] = await Promise.all([
    getArticles(undefined, locale as Locale),
    getCategories(locale as Locale),
  ])

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            All Articles
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Explore the latest robotics news, in-depth reviews, company profiles,
            and research insights from the world of intelligent machines.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter categories={categories} />
        </div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl">
            <Bot className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              No articles yet
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              We&apos;re working on bringing you the latest robotics news and insights.
              Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
