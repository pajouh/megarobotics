import type { AvailabilityStatus } from '@/types'

/**
 * The availability status to show for a product, if any.
 *
 * "Sourcing on request" is still stored in the CMS but is not shown as a tag or
 * offered as a filter: the catalogue lists products MegaRobotics distributes.
 */
export function visibleAvailability(status?: AvailabilityStatus | string | null): AvailabilityStatus | undefined {
  return status && status !== 'sourcing_on_request' ? (status as AvailabilityStatus) : undefined
}
