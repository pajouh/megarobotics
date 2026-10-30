'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent, ReactNode } from 'react'
import Image from 'next/image'
import type { ResolvedHeroSpec, ResolvedProductHero } from '@/data/product-heroes'
import styles from './ProductHeroSlider.module.css'

/**
 * Full-width video hero for a product page.
 *
 * Each slide plays a muted application clip; the product name, key specs and
 * use cases reveal on the right while it runs. Clips advance when they end
 * (capped at maxSlideMs), or after `duration` for looping slides. Only the
 * current and next clip are fetched, and playback pauses while the hero is
 * off-screen or the tab is hidden. Content comes from src/data/product-heroes.ts.
 *
 * On the homepage the slides belong to different products: each then carries
 * its own name and specs (slide.product), and slideActions[i] its own CTAs.
 */

interface Labels {
  carousel: string
  chooseSlide: string
  useCases: string
  pause: string
  play: string
}

interface Props {
  hero: ResolvedProductHero
  /** Title for slides without their own product. */
  productName?: string
  locale: string
  labels: Labels
  /** CTA links, rendered under the use cases (site buttons, already localized). */
  actions?: ReactNode
  /** Per-slide CTAs, by slide index; wins over `actions`. */
  slideActions?: ReactNode[]
  maxSlideMs?: number
}

const FADE_MS = 900
const COUNT_MS = 1100

// reveal timeline (ms after a slide becomes active)
const T_SPECS = 1550
const T_SPEC_STEP = 140
const T_UC_STEP = 260

const delay = (ms: number) => ({ '--i': ms }) as CSSProperties

function formatSpec(spec: ResolvedHeroSpec, v: number, locale: string) {
  const d = spec.decimals ?? 0
  return (spec.prefix ?? '') + v.toLocaleString(locale, { minimumFractionDigits: d, maximumFractionDigits: d })
}

// Renders the final value (so the server HTML carries the real figure) and,
// while its slide is active, counts up to it by writing straight to the node.
function SpecValue({ spec, startMs, active, locale }: { spec: ResolvedHeroSpec; startMs: number; active: boolean; locale: string }) {
  const numRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = numRef.current
    if (typeof spec.value !== 'number' || !active || !el) return
    const target = spec.value
    let raf = 0
    el.textContent = formatSpec(spec, 0, locale)
    const t = window.setTimeout(() => {
      const t0 = performance.now()
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / COUNT_MS)
        el.textContent = formatSpec(spec, target * (1 - Math.pow(1 - p, 3)), locale)
        if (p < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, startMs)
    return () => {
      window.clearTimeout(t)
      cancelAnimationFrame(raf)
      el.textContent = formatSpec(spec, target, locale)
    }
  }, [active, spec, startMs, locale])

  return (
    <b>
      <span ref={numRef}>{typeof spec.value === 'number' ? formatSpec(spec, spec.value, locale) : spec.value}</span>
      {spec.unit ? <small>{spec.unit}</small> : null}
    </b>
  )
}

