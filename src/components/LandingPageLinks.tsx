import { ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { landingPagePath, type LandingPageSlug } from '@/data/landing-pages'

interface LandingPageLinksProps {
  slugs: LandingPageSlug[]
  className?: string
}

/** Links a family or solution page to the buying pages that cover the same products. */
export default async function LandingPageLinks({ slugs, className }: LandingPageLinksProps) {
  if (slugs.length === 0) return null
  const t = await getTranslations('industrial.landingPages')

  return (
    <nav aria-label={t('label')} className={className}>
      <div className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[color:var(--mr-steel)] mb-3">
        {t('label')}
      </div>
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        {slugs.map((slug) => (
          <li key={slug}>
            <Link
              href={landingPagePath(slug)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--mr-accent-ink)] hover:text-[color:var(--mr-ink)] transition-colors"
            >
              {t(`buy.${slug}`)}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
