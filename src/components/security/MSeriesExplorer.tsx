'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, ArrowUpDown, Check, RotateCcw } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import IpRatingText, { IpGuideLink } from '@/components/ip/IpRatingText'

// Robot finder + sortable comparison for the nine M-series models on
// /solutions/security. All copy and model data arrive already localized from
// src/data/security-solution.ts, so this file holds behaviour only.

export interface ExplorerModel {
  slug: string
  name: string
  series: string
  drive: string
  image: string
  tag: string
  weight: number
  payload: number
  speed: number
  endurance: number
  enduranceLabel: string
  obstacle: number
  ip: string
  needs: string[]
}

export interface ExplorerLabels {
  reset: string
  countAll: string
  countSome: string
  empty: string
  needs: Record<string, string>
  drive: Record<string, string>
  open: string
  compareTitle: string
  compareLead: string
  cols: Record<'model' | 'drive' | 'weight' | 'payload' | 'speed' | 'endurance' | 'obstacle' | 'ip', string>
  sortBy: string
  foot: string
}

type SortKey = 'name' | 'drive' | 'weight' | 'payload' | 'speed' | 'endurance' | 'obstacle' | 'ip'

interface Props {
  models: ExplorerModel[]
  needKeys: string[]
  labels: ExplorerLabels
  locale: string
}

