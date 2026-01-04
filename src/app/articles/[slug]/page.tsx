import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { format } from 'date-fns'
import { Clock, Calendar, ArrowLeft, Twitter, Linkedin, Link2 } from 'lucide-react'
import { getArticle, getRelatedArticles, getAllArticleSlugs, urlFor } from '@/lib/sanity'
import ArticleCard from '@/components/ArticleCard'

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

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null
      return (
        <figure className="my-8">
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <Image
              src={urlFor(value).width(1200).height(675).url()}
              alt={value.alt || ''}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-slate-500 mt-3">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    code: ({ value }) => (
      <div className="my-6">
        {value.filename && (
          <div className="bg-slate-800 text-slate-400 text-xs px-4 py-2 rounded-t-lg font-mono">
            {value.filename}
          </div>
        )}
        <pre className={`bg-slate-900 p-4 overflow-x-auto ${value.filename ? 'rounded-b-lg' : 'rounded-lg'}`}>
          <code className="text-sm text-slate-300 font-mono">
            {value.code}
          </code>
        </pre>
      </div>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-semibold text-white mt-8 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-white mt-6 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-slate-300 leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-emerald-500 pl-4 my-6 italic text-slate-400">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-slate-800 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 text-slate-300 mb-4 ml-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 text-slate-300 mb-4 ml-4">
        {children}
      </ol>
    ),
  },
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
    <article className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
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
              className="inline-flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 mb-4 transition-colors"
            >
              {article.category.icon} {article.category.title}
            </Link>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-lg md:text-xl text-slate-400 mb-6">
              {article.excerpt}
            </p>
          )}

          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-white/10">
            {/* Author */}
            {article.author && (
              <div className="flex items-center gap-3">
                {article.author.image && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500/30">
                    <Image
                      src={urlFor(article.author.image).width(96).height(96).url()}
                      alt={article.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <span className="block font-medium text-white">
                    {article.author.name}
                  </span>
                  {article.author.twitter && (
                    <a
                      href={`https://twitter.com/${article.author.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-500 hover:text-emerald-400 transition-colors"
                    >
                      @{article.author.twitter}
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Date */}
            {article.publishedAt && (
              <span className="flex items-center gap-1.5 text-sm text-slate-400">
                <Calendar className="w-4 h-4" />
                {format(new Date(article.publishedAt), 'MMMM d, yyyy')}
              </span>
            )}

            {/* Read Time */}
            {article.readTime && (
              <span className="flex items-center gap-1.5 text-sm text-slate-400">
                <Clock className="w-4 h-4" />
                {article.readTime} min read
              </span>
            )}
          </div>
        </header>

        {/* Main Image */}
        {article.mainImage && (
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-10">
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
        <div className="prose-dark max-w-none">
          {article.body && (
            <PortableText value={article.body} components={portableTextComponents} />
          )}
        </div>

        {/* Share */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Share this article</h3>
          <div className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-emerald-500/30 hover:bg-white/10 transition-all"
            >
              <Twitter className="w-5 h-5 text-slate-400" />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-emerald-500/30 hover:bg-white/10 transition-all"
            >
              <Linkedin className="w-5 h-5 text-slate-400" />
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(shareUrl)}
              className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-emerald-500/30 hover:bg-white/10 transition-all"
            >
              <Link2 className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
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
