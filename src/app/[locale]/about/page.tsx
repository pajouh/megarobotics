import { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { Bot, Target, Users, Zap, Mail, MapPin, Building } from 'lucide-react'
import NewsletterForm from '@/components/NewsletterForm'
import { getPageByType, getSiteSettings } from '@/lib/sanity'
import PageBody from '@/components/PageBody'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about MegaRobotics - your trusted source for robotics news, reviews, and industry insights.',
}

export const revalidate = 3600

const defaultValues = [
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

export default async function AboutPage() {
  const [page, settings] = await Promise.all([
    getPageByType('about'),
    getSiteSettings(),
  ])

  const contactEmail = settings?.contactEmail || 'contact@megarobotics.de'
  const address = settings?.address || 'Berlin, Germany'

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 mb-6">
              <Bot className="w-4 h-4 text-emerald-600" />
              <span className="text-sm text-gray-600">About Us</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {page?.title || (
                <>
                  Powering the Future of{' '}
                  <span className="gradient-text">Robotics Intelligence</span>
                </>
              )}
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              {page?.subtitle || 'MegaRobotics is your premier destination for robotics news, in-depth analysis, and industry insights. We cover everything from industrial automation to humanoid robots, helping professionals and enthusiasts stay informed about the rapidly evolving world of intelligent machines.'}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors"
              >
                Read Our Articles
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 border border-gray-200 hover:border-gray-300 text-gray-900 rounded-lg font-medium transition-colors"
              >
                Contact Us
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
                  Our Mission
                </h2>
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
                Get in Touch
              </h2>
              <p className="text-gray-600 mb-8">
                Have a story tip, press release, or partnership inquiry?
                We&apos;d love to hear from you.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
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
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-900 font-medium">{address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Building className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">For Business</p>
                    <a href="mailto:partnerships@megarobotics.de" className="text-gray-900 hover:text-emerald-600 transition-colors font-medium">
                      partnerships@megarobotics.de
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Stay Updated
              </h3>
              <p className="text-gray-600 mb-6">
                Subscribe to our newsletter for weekly robotics insights delivered to your inbox.
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
            Join Our Team
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            We&apos;re always looking for talented writers, analysts, and robotics enthusiasts
            to join our growing team. If you&apos;re passionate about the future of robotics,
            we want to hear from you.
          </p>
          <a
            href="mailto:careers@megarobotics.de"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg font-medium transition-colors"
          >
            <Mail className="w-5 h-5" />
            careers@megarobotics.de
          </a>
        </div>
      </section>
    </div>
  )
}
