import { NextRequest, NextResponse } from 'next/server'
import { get } from '@vercel/blob'
import { MEDIA_PREFIX } from '@/lib/lhoist1/catalog'
import { checkAccess, readLocalMedia, usesBlob } from '@/lib/lhoist1/store'

export const dynamic = 'force-dynamic'

const TYPES: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
  heic: 'image/heic',
  mp4: 'video/mp4',
  mov: 'video/quicktime',
  webm: 'video/webm',
  mp3: 'audio/mpeg',
  m4a: 'audio/mp4',
  wav: 'audio/wav',
  ogg: 'audio/ogg',
  pdf: 'application/pdf',
}

// Fallback delivery for uploaded files. In production the page normally gets
// signed URLs straight to the Blob store; this route is used in local
// development and if signing is ever unavailable.
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const pathname = params.get('p') ?? ''
  if (!checkAccess(params.get('k'))) return new NextResponse('Unauthorized', { status: 401 })
  if (!pathname.startsWith(MEDIA_PREFIX) || pathname.includes('..')) {
    return new NextResponse('Not found', { status: 404 })
  }
  const headers = { 'Cache-Control': 'private, max-age=3600', 'X-Robots-Tag': 'noindex, nofollow' }

  if (usesBlob) {
    const res = await get(pathname, { access: 'private' })
    if (!res || res.statusCode !== 200) return new NextResponse('Not found', { status: 404 })
    return new NextResponse(res.stream, { headers: { ...headers, 'Content-Type': res.blob.contentType } })
  }

  const data = await readLocalMedia(pathname)
  if (!data) return new NextResponse('Not found', { status: 404 })
  const ext = pathname.split('.').pop()?.toLowerCase() ?? ''
  return new NextResponse(new Uint8Array(data), {
    headers: { ...headers, 'Content-Type': TYPES[ext] ?? 'application/octet-stream' },
  })
}
