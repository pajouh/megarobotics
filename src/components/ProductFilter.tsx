'use client'

import { useRouter } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState, useCallback } from 'react'
import { productFamilyFallbacks } from '@/data/product-families'

interface ProductFilterProps {
  /** Kept for back-compat with callers that still pass it; not rendered. */
  manufacturers?: unknown
}

const AVAILABILITY_OPTIONS = [
  'in_stock',
  'available_on_request',
  'sourcing_on_request',
  'lead_time_required',
  'information_only',
  'discontinued',
] as const

export default function ProductFilter(_props: ProductFilterProps) {
  void _props
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const tFamilies = useTranslations('industrial.catalog.families')
  const tFilter = useTranslations('industrial.productDetail.filter')
  const tAvail = useTranslations('industrial.productDetail.availability')

  const activeFamily = searchParams.get('family') || ''
  const activeAvailability = searchParams.get('availability') || ''

  const updateParam = useCallback(
    (key: string, value: string) => {
      const sp = new URLSearchParams(searchParams.toString())
      if (value) sp.set(key, value)
      else sp.delete(key)
      const qs = sp.toString()
      router.push(`/products${qs ? `?${qs}` : ''}`)
    },
    [router, searchParams],
  )

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      updateParam('q', searchQuery.trim())
    },
    [searchQuery, updateParam],
  )

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={tFilter('searchPlaceholder')}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-200 transition-all"
        />
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <select
          value={activeFamily}
          onChange={(e) => updateParam('family', e.target.value)}
          className="px-4 py-2 bg-white border border-gray-200 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-200 transition-all"
        >
          <option value="">{tFilter('allFamilies')}</option>
          {productFamilyFallbacks.map((f) => {
            let title = f.slug
            try {
              title = tFamilies(`${f.slug}.title`)
            } catch {
              /* fall back to slug */
            }
            return (
              <option key={f.slug} value={f.slug}>
                {title}
              </option>
            )
          })}
        </select>

        <select
          value={activeAvailability}
          onChange={(e) => updateParam('availability', e.target.value)}
          className="px-4 py-2 bg-white border border-gray-200 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-200 transition-all"
        >
          <option value="">{tFilter('allAvailability')}</option>
          {AVAILABILITY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {tAvail(availStatusToKey(opt))}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

function availStatusToKey(s: string): string {
  return (
    {
      in_stock: 'inStock',
      available_on_request: 'availableOnRequest',
      sourcing_on_request: 'sourcingOnRequest',
      lead_time_required: 'leadTimeRequired',
      information_only: 'informationOnly',
      discontinued: 'discontinued',
    }[s] ?? s
  )
}
