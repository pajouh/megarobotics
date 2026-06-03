import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HeroIndustrial from '@/components/industrial/HeroIndustrial'
import SafeNotice from '@/components/industrial/SafeNotice'
import CTASection from '@/components/industrial/CTASection'
import { pageSeo } from '@/lib/page-seo'
import type { ForManufacturersService } from '@/data/industrial-types'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'industrial.forManufacturers.meta' })
  return pageSeo({ title: t('title'), description: t('description'), path: '/for-manufacturers' })
}

export const revalidate = 3600

export default async function ForManufacturersPage({ params }: Props) {
  await params
  const t = await getTranslations('industrial.forManufacturers')
  const tNotice = await getTranslations('industrial.safeNotice')
  const tCta = await getTranslations('industrial.home.finalCta')
  const services = t.raw('services') as ForManufacturersService[]

  return (
    <div className="min-h-screen">
      <HeroIndustrial eyebrow={t('eyebrow')} title={t('title')} subtitle={t('intro')} />

      <section className="py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service) => (
              <article
                key={service.title}
                className="ind-card flex flex-col h-full"
              >
                <h3 className="ind-h3 text-gray-900 mb-3">{service.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
              </article>
            ))}
          </div>

          <div className="max-w-3xl">
            <SafeNotice label={tNotice('label')} accent="orange">
              {t('careful')}
            </SafeNotice>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow={tCta('eyebrow')}
        title={t('ctaLabel')}
        ctaLabel={t('ctaLabel')}
        ctaHref="/contact"
        tone="dark"
      />
    </div>
  )
}
