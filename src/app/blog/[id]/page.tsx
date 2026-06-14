/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Container from '@/components/common/Container';
import blogData from '@/data/blog.json';
import styles from './blog-detail.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  readTime: string;
  tags: string[];
  keywords: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = parseInt(params.id as string);

  const blog: BlogPost | undefined = blogData.find((b) => b.id === blogId);

  if (!blog) {
    return (
      <main className={styles.blogDetailWrapper}>
        <Container>
          <div className={styles.notFound}>
            <h1>Blog Not Found</h1>
            <p>{"The blog you're looking for doesn't exist."}</p>
            <Link href="/blog" className={styles.backLink}>
              <ArrowBackIcon className={styles.backIcon} />
              Back to All Blogs
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  const relatedBlogs = blogData
    .filter((b) => b.category === blog.category && b.id !== blog.id)
    .slice(0, 3);

  return (
    <main className={styles.blogDetailWrapper}>
      <section className={styles.blogHeader}>
        <Container>
        
          <div className={styles.headerContent}>
            <div className={styles.categoryBadge}>{blog.category}</div>
            <h1 className={styles.pageTitle}>{blog.title}</h1>
            <div className={styles.blogMeta}>
              <span className={styles.metaItem}>
                <CalendarTodayIcon className={styles.metaIcon} />
                {new Date(blog.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className={styles.metaItem}>
                <PersonIcon className={styles.metaIcon} />
                {blog.author}
              </span>
              <span className={styles.metaItem}>
                <BookmarkIcon className={styles.metaIcon} />
                {blog.readTime}
              </span>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.blogImageSection}>
        <Container>
          <div className={styles.imageWrapper}>
            <img src={blog.image} alt={blog.title} className={styles.blogImage} />
          </div>
        </Container>
      </section>

      <section className={styles.blogContentSection}>
        <Container>
          <div className={styles.contentWrapper}>
            <article className={styles.blogArticle}>
              <div className={styles.content}>
                {blog.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className={styles.paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className={styles.tagsContainer}>
                <h4 className={styles.tagsTitle}>Tags:</h4>
                <div className={styles.tags}>
                  {blog.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.keywordsContainer}>
                <h4 className={styles.keywordsTitle}>Keywords:</h4>
                <p className={styles.keywordsText}>{blog.keywords}</p>
              </div>

              <div className={styles.actionBar}>
                <button className={styles.actionBtn}>
                  <ThumbUpIcon className={styles.actionIcon} />
                  Helpful
                </button>
                <button className={styles.actionBtn}>
                  <ShareIcon className={styles.actionIcon} />
                  Share
                </button>
              </div>
            </article>

            <aside className={styles.sidebar}>
              <div className={styles.aboutAuthor}>
                <h4 className={styles.sidebarTitle}>About Author</h4>
                <p className={styles.authorBio}>
                  {blog.author} is a team of construction and architecture experts dedicated to
                  sharing industry insights and best practices.
                </p>
              </div>

              {relatedBlogs.length > 0 && (
                <div className={styles.relatedBlogs}>
                  <h4 className={styles.sidebarTitle}>Related Posts</h4>
                  <div className={styles.relatedList}>
                    {relatedBlogs.map((relatedBlog) => (
                      <Link
                        key={relatedBlog.id}
                        href={`/blog/${relatedBlog.id}`}
                        className={styles.relatedItem}
                      >
                        <img src={relatedBlog.image} alt={relatedBlog.title} />
                        <div>
                          <h5 className={styles.relatedTitle}>{relatedBlog.title}</h5>
                          <span className={styles.relatedCategory}>{relatedBlog.category}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </Container>
      </section>

      <section className={styles.callToAction}>
        <Container>
          <div className={styles.ctaContent}>
            <h3>Have a question about construction projects?</h3>
            <p>Get in touch with our experts for personalized advice and consultation.</p>
            <Link href="/#contact" className={styles.ctaBtn}>
              Contact Us Today
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
