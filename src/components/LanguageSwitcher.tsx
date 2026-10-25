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
      className="inline-flex items-center gap-0.5 p-0.5 font-mono text-[11px] tracking-[0.08em] rounded-full border border-[color:var(--mr-line)] bg-white/70"
      role="group"
      aria-label="Select language"
    >
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          aria-pressed={locale === loc}
          aria-label={localeNames[loc]}
          className={`px-2.5 py-1 rounded-full uppercase transition-colors ${
            locale === loc
              ? 'bg-[color:var(--mr-accent-ink)] text-white font-semibold'
              : 'text-[color:var(--mr-ink-2)] hover:text-[color:var(--mr-ink)]'
          }`}
        >
          {loc}
        </button>
      ))}
    </div>
  )
}
