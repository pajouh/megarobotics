import { defineField, defineType } from 'sanity'
import { localizedString, localizedText } from './helpers/localizedFields'

export default defineType({
  name: 'productCategory',
  title: 'Product Category',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    localizedString('name', 'Category Name', {
      group: 'content',
      required: true,
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'name.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    localizedText('description', 'Description', {
      group: 'content',
      rows: 3,
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      group: 'content',
      description: 'Emoji or icon identifier',
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      group: 'content',
      initialValue: 0,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      description: 'Override auto-generated SEO metadata. Leave blank to use name/description as defaults.',
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
  orderings: [
    {
      title: 'Sort Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name.en',
      titleDe: 'name.de',
      subtitle: 'description.en',
      media: 'image',
    },
    prepare(selection) {
      const { title, titleDe, subtitle, media } = selection
      const displayTitle = title || titleDe || 'Untitled'
      return {
        title: displayTitle,
        subtitle: subtitle ? subtitle.substring(0, 50) + '...' : '',
        media,
      }
    },
  },
})
