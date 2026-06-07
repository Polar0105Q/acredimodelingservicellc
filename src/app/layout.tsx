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
    title: 'Remodeling Service LLC — Premium Home & Commercial Remodeling',
    description: 'Remodeling Service LLC delivers premium kitchen, bathroom, and commercial remodeling across the US — licensed professionals, transparent pricing, warranty-backed results.',
    icons: {
        icon: [
            { url: '/favicon.ico', type: 'image/x-icon' }
        ],
    },
    openGraph: {
        title: 'Remodeling Service LLC — Premium Remodeling',
        description: 'Premium remodeling for homes and businesses. Licensed professionals, transparent pricing.',
        images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630 }],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`}>
            <body className={dmSans.className}>
                {children}

                <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fremodeling5831back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.19" />
                <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></body>
        </html>
    );
}