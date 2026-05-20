import React from 'react';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import styles from './WhyChooseUs.module.css';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import NatureIcon from '@mui/icons-material/Nature';
import TimelineIcon from '@mui/icons-material/Timeline';

export default function WhyChooseUs() {
  const points = [
    {
      icon: WorkspacePremiumIcon,
      title: "Uncompromising Quality",
      desc: "Every project details are analyzed rigorously to meet top-tier construction standards."
    },
    {
      icon: IntegrationInstructionsIcon,
      title: "Expert Engineering Team",
      desc: "Led by industry veterans, our team seamlessly handles complex structural challenges."
    },
    {
      icon: TimelineIcon,
      title: "Time-Bound Delivery",
      desc: "Detailed project timelines and swift executions ensure we never miss deadlines."
    },
    {
      icon: NatureIcon,
      title: "Sustainable Planning",
      desc: "Eco-friendly material choices and energy-efficient building frameworks."
    }
  ];

  return (
    <section className={`section-spacing ${styles.whyUs}`}>
      <Container>
        <SectionTitle 
          subtitle="The Aprajita Strategies Advantage"
          title="Why Partner With Us?"
          dark
        />
        
        <div className={styles.content}>
          <div className={styles.timeline}>
            {points.map((point, idx) => (
              <div key={idx} className={styles.timelineItem}>
                <div className={styles.iconBox}>
                  <point.icon className={styles.icon} />
                </div>
                <div className={styles.textContent}>
                  <h4>{point.title}</h4>
                  <p>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
      

    </section>
  );
}
