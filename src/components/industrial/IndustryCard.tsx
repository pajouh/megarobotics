interface IndustryCardProps {
  title: string
  applications: string[]
  applicationsLabel?: string
}

export default function IndustryCard({ title, applications, applicationsLabel }: IndustryCardProps) {
  return (
    <article className="ind-card flex flex-col h-full">
      <h3 className="ind-h3 text-gray-900 mb-4">{title}</h3>
      {applicationsLabel && (
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
          {applicationsLabel}
        </div>
      )}
      <ul className="space-y-1.5">
        {applications.map((a) => (
          <li key={a} className="text-sm text-gray-600 flex items-start gap-2">
            <span className="text-blue-600 mt-0.5" aria-hidden="true">›</span>
            <span>{a}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}
