import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HeroIndustrial from '@/components/industrial/HeroIndustrial'
import CTASection from '@/components/industrial/CTASection'
import { pageSeo } from '@/lib/page-seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'industrial.company.meta' })
  return pageSeo({ title: t('title'), description: t('description'), path: '/about', locale })
}

export const revalidate = 3600

export default async function CompanyPage({ params }: Props) {
  await params
  const t = await getTranslations('industrial.company')
  const tCta = await getTranslations('industrial.home.finalCta')

  return (
    <div className="min-h-screen">
      <HeroIndustrial eyebrow={t('eyebrow')} title={t('title')} subtitle={t('body')} />

      <section className="py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[color:var(--mr-line)] border border-[color:var(--mr-line)]">
            <div className="bg-[color:var(--mr-paper)] p-8 md:p-10">
              <span className="mr-index block mb-4">01</span>
              <div className="ind-eyebrow mb-3">
                <span className="inline-block w-8 h-px bg-[color:var(--mr-accent-ink)]" aria-hidden="true" />
                {t('positioningTitle')}
              </div>
              <p className="text-base text-[color:var(--mr-ink-2)] leading-relaxed">{t('positioning')}</p>
            </div>
            <div className="bg-[color:var(--mr-paper)] p-8 md:p-10">
              <span className="mr-index block mb-4">02</span>
              <div className="ind-eyebrow mb-3">
                <span className="inline-block w-8 h-px bg-[color:var(--mr-accent-ink)]" aria-hidden="true" />
                {t('approachTitle')}
              </div>
              <p className="text-base text-[color:var(--mr-ink-2)] leading-relaxed">{t('approach')}</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow={tCta('eyebrow')}
        title={tCta('title')}
        body={tCta('body')}
        ctaLabel={tCta('button')}
        ctaHref="/contact"
        tone="dark"
      />
    </div>
  )
}
