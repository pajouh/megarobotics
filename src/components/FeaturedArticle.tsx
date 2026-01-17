import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { Clock, ArrowRight } from 'lucide-react'
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
      <article className="relative grid md:grid-cols-2 gap-6 md:gap-10 items-center">
        {/* Image */}
        <div className="relative aspect-[16/10] md:aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
          {mainImage ? (
            <Image
              src={urlFor(mainImage).width(800).height(600).url()}
              alt={mainImage.alt || title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl opacity-30">🤖</span>
            </div>
          )}

          {/* Featured Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-lg">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Featured
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col">
          {/* Category */}
          {category && (
            <span className="inline-flex items-center gap-1.5 text-sm text-emerald-600 font-medium mb-3">
              {category.icon} {category.title}
            </span>
          )}

          {/* Title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-4">
            {title}
          </h2>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-gray-600 text-base md:text-lg mb-6 line-clamp-3">
              {excerpt}
            </p>
          )}

          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            {/* Author */}
            {author && (
              <div className="flex items-center gap-3">
                {author.image && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
                    <Image
                      src={urlFor(author.image).width(80).height(80).url()}
                      alt={author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <span className="block text-sm font-medium text-gray-900">{author.name}</span>
                  {publishedAt && (
                    <span className="text-xs text-gray-500">
                      {format(new Date(publishedAt), 'MMMM d, yyyy')}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Read Time */}
            {readTime && (
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                {readTime} min read
              </span>
            )}
          </div>

          {/* Read More */}
          <div className="mt-6">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">
              Read Full Article
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
