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
      className="p-3 rounded-lg bg-gray-100 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
      title="Copy link"
    >
      {copied ? (
        <Check className="w-5 h-5 text-emerald-600" />
      ) : (
        <Link2 className="w-5 h-5 text-gray-600" />
      )}
    </button>
  )
}
