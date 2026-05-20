import React from 'react';
import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import styles from './Testimonials.module.css';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import StarIcon from '@mui/icons-material/Star';

const reviews = [
  {
    name: 'Rajesh Kumar',
    role: 'CEO, Mumbai Enterprises',
    text: 'Aprajita Strategies transformed our vision into an architectural masterpiece. The structural integrity and attention to detail were second to none.',
    rating: 5
  },
  {
    name: 'Priya Sharma',
    role: 'Property Developer, Delhi',
    text: 'Working with the Aprajita Strategies team was seamless. Their project management kept us on budget while delivering premium results.',
    rating: 5
  },
  {
    name: 'Anita Gupta',
    role: 'Homeowner, Bangalore',
    text: 'They built our dream home. The 3D visualization helped us see everything beforehand, and the final result was even better.',
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className={`section-spacing ${styles.testimonials}`}>
      <Container>
        <SectionTitle 
          subtitle="Client Feedback"
          title="What Our Clients Say"
        />
        
        <div className={styles.grid}>
          {reviews.map((review, idx) => (
            <div key={idx} className={styles.card}>
              <FormatQuoteIcon className={styles.quoteIcon} />
              
              <div className={styles.rating}>
                {[...Array(review.rating)].map((_, i) => (
                  <StarIcon key={i} className={styles.star} />
                ))}
              </div>
              
              <p className={styles.text}>&quot;{review.text}&quot;</p>
              
              <div className={styles.author}>
                <div className={styles.avatar}>{review.name.charAt(0)}</div>
                <div>
                  <h4 className={styles.name}>{review.name}</h4>
                  <span className={styles.role}>{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
