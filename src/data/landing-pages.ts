// The buying pages at /pages/<slug>. Their content lives in src/data/landing/
// (humanoid: src/data/humanoid-robots.ts); nothing in the site chrome knows
// about them on its own. This file says where each one is linked from.
// Labels live in messages under industrial.landingPages.

export const LANDING_PAGE_SLUGS = [
  'humanoid-robots',
  'quadruped-robots',
  'cobots',
  'robot-grippers',
  'palletizing-robots',
  'mobile-robots',
  'service-robots',
  'cleaning-robots',
] as const

export type LandingPageSlug = (typeof LANDING_PAGE_SLUGS)[number]

export const landingPagePath = (slug: LandingPageSlug) => `/pages/${slug}`

const FAMILY_LANDING_PAGES: Record<string, LandingPageSlug[]> = {
  'robot-platforms': ['humanoid-robots', 'quadruped-robots', 'cobots', 'mobile-robots'],
  'research-education-embodied-ai': ['humanoid-robots', 'quadruped-robots'],
  'end-effectors-robot-tooling': ['robot-grippers'],
  'robotic-cells-application-packages': ['palletizing-robots'],
  'service-cleaning-facility-robots': ['service-robots', 'cleaning-robots'],
  'software-hmi-scada-digital-twin': ['mobile-robots'],
  'plc-control-industrial-automation': ['mobile-robots'],
}

const SOLUTION_LANDING_PAGES: Record<string, LandingPageSlug[]> = {
  'humanoid-embodied-ai': ['humanoid-robots'],
  'inspection-security': ['quadruped-robots'],
  security: ['quadruped-robots'],
  'research-education': ['humanoid-robots', 'quadruped-robots'],
  'industrial-arms': ['cobots', 'robot-grippers'],
  'palletizing-end-of-line': ['palletizing-robots', 'robot-grippers'],
  'cleaning-facility': ['cleaning-robots', 'service-robots'],
  'amr-agv': ['mobile-robots'],
}

// Robot technologies (cards on /robot-technologies), by technology id
const TECHNOLOGY_LANDING_PAGES: Record<string, LandingPageSlug> = {
  cobots: 'cobots',
  'quadruped-legged': 'quadruped-robots',
  humanoid: 'humanoid-robots',
  'amr-agv': 'mobile-robots',
  'end-effectors-components': 'robot-grippers',
}

export const landingPageForTechnology = (id: string): LandingPageSlug | undefined => TECHNOLOGY_LANDING_PAGES[id]
export const landingPagesForFamily = (slug: string) => FAMILY_LANDING_PAGES[slug] ?? []
export const landingPagesForSolution = (slug: string) => SOLUTION_LANDING_PAGES[slug] ?? []
