import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { Product } from '@/types'
import { urlFor } from '@/lib/sanity'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { name, slug, tagline, mainImage, manufacturer, productFamily, priceRange, isNew } = product

  return (
    <Link href={`/products/${slug.current}`} className="group block h-full">
      <article className="h-full flex flex-col bg-[color:var(--mr-white)] overflow-hidden border border-[color:var(--mr-line)] group-hover:border-[color:var(--mr-line-strong)] transition-colors">
        {/* Image well — white renders sit on white, framed by a hairline */}
        <div className="relative aspect-square overflow-hidden bg-white border-b border-[color:var(--mr-line)]">
          {mainImage ? (
            <Image
              src={urlFor(mainImage).width(400).height(400).url()}
              alt={mainImage.alt || name}
              fill
              className="object-contain p-5 group-hover:scale-[1.03] transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-[color:var(--mr-steel)]">
                No image
              </span>
            </div>
          )}

          {/* Badges */}
          {isNew && (
            <span className="absolute top-0 left-0 px-2.5 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] bg-[color:var(--mr-accent)] text-white">
              New
            </span>
          )}

          {/* Manufacturer Logo */}
          {manufacturer?.logo && (
            <div className="absolute top-2.5 right-2.5">
              <div className="w-10 h-10 bg-white border border-[color:var(--mr-line)] p-1.5">
                <Image
                  src={urlFor(manufacturer.logo).width(64).height(64).fit('max').url()}
                  alt={manufacturer.name}
                  width={28}
                  height={28}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-grow flex flex-col p-4">
          {/* Product family — mono technical label */}
          {productFamily && (
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[color:var(--mr-steel)] mb-1.5">
              {productFamily.title}
            </span>
          )}

          {/* Name */}
          <h3 className="ind-h3 text-[color:var(--mr-ink)] group-hover:text-[color:var(--mr-accent-ink)] transition-colors line-clamp-2 mb-1">
            {name}
          </h3>

          {/* Manufacturer */}
          {manufacturer && (
            <p className="text-sm text-[color:var(--mr-steel)] mb-2">{manufacturer.name}</p>
          )}

          {/* Tagline */}
          {tagline && (
            <p className="text-sm text-[color:var(--mr-ink-2)] line-clamp-2 mb-3 flex-grow">{tagline}</p>
          )}

          {/* Price — mono data value, separated by hairline */}
          {priceRange && (
            <div className="mt-auto pt-3 border-t border-[color:var(--mr-line)]">
              <span className="font-mono text-sm font-semibold text-[color:var(--mr-ink)]">
                {priceRange}
              </span>
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
