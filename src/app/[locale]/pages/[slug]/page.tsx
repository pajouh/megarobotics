import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPage, getAllPageSlugs, type Locale } from '@/lib/sanity'
import PageBody from '@/components/PageBody'
import { generateAlternates } from '@/lib/structured-data'

type Props = {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPageSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const page = await getPage(slug, locale as Locale)

  if (!page) {
    return { title: 'Page Not Found' }
  }

  const title = page.seo?.metaTitle || page.title
  const description = page.seo?.metaDescription || page.subtitle

  return {
    title,
    description,
    alternates: generateAlternates(`/pages/${slug}`),
    openGraph: {
      title,
      description,
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${page.title} - MegaRobotics` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  }
}

export const revalidate = 3600

export default async function DynamicPage({ params }: Props) {
  const { slug, locale } = await params
  const page = await getPage(slug, locale as Locale)

  if (!page) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {page.title}
          </h1>
          {page.subtitle && (
            <p className="text-lg text-gray-600">{page.subtitle}</p>
          )}
          {page.lastUpdated && (
            <p className="text-sm text-gray-400 mt-4">
              Last updated: {new Date(page.lastUpdated).toLocaleDateString()}
            </p>
          )}
        </header>

        {/* Body Content */}
        {page.body && (
          <div className="prose prose-gray max-w-none">
            <PageBody body={page.body} />
          </div>
        )}
      </div>
    </div>
  )
}
