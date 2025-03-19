import React, { useState, useEffect } from 'react';
import styles from './generateFeed.module.css';
import MediumCard from '@/app/components/landing/cardComponents/mediumCard/mediumCard';

interface GenerateFeedProps {
  className?: string;
}

const GenerateFeed: React.FC<GenerateFeedProps> = ({ className }) => {
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
    return isLoggedIn ? '/rss-feed' : '/pages/Auth/login';
  };

  const isLoggedIn = user !== null;  // Check if the user is logged in

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <h2 className={styles.title}>Generate RSS Feeds</h2>
        <p className={styles.subtitle}>
          Aggregate and curate your favorite websites by turning them into auto-updated RSS feeds. 
          Fastest RSS finder and creator on the market
        </p>
        <div className={styles.content}>
          <div className={styles.previewWrapper}>
            <img
              src="/generate-img.svg" 
              className={styles.preview} 
              alt="RSS Feeds page" 
            />
          </div>
          <div className={styles.leftSection}>
            <div className={styles.cardRow}>
              <MediumCard
                imageSrc="/static/svg/landing/Planet2.svg"
                title="RSS Generator"
                description="Generate a feed from almost any website using our advanced AI"
                link={getCardLink(isLoggedIn)}  // Dynamic link based on login status
              />
              <MediumCard
                imageSrc="/static/svg/landing/MagicStick2.svg"
                title="RSS Builder"
                description="Manually select the elements you want to include in your RSS feed"
                link={getCardLink(isLoggedIn)}  // Dynamic link based on login status
              />
            </div>
            <div className={styles.cardRow}>
              <MediumCard
                imageSrc="/static/svg/landing/NoCoding2.svg"
                title="No Coding"
                description="Coding not required! Just enter the webpage URL to get your RSS feed"

              />
              <MediumCard
                imageSrc="/static/svg/landing/Star2.svg"
                title="1000+ Sources"
                description="Support for thousands of popular websites to create your RSS feed from"

              />
            </div>
            <div className={styles.cardRow}>
              <MediumCard
                imageSrc="/static/svg/landing/Finder.svg"
                title="RSS Finder"
                description="Discover and subscribe to new RSS feeds with our advanced RSS Finder"

              />
              <MediumCard
                imageSrc="/static/svg/landing/AllFeeds.svg"
                title="Social Media"
                description="Get new content from almost any website or social media with our feed generator"

              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenerateFeed;
