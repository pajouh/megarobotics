export interface IndustrialImage {
  src: string
  alt: string
  /** Image is wider than 16:9 — use object-cover */
  cover?: boolean
}

export const heroImage: IndustrialImage = {
  src: '/images/industrial/hero.png',
  alt: 'Industrial robotics and automation',
}

/**
 * Map of stable IDs (used in messages JSON) to image assets.
 * IDs that are not in this map render the card without an image.
 */
export const solutionImages: Record<string, IndustrialImage> = {
  'industrial-arms': {
    src: '/images/industrial/industrial-automation.png',
    alt: 'Industrial robotic arm in a manufacturing cell',
  },
  'high-speed-picking': {
    src: '/images/industrial/application-solution.png',
    alt: 'High-speed parallel robotic picking line',
  },
  'amr-agv': {
    src: '/images/industrial/mobile-robots-intralogistics.png',
    alt: 'Autonomous mobile robot transporting materials in a warehouse',
  },
  'sanding-polishing-painting': {
    src: '/images/industrial/application-solution.png',
    alt: 'Robotic surface-finishing cell',
  },
  'inspection-security': {
    src: '/images/industrial/inspection-security.png',
    alt: 'Mobile inspection robot in an industrial facility',
  },
  'research-education': {
    src: '/images/industrial/humanoid-ai-robotics.png',
    alt: 'Humanoid and research robotics platforms',
  },
  'humanoid-embodied-ai': {
    src: '/images/industrial/humanoid-ai-robotics.png',
    alt: 'Humanoid robotic platform for embodied AI research',
  },
}

export const robotTechnologyImages: Record<string, IndustrialImage> = {
  'industrial-arms': {
    src: '/images/industrial/industrial-automation.png',
    alt: 'Industrial robotic arm in production',
  },
  cobots: {
    src: '/images/industrial/industrial-automation.png',
    alt: 'Collaborative robot in a manufacturing cell',
  },
  'amr-agv': {
    src: '/images/industrial/mobile-robots-intralogistics.png',
    alt: 'Autonomous mobile robot in a warehouse',
  },
  'quadruped-legged': {
    src: '/images/industrial/inspection-security.png',
    alt: 'Quadruped inspection robot in an industrial environment',
  },
  humanoid: {
    src: '/images/industrial/humanoid-ai-robotics.png',
    alt: 'Humanoid robotic platform',
  },
  'end-effectors-components': {
    src: '/images/industrial/components-end-effectors.png',
    alt: 'Robotic end effectors and components',
  },
}
