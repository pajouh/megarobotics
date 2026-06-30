import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { getAllProductFamilySlugs, getInstituteCountries } from '@/lib/sanity'
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
        revalidatePath(path, 'page')
        revalidatePath(path, 'layout')
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
        revalidatePath(path)
        revalidated.push(path)
      }

      // Revalidate using layout strategy for dynamic routes - this invalidates ALL child routes
      revalidatePath('/products', 'layout')
      revalidatePath('/manufacturers', 'layout')
      revalidatePath('/articles', 'layout')
      revalidatePath('/guides', 'layout')
      revalidated.push('/products (layout)', '/manufacturers (layout)', '/articles (layout)', '/guides (layout)')
    }

    // Revalidate specific paths
    if (paths && Array.isArray(paths)) {
      for (const path of paths) {
        // Revalidate both as page and layout to be thorough
        revalidatePath(path, 'page')
        revalidatePath(path)
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

  try {
    // Always revalidate homepage
    revalidatePath('/')
    revalidated.push('/')

    switch (_type) {
      case 'product':
        // Revalidate products layout to catch ALL product pages
        revalidatePath('/products', 'layout')
        revalidatePath('/products')
        revalidated.push('/products (layout)')

        if (slug?.current) {
          for (const p of localizedPaths(`/products/${slug.current}`)) {
            revalidatePath(p, 'page')
            revalidatePath(p)
            revalidated.push(p)
          }
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
              revalidatePath(p, 'page')
              revalidated.push(p)
            }
          }
        }

        // Also revalidate manufacturer pages as they show products
        revalidatePath('/manufacturers', 'layout')
        revalidated.push('/manufacturers (layout)')
        break

      case 'manufacturer':
        // Revalidate manufacturers layout to catch ALL manufacturer pages
        revalidatePath('/manufacturers', 'layout')
        revalidatePath('/manufacturers')
        revalidatePath('/products', 'layout')
        revalidated.push('/manufacturers (layout)', '/products (layout)')

        if (slug?.current) {
          revalidatePath(`/manufacturers/${slug.current}`, 'page')
          revalidatePath(`/manufacturers/${slug.current}`)
          revalidated.push(`/manufacturers/${slug.current}`)
        }
        break

      case 'article':
        revalidatePath('/articles', 'layout')
        revalidatePath('/articles')
        revalidated.push('/articles (layout)')

        if (slug?.current) {
          revalidatePath(`/articles/${slug.current}`, 'page')
          revalidated.push(`/articles/${slug.current}`)
        }
        break

      case 'productFamily':
        revalidatePath('/products', 'layout')
        revalidated.push('/products (layout)')

        if (slug?.current) {
          for (const p of localizedPaths(`/products/categories/${slug.current}`)) {
            revalidatePath(p, 'page')
            revalidated.push(p)
          }
        }
        break

      case 'buyersGuide':
        revalidatePath('/guides', 'layout')
        revalidatePath('/guides')
        revalidated.push('/guides (layout)')

        if (slug?.current) {
          revalidatePath(`/guides/${slug.current}`, 'page')
          revalidated.push(`/guides/${slug.current}`)
        }
        break

      case 'solution':
        for (const p of localizedPaths('/solutions')) {
          revalidatePath(p, 'page')
          revalidated.push(p)
        }

        if (slug?.current) {
          for (const p of localizedPaths(`/solutions/${slug.current}`)) {
            revalidatePath(p, 'page')
            revalidated.push(p)
          }
        }
        break

      case 'industry':
        for (const p of localizedPaths('/industries')) {
          revalidatePath(p, 'page')
          revalidated.push(p)
        }
        break

      case 'robotTechnology':
        for (const p of localizedPaths('/robot-technologies')) {
          revalidatePath(p, 'page')
          revalidated.push(p)
        }
        break

      case 'institute':
        for (const p of localizedPaths('/institutes')) {
          revalidatePath(p, 'page')
          revalidated.push(p)
        }

        if (slug?.current) {
          for (const p of localizedPaths(`/institutes/${slug.current}`)) {
            revalidatePath(p, 'page')
            revalidated.push(p)
          }
        }

        // The payload has no country, and an institute can move between
        // countries, so refresh every country index page in every locale.
        {
          const countries = await getInstituteCountries()
          for (const country of countries) {
            for (const p of localizedPaths(`/institutes/country/${countryToSlug(country)}`)) {
              revalidatePath(p, 'page')
              revalidated.push(p)
            }
          }
        }
        break

      case 'projectStudy':
        for (const p of localizedPaths('/projects')) {
          revalidatePath(p, 'page')
          revalidated.push(p)
        }
        break

      case 'category':
        for (const p of localizedPaths('/articles')) {
          revalidatePath(p, 'page')
          revalidated.push(p)
        }

        if (slug?.current) {
          for (const p of localizedPaths(`/category/${slug.current}`)) {
            revalidatePath(p, 'page')
            revalidated.push(p)
          }
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
        revalidatePath('/products', 'layout')
        revalidatePath('/articles', 'layout')
        revalidatePath('/manufacturers', 'layout')
        revalidated.push('/products (layout)', '/articles (layout)', '/manufacturers (layout)')
    }

    console.log(`[Sanity Webhook] Revalidated ${revalidated.length} paths for ${_type}:`, revalidated)

    return NextResponse.json({
      success: true,
      source: 'sanity-webhook',
      contentType: _type,
      revalidated,
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
      revalidatePath(path, 'page')
      revalidatePath(path)
      revalidated.push(path)
    } else {
      // Default: revalidate all main paths using layout strategy
      const paths = ['/', '/about', '/articles', '/products', '/manufacturers', '/imprint', '/privacy', '/guides']
      for (const p of paths) {
        revalidatePath(p)
        revalidatePath(p, 'layout')
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
