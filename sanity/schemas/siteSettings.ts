// /sanity/schemas/siteSettings.ts
import { defineType, defineField } from 'sanity'

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
    defineField({
      name: 'siteTagline',
      title: 'Site Tagline',
      type: 'string',
      group: 'general',
      initialValue: 'Your Source for Robotics News & Products',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'general',
      options: { hotspot: true },
    }),

    // Footer
    defineField({
      name: 'footerDescription',
      title: 'Footer Description',
      type: 'text',
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
            { name: 'title', type: 'string', title: 'Column Title' },
            {
              name: 'links',
              type: 'array',
              title: 'Links',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', type: 'string', title: 'Label' },
                    { name: 'url', type: 'string', title: 'URL' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
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
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
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
