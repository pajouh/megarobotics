'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import { urlFor } from '@/lib/sanity'

// Component to render HTML embeds in an isolated iframe
function HtmlEmbedIframe({ html }: { html: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(600) // Default height

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'resize-iframe' && typeof event.data.height === 'number') {
        setHeight(event.data.height)
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <div className="my-6 w-full">
      <iframe
        ref={iframeRef}
        srcDoc={html}
        className="w-full border-0 rounded-xl"
        style={{ height: `${height}px`, minHeight: '400px' }}
        sandbox="allow-scripts allow-same-origin"
        title="Embedded content"
      />
    </div>
  )
}

interface StatItem {
  value: string
  label: string
}

interface FeatureItem {
  icon?: string
  title: string
  description: string
}

interface TableRow {
  cells: string[]
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null
      return (
        <figure className="my-8">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
            <Image
              src={urlFor(value).width(1200).height(675).url()}
              alt={value.alt || ''}
              fill
              className="object-cover"
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
    code: ({ value }) => (
      <div className="my-6">
        {value.filename && (
          <div className="bg-gray-800 text-gray-400 text-xs px-4 py-2 rounded-t-lg font-mono">
            {value.filename}
          </div>
        )}
        <pre className={`bg-gray-900 p-4 overflow-x-auto ${value.filename ? 'rounded-b-lg' : 'rounded-lg'}`}>
          <code className="text-sm text-gray-300 font-mono">
            {value.code}
          </code>
        </pre>
      </div>
    ),
    htmlEmbed: ({ value }) => {
      if (!value?.html) return null
      // Use iframe with srcdoc for full style isolation
      const fullHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { box-sizing: border-box; }
            body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
          </style>
        </head>
        <body>
          ${value.html}
          <script>
            // Auto-resize iframe to content height
            function sendHeight() {
              const height = document.documentElement.scrollHeight;
              window.parent.postMessage({ type: 'resize-iframe', height: height }, '*');
            }
            // Send height on load and resize
            window.addEventListener('load', sendHeight);
            window.addEventListener('resize', sendHeight);
            // Also send after a short delay for dynamic content
            setTimeout(sendHeight, 100);
            setTimeout(sendHeight, 500);
            setTimeout(sendHeight, 1000);
          </script>
        </body>
        </html>
      `
      return (
        <HtmlEmbedIframe html={fullHtml} />
      )
    },
    statsGrid: ({ value }) => {
      if (!value?.stats?.length) return null
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {value.stats.map((stat: StatItem, index: number) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
              <span className="block text-2xl md:text-3xl font-bold text-emerald-600">
                {stat.value}
              </span>
              <span className="text-sm text-gray-600 mt-2 block">{stat.label}</span>
            </div>
          ))}
        </div>
      )
    },
    featureGrid: ({ value }) => {
      if (!value?.features?.length) return null
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          {value.features.map((feature: FeatureItem, index: number) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-xl border-l-4 border-emerald-500"
            >
              <h4 className="font-semibold text-gray-900 mb-2">
                {feature.icon && <span className="mr-2">{feature.icon}</span>}
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      )
    },
    highlightBox: ({ value }) => {
      if (!value?.items?.length) return null
      return (
        <div className="my-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
          {value.title && (
            <h4 className="font-bold text-gray-900 mb-4 text-lg">{value.title}</h4>
          )}
          <ul className="space-y-3">
            {value.items.map((item: string, index: number) => (
              <li
                key={index}
                className="flex items-start gap-3 text-gray-700 border-b border-gray-200 pb-3 last:border-0"
              >
                <span className="text-emerald-500 font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    quoteBox: ({ value }) => {
      if (!value?.quote) return null
      return (
        <div className="my-8 p-8 bg-gray-900 text-white rounded-xl relative">
          <span className="absolute top-2 left-4 text-6xl text-gray-700 font-serif">
            &ldquo;
          </span>
          <p className="text-lg italic mb-4 pl-8">{value.quote}</p>
          {value.author && (
            <p className="text-gray-400 text-sm pl-8">— {value.author}</p>
          )}
        </div>
      )
    },
    infoTable: ({ value }) => {
      if (!value?.headers?.length || !value?.rows?.length) return null
      return (
        <div className="my-8 overflow-x-auto rounded-xl shadow-lg">
          <table className="w-full text-sm">
            <thead className="bg-gray-900 text-white">
              <tr>
                {value.headers.map((header: string, index: number) => (
                  <th key={index} className="px-4 py-3 text-left font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {value.rows.map((row: TableRow, rowIndex: number) => (
                <tr
                  key={rowIndex}
                  className={`border-b border-gray-200 ${
                    rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-blue-50 transition-colors`}
                >
                  {row.cells?.map((cell: string, cellIndex: number) => (
                    <td key={cellIndex} className="px-4 py-3 text-gray-700">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    },
    ctaBox: ({ value }) => {
      if (!value?.title) return null
      return (
        <div className="my-10 p-8 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl text-center">
          <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
          {value.description && (
            <p className="text-emerald-50 mb-6 max-w-xl mx-auto">
              {value.description}
            </p>
          )}
          {value.buttonText && value.buttonUrl && (
            <a
              href={value.buttonUrl}
              className="inline-block px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              {value.buttonText}
            </a>
          )}
        </div>
      )
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mt-8 mb-3">
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
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-emerald-500 pl-4 my-6 italic text-gray-500">
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

interface ArticleBodyProps {
  body: PortableTextBlock[]
}

export default function ArticleBody({ body }: ArticleBodyProps) {
  return (
    <div className="prose-light max-w-none">
      <PortableText value={body} components={portableTextComponents} />
    </div>
  )
}
