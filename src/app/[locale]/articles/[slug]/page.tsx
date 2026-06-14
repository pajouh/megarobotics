import { Metadata } from 'next'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { Clock, Calendar, ArrowLeft, Twitter, Linkedin } from 'lucide-react'
import { getArticle, getRelatedArticles, getAllArticleSlugs, urlFor, type Locale } from '@/lib/sanity'
import ArticleCard from '@/components/ArticleCard'
import CopyLinkButton from '@/components/CopyLinkButton'
import ArticleBody from '@/components/ArticleBody'
import StructuredData from '@/components/StructuredData'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateArticleSchema, generateAlternates } from '@/lib/structured-data'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const article = await getArticle(slug, locale as Locale)

  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  const imageUrl = article.mainImage
    ? urlFor(article.mainImage).width(1200).height(630).url()
    : undefined

  const metaTitle = article.seo?.metaTitle || article.title
  const metaDescription = article.seo?.metaDescription || article.excerpt
  const keywords = article.seo?.keywords?.length
    ? article.seo.keywords
    : [
        article.category?.title,
        'robotics',
        'robots',
        ...article.title.split(' ').slice(0, 5),
      ].filter((k): k is string => Boolean(k))

  return {
    title: metaTitle,
    description: metaDescription,
    keywords,
    authors: article.author ? [{ name: article.author.name }] : undefined,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: article.author ? [article.author.name] : undefined,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: article.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: imageUrl ? [imageUrl] : undefined,
    },
    alternates: generateAlternates(`/articles/${slug}`, locale),
  }
}

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs()
  return slugs
}

export default async function ArticlePage({ params }: Props) {
  const { slug, locale } = await params
  const article = await getArticle(slug, locale as Locale)

  if (!article) {
    notFound()
  }

  const relatedArticles = article.category
    ? await getRelatedArticles(article._id, article.category.slug.current, 3, locale as Locale)
    : []

  const shareUrl = `https://www.megarobotics.de/articles/${slug}`

  // Generate structured data for the article
  const articleSchema = generateArticleSchema({
    title: article.title,
    excerpt: article.excerpt || '',
    slug: slug,
    publishedAt: article.publishedAt || new Date().toISOString(),
    author: {
      name: article.author?.name || 'MegaRobotics',
      image: article.author?.image ? urlFor(article.author.image).url() : undefined,
    },
    mainImage: article.mainImage ? urlFor(article.mainImage).width(1200).height(630).url() : undefined,
    category: article.category?.title,
  })

  // Build breadcrumb items
  const breadcrumbItems = [
    { name: 'Articles', href: '/articles' },
    ...(article.category
      ? [{ name: article.category.title, href: `/category/${article.category.slug.current}` }]
      : []),
    { name: article.title, href: `/articles/${slug}` },
  ]

  return (
    <article className="min-h-screen pt-24 pb-16 bg-[color:var(--mr-paper)]">
      <StructuredData data={articleSchema} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        {/* Back Link */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-[color:var(--mr-steel)] hover:text-[color:var(--mr-ink)] transition-colors mb-8"
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
              className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-[color:var(--mr-accent-ink)] hover:text-[color:var(--mr-ink)] mb-4 transition-colors font-medium"
            >
              {article.category.title}
            </Link>
          )}

          {/* Title */}
          <h1 className="ind-h1 !text-[2.25rem] md:!text-[3.25rem] text-[color:var(--mr-ink)] mb-6">
            {article.title}
          </h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-lg md:text-xl text-[color:var(--mr-ink-2)] mb-6 leading-relaxed">
              {article.excerpt}
            </p>
          )}

          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-[color:var(--mr-line)]">
            {/* Author */}
            {article.author && (
              <div className="flex items-center gap-3">
                {article.author.image && (
                  <div className="relative w-12 h-12 overflow-hidden border border-[color:var(--mr-line)]">
                    <Image
                      src={urlFor(article.author.image).width(96).height(96).url()}
                      alt={article.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <span className="block font-medium text-[color:var(--mr-ink)]">
                    {article.author.name}
                  </span>
                  {article.author.twitter && (
                    <a
                      href={`https://twitter.com/${article.author.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-[color:var(--mr-steel)] hover:text-[color:var(--mr-accent-ink)] transition-colors"
                    >
                      @{article.author.twitter}
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Date */}
            {article.publishedAt && (
              <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.06em] text-[color:var(--mr-steel)]">
                <Calendar className="w-3.5 h-3.5" />
                {format(new Date(article.publishedAt), 'MMMM d, yyyy')}
              </span>
            )}

            {/* Read Time */}
            {article.readTime && (
              <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.06em] text-[color:var(--mr-steel)]">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime} min read
              </span>
            )}
          </div>
        </header>

        {/* Main Image */}
        {article.mainImage && (
          <div className="overflow-hidden mb-10 border border-[color:var(--mr-line)]">
            <Image
              src={urlFor(article.mainImage).width(1200).fit('max').auto('format').url()}
              alt={article.mainImage.alt || article.title}
              width={1200}
              height={800}
              className="w-full h-auto"
              priority
            />
          </div>
        )}

        {/* Content */}
        {article.body && <ArticleBody body={article.body} />}

        {/* Share */}
        <div className="mt-12 pt-8 border-t border-[color:var(--mr-line)]">
          <h3 className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-[color:var(--mr-steel)] mb-4">Share this article</h3>
          <div className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[color:var(--mr-white)] border border-[color:var(--mr-line)] hover:border-[color:var(--mr-line-strong)] transition-colors"
            >
              <Twitter className="w-5 h-5 text-[color:var(--mr-ink-2)]" />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[color:var(--mr-white)] border border-[color:var(--mr-line)] hover:border-[color:var(--mr-line-strong)] transition-colors"
            >
              <Linkedin className="w-5 h-5 text-[color:var(--mr-ink-2)]" />
            </a>
            <CopyLinkButton url={shareUrl} />
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-16">
            <h2 className="ind-h2 text-[color:var(--mr-ink)] mb-6">Related Articles</h2>
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
