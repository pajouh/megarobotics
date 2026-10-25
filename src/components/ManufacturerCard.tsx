import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import { Manufacturer } from '@/types'
import { urlFor } from '@/lib/sanity'
import { authorizedPartners } from '@/data/authorized-partners'

interface ManufacturerCardProps {
  manufacturer: Manufacturer
}

export default function ManufacturerCard({ manufacturer }: ManufacturerCardProps) {
  const { name, slug, logo, headquarters, specialties, productCount } = manufacturer
  const t = useTranslations('industrial.partners')
  // Authorized partners use the trimmed official logo files from /public/partners.
  const partner = authorizedPartners.find((p) => p.slug === slug.current)

  return (
    <Link href={`/manufacturers/${slug.current}`} className="group block h-full" data-reveal>
      <article
        className={`mr-glow-card h-full flex flex-col bg-white rounded-[var(--mr-radius)] border shadow-[var(--mr-shadow)] p-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:shadow-[var(--mr-shadow-lift)] ${
          partner ? 'border-[color:var(--mr-accent-line)]' : 'border-[color:var(--mr-line)]'
        }`}
      >
        <div className="flex items-start justify-between gap-3 mb-5">
          {partner ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--mr-accent-soft)] border border-[color:var(--mr-accent-line)] px-2 py-0.5 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--mr-accent-ink)]">
              <ShieldCheck className="w-3 h-3" aria-hidden="true" />
              {t('badge')}
            </span>
          ) : (
            <span />
          )}
          <ArrowUpRight
            className="w-4 h-4 text-[color:var(--mr-steel)] transition-all duration-300 group-hover:text-[color:var(--mr-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </div>

        <div className="relative h-16 mb-5 flex items-center justify-center">
          {partner ? (
            <Image
              src={partner.logo}
              alt={name}
              width={partner.logoWidth}
              height={partner.logoHeight}
              unoptimized
              className="mr-logo max-h-12 w-auto max-w-[80%] group-hover:scale-105"
            />
          ) : logo ? (
            <Image
              src={urlFor(logo).maxWidth(200).maxHeight(100).url()}
              alt={name}
              width={120}
              height={60}
              className="object-contain max-h-14 group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-[linear-gradient(140deg,var(--mr-accent),var(--mr-accent-ink))] flex items-center justify-center shadow-[var(--mr-shadow)]">
              <span className="text-2xl font-semibold text-white font-[family-name:var(--font-display)]">{name.charAt(0)}</span>
            </div>
          )}
        </div>

        <h3 className="ind-h3 text-[color:var(--mr-ink)] group-hover:text-[color:var(--mr-accent-ink)] transition-colors text-center mb-1">
          {name}
        </h3>

        {headquarters && <p className="text-sm text-[color:var(--mr-steel)] text-center mb-3">{headquarters}</p>}

        {specialties && specialties.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5 mb-4">
            {specialties.slice(0, 3).map((specialty) => (
              <span
                key={specialty}
                className="px-2.5 py-1 rounded-full bg-[color:var(--mr-paper-2)] text-[color:var(--mr-ink-2)] text-xs font-medium"
              >
                {specialty}
              </span>
            ))}
          </div>
        )}

        {productCount !== undefined && productCount > 0 && (
          <div className="mt-auto pt-3 border-t border-[color:var(--mr-line)] text-center">
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-[color:var(--mr-accent-ink)]">
              {productCount} {productCount === 1 ? 'Product' : 'Products'}
            </span>
          </div>
        )}
      </article>
    </Link>
  )
}
