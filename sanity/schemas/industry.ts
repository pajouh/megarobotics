import { defineField, defineType } from 'sanity'
import {
  localizedString,
  localizedText,
  localizedBlockContent,
  localizedStringArray,
} from './helpers/localizedFields'

export default defineType({
  name: 'industry',
  title: 'Industry',
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
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: { source: 'title.en', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    localizedText('excerpt', 'Excerpt', { group: 'basic', rows: 3 }),
    defineField({
      name: 'icon',
      title: 'Icon key',
      type: 'string',
      group: 'basic',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      group: 'basic',
      options: { hotspot: true },
    }),
    localizedBlockContent('body', 'Body', { group: 'content' }),
    localizedStringArray('applications', 'Application areas', { group: 'taxonomy' }),
    defineField({
      name: 'solutions',
      title: 'Related solutions',
      type: 'array',
      group: 'taxonomy',
      of: [{ type: 'reference', to: [{ type: 'solution' }] }],
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
    select: { title: 'title.en', subtitle: 'excerpt.en', media: 'image' },
    prepare({ title, subtitle, media }) {
      return { title: title || '(untitled industry)', subtitle, media }
    },
  },
  orderings: [
    { title: 'Sort order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Title A-Z', name: 'titleAsc', by: [{ field: 'title.en', direction: 'asc' }] },
  ],
})
