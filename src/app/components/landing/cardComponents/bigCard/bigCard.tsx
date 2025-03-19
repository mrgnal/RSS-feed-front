'use client';

import Image from 'next/image';
import styles from './bigCard.module.css';

interface BigCardProps {
    imageSrc: string;
    title: string;
    description: string;
}

const BigCard: React.FC<BigCardProps> = ({ imageSrc, title, description }) => {
    return (
      <div className={styles.card}>
        <Image src={imageSrc} alt="Icon" width={50} height={50} className={styles.icon} />
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    );
};

export default BigCard;
