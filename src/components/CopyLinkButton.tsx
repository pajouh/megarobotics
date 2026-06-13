'use client'

import { useState } from 'react'
import { Link2, Check } from 'lucide-react'

interface CopyLinkButtonProps {
  url: string
}

export default function CopyLinkButton({ url }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="p-3 bg-[color:var(--mr-white)] border border-[color:var(--mr-line)] hover:border-[color:var(--mr-line-strong)] transition-colors"
      title="Copy link"
    >
      {copied ? (
        <Check className="w-5 h-5 text-[color:var(--mr-accent-ink)]" />
      ) : (
        <Link2 className="w-5 h-5 text-[color:var(--mr-ink-2)]" />
      )}
    </button>
  )
}
