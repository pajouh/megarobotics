import Image from 'next/image'

interface TechnologyCardProps {
  title: string
  description: string
  applications?: string[]
  criteria?: string[]
  applicationsLabel?: string
  criteriaLabel?: string
  image?: { src: string; alt: string }
}

export default function TechnologyCard({
  title,
  description,
  applications,
  criteria,
  applicationsLabel,
  criteriaLabel,
  image,
}: TechnologyCardProps) {
  return (
    <article className="ind-card flex flex-col h-full !p-0 overflow-hidden">
      {image && (
        <div className="relative w-full aspect-[16/9] bg-gray-100">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="ind-h3 text-gray-900 mb-3">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-5">{description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
          {applications && applications.length > 0 && (
            <div>
              {applicationsLabel && (
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  {applicationsLabel}
                </div>
              )}
              <ul className="space-y-1">
                {applications.map((a) => (
                  <li key={a} className="text-xs text-gray-700">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {criteria && criteria.length > 0 && (
            <div>
              {criteriaLabel && (
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  {criteriaLabel}
                </div>
              )}
              <ul className="space-y-1">
                {criteria.map((c) => (
                  <li key={c} className="text-xs text-blue-700">
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
