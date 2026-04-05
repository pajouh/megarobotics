import { Metadata } from 'next'
import { GraduationCap, Globe, CalendarDays } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { getInstitutes, getInstituteCountries } from '@/lib/sanity'
import { generateAlternates } from '@/lib/structured-data'
import InstituteFilter from '@/components/InstituteFilter'

const title = 'Robotics Research Institutes'
const description = 'Verified directory of robotics labs, centers and institutes — DACH and worldwide. Browse leading research institutions in humanoids, autonomous systems, and AI-driven robotics.'

export const metadata: Metadata = {
  title,
  description,
  alternates: generateAlternates('/institutes'),
  openGraph: {
    title,
    description,
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'MegaRobotics Research Institutes' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
}

export const revalidate = 60

export default async function InstitutesPage() {
  const [institutes, countries, t] = await Promise.all([
    getInstitutes(),
    getInstituteCountries(),
    getTranslations('institutes'),
  ])

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-gray-600 max-w-2xl mb-6">
            {t('subtitle')}
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-gray-900">{institutes.length}</span>
              {t('stats.institutes')}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Globe className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-gray-900">{countries.length}</span>
              {t('stats.countries')}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CalendarDays className="w-4 h-4 text-emerald-600" />
              {t('stats.lastUpdated')}: April 2026
            </div>
          </div>
        </div>

        {/* Filterable Grid */}
        <InstituteFilter institutes={institutes} countries={countries} />
      </div>
    </div>
  )
}
