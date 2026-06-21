import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HeroIndustrial from '@/components/industrial/HeroIndustrial'
import SolutionCard from '@/components/industrial/SolutionCard'
import CTASection from '@/components/industrial/CTASection'
import { pageSeo } from '@/lib/page-seo'
import { solutionImages } from '@/lib/industrial-images'
import { getSolutions, type Locale } from '@/lib/sanity'
import type { SolutionItem } from '@/data/industrial-types'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'industrial.solutions.meta' })
  return pageSeo({ title: t('title'), description: t('description'), path: '/solutions', locale })
}

export const revalidate = 60

export default async function SolutionsPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations('industrial.solutions')
  const tCta = await getTranslations('industrial.home.finalCta')

  // Prefer Sanity content (editable in Studio). Fall back to messages
  // JSON if no docs exist yet — keeps the page rendering during the
  // transition.
  const sanity = await getSolutions(locale as Locale)
  const sanityImages = new Map(sanity.map((s) => [s.id, s.imageUrl]))
  const sanityIcons = new Map(sanity.map((s) => [s.id, s.icon]))
  const items: SolutionItem[] = sanity.length
    ? sanity.map((s) => ({
        id: s.id,
        title: s.title,
        description: s.shortDescription ?? '',
        applications: s.applications,
        robotTypes: s.robotTypes,
      }))
    : (t.raw('items') as SolutionItem[])

  // Prefer the image uploaded in Studio; fall back to the bundled static
  // image keyed by slug so cards never render imageless during the transition.
  const imageFor = (item: SolutionItem) => {
    const sanityUrl = sanityImages.get(item.id)
    if (sanityUrl) return { src: sanityUrl, alt: item.title }
    return solutionImages[item.id]
  }

  return (
    <div className="min-h-screen">
      <HeroIndustrial eyebrow={t('eyebrow')} title={t('title')} subtitle={t('intro')} />

      <section className="py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, idx) => (
              <SolutionCard
                index={idx + 1}
                key={item.id}
                title={item.title}
                description={item.description}
                applications={item.applications}
                robotTypes={item.robotTypes}
                applicationsLabel={t('labelApplications')}
                robotTypesLabel={t('labelRobotTypes')}
                ctaHref={`/solutions/${item.id}`}
                ctaLabel={t('viewLabel')}
                image={imageFor(item)}
                icon={sanityIcons.get(item.id)}
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
