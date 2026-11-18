// Storage for the Lhoist Fragenkatalog.
//
// Production: a private Vercel Blob store. Every person and every entry is one
// small JSON document; uploaded photos and videos sit next to them and are only
// reachable through short-lived signed URLs.
// Local development (no Blob credentials): plain files under .data/, so the
// form can be exercised without touching the real store.

import { createHash, randomBytes, timingSafeEqual } from 'crypto'
import { promises as fs } from 'fs'
import path from 'path'
import { get, issueSignedToken, list, presignUrl, put } from '@vercel/blob'
import {
  DEFAULT_PEOPLE,
  MEDIA_PREFIX,
  SECTION_IDS,
  cleanAnswer,
  slugifyName,
  type Answers,
} from './catalog'

export const usesBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN)

const PEOPLE_PREFIX = 'lhoist1/people/'
const ENTRIES_PREFIX = 'lhoist1/entries/'
const LOCAL_ROOT = path.join(process.cwd(), '.data')

export type Person = {
  slug: string
  name: string
  role: string
  createdAt: string
  updatedAt: string
  answers: Answers
}

export type MediaRef = { pathname: string; name: string; type: string; size: number }
export type Media = MediaRef & { url: string }

export type StoredEntry = {
  id: string
  author: string
  authorSlug: string
  sectionId: string
  title: string
  text: string
  media: MediaRef[]
  createdAt: string
  deleted?: boolean
}
export type Entry = Omit<StoredEntry, 'media' | 'deleted'> & { media: Media[] }

export class InputError extends Error {}

// ---------------------------------------------------------------- access code

// The file-based fallback exists for local development only. A production
// deployment without Blob credentials must refuse to run instead of accepting
// the development code.
const localDev = !usesBlob && process.env.NODE_ENV !== 'production'

export function accessConfigured(): boolean {
  return localDev || (usesBlob && Boolean(process.env.LHOIST1_ACCESS_CODE))
}

/** Shared access code. In local development the code is "dev". */
export function checkAccess(key: string | null | undefined): boolean {
  if (!accessConfigured() || !key) return false
  const expected = process.env.LHOIST1_ACCESS_CODE || 'dev'
  const a = createHash('sha256').update(key.trim()).digest()
  const b = createHash('sha256').update(expected).digest()
  return timingSafeEqual(a, b)
}

// ------------------------------------------------------------- raw documents

type Listed = { pathname: string; stamp: number }

function localFile(pathname: string): string {
  const file = path.join(LOCAL_ROOT, pathname)
  if (!file.startsWith(LOCAL_ROOT + path.sep)) throw new InputError('Ungültiger Pfad.')
  return file
}

async function listDocs(prefix: string): Promise<Listed[]> {
  if (usesBlob) {
    const out: Listed[] = []
    let cursor: string | undefined
    do {
      const page = await list({ prefix, cursor, limit: 1000 })
      for (const b of page.blobs) out.push({ pathname: b.pathname, stamp: new Date(b.uploadedAt).getTime() })
      cursor = page.hasMore ? page.cursor : undefined
    } while (cursor)
    return out
  }
  const dir = localFile(prefix)
  const names = await fs.readdir(dir).catch(() => [] as string[])
  return Promise.all(
    names
      .filter((n) => n.endsWith('.json'))
      .map(async (n) => ({ pathname: prefix + n, stamp: (await fs.stat(path.join(dir, n))).mtimeMs })),
  )
}

async function readDoc<T>(pathname: string): Promise<T | null> {
  if (usesBlob) {
    const res = await get(pathname, { access: 'private', useCache: false })
    if (!res || res.statusCode !== 200) return null
    return (await new Response(res.stream).json()) as T
  }
  const raw = await fs.readFile(localFile(pathname), 'utf8').catch(() => null)
  return raw ? (JSON.parse(raw) as T) : null
}

async function writeDoc(pathname: string, data: unknown): Promise<void> {
  const body = JSON.stringify(data)
  if (usesBlob) {
    await put(pathname, body, {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
    })
  } else {
    const file = localFile(pathname)
    await fs.mkdir(path.dirname(file), { recursive: true })
    await fs.writeFile(file, body)
  }
  docCache.delete(pathname)
}

