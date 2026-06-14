/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Container from '@/components/common/Container';
import blogData from '@/data/blog.json';
import styles from './blog.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(blogData.map((blog) => blog.category)));

  const filteredBlogs = selectedCategory
    ? blogData.filter((blog) => blog.category === selectedCategory)
    : blogData;

  return (
    <main className={styles.blogPageWrapper}>
      <section className={styles.blogHero}>
        <Container>
          <div className={styles.heroContent}>
          
            <h1 className={styles.pageTitle}>All Blog Posts</h1>
            <p className={styles.pageSubtitle}>
              Explore our latest articles on construction, architecture, and industry insights
            </p>
          </div>
        </Container>
      </section>

      <section className={styles.blogListSection}>
        <Container>
          <div className={styles.blogFilters}>
            <button
              className={`${styles.filterBtn} ${selectedCategory === null ? styles.active : ''}`}
              onClick={() => setSelectedCategory(null)}
            >
              All ({blogData.length})
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.filterBtn} ${selectedCategory === category ? styles.active : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category} ({blogData.filter((b) => b.category === category).length})
              </button>
            ))}
          </div>

          <div className={styles.blogsGrid}>
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((post) => (
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
              ))
            ) : (
              <div className={styles.noResults}>
                <p>No blogs found in this category.</p>
              </div>
            )}
          </div>
        </Container>
      </section>
    </main>
  );
}
