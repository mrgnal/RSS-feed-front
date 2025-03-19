import React from 'react';
import styles from './trustedBy.module.css';

const TrustedBy: React.FC = () => {
  const companies = [
    { src: '/Ohio.svg', alt: 'Ohio University' },
    { src: '/Webflow.svg', alt: 'Webflow' },
    { src: '/Microsoft.svg', alt: 'Microsoft' },
    { src: '/HubSpot.svg', alt: 'HubSpot' },
  ];

  return (
    <section className={styles.root}>
      <h2 className={styles.title}>Trusted and used by thousands of companies</h2>
      <ul className={styles.list}>
        {companies.map((company, index) => (
          <li key={index} className={styles.item}>
            <img
              src={company.src}
              alt={company.alt}
              width="144"
              height="42"
              loading="eager"
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TrustedBy;
