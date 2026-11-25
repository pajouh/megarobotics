// The buying pages at /pages/<slug> are Sanity documents, and nothing in the site
// chrome knows about them on its own. This file says where each one is linked from.
// Labels live in messages under industrial.landingPages.

export const LANDING_PAGE_SLUGS = [
  'humanoid-robots',
  'quadruped-robots',
  'cobots',
  'robot-grippers',
  'palletizing-robots',
  'cleaning-robots',
] as const

export type LandingPageSlug = (typeof LANDING_PAGE_SLUGS)[number]

export const landingPagePath = (slug: LandingPageSlug) => `/pages/${slug}`

const FAMILY_LANDING_PAGES: Record<string, LandingPageSlug[]> = {
  'robot-platforms': ['humanoid-robots', 'quadruped-robots', 'cobots'],
  'research-education-embodied-ai': ['humanoid-robots', 'quadruped-robots'],
  'end-effectors-robot-tooling': ['robot-grippers'],
  'robotic-cells-application-packages': ['palletizing-robots'],
  'service-cleaning-facility-robots': ['cleaning-robots'],
}

const SOLUTION_LANDING_PAGES: Record<string, LandingPageSlug[]> = {
  'humanoid-embodied-ai': ['humanoid-robots'],
  'inspection-security': ['quadruped-robots'],
  security: ['quadruped-robots'],
  'research-education': ['humanoid-robots', 'quadruped-robots'],
  'industrial-arms': ['cobots', 'robot-grippers'],
  'palletizing-end-of-line': ['palletizing-robots'],
  'cleaning-facility': ['cleaning-robots'],
}

// Robot technologies (cards on /robot-technologies), by technology id
const TECHNOLOGY_LANDING_PAGES: Record<string, LandingPageSlug> = {
  cobots: 'cobots',
  'quadruped-legged': 'quadruped-robots',
  humanoid: 'humanoid-robots',
  'end-effectors-components': 'robot-grippers',
}

export const landingPageForTechnology = (id: string): LandingPageSlug | undefined => TECHNOLOGY_LANDING_PAGES[id]
export const landingPagesForFamily = (slug: string) => FAMILY_LANDING_PAGES[slug] ?? []
export const landingPagesForSolution = (slug: string) => SOLUTION_LANDING_PAGES[slug] ?? []
