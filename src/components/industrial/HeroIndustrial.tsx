import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import HeroCarousel from './HeroCarousel'
import PartnerMarquee from '@/components/partners/PartnerMarquee'
import type { HeroSlide } from '@/lib/sanity'

interface CTA {
  label: string
  href: string
}

interface HeroImage {
  src: string
  alt: string
  priority?: boolean
}

interface HeroMedia {
  slides: HeroSlide[]
  aspectRatio?: 'square' | '4:3' | '16:9' | 'portrait'
  width?: 'narrow' | 'medium' | 'wide'
  autoplay?: boolean
  interval?: number
  learnMoreLabel?: string
}

interface HeroStat {
  value: string
  label: string
}

interface HeroIndustrialProps {
  eyebrow?: string
  title: string
  subtitle: string
  primaryCta?: CTA
  secondaryCta?: CTA
  image?: HeroImage
  media?: HeroMedia
  /** Highlighted pill above the eyebrow (e.g. the authorized-reseller claim). */
  badge?: string
  /** Small figures under the CTAs. */
  stats?: HeroStat[]
  /** When set, the partner logo ticker runs along the bottom of the hero. */
  partnerMarqueeLabel?: string
}

const WIDTH_SPAN: Record<'narrow' | 'medium' | 'wide', { media: string; text: string }> = {
  narrow: { media: 'lg:col-span-5', text: 'lg:col-span-7' },
  medium: { media: 'lg:col-span-6', text: 'lg:col-span-6' },
  wide: { media: 'lg:col-span-7', text: 'lg:col-span-5' },
}

export default function HeroIndustrial({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  image,
  media,
  badge,
  stats,
  partnerMarqueeLabel,
}: HeroIndustrialProps) {
  const hasCarousel = (media?.slides?.length ?? 0) > 0
  const hasMedia = hasCarousel || !!image
  const span = WIDTH_SPAN[media?.width ?? 'narrow']
  const textClass = hasCarousel ? span.text : image ? 'lg:col-span-7' : 'max-w-4xl'

  return (
    <section className="relative ind-hero-gradient overflow-hidden">
      <div className="mr-aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="absolute inset-0 ind-grid-bg pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-14 md:pb-20">
        <div className={`grid gap-12 lg:gap-16 items-center ${hasMedia ? 'lg:grid-cols-12' : ''}`}>
          <div className={textClass}>
            {badge && (
              <p className="mr-chip mb-6 mr-rise">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                {badge}
              </p>
            )}
            {eyebrow && (
              <div className="ind-eyebrow mb-5 mr-rise mr-rise-1">
                <span className="inline-block w-8 h-px bg-[color:var(--mr-accent)]" aria-hidden="true" />
                {eyebrow}
              </div>
            )}

            <h1 className="ind-h1 text-[color:var(--mr-ink)] mb-6 mr-rise mr-rise-2">{title}</h1>

            {subtitle && (
              <p className="text-lg md:text-xl text-[color:var(--mr-ink-2)] leading-relaxed max-w-2xl mb-10 mr-rise mr-rise-3">
                {subtitle}
              </p>
            )}

            {(primaryCta || secondaryCta) && (
              <div className="flex flex-col sm:flex-row gap-3 mr-rise mr-rise-4">
                {primaryCta && (
                  <Link href={primaryCta.href} className="mr-btn-accent justify-center">
                    {primaryCta.label}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
                {secondaryCta && (
                  <Link href={secondaryCta.href} className="ind-btn-secondary justify-center">
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}

            {stats && stats.length > 0 && (
              <dl className="mt-12 grid grid-cols-3 gap-6 max-w-lg mr-rise mr-rise-5">
                {stats.map((s) => (
                  <div key={s.label} className="border-l-2 border-[color:var(--mr-accent-line)] pl-4">
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold tracking-tight text-[color:var(--mr-ink)]">
                      {s.value}
                    </dd>
                    <dd aria-hidden="true" className="mt-1 text-xs text-[color:var(--mr-steel)] leading-snug">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {hasCarousel ? (
            <div className={`${span.media} mr-rise mr-rise-2`}>
              <div className="mr-frame">
                <span className="mr-corner" />
                <span className="mr-corner" />
                <span className="mr-corner" />
                <span className="mr-corner" />
                <div className="mr-glass rounded-[calc(var(--mr-radius)+4px)] p-2">
                  <div className="mr-scan rounded-[var(--mr-radius)]">
                    <HeroCarousel
                      slides={media!.slides}
                      aspectRatio={media!.aspectRatio}
                      autoplay={media!.autoplay}
                      interval={media!.interval}
                      learnMoreLabel={media!.learnMoreLabel}
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : image ? (
            <div className="lg:col-span-5 mr-rise mr-rise-2">
              <div className="mr-frame">
                <span className="mr-corner" />
                <span className="mr-corner" />
                <span className="mr-corner" />
                <span className="mr-corner" />
                <div className="mr-glass rounded-[calc(var(--mr-radius)+4px)] p-2">
                  <div className="mr-scan relative w-full aspect-[4/3] lg:aspect-square overflow-hidden rounded-[var(--mr-radius)] bg-[color:var(--mr-paper-2)]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      priority={image.priority}
                      sizes="(min-width: 1024px) 40vw, (min-width: 640px) 80vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {partnerMarqueeLabel && (
          <div className="mt-16 md:mt-20 mr-glass rounded-2xl px-5 py-4 md:px-6 mr-rise mr-rise-5">
            <PartnerMarquee label={partnerMarqueeLabel} />
          </div>
        )}
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,var(--mr-accent-line),transparent)]"
        aria-hidden="true"
      />
    </section>
  )
}
