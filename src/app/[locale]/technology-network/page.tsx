import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HeroIndustrial from '@/components/industrial/HeroIndustrial'
import SectionHeader from '@/components/industrial/SectionHeader'
import SafeNotice from '@/components/industrial/SafeNotice'
import CTASection from '@/components/industrial/CTASection'
import { pageSeo } from '@/lib/page-seo'
import type { TechnologyNetworkItem } from '@/data/industrial-types'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'industrial.technologyNetwork.meta' })
  return pageSeo({ title: t('title'), description: t('description'), path: '/technology-network' })
}

export const revalidate = 3600

export default async function TechnologyNetworkPage({ params }: Props) {
  await params
  const t = await getTranslations('industrial.technologyNetwork')
  const tNotice = await getTranslations('industrial.safeNotice')
  const tCta = await getTranslations('industrial.home.finalCta')
  const items = t.raw('items') as TechnologyNetworkItem[]

  return (
    <div className="min-h-screen">
      <HeroIndustrial eyebrow={t('eyebrow')} title={t('title')} subtitle={t('intro')} />

      <section className="py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader title={t('sectionsTitle')} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {items.map((item) => (
              <article key={item.id} className="ind-card flex flex-col h-full">
                <h3 className="ind-h3 text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="max-w-3xl">
            <SafeNotice label={tNotice('label')} accent="blue">
              {t('legalNote')}
            </SafeNotice>
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
