import Link from 'next/link'
import Image from 'next/image'
import { Clock, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { Article } from '@/types'
import { urlFor } from '@/lib/sanity'

interface ArticleCardProps {
  article: Article
  variant?: 'default' | 'compact'
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const { title, slug, excerpt, mainImage, category, publishedAt, readTime } = article

  if (variant === 'compact') {
    return (
      <Link href={`/articles/${slug.current}`} className="group block">
        <article className="flex gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 transition-all">
          {/* Image */}
          {mainImage && (
            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={urlFor(mainImage).width(160).height(160).url()}
                alt={mainImage.alt || title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          {/* Content */}
          <div className="flex flex-col justify-center min-w-0">
            {category && (
              <span className="text-xs text-emerald-400 font-medium mb-1">
                {category.icon} {category.title}
              </span>
            )}
            <h3 className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
              {title}
            </h3>
            {readTime && (
              <span className="text-xs text-slate-500 mt-1">{readTime} min read</span>
            )}
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/articles/${slug.current}`} className="group block">
      <article className="h-full flex flex-col bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-emerald-500/30 card-hover">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {mainImage ? (
            <Image
              src={urlFor(mainImage).width(600).height(375).url()}
              alt={mainImage.alt || title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
              <span className="text-4xl opacity-30">🤖</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          {/* Category Badge */}
          {category && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-black/50 backdrop-blur-sm text-white border border-white/20">
                {category.icon} {category.title}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-grow flex flex-col p-5">
          <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 mb-2">
            {title}
          </h3>

          {excerpt && (
            <p className="text-sm text-slate-400 line-clamp-2 mb-4 flex-grow">
              {excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-slate-500">
            {publishedAt && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {format(new Date(publishedAt), 'MMM d, yyyy')}
              </span>
            )}
            {readTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {readTime} min read
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
