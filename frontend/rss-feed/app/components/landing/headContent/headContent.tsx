'use client';

import GetStartedButton from '@/app/components/landing/button/button';
import styles from '@/app/components/landing/headContent/headContent.module.css';

export default function HeadContent() {
  return (
    <div className={styles.root}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>
          <span>The #1 Source of RSS Feeds</span>
          <span className={styles.addition}>Connect with Information You Care About</span>
        </h1>
        <h2 className={styles.subtitle}>Get RSS Feeds from almost any webpage</h2>
        <GetStartedButton
          href='#'
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
