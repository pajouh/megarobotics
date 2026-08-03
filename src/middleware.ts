import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n/config'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // Don't show /en prefix for default locale
  // Never redirect based on the Accept-Language header. A German browser hitting
  // /articles/foo used to get a 307 to /de/articles/foo, which means a crawler's
  // locale decides which version of a URL it can ever see — the English page
  // becomes unreachable to anyone sending `Accept-Language: de`. Each URL now
  // serves exactly one language, and hreflang tells search engines about the
  // other. Use an in-page language switcher/banner to offer the translation.
  localeDetection: false,
})

export const config = {
  // Match all pathnames except for:
  // - API routes
  // - Static files
  // - Studio routes
  matcher: [
    '/((?!api|_next|_vercel|studio|.*\\..*).*)',
  ],
}
