import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import AppShell from '@/components/common/AppShell';
import JsonLd from '@/components/seo/JsonLd';
import { getOrganizationSchema, getWebsiteSchema } from '@/components/seo/structuredData';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aprajitastrategics.com'),
  title: 'APRAJITA STRATEGICS PRIVATE LIMITED | Premium Construction Consultancy',
  description:
    'Premium construction consultancy delivering architectural planning, structural design, MEP, solar, HVAC, green building, waterproofing, and project management solutions.',
  keywords: [
    'construction consultancy',
    'architectural planning',
    'structural design',
    'MEP design',
    'solar plant',
    'HVAC design',
    'green building',
    'waterproofing',
    'project management',
  ],
  alternates: {
    canonical: 'https://www.aprajitastrategics.com',
  },
  openGraph: {
    title: 'APRAJITA STRATEGICS PRIVATE LIMITED',
    description:
      'Premium construction consultancy delivering architectural planning, structural design, MEP, solar, HVAC, green building, waterproofing, and project management solutions.',
    url: 'https://www.aprajitastrategics.com',
    siteName: 'APRAJITA STRATEGICS PRIVATE LIMITED',
    type: 'website',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Aprajita Strategies' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APRAJITA STRATEGICS PRIVATE LIMITED',
    description:
      'Premium construction consultancy delivering architectural planning, structural design, MEP, solar, HVAC, green building, waterproofing, and project management solutions.',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/logoORANGE.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable}`}>
        <JsonLd data={getOrganizationSchema()} />
        <JsonLd data={getWebsiteSchema()} />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
