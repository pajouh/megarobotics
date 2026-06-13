import { Link } from '@/i18n/navigation'
import Image from 'next/image'
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
        <article className="flex gap-4 p-3 bg-[color:var(--mr-white)] border border-[color:var(--mr-line)] group-hover:border-[color:var(--mr-line-strong)] transition-colors">
          {/* Image */}
          {mainImage && (
            <div className="relative w-20 h-20 overflow-hidden flex-shrink-0">
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
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[color:var(--mr-accent-ink)] mb-1">
                {category.title}
              </span>
            )}
            <h3 className="text-sm font-medium text-[color:var(--mr-ink)] group-hover:text-[color:var(--mr-accent-ink)] transition-colors line-clamp-2">
              {title}
            </h3>
            {readTime && (
              <span className="font-mono text-[0.65rem] text-[color:var(--mr-steel)] mt-1">
                {readTime} min
              </span>
            )}
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/articles/${slug.current}`} className="group block h-full">
      <article className="h-full flex flex-col bg-[color:var(--mr-white)] overflow-hidden border border-[color:var(--mr-line)] group-hover:border-[color:var(--mr-line-strong)] transition-colors">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden border-b border-[color:var(--mr-line)]">
          {mainImage ? (
            <Image
              src={urlFor(mainImage).width(600).height(375).url()}
              alt={mainImage.alt || title}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-[color:var(--mr-paper-2)] flex items-center justify-center">
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-[color:var(--mr-steel)]">
                No image
              </span>
            </div>
          )}

          {/* Category Badge */}
          {category && (
            <div className="absolute top-0 left-0">
              <span className="inline-flex items-center px-2.5 py-1 font-mono text-[0.65rem] font-medium uppercase tracking-[0.12em] bg-[color:var(--mr-ink)] text-[color:var(--mr-paper)]">
                {category.title}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-grow flex flex-col p-5">
          <h3 className="ind-h3 text-[color:var(--mr-ink)] group-hover:text-[color:var(--mr-accent-ink)] transition-colors line-clamp-2 mb-2">
            {title}
          </h3>

          {excerpt && (
            <p className="text-sm text-[color:var(--mr-ink-2)] line-clamp-2 mb-4 flex-grow">{excerpt}</p>
          )}

          {/* Meta — mono data line */}
          <div className="flex items-center gap-4 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-[color:var(--mr-steel)] pt-3 border-t border-[color:var(--mr-line)]">
            {publishedAt && <span>{format(new Date(publishedAt), 'yyyy-MM-dd')}</span>}
            {readTime && <span>{readTime} min read</span>}
          </div>
        </div>
      </article>
    </Link>
  )
}
