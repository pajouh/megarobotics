'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Check, ChevronDown, Mail } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import IpRatingText from '@/components/ip/IpRatingText'

// Series tabs → model tabs → one detail panel per model, for
// /solutions/inspection-security. Features, applications and the spec table
// come from the Sanity products; copy arrives localized from
// src/data/inspection-solution.ts. A link to #model-<slug> anywhere on the page
// selects that model and scrolls the section into view.

export interface ModelDetail {
  slug: string
  name: string
  series: string
  drive: string
  image: string
  imageAlt: string
  tagline: string
  figs: { label: string; value: string }[]
  features: string[]
  applications: string[]
  specs: { label: string; value: string }[]
}

export interface SeriesInfo {
  key: string
  name: string
  kicker: string
  lead: string
}

interface Labels {
  chooseSeries: string
  chooseModel: string
  features: string
  applications: string
  specs: string
  productPage: string
  request: string
  rendering: string
}

interface Props {
  series: SeriesInfo[]
  models: ModelDetail[]
  labels: Labels
  sectionId: string
}

export default function MSeriesModels({ series, models, labels, sectionId }: Props) {
  const [slug, setSlug] = useState(models[0]?.slug ?? '')
  const [specsOpen, setSpecsOpen] = useState(false)
  const model = models.find((m) => m.slug === slug) ?? models[0]
  const active = series.find((s) => s.key === model.series) ?? series[0]

  useEffect(() => {
    const fromHash = () => {
      const m = /^#model-(.+)$/.exec(window.location.hash)
      if (!m || !models.some((x) => x.slug === m[1])) return
      setSlug(m[1])
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [models, sectionId])

  const pick = (s: string) => {
    setSlug(s)
    if (window.location.hash.startsWith('#model-')) history.replaceState(null, '', `#model-${s}`)
  }

  return (
    <div>
      {/* Series */}
      <div role="tablist" aria-label={labels.chooseSeries} className="grid grid-cols-3 gap-2 sm:gap-3">
        {series.map((s) => {
          const on = s.key === active.key
          return (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => pick(models.find((m) => m.series === s.key)!.slug)}
              className={`rounded-[var(--mr-radius-sm)] border px-3 py-3 text-left transition-colors sm:px-5 sm:py-4 ${
                on
                  ? 'border-[color:var(--mr-accent)] bg-[color:var(--mr-accent)] text-white'
                  : 'border-[color:var(--mr-line)] bg-[color:var(--mr-white)] text-[color:var(--mr-ink)] hover:border-[color:var(--mr-accent-line)]'
              }`}
            >
              <span className="block text-base font-semibold sm:text-lg">{s.name}</span>
              <span className={`mt-0.5 hidden text-xs sm:block ${on ? 'text-white/85' : 'text-[color:var(--mr-steel)]'}`}>
                {s.kicker}
              </span>
            </button>
          )
        })}
      </div>

      <p className="mt-6 max-w-3xl text-base leading-relaxed text-[color:var(--mr-ink-2)]"><IpRatingText text={active.lead} /></p>

      {/* Models of the series */}
      <div role="tablist" aria-label={labels.chooseModel} className="mt-6 flex flex-wrap gap-2">
        {models
          .filter((m) => m.series === active.key)
          .map((m) => {
            const on = m.slug === model.slug
            return (
              <button
                key={m.slug}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => pick(m.slug)}
                className={`inline-flex min-h-[44px] items-center rounded-full border px-5 text-sm font-semibold transition-colors ${
                  on
                    ? 'border-[color:var(--mr-orange-ink)] bg-[color:var(--mr-orange-ink)] text-white'
                    : 'border-[color:var(--mr-line)] bg-[color:var(--mr-white)] text-[color:var(--mr-ink)] hover:border-[color:var(--mr-accent-line)]'
                }`}
              >
                {m.name}
              </button>
            )
          })}
      </div>

      {/* Detail */}
      <article
        key={model.slug}
        role="tabpanel"
        aria-label={model.name}
        className="mt-6 overflow-hidden rounded-[var(--mr-radius)] border border-[color:var(--mr-line)] bg-[color:var(--mr-white)] shadow-[var(--mr-shadow)]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr]">
          <figure className="relative min-h-[260px] bg-[radial-gradient(120%_90%_at_50%_15%,#ffffff_0%,var(--mr-paper-2)_75%)] sm:min-h-[340px]">
            <Image
              src={`${model.image}?w=1000`}
              alt={model.imageAlt}
              fill
              sizes="(min-width: 1024px) 36rem, 92vw"
              className="object-contain p-6 sm:p-10"
            />
            <figcaption className="absolute left-3 bottom-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--mr-steel)]">
              {labels.rendering}
            </figcaption>
            <span className="absolute left-3 top-3 rounded-full bg-[color:var(--mr-dark)]/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white">
              {model.drive}
            </span>
          </figure>

          <div className="p-6 sm:p-8">
            <h3 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[color:var(--mr-ink)] sm:text-4xl">
              {model.name}
            </h3>
            <p className="mt-2 text-base leading-relaxed text-[color:var(--mr-ink-2)]">{model.tagline}</p>

            <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--mr-radius-sm)] border border-[color:var(--mr-line)] bg-[color:var(--mr-line)] sm:grid-cols-3">
              {model.figs.map((f) => (
                <div key={f.label} className="bg-[color:var(--mr-white)] p-3">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-[color:var(--mr-steel)]">{f.label}</dt>
                  <dd className="mt-1 text-lg font-semibold text-[color:var(--mr-ink)]"><IpRatingText text={f.value} /></dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/contact?${new URLSearchParams({ inquiry: 'availability', product: model.name })}`} className="ind-btn-primary">
                <Mail className="h-4 w-4" />
                {labels.request}
              </Link>
              <Link href={`/products/${model.slug}`} className="ind-btn-secondary">
                {labels.productPage}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 border-t border-[color:var(--mr-line)] p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr]">
          {model.features.length > 0 && (
            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--mr-orange-ink)]">{labels.features}</h4>
              <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {model.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm leading-relaxed text-[color:var(--mr-ink)]">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-[color:var(--mr-accent-ink)]" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {model.applications.length > 0 && (
            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--mr-orange-ink)]">{labels.applications}</h4>
              <ul className="mt-4 space-y-2.5">
                {model.applications.map((a) => (
                  <li key={a} className="flex gap-2.5 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">
                    <span className="mt-2 h-1 w-1 flex-none rounded-full bg-[color:var(--mr-orange)]" aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {model.specs.length > 0 && (
          <div className="border-t border-[color:var(--mr-line)]">
            <button
              type="button"
              aria-expanded={specsOpen}
              onClick={() => setSpecsOpen((o) => !o)}
              className="flex min-h-[56px] w-full items-center justify-between gap-4 px-6 text-left text-sm font-semibold text-[color:var(--mr-ink)] hover:bg-[color:var(--mr-paper)] sm:px-8"
            >
              {labels.specs} · {model.name}
              <ChevronDown
                className={`h-5 w-5 flex-none text-[color:var(--mr-accent-ink)] transition-transform ${specsOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
            {specsOpen && (
              <dl className="grid grid-cols-1 gap-x-10 px-6 pb-6 sm:px-8 md:grid-cols-2">
                {model.specs.map((s) => (
                  <div key={s.label} className="flex gap-4 border-t border-[color:var(--mr-line)] py-2.5">
                    <dt className="w-2/5 flex-none font-mono text-[0.68rem] uppercase tracking-[0.08em] text-[color:var(--mr-steel)]">{s.label}</dt>
                    <dd className="text-sm font-medium text-[color:var(--mr-ink)]"><IpRatingText text={s.value} /></dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        )}
      </article>
    </div>
  )
}