export default function ProductHeroSlider({
  hero,
  productName = '',
  locale,
  labels,
  actions,
  slideActions,
  maxSlideMs = 16000,
}: Props) {
  const { slides, specs } = hero
  const [cur, setCur] = useState(0)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(true)

  const rootRef = useRef<HTMLElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const barRefs = useRef<(HTMLElement | null)[]>([])
  const elapsedRef = useRef(0)

  // ms the slide stays up; `clock` means time-based rather than following the video
  const range = useCallback(
    (i: number) => {
      const s = slides[i]
      if (s.duration != null) return { ms: Math.min(s.duration * 1000, maxSlideMs), clock: true }
      const len = videoRefs.current[i]?.duration
      return { ms: len && isFinite(len) ? Math.min(len * 1000, maxSlideMs) : maxSlideMs, clock: false }
    },
    [slides, maxSlideMs],
  )

  const go = useCallback(
    (i: number) => {
      setCur(((i % slides.length) + slides.length) % slides.length)
      elapsedRef.current = 0
    },
    [slides.length],
  )

  // pause when the hero scrolls out of view or the tab is hidden
  useEffect(() => {
    const el = rootRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting && !document.hidden), { threshold: 0.15 })
    io.observe(el)
    const onVis = () => {
      const r = el.getBoundingClientRect()
      setVisible(!document.hidden && r.bottom > 0 && r.top < window.innerHeight)
    }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  // warm up the current and next clip; rewind the others after the cross-fade
  useEffect(() => {
    const next = (cur + 1) % slides.length
    for (const i of [cur, next]) {
      const v = videoRefs.current[i]
      if (v) v.preload = 'auto'
    }
    const t = window.setTimeout(() => {
      videoRefs.current.forEach((v, i) => {
        if (!v || i === cur) return
        v.pause()
        if (i !== next) v.currentTime = 0
      })
    }, FADE_MS)
    return () => window.clearTimeout(t)
  }, [cur, slides.length])

  useEffect(() => {
    const v = videoRefs.current[cur]
    if (!v) return
    if (paused || !visible) v.pause()
    else v.play().catch(() => {
      /* autoplay blocked: the clock below still advances */
    })
  }, [cur, paused, visible])

  // progress bar + auto-advance; follows the video, falls back to a slower clock if it stalls
  useEffect(() => {
    if (paused || !visible) return
    const t0 = performance.now() - elapsedRef.current
    let raf = 0
    const loop = (now: number) => {
      elapsedRef.current = now - t0
      const { ms, clock } = range(cur) // re-read: clip length arrives with its metadata
      const v = videoRefs.current[cur]
      const vp = v ? v.currentTime / (ms / 1000) : 0
      const p = clock ? Math.min(1, elapsedRef.current / ms) : Math.min(1, Math.max(vp, elapsedRef.current / (ms * 1.6)))
      const bar = barRefs.current[cur]
      if (bar) bar.style.width = `${p * 100}%`
      if (p >= 1) {
        go(cur + 1)
        return
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [cur, paused, visible, go, range])

  useEffect(() => {
    barRefs.current.forEach((b, i) => {
      if (b && i !== cur) b.style.width = '0'
    })
  }, [cur])

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(cur + 1)
    if (e.key === 'ArrowLeft') go(cur - 1)
  }

  return (
    <section
      ref={rootRef}
      className={styles.hero}
      aria-roledescription="carousel"
      aria-label={labels.carousel}
      onKeyDown={onKey}
    >
      {slides.map((s, i) => {
        const active = i === cur
        const name = s.product?.name ?? productName
        const slideSpecs = s.product?.specs ?? specs
        const slideCta = slideActions?.[i] ?? actions
        const ucStart = T_SPECS + slideSpecs.length * T_SPEC_STEP + 500
        return (
          <article
            key={s.id}
            className={`${styles.slide} ${active ? styles.active : ''}`}
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${slides.length}: ${s.product?.name ?? s.eyebrow}`}
            aria-hidden={!active}
          >
            <div
              className={styles.media}
              style={{ '--shift': s.shift ?? '0%', '--crop': `${s.cropBottom ?? 0}%` } as CSSProperties}
            >
              {s.video ? (
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el
                  }}
                  muted
                  playsInline
                  loop={!!s.loop}
                  preload={i === 0 ? 'auto' : 'none'}
                  poster={s.poster}
                  aria-hidden="true"
                >
                  <source src={s.video} type="video/mp4" />
                </video>
              ) : s.image ? (
                <Image src={s.image} alt="" fill sizes="100vw" priority={i === 0} />
              ) : null}
            </div>

            <div className={styles.copy}>
              <div className={styles.eyebrow} data-a="" style={delay(100)}>
                {s.eyebrow}
              </div>
              <h2 className={styles.title}>
                {name.split(' ').map((w, k) => (
                  <span key={k}>
                    {k > 0 && ' '}
                    <span className={styles.word}>
                      <span style={delay(250 + k * 120)}>{w}</span>
                    </span>
                  </span>
                ))}
              </h2>
              <p className={styles.tagline} data-a="" style={delay(600)}>
                {s.tagline}
              </p>

              <div className={styles.specs}>
                {slideSpecs.map((sp, k) => (
                  <div key={sp.label} className={styles.spec} data-a="" style={delay(T_SPECS + k * T_SPEC_STEP)}>
                    <SpecValue spec={sp} startMs={T_SPECS + k * T_SPEC_STEP} active={active} locale={locale} />
                    <span className={styles.specLabel}>{sp.label}</span>
                  </div>
                ))}
              </div>

              <div className={styles.ucHead} data-a="" style={delay(ucStart)}>
                {labels.useCases}
              </div>
              <ul className={styles.useCases}>
                {s.useCases.map(([what, detail], k) => (
                  <li key={what} data-a="" style={delay(ucStart + 200 + k * T_UC_STEP)}>
                    <span>
                      {what} <em>— {detail}</em>
                    </span>
                  </li>
                ))}
              </ul>

              {slideCta && (
                <div
                  className={styles.cta}
                  data-a=""
                  style={delay(ucStart + 400 + s.useCases.length * T_UC_STEP)}
                  inert={!active}
                >
                  {slideCta}
                </div>
              )}
            </div>
          </article>
        )
      })}

      <button
        type="button"
        className={styles.pause}
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? labels.play : labels.pause}
      >
        {paused ? (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
            <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
          </svg>
        )}
      </button>

      <nav className={styles.nav} aria-label={labels.chooseSlide}>
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={`${styles.tab} ${i === cur ? styles.tabActive : ''}`}
            onClick={() => go(i)}
            aria-current={i === cur}
          >
            <i
              ref={(el) => {
                barRefs.current[i] = el
              }}
            />
            {String(i + 1).padStart(2, '0')}
            <span className={styles.tabLabel}> · {s.product?.name ?? s.eyebrow}</span>
          </button>
        ))}
      </nav>
    </section>
  )
}
