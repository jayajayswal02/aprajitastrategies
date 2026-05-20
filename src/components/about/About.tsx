import React from 'react';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import styles from './About.module.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Image from 'next/image';
import AboutImage from '../../../public/about.jpg'

export default function About() {
  const features = [
    "Premium Architectural Design",
    "Sustainable Engineering",
    "End-to-End Project Management",
    "Stringent Quality Control"
  ];

  return (
    <section id="about" className={`section-spacing ${styles.about}`}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.imageColumn}>
            <div className={styles.imageWrapper}>
              {/* Using a structural CSS shape as a placeholder for professional image */}
              <div className={styles.imagePlaceholder}>
                {/* <div className={styles.imagePattern}></div> */}
                <Image 
                  src={AboutImage} 
                  alt="Business professional" 
                  width={860}
                  height={1000}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>
              <div className={styles.experienceBadge}>
                <span className={styles.years}>15+</span>
                <span className={styles.text}>Years of<br />Excellence</span>
              </div>
            </div>
          </div>
          
          <div className={styles.contentColumn}>
            <SectionTitle 
              alignment="left"
              subtitle="About Aprajita Strategies" 
              title="Shaping the Future with Precision & Elegance" 
            />
            
            <p className={styles.description}>
              Aprajita Strategies is a premium construction consultancy dedicated to bridging the gap between innovative architectural vision and structural reality. With over a decade of excellence, we have consistently delivered world-class engineering and planning solutions.
            </p>
            
            <p className={styles.description}>
              Our mission is to foster sustainable, efficient, and exceptionally modern environments. Our approach blends state-of-the-art methodology with meticulously curated aesthetic design.
            </p>
            
            <ul className={styles.featureList}>
              {features.map((feature, idx) => (
                <li key={idx} className={styles.featureItem}>
                  <CheckCircleIcon className={styles.icon} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className={styles.cta}>
              <Button>More About Us</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
