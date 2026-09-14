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

export function fitBrandedTitle(...candidates: string[]): { absolute: string } {
  const usable = candidates.filter((c) => c && c.trim().length > 0)
  if (usable.length === 0) return brandedTitle(BRAND)

  for (const candidate of usable) {
    const fitted = brandedTitle(candidate)
    if (fitted.absolute.length <= TITLE_MAX_LENGTH) return fitted
  }
  return brandedTitle(usable[usable.length - 1])
}

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
  } = args

  const url = localizedUrl(path, locale)

  return {
    title: { absolute: title },
    description,
    alternates: generateAlternates(path, locale),
    openGraph: {
      type: ogType,
      url,
      siteName: 'MegaRobotics',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      alternateLocale: locale === 'de' ? ['en_US'] : ['de_DE'],
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
