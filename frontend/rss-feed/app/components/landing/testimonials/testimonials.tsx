'use client';

import styles from './testimonials.module.css';

export default function testimonials() {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <h2 className={styles.title}>Read What Our Users Say</h2>
        <div className={styles.comments}>
          {/* Відгук 1 */}
          <div className={styles.commentWrapper}>
            <div className={styles.commentHeader}>
              <div className={styles.credits}>
                <img
                  src="/static/img/assets/kiril-Gantchev-st6.jpg"
                  alt="Kiril from ST6"
                  className={styles.avatar}
                  loading="lazy"
                />
              </div>
              <div>
                <p className={styles.personName}>Kiril Gantchev</p>
                <p className={styles.description}>
                  CEO of{' '}
                  <a href="https://st6.io" target="_blank" rel="noopener noreferrer">
                    ST6
                  </a>
                </p>
              </div>
            </div>
            <p className={styles.commentMessage}>
              I tried several RSS feed generators and the one that worked best, aside from being the
              simplest, was RSS.app. It's great how useful the tool can be for somebody that doesn't
              know how to code.
            </p>
          </div>

          {/* Відгук 2 */}
          <div className={styles.commentWrapper}>
            <div className={styles.commentHeader}>
              <div className={styles.credits}>
                <img
                  src="/static/img/assets/isaac-halvorson.jpeg"
                  alt="Isaac Halvorson from hisaac"
                  className={styles.avatar}
                  loading="lazy"
                />
              </div>
              <div>
                <p className={styles.personName}>Isaac Halvorson</p>
                <p className={styles.description}>
                  iOS Developer{' '}
                  <a href="https://hisaac.net/" target="_blank" rel="noopener noreferrer">
                    hisaac
                  </a>
                </p>
              </div>
            </div>
            <p className={styles.commentMessage}>
              I’ve long wanted an app that generates RSS feeds from social media sites, and while
              there are other options that do it (IFTTT, Zapier, etc.), this is the first one that
              is dead simple, and works out of the box.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}