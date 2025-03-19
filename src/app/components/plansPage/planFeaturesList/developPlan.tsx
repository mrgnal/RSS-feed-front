'use client'
import PlanFeaturesList from '@/app/components/plansPage/planFeaturesList/planFeaturesList';
import { User, Users, Rss, Layout, RefreshCw, FileText, Mail, MessageSquare, MessagesSquare, Slack } from 'lucide-react';

export default function DeveloperPlanFeatures() {
  const features = {
    main: [
      { 
        icon: <User size={14} />, 
        text: 'Individual Plan',
        hasTooltip: true 
      },
      { 
        icon: <Users size={14} />, 
        text: '1 Team Member'
      },
      { 
        icon: <Rss size={14} />, 
        text: '100 Feeds',
        hasTooltip: true 
      },
      { 
        icon: <Layout size={14} />, 
        text: '20 Widgets',
        hasTooltip: true 
      },
      { 
        icon: <RefreshCw size={14} />, 
        text: '15 Minute Refresh Rate'
      },
      { 
        icon: <FileText size={14} />, 
        text: '200 Posts in Collection'
      },
      { 
        icon: <Mail size={14} />, 
        text: '20 Email Digest'
      },
      { 
        icon: <MessageSquare size={14} />, 
        text: '20 Telegram Bots'
      },
      { 
        icon: <MessagesSquare size={14} />, 
        text: '20 Discord Bots'
      },
      { 
        icon: <Slack size={14} />, 
        text: '20 Slack Bots'
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
      { text: '50 Whitelist Keywords' },
      { text: '50 Blacklist Keywords' },
      { text: 'Customer Support' }
    ],
    api: [
      { text: 'No API Support', isSupported: false }
    ]
  };

  return (
    <PlanFeaturesList 
      title="DEVELOPER PLAN FEATURES" 
      features={features} 
      layout='vertical'
    />
  );
}