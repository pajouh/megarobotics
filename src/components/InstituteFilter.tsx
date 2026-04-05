'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Institute } from '@/types'
import InstituteCard from './InstituteCard'

interface InstituteFilterProps {
  institutes: Institute[]
  countries: string[]
}

const CENTER_TYPES = ['Institute', 'Laboratory', 'Center', 'Department', 'Umbrella network']
const TOPICS = [
  'humanoids',
  'manipulation',
  'mobile robots',
  'medical robotics',
  'soft robotics',
  'autonomous systems',
  'industrial automation',
  'computer vision',
  'machine learning',
  'aerial robotics',
  'human-robot interaction',
  'legged locomotion',
]

function InstituteFilterInner({ institutes, countries }: InstituteFilterProps) {
  const t = useTranslations('institutes')
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [showFilters, setShowFilters] = useState(false)

  const currentCountry = searchParams.get('country') || ''
  const currentType = searchParams.get('type') || ''
  const currentTopic = searchParams.get('topic') || ''
  const currentRegion = searchParams.get('region') || ''
  const currentQ = searchParams.get('q') || ''
  const currentSort = searchParams.get('sort') || 'name'

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const filtered = useMemo(() => {
    let result = institutes

    if (currentCountry) {
      result = result.filter((i) => i.country === currentCountry)
    }
    if (currentType) {
      result = result.filter((i) => i.centerType === currentType)
    }
    if (currentTopic) {
      result = result.filter((i) =>
        i.focusAreas?.some((a) => a.toLowerCase().includes(currentTopic.toLowerCase()))
      )
    }
    if (currentRegion) {
      result = result.filter((i) => i.region === currentRegion)
    }
    if (currentQ) {
      const q = currentQ.toLowerCase()
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.parentInstitution.toLowerCase().includes(q)
      )
    }

    if (currentSort === 'priority') {
      result = [...result].sort((a, b) => {
        const pa = a.outreachPriority || 2
        const pb = b.outreachPriority || 2
        if (pa !== pb) return pa - pb
        return a.name.localeCompare(b.name)
      })
    }

    return result
  }, [institutes, currentCountry, currentType, currentTopic, currentRegion, currentQ, currentSort])

  const activeFilterCount = [currentCountry, currentType, currentTopic, currentRegion].filter(Boolean).length

  return (
    <div>
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={currentQ}
            onChange={(e) => updateParams('q', e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        {/* Region Toggle */}
        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
          {['', 'DACH', 'Global'].map((region) => (
            <button
              key={region}
              onClick={() => updateParams('region', region)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                currentRegion === region
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {region === '' ? t('allRegions') : region === 'DACH' ? t('dach') : t('global')}
            </button>
          ))}
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
            activeFilterCount > 0
              ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
              : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-emerald-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Sort */}
        <select
          value={currentSort}
          onChange={(e) => updateParams('sort', e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="name">{t('sortByName')}</option>
          <option value="priority">{t('sortByPriority')}</option>
        </select>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
          {/* Country */}
          <select
            value={currentCountry}
            onChange={(e) => updateParams('country', e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">{t('allCountries')}</option>
            {countries.sort().map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Type */}
          <select
            value={currentType}
            onChange={(e) => updateParams('type', e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">{t('allTypes')}</option>
            {CENTER_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          {/* Topic */}
          <select
            value={currentTopic}
            onChange={(e) => updateParams('topic', e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">{t('allTopics')}</option>
            {TOPICS.map((topic) => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
        </div>
      )}

      {/* Results Count */}
      <p className="text-sm text-gray-500 mb-6">
        {t('showing', { count: filtered.length, total: institutes.length })}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((institute) => (
            <InstituteCard
              key={institute._id}
              institute={institute}
              moreLabel={t('moreAreas', { count: 0 })}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            {t('noInstitutes')}
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            {t('noInstitutesDescription')}
          </p>
        </div>
      )}
    </div>
  )
}

export default function InstituteFilter(props: InstituteFilterProps) {
  return (
    <Suspense fallback={<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {props.institutes.slice(0, 8).map((institute) => (
        <InstituteCard key={institute._id} institute={institute} />
      ))}
    </div>}>
      <InstituteFilterInner {...props} />
    </Suspense>
  )
}
