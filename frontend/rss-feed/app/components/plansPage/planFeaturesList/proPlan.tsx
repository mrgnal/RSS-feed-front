'use client'
import PlanFeaturesList from '@/app/components/plansPage/planFeaturesList/planFeaturesList';
import { Users, Rss, Layout, RefreshCw, FileText, Mail, MessageSquare, MessagesSquare, Slack } from 'lucide-react';

export default function ProPlanFeatures() {
  const features = {
    main: [
      {
        icon: <Users size={14} />,
        text: 'Team Collaboration',
        hasTooltip: true
      },
      {
        icon: <Users size={14} />,
        text: 'Up to 10 Team Members'
      },
      {
        icon: <Rss size={14} />,
        text: '500 Feeds',
        hasTooltip: true
      },
      {
        icon: <Layout size={14} />,
        text: '100 Widgets',
        hasTooltip: true
      },
      {
        icon: <RefreshCw size={14} />,
        text: '15 Minute Refresh Rate'
      },
      {
        icon: <FileText size={14} />,
        text: '1000 Posts in Collection'
      },
      {
        icon: <Mail size={14} />,
        text: '100 Email Digest'
      },
      {
        icon: <MessageSquare size={14} />,
        text: '100 Telegram Bots'
      },
      {
        icon: <MessagesSquare size={14} />,
        text: '100 Discord Bots'
      },
      {
        icon: <Slack size={14} />,
        text: '100 Slack Bots'
      }
    ],
    checks: [
      { text: 'Up to 50 Posts Per Feed', hasTooltip: true },
      { text: 'Up to 50 Posts Per Bundle', hasTooltip: true },
      { text: 'Link to Source' },
      { text: 'Social Media' },
      { text: 'Custom Widgets' },
      { text: 'Bundle Feeds', hasTooltip: true },
      { text: 'Filters' },
      { text: '200 Whitelist Keywords' },
      { text: '200 Blacklist Keywords' },
      { text: 'Customer Support' }
    ],
    api: [
      { text: 'API Support', isSupported: true },
      { text: '1000 Operations* / Month', isSupported: true },
      { text: '1/s Rate limit Per Operation', isSupported: true }
    ]
  };

  return (
    <PlanFeaturesList
      title="PRO PLAN FEATURES"
      features={features}
      layout='vertical'
    />
  );
}