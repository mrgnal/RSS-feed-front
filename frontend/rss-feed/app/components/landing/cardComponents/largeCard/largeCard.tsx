'use client';

import Image from 'next/image';
import styles from './largeCard.module.css';

interface LargeCardProps {
    imageSrc: string;
    title: string;
    description: string;
}

const LargeCard: React.FC<LargeCardProps> = ({ imageSrc, title, description }) => {
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          <Image src={imageSrc} alt="Icon" width={24} height={24} className={styles.icon} />
          <h3 className={styles.title}>{title}</h3>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    );
};

export default LargeCard;
