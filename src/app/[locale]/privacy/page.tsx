// /src/app/privacy/page.tsx
import { Metadata } from 'next'
import { format } from 'date-fns'
import { getPageByType, type Locale } from '@/lib/sanity'
import PageBody from '@/components/PageBody'
import { generateAlternates } from '@/lib/structured-data'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const page = await getPageByType('privacy', locale as Locale)

  const title = page?.seo?.metaTitle || (locale === 'de' ? 'Datenschutz - MegaRobotics' : 'Privacy Policy - MegaRobotics')
  const description = page?.seo?.metaDescription || (locale === 'de'
    ? 'Datenschutzrichtlinie und Informationen zum Datenschutz für MegaRobotics'
    : 'Privacy policy and data protection information for MegaRobotics')

  return {
    title,
    description,
    alternates: generateAlternates('/privacy'),
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export const revalidate = 3600

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params
  const page = await getPageByType('privacy', locale as Locale)

  // Fallback content if no page exists in Sanity
  if (!page) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <div className="prose-page text-gray-600">
            <p className="mb-6">
              This page is managed through the CMS. Please create a Privacy Policy page in Sanity Studio.
            </p>
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
              How to add content:
            </h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Go to Sanity Studio (/studio)</li>
              <li>Create a new &quot;Page&quot; document</li>
              <li>Set the Page Type to &quot;Privacy Policy&quot;</li>
              <li>Add your privacy policy content</li>
              <li>Publish the document</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {page.title}
        </h1>
        {page.subtitle && (
          <p className="text-lg text-gray-600 mb-6">{page.subtitle}</p>
        )}
        {page.lastUpdated && (
          <p className="text-sm text-gray-500 mb-8">
            Last updated: {format(new Date(page.lastUpdated), 'MMMM d, yyyy')}
          </p>
        )}
        {page.body && <PageBody body={page.body} />}
      </div>
    </div>
  )
}
