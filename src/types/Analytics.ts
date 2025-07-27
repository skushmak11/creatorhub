export interface AnalyticsData {
  date: string;
  views: number;
  revenue: number;
  subscribers: number;
  watchTime: number;
  engagement: number;
}

export interface RevenueData {
  date: string;
  amount: number;
  source: 'ads' | 'memberships' | 'superchats' | 'merchandise';
  channelId: string;
}

export interface AudienceInsight {
  ageGroup: string;
  gender: 'male' | 'female' | 'other';
  country: string;
  percentage: number;
}

export interface PerformanceMetrics {
  totalViews: number;
  totalRevenue: number;
  totalSubscribers: number;
  averageWatchTime: number;
  engagementRate: number;
  growthRate: number;
}
