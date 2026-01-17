'use client'

import { useState } from 'react'
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface NewsletterFormProps {
  variant?: 'light' | 'dark'
}

export default function NewsletterForm({ variant = 'light' }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const t = useTranslations('newsletter')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage(t('invalidEmail'))
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
        setMessage(data.message || t('success'))
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.message || t('error'))
      }
    } catch {
      setStatus('error')
      setMessage(t('networkError'))
    }
  }

  const isDark = variant === 'dark'

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (status !== 'idle') setStatus('idle')
            }}
            placeholder={t('placeholder')}
            className={`w-full pl-12 pr-4 py-3 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 ${
              isDark
                ? 'bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:border-emerald-500/50 focus:ring-emerald-500/20'
                : 'bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:ring-gray-200'
            }`}
            disabled={status === 'loading'}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 min-w-[140px] ${
            isDark
              ? 'bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 text-white'
              : 'bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white'
          }`}
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {t('subscribing')}
            </>
          ) : (
            t('subscribe')
          )}
        </button>
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className={`mt-3 flex items-center gap-2 text-sm ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
          <CheckCircle className="w-4 h-4" />
          {message}
        </div>
      )}
      {status === 'error' && (
        <div className={`mt-3 flex items-center gap-2 text-sm ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>
          <AlertCircle className="w-4 h-4" />
          {message}
        </div>
      )}
    </form>
  )
}
