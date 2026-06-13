'use client'

import { useState, useEffect } from 'react'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { Menu, X, ArrowRight } from 'lucide-react'
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
  const t = useTranslations('industrial.nav')
  const tLegacy = useTranslations('nav')

  const navigation = [
    { name: t('solutions'), href: '/solutions' },
    { name: t('industries'), href: '/industries' },
    { name: t('robotTechnologies'), href: '/robot-technologies' },
    { name: t('technologyNetwork'), href: '/technology-network' },
    { name: t('projects'), href: '/projects' },
    { name: tLegacy('products'), href: '/products' },
    { name: tLegacy('manufacturers'), href: '/manufacturers' },
    { name: tLegacy('institutes'), href: '/institutes' },
    { name: t('insights'), href: '/articles' },
    { name: t('company'), href: '/about' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-[color:var(--mr-paper)] transition-shadow duration-300 border-b ${
        scrolled ? 'border-[color:var(--mr-line-strong)]' : 'border-[color:var(--mr-line)]'
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

          {/* Desktop Navigation */}
          <div className="hidden xl:flex xl:items-center xl:gap-3 min-w-0 overflow-x-auto mr-scroll-x">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[11px] tracking-[0.01em] text-[color:var(--mr-ink-2)] hover:text-[color:var(--mr-ink)] transition-colors font-medium whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA & Language Switcher */}
          <div className="hidden xl:flex xl:items-center gap-3 shrink-0">
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[color:var(--mr-ink)] text-[color:var(--mr-paper)] hover:bg-[color:var(--mr-accent-ink)] hover:text-white transition-colors text-xs font-semibold whitespace-nowrap"
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
          <div className="xl:hidden py-4 border-t border-[color:var(--mr-line)] bg-[color:var(--mr-paper)]">
            <div className="flex flex-col gap-1">
              {navigation.map((item, idx) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-baseline gap-3 text-[color:var(--mr-ink)] hover:bg-[color:var(--mr-paper-2)] transition-colors px-3 py-2 font-medium"
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
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[color:var(--mr-ink)] text-[color:var(--mr-paper)] text-sm font-semibold mt-3 mx-3"
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
