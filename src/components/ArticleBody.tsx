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
        className="w-full border border-[color:var(--mr-line)]"
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
          <div className="relative aspect-video overflow-hidden bg-[color:var(--mr-paper-2)] border border-[color:var(--mr-line)]">
            <Image
              src={urlFor(value).width(1200).height(675).url()}
              alt={value.alt || ''}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center font-mono text-xs text-[color:var(--mr-steel)] mt-3">
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

      // CSS fixes for iframe context - position:fixed doesn't work well in iframes
      const iframeFixStyles = `
        <style>
          /* Convert fixed positioning to absolute for iframe context */
          .bg-grid, .bg-gradient {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            pointer-events: none !important;
          }
          /* Ensure main content is visible above backgrounds */
          section, main, article, .container, .content {
            position: relative !important;
            z-index: 1 !important;
          }
          /* Hero section - fix vertical centering issues in iframe context */
          .hero, [class*="hero"] {
            min-height: auto !important;
            height: auto !important;
            justify-content: flex-start !important;
            padding-top: 40px !important;
            padding-bottom: 40px !important;
          }
        </style>
      `

      // Script to auto-resize iframe to content height
      const resizeScript = `
        <script>
          (function() {
            function sendHeight() {
              // Fix any fixed positioned elements
              document.querySelectorAll('*').forEach(function(el) {
                var style = window.getComputedStyle(el);
                if (style.position === 'fixed') {
                  el.style.position = 'absolute';
                }
              });

              var height = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
              );
              // Cap at reasonable max to prevent runaway values
              height = Math.min(height, 50000);
              window.parent.postMessage({ type: 'resize-iframe', height: height }, '*');
            }
            if (document.readyState === 'complete') {
              sendHeight();
            } else {
              window.addEventListener('load', sendHeight);
            }
            window.addEventListener('resize', sendHeight);
            setTimeout(sendHeight, 100);
            setTimeout(sendHeight, 500);
            setTimeout(sendHeight, 1000);
            setTimeout(sendHeight, 2000);
          })();
        </script>
      `

      let finalHtml: string
      const htmlTrimmed = value.html.trim()

      // Check if the HTML is already a complete document
      if (htmlTrimmed.toLowerCase().startsWith('<!doctype') || htmlTrimmed.toLowerCase().startsWith('<html')) {
        // Inject fix styles after opening <head> and resize script before closing </body>
        let modifiedHtml = htmlTrimmed

        // Inject fix styles into head
        if (modifiedHtml.toLowerCase().includes('<head>')) {
          modifiedHtml = modifiedHtml.replace(/<head>/i, '<head>' + iframeFixStyles)
        } else if (modifiedHtml.toLowerCase().includes('<head ')) {
          modifiedHtml = modifiedHtml.replace(/<head[^>]*>/i, '$&' + iframeFixStyles)
        } else {
          // No head tag, add styles at the beginning of body or html
          modifiedHtml = iframeFixStyles + modifiedHtml
        }

        // Inject resize script before closing </body> tag
        if (modifiedHtml.toLowerCase().includes('</body>')) {
          finalHtml = modifiedHtml.replace(/<\/body>/i, resizeScript + '</body>')
        } else {
          // No body tag, append script at the end
          finalHtml = modifiedHtml + resizeScript
        }
      } else {
        // Wrap in a proper HTML document
        finalHtml = `
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
            ${resizeScript}
          </body>
          </html>
        `
      }

      return (
        <HtmlEmbedIframe html={finalHtml} />
      )
    },
    statsGrid: ({ value }) => {
      if (!value?.stats?.length) return null
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px my-8 bg-[color:var(--mr-line)] border border-[color:var(--mr-line)]">
          {value.stats.map((stat: StatItem, index: number) => (
            <div key={index} className="p-6 bg-[color:var(--mr-white)]">
              <span className="block font-mono text-2xl md:text-3xl font-semibold text-[color:var(--mr-ink)] tracking-tight">
                {stat.value}
              </span>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-[color:var(--mr-steel)] mt-2 block">{stat.label}</span>
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
              className="p-6 bg-[color:var(--mr-white)] border border-[color:var(--mr-line)] border-l-2 border-l-[color:var(--mr-accent)]"
            >
              <h4 className="ind-h3 text-[color:var(--mr-ink)] mb-2">
                {feature.icon && <span className="mr-2">{feature.icon}</span>}
                {feature.title}
              </h4>
              <p className="text-[color:var(--mr-ink-2)] text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      )
    },
    highlightBox: ({ value }) => {
      if (!value?.items?.length) return null
      return (
        <div className="my-8 p-6 bg-[color:var(--mr-paper-2)] border border-[color:var(--mr-line)]">
          {value.title && (
            <h4 className="ind-h3 text-[color:var(--mr-ink)] mb-4">{value.title}</h4>
          )}
          <ul className="space-y-3">
            {value.items.map((item: string, index: number) => (
              <li
                key={index}
                className="flex items-start gap-3 text-[color:var(--mr-ink-2)] border-b border-[color:var(--mr-line)] pb-3 last:border-0"
              >
                <span className="text-[color:var(--mr-accent-ink)] font-bold">✓</span>
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
        <div className="my-8 p-8 bg-[color:var(--mr-dark)] text-[color:var(--mr-ink-on-dark)] relative">
          <span className="absolute top-2 left-4 text-6xl text-[color:var(--mr-accent)] font-serif">
            &ldquo;
          </span>
          <p className="text-lg italic mb-4 pl-8">{value.quote}</p>
          {value.author && (
            <p className="font-mono text-xs text-[color:var(--mr-steel-on-dark)] pl-8">— {value.author}</p>
          )}
        </div>
      )
    },
    infoTable: ({ value }) => {
      if (!value?.headers?.length || !value?.rows?.length) return null
      return (
        <div className="my-8 overflow-x-auto border border-[color:var(--mr-line)]">
          <table className="w-full text-sm">
            <thead className="bg-[color:var(--mr-ink)] text-[color:var(--mr-paper)]">
              <tr>
                {value.headers.map((header: string, index: number) => (
                  <th key={index} className="px-4 py-3 text-left font-mono text-[0.7rem] uppercase tracking-[0.1em] font-medium">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {value.rows.map((row: TableRow, rowIndex: number) => (
                <tr
                  key={rowIndex}
                  className={`border-b border-[color:var(--mr-line)] ${
                    rowIndex % 2 === 0 ? 'bg-[color:var(--mr-white)]' : 'bg-[color:var(--mr-paper-2)]'
                  } transition-colors`}
                >
                  {row.cells?.map((cell: string, cellIndex: number) => (
                    <td key={cellIndex} className="px-4 py-3 text-sm text-[color:var(--mr-ink-2)]">
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
        <div className="my-10 p-8 bg-[color:var(--mr-dark)] text-white text-center border-l-2 border-[color:var(--mr-accent)]">
          <h3 className="ind-h2 text-white mb-4">{value.title}</h3>
          {value.description && (
            <p className="text-[color:var(--mr-steel-on-dark)] mb-6 max-w-xl mx-auto">
              {value.description}
            </p>
          )}
          {value.buttonText && value.buttonUrl && (
            <a
              href={value.buttonUrl}
              className="inline-block px-6 py-3 bg-[color:var(--mr-accent)] text-[color:var(--mr-dark)] font-semibold hover:bg-white transition-colors"
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
      <h2 className="ind-h2 text-[color:var(--mr-ink)] mt-12 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="ind-h3 !text-xl md:!text-2xl text-[color:var(--mr-ink)] mt-8 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="ind-h3 text-[color:var(--mr-ink)] mt-6 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-[color:var(--mr-ink-2)] leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-[color:var(--mr-accent)] pl-4 my-6 italic text-[color:var(--mr-ink-2)]">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[color:var(--mr-ink)]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-[color:var(--mr-paper-2)] px-1.5 py-0.5 text-[color:var(--mr-accent-ink)] font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-[color:var(--mr-accent-ink)] hover:text-[color:var(--mr-accent)] underline underline-offset-2"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 text-[color:var(--mr-ink-2)] mb-4 ml-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 text-[color:var(--mr-ink-2)] mb-4 ml-4">
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
