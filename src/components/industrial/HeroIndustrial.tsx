import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'
import HeroCarousel from './HeroCarousel'
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
}

interface HeroIndustrialProps {
  eyebrow?: string
  title: string
  subtitle: string
  primaryCta?: CTA
  secondaryCta?: CTA
  image?: HeroImage
  media?: HeroMedia
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
}: HeroIndustrialProps) {
  const hasCarousel = (media?.slides?.length ?? 0) > 0
  const hasMedia = hasCarousel || !!image
  const span = WIDTH_SPAN[media?.width ?? 'narrow']
  const textClass = hasCarousel ? span.text : image ? 'lg:col-span-7' : 'max-w-4xl'

  return (
    <section className="relative ind-hero-gradient overflow-hidden">
      <div className="absolute inset-0 ind-grid-bg pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-16 md:pb-24">
        <div className={`grid gap-10 lg:gap-16 ${hasMedia ? 'lg:grid-cols-12' : ''}`}>
          <div className={`mr-rise ${textClass}`}>
            {eyebrow && (
              <div className="ind-eyebrow ind-eyebrow-light mb-6">
                <span className="inline-block w-8 h-px bg-[color:var(--mr-accent)]" aria-hidden="true" />
                {eyebrow}
              </div>
            )}

            <h1 className="ind-h1 text-white mb-6">{title}</h1>

            {subtitle && (
              <p className="text-lg md:text-xl text-[color:var(--mr-steel-on-dark)] leading-relaxed max-w-3xl mb-10">
                {subtitle}
              </p>
            )}

            {(primaryCta || secondaryCta) && (
              <div className="flex flex-col sm:flex-row gap-3">
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[color:var(--mr-accent)] text-[color:var(--mr-dark)] font-semibold text-[15px] hover:bg-white transition-colors"
                  >
                    {primaryCta.label}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
                {secondaryCta && (
                  <Link href={secondaryCta.href} className="ind-btn-secondary-dark justify-center">
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </div>

          {hasCarousel ? (
            <div className={`${span.media} flex items-center mr-rise mr-rise-1`}>
              <HeroCarousel
                slides={media!.slides}
                aspectRatio={media!.aspectRatio}
                autoplay={media!.autoplay}
                interval={media!.interval}
                priority
              />
            </div>
          ) : image ? (
            <div className="lg:col-span-5 flex items-center mr-rise mr-rise-1">
              <div className="relative w-full aspect-[4/3] lg:aspect-square overflow-hidden border border-[color:var(--mr-line-on-dark)]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={image.priority}
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 80vw, 100vw"
                  className="object-cover"
                />
                {/* Mono corner tick — datasheet frame detail */}
                <span
                  className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[color:var(--mr-accent)]"
                  aria-hidden="true"
                />
                <span
                  className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[color:var(--mr-accent)]"
                  aria-hidden="true"
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Accent base rule */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[color:var(--mr-accent)]" aria-hidden="true" />
    </section>
  )
}
