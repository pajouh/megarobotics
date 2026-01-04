import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Bot, Target, Users, Zap, Mail, MapPin, Building } from 'lucide-react'
import NewsletterForm from '@/components/NewsletterForm'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about MegaRobotics - your trusted source for robotics news, reviews, and industry insights.',
}

const values = [
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

const team = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Editor-in-Chief',
    bio: 'Former MIT robotics researcher with 15 years in tech journalism.',
  },
  {
    name: 'Marcus Weber',
    role: 'Senior Technical Writer',
    bio: 'Ex-Boston Dynamics engineer turned technology analyst.',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Industry Reporter',
    bio: 'Covers industrial automation and manufacturing robotics.',
  },
  {
    name: 'James Liu',
    role: 'AI & Robotics Analyst',
    bio: 'Specializes in AI integration and humanoid robotics trends.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Bot className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-slate-400">About Us</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powering the Future of{' '}
              <span className="gradient-text">Robotics Intelligence</span>
            </h1>

            <p className="text-lg text-slate-400 mb-8">
              MegaRobotics is your premier destination for robotics news, in-depth analysis,
              and industry insights. We cover everything from industrial automation to humanoid
              robots, helping professionals and enthusiasts stay informed about the rapidly
              evolving world of intelligent machines.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg font-medium transition-colors"
              >
                Read Our Articles
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 hover:border-white/20 text-white rounded-lg font-medium transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Mission
              </h2>
              <p className="text-slate-400 mb-6">
                Founded in 2024, MegaRobotics was created to bridge the gap between
                cutting-edge robotics research and the broader technology community.
                We believe that understanding robotics is essential for anyone looking
                to navigate the future of technology and automation.
              </p>
              <p className="text-slate-400 mb-6">
                Our team of experienced journalists, engineers, and industry analysts
                work tirelessly to bring you accurate, timely, and insightful coverage
                of the robotics industry.
              </p>
              <p className="text-slate-400">
                From breakthrough research at top universities to product launches from
                industry leaders, we cover the stories that matter to robotics
                professionals, investors, and enthusiasts alike.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all"
                >
                  <value.icon className="w-8 h-8 text-emerald-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-white/5" id="team">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              A dedicated group of robotics experts and journalists bringing you
              the best coverage in the industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="p-6 rounded-xl bg-slate-900/50 border border-white/10 hover:border-emerald-500/30 transition-all text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-emerald-400 text-sm mb-3">{member.role}</p>
                <p className="text-slate-400 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24" id="contact">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Get in Touch
              </h2>
              <p className="text-slate-400 mb-8">
                Have a story tip, press release, or partnership inquiry?
                We&apos;d love to hear from you.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Email</p>
                    <a href="mailto:contact@megarobotics.de" className="text-white hover:text-emerald-400 transition-colors">
                      contact@megarobotics.de
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Location</p>
                    <p className="text-white">Berlin, Germany</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <Building className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">For Business</p>
                    <a href="mailto:partnerships@megarobotics.de" className="text-white hover:text-emerald-400 transition-colors">
                      partnerships@megarobotics.de
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10" id="advertise">
              <h3 className="text-xl font-semibold text-white mb-4">
                Stay Updated
              </h3>
              <p className="text-slate-400 mb-6">
                Subscribe to our newsletter for weekly robotics insights delivered to your inbox.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10" id="careers">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Our Team
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
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
