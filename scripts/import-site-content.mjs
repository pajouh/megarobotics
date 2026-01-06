// Script to import Site Settings and Pages into Sanity
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'wudur8e8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Site Settings
const siteSettings = {
  _type: 'siteSettings',
  _id: 'siteSettings', // Singleton ID
  siteName: 'MegaRobotics',
  siteTagline: 'Your Source for Robotics News & Products',
  footerDescription: 'Your source for the latest robotics news, reviews, and industry insights. Covering industrial automation, humanoid robots, and AI integration.',
  copyrightText: '© 2026 MegaRobotics. All rights reserved.',
  contactEmail: 'contact@megarobotics.de',
  contactPhone: '+49 30 123456789',
  address: 'Musterstraße 123\n10115 Berlin\nGermany',
  socialLinks: {
    twitter: 'https://twitter.com/megarobotics',
    linkedin: 'https://linkedin.com/company/megarobotics',
    youtube: 'https://youtube.com/@megarobotics',
  },
  footerLinks: [
    {
      _key: 'products',
      title: 'Products',
      links: [
        { _key: 'p1', label: 'All Products', url: '/products' },
        { _key: 'p2', label: 'Humanoid & Legged', url: '/products/category/humanoid-legged-robots' },
        { _key: 'p3', label: 'Industrial & Cobots', url: '/products/category/industrial-cobots' },
        { _key: 'p4', label: 'Manufacturers', url: '/manufacturers' },
      ],
    },
    {
      _key: 'news',
      title: 'News',
      links: [
        { _key: 'n1', label: 'All News', url: '/articles' },
        { _key: 'n2', label: 'Companies', url: '/category/companies' },
        { _key: 'n3', label: 'Events', url: '/category/events' },
        { _key: 'n4', label: 'Research', url: '/category/research' },
      ],
    },
    {
      _key: 'company',
      title: 'Company',
      links: [
        { _key: 'c1', label: 'About', url: '/about' },
        { _key: 'c2', label: 'Contact', url: '/about#contact' },
        { _key: 'c3', label: 'Imprint', url: '/imprint' },
        { _key: 'c4', label: 'Privacy Policy', url: '/privacy' },
      ],
    },
  ],
}

// About Page
const aboutPage = {
  _type: 'page',
  title: 'About MegaRobotics',
  slug: { _type: 'slug', current: 'about' },
  pageType: 'about',
  subtitle: 'MegaRobotics is your premier destination for robotics news, in-depth analysis, and industry insights. We cover everything from industrial automation to humanoid robots.',
  lastUpdated: new Date().toISOString(),
  seo: {
    metaTitle: 'About MegaRobotics - Your Robotics News Source',
    metaDescription: 'Learn about MegaRobotics, your trusted source for robotics news, reviews, and industry insights.',
  },
  body: [
    {
      _type: 'block',
      _key: 'about1',
      style: 'h2',
      children: [{ _type: 'span', text: 'Our Mission' }],
    },
    {
      _type: 'block',
      _key: 'about2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Founded in 2024, MegaRobotics was created to bridge the gap between cutting-edge robotics research and the broader technology community. We believe that understanding robotics is essential for anyone looking to navigate the future of technology and automation.',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'about3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Our team of experienced journalists, engineers, and industry analysts work tirelessly to bring you accurate, timely, and insightful coverage of the robotics industry.',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'about4',
      style: 'h2',
      children: [{ _type: 'span', text: 'What We Cover' }],
    },
    {
      _type: 'block',
      _key: 'about5',
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', text: 'From breakthrough research at top universities to product launches from industry leaders, we cover the stories that matter to robotics professionals, investors, and enthusiasts alike:' }],
    },
    {
      _type: 'block',
      _key: 'about6',
      style: 'normal',
      listItem: 'bullet',
      children: [{ _type: 'span', text: 'Industrial automation and manufacturing robotics' }],
    },
    {
      _type: 'block',
      _key: 'about7',
      style: 'normal',
      listItem: 'bullet',
      children: [{ _type: 'span', text: 'Humanoid and legged robots' }],
    },
    {
      _type: 'block',
      _key: 'about8',
      style: 'normal',
      listItem: 'bullet',
      children: [{ _type: 'span', text: 'AI integration and machine learning in robotics' }],
    },
    {
      _type: 'block',
      _key: 'about9',
      style: 'normal',
      listItem: 'bullet',
      children: [{ _type: 'span', text: 'Consumer and home robotics' }],
    },
    {
      _type: 'block',
      _key: 'about10',
      style: 'normal',
      listItem: 'bullet',
      children: [{ _type: 'span', text: 'Research and academic developments' }],
    },
  ],
}

