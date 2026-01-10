import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Secret token to protect the endpoint
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || 'megarobotics-revalidate-2024'

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
    const { secret, paths, all } = body

    // Verify the secret token
    if (secret !== REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }

    const revalidated: string[] = []

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
    }

    // Revalidate specific paths
    if (paths && Array.isArray(paths)) {
      for (const path of paths) {
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
        revalidatePath('/products')
        revalidated.push('/products')
        if (slug?.current) {
          revalidatePath(`/products/${slug.current}`)
          revalidated.push(`/products/${slug.current}`)
        }
        // Also revalidate manufacturer pages as they show products
        revalidatePath('/manufacturers')
        revalidated.push('/manufacturers')
        break

      case 'manufacturer':
        revalidatePath('/manufacturers')
        revalidated.push('/manufacturers')
        revalidatePath('/products')
        revalidated.push('/products')
        if (slug?.current) {
          revalidatePath(`/manufacturers/${slug.current}`)
          revalidated.push(`/manufacturers/${slug.current}`)
        }
        break

      case 'article':
        revalidatePath('/articles')
        revalidated.push('/articles')
        if (slug?.current) {
          revalidatePath(`/articles/${slug.current}`)
          revalidated.push(`/articles/${slug.current}`)
        }
        break

      case 'productCategory':
        revalidatePath('/products')
        revalidated.push('/products')
        if (slug?.current) {
          revalidatePath(`/products/category/${slug.current}`)
          revalidated.push(`/products/category/${slug.current}`)
        }
        break

      case 'buyersGuide':
        revalidatePath('/guides')
        revalidated.push('/guides')
        if (slug?.current) {
          revalidatePath(`/guides/${slug.current}`)
          revalidated.push(`/guides/${slug.current}`)
        }
        break

      case 'page':
      case 'siteSettings':
        // Revalidate all main pages
        const mainPaths = ['/about', '/imprint', '/privacy']
        for (const path of mainPaths) {
          revalidatePath(path)
          revalidated.push(path)
        }
        break

      default:
        // Unknown type - revalidate common paths
        revalidatePath('/products')
        revalidatePath('/articles')
        revalidated.push('/products', '/articles')
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

  if (secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  try {
    if (path) {
      revalidatePath(path)
      return NextResponse.json({ success: true, revalidated: path })
    }

    // Default: revalidate all main paths
    const paths = ['/', '/about', '/articles', '/products', '/manufacturers', '/imprint', '/privacy', '/guides']
    for (const p of paths) {
      revalidatePath(p)
    }

    return NextResponse.json({
      success: true,
      revalidated: paths,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 })
  }
}
