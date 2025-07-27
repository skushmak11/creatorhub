import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Card from '../components/Card';
import Button from '../components/Button';
import { analyticsService } from '../services/analyticsService';
import { AnalyticsData, PerformanceMetrics } from '../types/Analytics';

const Analytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const [data, metricsData] = await Promise.all([
          analyticsService.getAnalytics(),
          analyticsService.getPerformanceMetrics()
        ]);
        
        setAnalyticsData(data);
        setMetrics(metricsData);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  const revenueBySource = [
    { name: 'Ads', value: 65, color: '#3B82F6' },
    { name: 'Memberships', value: 20, color: '#10B981' },
    { name: 'Super Chats', value: 10, color: '#F59E0B' },
    { name: 'Merchandise', value: 5, color: '#EF4444' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advanced Analytics</h1>
          <p className="text-gray-600">Track your performance and audience insights</p>
        </div>
        
        <div className="flex space-x-2">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Key Metrics */}
      {metrics && (
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-500">Total Views</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {metrics.totalViews.toLocaleString()}
                </p>
                <p className="text-sm text-green-600 mt-1">+{metrics.growthRate}% from last period</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-500">Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ${metrics.totalRevenue.toLocaleString()}
                </p>
                <p className="text-sm text-green-600 mt-1">+12.5% from last period</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-500">Avg. Watch Time</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {Math.floor(metrics.averageWatchTime / 60)}:{(metrics.averageWatchTime % 60).toString().padStart(2, '0')}
                </p>
                <p className="text-sm text-green-600 mt-1">+8.2% from last period</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-500">Engagement Rate</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {metrics.engagementRate}%
                </p>
                <p className="text-sm text-green-600 mt-1">+2.1% from last period</p>
              </div>
            </Card>
          </div>
        </motion.div>
      )}

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card title="Views & Revenue Trend">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value: number, name: string) => [
                    name === 'views' ? value.toLocaleString() : `$${value.toFixed(2)}`,
                    name === 'views' ? 'Views' : 'Revenue'
                  ]}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="views" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card title="Revenue Sources">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueBySource}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {revenueBySource.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {revenueBySource.map((source) => (
                <div key={source.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: source.color }}
                  />
                  <span className="text-sm text-gray-600">{source.name}: {source.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card title="Subscriber Growth">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.slice(-7)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date"
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value: number) => [value.toLocaleString(), 'Subscribers']}
                />
                <Bar dataKey="subscribers" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card title="Engagement Metrics">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.slice(-10)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date"
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value: number) => [`${value}%`, 'Engagement Rate']}
                />
                <Line 
                  type="monotone" 
                  dataKey="engagement" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Export Section */}
      <motion.div variants={itemVariants}>
        <Card title="Export Analytics">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">
                Download your analytics data for further analysis or reporting.
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">
                Export CSV
              </Button>
              <Button variant="outline" size="sm">
                Export PDF
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Analytics;
