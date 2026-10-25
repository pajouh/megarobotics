'use client'

import { useState, useEffect, useRef } from 'react'
import { Link, usePathname } from '@/i18n/navigation'
import Image from 'next/image'
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'

interface HeaderProps {
  siteName?: string
  logoUrl?: string | null
  logoWidth?: number
  logoHeight?: number
}

export default function Header({ siteName, logoUrl, logoWidth = 36, logoHeight = 36 }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('industrial.nav')
  const tLegacy = useTranslations('nav')

  const pathname = usePathname()
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  // Underline draws in from the left on hover and stays on the current section.
  const navLinkClass =
    'relative py-1 text-[11px] tracking-[0.01em] text-[color:var(--mr-ink-2)] hover:text-[color:var(--mr-ink)] transition-colors font-medium whitespace-nowrap after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[2px] after:rounded-full after:bg-[color:var(--mr-accent)] after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300'
  const activeClass = '!text-[color:var(--mr-ink)] after:!scale-x-100'

  const navigation: { name: string; href: string; overflow?: boolean }[] = [
    { name: t('solutions'), href: '/solutions' },
    { name: t('industries'), href: '/industries' },
    { name: t('robotTechnologies'), href: '/robot-technologies' },
    { name: t('technologyNetwork'), href: '/technology-network' },
    { name: t('projects'), href: '/projects' },
    { name: tLegacy('products'), href: '/products' },
    { name: tLegacy('manufacturers'), href: '/manufacturers', overflow: true },
    { name: tLegacy('institutes'), href: '/institutes', overflow: true },
    { name: t('insights'), href: '/articles' },
    { name: t('downloads'), href: '/downloads' },
    { name: t('company'), href: '/about', overflow: true },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!moreOpen) return
    const onPointer = (e: PointerEvent) => {
      if (!moreRef.current?.contains(e.target as Node)) setMoreOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMoreOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [moreOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl backdrop-saturate-150 transition-all duration-500 border-b ${
        scrolled
          ? 'bg-white/80 border-[color:var(--mr-line)] shadow-[0_8px_30px_-18px_rgba(13,27,32,0.35)]'
          : 'bg-white/55 border-transparent'
      }`}
    >
      <nav className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center group shrink-0" aria-label={siteName || 'MegaRobotics — home'}>
            {logoUrl ? (
              <div className="relative overflow-hidden" style={{ width: logoWidth, height: logoHeight }}>
                <Image
                  src={logoUrl}
                  alt={siteName || 'MegaRobotics'}
                  width={logoWidth}
                  height={logoHeight}
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <div className="relative w-9 h-9 bg-[color:var(--mr-ink)] flex items-center justify-center overflow-hidden">
                <span className="text-[color:var(--mr-paper)] font-bold text-lg">M</span>
              </div>
            )}
          </Link>

          {/* Desktop Navigation. Below 1480px the full row does not fit beside
              the logo and CTA (the German labels alone are wider than the space
              at 1280px), so the `overflow` items move into a More menu there. */}
          <div className="hidden xl:flex xl:items-center xl:gap-2.5 min-[1480px]:gap-3 min-w-0">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`${navLinkClass} ${isActive(item.href) ? activeClass : ''} ${item.overflow ? 'hidden min-[1480px]:inline' : ''}`}
              >
                {item.name}
              </Link>
            ))}
            <div ref={moreRef} className="relative flex min-[1480px]:hidden">
              <button
                type="button"
                onClick={() => setMoreOpen((open) => !open)}
                aria-expanded={moreOpen}
                aria-haspopup="true"
                className={`${navLinkClass} inline-flex items-center gap-0.5`}
              >
                {t('more')}
                <ChevronDown className={`w-3 h-3 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full mt-5 min-w-48 rounded-xl border border-[color:var(--mr-line)] bg-white/95 backdrop-blur-xl p-1.5 shadow-[var(--mr-shadow-lift)] animate-fade-in">
                  {navigation
                    .filter((item) => item.overflow)
                    .map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMoreOpen(false)}
                        className="block rounded-lg px-3.5 py-2 text-xs font-medium text-[color:var(--mr-ink-2)] hover:bg-[color:var(--mr-accent-soft)] hover:text-[color:var(--mr-accent-ink)] transition-colors whitespace-nowrap"
                      >
                        {item.name}
                      </Link>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* CTA & Language Switcher */}
          <div className="hidden xl:flex xl:items-center gap-3 shrink-0">
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="mr-btn-accent !px-4 !py-2 !text-xs whitespace-nowrap"
            >
              {t('discussProject')}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden">
            <button
              type="button"
              className="text-[color:var(--mr-ink)] p-1 -mr-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile / tablet Navigation */}
        {mobileMenuOpen && (
          <div className="xl:hidden mb-4 p-3 rounded-2xl border border-[color:var(--mr-line)] bg-white/95 backdrop-blur-xl shadow-[var(--mr-shadow-lift)] animate-fade-in">
            <div className="flex flex-col gap-1">
              {navigation.map((item, idx) => (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`flex items-baseline gap-3 rounded-lg transition-colors px-3 py-2 font-medium ${
                    isActive(item.href)
                      ? 'bg-[color:var(--mr-accent-soft)] text-[color:var(--mr-accent-ink)]'
                      : 'text-[color:var(--mr-ink)] hover:bg-[color:var(--mr-paper-2)]'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mr-index" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2 border-t border-[color:var(--mr-line)] mt-2 pt-3">
                <LanguageSwitcher />
              </div>
              <Link
                href="/contact"
                className="mr-btn-accent justify-center !py-2.5 !text-sm mt-3 mx-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('discussProject')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
