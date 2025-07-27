import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive, icon }) => (
  <View style={styles.metricCard}>
    <View style={styles.metricHeader}>
      <Text style={styles.metricIcon}>{icon}</Text>
      <Text style={styles.metricTitle}>{title}</Text>
    </View>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={[
      styles.metricChange,
      isPositive ? styles.positiveChange : styles.negativeChange
    ]}>
      {isPositive ? '↗' : '↘'} {change}
    </Text>
  </View>
);

const AnalyticsScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [metrics, setMetrics] = useState({
    totalViews: { value: '2.5M', change: '+12.5%', isPositive: true },
    watchTime: { value: '45.2K hrs', change: '+8.3%', isPositive: true },
    subscribers: { value: '125K', change: '+5.2%', isPositive: true },
    revenue: { value: '$12,450', change: '+15.7%', isPositive: true },
    engagement: { value: '4.8%', change: '-0.3%', isPositive: false },
    ctr: { value: '3.2%', change: '+0.8%', isPositive: true },
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const topVideos = [
    {
      id: '1',
      title: 'React 18 Complete Tutorial',
      views: '45.2K',
      duration: '20:45',
      ctr: '5.2%',
    },
    {
      id: '2',
      title: 'TypeScript Best Practices',
      views: '32.1K',
      duration: '14:52',
      ctr: '4.8%',
    },
    {
      id: '3',
      title: 'Next.js App Router Guide',
      views: '28.9K',
      duration: '35:34',
      ctr: '4.1%',
    },
  ];

  const audienceData = [
    { country: 'United States', percentage: '35%' },
    { country: 'United Kingdom', percentage: '18%' },
    { country: 'Canada', percentage: '12%' },
    { country: 'Germany', percentage: '8%' },
    { country: 'Australia', percentage: '6%' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Analytics</Text>
          <Text style={styles.headerSubtitle}>Track your performance and insights</Text>
        </View>

        {/* Time Range Selector */}
        <View style={styles.timeRangeContainer}>
          <Text style={styles.sectionTitle}>Time Range</Text>
          <View style={styles.timeRangeButtons}>
            {[
              { key: '7d', label: '7 Days' },
              { key: '30d', label: '30 Days' },
              { key: '90d', label: '90 Days' }
            ].map((range) => (
              <TouchableOpacity
                key={range.key}
                style={[
                  styles.timeRangeButton,
                  timeRange === range.key && styles.activeTimeRangeButton
                ]}
                onPress={() => setTimeRange(range.key as any)}
              >
                <Text style={[
                  styles.timeRangeButtonText,
                  timeRange === range.key && styles.activeTimeRangeButtonText
                ]}>
                  {range.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Key Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <View style={styles.metricsGrid}>
            <MetricCard
              title="Total Views"
              value={metrics.totalViews.value}
              change={metrics.totalViews.change}
              isPositive={metrics.totalViews.isPositive}
              icon="👁"
            />
            <MetricCard
              title="Watch Time"
              value={metrics.watchTime.value}
              change={metrics.watchTime.change}
              isPositive={metrics.watchTime.isPositive}
              icon="⏱"
            />
            <MetricCard
              title="Subscribers"
              value={metrics.subscribers.value}
              change={metrics.subscribers.change}
              isPositive={metrics.subscribers.isPositive}
              icon="👥"
            />
            <MetricCard
              title="Revenue"
              value={metrics.revenue.value}
              change={metrics.revenue.change}
              isPositive={metrics.revenue.isPositive}
              icon="💰"
            />
            <MetricCard
              title="Engagement"
              value={metrics.engagement.value}
              change={metrics.engagement.change}
              isPositive={metrics.engagement.isPositive}
              icon="❤️"
            />
            <MetricCard
              title="Click Rate"
              value={metrics.ctr.value}
              change={metrics.ctr.change}
              isPositive={metrics.ctr.isPositive}
              icon="👆"
            />
          </View>
        </View>

        {/* Top Performing Videos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Performing Videos</Text>
          <View style={styles.videosList}>
            {topVideos.map((video, index) => (
              <View key={video.id} style={styles.videoItem}>
                <View style={styles.videoRank}>
                  <Text style={styles.rankNumber}>{index + 1}</Text>
                </View>
                <View style={styles.videoInfo}>
                  <Text style={styles.videoTitle} numberOfLines={1}>
                    {video.title}
                  </Text>
                  <View style={styles.videoStats}>
                    <Text style={styles.videoStat}>{video.views} views</Text>
                    <Text style={styles.videoStat}>•</Text>
                    <Text style={styles.videoStat}>{video.duration}</Text>
                    <Text style={styles.videoStat}>•</Text>
                    <Text style={styles.videoStat}>{video.ctr} CTR</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Audience Demographics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Countries</Text>
          <View style={styles.audienceList}>
            {audienceData.map((country, index) => (
              <View key={index} style={styles.audienceItem}>
                <Text style={styles.countryName}>{country.country}</Text>
                <View style={styles.percentageContainer}>
                  <View style={[
                    styles.percentageBar,
                    { width: `${parseInt(country.percentage)}%` }
                  ]} />
                  <Text style={styles.percentageText}>{country.percentage}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Revenue Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Revenue Sources</Text>
          <View style={styles.revenueList}>
            {[
              { name: 'Ad Revenue', amount: '$7,200', percentage: '58%', color: '#4F46E5' },
              { name: 'Sponsorships', amount: '$3,500', percentage: '28%', color: '#10B981' },
              { name: 'Memberships', amount: '$1,200', percentage: '10%', color: '#8B5CF6' },
              { name: 'Merchandise', amount: '$550', percentage: '4%', color: '#F59E0B' },
            ].map((source, index) => (
              <View key={index} style={styles.revenueItem}>
                <View style={styles.revenueInfo}>
                  <View style={[styles.revenueColor, { backgroundColor: source.color }]} />
                  <Text style={styles.revenueName}>{source.name}</Text>
                </View>
                <View style={styles.revenueAmount}>
                  <Text style={styles.revenueValue}>{source.amount}</Text>
                  <Text style={styles.revenuePercentage}>{source.percentage}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Performance Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Tips</Text>
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <Text style={styles.tipIcon}>💡</Text>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Optimize Upload Schedule</Text>
                <Text style={styles.tipDescription}>
                  Your audience is most active on Tuesdays and Thursdays at 2 PM
                </Text>
              </View>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipIcon}>📈</Text>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Improve Thumbnails</Text>
                <Text style={styles.tipDescription}>
                  Videos with custom thumbnails get 30% more clicks
                </Text>
              </View>
            </View>
            <View style={styles.tipItem}>
              <Text style={styles.tipIcon}>🎯</Text>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Focus on Retention</Text>
                <Text style={styles.tipDescription}>
                  Add hooks in the first 15 seconds to improve watch time
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  timeRangeContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  timeRangeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  timeRangeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  activeTimeRangeButton: {
    backgroundColor: '#4F46E5',
  },
  timeRangeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTimeRangeButtonText: {
    color: '#FFFFFF',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  metricTitle: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '500',
  },
  positiveChange: {
    color: '#10B981',
  },
  negativeChange: {
    color: '#EF4444',
  },
  videosList: {
    gap: 12,
  },
  videoItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  videoRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumber: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  videoInfo: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  videoStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoStat: {
    fontSize: 12,
    color: '#6B7280',
    marginRight: 8,
  },
  audienceList: {
    gap: 12,
  },
  audienceItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  countryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentageBar: {
    height: 6,
    backgroundColor: '#4F46E5',
    borderRadius: 3,
    marginRight: 12,
  },
  percentageText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  revenueList: {
    gap: 12,
  },
  revenueItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  revenueInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  revenueColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  revenueName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  revenueAmount: {
    alignItems: 'flex-end',
  },
  revenueValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  revenuePercentage: {
    fontSize: 12,
    color: '#6B7280',
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tipIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
});

export default AnalyticsScreen;
