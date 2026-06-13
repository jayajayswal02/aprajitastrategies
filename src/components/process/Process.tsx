import React from 'react';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import styles from './Process.module.css';
import ForumIcon from '@mui/icons-material/Forum';
import EditIcon from '@mui/icons-material/Edit';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import GavelIcon from '@mui/icons-material/Gavel';
import BuildIcon from '@mui/icons-material/Build';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Process() {
  const steps = [
    { number: '01', title: 'Consultation', desc: 'Initial contact to understand your vision.', icon: ForumIcon },
    { number: '02', title: 'Planning', desc: 'Developing strategies and timelines.', icon: EditIcon },
    { number: '03', title: 'Design', desc: 'Architectural and structural drafting.', icon: ArchitectureIcon },
    { number: '04', title: 'Approval', desc: 'Securing necessary permits.', icon: GavelIcon },
    { number: '05', title: 'Execution', desc: 'On-site construction and management.', icon: BuildIcon },
    { number: '06', title: 'Delivery', desc: 'Final handover of the completed project.', icon: CheckCircleIcon }
  ];

  return (
    <section className={`section-spacing ${styles.process}`}>
      <Container>
        <SectionTitle 
          subtitle="How We Work"
          title="Our Proven Methodology"
        />
        
        <div className={styles.timeline}>
          {steps.map((step, idx) => (
            <div key={idx} className={styles.timelineItem} style={{ '--index': idx } as React.CSSProperties}>
              <div className={styles.timelineContent}>
                <div className={styles.iconNode}>
                  <div className={styles.nodeCircle}>
                    <step.icon className={styles.stepIcon} />
                  </div>
                </div>
                
                <div className={styles.stepBox}>
                  <div className={styles.stepNumber}>{step.number}</div>
                  <h4 className={styles.stepTitle}>{step.title}</h4>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
              
              {idx < steps.length - 1 && (
                <div className={styles.connector}></div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
