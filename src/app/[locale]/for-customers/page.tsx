import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HeroIndustrial from '@/components/industrial/HeroIndustrial'
import CTASection from '@/components/industrial/CTASection'
import { pageSeo } from '@/lib/page-seo'
import type { ForCustomersSection } from '@/data/industrial-types'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'industrial.forCustomers.meta' })
  return pageSeo({ title: t('title'), description: t('description'), path: '/for-customers', locale })
}

export const revalidate = 3600

export default async function ForCustomersPage({ params }: Props) {
  await params
  const t = await getTranslations('industrial.forCustomers')
  const tCta = await getTranslations('industrial.home.finalCta')
  const sections = t.raw('sections') as ForCustomersSection[]

  return (
    <div className="min-h-screen">
      <HeroIndustrial eyebrow={t('eyebrow')} title={t('title')} subtitle={t('intro')} />

      <section className="py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ol className="space-y-4">
            {sections.map((section, idx) => (
              <li
                key={section.id}
                className="flex gap-5 p-6 bg-white border border-[color:var(--ind-steel-200)] rounded-lg"
              >
                <span className="ind-step-num">{String(idx + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="ind-h3 text-gray-900 mb-2">{section.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{section.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTASection
        eyebrow={tCta('eyebrow')}
        title={t('ctaLabel')}
        body={tCta('body')}
        ctaLabel={tCta('button')}
        ctaHref="/contact"
        tone="dark"
      />
    </div>
  )
}
