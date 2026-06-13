'use client'

import { useState, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Send, CheckCircle, AlertCircle, Loader2, Paperclip, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPTED_TYPES = '.pdf,.doc,.docx,.png,.jpg,.jpeg,.zip'

export default function ContactForm() {
  return (
    <Suspense fallback={<ContactFormSkeleton />}>
      <ContactFormInner />
    </Suspense>
  )
}

function ContactFormSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="h-12 bg-[color:var(--mr-paper-2)]" />
        <div className="h-12 bg-[color:var(--mr-paper-2)]" />
      </div>
      <div className="h-12 bg-[color:var(--mr-paper-2)]" />
      <div className="h-32 bg-[color:var(--mr-paper-2)]" />
      <div className="h-12 w-48 bg-[color:var(--mr-paper-2)]" />
    </div>
  )
}

function ContactFormInner() {
  const searchParams = useSearchParams()
  // Map ?inquiry= from product detail CTAs to inquiry-type values
  const inquiryParamToValue = (p: string | null): string => {
    if (!p) return ''
    if (p === 'availability') return 'robot_sourcing'
    if (p === 'project') return 'automation_project'
    if (p === 'datasheet') return 'robot_sourcing'
    return ''
  }
  const initialProduct = searchParams.get('product') || ''
  const initialManufacturer = searchParams.get('manufacturer') || ''
  const initialFamily = searchParams.get('family') || ''
  const initialManufacturerOrProduct = [initialManufacturer, initialProduct]
    .filter(Boolean)
    .join(' — ')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const [industry, setIndustry] = useState('')
  const [applicationArea, setApplicationArea] = useState('')
  const [projectStage, setProjectStage] = useState('')
  const [inquiryType, setInquiryType] = useState(inquiryParamToValue(searchParams.get('inquiry')))
  const [productFamily, setProductFamily] = useState(initialFamily)
  const [manufacturerOrProduct, setManufacturerOrProduct] = useState(initialManufacturerOrProduct)
  const [subject, setSubject] = useState(searchParams.get('subject') || initialProduct || '')
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const t = useTranslations('contact')
  const tExtra = useTranslations('industrial.contactExtra')
  const tFamilies = useTranslations('industrial.catalog.families')

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

    if (!consent) {
      setStatus('error')
      setStatusMessage(tExtra('fields.consentRequired'))
      return
    }

    setStatus('loading')

    try {
      const formData = new FormData()
      formData.append('name', name.trim())
      formData.append('email', email.trim())
      formData.append('company', company.trim())
      formData.append('phone', phone.trim())
      formData.append('country', country.trim())
      formData.append('industry', industry.trim())
      formData.append('applicationArea', applicationArea.trim())
      formData.append('projectStage', projectStage.trim())
      formData.append('inquiryType', inquiryType.trim())
      formData.append('productFamily', productFamily.trim())
      formData.append('manufacturerOrProduct', manufacturerOrProduct.trim())
      formData.append('subject', subject.trim())
      formData.append('message', message.trim())
      formData.append('consent', consent ? 'true' : 'false')
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
        setCompany('')
        setPhone('')
        setCountry('')
        setIndustry('')
        setApplicationArea('')
        setProjectStage('')
        setInquiryType('')
        setProductFamily('')
        setManufacturerOrProduct('')
        setSubject('')
        setMessage('')
        setConsent(false)
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
    'w-full px-4 py-3 bg-[color:var(--mr-white)] border border-[color:var(--mr-line-strong)]/30 text-[color:var(--mr-ink)] placeholder:text-[color:var(--mr-steel)] focus:outline-none focus:border-[color:var(--mr-accent-ink)] transition-colors'

  const stageOptions: { value: string; key: string }[] = [
    { value: 'exploring', key: 'exploring' },
    { value: 'feasibility', key: 'feasibility' },
    { value: 'supplier_selection', key: 'supplierSelection' },
    { value: 'pilot', key: 'pilot' },
    { value: 'integration', key: 'integration' },
    { value: 'manufacturer_cooperation', key: 'manufacturerCooperation' },
  ]

  const inquiryTypeOptions: { value: string; key: string }[] = [
    { value: 'robot_sourcing', key: 'robotSourcing' },
    { value: 'component_sourcing', key: 'componentSourcing' },
    { value: 'automation_project', key: 'automationProject' },
    { value: 'system_integration', key: 'systemIntegration' },
    { value: 'manufacturer_cooperation', key: 'manufacturerCooperation' },
    { value: 'research_education', key: 'researchEducation' },
    { value: 'service_cleaning', key: 'serviceCleaning' },
    { value: 'other', key: 'other' },
  ]

  const familyOptionSlugs = [
    'robot-platforms',
    'end-effectors-robot-tooling',
    'motion-actuators-drives',
    'plc-control-industrial-automation',
    'sensors-vision-perception',
    'safety-machine-protection',
    'industrial-communication-connectivity',
    'software-hmi-scada-digital-twin',
    'robotic-cells-application-packages',
    'service-cleaning-facility-robots',
    'research-education-embodied-ai',
    'spare-parts-modules-accessories',
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id="contact-name" label={`${t('name')} *`}>
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
            required
          />
        </Field>
        <Field id="contact-email" label={`${t('email')} *`}>
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
            required
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id="contact-company" label={tExtra('fields.company')}>
          <input
            id="contact-company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder={tExtra('fields.companyPlaceholder')}
            className={inputClass}
            disabled={status === 'loading'}
          />
        </Field>
        <Field id="contact-phone" label={tExtra('fields.phone')}>
          <input
            id="contact-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={tExtra('fields.phonePlaceholder')}
            className={inputClass}
            disabled={status === 'loading'}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id="contact-country" label={tExtra('fields.country')}>
          <input
            id="contact-country"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder={tExtra('fields.countryPlaceholder')}
            className={inputClass}
            disabled={status === 'loading'}
          />
        </Field>
        <Field id="contact-industry" label={tExtra('fields.industry')}>
          <input
            id="contact-industry"
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder={tExtra('fields.industryPlaceholder')}
            className={inputClass}
            disabled={status === 'loading'}
          />
        </Field>
      </div>

      <Field id="contact-inquiry-type" label={tExtra('fields.inquiryType')}>
        <select
          id="contact-inquiry-type"
          value={inquiryType}
          onChange={(e) => setInquiryType(e.target.value)}
          className={inputClass}
          disabled={status === 'loading'}
        >
          <option value="">—</option>
          {inquiryTypeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {tExtra(`fields.inquiryTypeOptions.${opt.key}`)}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id="contact-family" label={tExtra('fields.productFamily')}>
          <select
            id="contact-family"
            value={productFamily}
            onChange={(e) => setProductFamily(e.target.value)}
            className={inputClass}
            disabled={status === 'loading'}
          >
            <option value="">{tExtra('fields.productFamilyNotSure')}</option>
            {familyOptionSlugs.map((slug) => {
              let title = slug
              try { title = tFamilies(`${slug}.title`) } catch {}
              return (
                <option key={slug} value={slug}>
                  {title}
                </option>
              )
            })}
          </select>
        </Field>
        <Field id="contact-mfr-product" label={tExtra('fields.manufacturerOrProduct')}>
          <input
            id="contact-mfr-product"
            type="text"
            value={manufacturerOrProduct}
            onChange={(e) => setManufacturerOrProduct(e.target.value)}
            placeholder={tExtra('fields.manufacturerOrProductPlaceholder')}
            className={inputClass}
            disabled={status === 'loading'}
          />
        </Field>
      </div>

      <Field id="contact-application" label={tExtra('fields.applicationArea')}>
        <input
          id="contact-application"
          type="text"
          value={applicationArea}
          onChange={(e) => setApplicationArea(e.target.value)}
          placeholder={tExtra('fields.applicationAreaPlaceholder')}
          className={inputClass}
          disabled={status === 'loading'}
        />
      </Field>

      <Field id="contact-stage" label={tExtra('fields.projectStage')}>
        <select
          id="contact-stage"
          value={projectStage}
          onChange={(e) => setProjectStage(e.target.value)}
          className={inputClass}
          disabled={status === 'loading'}
        >
          <option value="">—</option>
          {stageOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {tExtra(`fields.projectStageOptions.${opt.key}`)}
            </option>
          ))}
        </select>
      </Field>

      <Field id="contact-message" label={`${t('message')} *`}>
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
          required
        />
      </Field>

      <div>
        <label className="block font-mono text-[0.7rem] uppercase tracking-[0.1em] font-medium text-[color:var(--mr-steel)] mb-1.5">{t('attachment')}</label>
        <div className="flex items-center gap-3">
          <label
            className={`inline-flex items-center gap-2 px-4 py-2.5 border border-[color:var(--mr-line-strong)]/30 bg-[color:var(--mr-white)] text-sm text-[color:var(--mr-ink-2)] hover:border-[color:var(--mr-line-strong)] transition-colors cursor-pointer ${
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
              className="inline-flex items-center gap-1 text-sm text-[color:var(--mr-steel)] hover:text-[color:var(--mr-accent-ink)] transition-colors"
            >
              <X className="w-4 h-4" />
              {t('removeFile')}
            </button>
          )}
        </div>
      </div>

      <label className="flex items-start gap-2.5 cursor-pointer text-sm text-[color:var(--mr-ink-2)]">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked)
            if (status !== 'idle' && status !== 'loading') setStatus('idle')
          }}
          className="mt-1 w-4 h-4 border-[color:var(--mr-line-strong)]/40 text-[color:var(--mr-accent-ink)] focus:ring-[color:var(--mr-accent-ink)]"
          disabled={status === 'loading'}
        />
        <span className="leading-relaxed">{tExtra('fields.consent')}</span>
      </label>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[color:var(--mr-accent)] text-[color:var(--mr-dark)] font-semibold text-[15px] hover:bg-[color:var(--mr-ink)] hover:text-[color:var(--mr-paper)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {t('sending')}
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            {tExtra('sendButton')}
          </>
        )}
      </button>

      {status === 'success' && (
        <div className="flex items-center gap-2 text-sm text-emerald-700">
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

function Field({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-[0.7rem] uppercase tracking-[0.1em] font-medium text-[color:var(--mr-steel)] mb-1.5">
        {label}
      </label>
      {children}
    </div>
  )
}
