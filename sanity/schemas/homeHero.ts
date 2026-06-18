// /sanity/schemas/homeHero.ts
import { defineType, defineField } from 'sanity'
import { localizedString, localizedText } from './helpers/localizedFields'

export default defineType({
  name: 'homeHero',
  title: 'Homepage Hero',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'buttons', title: 'Buttons' },
    { name: 'media', title: 'Media' },
  ],
  fields: [
    // Content
    localizedString('eyebrow', 'Eyebrow', {
      group: 'content',
      description: 'Small label above the title (e.g. "Industrial Robotics & Automation")',
    }),
    localizedString('title', 'Title', {
      group: 'content',
      required: true,
      description: 'Main hero headline',
    }),
    localizedText('subtitle', 'Subtitle', {
      group: 'content',
      rows: 4,
      description: 'Supporting paragraph below the title',
    }),

    // Buttons
    localizedString('primaryCtaLabel', 'Primary Button Label', {
      group: 'buttons',
      description: 'e.g. "Discuss an Automation Project"',
    }),
    defineField({
      name: 'primaryCtaHref',
      title: 'Primary Button Link',
      type: 'string',
      group: 'buttons',
      description: 'Path or URL, e.g. "/contact"',
      initialValue: '/contact',
    }),
    localizedString('secondaryCtaLabel', 'Secondary Button Label', {
      group: 'buttons',
      description: 'e.g. "Explore Robotics Solutions"',
    }),
    defineField({
      name: 'secondaryCtaHref',
      title: 'Secondary Button Link',
      type: 'string',
      group: 'buttons',
      description: 'Path or URL, e.g. "/solutions"',
      initialValue: '/solutions',
    }),

    // Media
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      description: 'Shown alongside the hero text. Leave empty to use the bundled default image.',
    }),
    localizedString('imageAlt', 'Hero Image Alt Text', {
      group: 'media',
      description: 'Accessible description of the hero image',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Homepage Hero' }
    },
  },
})
