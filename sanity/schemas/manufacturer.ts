import { defineField, defineType } from 'sanity'
import { localizedText, localizedStringArray } from './helpers/localizedFields'

export default defineType({
  name: 'manufacturer',
  title: 'Manufacturer',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'details', title: 'Details' },
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
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'headquarters',
      media: 'logo',
    },
  },
})
