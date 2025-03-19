import React from 'react';
import styles from './freePlanCard.module.css';

interface FreePlanCardProps {
  title: string;
  description: string;
  price?: number;
  period?: string;
  buttonText: string;
  buttonLink: string;
}

const FreePlanCard: React.FC<FreePlanCardProps> = ({
  title,
  description,
  price,
  period,
  buttonText,
  buttonLink,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.priceContainer}>
        <span className={styles.price}>${price}</span>
        <span className={styles.period}>/ {period}</span>
      </div>
      <a href={buttonLink} className={styles.button}>
        {buttonText}
      </a>
    </div>
  );
};

export default FreePlanCard;
