import { ProductSpecification } from '@/types'

interface SpecificationsTableProps {
  specifications: ProductSpecification[]
}

export default function SpecificationsTable({ specifications }: SpecificationsTableProps) {
  if (!specifications || specifications.length === 0) {
    return null
  }

  return (
    <div className="border-t-2 border-[color:var(--mr-ink)] bg-[color:var(--mr-white)]">
      <table className="w-full">
        <tbody>
          {specifications.map((spec, index) => (
            <tr key={index} className="border-b border-[color:var(--mr-line)]">
              <td className="px-4 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-[color:var(--mr-steel)] w-2/5 align-top">
                {spec.label}
              </td>
              <td className="px-4 py-2.5 text-sm font-medium text-[color:var(--mr-ink)]">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
