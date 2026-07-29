import { contactData } from '@/data/contact';

const BASE_URL = 'https://www.aprajitastrategics.com';
const SITE_NAME = 'APRAJITA STRATEGICS PRIVATE LIMITED';
const DEFAULT_DESCRIPTION =
  'Premium construction consultancy delivering architectural planning, structural design, MEP, solar, HVAC, green building, waterproofing, and project management solutions.';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.svg`;

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ConstructionCompany',
    '@id': `${BASE_URL}/#organization`,
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/logoORANGE.png`,
    image: DEFAULT_IMAGE,
    telephone: contactData.phoneWithCountryCode,
    email: contactData.email,
    description: DEFAULT_DESCRIPTION,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contactData.address,
      addressLocality: 'Ranchi',
      addressRegion: 'Jharkhand',
      postalCode: '835222',
      addressCountry: 'IN',
    },
  };
}

export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BASE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/?s={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getServiceSchema(service: { title: string; description: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.title,
    description: service.description,
    url: `${BASE_URL}/services/${service.slug}`,
    provider: {
      '@id': `${BASE_URL}/#organization`,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'India',
    },
  };
}

export function getArticleSchema(article: {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  author: string;
  tags: string[];
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Organization',
      name: article.author,
    },
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    mainEntityOfPage: `${BASE_URL}/blog/${article.slug}`,
    keywords: article.tags.join(', '),
  };
}

export function getProjectSchema(project: {
  title: string;
  location: string;
  details: string;
  slug: string;
  image: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Project',
    name: project.title,
    description: project.details,
    image: project.image,
    locationCreated: project.location,
    url: `${BASE_URL}/projects/${project.slug}`,
    contributor: {
      '@id': `${BASE_URL}/#organization`,
    },
  };
}
