import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'

interface CTASectionProps {
  eyebrow?: string
  title: string
  body?: string
  ctaLabel: string
  ctaHref: string
  /** 'dark' is the highlighted teal panel; 'light' a quiet bordered band. */
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
  if (tone === 'light') {
    return (
      <section className="ind-section-light relative overflow-hidden border-t border-[color:var(--mr-line)]">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl" data-reveal>
            {eyebrow && (
              <div className="ind-eyebrow mb-4">
                <span className="inline-block w-8 h-px bg-[color:var(--mr-accent-ink)]" aria-hidden="true" />
                {eyebrow}
              </div>
            )}
            <h2 className="ind-h2 text-[color:var(--mr-ink)]">{title}</h2>
            {body && <p className="mt-4 text-base md:text-lg max-w-2xl text-[color:var(--mr-ink-2)]">{body}</p>}
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

  return (
    <section className="relative py-16 md:py-24 bg-[color:var(--mr-paper)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          data-reveal="scale"
          className="relative overflow-hidden rounded-[28px] px-6 py-14 sm:px-12 md:px-16 md:py-20 text-white bg-[linear-gradient(130deg,#0a565c_0%,#04756f_45%,#06938c_80%,#0bb3a9_100%)] shadow-[0_40px_80px_-40px_rgba(4,117,111,0.65)]"
        >
          {/* Fine grid + light bloom + a slow scanning beam */}
          <div
            className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_80%_20%,#000_10%,transparent_65%)]"
            aria-hidden="true"
          />
          <div className="absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.35),transparent)] mr-float" aria-hidden="true" />
          <div className="absolute inset-0 mr-scan" aria-hidden="true" />

          <div className="relative max-w-3xl">
            {eyebrow && (
              <div className="inline-flex items-center gap-2.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-white/85 mb-5">
                <span className="inline-block w-8 h-px bg-white/70" aria-hidden="true" />
                {eyebrow}
              </div>
            )}
            <h2 className="ind-h2 text-white">{title}</h2>
            {body && <p className="mt-5 text-base md:text-lg max-w-2xl text-white/85 leading-relaxed">{body}</p>}
            <div className="mt-9">
              <Link
                href={ctaHref}
                className="group inline-flex items-center gap-2 rounded-[var(--mr-radius-sm)] bg-white px-6 py-3.5 text-[15px] font-semibold text-[color:var(--mr-accent-ink)] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                {ctaLabel}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
