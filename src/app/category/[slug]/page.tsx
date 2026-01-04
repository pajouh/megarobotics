import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Bot } from 'lucide-react'
import { getCategory, getArticlesByCategory, getCategories, getAllCategorySlugs } from '@/lib/sanity'
import ArticleCard from '@/components/ArticleCard'
import CategoryFilter from '@/components/CategoryFilter'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.title} News & Articles`,
    description: category.description || `Browse all ${category.title.toLowerCase()} articles and news from MegaRobotics.`,
  }
}

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs()
  return slugs
}

export const revalidate = 60

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const [category, articles, categories] = await Promise.all([
    getCategory(slug),
    getArticlesByCategory(slug),
    getCategories(),
  ])

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          All Articles
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {category.icon && (
              <span className="text-4xl">{category.icon}</span>
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {category.title}
            </h1>
          </div>
          {category.description && (
            <p className="text-gray-600 max-w-2xl">
              {category.description}
            </p>
          )}
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter categories={categories} activeCategory={slug} />
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
              No articles in this category yet
            </h2>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              We&apos;re working on bringing you the latest {category.title.toLowerCase()} news.
              Check back soon!
            </p>
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 rounded-lg transition-all font-medium"
            >
              Browse All Articles
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
