import { defineField, defineType } from 'sanity'
import { localizedString, localizedText, localizedBlockContent } from './helpers/localizedFields'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'Meta' },
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
    localizedText('excerpt', 'Excerpt', {
      group: 'content',
      rows: 3,
      description: 'A short description for article previews',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    localizedBlockContent('body', 'Body', {
      group: 'content',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'meta',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'meta',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'meta',
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
      group: 'meta',
      validation: (Rule) => Rule.min(1).max(60),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
      description: 'Show this article in the featured section',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      description: 'Override auto-generated SEO metadata. Leave blank to use title/excerpt as defaults.',
      fields: [
        localizedString('metaTitle', 'Meta Title', {
          description: 'Custom title for search engines (max 60 chars recommended)',
        }),
        localizedText('metaDescription', 'Meta Description', {
          rows: 3,
          description: 'Custom description for search engines (max 160 chars recommended)',
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          options: { layout: 'tags' },
          description: 'SEO keywords / tags',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      titleDe: 'title.de',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, titleDe, author, media } = selection
      return {
        title: title || titleDe || 'Untitled',
        subtitle: author && `by ${author}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
