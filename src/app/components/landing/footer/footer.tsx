import React from 'react';
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h3>Rss Feeds</h3>
          <p>Webpage</p>
          <p>Google News</p>
          <p>Instagram</p>
          <p>Threads</p>
          <p>Craigslist</p>
          <p>X / Twitter</p>
          <p>Reddit</p>
          <p>YouTube</p>
          <p>Telegram</p>
          <p>Facebook</p>
          <p>eBay</p>
          <p>Cointelegraph</p>
          <p>All Feeds</p>
        </div>
        <div className={styles.column}>
          <h3>Bots & Alerts</h3>
          <p>YouTube Telegram Bot</p>
          <p>Google News Telegram Bot</p>
          <p>RSS Feed Telegram Bot</p>
          <p>RSS Feed Discord Bot</p>
          <p>X / Twitter Discord Bot</p>
          <p>YouTube Discord Bot</p>
          <p>X / Twitter Slack Bot</p>
          <p>Google News Slack Bot</p>
          <p>Google News Discord Bot</p>
          <p>All Bots</p>
        </div>
        <div className={styles.column}>
          <h3>Resources</h3>
          <p>Pricing</p>
          <p>Discover</p>
          <p>Widgets Showcase</p>
          <p>RSS Viewer</p>
          <p>RSS Finder</p>
          <p>RSS Validator</p>
          <p>Chrome Extension</p>
          <p>API Documentation</p>
          <p>Affiliate Program</p>
        </div>
        <div className={styles.column}>
          <h3>Navigation</h3>
          <p>Home</p>
          <p>Google News Telegram Bot</p>
          <p>RSS Feed Telegram Bot</p>
          <p>RSS Feed Discord Bot</p>
          <p>X / Twitter Discord Bot</p>
          <p>YouTube Discord Bot</p>
          <p>X / Twitter Slack Bot</p>
          <p>Google News Slack Bot</p>
          <p>Google News Discord Bot</p>
          <p>All Bots</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
