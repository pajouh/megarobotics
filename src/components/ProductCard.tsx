import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { Product } from '@/types'
import { urlFor } from '@/lib/sanity'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { name, slug, tagline, mainImage, manufacturer, category, priceRange, isNew } = product

  return (
    <Link href={`/products/${slug.current}`} className="group block">
      <article className="h-full flex flex-col bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          {mainImage ? (
            <Image
              src={urlFor(mainImage).width(400).height(400).url()}
              alt={mainImage.alt || name}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl opacity-30">🤖</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500 text-white">
                New
              </span>
            )}
          </div>

          {/* Manufacturer Logo */}
          {manufacturer?.logo && (
            <div className="absolute top-3 right-3">
              <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-gray-100 p-1.5">
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
          {/* Category */}
          {category && (
            <span className="text-xs text-emerald-600 font-medium mb-1">
              {category.icon} {category.name}
            </span>
          )}

          {/* Name */}
          <h3 className="text-base font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2 mb-1">
            {name}
          </h3>

          {/* Manufacturer */}
          {manufacturer && (
            <p className="text-sm text-gray-500 mb-2">
              {manufacturer.name}
            </p>
          )}

          {/* Tagline */}
          {tagline && (
            <p className="text-sm text-gray-500 line-clamp-2 mb-3 flex-grow">
              {tagline}
            </p>
          )}

          {/* Price */}
          {priceRange && (
            <div className="mt-auto">
              <span className="text-lg font-bold text-gray-900">
                {priceRange}
              </span>
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
