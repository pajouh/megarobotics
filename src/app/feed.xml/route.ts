import { client } from '@/lib/sanity'

// The feed lives at the unprefixed /feed.xml, which is the English canonical,
// so it carries the English text with German as a fallback.
//
// Mirrors localizedField() in @/lib/sanity, which is module-private. The third
// branch catches documents written before the i18n migration, whose fields are
// still plain strings rather than { en, de } objects.
const FEED_LOCALE = 'en'
const FEED_FALLBACK_LOCALE = 'de'
const localized = (field: string) =>
  `coalesce(${field}.${FEED_LOCALE}, ${field}.${FEED_FALLBACK_LOCALE}, ${field})`

interface FeedArticle {
  title?: unknown
  slug?: unknown
  excerpt?: unknown
  publishedAt?: unknown
  author?: unknown
  category?: unknown
}

/**
 * Coerce a Sanity value to feed-safe text.
 *
 * This route used to select title/excerpt/category raw and hand them to
 * escapeXml(). After the i18n migration those fields are { en, de } objects, so
 * escapeXml(category) called .replace() on an object and threw — the whole feed
 * had been returning 500. The projection below now unwraps them, and this guard
 * means a value that is still an object (a locale key added later, a
 * partially-migrated document) degrades to empty instead of crashing the feed.
 */
function asText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function escapeXml(value: unknown): string {
  return asText(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// A CDATA section has exactly one escape hazard: its own terminator.
function cdata(value: unknown): string {
  return asText(value).replace(/]]>/g, ']]&gt;')
}

/**
 * RFC-822 date, or undefined when the value is missing or unparseable.
 *
 * Three of the five published articles have no publishedAt set in Studio. The
 * query falls back to _createdAt so those items still carry a date and sort
 * sensibly; previously new Date(undefined).toUTCString() emitted the literal
 * string "Invalid Date" into the feed. If every date source is absent the
 * element is omitted, which RSS permits, rather than emitting a broken one.
 */
function rfc822(value: unknown): string | undefined {
  const text = asText(value)
  if (!text) return undefined
  const date = new Date(text)
  return Number.isNaN(date.getTime()) ? undefined : date.toUTCString()
}

export async function GET() {
  const baseUrl = 'https://www.megarobotics.de'

  let articles: FeedArticle[] = []
  try {
    articles =
      (await client?.fetch(`
      *[_type == "article" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) [0...50] {
        "title": ${localized('title')},
        "slug": slug.current,
        "excerpt": ${localized('excerpt')},
        "publishedAt": coalesce(publishedAt, _createdAt),
        "author": author->name,
        "category": ${localized('category->title')}
      }
    `)) || []
  } catch (error) {
    // A feed is a convenience surface: serving the channel with no items beats
    // a 500 that readers cache and crawlers report as a broken URL.
    console.error('[feed.xml] Sanity query failed:', error)
  }

  const items = articles
    .filter((article) => asText(article.slug) && asText(article.title))
    .map((article) => {
      const url = `${baseUrl}/articles/${escapeXml(article.slug)}`
      const pubDate = rfc822(article.publishedAt)
      const author = asText(article.author)
      const category = asText(article.category)

      return `
    <item>
      <title><![CDATA[${cdata(article.title)}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${cdata(article.excerpt)}]]></description>${
        pubDate ? `\n      <pubDate>${pubDate}</pubDate>` : ''
      }${author ? `\n      <author>info@megarobotics.de (${escapeXml(author)})</author>` : ''}${
        category ? `\n      <category>${escapeXml(category)}</category>` : ''
      }
    </item>`
    })
    .join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>MegaRobotics - Robotics News &amp; Industry Insights</title>
    <link>${baseUrl}</link>
    <description>Your premier source for robotics news, product reviews, and industry analysis. Covering humanoid robots, industrial automation, and AI integration.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>MegaRobotics</title>
      <link>${baseUrl}</link>
    </image>
    <copyright>Copyright ${new Date().getFullYear()} MegaRobotics. All rights reserved.</copyright>
    <managingEditor>info@megarobotics.de (MegaRobotics)</managingEditor>
    <webMaster>info@megarobotics.de (MegaRobotics)</webMaster>
    <category>Technology</category>
    <category>Robotics</category>
    <ttl>60</ttl>${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}
