import { Metadata } from 'next'
import { Bot } from 'lucide-react'
import { getArticles, getCategories, type Locale } from '@/lib/sanity'
import ArticleCard from '@/components/ArticleCard'
import FeaturedArticle from '@/components/FeaturedArticle'
import CategoryFilter from '@/components/CategoryFilter'
import { pageSeo } from '@/lib/page-seo'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const title = 'Insights | MegaRobotics'
  const description =
    'Industrial robotics and automation insights from MegaRobotics — robot platform evaluations, integration notes, application studies, and market analysis for European industrial customers.'
  return pageSeo({ title, description, path: '/articles', locale })
}

// article publishes revalidate /articles via /api/revalidate; this timer is
// just a fallback, so keep it long to cut background regeneration.
export const revalidate = 3600

type Props = {
  params: Promise<{ locale: string }>
}

export default async function ArticlesPage({ params }: Props) {
  const { locale } = await params
  const [articles, categories] = await Promise.all([
    getArticles(undefined, locale as Locale),
    getCategories(locale as Locale),
  ])

  const [featured, ...rest] = articles

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[color:var(--mr-paper)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <div className="ind-eyebrow mb-4">
            <span className="inline-block w-8 h-px bg-[color:var(--mr-accent-ink)]" aria-hidden="true" />
            Insights
          </div>
          <h1 className="ind-h1 text-[color:var(--mr-ink)] mb-4">All Articles</h1>
          <p className="text-[color:var(--mr-ink-2)] text-lg">
            Explore the latest robotics news, in-depth reviews, company profiles,
            and research insights from the world of intelligent machines.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <CategoryFilter categories={categories} />
        </div>

        {articles.length > 0 ? (
          <>
            {/* Featured lead article */}
            {featured && (
              <div className="mb-14 pb-14 border-b border-[color:var(--mr-line)]">
                <FeaturedArticle article={featured} />
              </div>
            )}

            {/* Articles Grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((article) => (
                  <ArticleCard key={article._id} article={article} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-[color:var(--mr-white)] border border-[color:var(--mr-line)]">
            <Bot className="w-16 h-16 text-[color:var(--mr-steel)] mx-auto mb-6" strokeWidth={1.25} />
            <h2 className="ind-h3 text-[color:var(--mr-ink)] mb-3">No articles yet</h2>
            <p className="text-[color:var(--mr-ink-2)] max-w-md mx-auto">
              We&apos;re working on bringing you the latest robotics news and insights.
              Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
