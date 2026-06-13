import Image from 'next/image'

interface TechnologyCardProps {
  title: string
  description: string
  applications?: string[]
  criteria?: string[]
  applicationsLabel?: string
  criteriaLabel?: string
  image?: { src: string; alt: string }
  index?: number
}

export default function TechnologyCard({
  title,
  description,
  applications,
  criteria,
  applicationsLabel,
  criteriaLabel,
  image,
  index,
}: TechnologyCardProps) {
  return (
    <article className="ind-card flex flex-col h-full !p-0 overflow-hidden">
      {image && (
        <div className="relative w-full aspect-[16/9] bg-[color:var(--mr-paper-2)] border-b border-[color:var(--mr-line)]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          {typeof index === 'number' && (
            <span className="absolute top-0 left-0 px-2.5 py-1 font-mono text-[0.7rem] font-semibold bg-[color:var(--mr-ink)] text-[color:var(--mr-paper)]">
              {String(index).padStart(2, '0')}
            </span>
          )}
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        {!image && typeof index === 'number' && (
          <span className="mr-index mb-3">{String(index).padStart(2, '0')}</span>
        )}
        <h3 className="ind-h3 text-[color:var(--mr-ink)] mb-3">{title}</h3>
        <p className="text-sm text-[color:var(--mr-ink-2)] leading-relaxed mb-5">{description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto pt-4 border-t border-[color:var(--mr-line)]">
          {applications && applications.length > 0 && (
            <div>
              {applicationsLabel && (
                <div className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[color:var(--mr-steel)] mb-2">
                  {applicationsLabel}
                </div>
              )}
              <ul className="space-y-1.5">
                {applications.map((a) => (
                  <li key={a} className="text-xs text-[color:var(--mr-ink-2)] flex items-baseline gap-2">
                    <span className="text-[color:var(--mr-steel)]" aria-hidden="true">—</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {criteria && criteria.length > 0 && (
            <div>
              {criteriaLabel && (
                <div className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[color:var(--mr-steel)] mb-2">
                  {criteriaLabel}
                </div>
              )}
              <ul className="space-y-1.5">
                {criteria.map((c) => (
                  <li key={c} className="text-xs text-[color:var(--mr-ink-2)] flex items-baseline gap-2">
                    <span className="text-[color:var(--mr-accent-ink)]" aria-hidden="true">—</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
