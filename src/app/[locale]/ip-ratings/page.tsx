import type { Metadata } from 'next'
import { ArrowRight, Check, ChevronRight, Plus, X as XIcon } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/config'
import SectionHeader from '@/components/industrial/SectionHeader'
import CTASection from '@/components/industrial/CTASection'
import LucideIcon from '@/components/industrial/LucideIcon'
import StructuredData from '@/components/StructuredData'
import IpLab from '@/components/ip/IpLab'
import IpAdvisor from '@/components/ip/IpAdvisor'
import IpHeroCode from '@/components/ip/IpHeroCode'
import { COMMON_CODES, getIpContent, LIQUID_KEYS, SOLID_KEYS } from '@/data/ip-ratings'
import { pageSeo } from '@/lib/page-seo'
import { generateBreadcrumbSchema, generateFAQSchema, localizedUrl } from '@/lib/structured-data'

// IP ratings reference: a general explainer of the IP code (IEC 60529) with an
// interactive decoder. Other pages can deep-link to a rating (#ip67) or open
// the decoder on a code (#decode-67). Content: src/data/ip-ratings.ts.

type Props = { params: Promise<{ locale: string }> }

const PATH = '/ip-ratings'
const CONTACT = '/contact?subject=IP%20rating'
const PUBLISHED = '2026-11-22'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const c = getIpContent(locale as Locale)
  return {
    ...pageSeo({ title: c.meta.title, description: c.meta.description, path: PATH, locale, ogType: 'article' }),
    keywords: c.meta.keywords,
  }
}

export const revalidate = 86400

/** Two-tone code: first digit orange, second teal. */
function Code({ code, className = '' }: { code: string; className?: string }) {
  return (
    <span className={`font-[family-name:var(--font-display)] font-semibold tracking-tight ${className}`}>
      <span className="text-[color:var(--mr-steel)]">IP</span>
      <span className="text-[color:var(--mr-orange-ink)]">{code[0]}</span>
      <span className="text-[color:var(--mr-accent-ink)]">{code[1]}</span>
    </span>
  )
}

const cell = 'block px-4 py-1.5 md:table-cell md:py-4 md:align-top'

