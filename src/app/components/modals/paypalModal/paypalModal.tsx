import React, { useState } from 'react';
import styles from './paypalModal.module.css';
import Image from 'next/image';

import { createPayPalPayment } from '@/app/utils/paymentService';

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
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handlePayPalClick = async () => {
        try {
            setIsProcessing(true);
            setError(null);

            const approvalUrl = await createPayPalPayment(price);

            window.location.href = approvalUrl;

        } catch (error) {
            console.error('Payment error:', error);
            setError('Failed to create payment. Please try again.');
        } finally {
            setIsProcessing(false);
        }
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

                <button 
                    className={styles.paypalButton}
                    onClick={handlePayPalClick}
                    disabled={isProcessing}
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