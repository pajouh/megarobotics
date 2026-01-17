// /sanity/schemas/siteSettings.ts
import { defineType, defineField } from 'sanity'
import { localizedString, localizedText } from './helpers/localizedFields'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'footer', title: 'Footer' },
    { name: 'social', title: 'Social Media' },
    { name: 'contact', title: 'Contact' },
  ],
  fields: [
    // General
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      group: 'general',
      initialValue: 'MegaRobotics',
    }),
    localizedString('siteTagline', 'Site Tagline', {
      group: 'general',
      description: 'Your Source for Robotics News & Products',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'general',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoWidth',
      title: 'Logo Width (px)',
      type: 'number',
      group: 'general',
      description: 'Width of the logo in pixels (default: 36)',
      initialValue: 36,
      validation: (Rule) => Rule.min(16).max(300),
    }),
    defineField({
      name: 'logoHeight',
      title: 'Logo Height (px)',
      type: 'number',
      group: 'general',
      description: 'Height of the logo in pixels (default: 36)',
      initialValue: 36,
      validation: (Rule) => Rule.min(16).max(300),
    }),

    // Footer
    localizedText('footerDescription', 'Footer Description', {
      group: 'footer',
      rows: 3,
      description: 'Short description shown in the footer',
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Link Columns',
      type: 'array',
      group: 'footer',
      of: [
        {
          type: 'object',
          fields: [
            localizedString('title', 'Column Title'),
            {
              name: 'links',
              type: 'array',
              title: 'Links',
              of: [
                {
                  type: 'object',
                  fields: [
                    localizedString('label', 'Label'),
                    { name: 'url', type: 'string', title: 'URL' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    localizedString('copyrightText', 'Copyright Text', {
      group: 'footer',
      description: 'e.g., "© 2026 MegaRobotics. All rights reserved."',
    }),

    // Social Media
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      group: 'social',
      fields: [
        { name: 'twitter', type: 'url', title: 'Twitter/X' },
        { name: 'linkedin', type: 'url', title: 'LinkedIn' },
        { name: 'youtube', type: 'url', title: 'YouTube' },
        { name: 'github', type: 'url', title: 'GitHub' },
        { name: 'instagram', type: 'url', title: 'Instagram' },
      ],
    }),

    // Contact
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
      group: 'contact',
    }),
    localizedText('address', 'Address', {
      group: 'contact',
      rows: 3,
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
