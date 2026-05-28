import { PortableTextBlock } from '@portabletext/types'

export interface InstituteSocialLinks {
  twitter?: string
  linkedin?: string
  youtube?: string
  github?: string
  googleScholar?: string
}

export interface InstituteProject {
  title: string
  description?: string
  url?: string
}

export interface Institute {
  _id: string
  _type: 'institute'
  name: string
  slug: {
    current: string
  }
  parentInstitution: string
  region?: string
  country: string
  city?: string
  centerType?: string
  focusAreas?: string[]
  founded?: string
  director?: string
  staffCount?: string
  // Contact
  email?: string
  phone?: string
  address?: string
  website?: string
  socialLinks?: InstituteSocialLinks
  openPositionsUrl?: string
  publicationsUrl?: string
  // Content
  summary?: string
  body?: PortableTextBlock[]
  keyProjects?: InstituteProject[]
  // Media
  logo?: SanityImage
  mainImage?: SanityImage
  gallery?: SanityImage[]
  videoUrl?: string
  // Internal
  outreachPriority?: number
  profileStatus?: string
  verifiedDate?: string
  notes?: string
  seo?: SeoFields
}

export interface SeoFields {
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface Author {
  _id: string
  _type: 'author'
  name: string
  slug: {
    current: string
  }
  image?: SanityImage
  bio?: string
  twitter?: string
  linkedin?: string
}

export interface Category {
  _id: string
  _type: 'category'
  title: string
  slug: {
    current: string
  }
  description?: string
  icon?: string
  color?: string
}

export interface Article {
  _id: string
  _type: 'article'
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  mainImage?: SanityImage
  category?: Category
  author?: Author
  publishedAt?: string
  readTime?: number
  featured?: boolean
  body?: PortableTextBlock[]
  seo?: SeoFields
}

export interface CodeBlock {
  _type: 'code'
  language: string
  code: string
  filename?: string
}

// Product system types
export type RelationshipStatus =
  | 'official_distributor'
  | 'authorized_reseller'
  | 'sales_partner'
  | 'technology_partner'
  | 'sourcing_available'
  | 'information_only'
  | 'under_evaluation'
  | 'unknown'

export type AvailabilityStatus =
  | 'in_stock'
  | 'available_on_request'
  | 'sourcing_on_request'
  | 'lead_time_required'
  | 'information_only'
  | 'discontinued'

export interface Manufacturer {
  _id: string
  _type: 'manufacturer'
  name: string
  slug: {
    current: string
  }
  logo?: SanityImage
  description?: string
  website?: string
  headquarters?: string
  founded?: string
  specialties?: string[]
  featured?: boolean
  productCount?: number
  relationshipStatus?: RelationshipStatus
  disclaimerOverride?: string
  seo?: SeoFields
}

export interface ProductCategory {
  _id: string
  _type: 'productCategory'
  name: string
  slug: {
    current: string
  }
  description?: string
  icon?: string
  image?: SanityImage
  order?: number
  productCount?: number
  seo?: SeoFields
}

export interface ProductSpecification {
  label: string
  value: string
}

export interface ProductGalleryImage extends SanityImage {
  alt?: string
  caption?: string
}

export interface ProductFamilyRef {
  _id: string
  title: string
  slug: { current: string }
}

export interface Product {
  _id: string
  _type: 'product'
  name: string
  slug: {
    current: string
  }
  manufacturer: Manufacturer
  category: ProductCategory
  productFamily?: ProductFamilyRef
  subcategory?: string
  tagline?: string
  description?: string
  fullDescription?: PortableTextBlock[]
  mainImage?: SanityImage
  gallery?: ProductGalleryImage[]
  videoUrl?: string
  specifications?: ProductSpecification[]
  features?: string[]
  applications?: string[]
  priceRange?: string
  availability?: 'available' | 'preorder' | 'coming_soon' | 'contact'
  availabilityStatus?: AvailabilityStatus
  manufacturerRelationshipStatus?: RelationshipStatus
  inquiryOnly?: boolean
  productUrl?: string
  datasheetUrl?: string
  featured?: boolean
  isNew?: boolean
  publishedAt?: string
  order?: number
  seo?: SeoFields
}
