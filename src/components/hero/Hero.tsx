'use client'
import React from 'react';
import Link from 'next/link';
import Container from '../common/Container';
import Button from '../common/Button';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { HomeWork } from '@mui/icons-material';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Decorative Background Patterns */}
      <div className={styles.bgPattern} aria-hidden="true">
        <ArchitectureIcon className={styles.bgIcon1} aria-hidden="true" />
        <EngineeringIcon className={styles.bgIcon2} aria-hidden="true" />
        <HomeWork className={styles.bgIcon3} aria-hidden="true" />
      </div>

      <Container className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>Award-winning Consultancy</span>
          <h1 className={styles.title}>
            Building the Future <br />
            <span className={styles.highlight}>With Precision</span>
          </h1>
          <p className={styles.tagline}>
            We provide premium structural, architectural, and engineering consultancy 
            to bring your most ambitious projects to life. Sustainable, modern, and reliable.
          </p>
          
         <div className={styles.actions}>
            <Link href="#services">
              <Button size="large">Our Services</Button>
            </Link>
            <Link href="#contact">
              <Button variant="outline" size="large">Consult With Us</Button>
            </Link>
          </div>
        </div>

        <div className={styles.statsPanel}>
          <div className={styles.statCard}>
            <h3 className={styles.statNumber}>15+</h3>
            <p className={styles.statLabel}>Years Experience</p>
          </div>
          <div className={styles.statCard}>
            <h3 className={styles.statNumber}>250+</h3>
            <p className={styles.statLabel}>Projects Completed</p>
          </div>
          <div className={styles.statCard}>
            <h3 className={styles.statNumber}>50+</h3>
            <p className={styles.statLabel}>Expert Engineers</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
