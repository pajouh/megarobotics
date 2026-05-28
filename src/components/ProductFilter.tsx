'use client'

import { Link, useRouter } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ProductCategory, Manufacturer } from '@/types'
import { useState, useCallback } from 'react'
import { productFamilyFallbacks } from '@/data/product-families'

interface ProductFilterProps {
  categories: ProductCategory[]
  manufacturers?: Manufacturer[]
  activeCategory?: string
  activeManufacturer?: string
}

const AVAILABILITY_OPTIONS = [
  'in_stock',
  'available_on_request',
  'sourcing_on_request',
  'lead_time_required',
  'information_only',
  'discontinued',
] as const

export default function ProductFilter({
  categories,
  manufacturers,
  activeCategory,
  activeManufacturer,
}: ProductFilterProps) {
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

  const handleManufacturerChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value
      if (value) router.push(`/manufacturers/${value}`)
      else router.push('/products')
    },
    [router],
  )

  return (
    <div className="space-y-4">
      {/* Search bar */}
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

      {/* Family + availability + manufacturer dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <select
          value={activeFamily}
          onChange={(e) => updateParam('family', e.target.value)}
          className="px-4 py-2 bg-white border border-gray-200 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-200 transition-all"
        >
          <option value="">{tFilter('allFamilies')}</option>
          {productFamilyFallbacks.map((f) => {
            const title = (() => {
              try {
                return tFamilies(`${f.slug}.title`)
              } catch {
                return f.slug
              }
            })()
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

        {manufacturers && manufacturers.length > 0 && (
          <select
            value={activeManufacturer || ''}
            onChange={handleManufacturerChange}
            className="px-4 py-2 bg-white border border-gray-200 rounded text-gray-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-200 transition-all"
          >
            <option value="">{tFilter('allManufacturers')}</option>
            {manufacturers.map((manufacturer) => (
              <option key={manufacturer._id} value={manufacturer.slug.current}>
                {manufacturer.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Legacy category tabs (kept for back-compat — uses existing productCategory schema) */}
      {categories.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Link
            href="/products"
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              !activeCategory
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tFilter('allCategories')}
          </Link>
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/products/category/${category.slug.current}`}
              className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCategory === category.slug.current
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.icon && <span>{category.icon}</span>}
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function availStatusToKey(s: string): string {
  return {
    in_stock: 'inStock',
    available_on_request: 'availableOnRequest',
    sourcing_on_request: 'sourcingOnRequest',
    lead_time_required: 'leadTimeRequired',
    information_only: 'informationOnly',
    discontinued: 'discontinued',
  }[s] ?? s
}
