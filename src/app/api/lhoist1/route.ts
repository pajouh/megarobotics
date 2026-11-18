import { NextRequest, NextResponse } from 'next/server'
import {
  InputError,
  accessConfigured,
  addEntry,
  checkAccess,
  joinPerson,
  loadSnapshot,
  saveAnswers,
  usesBlob,
  withdrawEntry,
} from '@/lib/lhoist1/store'

export const dynamic = 'force-dynamic'

const NO_STORE = { 'Cache-Control': 'no-store' }

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: NO_STORE })
}

function gate(request: NextRequest): { key: string } | NextResponse {
  if (!accessConfigured()) return json({ error: 'Der Fragenkatalog ist noch nicht freigeschaltet.' }, 503)
  const key = request.headers.get('x-lhoist-key') ?? ''
  if (!checkAccess(key)) return json({ error: 'Zugangscode ungültig.' }, 401)
  return { key }
}

export async function GET(request: NextRequest) {
  const access = gate(request)
  if (access instanceof NextResponse) return access
  try {
    const snapshot = await loadSnapshot(access.key)
    return json({ ...snapshot, uploadMode: usesBlob ? 'blob' : 'local' })
  } catch (err) {
    console.error('lhoist1 GET failed', err)
    return json({ error: 'Die Daten konnten nicht geladen werden.' }, 500)
  }
}

export async function POST(request: NextRequest) {
  const access = gate(request)
  if (access instanceof NextResponse) return access

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Ungültige Anfrage.' }, 400)
  }

  try {
    switch (body.action) {
      case 'join':
        return json({ person: await joinPerson(body.name, body.role) })
      case 'answers':
        return json({ person: await saveAnswers(body.slug, body.patch) })
      case 'entry':
        return json({ entry: await addEntry(body, access.key) })
      case 'withdraw':
        await withdrawEntry(body.slug, body.id)
        return json({ ok: true })
      default:
        return json({ error: 'Unbekannte Aktion.' }, 400)
    }
  } catch (err) {
    if (err instanceof InputError) return json({ error: err.message }, 400)
    console.error('lhoist1 POST failed', err)
    return json({ error: 'Speichern fehlgeschlagen. Bitte versuchen Sie es erneut.' }, 500)
  }
}
