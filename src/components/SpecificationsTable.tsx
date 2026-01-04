import { ProductSpecification } from '@/types'

interface SpecificationsTableProps {
  specifications: ProductSpecification[]
}

export default function SpecificationsTable({ specifications }: SpecificationsTableProps) {
  if (!specifications || specifications.length === 0) {
    return null
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <table className="w-full">
        <tbody>
          {specifications.map((spec, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
            >
              <td className="px-4 py-3 text-sm font-medium text-gray-700 w-2/5">
                {spec.label}
              </td>
              <td className="px-4 py-3 text-sm text-gray-900">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
