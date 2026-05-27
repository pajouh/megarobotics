import { defineField, defineType } from 'sanity'
import {
  localizedString,
  localizedText,
  localizedBlockContent,
  localizedStringArray,
} from './helpers/localizedFields'

export default defineType({
  name: 'projectStudy',
  title: 'Project / Concept Study',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'content', title: 'Content' },
    { name: 'taxonomy', title: 'Taxonomy' },
    { name: 'settings', title: 'Settings' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    localizedString('title', 'Title', { group: 'basic', required: true }),
    localizedString('subtitle', 'Subtitle', { group: 'basic' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: { source: 'title.en', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'basic',
      description:
        'Use "Concept / Feasibility Study" for scoped concepts. Use "Pilot" or "Deployed" only when the project is real and confirmed.',
      options: {
        list: [
          { title: 'Concept / Feasibility Study', value: 'concept' },
          { title: 'Pilot', value: 'pilot' },
          { title: 'Deployed', value: 'deployed' },
        ],
        layout: 'radio',
      },
      initialValue: 'concept',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      group: 'basic',
      options: { hotspot: true },
    }),
    localizedBlockContent('body', 'Body', { group: 'content' }),
    localizedStringArray('keyTopics', 'Key topics', { group: 'taxonomy' }),
    defineField({
      name: 'industries',
      title: 'Related industries',
      type: 'array',
      group: 'taxonomy',
      of: [{ type: 'reference', to: [{ type: 'industry' }] }],
    }),
    defineField({
      name: 'solutions',
      title: 'Related solutions',
      type: 'array',
      group: 'taxonomy',
      of: [{ type: 'reference', to: [{ type: 'solution' }] }],
    }),
    defineField({
      name: 'robotTechnologies',
      title: 'Related robot technologies',
      type: 'array',
      group: 'taxonomy',
      of: [{ type: 'reference', to: [{ type: 'robotTechnology' }] }],
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      type: 'number',
      group: 'settings',
      initialValue: 0,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'settings',
      initialValue: false,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        localizedString('metaTitle', 'Meta title'),
        localizedText('metaDescription', 'Meta description', { rows: 3 }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title.en', subtitle: 'subtitle.en', status: 'status', media: 'image' },
    prepare({ title, subtitle, status, media }) {
      const statusLabel =
        status === 'concept' ? '[Concept]' : status === 'pilot' ? '[Pilot]' : '[Deployed]'
      return {
        title: title || '(untitled project)',
        subtitle: [statusLabel, subtitle].filter(Boolean).join(' '),
        media,
      }
    },
  },
  orderings: [
    { title: 'Sort order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Title A-Z', name: 'titleAsc', by: [{ field: 'title.en', direction: 'asc' }] },
  ],
})
