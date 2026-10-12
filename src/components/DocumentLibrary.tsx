'use client'

import { useMemo, useState } from 'react'
import { Download, ExternalLink, FileText } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { formatSize } from '@/data/limx-videos'
import type { ProductKey } from '@/data/limx-videos'
import type { ProductDocument } from '@/data/limx-documents'

interface DocumentLibraryProps {
  documents: ProductDocument[]
  products: ProductKey[]
}

/**
 * Documents are grouped by product rather than by kind: someone arrives here
 * holding one robot, not looking for "all the quick start guides".
 */
export default function DocumentLibrary({ documents, products }: DocumentLibraryProps) {
  const t = useTranslations('industrial.downloads')
  const locale = useLocale()
  const lang = locale === 'de' ? 'de' : 'en'

  const [product, setProduct] = useState<ProductKey | 'all'>('all')

  const byProduct = useMemo(() => {
    const groups = new Map<ProductKey, ProductDocument[]>()
    for (const key of products) {
      if (product !== 'all' && product !== key) continue
      const items = documents.filter((doc) => doc.product === key)
      if (items.length > 0) groups.set(key, items)
    }
    return groups
  }, [documents, products, product])

  const dateFormatter = new Intl.DateTimeFormat(lang === 'de' ? 'de-DE' : 'en-GB', {
    year: 'numeric',
    month: 'short',
  })

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2 border-b border-[color:var(--mr-line)] pb-5">
        {(['all', ...products] as (ProductKey | 'all')[]).map((key) => {
          const active = product === key
          return (
            <button
              key={key}
              type="button"
              onClick={() => setProduct(key)}
              aria-pressed={active}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? 'bg-[color:var(--mr-accent-ink)] text-white'
                  : 'bg-[color:var(--mr-paper-2)] text-[color:var(--mr-steel)] hover:text-[color:var(--mr-ink)]'
              }`}
            >
              {key === 'all' ? t('filterAll') : t(`products.${key}`)}
            </button>
          )
        })}
      </div>

      {[...byProduct.entries()].map(([key, items]) => (
        <section key={key} className="mb-14 last:mb-0">
          <div className="mb-5 flex items-baseline justify-between gap-4">
            <h3 className="ind-h3 text-[color:var(--mr-ink)]">{t(`products.${key}`)}</h3>
            <span className="font-mono text-xs uppercase tracking-wider text-[color:var(--mr-steel)]">
              {t('docCount', { count: items.length })}
            </span>
          </div>

          <ul className="border-t border-[color:var(--mr-line)]">
            {items.map((doc) => (
              <li
                key={doc.id}
                className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-[color:var(--mr-line)] py-4"
              >
                <FileText
                  className="h-5 w-5 shrink-0 text-[color:var(--mr-steel)]"
                  aria-hidden="true"
                />

                <div className="min-w-[14rem] flex-1">
                  <p className="text-[0.95rem] font-medium leading-snug text-[color:var(--mr-ink)]">
                    {doc.title[lang]}
                  </p>
                  <p className="mt-0.5 font-mono text-xs uppercase tracking-wider text-[color:var(--mr-steel)]">
                    {t(`kinds.${doc.kind}`)}
                    {doc.version ? ` · ${doc.version}` : ''}
                    {doc.date ? (
                      <>
                        {' · '}
                        <time dateTime={doc.date}>
                          {dateFormatter.format(new Date(doc.date))}
                        </time>
                      </>
                    ) : null}
                  </p>
                </div>

                <span className="font-mono text-xs uppercase tracking-wider text-[color:var(--mr-steel)]">
                  {doc.format}
                  {doc.sizeBytes > 0 ? ` · ${formatSize(doc.sizeBytes)}` : ''}
                </span>

                {/* A web-only entry is a page on the manufacturer's site, not a
                    file, so it opens in a new tab and says "View" rather than
                    promising a download that will not happen. */}
                {doc.webOnly ? (
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--mr-accent-ink)] underline-offset-4 hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    {t('view')}
                  </a>
                ) : (
                  <a
                    href={doc.url}
                    download
                    className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--mr-accent-ink)] underline-offset-4 hover:underline"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    {t('download')}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
