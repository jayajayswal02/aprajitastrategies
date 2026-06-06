'use client';

import React, { useState } from 'react';
import styles from './EnquiryModal.module.css';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { submitEnquiry } from '../../lib/supabase';

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
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.number || !formData.service) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await submitEnquiry({
        name: formData.name,
        phone: formData.number,
        projectType: formData.service
      });
      
      setSubmitted(true);
      
      setTimeout(() => {
        setFormData({ name: '', number: '', service: '' });
        setSubmitted(false);
        onClose();
      }, 2000);
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Failed to submit');
      setError(error.message || 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
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
              <CheckCircleIcon className={styles.successIcon} />
              <h3>Thank You!</h3>
              <p>Your enquiry has been received. We&apos;ll contact you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              {error && (
                <div className={styles.errorMessage}>
                  <ErrorIcon className={styles.errorIcon} />
                  {error}
                </div>
              )}
              
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

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'Sending...' : 'Send Enquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
