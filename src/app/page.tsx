'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/hero/Hero';
import About from '@/components/about/About';
import Services from '@/components/services/Services';
import WhyChooseUs from '@/components/why-choose-us/WhyChooseUs';
import Projects from '@/components/projects/Projects';
import Process from '@/components/process/Process';
import Testimonials from '@/components/testimonials/Testimonials';
import FAQ from '@/components/faq/FAQ';
import Blog from '@/components/blog/Blog';
import Contact from '@/components/contact/Contact';
import JsonLd from '@/components/seo/JsonLd';
import { getBreadcrumbSchema } from '@/components/seo/structuredData';
import EnquiryModal from '@/components/common/EnquiryModal';

export default function Home() {
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  useEffect(() => {
    // Show modal after 2 seconds on page load
    const timer = setTimeout(() => {
      setShowEnquiryModal(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://www.aprajitastrategics.com/' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Projects />
      <Process />
      <Testimonials />
      <Blog />
      <FAQ />
      <Contact />
      <EnquiryModal 
        isOpen={showEnquiryModal} 
        onClose={() => setShowEnquiryModal(false)} 
      />
    </>
  );
}
