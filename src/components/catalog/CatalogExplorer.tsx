'use client'

import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { ArrowRight, ArrowUpRight, LayoutGrid, List, PackageSearch, Search, ShieldCheck, X } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { CatalogBrand, CatalogFamily, CatalogItem, CatalogQuery, FlagshipItem } from './types'
import FlagshipRail from './FlagshipRail'
import s from './Catalog.module.css'

interface Props {
  items: CatalogItem[]
  flagships: FlagshipItem[]
  families: CatalogFamily[]
  initial: CatalogQuery
}

const AVAIL_KEY: Record<string, string> = {
  in_stock: 'inStock',
  available_on_request: 'availableOnRequest',
  sourcing_on_request: 'sourcingOnRequest',
  lead_time_required: 'leadTimeRequired',
  information_only: 'informationOnly',
  discontinued: 'discontinued',
}
const READY = new Set(['in_stock', 'available_on_request'])

const fold = (v: string) =>
  v
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()

const vtName = (id: string) => `p-${id.replace(/[^a-zA-Z0-9_-]/g, '_')}`

/** Runs a state update inside a view transition where the browser supports it. */
function withTransition(update: () => void) {
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> }
  }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!doc.startViewTransition || reduce || document.hidden) return update()
  const vt = doc.startViewTransition(() => flushSync(update))
  // A transition the browser skips (tab hidden, rapid clicks) rejects; the update still applies.
  vt.ready.catch(() => {})
  vt.finished.catch(() => {})
}

function BrandLogo({ brand, className }: { brand: CatalogBrand; className?: string }) {
  if (!brand.logo) return null
  // eslint-disable-next-line @next/next/no-img-element -- small logo, local or pre-sized Sanity URL
  return <img src={brand.logo} alt="" className={className} loading="lazy" decoding="async" />
}

function Availability({ status, label }: { status?: string; label?: string }) {
  if (!status || !label) return null
  return <span className={`${s.avail} ${READY.has(status) ? s.availReady : ''}`}>{label}</span>
}

