'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

// Thumbnail grid with a keyboard-friendly lightbox (Esc, ← →), used on
// /solutions/inspection-security.

export interface GalleryItem {
  src: string
  alt: string
  caption: string
  /** Panel behind the image: photos fill the tile, cutouts sit on a plain panel. */
  bg: string
}

interface Props {
  items: GalleryItem[]
  labels: { open: string; close: string; prev: string; next: string }
}

const panel = (bg: string) =>
  bg === 'dark' ? 'bg-black' : bg === 'white' ? 'bg-white' : bg === 'light' ? 'bg-[radial-gradient(120%_90%_at_50%_15%,#ffffff_0%,#e7eef0_80%)]' : 'bg-[color:var(--mr-paper-2)]'

export default function ImageGallery({ items, labels }: Props) {
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

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {items.map((g, i) => (
          <li key={g.src} data-reveal className={i === 0 ? 'col-span-2 row-span-2' : ''}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`${labels.open}: ${g.caption}`}
              className={`group relative block h-full w-full overflow-hidden rounded-[var(--mr-radius-sm)] border border-[color:var(--mr-line)] ${panel(g.bg)} ${
                i === 0 ? 'aspect-square' : 'aspect-[4/3]'
              }`}
            >
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes={i === 0 ? '(min-width: 1024px) 38rem, 92vw' : '(min-width: 1024px) 19rem, (min-width: 768px) 30vw, 45vw'}
                className={`transition-transform duration-500 group-hover:scale-[1.04] ${g.bg === 'photo' ? 'object-cover' : 'object-contain p-3'}`}
              />
              <span className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgba(13,27,32,0.82),rgba(13,27,32,0))] px-3 pb-2 pt-8 text-left font-mono text-[10px] uppercase leading-snug tracking-[0.1em] text-white">
                {g.caption}
              </span>
            </button>
          </li>
        ))}
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
