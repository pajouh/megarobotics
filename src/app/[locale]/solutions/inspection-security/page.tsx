import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, Mail, Plus } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/config'
import ProductHeroSlider from '@/components/industrial/ProductHeroSlider'
import SectionHeader from '@/components/industrial/SectionHeader'
import CTASection from '@/components/industrial/CTASection'
import LucideIcon from '@/components/industrial/LucideIcon'
import LandingPageLinks from '@/components/LandingPageLinks'
import Breadcrumbs from '@/components/Breadcrumbs'
import StructuredData from '@/components/StructuredData'
import Parallax, { HeroParallax } from '@/components/Parallax'
import MSeriesExplorer from '@/components/security/MSeriesExplorer'
import MSeriesModels, { type ModelDetail } from '@/components/security/MSeriesModels'
import ImageGallery from '@/components/security/ImageGallery'
import { getProductHero, HERO_MEDIA_BASE } from '@/data/product-heroes'
import { getSecurityContent, localize, NEED_KEYS, SECURITY_MEDIA, SECURITY_MODELS } from '@/data/security-solution'
import { getInspectionContent } from '@/data/inspection-solution'
import { getProduct } from '@/lib/sanity'
import { landingPagesForSolution } from '@/data/landing-pages'
import { pageSeo } from '@/lib/page-seo'
import { generateFAQSchema, generateServiceSchema } from '@/lib/structured-data'

// The full M-series page for inspection and security. A static route, so it
// wins over solutions/[slug] (which leaves this slug out of its static params);
// the Sanity solution document with slug "inspection-security" only feeds the
// solutions grid and the sitemap. Copy: src/data/inspection-solution.ts.
// Features, applications and spec tables are read from the Sanity products.

type Props = { params: Promise<{ locale: string }> }

const PATH = '/solutions/inspection-security'
const CONTACT = '/contact?subject=Inspection%20robots'
const MODELS_ID = 'models'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const c = getInspectionContent(locale as Locale)
  return pageSeo({
    title: c.meta.title,
    description: c.meta.description,
    path: PATH,
    locale,
    ogImage: '/images/security/m1-patrol.jpg',
    ogImageWidth: 1447,
    ogImageHeight: 766,
  })
}

export const revalidate = 3600

