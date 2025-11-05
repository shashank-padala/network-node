import type { Metadata } from "next";

export const SITE_CONFIG = {
  name: "NetworkNode",
  title: "NetworkNode - The Builder Graph",
  description: "Connect, collaborate, and launch with builders, founders, and creators. Discover opportunities, find co-founders, land dream jobs, and launch startups together.",
  url: "https://www.networknode.xyz",
  ogImage: "/og-image.jpg",
  logo: "/logo.jpg",
  favicon: "/favicon.ico",
  appleTouchIcon: "/apple-touch-icon.jpg",
  supportEmail: "shashank@kiraklabs.com",
};

export const METADATA_DEFAULT: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "network",
    "builders",
    "founders",
    "startups",
    "co-founders",
    "jobs",
    "collaboration",
    "creator network",
    "builder community",
    "startup jobs",
    "tech network",
    "entrepreneurs",
  ],
  authors: [
    {
      name: SITE_CONFIG.name,
    },
  ],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
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
  icons: {
    icon: [
      { url: SITE_CONFIG.favicon, sizes: "any" },
      { url: SITE_CONFIG.logo, type: "image/jpeg" },
    ],
    apple: [
      { url: SITE_CONFIG.appleTouchIcon, sizes: "180x180", type: "image/jpeg" },
    ],
    shortcut: SITE_CONFIG.favicon,
  },
  manifest: "/manifest.json",
  verification: {
    // Add verification codes here when available (Google Search Console, etc.)
  },
};
