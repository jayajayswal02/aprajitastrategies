import React from 'react';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import styles from './Process.module.css';

export default function Process() {
  const steps = [
    { number: '01', title: 'Consultation', desc: 'Initial contact to understand your vision.' },
    { number: '02', title: 'Planning', desc: 'Developing strategies and timelines.' },
    { number: '03', title: 'Design', desc: 'Architectural and structural drafting.' },
    { number: '04', title: 'Approval', desc: 'Securing necessary permits.' },
    { number: '05', title: 'Execution', desc: 'On-site construction and management.' },
    { number: '06', title: 'Delivery', desc: 'Final handover of the completed project.' }
  ];

  return (
    <section className={`section-spacing ${styles.process}`}>
      <Container>
        <SectionTitle 
          subtitle="How We Work"
          title="Our Proven Methodology"
        />
        
        <div className={styles.processGrid}>
          {steps.map((step, idx) => (
            <div key={idx} className={styles.stepCard}>
              <div className={styles.stepNumber}>{step.number}</div>
              <h4 className={styles.stepTitle}>{step.title}</h4>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
