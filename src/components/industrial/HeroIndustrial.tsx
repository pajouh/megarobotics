import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'

interface CTA {
  label: string
  href: string
}

interface HeroImage {
  src: string
  alt: string
  priority?: boolean
}

interface HeroIndustrialProps {
  eyebrow?: string
  title: string
  subtitle: string
  primaryCta?: CTA
  secondaryCta?: CTA
  image?: HeroImage
}

export default function HeroIndustrial({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  image,
}: HeroIndustrialProps) {
  return (
    <section className="relative ind-hero-gradient overflow-hidden">
      <div className="absolute inset-0 ind-grid-bg pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-16 md:pb-24">
        <div className={`grid gap-10 lg:gap-16 ${image ? 'lg:grid-cols-12' : ''}`}>
          <div className={`mr-rise ${image ? 'lg:col-span-7' : 'max-w-4xl'}`}>
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

          {image && (
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
          )}
        </div>
      </div>

      {/* Accent base rule */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[color:var(--mr-accent)]" aria-hidden="true" />
    </section>
  )
}
