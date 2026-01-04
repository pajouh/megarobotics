import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
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
      title: 'title',
      icon: 'icon',
    },
    prepare(selection) {
      const { title, icon } = selection
      return {
        title: icon ? `${icon} ${title}` : title,
      }
    },
  },
})
