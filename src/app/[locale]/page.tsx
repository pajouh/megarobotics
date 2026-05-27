import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import HeroIndustrial from '@/components/industrial/HeroIndustrial'
import SectionHeader from '@/components/industrial/SectionHeader'
import ProcessSteps from '@/components/industrial/ProcessSteps'
import ProjectCard from '@/components/industrial/ProjectCard'
import SafeNotice from '@/components/industrial/SafeNotice'
import CTASection from '@/components/industrial/CTASection'
import StructuredData from '@/components/StructuredData'
import { generateOrganizationSchema, generateWebSiteSchema, generateAlternates } from '@/lib/structured-data'
import { heroImage } from '@/lib/industrial-images'
import type { WhatWeDoCard, HomeProjectItem } from '@/data/industrial-types'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'industrial.home.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: generateAlternates(''),
  }
}

export const revalidate = 60

export default async function HomePage({ params }: Props) {
  await params
  const t = await getTranslations('industrial.home')
  const tNotice = await getTranslations('industrial.safeNotice')

  const whatWeDoCards = t.raw('whatWeDo.cards') as WhatWeDoCard[]
  const techItems = t.raw('techCoverage.items') as string[]
  const industryItems = t.raw('industriesSection.items') as string[]
  const processSteps = t.raw('process.steps') as string[]
  const networkCategories = t.raw('network.categories') as string[]
  const projectItems = t.raw('projects.items') as HomeProjectItem[]

  const structuredData = [generateOrganizationSchema(), generateWebSiteSchema()]

  return (
    <div className="min-h-screen">
      <StructuredData data={structuredData} />

      {/* SECTION 1 — Hero */}
      <HeroIndustrial
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        primaryCta={{ label: t('hero.primaryCta'), href: '/contact' }}
        secondaryCta={{ label: t('hero.secondaryCta'), href: '/solutions' }}
        image={{ ...heroImage, priority: true }}
      />

      {/* SECTION 2 — What MegaRobotics Does */}
      <section className="py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t('whatWeDo.eyebrow')}
            title={t('whatWeDo.title')}
            subtitle={t('whatWeDo.body')}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatWeDoCards.map((card) => (
              <article key={card.title} className="ind-card flex flex-col h-full">
                <h3 className="ind-h3 text-gray-900 mb-3">{card.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — Robotics Technologies We Cover */}
      <section className="py-16 md:py-24 ind-section-graphite relative overflow-hidden">
        <div className="absolute inset-0 ind-grid-bg pointer-events-none" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tone="dark"
            eyebrow={t('techCoverage.eyebrow')}
            title={t('techCoverage.title')}
            subtitle={t('techCoverage.subtitle')}
          />
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {techItems.map((item, idx) => (
              <li key={item} className="ind-card-dark flex items-start gap-3">
                <span className="font-mono text-xs text-blue-400 mt-1">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-gray-200 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 4 — Industries We Support */}
      <section className="py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t('industriesSection.eyebrow')}
            title={t('industriesSection.title')}
          />
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {industryItems.map((item) => (
              <li
                key={item}
                className="ind-card flex items-start gap-3 p-4"
              >
                <span className="text-blue-600 mt-0.5" aria-hidden="true">›</span>
                <span className="text-sm text-gray-800">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 5 — How We Work */}
      <section className="py-16 md:py-24 ind-section-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t('process.eyebrow')}
            title={t('process.title')}
          />
          <ProcessSteps steps={processSteps} />
        </div>
      </section>

      {/* SECTION 6 — Technology Network */}
      <section className="py-16 md:py-24 ind-section-dark relative overflow-hidden">
        <div className="absolute inset-0 ind-grid-bg pointer-events-none" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <SectionHeader
                tone="dark"
                eyebrow={t('network.eyebrow')}
                title={t('network.title')}
                subtitle={t('network.body')}
              />
              <div className="mt-6">
                <SafeNotice label={tNotice('label')} accent="blue" tone="dark">
                  {t('network.legalNote')}
                </SafeNotice>
              </div>
            </div>
            <div className="lg:col-span-5">
              <ul className="space-y-2">
                {networkCategories.map((cat) => (
                  <li
                    key={cat}
                    className="px-4 py-3 bg-[color:var(--ind-graphite-800)] border border-[color:var(--ind-graphite-700)] rounded text-sm text-gray-200"
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — Project / Concept Studies */}
      <section className="py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t('projects.eyebrow')}
            title={t('projects.title')}
            subtitle={t('projects.subtitle')}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectItems.map((item) => (
              <ProjectCard
                key={item.title}
                label="Concept / Feasibility Study"
                title={item.title}
                subtitle={item.subtitle}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — Final CTA */}
      <CTASection
        eyebrow={t('finalCta.eyebrow')}
        title={t('finalCta.title')}
        body={t('finalCta.body')}
        ctaLabel={t('finalCta.button')}
        ctaHref="/contact"
        tone="dark"
      />
    </div>
  )
}
