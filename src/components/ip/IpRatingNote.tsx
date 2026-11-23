import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/config'
import { getIpContent, LIQUID_KEYS, SOLID_KEYS } from '@/data/ip-ratings'

// Closing block for product pages: explains the IP rating(s) named in the
// product's own data and links to the reference page at /ip-ratings. Renders
// nothing when the product data mentions no IP code.

const IP_CODE = /\bIP\s?([0-6X])([0-9X])K?\b/g

/** Unique IP codes found in the given texts, in order of first appearance. */
export function findIpCodes(texts: (string | null | undefined)[], max = 3): { solid: string; liquid: string }[] {
  const seen = new Set<string>()
  const out: { solid: string; liquid: string }[] = []
  for (const text of texts) {
    if (!text) continue
    for (const m of text.matchAll(IP_CODE)) {
      const key = m[1] + m[2]
      if (seen.has(key)) continue
      seen.add(key)
      out.push({ solid: m[1], liquid: m[2] })
      if (out.length === max) return out
    }
  }
  return out
}

const COPY = {
  en: {
    eyebrow: 'Ingress protection',
    title: (codes: string[]) => (codes.length === 1 ? `What ${codes[0]} means` : `What ${joinCodes(codes, 'and')} mean`),
    lead: (name: string) =>
      `The manufacturer states the following IP code for ${name} (IEC 60529). The first digit covers dust and solid objects, the second covers water.`,
    solids: 'Dust and solids',
    water: 'Water',
    decode: 'See the test',
    guideTitle: 'New to IP ratings?',
    guideBody: 'Our guide explains every digit, the tests behind them, and what a rating does not cover.',
    guideCta: 'IP ratings explained',
  },
  de: {
    eyebrow: 'Schutzart',
    title: (codes: string[]) => (codes.length === 1 ? `Was ${codes[0]} bedeutet` : `Was ${joinCodes(codes, 'und')} bedeuten`),
    lead: (name: string) =>
      `Der Hersteller gibt für ${name} die folgende Schutzart an (IEC 60529). Die erste Ziffer steht für Staub und Fremdkörper, die zweite für Wasser.`,
    solids: 'Staub und Fremdkörper',
    water: 'Wasser',
    decode: 'Prüfung ansehen',
    guideTitle: 'IP-Schutzarten sind neu für Sie?',
    guideBody: 'Unser Leitfaden erklärt jede Ziffer, die Prüfungen dahinter und was eine Schutzart nicht abdeckt.',
    guideCta: 'IP-Schutzarten erklärt',
  },
}

function joinCodes(codes: string[], and: string) {
  return codes.length === 2 ? `${codes[0]} ${and} ${codes[1]}` : `${codes.slice(0, -1).join(', ')} ${and} ${codes[codes.length - 1]}`
}

export default function IpRatingNote({ texts, productName, locale }: { texts: (string | null | undefined)[]; productName: string; locale: Locale }) {
  const codes = findIpCodes(texts).filter(
    (c) => (SOLID_KEYS as readonly string[]).includes(c.solid) && (LIQUID_KEYS as readonly string[]).includes(c.liquid),
  )
  if (!codes.length) return null

  const t = COPY[locale === 'de' ? 'de' : 'en']
  const ip = getIpContent(locale)
  const names = codes.map((c) => `IP${c.solid}${c.liquid}`)

  return (
    <section id="ip-rating" className="mb-12 scroll-mt-24" aria-labelledby="ip-rating-title">
      <div className="overflow-hidden rounded-[var(--mr-radius)] border border-[color:var(--mr-line)] border-t-[3px] border-t-[color:var(--mr-orange)] bg-[color:var(--mr-white)] shadow-[var(--mr-shadow)]">
        <div className="p-6 sm:p-8">
          <div className="font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--mr-orange-ink)]">{t.eyebrow}</div>
          <h2 id="ip-rating-title" className="ind-h2 mt-2 text-[color:var(--mr-ink)]">
            {t.title(names)}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[color:var(--mr-ink-2)]">{t.lead(productName)}</p>

          <div className={`mt-6 grid grid-cols-1 gap-4 ${codes.length > 1 ? 'lg:grid-cols-2' : ''}`}>
            {codes.map((c) => (
              <div key={c.solid + c.liquid} className="flex flex-col gap-5 rounded-[var(--mr-radius-sm)] border border-[color:var(--mr-line)] bg-[color:var(--mr-paper)] p-5 sm:flex-row sm:items-center">
                <div className="flex-none font-[family-name:var(--font-display)] text-5xl font-semibold leading-none tracking-tight" aria-label={`IP${c.solid}${c.liquid}`}>
                  <span className="text-[color:var(--mr-steel)]">IP</span>
                  <span className="text-[color:var(--mr-orange-ink)]">{c.solid}</span>
                  <span className="text-[color:var(--mr-accent-ink)]">{c.liquid}</span>
                </div>
                <dl className="min-w-0 flex-1 space-y-2 text-sm">
                  <div className="flex gap-3">
                    <dt className="w-6 flex-none font-mono font-semibold text-[color:var(--mr-orange-ink)]">{c.solid}</dt>
                    <dd className="text-[color:var(--mr-ink-2)]">
                      <span className="font-medium text-[color:var(--mr-ink)]">{t.solids}:</span> {ip.solids.items[c.solid as (typeof SOLID_KEYS)[number]].summary}
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-6 flex-none font-mono font-semibold text-[color:var(--mr-accent-ink)]">{c.liquid}</dt>
                    <dd className="text-[color:var(--mr-ink-2)]">
                      <span className="font-medium text-[color:var(--mr-ink)]">{t.water}:</span> {ip.water.items[c.liquid as (typeof LIQUID_KEYS)[number]].summary}
                    </dd>
                  </div>
                </dl>
                <Link
                  href={`/ip-ratings#decode-${c.solid.toLowerCase()}${c.liquid.toLowerCase()}`}
                  prefetch={false}
                  className="ind-btn-secondary flex-none self-start whitespace-nowrap sm:self-center"
                >
                  {t.decode}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-[color:var(--mr-line)] bg-[color:var(--mr-orange-soft)] p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="max-w-2xl text-sm leading-relaxed text-[color:var(--mr-ink-2)]">
            <span className="font-semibold text-[color:var(--mr-ink)]">{t.guideTitle}</span> {t.guideBody}
          </p>
          <Link href="/ip-ratings" className="ind-btn-primary flex-none self-start whitespace-nowrap sm:self-center">
            {t.guideCta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
