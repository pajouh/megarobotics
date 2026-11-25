import { NextResponse, type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n/config'

const handleI18n = createMiddleware({
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

export default function middleware(request: NextRequest) {
  // English lives without a prefix. next-intl sends /en/... there with a temporary
  // 307, which kept the old /en URLs in Google's index; a 308 hands them over for good.
  const { pathname } = request.nextUrl
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(3).replace(/^\/*/, '/')
    return NextResponse.redirect(url, 308)
  }
  return handleI18n(request)
}

export const config = {
  // Match all pathnames except for:
  // - API routes
  // - Static files
  // - Studio routes
  // - /mitsubishi1, /security, /lhoist1, /ham_flug and /mva1, standalone presentations served
  //   from public/ (see next.config.ts)
  matcher: [
    '/((?!api|_next|_vercel|studio|mitsubishi1|security|lhoist1|ham_flug|mva1|.*\\..*).*)',
  ],
}
