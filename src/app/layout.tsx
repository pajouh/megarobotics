import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://megarobotics.de"),
  title: {
    default: "MegaRobotics - Robotics News, Reviews & Industry Insights",
    template: "%s | MegaRobotics",
  },
  description:
    "Your premier source for robotics news, product reviews, and industry analysis. Covering humanoid robots, quadrupeds, industrial automation, AI integration, and the future of intelligent machines.",
  keywords: [
    "robotics news",
    "robot reviews",
    "humanoid robots",
    "industrial robots",
    "quadruped robots",
    "AI robots",
    "robotics industry",
    "automation",
    "Unitree",
    "robot vacuum",
    "cobots",
    "robot dog",
    "warehouse robots",
    "service robots",
    "Chinese robotics",
    "robotik nachrichten",
  ],
  authors: [{ name: "MegaRobotics", url: "https://megarobotics.de" }],
  creator: "MegaRobotics",
  publisher: "MegaRobotics",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["de_DE"],
    url: "https://megarobotics.de",
    siteName: "MegaRobotics",
    title: "MegaRobotics - Robotics News, Reviews & Industry Insights",
    description:
      "Your premier source for robotics news, product reviews, and industry analysis. Covering humanoid robots, industrial automation, and AI integration.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MegaRobotics - Robotics News & Industry Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MegaRobotics - Robotics News & Industry Insights",
    description:
      "Your premier source for robotics news, product reviews, and industry analysis.",
    images: ["/og-image.png"],
    creator: "@megarobotics",
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
    canonical: "https://megarobotics.de",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-white text-gray-900 min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
