// /sanity/schemas/richImage.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'richImage',
  title: 'Rich Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'Describes the image for screen readers and SEO. Be specific and descriptive.',
      validation: (Rule) => Rule.required().min(10).max(200),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption displayed below the image.',
    }),
    defineField({
      name: 'credit',
      title: 'Credit / Attribution',
      type: 'string',
      description: 'Who owns or created this image (e.g., "Boston Dynamics").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      description: 'Original source page where this image can be found.',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'licenseUrl',
      title: 'License URL',
      type: 'url',
      description: 'Link to the license or terms of use for this image.',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),
  ],
  preview: {
    select: {
      alt: 'alt',
      credit: 'credit',
      media: 'image',
    },
    prepare({ alt, credit, media }) {
      return {
        title: alt || 'No alt text',
        subtitle: credit ? `Credit: ${credit}` : 'No credit',
        media,
      }
    },
  },
})
