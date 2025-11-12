import type { Metadata } from "next";
import "./globals.css";
import DraftToast from "./components/DraftToast";

export const metadata: Metadata = {
  title: "JSON AGENTS - Portable Agent Manifest Specification",
  description: "A universal JSON-native standard for describing AI agents, their capabilities, tools, runtimes, and governance in a portable, framework-agnostic format.",
  metadataBase: new URL('https://agents-json-website.pages.dev'),
  openGraph: {
    title: "JSON AGENTS - Portable Agent Manifest Specification",
    description: "A universal JSON-native standard for describing AI agents, their capabilities, tools, runtimes, and governance in a portable, framework-agnostic format.",
    url: 'https://agents-json-website.pages.dev',
    siteName: 'JSON AGENTS',
    images: [
      {
        url: '/images/jsonagents-banner-1.webp',
        width: 1536,
        height: 1024,
        alt: 'JSON AGENTS - Portable Agent Manifest Specification',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "JSON AGENTS - Portable Agent Manifest Specification",
    description: "A universal JSON-native standard for describing AI agents, their capabilities, tools, runtimes, and governance in a portable, framework-agnostic format.",
    images: ['/images/jsonagents-banner-1.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Momo+Trust+Display&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <DraftToast />
      </body>
    </html>
  );
}
