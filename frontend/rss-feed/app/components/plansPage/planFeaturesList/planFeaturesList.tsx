'use client'
import React from 'react';
import styles from './planFeaturesList.module.css';
import { Info } from 'lucide-react';

// Base interface for common properties
interface FeatureBase {
  text: string;
  hasTooltip?: boolean;
  disabled?: boolean;
}

// Specific feature type interfaces
interface MainFeatureType extends FeatureBase {
  type: 'main';
  icon: React.ReactNode;
}

interface CheckFeatureType extends FeatureBase {
  type: 'check';
}

interface ApiFeatureType {
  type: 'api';
  text: string;
  isSupported: boolean;
}

// Union type for all feature types
type Feature = MainFeatureType | CheckFeatureType | ApiFeatureType;

interface MainFeatureProps extends Omit<MainFeatureType, 'type'> {
  layout: 'vertical' | 'horizontal';
}

interface CheckFeatureProps extends Omit<CheckFeatureType, 'type'> {
  layout: 'vertical' | 'horizontal';
}

const MainFeature = ({ icon, text, hasTooltip, layout, disabled }: MainFeatureProps) => (
  <div className={`${styles.mainFeature} ${layout === 'horizontal' ? styles.horizontal : ''} ${disabled ? styles.disabled : ''}`}>
    <div className={styles.iconWrapper}>
      {icon}
    </div>
    <span className={styles.featureText}>{text}</span>
    {hasTooltip && <Info className={styles.tooltipIcon} />}
  </div>
);

const CheckFeature = ({ text, hasTooltip, layout, disabled }: CheckFeatureProps) => (
  <div className={`${styles.checkFeature} ${layout === 'horizontal' ? styles.horizontal : ''} ${disabled ? styles.disabled : ''}`}>
    <div className={styles.checkIcon}>{disabled ? '×' : '✓'}</div>
    <span className={styles.featureText}>{text}</span>
    {hasTooltip && <Info className={styles.tooltipIcon} />}
  </div>
);

const ApiFeature = ({ text, isSupported, layout }: { text: string; isSupported: boolean; layout: 'vertical' | 'horizontal' }) => (
  <div className={`${styles.apiFeature} ${layout === 'horizontal' ? styles.horizontal : ''}`}>
    <div className={`${styles.iconWrapper} ${!isSupported ? styles.unsupported : ''}`}>
      <div className={styles.apiIcon} />
    </div>
    <span className={styles.featureText}>{text}</span>
  </div>
);

interface PlanFeaturesListProps {
  title: string;
  features: {
    main: Array<Omit<MainFeatureType, 'type'>>;
    checks: Array<Omit<CheckFeatureType, 'type'>>;
    api: Array<Omit<ApiFeatureType, 'type'>>;
  };
  layout?: 'vertical' | 'horizontal';
}

export default function PlanFeaturesList({ title, features, layout = 'vertical' }: PlanFeaturesListProps) {
  const allFeatures: Feature[] = [
    ...features.main.map(feature => ({ type: 'main' as const, ...feature })),
    ...features.checks.map(feature => ({ type: 'check' as const, ...feature })),
    ...features.api.map(feature => ({ type: 'api' as const, ...feature }))
  ];

  // Helper function to determine if we should show a divider
  const shouldShowDivider = (index: number, features: Feature[]) => {
    if (layout === 'horizontal') return false;
    
    // Show divider if current feature is the last main feature and next is a check feature
    const currentFeature = features[index];
    const nextFeature = features[index + 1];
    
    if (!nextFeature) return false;
    
    return (
      (currentFeature.type === 'main' && nextFeature.type === 'check') ||
      (currentFeature.type === 'check' && nextFeature.type === 'api')
    );
  };

  const renderFeature = (feature: Feature, index: number) => {
    const featureElement = (() => {
      switch (feature.type) {
        case 'main':
          return (
            <MainFeature
              key={`main-${index}`}
              icon={feature.icon}
              text={feature.text}
              hasTooltip={feature.hasTooltip}
              disabled={feature.disabled}
              layout={layout}
            />
          );
        case 'check':
          return (
            <CheckFeature
              key={`check-${index}`}
              text={feature.text}
              hasTooltip={feature.hasTooltip}
              disabled={feature.disabled}
              layout={layout}
            />
          );
        case 'api':
          return (
            <ApiFeature
              key={`api-${index}`}
              text={feature.text}
              isSupported={feature.isSupported}
              layout={layout}
            />
          );
      }
    })();

    return (
      <React.Fragment key={`feature-${index}`}>
        {featureElement}
        {shouldShowDivider(index, allFeatures) && <div className={styles.divider} />}
      </React.Fragment>
    );
  };

  return (
    <div className={`${styles.container} ${layout === 'horizontal' ? styles.horizontalContainer : ''}`}>
      <h3 className={styles.title}>{title}</h3>
      
      <div className={styles.featuresList}>
        {layout === 'horizontal' ? (
          // Horizontal layout - features in groups of 4
          Array.from({ length: Math.ceil(allFeatures.length / 4) }, (_, i) => (
            <div 
              key={i} 
              className={styles.horizontalSection}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}
            >
              {allFeatures.slice(i * 4, (i + 1) * 4).map((feature, index) => renderFeature(feature, i * 4 + index))}
            </div>
          ))
        ) : (
          // Vertical layout - features in a single column
          allFeatures.map((feature, index) => renderFeature(feature, index))
        )}
      </div>
    </div>
  );
}