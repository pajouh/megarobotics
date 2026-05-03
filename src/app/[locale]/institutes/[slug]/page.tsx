import { Metadata } from 'next'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  Globe,
  MapPin,
  Building2,
  Layers,
  CheckCircle,
  Mail,
  Phone,
  Calendar,
  Users,
  User,
  ExternalLink,
  Briefcase,
  BookOpen,
} from 'lucide-react'
import { Twitter, Linkedin, Youtube, Github } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import {
  getInstitute,
  getRelatedInstitutes,
  getAllInstituteSlugs,
  urlFor,
} from '@/lib/sanity'
import { generateAlternates } from '@/lib/structured-data'
import StructuredData from '@/components/StructuredData'
import Breadcrumbs from '@/components/Breadcrumbs'
import InstituteCard from '@/components/InstituteCard'
import ArticleBody from '@/components/ArticleBody'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const institute = await getInstitute(slug)

  if (!institute) {
    return { title: 'Institute Not Found' }
  }

  const metaTitle = institute.seo?.metaTitle || `${institute.name} – ${institute.parentInstitution} | MegaRobotics`
  const metaDescription =
    institute.seo?.metaDescription ||
    institute.summary ||
    `${institute.name} at ${institute.parentInstitution}. Research institute focused on ${institute.focusAreas?.slice(0, 3).join(', ') || 'robotics'}.`

  const ogImage = institute.mainImage
    ? urlFor(institute.mainImage).width(1200).height(630).url()
    : institute.logo
      ? urlFor(institute.logo).width(1200).height(630).url()
      : undefined

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: institute.seo?.keywords || institute.focusAreas,
    alternates: generateAlternates(`/institutes/${slug}`),
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'website',
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

export async function generateStaticParams() {
  return await getAllInstituteSlugs()
}

export const revalidate = 60

const baseUrl = 'https://www.megarobotics.de'

function getYoutubeEmbedUrl(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  return match ? `https://www.youtube.com/embed/${match[1]}` : null
}

