import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import styles from './Projects.module.css';
import projectsData from '../../data/projects.json';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';

export default function Projects() {
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Commercial Design': '#FF6B35',
      'Residential Planning': '#4ECDC4',
      'Structural Engineering': '#45B7D1',
      'Architectural Planning': '#96CEB4',
    };
    return colors[category] || '#FF6B35';
  };

  return (
    <section id="projects" className={`section-spacing ${styles.projects}`}>
      <Container>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <SectionTitle 
              alignment="left"
              subtitle="Our Portfolio"
              title="Featured Projects"
            />
            <p className={styles.headerDesc}>
              Showcase of our most innovative and impactful construction projects
            </p>
          </div>
          <div className={styles.headerBtn}>
            <Button variant="outline">View All Projects</Button>
          </div>
        </div>

        <div className={styles.grid}>
          {projectsData.map((project: { id: number; image: string; title: string; category: string; location: string; year: number; client: string; budget: string }) => (
            <Link key={project.id} href={`/projects/${project.id}`} className={styles.projectCardLink}>
              <div className={styles.projectCard}>
                {/* Image Container */}
                <div className={styles.imageContainer}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={280}
                    className={styles.projectImage}
                  />
                  
                  {/* Category Badge */}
                  <div 
                    className={styles.categoryBadge} 
                    style={{ backgroundColor: getCategoryColor(project.category) }}
                  >
                    {project.category}
                  </div>

                  {/* Quick Info Overlay */}
                  <div className={styles.quickInfo}>
                    <div className={styles.infoItem}>
                      <CalendarTodayIcon className={styles.infoIcon} />
                      <span>{project.year}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <LocationOnIcon className={styles.infoIcon} />
                      <span>{project.location}</span>
                    </div>
                  </div>
                </div>

                {/* Content Container */}
                <div className={styles.contentContainer}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  
                  <div className={styles.projectMeta}>
                    <div className={styles.metaItem}>
                      <PersonIcon className={styles.metaIcon} />
                      <span className={styles.metaText}>{project.client}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <AttachMoneyIcon className={styles.metaIcon} />
                      <span className={styles.metaText}>{project.budget}</span>
                    </div>
                  </div>

                  <button className={styles.viewDetailsBtn}>
                    View Details
                    <ArrowForwardIcon className={styles.btnIcon} />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