export default function MSeriesExplorer({ models, needKeys, labels, locale }: Props) {
  const [picked, setPicked] = useState<string[]>([])
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: 'name', dir: 1 })

  const nf = useMemo(() => new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-GB'), [locale])
  const fits = (m: ExplorerModel) => picked.every((n) => m.needs.includes(n))
  const hits = models.filter(fits).length

  const toggle = (n: string) =>
    setPicked((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]))

  const order = useMemo(() => models.map((m) => m.slug), [models])
  const sorted = useMemo(() => {
    const rows = [...models]
    rows.sort((a, b) => {
      if (sort.key === 'name') return (order.indexOf(a.slug) - order.indexOf(b.slug)) * sort.dir
      const va = a[sort.key]
      const vb = b[sort.key]
      if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * sort.dir || order.indexOf(a.slug) - order.indexOf(b.slug)
      return String(va).localeCompare(String(vb)) * sort.dir || order.indexOf(a.slug) - order.indexOf(b.slug)
    })
    return rows
  }, [models, sort, order])

  const sortBy = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: (s.dir * -1) as 1 | -1 } : { key, dir: key === 'name' || key === 'drive' || key === 'ip' ? 1 : -1 }))

  const status = picked.length === 0 ? labels.countAll : labels.countSome.replace('{n}', String(hits))

  const cols: { key: SortKey; label: string; num?: boolean }[] = [
    { key: 'name', label: labels.cols.model },
    { key: 'drive', label: labels.cols.drive },
    { key: 'weight', label: labels.cols.weight, num: true },
    { key: 'payload', label: labels.cols.payload, num: true },
    { key: 'speed', label: labels.cols.speed, num: true },
    { key: 'endurance', label: labels.cols.endurance, num: true },
    { key: 'obstacle', label: labels.cols.obstacle, num: true },
    { key: 'ip', label: labels.cols.ip },
  ]

  return (
    <div>
      {/* Requirements */}
      <div data-reveal className="flex flex-wrap gap-2" role="group" aria-label={labels.compareTitle}>
        {needKeys.map((n) => {
          const on = picked.includes(n)
          return (
            <button
              key={n}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(n)}
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                on
                  ? 'border-[color:var(--mr-accent)] bg-[color:var(--mr-accent)] text-white'
                  : 'border-[color:var(--mr-line)] bg-[color:var(--mr-white)] text-[color:var(--mr-ink)] hover:border-[color:var(--mr-accent-line)]'
              }`}
            >
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-full border ${on ? 'border-white bg-white text-[color:var(--mr-accent-ink)]' : 'border-[color:var(--mr-line)]'}`}
                aria-hidden="true"
              >
                {on && <Check className="h-3 w-3" strokeWidth={3} />}
              </span>
              {labels.needs[n]}
            </button>
          )
        })}
        {picked.length > 0 && (
          <button
            type="button"
            onClick={() => setPicked([])}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[color:var(--mr-accent-ink)] hover:underline"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {labels.reset}
          </button>
        )}
      </div>

      <p aria-live="polite" className="mt-5 font-mono text-xs uppercase tracking-[0.12em] text-[color:var(--mr-orange-ink)]">
        {status}
      </p>
      {picked.length > 0 && hits === 0 && (
        <p className="mt-3 max-w-2xl rounded-[var(--mr-radius-sm)] border-l-4 border-[color:var(--mr-accent)] bg-[color:var(--mr-white)] p-4 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">
          {labels.empty}
        </p>
      )}

      {/* Model cards */}
      <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {models.map((m) => {
          const ok = fits(m)
          return (
            <li
              key={m.slug}
              className={`transition-[opacity,filter] duration-300 ${ok ? '' : 'opacity-35 grayscale'}`}
              aria-hidden={ok ? undefined : true}
            >
              <Link
                href={`/products/${m.slug}`}
                tabIndex={ok ? undefined : -1}
                className="ind-card group flex h-full flex-col !p-0 overflow-hidden"
              >
                <div className="relative aspect-[16/10] bg-[radial-gradient(120%_90%_at_50%_15%,#ffffff_0%,var(--mr-paper-2)_75%)]">
                  <Image
                    src={`${m.image}?w=640`}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 90vw"
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-[color:var(--mr-dark)]/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white">
                    {labels.drive[m.drive]}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="ind-h3 text-[color:var(--mr-ink)]">{m.name}</h3>
                    <span className="font-mono text-xs text-[color:var(--mr-steel)]">{m.ip}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{m.tag}</p>
                  <dl className="mt-4 grid grid-cols-4 gap-2 border-t border-[color:var(--mr-line)] pt-4 text-center">
                    {[
                      [labels.cols.weight, `${nf.format(m.weight)} kg`],
                      [labels.cols.payload, `${nf.format(m.payload)} kg`],
                      [labels.cols.speed, `${nf.format(m.speed)} m/s`],
                      [labels.cols.endurance.split(',')[0], `${nf.format(m.endurance)} h`],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-[10px] uppercase tracking-[0.08em] text-[color:var(--mr-steel)]">{k}</dt>
                        <dd className="mt-1 text-sm font-semibold text-[color:var(--mr-ink)]">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--mr-accent-ink)]">
                    {labels.open}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Comparison */}
      <div className="mt-16">
        <h3 data-reveal className="text-xl md:text-2xl font-semibold text-[color:var(--mr-ink)]">
          {labels.compareTitle}
        </h3>
        <p data-reveal className="mt-2 text-sm text-[color:var(--mr-ink-2)]">
          {labels.compareLead}
        </p>
        <div className="mt-6 overflow-x-auto rounded-[var(--mr-radius-sm)] border border-[color:var(--mr-line)] bg-[color:var(--mr-white)]">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-[color:var(--mr-line)] bg-[color:var(--mr-paper-2)]">
                {cols.map((c) => {
                  const active = sort.key === c.key
                  return (
                    <th
                      key={c.key}
                      scope="col"
                      aria-sort={active ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'}
                      className={`px-3 py-2 ${c.num ? 'text-right' : 'text-left'}`}
                    >
                      <button
                        type="button"
                        onClick={() => sortBy(c.key)}
                        title={`${labels.sortBy}: ${c.label}`}
                        className={`inline-flex min-h-[36px] items-center gap-1 font-mono text-[11px] uppercase tracking-[0.1em] ${
                          active ? 'text-[color:var(--mr-accent-ink)]' : 'text-[color:var(--mr-steel)] hover:text-[color:var(--mr-ink)]'
                        }`}
                      >
                        {c.label}
                        <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                      </button>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {sorted.map((m) => {
                const ok = fits(m)
                return (
                  <tr
                    key={m.slug}
                    className={`border-b border-[color:var(--mr-line)] last:border-0 transition-colors ${
                      ok && picked.length ? 'bg-[color:var(--mr-accent-soft)]' : ''
                    } ${ok ? '' : 'text-[color:var(--mr-steel)] opacity-60'}`}
                  >
                    <th scope="row" className="px-3 py-2.5 text-left font-semibold">
                      <Link href={`/products/${m.slug}`} className="text-[color:var(--mr-ink)] hover:text-[color:var(--mr-accent-ink)] hover:underline">
                        {m.name}
                      </Link>
                    </th>
                    <td className="px-3 py-2.5">{labels.drive[m.drive]}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{nf.format(m.weight)} kg</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{nf.format(m.payload)} kg</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{nf.format(m.speed)} m/s</td>
                    <td className="px-3 py-2.5 text-right tabular-nums whitespace-nowrap">{m.enduranceLabel}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums">{nf.format(m.obstacle)} cm</td>
                    <td className="px-3 py-2.5"><IpRatingText text={m.ip} /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-4xl text-xs leading-relaxed text-[color:var(--mr-steel)]">
          {labels.foot} <IpGuideLink />
        </p>
      </div>
    </div>
  )
}
