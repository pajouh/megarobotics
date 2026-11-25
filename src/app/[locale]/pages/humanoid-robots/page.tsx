import { Fragment } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, Check, Mail, Plus } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/config'
import Breadcrumbs from '@/components/Breadcrumbs'
import StructuredData from '@/components/StructuredData'
import VideoEmbed from '@/components/VideoEmbed'
import { HeroParallax } from '@/components/Parallax'
import ProductHeroSlider from '@/components/industrial/ProductHeroSlider'
import SectionHeader from '@/components/industrial/SectionHeader'
import CTASection from '@/components/industrial/CTASection'
import LucideIcon from '@/components/industrial/LucideIcon'
import HumanoidCompare from '@/components/humanoids/HumanoidCompare'
import { authorizedPartners } from '@/data/authorized-partners'
import { getManufacturerHero } from '@/data/product-heroes'
import {
  FILTER_KEYS,
  HUMANOID_HERO_SLUGS,
  getHumanoidContent,
  getHumanoidModels,
  type LocalizedHumanoid,
} from '@/data/humanoid-robots'
import { getProductsBySlugs } from '@/lib/sanity'
import { pageSeo } from '@/lib/page-seo'
import { generateCollectionSchema, generateFAQSchema } from '@/lib/structured-data'

// The humanoid landing page. A static route, so it wins over pages/[slug],
// which leaves this slug out of its static params. The Sanity page document
// with the same slug only feeds the sitemap. Content: src/data/humanoid-robots.ts.

type Props = { params: Promise<{ locale: string }> }

const PATH = '/pages/humanoid-robots'
const BRANDS = ['agile', 'limx', 'magiclab', 'seer'] as const

const contact = (params: Record<string, string>) => `/contact?${new URLSearchParams(params)}`
const quote = (product: string) => contact({ inquiry: 'availability', product })

const textLink =
  'inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-[color:var(--mr-accent-ink)] hover:underline'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const c = getHumanoidContent(locale as Locale)
  return pageSeo({ title: c.meta.title, description: c.meta.description, path: PATH, locale })
}

export const revalidate = 3600