export default async function InstitutePage({ params }: Props) {
  const { slug } = await params
  const institute = await getInstitute(slug)

  if (!institute) {
    notFound()
  }

  const [related, t] = await Promise.all([
    getRelatedInstitutes(institute._id, institute.country),
    getTranslations('institutes'),
  ])

  const breadcrumbItems = [
    { name: t('title'), href: '/institutes' },
    { name: institute.country, href: `/institutes/country/${encodeURIComponent(institute.country.toLowerCase())}` },
    { name: institute.name, href: `/institutes/${slug}` },
  ]

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ResearchOrganization',
    name: institute.name,
    url: institute.website || `${baseUrl}/institutes/${slug}`,
    description: institute.summary || `${institute.name} at ${institute.parentInstitution}`,
    logo: institute.logo ? urlFor(institute.logo).width(400).height(400).url() : undefined,
    image: institute.mainImage ? urlFor(institute.mainImage).width(1200).height(630).url() : undefined,
    email: institute.email || undefined,
    telephone: institute.phone || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: institute.address || undefined,
      addressLocality: institute.city || undefined,
      addressCountry: institute.country,
    },
    parentOrganization: {
      '@type': 'EducationalOrganization',
      name: institute.parentInstitution,
    },
    foundingDate: institute.founded || undefined,
    sameAs: [
      institute.website,
      institute.socialLinks?.twitter,
      institute.socialLinks?.linkedin,
      institute.socialLinks?.youtube,
      institute.socialLinks?.github,
    ].filter(Boolean),
  }

  const hasContact = institute.email || institute.phone || institute.address || institute.website
  const hasSocials = institute.socialLinks && Object.values(institute.socialLinks).some(Boolean)
  const hasQuickFacts = institute.founded || institute.director || institute.staffCount || institute.centerType
  const videoEmbedUrl = institute.videoUrl ? getYoutubeEmbedUrl(institute.videoUrl) : null

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white">
      <StructuredData data={organizationSchema} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        {/* Back Link */}
        <Link
          href="/institutes"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('backToInstitutes')}
        </Link>

        {/* Hero Section with Main Image */}
        {institute.mainImage && (
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-8 bg-gray-100">
            <Image
              src={urlFor(institute.mainImage).width(1400).height(600).url()}
              alt={institute.mainImage.alt || institute.name}
              fill
              className="object-cover"
              priority
            />
            {institute.mainImage.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white text-sm">{institute.mainImage.caption}</p>
              </div>
            )}
          </div>
        )}

        {/* Header */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo */}
            {institute.logo && (
              <div className="flex-shrink-0">
                <div className="w-28 h-28 bg-white rounded-2xl p-4 flex items-center justify-center border border-gray-200">
                  <Image
                    src={urlFor(institute.logo).width(200).height(200).fit('max').url()}
                    alt={institute.name}
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                </div>
              </div>
            )}

            <div className="flex-grow">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {institute.name}
              </h1>
              <h2 className="text-xl text-gray-600 mb-4">
                {institute.parentInstitution}
              </h2>

              {/* Info badges */}
              <div className="flex flex-wrap items-center gap-3 text-gray-600">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {institute.city ? `${institute.city}, ` : ''}{institute.country}
                </span>
                {institute.centerType && (
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                    {institute.centerType}
                  </span>
                )}
                {institute.region && (
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-4 h-4" />
                    {institute.region}
                  </span>
                )}
                {institute.verifiedDate && (
                  <span className="flex items-center gap-1.5 text-emerald-600 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    {t('verifiedProfile')}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main content — left 2/3 */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary */}
            {institute.summary && (
              <div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {institute.summary}
                </p>
              </div>
            )}

            {/* Focus Areas */}
            {institute.focusAreas && institute.focusAreas.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('focusAreas')}</h3>
                <div className="flex flex-wrap gap-2">
                  {institute.focusAreas.map((area) => (
                    <Link
                      key={area}
                      href={`/institutes?topic=${encodeURIComponent(area)}`}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                    >
                      {area}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Rich text body */}
            {institute.body && institute.body.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('aboutInstitute')}</h3>
                <ArticleBody body={institute.body} />
              </div>
            )}

            {/* Placeholder if no body content */}
            {(!institute.body || institute.body.length === 0) && !institute.summary && (
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 text-gray-500 italic">
                {t('profilePlaceholder')}
              </div>
            )}

            {/* Video */}
            {videoEmbedUrl && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('video')}</h3>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                  <iframe
                    src={videoEmbedUrl}
                    title={`${institute.name} video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            )}

            {/* Key Projects */}
            {institute.keyProjects && institute.keyProjects.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('keyProjects')}</h3>
                <div className="space-y-4">
                  {institute.keyProjects.map((project, idx) => (
                    <div key={idx} className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{project.title}</h4>
                          {project.description && (
                            <p className="text-sm text-gray-600">{project.description}</p>
                          )}
                        </div>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 text-emerald-600 hover:text-emerald-700"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Photo Gallery */}
            {institute.gallery && institute.gallery.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('photoGallery')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {institute.gallery.map((img, idx) => (
                    <figure key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                      <Image
                        src={urlFor(img).width(600).height(450).url()}
                        alt={img.alt || `${institute.name} photo ${idx + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {img.caption && (
                        <figcaption className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2">
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar — right 1/3 */}
          <div className="space-y-6">
            {/* Quick Facts */}
            {hasQuickFacts && (
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('quickFacts')}</h3>
                <dl className="space-y-3">
                  {institute.centerType && (
                    <div className="flex items-start gap-3">
                      <Building2 className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <dt className="text-xs text-gray-500 uppercase tracking-wide">{t('infoGrid.type')}</dt>
                        <dd className="text-sm font-medium text-gray-900">{institute.centerType}</dd>
                      </div>
                    </div>
                  )}
                  {institute.director && (
                    <div className="flex items-start gap-3">
                      <User className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <dt className="text-xs text-gray-500 uppercase tracking-wide">{t('director')}</dt>
                        <dd className="text-sm font-medium text-gray-900">{institute.director}</dd>
                      </div>
                    </div>
                  )}
                  {institute.founded && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <dt className="text-xs text-gray-500 uppercase tracking-wide">{t('founded')}</dt>
                        <dd className="text-sm font-medium text-gray-900">{institute.founded}</dd>
                      </div>
                    </div>
                  )}
                  {institute.staffCount && (
                    <div className="flex items-start gap-3">
                      <Users className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <dt className="text-xs text-gray-500 uppercase tracking-wide">{t('teamSize')}</dt>
                        <dd className="text-sm font-medium text-gray-900">{institute.staffCount}</dd>
                      </div>
                    </div>
                  )}
                </dl>
              </div>
            )}

            {/* Contact Information */}
            {hasContact && (
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('contactInfo')}</h3>
                <div className="space-y-3">
                  {institute.email && (
                    <a
                      href={`mailto:${institute.email}`}
                      className="flex items-center gap-3 text-sm text-gray-700 hover:text-emerald-600 transition-colors"
                    >
                      <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="break-all">{institute.email}</span>
                    </a>
                  )}
                  {institute.phone && (
                    <a
                      href={`tel:${institute.phone}`}
                      className="flex items-center gap-3 text-sm text-gray-700 hover:text-emerald-600 transition-colors"
                    >
                      <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      {institute.phone}
                    </a>
                  )}
                  {institute.address && (
                    <div className="flex items-start gap-3 text-sm text-gray-700">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="whitespace-pre-line">{institute.address}</span>
                    </div>
                  )}
                  {institute.website && (
                    <a
                      href={institute.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                    >
                      <Globe className="w-4 h-4 flex-shrink-0" />
                      {t('officialWebsite')}
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Social Media */}
            {hasSocials && (
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('socialMedia')}</h3>
                <div className="flex flex-wrap gap-2">
                  {institute.socialLinks?.twitter && (
                    <a href={institute.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-blue-500 hover:border-blue-200 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {institute.socialLinks?.linkedin && (
                    <a href={institute.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-blue-700 hover:border-blue-200 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {institute.socialLinks?.youtube && (
                    <a href={institute.socialLinks.youtube} target="_blank" rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-200 transition-colors">
                      <Youtube className="w-5 h-5" />
                    </a>
                  )}
                  {institute.socialLinks?.github && (
                    <a href={institute.socialLinks.github} target="_blank" rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {institute.socialLinks?.googleScholar && (
                    <a href={institute.socialLinks.googleScholar} target="_blank" rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-200 transition-colors">
                      <BookOpen className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Links */}
            {(institute.openPositionsUrl || institute.publicationsUrl) && (
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 space-y-3">
                {institute.openPositionsUrl && (
                  <a
                    href={institute.openPositionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm font-medium text-gray-900 hover:text-emerald-600 transition-colors"
                  >
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    {t('openPositions')}
                    <ExternalLink className="w-3.5 h-3.5 ml-auto text-gray-400" />
                  </a>
                )}
                {institute.publicationsUrl && (
                  <a
                    href={institute.publicationsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm font-medium text-gray-900 hover:text-emerald-600 transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    {t('publications')}
                    <ExternalLink className="w-3.5 h-3.5 ml-auto text-gray-400" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Institutes */}
        {related.length > 0 && (
          <section className="border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t('moreInCountry', { country: institute.country })}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((inst) => (
                <InstituteCard key={inst._id} institute={inst} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
