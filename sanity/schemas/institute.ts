import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'institute',
  title: 'Research Institute',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'contact', title: 'Contact' },
    { name: 'content', title: 'Content' },
    { name: 'media', title: 'Media' },
    { name: 'details', title: 'Details' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ===== BASIC INFO =====
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
      group: 'basic',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'e.g. humanoids, soft robotics, autonomous systems',
    }),
    defineField({
      name: 'founded',
      title: 'Year Founded',
      type: 'string',
      group: 'basic',
      description: 'e.g. "1996"',
    }),
    defineField({
      name: 'director',
      title: 'Director / Head',
      type: 'string',
      group: 'basic',
      description: 'e.g. "Prof. Dr. Roland Siegwart"',
    }),
    defineField({
      name: 'staffCount',
      title: 'Staff / Team Size',
      type: 'string',
      group: 'basic',
      description: 'e.g. "~60 researchers" or "25 PhD students, 10 postdocs"',
    }),

    // ===== CONTACT =====
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
      description: 'Public contact email',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'address',
      title: 'Full Address',
      type: 'text',
      group: 'contact',
      rows: 3,
      description: 'Street, building, postal code, city, country',
    }),
    defineField({
      name: 'website',
      title: 'Official Website',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({ name: 'twitter', title: 'Twitter / X', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube', type: 'url' }),
        defineField({ name: 'github', title: 'GitHub', type: 'url' }),
        defineField({ name: 'googleScholar', title: 'Google Scholar', type: 'url' }),
      ],
    }),
    defineField({
      name: 'openPositionsUrl',
      title: 'Open Positions / Careers URL',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'publicationsUrl',
      title: 'Publications Page URL',
      type: 'url',
      group: 'contact',
    }),

    // ===== CONTENT =====
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      group: 'content',
      rows: 4,
      description: '2–4 sentence intro shown at the top of the profile',
    }),
    defineField({
      name: 'body',
      title: 'Full Description',
      type: 'blockContent',
      group: 'content',
      description: 'Rich text with images, videos, tables, stats etc. This is the main content area.',
    }),
    defineField({
      name: 'keyProjects',
      title: 'Key Projects / Highlights',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Project Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
            defineField({ name: 'url', title: 'Project URL', type: 'url' }),
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),

    // ===== MEDIA =====
    defineField({
      name: 'logo',
      title: 'Institute Logo',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text' },
        { name: 'caption', type: 'string', title: 'Caption' },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      group: 'media',
      description: 'YouTube or Vimeo URL for an intro/overview video',
    }),

    // ===== DETAILS (internal) =====
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

    // ===== SEO =====
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
      title: 'Name A\u2192Z',
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
      media: 'logo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle || undefined,
        media,
      }
    },
  },
})
