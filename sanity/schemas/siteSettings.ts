// /sanity/schemas/siteSettings.ts
import { defineType, defineField } from 'sanity'
import { localizedString, localizedText } from './helpers/localizedFields'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'heroBanner', title: 'Hero Banner' },
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

    // Hero Banner
    defineField({
      name: 'heroBannerDuration',
      title: 'Hero Banner Slide Duration (seconds)',
      type: 'number',
      group: 'heroBanner',
      description: 'How long each slide is displayed before auto-advancing (default: 6 seconds)',
      initialValue: 6,
      validation: (Rule) => Rule.min(2).max(30),
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
    localizedString('contactPageBadge', 'Contact Page Badge', {
      group: 'contact',
      description: 'Small badge text at the top of the contact page (e.g. "Contact")',
    }),
    localizedString('contactPageTitle', 'Contact Page Title', {
      group: 'contact',
      description: 'Main heading on the contact page (e.g. "Get in Touch")',
    }),
    localizedText('contactPageSubtitle', 'Contact Page Subtitle', {
      group: 'contact',
      rows: 2,
      description: 'Subtitle text below the heading',
    }),
    localizedString('contactInfoTitle', 'Contact Info Section Title', {
      group: 'contact',
      description: 'Heading for the contact info column (e.g. "Contact Information")',
    }),
    localizedString('contactEmailLabel', 'Email Label', {
      group: 'contact',
      description: 'Label above the email address (e.g. "Email")',
    }),
    localizedString('contactLocationLabel', 'Location Label', {
      group: 'contact',
      description: 'Label above the address (e.g. "Location")',
    }),
    localizedString('contactBusinessLabel', 'Business Label', {
      group: 'contact',
      description: 'Label above the business email (e.g. "For Business")',
    }),
    localizedString('contactMetaTitle', 'Contact Page Meta Title', {
      group: 'contact',
      description: 'SEO title for the contact page',
    }),
    localizedText('contactMetaDescription', 'Contact Page Meta Description', {
      group: 'contact',
      rows: 2,
      description: 'SEO description for the contact page',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
