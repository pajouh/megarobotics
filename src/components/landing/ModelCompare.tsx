'use client'

import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { Link } from '@/i18n/navigation'

// Filterable comparison table on the category buying pages. All copy and
// values arrive already localized from src/data/landing/<slug>.ts.

interface Row {
  slug: string
  name: string
  tags: string[]
  row: Record<string, string>
}

interface Props {
  models: Row[]
  filters: { key: string; label: string }[]
  cols: { key: string; label: string }[]
  labels: {
    filterLabel: string
    reset: string
    count: string
    empty: string
    scroll: string
    model: string
    foot: string
  }
}

export default function ModelCompare({ models, filters, cols, labels }: Props) {
  const [active, setActive] = useState<string[]>([])
  const shown = models.filter((m) => active.every((k) => m.tags.includes(k)))
  const toggle = (k: string) => setActive((a) => (a.includes(k) ? a.filter((x) => x !== k) : [...a, k]))

  return (
    <div>
      {filters.length > 0 && (
        <div role="group" aria-label={labels.filterLabel} className="flex flex-wrap items-center gap-2">
          {filters.map((f) => {
            const on = active.includes(f.key)
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(f.key)}
                className={`min-h-[44px] rounded-full border px-4 text-sm font-medium transition-colors ${
                  on
                    ? 'border-[color:var(--mr-accent-ink)] bg-[color:var(--mr-accent-ink)] text-white'
                    : 'border-[color:var(--mr-line-strong)] bg-[color:var(--mr-white)] text-[color:var(--mr-ink-2)] hover:border-[color:var(--mr-accent)]'
                }`}
              >
                {f.label}
              </button>
            )
          })}
          {active.length > 0 && (
            <button
              type="button"
              onClick={() => setActive([])}
              className="inline-flex min-h-[44px] items-center gap-1.5 px-3 text-sm font-medium text-[color:var(--mr-accent-ink)] hover:underline"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              {labels.reset}
            </button>
          )}
        </div>
      )}

      <p aria-live="polite" className="mt-4 text-sm text-[color:var(--mr-steel)]">
        {labels.count.replace('{shown}', String(shown.length)).replace('{total}', String(models.length))}
      </p>

      <div className="mt-3 overflow-x-auto rounded-[var(--mr-radius)] border border-[color:var(--mr-line)] bg-[color:var(--mr-white)]">
        <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[color:var(--mr-line)] bg-[color:var(--mr-paper-2)]">
              <th scope="col" className="sticky left-0 z-10 bg-[color:var(--mr-paper-2)] px-4 py-3 font-semibold text-[color:var(--mr-ink)]">
                {labels.model}
              </th>
              {cols.map((c) => (
                <th key={c.key} scope="col" className="px-4 py-3 font-semibold text-[color:var(--mr-ink)]">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((m) => (
              <tr key={m.slug} className="border-b border-[color:var(--mr-line)] last:border-b-0">
                <th scope="row" className="sticky left-0 z-10 bg-[color:var(--mr-white)] px-4 py-3 font-semibold">
                  <Link href={`/products/${m.slug}`} className="text-[color:var(--mr-accent-ink)] hover:underline">
                    {m.name}
                  </Link>
                </th>
                {cols.map((c) => (
                  <td key={c.key} className="px-4 py-3 tabular-nums text-[color:var(--mr-ink-2)]">
                    {m.row[c.key] ?? '–'}
                  </td>
                ))}
              </tr>
            ))}
            {shown.length === 0 && (
              <tr>
                <td colSpan={cols.length + 1} className="px-4 py-6 text-center text-[color:var(--mr-steel)]">
                  {labels.empty}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-[color:var(--mr-steel)] md:hidden">{labels.scroll}</p>
      <p className="mt-4 text-xs leading-relaxed text-[color:var(--mr-steel)]">{labels.foot}</p>
    </div>
  )
}
