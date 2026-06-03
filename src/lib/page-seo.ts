import type { Metadata } from 'next'
import { generateAlternates } from './structured-data'

interface PageSeoArgs {
  /** Title used as-is (not run through the root layout's "%s | MegaRobotics" template). */
  title: string
  /** Meta description — aim for 140–160 characters. */
  description: string
  /** Site-relative path with no leading domain, no trailing slash. e.g. '/solutions' */
  path: string
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
    ogImage = '/og-image.png',
    ogImageWidth = 1200,
    ogImageHeight = 630,
    ogType = 'website',
  } = args

  const url = `https://www.megarobotics.de${path}`

  return {
    title: { absolute: title },
    description,
    alternates: generateAlternates(path),
    openGraph: {
      type: ogType,
      url,
      siteName: 'MegaRobotics',
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
