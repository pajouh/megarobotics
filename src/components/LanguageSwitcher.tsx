'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { locales, localeNames, type Locale } from '@/i18n/config'

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: Locale) => {
    // Use next-intl's router which handles locale switching properly
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div
      className="inline-flex items-center font-mono text-xs tracking-[0.08em] border border-[color:var(--mr-line)]"
      role="group"
      aria-label="Select language"
    >
      {locales.map((loc, i) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          aria-pressed={locale === loc}
          aria-label={localeNames[loc]}
          className={`px-2.5 py-1.5 uppercase transition-colors ${
            locale === loc
              ? 'bg-[color:var(--mr-ink)] text-[color:var(--mr-paper)] font-semibold'
              : 'text-[color:var(--mr-ink-2)] hover:text-[color:var(--mr-ink)]'
          } ${i > 0 ? 'border-l border-[color:var(--mr-line)]' : ''}`}
        >
          {loc}
        </button>
      ))}
    </div>
  )
}