export default async function InspectionSecurityPage({ params }: Props) {
  const { locale } = await params
  const loc = locale as Locale
  const c = getInspectionContent(loc)
  const sec = getSecurityContent(loc)
  const hero = getProductHero('inspection', loc)
  const base = localize(SECURITY_MODELS, loc)
  const nf = new Intl.NumberFormat(loc === 'de' ? 'de-DE' : 'en-GB')
  const L = c.models.labels

  // Product data is optional: the page still renders its key figures if Sanity is unreachable.
  const products = await Promise.all(base.map((m) => getProduct(m.slug, loc).catch(() => null)))
  const models: ModelDetail[] = base.map((m, i) => {
    const p = products[i]
    return {
      slug: m.slug,
      name: m.name,
      series: m.series,
      drive: m.drive === 'walk' ? L.walk : L.wl,
      image: m.image,
      imageAlt: `${m.name} (${loc === 'de' ? 'Rendering' : 'rendering'})`,
      tagline: p?.tagline || m.tag,
      figs: [
        { label: L.weight, value: `${nf.format(m.weight)} kg` },
        { label: L.payload, value: `${nf.format(m.payload)} kg` },
        { label: L.speed, value: `${nf.format(m.speed)} m/s` },
        { label: L.endurance, value: m.enduranceLabel },
        { label: L.obstacle, value: `${nf.format(m.obstacle)} cm` },
        { label: L.ip, value: m.ip },
      ],
      features: p?.features ?? [],
      applications: p?.applications ?? [],
      specs: (p?.specifications ?? []).map((s) => ({ label: s.label, value: s.value })),
    }
  })
  const modelName = Object.fromEntries(base.map((m) => [m.slug, m.name]))
  const series = (['m1', 'm40', 'm100'] as const).map((k) => ({ key: k, ...c.models.series[k] }))
  const media = (id: string, ext: 'mp4' | 'jpg') => `${HERO_MEDIA_BASE}${SECURITY_MEDIA}/${id}.${ext}`

  return (
    <div className="min-h-screen pt-16 bg-[color:var(--mr-paper)]">
      <StructuredData
        data={[
          generateServiceSchema({ name: c.meta.serviceName, description: c.meta.description, path: PATH, locale }),
          generateFAQSchema(c.faq.items.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />

      {hero && (
        <HeroParallax>
          <ProductHeroSlider
            hero={hero}
            productName="M series"
            locale={locale}
            labels={{
              carousel: c.hero.carousel,
              chooseSlide: c.hero.chooseSlide,
              useCases: c.hero.useCases,
              pause: c.hero.pause,
              play: c.hero.play,
            }}
            actions={
              <>
                <Link href={CONTACT} className="ind-btn-primary">
                  <Mail className="w-4 h-4" />
                  {c.hero.ctaPrimary}
                </Link>
                <a href={`#${MODELS_ID}`} className="ind-btn-secondary">
                  {c.hero.ctaSecondary}
                </a>
              </>
            }
          />
        </HeroParallax>
      )}

      {/* Intro */}
      <section className="py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            className="mb-10"
            items={[
              { name: c.meta.crumbSolutions, href: '/solutions' },
              { name: c.meta.crumb, href: PATH },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
            <div>
              <SectionHeader as="h1" eyebrow={c.intro.eyebrow} title={c.intro.title} />
              <p data-reveal className="-mt-4 text-lg md:text-xl leading-relaxed text-[color:var(--mr-ink)] max-w-2xl">
                {c.intro.lead}
              </p>
              <p data-reveal className="mt-5 text-base leading-relaxed text-[color:var(--mr-ink-2)] max-w-2xl">
                {c.intro.body}
              </p>
              <dl data-reveal className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--mr-radius-sm)] border border-[color:var(--mr-line)] bg-[color:var(--mr-line)] sm:grid-cols-4 max-w-2xl">
                {c.intro.facts.map((f) => (
                  <div key={f.label} className="border-t-2 border-[color:var(--mr-orange)] bg-[color:var(--mr-white)] p-4">
                    <dd className="text-xl font-semibold tracking-tight text-[color:var(--mr-ink)]">{f.value}</dd>
                    <dt className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[color:var(--mr-steel)]">{f.label}</dt>
                  </div>
                ))}
              </dl>
            </div>
            <figure data-reveal className="relative mx-auto w-full max-w-lg">
              <Parallax range={-56} className="absolute inset-x-4 bottom-10 top-10" innerClassName="h-full">
                <div
                  className="h-full rounded-[var(--mr-radius)] bg-[radial-gradient(120%_90%_at_50%_10%,#ffffff_0%,var(--mr-paper-2)_70%)] shadow-[var(--mr-shadow)]"
                  aria-hidden="true"
                />
              </Parallax>
              <Parallax range={70} className="relative">
                <Image
                  src={c.intro.images[0].src}
                  alt={c.intro.images[0].alt}
                  width={1144}
                  height={1125}
                  sizes="(min-width: 1024px) 32rem, 90vw"
                  className="h-auto w-full"
                  priority
                />
              </Parallax>
              <figcaption className="relative mt-2 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--mr-steel)]">
                {c.intro.imageCaption}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="py-16 md:py-24 ind-section-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader tone="dark" eyebrow={c.jobs.eyebrow} title={c.jobs.title} subtitle={c.jobs.subtitle} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.jobs.items.map((j) => (
              <article key={j.title} data-reveal className="ind-card flex flex-col">
                <span className="flex h-11 w-11 items-center justify-center rounded-[var(--mr-radius-sm)] bg-[color:var(--mr-orange-soft)] text-[color:var(--mr-orange-ink)]">
                  <LucideIcon name={j.icon} className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="ind-h3 mt-4 text-[color:var(--mr-ink)]">{j.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{j.body}</p>
                <p className="mt-auto pt-4 text-xs leading-relaxed text-[color:var(--mr-steel)]">
                  <span className="font-mono uppercase tracking-[0.1em] text-[color:var(--mr-orange-ink)]">{c.jobs.withLabel}:</span>{' '}
                  {j.with}
                </p>
                {'href' in j && j.href && (
                  <Link
                    href={j.href}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--mr-accent-ink)] hover:underline"
                  >
                    {j.linkLabel}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* All models */}
      <section
        id={MODELS_ID}
        className="scroll-mt-20 py-16 md:py-24 bg-[color:var(--mr-white)] border-b border-[color:var(--mr-line)]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.models.eyebrow} title={c.models.title} subtitle={c.models.subtitle} />
          <MSeriesModels
            series={series}
            models={models}
            sectionId={MODELS_ID}
            labels={{
              chooseSeries: L.chooseSeries,
              chooseModel: L.chooseModel,
              features: L.features,
              applications: L.applications,
              specs: L.specs,
              productPage: L.productPage,
              request: L.request,
              rendering: L.rendering,
            }}
          />

          {/* M1 variants */}
          <div className="mt-16">
            <h3 data-reveal className="text-xl md:text-2xl font-semibold text-[color:var(--mr-ink)]">
              {c.models.matrixTitle}
            </h3>
            <p data-reveal className="mt-2 text-sm text-[color:var(--mr-ink-2)]">
              {c.models.matrixLead}
            </p>
            <div className="mt-6 overflow-x-auto rounded-[var(--mr-radius-sm)] border border-[color:var(--mr-line)]">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-[color:var(--mr-line)] bg-[color:var(--mr-paper-2)]">
                    {c.models.matrixHead.map((h, i) => (
                      <th
                        key={h}
                        scope="col"
                        className={`px-4 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[color:var(--mr-steel)] ${i ? 'text-center' : 'text-left'}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.models.matrix.map((row) => (
                    <tr key={row[0]} className="border-b border-[color:var(--mr-line)] last:border-0">
                      <th scope="row" className="px-4 py-3 text-left font-medium text-[color:var(--mr-ink)]">
                        {row[0]}
                      </th>
                      {row.slice(1).map((v, i) => (
                        <td
                          key={i}
                          className={`px-4 py-3 text-center ${v === '✓' ? 'font-semibold text-[color:var(--mr-accent-ink)]' : v === '–' ? 'text-[color:var(--mr-steel)]' : 'text-[color:var(--mr-ink)]'}`}
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Videos */}
      <section className="py-16 md:py-24 ind-section-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader tone="dark" eyebrow={c.videos.eyebrow} title={c.videos.title} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {c.videos.items.map((v) => (
              <figure key={v.id} data-reveal>
                <div className="overflow-hidden rounded-[var(--mr-radius-sm)] border border-[color:var(--mr-line)] bg-black">
                  <video
                    className="aspect-video w-full object-contain"
                    src={media(v.id, 'mp4')}
                    poster={media(v.id, 'jpg')}
                    controls
                    muted
                    playsInline
                    preload="none"
                    aria-label={v.title}
                  />
                </div>
                <figcaption className="mt-2 font-mono text-xs uppercase tracking-[0.1em] text-[color:var(--mr-steel)]">{v.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Fields of use */}
      <section className="py-16 md:py-24 bg-[color:var(--mr-white)] border-y border-[color:var(--mr-line)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.cases.eyebrow} title={c.cases.title} subtitle={c.cases.subtitle} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.cases.items.map((k) => (
              <article key={k.title} data-reveal className="ind-card flex flex-col !p-0 overflow-hidden">
                <figure className="relative aspect-[16/10] bg-[color:var(--mr-paper-2)]">
                  <Image
                    src={k.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 26rem, (min-width: 768px) 45vw, 90vw"
                    className={k.fit === 'contain' ? 'object-contain p-4 bg-white' : 'object-cover'}
                  />
                  <figcaption className="absolute left-2 bottom-2 rounded-full bg-[color:var(--mr-dark)]/75 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white">
                    {k.caption}
                  </figcaption>
                </figure>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-[var(--mr-radius-sm)] bg-[color:var(--mr-orange-soft)] text-[color:var(--mr-orange-ink)]">
                      <LucideIcon name={k.icon} className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <h3 className="ind-h3 text-[color:var(--mr-ink)]">{k.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{k.body}</p>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                    {k.models.map((s) => (
                      <li key={s}>
                        <a
                          href={`#model-${s}`}
                          className="inline-flex min-h-[32px] items-center rounded-full border border-[color:var(--mr-accent-line)] px-3 font-mono text-xs text-[color:var(--mr-accent-ink)] transition-colors hover:bg-[color:var(--mr-accent-soft)]"
                        >
                          {modelName[s] ?? s}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment, options, payloads */}
      <section className="py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.equip.eyebrow} title={c.equip.title} subtitle={c.equip.subtitle} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {c.equip.series.map((s) => (
              <article key={s.name} data-reveal className="ind-card flex flex-col">
                <h3 className="ind-h3 text-[color:var(--mr-ink)]">{s.name}</h3>
                <h4 className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--mr-orange-ink)]">{c.equip.standardLabel}</h4>
                <ul className="mt-3 space-y-2">
                  {s.standard.map((x) => (
                    <li key={x} className="flex gap-2.5 text-sm leading-relaxed text-[color:var(--mr-ink)]">
                      <span className="mt-2 h-1 w-1 flex-none rounded-full bg-[color:var(--mr-orange)]" aria-hidden="true" />
                      {x}
                    </li>
                  ))}
                </ul>
                <h4 className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--mr-steel)]">{c.equip.optionsLabel}</h4>
                <ul className="mt-3 space-y-2">
                  {s.options.map((x) => (
                    <li key={x} className="flex gap-2.5 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">
                      <Plus className="mt-0.5 h-4 w-4 flex-none text-[color:var(--mr-steel)]" aria-hidden="true" />
                      {x}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 items-start">
            <div data-reveal>
              <h3 className="text-xl md:text-2xl font-semibold text-[color:var(--mr-ink)]">{c.equip.payloadsTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{c.equip.payloadsLead}</p>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
              {sec.payloads.items.map((p) => (
                <li key={p.title} data-reveal className="border-t-2 border-[color:var(--mr-orange-line)] pt-4">
                  <h4 className="text-base font-semibold text-[color:var(--mr-ink)]">{p.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-24 bg-[color:var(--mr-white)] border-y border-[color:var(--mr-line)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.gallery.eyebrow} title={c.gallery.title} subtitle={c.gallery.subtitle} />
          <ImageGallery
            feature
            items={c.gallery.items.map((g) => ({ src: g.src, alt: g.alt, caption: g.caption, bg: g.bg }))}
            labels={c.gallery.labels}
          />
          <p className="mt-6 text-xs leading-relaxed text-[color:var(--mr-steel)]">{c.gallery.note}</p>
        </div>
      </section>

      {/* Software and integration */}
      <section className="py-16 md:py-24 ind-section-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader tone="dark" eyebrow={c.software.eyebrow} title={c.software.title} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.software.items.map((s) => (
              <article key={s.title} data-reveal className="ind-card flex flex-col">
                <span className="flex h-11 w-11 items-center justify-center rounded-[var(--mr-radius-sm)] bg-[color:var(--mr-accent-soft)] text-[color:var(--mr-accent-ink)]">
                  <LucideIcon name={s.icon} className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="ind-h3 mt-4 text-[color:var(--mr-ink)]">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Finder + comparison */}
      <section id="finder" className="scroll-mt-20 py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.finder.eyebrow} title={c.finder.title} subtitle={c.finder.subtitle} />
          <MSeriesExplorer
            models={base}
            needKeys={NEED_KEYS}
            locale={locale}
            labels={{
              reset: sec.explorer.reset,
              countAll: sec.explorer.countAll,
              countSome: sec.explorer.countSome,
              empty: sec.explorer.empty,
              needs: sec.explorer.needs,
              drive: sec.explorer.drive,
              open: sec.explorer.open,
              compareTitle: sec.explorer.compareTitle,
              compareLead: sec.explorer.compareLead,
              cols: sec.explorer.cols,
              sortBy: sec.explorer.sortBy,
              foot: sec.explorer.foot,
            }}
          />
        </div>
      </section>

      {/* How we deliver */}
      <section className="py-16 md:py-24 bg-[color:var(--mr-white)] border-y border-[color:var(--mr-line)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={sec.steps.eyebrow} title={sec.steps.title} subtitle={sec.steps.subtitle} />
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {sec.steps.items.map((s, i) => (
              <li
                key={s.title}
                data-reveal
                style={{ ['--d' as string]: `${i * 60}ms` }}
                className="ind-card !p-5 flex flex-col"
              >
                <span className="ind-step-num !border-[color:var(--mr-orange-line)] !bg-[color:var(--mr-orange-soft)] !text-[color:var(--mr-orange-ink)]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 text-base font-semibold text-[color:var(--mr-ink)]">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Limits */}
      <section className="py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.limits.eyebrow} title={c.limits.title} />
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
            {c.limits.items.map((b, i) => (
              <li key={b.title} data-reveal className="flex gap-4">
                <span className="font-mono text-sm font-semibold text-[color:var(--mr-orange-ink)]">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-base font-semibold text-[color:var(--mr-ink)]">{b.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{b.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-3xl text-xs leading-relaxed text-[color:var(--mr-steel)]">{c.limits.oem}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-[color:var(--mr-white)] border-t border-[color:var(--mr-line)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.faq.eyebrow} title={c.faq.title} />
          <div className="divide-y divide-[color:var(--mr-line)] border-y border-[color:var(--mr-line)]">
            {c.faq.items.map((f) => (
              <details key={f.q} className="group py-1">
                <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-4 py-3 text-base font-semibold text-[color:var(--mr-ink)] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus
                    className="h-5 w-5 flex-none text-[color:var(--mr-orange-ink)] transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  />
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-sm">
            <Link
              href="/solutions/security"
              className="inline-flex items-center gap-1.5 font-semibold text-[color:var(--mr-accent-ink)] hover:underline"
            >
              {c.faq.related}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </p>
          <LandingPageLinks slugs={landingPagesForSolution('inspection-security')} className="mt-8 pt-4 border-t border-[color:var(--mr-line)]" />
        </div>
      </section>

      <CTASection
        eyebrow={c.cta.eyebrow}
        title={c.cta.title}
        body={c.cta.body}
        ctaLabel={c.cta.button}
        ctaHref={CONTACT}
        tone="dark"
      />
    </div>
  )
}
