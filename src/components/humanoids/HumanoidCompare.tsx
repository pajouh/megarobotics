'use client'

import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { FilterKey, LocalizedHumanoid } from '@/data/humanoid-robots'

// Filterable comparison table on /pages/humanoid-robots. All copy and values
// arrive already localized from src/data/humanoid-robots.ts.

type Row = Pick<LocalizedHumanoid, 'slug' | 'name' | 'tags' | 'row'>
type Col = keyof LocalizedHumanoid['row']

interface Props {
  models: Row[]
  filterKeys: readonly FilterKey[]
  labels: {
    filters: Record<FilterKey, string>
    filterLabel: string
    reset: string
    count: string
    empty: string
    scroll: string
    cols: Record<'model' | Col, string>
    foot: string
  }
}

const COLS: Col[] = ['drive', 'height', 'weight', 'dof', 'payload', 'speed', 'runtime']

export default function HumanoidCompare({ models, filterKeys, labels }: Props) {
  const [active, setActive] = useState<FilterKey[]>([])
  const shown = models.filter((m) => active.every((k) => m.tags.includes(k)))
  const toggle = (k: FilterKey) => setActive((a) => (a.includes(k) ? a.filter((x) => x !== k) : [...a, k]))

  return (
    <div>
      <div role="group" aria-label={labels.filterLabel} className="flex flex-wrap items-center gap-2">
        {filterKeys.map((k) => {
          const on = active.includes(k)
          return (
            <button
              key={k}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(k)}
              className={`min-h-[44px] rounded-full border px-4 text-sm font-medium transition-colors ${
                on
                  ? 'border-[color:var(--mr-accent-ink)] bg-[color:var(--mr-accent-ink)] text-white'
                  : 'border-[color:var(--mr-line-strong)] bg-[color:var(--mr-white)] text-[color:var(--mr-ink-2)] hover:border-[color:var(--mr-accent)]'
              }`}
            >
              {labels.filters[k]}
            </button>
          )
        })}
        {active.length > 0 && (
          <button
            type="button"
            onClick={() => setActive([])}
            className="inline-flex min-h-[44px] items-center gap-1.5 px-3 text-sm font-semibold text-[color:var(--mr-accent-ink)] hover:underline"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {labels.reset}
          </button>
        )}
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-[color:var(--mr-steel)]">
        {labels.count.replace('{n}', String(shown.length)).replace('{total}', String(models.length))}
      </p>

      {shown.length === 0 ? (
        <p className="mt-4 rounded-[var(--mr-radius)] border border-[color:var(--mr-line)] bg-[color:var(--mr-white)] p-6 text-sm text-[color:var(--mr-ink-2)]">
          {labels.empty}
        </p>
      ) : (
        <>
          <p className="mt-2 text-xs text-[color:var(--mr-steel)] xl:hidden">{labels.scroll}</p>
          <div
            tabIndex={0}
            role="region"
            aria-label={labels.cols.model}
            className="mt-3 overflow-x-auto rounded-[var(--mr-radius)] border border-[color:var(--mr-line)] bg-[color:var(--mr-white)] shadow-[var(--mr-shadow)]"
          >
            <table className="w-full min-w-[64rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[color:var(--mr-line-strong)]">
                  <th scope="col" className="sticky left-0 z-10 bg-[color:var(--mr-white)] px-4 py-3 font-semibold text-[color:var(--mr-ink)]">
                    {labels.cols.model}
                  </th>
                  {COLS.map((c) => (
                    <th key={c} scope="col" className="px-3 py-3 font-semibold text-[color:var(--mr-ink)]">
                      {labels.cols[c]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shown.map((m) => (
                  <tr key={m.slug} className="border-b border-[color:var(--mr-line)] last:border-0">
                    <th scope="row" className="sticky left-0 z-10 min-w-[8.5rem] bg-[color:var(--mr-white)] px-4 py-3 align-top font-semibold sm:min-w-[13rem]">
                      <Link href={`/products/${m.slug}`} className="text-[color:var(--mr-accent-ink)] hover:underline">
                        {m.name}
                      </Link>
                    </th>
                    {COLS.map((c) => (
                      <td key={c} className="px-3 py-3 align-top tabular-nums text-[color:var(--mr-ink-2)]">
                        {m.row[c]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <p className="mt-4 max-w-3xl text-xs leading-relaxed text-[color:var(--mr-steel)]">{labels.foot}</p>
    </div>
  )
}
