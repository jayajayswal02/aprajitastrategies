'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from './AdminNavbar.module.css';
import Logo from '../../../public/logoORANGE.png';
import { logoutAdmin } from '@/lib/supabase';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MessageIcon from '@mui/icons-material/Message';
import LogoutIcon from '@mui/icons-material/Logout';

export default function AdminNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logoutAdmin();
      router.push('/admin/login');
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo Section */}
        <Link href="/admin/dashboard" className={styles.logo}>
          <Image
            src={Logo}
            alt="Aprajita Strategies"
            width={45}
            height={45}
            className={styles.logoImg}
          />
          <span className={styles.brandName}>Admin Panel</span>
        </Link>

        {/* Nav Links */}
        <ul className={styles.navLinks}>
          <li>
            <Link
              href="/admin/dashboard"
              className={`${styles.navLink} ${isActive('/admin/dashboard') ? styles.active : ''}`}
            >
              <DashboardIcon className={styles.icon} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/dashboard/contacts"
              className={`${styles.navLink} ${isActive('/admin/dashboard/contacts') ? styles.active : ''}`}
            >
              <AssignmentIcon className={styles.icon} />
              <span>Contacts</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/dashboard/enquiries"
              className={`${styles.navLink} ${isActive('/admin/dashboard/enquiries') ? styles.active : ''}`}
            >
              <MessageIcon className={styles.icon} />
              <span>Enquiries</span>
            </Link>
          </li>
        </ul>

        {/* Logout Button */}
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogoutIcon className={styles.icon} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}
