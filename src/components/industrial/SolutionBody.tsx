'use client'

import { PortableText, PortableTextComponents } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'

const solutionComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="ind-h3 text-[color:var(--mr-ink)] mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-semibold text-[color:var(--mr-ink)] mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base font-semibold text-[color:var(--mr-ink)] mt-6 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-[color:var(--mr-ink-2)] leading-relaxed mb-4">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[color:var(--mr-ink)]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-[color:var(--mr-accent-ink)] underline underline-offset-2 hover:text-[color:var(--mr-ink)] transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 text-[color:var(--mr-ink-2)] mb-4 ml-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 text-[color:var(--mr-ink-2)] mb-4 ml-2">
        {children}
      </ol>
    ),
  },
}

interface SolutionBodyProps {
  body: PortableTextBlock[]
}

export default function SolutionBody({ body }: SolutionBodyProps) {
  return <PortableText value={body} components={solutionComponents} />
}
