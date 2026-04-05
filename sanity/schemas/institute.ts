import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'institute',
  title: 'Research Institute',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'details', title: 'Details' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Center/Lab Name',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required(),
      description: 'e.g. "IRIS – Institute of Robotics and Intelligent Systems"',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: {
        source: (doc) => {
          const parent = (doc as { parentInstitution?: string }).parentInstitution || ''
          const name = (doc as { name?: string }).name || ''
          return `${parent} ${name}`
        },
        maxLength: 80,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'parentInstitution',
      title: 'Parent Institution',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required(),
      description: 'e.g. "ETH Zurich"',
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'DACH', value: 'DACH' },
          { title: 'Global', value: 'Global' },
        ],
      },
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      group: 'basic',
    }),
    defineField({
      name: 'centerType',
      title: 'Center Type',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          { title: 'Institute', value: 'Institute' },
          { title: 'Laboratory', value: 'Laboratory' },
          { title: 'Center', value: 'Center' },
          { title: 'Department', value: 'Department' },
          { title: 'Umbrella network', value: 'Umbrella network' },
        ],
      },
    }),
    defineField({
      name: 'focusAreas',
      title: 'Focus Areas',
      type: 'array',
      group: 'details',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'e.g. humanoids, soft robotics, autonomous systems',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      group: 'details',
      rows: 4,
      description: '2–4 sentence human-written intro',
    }),
    defineField({
      name: 'website',
      title: 'Official Website',
      type: 'url',
      group: 'details',
    }),
    defineField({
      name: 'outreachPriority',
      title: 'Outreach Priority',
      type: 'number',
      group: 'details',
      description: '1 = high priority, 2 = normal',
      validation: (Rule) => Rule.min(1).max(2),
    }),
    defineField({
      name: 'profileStatus',
      title: 'Profile Status',
      type: 'string',
      group: 'details',
      options: {
        list: [
          { title: 'Ready', value: 'Ready' },
          { title: 'Foundational', value: 'Foundational' },
          { title: 'Needs enrichment', value: 'Needs enrichment' },
        ],
      },
    }),
    defineField({
      name: 'verifiedDate',
      title: 'Verified Date',
      type: 'date',
      group: 'details',
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      group: 'details',
      rows: 3,
      description: 'Internal notes, not shown publicly',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      description: 'Override auto-generated SEO metadata.',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Custom title for search engines (max 60 chars)',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Custom description for search engines (max 160 chars)',
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          options: { layout: 'tags' },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Name A→Z',
      name: 'nameAsc',
      by: [{ field: 'country', direction: 'asc' }, { field: 'name', direction: 'asc' }],
    },
    {
      title: 'Priority',
      name: 'priorityAsc',
      by: [{ field: 'outreachPriority', direction: 'asc' }, { field: 'name', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'parentInstitution',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `${subtitle}` : undefined,
      }
    },
  },
})
