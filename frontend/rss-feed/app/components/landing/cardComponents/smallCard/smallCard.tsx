'use client';

import Image from 'next/image';
import styles from '@/app/components/landing/cardComponents/smallCard/smallCard.module.css';

interface SmallCardProps {
    imageSrc: string;
    title: string;
    description: string;
}

const SmallCard: React.FC<SmallCardProps> = ({ imageSrc, title, description }) => {
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

export default SmallCard;
