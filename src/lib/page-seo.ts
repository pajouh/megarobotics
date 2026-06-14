import type { Metadata } from 'next'
import { generateAlternates, localizedUrl } from './structured-data'

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
