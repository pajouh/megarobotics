import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import SectionHeader from '@/components/industrial/SectionHeader'
import CTASection from '@/components/industrial/CTASection'
import VideoLibrary from '@/components/VideoLibrary'
import { oliVideos } from '@/data/oli-videos'
import { pageSeo } from '@/lib/page-seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'industrial.downloads.meta' })
  return pageSeo({ title: t('title'), description: t('description'), path: '/downloads', locale })
}

// Static content: the video list is a typed module, not a CMS query.
export const revalidate = 86400

export default async function DownloadsPage({ params }: Props) {
  await params
  const t = await getTranslations('industrial.downloads')

  return (
    <>
      <section className="border-b border-[color:var(--mr-line)] bg-[color:var(--mr-paper-2)]">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('lede')} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <VideoLibrary videos={oliVideos} products={['oli']} />

        {/* Attribution is not decoration: these are LimX's films, served from
            LimX's CDN, and the page should say so plainly. */}
        <p className="mt-16 border-t border-[color:var(--mr-line)] pt-6 text-sm leading-relaxed text-[color:var(--mr-steel)]">
          {t('attribution')}
        </p>
      </section>

      <CTASection
        title={t('cta.title')}
        body={t('cta.body')}
        ctaLabel={t('cta.primary')}
        ctaHref="/contact"
      />
    </>
  )
}
