import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HeroIndustrial from '@/components/industrial/HeroIndustrial'
import ProjectCard from '@/components/industrial/ProjectCard'
import CTASection from '@/components/industrial/CTASection'
import { generateAlternates } from '@/lib/structured-data'
import type { ProjectItem } from '@/data/industrial-types'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'industrial.projects.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: generateAlternates('/projects'),
  }
}

export const revalidate = 3600

export default async function ProjectsPage({ params }: Props) {
  await params
  const t = await getTranslations('industrial.projects')
  const tCta = await getTranslations('industrial.home.finalCta')
  const items = t.raw('items') as ProjectItem[]

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
