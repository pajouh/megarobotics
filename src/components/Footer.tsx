import Link from 'next/link'
import { Twitter, Linkedin, Youtube, Github, Instagram, Mail } from 'lucide-react'

interface FooterLink {
  _key: string
  label: string
  url: string
}

interface FooterColumn {
  _key: string
  title: string
  links: FooterLink[]
}

interface SocialLinks {
  twitter?: string
  linkedin?: string
  youtube?: string
  github?: string
  instagram?: string
}

interface SiteSettings {
  siteName?: string
  footerDescription?: string
  copyrightText?: string
  socialLinks?: SocialLinks
  footerLinks?: FooterColumn[]
  contactEmail?: string
}

interface FooterProps {
  settings?: SiteSettings | null
}

// Default fallback data
const defaultProducts = [
  { name: 'All Products', href: '/products' },
  { name: 'Humanoid & Legged', href: '/products/category/humanoid-legged-robots' },
  { name: 'Industrial & Cobots', href: '/products/category/industrial-cobots' },
  { name: 'Consumer & Home', href: '/products/category/consumer-home' },
  { name: 'Manufacturers', href: '/manufacturers' },
]

const defaultNews = [
  { name: 'All News', href: '/articles' },
  { name: 'Reviews', href: '/category/reviews' },
  { name: 'Companies', href: '/category/companies' },
  { name: 'Events', href: '/category/events' },
  { name: 'Research', href: '/category/research' },
]

const defaultCompany = [
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/about#contact' },
  { name: 'Imprint', href: '/imprint' },
  { name: 'Privacy Policy', href: '/privacy' },
]

export default function Footer({ settings }: FooterProps) {
  const siteName = settings?.siteName || 'MegaRobotics'
  const footerDescription = settings?.footerDescription || 'Your source for the latest robotics news, reviews, and industry insights. Covering industrial automation, humanoid robots, and AI integration.'
  const copyrightText = settings?.copyrightText || `© ${new Date().getFullYear()} MegaRobotics. All rights reserved.`
  const socialLinks = settings?.socialLinks

  // Use CMS footer links if available, otherwise use defaults
  const footerColumns = settings?.footerLinks && settings.footerLinks.length > 0
    ? settings.footerLinks
    : null

  const socials = [
    socialLinks?.twitter && { name: 'Twitter', icon: Twitter, href: socialLinks.twitter },
    socialLinks?.linkedin && { name: 'LinkedIn', icon: Linkedin, href: socialLinks.linkedin },
    socialLinks?.youtube && { name: 'YouTube', icon: Youtube, href: socialLinks.youtube },
    socialLinks?.github && { name: 'GitHub', icon: Github, href: socialLinks.github },
    socialLinks?.instagram && { name: 'Instagram', icon: Instagram, href: socialLinks.instagram },
  ].filter(Boolean) as { name: string; icon: typeof Twitter; href: string }[]

  // Fallback socials if none from CMS
  const displaySocials = socials.length > 0 ? socials : [
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/megarobotics' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/megarobotics' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@megarobotics' },
  ]

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-gray-900 font-semibold tracking-tight text-lg">
                {siteName}
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              {footerDescription}
            </p>
            <div className="flex gap-3 mt-4">
              {displaySocials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <span className="sr-only">{social.name}</span>
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic columns from CMS or fallback */}
          {footerColumns ? (
            // Use CMS columns
            footerColumns.map((column) => (
              <div key={column._key}>
                <h3 className="text-gray-900 font-semibold mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links?.map((link) => (
                    <li key={link._key}>
                      <Link
                        href={link.url}
                        className="text-gray-500 hover:text-gray-900 transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            // Fallback columns
            <>
              <div>
                <h3 className="text-gray-900 font-semibold mb-4">Products</h3>
                <ul className="space-y-2">
                  {defaultProducts.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-gray-500 hover:text-gray-900 transition-colors text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-gray-900 font-semibold mb-4">News</h3>
                <ul className="space-y-2">
                  {defaultNews.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-gray-500 hover:text-gray-900 transition-colors text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  {defaultCompany.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-gray-500 hover:text-gray-900 transition-colors text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Newsletter */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-gray-900 font-semibold mb-1">Stay Updated</h3>
              <p className="text-gray-500 text-sm">
                Get the latest robotics news delivered to your inbox.
              </p>
            </div>
            <form className="flex gap-3 w-full md:w-auto" action="/api/newsletter" method="POST">
              <div className="relative flex-grow md:w-64">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 text-sm"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            {copyrightText}
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-gray-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/imprint" className="text-gray-400 hover:text-gray-600 transition-colors">
              Imprint
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
