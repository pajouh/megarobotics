import { Suspense } from 'react'
import Link from 'next/link'
import { Bot, TrendingUp, Cpu, Users, ArrowRight, Zap } from 'lucide-react'
import { getArticles, getFeaturedArticles, getCategories } from '@/lib/sanity'
import ArticleCard from '@/components/ArticleCard'
import FeaturedArticle from '@/components/FeaturedArticle'
import CategoryFilter from '@/components/CategoryFilter'
import NewsletterForm from '@/components/NewsletterForm'

const stats = [
  { label: 'Global Market', value: '$185B+', icon: TrendingUp, growth: '+14% YoY' },
  { label: 'Humanoid CAGR', value: '138%', icon: Bot, growth: '2024-2030' },
  { label: 'Industrial Robots', value: '4.2M', icon: Cpu, growth: 'Units Deployed' },
  { label: 'Industry Jobs', value: '2.1M', icon: Users, growth: 'Created by 2030' },
]

export const revalidate = 60 // Revalidate every 60 seconds

export default async function HomePage() {
  const [articles, featuredArticles, categories] = await Promise.all([
    getArticles(9),
    getFeaturedArticles(1),
    getCategories(),
  ])

  const featuredArticle = featuredArticles[0]
  const gridArticles = articles.filter((a) => a._id !== featuredArticle?._id).slice(0, 6)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />

        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-slow" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Live Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-sm text-slate-400">
                Live Robotics Intelligence
              </span>
            </div>
          </div>

          {/* Hero Title */}
          <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
            The Future of{' '}
            <span className="gradient-text">Robotics</span>
            {' '}is Here
          </h1>

          <p className="text-center text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Your source for the latest robotics news, reviews, and industry insights.
            Covering industrial automation, humanoid robots, and AI integration.
          </p>

          {/* Newsletter Signup */}
          <div className="flex justify-center mb-16" id="newsletter">
            <NewsletterForm />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="relative p-4 md:p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-emerald-500/30 transition-all"
              >
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-emerald-400 mb-3" />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
                <div className="text-xs text-emerald-400 mt-1">{stat.growth}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article Section */}
      {featuredArticle && (
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FeaturedArticle article={featuredArticle} />
          </div>
        </section>
      )}

      {/* Latest Articles Section */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Latest News
              </h2>
              <p className="text-slate-400">
                Stay informed with the latest developments in robotics
              </p>
            </div>
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              View All Articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <Suspense fallback={<div className="h-10 bg-white/5 rounded-full animate-pulse" />}>
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
            <div className="text-center py-16">
              <Bot className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No articles yet</h3>
              <p className="text-slate-400">
                Check back soon for the latest robotics news and insights.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20" />
            <div className="absolute inset-0 grid-bg opacity-50" />

            {/* Content */}
            <div className="relative p-8 md:p-12 lg:p-16 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-white">Join 50,000+ subscribers</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 max-w-2xl mx-auto">
                Never Miss a Robotics Breakthrough
              </h2>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                Get weekly insights on AI-powered robots, industry trends, and exclusive analysis
                delivered straight to your inbox.
              </p>

              <div className="flex justify-center">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
