import { Fragment } from 'react'
import Image from 'next/image'
import { ArrowRight, Check, Mail, Plus } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/config'
import Breadcrumbs from '@/components/Breadcrumbs'
import StructuredData from '@/components/StructuredData'
import { HeroParallax } from '@/components/Parallax'
import ProductHeroSlider from '@/components/industrial/ProductHeroSlider'
import SectionHeader from '@/components/industrial/SectionHeader'
import CTASection from '@/components/industrial/CTASection'
import LucideIcon from '@/components/industrial/LucideIcon'
import ModelCompare from '@/components/landing/ModelCompare'
import { authorizedPartners } from '@/data/authorized-partners'
import { getManufacturerHero } from '@/data/product-heroes'
import { getCategoryLanding, type CategoryLandingSlug, type LocalizedLandingModel } from '@/data/landing'
import { getProductsBySlugs } from '@/lib/sanity'
import { generateCollectionSchema, generateFAQSchema } from '@/lib/structured-data'

// Category buying page at /pages/<slug>, rendered from src/data/landing/<slug>.ts.
// Models that are no longer active in Sanity drop out, so no card links to a 404.

const contact = (params: Record<string, string>) => `/contact?${new URLSearchParams(params)}`
const quote = (product: string) => contact({ inquiry: 'availability', product })

const textLink =
  'inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-[color:var(--mr-accent-ink)] hover:underline'

function SpecTiles({ specs }: { specs: LocalizedLandingModel['specs'] }) {
  if (specs.length === 0) return null
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

function ModelImage({ model, sizes, className }: { model: LocalizedLandingModel; sizes: string; className: string }) {
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
        className={`transition-transform duration-500 group-hover:scale-[1.03] ${
          model.fit === 'cover' ? 'object-cover' : model.backdrop ? 'object-contain' : 'object-contain p-5'
        }`}
      />
    </div>
  )
}

/** Cards per row on large screens: two or four cards two per row, five as two then three, else three. */
const cardSpan = (count: number, i: number) =>
  count === 1 ? 'md:col-span-2 lg:col-span-6' : count % 3 === 2 && i < 2 ? 'lg:col-span-3' : count === 4 ? 'lg:col-span-3' : 'lg:col-span-2'