// A warm function instance re-reads only the documents that changed since its
// last request; the listing carries each document's upload time.
const docCache = new Map<string, { stamp: number; data: unknown }>()

async function readAll<T>(prefix: string): Promise<T[]> {
  const listed = await listDocs(prefix)
  const docs = await Promise.all(
    listed.map(async ({ pathname, stamp }) => {
      const hit = docCache.get(pathname)
      if (hit && hit.stamp === stamp) return hit.data as T
      const data = await readDoc<T>(pathname)
      if (data) docCache.set(pathname, { stamp, data })
      return data
    }),
  )
  return docs.filter((d): d is NonNullable<typeof d> => d !== null) as T[]
}

// -------------------------------------------------------------------- media

type Signer = { delegationToken: string; clientSigningToken: string; validUntil: number }
let signer: Signer | null = null
const HOUR = 3600_000

async function getSigner(): Promise<Signer> {
  if (signer && signer.validUntil - Date.now() > 2 * HOUR) return signer
  try {
    signer = await issueSignedToken({ pathname: '*', operations: ['get'], validUntil: Date.now() + 12 * HOUR })
  } catch {
    // Fall back to the API's default lifetime if the longer one is refused.
    signer = await issueSignedToken({ pathname: '*', operations: ['get'] })
  }
  return signer
}

/** URL the browser can load a stored photo, video or recording from. */
async function mediaUrl(pathname: string, key: string): Promise<string> {
  const viaApi = `/api/lhoist1/media?p=${encodeURIComponent(pathname)}&k=${encodeURIComponent(key)}`
  if (!usesBlob) return viaApi
  try {
    const { presignedUrl } = await presignUrl(await getSigner(), { access: 'private', operation: 'get', pathname })
    return presignedUrl
  } catch (err) {
    console.error('lhoist1: could not sign media URL, serving through the API instead', err)
    return viaApi
  }
}

function cleanMedia(input: unknown): MediaRef[] {
  if (!Array.isArray(input)) return []
  return input.slice(0, 20).map((m) => {
    const pathname = typeof m?.pathname === 'string' ? m.pathname : ''
    if (!pathname.startsWith(MEDIA_PREFIX) || pathname.includes('..')) throw new InputError('Ungültige Datei.')
    return {
      pathname,
      name: String(m.name ?? '').slice(0, 200),
      type: String(m.type ?? '').slice(0, 100),
      size: Number(m.size) || 0,
    }
  })
}

// ------------------------------------------------------------------- people

function personPath(slug: string): string {
  return `${PEOPLE_PREFIX}${slug}.json`
}

function seedPerson(name: string): Person {
  return { slug: slugifyName(name), name, role: '', createdAt: '', updatedAt: '', answers: {} }
}

function requireSlug(slug: unknown): string {
  if (typeof slug !== 'string' || !/^[a-z0-9-]{1,60}$/.test(slug)) throw new InputError('Unbekannte Person.')
  return slug
}

async function loadPerson(slug: string): Promise<Person | null> {
  const stored = await readDoc<Person>(personPath(slug))
  if (stored) return stored
  const seed = DEFAULT_PEOPLE.find((n) => slugifyName(n) === slug)
  return seed ? seedPerson(seed) : null
}

export async function joinPerson(nameInput: unknown, roleInput: unknown): Promise<Person> {
  const name = typeof nameInput === 'string' ? nameInput.replace(/\s+/g, ' ').trim().slice(0, 80) : ''
  const slug = slugifyName(name)
  if (name.length < 2 || !slug) throw new InputError('Bitte geben Sie Ihren Namen ein.')
  const role = typeof roleInput === 'string' ? roleInput.replace(/\s+/g, ' ').trim().slice(0, 80) : ''

  const now = new Date().toISOString()
  const existing = await loadPerson(slug)
  const person: Person = existing
    ? { ...existing, role: role || existing.role, createdAt: existing.createdAt || now }
    : { slug, name, role, createdAt: now, updatedAt: now, answers: {} }
  await writeDoc(personPath(slug), person)
  return person
}

