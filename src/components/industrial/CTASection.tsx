import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'

interface CTASectionProps {
  eyebrow?: string
  title: string
  body?: string
  ctaLabel: string
  ctaHref: string
  tone?: 'dark' | 'light'
}

export default function CTASection({
  eyebrow,
  title,
  body,
  ctaLabel,
  ctaHref,
  tone = 'dark',
}: CTASectionProps) {
  const isDark = tone === 'dark'
  return (
    <section className={`${isDark ? 'ind-section-dark' : 'ind-section-light'} relative overflow-hidden`}>
      <div className={`absolute inset-0 ${isDark ? 'ind-grid-bg' : 'ind-grid-bg-light'} pointer-events-none`} aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl">
          {eyebrow && (
            <div className={`ind-eyebrow mb-4 ${isDark ? 'ind-eyebrow-light' : ''}`}>
              <span
                className={`inline-block w-8 h-px ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`}
                aria-hidden="true"
              />
              {eyebrow}
            </div>
          )}
          <h2 className={`ind-h2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
          {body && (
            <p className={`mt-4 text-base md:text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl`}>
              {body}
            </p>
          )}
          <div className="mt-8">
            <Link href={ctaHref} className="ind-btn-primary">
              {ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
