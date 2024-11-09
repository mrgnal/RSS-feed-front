// TopFeatures.tsx
'use client';
import React from 'react';
import SmallCard from '@/app/components/landing/cardComponents/smallCard/smallCard';
import styles from './topFeatures.module.css';

interface Feature {
  imageSrc: string;
  title: string;
  description: string;
}

const TopFeatures: React.FC = () => {
  const features: Feature[] = [
    {
      imageSrc: '/static/svg/landing/NoCodingBold2.svg',
      title: 'No Coding',
      description: 'Simply copy and paste the URL into the feed generator or RSS builder'
    },
    {
      imageSrc: '/static/svg/landing/Images2.svg',
      title: 'Customization',
      description: 'Extract large images & customize your feed with advanced filters'
    },
    {
      imageSrc: '/static/svg/landing/Share2.svg',
      title: 'Auto-updated',
      description: 'The feed will update automatically, so you never miss any updates'
    },
    {
      imageSrc: '/static/svg/landing/SocialMedia2.svg',
      title: 'Dynamic Widgets',
      description: 'Bring content to your users with adaptive and simple widgets'
    }
  ];

  return (
    <section className={styles.topFeatures}>
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Top Features</h2>
        </div>
        
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <SmallCard
              key={index}
              imageSrc={feature.imageSrc}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopFeatures;