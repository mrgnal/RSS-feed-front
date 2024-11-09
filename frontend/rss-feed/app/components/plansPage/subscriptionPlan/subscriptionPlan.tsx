import React, { useState } from 'react';
import styles from './subscriptionPlan.module.css';

interface SubscriptionPlanSelectorProps {
  onPlanChange?: (isYearly: boolean) => void;
  onSubscriptionClick?: () => void;
}

const SubscriptionPlanSelector: React.FC<SubscriptionPlanSelectorProps> = ({
  onPlanChange,
  onSubscriptionClick
}) => {
  const [isYearly, setIsYearly] = useState(false);

  const handleToggle = () => {
    setIsYearly(!isYearly);
    onPlanChange?.(!isYearly);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Choose the right feeds for you</h1>
      
      <div className={styles.messageWrapper}>
        <p className={styles.expiredMessage}>
          Your Basic plan trial has expired.
        </p>
        <p className={styles.subscriptionMessage}>
          Purchase a <button onClick={onSubscriptionClick} className={styles.subscriptionLink}>subscription</button> to activate your account.
        </p>
      </div>

      <div className={styles.planMessage}>
        Your trial has expired. Choose a plan to <span className={styles.highlight}>reactivate</span> your feeds.
      </div>

      <div className={styles.toggleWrapper}>
        <span className={`${styles.toggleOption} ${!isYearly ? styles.active : ''}`}>
          Monthly
        </span>
        
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={isYearly}
            onChange={handleToggle}
          />
          <span className={styles.slider}></span>
        </label>
        
        <span className={`${styles.toggleOption} ${isYearly ? styles.active : ''}`}>
          Yearly
        </span>
        
        <span className={styles.saveLabel}>
          Save up to 17%
        </span>
      </div>
    </div>
  );
};

export default SubscriptionPlanSelector;