import React, { useState, useEffect } from 'react';
import { setRefreshTokenTimeout } from '@/app/utils/authService';
import PlansCard from '@/app/components/plansPage/plansCardForPayment/plansCard';
import PaymentModal from '@/app/components/modals/paypalModal/paypalModal';
import styles from './plansPage.module.css';
import FreePlanCard from '@/app/components/plansPage/planFeaturesList/freePlanCard/freePlanCard';
import BasicPlan from '@/app/components/plansPage/planFeaturesList/basicPlan';
import ProPlan from '@/app/components/plansPage/planFeaturesList/proPlan';
import DevelopPlan from '@/app/components/plansPage/planFeaturesList/developPlan';
import FreePlan from '@/app/components/plansPage/planFeaturesList/freePlan';
import SubscriptionPlan from '@/app/components/plansPage/subscriptionPlan/subscriptionPlan';
import Questions from '@/app/components/plansPage/question/question';

export default function PlansPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Developer');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ price: 0, planTitle: '' });

  // Touch coordinates for swipe
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);

  useEffect(() => {
    setRefreshTokenTimeout();
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const plans = {
    monthly: [
      {
        title: 'Basic',
        price: 9,
        cents: 99,
        period: 'month',
        height: 'small' as const,

      },
      {
        title: 'Developer',
        price: 19,
        cents: 99,
        period: 'month',
        isHighlighted: true,
      },
      {
        title: 'Pro',
        price: 99,
        cents: 99,
        period: 'month',
        height: 'small' as const,
      },
    ],
    yearly: [
      {
        title: 'Basic',
        price: 8,
        cents: 32,
        period: 'month',
        saveAmount: 20,
        savePeriod: 'monthly',
        height: 'small' as const,
      },
      {
        title: 'Developer',
        price: 16,
        cents: 64,
        period: 'month',
        saveAmount: 40,
        savePeriod: 'monthly',
        isHighlighted: true,
      },
      {
        title: 'Pro',
        price: 83,
        cents: 32,
        period: 'month',
        saveAmount: 200,
        savePeriod: 'monthly',
        height: 'small' as const,
      },
    ],
  };

  const handleSubscriptionChange = (isYearly: boolean) => {
    setIsYearly(isYearly);
  };

  const handlePlanClick = (plan: any) => {
    const basePrice = Number(plan.price) + Number(plan.cents) / 100;
    const finalPrice = isYearly ? Math.floor(basePrice * 12) : basePrice;
    
    setModalData({
      price: finalPrice,
      planTitle: `${plan.title} Plan`
    });
    setIsModalOpen(true);
  };

  const currentPlans = isYearly ? plans.yearly : plans.monthly;

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (startX - endX > 50) {
      setCurrentSlide((prev) => (prev + 1) % currentPlans.length);
    } else if (endX - startX > 50) {
      setCurrentSlide((prev) => (prev - 1 + currentPlans.length) % currentPlans.length);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.subscriptionWrapper}>
          <SubscriptionPlan 
            onPlanChange={handleSubscriptionChange}
            onSubscriptionClick={() => {}}
          />
        </div>

        {isMobile && (
          <div className={styles.dotsContainer}>
            {currentPlans.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        )}

        <div 
          className={styles.plansWrapper} 
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {currentPlans.map((plan, index) => (
            <div 
              key={plan.title}
              className={styles.planColumn}
              style={isMobile ? {
                '--slide-index': currentSlide,
              } as React.CSSProperties : {}}
            >
              <div className={styles.cardWrapper}>
                <PlansCard 
                  {...plan} 
                  onButtonClick={() => handlePlanClick(plan)}
                />
              </div>
              <div className={styles.featuresList}>
                {index === 0 && <BasicPlan />}
                {index === 1 && <DevelopPlan />}
                {index === 2 && <ProPlan />}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.freePlanContainer}>
        <FreePlanCard 
          title="Free"
          description="(Free plan supports only native RSS Feeds)"
          price={0}
          period="month"
          buttonText="Activate Now"
          buttonLink="#"
        />
        <FreePlan layout='horizontal' isResponsive={true}/>
      </div>
      <Questions/>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        planTitle={modalData.planTitle}
        price={modalData.price}
      />
    </div>
  );
}