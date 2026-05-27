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
    <div className={`max-w-3xl ${isCentered ? 'mx-auto text-center' : ''} mb-10 md:mb-12`}>
      {eyebrow && (
        <div
          className={`ind-eyebrow mb-3 ${isDark ? 'ind-eyebrow-light' : ''} ${
            isCentered ? 'justify-center' : ''
          }`}
        >
          <span
            className={`inline-block w-8 h-px ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`}
            aria-hidden="true"
          />
          {eyebrow}
        </div>
      )}
      <h2 className={`ind-h2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
      {subtitle && (
        <p className={`mt-4 text-base md:text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
