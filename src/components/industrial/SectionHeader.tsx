interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  tone = 'light',
  align = 'left',
}: SectionHeaderProps) {
  const isDark = tone === 'dark'
  const isCentered = align === 'center'

  return (
    <div className={`max-w-3xl ${isCentered ? 'mx-auto text-center' : ''} mb-10 md:mb-14`}>
      {eyebrow && (
        <div
          className={`ind-eyebrow mb-4 ${isDark ? 'ind-eyebrow-light' : ''} ${
            isCentered ? 'justify-center' : ''
          }`}
        >
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
      {subtitle && (
        <p
          className={`mt-4 text-base md:text-lg ${
            isDark ? 'text-[color:var(--mr-steel-on-dark)]' : 'text-[color:var(--mr-ink-2)]'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
