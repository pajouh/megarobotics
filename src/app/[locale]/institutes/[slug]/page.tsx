import { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { notFound } from 'next/navigation'
import { ArrowLeft, Globe, MapPin, Building2, Layers, CheckCircle } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import {
  getInstitute,
  getRelatedInstitutes,
  getAllInstituteSlugs,
} from '@/lib/sanity'
import { generateAlternates } from '@/lib/structured-data'
import StructuredData from '@/components/StructuredData'
import Breadcrumbs from '@/components/Breadcrumbs'
import InstituteCard from '@/components/InstituteCard'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const institute = await getInstitute(slug)

  if (!institute) {
    return { title: 'Institute Not Found' }
  }

  const metaTitle = institute.seo?.metaTitle || `${institute.name} – Robotics Research | MegaRobotics`
  const metaDescription =
    institute.seo?.metaDescription ||
    institute.summary ||
    `${institute.name} at ${institute.parentInstitution}. Research institute focused on ${institute.focusAreas?.slice(0, 3).join(', ') || 'robotics'}.`

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: institute.seo?.keywords || institute.focusAreas,
    alternates: generateAlternates(`/institutes/${slug}`),
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: metaTitle,
      description: metaDescription,
    },
  }
}

export async function generateStaticParams() {
  return await getAllInstituteSlugs()
}

export const revalidate = 60

const baseUrl = 'https://megarobotics.de'

export default async function InstitutePage({ params }: Props) {
  const { slug } = await params
  const institute = await getInstitute(slug)

  if (!institute) {
    notFound()
  }

  const [related, t] = await Promise.all([
    getRelatedInstitutes(institute._id, institute.country),
    getTranslations('institutes'),
  ])

  const breadcrumbItems = [
    { name: t('title'), href: '/institutes' },
    { name: institute.country, href: `/institutes/country/${encodeURIComponent(institute.country.toLowerCase())}` },
    { name: institute.name, href: `/institutes/${slug}` },
  ]

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: institute.name,
    url: institute.website || `${baseUrl}/institutes/${slug}`,
    description: institute.summary || `${institute.name} at ${institute.parentInstitution}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: institute.city || undefined,
      addressCountry: institute.country,
    },
    parentOrganization: {
      '@type': 'EducationalOrganization',
      name: institute.parentInstitution,
    },
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <StructuredData data={organizationSchema} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        {/* Back Link */}
        <Link
          href="/institutes"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('backToInstitutes')}
        </Link>

        {/* Header */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-10">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {institute.name}
              </h1>
              <h2 className="text-xl text-gray-600">
                {institute.parentInstitution}
              </h2>
            </div>

            {/* Info Grid */}
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {institute.city ? `${institute.city}, ` : ''}{institute.country}
              </span>
              {institute.centerType && (
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  {institute.centerType}
                </span>
              )}
              {institute.region && (
                <span className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  {institute.region}
                </span>
              )}
              {institute.verifiedDate && (
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <CheckCircle className="w-4 h-4" />
                  {t('verifiedProfile')} ({institute.verifiedDate})
                </span>
              )}
            </div>

            {/* Focus Areas */}
            {institute.focusAreas && institute.focusAreas.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">{t('focusAreas')}</h3>
                <div className="flex flex-wrap gap-2">
                  {institute.focusAreas.map((area) => (
                    <Link
                      key={area}
                      href={`/institutes?topic=${encodeURIComponent(area)}`}
                      className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
                    >
                      {area}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Website */}
            {institute.website && (
              <a
                href={institute.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
              >
                <Globe className="w-4 h-4" />
                {t('officialWebsite')}
              </a>
            )}
          </div>

          {/* Summary */}
          {institute.summary ? (
            <p className="text-gray-600 mt-6 max-w-3xl leading-relaxed">
              {institute.summary}
            </p>
          ) : (
            <p className="text-gray-400 mt-6 max-w-3xl italic">
              Profile details coming soon. Visit the official website for more information.
            </p>
          )}
        </div>

        {/* Related Institutes */}
        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t('moreInCountry', { country: institute.country })}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((inst) => (
                <InstituteCard key={inst._id} institute={inst} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
