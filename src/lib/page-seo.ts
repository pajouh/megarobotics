import type { Metadata } from 'next'
import { generateAlternates, localizedUrl } from './structured-data'

const BRAND = 'MegaRobotics'

/**
 * Normalize a title so it carries exactly one " | MegaRobotics" suffix.
 *
 * Many Sanity `seo.metaTitle` values were authored (or bulk-generated) with the
 * brand suffix baked in. Pages that return a bare `title` string get the root
 * layout's "%s | MegaRobotics" template applied on top, so those shipped as
 * "… | MegaRobotics | MegaRobotics". An older import also cut some titles at 60
 * characters mid-suffix, leaving tails like "| MegaRob..." — matched here too.
 *
 * Returns a `{ absolute }` title, which bypasses the layout template, so the
 * suffix this function adds is the only one the page can emit.
 */
export function brandedTitle(title: string): { absolute: string } {
  const original = title.trim()
  let base = original
  let previous: string

  do {
    previous = base
    // Trailing brand segment, including truncated forms ("MegaRob...", "MegaRobo…").
    base = base.replace(/\s*[|–—-]\s*MegaRo\w*\s*(?:\.\.\.|…)?\s*$/i, '').trim()
  } while (base !== previous && base.length > 0)

  // A title that is nothing but the brand collapses to empty — keep it as-is.
  if (!base) return { absolute: original }

  return { absolute: `${base} | ${BRAND}` }
}

/**
 * Bing truncates result titles at roughly 70 characters and flags longer ones
 * in Webmaster Tools. Titles here are composed from CMS values of unpredictable
 * length (an institute name plus its parent institution routinely runs past
 * 85), so rather than hand-trimming each document, callers pass candidates from
 * most to least informative and the first one that fits is used.
 *
 *   fitBrandedTitle(`${name} – ${parent}`, name)
 *
 * If no candidate fits, the last one is returned branded anyway — a slightly
 * long title beats an empty one, and the search engine will cut it where it
 * would have cut it regardless.
 */
export const TITLE_MAX_LENGTH = 70

/**
 * Length of a string as a search engine actually receives it.
 *
 * Titles are HTML-escaped on the way out, so a single "&" ships as "&amp;" and
 * costs four extra characters. Measuring the raw string let titles like
 * "MagicBot Z1 Auto Tour & Narration Robot | Guided Tours | MegaRobotics"
 * (69 raw) through, which render at 73 and get flagged.
 */
function renderedLength(value: string): number {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;').length
}

export function fitBrandedTitle(...candidates: string[]): { absolute: string } {
  const usable = candidates.filter((c) => c && c.trim().length > 0)
  if (usable.length === 0) return brandedTitle(BRAND)

  for (const candidate of usable) {
    const fitted = brandedTitle(candidate)
    if (renderedLength(fitted.absolute) <= TITLE_MAX_LENGTH) return fitted
  }
  return brandedTitle(usable[usable.length - 1])
}

/**
 * Fit a CMS text into a meta description. Search engines cut around 160
 * characters, so end on a full sentence where one fits, else on a whole word.
 */
export function clampDescription(text: string | undefined, max = 160): string | undefined {
  const clean = text?.replace(/\s+/g, ' ').trim()
  if (!clean || clean.length <= max) return clean
  const cut = clean.slice(0, max)
  const sentenceEnd = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '))
  if (sentenceEnd >= 80) return cut.slice(0, sentenceEnd + 1)
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:–—-]+$/, '')}…`
}

/**
 * The Open Graph fields every page shares. A page-level `openGraph` replaces the
 * root layout's whole object, so pages that build their own need these spread in
 * or they ship without og:url, og:site_name and og:locale.
 */
export function ogBase(path: string, locale: string) {
  return {
    url: localizedUrl(path, locale),
    siteName: BRAND,
    locale: locale === 'de' ? 'de_DE' : 'en_US',
    alternateLocale: locale === 'de' ? ['en_US'] : ['de_DE'],
  }
}

export const DEFAULT_OG_IMAGE = { url: '/og-image.png', width: 1200, height: 630, alt: BRAND }

/** Keeps a page reachable for visitors and link-following, out of the index. */
export const NOINDEX = { index: false, follow: true }

interface PageSeoArgs {
  /** Title used as-is (not run through the root layout's "%s | MegaRobotics" template). */
  title: string
  /** Meta description — aim for 140–160 characters. */
  description: string
  /** Site-relative path with no leading domain, no trailing slash. e.g. '/solutions' */
  path: string
  /**
   * Current page locale ('en' | 'de'). Drives the self-referencing canonical
   * and og:locale. Defaults to 'en'. Always pass this from generateMetadata so
   * German pages are self-canonical instead of pointing at the English URL.
   */
  locale?: string
  /** Optional override of the OG image. Default = '/og-image.png'. */
  ogImage?: string
  /** Optional explicit OG/twitter image dimensions when overriding. */
  ogImageWidth?: number
  ogImageHeight?: number
  /** 'article' for blog posts. Default 'website'. */
  ogType?: 'website' | 'article'
  /** Keep the page out of search results, e.g. a listing with nothing on it yet. */
  noindex?: boolean
}

/**
 * Build a Metadata object with title, description, canonical + hreflang
 * alternates, OG, and Twitter card all wired correctly for the
 * industrial site rebrand.
 *
 * - Uses `title: { absolute: ... }` so the root layout's
 *   "%s | MegaRobotics" template doesn't double-brand titles that
 *   already include " | MegaRobotics".
 * - Falls back to the site-wide industrial OG image unless overridden.
 * - Adds `og:url` so social previews link back to the canonical URL.
 */
export function pageSeo(args: PageSeoArgs): Metadata {
  const {
    title,
    description,
    path,
    locale = 'en',
    ogImage = '/og-image.png',
    ogImageWidth = 1200,
    ogImageHeight = 630,
    ogType = 'website',
    noindex = false,
  } = args

  return {
    title: { absolute: title },
    description,
    alternates: generateAlternates(path, locale),
    ...(noindex ? { robots: NOINDEX } : {}),
    openGraph: {
      ...ogBase(path, locale),
      type: ogType,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: ogImageWidth,
          height: ogImageHeight,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}
