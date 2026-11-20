import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, Mail, Plus } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/config'
import ProductHeroSlider from '@/components/industrial/ProductHeroSlider'
import SectionHeader from '@/components/industrial/SectionHeader'
import CTASection from '@/components/industrial/CTASection'
import LucideIcon from '@/components/industrial/LucideIcon'
import Breadcrumbs from '@/components/Breadcrumbs'
import StructuredData from '@/components/StructuredData'
import Parallax, { HeroParallax } from '@/components/Parallax'
import MSeriesExplorer from '@/components/security/MSeriesExplorer'
import ImageGallery from '@/components/security/ImageGallery'
import { getProductHero, HERO_MEDIA_BASE } from '@/data/product-heroes'
import {
  getSecurityContent,
  localize,
  NEED_KEYS,
  SECURITY_MEDIA,
  SECURITY_MODELS,
} from '@/data/security-solution'
import { pageSeo } from '@/lib/page-seo'
import { generateFAQSchema, generateServiceSchema } from '@/lib/structured-data'

// Public security solution page. A static route, so it wins over
// solutions/[slug]; that page leaves the "security" slug out of its static
// params. The Sanity solution document with slug "security" only feeds the
// solutions grid and the sitemap. Content: src/data/security-solution.ts.

type Props = { params: Promise<{ locale: string }> }

const PATH = '/solutions/security'
const CONTACT = '/contact?subject=Security%20robots'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const c = getSecurityContent(locale as Locale)
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

