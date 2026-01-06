import { getSiteSettings } from '@/lib/sanity'
import Footer from './Footer'

export default async function FooterWrapper() {
  const settings = await getSiteSettings()
  return <Footer settings={settings} />
}
