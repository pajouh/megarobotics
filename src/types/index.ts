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