function SpecTiles({ specs }: { specs: LocalizedHumanoid['specs'] }) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--mr-radius-sm)] border border-[color:var(--mr-line)] bg-[color:var(--mr-line)]">
      {specs.map((s) => (
        <div key={s.label} className="bg-[color:var(--mr-white)] px-3 py-2.5">
          <dt className="text-xs text-[color:var(--mr-steel)]">{s.label}</dt>
          <dd className="mt-0.5 text-sm font-semibold text-[color:var(--mr-ink)]">{s.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function ModelImage({ model, sizes, className }: { model: LocalizedHumanoid; sizes: string; className: string }) {
  return (
    <div
      style={model.backdrop ? { background: model.backdrop } : undefined}
      className={`relative overflow-hidden bg-[radial-gradient(120%_90%_at_50%_15%,#ffffff_0%,var(--mr-paper-2)_80%)] ${className}`}
    >
      <Image
        src={`${model.image}?w=1400`}
        alt={model.name}
        fill
        sizes={sizes}
        style={model.position ? { objectPosition: model.position } : undefined}
        className={`transition-transform duration-500 group-hover:scale-[1.03] ${model.fit === 'cover' ? 'object-cover' : model.backdrop ? 'object-contain' : 'object-contain p-5'}`}
      />
    </div>
  )
}

export default async function HumanoidRobotsPage({ params }: Props) {
  const { locale } = await params
  const loc = locale as Locale
  const c = getHumanoidContent(loc)
  const t = await getTranslations('products')

  // Only models that are active in Sanity; if Sanity is unreachable, show all.
  const all = getHumanoidModels(loc)
  const active = new Set((await getProductsBySlugs(all.map((m) => m.slug), loc)).map((p) => p.slug.current))
  const models = active.size > 0 ? all.filter((m) => active.has(m.slug)) : all
  const bySlug = new Map(models.map((m) => [m.slug, m]))

  const hero = getManufacturerHero(HUMANOID_HERO_SLUGS.filter((s) => bySlug.has(s)), loc)

  return (
    <div className="min-h-screen pt-16 bg-[color:var(--mr-paper)]">
      <StructuredData
        data={[
          generateCollectionSchema({
            name: c.intro.title,
            description: c.meta.description,
            path: PATH,
            locale,
            items: models.map((m) => ({ name: m.name, path: `/products/${m.slug}` })),
          }),
          generateFAQSchema(c.faq.items.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />

      {hero && (
        <HeroParallax>
          <ProductHeroSlider
            hero={hero}
            locale={locale}
            labels={{
              carousel: c.hero.carousel,
              chooseSlide: t('hero.chooseProduct'),
              useCases: t('hero.useCases'),
              pause: t('hero.pause'),
              play: t('hero.play'),
            }}
            slideActions={hero.slides.map((s) => (
              <Fragment key={s.id}>
                {s.id === 'mobile-fr3-duo' ? (
                  <a href="#franka" className="ind-btn-primary">
                    {c.hero.fullSystem}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <Link href={`/products/${s.id}`} className="ind-btn-primary">
                    {c.hero.discover.replace('{product}', s.product?.name ?? '')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
                <Link
                  href={quote(s.id === 'mobile-fr3-duo' ? c.franka.ctaSubject : (s.product?.name ?? ''))}
                  className="ind-btn-secondary"
                >
                  <Mail className="w-4 h-4" />
                  {c.hero.request}
                </Link>
              </Fragment>
            ))}
          />
        </HeroParallax>
      )}

      {/* Intro: which model for which job */}
      <section className="py-14 md:py-20 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs className="mb-10" items={[{ name: c.meta.crumb, href: PATH }]} />
          <SectionHeader as="h1" eyebrow={c.intro.eyebrow} title={c.intro.title} />
          <div className="-mt-4 grid gap-x-12 gap-y-5 lg:grid-cols-2">
            <p data-reveal className="text-lg md:text-xl leading-relaxed text-[color:var(--mr-ink)]">
              {c.intro.lead.replace('{count}', String(models.length))}
            </p>
            <p data-reveal className="text-base leading-relaxed text-[color:var(--mr-ink-2)]">{c.intro.body}</p>
          </div>
          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {c.intro.jobs.map((j) => (
              <li key={j.title} data-reveal className="ind-card flex flex-col">
                <span className="flex h-11 w-11 items-center justify-center rounded-[var(--mr-radius-sm)] bg-[color:var(--mr-accent-soft)] text-[color:var(--mr-accent-ink)]">
                  <LucideIcon name={j.icon} className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="ind-h3 mt-4 text-[color:var(--mr-ink)]">{j.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{j.body}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                  {j.models
                    .filter((s) => bySlug.has(s))
                    .map((s) => (
                      <li key={s}>
                        <a
                          href={`#${s}`}
                          className="inline-flex min-h-[36px] items-center rounded-full border border-[color:var(--mr-accent-line)] px-3 text-xs font-medium text-[color:var(--mr-accent-ink)] transition-colors hover:bg-[color:var(--mr-accent-soft)]"
                        >
                          {bySlug.get(s)!.name}
                        </a>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* In-page navigation */}
      <nav
        aria-label={c.nav.label}
        className="sticky top-16 z-30 border-y border-[color:var(--mr-line)] bg-[color:var(--mr-white)]"
      >
        <ul className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-2 sm:px-4 lg:px-6">
          {(['franka', ...BRANDS, 'compare', 'faq'] as const).map((k) => (
            <li key={k} className="flex-none">
              <a
                href={`#${k}`}
                className="inline-flex min-h-[48px] items-center whitespace-nowrap px-3 text-sm font-semibold text-[color:var(--mr-ink-2)] transition-colors hover:text-[color:var(--mr-accent-ink)]"
              >
                {c.nav[k]}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Franka: the full system */}
      {bySlug.has('mobile-fr3-duo') && (
        <section id="franka" className="scroll-mt-28 py-16 md:py-24 bg-[color:var(--mr-white)]">
          <span id="mobile-fr3-duo" className="block scroll-mt-28" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader eyebrow={c.franka.eyebrow} title={c.franka.title} />
            <div className="-mt-4 grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:items-center">
              <div>
                <p data-reveal className="text-lg leading-relaxed text-[color:var(--mr-ink)]">{c.franka.lead}</p>
                <p data-reveal className="mt-4 text-base leading-relaxed text-[color:var(--mr-ink-2)]">{c.franka.body}</p>
                <p
                  data-reveal
                  className="mt-6 flex items-start gap-3 rounded-[var(--mr-radius-sm)] border border-[color:var(--mr-orange-line)] bg-[color:var(--mr-orange-soft)] px-4 py-3 text-sm font-semibold leading-snug text-[color:var(--mr-orange-ink)]"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[color:var(--mr-orange)]" aria-hidden="true" />
                  {c.franka.status}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={quote(c.franka.ctaSubject)} className="ind-btn-primary">
                    <Mail className="w-4 h-4" />
                    {c.franka.ctaPrimary}
                  </Link>
                  <Link href="/products/mobile-fr3-duo" className="ind-btn-secondary">
                    {c.franka.ctaSecondary}
                  </Link>
                </div>
              </div>
              <figure data-reveal>
                <Image
                  src={`${c.franka.image}?w=1600`}
                  alt={c.franka.imageAlt}
                  width={1600}
                  height={900}
                  sizes="(min-width: 1024px) 42rem, 92vw"
                  className="h-auto w-full rounded-[var(--mr-radius)] border border-[color:var(--mr-line)]"
                />
                <figcaption className="mt-2 text-xs text-[color:var(--mr-steel)]">{c.franka.imageCaption}</figcaption>
              </figure>
            </div>

            <dl className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px overflow-hidden rounded-[var(--mr-radius)] bg-white/15">
              {c.franka.specs.map((s) => (
                <div key={s.label} className="flex flex-col-reverse justify-end bg-[color:var(--mr-dark)] px-5 py-5">
                  <dt className="mt-1 text-xs leading-snug text-[#b9cbd0]">{s.label}</dt>
                  <dd className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">{s.value}</dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-16 font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-[color:var(--mr-ink)]">
              {c.franka.scopeTitle}
            </h3>
            <p className="mt-2 max-w-2xl text-base text-[color:var(--mr-ink-2)]">{c.franka.scopeLead}</p>
            <ol className="mt-8 grid gap-5 lg:grid-cols-3">
              {c.franka.scope.map((p, i) => (
                <li
                  key={p.art}
                  data-reveal
                  className="flex flex-col rounded-[var(--mr-radius)] border border-[color:var(--mr-line)] border-t-[3px] border-t-[color:var(--mr-accent)] bg-[color:var(--mr-paper)] p-6"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <span className="text-sm font-semibold text-[color:var(--mr-accent-ink)]">
                      {i + 1}. {p.what}
                    </span>
                    <span className="text-xs tabular-nums text-[color:var(--mr-steel)]">
                      {c.franka.artNo} {p.art}
                    </span>
                  </div>
                  <h4 className="ind-h3 mt-2 text-[color:var(--mr-ink)]">{p.name}</h4>
                  <ul className="mt-4 space-y-2.5">
                    {p.items.map((it) => (
                      <li key={it} className="flex gap-2.5 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-[color:var(--mr-accent-ink)]" aria-hidden="true" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>

            <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.02em] text-[color:var(--mr-ink)]">
                  {c.franka.flowTitle}
                </h3>
                <ol className="mt-6 space-y-5">
                  {c.franka.flow.map((f, i) => (
                    <li key={f.title} className="flex gap-4">
                      <span className="ind-step-num flex-none">{i + 1}</span>
                      <div>
                        <h4 className="text-base font-semibold text-[color:var(--mr-ink)]">{f.title}</h4>
                        <p className="mt-0.5 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{f.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <VideoEmbed url={c.franka.video} title={c.franka.videoTitle} caption={c.franka.videoCaption} className="" />
                <p className="mt-6 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{c.franka.note}</p>
                <div className="mt-5">
                  <div className="text-sm font-semibold text-[color:var(--mr-ink)]">{c.franka.related}</div>
                  <ul className="flex flex-wrap gap-x-5">
                    {c.franka.relatedItems.map((r) => (
                      <li key={r.slug}>
                        <Link href={`/products/${r.slug}`} className={textLink}>
                          {r.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* One section per brand */}
      {BRANDS.map((key, bi) => {
        const b = c.brands[key]
        const feature = bySlug.get(b.feature)
        const cards = b.models.flatMap((s) => bySlug.get(s) ?? [])
        if (!feature && cards.length === 0) return null
        const partner = authorizedPartners.find((p) => p.slug === b.manufacturer)
        return (
          <section
            key={key}
            id={key}
            className={`scroll-mt-28 py-16 md:py-24 ${bi % 2 === 0 ? 'ind-section-light' : 'bg-[color:var(--mr-white)]'}`}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-start justify-between gap-x-8">
                <SectionHeader eyebrow={b.eyebrow} title={b.title} subtitle={b.lead} />
                {partner && (
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={partner.logoWidth}
                    height={partner.logoHeight}
                    unoptimized
                    className="mr-logo mb-10 hidden h-7 w-auto lg:block"
                  />
                )}
              </div>

              {feature && (
                <article
                  id={feature.slug}
                  data-reveal
                  className="group scroll-mt-32 grid overflow-hidden rounded-[var(--mr-radius)] border border-[color:var(--mr-line)] bg-[color:var(--mr-white)] shadow-[var(--mr-shadow)] lg:grid-cols-[1.2fr_1fr]"
                >
                  <ModelImage model={feature} sizes="(min-width: 1024px) 44rem, 92vw" className="aspect-[16/10] lg:aspect-auto lg:min-h-[30rem]" />
                  <div className="flex flex-col p-6 md:p-9">
                    <div className="text-sm font-semibold text-[color:var(--mr-accent-ink)]">{feature.type}</div>
                    <h3 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.02em] text-[color:var(--mr-ink)]">
                      {feature.name}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-[color:var(--mr-ink-2)]">{feature.blurb}</p>
                    <div className="mt-6">
                      <SpecTiles specs={feature.specs} />
                    </div>
                    <div className="mt-auto flex flex-wrap gap-3 pt-8">
                      <Link href={`/products/${feature.slug}`} className="ind-btn-primary">
                        {c.hero.discover.replace('{product}', feature.name)}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link href={quote(feature.name)} className="ind-btn-secondary">
                        <Mail className="w-4 h-4" />
                        {c.card.request}
                      </Link>
                    </div>
                  </div>
                </article>
              )}

              {cards.length > 0 && (
                <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
                  {cards.map((m, i) => (
                    <li
                      key={m.slug}
                      id={m.slug}
                      data-reveal
                      // Two or four cards: two per row. Five: two, then three. Otherwise three per row.
                      className={`scroll-mt-32 ${
                        cards.length % 3 === 2 && i < 2 ? 'lg:col-span-3' : cards.length === 4 ? 'lg:col-span-3' : 'lg:col-span-2'
                      }`}
                    >
                      <article className="group flex h-full flex-col overflow-hidden rounded-[var(--mr-radius)] border border-[color:var(--mr-line)] bg-[color:var(--mr-white)] shadow-[var(--mr-shadow)]">
                        <ModelImage model={m} sizes="(min-width: 1024px) 38rem, (min-width: 768px) 46vw, 92vw" className="aspect-[4/3]" />
                        <div className="flex flex-1 flex-col p-6">
                          <div className="text-xs font-semibold text-[color:var(--mr-accent-ink)]">{m.type}</div>
                          <h3 className="ind-h3 mt-1 text-[color:var(--mr-ink)]">{m.name}</h3>
                          <p className="mt-2 mb-5 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{m.blurb}</p>
                          <div className="mt-auto">
                            <SpecTiles specs={m.specs} />
                            <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4">
                              <Link href={`/products/${m.slug}`} aria-label={`${c.card.details}: ${m.name}`} className={textLink}>
                                {c.card.details}
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                              </Link>
                              <Link
                                href={quote(m.name)}
                                aria-label={`${c.card.request}: ${m.name}`}
                                className="inline-flex min-h-[44px] items-center gap-1.5 text-sm text-[color:var(--mr-ink-2)] hover:text-[color:var(--mr-accent-ink)]"
                              >
                                <Mail className="h-4 w-4" aria-hidden="true" />
                                {c.card.request}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              )}

              <p className="mt-8">
                <Link href={`/manufacturers/${b.manufacturer}`} className={textLink}>
                  {c.card.allFrom.replace('{brand}', partner?.name ?? c.nav[key])}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </p>
            </div>
          </section>
        )
      })}

      {/* Comparison */}
      <section id="compare" className="scroll-mt-28 py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.compare.eyebrow} title={c.compare.title} subtitle={c.compare.subtitle} />
          <HumanoidCompare
            models={models.map(({ slug, name, tags, row }) => ({ slug, name, tags, row }))}
            filterKeys={FILTER_KEYS}
            labels={{
              filters: c.compare.filters,
              filterLabel: c.compare.filterLabel,
              reset: c.compare.reset,
              count: c.compare.count,
              empty: c.compare.empty,
              scroll: c.compare.scroll,
              cols: c.compare.cols,
              foot: c.compare.foot,
            }}
          />
        </div>
      </section>

      {/* How to choose */}
      <section className="py-16 md:py-24 bg-[color:var(--mr-white)] border-y border-[color:var(--mr-line)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.choose.eyebrow} title={c.choose.title} />
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
            {c.choose.items.map((i) => (
              <li key={i.title} data-reveal className="border-t-2 border-[color:var(--mr-accent-line)] pt-4">
                <h3 className="text-base font-semibold text-[color:var(--mr-ink)]">{i.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{i.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How we work */}
      <section className="py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.steps.eyebrow} title={c.steps.title} />
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.steps.items.map((s, i) => (
              <li key={s.title} data-reveal style={{ ['--d' as string]: `${i * 60}ms` }} className="ind-card !p-5 flex flex-col">
                <span className="ind-step-num">{i + 1}</span>
                <h3 className="mt-4 text-base font-semibold text-[color:var(--mr-ink)]">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-28 py-16 md:py-24 bg-[color:var(--mr-white)] border-t border-[color:var(--mr-line)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.faq.eyebrow} title={c.faq.title} />
          <div className="divide-y divide-[color:var(--mr-line)] border-y border-[color:var(--mr-line)]">
            {c.faq.items.map((f) => (
              <details key={f.q} className="group py-1">
                <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-4 py-3 text-base font-semibold text-[color:var(--mr-ink)] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus
                    className="h-5 w-5 flex-none text-[color:var(--mr-accent-ink)] transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  />
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{f.a}</p>
              </details>
            ))}
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-1">
            {[
              { href: '/solutions/humanoid-embodied-ai', label: c.faq.solution },
              { href: '/pages/quadruped-robots', label: c.faq.quadruped },
              { href: '/products/categories/robot-platforms', label: c.faq.platforms },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={textLink}>
                  {l.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        eyebrow={c.cta.eyebrow}
        title={c.cta.title}
        body={c.cta.body}
        ctaLabel={c.cta.button}
        ctaHref={contact({ subject: c.cta.subject })}
        tone="dark"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-10">
        <h2 className="text-sm font-semibold text-[color:var(--mr-steel)]">{c.fine.eyebrow}</h2>
        <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-[color:var(--mr-steel)]">
          {c.fine.items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
