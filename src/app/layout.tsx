import React from 'react';
import type { Metadata, Viewport } from 'next';
import { DM_Sans, Fraunces } from 'next/font/google';
import '../styles/tailwind.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Remodeling Service LLC - Premium Home & Commercial Remodeling',
  description:
    'Remodeling Service LLC delivers premium kitchen, bathroom, and commercial remodeling across South Florida with licensed professionals, transparent pricing, and warranty-backed results.',
  keywords: [
    'remodeling contractor',
    'kitchen remodeling',
    'bathroom remodeling',
    'home renovation',
    'commercial remodeling',
    'South Florida remodeling',
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    title: 'Remodeling Service LLC - Premium Remodeling',
    description:
      'Premium remodeling for homes and businesses. Licensed professionals, transparent pricing.',
    images: [{ url: '/assets/images/app_logo.svg', width: 128, height: 128 }],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}
