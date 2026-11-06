import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    // One group only: a crawler obeys just its most specific group, so the old
    // Googlebot and Bingbot `allow: /` groups opened /studio/ and /api/ to the
    // two crawlers that matter most. /_next/ stays open because crawlers need
    // those scripts and styles to render the pages.
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Product pages link here with ?product=… prefills; each page is the same form.
        disallow: ['/studio/', '/api/', '/admin/', '/contact?', '/de/contact?'],
      },
    ],
    sitemap: 'https://www.megarobotics.de/sitemap.xml',
  }
}
