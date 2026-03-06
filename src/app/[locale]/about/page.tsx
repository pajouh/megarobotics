import { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { Bot, Target, Users, Zap, Mail, MapPin, Building } from 'lucide-react'
import NewsletterForm from '@/components/NewsletterForm'
import { getPageByType, getSiteSettings, Locale } from '@/lib/sanity'
import PageBody from '@/components/PageBody'
import { generateAlternates } from '@/lib/structured-data'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const page = await getPageByType('about', locale as Locale)

  const title = page?.seo?.metaTitle || (locale === 'de' ? 'Über uns' : 'About')
  const description = page?.seo?.metaDescription || (locale === 'de'
    ? 'Erfahren Sie mehr über MegaRobotics - Ihre vertrauenswürdige Quelle für Robotik-Nachrichten, Bewertungen und Brancheneinblicke.'
    : 'Learn about MegaRobotics - your trusted source for robotics news, reviews, and industry insights.')

  return {
    title,
    description,
    alternates: generateAlternates('/about'),
    openGraph: {
      title,
      description,
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'About MegaRobotics' }],
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

const defaultValuesEN = [
  {
    icon: Target,
    title: 'Accuracy First',
    description: 'We verify every story and fact-check all technical claims. Our reputation depends on reliable reporting.',
  },
  {
    icon: Zap,
    title: 'Breaking News',
    description: 'Stay ahead with real-time coverage of robotics announcements, product launches, and industry developments.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Built by robotics enthusiasts for robotics enthusiasts. We listen to our readers and cover what matters to you.',
  },
]

const defaultValuesDE = [
  {
    icon: Target,
    title: 'Genauigkeit zuerst',
    description: 'Wir überprüfen jede Geschichte und prüfen alle technischen Angaben. Unser Ruf basiert auf zuverlässiger Berichterstattung.',
  },
  {
    icon: Zap,
    title: 'Aktuelle Nachrichten',
    description: 'Bleiben Sie mit Echtzeit-Berichterstattung über Robotik-Ankündigungen, Produkteinführungen und Branchenentwicklungen auf dem Laufenden.',
  },
  {
    icon: Users,
    title: 'Community-orientiert',
    description: 'Von Robotik-Enthusiasten für Robotik-Enthusiasten. Wir hören auf unsere Leser und berichten über das, was Ihnen wichtig ist.',
  },
]

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const [page, settings] = await Promise.all([
    getPageByType('about', locale as Locale),
    getSiteSettings(locale as Locale),
  ])

  const isDE = locale === 'de'
  const contactEmail = settings?.contactEmail || 'info@megarobotics.de'
  const address = settings?.address || (isDE ? 'Berlin, Deutschland' : 'Berlin, Germany')
  const defaultValues = isDE ? defaultValuesDE : defaultValuesEN

  const emailLabel = settings?.contactEmailLabel || (isDE ? 'E-Mail' : 'Email')
  const locationLabel = settings?.contactLocationLabel || (isDE ? 'Standort' : 'Location')
  const businessLabel = settings?.contactBusinessLabel || (isDE ? 'Geschäftlich' : 'For Business')

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 mb-6">
              <Bot className="w-4 h-4 text-emerald-600" />
              <span className="text-sm text-gray-600">{isDE ? 'Über uns' : 'About Us'}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {page?.title || (isDE ? (
                <>
                  Die Zukunft der{' '}
                  <span className="gradient-text">Robotik-Intelligenz</span>
                </>
              ) : (
                <>
                  Powering the Future of{' '}
                  <span className="gradient-text">Robotics Intelligence</span>
                </>
              ))}
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              {page?.subtitle || (isDE
                ? 'MegaRobotics ist Ihre erste Anlaufstelle für Robotik-Nachrichten, tiefgehende Analysen und Brancheneinblicke. Wir berichten über alles von industrieller Automatisierung bis zu humanoiden Robotern und helfen Fachleuten und Enthusiasten, über die sich schnell entwickelnde Welt intelligenter Maschinen informiert zu bleiben.'
                : 'MegaRobotics is your premier destination for robotics news, in-depth analysis, and industry insights. We cover everything from industrial automation to humanoid robots, helping professionals and enthusiasts stay informed about the rapidly evolving world of intelligent machines.')}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors"
              >
                {isDE ? 'Unsere Artikel lesen' : 'Read Our Articles'}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 border border-gray-200 hover:border-gray-300 text-gray-900 rounded-lg font-medium transition-colors"
              >
                {isDE ? 'Kontakt' : 'Contact Us'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CMS Body Content or Default Mission Section */}
      {page?.body ? (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <PageBody body={page.body} />
          </div>
        </section>
      ) : (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {isDE ? 'Unsere Mission' : 'Our Mission'}
                </h2>
                {isDE ? (
                  <>
                    <p className="text-gray-600 mb-6">
                      MegaRobotics wurde 2024 gegründet, um die Lücke zwischen modernster
                      Robotikforschung und der breiteren Technologie-Community zu schließen.
                      Wir glauben, dass das Verständnis von Robotik für jeden unerlässlich ist,
                      der die Zukunft von Technologie und Automatisierung mitgestalten möchte.
                    </p>
                    <p className="text-gray-600 mb-6">
                      Unser Team aus erfahrenen Journalisten, Ingenieuren und Branchenanalysten
                      arbeitet unermüdlich daran, Ihnen eine genaue, aktuelle und aufschlussreiche
                      Berichterstattung über die Robotikbranche zu liefern.
                    </p>
                    <p className="text-gray-600">
                      Von bahnbrechender Forschung an Spitzenuniversitäten bis hin zu Produkteinführungen
                      von Branchenführern – wir berichten über die Geschichten, die für Robotik-Fachleute,
                      Investoren und Enthusiasten gleichermaßen wichtig sind.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-gray-600 mb-6">
                      Founded in 2024, MegaRobotics was created to bridge the gap between
                      cutting-edge robotics research and the broader technology community.
                      We believe that understanding robotics is essential for anyone looking
                      to navigate the future of technology and automation.
                    </p>
                    <p className="text-gray-600 mb-6">
                      Our team of experienced journalists, engineers, and industry analysts
                      work tirelessly to bring you accurate, timely, and insightful coverage
                      of the robotics industry.
                    </p>
                    <p className="text-gray-600">
                      From breakthrough research at top universities to product launches from
                      industry leaders, we cover the stories that matter to robotics
                      professionals, investors, and enthusiasts alike.
                    </p>
                  </>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4">
                {defaultValues.map((value) => (
                  <div
                    key={value.title}
                    className="p-6 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
                  >
                    <value.icon className="w-8 h-8 text-emerald-600 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-white" id="contact">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {settings?.contactPageTitle || (isDE ? 'Kontaktieren Sie uns' : 'Get in Touch')}
              </h2>
              <p className="text-gray-600 mb-8">
                {settings?.contactPageSubtitle || (isDE
                  ? 'Haben Sie einen Nachrichtentipp, eine Pressemitteilung oder eine Partnerschaftsanfrage? Wir freuen uns von Ihnen zu hören.'
                  : 'Have a story tip, press release, or partnership inquiry? We\'d love to hear from you.')}
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
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
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{locationLabel}</p>
                    <p className="text-gray-900 font-medium">{address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
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

            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {isDE ? 'Bleiben Sie informiert' : 'Stay Updated'}
              </h3>
              <p className="text-gray-600 mb-6">
                {isDE
                  ? 'Abonnieren Sie unseren Newsletter für wöchentliche Robotik-Einblicke direkt in Ihr Postfach.'
                  : 'Subscribe to our newsletter for weekly robotics insights delivered to your inbox.'}
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="py-16 md:py-24 bg-gray-900" id="careers">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {isDE ? 'Werden Sie Teil unseres Teams' : 'Join Our Team'}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            {isDE
              ? 'Wir suchen immer nach talentierten Autoren, Analysten und Robotik-Enthusiasten, die unser wachsendes Team verstärken. Wenn Sie leidenschaftlich an der Zukunft der Robotik interessiert sind, möchten wir von Ihnen hören.'
              : 'We\'re always looking for talented writers, analysts, and robotics enthusiasts to join our growing team. If you\'re passionate about the future of robotics, we want to hear from you.'}
          </p>
          <a
            href="mailto:info@megarobotics.de"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg font-medium transition-colors"
          >
            <Mail className="w-5 h-5" />
            info@megarobotics.de
          </a>
        </div>
      </section>
    </div>
  )
}