export async function saveAnswers(slugInput: unknown, patch: unknown): Promise<Person> {
  const slug = requireSlug(slugInput)
  if (!patch || typeof patch !== 'object' || Array.isArray(patch)) throw new InputError('Ungültige Antworten.')
  const person = await loadPerson(slug)
  if (!person) throw new InputError('Unbekannte Person.')

  const answers = { ...person.answers }
  for (const [key, value] of Object.entries(patch as Record<string, unknown>)) {
    const cleaned = cleanAnswer(key, value)
    if (cleaned === undefined) throw new InputError(`Ungültige Antwort (${key}).`)
    if (cleaned === null) delete answers[key]
    else answers[key] = cleaned
  }
  const now = new Date().toISOString()
  const updated: Person = { ...person, answers, createdAt: person.createdAt || now, updatedAt: now }
  await writeDoc(personPath(slug), updated)
  return updated
}

// ------------------------------------------------------------------ entries

async function publicEntry(e: StoredEntry, key: string): Promise<Entry> {
  const media = await Promise.all(e.media.map(async (m) => ({ ...m, url: await mediaUrl(m.pathname, key) })))
  return {
    id: e.id,
    author: e.author,
    authorSlug: e.authorSlug,
    sectionId: e.sectionId,
    title: e.title,
    text: e.text,
    createdAt: e.createdAt,
    media,
  }
}

export async function addEntry(
  input: { slug?: unknown; sectionId?: unknown; title?: unknown; text?: unknown; media?: unknown },
  key: string,
): Promise<Entry> {
  const person = await loadPerson(requireSlug(input.slug))
  if (!person) throw new InputError('Unbekannte Person.')
  if (typeof input.sectionId !== 'string' || !SECTION_IDS.has(input.sectionId)) {
    throw new InputError('Unbekannter Abschnitt.')
  }
  const title = typeof input.title === 'string' ? input.title.trim().slice(0, 160) : ''
  const text = typeof input.text === 'string' ? input.text.trim().slice(0, 8000) : ''
  const media = cleanMedia(input.media)
  if (!title && !text && media.length === 0) throw new InputError('Bitte Text eingeben oder eine Datei anhängen.')

  const entry: StoredEntry = {
    id: `${Date.now().toString(36)}-${randomBytes(4).toString('hex')}`,
    author: person.name,
    authorSlug: person.slug,
    sectionId: input.sectionId,
    title,
    text,
    media,
    createdAt: new Date().toISOString(),
  }
  await writeDoc(`${ENTRIES_PREFIX}${entry.id}.json`, entry)
  return publicEntry(entry, key)
}

/** Authors can withdraw their own entries. The record and its files are kept, only hidden. */
export async function withdrawEntry(slugInput: unknown, idInput: unknown): Promise<void> {
  const slug = requireSlug(slugInput)
  if (typeof idInput !== 'string' || !/^[a-z0-9-]{1,40}$/.test(idInput)) throw new InputError('Unbekannter Eintrag.')
  const pathname = `${ENTRIES_PREFIX}${idInput}.json`
  const entry = await readDoc<StoredEntry>(pathname)
  if (!entry || entry.authorSlug !== slug) throw new InputError('Nur eigene Einträge können entfernt werden.')
  await writeDoc(pathname, { ...entry, deleted: true })
}

// ----------------------------------------------------------------- snapshot

export async function loadSnapshot(key: string): Promise<{ people: Person[]; entries: Entry[] }> {
  const [stored, rawEntries] = await Promise.all([
    readAll<Person>(PEOPLE_PREFIX),
    readAll<StoredEntry>(ENTRIES_PREFIX),
  ])

  const people = [...stored]
  for (const name of DEFAULT_PEOPLE) {
    if (!people.some((p) => p.slug === slugifyName(name))) people.push(seedPerson(name))
  }
  people.sort((a, b) => a.name.localeCompare(b.name, 'de'))

  const visible = rawEntries.filter((e) => !e.deleted).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  const entries = await Promise.all(visible.map((e) => publicEntry(e, key)))
  return { people, entries }
}

// ------------------------------------------------------ local-dev media only

export async function saveLocalMedia(pathname: string, data: Buffer): Promise<void> {
  const file = localFile(pathname)
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, data)
}

export async function readLocalMedia(pathname: string): Promise<Buffer | null> {
  return fs.readFile(localFile(pathname)).catch(() => null)
}
