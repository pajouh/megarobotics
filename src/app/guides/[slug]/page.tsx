// /src/app/guides/[slug]/page.tsx
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { Clock, Calendar, RefreshCw, ArrowLeft, User } from 'lucide-react'
import { getBuyersGuide, getAllBuyersGuideSlugs, urlFor } from '@/lib/sanity'
import BuyersGuideBody from '@/components/BuyersGuideBody'
import StructuredData from '@/components/StructuredData'
import Breadcrumbs from '@/components/Breadcrumbs'
import { generateArticleSchema } from '@/lib/structured-data'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = await getBuyersGuide(slug)

  if (!guide) {
    return {
      title: 'Guide Not Found',
    }
  }

  const metaTitle = guide.seo?.metaTitle || guide.title
  const metaDescription = guide.seo?.metaDescription || guide.shortDescription

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: guide.news?.tags || [],
    authors: [{ name: guide.author || 'MegaRobotics Editorial' }],
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'article',
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
      authors: [guide.author || 'MegaRobotics Editorial'],
      images: guide.mainImage?.image
        ? [
            {
              url: urlFor(guide.mainImage.image).width(1200).height(630).url(),
              width: 1200,
              height: 630,
              alt: guide.mainImage.alt || guide.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: guide.mainImage?.image
        ? [urlFor(guide.mainImage.image).width(1200).height(630).url()]
        : undefined,
    },
    alternates: {
      canonical: guide.news?.canonicalUrl || `https://megarobotics.de/guides/${slug}`,
    },
  }
}

export async function generateStaticParams() {
  const slugs = await getAllBuyersGuideSlugs()
  return slugs
}

export const revalidate = 3600 // Revalidate every hour

export default async function BuyersGuidePage({ params }: Props) {
  const { slug } = await params
  const guide = await getBuyersGuide(slug)

  if (!guide) {
    notFound()
  }

  // Generate structured data
  const articleSchema = generateArticleSchema({
    title: guide.title,
    excerpt: guide.shortDescription || '',
    slug: `guides/${slug}`,
    publishedAt: guide.publishedAt || new Date().toISOString(),
    updatedAt: guide.updatedAt,
    author: {
      name: guide.author || 'MegaRobotics Editorial',
    },
    mainImage: guide.mainImage?.image
      ? urlFor(guide.mainImage.image).width(1200).height(630).url()
      : undefined,
    category: guide.news?.primaryTopic || 'Buyers Guide',
  })

  const breadcrumbItems = [
    { name: 'Guides', href: '/guides' },
    { name: guide.title, href: `/guides/${slug}` },
  ]

  return (
    <article className="min-h-screen pt-24 pb-16 bg-white">
      <StructuredData data={articleSchema} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        {/* Back Link */}
        <Link
          href="/guides"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          All Guides
        </Link>

        {/* Header */}
        <header className="mb-10">
          {/* Tags */}
          {guide.news?.tags && guide.news.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {guide.news.tags.slice(0, 3).map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {guide.title}
          </h1>

          {/* Short Description */}
          <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
            {guide.shortDescription}
          </p>

          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 pb-6 border-b border-gray-200 text-sm">
            {/* Author */}
            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-4 h-4" />
              <span>{guide.author || 'MegaRobotics Editorial'}</span>
            </div>

            {/* Published Date */}
            {guide.publishedAt && (
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Published {format(new Date(guide.publishedAt), 'MMM d, yyyy')}</span>
              </div>
            )}

            {/* Updated Date */}
            {guide.updatedAt && (
              <div className="flex items-center gap-2 text-emerald-600 font-medium">
                <RefreshCw className="w-4 h-4" />
                <span>Updated {format(new Date(guide.updatedAt), 'MMM d, yyyy')}</span>
              </div>
            )}

            {/* Read Time */}
            {guide.readTime && (
              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{guide.readTime} min read</span>
              </div>
            )}
          </div>
        </header>

        {/* Main Image */}
        {guide.mainImage?.image && (
          <figure className="mb-12">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
              <Image
                src={urlFor(guide.mainImage.image).width(1600).height(900).url()}
                alt={guide.mainImage.alt || guide.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
            {(guide.mainImage.caption || guide.mainImage.credit) && (
              <figcaption className="mt-3 text-sm text-gray-500 text-center">
                {guide.mainImage.caption && (
                  <span className="block font-medium text-gray-700">{guide.mainImage.caption}</span>
                )}
                {guide.mainImage.credit && (
                  <span className="text-xs">
                    Credit: {guide.mainImage.credit}
                    {guide.mainImage.sourceUrl && (
                      <>
                        {' | '}
                        <a
                          href={guide.mainImage.sourceUrl}
                          target="_blank"
                          rel="nofollow noopener noreferrer"
                          className="text-emerald-600 hover:underline"
                        >
                          Source
                        </a>
                      </>
                    )}
                  </span>
                )}
              </figcaption>
            )}
          </figure>
        )}

        {/* Content */}
        {guide.body && <BuyersGuideBody body={guide.body} />}

        {/* Footer Note */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-sm text-gray-600">
              <strong className="text-gray-900">About this guide:</strong> This buyers&apos; guide is maintained by the MegaRobotics editorial team.
              Information is based on publicly available specifications and verified commercial availability.
              {guide.updatedAt && (
                <span className="block mt-2 text-emerald-600 font-medium">
                  Last verified: {format(new Date(guide.updatedAt), 'MMMM d, yyyy')}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
