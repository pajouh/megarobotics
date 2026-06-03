import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HeroIndustrial from '@/components/industrial/HeroIndustrial'
import IndustryCard from '@/components/industrial/IndustryCard'
import CTASection from '@/components/industrial/CTASection'
import { pageSeo } from '@/lib/page-seo'
import { getIndustries, type Locale } from '@/lib/sanity'
import type { IndustryItem } from '@/data/industrial-types'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'industrial.industries.meta' })
  return pageSeo({ title: t('title'), description: t('description'), path: '/industries' })
}

export const revalidate = 60

export default async function IndustriesPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations('industrial.industries')
  const tCta = await getTranslations('industrial.home.finalCta')

  const sanity = await getIndustries(locale as Locale)
  const items: IndustryItem[] = sanity.length
    ? sanity.map((s) => ({
        id: s.id,
        title: s.title,
        applications: s.applications,
      }))
    : (t.raw('items') as IndustryItem[])

  return (
    <div className="min-h-screen">
      <HeroIndustrial eyebrow={t('eyebrow')} title={t('title')} subtitle={t('intro')} />

      <section className="py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <IndustryCard
                key={item.id}
                title={item.title}
                applications={item.applications}
                applicationsLabel={t('labelApplications')}
              />
            ))}
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
