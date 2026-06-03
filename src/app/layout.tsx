import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { getLocale } from "next-intl/server";
import { getSiteSettings } from "@/lib/sanity";
import "./globals.css";

function extractTwitterHandle(url?: string | null): string | undefined {
  if (!url) return undefined;
  const match = url.match(/(?:twitter\.com|x\.com)\/@?([A-Za-z0-9_]{1,15})/i);
  if (!match) return undefined;
  return `@${match[1]}`;
}

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings().catch(() => null);
  const twitterSite = extractTwitterHandle(settings?.socialLinks?.twitter) ?? "@megarobotics_de";

  const SITE_TITLE = "MegaRobotics | Industrial Robotics & Automation Solutions";
  const SITE_DESCRIPTION =
    "Germany-based industrial robotics distributor and automation technology partner. We help European customers source, evaluate and develop robotic solutions across manufacturing, logistics, inspection, cleaning, research and service environments.";

  return {
  metadataBase: new URL("https://www.megarobotics.de"),
  title: {
    default: SITE_TITLE,
    template: "%s | MegaRobotics",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "industrial robotics",
    "robot distributor",
    "automation solutions",
    "industrial automation",
    "Industrieroboter",
    "Robotik-Distributor",
    "Automatisierungslösungen",
    "PLC SPS",
    "industrial servo drives",
    "collaborative robots cobots",
    "AMR AGV mobile robots",
    "humanoid robots",
    "robot grippers end effectors",
    "machine safety",
    "industrial communication",
    "system integrator Germany",
    "MegaRobotics",
    "MEGAFORCE GmbH",
  ],
  authors: [{ name: "MegaRobotics", url: "https://www.megarobotics.de" }],
  creator: "MegaRobotics",
  publisher: "MEGAFORCE GmbH",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["de_DE"],
    url: "https://www.megarobotics.de",
    siteName: "MegaRobotics",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MegaRobotics — Industrial Robotics & Automation Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
    site: twitterSite,
    creator: twitterSite,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.megarobotics.de",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  category: "industrial automation",
  other: {
    "facebook-domain-verification": "f4d1i9dpm7pulx55nx1tuprhlkn36o",
  },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-white text-gray-900 min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
