import Link from 'next/link'
import { Twitter, Linkedin, Youtube, Mail } from 'lucide-react'

const categories = [
  { name: 'News', href: '/articles' },
  { name: 'Reviews', href: '/category/reviews' },
  { name: 'Companies', href: '/category/companies' },
  { name: 'Events', href: '/category/events' },
  { name: 'Research', href: '/category/research' },
]

const company = [
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/about#contact' },
  { name: 'Careers', href: '/about#careers' },
  { name: 'Advertise', href: '/about#advertise' },
]

const socials = [
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/megarobotics' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/megarobotics' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@megarobotics' },
]

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-white font-semibold tracking-wider">
                MEGAROBOTICS
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              Your source for the latest robotics news, reviews, and industry insights.
              Covering industrial automation, humanoid robots, AI integration, and the future of intelligent machines.
            </p>
            <div className="flex gap-4 mt-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-emerald-400 transition-colors"
                >
                  <span className="sr-only">{social.name}</span>
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-500 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-500 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-slate-500 text-sm mb-4">
              Get the latest robotics news delivered to your inbox.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; 2025 MegaRobotics. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-slate-500 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-slate-500 hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="text-slate-500 hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
