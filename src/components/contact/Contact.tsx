'use client';

import React from 'react';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import styles from './Contact.module.css';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import contactData from '../../data/contact.json';

export default function Contact() {
  return (
    <section id="contact" className={`section-spacing ${styles.contact}`}>
      <Container>
        <SectionTitle 
          subtitle="Get In Touch"
          title="Ready to Build Your Vision?"
        />
        
        <div className={styles.grid}>
          <div className={styles.infoColumn}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Contact Information</h3>
              <p className={styles.infoDesc}>
                Reach out to our expert team for inquiries, consultations, or quotes.
              </p>
              
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <LocationOnIcon className={styles.icon} />
                  <span>{contactData.address}</span>
                </div>
                <div className={styles.infoItem}>
                  <PhoneIcon className={styles.icon} />
                  <span>{contactData.phone}</span>
                </div>
                <div className={styles.infoItem}>
                  <EmailIcon className={styles.icon} />
                  <span>{contactData.email}</span>
                </div>
              </div>
              
              <div className={styles.whatsappWrapper}>
                <a href={`https://wa.me/${contactData.whatsapp}`} target="_blank" rel="noopener noreferrer" className={styles.whatsappBtn}>
                  <WhatsAppIcon /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
          
          <div className={styles.formColumn}>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="John Doe" required />
              </div>
              
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="john@example.com" required />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="phone">Phone</label>
                  <input type="tel" id="phone" placeholder="(123) 456-7890" />
                </div>
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="message">Message</label>
                <textarea id="message" rows={5} placeholder="Tell us about your project..." required></textarea>
              </div>
              
              <Button type="submit" size="large" className={styles.submitBtn}>
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
