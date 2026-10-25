import type { ReactNode } from 'react'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  children?: ReactNode
}

/** Compact light header for catalog and directory pages: aurora, grid, staged entrance. */
export default function PageHeader({ eyebrow, title, subtitle, children }: PageHeaderProps) {
  return (
    <section className="relative ind-hero-gradient overflow-hidden">
      <div className="mr-aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="absolute inset-0 ind-grid-bg pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-12 md:pb-16">
        {eyebrow && (
          <div className="ind-eyebrow mb-4 mr-rise">
            <span className="inline-block w-8 h-px bg-[color:var(--mr-accent)]" aria-hidden="true" />
            {eyebrow}
          </div>
        )}
        <h1 className="ind-h1 text-[color:var(--mr-ink)] mb-5 max-w-4xl mr-rise mr-rise-1">{title}</h1>
        {subtitle && (
          <p className="text-base md:text-lg text-[color:var(--mr-ink-2)] leading-relaxed max-w-3xl mr-rise mr-rise-2">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8 mr-rise mr-rise-3">{children}</div>}
      </div>
    </section>
  )
}
