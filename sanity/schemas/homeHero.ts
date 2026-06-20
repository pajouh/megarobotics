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
      description: 'Accessible description of the hero image. Used when no carousel slides are set.',
    }),

    // Carousel — when one or more slides exist, the hero shows a carousel
    // instead of the single Hero Image above. Leave empty to keep the single image.
    defineField({
      name: 'slides',
      title: 'Carousel Slides',
      type: 'array',
      group: 'media',
      description:
        'Image and/or video slides shown in the hero. Leave empty to use the single Hero Image above.',
      of: [
        defineField({
          name: 'heroSlide',
          title: 'Slide',
          type: 'object',
          fields: [
            defineField({
              name: 'mediaType',
              title: 'Media type',
              type: 'string',
              options: {
                list: [
                  { title: 'Image', value: 'image' },
                  { title: 'Uploaded video', value: 'videoFile' },
                  { title: 'Video URL (YouTube / Vimeo / MP4)', value: 'videoUrl' },
                ],
                layout: 'radio',
              },
              initialValue: 'image',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              hidden: ({ parent }) => parent?.mediaType !== 'image',
            }),
            defineField({
              name: 'video',
              title: 'Video file',
              type: 'file',
              options: { accept: 'video/*' },
              description: 'MP4 / WebM. Plays muted and advances when it ends.',
              hidden: ({ parent }) => parent?.mediaType !== 'videoFile',
            }),
            defineField({
              name: 'videoUrl',
              title: 'Video URL',
              type: 'url',
              description: 'YouTube, Vimeo, or a direct .mp4 link.',
              hidden: ({ parent }) => parent?.mediaType !== 'videoUrl',
            }),
            localizedString('alt', 'Alt / description', {
              description: 'Accessible description of this slide.',
            }),
            defineField({
              name: 'link',
              title: 'Link (optional)',
              type: 'string',
              description:
                'Optional. Internal path (e.g. /products/cobot-palletizer-am-40-g) or full URL (https://…). Shows a "Learn more" button on the slide.',
            }),
            localizedString('linkLabel', 'Link button label (optional)', {
              description: 'Optional override for the button text. Defaults to "Learn more".',
            }),
          ],
          preview: {
            select: { mediaType: 'mediaType', alt: 'alt.en', media: 'image' },
            prepare({ mediaType, alt, media }) {
              const label =
                mediaType === 'videoFile' ? 'Video' : mediaType === 'videoUrl' ? 'Video URL' : 'Image'
              return { title: alt || `(${label} slide)`, subtitle: label, media }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'mediaAspectRatio',
      title: 'Carousel aspect ratio',
      type: 'string',
      group: 'media',
      options: {
        list: [
          { title: 'Square (1:1)', value: 'square' },
          { title: 'Landscape (4:3)', value: '4:3' },
          { title: 'Widescreen (16:9)', value: '16:9' },
          { title: 'Portrait (3:4)', value: 'portrait' },
        ],
        layout: 'radio',
      },
      initialValue: '4:3',
    }),
    defineField({
      name: 'mediaWidth',
      title: 'Carousel width',
      type: 'string',
      group: 'media',
      description: 'How much of the hero width the carousel occupies (text fills the rest).',
      options: {
        list: [
          { title: 'Narrow (~40%)', value: 'narrow' },
          { title: 'Medium (~50%)', value: 'medium' },
          { title: 'Wide (~60%)', value: 'wide' },
        ],
        layout: 'radio',
      },
      initialValue: 'narrow',
    }),
    defineField({
      name: 'autoplay',
      title: 'Auto-advance slides',
      type: 'boolean',
      group: 'media',
      initialValue: true,
    }),
    defineField({
      name: 'autoplayInterval',
      title: 'Seconds per slide',
      type: 'number',
      group: 'media',
      description:
        'How long each image / URL slide shows before advancing (uploaded videos advance when they end).',
      initialValue: 6,
      validation: (Rule) => Rule.min(2).max(30),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Homepage Hero' }
    },
  },
})
