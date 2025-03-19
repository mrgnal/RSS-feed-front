'use client';

import { useState, useEffect } from 'react';
import GetStartedButton from '@/app/components/landing/button/button';
import styles from '@/app/components/landing/headContent/headContent.module.css';

export default function HeadContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in by looking for user data in localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    setIsLoggedIn(!!userData); // Set login status based on user data presence
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>
          <span>The #1 Source of RSS Feeds</span>
          <span className={styles.addition}>Connect with Information You Care About</span>
        </h1>
        <h2 className={styles.subtitle}>Get RSS Feeds from almost any webpage</h2>
        <GetStartedButton
          href={isLoggedIn ? '/my-feeds' : '/pages/Auth/login'}
        />
        <section className={styles.statsSection}>
          <h3 className={styles.statsTitle}>Instantly generate RSS feeds from any URL</h3>
          <div className={styles.statsRow}>
            <p className={styles.statNumber}>+2,693</p>
            <p className={styles.statSubtitle}>New Users Joined<br />Last Week</p>
          </div>
        </section>
      </div>
    </div>
  );
}
