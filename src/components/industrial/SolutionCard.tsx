import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'

interface SolutionCardProps {
  title: string
  description: string
  applications?: string[]
  robotTypes?: string[]
  ctaHref?: string
  ctaLabel?: string
  applicationsLabel?: string
  robotTypesLabel?: string
  image?: { src: string; alt: string }
}

export default function SolutionCard({
  title,
  description,
  applications,
  robotTypes,
  ctaHref,
  ctaLabel,
  applicationsLabel,
  robotTypesLabel,
  image,
}: SolutionCardProps) {
  return (
    <article className="ind-card flex flex-col h-full !p-0 overflow-hidden">
      {image && (
        <div className="relative w-full aspect-[16/10] bg-gray-100">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
      <h3 className="ind-h3 text-gray-900 mb-3">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-5">{description}</p>

      {applications && applications.length > 0 && (
        <div className="mb-4">
          {applicationsLabel && (
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
              {applicationsLabel}
            </div>
          )}
          <ul className="flex flex-wrap gap-1.5">
            {applications.map((a) => (
              <li
                key={a}
                className="inline-flex items-center px-2.5 py-1 rounded text-xs bg-gray-100 text-gray-700 border border-gray-200"
              >
                {a}
              </li>
            ))}
          </ul>
        </div>
      )}

      {robotTypes && robotTypes.length > 0 && (
        <div className="mb-5">
          {robotTypesLabel && (
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
              {robotTypesLabel}
            </div>
          )}
          <ul className="flex flex-wrap gap-1.5">
            {robotTypes.map((r) => (
              <li
                key={r}
                className="inline-flex items-center px-2.5 py-1 rounded text-xs text-blue-700 bg-blue-50 border border-blue-100"
              >
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {ctaHref && ctaLabel && (
        <div className="mt-auto pt-2">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors"
          >
            {ctaLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
      </div>
    </article>
  )
}