export default function CatalogExplorer({ items, flagships, families, initial }: Props) {
  const t = useTranslations('industrial.catalog.explorer')
  const tAvail = useTranslations('industrial.productDetail.availability')
  const availLabel = (st?: string) => (st && AVAIL_KEY[st] ? tAvail(AVAIL_KEY[st]) : undefined)

  const [query, setQuery] = useState<CatalogQuery>(initial)
  const [text, setText] = useState(initial.q)
  const q = useDeferredValue(text)
  const searchRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [stuck, setStuck] = useState(false)

  // ---- Index ----
  const haystack = useMemo(
    () =>
      new Map(
        items.map((p) => [
          p.id,
          fold([p.name, p.tagline, p.brand?.name, p.family?.title, p.subcategory].filter(Boolean).join(' ')),
        ]),
      ),
    [items],
  )

  const brands = useMemo(() => {
    const seen = new Map<string, CatalogBrand>()
    for (const p of items) if (p.brand && !seen.has(p.brand.slug)) seen.set(p.brand.slug, p.brand)
    return [...seen.values()]
  }, [items])

  const statuses = useMemo(
    () => [...new Set(items.map((p) => p.availability).filter((v): v is NonNullable<typeof v> => Boolean(v)))],
    [items],
  )

  // ---- Filtering (faceted: each chip counts with the other filters applied) ----
  const tokens = useMemo(() => fold(q).split(/\s+/).filter(Boolean), [q])
  const matches = useCallback(
    (p: CatalogItem, skip?: 'brand' | 'family') => {
      if (tokens.length) {
        const h = haystack.get(p.id) || ''
        if (!tokens.every((tk) => h.includes(tk))) return false
      }
      if (skip !== 'brand' && query.brand && p.brand?.slug !== query.brand) return false
      if (skip !== 'family' && query.family && p.family?.slug !== query.family) return false
      if (query.availability && p.availability !== query.availability) return false
      return true
    },
    [tokens, haystack, query.brand, query.family, query.availability],
  )

  const results = useMemo(() => {
    const list = items.filter((p) => matches(p))
    if (query.sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    else if (query.sort === 'new') list.sort((a, b) => Number(b.isNew) - Number(a.isNew) || a.rank - b.rank)
    return list
  }, [items, matches, query.sort])

  const brandCounts = useMemo(() => {
    const m = new Map<string, number>()
    for (const p of items) if (p.brand && matches(p, 'brand')) m.set(p.brand.slug, (m.get(p.brand.slug) || 0) + 1)
    return m
  }, [items, matches])

  const familyCounts = useMemo(() => {
    const m = new Map<string, number>()
    for (const p of items) if (p.family && matches(p, 'family')) m.set(p.family.slug, (m.get(p.family.slug) || 0) + 1)
    return m
  }, [items, matches])

  const totalFamilies = useMemo(() => new Set(items.map((p) => p.family?.slug).filter(Boolean)), [items])
  const visibleFamilies = families.filter((f) => totalFamilies.has(f.slug))

  const filtered = Boolean(q || query.brand || query.family || query.availability)
  const grouped = query.sort === 'recommended'

  const groups = useMemo(() => {
    if (!grouped) return [{ brand: undefined as CatalogBrand | undefined, items: results }]
    const out = new Map<string, { brand?: CatalogBrand; items: CatalogItem[] }>()
    for (const p of results) {
      const key = p.brand?.slug || '_'
      if (!out.has(key)) out.set(key, { brand: p.brand, items: [] })
      out.get(key)!.items.push(p)
    }
    return [...out.values()]
  }, [grouped, results])

  // ---- URL sync (shareable, no server round trip) ----
  useEffect(() => {
    const sp = new URLSearchParams()
    if (q) sp.set('q', q)
    if (query.brand) sp.set('brand', query.brand)
    if (query.family) sp.set('family', query.family)
    if (query.availability) sp.set('availability', query.availability)
    if (query.sort !== 'recommended') sp.set('sort', query.sort)
    if (query.view !== 'grid') sp.set('view', query.view)
    const qs = sp.toString()
    const url = `${window.location.pathname}${qs ? `?${qs}` : ''}`
    if (url !== `${window.location.pathname}${window.location.search}`) window.history.replaceState(window.history.state, '', url)
  }, [q, query])

  // ---- Sticky bar shadow ----
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting), { rootMargin: '-64px 0px 0px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // ---- "/" focuses search ----
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT') {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /** Keeps the top of the results in view after a filter change shrinks the page. */
  const settle = () => {
    const el = resultsRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 64 - 140
    if (window.scrollY > top) window.scrollTo({ top, behavior: 'smooth' })
  }

  const set = (patch: Partial<CatalogQuery>) => {
    withTransition(() => setQuery((cur) => ({ ...cur, ...patch })))
    settle()
  }
  const toggle = (key: 'brand' | 'family', value: string) => set({ [key]: query[key] === value ? '' : value })
  const reset = () => {
    withTransition(() => {
      setText('')
      setQuery((cur) => ({ ...cur, q: '', brand: '', family: '', availability: '' }))
    })
    settle()
  }

  // Cursor-following light on cards (one listener for the whole grid).
  const onPointerMove = (e: React.PointerEvent) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>(`.${s.card}`)
    if (!card) return
    const r = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${e.clientX - r.left}px`)
    card.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  const brandName = brands.find((b) => b.slug === query.brand)?.name
  const familyName = families.find((f) => f.slug === query.family)?.title

  return (
    <>
      {/* ---------- Header ---------- */}
      <header className={s.header}>
        <div className="mr-aurora" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className={`${s.headerInner} mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`}>
          <div className="mr-rise">
            <div className="ind-eyebrow">
              <span className="inline-block w-8 h-px bg-[color:var(--mr-accent-ink)]" aria-hidden="true" />
              {t('eyebrow')}
            </div>
            <h1 className={s.title}>
              {t('titleLead')} <em>{t('titleHighlight')}</em>
            </h1>
            <p className={s.intro}>{t('intro')}</p>
          </div>
          <div className={`${s.stats} mr-rise`} style={{ animationDelay: '120ms' }}>
            <div className={s.stat}>
              <div className={s.statValue}>{items.length}</div>
              <div className={s.statLabel}>{t('statProducts')}</div>
            </div>
            <div className={s.stat}>
              <div className={s.statValue}>{brands.length}</div>
              <div className={s.statLabel}>{t('statBrands')}</div>
            </div>
            <div className={s.stat}>
              <div className={s.statValue}>{visibleFamilies.length}</div>
              <div className={s.statLabel}>{t('statCategories')}</div>
            </div>
          </div>
        </div>
      </header>

      <div ref={sentinelRef} aria-hidden="true" />

      {/* ---------- Finder bar ---------- */}
      <div className={`${s.bar} ${stuck ? s.barStuck : ''}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={s.barRow}>
            <form className={s.search} role="search" onSubmit={(e) => e.preventDefault()}>
              <Search className={s.searchIcon} aria-hidden="true" />
              <input
                ref={searchRef}
                type="search"
                className={s.searchInput}
                value={text}
                onChange={(e) => {
                  setText(e.target.value)
                  settle()
                }}
                placeholder={t('searchPlaceholder')}
                aria-label={t('searchLabel')}
                autoComplete="off"
                enterKeyHint="search"
              />
              <span className={s.searchAside}>
                {text ? (
                  <button type="button" className={s.clear} onClick={() => setText('')} aria-label={t('clearSearch')}>
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <kbd className={s.kbd}>/</kbd>
                )}
              </span>
            </form>

            <div className={s.barTools}>
            {statuses.length > 1 && (
              <select
                className={`${s.select} ${query.availability ? s.selectOn : ''}`}
                value={query.availability}
                onChange={(e) => set({ availability: e.target.value })}
                aria-label={t('availabilityLabel')}
              >
                <option value="">{t('anyAvailability')}</option>
                {statuses.map((st) => (
                  <option key={st} value={st}>
                    {availLabel(st)}
                  </option>
                ))}
              </select>
            )}

            <select
              className={s.select}
              value={query.sort}
              onChange={(e) => set({ sort: e.target.value as CatalogQuery['sort'] })}
              aria-label={t('sortLabel')}
            >
              <option value="recommended">{t('sortRecommended')}</option>
              <option value="name">{t('sortName')}</option>
              <option value="new">{t('sortNew')}</option>
            </select>

            <div className={s.views} role="group" aria-label={t('viewLabel')}>
              <button
                type="button"
                className={s.viewBtn}
                aria-pressed={query.view === 'grid'}
                onClick={() => set({ view: 'grid' })}
                aria-label={t('viewGrid')}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                className={s.viewBtn}
                aria-pressed={query.view === 'list'}
                onClick={() => set({ view: 'list' })}
                aria-label={t('viewList')}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            </div>
          </div>

          <div className={s.lane}>
            <span className={s.laneLabel}>{t('brands')}</span>
            {brands.map((b) => {
              const n = brandCounts.get(b.slug) || 0
              const on = query.brand === b.slug
              return (
                <button
                  key={b.slug}
                  type="button"
                  className={s.chip}
                  aria-pressed={on}
                  disabled={!n && !on}
                  onClick={() => toggle('brand', b.slug)}
                  title={b.name}
                >
                  {b.logo ? <BrandLogo brand={b} className={s.chipLogo} /> : b.name}
                  {b.logo && <span className="sr-only">{b.name}</span>}
                  <span className={s.chipCount}>{n}</span>
                </button>
              )
            })}
            <span className={s.laneDivider} aria-hidden="true" />
            <span className={s.laneLabel}>{t('categories')}</span>
            {visibleFamilies.map((f) => {
              const n = familyCounts.get(f.slug) || 0
              const on = query.family === f.slug
              return (
                <button
                  key={f.slug}
                  type="button"
                  className={s.chip}
                  aria-pressed={on}
                  disabled={!n && !on}
                  onClick={() => toggle('family', f.slug)}
                >
                  {f.title}
                  <span className={s.chipCount}>{n}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ---------- Flagships (only on the unfiltered catalogue) ---------- */}
      {!filtered && (
        <FlagshipRail
          items={flagships}
          labels={{
            eyebrow: t('flagshipsEyebrow'),
            title: t('flagshipsTitle'),
            prev: t('prev'),
            next: t('next'),
            discover: t('discover'),
            inMotion: t('inMotion'),
          }}
        />
      )}

      {/* ---------- Results ---------- */}
      <section className="pt-10 md:pt-12 pb-16 md:pb-24" aria-labelledby="catalog-title">
        <div ref={resultsRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {!filtered && (
            <div className={s.sectionHead}>
              <div>
                <div className="ind-eyebrow">
                  <span className="inline-block w-8 h-px bg-[color:var(--mr-accent-ink)]" aria-hidden="true" />
                  {t('allEyebrow')}
                </div>
                <h2 id="catalog-title" className={s.sectionTitle}>
                  {t('allTitle')}
                </h2>
              </div>
            </div>
          )}
          {filtered && (
            <h2 id="catalog-title" className="sr-only">
              {t('allTitle')}
            </h2>
          )}

          <div className={s.resultsHead} aria-live="polite">
            <span className={s.count}>
              {t.rich('count', { shown: results.length, total: items.length, b: (c) => <b>{c}</b> })}
            </span>
            {q && (
              <span className={s.pill}>
                “{q}”
                <button type="button" onClick={() => setText('')} aria-label={t('clearSearch')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {brandName && (
              <span className={s.pill}>
                {brandName}
                <button type="button" onClick={() => set({ brand: '' })} aria-label={t('remove', { name: brandName })}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {familyName && (
              <span className={s.pill}>
                {familyName}
                <button type="button" onClick={() => set({ family: '' })} aria-label={t('remove', { name: familyName })}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {query.availability && (
              <span className={s.pill}>
                {availLabel(query.availability)}
                <button type="button" onClick={() => set({ availability: '' })} aria-label={t('remove', { name: availLabel(query.availability) || '' })}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filtered && (
              <button type="button" className={s.reset} onClick={reset}>
                {t('reset')}
              </button>
            )}
          </div>

          {results.length === 0 ? (
            <div className={s.empty}>
              <div className={s.emptyIcon}>
                <PackageSearch className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <h3 className="ind-h3 mb-2">{t('emptyTitle')}</h3>
              <p className="text-sm text-[color:var(--mr-ink-2)] max-w-md mb-6">{t('emptyBody')}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <button type="button" className="ind-btn-secondary-dark" onClick={reset}>
                  {t('reset')}
                </button>
                <Link href="/contact" className="mr-btn-accent">
                  {t('emptyCta')} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div onPointerMove={onPointerMove}>
              {groups.map((g) => (
                <div key={g.brand?.slug || '_'} className={s.group}>
                  {grouped && g.brand && (
                    <div className={s.groupHead} id={`brand-${g.brand.slug}`}>
                      <div className={s.groupLogo}>
                        {g.brand.logo ? <BrandLogo brand={g.brand} /> : <span className="font-semibold">{g.brand.name[0]}</span>}
                      </div>
                      <div>
                        <div className={s.groupName}>{g.brand.name}</div>
                        <div className={s.groupMeta}>
                          <span>{t('products', { count: g.items.length })}</span>
                          {g.brand.authorized && (
                            <span className={s.badge}>
                              <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                              {t('authorized')}
                            </span>
                          )}
                        </div>
                      </div>
                      {!query.brand && (
                        <button type="button" className={s.groupLink} onClick={() => toggle('brand', g.brand!.slug)}>
                          {t('onlyBrand')} <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}

                  {query.view === 'grid' ? (
                    <div className={s.grid}>
                      {g.items.map((p, i) => (
                        <div
                          key={p.id}
                          data-reveal
                          style={{ viewTransitionName: vtName(p.id), '--d': `${(i % 4) * 60}ms` } as React.CSSProperties}
                        >
                          <Link href={`/products/${p.slug}`} className={s.card}>
                            <div className={s.cardWell}>
                              {p.image && (
                                <Image
                                  src={p.image}
                                  alt={p.imageAlt || p.name}
                                  fill
                                  sizes="(max-width: 767px) 50vw, (max-width: 1199px) 33vw, 300px"
                                  className={s.cardImg}
                                />
                              )}
                              <div className={s.cardBadges}>
                                {p.isNew && <span className={s.newBadge}>{t('new')}</span>}
                                <span className={s.cardArrow} aria-hidden="true">
                                  <ArrowUpRight className="w-4 h-4" />
                                </span>
                              </div>
                            </div>
                            <div className={s.cardBody}>
                              {p.family && <span className={s.cardFamily}>{p.family.title}</span>}
                              <h3 className={s.cardName}>{p.name}</h3>
                              {p.tagline && <p className={s.cardTag}>{p.tagline}</p>}
                              <div className={s.cardFoot}>
                                {/* Grouped results already sit under a brand header. */}
                                {!grouped && <span className={s.cardBrand}>{p.brand?.name}</span>}
                                <Availability status={p.availability} label={availLabel(p.availability)} />
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={s.list}>
                      {g.items.map((p) => (
                        <Link
                          key={p.id}
                          href={`/products/${p.slug}`}
                          className={s.row}
                          style={{ viewTransitionName: vtName(p.id) }}
                        >
                          <span className={s.rowThumb}>
                            {p.image && <Image src={p.image} alt="" fill sizes="80px" />}
                          </span>
                          <span className="min-w-0">
                            <span className={`${s.rowName} block truncate`}>{p.name}</span>
                            <span className={`${s.rowSub} block truncate`}>
                              {[p.brand?.name, p.family?.title].filter(Boolean).join(' · ')}
                            </span>
                          </span>
                          <span className={s.rowTag}>{p.tagline}</span>
                          <Availability status={p.availability} label={availLabel(p.availability)} />
                          <ArrowRight className={`${s.rowGo} w-4 h-4`} aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ---------- Category pages (kept as plain links for browsing and SEO) ---------- */}
      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={s.sectionHead}>
            <div>
              <div className="ind-eyebrow">
                <span className="inline-block w-8 h-px bg-[color:var(--mr-accent-ink)]" aria-hidden="true" />
                {t('categoriesEyebrow')}
              </div>
              <h2 className={s.sectionTitle}>{t('categoriesTitle')}</h2>
            </div>
          </div>
          <div className={s.cats}>
            {visibleFamilies.map((f, i) => (
              <div key={f.slug} data-reveal style={{ '--d': `${(i % 4) * 50}ms` } as React.CSSProperties}>
                <Link href={`/products/categories/${f.slug}`} className={s.cat}>
                  <span className={s.catName}>{f.title}</span>
                  <span className={s.catCount}>
                    {t('products', { count: items.filter((p) => p.family?.slug === f.slug).length })}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