// Imprint Page
const imprintPage = {
  _type: 'page',
  title: 'Imprint',
  slug: { _type: 'slug', current: 'imprint' },
  pageType: 'imprint',
  subtitle: 'Legal information according to § 5 TMG',
  lastUpdated: new Date().toISOString(),
  seo: {
    metaTitle: 'Imprint - MegaRobotics',
    metaDescription: 'Legal information and imprint for MegaRobotics according to German law.',
  },
  body: [
    {
      _type: 'block',
      _key: 'imp1',
      style: 'h2',
      children: [{ _type: 'span', text: 'Information according to § 5 TMG' }],
    },
    {
      _type: 'block',
      _key: 'imp2',
      style: 'normal',
      children: [{ _type: 'span', text: 'MegaRobotics GmbH' }],
    },
    {
      _type: 'block',
      _key: 'imp3',
      style: 'normal',
      children: [{ _type: 'span', text: 'Musterstraße 123' }],
    },
    {
      _type: 'block',
      _key: 'imp4',
      style: 'normal',
      children: [{ _type: 'span', text: '10115 Berlin, Germany' }],
    },
    {
      _type: 'block',
      _key: 'imp5',
      style: 'h2',
      children: [{ _type: 'span', text: 'Contact' }],
    },
    {
      _type: 'block',
      _key: 'imp6',
      style: 'normal',
      children: [{ _type: 'span', text: 'Phone: +49 30 123456789' }],
    },
    {
      _type: 'block',
      _key: 'imp7',
      style: 'normal',
      children: [{ _type: 'span', text: 'Email: contact@megarobotics.de' }],
    },
    {
      _type: 'block',
      _key: 'imp8',
      style: 'h2',
      children: [{ _type: 'span', text: 'Represented by' }],
    },
    {
      _type: 'block',
      _key: 'imp9',
      style: 'normal',
      children: [{ _type: 'span', text: 'Managing Director: [Your Name]' }],
    },
    {
      _type: 'block',
      _key: 'imp10',
      style: 'h2',
      children: [{ _type: 'span', text: 'Register Entry' }],
    },
    {
      _type: 'block',
      _key: 'imp11',
      style: 'normal',
      children: [{ _type: 'span', text: 'Entry in the commercial register.' }],
    },
    {
      _type: 'block',
      _key: 'imp12',
      style: 'normal',
      children: [{ _type: 'span', text: 'Register court: Amtsgericht Berlin-Charlottenburg' }],
    },
    {
      _type: 'block',
      _key: 'imp13',
      style: 'normal',
      children: [{ _type: 'span', text: 'Register number: HRB XXXXXX' }],
    },
    {
      _type: 'block',
      _key: 'imp14',
      style: 'h2',
      children: [{ _type: 'span', text: 'VAT ID' }],
    },
    {
      _type: 'block',
      _key: 'imp15',
      style: 'normal',
      children: [{ _type: 'span', text: 'VAT identification number according to § 27a Umsatzsteuergesetz: DE XXXXXXXXX' }],
    },
    {
      _type: 'block',
      _key: 'imp16',
      style: 'h2',
      children: [{ _type: 'span', text: 'Responsible for content according to § 55 Abs. 2 RStV' }],
    },
    {
      _type: 'block',
      _key: 'imp17',
      style: 'normal',
      children: [{ _type: 'span', text: '[Your Name]' }],
    },
    {
      _type: 'block',
      _key: 'imp18',
      style: 'normal',
      children: [{ _type: 'span', text: 'Musterstraße 123, 10115 Berlin' }],
    },
  ],
}

