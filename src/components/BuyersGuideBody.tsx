// /src/components/BuyersGuideBody.tsx
'use client'

import Image from 'next/image'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import { urlFor } from '@/lib/sanity'
import { SanityImage } from '@/types'

interface RichImageValue {
  _type: 'richImage'
  image?: SanityImage
  alt: string
  caption?: string
  credit: string
  sourceUrl: string
  licenseUrl: string
}

const buyersGuideComponents: PortableTextComponents = {
  types: {
    richImage: ({ value }: { value: RichImageValue }) => {
      if (!value?.image?.asset) return null

      return (
        <figure className="my-10">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 shadow-lg">
            <Image
              src={urlFor(value.image as SanityImage).width(1600).height(900).url()}
              alt={value.alt}
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
          <figcaption className="mt-3 text-sm text-gray-500 space-y-1">
            {value.caption && (
              <p className="text-center font-medium text-gray-700">{value.caption}</p>
            )}
            <p className="text-center text-xs">
              <span>Credit: {value.credit}</span>
              {' | '}
              <a
                href={value.sourceUrl}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 underline"
              >
                Source
              </a>
              {' | '}
              <a
                href={value.licenseUrl}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 underline"
              >
                License
              </a>
            </p>
          </figcaption>
        </figure>
      )
    },
    // Fallback for regular images
    image: ({ value }) => {
      if (!value?.asset?._ref) return null
      return (
        <figure className="my-8">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
            <Image
              src={urlFor(value).width(1600).height(900).url()}
              alt={value.alt || ''}
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-500 mt-3">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-24" id={typeof children === 'string' ? children.toLowerCase().replace(/\s+/g, '-') : undefined}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mt-10 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-gray-700 leading-relaxed mb-4 text-base md:text-lg">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-emerald-500 pl-4 my-6 italic text-gray-600 bg-gray-50 py-3 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-emerald-600 font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 font-medium"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 text-gray-700 mb-6 ml-6 text-base md:text-lg">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 text-gray-700 mb-6 ml-6 text-base md:text-lg">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },
}

interface BuyersGuideBodyProps {
  body: PortableTextBlock[]
}

export default function BuyersGuideBody({ body }: BuyersGuideBodyProps) {
  return (
    <div className="prose-guide max-w-none">
      <PortableText value={body} components={buyersGuideComponents} />
    </div>
  )
}
