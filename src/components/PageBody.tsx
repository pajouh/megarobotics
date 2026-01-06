'use client'

import { PortableText, PortableTextComponents } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'

const pageComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-gray-600 leading-relaxed mb-4">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4 ml-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-4 ml-4">
        {children}
      </ol>
    ),
  },
}

interface PageBodyProps {
  body: PortableTextBlock[]
}

export default function PageBody({ body }: PageBodyProps) {
  return (
    <div className="prose-page max-w-none">
      <PortableText value={body} components={pageComponents} />
    </div>
  )
}
