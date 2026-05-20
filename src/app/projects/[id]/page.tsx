'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import projectsData from '@/data/projects.json';
import styles from './ProjectDetail.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TimerIcon from '@mui/icons-material/Timer';

export default function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const projectId = Number(id);
  
  const project = projectsData.find((p: { id: number }) => p.id === projectId);

  if (!project) {
    return (
      <div className={styles.notFound}>
        <Container>
          <h1>Project Not Found</h1>
          <Link href="/#projects">
            <Button>Back to Projects</Button>
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div className={styles.projectDetail}>
      <Container>
        <Link href="/#projects" className={styles.backLink}>
          <ArrowBackIcon /> Back to Projects
        </Link>

        <div className={styles.hero}>
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={500}
            className={styles.heroImage}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.category}>{project.category}</span>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.location}>
              <LocationOnIcon /> {project.location}
            </p>
          </div>

          <div className={styles.grid}>
            <div className={styles.mainContent}>
              <section className={styles.section}>
                <h2>About Project</h2>
                <p>{project.details}</p>
              </section>

              <section className={styles.section}>
                <h2>Key Features</h2>
                <ul className={styles.featuresList}>
                  {project.features.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className={styles.sidebar}>
              <div className={styles.infoCard}>
                <h3>Project Information</h3>
                
                <div className={styles.infoItem}>
                  <CalendarTodayIcon />
                  <div>
                    <label>Completion Year</label>
                    <p>{project.year}</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <PersonIcon />
                  <div>
                    <label>Client</label>
                    <p>{project.client}</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <AttachMoneyIcon />
                  <div>
                    <label>Budget</label>
                    <p>{project.budget}</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <TimerIcon />
                  <div>
                    <label>Duration</label>
                    <p>{project.duration}</p>
                  </div>
                </div>

                <div className={styles.buttonGroup}>
                  <Button fullWidth className={styles.contactBtn}>
                    Get a Quote
                  </Button>
                  <Link href="/#contact" className={styles.viewBtn}>
                    <Button fullWidth variant="outline">
                      View More Details
                    </Button>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </div>
  );
}
