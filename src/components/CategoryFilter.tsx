'use client'

import Link from 'next/link'
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
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            : 'bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
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
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
          }`}
        >
          {category.icon && <span>{category.icon}</span>}
          {category.title}
        </Link>
      ))}
    </div>
  )
}
