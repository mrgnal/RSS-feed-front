import React from 'react';
import styles from './paypalModal.module.css';
import Image from 'next/image';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    planTitle: string;
    price: number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
    isOpen,
    onClose,
    planTitle,
    price
}) => {
    if (!isOpen) return null;

    const handlePayPalClick = () => {
        // Here you would integrate with PayPal SDK
        console.log('Processing PayPal payment...');
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </button>
                
                <div className={styles.modalHeader}>
                    <div className={styles.modalIcon}>
                        <Image
                            src="/logo-icon.svg"
                            alt="RSS icon"
                            width={40}
                            height={40}
                            className={styles.logoIcon}
                        />
                    </div>
                    <h2 className={styles.modalTitle}>Complete your order</h2>
                </div>

                <div className={styles.planDetails}>
                    <div className={styles.planTitle}>{planTitle}</div>
                    <div className={styles.planPrice}>${price.toFixed(2)}</div>
                </div>

                <div className={styles.paymentMethods}>
                    <div className={`${styles.paymentOption} ${styles.active}`}>
                        <button className={styles.methodButton}>
                            <span className={styles.methodIcon}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="#00457C">
                                    <path d="M17.5 5h-15C1.67157 5 1 5.67157 1 6.5v7C1 14.3284 1.67157 15 2.5 15h15c.8284 0 1.5-.6716 1.5-1.5v-7c0-.82843-.6716-1.5-1.5-1.5z"/>
                                </svg>
                            </span>
                            PayPal
                        </button>
                    </div>
                </div>

                <button 
                    className={styles.paypalButton}
                    onClick={handlePayPalClick}
                >
                    <img 
                        src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png" 
                        alt="PayPal"
                        className={styles.paypalLogo}
                    />
                </button>
            </div>
        </div>
    );
};

export default PaymentModal;