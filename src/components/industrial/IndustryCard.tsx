interface IndustryCardProps {
  title: string
  applications: string[]
  applicationsLabel?: string
  index?: number
}

export default function IndustryCard({ title, applications, applicationsLabel, index }: IndustryCardProps) {
  return (
    <article className="ind-card flex flex-col h-full">
      {typeof index === 'number' && (
        <span className="mr-index mb-3">{String(index).padStart(2, '0')}</span>
      )}
      <h3 className="ind-h3 text-[color:var(--mr-ink)] mb-4">{title}</h3>
      {applicationsLabel && (
        <div className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[color:var(--mr-steel)] mb-2 pt-3 border-t border-[color:var(--mr-line)]">
          {applicationsLabel}
        </div>
      )}
      <ul className="space-y-1.5">
        {applications.map((a) => (
          <li key={a} className="text-sm text-[color:var(--mr-ink-2)] flex items-baseline gap-2.5">
            <span className="text-[color:var(--mr-accent-ink)] font-mono text-xs" aria-hidden="true">—</span>
            <span>{a}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}
