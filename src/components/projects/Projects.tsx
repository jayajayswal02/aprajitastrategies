import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import styles from './Projects.module.css';
import projectsData from '../../data/projects.json';

export default function Projects() {
  return (
    <section id="projects" className={`section-spacing ${styles.projects}`}>
      <Container>
        <div className={styles.header}>
          <SectionTitle 
            alignment="left"
            subtitle="Our Portfolio"
            title="Featured Projects"
          />
          <div className={styles.headerBtn}>
            <Button variant="outline">View All Projects</Button>
          </div>
        </div>

        <div className={styles.grid}>
          {projectsData.map((project: { id: number; image: string; title: string; category: string }) => (
            <Link key={project.id} href={`/projects/${project.id}`} className={styles.projectCardLink}>
              <div className={styles.projectCard}>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={300}
                  className={styles.projectImage}
                />
                <div className={styles.overlay}>
                  <div className={styles.overlayContent}>
                    <span className={styles.category}>{project.category}</span>
                    <h3 className={styles.title}>{project.title}</h3>
                  
                  </div>
                </div>
                
              </div>
                <button className={styles.viewDetailsBtn}>
                      View Details
                    </button>
            </Link>
            
          ))}
        </div>
      </Container>
    </section>
  );
}
