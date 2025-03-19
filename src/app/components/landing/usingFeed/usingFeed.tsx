import React from 'react';
import styles from './usingFeed.module.css';
import LargeCard  from '@/app/components/landing/cardComponents/largeCard/largeCard';

interface UsingFeedProps {
  className?: string;
}

const UsingFeed: React.FC<UsingFeedProps> = ({ className }) => {
  const UsingFeed = [
    {
      title: 'News Aggregation',
      description: 'One of the most popular uses of RSS feeds is to aggregate news from multiple sources into a single feed',
      imageSrc: '/logo-icon.svg'
    },
    {
      title: 'Personalized Content',
      description: 'Many websites offer RSS feeds for specific topics or categories to help you get relevant and up-to-date content',
      imageSrc: '/static/svg/landing/Content.svg'
    },
    {
      title: 'Research and Monitoring',
      description: 'By subscribing to RSS feeds from industry blogs, news sources and social media, you can follow the latest trends in your field',
      imageSrc: '/static/svg/landing/Research.svg'
    },
    {
      title: 'Podcasts and Video',
      description: 'RSS feeds can also be used to subscribe to podcasts and video feeds. And also use for your channel or podcast',
      imageSrc: '/static/svg/landing/Podcast.svg'
    },
    {
      title: 'Content Marketing',
      description: 'For their blog or website, they can make it easy for readers to subscribe to updates and receive new content after publication',
      imageSrc: '/static/svg/landing/Marketing.svg'
    },
    {
      title: 'Competitive Intelligence',
      description: 'Businesses can use RSS feeds to monitor their competitors websites and social media profiles for updates and news',
      imageSrc: '/static/svg/landing/Intelligence.svg'
    },
    {
      title: 'Customer Service',
      description: 'Businesses use RSS feeds to monitor social media channels and customer review websites for mentions of their brand',
      imageSrc: '/static/svg/landing/Service.svg'
    },
    {
      title: 'Internal Communications',
      description: 'Share internal company news and updates with your team and coworkers',
      imageSrc: '/static/svg/landing/Communications.svg'
    },
    {
      title: 'E-commerce',
      description: 'Notify customers of new products or promotions with RSS feeds',
      imageSrc: '/static/svg/landing/E-commerce.svg'
    }
  ];

  return (
    <section className={styles.root}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>How are RSS Feeds used?</h2>
        <h3 className={styles.subtitle}>
          RSS feeds are a convenient way to stay up to date with the latest news and content from your favorite websites. Here are some common use cases for RSS feeds
        </h3>
      </div>
      <div className={styles.container}>
        <div className={styles.grid}>
          {UsingFeed.map((usingFeed, index) => (
            <LargeCard
              key={index}
              imageSrc={usingFeed.imageSrc}
              title={usingFeed.title}
              description={usingFeed.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UsingFeed;