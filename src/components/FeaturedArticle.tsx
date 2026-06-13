import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
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
        <div className="relative aspect-[16/10] md:aspect-[4/3] overflow-hidden bg-[color:var(--mr-paper-2)] border border-[color:var(--mr-line)]">
          {mainImage ? (
            <Image
              src={urlFor(mainImage).width(800).height(600).url()}
              alt={mainImage.alt || title}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-[color:var(--mr-steel)]">
                No image
              </span>
            </div>
          )}

          {/* Featured Badge */}
          <div className="absolute top-0 left-0">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] bg-[color:var(--mr-accent)] text-white">
              <span className="w-1.5 h-1.5 bg-white" aria-hidden="true" />
              Featured
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col">
          {/* Category */}
          {category && (
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-[color:var(--mr-accent-ink)] font-medium mb-3">
              {category.title}
            </span>
          )}

          {/* Title */}
          <h2 className="ind-h2 !text-[2rem] md:!text-[2.6rem] text-[color:var(--mr-ink)] group-hover:text-[color:var(--mr-accent-ink)] transition-colors mb-4">
            {title}
          </h2>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-[color:var(--mr-ink-2)] text-base md:text-lg mb-6 line-clamp-3">
              {excerpt}
            </p>
          )}

          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.08em] text-[color:var(--mr-steel)]">
            {author && <span className="text-[color:var(--mr-ink-2)]">{author.name}</span>}
            {publishedAt && <span>{format(new Date(publishedAt), 'yyyy-MM-dd')}</span>}
            {readTime && <span>{readTime} min read</span>}
          </div>

          {/* Read More */}
          <div className="mt-6">
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] font-medium text-[color:var(--mr-ink)] group-hover:text-[color:var(--mr-accent-ink)] transition-colors">
              Read Full Article
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
