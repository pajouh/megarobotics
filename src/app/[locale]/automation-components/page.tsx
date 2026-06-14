import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HeroIndustrial from '@/components/industrial/HeroIndustrial'
import CTASection from '@/components/industrial/CTASection'
import SafeNotice from '@/components/industrial/SafeNotice'
import { pageSeo } from '@/lib/page-seo'

type Props = { params: Promise<{ locale: string }> }

interface Section {
  title: string
  body: string
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'industrial.catalog.automationComponents.meta' })
  return pageSeo({ title: t('title'), description: t('description'), path: '/automation-components', locale })
}

export const revalidate = 3600

export default async function AutomationComponentsPage({ params }: Props) {
  await params
  const t = await getTranslations('industrial.catalog.automationComponents')
  const tNotice = await getTranslations('industrial.safeNotice')
  const sections = t.raw('sections') as Section[]

  return (
    <div className="min-h-screen">
      <HeroIndustrial eyebrow={t('eyebrow')} title={t('title')} subtitle={t('intro')} />

      <section className="py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {sections.map((s, idx) => (
              <article key={s.title} className="ind-card flex flex-col h-full">
                <div className="text-xs font-mono text-blue-700 mb-2">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h3 className="ind-h3 text-gray-900 mb-3">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
              </article>
            ))}
          </div>

          <div className="max-w-3xl">
            <SafeNotice label={tNotice('label')} accent="blue">
              {t('safeWording')}
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
