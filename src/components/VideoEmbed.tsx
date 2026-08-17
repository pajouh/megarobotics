'use client'

import { useState } from 'react'

/**
 * Click-to-play video embed.
 *
 * Nothing is requested from YouTube/Vimeo until the reader presses play — no
 * iframe, no thumbnail, no cookie — so a page carrying a video still loads
 * clean for a visitor who has not accepted marketing cookies. Once clicked we
 * use the nocookie host. The surrounding <figure>/<figcaption> stays in the
 * server HTML either way, so the video is still described to crawlers.
 *
 * Shared by ArticleBody's `videoEmbed` block and the product detail page.
 */
export default function VideoEmbed({
  url,
  title,
  caption,
  className = 'my-8',
}: {
  url: string
  title: string
  caption?: string
  className?: string
}) {
  const [playing, setPlaying] = useState(false)

  const embedUrl = (() => {
    try {
      const u = new URL(url)
      if (u.hostname.includes('youtu')) {
        const id = u.hostname === 'youtu.be' ? u.pathname.slice(1) : u.searchParams.get('v')
        if (id) return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
      }
      if (u.hostname.includes('vimeo')) {
        const id = u.pathname.split('/').filter(Boolean).pop()
        if (id) return `https://player.vimeo.com/video/${id}?autoplay=1`
      }
    } catch {
      /* fall through to the disabled state below */
    }
    return null
  })()

  return (
    <figure className={className}>
      <div className="relative aspect-video overflow-hidden border border-[color:var(--mr-line)] bg-[color:var(--mr-dark)]">
        {playing && embedUrl ? (
          <iframe
            src={embedUrl}
            title={title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            disabled={!embedUrl}
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-4 group disabled:cursor-default"
          >
            <span className="flex items-center justify-center w-16 h-16 border-2 border-[color:var(--mr-accent)] text-[color:var(--mr-accent)] group-hover:bg-[color:var(--mr-accent)] group-hover:text-[color:var(--mr-dark)] transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 ml-1" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="px-6 text-center">
              <span className="block text-[color:var(--mr-ink-on-dark)] font-medium">{title}</span>
              <span className="block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-[color:var(--mr-steel-on-dark)] mt-2">
                {embedUrl ? 'Click to play — loads from YouTube' : 'Video unavailable'}
              </span>
            </span>
          </button>
        )}
      </div>
      {caption && (
        <figcaption className="text-center font-mono text-xs text-[color:var(--mr-steel)] mt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
