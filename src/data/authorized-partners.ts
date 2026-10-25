/**
 * Brands MegaRobotics is an authorized reseller for, in the order the
 * business wants them shown. Logos live in /public/partners (official files
 * from each brand's site, trimmed); `slug` is the Sanity manufacturer slug.
 */
export interface AuthorizedPartner {
  slug: string
  name: string
  logo: string
  /** Intrinsic logo size, for next/image and to balance visual weight. */
  logoWidth: number
  logoHeight: number
  country: { en: string; de: string }
  focus: { en: string; de: string }
}

export const authorizedPartners: AuthorizedPartner[] = [
  {
    slug: 'agile-robots',
    name: 'Agile Robots',
    logo: '/partners/agile-robots.svg',
    logoWidth: 641,
    logoHeight: 101,
    country: { en: 'Germany', de: 'Deutschland' },
    focus: {
      en: 'Force-controlled cobots, humanoids and dexterous hands',
      de: 'Kraftgeregelte Cobots, Humanoide und Roboterhände',
    },
  },
  {
    slug: 'limx-dynamics',
    name: 'LimX Dynamics',
    logo: '/partners/limx-dynamics.png',
    logoWidth: 1200,
    logoHeight: 377,
    country: { en: 'China', de: 'China' },
    focus: {
      en: 'Humanoid and wheel-legged robots for embodied AI',
      de: 'Humanoide und Rad-Bein-Roboter für Embodied AI',
    },
  },
  {
    slug: 'magiclab',
    name: 'MagicLab',
    logo: '/partners/magiclab.png',
    logoWidth: 1000,
    logoHeight: 219,
    country: { en: 'China', de: 'China' },
    focus: {
      en: 'General-purpose humanoid and quadruped robots',
      de: 'Universelle humanoide und vierbeinige Roboter',
    },
  },
  {
    slug: 'onrobot',
    name: 'OnRobot',
    logo: '/partners/onrobot.svg',
    logoWidth: 1065,
    logoHeight: 427,
    country: { en: 'Denmark', de: 'Dänemark' },
    focus: {
      en: 'Plug-and-play grippers and end effectors for cobots',
      de: 'Plug-and-Play-Greifer und Endeffektoren für Cobots',
    },
  },
  {
    slug: 'dh-robotics',
    name: 'DH-Robotics',
    logo: '/partners/dh-robotics.png',
    logoWidth: 244,
    logoHeight: 182,
    country: { en: 'China', de: 'China' },
    focus: {
      en: 'Electric grippers, rotary grippers and actuators',
      de: 'Elektrische Greifer, Drehgreifer und Aktuatoren',
    },
  },
  {
    slug: 'atom-robot',
    name: 'Atom Robot',
    logo: '/partners/atom-robot.png',
    logoWidth: 900,
    logoHeight: 171,
    country: { en: 'China', de: 'China' },
    focus: {
      en: 'Delta, SCARA and cobot palletizing robots',
      de: 'Delta-, SCARA- und Cobot-Palettierroboter',
    },
  },
  {
    slug: 'franka-robotics',
    name: 'Franka Robotics',
    logo: '/partners/franka-robotics.svg',
    logoWidth: 995,
    logoHeight: 162,
    country: { en: 'Germany', de: 'Deutschland' },
    focus: {
      en: 'Force-sensitive robot arms for research and AI',
      de: 'Kraftsensitive Roboterarme für Forschung und KI',
    },
  },
]
