'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ArrowRight } from 'lucide-react'

const navigation = [
  { name: 'Products', href: '/products' },
  { name: 'News', href: '/articles' },
  { name: 'Manufacturers', href: '/manufacturers' },
  { name: 'Reviews', href: '/category/reviews' },
  { name: 'Research', href: '/category/research' },
]

interface HeaderProps {
  siteName?: string
  logoUrl?: string | null
}

export default function Header({ siteName, logoUrl }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            {logoUrl ? (
              <div className="relative w-9 h-9 overflow-hidden">
                <Image
                  src={logoUrl}
                  alt={siteName || 'MegaRobotics'}
                  width={36}
                  height={36}
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center overflow-hidden">
                <span className="text-white font-bold text-lg">M</span>
              </div>
            )}
            <span className="hidden sm:block text-gray-900 font-semibold tracking-tight text-lg">
              {siteName || 'MegaRobotics'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Subscribe Button */}
          <div className="hidden md:flex md:items-center gap-4">
            <Link
              href="#newsletter"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors px-3 py-2 rounded-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="#newsletter"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium mt-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
