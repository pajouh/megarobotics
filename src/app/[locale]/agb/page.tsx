import type { Metadata } from 'next'
import { pageSeo } from '@/lib/page-seo'
import { AGB_SECTIONS, AGB_SUBTITLE, AGB_TITLE, AGB_VERSION } from '@/data/agb'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const description =
    locale === 'de'
      ? 'Allgemeine Geschäftsbedingungen der MEGAFORCE GmbH (MegaRobotics) für den Verkauf von Produkten sowie die Erbringung von Werk- und Dienstleistungen.'
      : 'General Terms and Conditions (AGB) of MEGAFORCE GmbH (MegaRobotics) for the sale of products and provision of services. German text is authoritative.'
  return {
    ...pageSeo({ title: `${AGB_TITLE} | MegaRobotics`, description, path: '/agb' }),
    robots: { index: true, follow: true },
  }
}

export const revalidate = 86400

export default async function AgbPage({ params }: Props) {
  const { locale } = await params
  const isDe = locale === 'de'

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="ind-section-dark relative overflow-hidden">
        <div className="absolute inset-0 ind-grid-bg pointer-events-none" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-32 md:pt-36 pb-12 md:pb-16">
          <div className="ind-eyebrow ind-eyebrow-light mb-6">
            <span className="inline-block w-8 h-px bg-blue-400" aria-hidden="true" />
            {isDe ? 'Rechtliches' : 'Legal'}
          </div>
          <h1 className="ind-h1 text-white mb-4">{AGB_TITLE}</h1>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed">
            {AGB_SUBTITLE}
          </p>
          <p className="mt-4 text-sm text-gray-400">Stand: {AGB_VERSION}</p>
        </div>
      </section>

      {/* English/cross-locale notice */}
      <section className="ind-section-light py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {!isDe && (
            <div className="ind-rule-blue py-3 pr-4 mb-4 text-sm leading-relaxed text-gray-700">
              <strong className="block font-semibold text-gray-900 mb-1">
                German version is authoritative
              </strong>
              These General Terms and Conditions (AGB) are provided in German.
              In accordance with Section 12.3 of the document, the German
              version governs in case of any doubt or contradiction with a
              translated version.
            </div>
          )}
        </div>
      </section>

      {/* AGB body */}
      <section className="ind-section-light pb-20">
        <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          {AGB_SECTIONS.map((section) => (
            <section key={section.n} className="scroll-mt-24" id={`abschnitt-${section.n}`}>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight mb-4">
                <span className="text-blue-700 font-mono mr-2">{section.n}.</span>
                {section.title}
              </h2>
              <ol className="space-y-3">
                {section.items.map((item) => (
                  <li
                    key={item.n}
                    className="flex gap-4 items-start text-sm md:text-base text-gray-700 leading-relaxed"
                  >
                    <span className="font-mono text-xs text-gray-500 pt-0.5 flex-shrink-0 w-12 tabular-nums">
                      {item.n}
                    </span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ol>
            </section>
          ))}

          <footer className="pt-10 border-t border-[color:var(--ind-steel-200)] text-xs text-gray-500">
            MEGAFORCE GmbH · Wacholderweg 8 · 41564 Kaarst · Deutschland · Marke „MegaRobotics“
          </footer>
        </article>
      </section>
    </div>
  )
}
