import { Metadata } from 'next'
import { Mail, MapPin, Building, MessageSquare } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import { getSiteSettings, Locale } from '@/lib/sanity'
import { generateAlternates } from '@/lib/structured-data'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const settings = await getSiteSettings(locale as Locale)

  const title = settings?.contactMetaTitle || (locale === 'de' ? 'Kontakt - MegaRobotics' : 'Contact - MegaRobotics')
  const description = settings?.contactMetaDescription || (locale === 'de'
    ? 'Nehmen Sie Kontakt mit MegaRobotics auf. Senden Sie uns Ihre Fragen, Partnerschaftsanfragen oder Nachrichtentipps.'
    : 'Get in touch with MegaRobotics. Send us your questions, partnership inquiries, or story tips.')

  return {
    title,
    description,
    alternates: generateAlternates('/contact'),
    openGraph: {
      title,
      description,
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Contact MegaRobotics' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  }
}

export const revalidate = 3600

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const settings = await getSiteSettings(locale as Locale)

  const contactEmail = settings?.contactEmail || 'info@megarobotics.de'
  const address = settings?.address || (locale === 'de' ? 'Berlin, Deutschland' : 'Berlin, Germany')

  const badge = settings?.contactPageBadge || (locale === 'de' ? 'Kontakt' : 'Contact')
  const title = settings?.contactPageTitle || (locale === 'de' ? 'Kontaktieren Sie uns' : 'Get in Touch')
  const subtitle = settings?.contactPageSubtitle || (locale === 'de'
    ? 'Haben Sie eine Frage, eine Partnerschaftsanfrage oder einen Nachrichtentipp? Wir freuen uns von Ihnen zu hören.'
    : 'Have a question, partnership inquiry, or story tip? We\'d love to hear from you.')
  const infoTitle = settings?.contactInfoTitle || (locale === 'de' ? 'Kontaktinformationen' : 'Contact Information')
  const emailLabel = settings?.contactEmailLabel || (locale === 'de' ? 'E-Mail' : 'Email')
  const locationLabel = settings?.contactLocationLabel || (locale === 'de' ? 'Standort' : 'Location')
  const businessLabel = settings?.contactBusinessLabel || (locale === 'de' ? 'Geschäftlich' : 'For Business')

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 mb-6">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span className="text-sm text-gray-600">{badge}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {title}
            </h1>
            <p className="text-lg text-gray-600">
              {subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {infoTitle}
              </h2>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{emailLabel}</p>
                    <a href={`mailto:${contactEmail}`} className="text-gray-900 hover:text-emerald-600 transition-colors font-medium">
                      {contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{locationLabel}</p>
                    <p className="text-gray-900 font-medium">{address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Building className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{businessLabel}</p>
                    <a href="mailto:info@megarobotics.de" className="text-gray-900 hover:text-emerald-600 transition-colors font-medium">
                      info@megarobotics.de
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
