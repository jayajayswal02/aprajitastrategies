/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import Link from 'next/link';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';
import blogData from '@/data/blog.json';
import styles from './Blog.module.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export default function Blog() {
  // Show only first 3 blogs on home page
  const homepageBlog = blogData.slice(0, 3);

  return (
    <section className={styles.blog}>
      <Container>
        <SectionTitle
          title="Latest Blog Posts"
          subtitle="Stay updated with industry insights and expert tips"
        />

        <div className={styles.blogsContainer}>
          {homepageBlog.map((post) => (
            <article key={post.id} className={styles.blogCard}>
              <div className={styles.imageWrapper}>
                <img
                  src={post.image}
                  alt={post.title}
                  className={styles.blogImage}
                />
                <div className={styles.categoryBadge}>{post.category}</div>
              </div>

              <div className={styles.blogContent}>
                <div className={styles.blogMeta}>
                  <span className={styles.metaItem}>
                    <CalendarTodayIcon className={styles.metaIcon} />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span className={styles.metaItem}>
                    <PersonIcon className={styles.metaIcon} />
                    {post.author}
                  </span>
                  <span className={styles.metaItem}>
                    <BookmarkIcon className={styles.metaIcon} />
                    {post.readTime}
                  </span>
                </div>

                <h3 className={styles.blogTitle}>{post.title}</h3>
                <p className={styles.blogExcerpt}>{post.excerpt}</p>

                <div className={styles.tagsContainer}>
                  {post.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link href={`/blog/${post.id}`} className={styles.readMoreBtn}>
                  Read More
                  <ArrowForwardIcon className={styles.btnIcon} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.viewAllContainer}>
          <Link href="/blog" className={styles.viewAllBtn}>
            View All Blogs
            <ArrowForwardIcon className={styles.btnIcon} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
