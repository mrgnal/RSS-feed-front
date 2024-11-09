import React, { useState, useEffect } from 'react';
import styles from './embedNews.module.css';
import MediumCard from '@/app/components/landing/cardComponents/mediumCard/mediumCard';

interface EmbedNewsProps {
  className?: string;
}

const EmbedNews: React.FC<EmbedNewsProps> = ({ className }) => {
  const [user, setUser] = useState<any | null>(null);  // State to hold user data

  useEffect(() => {
    // Retrieve user data from localStorage on component mount
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));  // Set user data if logged in
    }
  }, []);

  // Determine the target URL based on login status
  const getCardLink = (isLoggedIn: boolean) => {
    return isLoggedIn ? '/my-feeds' : '/pages/Auth/login';
  };

  const isLoggedIn = user !== null;  // Check if the user is logged in

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <h2 className={styles.title}>Embed News Feeds</h2>
        <p className={styles.subtitle}>
          Take control of your content using our cloud-based all-in-one news feeds solution. Easily embed dynamic content on your website.
        </p>
        <div className={styles.content}>
          <div className={styles.previewWrapper}>
            <img
              src="/embedNews-img.svg"
              className={styles.preview}
              alt="Features Platform page"
            />
          </div>
          <div className={styles.leftSection}>
            <div className={styles.cardRow}>
              <MediumCard
                imageSrc="/static/svg/landing/NewsFeeds2.svg"
                title="News Feeds"
                description="Dynamically updated news feeds at the tips of your fingers"
                link={getCardLink(isLoggedIn)}  // Dynamic link based on login status
              />
              <MediumCard
                imageSrc="/static/svg/landing/Bundles2.svg"
                title="Bundles"
                description="Easily bundle multiple feeds into one super feed"
                link={getCardLink(isLoggedIn)}  // Dynamic link based on login status
              />
            </div>
            <div className={styles.cardRow}>
              <MediumCard
                imageSrc="/static/svg/landing/Collections2.svg"
                title="Collections"
                description="Curate and collect individual posts to create your unique feed"

              />
              <MediumCard
                imageSrc="/static/svg/landing/Filters2.svg"
                title="Filters"
                description="Stay focused on your content using our advanced filters"

              />
            </div>
            <div className={styles.cardRow}>
              <MediumCard
                imageSrc="/static/svg/landing/Alerts.svg"
                title="Alerts"
                description="Send the latest posts straight to your email or auto-post to Telegram or Slack"

              />
              <MediumCard
                imageSrc="/static/svg/landing/Reader.svg"
                title="Widgets"
                description="Choose from a variety of widgets to embed on your website"

              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmbedNews;
