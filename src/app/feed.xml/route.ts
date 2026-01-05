import { client } from '@/lib/sanity'

export async function GET() {
  const articles = await client?.fetch(`
    *[_type == "article"] | order(publishedAt desc) [0...50] {
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      "author": author->name,
      "category": category->title
    }
  `) || []

  const baseUrl = 'https://megarobotics.de'

  const escapeXml = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }

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
    <ttl>60</ttl>
    ${articles.map((article: { title: string; slug: string; excerpt?: string; publishedAt: string; author?: string; category?: string }) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${baseUrl}/articles/${article.slug}</link>
      <guid isPermaLink="true">${baseUrl}/articles/${article.slug}</guid>
      <description><![CDATA[${article.excerpt || ''}]]></description>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      ${article.author ? `<author>info@megarobotics.de (${escapeXml(article.author)})</author>` : ''}
      ${article.category ? `<category>${escapeXml(article.category)}</category>` : ''}
    </item>`).join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}
