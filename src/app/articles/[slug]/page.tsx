import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { Clock, Calendar, ArrowLeft, Twitter, Linkedin } from 'lucide-react'
import { getArticle, getRelatedArticles, getAllArticleSlugs, urlFor } from '@/lib/sanity'
import ArticleCard from '@/components/ArticleCard'
import CopyLinkButton from '@/components/CopyLinkButton'
import ArticleBody from '@/components/ArticleBody'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: article.author ? [article.author.name] : undefined,
      images: article.mainImage
        ? [
            {
              url: urlFor(article.mainImage).width(1200).height(630).url(),
              width: 1200,
              height: 630,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.mainImage
        ? [urlFor(article.mainImage).width(1200).height(630).url()]
        : undefined,
    },
  }
}

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs()
  return slugs
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = article.category
    ? await getRelatedArticles(article._id, article.category.slug.current, 3)
    : []

  const shareUrl = `https://megarobotics.de/articles/${slug}`

  return (
    <article className="min-h-screen pt-24 pb-16 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Articles
        </Link>

        {/* Header */}
        <header className="mb-8">
          {/* Category */}
          {article.category && (
            <Link
              href={`/category/${article.category.slug.current}`}
              className="inline-flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700 mb-4 transition-colors font-medium"
            >
              {article.category.icon} {article.category.title}
            </Link>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-lg md:text-xl text-gray-600 mb-6">
              {article.excerpt}
            </p>
          )}

          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-gray-200">
            {/* Author */}
            {article.author && (
              <div className="flex items-center gap-3">
                {article.author.image && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                    <Image
                      src={urlFor(article.author.image).width(96).height(96).url()}
                      alt={article.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <span className="block font-medium text-gray-900">
                    {article.author.name}
                  </span>
                  {article.author.twitter && (
                    <a
                      href={`https://twitter.com/${article.author.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-500 hover:text-emerald-600 transition-colors"
                    >
                      @{article.author.twitter}
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Date */}
            {article.publishedAt && (
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {format(new Date(article.publishedAt), 'MMMM d, yyyy')}
              </span>
            )}

            {/* Read Time */}
            {article.readTime && (
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                {article.readTime} min read
              </span>
            )}
          </div>
        </header>

        {/* Main Image */}
        {article.mainImage && (
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-10 bg-gray-100">
            <Image
              src={urlFor(article.mainImage).width(1200).height(675).url()}
              alt={article.mainImage.alt || article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        {article.body && <ArticleBody body={article.body} />}

        {/* Share */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
          <div className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-gray-100 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              <Twitter className="w-5 h-5 text-gray-600" />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-gray-100 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              <Linkedin className="w-5 h-5 text-gray-600" />
            </a>
            <CopyLinkButton url={shareUrl} />
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <ArticleCard key={related._id} article={related} variant="compact" />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}
