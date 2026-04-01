import { defineField, defineType } from 'sanity'
import { localizedString, localizedText, localizedStringArray } from './helpers/localizedFields'

export default defineType({
  name: 'manufacturer',
  title: 'Manufacturer',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'details', title: 'Details' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Company Name',
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
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      group: 'basic',
      options: {
        hotspot: true,
      },
    }),
    localizedText('description', 'Description', {
      group: 'basic',
      rows: 4,
    }),
    defineField({
      name: 'website',
      title: 'Official Website',
      type: 'url',
      group: 'details',
    }),
    defineField({
      name: 'headquarters',
      title: 'Headquarters',
      type: 'string',
      group: 'details',
      description: 'e.g., "Hangzhou, China"',
    }),
    defineField({
      name: 'founded',
      title: 'Year Founded',
      type: 'string',
      group: 'details',
    }),
    localizedStringArray('specialties', 'Specialties', {
      group: 'details',
      description: 'e.g., Quadrupeds, Humanoids, Industrial Robots',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'details',
      description: 'Show on homepage',
      initialValue: false,
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
  preview: {
    select: {
      title: 'name',
      subtitle: 'headquarters',
      media: 'logo',
    },
  },
})
