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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[color:var(--ind-graphite-950)]/95 backdrop-blur-md border-b border-white/10 shadow-sm'
          : 'bg-[color:var(--ind-graphite-950)]/70 backdrop-blur-sm'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
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
              <div className="relative w-9 h-9 rounded bg-[color:var(--ind-blue)] flex items-center justify-center overflow-hidden">
                <span className="text-white font-bold text-lg">M</span>
              </div>
            )}
            <span className="hidden sm:block text-white font-semibold tracking-tight text-lg">
              {siteName || 'MegaRobotics'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex xl:items-center xl:gap-5">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-gray-300 hover:text-white transition-colors font-medium whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA & Language Switcher */}
          <div className="hidden xl:flex xl:items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[color:var(--ind-blue)] text-white hover:bg-[color:var(--ind-blue-hover)] transition-colors text-sm font-semibold"
            >
              {t('discussProject')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden">
            <button
              type="button"
              className="text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile / tablet Navigation */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-white/10 bg-[color:var(--ind-graphite-950)]">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white hover:bg-white/5 transition-colors px-3 py-2 rounded font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <LanguageSwitcher />
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-[color:var(--ind-blue)] text-white text-sm font-semibold mt-3"
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
