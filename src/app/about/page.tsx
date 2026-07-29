'use client';

import React from 'react';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';
import About from '@/components/about/About';

export default function AboutPage() {
  return (
    <main>
      <Container>
        <SectionTitle subtitle="About Us" title="Who We Are" />
      </Container>
      <About />
    </main>
  );
}
