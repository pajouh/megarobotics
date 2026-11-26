// Registry of the category buying pages rendered by
// src/components/landing/CategoryLanding.tsx at /pages/<slug>.

import type { Locale } from '@/i18n/config'
import { localize, type Localized } from '@/data/security-solution'
import type { LandingContent, LandingModel } from './types'
import { COMMON } from './common'
import * as cobots from './cobots'
import * as robotGrippers from './robot-grippers'
import * as palletizingRobots from './palletizing-robots'
import * as cleaningRobots from './cleaning-robots'
import * as quadrupedRobots from './quadruped-robots'
import * as mobileRobots from './mobile-robots'
import * as serviceRobots from './service-robots'

interface PageModule {
  MODELS: LandingModel[]
  content: LandingContent
}

const PAGES = {
  'quadruped-robots': quadrupedRobots,
  cobots,
  'robot-grippers': robotGrippers,
  'palletizing-robots': palletizingRobots,
  'mobile-robots': mobileRobots,
  'service-robots': serviceRobots,
  'cleaning-robots': cleaningRobots,
} satisfies Record<string, PageModule>

export type CategoryLandingSlug = keyof typeof PAGES

export const CATEGORY_LANDING_SLUGS = Object.keys(PAGES) as CategoryLandingSlug[]

export const isCategoryLanding = (slug: string): slug is CategoryLandingSlug => slug in PAGES

export type LocalizedLandingContent = Localized<LandingContent>
export type LocalizedLandingModel = Localized<LandingModel>
export type LocalizedCommon = Localized<typeof COMMON>

export function getCategoryLanding(slug: CategoryLandingSlug, locale: Locale) {
  const page: PageModule = PAGES[slug]
  return {
    content: localize(page.content, locale) as LocalizedLandingContent,
    models: localize(page.MODELS, locale) as LocalizedLandingModel[],
    common: localize(COMMON, locale) as LocalizedCommon,
  }
}
