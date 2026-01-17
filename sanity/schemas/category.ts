import { defineField, defineType } from 'sanity'
import { localizedString, localizedText } from './helpers/localizedFields'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    localizedString('title', 'Title', {
      required: true,
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
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
      description: 'An emoji to represent this category (e.g., 🤖)',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color code (e.g., #10b981)',
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      titleDe: 'title.de',
      icon: 'icon',
    },
    prepare(selection) {
      const { title, titleDe, icon } = selection
      const displayTitle = title || titleDe || 'Untitled'
      return {
        title: icon ? `${icon} ${displayTitle}` : displayTitle,
      }
    },
  },
})
