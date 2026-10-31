'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { FlagshipItem } from './types'
import s from './Catalog.module.css'

interface Labels {
  eyebrow: string
  title: string
  prev: string
  next: string
  discover: string
  inMotion: string
}

function formatValue(value: number | string, decimals?: number) {
  return typeof value === 'number' && decimals ? value.toFixed(decimals) : String(value)
}

/** One flagship card. Cards with footage show the poster and play the clip on hover. */
function Flagship({ item, labels, index }: { item: FlagshipItem; labels: Labels; index: number }) {
  const video = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const dark = Boolean(item.poster)

  const play = useCallback(() => {
    const v = video.current
    if (!v || !item.video) return
    if (!v.src) v.src = item.video
    // The pointer may leave before the clip has loaded; only show it if still playing.
    v.play()
      .then(() => setPlaying(!v.paused))
      .catch(() => {})
  }, [item.video])

  const stop = useCallback(() => {
    const v = video.current
    if (!v) return
    v.pause()
    setPlaying(false)
  }, [])

  return (
    <div className={s.flagWrap} data-reveal style={{ '--d': `${Math.min(index, 4) * 70}ms` } as React.CSSProperties}>
    <Link
      href={`/products/${item.slug}`}
      className={`${s.flag} ${dark ? s.flagDark : ''}`}
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
    >
      <div className={s.flagMedia} aria-hidden="true">
        {item.poster ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element -- self-hosted poster on media.megarobotics.de */}
            <img className={s.flagPoster} src={item.poster} alt="" loading="lazy" decoding="async" />
            <video ref={video} className={`${s.flagVideo} ${playing ? s.playing : ''}`} muted loop playsInline preload="none" />
          </>
        ) : item.tall || item.image ? (
          // eslint-disable-next-line @next/next/no-img-element -- Sanity CDN URL already sized on the server
          <img className={s.flagImg} src={item.tall || item.image} alt="" loading="lazy" decoding="async" />
        ) : null}
      </div>

      <div className={s.flagTop}>
        <span className={s.flagBrand}>
          {item.brand?.logo ? (
            // eslint-disable-next-line @next/next/no-img-element -- small local logo
            <img src={item.brand.logo} alt={item.brand.name} />
          ) : (
            <span>{item.brand?.name}</span>
          )}
        </span>
        {item.video && (
          <span className={s.flagPlay}>
            <i aria-hidden="true" />
            {labels.inMotion}
          </span>
        )}
      </div>

      <div className={s.flagBody}>
        {item.family && <div className={s.flagFamily}>{item.family.title}</div>}
        <h3 className={s.flagName}>{item.name}</h3>
        {item.tagline && <p className={s.flagTag}>{item.tagline}</p>}
        {item.specs.length > 0 && (
          <div className={s.flagSpecs}>
            {item.specs.slice(0, 3).map((sp) => (
              <div key={sp.label} className={s.flagSpec}>
                <div className={s.flagSpecValue}>
                  {sp.prefix}
                  {formatValue(sp.value, sp.decimals)}
                  {sp.unit && <small>{sp.unit}</small>}
                </div>
                <div className={s.flagSpecLabel}>{sp.label}</div>
              </div>
            ))}
          </div>
        )}
        <span className={s.flagCta}>
          {labels.discover} <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
    </div>
  )
}

export default function FlagshipRail({ items, labels }: { items: FlagshipItem[]; labels: Labels }) {
  const rail = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [edges, setEdges] = useState({ start: true, end: false })

  const measure = useCallback(() => {
    const el = rail.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const p = max > 0 ? el.scrollLeft / max : 1
    setProgress(p)
    setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft > max - 4 })
  }, [])

  // Fires once on mount and again whenever the rail changes size.
  useEffect(() => {
    const el = rail.current
    if (!el) return
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [measure])

  const page = (dir: 1 | -1) => {
    const el = rail.current
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8
    const perPage = Math.max(1, Math.floor(el.clientWidth / step) - 1)
    el.scrollBy({ left: dir * step * perPage, behavior: 'smooth' })
  }

  if (!items.length) return null

  // Visible share of the rail, so the progress bar thumb has a sensible size.
  const thumb = 0.28

  return (
    <section className="pt-10 md:pt-14 pb-4" aria-labelledby="flagships-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={s.sectionHead}>
          <div>
            <div className="ind-eyebrow">
              <span className="inline-block w-8 h-px bg-[color:var(--mr-accent-ink)]" aria-hidden="true" />
              {labels.eyebrow}
            </div>
            <h2 id="flagships-title" className={s.sectionTitle}>
              {labels.title}
            </h2>
          </div>
          <div className={s.railNav}>
            <button type="button" className={s.railBtn} onClick={() => page(-1)} disabled={edges.start} aria-label={labels.prev}>
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button type="button" className={s.railBtn} onClick={() => page(1)} disabled={edges.end} aria-label={labels.next}>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div ref={rail} className={s.rail} onScroll={measure}>
          {items.map((item, i) => (
            <Flagship key={item.id} item={item} labels={labels} index={i} />
          ))}
        </div>
        <div className={s.railProgress} aria-hidden="true">
          <span style={{ width: `${thumb * 100}%`, transform: `translateX(${progress * ((1 - thumb) / thumb) * 100}%)` }} />
        </div>
      </div>
    </section>
  )
}
