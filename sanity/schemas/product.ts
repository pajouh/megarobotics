import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Product Category',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short marketing tagline',
    }),
    defineField({
      name: 'description',
      title: 'Brief Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
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
      description: 'YouTube or video embed URL',
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
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
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'applications',
      title: 'Applications',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Use cases for this product',
    }),
    defineField({
      name: 'priceRange',
      title: 'Price Range',
      type: 'string',
      description: 'e.g., "$1,600", "$10,000-50,000", "Contact for pricing"',
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
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
    }),
    defineField({
      name: 'datasheetUrl',
      title: 'Datasheet URL',
      type: 'url',
      description: 'Link to PDF datasheet',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isNew',
      title: 'New Product',
      type: 'boolean',
      description: 'Show "New" badge',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
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
