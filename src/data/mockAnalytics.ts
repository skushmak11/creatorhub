import { AnalyticsData, RevenueData, AudienceInsight, PerformanceMetrics } from '../types/Analytics';

export const mockAnalyticsData: AnalyticsData[] = [
  { date: '2024-01-01', views: 12500, revenue: 245.50, subscribers: 1250, watchTime: 8500, engagement: 7.2 },
  { date: '2024-01-02', views: 13200, revenue: 268.75, subscribers: 1280, watchTime: 9200, engagement: 7.8 },
  { date: '2024-01-03', views: 11800, revenue: 225.30, subscribers: 1265, watchTime: 8100, engagement: 6.9 },
  { date: '2024-01-04', views: 14500, revenue: 295.80, subscribers: 1320, watchTime: 10200, engagement: 8.1 },
  { date: '2024-01-05', views: 13800, revenue: 278.90, subscribers: 1305, watchTime: 9800, engagement: 7.6 },
  { date: '2024-01-06', views: 15200, revenue: 312.45, subscribers: 1350, watchTime: 11000, engagement: 8.4 },
  { date: '2024-01-07', views: 16800, revenue: 345.20, subscribers: 1385, watchTime: 12500, engagement: 8.9 },
  { date: '2024-01-08', views: 14200, revenue: 289.60, subscribers: 1340, watchTime: 9900, engagement: 7.7 },
  { date: '2024-01-09', views: 13500, revenue: 275.30, subscribers: 1315, watchTime: 9400, engagement: 7.4 },
  { date: '2024-01-10', views: 17500, revenue: 365.75, subscribers: 1420, watchTime: 13200, engagement: 9.2 },
  { date: '2024-01-11', views: 16200, revenue: 334.80, subscribers: 1395, watchTime: 11800, engagement: 8.6 },
  { date: '2024-01-12', views: 15800, revenue: 325.40, subscribers: 1375, watchTime: 11400, engagement: 8.3 },
  { date: '2024-01-13', views: 18200, revenue: 385.90, subscribers: 1450, watchTime: 14100, engagement: 9.5 },
  { date: '2024-01-14', views: 17900, revenue: 378.25, subscribers: 1435, watchTime: 13800, engagement: 9.3 },
  { date: '2024-01-15', views: 19500, revenue: 412.50, subscribers: 1485, watchTime: 15200, engagement: 9.8 }
];

export const mockRevenueData: RevenueData[] = [
  { date: '2024-01-01', amount: 180.50, source: 'ads', channelId: '1' },
  { date: '2024-01-01', amount: 45.00, source: 'memberships', channelId: '1' },
  { date: '2024-01-01', amount: 20.00, source: 'superchats', channelId: '1' },
  { date: '2024-01-02', amount: 195.75, source: 'ads', channelId: '1' },
  { date: '2024-01-02', amount: 53.00, source: 'memberships', channelId: '1' },
  { date: '2024-01-02', amount: 20.00, source: 'superchats', channelId: '1' },
  { date: '2024-01-03', amount: 165.30, source: 'ads', channelId: '1' },
  { date: '2024-01-03', amount: 40.00, source: 'memberships', channelId: '1' },
  { date: '2024-01-03', amount: 20.00, source: 'superchats', channelId: '1' }
];

export const mockAudienceInsights: AudienceInsight[] = [
  { ageGroup: '18-24', gender: 'male', country: 'US', percentage: 25.5 },
  { ageGroup: '25-34', gender: 'male', country: 'US', percentage: 32.8 },
  { ageGroup: '35-44', gender: 'male', country: 'US', percentage: 18.2 },
  { ageGroup: '18-24', gender: 'female', country: 'US', percentage: 12.3 },
  { ageGroup: '25-34', gender: 'female', country: 'US', percentage: 8.7 },
  { ageGroup: '35-44', gender: 'female', country: 'US', percentage: 2.5 }
];

export const mockPerformanceMetrics: PerformanceMetrics = {
  totalViews: 4875000,
  totalRevenue: 8945.75,
  totalSubscribers: 281000,
  averageWatchTime: 285.5,
  engagementRate: 8.2,
  growthRate: 12.5
};
