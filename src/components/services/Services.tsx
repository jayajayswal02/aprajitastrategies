import React from 'react';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import styles from './Services.module.css';

// Icons
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import FoundationIcon from '@mui/icons-material/Foundation';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import WeekendIcon from '@mui/icons-material/Weekend';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import PlumbIcon from '@mui/icons-material/Plumbing'; // Alternative for inspection
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';

const services = [
  { icon: MapsHomeWorkIcon, title: "Construction Consultancy", desc: "Expert guidance for residential and commercial construction." },
  { icon: SquareFootIcon, title: "Architectural Planning", desc: "Innovative and sustainable architectural designs tailored to you." },
  { icon: FoundationIcon, title: "Structural Design", desc: "Robust structural engineering ensuring safety and longevity." },
  { icon: WeekendIcon, title: "Interior Design", desc: "Elegant aesthetics combined with functional interior spaces." },
  { icon: ManageHistoryIcon, title: "Project Management", desc: "End-to-end execution, ensuring timely and on-budget delivery." },
  { icon: PlumbIcon, title: "Site Inspection", desc: "Rigorous quality checks and on-site engineering supervision." },
  { icon: AccountBalanceWalletIcon, title: "Estimation & Costing", desc: "Precise budgeting and financial planning for your projects." },
  { icon: ThreeDRotationIcon, title: "3D Visualization", desc: "Photorealistic renders and walkthroughs before construction begins." }
];

export default function Services() {
  return (
    <section id="services" className={`section-spacing ${styles.services}`}>
      <Container>
        <SectionTitle 
          subtitle="Our Expertise"
          title="Premium Consulting Services"
        />
        
        <div className={styles.grid}>
          {services.map((service, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.iconWrapper}>
                <service.icon className={styles.icon} />
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.desc}</p>
              
              {/* Subtle hover decoration */}
              <div className={styles.cardHoverBg}></div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
