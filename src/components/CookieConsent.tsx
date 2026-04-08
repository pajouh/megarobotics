'use client'
import { useState, useEffect, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { Cookie, X, ChevronDown, ChevronUp } from 'lucide-react'
import { Link } from '@/i18n/navigation'

const COOKIE_NAME = 'mega_cookie_consent'
const GA_ID = 'G-SNS31SW7WM'

type ConsentState = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

function getConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = document.cookie
      .split('; ')
      .find((c) => c.startsWith(`${COOKIE_NAME}=`))
      ?.split('=')[1]
    return raw ? JSON.parse(decodeURIComponent(raw)) : null
  } catch {
    return null
  }
}

function setConsent(consent: ConsentState) {
  const value = encodeURIComponent(JSON.stringify(consent))
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `${COOKIE_NAME}=${value}; path=/; expires=${expires}; SameSite=Lax`
}

function initGtagDataLayer() {
  window.dataLayer = window.dataLayer || []
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args)
  }
}

function loadGA(analyticsGranted: boolean, marketingGranted: boolean) {
  initGtagDataLayer()
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  window.gtag('consent', 'update', {
    analytics_storage: analyticsGranted ? 'granted' : 'denied',
    ad_storage: marketingGranted ? 'granted' : 'denied',
    ad_user_data: marketingGranted ? 'granted' : 'denied',
    ad_personalization: marketingGranted ? 'granted' : 'denied',
  })
  if (analyticsGranted && !document.getElementById('ga-script')) {
    const script = document.createElement('script')
    script.id = 'ga-script'
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    script.async = true
    document.head.appendChild(script)
    window.gtag('js', new Date())
    window.gtag('config', GA_ID)
  }
}

function removeGA() {
  if (window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    })
  }
  const gaCookies = document.cookie.split(';').map((c) => c.trim().split('=')[0])
  for (const name of gaCookies) {
    if (name.startsWith('_ga') || name.startsWith('_gid')) {
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=.${window.location.hostname}`
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
    }
  }
}

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

export default function CookieConsent() {
  const t = useTranslations('cookies')
  const [visible, setBannerVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [showSettingsIcon, setShowSettingsIcon] = useState(false)
  const [consent, setConsentState] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    const saved = getConsent()
    if (saved) {
      setConsentState(saved)
      setShowSettingsIcon(true)
      loadGA(saved.analytics, saved.marketing)
    } else {
      initGtagDataLayer()
      window.gtag('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      })
      setBannerVisible(true)
    }
  }, [])

  const handleSave = useCallback((newConsent: ConsentState) => {
    setConsent(newConsent)
    setConsentState(newConsent)
    setBannerVisible(false)
    setShowSettingsIcon(true)
    if (newConsent.analytics || newConsent.marketing) {
      loadGA(newConsent.analytics, newConsent.marketing)
    } else {
      removeGA()
    }
  }, [])

  const acceptAll = () => handleSave({ necessary: true, analytics: true, marketing: true })
  const rejectAll = () => handleSave({ necessary: true, analytics: false, marketing: false })
  const saveCustom = () => handleSave(consent)

  if (!visible && !showSettingsIcon) return null

  return (
    <>
      {showSettingsIcon && !visible && (
        <button
          onClick={() => { setBannerVisible(true); setShowSettingsIcon(false) }}
          className="fixed bottom-4 left-4 z-50 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
          aria-label={t('settings')}
          title={t('settings')}
        >
          <Cookie className="w-5 h-5" />
        </button>
      )}
      {visible && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={rejectAll} />
          <div className="relative w-full max-w-lg mx-4 mb-4 sm:mb-0 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 pt-5 pb-2">
              <div className="flex items-center gap-2">
                <Cookie className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">{t('title')}</h3>
              </div>
              <button onClick={rejectAll} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 pb-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                {t('description')}{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline">{t('privacyLink')}</Link>
              </p>
            </div>
            <div className="px-6 pb-3">
              <button onClick={() => setShowDetails(!showDetails)} className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                {t('customize')}
                {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showDetails && (
                <div className="mt-3 space-y-3">
                  <label className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-900">{t('necessary')}</span>
                      <p className="text-xs text-gray-500">{t('necessaryDesc')}</p>
                    </div>
                    <input type="checkbox" checked disabled className="w-4 h-4 accent-blue-600" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <span className="text-sm font-medium text-gray-900">{t('analytics')}</span>
                      <p className="text-xs text-gray-500">{t('analyticsDesc')}</p>
                    </div>
                    <input type="checkbox" checked={consent.analytics} onChange={(e) => setConsentState({ ...consent, analytics: e.target.checked })} className="w-4 h-4 accent-blue-600 cursor-pointer" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <span className="text-sm font-medium text-gray-900">{t('marketing')}</span>
                      <p className="text-xs text-gray-500">{t('marketingDesc')}</p>
                    </div>
                    <input type="checkbox" checked={consent.marketing} onChange={(e) => setConsentState({ ...consent, marketing: e.target.checked })} className="w-4 h-4 accent-blue-600 cursor-pointer" />
                  </label>
                </div>
              )}
            </div>
            <div className="px-6 pb-5 flex gap-3">
              {showDetails ? (
                <>
                  <button onClick={rejectAll} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">{t('rejectAll')}</button>
                  <button onClick={saveCustom} className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">{t('savePreferences')}</button>
                </>
              ) : (
                <>
                  <button onClick={rejectAll} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">{t('rejectAll')}</button>
                  <button onClick={acceptAll} className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">{t('acceptAll')}</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
