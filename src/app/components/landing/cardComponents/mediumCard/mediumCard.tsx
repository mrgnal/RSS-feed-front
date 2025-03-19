import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './mediumCard.module.css';

interface MediumCardProps {
    imageSrc: string;
    title: string;
    description: string;
    link?: string;
}

const MediumCard: React.FC<MediumCardProps> = ({ imageSrc, title, description, link }) => {
    const cardContent = (
        <div className={styles.card}>
            <div className={styles.content}>
                <div className={styles.iconContainer}>
                    <Image src={imageSrc} alt="Icon" width={24} height={24} className={styles.icon} />
                </div>
                <div className={styles.textContent}>
                    <div className={styles.titleContainer}>
                        <h3 className={styles.title}>{title}</h3>
                        {link && <span className={styles.arrow}>→</span>}
                    </div>
                    <p className={styles.description}>{description}</p>
                </div>
            </div>
        </div>
    );

    return link ? (
        <Link href={link} className={styles.link}>
            {cardContent}
        </Link>
    ) : (
        cardContent
    );
};

export default MediumCard;