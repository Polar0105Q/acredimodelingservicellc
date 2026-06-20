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
  title: 'AC Remodeling Service LLC - Premium Residential Remodeling',
  description:
    'AC Remodeling Service LLC delivers insured residential remodeling and finish work across Sugar Mountain, Blowing Rock, Boone, Hickory, Morganton, and Lenoir.',
  keywords: [
    'remodeling contractor',
    'kitchen remodeling',
    'bathroom remodeling',
    'home renovation',
    'commercial remodeling',
    'Sugar Mountain remodeling',
    'Boone remodeling',
    'Blowing Rock remodeling',
    'T&G ceilings',
    'Tongue and Groove ceilings',
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    title: 'AC Remodeling Service LLC - Premium Remodeling',
    description:
      'Insured remodeling and finish work for Sugar Mountain, Blowing Rock, Boone, Hickory, Morganton, and Lenoir.',
    images: [{ url: '/assets/images/ac-remodeling-logo.png', width: 532, height: 532 }],
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
