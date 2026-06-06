'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AdminNavbar from '@/components/admin/AdminNavbar';
import { getAdminSession } from '@/lib/supabase';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  React.useEffect(() => {
    const session = getAdminSession();
    if (!session && typeof window !== 'undefined') {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <>
      <AdminNavbar />
      <main>{children}</main>
    </>
  );
}
