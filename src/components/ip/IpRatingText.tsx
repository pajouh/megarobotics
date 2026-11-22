import { Fragment } from 'react'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'

// Links IP codes to the reference page at /ip-ratings. Works in server and
// client components. A code such as "IP67" opens the decoder set to that code
// (#decode-67); anything that is not a two-character IP code stays plain text.

const IP_CODE = /\bIP\s?([0-6X])([0-9X])K?\b/g

const LINK_CLASS =
  'underline decoration-dotted decoration-[color:var(--mr-accent-line)] underline-offset-4 transition-colors hover:text-[color:var(--mr-accent-ink)] hover:decoration-solid hover:decoration-[color:var(--mr-accent-ink)]'

export default function IpRatingText({ text }: { text: string }) {
  const de = useLocale() === 'de'
  if (!text) return null

  const parts: React.ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(IP_CODE)) {
    const at = m.index ?? 0
    if (at > last) parts.push(<Fragment key={`t${last}`}>{text.slice(last, at)}</Fragment>)
    const code = m[0]
    parts.push(
      <Link
        key={`c${at}`}
        href={`/ip-ratings#decode-${m[1].toLowerCase()}${m[2].toLowerCase()}`}
        prefetch={false}
        title={de ? `Was ${code} bedeutet` : `What ${code} means`}
        className={LINK_CLASS}
      >
        {code}
      </Link>,
    )
    last = at + code.length
  }
  if (!parts.length) return <>{text}</>
  if (last < text.length) parts.push(<Fragment key={`t${last}`}>{text.slice(last)}</Fragment>)
  return <>{parts}</>
}

/** Short "what do these codes mean" link for footnotes under spec tables. */
export function IpGuideLink({ className = '' }: { className?: string }) {
  const de = useLocale() === 'de'
  return (
    <Link href="/ip-ratings" prefetch={false} className={`${LINK_CLASS} ${className}`}>
      {de ? 'Was die IP-Schutzarten bedeuten' : 'What the IP ratings mean'}
    </Link>
  )
}
