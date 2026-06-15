import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HeroIndustrial from '@/components/industrial/HeroIndustrial'
import TechnologyCard from '@/components/industrial/TechnologyCard'
import CTASection from '@/components/industrial/CTASection'
import { pageSeo } from '@/lib/page-seo'
import { robotTechnologyImages } from '@/lib/industrial-images'
import { getRobotTechnologies, type Locale } from '@/lib/sanity'
import type { RobotTechnologyItem } from '@/data/industrial-types'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'industrial.robotTechnologies.meta' })
  return pageSeo({ title: t('title'), description: t('description'), path: '/robot-technologies', locale })
}

export const revalidate = 60

export default async function RobotTechnologiesPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations('industrial.robotTechnologies')
  const tCta = await getTranslations('industrial.home.finalCta')

  const sanity = await getRobotTechnologies(locale as Locale)
  const items: RobotTechnologyItem[] = sanity.length
    ? sanity.map((s) => ({
        id: s.id,
        title: s.title,
        description: s.shortDescription ?? '',
        applications: s.applications,
        criteria: s.selectionCriteria,
      }))
    : (t.raw('items') as RobotTechnologyItem[])

  // Prefer the CMS image when set; otherwise fall back to the bundled local image.
  const cmsImages: Record<string, { src: string; alt: string }> = {}
  for (const s of sanity) {
    if (s.imageUrl) cmsImages[s.id] = { src: s.imageUrl, alt: s.title }
  }

  return (
    <div className="min-h-screen">
      <HeroIndustrial eyebrow={t('eyebrow')} title={t('title')} subtitle={t('intro')} />

      <section className="py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item, idx) => (
              <TechnologyCard
                index={idx + 1}
                key={item.id}
                title={item.title}
                description={item.description}
                applications={item.applications}
                criteria={item.criteria}
                applicationsLabel={t('labelApplications')}
                criteriaLabel={t('labelCriteria')}
                image={cmsImages[item.id] ?? robotTechnologyImages[item.id]}
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
