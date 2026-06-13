import type { Metadata } from 'next'
import { Mail, MapPin } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import ContactForm from '@/components/ContactForm'
import HeroIndustrial from '@/components/industrial/HeroIndustrial'
import { getSiteSettings, type Locale } from '@/lib/sanity'
import { pageSeo } from '@/lib/page-seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const settings = await getSiteSettings(locale as Locale)
  const t = await getTranslations({ locale, namespace: 'contact' })

  const title = settings?.contactMetaTitle || t('metaTitle')
  const description = settings?.contactMetaDescription || t('metaDescription')

  return pageSeo({ title, description, path: '/contact' })
}

export const revalidate = 3600

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  const settings = await getSiteSettings(locale as Locale)
  const tExtra = await getTranslations('industrial.contactExtra')
  const tNav = await getTranslations('industrial.nav')

  const contactEmail = settings?.contactEmail || 'info@megarobotics.de'
  const address = settings?.address || (locale === 'de' ? 'Berlin, Deutschland' : 'Berlin, Germany')

  return (
    <div className="min-h-screen">
      <HeroIndustrial
        eyebrow={tNav('contact')}
        title={tExtra('intro')}
        subtitle=""
      />

      <section className="py-16 md:py-24 ind-section-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[color:var(--mr-paper-2)] border border-[color:var(--mr-line)] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-[color:var(--mr-accent-ink)]" />
                  </div>
                  <div>
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] font-medium text-[color:var(--mr-steel)] mb-1">
                      Email
                    </p>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-[color:var(--mr-ink)] hover:text-[color:var(--mr-accent-ink)] transition-colors font-medium"
                    >
                      {contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[color:var(--mr-paper-2)] border border-[color:var(--mr-line)] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[color:var(--mr-accent-ink)]" />
                  </div>
                  <div>
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] font-medium text-[color:var(--mr-steel)] mb-1">
                      Location
                    </p>
                    <p className="text-[color:var(--mr-ink)] font-medium">{address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="p-6 md:p-8 bg-[color:var(--mr-white)] border border-[color:var(--mr-line)] border-t-2 border-t-[color:var(--mr-accent)]">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
