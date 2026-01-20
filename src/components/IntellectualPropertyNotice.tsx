interface IPNoticeTranslations {
  ipTitle?: string
  trademarkNoticeTitle?: string
  trademarkNotice?: string
  imageUsageTitle?: string
  imageUsage?: string
  imageUsageEnd?: string
  editorialContentTitle?: string
  editorialContent?: string
}

interface IntellectualPropertyNoticeProps {
  contactEmail?: string
  className?: string
  translations?: IPNoticeTranslations
}

const defaultTranslations: IPNoticeTranslations = {
  ipTitle: 'Intellectual Property & Trademark Notice',
  trademarkNoticeTitle: 'Trademark Notice',
  trademarkNotice: 'All product names, logos, brands, trademarks, and registered trademarks mentioned on this website are the property of their respective owners. All company, product, and service names used on this website are for identification purposes only. Use of these names, logos, and brands does not imply endorsement or affiliation unless explicitly stated.',
  imageUsageTitle: 'Image Usage',
  imageUsage: 'Product images displayed on megarobotics.de are used for informational and commercial reference purposes. We endeavor to use only images for which we have obtained permission or which are provided through official manufacturer press resources. If you are a rights holder and believe your intellectual property has been used inappropriately, please contact us at',
  imageUsageEnd: 'and we will promptly address your concerns.',
  editorialContentTitle: 'Editorial Content',
  editorialContent: 'News articles and editorial content may include product images and company information under fair use principles for commentary, criticism, and news reporting purposes.',
}

export default function IntellectualPropertyNotice({
  contactEmail = 'info@megarobotics.de',
  className = '',
  translations
}: IntellectualPropertyNoticeProps) {
  const t = { ...defaultTranslations, ...translations }

  return (
    <section className={`mt-12 pt-8 border-t border-gray-200 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        {t.ipTitle}
      </h2>

      <div className="space-y-6 text-gray-600">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">{t.trademarkNoticeTitle}</h3>
          <p className="leading-relaxed">
            {t.trademarkNotice}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">{t.imageUsageTitle}</h3>
          <p className="leading-relaxed">
            {t.imageUsage}{' '}
            <a
              href={`mailto:${contactEmail}`}
              className="text-emerald-600 hover:text-emerald-700 underline"
            >
              {contactEmail}
            </a>
            {' '}{t.imageUsageEnd}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">{t.editorialContentTitle}</h3>
          <p className="leading-relaxed">
            {t.editorialContent}
          </p>
        </div>
      </div>
    </section>
  )
}
