import React from 'react';
import styles from './SectionTitle.module.css';

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  alignment?: 'left' | 'center';
  dark?: boolean;
}

export default function SectionTitle({ 
  subtitle, 
  title, 
  alignment = 'center',
  dark = false 
}: SectionTitleProps) {
  return (
    <div className={`${styles.wrapper} ${styles[alignment]} ${dark ? styles.dark : ''}`}>
      {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.line}></div>
    </div>
  );
}
