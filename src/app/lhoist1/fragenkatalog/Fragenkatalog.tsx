'use client'

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { upload } from '@vercel/blob/client'
import {
  MAX_TEXT,
  MEDIA_PREFIX,
  NOTE_SUFFIX,
  PROCESS_STEPS,
  QUESTION_COUNT,
  SCALE_LABELS,
  SECTIONS,
  countAnswered,
  isAnswered,
  type AnswerValue,
  type Answers,
  type Question,
  type Section,
} from '@/lib/lhoist1/catalog'
import './fragenkatalog.css'

type Person = { slug: string; name: string; role: string; updatedAt: string; answers: Answers }
type Media = { pathname: string; name: string; type: string; size: number; url: string }
type Entry = {
  id: string
  author: string
  authorSlug: string
  sectionId: string
  title: string
  text: string
  createdAt: string
  media: Media[]
}
type Snapshot = { people: Person[]; entries: Entry[]; uploadMode: 'blob' | 'local' }
type SaveState = 'idle' | 'saving' | 'saved' | 'error'

const KEY_STORE = 'lhoist1.key'
const ME_STORE = 'lhoist1.me'
const POLL_MS = 30_000
const URL_MAX_AGE = 8 * 3600_000

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message)
  }
}

async function api<T>(key: string, body?: unknown): Promise<T> {
  const res = await fetch('/api/lhoist1', {
    method: body ? 'POST' : 'GET',
    headers: { 'x-lhoist-key': key, ...(body ? { 'Content-Type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new ApiError(data.error || 'Die Verbindung ist fehlgeschlagen.', res.status)
  return data as T
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase()
}

function formatValue(q: Question, value: AnswerValue | undefined): string {
  if (!isAnswered(value)) return ''
  if (Array.isArray(value)) return value.join(', ')
  if (q.type === 'scale') return `${value} von 5 (${SCALE_LABELS[Number(value) - 1]})`
  return value as string
}

function formatTime(iso: string): string {
  if (!iso) return ''
  return new Date(iso).toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1).replace('.', ',')} MB`
  return `${Math.max(1, Math.round(bytes / 1024))} KB`
}

// ============================================================== main component

export default function Fragenkatalog() {
  const [ready, setReady] = useState(false)
  const [key, setKey] = useState('')
  const [gateError, setGateError] = useState('')
  const [meSlug, setMeSlug] = useState('')
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null)
  const [loadError, setLoadError] = useState('')
  const [answers, setAnswers] = useState<Answers>({})
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [view, setView] = useState<'form' | 'overview'>('form')
  const [sectionIndex, setSectionIndex] = useState(0)

  const pending = useRef<Record<string, AnswerValue>>({})
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const flushing = useRef(false)
  const urlCache = useRef(new Map<string, { url: string; at: number }>())
  const topRef = useRef<HTMLDivElement>(null)

  // Access code: taken from the invitation link (?k=…) once, then remembered.
  useEffect(() => {
    const url = new URL(window.location.href)
    const fromLink = url.searchParams.get('k')
    if (fromLink) {
      window.localStorage.setItem(KEY_STORE, fromLink)
      url.searchParams.delete('k')
      window.history.replaceState(null, '', url.pathname + url.search)
    }
    setKey(window.localStorage.getItem(KEY_STORE) ?? '')
    setMeSlug(window.localStorage.getItem(ME_STORE) ?? '')
    setReady(true)
  }, [])

  // Signed media URLs change on every load; keep the first one per file so a
  // refresh in the background does not restart a video someone is watching.
  const stabilise = useCallback((entries: Entry[]): Entry[] => {
    const now = Date.now()
    return entries.map((entry) => ({
      ...entry,
      media: entry.media.map((m) => {
        const hit = urlCache.current.get(m.pathname)
        if (hit && now - hit.at < URL_MAX_AGE) return { ...m, url: hit.url }
        urlCache.current.set(m.pathname, { url: m.url, at: now })
        return m
      }),
    }))
  }, [])

  const load = useCallback(async () => {
    if (!key) return
    try {
      const data = await api<Snapshot>(key)
      setSnapshot({ ...data, entries: stabilise(data.entries) })
      setLoadError('')
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        window.localStorage.removeItem(KEY_STORE)
        setKey('')
        setSnapshot(null)
        setGateError('Dieser Zugangscode ist nicht gültig.')
      } else {
        setLoadError(err instanceof Error ? err.message : 'Die Daten konnten nicht geladen werden.')
      }
    }
  }, [key, stabilise])

  useEffect(() => {
    if (!key) return
    load()
    const id = setInterval(() => {
      if (document.visibilityState === 'visible') load()
    }, POLL_MS)
    const onFocus = () => load()
    window.addEventListener('focus', onFocus)
    return () => {
      clearInterval(id)
      window.removeEventListener('focus', onFocus)
    }
  }, [key, load])

  const me = snapshot?.people.find((p) => p.slug === meSlug) ?? null

  // My own answers live in local state from the moment I am identified; what
  // the server returns later never overwrites what I am typing.
  const loadedFor = useRef('')
  useEffect(() => {
    if (me && loadedFor.current !== me.slug) {
      loadedFor.current = me.slug
      setAnswers(me.answers)
    }
  }, [me])

  // One timer drives all saving: typing re-arms it, a failed save re-arms it
  // with a longer delay.
  const flushRef = useRef<() => void>(() => {})
  const schedule = useCallback((ms: number) => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      timer.current = null
      flushRef.current()
    }, ms)
  }, [])

  const flush = useCallback(async () => {
    if (flushing.current || !key || !meSlug) return
    const patch = pending.current
    if (Object.keys(patch).length === 0) return
    pending.current = {}
    flushing.current = true
    setSaveState('saving')
    let retryIn = 0
    try {
      await api(key, { action: 'answers', slug: meSlug, patch })
      setSaveState('saved')
    } catch {
      // Keep the unsaved answers and try again shortly.
      pending.current = { ...patch, ...pending.current }
      setSaveState('error')
      retryIn = 5000
    } finally {
      flushing.current = false
    }
    if (retryIn) schedule(retryIn)
    else if (Object.keys(pending.current).length && !timer.current) schedule(600)
  }, [key, meSlug, schedule])

  useEffect(() => {
    flushRef.current = flush
  }, [flush])

  const setAnswer = useCallback(
    (id: string, value: AnswerValue) => {
      setAnswers((prev) => ({ ...prev, [id]: value }))
      pending.current[id] = value
      setSaveState('saving')
      schedule(900)
    },
    [schedule],
  )

  // Last chance to save when the tab is closed mid-typing.
  useEffect(() => {
    const onHide = () => {
      const patch = pending.current
      if (!key || !meSlug || Object.keys(patch).length === 0) return
      pending.current = {}
      fetch('/api/lhoist1', {
        method: 'POST',
        keepalive: true,
        headers: { 'x-lhoist-key': key, 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'answers', slug: meSlug, patch }),
      }).catch(() => {})
    }
    window.addEventListener('pagehide', onHide)
    return () => window.removeEventListener('pagehide', onHide)
  }, [key, meSlug])

  const identify = useCallback(
    async (name: string, role: string) => {
      const { person } = await api<{ person: Person }>(key, { action: 'join', name, role })
      window.localStorage.setItem(ME_STORE, person.slug)
      loadedFor.current = person.slug
      setAnswers(person.answers)
      setMeSlug(person.slug)
      setSnapshot((prev) =>
        prev ? { ...prev, people: [...prev.people.filter((p) => p.slug !== person.slug), person] } : prev,
      )
    },
    [key],
  )

  const switchPerson = useCallback(() => {
    flush()
    window.localStorage.removeItem(ME_STORE)
    loadedFor.current = ''
    setMeSlug('')
    load()
  }, [flush, load])

  const addEntry = useCallback((entry: Entry) => {
    setSnapshot((prev) => (prev ? { ...prev, entries: stabilise([entry, ...prev.entries]) } : prev))
  }, [stabilise])

  const withdraw = useCallback(
    async (id: string) => {
      await api(key, { action: 'withdraw', slug: meSlug, id })
      setSnapshot((prev) => (prev ? { ...prev, entries: prev.entries.filter((e) => e.id !== id) } : prev))
    },
    [key, meSlug],
  )

  const goToSection = useCallback((index: number) => {
    setSectionIndex(index)
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  // Everyone as others see them: my row uses what is on my screen right now.
  const people = useMemo(
    () => (snapshot?.people ?? []).map((p) => (p.slug === meSlug ? { ...p, answers } : p)),
    [snapshot, meSlug, answers],
  )

  if (!ready) return <div className="fk" />

  if (!key) {
    return (
      <Shell>
        <Gate
          error={gateError}
          onSubmit={(code) => {
            window.localStorage.setItem(KEY_STORE, code)
            setGateError('')
            setKey(code)
          }}
        />
      </Shell>
    )
  }

  if (!snapshot) {
    return (
      <Shell>
        <div className="fk-center">
          <p className={loadError ? 'fk-err' : 'fk-mono'}>{loadError || 'Fragenkatalog wird geladen …'}</p>
        </div>
      </Shell>
    )
  }

  if (!me) {
    return (
      <Shell>
        <NamePicker people={snapshot.people} onPick={identify} />
      </Shell>
    )
  }

  const answered = countAnswered(answers)
  const section = SECTIONS[sectionIndex]

  return (
    <Shell
      right={
        <>
          <div className="fk-tabs" role="group" aria-label="Ansicht">
            <button type="button" aria-pressed={view === 'form'} onClick={() => setView('form')}>
              Fragen
            </button>
            <button type="button" aria-pressed={view === 'overview'} onClick={() => setView('overview')}>
              Alle Antworten
            </button>
          </div>
          <span className="fk-status" data-state={saveState} aria-live="polite">
            {saveState === 'saving' && 'Speichert …'}
            {saveState === 'saved' && 'Gespeichert ✓'}
            {saveState === 'error' && 'Nicht gespeichert – neuer Versuch'}
          </span>
          <div className="fk-who">
            <span className="fk-avatar">{initials(me.name)}</span>
            <span>{me.name}</span>
            <button type="button" className="fk-link" onClick={switchPerson}>
              wechseln
            </button>
          </div>
        </>
      }
    >
      {view === 'overview' ? (
        <Overview people={people} entries={snapshot.entries} meSlug={meSlug} onWithdraw={withdraw} />
      ) : (
        <div className="fk-wrap">
          <div className="fk-intro">
            <p className="fk-eyebrow">Rheinkalk · Kalkwerk Wülfrath</p>
            <h1>
              Fragenkatalog <em>Inspektionsroboter</em>
            </h1>
            <p className="fk-lead">
              Jede Frage hier entscheidet etwas an Ihrem Roboter: das Modell, den Antrieb oder einen Sensor. Beantworten
              Sie, was Sie wissen, und überspringen Sie den Rest. Alles wird automatisch gespeichert und ist für alle
              Beteiligten sichtbar. Sie können jederzeit wiederkommen und ergänzen.
            </p>
            <div className="fk-chain" aria-label="Prozesskette">
              {PROCESS_STEPS.map((step, i) => (
                <FragmentStep key={step} step={step} last={i === PROCESS_STEPS.length - 1} />
              ))}
            </div>
            <div className="fk-progress">
              <span className="fk-mono">
                {answered} von {QUESTION_COUNT} Fragen beantwortet
              </span>
              <div className="fk-track" role="progressbar" aria-valuemin={0} aria-valuemax={QUESTION_COUNT} aria-valuenow={answered}>
                <div style={{ width: `${(answered / QUESTION_COUNT) * 100}%` }} />
              </div>
            </div>
          </div>

          <div className="fk-grid" ref={topRef} style={{ scrollMarginTop: 80 }}>
            <nav className="fk-nav" aria-label="Abschnitte">
              {SECTIONS.map((s, i) => {
                const done = s.questions.filter((q) => isAnswered(answers[q.id])).length
                return (
                  <button
                    key={s.id}
                    type="button"
                    aria-current={i === sectionIndex}
                    onClick={() => goToSection(i)}
                  >
                    <span className="n">{String(i + 1).padStart(2, '0')}</span>
                    <span>{s.title}</span>
                    <span className="c" data-done={done === s.questions.length}>
                      {done}/{s.questions.length}
                    </span>
                  </button>
                )
              })}
            </nav>

            <SectionView
              key={section.id}
              index={sectionIndex}
              section={section}
              answers={answers}
              setAnswer={setAnswer}
              others={people.filter((p) => p.slug !== meSlug)}
              entries={snapshot.entries.filter((e) => e.sectionId === section.id)}
              accessKey={key}
              me={me}
              uploadMode={snapshot.uploadMode}
              onEntry={addEntry}
              onWithdraw={withdraw}
              onGo={goToSection}
              onOverview={() => {
                setView('overview')
                window.scrollTo({ top: 0 })
              }}
            />
          </div>
        </div>
      )}
    </Shell>
  )
}

function FragmentStep({ step, last }: { step: string; last: boolean }) {
  return (
    <>
      <span>{step}</span>
      {!last && <i aria-hidden="true">→</i>}
    </>
  )
}

// ====================================================================== shell

function Shell({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="fk" lang="de">
      <div className="fk-bar">
        <div className="fk-wrap">
          {/* /lhoist1 is a static HTML presentation, not an app route: full page load. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a className="fk-brand" href="/lhoist1" title="Zur Präsentation">
            <div className="fk-mark">m</div>
            <b>megarobotics</b>
            <span>× Rheinkalk</span>
          </a>
          {right}
        </div>
      </div>
      {children}
      <footer className="fk-foot">
        <div className="fk-wrap">
          MegaRobotics ist eine Marke der MEGAFORCE GmbH, Wacholderweg 8, 41564 Kaarst. Fragen zum Katalog: Masoud
          Pajouh, <a href="tel:+491722008875">+49 172 200 8875</a>,{' '}
          <a href="mailto:mp@megarobotics.de">mp@megarobotics.de</a>. Ihre Angaben und Dateien verwenden wir
          ausschließlich für dieses Projekt. <Link href="/de/privacy">Datenschutz</Link>
        </div>
      </footer>
    </div>
  )
}

// ======================================================================= gate

function Gate({ error, onSubmit }: { error: string; onSubmit: (code: string) => void }) {
  const [code, setCode] = useState('')
  return (
    <div className="fk-center">
      <div className="fk-card">
        <p className="fk-eyebrow">Fragenkatalog</p>
        <h1>Zugangscode</h1>
        <p className="fk-lead">Bitte geben Sie den Zugangscode aus unserer E-Mail ein.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (code.trim()) onSubmit(code.trim())
          }}
        >
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Zugangscode"
            aria-label="Zugangscode"
            autoFocus
          />
          {error && <p className="fk-err">{error}</p>}
          <button className="fk-btn" type="submit" disabled={!code.trim()}>
            Öffnen
          </button>
        </form>
      </div>
    </div>
  )
}

// ================================================================ name picker

function NamePicker({ people, onPick }: { people: Person[]; onPick: (name: string, role: string) => Promise<void> }) {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const pick = async (n: string, r: string) => {
    setBusy(true)
    setError('')
    try {
      await onPick(n, r)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Das hat nicht geklappt.')
      setBusy(false)
    }
  }

  return (
    <div className="fk-center">
      <div className="fk-card">
        <p className="fk-eyebrow">Fragenkatalog · Kalkwerk Wülfrath</p>
        <h1>Wer füllt aus?</h1>
        <p className="fk-lead">Wählen Sie Ihren Namen, damit Ihre Antworten Ihnen zugeordnet werden.</p>
        <div className="fk-people">
          {people.map((p) => {
            const n = countAnswered(p.answers)
            return (
              <button key={p.slug} type="button" disabled={busy} onClick={() => pick(p.name, '')}>
                <span className="fk-avatar">{initials(p.name)}</span>
                <span>
                  {p.name}
                  {p.role && <small>{p.role}</small>}
                </span>
                <span className="fk-mono">{n > 0 ? `${n} Antworten` : 'neu'}</span>
              </button>
            )
          })}
        </div>
        <div className="fk-sep">oder neu hinzufügen</div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (name.trim().length >= 2) pick(name, role)
          }}
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Vor- und Nachname"
            aria-label="Vor- und Nachname"
            maxLength={80}
          />
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Funktion oder Abteilung (optional)"
            aria-label="Funktion oder Abteilung"
            maxLength={80}
          />
          {error && <p className="fk-err">{error}</p>}
          <button className="fk-btn" type="submit" disabled={busy || name.trim().length < 2}>
            Hinzufügen und starten
          </button>
        </form>
      </div>
    </div>
  )
}

// ==================================================================== section

function SectionView(props: {
  index: number
  section: Section
  answers: Answers
  setAnswer: (id: string, value: AnswerValue) => void
  others: Person[]
  entries: Entry[]
  accessKey: string
  me: Person
  uploadMode: 'blob' | 'local'
  onEntry: (entry: Entry) => void
  onWithdraw: (id: string) => Promise<void>
  onGo: (index: number) => void
  onOverview: () => void
}) {
  const { index, section, answers, setAnswer, others } = props
  const last = index === SECTIONS.length - 1
  return (
    <section className="fk-sec">
      <p className="fk-eyebrow">
        {String(index + 1).padStart(2, '0')} von {String(SECTIONS.length).padStart(2, '0')}
      </p>
      <h2>{section.title}</h2>
      <p className="fk-decides">
        <span>Entscheidet über</span>
        {section.decides}
      </p>
      <p className="fk-lead">{section.intro}</p>

      <div className="fk-qs">
        {section.questions.map((q) => (
          <QuestionCard
            key={q.id}
            q={q}
            value={answers[q.id]}
            note={(answers[q.id + NOTE_SUFFIX] as string) ?? ''}
            onChange={setAnswer}
            others={others}
          />
        ))}
      </div>

      <div className="fk-box">
        <h3>Fotos, Videos und Anmerkungen zu diesem Bereich</h3>
        <p className="fk-hint">{section.mediaHint}</p>
        <Composer
          sectionId={section.id}
          accessKey={props.accessKey}
          me={props.me}
          uploadMode={props.uploadMode}
          onEntry={props.onEntry}
        />
        <EntryList entries={props.entries} meSlug={props.me.slug} onWithdraw={props.onWithdraw} />
      </div>

      <div className="fk-pager">
        <button type="button" className="fk-btn ghost" disabled={index === 0} onClick={() => props.onGo(index - 1)}>
          ← Zurück
        </button>
        {last ? (
          <button type="button" className="fk-btn" onClick={props.onOverview}>
            Alle Antworten ansehen
          </button>
        ) : (
          <button type="button" className="fk-btn" onClick={() => props.onGo(index + 1)}>
            Weiter: {SECTIONS[index + 1].title} →
          </button>
        )}
      </div>
    </section>
  )
}

function QuestionCard({
  q,
  value,
  note,
  onChange,
  others,
}: {
  q: Question
  value: AnswerValue | undefined
  note: string
  onChange: (id: string, value: AnswerValue) => void
  others: Person[]
}) {
  const text = typeof value === 'string' ? value : ''
  const picked = Array.isArray(value) ? value : []
  const inputId = `fk-${q.id}`
  const isChoice = q.type === 'single' || q.type === 'multi' || q.type === 'scale'

  return (
    <div className="fk-q" data-answered={isAnswered(value)}>
      {isChoice ? (
        <p className="fk-ql" id={inputId}>
          {q.label}
        </p>
      ) : (
        <label className="fk-ql" htmlFor={inputId}>
          {q.label}
        </label>
      )}
      {q.hint && <p className="fk-hint">{q.hint}</p>}

      {(q.type === 'text' || q.type === 'long') && (
        <GrowingText
          id={inputId}
          className="fk-in"
          minRows={q.type === 'long' ? 3 : 1}
          value={text}
          placeholder={q.placeholder ?? 'Ihre Antwort'}
          onChange={(v) => onChange(q.id, v)}
        />
      )}
      {q.type === 'single' && (
        <div className="fk-opts" role="radiogroup" aria-labelledby={inputId}>
          {q.options!.map((o) => (
            <button
              key={o}
              type="button"
              role="radio"
              className="fk-opt"
              aria-checked={text === o}
              onClick={() => onChange(q.id, text === o ? '' : o)}
            >
              {o}
            </button>
          ))}
        </div>
      )}
      {q.type === 'multi' && (
        <div className="fk-opts" role="group" aria-labelledby={inputId}>
          {q.options!.map((o) => {
            const on = picked.includes(o)
            return (
              <button
                key={o}
                type="button"
                className="fk-opt"
                aria-pressed={on}
                onClick={() => onChange(q.id, on ? picked.filter((p) => p !== o) : [...picked, o])}
              >
                {o}
              </button>
            )
          })}
        </div>
      )}
      {q.type === 'scale' && (
        <div className="fk-scale" role="radiogroup" aria-labelledby={inputId}>
          {SCALE_LABELS.map((label, i) => {
            const v = String(i + 1)
            return (
              <button
                key={v}
                type="button"
                role="radio"
                aria-checked={text === v}
                onClick={() => onChange(q.id, text === v ? '' : v)}
              >
                <b>{v}</b>
                <small>{label}</small>
              </button>
            )
          })}
        </div>
      )}
      {isChoice && (
        <GrowingText
          className="fk-note"
          minRows={1}
          value={note}
          placeholder={q.type === 'multi' ? 'Sonstiges oder Anmerkung (optional)' : 'Anmerkung (optional)'}
          ariaLabel={`Anmerkung zu: ${q.label}`}
          onChange={(v) => onChange(q.id + NOTE_SUFFIX, v)}
        />
      )}

      <OtherAnswers q={q} people={others} />
    </div>
  )
}

function OtherAnswers({ q, people }: { q: Question; people: Person[] }) {
  const rows = people
    .map((p) => ({
      p,
      value: formatValue(q, p.answers[q.id]),
      note: typeof p.answers[q.id + NOTE_SUFFIX] === 'string' ? (p.answers[q.id + NOTE_SUFFIX] as string) : '',
    }))
    .filter((r) => r.value || r.note.trim())
  if (rows.length === 0) return null
  return (
    <div className="fk-others">
      {rows.map(({ p, value, note }) => (
        <div className="fk-other" key={p.slug}>
          <span className="fk-avatar" title={p.name}>
            {initials(p.name)}
          </span>
          <LongText name={p.name} value={value} note={note.trim()} />
        </div>
      ))}
    </div>
  )
}

const CLAMP_AT = 420

/** A colleague's answer. Long answers are shortened until someone asks for the rest. */
function LongText({ name, value, note }: { name: string; value: string; note: string }) {
  const [open, setOpen] = useState(false)
  const long = value.length > CLAMP_AT
  const shown = long && !open ? value.slice(0, CLAMP_AT).trimEnd() + ' …' : value
  return (
    <p>
      <b>{name}:</b> {shown}
      {long && (
        <>
          {' '}
          <button type="button" className="fk-link" onClick={() => setOpen(!open)}>
            {open ? 'weniger anzeigen' : 'ganz anzeigen'}
          </button>
        </>
      )}
      {value && note ? ' ' : ''}
      {note && <em>({note})</em>}
    </p>
  )
}

// =============================================================== text fields

/**
 * Text field that grows with its content, so a long answer stays fully
 * visible while typing. Past roughly half the screen it scrolls instead, and
 * a counter appears near the length limit.
 */
function GrowingText({
  id,
  className,
  value,
  onChange,
  placeholder,
  ariaLabel,
  minRows,
  disabled,
}: {
  id?: string
  className?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  ariaLabel?: string
  minRows: number
  disabled?: boolean
}) {
  const ref = useRef<HTMLTextAreaElement>(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight + 2}px`
  }, [value])
  const left = MAX_TEXT - value.length
  return (
    <>
      <textarea
        ref={ref}
        id={id}
        className={`fk-grow ${className ?? ''}`}
        rows={minRows}
        value={value}
        maxLength={MAX_TEXT}
        placeholder={placeholder}
        aria-label={ariaLabel}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />
      {left <= 500 && (
        <p className="fk-count" data-full={left === 0}>
          {left === 0 ? 'Maximale Länge erreicht. Für mehr Text bitte einen Eintrag unten anlegen.' : `Noch ${left} Zeichen`}
        </p>
      )}
    </>
  )
}

// =================================================================== composer

type Picked = { id: string; file: File; progress: number }

function safeFileName(name: string): string {
  const dot = name.lastIndexOf('.')
  const base = (dot > 0 ? name.slice(0, dot) : name)
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
  const ext = dot > 0 ? name.slice(dot).toLowerCase().replace(/[^.a-z0-9]/g, '') : ''
  return (base || 'datei') + ext
}

function Composer({
  sectionId,
  accessKey,
  me,
  uploadMode,
  onEntry,
}: {
  sectionId: string
  accessKey: string
  me: Person
  uploadMode: 'blob' | 'local'
  onEntry: (entry: Entry) => void
}) {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [files, setFiles] = useState<Picked[]>([])
  const [busy, setBusy] = useState(false)
  const [over, setOver] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const addFiles = (list: FileList | null) => {
    if (!list) return
    const next = Array.from(list).map((file) => ({ id: `${file.name}-${file.size}-${file.lastModified}`, file, progress: 0 }))
    setFiles((prev) => [...prev, ...next.filter((n) => !prev.some((p) => p.id === n.id))])
  }

  const setProgress = (id: string, progress: number) =>
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, progress } : f)))

  const uploadOne = async ({ id, file }: Picked): Promise<Omit<Media, 'url'>> => {
    const pathname = `${MEDIA_PREFIX}${me.slug}/${Date.now()}-${safeFileName(file.name)}`
    const meta = { name: file.name, type: file.type, size: file.size }
    if (uploadMode === 'local') {
      const form = new FormData()
      form.set('file', file)
      form.set('pathname', pathname)
      const res = await fetch('/api/lhoist1/upload', { method: 'POST', headers: { 'x-lhoist-key': accessKey }, body: form })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload fehlgeschlagen.')
      setProgress(id, 100)
      return { pathname: data.pathname, ...meta }
    }
    const blob = await upload(pathname, file, {
      access: 'private',
      handleUploadUrl: '/api/lhoist1/upload',
      clientPayload: JSON.stringify({ key: accessKey }),
      multipart: file.size > 20 * 1024 * 1024,
      onUploadProgress: (e) => setProgress(id, e.percentage),
    })
    return { pathname: blob.pathname, ...meta }
  }

  const submit = async () => {
    setBusy(true)
    setError('')
    try {
      const media = []
      for (const picked of files) media.push(await uploadOne(picked))
      const { entry } = await api<{ entry: Entry }>(accessKey, {
        action: 'entry',
        slug: me.slug,
        sectionId,
        title,
        text,
        media,
      })
      onEntry(entry)
      setTitle('')
      setText('')
      setFiles([])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Der Eintrag konnte nicht gespeichert werden.')
    } finally {
      setBusy(false)
    }
  }

  const empty = !title.trim() && !text.trim() && files.length === 0

  return (
    <div className="fk-composer">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titel (optional), z. B. „Bandbrücke 3, Laufsteg Nordseite“"
        aria-label="Titel"
        maxLength={160}
        disabled={busy}
      />
      <GrowingText
        minRows={3}
        value={text}
        onChange={setText}
        placeholder="Anmerkung, Anforderung oder Beschreibung zu den Dateien"
        ariaLabel="Anmerkung"
        disabled={busy}
      />
      <div
        className="fk-drop"
        data-over={over}
        onDragOver={(e) => {
          e.preventDefault()
          setOver(true)
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setOver(false)
          addFiles(e.dataTransfer.files)
        }}
      >
        Dateien hierher ziehen oder{' '}
        <button type="button" className="fk-link" onClick={() => inputRef.current?.click()} disabled={busy}>
          auswählen
        </button>
        . Fotos, Videos, Tonaufnahmen und PDF, bis 1 GB je Datei.
        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          accept="image/*,video/*,audio/*,application/pdf"
          onChange={(e) => {
            addFiles(e.target.files)
            e.target.value = ''
          }}
        />
      </div>
      {files.length > 0 && (
        <ul className="fk-files">
          {files.map((f) => (
            <li key={f.id}>
              <span>{f.file.name}</span>
              <span className="fk-mono">{busy ? `${Math.round(f.progress)} %` : formatSize(f.file.size)}</span>
              {!busy && (
                <button
                  type="button"
                  className="fk-link"
                  onClick={() => setFiles((prev) => prev.filter((p) => p.id !== f.id))}
                >
                  entfernen
                </button>
              )}
              <span className="bar" style={{ width: `${f.progress}%` }} />
            </li>
          ))}
        </ul>
      )}
      <div className="fk-row">
        <button type="button" className="fk-btn" disabled={busy || empty} onClick={submit}>
          {busy ? 'Wird hochgeladen …' : 'Eintrag speichern'}
        </button>
        {error && <span className="fk-err">{error}</span>}
      </div>
    </div>
  )
}

