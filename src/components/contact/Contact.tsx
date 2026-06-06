'use client';

import React, { useState } from 'react';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import styles from './Contact.module.css';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import contactData from '../../data/contact.json';
import { submitContact } from '../../lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
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
              </div>
              
              <div className={styles.whatsappWrapper}>
                <a href={`https://wa.me/${contactData.whatsapp}`} target="_blank" rel="noopener noreferrer" className={styles.whatsappBtn}>
                  <WhatsAppIcon /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
          
          <div className={styles.formColumn}>
            {success ? (
              <div className={styles.successMessage}>
                <CheckCircleIcon className={styles.successIcon} />
                <h3>Thank You!</h3>
                <p>Your message has been received. We&apos;ll contact you soon.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={async (e) => {
                e.preventDefault();
                if (!formData.name || !formData.phone || !formData.message) {
                  setError('Please fill in all required fields');
                  return;
                }
                
                setLoading(true);
                setError('');
                
                try {
                  await submitContact({
                    name: formData.name,
                    phone: formData.phone,
                    message: formData.message
                  });
                  
                  setSuccess(true);
                  setFormData({ name: '', phone: '', message: '' });
                  
                  setTimeout(() => setSuccess(false), 5000);
                } catch (err: unknown) {
                  const error = err instanceof Error ? err : new Error('Failed to submit');
                  setError(error.message || 'Failed to submit. Please try again.');
                } finally {
                  setLoading(false);
                }
              }}>
                {error && (
                  <div className={styles.errorMessage}>
                    <ErrorIcon className={styles.errorIcon} />
                    {error}
                  </div>
                )}
                
                <div className={styles.inputGroup}>
                  <label htmlFor="name">Full Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required 
                  />
                </div>
                
                  <div className={styles.inputGroup}>
                    <label htmlFor="phone">Phone</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      placeholder="(123) 456-7890" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="message">Message *</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    placeholder="Tell us about your project..." 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  ></textarea>
                </div>
                
                <Button type="submit" size="large" className={styles.submitBtn} disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
