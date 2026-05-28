/**
 * Static fallback data for the 12 product families.
 *
 * Used when a corresponding `productFamily` document does not yet exist
 * in Sanity. Once a Studio editor creates a doc with a matching `slug`,
 * the Sanity content takes precedence on the category landing pages.
 *
 * All visible text lives in messages/*.json under
 * `industrial.catalog.families.<slug>`. This file only carries structure
 * (slug, icon, order).
 */
export interface ProductFamilyFallback {
  slug: string
  /** Lucide-react icon name */
  icon: string
  order: number
}

export const productFamilyFallbacks: ProductFamilyFallback[] = [
  { slug: 'robot-platforms', icon: 'Cpu', order: 10 },
  { slug: 'end-effectors-robot-tooling', icon: 'Wrench', order: 20 },
  { slug: 'motion-actuators-drives', icon: 'Settings2', order: 30 },
  { slug: 'plc-control-industrial-automation', icon: 'Cog', order: 40 },
  { slug: 'sensors-vision-perception', icon: 'Eye', order: 50 },
  { slug: 'safety-machine-protection', icon: 'ShieldCheck', order: 60 },
  { slug: 'industrial-communication-connectivity', icon: 'Network', order: 70 },
  { slug: 'software-hmi-scada-digital-twin', icon: 'MonitorCog', order: 80 },
  { slug: 'robotic-cells-application-packages', icon: 'Layers', order: 90 },
  { slug: 'service-cleaning-facility-robots', icon: 'Bot', order: 100 },
  { slug: 'research-education-embodied-ai', icon: 'GraduationCap', order: 110 },
  { slug: 'spare-parts-modules-accessories', icon: 'Package', order: 120 },
]

export function getFamilyFallback(slug: string): ProductFamilyFallback | undefined {
  return productFamilyFallbacks.find((f) => f.slug === slug)
}
