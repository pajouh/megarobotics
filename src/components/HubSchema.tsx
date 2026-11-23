import { getLocale } from 'next-intl/server'
import StructuredData from './StructuredData'
import { generateBreadcrumbSchema, generateHubPageSchema } from '@/lib/structured-data'

interface HubSchemaProps {
  /** The page's visible heading. */
  name: string
  description?: string
  /** Site-relative path without locale prefix, e.g. '/solutions'. */
  path: string
  /** CollectionPage for listings (default), WebPage for single-topic pages. */
  type?: 'CollectionPage' | 'WebPage'
}

/**
 * JSON-LD for a top-level hub page that has no visible breadcrumb trail: the
 * page itself, tied to the site and organisation, plus a Home → page trail.
 */
export default async function HubSchema({ name, description, path, type = 'CollectionPage' }: HubSchemaProps) {
  const locale = await getLocale()
  const home = locale === 'de' ? 'Startseite' : 'Home'
  return (
    <StructuredData
      data={[
        generateHubPageSchema({ type, name, description, path, locale }),
        generateBreadcrumbSchema(
          [
            { name: home, href: '/' },
            { name, href: path },
          ],
          locale,
        ),
      ]}
    />
  )
}
