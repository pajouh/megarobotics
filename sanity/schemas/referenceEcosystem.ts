import { defineField, defineType } from 'sanity'
import { localizedString, localizedText } from './helpers/localizedFields'

/**
 * Reference Ecosystem — a third-party brand or technology stack
 * (e.g. Siemens TIA Portal, Festo, SICK) shown on category pages
 * as a "common industrial ecosystem" reference, NOT as a sold or
 * officially distributed product unless relationshipStatus is set
 * to a verified value.
 *
 * Pages render only the ecosystems explicitly tagged here in Studio.
 * Default status is information_only so accidentally adding an
 * unverified brand does not imply a commercial relationship.
 */
export default defineType({
  name: 'referenceEcosystem',
  title: 'Reference Ecosystem',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'status', title: 'Relationship & disclaimer' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Brand / ecosystem name',
      type: 'string',
      group: 'basic',
      description: 'Brand names are typically not translated (e.g. "Siemens", "Festo", "SICK").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: { source: 'name', maxLength: 96 },
    }),
    localizedText('shortDescription', 'Short description', {
      group: 'basic',
      rows: 2,
      description: 'One-line context (e.g. "Industrial PLCs and motion controllers").',
    }),
    defineField({
      name: 'category',
      title: 'Ecosystem category',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'PLC / Control', value: 'plc' },
          { title: 'Drives / Motion', value: 'drives' },
          { title: 'Actuators / Pneumatics', value: 'actuators' },
          { title: 'Sensors / Vision', value: 'sensors' },
          { title: 'Grippers / End-effectors', value: 'grippers' },
          { title: 'Safety', value: 'safety' },
          { title: 'Industrial communication', value: 'communication' },
          { title: 'Software / HMI / SCADA', value: 'software' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'logo',
      title: 'Logo (optional)',
      type: 'image',
      group: 'basic',
      description:
        'Only upload if you have explicit permission to display this logo. Trademarks remain the property of their respective owners.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Official website',
      type: 'url',
      group: 'basic',
    }),
    defineField({
      name: 'relatedFamilies',
      title: 'Related product families',
      type: 'array',
      group: 'basic',
      of: [{ type: 'reference', to: [{ type: 'productFamily' }] }],
    }),
    defineField({
      name: 'relationshipStatus',
      title: 'Relationship status',
      type: 'string',
      group: 'status',
      description:
        'Defines how this ecosystem may be described publicly. Defaults to "Information only" — change ONLY when status is legally verified.',
      options: {
        list: [
          { title: 'Official distributor (verified)', value: 'official_distributor' },
          { title: 'Authorized reseller (verified)', value: 'authorized_reseller' },
          { title: 'Sales partner (verified)', value: 'sales_partner' },
          { title: 'Technology partner (verified)', value: 'technology_partner' },
          { title: 'Sourcing available', value: 'sourcing_available' },
          { title: 'Information only (default)', value: 'information_only' },
          { title: 'Under evaluation', value: 'under_evaluation' },
          { title: 'Unknown', value: 'unknown' },
        ],
        layout: 'radio',
      },
      initialValue: 'information_only',
      validation: (Rule) => Rule.required(),
    }),
    localizedText('disclaimerOverride', 'Disclaimer override', {
      group: 'status',
      rows: 3,
      description:
        'Optional. Overrides the default "common industrial ecosystem" disclaimer when shown publicly. Leave blank to use the site-wide default.',
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      type: 'number',
      group: 'settings',
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      status: 'relationshipStatus',
      media: 'logo',
    },
    prepare({ title, subtitle, status, media }) {
      const statusLabel =
        status === 'official_distributor' ? '✓ Official distributor'
        : status === 'authorized_reseller' ? '✓ Authorized reseller'
        : status === 'sales_partner' ? '✓ Sales partner'
        : status === 'technology_partner' ? '✓ Technology partner'
        : status === 'sourcing_available' ? '• Sourcing available'
        : status === 'under_evaluation' ? '• Under evaluation'
        : status === 'unknown' ? '? Unknown'
        : 'ⓘ Information only'
      return {
        title,
        subtitle: [subtitle, statusLabel].filter(Boolean).join(' — '),
        media,
      }
    },
  },
  orderings: [
    { title: 'Sort order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Name A-Z', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] },
  ],
})
