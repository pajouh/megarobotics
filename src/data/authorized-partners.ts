/**
 * Brands shown in the partner block, in the order the business wants them:
 * those MegaRobotics is an authorized reseller for, our own brand, and brands
 * we supply without a reseller agreement (`sourced`). Logos live in /public/partners (official files
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
  /**
   * Our own brand rather than a brand we resell. It shows in the showcase with
   * an "Own brand" badge, but stays out of the reseller marquee, the
   * "authorized brands" count and the "Authorized" product badge.
   */
  ownBrand?: boolean
  /**
   * A brand we supply without a signed reseller agreement. Its card carries a
   * neutral "Available from us" badge, and like our own brand it stays out of
   * the marquee, the "authorized brands" count and the "Authorized" badges.
   * Remove the flag once the agreement is signed, and raise the brand count in
   * messages/*.json (industrial.partners).
   */
  sourced?: boolean
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
    slug: 'megarobotics',
    name: 'MegaRobotics',
    logo: '/partners/megarobotics.webp',
    logoWidth: 796,
    logoHeight: 134,
    country: { en: 'Germany', de: 'Deutschland' },
    focus: {
      en: 'Our own quadruped and wheel-legged robots: the M1, M40 and M100 series',
      de: 'Eigene Lauf- und Rad-Bein-Roboter: die Serien M1, M40 und M100',
    },
    ownBrand: true,
  },
  {
    slug: 'limx-dynamics',
    name: 'LimX Dynamics',
    logo: '/partners/limx-dynamics.webp',
    logoWidth: 573,
    logoHeight: 180,
    country: { en: 'China', de: 'China' },
    focus: {
      en: 'Humanoid and wheel-legged robots for embodied AI',
      de: 'Humanoide und Rad-Bein-Roboter für Embodied AI',
    },
  },
  {
    slug: 'magiclab',
    name: 'MagicLab',
    logo: '/partners/magiclab.webp',
    logoWidth: 822,
    logoHeight: 180,
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
    logo: '/partners/atom-robot.webp',
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
  {
    slug: 'seer-robotics',
    name: 'SEER Robotics',
    logo: '/partners/seer-robotics.webp',
    logoWidth: 1101,
    logoHeight: 120,
    country: { en: 'China', de: 'China' },
    focus: {
      en: 'Mobile robot controllers, autonomous forklifts and AMRs',
      de: 'Steuerungen für mobile Roboter, autonome Gabelstapler und AMR',
    },
    sourced: true,
  },
  {
    slug: 'orionstar',
    name: 'OrionStar',
    logo: '/partners/orionstar.webp',
    logoWidth: 639,
    logoHeight: 140,
    country: { en: 'China', de: 'China' },
    focus: {
      en: 'Service robots for delivery, cleaning and reception',
      de: 'Serviceroboter für Lieferung, Reinigung und Empfang',
    },
    sourced: true,
  },
]

/** The brands we are an authorized reseller for: neither our own nor merely sourced. */
export const resellerPartners = authorizedPartners.filter((p) => !p.ownBrand && !p.sourced)
