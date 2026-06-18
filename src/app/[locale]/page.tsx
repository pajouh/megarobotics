import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import HeroIndustrial from '@/components/industrial/HeroIndustrial'
import SectionHeader from '@/components/industrial/SectionHeader'
import ProcessSteps from '@/components/industrial/ProcessSteps'
import ProjectCard from '@/components/industrial/ProjectCard'
import SafeNotice from '@/components/industrial/SafeNotice'
import CTASection from '@/components/industrial/CTASection'
import ProductCard from '@/components/ProductCard'
import ArticleCard from '@/components/ArticleCard'
import StructuredData from '@/components/StructuredData'
import { getFeaturedProducts, getArticles, getHomeHero, type Locale } from '@/lib/sanity'
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/structured-data'
import { pageSeo } from '@/lib/page-seo'
import { heroImage } from '@/lib/industrial-images'
import type { WhatWeDoCard, HomeProjectItem } from '@/data/industrial-types'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'industrial.home.meta' })
  return pageSeo({ title: t('title'), description: t('description'), path: '', locale })
}

export const revalidate = 60

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations('industrial.home')
  const tHomeLegacy = await getTranslations('home')
  const tNotice = await getTranslations('industrial.safeNotice')
  const tNav = await getTranslations('industrial.nav')

  const whatWeDoCards = t.raw('whatWeDo.cards') as WhatWeDoCard[]
  const techItems = t.raw('techCoverage.items') as string[]
  const industryItems = t.raw('industriesSection.items') as string[]
  const processSteps = t.raw('process.steps') as string[]
  const networkCategories = t.raw('network.categories') as string[]
  const projectItems = t.raw('projects.items') as HomeProjectItem[]

  // CMS-driven content surfaced from Sanity (Studio edits land here)
  const [featuredProducts, latestArticles, homeHero] = await Promise.all([
    getFeaturedProducts(4, locale as Locale),
    getArticles(3, locale as Locale),
    getHomeHero(locale as Locale),
  ])

  // Hero content: prefer Studio-managed values, fall back to bundled translations/image.
  const heroEyebrow = homeHero?.eyebrow ?? t('hero.eyebrow')
  const heroTitle = homeHero?.title ?? t('hero.title')
  const heroSubtitle = homeHero?.subtitle ?? t('hero.subtitle')
  const heroPrimaryCta = {
    label: homeHero?.primaryCtaLabel ?? t('hero.primaryCta'),
    href: homeHero?.primaryCtaHref || '/contact',
  }
  const heroSecondaryCta = {
    label: homeHero?.secondaryCtaLabel ?? t('hero.secondaryCta'),
    href: homeHero?.secondaryCtaHref || '/solutions',
  }
  const heroBannerImage = homeHero?.imageUrl
    ? { src: homeHero.imageUrl, alt: homeHero.imageAlt ?? heroTitle }
    : heroImage

  const structuredData = [generateOrganizationSchema(), generateWebSiteSchema()]

  return (
    <div className="min-h-screen">
      <StructuredData data={structuredData} />

      {/* SECTION 1 — Hero (Studio-managed via "homeHero", falls back to translations) */}
      <HeroIndustrial
        eyebrow={heroEyebrow}
        title={heroTitle}
        subtitle={heroSubtitle}
        primaryCta={heroPrimaryCta}
        secondaryCta={heroSecondaryCta}
        image={{ ...heroBannerImage, priority: true }}
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
            {whatWeDoCards.map((card, idx) => (
              <article key={card.title} className="ind-card flex flex-col h-full">
                <span className="mr-index mb-4">{String(idx + 1).padStart(2, '0')}</span>
                <h3 className="ind-h3 text-[color:var(--mr-ink)] mb-3">{card.title}</h3>
                <p className="text-sm text-[color:var(--mr-ink-2)] leading-relaxed">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — Robotics Technologies We Cover */}
      <section className="py-16 md:py-24 ind-section-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t('techCoverage.eyebrow')}
            title={t('techCoverage.title')}
            subtitle={t('techCoverage.subtitle')}
          />
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 border-t border-[color:var(--mr-line)]">
            {techItems.map((item, idx) => (
              <li
                key={item}
                className="flex items-baseline gap-4 py-4 border-b border-[color:var(--mr-line)]"
              >
                <span className="mr-index shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                <span className="text-[15px] text-[color:var(--mr-ink)] leading-relaxed">{item}</span>
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
                <span className="font-mono text-xs text-[color:var(--mr-accent-ink)] mt-1" aria-hidden="true">—</span>
                <span className="text-sm text-[color:var(--mr-ink-2)]">{item}</span>
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
      <section className="py-16 md:py-24 ind-section-light border-t border-[color:var(--mr-line)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <SectionHeader
                eyebrow={t('network.eyebrow')}
                title={t('network.title')}
                subtitle={t('network.body')}
              />
              <div className="mt-6">
                <SafeNotice label={tNotice('label')} accent="orange">
                  {t('network.legalNote')}
                </SafeNotice>
              </div>
            </div>
            <div className="lg:col-span-5">
              <ul className="border-t border-[color:var(--mr-line)]">
                {networkCategories.map((cat, idx) => (
                  <li
                    key={cat}
                    className="flex items-baseline gap-4 px-1 py-3.5 border-b border-[color:var(--mr-line)] text-sm text-[color:var(--mr-ink)]"
                  >
                    <span className="mr-index shrink-0">{String(idx + 1).padStart(2, '0')}</span>
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

      {/* SECTION 8 — Featured Products (CMS-driven) */}
      {featuredProducts.length > 0 && (
        <section className="py-16 md:py-24 ind-section-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <SectionHeader
                eyebrow="Catalog"
                title={tHomeLegacy('featuredProductsSubtitle')}
              />
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.1em] font-medium text-[color:var(--mr-accent-ink)] hover:text-[color:var(--mr-ink)] transition-colors whitespace-nowrap"
              >
                {tHomeLegacy('viewAllProducts')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 9 — Latest Insights (CMS-driven) */}
      {latestArticles.length > 0 && (
        <section className="py-16 md:py-24 ind-section-light">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <SectionHeader
                eyebrow={tNav('insights')}
                title={tHomeLegacy('latestNews')}
                subtitle={tHomeLegacy('latestNewsSubtitle')}
              />
              <Link
                href="/articles"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.1em] font-medium text-[color:var(--mr-accent-ink)] hover:text-[color:var(--mr-ink)] transition-colors whitespace-nowrap"
              >
                {tHomeLegacy('viewAllNews')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestArticles.slice(0, 3).map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 10 — Final CTA */}
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
