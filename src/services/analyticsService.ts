import { AnalyticsData, RevenueData, AudienceInsight, PerformanceMetrics } from '../types/Analytics';
import { mockAnalyticsData, mockRevenueData, mockAudienceInsights, mockPerformanceMetrics } from '../data/mockAnalytics';

const YOUTUBE_ANALYTICS_API_BASE = 'https://youtubeanalytics.googleapis.com/v2';

export const analyticsService = {
  async getAnalytics(channelId?: string, dateRange?: { start: string; end: string }): Promise<AnalyticsData[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    let data = [...mockAnalyticsData];
    
    // Filter by date range if provided
    if (dateRange) {
      data = data.filter(item => {
        const itemDate = new Date(item.date);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }
    
    return data;
  },

  async getRevenueData(channelId?: string): Promise<RevenueData[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let data = [...mockRevenueData];
    
    // Filter by channel if provided
    if (channelId) {
      data = data.filter(item => item.channelId === channelId);
    }
    
    return data;
  },

  async getAudienceInsights(channelId?: string): Promise<AudienceInsight[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return mockAudienceInsights;
  },

  async getChannelDemographics(channelId: string, accessToken: string): Promise<any> {
    try {
      const url = YOUTUBE_ANALYTICS_API_BASE + '/reports?ids=channel==' + channelId + '&metrics=viewerPercentage&dimensions=ageGroup,gender&access_token=' + accessToken;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch demographics from YouTube Analytics API');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching demographics:', error);
      return null;
    }
  },

  async getPerformanceMetrics(channelId?: string): Promise<PerformanceMetrics> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 900));
    
    // If specific channel requested, modify metrics slightly
    if (channelId) {
      return {
        ...mockPerformanceMetrics,
        totalViews: Math.floor(mockPerformanceMetrics.totalViews * 0.3),
        totalRevenue: Math.floor(mockPerformanceMetrics.totalRevenue * 0.3),
        totalSubscribers: Math.floor(mockPerformanceMetrics.totalSubscribers * 0.3)
      };
    }
    
    return mockPerformanceMetrics;
  },

  async getChannelComparison(channelIds: string[]): Promise<{ channelId: string; metrics: PerformanceMetrics }[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return channelIds.map(channelId => ({
      channelId,
      metrics: {
        totalViews: Math.floor(Math.random() * 1000000) + 100000,
        totalRevenue: Math.floor(Math.random() * 5000) + 1000,
        totalSubscribers: Math.floor(Math.random() * 100000) + 10000,
        averageWatchTime: Math.floor(Math.random() * 300) + 120,
        engagementRate: Math.floor(Math.random() * 10) + 5,
        growthRate: Math.floor(Math.random() * 20) + 5
      }
    }));
  },

  async exportAnalytics(channelId?: string, format: 'csv' | 'pdf' = 'csv'): Promise<Blob> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const data = await this.getAnalytics(channelId);
    
    if (format === 'csv') {
      const csvContent = [
        'Date,Views,Revenue,Subscribers,Watch Time,Engagement',
        ...data.map(item => 
          `${item.date},${item.views},${item.revenue},${item.subscribers},${item.watchTime},${item.engagement}`
        )
      ].join('\n');
      
      return new Blob([csvContent], { type: 'text/csv' });
    }
    
    // For PDF, return a mock blob
    return new Blob(['Mock PDF content'], { type: 'application/pdf' });
  },

  async getTopPerformingVideos(channelId?: string, limit: number = 10): Promise<Array<{
    videoId: string;
    title: string;
    views: number;
    revenue: number;
    engagement: number;
  }>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockTopVideos = [
      { videoId: '1', title: 'Getting Started with React 18', views: 15420, revenue: 245.50, engagement: 8.2 },
      { videoId: '2', title: 'Advanced TypeScript Tips', views: 8750, revenue: 156.30, engagement: 7.8 },
      { videoId: '3', title: 'Building Modern UIs with Tailwind CSS', views: 12300, revenue: 198.75, engagement: 8.5 },
      { videoId: '4', title: 'Node.js Best Practices', views: 9800, revenue: 167.20, engagement: 7.2 },
      { videoId: '5', title: 'Database Design Fundamentals', views: 11200, revenue: 189.40, engagement: 8.0 }
    ];
    
    return mockTopVideos.slice(0, limit);
  }
};
