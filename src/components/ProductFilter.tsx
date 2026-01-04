'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { ProductCategory, Manufacturer } from '@/types'
import { useState, useCallback } from 'react'

interface ProductFilterProps {
  categories: ProductCategory[]
  manufacturers?: Manufacturer[]
  activeCategory?: string
  activeManufacturer?: string
}

export default function ProductFilter({
  categories,
  manufacturers,
  activeCategory,
  activeManufacturer
}: ProductFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')

  const handleManufacturerChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value) {
      router.push(`/manufacturers/${value}`)
    } else {
      router.push('/products')
    }
  }, [router])

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }, [router, searchQuery])

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all"
        />
      </form>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide flex-grow">
          <Link
            href="/products"
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !activeCategory
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            }`}
          >
            All Products
          </Link>
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/products/category/${category.slug.current}`}
              className={`flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.slug.current
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              {category.icon && <span>{category.icon}</span>}
              {category.name}
            </Link>
          ))}
        </div>

        {/* Manufacturer Dropdown */}
        {manufacturers && manufacturers.length > 0 && (
          <div className="flex-shrink-0">
            <select
              value={activeManufacturer || ''}
              onChange={handleManufacturerChange}
              className="w-full sm:w-48 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all text-sm"
            >
              <option value="">All Manufacturers</option>
              {manufacturers.map((manufacturer) => (
                <option key={manufacturer._id} value={manufacturer.slug.current}>
                  {manufacturer.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  )
}
