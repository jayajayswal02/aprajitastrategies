'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Container from '../../../components/common/Container';
import EnquiryModal from '../../../components/common/EnquiryModal';
import servicesData from '../../../data/services.json';
import styles from './ServiceDetail.module.css';

// Icons
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import FoundationIcon from '@mui/icons-material/Foundation';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import WeekendIcon from '@mui/icons-material/Weekend';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import PlumbIcon from '@mui/icons-material/Plumbing';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MessageIcon from '@mui/icons-material/Message';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const iconMap: { [key: string]: any } = {
  'construction': MapsHomeWorkIcon,
  'architecture': SquareFootIcon,
  'structure': FoundationIcon,
  'interior': WeekendIcon,
  'management': ManageHistoryIcon,
  'inspection': PlumbIcon,
  'costing': AccountBalanceWalletIcon,
  'visualization': ThreeDRotationIcon
};

export default function ServiceDetail() {
  const params = useParams();
  const slug = params.id as string;
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  // Helper function to create URL-friendly slug from service title
  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
  };

  // Find service by slug (or by numeric ID for backward compatibility)
  let service = servicesData.find((s: any) => {
    const isNumeric = !isNaN(Number(slug));
    if (isNumeric) {
      return s.id === Number(slug);
    } else {
      return createSlug(s.title) === slug;
    }
  });

  if (!service) {
    return (
      <div className={styles.notFound}>
        <Container>
          <h1>Service not found</h1>
          <Link href="/services" className={styles.backLink}>
            <ArrowBackIcon /> Back to Services
          </Link>
        </Container>
      </div>
    );
  }

  const IconComponent = iconMap[service.icon];

  const handleEnquiry = () => {
    setShowEnquiryModal(true);
  };

  return (
    <main className={styles.serviceDetail}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <Container>
          <Link href="/#services" className={styles.backLink}>
            <ArrowBackIcon /> Back to Services
          </Link>
          
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              {IconComponent && <IconComponent className={styles.heroIcon} />}
            </div>
            <h1 className={styles.heroTitle}>{service.title}</h1>
            <p className={styles.heroDesc}>{service.description}</p>
            
            <button className={styles.enquiryBtnLarge} onClick={handleEnquiry}>
              <MessageIcon /> Send Enquiry Now
            </button>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className={styles.contentSection}>
        <Container>
          <div className={styles.contentGrid}>
            {/* Content Section */}
            <div className={styles.fullColumn}>
              <div className={styles.detailBox}>
                <h2 className={styles.sectionTitle}>About This Service</h2>
                <p className={styles.sectionText}>
                  {service.description}
                </p>
              </div>

              <div className={styles.detailBox}>
                <h2 className={styles.sectionTitle}>Overview</h2>
                <p className={styles.sectionText}>
                  {service.overview}
                </p>
              </div>

              <div className={styles.detailBox}>
                <h2 className={styles.sectionTitle}>Our Process</h2>
                <ol className={styles.processList}>
                  {service.process && service.process.map((step: string, idx: number) => (
                    <li key={idx} className={styles.processItem}>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className={styles.detailBox}>
                <h2 className={styles.sectionTitle}>Key Features & Highlights</h2>
                <ul className={styles.featuresList}>
                  {service.features && service.features.map((feature: string, idx: number) => (
                    <li key={idx} className={styles.featureItem}>
                      <CheckCircleIcon className={styles.checkIcon} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.detailBox}>
                <h2 className={styles.sectionTitle}>Detailed Information</h2>
                <p className={styles.sectionText}>
                  {service.details}
                </p>
              </div>

              <div className={styles.actionBox}>
                <button className={styles.enquiryBtn} onClick={handleEnquiry}>
                  <MessageIcon /> Send Enquiry
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Services */}
      {/* Removed - Explore More Services section */}

      {/* Enquiry Modal */}
      {showEnquiryModal && (
        <EnquiryModal
          isOpen={showEnquiryModal}
          onClose={() => setShowEnquiryModal(false)}
          serviceTitle={service.title}
          serviceId={service.id}
        />
      )}
    </main>
  );
}
