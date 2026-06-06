'use client';

import React, { useEffect, useState } from 'react';
import {
  getContacts,
  getEnquiries,
} from '@/lib/supabase';
import styles from './dashboard.module.css';
import ErrorIcon from '@mui/icons-material/Error';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MessageIcon from '@mui/icons-material/Message';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Contact {
  id: number;
  status: string;
  created_at: string;
}

interface Enquiry {
  id: number;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      const [contactsRes, enquiriesRes] = await Promise.all([
        getContacts(),
        getEnquiries()
      ]);

      if (contactsRes.success) setContacts(contactsRes.data || []);
      if (enquiriesRes.success) setEnquiries(enquiriesRes.data || []);
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Failed to fetch data');
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const newContacts = contacts.filter(c => c.status === 'new').length;
  const newEnquiries = enquiries.filter(e => e.status === 'new').length;
  const completedContacts = contacts.filter(c => c.status === 'completed').length;
  const completedEnquiries = enquiries.filter(e => e.status === 'completed').length;

  return (
    <div className={styles.container}>
      {error && (
        <div className={styles.errorAlert}>
          <ErrorIcon className={styles.errorIcon} />
          {error}
        </div>
      )}

      <div className={styles.header}>
        <h1>Dashboard Overview</h1>
        <p className={styles.subtitle}>Manage and track all submissions</p>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading dashboard data...</div>
      ) : (
        <>
          {/* Main Stats */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <AssignmentIcon className={`${styles.statIcon} ${styles.contacts}`} />
                <h3>Total Contacts</h3>
              </div>
              <p className={styles.statNumber}>{contacts.length}</p>
              <div className={styles.statMeta}>
                <span><strong>{newContacts}</strong> new</span>
                <span><strong>{completedContacts}</strong> completed</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <MessageIcon className={`${styles.statIcon} ${styles.enquiries}`} />
                <h3>Total Enquiries</h3>
              </div>
              <p className={styles.statNumber}>{enquiries.length}</p>
              <div className={styles.statMeta}>
                <span><strong>{newEnquiries}</strong> new</span>
                <span><strong>{completedEnquiries}</strong> completed</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <CheckCircleIcon className={`${styles.statIcon} ${styles.total}`} />
                <h3>Total Submissions</h3>
              </div>
              <p className={styles.statNumber}>{contacts.length + enquiries.length}</p>
              <div className={styles.statMeta}>
                <span><strong>{newContacts + newEnquiries}</strong> pending</span>
                <span className={styles.updated}>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Status Breakdown */}
          <div className={styles.breakdownSection}>
            <div className={styles.breakdownCard}>
              <h3>Contact Status Breakdown</h3>
              <div className={styles.statusBreakdown}>
                <div className={styles.statusItem}>
                  <span className={`${styles.badge} ${styles.new}`}>New</span>
                  <span className={styles.count}>{newContacts}</span>
                </div>
                <div className={styles.statusItem}>
                  <span className={`${styles.badge} ${styles.contacted}`}>Contacted</span>
                  <span className={styles.count}>{contacts.filter(c => c.status === 'contacted').length}</span>
                </div>
                <div className={styles.statusItem}>
                  <span className={`${styles.badge} ${styles.pending}`}>Pending</span>
                  <span className={styles.count}>{contacts.filter(c => c.status === 'pending').length}</span>
                </div>
                <div className={styles.statusItem}>
                  <span className={`${styles.badge} ${styles.completed}`}>Completed</span>
                  <span className={styles.count}>{completedContacts}</span>
                </div>
              </div>
            </div>

            <div className={styles.breakdownCard}>
              <h3>Enquiry Status Breakdown</h3>
              <div className={styles.statusBreakdown}>
                <div className={styles.statusItem}>
                  <span className={`${styles.badge} ${styles.new}`}>New</span>
                  <span className={styles.count}>{newEnquiries}</span>
                </div>
                <div className={styles.statusItem}>
                  <span className={`${styles.badge} ${styles.contacted}`}>Contacted</span>
                  <span className={styles.count}>{enquiries.filter(e => e.status === 'contacted').length}</span>
                </div>
                <div className={styles.statusItem}>
                  <span className={`${styles.badge} ${styles.pending}`}>Pending</span>
                  <span className={styles.count}>{enquiries.filter(e => e.status === 'pending').length}</span>
                </div>
                <div className={styles.statusItem}>
                  <span className={`${styles.badge} ${styles.completed}`}>Completed</span>
                  <span className={styles.count}>{completedEnquiries}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.quickLinks}>
            <h3>Quick Links</h3>
            <div className={styles.linkGrid}>
              <a href="/admin/dashboard/contacts" className={styles.link}>
                <AssignmentIcon />
                <span>Manage Contacts</span>
              </a>
              <a href="/admin/dashboard/enquiries" className={styles.link}>
                <MessageIcon />
                <span>Manage Enquiries</span>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
