import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { ArrowRight, ArrowUpRight, ShieldCheck } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { authorizedPartners } from '@/data/authorized-partners'
import { getActiveProductCounts, type Locale } from '@/lib/sanity'

interface PartnerShowcaseProps {
  locale: Locale
}

/**
 * "Authorized reseller" section: one card per partner brand with its logo,
 * focus and live product count, plus a closing card that invites enquiries.
 */
export default async function PartnerShowcase({ locale }: PartnerShowcaseProps) {
  const t = await getTranslations('industrial.partners')
  const counts = await getActiveProductCounts(authorizedPartners.map((p) => p.slug)).catch(
    () => ({}) as Record<string, number>,
  )
  const lang = locale === 'de' ? 'de' : 'en'

  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-[color:var(--mr-white)]">
      <div className="absolute inset-0 mr-dots opacity-60 pointer-events-none [mask-image:linear-gradient(180deg,#000,transparent_70%)]" aria-hidden="true" />
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(47,224,208,0.18),transparent)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 md:mb-16">
          <div className="lg:col-span-7" data-reveal>
            <p className="mr-chip mb-5">
              <span className="mr-pulse-dot" aria-hidden="true" />
              {t('eyebrow')}
            </p>
            <h2 className="ind-h2 text-[color:var(--mr-ink)]">
              {t('titleLead')} <span className="mr-ink-gradient">{t('titleHighlight')}</span>
            </h2>
          </div>
          <div className="lg:col-span-5" data-reveal style={{ ['--d' as string]: '120ms' }}>
            <p className="text-base md:text-lg text-[color:var(--mr-ink-2)] leading-relaxed">{t('subtitle')}</p>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {authorizedPartners.map((p, i) => {
            const n = counts[p.slug] ?? 0
            const ratio = p.logoWidth / p.logoHeight
            const logoH = ratio < 2 ? 56 : ratio < 3.5 ? 40 : 30
            return (
              <li key={p.slug} data-reveal style={{ ['--d' as string]: `${i * 70}ms` }}>
                <Link
                  href={`/manufacturers/${p.slug}`}
                  className="group mr-glow-card ind-card !p-0 h-full flex flex-col"
                >
                  <div className="relative h-36 flex items-center justify-center px-8 border-b border-[color:var(--mr-line)] bg-[linear-gradient(180deg,#fbfdfd,#f3f8f9)] rounded-t-[var(--mr-radius)] overflow-hidden">
                    <div className="absolute inset-0 mr-dots opacity-40 [mask-image:radial-gradient(closest-side,#000,transparent)]" aria-hidden="true" />
                    <Image
                      src={p.logo}
                      alt={p.name}
                      width={Math.round(ratio * logoH)}
                      height={logoH}
                      unoptimized
                      className="mr-logo relative max-w-full group-hover:scale-[1.04]"
                      style={{ height: logoH, width: 'auto' }}
                    />
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 border border-[color:var(--mr-accent-line)] px-2 py-0.5 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--mr-accent-ink)]">
                      <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                      {t('badge')}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="ind-h3 text-[color:var(--mr-ink)]">{p.name}</h3>
                      <ArrowUpRight
                        className="w-4 h-4 mt-1 shrink-0 text-[color:var(--mr-steel)] transition-all duration-300 group-hover:text-[color:var(--mr-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[color:var(--mr-steel)] mt-1">
                      {p.country[lang]}
                    </p>
                    <p className="text-sm text-[color:var(--mr-ink-2)] leading-relaxed mt-3 flex-1">{p.focus[lang]}</p>
                    <p className="mt-4 pt-3 border-t border-[color:var(--mr-line)] text-xs font-medium text-[color:var(--mr-accent-ink)]">
                      {n > 0 ? t('products', { count: n }) : t('onRequest')}
                    </p>
                  </div>
                </Link>
              </li>
            )
          })}

          <li data-reveal style={{ ['--d' as string]: `${authorizedPartners.length * 70}ms` }}>
            <Link
              href="/contact"
              className="group relative h-full min-h-64 flex flex-col justify-between overflow-hidden rounded-[var(--mr-radius)] p-6 text-white bg-[linear-gradient(150deg,#0a565c_0%,#04756f_50%,#06938c_100%)] shadow-[var(--mr-shadow-lift)] transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(circle_at_80%_10%,#000,transparent_70%)]" aria-hidden="true" />
              <div className="relative">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-white/80">{t('ctaEyebrow')}</p>
                <p className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold leading-snug tracking-tight">
                  {t('ctaTitle')}
                </p>
              </div>
              <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                {t('ctaButton')}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}
