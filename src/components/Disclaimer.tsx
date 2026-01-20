interface DisclaimerTranslations {
  product?: string
  productListing?: string
  manufacturer?: string
  footer?: string
}

interface DisclaimerProps {
  variant: 'product' | 'productListing' | 'manufacturer' | 'footer'
  manufacturerName?: string
  className?: string
  translations?: DisclaimerTranslations
}

const defaultTranslations: DisclaimerTranslations = {
  product: 'All product images, logos, specifications, and trademarks displayed on this page are the property of their respective manufacturers and are used for informational and identification purposes only. Megaforce GmbH is not affiliated with {manufacturer} unless explicitly stated as an authorized distributor.',
  productListing: 'Product information and images are provided for reference purposes. All trademarks and registered trademarks are the property of their respective owners.',
  manufacturer: 'The manufacturer profiles, logos, and product information presented on this page are for informational purposes only. All trademarks, company names, and logos are the property of their respective owners. Inclusion on this page does not imply any business relationship or endorsement unless explicitly stated.',
  footer: 'All trademarks are property of their respective owners.',
}

export default function Disclaimer({ variant, manufacturerName, className = '', translations }: DisclaimerProps) {
  const t = { ...defaultTranslations, ...translations }
  const baseStyles = 'text-xs text-gray-400 leading-relaxed'

  if (variant === 'product') {
    const text = (t.product || defaultTranslations.product)!.replace('{manufacturer}', manufacturerName || 'the manufacturer')
    return (
      <aside className={`mt-16 pt-8 border-t border-gray-100 ${className}`}>
        <p className={baseStyles}>{text}</p>
      </aside>
    )
  }

  if (variant === 'productListing') {
    return (
      <aside className={`mt-12 pt-8 border-t border-gray-100 ${className}`}>
        <p className={baseStyles}>{t.productListing}</p>
      </aside>
    )
  }

  if (variant === 'manufacturer') {
    return (
      <aside className={`mt-12 pt-8 border-t border-gray-100 ${className}`}>
        <p className={baseStyles}>{t.manufacturer}</p>
      </aside>
    )
  }

  if (variant === 'footer') {
    return (
      <p className={`text-xs text-gray-400 ${className}`}>{t.footer}</p>
    )
  }

  return null
}
