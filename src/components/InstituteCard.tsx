import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { ExternalLink, Star, MapPin } from 'lucide-react'
import { Institute } from '@/types'
import { urlFor } from '@/lib/sanity'

interface InstituteCardProps {
  institute: Institute
  moreLabel?: string
}

const countryFlags: Record<string, string> = {
  Germany: '\u{1F1E9}\u{1F1EA}',
  Austria: '\u{1F1E6}\u{1F1F9}',
  Switzerland: '\u{1F1E8}\u{1F1ED}',
  'United States': '\u{1F1FA}\u{1F1F8}',
  USA: '\u{1F1FA}\u{1F1F8}',
  'United Kingdom': '\u{1F1EC}\u{1F1E7}',
  UK: '\u{1F1EC}\u{1F1E7}',
  Japan: '\u{1F1EF}\u{1F1F5}',
  'South Korea': '\u{1F1F0}\u{1F1F7}',
  China: '\u{1F1E8}\u{1F1F3}',
  France: '\u{1F1EB}\u{1F1F7}',
  Italy: '\u{1F1EE}\u{1F1F9}',
  Canada: '\u{1F1E8}\u{1F1E6}',
  Australia: '\u{1F1E6}\u{1F1FA}',
  Singapore: '\u{1F1F8}\u{1F1EC}',
  Netherlands: '\u{1F1F3}\u{1F1F1}',
  Sweden: '\u{1F1F8}\u{1F1EA}',
  Denmark: '\u{1F1E9}\u{1F1F0}',
  Israel: '\u{1F1EE}\u{1F1F1}',
}

export default function InstituteCard({ institute, moreLabel }: InstituteCardProps) {
  const { name, slug, parentInstitution, country, city, centerType, focusAreas, website, outreachPriority } = institute
  const flag = countryFlags[country] || '\u{1F30D}'
  const maxTags = 3
  const extraCount = focusAreas ? Math.max(0, focusAreas.length - maxTags) : 0

  return (
    <article className="h-full flex flex-col bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all p-6">
      {/* Logo */}
      {institute.logo && (
        <div className="flex items-center justify-center h-12 mb-3">
          <Image
            src={urlFor(institute.logo).width(160).height(80).fit('max').url()}
            alt={name}
            width={100}
            height={48}
            className="object-contain max-h-12"
          />
        </div>
      )}
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <Link href={`/institutes/${slug.current}`} className="group flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>
        {outreachPriority === 1 && (
          <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-xs font-medium whitespace-nowrap">
            <Star className="w-3 h-3" />
            Priority
          </span>
        )}
      </div>

      {/* Parent Institution */}
      <p className="text-sm text-gray-500 mb-3">{parentInstitution}</p>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-3">
        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
        <span>{flag} {city ? `${city}, ` : ''}{country}</span>
      </div>

      {/* Center Type Badge */}
      {centerType && (
        <div className="mb-3">
          <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
            {centerType}
          </span>
        </div>
      )}

      {/* Focus Area Tags */}
      {focusAreas && focusAreas.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {focusAreas.slice(0, maxTags).map((area) => (
            <span
              key={area}
              className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"
            >
              {area}
            </span>
          ))}
          {extraCount > 0 && (
            <span className="px-2.5 py-1 text-gray-400 text-xs font-medium">
              {moreLabel ? moreLabel.replace('{count}', String(extraCount)) : `+${extraCount} more`}
            </span>
          )}
        </div>
      )}

      {/* Website Link */}
      {website && (
        <div className="mt-auto pt-3 border-t border-gray-100">
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
          >
            Visit Website
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </article>
  )
}
