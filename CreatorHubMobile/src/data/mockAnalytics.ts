export interface AnalyticsData {
  totalViews: number;
  totalRevenue: number;
  subscribers: number;
  growthRate: number;
  viewsData: Array<{ date: string; views: number }>;
  revenueData: Array<{ date: string; revenue: number }>;
  topVideos: Array<{
    id: string;
    title: string;
    views: number;
    revenue: number;
    thumbnail: string;
  }>;
}

export const mockAnalyticsData: AnalyticsData = {
  totalViews: 4875000,
  totalRevenue: 8945.75,
  subscribers: 281000,
  growthRate: 12.5,
  viewsData: [
    { date: '2025-01-01', views: 45000 },
    { date: '2025-01-02', views: 52000 },
    { date: '2025-01-03', views: 48000 },
    { date: '2025-01-04', views: 61000 },
    { date: '2025-01-05', views: 55000 },
    { date: '2025-01-06', views: 67000 },
    { date: '2025-01-07', views: 72000 },
  ],
  revenueData: [
    { date: '2025-01-01', revenue: 125.50 },
    { date: '2025-01-02', revenue: 142.30 },
    { date: '2025-01-03', revenue: 118.75 },
    { date: '2025-01-04', revenue: 165.20 },
    { date: '2025-01-05', revenue: 138.90 },
    { date: '2025-01-06', revenue: 189.45 },
    { date: '2025-01-07', revenue: 203.80 },
  ],
  topVideos: [
    {
      id: '1',
      title: 'iPhone 16 Pro Max Review - Is It Worth It?',
      views: 1250000,
      revenue: 2840.50,
      thumbnail: 'https://via.placeholder.com/120x68',
    },
    {
      id: '2',
      title: '10 Minute Pasta Recipe That Will Change Your Life',
      views: 890000,
      revenue: 1920.30,
      thumbnail: 'https://via.placeholder.com/120x68',
    },
    {
      id: '3',
      title: 'Full Body Workout - No Equipment Needed',
      views: 675000,
      revenue: 1456.75,
      thumbnail: 'https://via.placeholder.com/120x68',
    },
  ],
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};
