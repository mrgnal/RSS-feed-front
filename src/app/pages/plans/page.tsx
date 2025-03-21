'use client';

import { useEffect } from 'react';
import { setRefreshTokenTimeout } from '@/app/utils/authService';
import Plans from '@/app/components/plansPage/plansPage/plansPage';


export default function Home() {
  useEffect(() => {
    setRefreshTokenTimeout(); 
  }, []);

  return (
    <div>
        <Plans />
    </div>
  );
}
