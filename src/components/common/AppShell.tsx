'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNavbar = !pathname.startsWith('/admin');

  return (
    <>
      {showNavbar ? <Navbar /> : null}
      <main>{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
