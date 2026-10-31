import type { AvailabilityStatus } from '@/types'
import type { ResolvedHeroSpec } from '@/data/product-heroes'

/** A brand as the catalogue shows it (chip, group header, card footer). */
export interface CatalogBrand {
  slug: string
  name: string
  logo?: string
  logoWidth?: number
  logoHeight?: number
  authorized: boolean
}

/**
 * Lean, serialisable product for the client-side catalogue. Image URLs are
 * resolved on the server so the Sanity image builder stays out of the bundle.
 */
export interface CatalogItem {
  id: string
  slug: string
  name: string
  tagline?: string
  image?: string
  imageAlt?: string
  brand?: CatalogBrand
  family?: { slug: string; title: string }
  subcategory?: string
  availability?: AvailabilityStatus
  isNew: boolean
  featured: boolean
  /** Position in the curated order (manufacturer rank, then product order). */
  rank: number
}

/** Extra media and key figures for the flagship rail. */
export interface FlagshipItem extends CatalogItem {
  tall?: string
  video?: string
  poster?: string
  specs: ResolvedHeroSpec[]
}

export interface CatalogFamily {
  slug: string
  title: string
}

export interface CatalogQuery {
  q: string
  brand: string
  family: string
  availability: string
  sort: 'recommended' | 'name' | 'new'
  view: 'grid' | 'list'
}
