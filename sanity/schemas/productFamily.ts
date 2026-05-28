import { defineField, defineType } from 'sanity'
import {
  localizedString,
  localizedText,
  localizedBlockContent,
  localizedStringArray,
} from './helpers/localizedFields'

export default defineType({
  name: 'productFamily',
  title: 'Product Family',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'taxonomy', title: 'Taxonomy' },
    { name: 'content', title: 'Content' },
    { name: 'ecosystem', title: 'Reference Ecosystems' },
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
      description: 'Used in /products/categories/<slug> URLs.',
    }),
    localizedText('shortDescription', 'Short description', {
      group: 'basic',
      rows: 3,
      description: 'One- or two-sentence summary used on family cards.',
    }),
    defineField({
      name: 'icon',
      title: 'Icon key',
      type: 'string',
      group: 'basic',
      description: 'Optional lucide-react icon name (e.g. "Cpu", "Cog", "Truck").',
    }),
    defineField({
      name: 'image',
      title: 'Family image',
      type: 'image',
      group: 'basic',
      options: { hotspot: true },
    }),
    localizedBlockContent('body', 'Body', {
      group: 'content',
      description: 'Long-form description shown on the category landing page.',
    }),
    localizedStringArray('subcategories', 'Subcategories', {
      group: 'taxonomy',
      description:
        'Suggested subcategory labels for this family (e.g. "Mechanical grippers", "Electric grippers"). Used as a reference list when editing products — product.subcategory is a free-form string that should match one of these.',
    }),
    localizedStringArray('applications', 'Typical applications', {
      group: 'taxonomy',
    }),
    localizedStringArray('selectionCriteria', 'Selection criteria', {
      group: 'taxonomy',
    }),
    defineField({
      name: 'referenceEcosystems',
      title: 'Reference ecosystems',
      type: 'array',
      group: 'ecosystem',
      of: [{ type: 'reference', to: [{ type: 'referenceEcosystem' }] }],
      description:
        'Common industrial ecosystems shown on this family\'s category page. Only ecosystems referenced here will appear publicly — leave empty to hide the section.',
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
      description: 'Show prominently on /products and the homepage family grid.',
      initialValue: false,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      group: 'settings',
      description: 'Uncheck to hide from the public site without deleting.',
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
    select: { title: 'title.en', subtitle: 'shortDescription.en', media: 'image' },
    prepare({ title, subtitle, media }) {
      return { title: title || '(untitled family)', subtitle, media }
    },
  },
  orderings: [
    { title: 'Sort order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Title A-Z', name: 'titleAsc', by: [{ field: 'title.en', direction: 'asc' }] },
  ],
})
