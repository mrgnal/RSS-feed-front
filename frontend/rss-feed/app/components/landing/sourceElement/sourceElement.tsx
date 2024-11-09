import React from 'react';
import styles from './sourceElement.module.css';

interface SourcesProps {
  className?: string;
}

const Sources: React.FC<SourcesProps> = ({ className }) => {
  const sources = [
    {
      title: 'Web to RSS',
      description: 'Web to RSS keeps you updated on the latest news and updates from websites that don\'t offer RSS feeds',
      imageSrc: '/static/svg/landing/webToRss.svg'
    },
    {
      title: 'Google News',
      description: 'Google News provides RSS feeds for a variety of categories such as world news, business, technology, and more',
      imageSrc: '/static/svg/landing/googleNews.svg'
    },
    {
      title: 'X / Twitter',
      description: 'Offers a X / Twitter RSS feed generator that allows you to create feeds for individual users or specific keywords',
      imageSrc: '/static/svg/landing/X.svg'
    },
    {
      title: 'YouTube',
      description: 'YouTube provides RSS feeds for channels, allowing users to receive updates on new video uploads',
      imageSrc: '/static/svg/landing/youtube.svg'
    },
    {
      title: 'TikTok',
      description: 'Provides a TikTok RSS feed generator that allows you to create feeds for a specific TikTok user or search term',
      imageSrc: '/static/svg/landing/tiktok.svg'
    },
    {
      title: 'Topics and Keywords',
      description: 'Create your own RSS feeds based on keywords or topics and receive updates every time new content is published',
      imageSrc: '/static/svg/landing/topicsAndKeywords.svg'
    }
  ];

  return (
    <section className={styles.root}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>Top RSS Sources</h2>
        <p className={styles.subtitle}>
          Get the latest news and updates from top sources with RSS feeds. Stay informed on 
          world events, technology, business, and more
        </p>
      </div>
      <div className={styles.container}>
        <div className={styles.grid}>
          {sources.map((source, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardContent}>
                <div className={styles.iconWrapper}>
                  <img 
                    src={source.imageSrc}
                    alt={source.title}
                    className={styles.icon}
                  />
                </div>
                <div className={styles.textContent}>
                  <h3 className={styles.cardTitle}>{source.title}</h3>
                  <p className={styles.cardDescription}>{source.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sources;