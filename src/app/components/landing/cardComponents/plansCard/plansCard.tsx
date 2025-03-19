import React from 'react';
import Link from 'next/link';
import styles from './plansCard.module.css';

interface PlansCardProps {
    title: string;
    price: number;
    cents: number;
    period?: string;
    saveAmount?: number;
    savePeriod?: string;
    buttonText?: string;
    buttonLink?: string;
    isHighlighted?: boolean;
    height?: 'small' | 'default';
}

const PlansCard: React.FC<PlansCardProps> = ({
    title,
    price,
    cents,
    period,
    saveAmount,
    savePeriod,
    buttonText = 'Read more now',
    buttonLink,
    isHighlighted = false,
    height = 'default'
}) => {
    return (
        <div className={`${styles.card} ${height === 'small' ? styles.cardSmall : ''} ${isHighlighted ? styles.highlighted : ''}`}>
            <div className={styles.content}>
                {isHighlighted && <div className={styles.badge}>MOST POPULAR</div>}
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.priceContainer}>
                    <span className={styles.dollarSign}>$</span>
                    <span className={styles.price}>{price}</span>
                    <div className={styles.priceDetails}>
                        <span className={styles.cents}>.{cents}</span>
                        <span className={styles.period}>/{period}</span>
                    </div>
                </div>
                {saveAmount !== undefined && (
                    <div className={styles.saveInfo}>
                        Save ${saveAmount} {savePeriod}
                    </div>
                )}
                <div className={styles.billing}>
                    Switch to monthly billing
                </div>
                {buttonLink ? (
                    <Link href={buttonLink} className={`${styles.button} ${isHighlighted ? styles.buttonHighlighted : ''}`}>
                        {buttonText}
                    </Link>
                ) : (
                    <button className={`${styles.button} ${isHighlighted ? styles.buttonHighlighted : ''}`}>
                        {buttonText}
                    </button>
                )}
            </div>
        </div>
    );
};

export default PlansCard;