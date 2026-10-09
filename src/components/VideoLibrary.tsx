'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { Download, Play, X } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import {
  formatSize,
  isInlinePlayable,
  VIDEO_SECTIONS,
  type LimxVideo,
  type ProductKey,
  type VideoSection,
} from '@/data/limx-videos'

interface VideoLibraryProps {
  videos: LimxVideo[]
  /** Product filter chips, in display order. Only products with videos. */
  products: ProductKey[]
}

/**
 * Sections render in the order LimX uses (Intro, Tutorial, Story) and an empty
 * one is dropped rather than shown as a bare heading.
 */
export default function VideoLibrary({ videos, products }: VideoLibraryProps) {
  const t = useTranslations('industrial.downloads')
  const locale = useLocale()
  const lang = locale === 'de' ? 'de' : 'en'

  const [product, setProduct] = useState<ProductKey | 'all'>('all')
  const [playing, setPlaying] = useState<LimxVideo | null>(null)

  const visible = useMemo(
    () => (product === 'all' ? videos : videos.filter((video) => video.product === product)),
    [videos, product]
  )

  const bySection = useMemo(() => {
    const groups = new Map<VideoSection, LimxVideo[]>()
    for (const section of VIDEO_SECTIONS) {
      // `order` carries LimX's own numbering for tutorials (1_unboxing,
      // 2_dual_arm_installation, ...). That sequence is the order the steps
      // are meant to be followed, which publish date does not give — several
      // share a date. Non-tutorials fall back to newest first.
      const items = visible
        .filter((video) => video.section === section)
        .sort((a, b) =>
          section === 'tutorial'
            ? a.product.localeCompare(b.product) || a.order - b.order
            : b.date.localeCompare(a.date)
        )
      if (items.length > 0) groups.set(section, items)
    }
    return groups
  }, [visible])

  const dateFormatter = new Intl.DateTimeFormat(lang === 'de' ? 'de-DE' : 'en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div>
      {/* Product filter — mirrors the All / Luna / Oli / TRON row on the source site */}
      <div className="mb-10 flex flex-wrap gap-2 border-b border-[color:var(--mr-line)] pb-5">
        {(['all', ...products] as (ProductKey | 'all')[]).map((key) => {
          const active = product === key
          return (
            <button
              key={key}
              type="button"
              onClick={() => setProduct(key)}
              aria-pressed={active}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? 'bg-[color:var(--mr-accent-ink)] text-white'
                  : 'bg-[color:var(--mr-paper-2)] text-[color:var(--mr-steel)] hover:text-[color:var(--mr-ink)]'
              }`}
            >
              {key === 'all' ? t('filterAll') : t(`products.${key}`)}
            </button>
          )
        })}
      </div>

      {[...bySection.entries()].map(([section, items]) => (
        <section key={section} className="mb-16 last:mb-0">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 className="ind-h3 text-[color:var(--mr-ink)]">{t(`sections.${section}`)}</h2>
            <span className="font-mono text-xs uppercase tracking-wider text-[color:var(--mr-steel)]">
              {t('count', { count: items.length })}
            </span>
          </div>

          <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((video) => {
              const title = video.title[lang]
              const playable = isInlinePlayable(video)
              return (
                <li key={video.id} id={video.id} className="group flex flex-col">
                  <div className="relative aspect-video w-full overflow-hidden bg-[color:var(--mr-paper-2)]">
                    <Image
                      src={video.thumbnail}
                      alt={title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      unoptimized
                    />
                    {playable && (
                      <button
                        type="button"
                        onClick={() => setPlaying(video)}
                        className="absolute inset-0 grid place-items-center bg-black/25 opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
                        aria-label={t('play', { title })}
                      >
                        <span className="grid h-14 w-14 place-items-center rounded-full bg-white/95 text-[color:var(--mr-accent-ink)]">
                          <Play className="h-6 w-6 translate-x-0.5" aria-hidden="true" />
                        </span>
                      </button>
                    )}
                  </div>

                  <h3 className="mt-4 text-base font-semibold leading-snug text-[color:var(--mr-ink)]">
                    {title}
                  </h3>

                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-[color:var(--mr-steel)]">
                    <time dateTime={video.date}>{dateFormatter.format(new Date(video.date))}</time>
                    {' · '}
                    {t('masterLabel', {
                      size: formatSize(video.sizeBytes),
                      format: video.mime === 'video/quicktime' ? 'MOV' : 'MP4',
                    })}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <a
                      href={video.url}
                      download
                      className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--mr-accent-ink)] underline-offset-4 hover:underline"
                    >
                      <Download className="h-4 w-4" aria-hidden="true" />
                      {t('download')}
                    </a>
                    <button
                      type="button"
                      onClick={() => setPlaying(video)}
                      className="text-sm text-[color:var(--mr-steel)] underline-offset-4 hover:text-[color:var(--mr-ink)] hover:underline"
                    >
                      {t('watch')}
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      ))}

      {/* Lightbox. Only mp4 reaches here; .mov would show a broken player in
          Chrome and Firefox, so those cards offer download only. */}
      {playing && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={playing.title[lang]}
          onClick={() => setPlaying(null)}
        >
          <button
            type="button"
            onClick={() => setPlaying(null)}
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label={t('close')}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <video
            src={playing.webUrl}
            poster={playing.thumbnail}
            controls
            autoPlay
            playsInline
            className="max-h-[85vh] w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}
