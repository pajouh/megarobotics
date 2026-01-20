import { getSiteSettings, urlFor, type Locale } from '@/lib/sanity'
import { getTranslations } from 'next-intl/server'
import Footer from './Footer'

interface FooterWrapperProps {
  locale?: Locale
}

export default async function FooterWrapper({ locale = 'en' }: FooterWrapperProps) {
  const settings = await getSiteSettings(locale)
  const t = await getTranslations('footer')
  const tNav = await getTranslations('nav')
  const tNewsletter = await getTranslations('newsletter')
  const tDisclaimers = await getTranslations('disclaimers')

  const translations = {
    products: t('products'),
    news: t('news'),
    company: t('company'),
    allProducts: tNav('products'),
    allNews: tNav('news'),
    manufacturers: tNav('manufacturers'),
    reviews: tNav('reviews'),
    research: tNav('research'),
    about: tNav('about'),
    contact: tNav('contact'),
    imprint: t('imprint'),
    privacyPolicy: t('privacyPolicy'),
    stayUpdated: tNewsletter('title'),
    newsletterSubtitle: tNewsletter('subtitle'),
    enterEmail: tNewsletter('placeholder'),
    subscribe: tNewsletter('subscribe'),
    humanoidLegged: t('humanoidLegged'),
    industrialCobots: t('industrialCobots'),
    consumerHome: t('consumerHome'),
    companies: t('companies'),
    events: t('events'),
    trademarkDisclaimer: tDisclaimers('footer'),
  }

  const logoWidth = settings?.logoWidth || 36
  const logoHeight = settings?.logoHeight || 36

  // Process logo URL on server side for client component
  // Use 2x resolution for retina displays
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
