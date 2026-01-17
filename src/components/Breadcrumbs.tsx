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
  const baseUrl = 'https://megarobotics.de'

  const allItems = [
    { name: 'Home', href: '/' },
    ...items,
  ]

  const schemaItems = allItems.map((item) => ({
    name: item.name,
    url: `${baseUrl}${item.href}`,
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
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Home"
                >
                  <Home className="w-4 h-4" />
                </Link>
              ) : (
                <>
                  <ChevronRight className="w-4 h-4 text-gray-300 mx-1" />
                  {index === allItems.length - 1 ? (
                    <span className="text-gray-900 font-medium truncate max-w-[200px]">
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-500 hover:text-gray-900 transition-colors truncate max-w-[150px]"
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
