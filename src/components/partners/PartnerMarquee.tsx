import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { ShieldCheck } from 'lucide-react'
import { authorizedPartners } from '@/data/authorized-partners'

interface PartnerMarqueeProps {
  label: string
  /** Logo height in px; widths follow each file's aspect ratio. */
  height?: number
}

/**
 * Endless, slowly scrolling strip of the authorized-partner logos. The track
 * is rendered twice so the loop is seamless; the copy is hidden from assistive
 * tech, and with reduced motion only the first copy shows, as a static row.
 */
export default function PartnerMarquee({ label, height = 26 }: PartnerMarqueeProps) {
  const logos = (hidden: boolean) =>
    authorizedPartners.map((p) => {
      // Square-ish marks (DH) get extra height so they read as heavy as wordmarks.
      const h = p.logoWidth / p.logoHeight < 2 ? height * 1.5 : height
      const w = Math.round((p.logoWidth / p.logoHeight) * h)
      return (
        <Link
          key={p.slug}
          href={`/manufacturers/${p.slug}`}
          tabIndex={hidden ? -1 : undefined}
          className="group shrink-0 flex items-center"
          aria-label={hidden ? undefined : p.name}
        >
          <Image
            src={p.logo}
            alt={hidden ? '' : p.name}
            width={w}
            height={Math.round(h)}
            unoptimized
            className="mr-logo"
            style={{ width: w, height: Math.round(h) }}
          />
        </Link>
      )
    })

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
      <p className="mr-chip shrink-0 self-start md:self-auto">
        <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
        {label}
      </p>
      <div className="mr-marquee flex-1 min-w-0 py-2">
        <div className="mr-marquee-track">{logos(false)}</div>
        <div className="mr-marquee-track" aria-hidden="true">
          {logos(true)}
        </div>
      </div>
    </div>
  )
}
