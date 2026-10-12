import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import SectionHeader from '@/components/industrial/SectionHeader'
import CTASection from '@/components/industrial/CTASection'
import VideoLibrary from '@/components/VideoLibrary'
import DocumentLibrary from '@/components/DocumentLibrary'
import { limxVideos, PRODUCTS } from '@/data/limx-videos'
import { limxDocuments, documentProducts } from '@/data/limx-documents'
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
        <VideoLibrary videos={limxVideos} products={PRODUCTS} />
      </section>

      {/* Documents sit below the videos: someone who has the robot in front of
          them wants the manual, and someone evaluating it watches first. */}
      <section
        id="documents"
        className="border-t border-[color:var(--mr-line)] bg-[color:var(--mr-paper-2)]"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <SectionHeader
            eyebrow={t('documentsEyebrow')}
            title={t('documentsTitle')}
            subtitle={t('documentsLede')}
          />
          <DocumentLibrary documents={limxDocuments} products={documentProducts()} />
        </div>
      </section>

      {/* Attribution is not decoration: the films and documents on this page
          are LimX's, and the page should say so plainly. */}
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-10 md:px-6">
        <p className="text-sm leading-relaxed text-[color:var(--mr-steel)]">{t('attribution')}</p>
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
