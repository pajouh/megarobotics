import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { getAllProductFamilySlugs, getInstituteCountries } from '@/lib/sanity'
import { submitToIndexNow } from '@/lib/indexnow'
import { locales, defaultLocale } from '@/i18n/config'

// Secret that guards the MANUAL revalidation endpoints (POST with a body secret
// and GET ?secret=). The Sanity webhook path (body._type) does not use this.
// Fail closed: there is deliberately no hardcoded fallback — if REVALIDATE_SECRET
// is unset, every manual request is rejected rather than honoring a guessable
// default baked into the repo.
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET

function isAuthorized(secret: unknown): boolean {
  return typeof REVALIDATE_SECRET === 'string' && REVALIDATE_SECRET.length > 0 && secret === REVALIDATE_SECRET
}

// Expand a default-locale path into the concrete URL for every locale.
// localePrefix is 'as-needed': the default locale has no prefix, others get /<locale>.
function localizedPaths(path: string): string[] {
  return locales.map((locale) => (locale === defaultLocale ? path : `/${locale}${path}`))
}

// revalidatePath() matches the route Next actually rendered, not the public
// URL. The middleware rewrites unprefixed English URLs to /en/..., so
// revalidatePath('/products') matched nothing and English pages were never
// invalidated, while /de/products worked by coincidence. Translate a public
// path to its internal route before revalidating.
function routePath(publicPath: string): string {
  // localizedPaths('/') yields '/de/'; the rendered route is '/de'.
  const path = publicPath.length > 1 ? publicPath.replace(/\/+$/, '') : publicPath
  const prefixed = locales.some((l) => path === `/${l}` || path.startsWith(`/${l}/`))
  if (prefixed) return path
  return path === '/' ? `/${defaultLocale}` : `/${defaultLocale}${path}`
}

// Layout revalidation takes the route pattern, so one call covers every
// locale. '/' stays as-is: the root layout already spans the whole app.
function layoutPattern(publicPath: string): string {
  return publicPath === '/' ? '/' : `/[locale]${publicPath}`
}

// Mirror of countryToSlug() in institutes/country/[country]/page.tsx so the
// webhook can target each country index page that generateStaticParams builds.
function countryToSlug(country: string): string {
  return country.toLowerCase().replace(/\s+/g, '-')
}

// Sanity webhook payload types
interface SanityWebhookPayload {
  _type?: string
  slug?: { current: string }
  _id?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Check if this is a Sanity webhook (has _type field)
    if (body._type) {
      return handleSanityWebhook(body as SanityWebhookPayload)
    }

    // Otherwise, handle as manual revalidation request
    const { secret, paths, all, purgeAll } = body

    // Verify the secret token
    if (!isAuthorized(secret)) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }

    const revalidated: string[] = []

    // Purge ALL cache - most aggressive option
    if (purgeAll) {
      // Revalidate the entire app using layout
      revalidatePath('/', 'layout')
      revalidated.push('/ (layout - entire app)')

      // Also explicitly revalidate all main routes
      const allPaths = [
        '/',
        '/products',
        '/manufacturers',
        '/articles',
        '/guides',
        '/about',
        '/imprint',
        '/privacy',
      ]
      for (const path of allPaths) {
        revalidatePath(routePath(path), 'page')
        revalidatePath(layoutPattern(path), 'layout')
        revalidated.push(path)
      }
    }

    // Revalidate all common paths
    if (all) {
      const allPaths = [
        '/',
        '/about',
        '/articles',
        '/products',
        '/manufacturers',
        '/imprint',
        '/privacy',
        '/guides',
      ]
      for (const path of allPaths) {
        revalidatePath(routePath(path))
        revalidated.push(path)
      }

      // Revalidate using layout strategy for dynamic routes - this invalidates ALL child routes
      revalidatePath(layoutPattern('/products'), 'layout')
      revalidatePath(layoutPattern('/manufacturers'), 'layout')
      revalidatePath(layoutPattern('/articles'), 'layout')
      revalidatePath(layoutPattern('/guides'), 'layout')
      revalidated.push('/products (layout)', '/manufacturers (layout)', '/articles (layout)', '/guides (layout)')
    }

    // Revalidate specific paths
    if (paths && Array.isArray(paths)) {
      for (const path of paths) {
        // Revalidate both as page and layout to be thorough
        revalidatePath(routePath(path), 'page')
        revalidatePath(routePath(path))
        revalidated.push(path)
      }
    }

    return NextResponse.json({
      success: true,
      revalidated,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { error: 'Failed to revalidate', details: String(error) },
      { status: 500 }
    )
  }
}

