import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';

interface RevenueData {
  month: string;
  adRevenue: number;
  sponsorships: number;
  merchandise: number;
  memberships: number;
  total: number;
}

interface PayoutHistory {
  id: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'processing';
  method: string;
}

interface MonetizationMetrics {
  totalRevenue: number;
  monthlyRevenue: number;
  revenueGrowth: number;
  averageRPM: number;
  totalPayouts: number;
  pendingPayouts: number;
}

const Monetization: React.FC = () => {
  const [metrics, setMetrics] = useState<MonetizationMetrics | null>(null);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [payoutHistory, setPayoutHistory] = useState<PayoutHistory[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'revenue' | 'payouts'>('overview');

  useEffect(() => {
    // Mock data
    const mockMetrics: MonetizationMetrics = {
      totalRevenue: 45678.90,
      monthlyRevenue: 8234.56,
      revenueGrowth: 12.5,
      averageRPM: 3.45,
      totalPayouts: 38450.00,
      pendingPayouts: 7228.90
    };

    const mockRevenueData: RevenueData[] = [
      {
        month: 'Jan 2024',
        adRevenue: 4500,
        sponsorships: 2000,
        merchandise: 800,
        memberships: 1200,
        total: 8500
      },
      {
        month: 'Dec 2023',
        adRevenue: 4200,
        sponsorships: 1500,
        merchandise: 600,
        memberships: 1100,
        total: 7400
      },
      {
        month: 'Nov 2023',
        adRevenue: 3800,
        sponsorships: 2500,
        merchandise: 700,
        memberships: 1000,
        total: 8000
      },
      {
        month: 'Oct 2023',
        adRevenue: 3600,
        sponsorships: 1800,
        merchandise: 500,
        memberships: 900,
        total: 6800
      },
      {
        month: 'Sep 2023',
        adRevenue: 3400,
        sponsorships: 1200,
        merchandise: 400,
        memberships: 800,
        total: 5800
      },
      {
        month: 'Aug 2023',
        adRevenue: 3200,
        sponsorships: 1000,
        merchandise: 300,
        memberships: 700,
        total: 5200
      }
    ];

    const mockPayoutHistory: PayoutHistory[] = [
      {
        id: '1',
        date: '2024-01-01T00:00:00Z',
        amount: 7500.00,
        status: 'completed',
        method: 'Bank Transfer'
      },
      {
        id: '2',
        date: '2023-12-01T00:00:00Z',
        amount: 6800.00,
        status: 'completed',
        method: 'PayPal'
      },
      {
        id: '3',
        date: '2023-11-01T00:00:00Z',
        amount: 7200.00,
        status: 'completed',
        method: 'Bank Transfer'
      },
      {
        id: '4',
        date: '2024-02-01T00:00:00Z',
        amount: 8234.56,
        status: 'pending',
        method: 'Bank Transfer'
      }
    ];

    setMetrics(mockMetrics);
    setRevenueData(mockRevenueData);
    setPayoutHistory(mockPayoutHistory);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!metrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Monetization Tracking</h1>
        <p className="text-gray-600 mt-1">
          Track your revenue, payouts, and monetization performance
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'revenue', label: 'Revenue', icon: '💰' },
            { id: 'payouts', label: 'Payouts', icon: '💳' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-semibold">💰</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(metrics.totalRevenue)}
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">📈</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(metrics.monthlyRevenue)}
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 font-semibold">📊</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Growth Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    +{metrics.revenueGrowth}%
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-orange-600 font-semibold">💵</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Average RPM</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(metrics.averageRPM)}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Revenue Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Revenue Sources">
              <div className="space-y-4">
                {[
                  { name: 'Ad Revenue', amount: 4500, color: 'bg-blue-500', percentage: 53 },
                  { name: 'Sponsorships', amount: 2000, color: 'bg-green-500', percentage: 24 },
                  { name: 'Memberships', amount: 1200, color: 'bg-purple-500', percentage: 14 },
                  { name: 'Merchandise', amount: 800, color: 'bg-orange-500', percentage: 9 }
                ].map(source => (
                  <div key={source.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
                      <span className="text-sm font-medium text-gray-900">{source.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {formatCurrency(source.amount)}
                      </p>
                      <p className="text-xs text-gray-500">{source.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Payout Summary">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-green-900">Total Paid Out</p>
                    <p className="text-lg font-bold text-green-900">
                      {formatCurrency(metrics.totalPayouts)}
                    </p>
                  </div>
                  <div className="text-green-600">
                    <span className="text-2xl">✅</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-yellow-900">Pending Payout</p>
                    <p className="text-lg font-bold text-yellow-900">
                      {formatCurrency(metrics.pendingPayouts)}
                    </p>
                  </div>
                  <div className="text-yellow-600">
                    <span className="text-2xl">⏳</span>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Request Payout
                </Button>
              </div>
            </Card>
          </div>

          {/* Monetization Tips */}
          <Card title="Monetization Tips">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Optimize Ad Revenue</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Enable mid-roll ads for videos over 8 minutes</li>
                  <li>• Use engaging thumbnails to increase CTR</li>
                  <li>• Focus on high-CPM niches</li>
                </ul>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Sponsorship Strategy</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Build a media kit with your stats</li>
                  <li>• Reach out to relevant brands</li>
                  <li>• Maintain authentic partnerships</li>
                </ul>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">Diversify Income</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Launch channel memberships</li>
                  <li>• Create digital products</li>
                  <li>• Offer consulting services</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Revenue Tab */}
      {activeTab === 'revenue' && (
        <div className="space-y-6">
          <Card title="Revenue History">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Month
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ad Revenue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sponsorships
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Memberships
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Merchandise
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {revenueData.map((data, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {data.month}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(data.adRevenue)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(data.sponsorships)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(data.memberships)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(data.merchandise)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {formatCurrency(data.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Payouts Tab */}
      {activeTab === 'payouts' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Payout History</h2>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Request New Payout
            </Button>
          </div>

          <Card>
            <div className="space-y-4">
              {payoutHistory.map(payout => (
                <div key={payout.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-semibold">💳</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(payout.amount)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(payout.date)} • {payout.method}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payout.status)}`}>
                    {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Payout Settings */}
          <Card title="Payout Settings">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Payout Amount
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>$100</option>
                  <option>$500</option>
                  <option>$1000</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payout Method
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Bank Transfer</option>
                  <option>PayPal</option>
                  <option>Wire Transfer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payout Schedule
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Monthly</option>
                  <option>Bi-weekly</option>
                  <option>Weekly</option>
                </select>
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700">
                Save Settings
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Monetization;
