'use client'

import { Link } from '@/i18n/navigation'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
  activeCategory?: string
}

export default function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <Link
        href="/articles"
        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
          !activeCategory
            ? 'bg-gray-900 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
        }`}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category._id}
          href={`/category/${category.slug.current}`}
          className={`flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === category.slug.current
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
          }`}
        >
          {category.icon && <span>{category.icon}</span>}
          {category.title}
        </Link>
      ))}
    </div>
  )
}
