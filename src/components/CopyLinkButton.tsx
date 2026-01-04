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
      className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-emerald-500/30 hover:bg-white/10 transition-all"
      title="Copy link"
    >
      {copied ? (
        <Check className="w-5 h-5 text-emerald-400" />
      ) : (
        <Link2 className="w-5 h-5 text-slate-400" />
      )}
    </button>
  )
}
