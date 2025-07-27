import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Channel } from '../types/Channel';

const ChannelsScreen: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [channelUrl, setChannelUrl] = useState('');
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    loadChannels();
  }, []);

  const loadChannels = async () => {
    try {
      // Mock data
      const mockChannels: Channel[] = [
        {
          id: '1',
          name: 'Tech Reviews Pro',
          description: 'Latest technology reviews and tutorials',
          subscriberCount: 125000,
          videoCount: 89,
          totalViews: 2500000,
          thumbnail: 'https://via.placeholder.com/150x150/4F46E5/FFFFFF?text=TR',
          isConnected: true,
          createdAt: '2023-01-15T00:00:00Z',
          lastSyncAt: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          name: 'Creative Cooking',
          description: 'Delicious recipes and cooking tips',
          subscriberCount: 89000,
          videoCount: 156,
          totalViews: 1800000,
          thumbnail: 'https://via.placeholder.com/150x150/EF4444/FFFFFF?text=CC',
          isConnected: true,
          createdAt: '2022-08-20T00:00:00Z',
          lastSyncAt: '2024-01-15T09:15:00Z'
        },
        {
          id: '3',
          name: 'Fitness Journey',
          description: 'Workout routines and health tips',
          subscriberCount: 67000,
          videoCount: 203,
          totalViews: 1200000,
          thumbnail: 'https://via.placeholder.com/150x150/10B981/FFFFFF?text=FJ',
          isConnected: true,
          createdAt: '2023-03-10T00:00:00Z',
          lastSyncAt: '2024-01-15T08:45:00Z'
        }
      ];
      setChannels(mockChannels);
    } catch (error) {
      Alert.alert('Error', 'Failed to load channels');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadChannels().finally(() => setRefreshing(false));
  }, []);

  const handleConnectChannel = async () => {
    if (!channelUrl.trim()) {
      Alert.alert('Error', 'Please enter a channel URL');
      return;
    }

    setConnecting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newChannel: Channel = {
        id: Date.now().toString(),
        name: 'New Connected Channel',
        description: 'Recently connected YouTube channel',
        subscriberCount: Math.floor(Math.random() * 50000),
        videoCount: Math.floor(Math.random() * 100),
        totalViews: Math.floor(Math.random() * 1000000),
        thumbnail: 'https://via.placeholder.com/150x150/10B981/FFFFFF?text=NC',
        isConnected: true,
        createdAt: new Date().toISOString(),
        lastSyncAt: new Date().toISOString()
      };

      setChannels(prev => [...prev, newChannel]);
      setChannelUrl('');
      setShowAddForm(false);
      Alert.alert('Success', 'Channel connected successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to connect channel');
    } finally {
      setConnecting(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading channels...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
          <Text style={styles.headerTitle}>Channel Management</Text>
          <Text style={styles.headerSubtitle}>Connect and manage your YouTube channels</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddForm(true)}
          >
            <Text style={styles.addButtonText}>Connect Channel</Text>
          </TouchableOpacity>
        </View>

        {/* Add Channel Form */}
        {showAddForm && (
          <View style={styles.addForm}>
            <Text style={styles.formTitle}>Connect New Channel</Text>
            <TextInput
              style={styles.input}
              value={channelUrl}
              onChangeText={setChannelUrl}
              placeholder="https://www.youtube.com/@yourchannel"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.inputHelper}>Enter your YouTube channel URL or handle</Text>
            <View style={styles.formButtons}>
              <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                onPress={handleConnectChannel}
                disabled={connecting}
              >
                <Text style={styles.primaryButtonText}>
                  {connecting ? 'Connecting...' : 'Connect Channel'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={() => setShowAddForm(false)}
              >
                <Text style={styles.secondaryButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Channels List */}
        {channels.length > 0 ? (
          <View style={styles.channelsList}>
            {channels.map((channel) => (
              <View key={channel.id} style={styles.channelCard}>
                <View style={styles.channelHeader}>
                  <View style={styles.channelInfo}>
                    <Text style={styles.channelName}>{channel.name}</Text>
                    <Text style={styles.channelDescription}>{channel.description}</Text>
                    <View style={styles.statusBadge}>
                      <Text style={[
                        styles.statusText,
                        channel.isConnected ? styles.connectedStatus : styles.disconnectedStatus
                      ]}>
                        {channel.isConnected ? 'Connected' : 'Disconnected'}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.channelStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{formatNumber(channel.subscriberCount)}</Text>
                    <Text style={styles.statLabel}>Subscribers</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{channel.videoCount}</Text>
                    <Text style={styles.statLabel}>Videos</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{formatNumber(channel.totalViews)}</Text>
                    <Text style={styles.statLabel}>Views</Text>
                  </View>
                </View>

                <View style={styles.channelFooter}>
                  <Text style={styles.footerText}>
                    Created: {formatDate(channel.createdAt)}
                  </Text>
                  <Text style={styles.footerText}>
                    Last sync: {formatDate(channel.lastSyncAt)}
                  </Text>
                </View>

                <View style={styles.channelActions}>
                  <TouchableOpacity style={[styles.actionButton, styles.syncButton]}>
                    <Text style={styles.syncButtonText}>Sync</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionButton, styles.disconnectButton]}>
                    <Text style={styles.disconnectButtonText}>Disconnect</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📺</Text>
            <Text style={styles.emptyTitle}>No channels connected</Text>
            <Text style={styles.emptyDescription}>
              Connect your first YouTube channel to get started with CreatorHub
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => setShowAddForm(true)}
            >
              <Text style={styles.emptyButtonText}>Connect Your First Channel</Text>
            </TouchableOpacity>
          </View>
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  addForm: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 8,
  },
  inputHelper: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  formButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#4F46E5',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  secondaryButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  channelsList: {
    padding: 20,
    gap: 16,
  },
  channelCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  channelHeader: {
    marginBottom: 16,
  },
  channelInfo: {
    flex: 1,
  },
  channelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  channelDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  connectedStatus: {
    backgroundColor: '#D1FAE5',
    color: '#065F46',
  },
  disconnectedStatus: {
    backgroundColor: '#FEE2E2',
    color: '#991B1B',
  },
  channelStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  channelFooter: {
    marginBottom: 16,
  },
  footerText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  channelActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  syncButton: {
    backgroundColor: '#4F46E5',
  },
  syncButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  disconnectButton: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  disconnectButtonText: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    margin: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ChannelsScreen;
