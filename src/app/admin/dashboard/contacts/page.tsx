'use client';

import React, { useEffect, useState } from 'react';
import {
  getContacts,
  updateContactStatus,
  deleteContact,
} from '@/lib/supabase';
import styles from './contacts.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorIcon from '@mui/icons-material/Error';
import PhoneIcon from '@mui/icons-material/Phone';
import MessageIcon from '@mui/icons-material/Message';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';

interface Contact {
  id: number;
  name: string;
  phone: string | null;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await getContacts();
      if (result.success) setContacts(result.data || []);
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Failed to fetch data');
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await updateContactStatus(id, newStatus);
      setContacts(contacts.map(c => c.id === id ? { ...c, status: newStatus } : c));
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Failed to update');
      alert(`Error: ${error.message}`);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    try {
      await deleteContact(id);
      setContacts(contacts.filter(c => c.id !== id));
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
        <h1>Contacts Management</h1>
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
        <h3>Total Contacts: <span className={styles.number}>{contacts.length}</span></h3>
        <p>New: <strong>{contacts.filter(c => c.status === 'new').length}</strong> | Contacted: <strong>{contacts.filter(c => c.status === 'contacted').length}</strong></p>
      </div>

      <div className={styles.tableContainer}>
        {contacts.length === 0 ? (
          <p className={styles.emptyState}>No contacts yet</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className={styles.row}>
                  <td className={styles.bold}>{contact.name}</td>
                  <td>{contact.phone || '—'}</td>
                  <td className={styles.message}>{contact.message.substring(0, 50)}...</td>
                  <td>
                    <select
                      value={contact.status}
                      onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                      className={styles.statusSelect}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td className={styles.small}>
                    {new Date(contact.created_at).toLocaleDateString()}
                  </td>
                  <td className={styles.actions}>
                    <div className={styles.actionGroup}>
                      <button
                        className={`${styles.actionBtn} ${styles.call}`}
                        onClick={() => makeCall(contact.phone)}
                        title="Call"
                      >
                        <PhoneIcon />
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.sms}`}
                        onClick={() => sendSMS(contact.phone)}
                        title="Send SMS"
                      >
                        <MessageIcon />
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.whatsapp}`}
                        onClick={() => sendWhatsApp(contact.phone)}
                        title="Send WhatsApp"
                      >
                        <WhatsAppIcon />
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.view}`}
                        onClick={() => setSelectedContact(contact)}
                        title="View Details"
                      >
                        <VisibilityIcon />
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.delete}`}
                        onClick={() => handleDelete(contact.id)}
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

      {selectedContact && (
        <div className={styles.modalOverlay} onClick={() => setSelectedContact(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Contact Details</h2>
              <button className={styles.closeBtn} onClick={() => setSelectedContact(null)}>
                <CloseIcon />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.detailRow}>
                <strong>Name:</strong>
                <span>{selectedContact.name}</span>
              </div>
              <div className={styles.detailRow}>
                <strong>Phone:</strong>
                <span>{selectedContact.phone || '—'}</span>
              </div>
              <div className={styles.detailRow}>
                <strong>Message:</strong>
                <span className={styles.fullMessage}>{selectedContact.message}</span>
              </div>
              <div className={styles.detailRow}>
                <strong>Status:</strong>
                <span className={`${styles.status} ${styles[selectedContact.status]}`}>{selectedContact.status}</span>
              </div>
              <div className={styles.detailRow}>
                <strong>Date:</strong>
                <span>{new Date(selectedContact.created_at).toLocaleString()}</span>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.closeButtonPrimary} onClick={() => setSelectedContact(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
