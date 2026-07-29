'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';
import Logo from '../../../public/logoORANGE.png';
import { contactData } from '../../data/contact';
import servicesData from '../../data/services.json';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LockIcon from '@mui/icons-material/Lock';

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
  };

  const footerServiceGroups = [
    {
      heading: 'Design & Planning',
      services: [
        'Project Management (EPCM/EPC)',
        'Architectural Designing',
        '3D Visualization & Engineering Design',
        'Structural Designing',
        'Auditing, Estimation & Costing',
        'Interior Designing & Execution',
        'MEP Designing & Execution',
      ],
    },
    {
      heading: 'Execution & Systems',
      services: [
        'Solar Plant Designing & Execution',
        'HVAC Designing & Execution',
        'Furnace Designing & Execution',
        'Clean Room Partition',
        'Industrial Flooring (Epoxy, PU Flooring & More)',
        'Water Treatment (RO) & Wastewater Treatment (ETP, STP, ZLD)',
      ],
    },
    {
      heading: 'Envelope & Environment',
      services: [
        'Facade Designing & Execution',
        'Pollution Air Control Systems',
        'Green Building Solutions',
        'Waterproofing Solutions',
      ],
    },
  ];

  const previewServiceLimit = 5;

  const footerServices = footerServiceGroups.map((group) => ({
    heading: group.heading,
    items: group.services
      .map((title) => {
        const service = servicesData.find((item: { title: string }) => item.title === title);
        return service
          ? {
              title: service.title,
              slug: createSlug(service.title),
            }
          : null;
      })
      .filter(Boolean)
      .slice(0, previewServiceLimit),
  }));

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.announcement}>
          <div>
            <p className={styles.eyebrow}>Trusted construction consultancy</p>
            <h3>Let&apos;s build your next landmark with confidence.</h3>
          </div>
          <Link href="/#contact" className={styles.ctaLink}>
            Get a Free Consultation
          </Link>
        </div>

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
              <div>
                <h3 className={styles.brand}>APRAJITA STRATEGICS PRIVATE LIMITED</h3>
                <p className={styles.tagline}>Engineering excellence with lasting impact</p>
              </div>
            </div>
            <p className={styles.desc}>
              Premium construction consultancy bringing your vision to reality with elegant,
              sustainable, and cutting-edge engineering solutions.
            </p>
          </div>

          <div className={`${styles.col} ${styles.servicesColumn}`}>
            <h4 className={styles.heading}>Services</h4>
            <div className={styles.serviceGroups}>
              {footerServices.map((group) => (
                <div key={group.heading} className={styles.serviceGroup}>
                  <h5 className={styles.serviceGroupTitle}>{group.heading}</h5>
                  <ul className={styles.links}>
                    {group.items.map((service) => {
                      if (!service) return null;
                      return (
                        <li key={service.slug}>
                          <Link href={`/services/${service.slug}`}>{service.title}</Link>
                        </li>
                      );
                    })}
                  </ul>
                  {group.heading === 'Design & Planning' && (
                    <Link href="/#services" className={styles.viewMoreLink}>
                      View More
                    </Link>
                  )}
                </div>
              ))}
            </div>
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
          <p>&copy; {currentYear} APRAJITA STRATEGICS PRIVATE LIMITED. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <Link href="/admin/login" className={styles.adminBtn}>
              <LockIcon /> Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
