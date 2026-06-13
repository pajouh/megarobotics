'use client'

import { Link } from '@/i18n/navigation'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
  activeCategory?: string
}

const base =
  'flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 font-mono text-[0.7rem] uppercase tracking-[0.1em] font-medium border transition-colors'
const active = 'bg-[color:var(--mr-ink)] text-[color:var(--mr-paper)] border-[color:var(--mr-ink)]'
const idle =
  'bg-transparent text-[color:var(--mr-ink-2)] border-[color:var(--mr-line)] hover:border-[color:var(--mr-line-strong)] hover:text-[color:var(--mr-ink)]'

export default function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mr-scroll-x">
      <Link href="/articles" className={`${base} ${!activeCategory ? active : idle}`}>
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category._id}
          href={`/category/${category.slug.current}`}
          className={`${base} ${activeCategory === category.slug.current ? active : idle}`}
        >
          {category.title}
        </Link>
      ))}
    </div>
  )
}