// Privacy Page
const privacyPage = {
  _type: 'page',
  title: 'Privacy Policy',
  slug: { _type: 'slug', current: 'privacy' },
  pageType: 'privacy',
  subtitle: 'How we handle your data',
  lastUpdated: new Date().toISOString(),
  seo: {
    metaTitle: 'Privacy Policy - MegaRobotics',
    metaDescription: 'Learn how MegaRobotics collects, uses, and protects your personal data.',
  },
  body: [
    {
      _type: 'block',
      _key: 'priv1',
      style: 'h2',
      children: [{ _type: 'span', text: '1. Overview' }],
    },
    {
      _type: 'block',
      _key: 'priv2',
      style: 'normal',
      children: [{ _type: 'span', text: 'The following gives a simple overview of what happens to your personal information when you visit our website. Personal data is any data with which you could be personally identified.' }],
    },
    {
      _type: 'block',
      _key: 'priv3',
      style: 'h2',
      children: [{ _type: 'span', text: '2. Data Collection on Our Website' }],
    },
    {
      _type: 'block',
      _key: 'priv4',
      style: 'h3',
      children: [{ _type: 'span', text: 'Who is responsible for data collection?' }],
    },
    {
      _type: 'block',
      _key: 'priv5',
      style: 'normal',
      children: [{ _type: 'span', text: 'Data processing on this website is carried out by the website operator. You can find their contact details in the imprint of this website.' }],
    },
    {
      _type: 'block',
      _key: 'priv6',
      style: 'h3',
      children: [{ _type: 'span', text: 'How do we collect your data?' }],
    },
    {
      _type: 'block',
      _key: 'priv7',
      style: 'normal',
      children: [{ _type: 'span', text: 'Some data is collected when you provide it to us. This could, for example, be data you enter on a contact form or when subscribing to our newsletter.' }],
    },
    {
      _type: 'block',
      _key: 'priv8',
      style: 'normal',
      children: [{ _type: 'span', text: 'Other data is collected automatically by our IT systems when you visit the website. This is primarily technical data such as the browser and operating system you are using or when you accessed the page.' }],
    },
    {
      _type: 'block',
      _key: 'priv9',
      style: 'h2',
      children: [{ _type: 'span', text: '3. Your Rights' }],
    },
    {
      _type: 'block',
      _key: 'priv10',
      style: 'normal',
      children: [{ _type: 'span', text: 'You always have the right to request information about your stored data, its origin, its recipients, and the purpose of its collection at no charge. You also have the right to request that it be corrected, blocked, or deleted.' }],
    },
    {
      _type: 'block',
      _key: 'priv11',
      style: 'h2',
      children: [{ _type: 'span', text: '4. Analytics and Third-Party Tools' }],
    },
    {
      _type: 'block',
      _key: 'priv12',
      style: 'normal',
      children: [{ _type: 'span', text: 'When visiting our website, statistical analyses may be made of your surfing behavior. This happens primarily using cookies and analytics. The analysis of your surfing behavior is usually anonymous, i.e. we will not be able to identify you from this data.' }],
    },
    {
      _type: 'block',
      _key: 'priv13',
      style: 'h2',
      children: [{ _type: 'span', text: '5. Newsletter' }],
    },
    {
      _type: 'block',
      _key: 'priv14',
      style: 'normal',
      children: [{ _type: 'span', text: 'If you would like to receive our newsletter, we require a valid email address. We will check that you are the owner of the email address given or that the owner has agreed to receive the newsletter.' }],
    },
    {
      _type: 'block',
      _key: 'priv15',
      style: 'h2',
      children: [{ _type: 'span', text: '6. Contact' }],
    },
    {
      _type: 'block',
      _key: 'priv16',
      style: 'normal',
      children: [{ _type: 'span', text: 'If you have any questions about data protection, please contact us at: privacy@megarobotics.de' }],
    },
  ],
}

async function importContent() {
  try {
    console.log('Importing Site Settings...')
    await client.createOrReplace(siteSettings)
    console.log('✓ Site Settings created')

    console.log('\nImporting About page...')
    const about = await client.create(aboutPage)
    console.log('✓ About page created:', about._id)

    console.log('\nImporting Imprint page...')
    const imprint = await client.create(imprintPage)
    console.log('✓ Imprint page created:', imprint._id)

    console.log('\nImporting Privacy page...')
    const privacy = await client.create(privacyPage)
    console.log('✓ Privacy page created:', privacy._id)

    console.log('\n✅ All content imported successfully!')
    console.log('\nYou can now edit these pages in Sanity Studio:')
    console.log('- Site Settings: /studio/structure/siteSettings')
    console.log('- Pages: /studio/structure/page')
  } catch (error) {
    console.error('Error importing content:', error)
  }
}

importContent()
