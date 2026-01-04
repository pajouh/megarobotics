import { PortableTextBlock } from '@portabletext/types'

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
}

export interface CodeBlock {
  _type: 'code'
  language: string
  code: string
  filename?: string
}

// Product system types
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
}

export interface ProductSpecification {
  label: string
  value: string
}

export interface ProductGalleryImage extends SanityImage {
  alt?: string
  caption?: string
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
  productUrl?: string
  datasheetUrl?: string
  featured?: boolean
  isNew?: boolean
  publishedAt?: string
  order?: number
}
