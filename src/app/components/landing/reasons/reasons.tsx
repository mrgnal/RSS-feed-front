import React from 'react';
import BigCard from '@/app/components/landing/cardComponents/bigCard/bigCard';
import styles from './reasons.module.css';

const Reasons = () => {
  const reasonsData = [
    {
      imageSrc: '/logo-icon.svg',
      title: 'Generate RSS feeds',
      description: 'No coding required. Our feed generator can pick the right content for you'
    },
    {
      imageSrc: '/logo-icon.svg',
      title: 'Embed News Feeds',
      description: 'Add auto-updated dynamic content to your website or mobile app'
    },
    {
      imageSrc: '/logo-icon.svg',
      title: 'Increase Engagement',
      description: 'Syndicate your content and make it easy for users to access and consume your content'
    }
  ];

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <h2 className={styles.title}>3 Reasons Why You Should Use RSS.app</h2>
        <ul className={styles.list}>
          {reasonsData.map((reason, index) => (
            <li key={index} className={styles.item}>
              <BigCard
                imageSrc={reason.imageSrc}
                title={reason.title}
                description={reason.description}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Reasons;