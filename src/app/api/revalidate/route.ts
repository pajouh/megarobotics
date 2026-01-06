import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Secret token to protect the endpoint
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || 'megarobotics-revalidate-2024'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
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
