import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { Manufacturer } from '@/types'
import { urlFor } from '@/lib/sanity'

interface ManufacturerCardProps {
  manufacturer: Manufacturer
}

export default function ManufacturerCard({ manufacturer }: ManufacturerCardProps) {
  const { name, slug, logo, headquarters, specialties, productCount } = manufacturer

  return (
    <Link href={`/manufacturers/${slug.current}`} className="group block">
      <article className="h-full flex flex-col bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all p-6">
        {/* Logo */}
        <div className="relative h-16 mb-4 flex items-center justify-center">
          {logo ? (
            <Image
              src={urlFor(logo).width(200).height(100).url()}
              alt={name}
              width={120}
              height={60}
              className="object-contain max-h-14 group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Name */}
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors text-center mb-1">
          {name}
        </h3>

        {/* Location */}
        {headquarters && (
          <p className="text-sm text-gray-500 text-center mb-3">
            {headquarters}
          </p>
        )}

        {/* Specialties */}
        {specialties && specialties.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5 mb-4">
            {specialties.slice(0, 3).map((specialty) => (
              <span
                key={specialty}
                className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"
              >
                {specialty}
              </span>
            ))}
          </div>
        )}

        {/* Product Count */}
        {productCount !== undefined && productCount > 0 && (
          <div className="mt-auto pt-3 border-t border-gray-100 text-center">
            <span className="text-sm text-gray-500">
              {productCount} {productCount === 1 ? 'Product' : 'Products'}
            </span>
          </div>
        )}
      </article>
    </Link>
  )
}
