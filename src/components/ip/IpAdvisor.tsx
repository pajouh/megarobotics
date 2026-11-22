'use client'

import { useState } from 'react'
import { ArrowRight, Info } from 'lucide-react'

// "Which IP rating do I need?" for /ip-ratings: two single-choice questions and
// one switch give a minimum code. Immersion (7, 8) and jets (5, 6, 9) are
// separate tests in IEC 60529, so asking for both yields a double rating.

interface Option {
  digit: string
  label: string
}

interface Props {
  solidOptions: Option[]
  waterOptions: Option[]
  summaries: { solids: Record<string, string>; liquids: Record<string, string> }
  labels: {
    solidQ: string
    waterQ: string
    extraQ: string
    resultLabel: string
    openLab: string
    notes: { dual: string; ip68: string; indoor: string; general: string }
  }
}

export default function IpAdvisor({ solidOptions, waterOptions, summaries, labels }: Props) {
  const [s, setS] = useState('5')
  const [w, setW] = useState('4')
  const [jets, setJets] = useState(false)

  const immersion = w === '7' || w === '8'
  const dual = immersion && jets
  const code = dual ? `IP${s}6/IP${s}${w}` : `IP${s}${w}`
  const notes = [dual && labels.notes.dual, w === '8' && labels.notes.ip68, w === '0' && labels.notes.indoor, labels.notes.general].filter(Boolean) as string[]

  const group = (title: string, options: Option[], value: string, set: (v: string) => void, tone: 'orange' | 'teal') => (
    <fieldset>
      <legend className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--mr-steel)]">{title}</legend>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={title}>
        {options.map((o) => {
          const on = o.digit === value
          const active =
            tone === 'orange'
              ? 'border-[color:var(--mr-orange-ink)] bg-[color:var(--mr-orange-ink)] text-white'
              : 'border-[color:var(--mr-accent)] bg-[color:var(--mr-accent)] text-white'
          return (
            <button
              key={o.digit}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => set(o.digit)}
              className={`min-h-[44px] rounded-full border px-4 py-2 text-left text-sm font-medium transition-colors ${
                on ? active : 'border-[color:var(--mr-line)] bg-[color:var(--mr-white)] text-[color:var(--mr-ink)] hover:border-[color:var(--mr-accent-line)]'
              }`}
            >
              {o.label}
            </button>
          )
        })}
      </div>
    </fieldset>
  )

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
      <div className="space-y-8" role="group">
        {group(labels.solidQ, solidOptions, s, setS, 'orange')}
        {group(labels.waterQ, waterOptions, w, setW, 'teal')}
        {immersion && (
          <label className="flex min-h-[44px] cursor-pointer items-center gap-3 text-sm font-medium text-[color:var(--mr-ink)]">
            <input
              type="checkbox"
              checked={jets}
              onChange={(e) => setJets(e.target.checked)}
              className="h-5 w-5 rounded border-[color:var(--mr-line-strong)] accent-[color:var(--mr-accent)]"
            />
            {labels.extraQ}
          </label>
        )}
      </div>

      <div className="rounded-[var(--mr-radius)] border border-[color:var(--mr-line)] bg-[color:var(--mr-white)] p-6 shadow-[var(--mr-shadow)] sm:p-8" aria-live="polite">
        <div className="font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--mr-orange-ink)]">{labels.resultLabel}</div>
        <div key={code} className="ipx-flip mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[color:var(--mr-ink)] sm:text-5xl">
          {code}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[color:var(--mr-ink-2)]">
          {summaries.solids[s]}; {summaries.liquids[w]}
          {dual ? `; ${summaries.liquids['6']}` : ''}.
        </p>
        <ul className="mt-5 space-y-2.5">
          {notes.map((n) => (
            <li key={n} className="flex gap-2.5 text-xs leading-relaxed text-[color:var(--mr-ink-2)]">
              <Info className="mt-0.5 h-4 w-4 flex-none text-[color:var(--mr-accent-ink)]" aria-hidden="true" />
              {n}
            </li>
          ))}
        </ul>
        <a href={`#decode-${s}${w}`} className="ind-btn-primary mt-6">
          {labels.openLab}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
