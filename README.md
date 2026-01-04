# MegaRobotics

A modern robotics news website built with Next.js 14 and Sanity CMS.

## Features

- **Next.js 14** with App Router for optimal performance
- **Sanity CMS** for content management with embedded studio
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Responsive Design** with mobile-first approach
- **SEO Optimized** with dynamic metadata and Open Graph support
- **Dark Theme** with emerald/cyan accent colors

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Sanity.io account

### 1. Clone and Install

```bash
cd megarobotics
npm install
```

### 2. Create Sanity Project

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Click "Create new project"
3. Name it "MegaRobotics"
4. Choose "Create empty project"
5. Copy your **Project ID**

### 3. Configure Environment Variables

Create a `.env.local` file from the example:

```bash
cp .env.local.example .env.local
```

Then update the values:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

### 5. Access Sanity Studio

Navigate to [http://localhost:3000/studio](http://localhost:3000/studio) to manage content.

## Content Management

### Creating Content

1. Go to `/studio`
2. **Categories** - Create categories first (News, Reviews, Companies, Events, Research)
3. **Authors** - Add author profiles
4. **Articles** - Create articles with rich content

### Article Fields

- **Title** - Article headline
- **Slug** - URL-friendly version (auto-generated)
- **Excerpt** - Short description for cards
- **Main Image** - Featured image with alt text
- **Category** - Select a category
- **Author** - Select an author
- **Published At** - Publication date
- **Read Time** - Estimated reading time in minutes
- **Featured** - Toggle to feature on homepage
- **Body** - Rich text content with images and code blocks

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
5. Deploy

### Connect Domain (megarobotics.de)

1. In Vercel dashboard, go to Settings > Domains
2. Add `megarobotics.de`
3. Configure DNS at your domain registrar:
   - Add an A record pointing to `76.76.21.21`
   - Or add a CNAME record pointing to `cname.vercel-dns.com`

### Update Sanity CORS

After deployment, update Sanity CORS settings:

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Go to Settings > API
4. Under CORS Origins, add:
   - `https://megarobotics.de`
   - `https://www.megarobotics.de`
   - Your Vercel preview URLs

## Project Structure

```
megarobotics/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── articles/        # Article pages
│   │   ├── category/        # Category pages
│   │   ├── about/           # About page
│   │   ├── studio/          # Sanity Studio
│   │   └── api/             # API routes
│   ├── components/          # React components
│   ├── lib/                 # Utilities and Sanity client
│   └── types/               # TypeScript types
├── sanity/
│   └── schemas/             # Sanity content schemas
└── public/                  # Static assets
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Sanity.io
- **Icons**: Lucide React
- **Date Formatting**: date-fns
- **Deployment**: Vercel

## Design System

### Colors

- **Background**: slate-950 (#020617)
- **Card Background**: white/5 opacity
- **Primary Accent**: emerald-500 (#10b981)
- **Secondary Accent**: cyan-500 (#06b6d4)
- **Text Primary**: white
- **Text Secondary**: slate-400

### Typography

- **Headings**: Inter font, bold
- **Body**: Inter font, regular
- **Code**: JetBrains Mono

## License

MIT License - Feel free to use this project as a template for your own robotics news site.

## Support

For questions or issues, please open a GitHub issue or contact us at contact@megarobotics.de.
