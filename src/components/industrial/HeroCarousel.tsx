'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { HeroSlide } from '@/lib/sanity'

type AspectRatio = 'square' | '4:3' | '16:9' | 'portrait'

interface HeroCarouselProps {
  slides: HeroSlide[]
  aspectRatio?: AspectRatio
  autoplay?: boolean
  interval?: number
  priority?: boolean
  learnMoreLabel?: string
}

const ASPECT_CLASS: Record<AspectRatio, string> = {
  square: 'aspect-square',
  '4:3': 'aspect-[4/3]',
  '16:9': 'aspect-video',
  portrait: 'aspect-[3/4]',
}

type Resolved = {
  kind: 'image' | 'video' | 'embed'
  src: string
  alt: string
  link?: string
  linkLabel?: string
}

// Turn a Sanity slide into a renderable shape. videoUrl is sniffed: YouTube/Vimeo
// become embeds; a direct media file is played inline; anything else is iframed.
function resolveSlide(slide: HeroSlide): Resolved | null {
  const base = {
    alt: slide.alt ?? '',
    link: slide.link?.trim() || undefined,
    linkLabel: slide.linkLabel?.trim() || undefined,
  }
  if (slide.mediaType === 'image' && slide.imageUrl) return { kind: 'image', src: slide.imageUrl, ...base }
  if (slide.mediaType === 'videoFile' && slide.videoFileUrl)
    return { kind: 'video', src: slide.videoFileUrl, ...base }
  if (slide.mediaType === 'videoUrl' && slide.externalUrl) {
    const url = slide.externalUrl
    const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/)
    if (yt) {
      const id = yt[1]
      return {
        kind: 'embed',
        src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=1&modestbranding=1&rel=0&playsinline=1`,
        ...base,
      }
    }
    const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
    if (vimeo) {
      return {
        kind: 'embed',
        src: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&muted=1&loop=1&playsinline=1`,
        ...base,
      }
    }
    if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) return { kind: 'video', src: url, ...base }
    return { kind: 'embed', src: url, ...base }
  }
  return null
}

export default function HeroCarousel({
  slides,
  aspectRatio = '4:3',
  autoplay = true,
  interval = 6,
  priority,
  learnMoreLabel = 'Learn more',
}: HeroCarouselProps) {
  const resolved = useMemo(() => slides.map(resolveSlide).filter(Boolean) as Resolved[], [slides])
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const count = resolved.length

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const go = useCallback((next: number) => setIndex((next + count) % count), [count])
  const next = useCallback(() => go(index + 1), [go, index])
  const prev = useCallback(() => go(index - 1), [go, index])

  const motionOn = autoplay && !reducedMotion && count > 1 && !paused
  const current = resolved[index]

  // Image / embed slides advance on a timer; <video> slides advance when they end.
  useEffect(() => {
    if (!motionOn || !current || current.kind === 'video') return
    const id = window.setTimeout(next, Math.max(2, interval) * 1000)
    return () => window.clearTimeout(id)
  }, [motionOn, current, index, interval, next])

  // Play the active slide's <video>; pause/reset the others. Changing the `autoPlay`
  // attribute on an already-mounted <video> does NOT start playback, so we drive it
  // imperatively each time the active index changes (videos are muted → autoplay allowed).
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({})
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([i, el]) => {
      if (!el) return
      if (Number(i) === index && !reducedMotion) {
        el.currentTime = 0
        void el.play().catch(() => {})
      } else {
        el.pause()
      }
    })
  }, [index, reducedMotion, resolved])

  if (count === 0) return null

  const single = count === 1

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Hero media"
      className={`relative w-full ${ASPECT_CLASS[aspectRatio]} overflow-hidden border border-[color:var(--mr-line-on-dark)] bg-[color:var(--mr-dark)] group`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (single) return
        if (e.key === 'ArrowRight') { e.preventDefault(); next() }
        if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
      }}
      tabIndex={0}
    >
      {resolved.map((slide, i) => (
        <div
          key={i}
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${count}`}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {slide.kind === 'image' && (
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={priority && i === 0}
              sizes="(min-width: 1024px) 50vw, (min-width: 640px) 80vw, 100vw"
              className="object-cover"
            />
          )}
          {slide.kind === 'video' && (
            <video
              ref={(el) => { videoRefs.current[i] = el }}
              src={slide.src}
              className="absolute inset-0 h-full w-full object-cover"
              muted
              playsInline
              loop={single}
              controls={reducedMotion}
              aria-label={slide.alt || undefined}
              onEnded={() => { if (motionOn && i === index) next() }}
            />
          )}
          {slide.kind === 'embed' && (
            <iframe
              src={i === index ? slide.src : 'about:blank'}
              title={slide.alt || `Slide ${i + 1}`}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              loading="lazy"
            />
          )}

          {slide.link && (
            <div className="absolute bottom-3 left-3 z-20">
              {slide.link.startsWith('/') ? (
                <Link
                  href={slide.link}
                  tabIndex={i === index ? 0 : -1}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[color:var(--mr-accent)] text-[color:var(--mr-dark)] font-semibold text-sm hover:bg-white transition-colors"
                >
                  {slide.linkLabel || learnMoreLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <a
                  href={slide.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={i === index ? 0 : -1}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[color:var(--mr-accent)] text-[color:var(--mr-dark)] font-semibold text-sm hover:bg-white transition-colors"
                >
                  {slide.linkLabel || learnMoreLabel}
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Datasheet frame ticks */}
      <span className="pointer-events-none absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[color:var(--mr-accent)] z-10" aria-hidden="true" />
      <span className="pointer-events-none absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[color:var(--mr-accent)] z-10" aria-hidden="true" />

      {!single && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 grid place-items-center w-9 h-9 bg-[color:var(--mr-dark)]/60 text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-[color:var(--mr-accent)] hover:text-[color:var(--mr-dark)] transition-opacity"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 grid place-items-center w-9 h-9 bg-[color:var(--mr-dark)]/60 text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-[color:var(--mr-accent)] hover:text-[color:var(--mr-dark)] transition-opacity"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {resolved.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 transition-all ${
                  i === index
                    ? 'w-6 bg-[color:var(--mr-accent)]'
                    : 'w-3 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}

      <span className="sr-only" aria-live="polite">{`Slide ${index + 1} of ${count}`}</span>
    </div>
  )
}