export default async function CategoryLanding({ slug, locale }: { slug: CategoryLandingSlug; locale: string }) {
  const loc = locale as Locale
  const path = `/pages/${slug}`
  const { content: c, models: all, common: k } = getCategoryLanding(slug, loc)
  const t = await getTranslations('products')

  // Only models that are active in Sanity; if Sanity is unreachable, show all.
  const active = new Set((await getProductsBySlugs(all.map((m) => m.slug), loc)).map((p) => p.slug.current))
  const models = active.size > 0 ? all.filter((m) => active.has(m.slug)) : all
  const bySlug = new Map(models.map((m) => [m.slug, m]))

  const groups = c.groups
    .map((g) => ({
      ...g,
      featureModel: g.feature ? bySlug.get(g.feature) : undefined,
      cards: g.models.flatMap((s) => bySlug.get(s) ?? []),
      partner: g.manufacturer ? authorizedPartners.find((p) => p.slug === g.manufacturer) : undefined,
    }))
    .filter((g) => g.featureModel || g.cards.length > 0)

  // Models in page order (as the groups list them) for the table and the schema.
  const ordered = groups.flatMap((g) => [...(g.featureModel ? [g.featureModel] : []), ...g.cards])

  const hero = getManufacturerHero(c.heroSlugs.filter((s) => bySlug.has(s)), loc)
  const navItems = [
    ...groups.map((g) => ({ id: g.id, label: g.nav })),
    { id: 'basics', label: k.nav.explainer },
    { id: 'compare', label: k.nav.compare },
    { id: 'faq', label: k.nav.faq },
  ]

  return (
    <div className="min-h-screen pt-16 bg-[color:var(--mr-paper)]">
      <StructuredData
        data={[
          generateCollectionSchema({
            name: c.intro.title,
            description: c.meta.description,
            path,
            locale,
            items: ordered.map((m) => ({ name: m.name, path: `/products/${m.slug}` })),
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
            slideActions={hero.slides.map((s) => {
              // With several products each slide is one product; with one, all slides belong to it.
              const product = s.product ?? hero.product
              const name = product?.name ?? ''
              return (
                <Fragment key={s.id}>
                  <Link href={`/products/${product?.slug ?? s.id}`} className="ind-btn-primary">
                    {k.hero.discover.replace('{product}', name)}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href={quote(name)} className="ind-btn-secondary">
                    <Mail className="w-4 h-4" />
                    {k.hero.request}
                  </Link>
                </Fragment>
              )
            })}
          />
        </HeroParallax>
      )}

      {/* Intro: which model for which job */}
      <section className="py-14 md:py-20 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs className="mb-10" items={[{ name: c.meta.crumb, href: path }]} />
          <div className={!hero && c.heroImage ? 'grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center' : ''}>
            <div>
              <SectionHeader as="h1" eyebrow={c.intro.eyebrow} title={c.intro.title} />
              <div className={`-mt-4 grid gap-x-12 gap-y-5 ${!hero && c.heroImage ? '' : 'lg:grid-cols-2'}`}>
                <p data-reveal className="text-lg md:text-xl leading-relaxed text-[color:var(--mr-ink)]">
                  {c.intro.lead.replace('{count}', String(models.length))}
                </p>
                <p data-reveal className="text-base leading-relaxed text-[color:var(--mr-ink-2)]">{c.intro.body}</p>
              </div>
              {!hero && (
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={contact({ subject: c.cta.subject })} className="ind-btn-primary">
                    <Mail className="w-4 h-4" />
                    {k.hero.request}
                  </Link>
                  <a href="#compare" className="ind-btn-secondary">
                    {k.nav.compare}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
            {!hero && c.heroImage && (
              <figure data-reveal className="relative aspect-[4/3] overflow-hidden rounded-[var(--mr-radius)] border border-[color:var(--mr-line)] bg-[radial-gradient(120%_90%_at_50%_15%,#ffffff_0%,var(--mr-paper-2)_80%)]">
                {/* Most product pictures are cut-outs, so show them whole rather than cropped. */}
                <Image
                  src={`${c.heroImage.src}?w=1600`}
                  alt={c.heroImage.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 38rem, 92vw"
                  className={c.heroImage.fit === 'cover' ? 'object-cover' : 'object-contain p-6'}
                />
              </figure>
            )}
          </div>

          <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
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

      {/* Key figures across the range */}
      {c.facts.length > 0 && (
        <section aria-label={k.facts} className="bg-[color:var(--mr-dark)]">
          <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-white/10 md:grid-cols-3 lg:grid-cols-6">
            {c.facts.map((f) => (
              <div key={f.label} className="flex flex-col-reverse justify-end bg-[color:var(--mr-dark)] px-5 py-6">
                <dt className="mt-1 text-xs leading-snug text-[#b9cbd0]">{f.label}</dt>
                <dd className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* In-page navigation */}
      <nav aria-label={k.nav.label} className="sticky top-16 z-30 border-y border-[color:var(--mr-line)] bg-[color:var(--mr-white)]">
        <ul className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-2 sm:px-4 lg:px-6">
          {navItems.map((n) => (
            <li key={n.id} className="flex-none">
              <a
                href={`#${n.id}`}
                className="inline-flex min-h-[48px] items-center whitespace-nowrap px-3 text-sm font-semibold text-[color:var(--mr-ink-2)] transition-colors hover:text-[color:var(--mr-accent-ink)]"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* One section per group */}
      {groups.map((g, gi) => {
        const feature = g.featureModel
        const cards = g.cards
        return (
          <section
            key={g.id}
            id={g.id}
            className={`scroll-mt-28 py-16 md:py-24 ${gi % 2 === 0 ? 'bg-[color:var(--mr-white)]' : 'ind-section-light'}`}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-start justify-between gap-x-8">
                <SectionHeader eyebrow={g.eyebrow} title={g.title} subtitle={g.lead} />
                {g.partner && (
                  <Image
                    src={g.partner.logo}
                    alt={g.partner.name}
                    width={g.partner.logoWidth}
                    height={g.partner.logoHeight}
                    unoptimized
                    className="mr-logo mb-10 hidden h-7 w-auto lg:block"
                  />
                )}
              </div>

              {(g.body || (g.points && g.points.length > 0)) && (
                <div className="-mt-4 mb-10 grid gap-x-12 gap-y-4 lg:grid-cols-2">
                  {g.body && <p className="text-base leading-relaxed text-[color:var(--mr-ink-2)]">{g.body}</p>}
                  {g.points && g.points.length > 0 && (
                    <ul className="space-y-2.5">
                      {g.points.map((p) => (
                        <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">
                          <Check className="mt-0.5 h-4 w-4 flex-none text-[color:var(--mr-accent-ink)]" aria-hidden="true" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {feature && (
                <article
                  id={feature.slug}
                  data-reveal
                  className="group scroll-mt-32 grid overflow-hidden rounded-[var(--mr-radius)] border border-[color:var(--mr-line)] bg-[color:var(--mr-white)] shadow-[var(--mr-shadow)] lg:grid-cols-[1.2fr_1fr]"
                >
                  <ModelImage model={feature} sizes="(min-width: 1024px) 44rem, 92vw" className="aspect-[16/10] lg:aspect-auto lg:min-h-[28rem]" />
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
                        {k.hero.discover.replace('{product}', feature.name)}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link href={quote(feature.name)} className="ind-btn-secondary">
                        <Mail className="w-4 h-4" />
                        {k.card.request}
                      </Link>
                    </div>
                  </div>
                </article>
              )}

              {cards.length > 0 && (
                <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
                  {cards.map((m, i) => (
                    <li key={m.slug} id={m.slug} data-reveal className={`scroll-mt-32 ${cardSpan(cards.length, i)}`}>
                      {/* A lone card sits side by side, so its picture does not fill the whole width. */}
                      <article className={`group flex h-full flex-col ${cards.length === 1 ? 'md:flex-row' : ''} overflow-hidden rounded-[var(--mr-radius)] border border-[color:var(--mr-line)] bg-[color:var(--mr-white)] shadow-[var(--mr-shadow)]`}>
                        <ModelImage
                          model={m}
                          sizes="(min-width: 1024px) 38rem, (min-width: 768px) 46vw, 92vw"
                          className={cards.length === 1 ? 'aspect-[4/3] md:aspect-auto md:min-h-[20rem] md:w-1/2 md:flex-none' : 'aspect-[4/3]'}
                        />
                        <div className="flex flex-1 flex-col p-6">
                          <div className="text-xs font-semibold text-[color:var(--mr-accent-ink)]">{m.type}</div>
                          <h3 className="ind-h3 mt-1 text-[color:var(--mr-ink)]">{m.name}</h3>
                          <p className="mt-2 mb-5 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{m.blurb}</p>
                          <div className="mt-auto">
                            <SpecTiles specs={m.specs} />
                            <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4">
                              <Link href={`/products/${m.slug}`} aria-label={`${k.card.details}: ${m.name}`} className={textLink}>
                                {k.card.details}
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                              </Link>
                              <Link
                                href={quote(m.name)}
                                aria-label={`${k.card.request}: ${m.name}`}
                                className="inline-flex min-h-[44px] items-center gap-1.5 text-sm text-[color:var(--mr-ink-2)] hover:text-[color:var(--mr-accent-ink)]"
                              >
                                <Mail className="h-4 w-4" aria-hidden="true" />
                                {k.card.request}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              )}

              {g.manufacturer && g.partner && (
                <p className="mt-8">
                  <Link href={`/manufacturers/${g.manufacturer}`} className={textLink}>
                    {k.card.allFrom.replace('{brand}', g.partner.name)}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </p>
              )}
            </div>
          </section>
        )
      })}

      {/* Explainer */}
      <section id="basics" className="scroll-mt-28 py-16 md:py-24 bg-[color:var(--mr-white)] border-y border-[color:var(--mr-line)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.explainer.eyebrow} title={c.explainer.title} />
          <div className="-mt-4 space-y-5">
            {c.explainer.paragraphs.map((p) => (
              <p key={p} className="text-base leading-relaxed text-[color:var(--mr-ink-2)]">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="compare" className="scroll-mt-28 py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.compare.eyebrow} title={c.compare.title} subtitle={c.compare.subtitle} />
          <ModelCompare
            models={ordered.map(({ slug: s, name, tags, row }) => ({ slug: s, name, tags, row }))}
            filters={c.compare.filters.filter((f) => ordered.some((m) => m.tags.includes(f.key)))}
            cols={c.compare.cols}
            labels={{ ...k.compare, foot: c.compare.foot }}
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
          <SectionHeader eyebrow={k.steps.eyebrow} title={k.steps.title} />
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {k.steps.items.map((s, i) => (
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
                  <Plus className="h-5 w-5 flex-none text-[color:var(--mr-accent-ink)] transition-transform group-open:rotate-45" aria-hidden="true" />
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{f.a}</p>
              </details>
            ))}
          </div>
          {c.related.length > 0 && (
            <nav aria-label={k.related} className="mt-8">
              <ul className="flex flex-wrap gap-x-8 gap-y-1">
                {c.related.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={textLink}>
                      {l.label}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
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
        <h2 className="text-sm font-semibold text-[color:var(--mr-steel)]">{k.fine}</h2>
        <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-[color:var(--mr-steel)]">
          {c.fine.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
