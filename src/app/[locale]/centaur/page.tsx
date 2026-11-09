import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, Mail } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/config'
import ProductHeroSlider from '@/components/industrial/ProductHeroSlider'
import SectionHeader from '@/components/industrial/SectionHeader'
import CTASection from '@/components/industrial/CTASection'
import Parallax from '@/components/Parallax'
import { getProductHero, HERO_MEDIA_BASE } from '@/data/product-heroes'
import { CENTAUR_MEDIA, getCentaurContent } from '@/data/centaur'
import { pageSeo } from '@/lib/page-seo'

// Unlisted landing page: reachable only by typing /centaur. Nothing on the site
// links here, it is left out of the sitemap, and it is noindexed. See
// src/data/centaur.ts before linking it from anywhere.

type Props = { params: Promise<{ locale: string }> }

const CONTACT = '/contact?subject=CENTAUR-1'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const c = getCentaurContent(locale as Locale)
  return pageSeo({
    title: c.meta.title,
    description: c.meta.description,
    path: '/centaur',
    locale,
    noindex: true,
  })
}

export const revalidate = 3600

export default async function CentaurPage({ params }: Props) {
  const { locale } = await params
  const c = getCentaurContent(locale as Locale)
  const hero = getProductHero('centaur', locale as Locale)
  const media = (id: string, ext: 'mp4' | 'jpg') => `${HERO_MEDIA_BASE}${CENTAUR_MEDIA}/${id}.${ext}`

  return (
    <div className="min-h-screen pt-16 bg-[color:var(--mr-paper)]">
      {hero && (
        <ProductHeroSlider
          hero={hero}
          productName="CENTAUR-1"
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
              <a href="#fields" className="ind-btn-secondary">
                {c.hero.ctaSecondary}
              </a>
            </>
          }
        />
      )}

      {/* Intro */}
      <section className="py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
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
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-[color:var(--mr-accent-line)] bg-[color:var(--mr-accent-soft)] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.12em] text-[color:var(--mr-accent-ink)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--mr-accent)]" aria-hidden="true" />
              {c.intro.status}
            </p>
          </div>
          <div data-reveal className="relative mx-auto w-full max-w-md">
            {/* back layer drifts against the scroll, the robot rides ahead of it */}
            <Parallax range={-28} className="absolute inset-x-6 bottom-4 top-16" innerClassName="h-full">
              <div
                className="h-full rounded-[var(--mr-radius)] bg-[radial-gradient(120%_90%_at_50%_10%,#ffffff_0%,var(--mr-paper-2)_70%)] shadow-[var(--mr-shadow)]"
                aria-hidden="true"
              />
            </Parallax>
            <Parallax range={36} className="relative">
              <Image
                src={c.intro.image}
                alt={c.intro.imageAlt}
                width={1024}
                height={1536}
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="h-auto w-full mix-blend-multiply"
                priority
              />
            </Parallax>
          </div>
        </div>
      </section>

      {/* System */}
      <section className="py-16 md:py-24 ind-section-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader tone="dark" eyebrow={c.system.eyebrow} title={c.system.title} subtitle={c.system.body} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.system.figures.map((f) => (
              <article key={f.label} data-reveal className="ind-card-dark flex flex-col">
                <div className="font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--mr-steel-on-dark)]">{f.label}</div>
                <div className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight"><span className="mr-ink-gradient">{f.value}</span></div>
                <p className="mt-4 text-sm leading-relaxed text-[color:var(--mr-ink-on-dark)] opacity-85">{f.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-[color:var(--mr-steel-on-dark)]">{c.system.note}</p>
        </div>
      </section>

      {/* Operating modes */}
      <section className="py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.modes.eyebrow} title={c.modes.title} subtitle={c.modes.subtitle} />
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.modes.items.map((m, i) => (
              <li key={m.title} data-reveal className="ind-card flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--mr-accent-ink)]">
                    {locale === 'de' ? 'Modus' : 'Mode'} {String(i + 1).padStart(2, '0')}
                  </span>
                  <ModeGlyph mode={i} />
                </div>
                <h3 className="ind-h3 mt-4 text-[color:var(--mr-ink)]">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{m.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Parallax video band */}
      <section className="relative isolate h-[72vh] min-h-[420px] max-h-[760px] overflow-hidden bg-[color:var(--mr-dark)]">
        <Parallax fill overscan={18} range={12} unit="%" scale={1.08} className="absolute inset-0">
          <video
            className="h-full w-full object-cover"
            src={media(c.band.video, 'mp4')}
            poster={media(c.band.video, 'jpg')}
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
        <Parallax range={-48} className="relative h-full" innerClassName="h-full">
          <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
            <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--mr-accent-glow)]">
              <span className="inline-block w-8 h-px bg-[color:var(--mr-accent-glow)]" aria-hidden="true" />
              {c.band.eyebrow}
            </div>
            <p className="max-w-3xl font-[family-name:var(--font-display)] text-4xl md:text-6xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance text-white">
              {c.band.title}
            </p>
            <p className="mt-5 max-w-xl text-base md:text-lg text-white/80">{c.band.body}</p>
          </div>
        </Parallax>
      </section>

      {/* Fields of use */}
      <section id="fields" className="scroll-mt-20 py-16 md:py-24 bg-[color:var(--mr-white)] border-y border-[color:var(--mr-line)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.fields.eyebrow} title={c.fields.title} subtitle={c.fields.subtitle} />

          {c.fields.groups.map((g, gi) => (
            <div key={g.title} className={gi ? 'mt-16 md:mt-20' : ''}>
              <h3 data-reveal className="mb-6 flex items-baseline gap-3 text-xl md:text-2xl font-semibold text-[color:var(--mr-ink)]">
                <span className="font-mono text-sm text-[color:var(--mr-accent-ink)]">
                  {g.items[0].n}–{g.items[g.items.length - 1].n}
                </span>
                {g.title}
              </h3>

              <div
                data-reveal
                className={`mb-8 grid gap-3 ${g.images.length > 2 ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5' : 'grid-cols-1 sm:grid-cols-2'}`}
              >
                {g.images.map((im) => (
                  <figure
                    key={im.src}
                    className={`relative overflow-hidden rounded-[var(--mr-radius-sm)] bg-[color:var(--mr-paper-2)] ${
                      g.images.length > 2 ? 'aspect-[4/5]' : 'aspect-[16/10]'
                    }`}
                  >
                    <Parallax fill overscan={12} range={8} unit="%" scale={1.06} className="absolute inset-0">
                      <Image
                        src={im.src}
                        alt={im.alt}
                        fill
                        sizes={g.images.length > 2 ? '(min-width: 1024px) 20vw, 45vw' : '(min-width: 640px) 45vw, 90vw'}
                        className="object-cover"
                      />
                    </Parallax>
                    <figcaption className="absolute left-2 bottom-2 rounded-full bg-[color:var(--mr-dark)]/75 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white">
                      {im.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {g.items.map((f) => (
                  <article key={f.n} data-reveal className="ind-card flex flex-col">
                    <div className="font-mono text-sm text-[color:var(--mr-accent-ink)]">{f.n}</div>
                    <h4 className="ind-h3 mt-2 text-[color:var(--mr-ink)]">{f.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{f.body}</p>
                    {f.separated && (
                      <p className="mt-auto pt-4 text-xs leading-relaxed text-[color:var(--mr-steel)]">
                        <span className="font-mono uppercase tracking-[0.1em] text-[color:var(--mr-accent-ink)]">{c.fields.separatedLabel}:</span>{' '}
                        {f.separated}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Videos */}
      <section className="py-16 md:py-24 ind-section-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader tone="dark" eyebrow={c.videos.eyebrow} title={c.videos.title} subtitle={c.videos.subtitle} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.videos.items.map((v, i) => (
              <figure key={v.id} data-reveal className={i === 0 ? 'sm:col-span-2 lg:col-span-3' : ''}>
                <div className="overflow-hidden rounded-[var(--mr-radius-sm)] border border-[color:var(--mr-line-on-dark)] bg-black">
                  <video
                    className={`w-full object-cover ${i === 0 ? 'aspect-video lg:aspect-[21/9]' : 'aspect-video'}`}
                    src={media(v.id, 'mp4')}
                    poster={media(v.id, 'jpg')}
                    controls
                    muted
                    playsInline
                    preload="none"
                    aria-label={v.title}
                  />
                </div>
                <figcaption className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-[color:var(--mr-steel-on-dark)]">
                  {v.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* First applications + honest limits */}
      <section className="py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.cases.eyebrow} title={c.cases.title} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {c.cases.items.map((k) => (
              <article key={k.title} data-reveal className="ind-card flex flex-col">
                <div className="font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--mr-accent-ink)]">{k.tag}</div>
                <h3 className="ind-h3 mt-3 text-[color:var(--mr-ink)]">{k.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{k.body}</p>
              </article>
            ))}
          </div>

          <div data-reveal className="mt-10 rounded-[var(--mr-radius)] border-l-4 border-[color:var(--mr-accent)] bg-[color:var(--mr-white)] p-6 md:p-8 shadow-[var(--mr-shadow)]">
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--mr-accent-ink)]">{c.honest.eyebrow}</div>
            <h3 className="mt-2 text-xl md:text-2xl font-semibold text-[color:var(--mr-ink)]">{c.honest.title}</h3>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[color:var(--mr-ink-2)]">{c.honest.body}</p>
          </div>
        </div>
      </section>

      {/* Development & IP */}
      <section className="py-16 md:py-20 bg-[color:var(--mr-white)] border-t border-[color:var(--mr-line)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
          <SectionHeader eyebrow={c.ip.eyebrow} title={c.ip.title} />
          <div data-reveal>
            <p className="text-base leading-relaxed text-[color:var(--mr-ink-2)]">{c.ip.body}</p>
            <p className="mt-5 flex gap-3 rounded-[var(--mr-radius-sm)] bg-[color:var(--mr-accent-soft)] p-4 text-sm leading-relaxed text-[color:var(--mr-ink)]">
              <ArrowRight className="mt-0.5 h-4 w-4 flex-none text-[color:var(--mr-accent-ink)]" aria-hidden="true" />
              {c.ip.open}
            </p>
          </div>
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

      <p className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-xs leading-relaxed text-[color:var(--mr-steel)]">
        {c.disclaimer}
      </p>
    </div>
  )
}

/** Small line drawings of the four modes: compound, chassis alone, torso on a stand, torso on its hands. */
function ModeGlyph({ mode }: { mode: number }) {
  const torso = <path d="M20 4h8v6h-8zM18 11h12v8H18z" />
  const arms = <path d="M18 13l-5 5M30 13l5 5" />
  const chassis = <path d="M12 24h24v5H12zM14 29l-2 8M34 29l2 8M20 29v8M28 29v8" />
  return (
    <svg
      viewBox="0 0 48 40"
      className="ml-auto h-8 w-10 text-[color:var(--mr-accent-ink)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {mode === 0 && (
        <>
          {torso}
          {arms}
          <path d="M24 19v5" />
          {chassis}
        </>
      )}
      {mode === 1 && (
        <>
          <circle cx="24" cy="20" r="2" />
          {chassis}
        </>
      )}
      {mode === 2 && (
        <>
          {torso}
          {arms}
          <path d="M24 19v10M16 37h16M24 29v8" />
        </>
      )}
      {mode === 3 && (
        <g transform="translate(0 14)">
          <path d="M20 0h8v6h-8zM18 7h12v8H18z" />
          <path d="M18 9l-6 13M30 9l6 13" />
        </g>
      )}
    </svg>
  )
}
