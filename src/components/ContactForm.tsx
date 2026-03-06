'use client'

import { useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { Send, CheckCircle, AlertCircle, Loader2, Paperclip, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPTED_TYPES = '.pdf,.doc,.docx,.png,.jpg,.jpeg,.zip'

export default function ContactForm() {
  const searchParams = useSearchParams()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState(searchParams.get('subject') || '')
  const [message, setMessage] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const t = useTranslations('contact')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (!selected) return

    if (selected.size > MAX_FILE_SIZE) {
      setStatus('error')
      setStatusMessage(t('fileTooLarge'))
      e.target.value = ''
      return
    }

    setFile(selected)
    if (status === 'error') setStatus('idle')
  }

  const removeFile = () => {
    setFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error')
      setStatusMessage(t('validationError'))
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setStatus('error')
      setStatusMessage(t('invalidEmail'))
      return
    }

    setStatus('loading')

    try {
      const formData = new FormData()
      formData.append('name', name.trim())
      formData.append('email', email.trim())
      formData.append('subject', subject.trim())
      formData.append('message', message.trim())
      if (file) formData.append('file', file)

      const res = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setStatusMessage(data.message || t('success'))
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
        removeFile()
      } else {
        setStatus('error')
        setStatusMessage(data.message || t('error'))
      }
    } catch {
      setStatus('error')
      setStatusMessage(t('networkError'))
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:border-gray-400 focus:ring-gray-200 transition-all'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1.5">
            {t('name')} *
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              if (status !== 'idle' && status !== 'loading') setStatus('idle')
            }}
            placeholder={t('namePlaceholder')}
            className={inputClass}
            disabled={status === 'loading'}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1.5">
            {t('email')} *
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (status !== 'idle' && status !== 'loading') setStatus('idle')
            }}
            placeholder={t('emailPlaceholder')}
            className={inputClass}
            disabled={status === 'loading'}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-1.5">
          {t('subject')}
        </label>
        <input
          id="contact-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder={t('subjectPlaceholder')}
          className={inputClass}
          disabled={status === 'loading'}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1.5">
          {t('message')} *
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
            if (status !== 'idle' && status !== 'loading') setStatus('idle')
          }}
          placeholder={t('messagePlaceholder')}
          rows={5}
          className={`${inputClass} resize-vertical`}
          disabled={status === 'loading'}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {t('attachment')}
        </label>
        <div className="flex items-center gap-3">
          <label
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer ${
              status === 'loading' ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            <Paperclip className="w-4 h-4" />
            {file ? file.name : t('attachmentHint')}
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_TYPES}
              onChange={handleFileChange}
              className="hidden"
              disabled={status === 'loading'}
            />
          </label>
          {file && (
            <button
              type="button"
              onClick={removeFile}
              className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-rose-500 transition-colors"
            >
              <X className="w-4 h-4" />
              {t('removeFile')}
            </button>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-medium transition-all flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {t('sending')}
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            {t('send')}
          </>
        )}
      </button>

      {status === 'success' && (
        <div className="flex items-center gap-2 text-sm text-emerald-600">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          {statusMessage}
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-2 text-sm text-rose-600">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {statusMessage}
        </div>
      )}
    </form>
  )
}