export default async function SecuritySolutionPage({ params }: Props) {
  const { locale } = await params
  const loc = locale as Locale
  const c = getSecurityContent(loc)
  const hero = getProductHero('security', loc)
  const models = localize(SECURITY_MODELS, loc)
  const modelName = Object.fromEntries(models.map((m) => [m.slug, m.name]))
  const band = `${HERO_MEDIA_BASE}${SECURITY_MEDIA}/${c.band.video}`

  return (
    <div className="min-h-screen pt-16 bg-[color:var(--mr-paper)]">
      <StructuredData
        data={[
          generateServiceSchema({
            name: c.meta.serviceName,
            description: c.meta.description,
            path: PATH,
            locale,
          }),
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
                <a href="#finder" className="ind-btn-secondary">
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
              <p
                data-reveal
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-[color:var(--mr-orange-line)] bg-[color:var(--mr-orange-soft)] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.12em] text-[color:var(--mr-orange-ink)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--mr-orange)]" aria-hidden="true" />
                {c.intro.status}
              </p>
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
                  src={c.intro.image}
                  alt={c.intro.imageAlt}
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

      {/* Why */}
      <section className="py-16 md:py-24 ind-section-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader tone="dark" eyebrow={c.why.eyebrow} title={c.why.title} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.why.items.map((w) => (
              <article
                key={w.n}
                data-reveal
                className="rounded-[var(--mr-radius)] border border-[color:var(--mr-line)] border-t-[3px] border-t-[color:var(--mr-orange)] bg-[color:var(--mr-white)] p-6 shadow-[var(--mr-shadow)]"
              >
                <div className="font-mono text-sm font-semibold text-[color:var(--mr-orange-ink)]">{w.n}</div>
                <h3 className="ind-h3 mt-3 text-[color:var(--mr-ink-on-dark)]">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--mr-steel-on-dark)]">{w.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What the robot does on the round */}
      <section className="py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.round.eyebrow} title={c.round.title} subtitle={c.round.subtitle} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.round.items.map((r) => (
              <article key={r.title} data-reveal className="ind-card flex flex-col">
                <span className="flex h-11 w-11 items-center justify-center rounded-[var(--mr-radius-sm)] bg-[color:var(--mr-orange-soft)] text-[color:var(--mr-orange-ink)]">
                  <LucideIcon name={r.icon} className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="ind-h3 mt-4 text-[color:var(--mr-ink)]">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{r.body}</p>
                <p className="mt-auto pt-4 text-xs leading-relaxed text-[color:var(--mr-steel)]">
                  <span className="font-mono uppercase tracking-[0.1em] text-[color:var(--mr-orange-ink)]">
                    {c.round.availableLabel}:
                  </span>{' '}
                  {r.available}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax video band: real M40 footage */}
      <section className="relative isolate h-[min(56.25vw,88vh)] min-h-[440px] overflow-hidden bg-[color:var(--mr-dark)]">
        <Parallax fill overscan={10} range={8} unit="%" scale={1.06} className="absolute inset-0">
          <video
            className="h-full w-full object-cover"
            src={`${band}.mp4`}
            poster={`${band}.jpg`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        </Parallax>
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,27,32,0.86)_0%,rgba(13,27,32,0.55)_45%,rgba(13,27,32,0.1)_100%)]"
          aria-hidden="true"
        />
        <Parallax range={-110} className="relative h-full" innerClassName="h-full">
          <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
            <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[#fdba74]">
              <span className="inline-block w-8 h-px bg-[#fdba74]" aria-hidden="true" />
              {c.band.eyebrow}
            </div>
            <p className="max-w-3xl font-[family-name:var(--font-display)] text-4xl md:text-6xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance text-white">
              {c.band.title}
            </p>
            <p className="mt-5 max-w-xl text-base md:text-lg text-white/80">{c.band.body}</p>
          </div>
        </Parallax>
      </section>

      {/* Use cases */}
      <section
        id="use-cases"
        className="scroll-mt-20 py-16 md:py-24 bg-[color:var(--mr-white)] border-b border-[color:var(--mr-line)]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.cases.eyebrow} title={c.cases.title} subtitle={c.cases.subtitle} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.cases.items.map((k) => (
              <article key={k.title} data-reveal className="ind-card flex flex-col !p-0 overflow-hidden">
                <figure className="relative aspect-[16/10] bg-[radial-gradient(120%_90%_at_50%_15%,#ffffff_0%,var(--mr-paper-2)_75%)]">
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
                  <h3 className="ind-h3 text-[color:var(--mr-ink)]">{k.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{k.body}</p>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                    {k.models.map((s) => (
                      <li key={s}>
                        <Link
                          href={`/products/${s}`}
                          className="inline-flex min-h-[32px] items-center rounded-full border border-[color:var(--mr-accent-line)] px-3 font-mono text-xs text-[color:var(--mr-accent-ink)] transition-colors hover:bg-[color:var(--mr-accent-soft)]"
                        >
                          {modelName[s] ?? s}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Series */}
      <section className="py-16 md:py-24 ind-section-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader tone="dark" eyebrow={c.series.eyebrow} title={c.series.title} subtitle={c.series.subtitle} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {c.series.items.map((s) => (
              <Link
                key={s.key}
                href={s.href}
                data-reveal
                className="group flex flex-col overflow-hidden rounded-[var(--mr-radius)] border border-[color:var(--mr-line-on-dark)] bg-white/[0.04] transition-colors hover:border-[color:var(--mr-accent)]"
              >
                <div className="relative aspect-[16/11] bg-[radial-gradient(110%_90%_at_50%_20%,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.55)_60%,rgba(255,255,255,0.15)_100%)]">
                  <Image
                    src={`${s.image}?w=720`}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 30vw, 90vw"
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="absolute right-3 top-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--mr-steel)]">
                    {c.series.rendering}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--mr-orange-ink)]">{s.kicker}</div>
                  <h3 className="ind-h3 mt-2 text-[color:var(--mr-ink-on-dark)]">{s.name}</h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-[color:var(--mr-steel-on-dark)]">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 flex-none rounded-full bg-[color:var(--mr-orange)]" aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-[color:var(--mr-accent-ink)]">
                    {c.series.more}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Finder + comparison */}
      <section id="finder" className="scroll-mt-20 py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.explorer.eyebrow} title={c.explorer.title} subtitle={c.explorer.subtitle} />
          <MSeriesExplorer
            models={models}
            needKeys={NEED_KEYS}
            locale={locale}
            labels={{
              reset: c.explorer.reset,
              countAll: c.explorer.countAll,
              countSome: c.explorer.countSome,
              empty: c.explorer.empty,
              needs: c.explorer.needs,
              drive: c.explorer.drive,
              open: c.explorer.open,
              compareTitle: c.explorer.compareTitle,
              compareLead: c.explorer.compareLead,
              cols: c.explorer.cols,
              sortBy: c.explorer.sortBy,
              foot: c.explorer.foot,
            }}
          />
        </div>
      </section>

      {/* Sensors and payloads */}
      <section className="py-16 md:py-24 ind-section-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader tone="dark" eyebrow={c.payloads.eyebrow} title={c.payloads.title} subtitle={c.payloads.subtitle} />
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {c.payloads.items.map((p) => (
              <li key={p.title} data-reveal className="border-t-2 border-[color:var(--mr-orange-line)] pt-4">
                <h3 className="text-base font-semibold text-[color:var(--mr-ink-on-dark)]">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--mr-steel-on-dark)]">{p.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 md:mt-16">
            <ImageGallery
              columns={3}
              items={c.payloads.gallery.map((g) => ({ src: g.src, alt: g.alt, caption: g.caption, bg: g.bg }))}
              labels={c.payloads.galleryLabels}
            />
            <p className="mt-5 text-xs leading-relaxed text-[color:var(--mr-steel-on-dark)]">{c.payloads.galleryNote}</p>
          </div>
        </div>
      </section>

      {/* Integration and operation */}
      <section className="py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.operate.eyebrow} title={c.operate.title} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {c.operate.items.map((o) => (
              <article key={o.title} data-reveal className="ind-card flex flex-col">
                <span className="flex h-11 w-11 items-center justify-center rounded-[var(--mr-radius-sm)] bg-[color:var(--mr-accent-soft)] text-[color:var(--mr-accent-ink)]">
                  <LucideIcon name={o.icon} className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="ind-h3 mt-4 text-[color:var(--mr-ink)]">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{o.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Before you deploy */}
      <section className="py-16 md:py-24 bg-[color:var(--mr-white)] border-y border-[color:var(--mr-line)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.before.eyebrow} title={c.before.title} />
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
            {c.before.items.map((b, i) => (
              <li key={b.title} data-reveal className="flex gap-4">
                <span className="font-mono text-sm font-semibold text-[color:var(--mr-orange-ink)]">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-base font-semibold text-[color:var(--mr-ink)]">{b.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{b.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* How we deliver */}
      <section className="py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.steps.eyebrow} title={c.steps.title} subtitle={c.steps.subtitle} />
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {c.steps.items.map((s, i) => (
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
              href="/solutions/inspection-security"
              className="inline-flex items-center gap-1.5 font-semibold text-[color:var(--mr-accent-ink)] hover:underline"
            >
              {c.faq.related}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </p>
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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
        <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--mr-steel)]">{c.fine.eyebrow}</h2>
        <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-[color:var(--mr-steel)]">
          {c.fine.items.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
