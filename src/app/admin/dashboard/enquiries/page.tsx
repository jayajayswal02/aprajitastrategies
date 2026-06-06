'use client';

import React, { useEffect, useState } from 'react';
import {
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from '@/lib/supabase';
import styles from './enquiries.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorIcon from '@mui/icons-material/Error';
import PhoneIcon from '@mui/icons-material/Phone';
import MessageIcon from '@mui/icons-material/Message';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';

interface Enquiry {
  id: number;
  name: string;
  phone: string | null;
  project_type: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await getEnquiries();
      if (result.success) setEnquiries(result.data || []);
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Failed to fetch data');
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await updateEnquiryStatus(id, newStatus);
      setEnquiries(enquiries.map(e => e.id === id ? { ...e, status: newStatus } : e));
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Failed to update');
      alert(`Error: ${error.message}`);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await deleteEnquiry(id);
      setEnquiries(enquiries.filter(e => e.id !== id));
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Failed to delete');
      alert(`Error: ${error.message}`);
    }
  };

  const makeCall = (phone: string | null) => {
    if (!phone) {
      alert('No phone number available');
      return;
    }
    window.location.href = `tel:${phone}`;
  };

  const sendSMS = (phone: string | null) => {
    if (!phone) {
      alert('No phone number available');
      return;
    }
    window.location.href = `sms:${phone}`;
  };

  const sendWhatsApp = (phone: string | null) => {
    if (!phone) {
      alert('No phone number available');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}`, '_blank');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Enquiries Management</h1>
        <button className={styles.refreshBtn} onClick={fetchData} disabled={loading}>
          <RefreshIcon /> {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className={styles.errorAlert}>
          <ErrorIcon className={styles.errorIcon} />
          {error}
        </div>
      )}

      <div className={styles.statsCard}>
        <h3>Total Enquiries: <span className={styles.number}>{enquiries.length}</span></h3>
        <p>New: <strong>{enquiries.filter(e => e.status === 'new').length}</strong> | Contacted: <strong>{enquiries.filter(e => e.status === 'contacted').length}</strong></p>
      </div>

      <div className={styles.tableContainer}>
        {enquiries.length === 0 ? (
          <p className={styles.emptyState}>No enquiries yet</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Service Type</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry) => (
                <tr key={enquiry.id} className={styles.row}>
                  <td className={styles.bold}>{enquiry.name}</td>
                  <td>{enquiry.phone || '—'}</td>
                  <td>{enquiry.project_type || '—'}</td>
                  <td>
                    <select
                      value={enquiry.status}
                      onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                      className={styles.statusSelect}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td className={styles.small}>
                    {new Date(enquiry.created_at).toLocaleDateString()}
                  </td>
                  <td className={styles.actions}>
                    <div className={styles.actionGroup}>
                      <button
                        className={`${styles.actionBtn} ${styles.call}`}
                        onClick={() => makeCall(enquiry.phone)}
                        title="Call"
                      >
                        <PhoneIcon />
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.sms}`}
                        onClick={() => sendSMS(enquiry.phone)}
                        title="Send SMS"
                      >
                        <MessageIcon />
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.whatsapp}`}
                        onClick={() => sendWhatsApp(enquiry.phone)}
                        title="Send WhatsApp"
                      >
                        <WhatsAppIcon />
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.view}`}
                        onClick={() => setSelectedEnquiry(enquiry)}
                        title="View Details"
                      >
                        <VisibilityIcon />
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.delete}`}
                        onClick={() => handleDelete(enquiry.id)}
                        title="Delete"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedEnquiry && (
        <div className={styles.modalOverlay} onClick={() => setSelectedEnquiry(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Enquiry Details</h2>
              <button className={styles.closeBtn} onClick={() => setSelectedEnquiry(null)}>
                <CloseIcon />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.detailRow}>
                <strong>Name:</strong>
                <span>{selectedEnquiry.name}</span>
              </div>
              <div className={styles.detailRow}>
                <strong>Phone:</strong>
                <span>{selectedEnquiry.phone || '—'}</span>
              </div>
              <div className={styles.detailRow}>
                <strong>Service Type:</strong>
                <span>{selectedEnquiry.project_type || '—'}</span>
              </div>
              <div className={styles.detailRow}>
                <strong>Status:</strong>
                <span className={`${styles.status} ${styles[selectedEnquiry.status]}`}>{selectedEnquiry.status}</span>
              </div>
              <div className={styles.detailRow}>
                <strong>Date:</strong>
                <span>{new Date(selectedEnquiry.created_at).toLocaleString()}</span>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.closeButtonPrimary} onClick={() => setSelectedEnquiry(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
