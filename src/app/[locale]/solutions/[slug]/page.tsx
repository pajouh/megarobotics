import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { ArrowLeft } from 'lucide-react'
import HeroIndustrial from '@/components/industrial/HeroIndustrial'
import SolutionBody from '@/components/industrial/SolutionBody'
import CTASection from '@/components/industrial/CTASection'
import Breadcrumbs from '@/components/Breadcrumbs'
import { pageSeo } from '@/lib/page-seo'
import { solutionImages } from '@/lib/industrial-images'
import { getSolution, getAllSolutionSlugs, type Locale } from '@/lib/sanity'

type Props = { params: Promise<{ locale: string; slug: string }> }

export const revalidate = 3600

export async function generateStaticParams() {
  const slugs = await getAllSolutionSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const solution = await getSolution(slug, locale as Locale)
  if (!solution) return { title: 'Solution not found' }

  const title = solution.seo?.metaTitle || `${solution.title} | MegaRobotics`
  const description = solution.seo?.metaDescription || solution.excerpt || ''
  return pageSeo({ title, description, path: `/solutions/${slug}`, locale })
}

export default async function SolutionDetailPage({ params }: Props) {
  const { locale, slug } = await params
  const solution = await getSolution(slug, locale as Locale)
  if (!solution) notFound()

  const t = await getTranslations('industrial.solutions')
  const tCta = await getTranslations('industrial.home.finalCta')

  const image = solution.imageUrl
    ? { src: solution.imageUrl, alt: solution.title }
    : solutionImages[solution.id]
  const hasBody = Array.isArray(solution.body) && solution.body.length > 0

  return (
    <div className="min-h-screen">
      <HeroIndustrial
        eyebrow={t('eyebrow')}
        title={solution.title}
        subtitle={solution.excerpt ?? ''}
      />

      <section className="py-12 md:py-16 ind-section-light">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            className="mb-8"
            items={[
              { name: t('title'), href: '/solutions' },
              { name: solution.title, href: `/solutions/${slug}` },
            ]}
          />

          {image && (
            <div className="relative w-full aspect-[16/9] mb-10 border border-[color:var(--mr-line)] bg-[color:var(--mr-paper-2)]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 64rem, 100vw"
                className="object-cover"
                priority
              />
            </div>
          )}

          {hasBody && (
            <div className="max-w-3xl mb-12">
              <SolutionBody body={solution.body!} />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solution.applications.length > 0 && (
              <div className="pt-4 border-t border-[color:var(--mr-line)]">
                <div className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[color:var(--mr-steel)] mb-3">
                  {t('labelApplications')}
                </div>
                <ul className="space-y-1.5 text-sm text-[color:var(--mr-ink-2)]">
                  {solution.applications.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            )}

            {solution.robotTypes.length > 0 && (
              <div className="pt-4 border-t border-[color:var(--mr-line)]">
                <div className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[color:var(--mr-steel)] mb-3">
                  {t('labelRobotTypes')}
                </div>
                <ul className="space-y-1.5 text-sm text-[color:var(--mr-accent-ink)]">
                  {solution.robotTypes.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {solution.industries.length > 0 && (
            <div className="mt-10 pt-4 border-t border-[color:var(--mr-line)]">
              <div className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[color:var(--mr-steel)] mb-3">
                {t('detail.industriesLabel')}
              </div>
              <div className="flex flex-wrap gap-2">
                {solution.industries.map((ind) => (
                  <span
                    key={ind.slug}
                    className="inline-flex items-center px-3 py-1 text-xs font-medium border border-[color:var(--mr-line)] bg-[color:var(--mr-paper-2)] text-[color:var(--mr-ink-2)]"
                  >
                    {ind.title}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.1em] font-medium text-[color:var(--mr-accent-ink)] hover:text-[color:var(--mr-ink)] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {t('detail.backToSolutions')}
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow={tCta('eyebrow')}
        title={tCta('title')}
        body={tCta('body')}
        ctaLabel={tCta('button')}
        ctaHref="/contact"
        tone="dark"
      />
    </div>
  )
}
