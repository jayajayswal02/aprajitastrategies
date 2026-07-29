import type { MetadataRoute } from 'next';
import blogData from '@/data/blog.json';
import projectsData from '@/data/projects.json';
import servicesData from '@/data/services.json';

const BASE_URL = 'https://www.aprajitastrategics.com';

const createSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  const serviceRoutes = servicesData.map((service: { title: string }) => ({
    url: `${BASE_URL}/services/${createSlug(service.title)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogRoutes = blogData.map((post: { id: number }) => ({
    url: `${BASE_URL}/blog/${post.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const projectRoutes = projectsData.map((project: { id: number; title: string }) => ({
    url: `${BASE_URL}/projects/${createSlug(project.title)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...projectRoutes];
}
