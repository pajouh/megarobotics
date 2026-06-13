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
  index?: number
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
  index,
}: SolutionCardProps) {
  return (
    <article className="ind-card flex flex-col h-full !p-0 overflow-hidden">
      {image && (
        <div className="relative w-full aspect-[16/10] bg-[color:var(--mr-paper-2)] border-b border-[color:var(--mr-line)]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
          {typeof index === 'number' && (
            <span className="absolute top-0 left-0 px-2.5 py-1 font-mono text-[0.7rem] font-semibold bg-[color:var(--mr-ink)] text-[color:var(--mr-paper)]">
              {String(index).padStart(2, '0')}
            </span>
          )}
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        {!image && typeof index === 'number' && (
          <span className="mr-index mb-3">{String(index).padStart(2, '0')}</span>
        )}
        <h3 className="ind-h3 text-[color:var(--mr-ink)] mb-3">{title}</h3>
        <p className="text-sm text-[color:var(--mr-ink-2)] leading-relaxed mb-5">{description}</p>

        {applications && applications.length > 0 && (
          <div className="mb-4 pt-3 border-t border-[color:var(--mr-line)]">
            {applicationsLabel && (
              <div className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[color:var(--mr-steel)] mb-2">
                {applicationsLabel}
              </div>
            )}
            <ul className="text-xs text-[color:var(--mr-ink-2)] leading-relaxed">
              {applications.map((a, i) => (
                <li key={a} className="inline">
                  {i > 0 && <span className="text-[color:var(--mr-steel)]" aria-hidden="true">{' · '}</span>}
                  {a}
                </li>
              ))}
            </ul>
          </div>
        )}

        {robotTypes && robotTypes.length > 0 && (
          <div className="mb-5 pt-3 border-t border-[color:var(--mr-line)]">
            {robotTypesLabel && (
              <div className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[color:var(--mr-steel)] mb-2">
                {robotTypesLabel}
              </div>
            )}
            <ul className="text-xs text-[color:var(--mr-accent-ink)] leading-relaxed">
              {robotTypes.map((r, i) => (
                <li key={r} className="inline">
                  {i > 0 && <span className="text-[color:var(--mr-steel)]" aria-hidden="true">{' · '}</span>}
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
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.1em] font-medium text-[color:var(--mr-accent-ink)] hover:text-[color:var(--mr-ink)] transition-colors"
            >
              {ctaLabel}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </article>
  )
}
