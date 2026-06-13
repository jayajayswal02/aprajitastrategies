import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import EnquiryModal from '../common/EnquiryModal';
import styles from './Services.module.css';
import servicesData from '../../data/services.json';

// Icons
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import FoundationIcon from '@mui/icons-material/Foundation';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import WeekendIcon from '@mui/icons-material/Weekend';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import PlumbIcon from '@mui/icons-material/Plumbing';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MessageIcon from '@mui/icons-material/Message';

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

export default function Services() {
  // Helper function to create URL-friendly slug from service title
  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
  };

  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const handleEnquiry = (service: any) => {
    setSelectedService(service);
    setShowEnquiryModal(true);
  };

  const handleCloseModal = () => {
    setShowEnquiryModal(false);
    setSelectedService(null);
  };
  return (
    <section id="services" className={`section-spacing ${styles.services}`}>
      <Container>
        <SectionTitle 
          subtitle="Our Expertise"
          title="Premium Consulting Services"
        />
        
        <div className={styles.servicesContainer}>
          {servicesData.map((service: any, idx: number) => {
            const IconComponent = iconMap[service.icon];
            const isEvenIndex = idx % 2 === 0;
            
            return (
              <div 
                key={service.id} 
                className={`${styles.serviceItem} ${isEvenIndex ? styles.imageLeft : styles.imageRight}`}
              >
                {/* Image Section */}
                <div className={styles.imageSection}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={500}
                    height={400}
                    className={styles.serviceImage}
                  />
                </div>

                {/* Content Section */}
                <div className={styles.contentSection}>
                  <div className={styles.iconBadge}>
                    {IconComponent && <IconComponent className={styles.badgeIcon} />}
                  </div>
                  
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDesc}>{service.description}</p>
                  
                  <div className={styles.buttonGroup}>
                    <button 
                      className={styles.enquiryBtn}
                      onClick={() => handleEnquiry(service)}
                    >
                      <MessageIcon className={styles.btnIcon} />
                      Send Enquiry
                    </button>
                    <Link 
                      href={`/services/${createSlug(service.title)}`}
                      className={styles.detailsBtn}
                    >
                      View Details
                      <ArrowForwardIcon className={styles.btnIcon} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      {/* Enquiry Modal */}
      {showEnquiryModal && (
        <EnquiryModal 
          isOpen={showEnquiryModal}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}
