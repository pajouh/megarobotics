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
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 md:pt-36 pb-20 md:pb-24">
        <div className={`grid gap-10 lg:gap-16 ${image ? 'lg:grid-cols-12' : ''}`}>
          <div className={image ? 'lg:col-span-7' : 'max-w-4xl'}>
            {eyebrow && (
              <div className="ind-eyebrow ind-eyebrow-light mb-6">
                <span className="inline-block w-8 h-px bg-blue-400" aria-hidden="true" />
                {eyebrow}
              </div>
            )}

            <h1 className="ind-h1 text-white mb-6">{title}</h1>

            {subtitle && (
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mb-10">
                {subtitle}
              </p>
            )}

            {(primaryCta || secondaryCta) && (
              <div className="flex flex-col sm:flex-row gap-3">
                {primaryCta && (
                  <Link href={primaryCta.href} className="ind-btn-primary">
                    {primaryCta.label}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
                {secondaryCta && (
                  <Link href={secondaryCta.href} className="ind-btn-secondary-dark">
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </div>

          {image && (
            <div className="lg:col-span-5 flex items-center">
              <div className="relative w-full aspect-[4/3] lg:aspect-square rounded-lg overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={image.priority}
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 80vw, 100vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-[color:var(--ind-graphite-950)]/40 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Subtle bottom edge */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
        aria-hidden="true"
      />
    </section>
  )
}
