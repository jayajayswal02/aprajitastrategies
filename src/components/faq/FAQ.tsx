'use client';

import React, { useState } from 'react';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import styles from './FAQ.module.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const faqs = [
  {
    q: 'What types of construction projects do you handle?',
    a: 'We handle a wide range of projects including premium residential, commercial complexes, and industrial facilities. Our team is equipped for both new constructions and major renovations.'
  },
  {
    q: 'Do you provide end-to-end consulting?',
    a: 'Yes, we provide comprehensive services starting from initial land surveying and architectural planning to structural design, estimation, and final execution supervision.'
  },
  {
    q: 'How do you ensure project timelines are met?',
    a: 'We implement rigorous project management frameworks and use milestone tracking to ensure every phase is completed on schedule without compromising on quality.'
  },
  {
    q: 'Are your designs sustainable?',
    a: 'Sustainability is at the core of our philosophy. We actively integrate eco-friendly materials, energy-efficient designs, and sustainable building protocols.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`section-spacing ${styles.faqSection}`}>
      <Container>
        <SectionTitle 
          subtitle="Frequently Asked Questions"
          title="Learn More About Our Work"
        />
        
        <div className={styles.accordion}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}
            >
              <button 
                className={styles.question}
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.q}</span>
                <span className={styles.iconWrapper}>
                  {openIndex === index ? <RemoveIcon /> : <AddIcon />}
                </span>
              </button>
              <div 
                className={styles.answer}
                style={{ maxHeight: openIndex === index ? '200px' : '0' }}
              >
                <div className={styles.answerInner}>
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
