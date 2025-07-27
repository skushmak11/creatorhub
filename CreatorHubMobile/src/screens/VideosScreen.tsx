import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video } from '../types/Video';

const VideosScreen: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'scheduled'>('all');

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      // Mock data
      const mockVideos: Video[] = [
        {
          id: '1',
          title: 'Getting Started with React 18 - Complete Tutorial',
          description: 'Learn the fundamentals of React 18 including new features like Suspense, Concurrent Rendering, and Automatic Batching.',
          thumbnail: 'https://via.placeholder.com/320x180/4F46E5/FFFFFF?text=React+18',
          duration: 1245,
          views: 15420,
          likes: 892,
          comments: 156,
          publishedAt: '2024-01-10T10:00:00Z',
          status: 'published',
          channelId: '1',
          tags: ['react', 'javascript', 'tutorial'],
          category: 'Education'
        },
        {
          id: '2',
          title: 'Advanced TypeScript Tips and Tricks',
          description: 'Discover advanced TypeScript patterns, utility types, and best practices.',
          thumbnail: 'https://via.placeholder.com/320x180/3B82F6/FFFFFF?text=TypeScript',
          duration: 892,
          views: 8750,
          likes: 445,
          comments: 89,
          publishedAt: '2024-01-08T14:30:00Z',
          status: 'published',
          channelId: '1',
          tags: ['typescript', 'javascript', 'programming'],
          category: 'Education'
        },
        {
          id: '3',
          title: 'Next.js 14 App Router Deep Dive',
          description: 'Explore the new App Router in Next.js 14, including server components and streaming.',
          thumbnail: 'https://via.placeholder.com/320x180/000000/FFFFFF?text=Next.js',
          duration: 2134,
          views: 0,
          likes: 0,
          comments: 0,
          publishedAt: '2024-01-20T16:00:00Z',
          status: 'scheduled',
          channelId: '1',
          tags: ['nextjs', 'react', 'app-router'],
          category: 'Education'
        },
        {
          id: '4',
          title: 'JavaScript Performance Optimization',
          description: 'Learn how to optimize JavaScript performance with practical examples.',
          thumbnail: 'https://via.placeholder.com/320x180/F59E0B/FFFFFF?text=JS+Perf',
          duration: 0,
          views: 0,
          likes: 0,
          comments: 0,
          publishedAt: '',
          status: 'draft',
          channelId: '1',
          tags: ['javascript', 'performance', 'optimization'],
          category: 'Education'
        }
      ];
      setVideos(mockVideos);
    } catch (error) {
      Alert.alert('Error', 'Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadVideos().finally(() => setRefreshing(false));
  }, []);

  const filteredVideos = videos.filter(video => {
    if (filter === 'all') return true;
    return video.status === filter;
  });

  const formatDuration = (seconds: number) => {
    if (seconds === 0) return 'Draft';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not published';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return { backgroundColor: '#D1FAE5', color: '#065F46' };
      case 'draft':
        return { backgroundColor: '#F3F4F6', color: '#374151' };
      case 'scheduled':
        return { backgroundColor: '#DBEAFE', color: '#1E40AF' };
      default:
        return { backgroundColor: '#F3F4F6', color: '#374151' };
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading videos...</Text>
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
          <Text style={styles.headerTitle}>Video Management</Text>
          <Text style={styles.headerSubtitle}>Upload, edit, and manage your video content</Text>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload Video</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { key: 'all', label: 'All Videos' },
              { key: 'published', label: 'Published' },
              { key: 'draft', label: 'Draft' },
              { key: 'scheduled', label: 'Scheduled' }
            ].map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.filterTab,
                  filter === tab.key && styles.activeFilterTab
                ]}
                onPress={() => setFilter(tab.key as any)}
              >
                <Text style={[
                  styles.filterTabText,
                  filter === tab.key && styles.activeFilterTabText
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Videos List */}
        {filteredVideos.length > 0 ? (
          <View style={styles.videosList}>
            {filteredVideos.map((video) => (
              <TouchableOpacity key={video.id} style={styles.videoCard}>
                <View style={styles.videoThumbnail}>
                  <View style={styles.thumbnailPlaceholder}>
                    <Text style={styles.thumbnailText}>📹</Text>
                  </View>
                  <View style={styles.durationBadge}>
                    <Text style={styles.durationText}>{formatDuration(video.duration)}</Text>
                  </View>
                  <View style={styles.statusBadge}>
                    <Text style={[
                      styles.statusText,
                      getStatusColor(video.status)
                    ]}>
                      {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                    </Text>
                  </View>
                </View>

                <View style={styles.videoInfo}>
                  <Text style={styles.videoTitle} numberOfLines={2}>
                    {video.title}
                  </Text>
                  <Text style={styles.videoDescription} numberOfLines={2}>
                    {video.description}
                  </Text>

                  <View style={styles.videoMeta}>
                    <Text style={styles.metaText}>{formatDate(video.publishedAt)}</Text>
                    <Text style={styles.metaText}>•</Text>
                    <Text style={styles.metaText}>{video.category}</Text>
                  </View>

                  {video.status === 'published' && (
                    <View style={styles.videoStats}>
                      <View style={styles.statItem}>
                        <Text style={styles.statValue}>{formatNumber(video.views)}</Text>
                        <Text style={styles.statLabel}>Views</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Text style={styles.statValue}>{formatNumber(video.likes)}</Text>
                        <Text style={styles.statLabel}>Likes</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Text style={styles.statValue}>{formatNumber(video.comments)}</Text>
                        <Text style={styles.statLabel}>Comments</Text>
                      </View>
                    </View>
                  )}

                  <View style={styles.videoTags}>
                    {video.tags.slice(0, 3).map(tag => (
                      <View key={tag} style={styles.tag}>
                        <Text style={styles.tagText}>#{tag}</Text>
                      </View>
                    ))}
                    {video.tags.length > 3 && (
                      <View style={styles.tag}>
                        <Text style={styles.tagText}>+{video.tags.length - 3} more</Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📹</Text>
            <Text style={styles.emptyTitle}>No videos found</Text>
            <Text style={styles.emptyDescription}>
              {filter === 'all' 
                ? "Upload your first video to get started"
                : `No ${filter} videos found`
              }
            </Text>
            <TouchableOpacity style={styles.emptyButton}>
              <Text style={styles.emptyButtonText}>Upload Video</Text>
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
  uploadButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  filterContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  activeFilterTab: {
    backgroundColor: '#4F46E5',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeFilterTabText: {
    color: '#FFFFFF',
  },
  videosList: {
    padding: 20,
    gap: 16,
  },
  videoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  videoThumbnail: {
    height: 180,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  thumbnailPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailText: {
    fontSize: 48,
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  statusBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  videoInfo: {
    padding: 16,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  videoDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  videoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
    marginRight: 8,
  },
  videoStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  videoTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: '#6B7280',
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

export default VideosScreen;