// ==================================================================== entries

function EntryList({
  entries,
  meSlug,
  onWithdraw,
  showSection,
}: {
  entries: Entry[]
  meSlug: string
  onWithdraw: (id: string) => Promise<void>
  showSection?: boolean
}) {
  const [confirming, setConfirming] = useState('')
  if (entries.length === 0) return null
  return (
    <div className="fk-entries">
      {entries.map((e) => (
        <article className="fk-entry" key={e.id}>
          <header>
            <span className="fk-avatar">{initials(e.author)}</span>
            <b>{e.author}</b>
            <span>{formatTime(e.createdAt)}</span>
            {showSection && <span>· {SECTIONS.find((s) => s.id === e.sectionId)?.title}</span>}
            {e.authorSlug === meSlug && (
              <button
                type="button"
                className="fk-link"
                onClick={() => {
                  if (confirming === e.id) onWithdraw(e.id).catch(() => setConfirming(''))
                  else setConfirming(e.id)
                }}
              >
                {confirming === e.id ? 'Wirklich entfernen?' : 'entfernen'}
              </button>
            )}
          </header>
          {e.title && <h4>{e.title}</h4>}
          {e.text && <p>{e.text}</p>}
          {e.media.length > 0 && (
            <div className="fk-media">
              {e.media.map((m) => (
                <MediaItem key={m.pathname} m={m} />
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  )
}

function MediaItem({ m }: { m: Media }) {
  if (m.type.startsWith('image/')) {
    return (
      <a href={m.url} target="_blank" rel="noreferrer" title={m.name}>
        {/* eslint-disable-next-line @next/next/no-img-element -- signed URL from the private store */}
        <img src={m.url} alt={m.name} loading="lazy" />
      </a>
    )
  }
  if (m.type.startsWith('video/')) {
    return <video src={m.url} controls preload="metadata" playsInline title={m.name} />
  }
  if (m.type.startsWith('audio/')) {
    return (
      <div className="fk-audio">
        {m.name}
        <audio src={m.url} controls preload="none" />
      </div>
    )
  }
  return (
    <div className="fk-file">
      <a href={m.url} target="_blank" rel="noreferrer">
        {m.name}
      </a>{' '}
      ({formatSize(m.size)})
    </div>
  )
}

// =================================================================== overview

function csvCell(value: string): string {
  return `"${value.replace(/"/g, '""')}"`
}

function downloadCsv(people: Person[]) {
  const head = ['Abschnitt', 'Frage', ...people.map((p) => p.name)]
  const rows = SECTIONS.flatMap((s) =>
    s.questions.map((q) => [
      s.title,
      q.label,
      ...people.map((p) => {
        const note = p.answers[q.id + NOTE_SUFFIX]
        return [formatValue(q, p.answers[q.id]), typeof note === 'string' ? note.trim() : ''].filter(Boolean).join(' | ')
      }),
    ]),
  )
  const csv = [head, ...rows].map((r) => r.map(csvCell).join(';')).join('\r\n')
  const url = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = `Fragenkatalog-Rheinkalk-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

function Overview({
  people,
  entries,
  meSlug,
  onWithdraw,
}: {
  people: Person[]
  entries: Entry[]
  meSlug: string
  onWithdraw: (id: string) => Promise<void>
}) {
  const active = people.filter((p) => countAnswered(p.answers) > 0)
  return (
    <div className="fk-wrap fk-ov">
      <p className="fk-eyebrow">Übersicht</p>
      <h1 style={{ fontSize: 'clamp(30px, 4vw, 48px)', marginTop: 16 }}>Alle Antworten</h1>
      <p className="fk-lead">
        {active.length === 0
          ? 'Noch hat niemand geantwortet.'
          : `Antworten von ${active.map((p) => `${p.name} (${countAnswered(p.answers)})`).join(', ')}.`}
      </p>
      <div className="fk-row" style={{ marginTop: 22 }}>
        <button type="button" className="fk-btn ghost" onClick={() => downloadCsv(people)}>
          Als CSV für Excel herunterladen
        </button>
      </div>

      {SECTIONS.map((s) => {
        const sectionEntries = entries.filter((e) => e.sectionId === s.id)
        return (
          <div key={s.id}>
            <h2>{s.title}</h2>
            {s.questions.map((q) => {
              const any = people.some((p) => isAnswered(p.answers[q.id]) || isAnswered(p.answers[q.id + NOTE_SUFFIX]))
              return (
                <div className="fk-ovq" key={q.id}>
                  <p>{q.label}</p>
                  {any ? <OtherAnswers q={q} people={people} /> : <p className="fk-empty">noch offen</p>}
                </div>
              )
            })}
            <EntryList entries={sectionEntries} meSlug={meSlug} onWithdraw={onWithdraw} />
          </div>
        )
      })}
    </div>
  )
}
