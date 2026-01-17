import { defineField, defineType } from 'sanity'
import { localizedString, localizedText } from './helpers/localizedFields'

export default defineType({
  name: 'productCategory',
  title: 'Product Category',
  type: 'document',
  fields: [
    localizedString('name', 'Category Name', {
      required: true,
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    localizedText('description', 'Description', {
      rows: 3,
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Emoji or icon identifier',
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
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
