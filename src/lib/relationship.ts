import type { RelationshipStatus } from '@/types'

/**
 * Statuses MegaRobotics may state publicly as a verified commercial relationship.
 *
 * Everything else in the RelationshipStatus union (sourcing_available,
 * information_only, under_evaluation, unknown) describes a non-relationship and
 * must never render as a badge — the schema defaults to 'unknown' precisely so
 * an unset field cannot become an unintended claim.
 */
export const VERIFIED_RELATIONSHIPS: RelationshipStatus[] = [
  'official_distributor',
  'authorized_reseller',
  'sales_partner',
  'technology_partner',
]

/** Maps a status onto its `industrial.productDetail.relationship.*` message key. */
export function relStatusToKey(s: RelationshipStatus): string {
  return {
    official_distributor: 'officialDistributor',
    authorized_reseller: 'authorizedReseller',
    sales_partner: 'salesPartner',
    technology_partner: 'technologyPartner',
    sourcing_available: 'sourcingAvailable',
    information_only: 'informationOnly',
    under_evaluation: 'underEvaluation',
    unknown: 'unknown',
  }[s]
}

/** True when `status` may be shown as a verified-relationship badge. */
export function isVerifiedRelationship(status?: RelationshipStatus | null): status is RelationshipStatus {
  return !!status && VERIFIED_RELATIONSHIPS.includes(status)
}
