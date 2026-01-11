import { getSiteSettings, urlFor } from '@/lib/sanity'
import Footer from './Footer'

export default async function FooterWrapper() {
  const settings = await getSiteSettings()

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
    />
  )
}
