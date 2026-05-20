'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import Image from 'next/image';
import Logo from '../../../public/logoORANGE.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          {/* <Link href="/">Aprajita Strategies</Link> */}
          <Image src={Logo} alt='' width={60} height={60} className={styles.logo}/>
        </div>
        
        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
          <ul className={styles.navLinks}>
            <li><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link href="/#about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
            <li><Link href="/#services" onClick={() => setMenuOpen(false)}>Services</Link></li>
            <li><Link href="/#projects" onClick={() => setMenuOpen(false)}>Projects</Link></li>
            <li><Link href="/#contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
          </ul>
          <div className={styles.ctaWrapper}>
            <Link href="/#contact" className={styles.ctaButton} onClick={() => setMenuOpen(false)}>
              Consult With Us
            </Link>
          </div>
        </nav>

        <button 
          className={styles.hamburger} 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Navigation"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.bar1 : ''}`}></span>
          <span className={`${styles.bar} ${menuOpen ? styles.bar2 : ''}`}></span>
          <span className={`${styles.bar} ${menuOpen ? styles.bar3 : ''}`}></span>
        </button>
      </div>
    </header>
  );
}