export default async function IpRatingsPage({ params }: Props) {
  const { locale } = await params
  const loc = locale as Locale
  const c = getIpContent(loc)
  const url = localizedUrl(PATH, locale)
  const solidRows = SOLID_KEYS.filter((k) => k !== 'X')
  const liquidRows = LIQUID_KEYS.filter((k) => k !== 'X')
  const summaries = {
    solids: Object.fromEntries(SOLID_KEYS.map((k) => [k, c.solids.items[k].summary])),
    liquids: Object.fromEntries(LIQUID_KEYS.map((k) => [k, c.water.items[k].summary])),
  }
  const heroExamples = ['54', '65', '67', '68', '69'].map((code) => ({
    code,
    solid: c.solids.items[code[0] as '5' | '6'].detail,
    liquid: c.water.items[code[1] as '4' | '5' | '7' | '8' | '9'].detail,
  }))

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: c.meta.headline,
    description: c.meta.description,
    inLanguage: loc === 'de' ? 'de-DE' : 'en',
    url,
    mainEntityOfPage: url,
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    author: { '@type': 'Organization', name: 'MegaRobotics', url: 'https://www.megarobotics.de' },
    publisher: { '@type': 'Organization', name: 'MegaRobotics', url: 'https://www.megarobotics.de' },
    about: [
      { '@type': 'Thing', name: 'IP code', sameAs: 'https://en.wikipedia.org/wiki/IP_code' },
      { '@type': 'Thing', name: 'IEC 60529' },
    ],
    keywords: c.meta.keywords.join(', '),
  }
  const termSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: c.meta.headline,
    url,
    hasDefinedTerm: c.common.items.map((r) => ({
      '@type': 'DefinedTerm',
      name: `IP${r.code}`,
      termCode: `IP${r.code}`,
      description: r.means,
      url: `${url}#ip${r.code}`,
    })),
  }

  return (
    <div className="min-h-screen pt-16 bg-[color:var(--mr-paper)]">
      <StructuredData
        data={[
          articleSchema,
          termSchema,
          generateFAQSchema(c.faq.items.map((f) => ({ question: f.q, answer: f.a }))),
          generateBreadcrumbSchema(
            [
              { name: loc === 'de' ? 'Startseite' : 'Home', href: '/' },
              { name: c.meta.crumb, href: PATH },
            ],
            locale,
          ),
        ]}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#081317] text-white">
        <div className="ipx-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_60%_40%,#000_20%,transparent_75%)]" aria-hidden="true" />
        <div className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(249,115,22,0.22),transparent)]" aria-hidden="true" />
        <div className="absolute -right-32 -top-24 h-[620px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(47,224,208,0.2),transparent)]" aria-hidden="true" />
        {/* falling streaks: water on the right, dust motes on the left */}
        <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true">
          {[8, 19, 31, 47, 58, 69, 78, 86, 93].map((left, i) => (
            <span
              key={left}
              className="ipx-rain absolute top-0 block w-px bg-[linear-gradient(180deg,transparent,rgba(108,201,255,0.75),transparent)]"
              style={{ left: `${left}%`, height: `${18 + (i % 4) * 7}%`, animationDelay: `${-i * 0.37}s`, animationDuration: `${2.2 + (i % 3) * 0.6}s` }}
            />
          ))}
        </div>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.15fr_1fr] lg:px-8">
          <div>
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/60">
              <ol className="flex items-center gap-1">
                <li>
                  <Link href="/" className="hover:text-white">
                    {loc === 'de' ? 'Startseite' : 'Home'}
                  </Link>
                </li>
                <li className="flex items-center gap-1">
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  <span className="text-white/90">{c.meta.crumb}</span>
                </li>
              </ol>
            </nav>
            <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[#fdba74]">
              <span className="inline-block h-px w-8 bg-[#fdba74]" aria-hidden="true" />
              {c.hero.eyebrow}
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.04] tracking-[-0.03em] text-balance sm:text-6xl lg:text-7xl">
              {c.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">{c.hero.lead}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#lab" className="ind-btn-primary">
                {c.hero.ctaLab}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#common"
                className="inline-flex items-center gap-2 rounded-[var(--mr-radius-sm)] border border-white/25 px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:border-white/60"
              >
                {c.hero.ctaChart}
              </a>
            </div>
            <dl className="mt-12 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
              {c.hero.stats.map((s) => (
                <div key={s.label} className="border-t border-white/15 pt-3">
                  <dd className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">{s.value}</dd>
                  <dt className="mt-1 text-xs leading-snug text-white/60">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
          <IpHeroCode examples={heroExamples} label={c.hero.cycleLabel} />
        </div>
      </section>

      {/* On this page */}
      <nav aria-label={c.toc.label} className="border-b border-[color:var(--mr-line)] bg-[color:var(--mr-white)]">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          <span className="flex-none font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--mr-steel)]">{c.toc.label}</span>
          {c.toc.items.map((t) => (
            <a
              key={t.href}
              href={t.href}
              className="inline-flex min-h-[36px] flex-none items-center rounded-full border border-[color:var(--mr-line)] px-3.5 text-sm text-[color:var(--mr-ink)] transition-colors hover:border-[color:var(--mr-orange-line)] hover:text-[color:var(--mr-orange-ink)]"
            >
              {t.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Anatomy */}
      <section id="anatomy" className="scroll-mt-20 py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader as="h2" eyebrow={c.anatomy.eyebrow} title={c.anatomy.title} />
          <p data-reveal className="-mt-4 max-w-3xl text-base leading-relaxed text-[color:var(--mr-ink-2)] md:text-lg">
            {c.anatomy.body}
          </p>
          <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.anatomy.parts.map((p, i) => (
              <li
                key={p.token}
                data-reveal
                style={{ ['--d' as string]: `${i * 80}ms` }}
                className={`ind-card flex flex-col border-t-[3px] ${
                  i === 1 ? 'border-t-[color:var(--mr-orange)]' : i === 2 ? 'border-t-[color:var(--mr-accent)]' : 'border-t-[color:var(--mr-line-strong)]'
                }`}
              >
                <span
                  className={`font-[family-name:var(--font-display)] text-6xl font-semibold leading-none ${
                    i === 1 ? 'text-[color:var(--mr-orange-ink)]' : i === 2 ? 'text-[color:var(--mr-accent-ink)]' : 'text-[color:var(--mr-steel)]'
                  }`}
                >
                  {p.token}
                </span>
                <h3 className="ind-h3 mt-5 text-[color:var(--mr-ink)]">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{p.body}</p>
              </li>
            ))}
          </ol>
          <p
            data-reveal
            className="mt-8 flex max-w-3xl gap-3 rounded-[var(--mr-radius-sm)] border-l-4 border-[color:var(--mr-orange)] bg-[color:var(--mr-white)] p-4 text-sm leading-relaxed text-[color:var(--mr-ink)] shadow-[var(--mr-shadow)]"
          >
            <span className="font-[family-name:var(--font-display)] text-2xl font-semibold leading-none text-[color:var(--mr-orange-ink)]">X</span>
            {c.anatomy.xNote}
          </p>
        </div>
      </section>

      {/* Lab */}
      <section id="lab" className="scroll-mt-20 py-16 md:py-24 ind-section-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader tone="dark" eyebrow={c.lab.eyebrow} title={c.lab.title} subtitle={c.lab.subtitle} />
          <IpLab
            solids={c.solids.items}
            liquids={c.water.items}
            solidKeys={SOLID_KEYS}
            liquidKeys={LIQUID_KEYS}
            common={COMMON_CODES}
            labels={c.lab}
          />
        </div>
      </section>

      {/* First digit */}
      <section id="solids" className="scroll-mt-20 py-16 md:py-24 bg-[color:var(--mr-white)] border-y border-[color:var(--mr-line)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.solids.eyebrow} title={c.solids.title} subtitle={c.solids.subtitle} />
          <figure data-reveal className="mb-12 rounded-[var(--mr-radius)] border border-[color:var(--mr-line)] bg-[color:var(--mr-paper)] p-5 sm:p-8">
            <figcaption className="font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--mr-orange-ink)]">{c.solids.scaleTitle}</figcaption>
            <ul className="mt-6 grid grid-cols-2 items-end gap-x-4 gap-y-8 sm:grid-cols-5">
              {c.solids.scale.map((p) => (
                <li key={p.code} className="flex flex-col items-center text-center">
                  <span className="flex h-[124px] items-end justify-center">
                    {p.mm ? (
                      <span
                        className="block rounded-full bg-[radial-gradient(circle_at_35%_30%,#fdba74,#c2410c)] shadow-[0_6px_14px_-6px_rgba(194,65,12,0.7)]"
                        style={{ width: Math.max(2.5, p.mm * 2.4), height: Math.max(2.5, p.mm * 2.4) }}
                        aria-hidden="true"
                      />
                    ) : (
                      <span
                        className="block h-10 w-24 [background-image:radial-gradient(#c2410c_0.7px,transparent_1px)] [background-size:5px_5px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_72%)]"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                  <span className="mt-3 text-sm font-semibold text-[color:var(--mr-ink)]">{p.label}</span>
                  <span className="font-mono text-xs text-[color:var(--mr-steel)]">{p.code}</span>
                </li>
              ))}
            </ul>
          </figure>
          <table className="block w-full text-sm md:table">
            <caption className="sr-only">{c.solids.title}</caption>
            <thead className="hidden md:table-header-group">
              <tr className="border-b-2 border-[color:var(--mr-ink)] text-left">
                {c.solids.cols.map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[color:var(--mr-steel)]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="block md:table-row-group">
              {solidRows.map((k) => {
                const r = c.solids.items[k]
                return (
                  <tr key={k} id={`ip${k}x`} data-reveal className="block scroll-mt-24 border-b border-[color:var(--mr-line)] py-4 md:table-row md:py-0">
                    <th scope="row" className={`${cell} whitespace-nowrap text-left font-[family-name:var(--font-display)] text-3xl font-semibold text-[color:var(--mr-orange-ink)]`}>
                      <span className="text-base font-medium text-[color:var(--mr-steel)]">IP</span>
                      {k}
                      <span className="text-base font-medium text-[color:var(--mr-steel)]">X</span>
                    </th>
                    <td className={`${cell} font-semibold text-[color:var(--mr-ink)] md:w-48`}>{r.name}</td>
                    <td className={`${cell} leading-relaxed text-[color:var(--mr-ink-2)]`}>{r.detail}</td>
                    <td className={`${cell} leading-relaxed text-[color:var(--mr-ink-2)] md:w-[32%]`}>{r.test}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Second digit */}
      <section id="water" className="scroll-mt-20 py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.water.eyebrow} title={c.water.title} subtitle={c.water.subtitle} />
          <table className="block w-full text-sm md:table">
            <caption className="sr-only">{c.water.title}</caption>
            <thead className="hidden md:table-header-group">
              <tr className="border-b-2 border-[color:var(--mr-ink)] text-left">
                {c.water.cols.map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[color:var(--mr-steel)]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="block md:table-row-group">
              {liquidRows.map((k) => {
                const r = c.water.items[k]
                return (
                  <tr key={k} id={`ipx${k}`} data-reveal className="block scroll-mt-24 border-b border-[color:var(--mr-line)] py-4 md:table-row md:py-0">
                    <th scope="row" className={`${cell} whitespace-nowrap text-left font-[family-name:var(--font-display)] text-3xl font-semibold text-[color:var(--mr-accent-ink)]`}>
                      <span className="text-base font-medium text-[color:var(--mr-steel)]">IPX</span>
                      {k}
                    </th>
                    <td className={`${cell} font-semibold text-[color:var(--mr-ink)] md:w-48`}>{r.name}</td>
                    <td className={`${cell} leading-relaxed text-[color:var(--mr-ink-2)]`}>{r.detail}</td>
                    <td className={`${cell} leading-relaxed text-[color:var(--mr-ink-2)] md:w-[32%]`}>{r.test}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Common ratings */}
      <section id="common" className="scroll-mt-20 py-16 md:py-24 bg-[color:var(--mr-white)] border-y border-[color:var(--mr-line)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.common.eyebrow} title={c.common.title} subtitle={c.common.subtitle} />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {c.common.items.map((r) => (
              <article key={r.code} id={`ip${r.code}`} data-reveal className="ind-card flex scroll-mt-24 flex-col target:border-[color:var(--mr-orange)] target:shadow-[var(--mr-shadow-lift)]">
                <div className="flex items-start justify-between gap-3">
                  <h3>
                    <Code code={r.code} className="text-5xl" />
                    {r.code === '69' && <span className="ml-1 font-mono text-sm text-[color:var(--mr-steel)]">/ IP69K</span>}
                  </h3>
                  <a
                    href={`#decode-${r.code}`}
                    className="inline-flex min-h-[36px] flex-none items-center gap-1 rounded-full border border-[color:var(--mr-orange-line)] px-3 text-xs font-semibold text-[color:var(--mr-orange-ink)] transition-colors hover:bg-[color:var(--mr-orange-soft)]"
                  >
                    {c.common.decode}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.1em] text-[color:var(--mr-steel)]">{r.tag}</p>
                <p className="mt-4 text-sm leading-relaxed text-[color:var(--mr-ink)]">{r.means}</p>
                <dl className="mt-auto space-y-3 pt-5 text-sm">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--mr-accent-ink)]">{c.common.usesLabel}</dt>
                    <dd className="mt-1 leading-relaxed text-[color:var(--mr-ink-2)]">{r.uses}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--mr-orange-ink)]">{c.common.limitLabel}</dt>
                    <dd className="mt-1 leading-relaxed text-[color:var(--mr-ink-2)]">{r.limit}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Advisor */}
      <section id="advisor" className="scroll-mt-20 py-16 md:py-24 ind-section-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader tone="dark" eyebrow={c.advisor.eyebrow} title={c.advisor.title} subtitle={c.advisor.subtitle} />
          <IpAdvisor
            solidOptions={c.advisor.solidOptions}
            waterOptions={c.advisor.waterOptions}
            summaries={summaries}
            labels={{
              solidQ: c.advisor.solidQ,
              waterQ: c.advisor.waterQ,
              extraQ: c.advisor.extraQ,
              resultLabel: c.advisor.resultLabel,
              openLab: c.advisor.openLab,
              notes: c.advisor.notes,
            }}
          />
        </div>
      </section>

      {/* Myths */}
      <section id="myths" className="scroll-mt-20 py-16 md:py-24 bg-[color:var(--mr-white)] border-y border-[color:var(--mr-line)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.myths.eyebrow} title={c.myths.title} />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {c.myths.items.map((m) => (
              <article key={m.myth} data-reveal className="ind-card flex flex-col">
                <div className="flex gap-3">
                  <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-[color:var(--mr-orange-soft)] text-[color:var(--mr-orange-ink)]">
                    <XIcon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--mr-orange-ink)]">{c.myths.mythLabel}</div>
                    <h3 className="mt-1 text-base font-semibold leading-snug text-[color:var(--mr-ink)]">{m.myth}</h3>
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-[color:var(--mr-accent-soft)] text-[color:var(--mr-accent-ink)]">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--mr-accent-ink)]">{c.myths.factLabel}</div>
                    <p className="mt-1 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{m.fact}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Letters */}
      <section id="letters" className="scroll-mt-20 py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.letters.eyebrow} title={c.letters.title} subtitle={c.letters.subtitle} />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <article data-reveal className="ind-card">
              <h3 className="ind-h3 text-[color:var(--mr-ink)]">{c.letters.additionalTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{c.letters.additionalLead}</p>
              <dl className="mt-5 divide-y divide-[color:var(--mr-line)] border-t border-[color:var(--mr-line)]">
                {c.letters.additional.map((l) => (
                  <div key={l.letter} className="flex items-center gap-4 py-3">
                    <dt className="w-8 font-[family-name:var(--font-display)] text-2xl font-semibold text-[color:var(--mr-orange-ink)]">{l.letter}</dt>
                    <dd className="flex-1 text-sm font-medium text-[color:var(--mr-ink)]">{l.meaning}</dd>
                    <dd className="text-right font-mono text-xs text-[color:var(--mr-steel)]">{l.probe}</dd>
                  </div>
                ))}
              </dl>
            </article>
            <article data-reveal className="ind-card">
              <h3 className="ind-h3 text-[color:var(--mr-ink)]">{c.letters.supplementaryTitle}</h3>
              <dl className="mt-5 divide-y divide-[color:var(--mr-line)] border-t border-[color:var(--mr-line)]">
                {c.letters.supplementary.map((l) => (
                  <div key={l.letter} className="flex items-center gap-4 py-3">
                    <dt className="w-8 font-[family-name:var(--font-display)] text-2xl font-semibold text-[color:var(--mr-accent-ink)]">{l.letter}</dt>
                    <dd className="flex-1 text-sm font-medium text-[color:var(--mr-ink)]">{l.meaning}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-xs leading-relaxed text-[color:var(--mr-steel)]">{c.letters.kNote}</p>
            </article>
          </div>
        </div>
      </section>

      {/* Beyond the code */}
      <section className="py-16 md:py-24 bg-[color:var(--mr-white)] border-y border-[color:var(--mr-line)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.beyond.eyebrow} title={c.beyond.title} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.beyond.items.map((b) => (
              <article key={b.title} data-reveal className="flex gap-4 rounded-[var(--mr-radius-sm)] border border-[color:var(--mr-line)] p-5">
                <span className="grid h-11 w-11 flex-none place-items-center rounded-[var(--mr-radius-sm)] bg-[color:var(--mr-orange-soft)] text-[color:var(--mr-orange-ink)]">
                  <LucideIcon name={b.icon} className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-[color:var(--mr-ink)]">{b.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{b.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* NEMA */}
      <section id="nema" className="scroll-mt-20 py-16 md:py-24 ind-section-light">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:px-8">
          <div>
            <SectionHeader eyebrow={c.nema.eyebrow} title={c.nema.title} />
            <p data-reveal className="-mt-4 text-base leading-relaxed text-[color:var(--mr-ink-2)]">
              {c.nema.body}
            </p>
          </div>
          <div data-reveal className="overflow-x-auto rounded-[var(--mr-radius-sm)] border border-[color:var(--mr-line)] bg-[color:var(--mr-white)]">
            <table className="w-full min-w-[420px] text-sm">
              <caption className="sr-only">{c.nema.title}</caption>
              <thead>
                <tr className="border-b border-[color:var(--mr-line)] bg-[color:var(--mr-paper-2)] text-left">
                  {c.nema.cols.map((h) => (
                    <th key={h} scope="col" className="px-4 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[color:var(--mr-steel)]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.nema.rows.map((r) => (
                  <tr key={r.type} className="border-b border-[color:var(--mr-line)] last:border-0">
                    <th scope="row" className="px-4 py-3 text-left font-semibold text-[color:var(--mr-ink)]">
                      {r.type}
                    </th>
                    <td className="px-4 py-3 font-mono font-semibold text-[color:var(--mr-orange-ink)]">{r.ip}</td>
                    <td className="px-4 py-3 text-[color:var(--mr-ink-2)]">{r.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Robotics */}
      <section className="relative isolate overflow-hidden bg-[#081317] py-16 text-white md:py-24">
        <div className="ipx-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_20%_50%,#000_10%,transparent_70%)]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
          <div>
            <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[#fdba74]">
              <span className="inline-block h-px w-8 bg-[#fdba74]" aria-hidden="true" />
              {c.robots.eyebrow}
            </div>
            <h2 className="ind-h2 text-white">{c.robots.title}</h2>
            <p className="mt-5 text-base leading-relaxed text-white/80 md:text-lg">{c.robots.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {c.robots.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-[var(--mr-radius-sm)] border border-white/25 px-5 text-sm font-semibold text-white transition-colors hover:border-white/60"
                >
                  {l.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-white/55">{c.robots.examplesLabel}</div>
            <ul className="space-y-3">
              {c.robots.examples.map((e) => (
                <li key={e.name}>
                  <Link
                    href={e.href}
                    className="group flex items-center gap-5 rounded-[var(--mr-radius)] border border-white/12 bg-white/[0.04] p-5 transition-colors hover:border-[#f97316]"
                  >
                    <span className="font-[family-name:var(--font-display)] text-4xl font-semibold">
                      <span className="text-white/45">IP</span>
                      <span className="text-[#fdba74]">{e.code[2]}</span>
                      <span className="text-[#2fe0d0]">{e.code[3]}</span>
                    </span>
                    <span className="flex-1">
                      <span className="block text-base font-semibold text-white">{e.name}</span>
                      <span className="block text-sm text-white/65">{e.note}</span>
                    </span>
                    <ArrowRight className="h-5 w-5 text-white/50 transition-transform group-hover:translate-x-1 group-hover:text-white" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-white/50">{c.robots.examplesNote}</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 py-16 md:py-24 bg-[color:var(--mr-white)] border-b border-[color:var(--mr-line)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow={c.faq.eyebrow} title={c.faq.title} />
          <div className="divide-y divide-[color:var(--mr-line)] border-y border-[color:var(--mr-line)]">
            {c.faq.items.map((f) => (
              <details key={f.q} className="group py-1">
                <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-4 py-3 text-base font-semibold text-[color:var(--mr-ink)] [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-semibold">{f.q}</h3>
                  <Plus className="h-5 w-5 flex-none text-[color:var(--mr-orange-ink)] transition-transform group-open:rotate-45" aria-hidden="true" />
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="py-12 ind-section-light">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--mr-steel)]">{c.sources.title}</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">
            {c.sources.items.map((s) => (
              <li key={s} className="flex gap-2.5">
                <span className="mt-2 h-1 w-1 flex-none rounded-full bg-[color:var(--mr-orange)]" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-[color:var(--mr-steel)]">{c.sources.note}</p>
        </div>
      </section>

      <CTASection eyebrow={c.cta.eyebrow} title={c.cta.title} body={c.cta.body} ctaLabel={c.cta.button} ctaHref={CONTACT} tone="dark" />
    </div>
  )
}
