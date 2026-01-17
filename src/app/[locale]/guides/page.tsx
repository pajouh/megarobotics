// /src/app/guides/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { BookOpen, Clock, RefreshCw } from 'lucide-react'
import { getBuyersGuides, urlFor } from '@/lib/sanity'

export const metadata: Metadata = {
  title: "Buyers' Guides - Robotics Purchasing Decisions",
  description: 'Practical, evidence-based buyers guides to help you make informed robotics purchasing decisions. From robot dogs to humanoids, industrial to consumer.',
}

export const revalidate = 3600

export default async function GuidesPage() {
  const guides = await getBuyersGuides()

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Buyers&apos; Guides
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Make Informed Decisions
          </h1>
          <p className="text-lg text-gray-600">
            Practical, evidence-based guides to help you navigate the robotics market.
            No hype, just facts and real-world considerations.
          </p>
        </div>

        {/* Guides Grid */}
        {guides && guides.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide: {
              _id: string
              title: string
              slug: { current: string }
              shortDescription: string
              mainImage?: { image?: { asset?: { _ref: string } }; alt?: string }
              updatedAt?: string
              readTime?: number
              news?: { tags?: string[] }
            }) => (
              <Link
                key={guide._id}
                href={`/guides/${guide.slug.current}`}
                className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all"
              >
                {/* Image */}
                {guide.mainImage?.image?.asset && (
                  <div className="relative aspect-video bg-gray-100">
                    <Image
                      src={urlFor(guide.mainImage.image as Parameters<typeof urlFor>[0]).width(600).height(340).url()}
                      alt={guide.mainImage.alt || guide.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Tags */}
                  {guide.news?.tags && guide.news.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {guide.news.tags.slice(0, 2).map((tag: string) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {guide.title}
                  </h2>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {guide.shortDescription}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {guide.updatedAt && (
                      <span className="flex items-center gap-1">
                        <RefreshCw className="w-3 h-3" />
                        {format(new Date(guide.updatedAt), 'MMM yyyy')}
                      </span>
                    )}
                    {guide.readTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {guide.readTime} min
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No guides yet</h2>
            <p className="text-gray-500">
              Check back soon for our robotics buyers&apos; guides.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
