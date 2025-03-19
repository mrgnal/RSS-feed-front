'use client'
import { useEffect, useState } from 'react';
import PlanFeaturesList from '@/app/components/plansPage/planFeaturesList/planFeaturesList';
import { User, Users, Rss, Layout, RefreshCw } from 'lucide-react';

interface Feature {
  text: string;
  hasTooltip?: boolean;
  disabled?: boolean;
}

interface FreePlanFeaturesProps {
  layout?: 'vertical' | 'horizontal';
  isResponsive?: boolean;
}

export default function FreePlanFeatures({ 
  layout: initialLayout = 'horizontal', 
  isResponsive = false 
}: FreePlanFeaturesProps) {
  const [currentLayout, setCurrentLayout] = useState<'vertical' | 'horizontal'>(initialLayout);

  useEffect(() => {
    if (!isResponsive) {
      setCurrentLayout(initialLayout);
      return;
    }

    // Function to handle resize
    const handleResize = () => {
      if (window.innerWidth <= 768) { // You can adjust this breakpoint
        setCurrentLayout('vertical');
      } else {
        setCurrentLayout('horizontal');
      }
    };

    // Set initial layout
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [isResponsive, initialLayout]);

  const features: {
    main: Array<{ icon: React.ReactNode; text: string; hasTooltip?: boolean; disabled?: boolean }>;
    checks: Feature[];
    api: Array<{ text: string; isSupported: boolean }>;
  } = {
    main: [
      {
        icon: <Rss size={14} />,
        text: '2 RSS feeds'
      },
      {
        icon: <Layout size={14} />,
        text: '1 Widgets'
      },
      {
        icon: <RefreshCw size={14} />,
        text: '24 Hour Refresh Rate'
      },
      {
        icon: <Users size={14} />,
        text: '1 Team Member'
      }
    ],
    checks: [
      { text: 'Link to RSS.app / Ads' },
      { text: 'Up to 5 Posts Per Feed' }
    ],
    api: [
      { text: 'No API Support', isSupported: false }
    ]
  };

  // Disabled features shown with strikethrough in the image
  const disabledFeatures: Feature[] = [
    { text: 'Social Media', hasTooltip: true },
    { text: 'Custom Widgets' },
    { text: 'Filters' },
    { text: 'Customer Support' },
    { text: 'Email Digest' },
    { text: 'Collections' },
    { text: 'Whitelist Keywords' },
    { text: 'Blacklist Keywords' },
    { text: 'Bundle Feeds', hasTooltip: true },
    { text: 'Team Collaboration', hasTooltip: true }
  ];

  // Adding disabled features
  features.checks.push(...disabledFeatures.map(feature => ({
    ...feature,
    disabled: true
  })));

  return (
    <PlanFeaturesList
      title="FREE PLAN FEATURES"
      features={features}
      layout={currentLayout}
    />
  );
}