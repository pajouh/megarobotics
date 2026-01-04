'use client'

import { useState } from 'react'
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage(data.message || 'Thanks for subscribing!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (status !== 'idle') setStatus('idle')
            }}
            placeholder="Enter your email"
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
            disabled={status === 'loading'}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 min-w-[140px] glow-emerald hover:glow-emerald"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Subscribing...
            </>
          ) : (
            'Subscribe'
          )}
        </button>
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="mt-3 flex items-center gap-2 text-sm text-emerald-400">
          <CheckCircle className="w-4 h-4" />
          {message}
        </div>
      )}
      {status === 'error' && (
        <div className="mt-3 flex items-center gap-2 text-sm text-rose-400">
          <AlertCircle className="w-4 h-4" />
          {message}
        </div>
      )}
    </form>
  )
}
