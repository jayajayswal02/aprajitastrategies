import { Metadata } from 'next';

export const generateMetadata = (
  title: string,
  description: string,
  path: string = ''
): Metadata => {
  const url = `https://Aprajita Strategies.com${path}`;
  
  return {
    title: `${title} | Aprajita Strategies`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Aprajita Strategies Construction Consultancy',
      images: [
        {
          url: 'https://Aprajita Strategies.com/og-image.jpg', // Placeholder
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
      images: ['https://Aprajita Strategies.com/og-image.jpg'], // Placeholder
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
