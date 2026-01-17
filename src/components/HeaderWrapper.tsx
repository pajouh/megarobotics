import { getSiteSettings, urlFor, type Locale } from '@/lib/sanity'
import Header from './Header'

interface HeaderWrapperProps {
  locale?: Locale
}

export default async function HeaderWrapper({ locale = 'en' }: HeaderWrapperProps) {
  const settings = await getSiteSettings(locale)

  const logoWidth = settings?.logoWidth || 36
  const logoHeight = settings?.logoHeight || 36

  // Process logo URL on server side for client component
  // Use 2x resolution for retina displays
  const logoUrl = settings?.logo
    ? urlFor(settings.logo).width(logoWidth * 2).height(logoHeight * 2).url()
    : null

  return (
    <Header
      siteName={settings?.siteName}
      logoUrl={logoUrl}
      logoWidth={logoWidth}
      logoHeight={logoHeight}
    />
  )
}
