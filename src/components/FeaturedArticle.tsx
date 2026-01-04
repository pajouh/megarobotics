import Link from 'next/link'
import Image from 'next/image'
import { Clock, Calendar, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'
import { Article } from '@/types'
import { urlFor } from '@/lib/sanity'

interface FeaturedArticleProps {
  article: Article
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  const { title, slug, excerpt, mainImage, category, author, publishedAt, readTime } = article

  return (
    <Link href={`/articles/${slug.current}`} className="group block">
      <article className="relative h-full min-h-[400px] md:min-h-[500px] rounded-2xl overflow-hidden border border-white/10 hover:border-emerald-500/30 transition-all">
        {/* Background Image */}
        <div className="absolute inset-0">
          {mainImage ? (
            <Image
              src={urlFor(mainImage).width(1200).height(700).url()}
              alt={mainImage.alt || title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
          {/* Featured Badge */}
          <div className="absolute top-6 left-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 backdrop-blur-sm text-emerald-400 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Featured
            </span>
          </div>

          {/* Category */}
          {category && (
            <span className="inline-flex items-center gap-1 text-sm text-cyan-400 mb-3">
              {category.icon} {category.title}
            </span>
          )}

          {/* Title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-4 max-w-3xl">
            {title}
          </h2>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-slate-300 text-sm md:text-base mb-6 max-w-2xl line-clamp-2 md:line-clamp-3">
              {excerpt}
            </p>
          )}

          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            {/* Author */}
            {author && (
              <div className="flex items-center gap-3">
                {author.image && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-500/30">
                    <Image
                      src={urlFor(author.image).width(80).height(80).url()}
                      alt={author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <span className="block text-sm font-medium text-white">{author.name}</span>
                  {publishedAt && (
                    <span className="text-xs text-slate-400">
                      {format(new Date(publishedAt), 'MMMM d, yyyy')}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Read Time */}
            {readTime && (
              <span className="flex items-center gap-1.5 text-sm text-slate-400">
                <Clock className="w-4 h-4" />
                {readTime} min read
              </span>
            )}

            {/* Read More */}
            <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 group-hover:text-emerald-300 ml-auto">
              Read Article
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
