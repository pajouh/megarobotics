'use client'

import { useEffect } from 'react'

/**
 * Fades in every [data-reveal] element as it scrolls into view by adding
 * `.is-in` (styles live in globals.css). Mounted once in the locale layout.
 * A MutationObserver picks up elements rendered later — client navigation,
 * filter results, carousels — so nothing is left hidden.
 */
export default function RevealObserver() {
  useEffect(() => {
    const reveal = (el: Element) => el.classList.add('is-in')

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach(reveal)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target)
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
    )

    const watch = (root: ParentNode) => {
      root.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el))
    }
    watch(document)

    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return
          if (node.matches('[data-reveal]:not(.is-in)')) io.observe(node)
          watch(node)
        })
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return null
}
