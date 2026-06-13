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
      {isDark && <div className="absolute inset-0 ind-grid-bg pointer-events-none" aria-hidden="true" />}
      {!isDark && (
        <div
          className="absolute top-0 left-0 right-0 h-px bg-[color:var(--mr-line)] pointer-events-none"
          aria-hidden="true"
        />
      )}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl">
          {eyebrow && (
            <div className={`ind-eyebrow mb-4 ${isDark ? 'ind-eyebrow-light' : ''}`}>
              <span
                className={`inline-block w-8 h-px ${
                  isDark ? 'bg-[color:var(--mr-accent)]' : 'bg-[color:var(--mr-accent-ink)]'
                }`}
                aria-hidden="true"
              />
              {eyebrow}
            </div>
          )}
          <h2 className={`ind-h2 ${isDark ? 'text-[color:var(--mr-ink-on-dark)]' : 'text-[color:var(--mr-ink)]'}`}>
            {title}
          </h2>
          {body && (
            <p
              className={`mt-4 text-base md:text-lg max-w-2xl ${
                isDark ? 'text-[color:var(--mr-steel-on-dark)]' : 'text-[color:var(--mr-ink-2)]'
              }`}
            >
              {body}
            </p>
          )}
          <div className="mt-8">
            <Link
              href={ctaHref}
              className={
                isDark
                  ? 'inline-flex items-center gap-2 px-6 py-3.5 bg-[color:var(--mr-accent)] text-[color:var(--mr-dark)] font-semibold text-[15px] hover:bg-white transition-colors'
                  : 'ind-btn-primary'
              }
            >
              {ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
