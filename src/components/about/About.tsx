import React from 'react';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import styles from './About.module.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SecurityIcon from '@mui/icons-material/Security';

export default function About() {
  const coreValues = [
    {
      icon: LightbulbIcon,
      title: "Innovation",
      description: "Cutting-edge solutions that push architectural boundaries"
    },
    {
      icon: SecurityIcon,
      title: "Quality",
      description: "Uncompromising standards in every project delivered"
    },
    {
      icon: GroupsIcon,
      title: "Collaboration",
      description: "Partnering with clients to realize their vision"
    },
    {
      icon: EmojiEventsIcon,
      title: "Excellence",
      description: "Award-winning expertise across all disciplines"
    }
  ];

  const features = [
    "Premium Architectural Design",
    "Sustainable Engineering",
    "End-to-End Project Management",
    "Stringent Quality Control"
  ];

  const expertise = [
    { title: "Structural Engineering", description: "Advanced structural analysis and design for residential and commercial projects" },
    { title: "Architectural Planning", description: "Innovative designs that blend aesthetics with functionality" },
    { title: "Project Management", description: "Seamless coordination from conception to completion" },
    { title: "Sustainability", description: "Eco-friendly solutions for modern construction challenges" },
    { title: "BIM Technology", description: "Building Information Modeling for precision and efficiency" },
    { title: "Quality Assurance", description: "Rigorous quality control at every stage of development" }
  ];

  return (
    <section id="about" className={`section-spacing ${styles.about}`}>
      <Container>
        {/* Company Overview - Centered */}
        <div className={styles.overviewCenter}>
          <SectionTitle 
            alignment="center"
            subtitle="About Aprajita Strategies" 
            title="Shaping the Future with Precision & Elegance" 
          />
          
          <p className={styles.descriptionCenter}>
            Aprajita Strategies is a premier architectural and construction consultancy dedicated to transforming visionary ideas into structural realities. With over 15 years of excellence in the industry, we have established ourselves as leaders in delivering world-class engineering and planning solutions that exceed client expectations.
          </p>
          
          <p className={styles.descriptionCenter}>
            Our mission is to foster sustainable, efficient, and exceptionally modern environments that stand the test of time. We blend state-of-the-art methodology with meticulously curated aesthetic design, ensuring every project reflects both functionality and beauty.
          </p>
        </div>

        {/* Expertise Areas */}
        <div className={styles.expertiseSection}>
          <h2 className={styles.sectionHeading}>Our Areas of Expertise</h2>
          <div className={styles.expertiseGrid}>
            {expertise.map((item, idx) => (
              <div key={idx} className={styles.expertiseCard}>
                <h4 className={styles.expertiseTitle}>{item.title}</h4>
                <p className={styles.expertiseDescription}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className={styles.missionVisionSection}>
          <div className={styles.missionCard}>
            <h3 className={styles.missionTitle}>Our Mission</h3>
            <p className={styles.missionText}>
              To deliver exceptional architectural and engineering solutions that combine innovation, sustainability, and excellence, while maintaining the highest standards of professional integrity and client satisfaction.
            </p>
          </div>
          <div className={styles.visionCard}>
            <h3 className={styles.missionTitle}>Our Vision</h3>
            <p className={styles.missionText}>
              To be recognized as the leading consultancy in transforming architectural visions into reality, setting industry benchmarks for quality, innovation, and sustainable development across all project scales.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className={styles.valuesSection}>
          <h2 className={styles.sectionHeading}>Our Core Values</h2>
          <div className={styles.valuesGrid}>
            {coreValues.map((value, idx) => {
              const IconComponent = value.icon;
              return (
                <div key={idx} className={styles.valueCard}>
                  <div className={styles.valueIcon}>
                    <IconComponent />
                  </div>
                  <h3 className={styles.valueTitle}>{value.title}</h3>
                  <p className={styles.valueDescription}>{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Strengths */}
        <div className={styles.strengthsSection}>
          <div className={styles.strengthsContent}>
            <h2 className={styles.sectionHeading}>Why Choose Aprajita Strategies?</h2>
            
            <ul className={styles.featureList}>
              {features.map((feature, idx) => (
                <li key={idx} className={styles.featureItem}>
                  <CheckCircleIcon className={styles.icon} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <p className={styles.detailDescription}>
              Our team comprises seasoned architects, structural engineers, and project managers who bring decades of combined experience. We leverage the latest technology and industry best practices to deliver projects on time, within budget, and exceeding quality standards.
            </p>

            <p className={styles.detailDescription}>
              From initial concept to final execution, we maintain transparent communication and collaborative partnerships with our clients, ensuring every project reflects their unique vision and requirements. Our commitment to excellence has resulted in numerous awards and recognitions from industry bodies.
            </p>

            <p className={styles.detailDescription}>
              With a portfolio spanning residential, commercial, institutional, and industrial sectors, we bring versatile expertise to every challenge. Our approach is always client-centric, ensuring that each project receives customized solutions tailored to specific needs and objectives.
            </p>

            <div className={styles.ctaSection}>
              <Button>Get Consultation</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
