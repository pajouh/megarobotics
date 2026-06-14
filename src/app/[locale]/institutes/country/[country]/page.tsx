import { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import {
  getInstitutesByCountry,
  getInstituteCountries,
} from '@/lib/sanity'
import { generateAlternates } from '@/lib/structured-data'
import InstituteCard from '@/components/InstituteCard'

interface Props {
  params: Promise<{ country: string; locale: string }>
}

// Map URL slug back to proper country name
function decodeCountry(slug: string): string {
  const map: Record<string, string> = {
    'germany': 'Germany',
    'austria': 'Austria',
    'switzerland': 'Switzerland',
    'united-states': 'United States',
    'usa': 'USA',
    'united-kingdom': 'United Kingdom',
    'uk': 'UK',
    'japan': 'Japan',
    'south-korea': 'South Korea',
    'china': 'China',
    'france': 'France',
    'italy': 'Italy',
    'canada': 'Canada',
    'australia': 'Australia',
    'singapore': 'Singapore',
    'netherlands': 'Netherlands',
    'sweden': 'Sweden',
    'denmark': 'Denmark',
    'israel': 'Israel',
  }
  return map[slug.toLowerCase()] || slug.charAt(0).toUpperCase() + slug.slice(1)
}

function countryToSlug(country: string): string {
  return country.toLowerCase().replace(/\s+/g, '-')
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: countrySlug, locale } = await params
  const country = decodeCountry(countrySlug)

  const metaTitle = `Robotics Research Institutes in ${country} – Universities & Labs | MegaRobotics`
  const metaDescription = `Browse verified robotics research institutes, laboratories, and centers in ${country}. Discover leading university labs and research organizations.`

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: generateAlternates(`/institutes/country/${countrySlug}`, locale),
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
  const countries = await getInstituteCountries()
  return countries.map((country) => ({
    country: countryToSlug(country),
  }))
}

export const revalidate = 60

export default async function CountryInstitutesPage({ params }: Props) {
  const { country: countrySlug } = await params
  const country = decodeCountry(countrySlug)
  const institutes = await getInstitutesByCountry(country)
  const t = await getTranslations('institutes')

  if (institutes.length === 0) {
    notFound()
  }

  const introKey = `countryIntro${country}` as
    | 'countryIntroGermany'
    | 'countryIntroAustria'
    | 'countryIntroSwitzerland'
    | 'countryIntroGeneric'

  const hasSpecificIntro = ['Germany', 'Austria', 'Switzerland'].includes(country)
  const intro = hasSpecificIntro
    ? t(introKey as 'countryIntroGermany' | 'countryIntroAustria' | 'countryIntroSwitzerland')
    : t('countryIntroGeneric', { country })

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/institutes"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('backToInstitutes')}
        </Link>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('countryTitle', { country })}
          </h1>
          <p className="text-gray-600 max-w-3xl mb-4 leading-relaxed">
            {intro}
          </p>
          <p className="text-sm text-gray-500">
            {t('countryCount', { count: institutes.length })}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {institutes.map((institute) => (
            <InstituteCard key={institute._id} institute={institute} />
          ))}
        </div>
      </div>
    </div>
  )
}
