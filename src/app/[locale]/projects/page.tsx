import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HeroIndustrial from '@/components/industrial/HeroIndustrial'
import ProjectCard from '@/components/industrial/ProjectCard'
import CTASection from '@/components/industrial/CTASection'
import { pageSeo } from '@/lib/page-seo'
import { getProjectStudies, type Locale } from '@/lib/sanity'
import type { ProjectItem } from '@/data/industrial-types'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'industrial.projects.meta' })
  return pageSeo({ title: t('title'), description: t('description'), path: '/projects', locale })
}

export const revalidate = 60

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations('industrial.projects')
  const tCta = await getTranslations('industrial.home.finalCta')

  const sanity = await getProjectStudies(locale as Locale)
  const items: ProjectItem[] = sanity.length
    ? sanity.map((s) => ({
        id: s.id,
        title: s.title,
        subtitle: s.subtitle ?? '',
        body: s.body ?? '',
      }))
    : (t.raw('items') as ProjectItem[])

  return (
    <div className="min-h-screen">
      <HeroIndustrial eyebrow={t('eyebrow')} title={t('title')} subtitle={t('intro')} />

      <section className="py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item) => (
              <ProjectCard
                key={item.id}
                label={t('conceptLabel')}
                title={item.title}
                subtitle={item.subtitle}
                body={item.body}
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
