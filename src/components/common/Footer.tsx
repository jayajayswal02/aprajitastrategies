import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import Logo from '../../../public/logowithname.png';
import contactData from '../../data/contact.json';

export default function Footer() {
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
              <li>📍 {contactData.address}</li>
              <li>📞 {contactData.phone}</li>
              <li>📧 {contactData.email}</li>
              <li>⏰ {contactData.workingHours}</li>
            </ul>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Aprajita Strategies Construction Consultancy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
