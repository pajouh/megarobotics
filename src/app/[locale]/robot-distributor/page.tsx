import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HeroIndustrial from '@/components/industrial/HeroIndustrial'
import SectionHeader from '@/components/industrial/SectionHeader'
import CTASection from '@/components/industrial/CTASection'
import SafeNotice from '@/components/industrial/SafeNotice'
import { pageSeo } from '@/lib/page-seo'

type Props = { params: Promise<{ locale: string }> }

interface Item {
  title: string
  body: string
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'industrial.catalog.robotDistributor.meta' })
  return pageSeo({ title: t('title'), description: t('description'), path: '/robot-distributor', locale })
}

export const revalidate = 3600

export default async function RobotDistributorPage({ params }: Props) {
  await params
  const t = await getTranslations('industrial.catalog.robotDistributor')
  const tNotice = await getTranslations('industrial.safeNotice')
  const whatWeDistribute = t.raw('whatWeDistribute') as Item[]
  const audiences = t.raw('audiences') as Item[]

  return (
    <div className="min-h-screen">
      <HeroIndustrial eyebrow={t('eyebrow')} title={t('title')} subtitle={t('intro')} />

      <section className="py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader title={t('whatWeDistributeTitle')} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {whatWeDistribute.map((item) => (
              <article key={item.title} className="ind-card flex flex-col h-full">
                <h3 className="ind-h3 text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>

          <SectionHeader title={t('audiencesTitle')} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {audiences.map((a) => (
              <article key={a.title} className="ind-card flex flex-col h-full">
                <h3 className="ind-h3 text-gray-900 mb-3">{a.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{a.body}</p>
              </article>
            ))}
          </div>

          <div className="max-w-3xl space-y-3">
            <SafeNotice label={tNotice('label')} accent="blue">
              {t('safeWording')}
            </SafeNotice>
            <SafeNotice label={tNotice('label')} accent="orange">
              {t('legalNote')}
            </SafeNotice>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow={t('eyebrow')}
        title={t('ctaTitle')}
        body={t('ctaBody')}
        ctaLabel={t('ctaButton')}
        ctaHref="/contact"
        tone="dark"
      />
    </div>
  )
}
