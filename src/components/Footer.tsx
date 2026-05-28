import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { Twitter, Linkedin, Youtube, Github, Instagram } from 'lucide-react'
import Disclaimer from '@/components/Disclaimer'

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

export interface IndustrialFooterTranslations {
  tagline: string
  columns: {
    platform: string
    catalog: string
    network: string
    company: string
    legal: string
  }
  links: {
    solutions: string
    industries: string
    robotTechnologies: string
    technologyNetwork: string
    forCustomers: string
    forManufacturers: string
    projects: string
    insights: string
    company: string
    contact: string
    products: string
    automationComponents: string
    robotDistributor: string
    manufacturers: string
    institutes: string
    imprint: string
    privacy: string
  }
  trademarkDisclaimer?: string
}

interface FooterProps {
  settings?: SiteSettings | null
  logoUrl?: string | null
  logoWidth?: number
  logoHeight?: number
  translations: IndustrialFooterTranslations
}

export default function Footer({
  settings,
  logoUrl,
  logoWidth = 36,
  logoHeight = 36,
  translations: t,
}: FooterProps) {
  const platformLinks = [
    { name: t.links.solutions, href: '/solutions' },
    { name: t.links.industries, href: '/industries' },
    { name: t.links.robotTechnologies, href: '/robot-technologies' },
    { name: t.links.projects, href: '/projects' },
    { name: t.links.insights, href: '/articles' },
  ]

  const catalogLinks = [
    { name: t.links.products, href: '/products' },
    { name: t.links.automationComponents, href: '/automation-components' },
    { name: t.links.robotDistributor, href: '/robot-distributor' },
    { name: t.links.manufacturers, href: '/manufacturers' },
  ]

  const networkLinks = [
    { name: t.links.technologyNetwork, href: '/technology-network' },
    { name: t.links.forCustomers, href: '/for-customers' },
    { name: t.links.forManufacturers, href: '/for-manufacturers' },
    { name: t.links.institutes, href: '/institutes' },
  ]

  const companyLinks = [
    { name: t.links.company, href: '/about' },
    { name: t.links.contact, href: '/contact' },
  ]

  const legalLinks = [
    { name: t.links.imprint, href: '/imprint' },
    { name: t.links.privacy, href: '/privacy' },
  ]

  const siteName = settings?.siteName || 'MegaRobotics'
  const footerTagline = settings?.footerDescription || t.tagline
  const copyrightText =
    settings?.copyrightText || `© ${new Date().getFullYear()} MegaRobotics. All rights reserved.`
  const socialLinks = settings?.socialLinks

  // CMS-driven columns take precedence if defined
  const cmsColumns = settings?.footerLinks && settings.footerLinks.length > 0 ? settings.footerLinks : null

  const socials = [
    socialLinks?.twitter && { name: 'Twitter', icon: Twitter, href: socialLinks.twitter },
    socialLinks?.linkedin && { name: 'LinkedIn', icon: Linkedin, href: socialLinks.linkedin },
    socialLinks?.youtube && { name: 'YouTube', icon: Youtube, href: socialLinks.youtube },
    socialLinks?.github && { name: 'GitHub', icon: Github, href: socialLinks.github },
    socialLinks?.instagram && { name: 'Instagram', icon: Instagram, href: socialLinks.instagram },
  ].filter(Boolean) as { name: string; icon: typeof Twitter; href: string }[]

  const displaySocials =
    socials.length > 0
      ? socials
      : [
          { name: 'Twitter', icon: Twitter, href: 'https://x.com/megarobotics_de' },
          { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/megarobotics' },
          { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@megarobotics' },
        ]

  return (
    <footer className="bg-[color:var(--ind-graphite-950)] text-gray-300 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-x-8 gap-y-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              {logoUrl ? (
                <div className="relative overflow-hidden" style={{ width: logoWidth, height: logoHeight }}>
                  <Image
                    src={logoUrl}
                    alt={siteName}
                    width={logoWidth}
                    height={logoHeight}
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="w-9 h-9 rounded bg-[color:var(--ind-blue)] flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
              )}
              <span className="text-white font-semibold tracking-tight text-lg">{siteName}</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">{footerTagline}</p>
            <div className="flex gap-2 mt-5">
              {displaySocials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <span className="sr-only">{social.name}</span>
                  <social.icon className="w-4.5 h-4.5" />
                </a>
              ))}
            </div>
          </div>

          {cmsColumns ? (
            <>
              {cmsColumns.map((column) => (
                <div key={column._key}>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
                    {column.title}
                  </h3>
                  <ul className="space-y-2">
                    {column.links?.map((link) => (
                      <li key={link._key}>
                        <Link
                          href={link.url}
                          className="text-gray-300 hover:text-white transition-colors text-sm"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {/* Always append the Catalog column so the new catalog pages
                * stay reachable even when CMS-driven footerLinks exist
                * (admin may not have it). De-duplicates if a CMS column
                * already shares the Catalog title (case-insensitive match). */}
              {!cmsColumns.some(
                (c) => c.title?.toLowerCase() === t.columns.catalog.toLowerCase(),
              ) && <FooterColumn title={t.columns.catalog} items={catalogLinks} />}
            </>
          ) : (
            <>
              <FooterColumn title={t.columns.platform} items={platformLinks} />
              <FooterColumn title={t.columns.catalog} items={catalogLinks} />
              <FooterColumn title={t.columns.network} items={networkLinks} />
              <FooterColumn title={t.columns.company} items={[...companyLinks, ...legalLinks]} />
            </>
          )}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-gray-500 text-xs">{copyrightText}</p>
            <div className="flex gap-6 text-xs">
              <Link href="/imprint" className="text-gray-500 hover:text-white transition-colors">
                {t.links.imprint}
              </Link>
              <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">
                {t.links.privacy}
              </Link>
            </div>
          </div>
          <div className="mt-4">
            <Disclaimer variant="footer" translations={{ footer: t.trademarkDisclaimer }} />
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  items,
}: {
  title: string
  items: { name: string; href: string }[]
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
