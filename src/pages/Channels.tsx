import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { youtubeService } from '../services/youtubeService';
import { Channel } from '../types/Channel';

const Channels: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [syncing, setSyncing] = useState<string | null>(null);
  const [showConnectForm, setShowConnectForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);

  const [channelUrl, setChannelUrl] = useState('');

  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    try {
      const channelsData = await youtubeService.getChannels();
      setChannels(channelsData);
    } catch (error) {
      console.error('Failed to fetch channels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectChannel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!channelUrl.trim()) return;

    setConnecting(true);
    setError(null);
    try {
      const newChannel = await youtubeService.connectChannel(channelUrl);
      setChannels(prev => [...prev, newChannel]);
      setShowConnectForm(false);
      setChannelUrl('');
      setError(null);
    } catch (error) {
      console.error('Failed to connect channel:', error);
      setError(error instanceof Error ? error.message : 'Failed to connect channel. Please check the URL and try again.');
    } finally {
      setConnecting(false);
    }
  };

  const handleSyncChannel = async (channelId: string) => {
    setSyncing(channelId);
    setSyncError(null);
    try {
      const updatedChannel = await youtubeService.syncChannel(channelId);
      setChannels(prev => 
        prev.map(channel => 
          channel.id === channelId ? updatedChannel : channel
        )
      );
      setSyncError(null);
    } catch (error) {
      console.error('Failed to sync channel:', error);
      setSyncError(error instanceof Error ? error.message : 'Sync failed. Please try again later.');
    } finally {
      setSyncing(null);
    }
  };

  const handleDisconnectChannel = async (channelId: string) => {
    if (!confirm('Are you sure you want to disconnect this channel?')) return;

    try {
      await youtubeService.disconnectChannel(channelId);
      setChannels(prev => 
        prev.map(channel => 
          channel.id === channelId 
            ? { ...channel, isConnected: false }
            : channel
        )
      );
    } catch (error) {
      console.error('Failed to disconnect channel:', error);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Channel Management</h1>
          <p className="text-gray-600 mt-1">
            Connect and manage your YouTube channels
          </p>
        </div>
        <Button
          onClick={() => setShowConnectForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Connect Channel
        </Button>
      </div>

      {/* Error Messages */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4"
        >
          <div className="flex items-center">
            <span className="text-red-500 mr-2">⚠️</span>
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}

      {syncError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg mb-4"
        >
          <div className="flex items-center">
            <span className="text-yellow-500 mr-2">⚠️</span>
            <span>{syncError}</span>
            <button
              onClick={() => setSyncError(null)}
              className="ml-auto text-yellow-500 hover:text-yellow-700"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}

      {/* Connect Channel Form */}
      {showConnectForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card title="Connect New Channel">
            <form onSubmit={handleConnectChannel} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  YouTube Channel URL
                </label>
                <input
                  type="url"
                  value={channelUrl}
                  onChange={(e) => setChannelUrl(e.target.value)}
                  placeholder="https://www.youtube.com/@Travelwithshubhlabh"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Enter your YouTube channel URL (e.g., https://www.youtube.com/@channelname)
                </p>
              </div>
              <div className="flex space-x-3">
                <Button
                  type="submit"
                  disabled={connecting}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {connecting ? 'Connecting...' : 'Connect Channel'}
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setShowConnectForm(false);
                    setError(null);
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}

      {/* Channels Grid */}
      {channels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {channels.map((channel) => (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full">
                <div className="flex items-start space-x-4">
                  <img
                    src={channel.thumbnail}
                    alt={channel.name}
                    className="w-16 h-16 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {channel.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {channel.description}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        channel.isConnected 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {channel.isConnected ? 'Connected' : 'Disconnected'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Channel Stats */}
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatNumber(channel.subscriberCount)}
                    </p>
                    <p className="text-xs text-gray-500">Subscribers</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {channel.videoCount}
                    </p>
                    <p className="text-xs text-gray-500">Videos</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatNumber(channel.totalViews)}
                    </p>
                    <p className="text-xs text-gray-500">Views</p>
                  </div>
                </div>

                {/* Last Sync Info */}
                <div className="mt-4 text-xs text-gray-500">
                  <p>Created: {formatDate(channel.createdAt)}</p>
                  <p>Last sync: {formatDate(channel.lastSyncAt)}</p>
                </div>

                {/* Actions */}
                <div className="mt-4 flex space-x-2">
                  {channel.isConnected ? (
                    <>
                      <Button
                        onClick={() => handleSyncChannel(channel.id)}
                        disabled={syncing === channel.id}
                        size="sm"
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        {syncing === channel.id ? 'Syncing...' : 'Sync'}
                      </Button>
                      <Button
                        onClick={() => handleDisconnectChannel(channel.id)}
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => handleSyncChannel(channel.id)}
                      size="sm"
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Reconnect
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card>
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">📺</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No channels connected
            </h3>
            <p className="text-gray-600 mb-4">
              Connect your first YouTube channel to get started with CreatorHub
            </p>
            <Button
              onClick={() => setShowConnectForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Connect Your First Channel
            </Button>
          </div>
        </Card>
      )}

      {/* Channel Integration Guide */}
      <Card title="How to Connect Your Channel">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm font-semibold">1</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Get your channel URL</h4>
              <p className="text-sm text-gray-600">
                Go to your YouTube channel and copy the URL from your browser
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm font-semibold">2</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Connect your channel</h4>
              <p className="text-sm text-gray-600">
                Click "Connect Channel" and paste your YouTube channel URL
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm font-semibold">3</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Start managing</h4>
              <p className="text-sm text-gray-600">
                Once connected, you can view analytics, manage videos, and track performance
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Channels;
