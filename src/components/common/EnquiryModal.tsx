'use client';

import React, { useState } from 'react';
import styles from './EnquiryModal.module.css';
import CloseIcon from '@mui/icons-material/Close';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const services = [
  'Architectural Planning',
  'Structural Design',
  'Project Management',
  'Interior Design',
  'Estimation',
  'Other'
];

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    service: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.number || !formData.service) {
      alert('Please fill in all fields');
      return;
    }

    // Simulate form submission
    console.log('Enquiry submitted:', formData);
    
    // Show success message
    setSubmitted(true);
    
    // Reset and close after 2 seconds
    setTimeout(() => {
      setFormData({ name: '', number: '', service: '' });
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>

        <div className={styles.content}>
          <h2>Quick Enquiry</h2>
          <p>Tell us about your project and we&apos;ll get back to you soon!</p>

          {submitted ? (
            <div className={styles.successMessage}>
              <div className={styles.successIcon}>✓</div>
              <h3>Thank You!</h3>
              <p>Your enquiry has been received. We&apos;ll contact you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="number">Phone Number *</label>
                <input
                  type="tel"
                  id="number"
                  name="number"
                  placeholder="(123) 456-7890"
                  value={formData.number}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="service">Service Required *</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className={styles.submitBtn}>
                Send Enquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
