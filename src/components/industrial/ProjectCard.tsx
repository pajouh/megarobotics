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
        <div className="inline-flex items-center self-start px-2 py-1 rounded text-[0.65rem] font-semibold uppercase tracking-wider text-orange-700 bg-orange-50 border border-orange-100 mb-4">
          {label}
        </div>
      )}
      <h3 className="ind-h3 text-gray-900 mb-2">{title}</h3>
      <p className="text-sm font-medium text-gray-700 mb-3">{subtitle}</p>
      {body && <p className="text-sm text-gray-600 leading-relaxed">{body}</p>}
    </article>
  )
}
