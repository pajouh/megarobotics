import { getSiteSettings, urlFor } from '@/lib/sanity'
import Header from './Header'

export default async function HeaderWrapper() {
  const settings = await getSiteSettings()

  // Process logo URL on server side for client component
  const logoUrl = settings?.logo
    ? urlFor(settings.logo).width(120).height(120).url()
    : null

  return (
    <Header
      siteName={settings?.siteName}
      logoUrl={logoUrl}
    />
  )
}
