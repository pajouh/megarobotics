import { icons, type LucideProps } from 'lucide-react'

interface LucideIconProps extends LucideProps {
  /** PascalCase lucide icon name, e.g. "Cog", "Truck". */
  name?: string
}

/**
 * Renders a lucide-react icon looked up by its string name (as stored in
 * Sanity). Returns null when no name is given or the name is unknown, so
 * callers can pass CMS values straight through without guarding.
 */
export default function LucideIcon({ name, ...props }: LucideIconProps) {
  if (!name) return null
  const Icon = icons[name as keyof typeof icons]
  if (!Icon) return null
  return <Icon {...props} />
}
