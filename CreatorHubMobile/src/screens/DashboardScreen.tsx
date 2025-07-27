import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';

interface MetricCardProps {
  title: string;
  value: string;
  icon: string;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, color }) => (
  <View style={[styles.metricCard, { borderLeftColor: color }]}>
    <View style={styles.metricHeader}>
      <Text style={styles.metricIcon}>{icon}</Text>
      <Text style={styles.metricTitle}>{title}</Text>
    </View>
    <Text style={styles.metricValue}>{value}</Text>
  </View>
);

interface QuickActionProps {
  title: string;
  description: string;
  icon: string;
  onPress: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({ title, description, icon, onPress }) => (
  <TouchableOpacity style={styles.quickAction} onPress={onPress}>
    <View style={styles.quickActionIcon}>
      <Text style={styles.quickActionIconText}>{icon}</Text>
    </View>
    <View style={styles.quickActionContent}>
      <Text style={styles.quickActionTitle}>{title}</Text>
      <Text style={styles.quickActionDescription}>{description}</Text>
    </View>
  </TouchableOpacity>
);

const DashboardScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [metrics, setMetrics] = useState({
    totalViews: '2.5M',
    totalRevenue: '$12,450',
    subscribers: '125K',
    growthRate: '+12.5%',
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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
          <View>
            <Text style={styles.welcomeText}>Welcome back, {user?.name}! 👋</Text>
            <Text style={styles.dateText}>{getCurrentDate()}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <View style={styles.metricsGrid}>
            <MetricCard
              title="Total Views"
              value={metrics.totalViews}
              icon="👁"
              color="#3B82F6"
            />
            <MetricCard
              title="Revenue"
              value={metrics.totalRevenue}
              icon="💰"
              color="#10B981"
            />
            <MetricCard
              title="Subscribers"
              value={metrics.subscribers}
              icon="👥"
              color="#8B5CF6"
            />
            <MetricCard
              title="Growth Rate"
              value={metrics.growthRate}
              icon="📈"
              color="#F59E0B"
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <QuickAction
              title="View Analytics"
              description="Check your performance"
              icon="📊"
              onPress={() => {}}
            />
            <QuickAction
              title="Upload Video"
              description="Share new content"
              icon="📹"
              onPress={() => {}}
            />
            <QuickAction
              title="Manage Channels"
              description="Connect your channels"
              icon="📺"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text>📹</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>New video published</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text>👥</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>+150 new subscribers</Text>
                <Text style={styles.activityTime}>5 hours ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text>💰</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Revenue milestone reached</Text>
                <Text style={styles.activityTime}>1 day ago</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
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
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    width: '48%',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  quickActions: {
    gap: 12,
  },
  quickAction: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  quickActionIconText: {
    fontSize: 18,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  quickActionDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export default DashboardScreen;
