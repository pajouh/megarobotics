// Products and articles that are no longer published but still show up in search
// results. Instead of a 404 they lead to the buying page for the same kind of robot.
// The map is only used while the product or article is inactive, so switching one
// back on in Sanity brings its own page back without a change here.
import { landingPagePath, type LandingPageSlug } from './landing-pages'

const RETIRED_PRODUCTS: Record<string, LandingPageSlug> = {
  'agibot-d1ultra': 'quadruped-robots',
  'pudu-d5-w': 'quadruped-robots',
  'unitree-a2': 'quadruped-robots',
  'unitree-b2': 'quadruped-robots',
  'unitree-go2': 'quadruped-robots',
  'unitree-go2-w': 'quadruped-robots',
  'fourier-gr-1': 'humanoid-robots',
  'pudu-d9': 'humanoid-robots',
  'ubtech-walker-x': 'humanoid-robots',
  'unitree-g1': 'humanoid-robots',
  'elite-robot-ec66': 'cobots',
  'estun-ecr5': 'cobots',
  'siasun-gcr5-910': 'cobots',
  'festo-dhef-vacuum-gripper': 'robot-grippers',
  'robotiq-2f-85-adaptive-gripper': 'robot-grippers',
  'schunk-pgn-plus-p-parallel-gripper': 'robot-grippers',
  'zimmer-geh6000il-electric-gripper': 'robot-grippers',
  'keenon-w3-cleaning': 'cleaning-robots',
}

const RETIRED_ARTICLES: Record<string, LandingPageSlug> = {
  'game-changing-quadruped-robot': 'quadruped-robots',
  'quadruped-robots-applications': 'quadruped-robots',
}

const target = (map: Record<string, LandingPageSlug>, slug: string) =>
  Object.hasOwn(map, slug) ? landingPagePath(map[slug]) : null

export const retiredProductTarget = (slug: string) => target(RETIRED_PRODUCTS, slug)
export const retiredArticleTarget = (slug: string) => target(RETIRED_ARTICLES, slug)
