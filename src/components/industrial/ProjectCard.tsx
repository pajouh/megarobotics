interface ProjectCardProps {
  title: string
  subtitle: string
  body?: string
  label?: string
}

export default function ProjectCard({ title, subtitle, body, label }: ProjectCardProps) {
  return (
    <article className="ind-card flex flex-col h-full">
      {label && (
        <div className="mr-label mb-4">{label}</div>
      )}
      <h3 className="ind-h3 text-[color:var(--mr-ink)] mb-2">{title}</h3>
      <p className="text-sm font-medium text-[color:var(--mr-ink-2)] mb-3">{subtitle}</p>
      {body && <p className="text-sm text-[color:var(--mr-ink-2)] leading-relaxed">{body}</p>}
    </article>
  )
}
