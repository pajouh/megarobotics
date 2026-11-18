import type { Metadata } from 'next'
import Fragenkatalog from './Fragenkatalog'

// Private customer page (Rheinkalk / Lhoist): unlisted, noindexed and behind an
// access code. Lives outside [locale] on purpose, like the /lhoist1 presentation.
export const metadata: Metadata = {
  title: { absolute: 'Fragenkatalog Inspektionsroboter – MegaRobotics × Rheinkalk' },
  description: 'Interaktiver Fragenkatalog für das Kalkwerk Wülfrath.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <Fragenkatalog />
}
