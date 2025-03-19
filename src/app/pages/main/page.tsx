'use client';

import { useEffect } from 'react';
import { setRefreshTokenTimeout } from '@/app/utils/authService';
import HeadContent from '@/app/components/landing/headContent/headContent';
import Reasons from '@/app/components/landing/reasons/reasons';
import TopFeatures from '@/app/components/landing/topFeatures/topFeatures';
import UsingFeed from '@/app/components/landing/usingFeed/usingFeed';
import Sources from '@/app/components/landing/sourceElement/sourceElement';
import GenerateFeed from '@/app/components/landing/generateFeed/generateFeed';
import EmbedNews from '@/app/components/landing/embedNews/embedNews';
import Plans from '@/app/components/landing/plans/plans';
import TrustedBy from '@/app/components/landing/trustedBy/trustedBy';
import JoinSection from '@/app/components/landing/joinSection/joinSection';
import Testimonials from '@/app/components/landing/testimonials/testimonials';
import Footer from '@/app/components/landing/footer/footer';

export default function Home() {
  useEffect(() => {
    setRefreshTokenTimeout();
  }, []);

  return (
    <div>
      <div id="headContent">
        <HeadContent />
      </div>
      <div id="reasons">
        <Reasons />
      </div>
      <div id="topFeatures">
        <TopFeatures />
      </div>
      <div id="usingFeed">
        <UsingFeed />
      </div>
      <div id="sources">
        <Sources />
      </div>
      <div id="generateFeed">
        <GenerateFeed />
      </div>
      <div id="embedNews">
        <EmbedNews />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="plans">
        <Plans />
      </div>
      <div id="trustedBy">
        <TrustedBy />
      </div>
      <div id="joinSection">
        <JoinSection />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}