// Handle Sanity webhook - automatically revalidate based on content type
async function handleSanityWebhook(payload: SanityWebhookPayload) {
  const revalidated: string[] = []
  const { _type, slug } = payload

  // Real, document-specific URLs to announce via IndexNow. Deliberately much
  // narrower than `revalidated`: cache invalidation fans out over every family
  // and country index because that is cheap and local, but telling Bing that a
  // dozen unchanged category pages changed is spam and gets a host throttled.
  // Only pages whose content this publish actually altered belong here.
  const changed = new Set<string>()
  const mark = (...paths: string[]) => paths.forEach((path) => changed.add(path))

  try {
    // Always revalidate the homepage — in every locale. '/' alone leaves the
    // German homepage on its hourly timer.
    for (const p of localizedPaths('/')) {
      revalidatePath(routePath(p), 'page')
      revalidated.push(p)
    }
    mark(...localizedPaths('/'))

    switch (_type) {
      case 'product':
        // Revalidate products layout to catch ALL product pages
        revalidatePath(layoutPattern('/products'), 'layout')
        revalidatePath(routePath('/products'))
        revalidated.push('/products (layout)')

        mark(...localizedPaths('/products'))

        if (slug?.current) {
          for (const p of localizedPaths(`/products/${slug.current}`)) {
            revalidatePath(routePath(p), 'page')
            revalidatePath(routePath(p))
            revalidated.push(p)
          }
          mark(...localizedPaths(`/products/${slug.current}`))
        }

        // A product carries its productFamily reference, so changing/assigning a
        // product affects the family category page (/products/categories/<slug>).
        // The webhook payload does not include the family, and a product can be
        // moved between families, so refresh every family category page in every
        // locale. Without this, assigning a product to a family in Studio never
        // updates the cached family page.
        {
          const familySlugs = await getAllProductFamilySlugs()
          for (const { slug: familySlug } of familySlugs) {
            for (const p of localizedPaths(`/products/categories/${familySlug}`)) {
              revalidatePath(routePath(p), 'page')
              revalidated.push(p)
            }
          }
        }

        // Also revalidate manufacturer pages as they show products
        revalidatePath(layoutPattern('/manufacturers'), 'layout')
        revalidated.push('/manufacturers (layout)')
        break

      case 'manufacturer':
        // Revalidate manufacturers layout to catch ALL manufacturer pages
        revalidatePath(layoutPattern('/manufacturers'), 'layout')
        revalidatePath(routePath('/manufacturers'))
        revalidatePath(layoutPattern('/products'), 'layout')
        revalidated.push('/manufacturers (layout)', '/products (layout)')

        for (const p of localizedPaths('/manufacturers')) {
          revalidatePath(routePath(p), 'page')
          revalidated.push(p)
        }
        mark(...localizedPaths('/manufacturers'))

        if (slug?.current) {
          for (const p of localizedPaths(`/manufacturers/${slug.current}`)) {
            revalidatePath(routePath(p), 'page')
            revalidatePath(routePath(p))
            revalidated.push(p)
          }
          mark(...localizedPaths(`/manufacturers/${slug.current}`))
        }
        break

      case 'article':
        revalidatePath(layoutPattern('/articles'), 'layout')
        revalidatePath(routePath('/articles'))
        revalidated.push('/articles (layout)')

        for (const p of localizedPaths('/articles')) {
          revalidatePath(routePath(p), 'page')
          revalidated.push(p)
        }
        mark(...localizedPaths('/articles'))

        if (slug?.current) {
          for (const p of localizedPaths(`/articles/${slug.current}`)) {
            revalidatePath(routePath(p), 'page')
            revalidated.push(p)
          }
          mark(...localizedPaths(`/articles/${slug.current}`))
        }
        break

      case 'productFamily':
        revalidatePath(layoutPattern('/products'), 'layout')
        revalidated.push('/products (layout)')
        mark(...localizedPaths('/products'))

        if (slug?.current) {
          for (const p of localizedPaths(`/products/categories/${slug.current}`)) {
            revalidatePath(routePath(p), 'page')
            revalidated.push(p)
          }
          mark(...localizedPaths(`/products/categories/${slug.current}`))
        }
        break

      case 'buyersGuide':
        revalidatePath(layoutPattern('/guides'), 'layout')
        revalidatePath(routePath('/guides'))
        revalidated.push('/guides (layout)')

        for (const p of localizedPaths('/guides')) {
          revalidatePath(routePath(p), 'page')
          revalidated.push(p)
        }
        mark(...localizedPaths('/guides'))

        if (slug?.current) {
          for (const p of localizedPaths(`/guides/${slug.current}`)) {
            revalidatePath(routePath(p), 'page')
            revalidated.push(p)
          }
          mark(...localizedPaths(`/guides/${slug.current}`))
        }
        break

      case 'solution':
        for (const p of localizedPaths('/solutions')) {
          revalidatePath(routePath(p), 'page')
          revalidated.push(p)
        }
        mark(...localizedPaths('/solutions'))

        if (slug?.current) {
          for (const p of localizedPaths(`/solutions/${slug.current}`)) {
            revalidatePath(routePath(p), 'page')
            revalidated.push(p)
          }
          mark(...localizedPaths(`/solutions/${slug.current}`))
        }
        break

      case 'industry':
        for (const p of localizedPaths('/industries')) {
          revalidatePath(routePath(p), 'page')
          revalidated.push(p)
        }
        mark(...localizedPaths('/industries'))
        break

      case 'robotTechnology':
        for (const p of localizedPaths('/robot-technologies')) {
          revalidatePath(routePath(p), 'page')
          revalidated.push(p)
        }
        mark(...localizedPaths('/robot-technologies'))
        break

      case 'institute':
        for (const p of localizedPaths('/institutes')) {
          revalidatePath(routePath(p), 'page')
          revalidated.push(p)
        }
        mark(...localizedPaths('/institutes'))

        if (slug?.current) {
          for (const p of localizedPaths(`/institutes/${slug.current}`)) {
            revalidatePath(routePath(p), 'page')
            revalidated.push(p)
          }
          mark(...localizedPaths(`/institutes/${slug.current}`))
        }

        // The payload has no country, and an institute can move between
        // countries, so refresh every country index page in every locale.
        {
          const countries = await getInstituteCountries()
          for (const country of countries) {
            for (const p of localizedPaths(`/institutes/country/${countryToSlug(country)}`)) {
              revalidatePath(routePath(p), 'page')
              revalidated.push(p)
            }
          }
        }
        break

      case 'projectStudy':
        for (const p of localizedPaths('/projects')) {
          revalidatePath(routePath(p), 'page')
          revalidated.push(p)
        }
        mark(...localizedPaths('/projects'))
        break

      case 'category':
        for (const p of localizedPaths('/articles')) {
          revalidatePath(routePath(p), 'page')
          revalidated.push(p)
        }
        mark(...localizedPaths('/articles'))

        if (slug?.current) {
          for (const p of localizedPaths(`/category/${slug.current}`)) {
            revalidatePath(routePath(p), 'page')
            revalidated.push(p)
          }
          mark(...localizedPaths(`/category/${slug.current}`))
        }
        break

      case 'page':
      case 'siteSettings':
        // Revalidate entire app when settings change
        revalidatePath('/', 'layout')
        revalidated.push('/ (layout - entire app)')
        break

      default:
        // Unknown type - revalidate common paths
        revalidatePath(layoutPattern('/products'), 'layout')
        revalidatePath(layoutPattern('/articles'), 'layout')
        revalidatePath(layoutPattern('/manufacturers'), 'layout')
        revalidated.push('/products (layout)', '/articles (layout)', '/manufacturers (layout)')
    }

    console.log(`[Sanity Webhook] Revalidated ${revalidated.length} paths for ${_type}:`, revalidated)

    // Tell Bing the pages changed rather than waiting for its crawl schedule.
    // Awaited, not fire-and-forget: this runs in a serverless function that may
    // be frozen the moment the response is returned, which would drop a
    // detached promise. submitToIndexNow never throws and self-limits to 5s.
    const indexNow = await submitToIndexNow([...changed])

    return NextResponse.json({
      success: true,
      source: 'sanity-webhook',
      contentType: _type,
      revalidated,
      indexNow,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[Sanity Webhook] Error:', error)
    return NextResponse.json(
      { error: 'Failed to revalidate', details: String(error) },
      { status: 500 }
    )
  }
}

// GET endpoint for simple cache clearing from browser/Sanity
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const secret = searchParams.get('secret')
  const path = searchParams.get('path')
  const purgeAll = searchParams.get('purgeAll') === 'true'

  if (!isAuthorized(secret)) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  try {
    const revalidated: string[] = []

    if (purgeAll) {
      // Nuclear option - revalidate entire app
      revalidatePath('/', 'layout')
      revalidated.push('/ (layout - entire app)')
    } else if (path) {
      revalidatePath(routePath(path), 'page')
      revalidatePath(routePath(path))
      revalidated.push(path)
    } else {
      // Default: revalidate all main paths using layout strategy
      const paths = ['/', '/about', '/articles', '/products', '/manufacturers', '/imprint', '/privacy', '/guides']
      for (const p of paths) {
        revalidatePath(routePath(p))
        revalidatePath(layoutPattern(p), 'layout')
      }
      revalidated.push(...paths)
    }

    return NextResponse.json({
      success: true,
      revalidated,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Revalidation error (GET):', error)
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 })
  }
}
