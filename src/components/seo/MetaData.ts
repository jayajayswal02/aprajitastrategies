import { Metadata } from 'next';

export const generateMetadata = (
  title: string,
  description: string,
  path: string = ''
): Metadata => {
  const url = `https://www.aprajitastrategics.com${path}`;

  return {
    title: `${title} | APRAJITA STRATEGICS PRIVATE LIMITED`,
    description,
    metadataBase: new URL('https://www.aprajitastrategics.com'),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'APRAJITA STRATEGICS PRIVATE LIMITED',
      images: [
        {
          url: '/og-image.svg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.svg'],
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
};
