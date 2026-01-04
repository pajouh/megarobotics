import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MegaRobotics - Robotics News & Industry Insights",
    template: "%s | MegaRobotics",
  },
  description:
    "Your source for the latest robotics news, reviews, and industry insights. Covering industrial automation, humanoid robots, AI integration, and the future of intelligent machines.",
  keywords: [
    "robotics",
    "robots",
    "automation",
    "AI",
    "humanoid robots",
    "industrial robots",
    "robotics news",
    "robot reviews",
  ],
  authors: [{ name: "MegaRobotics" }],
  creator: "MegaRobotics",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://megarobotics.de",
    siteName: "MegaRobotics",
    title: "MegaRobotics - Robotics News & Industry Insights",
    description:
      "Your source for the latest robotics news, reviews, and industry insights.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MegaRobotics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MegaRobotics - Robotics News & Industry Insights",
    description:
      "Your source for the latest robotics news, reviews, and industry insights.",
    images: ["/og-image.jpg"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-slate-950 text-white min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
