'use client';

import React, { useState, useEffect } from 'react';
import PlansCard from '@/app/components/landing/cardComponents/plansCard/plansCard';
import styles from './plans.module.css';

export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState('Developer');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if user is logged in

  // Check if user is logged in from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    setIsLoggedIn(!!userData); // Set logged in status
  }, []);

  const plans = [
    {
      title: 'Basic',
      price: 8,
      cents: 32,
      period: 'month',
      saveAmount: 20,
      savePeriod: 'annually',
      buttonLink: isLoggedIn ? '/pages/plans' : '/pages/Auth/login', // Conditional link based on login status
      height: 'small' as const,
    },
    {
      title: 'Developer',
      price: 16,
      cents: 64,
      period: 'month',
      saveAmount: 40,
      savePeriod: 'annually',
      buttonLink: isLoggedIn ? '/pages/plans' : '/pages/Auth/login', // Conditional link based on login status
      isHighlighted: true,
    },
    {
      title: 'Pro',
      price: 83,
      cents: 32,
      period: 'month',
      saveAmount: 200,
      savePeriod: 'annually',
      buttonLink: isLoggedIn ? '/pages/plans' : '/pages/Auth/login', // Conditional link based on login status
      height: 'small' as const,
    },
  ];

  // Function to change the plan on mobile devices
  const handlePlanChange = (direction: 'next' | 'prev') => {
    const currentIndex = plans.findIndex(plan => plan.title === selectedPlan);
    const newIndex =
      direction === 'next'
        ? (currentIndex + 1) % plans.length
        : (currentIndex - 1 + plans.length) % plans.length;
    setSelectedPlan(plans[newIndex].title);
  };

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Pricing plans</h2>
      <p className={styles.subtitle}>Every plan includes 30 day free trial</p>

      <div className={styles.desktopView}>
        {plans.map(plan => (
          <PlansCard key={plan.title} {...plan} />
        ))}
      </div>

      <div className={styles.mobileView}>
        <PlansCard {...plans.find(plan => plan.title === selectedPlan)!} />
        <div className={styles.sliderControls}>
          <button onClick={() => handlePlanChange('prev')}>&lt;</button>
          <button onClick={() => handlePlanChange('next')}>&gt;</button>
        </div>
      </div>
    </div>
  );
}
