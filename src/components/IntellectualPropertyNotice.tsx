interface IntellectualPropertyNoticeProps {
  contactEmail?: string
  className?: string
}

export default function IntellectualPropertyNotice({
  contactEmail = 'info@megarobotics.de',
  className = ''
}: IntellectualPropertyNoticeProps) {
  return (
    <section className={`mt-12 pt-8 border-t border-gray-200 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Intellectual Property &amp; Trademark Notice
      </h2>

      <div className="space-y-6 text-gray-600">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Trademark Notice</h3>
          <p className="leading-relaxed">
            All product names, logos, brands, trademarks, and registered trademarks mentioned on this website are the property of their respective owners. All company, product, and service names used on this website are for identification purposes only. Use of these names, logos, and brands does not imply endorsement or affiliation unless explicitly stated.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Image Usage</h3>
          <p className="leading-relaxed">
            Product images displayed on megarobotics.de are used for informational and commercial reference purposes. We endeavor to use only images for which we have obtained permission or which are provided through official manufacturer press resources. If you are a rights holder and believe your intellectual property has been used inappropriately, please contact us at{' '}
            <a
              href={`mailto:${contactEmail}`}
              className="text-emerald-600 hover:text-emerald-700 underline"
            >
              {contactEmail}
            </a>
            {' '}and we will promptly address your concerns.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Editorial Content</h3>
          <p className="leading-relaxed">
            News articles and editorial content may include product images and company information under fair use principles for commentary, criticism, and news reporting purposes.
          </p>
        </div>
      </div>
    </section>
  )
}
