// /sanity/schemas/page.ts
import { defineType, defineField } from 'sanity'
import { localizedString, localizedText, localizedBlockContent } from './helpers/localizedFields'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    localizedString('title', 'Title', {
      group: 'content',
      required: true,
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'About', value: 'about' },
          { title: 'Imprint', value: 'imprint' },
          { title: 'Privacy Policy', value: 'privacy' },
          { title: 'Terms of Service', value: 'terms' },
          { title: 'Contact', value: 'contact' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    localizedString('subtitle', 'Subtitle', {
      group: 'content',
      description: 'Optional subtitle shown below the title',
    }),
    localizedBlockContent('body', 'Body', {
      group: 'content',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        localizedString('metaTitle', 'Meta Title'),
        localizedText('metaDescription', 'Meta Description', { rows: 3 }),
      ],
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      group: 'content',
      description: 'When was this page last updated (shown on legal pages)',
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      titleDe: 'title.de',
      pageType: 'pageType',
    },
    prepare({ title, titleDe, pageType }) {
      const displayTitle = title || titleDe || 'Untitled'
      return {
        title: displayTitle,
        subtitle: pageType ? pageType.charAt(0).toUpperCase() + pageType.slice(1) : 'Page',
      }
    },
  },
})
