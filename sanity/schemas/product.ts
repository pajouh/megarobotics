import { defineField, defineType } from 'sanity'
import { localizedString, localizedText, localizedBlockContent, localizedStringArray } from './helpers/localizedFields'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'content', title: 'Content' },
    { name: 'media', title: 'Media' },
    { name: 'specs', title: 'Specifications' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'manufacturer',
      title: 'Manufacturer',
      type: 'reference',
      to: [{ type: 'manufacturer' }],
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Product Category',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    localizedString('tagline', 'Tagline', {
      group: 'content',
      description: 'Short marketing tagline',
    }),
    localizedText('description', 'Brief Description', {
      group: 'content',
      rows: 3,
    }),
    localizedBlockContent('fullDescription', 'Full Description', {
      group: 'content',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      group: 'media',
      description: 'YouTube or video embed URL',
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      group: 'specs',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value',
            },
          },
        },
      ],
    }),
    localizedStringArray('features', 'Key Features', {
      group: 'specs',
    }),
    localizedStringArray('applications', 'Applications', {
      group: 'specs',
      description: 'Use cases for this product',
    }),
    defineField({
      name: 'priceRange',
      title: 'Price Range',
      type: 'string',
      group: 'settings',
      description: 'e.g., "$1,600", "$10,000-50,000", "Contact for pricing"',
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Pre-order', value: 'preorder' },
          { title: 'Coming Soon', value: 'coming_soon' },
          { title: 'Contact for Availability', value: 'contact' },
        ],
      },
      initialValue: 'available',
    }),
    defineField({
      name: 'productUrl',
      title: 'Official Product URL',
      type: 'url',
      group: 'settings',
    }),
    defineField({
      name: 'datasheetUrl',
      title: 'Datasheet URL',
      type: 'url',
      group: 'settings',
      description: 'Link to PDF datasheet',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      group: 'settings',
      initialValue: false,
    }),
    defineField({
      name: 'isNew',
      title: 'New Product',
      type: 'boolean',
      group: 'settings',
      description: 'Show "New" badge',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'settings',
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      group: 'settings',
      description: 'Sort order within category',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredDesc',
      by: [{ field: 'featured', direction: 'desc' }],
    },
    {
      title: 'Sort Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'manufacturer.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title,
        subtitle: subtitle ? `by ${subtitle}` : 'No manufacturer',
        media,
      }
    },
  },
})
