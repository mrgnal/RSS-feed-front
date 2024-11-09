'use client';

import GetStartedButton from '@/app/components/landing/button/button';
import styles from './joinSection.module.css';

export default function JoinSection() {
  return (
    <section className={styles.root}>
      <div className={styles.content}>
        <h2 className={styles.title}>Join thousands of happy users!</h2>
        <div className={styles.buttonWrapper}>
          <GetStartedButton href="/rss-feed" />
        </div>
        <div className={styles.advantagesWrapper}>
          <div className={styles.advantage}>
            <svg className={styles.checkIcon} viewBox="0 0 12 10" width="12" height="10" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.28571 9.5L0 5.17308L1.2 3.96154L4.28571 7.07692L10.8 0.5L12 1.71154L4.28571 9.5Z"
                fill="currentColor"
              />
            </svg>
            <h3 className={styles.advantageText}>No credit card required</h3>
          </div>
          <div className={styles.advantage}>
            <svg className={styles.checkIcon} viewBox="0 0 12 10" width="12" height="10" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.28571 9.5L0 5.17308L1.2 3.96154L4.28571 7.07692L10.8 0.5L12 1.71154L4.28571 9.5Z"
                fill="currentColor"
              />
            </svg>
            <h3 className={styles.advantageText}>7-day free trial</h3>
          </div>
          <div className={styles.advantage}>
            <svg className={styles.checkIcon} viewBox="0 0 12 10" width="12" height="10" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.28571 9.5L0 5.17308L1.2 3.96154L4.28571 7.07692L10.8 0.5L12 1.71154L4.28571 9.5Z"
                fill="currentColor"
              />
            </svg>
            <h3 className={styles.advantageText}>Cancel anytime</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
