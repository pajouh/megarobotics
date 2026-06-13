import { Link } from '@/i18n/navigation'
import { ChevronRight, Home } from 'lucide-react'
import StructuredData from './StructuredData'
import { generateBreadcrumbSchema } from '@/lib/structured-data'

interface BreadcrumbItem {
  name: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const allItems = [
    { name: 'Home', href: '/' },
    ...items,
  ]

  const schemaItems = allItems.map((item) => ({
    name: item.name,
    href: item.href,
  }))

  return (
    <>
      <StructuredData data={generateBreadcrumbSchema(schemaItems)} />
      <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
        <ol className="flex items-center flex-wrap gap-1">
          {allItems.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index === 0 ? (
                <Link
                  href={item.href}
                  className="text-[color:var(--mr-steel)] hover:text-[color:var(--mr-ink)] transition-colors"
                  aria-label="Home"
                >
                  <Home className="w-4 h-4" />
                </Link>
              ) : (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-[color:var(--mr-steel)] mx-1" />
                  {index === allItems.length - 1 ? (
                    <span className="font-mono text-xs text-[color:var(--mr-ink)] font-medium truncate max-w-[200px]">
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="font-mono text-xs text-[color:var(--mr-steel)] hover:text-[color:var(--mr-ink)] transition-colors truncate max-w-[150px]"
                    >
                      {item.name}
                    </Link>
                  )}
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
