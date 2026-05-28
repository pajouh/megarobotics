import { getSiteSettings, urlFor, type Locale } from '@/lib/sanity'
import { getTranslations } from 'next-intl/server'
import Footer, { type IndustrialFooterTranslations } from './Footer'

interface FooterWrapperProps {
  locale?: Locale
}

export default async function FooterWrapper({ locale = 'en' }: FooterWrapperProps) {
  const settings = await getSiteSettings(locale)
  const t = await getTranslations({ locale, namespace: 'industrial.footerExtra' })
  const tDisclaimers = await getTranslations({ locale, namespace: 'disclaimers' })

  const translations: IndustrialFooterTranslations = {
    tagline: t('tagline'),
    columns: {
      platform: t('columns.platform'),
      catalog: t('columns.catalog'),
      network: t('columns.network'),
      company: t('columns.company'),
      legal: t('columns.legal'),
    },
    links: {
      solutions: t('links.solutions'),
      industries: t('links.industries'),
      robotTechnologies: t('links.robotTechnologies'),
      technologyNetwork: t('links.technologyNetwork'),
      forCustomers: t('links.forCustomers'),
      forManufacturers: t('links.forManufacturers'),
      projects: t('links.projects'),
      insights: t('links.insights'),
      company: t('links.company'),
      contact: t('links.contact'),
      products: t('links.products'),
      automationComponents: t('links.automationComponents'),
      robotDistributor: t('links.robotDistributor'),
      manufacturers: t('links.manufacturers'),
      institutes: t('links.institutes'),
      imprint: t('links.imprint'),
      privacy: t('links.privacy'),
    },
    trademarkDisclaimer: tDisclaimers('footer'),
  }

  const logoWidth = settings?.logoWidth || 36
  const logoHeight = settings?.logoHeight || 36

  const logoUrl = settings?.logo
    ? urlFor(settings.logo).width(logoWidth * 2).height(logoHeight * 2).url()
    : null

  return (
    <Footer
      settings={settings}
      logoUrl={logoUrl}
      logoWidth={logoWidth}
      logoHeight={logoHeight}
      translations={translations}
    />
  )
}
