import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

// Mobile viewport for responsive design
export const viewport = { width: 'device-width', initialScale: 1, maximumScale: 5 };

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport = { width: 'device-width', initialScale: 1, maximumScale: 5 };
export const metadata: Metadata = {
  title: 'Luxe Skin & Dermatology Clinic | Advanced Aesthetic Skincare',
  description: 'Welcome to Luxe Skin & Dermatology Clinic. Dr. Sarah Ahmed offers state-of-the-art medical dermatology, clinical peels, laser therapy, and anti-aging treatments for healthy, glowing skin.',
  keywords: [
    'dermatologist clinic',
    'advanced skin care',
    'acne treatment',
    'laser skin therapy',
    'chemical peeling',
    'botox and fillers',
    'Dr. Sarah Ahmed',
    'skin specialist'
  ],
  authors: [{ name: 'Luxe Skin Clinic' }],
  // viewport removed from metadata
  robots: 'index, follow',
  openGraph: {
    title: 'Luxe Skin & Dermatology Clinic | Advanced Aesthetic Skincare',
    description: 'Dr. Sarah Ahmed offers professional medical-grade skincare, laser therapies, chemical peels, and injectables for radiant skin.',
    type: 'website',
    url: 'https://luxeskinclinic.com',
    siteName: 'Luxe Skin Clinic',
  },
};
// duplicate metadata block removed

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col"><ThemeProvider>{children}</ThemeProvider>      </body>
    </html>
  );
}
