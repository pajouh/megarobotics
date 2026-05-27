import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HeroIndustrial from '@/components/industrial/HeroIndustrial'
import CTASection from '@/components/industrial/CTASection'
import { generateAlternates } from '@/lib/structured-data'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'industrial.company.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: generateAlternates('/about'),
  }
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <div className="ind-eyebrow mb-3">
                <span className="inline-block w-8 h-px bg-blue-600" aria-hidden="true" />
                {t('positioningTitle')}
              </div>
              <p className="text-base text-gray-700 leading-relaxed">{t('positioning')}</p>
            </div>
            <div>
              <div className="ind-eyebrow mb-3">
                <span className="inline-block w-8 h-px bg-blue-600" aria-hidden="true" />
                {t('approachTitle')}
              </div>
              <p className="text-base text-gray-700 leading-relaxed">{t('approach')}</p>
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
