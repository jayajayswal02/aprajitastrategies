'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';
import Logo from '../../../public/logoORANGE.png';
import contactData from '../../data/contact.json';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LockIcon from '@mui/icons-material/Lock';

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.col}>
            <div className={styles.logoSection}>
              <Image
                src={Logo}
                alt="Aprajita Strategies Logo"
                width={60}
                height={60}
                className={styles.logo}
              />
              <h3 className={styles.brand}>Aprajita Strategies</h3>
            </div>
            <p className={styles.desc}>
              Premium construction consultancy bringing your vision to reality with elegant, 
              sustainable, and cutting-edge engineering solutions.
            </p>
          </div>
          
          <div className={styles.col}>
            <h4 className={styles.heading}>Services</h4>
            <ul className={styles.links}>
              <li><Link href="#">Architectural Planning</Link></li>
              <li><Link href="#">Structural Design</Link></li>
              <li><Link href="#">Project Management</Link></li>
              <li><Link href="#">Interior Design</Link></li>
              <li><Link href="#">Estimation</Link></li>
            </ul>
          </div>
          
          <div className={styles.col}>
            <h4 className={styles.heading}>Quick Links</h4>
            <ul className={styles.links}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/#about">About Us</Link></li>
              <li><Link href="/#projects">Projects</Link></li>
              <li><Link href="/#testimonials">Testimonials</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className={styles.col}>
            <h4 className={styles.heading}>Contact Info</h4>
            <ul className={styles.contactDetails}>
              <li><LocationOnIcon className={styles.icon} /> {contactData.address}</li>
              <li><PhoneIcon className={styles.icon} /> {contactData.phone}</li>
              <li><EmailIcon className={styles.icon} /> {contactData.email}</li>
              <li><ScheduleIcon className={styles.icon} /> {contactData.workingHours}</li>
            </ul>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <div className={styles.bottomContent}>
            <p>&copy; {new Date().getFullYear()} Aprajita Strategies Construction Consultancy. All rights reserved.</p>
            <Link href="/admin/login" className={styles.adminBtn}>
              <LockIcon /> Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
