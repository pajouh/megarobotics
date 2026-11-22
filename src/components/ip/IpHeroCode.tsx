'use client'

import { useEffect, useState } from 'react'

// The cycling code in the hero of /ip-ratings: steps through common ratings and
// shows what each one means in a line. Stops cycling on hover, focus and when
// the visitor prefers reduced motion.

interface Example {
  code: string
  solid: string
  liquid: string
}

export default function IpHeroCode({ examples, label }: { examples: Example[]; label: string }) {
  const [i, setI] = useState(0)
  const [hold, setHold] = useState(false)

  useEffect(() => {
    if (hold || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setI((n) => (n + 1) % examples.length), 2600)
    return () => clearInterval(id)
  }, [hold, examples.length])

  const ex = examples[i]
  return (
    <div
      className="relative mx-auto w-full max-w-md"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
    >
      <div className="ipx-ring absolute -inset-6 rounded-[36px] border border-[rgba(47,224,208,0.25)]" aria-hidden="true" />
      <div className="ipx-ring absolute -inset-12 rounded-[48px] border border-[rgba(249,115,22,0.18)] [animation-delay:1.2s]" aria-hidden="true" />
      <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-[linear-gradient(160deg,rgba(255,255,255,0.09),rgba(255,255,255,0.02))] p-6 backdrop-blur-sm sm:p-8">
        <div className="ipx-scan pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(47,224,208,0.16),transparent)]" aria-hidden="true" />
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">{label}</div>
        <a href={`#decode-${ex.code}`} className="mt-3 flex items-baseline gap-1 font-[family-name:var(--font-display)] text-7xl font-semibold leading-none tracking-tight sm:text-8xl" aria-live="polite">
          <span className="text-white/45">IP</span>
          <span key={`s${i}`} className="ipx-flip inline-block text-[#fdba74]">{ex.code[0]}</span>
          <span key={`w${i}`} className="ipx-flip inline-block text-[#2fe0d0] [animation-delay:90ms]">{ex.code[1]}</span>
        </a>
        <dl key={i} className="ipx-fade mt-6 space-y-3 text-sm">
          <div className="flex gap-3">
            <dt className="mt-1 h-2 w-2 flex-none rounded-full bg-[#f97316]" aria-hidden="true" />
            <dd className="text-white/90">{ex.solid}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="mt-1 h-2 w-2 flex-none rounded-full bg-[#2fe0d0]" aria-hidden="true" />
            <dd className="text-white/90">{ex.liquid}</dd>
          </div>
        </dl>
        <div className="mt-6 flex gap-1.5" role="tablist" aria-label={label}>
          {examples.map((e, n) => (
            <button
              key={e.code}
              type="button"
              role="tab"
              aria-selected={n === i}
              aria-label={`IP${e.code}`}
              onClick={() => setI(n)}
              className="group grid h-6 flex-1 place-items-center"
            >
              <span className={`block h-1 w-full rounded-full transition-colors ${n === i ? 'bg-[#f97316]' : 'bg-white/20 group-hover:bg-white/40'}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
