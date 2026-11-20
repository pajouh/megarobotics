'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

// Even tile grid with a keyboard-friendly lightbox (Esc, ← →), used on the
// security and inspection solution pages. Every tile is the same shape and the
// caption sits under the picture, so nothing covers the robot.

export interface GalleryItem {
  src: string
  alt: string
  caption: string
  /** 'photo' fills the tile; 'white' | 'light' | 'dark' are cutouts shown whole on a plain panel. */
  bg: string
}

interface Props {
  items: GalleryItem[]
  labels: { open: string; close: string; prev: string; next: string }
  /** Tiles per row on desktop. */
  columns?: 3 | 4
  /** Show the first image as a large 2 × 2 tile. */
  feature?: boolean
}

const panel = (bg: string) =>
  bg === 'dark'
    ? 'bg-black'
    : bg === 'white'
      ? 'bg-white'
      : bg === 'light'
        ? 'bg-[radial-gradient(120%_90%_at_50%_15%,#ffffff_0%,#e7eef0_80%)]'
        : 'bg-[color:var(--mr-paper-2)]'

export default function ImageGallery({ items, labels, columns = 4, feature = false }: Props) {
  const [open, setOpen] = useState<number | null>(null)
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  )

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, step])

  const current = open === null ? null : items[open]
  const grid = columns === 3 ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'

  return (
    <>
      <ul className={`grid gap-3 sm:gap-4 ${grid}`}>
        {items.map((g, i) => {
          const big = feature && i === 0
          return (
            <li key={g.src} data-reveal className={big ? 'col-span-2 row-span-2' : ''}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`${labels.open}: ${g.caption}`}
                className="group flex h-full w-full flex-col overflow-hidden rounded-[var(--mr-radius-sm)] border border-[color:var(--mr-line)] bg-[color:var(--mr-white)] text-left shadow-[var(--mr-shadow)] transition-[border-color,box-shadow] hover:border-[color:var(--mr-orange-line)] hover:shadow-[var(--mr-shadow-lift)]"
              >
                <span className={`relative block w-full overflow-hidden ${panel(g.bg)} ${big ? 'min-h-[16rem] flex-1' : 'aspect-[4/3]'}`}>
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes={big ? '(min-width: 1024px) 38rem, 92vw' : '(min-width: 1024px) 24rem, (min-width: 768px) 30vw, 45vw'}
                    className={`transition-transform duration-500 group-hover:scale-[1.04] ${g.bg === 'photo' ? 'object-cover' : 'object-contain p-3 sm:p-4'}`}
                  />
                </span>
                <span className="flex min-h-[3.75rem] items-center gap-2 sm:min-h-[3.25rem] border-t border-[color:var(--mr-line)] px-3 py-2">
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-[color:var(--mr-orange)]" aria-hidden="true" />
                  <span className="line-clamp-3 sm:line-clamp-2 font-mono text-[10px] uppercase leading-snug tracking-[0.08em] text-[color:var(--mr-ink-2)] sm:text-[11px]">
                    {g.caption}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          className="fixed inset-0 z-[100] flex flex-col bg-[rgba(8,16,19,0.94)] p-4 sm:p-8"
          onClick={() => setOpen(null)}
        >
          <div className="flex justify-end">
            <button
              type="button"
              autoFocus
              onClick={() => setOpen(null)}
              aria-label={labels.close}
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="relative mt-3 flex-1" onClick={(e) => e.stopPropagation()}>
            <div className={`absolute inset-0 overflow-hidden rounded-[var(--mr-radius-sm)] ${current.bg === 'photo' ? '' : panel(current.bg)}`}>
              <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
            </div>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={labels.prev}
              className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white hover:bg-black/75"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={labels.next}
              className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white hover:bg-black/75"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-3 text-center font-mono text-xs uppercase tracking-[0.12em] text-white/85">
            {current.caption} · {open! + 1}/{items.length}
          </p>
        </div>
      )}
    </>
  )
}
