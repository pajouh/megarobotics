import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import {
  ArrowRight,
  Bot,
  Globe2,
  Hand,
  Handshake,
  Network,
  PawPrint,
  PersonStanding,
  Rocket,
  Scale,
  ScanSearch,
  Sparkles,
  Truck,
  Zap,
} from 'lucide-react'
import { Link } from '@/i18n/navigation'
import HeroIndustrial from '@/components/industrial/HeroIndustrial'
import SectionHeader from '@/components/industrial/SectionHeader'
import ProcessSteps from '@/components/industrial/ProcessSteps'
import ProjectCard from '@/components/industrial/ProjectCard'
import SafeNotice from '@/components/industrial/SafeNotice'
import CTASection from '@/components/industrial/CTASection'
import PartnerShowcase from '@/components/partners/PartnerShowcase'
import { authorizedPartners } from '@/data/authorized-partners'
import ProductCard from '@/components/ProductCard'
import ArticleCard from '@/components/ArticleCard'
import StructuredData from '@/components/StructuredData'
import { getFeaturedProducts, getArticles, getHomeHero, getActiveProductCounts, type Locale } from '@/lib/sanity'
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/structured-data'
import { pageSeo } from '@/lib/page-seo'
import { heroImage } from '@/lib/industrial-images'
import type { WhatWeDoCard, HomeProjectItem } from '@/data/industrial-types'

type Props = { params: Promise<{ locale: string }> }

// Icons follow the order of the translated lists (whatWeDo.cards, techCoverage.items).
const WHAT_WE_DO_ICONS = [ScanSearch, Scale, Handshake, Rocket, Network, Globe2]
const TECH_ICONS = [Bot, Zap, Truck, PawPrint, PersonStanding, Sparkles, Hand]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'industrial.home.meta' })
  return pageSeo({ title: t('title'), description: t('description'), path: '', locale })
}

// On-publish revalidation (/api/revalidate) refreshes '/' on every Sanity
// change, so this timer is only a fallback safety net — keep it long to avoid
// needless background regeneration (and the CDN requests it costs).
export const revalidate = 3600

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations('industrial.home')
  const tHomeLegacy = await getTranslations('home')
  const tNotice = await getTranslations('industrial.safeNotice')
  const tNav = await getTranslations('industrial.nav')
  const tPartners = await getTranslations('industrial.partners')

  const whatWeDoCards = t.raw('whatWeDo.cards') as WhatWeDoCard[]
  const techItems = t.raw('techCoverage.items') as string[]
  const industryItems = t.raw('industriesSection.items') as string[]
  const processSteps = t.raw('process.steps') as string[]
  const networkCategories = t.raw('network.categories') as string[]
  const projectItems = t.raw('projects.items') as HomeProjectItem[]

  // CMS-driven content surfaced from Sanity (Studio edits land here)
  const [featuredProducts, latestArticles, homeHero, partnerCounts] = await Promise.all([
    getFeaturedProducts(4, locale as Locale),
    getArticles(3, locale as Locale),
    getHomeHero(locale as Locale),
    getActiveProductCounts(authorizedPartners.map((p) => p.slug)).catch(() => ({}) as Record<string, number>),
  ])
  const partnerProductTotal = Object.values(partnerCounts).reduce((a, b) => a + b, 0)
  const heroStats = [
    { value: String(authorizedPartners.length), label: tPartners('stats.brands') },
    // Rounded down to a tens figure so the hero doesn't change with every edit.
    ...(partnerProductTotal >= 10
      ? [{ value: `${Math.floor(partnerProductTotal / 10) * 10}+`, label: tPartners('stats.products') }]
      : []),
    { value: 'DE', label: tPartners('stats.country') },
  ]

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

  // When the hero has carousel slides in Studio, render the carousel (image+video)
  // instead of the single banner image; otherwise the single image is used.
  const tCommon = await getTranslations('common')
  const heroMedia = homeHero?.slides?.length
    ? {
        slides: homeHero.slides,
        aspectRatio: homeHero.aspectRatio,
        width: homeHero.width,
        autoplay: homeHero.autoplay,
        interval: homeHero.autoplayInterval,
        learnMoreLabel: tCommon('learnMore'),
      }
    : undefined

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
        media={heroMedia}
        badge={tPartners('heroBadge')}
        stats={heroStats}
        partnerMarqueeLabel={tPartners('marqueeLabel')}
      />

      {/* SECTION 1b — Authorized reseller showcase */}
      <PartnerShowcase locale={locale as Locale} />

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
              <article
                key={card.title}
                data-reveal
                style={{ ['--d' as string]: `${(idx % 3) * 90}ms` }}
                className="group ind-card mr-glow-card flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-5">
                  {(() => {
                    const Icon = WHAT_WE_DO_ICONS[idx % WHAT_WE_DO_ICONS.length]
                    return (
                      <span className="grid place-items-center w-11 h-11 rounded-xl bg-[color:var(--mr-accent-soft)] border border-[color:var(--mr-accent-line)] text-[color:var(--mr-accent-ink)] transition-transform duration-500 group-hover:scale-110">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    )
                  })()}
                  <span className="mr-index">{String(idx + 1).padStart(2, '0')}</span>
                </div>
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
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {techItems.map((item, idx) => {
              const Icon = TECH_ICONS[idx % TECH_ICONS.length]
              return (
                <li
                  key={item}
                  data-reveal
                  style={{ ['--d' as string]: `${(idx % 4) * 70}ms` }}
                  className={`group ind-card mr-glow-card relative overflow-hidden flex flex-col gap-6 min-h-44 ${
                    idx === 0 ? 'sm:col-span-2 bg-[linear-gradient(160deg,#ffffff_40%,#e6f4f3_100%)]' : ''
                  }`}
                >
                  <div className="absolute inset-0 mr-dots opacity-0 transition-opacity duration-500 group-hover:opacity-50 [mask-image:radial-gradient(circle_at_100%_0%,#000,transparent_70%)]" aria-hidden="true" />
                  <div className="relative flex items-center justify-between">
                    <span
                      className={`grid place-items-center rounded-xl bg-[color:var(--mr-accent-soft)] border border-[color:var(--mr-accent-line)] text-[color:var(--mr-accent-ink)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${
                        idx === 0 ? 'w-14 h-14' : 'w-11 h-11'
                      }`}
                    >
                      <Icon className={idx === 0 ? 'w-7 h-7' : 'w-5 h-5'} aria-hidden="true" />
                    </span>
                    <span className="mr-index">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  <p
                    className={`relative mt-auto text-[color:var(--mr-ink)] font-medium leading-snug ${
                      idx === 0 ? 'ind-h3 !text-xl md:!text-2xl max-w-md' : 'text-[15px]'
                    }`}
                  >
                    {item}
                  </p>
                </li>
              )
            })}
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
            {industryItems.map((item, idx) => (
              <li
                key={item}
                data-reveal
                style={{ ['--d' as string]: `${(idx % 3) * 70}ms` }}
                className="ind-card !p-4 flex items-start gap-3"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[color:var(--mr-accent)] shrink-0" aria-hidden="true" />
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
                    data-reveal="left"
                    style={{ ['--d' as string]: `${idx * 60}ms` }}
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
                className="mr-link"
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
                className="mr-link"
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
