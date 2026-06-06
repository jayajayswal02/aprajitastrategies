'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './FloatingWhatsApp.module.css';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import contactData from '../../data/contact.json';

export default function FloatingWhatsApp() {
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const whatsappLink = `https://wa.me/${contactData.whatsapp}?text=Hello, I'm interested in your construction consultancy services.`;

  return (
    <Link 
      href={whatsappLink} 
      target="_blank" 
      rel="noopener noreferrer"
      className={styles.floatingButton}
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className={styles.icon} />
    </Link>
  );
}
