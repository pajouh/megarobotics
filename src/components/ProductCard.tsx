import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import { Product } from '@/types'
import { urlFor } from '@/lib/sanity'
import { authorizedPartners } from '@/data/authorized-partners'

interface ProductCardProps {
  product: Product
}

const AUTHORIZED = new Set(authorizedPartners.map((p) => p.slug))

export default function ProductCard({ product }: ProductCardProps) {
  const { name, slug, tagline, mainImage, manufacturer, productFamily, priceRange, isNew } = product
  const t = useTranslations('industrial.partners')
  const authorized = !!manufacturer?.slug?.current && AUTHORIZED.has(manufacturer.slug.current)

  return (
    <Link href={`/products/${slug.current}`} className="group block h-full" data-reveal>
      <article className="mr-glow-card h-full flex flex-col bg-[color:var(--mr-white)] rounded-[var(--mr-radius)] border border-[color:var(--mr-line)] shadow-[var(--mr-shadow)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:shadow-[var(--mr-shadow-lift)] group-hover:border-[color:var(--mr-accent-line)]">
        {/* Image well — soft studio gradient so white renders keep their edges */}
        <div className="relative aspect-square overflow-hidden rounded-t-[var(--mr-radius)] bg-[radial-gradient(120%_90%_at_50%_0%,#ffffff_0%,#f0f6f7_70%,#e7f0f2_100%)]">
          {mainImage ? (
            <Image
              src={urlFor(mainImage).maxWidth(500).maxHeight(500).url()}
              alt={mainImage.alt || name}
              fill
              // Without `sizes`, `fill` defaults to 100vw and Next emits a srcset up
              // to w=3840 for what is a grid thumbnail off a 500px source.
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain p-6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-[color:var(--mr-steel)]">
                No image
              </span>
            </div>
          )}

          <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
            {isNew ? (
              <span className="rounded-full px-2.5 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.12em] bg-[color:var(--mr-accent-ink)] text-white shadow-sm">
                New
              </span>
            ) : (
              <span />
            )}
            {manufacturer?.logo && (
              <div className="w-10 h-10 rounded-lg bg-white/90 backdrop-blur border border-[color:var(--mr-line)] p-1.5 shadow-sm">
                <Image
                  src={urlFor(manufacturer.logo).maxWidth(64).maxHeight(64).url()}
                  alt={manufacturer.name}
                  width={28}
                  height={28}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>

          {authorized && (
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur border border-[color:var(--mr-accent-line)] px-2 py-0.5 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--mr-accent-ink)]">
              <ShieldCheck className="w-3 h-3" aria-hidden="true" />
              {t('badge')}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-grow flex flex-col p-5">
          {productFamily && (
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[color:var(--mr-steel)] mb-1.5">
              {productFamily.title}
            </span>
          )}

          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="ind-h3 text-[color:var(--mr-ink)] group-hover:text-[color:var(--mr-accent-ink)] transition-colors line-clamp-2">
              {name}
            </h3>
            <ArrowUpRight
              className="w-4 h-4 mt-1 shrink-0 text-[color:var(--mr-steel)] opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[color:var(--mr-accent)]"
              aria-hidden="true"
            />
          </div>

          {manufacturer && <p className="text-sm text-[color:var(--mr-steel)] mb-2">{manufacturer.name}</p>}

          {tagline && <p className="text-sm text-[color:var(--mr-ink-2)] line-clamp-2 mb-3 flex-grow">{tagline}</p>}

          {priceRange && (
            <div className="mt-auto pt-3 border-t border-[color:var(--mr-line)]">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[color:var(--mr-accent-ink)]">
                {priceRange}
              </span>
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
