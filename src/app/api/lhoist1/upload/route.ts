import { randomBytes } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { MEDIA_PREFIX } from '@/lib/lhoist1/catalog'
import { checkAccess, saveLocalMedia, usesBlob } from '@/lib/lhoist1/store'

export const dynamic = 'force-dynamic'

const ALLOWED_TYPES = ['image/*', 'video/*', 'audio/*', 'application/pdf']
const MAX_BYTES = 1024 * 1024 * 1024 // 1 GB per file

function validPath(pathname: string): boolean {
  return pathname.startsWith(MEDIA_PREFIX) && !pathname.includes('..')
}

// Photos and videos go straight from the browser to the Blob store; this route
// only hands out a short-lived upload token after checking the access code.
export async function POST(request: NextRequest) {
  if (!usesBlob) return localUpload(request)

  const body = (await request.json()) as HandleUploadBody
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const { key } = JSON.parse(clientPayload || '{}') as { key?: string }
        if (!checkAccess(key)) throw new Error('Zugangscode ungültig.')
        if (!validPath(pathname)) throw new Error('Ungültiger Dateipfad.')
        return {
          allowedContentTypes: ALLOWED_TYPES,
          maximumSizeInBytes: MAX_BYTES,
          addRandomSuffix: true,
        }
      },
    })
    return NextResponse.json(result)
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 400 })
  }
}

// Local development without Blob credentials: store the file under .data/.
async function localUpload(request: NextRequest) {
  if (!checkAccess(request.headers.get('x-lhoist-key'))) {
    return NextResponse.json({ error: 'Zugangscode ungültig.' }, { status: 401 })
  }
  const form = await request.formData()
  const file = form.get('file')
  const requested = String(form.get('pathname') ?? '')
  if (!(file instanceof File) || !validPath(requested)) {
    return NextResponse.json({ error: 'Ungültige Datei.' }, { status: 400 })
  }
  const dot = requested.lastIndexOf('.')
  const suffix = randomBytes(6).toString('hex')
  const pathname = dot > 0 ? `${requested.slice(0, dot)}-${suffix}${requested.slice(dot)}` : `${requested}-${suffix}`
  await saveLocalMedia(pathname, Buffer.from(await file.arrayBuffer()))
  return NextResponse.json({ pathname })
}
