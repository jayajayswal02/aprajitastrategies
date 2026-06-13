import React, { useState } from 'react';
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
  // Extract unique categories
  const categories = Array.from(
    new Set(projectsData.map((p: any) => p.category))
  ) as string[];
  
  const [activeTab, setActiveTab] = useState<string>('All');

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Commercial Design': '#2C3E50',
      'Residential Planning': '#34495E',
      'Structural Engineering': '#2C3E50',
      'Architectural Planning': '#34495E',
    };
    return colors[category] || '#2C3E50';
  };

  // Filter projects based on active tab
  const filteredProjects = activeTab === 'All' 
    ? projectsData 
    : projectsData.filter((p: any) => p.category === activeTab);

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
              Browse our comprehensive portfolio of architectural and construction projects
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tab} ${activeTab === 'All' ? styles.active : ''}`}
            onClick={() => setActiveTab('All')}
          >
            All Projects
            <span className={styles.tabCount}>({projectsData.length})</span>
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.tab} ${activeTab === category ? styles.active : ''}`}
              onClick={() => setActiveTab(category)}
            >
              {category}
              <span className={styles.tabCount}>
                ({projectsData.filter((p: any) => p.category === category).length})
              </span>
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project: { id: number; image: string; title: string; category: string; location: string; year: number; client: string; budget: string }) => (
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
            ))
          ) : (
            <div className={styles.noProjects}>
              <p>No projects found in this category.</p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
