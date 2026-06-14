'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import Image from 'next/image';
import Logo from '../../../public/logoORANGE.png';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Hide navbar on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className={styles.header}>
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

        <IconButton
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Navigation"
          sx={{ display: { xs: 'flex', md: 'none' }, color: 'inherit' }}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </div>
    </header>
  );
}
