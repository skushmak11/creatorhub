import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  RefreshControl,
} from 'react-native';

interface Post {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
    subscribers: number;
  };
  timestamp: string;
  likes: number;
  replies: number;
}

const CommunityScreen: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const mockPosts: Post[] = [
    {
      id: '1',
      content: 'Just hit 100K subscribers! Thank you all for the amazing support. Working on some exciting content for next month.',
      author: {
        name: 'Tech Reviewer Pro',
        avatar: 'https://via.placeholder.com/40',
        verified: true,
        subscribers: 125000,
      },
      timestamp: '2 hours ago',
      likes: 234,
      replies: 45,
    },
    {
      id: '2',
      content: 'Anyone else struggling with YouTube algorithm changes? My views have been inconsistent lately.',
      author: {
        name: 'Creative Cooking',
        avatar: 'https://via.placeholder.com/40',
        verified: false,
        subscribers: 45000,
      },
      timestamp: '4 hours ago',
      likes: 89,
      replies: 23,
    },
    {
      id: '3',
      content: 'Pro tip: Consistency is key! I\'ve been posting daily for 6 months and finally seeing growth.',
      author: {
        name: 'Fitness Journey',
        avatar: 'https://via.placeholder.com/40',
        verified: true,
        subscribers: 78000,
      },
      timestamp: '6 hours ago',
      likes: 156,
      replies: 34,
    },
  ];

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPosts(mockPosts);
    } catch (error) {
      console.error('Failed to load posts:', error);
      Alert.alert('Error', 'Failed to load community posts');
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  };

  const handlePostSubmit = async () => {
    if (!newPost.trim()) {
      Alert.alert('Error', 'Please enter some content');
      return;
    }

    try {
      const post: Post = {
        id: Date.now().toString(),
        content: newPost.trim(),
        author: {
          name: 'You',
          avatar: 'https://via.placeholder.com/40',
          verified: false,
          subscribers: 0,
        },
        timestamp: 'Just now',
        likes: 0,
        replies: 0,
      };

      setPosts([post, ...posts]);
      setNewPost('');
      Alert.alert('Success', 'Post shared successfully!');
    } catch (error) {
      console.error('Failed to post:', error);
      Alert.alert('Error', 'Failed to share post');
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading community...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* New Post Section */}
        <View style={styles.newPostContainer}>
          <Text style={styles.sectionTitle}>Share with Community</Text>
          <TextInput
            style={styles.textInput}
            placeholder="What's on your mind?"
            value={newPost}
            onChangeText={setNewPost}
            multiline
            numberOfLines={3}
          />
          <TouchableOpacity
            style={styles.postButton}
            onPress={handlePostSubmit}
          >
            <Text style={styles.postButtonText}>Share Post</Text>
          </TouchableOpacity>
        </View>

        {/* Posts List */}
        <View style={styles.postsContainer}>
          <Text style={styles.sectionTitle}>Community Feed</Text>
          {posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <View style={styles.authorInfo}>
                  <Text style={styles.authorName}>
                    {post.author.name}
                    {post.author.verified && (
                      <Text style={styles.verifiedBadge}> ✓</Text>
                    )}
                  </Text>
                  <Text style={styles.subscriberCount}>
                    {formatNumber(post.author.subscribers)} subscribers
                  </Text>
                </View>
                <Text style={styles.timestamp}>{post.timestamp}</Text>
              </View>
              
              <Text style={styles.postContent}>{post.content}</Text>
              
              <View style={styles.postActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionText}>
                    {formatNumber(post.likes)} Likes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionText}>
                    {formatNumber(post.replies)} Replies
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    fontSize: 16,
    color: '#64748b',
  },
  scrollView: {
    flex: 1,
  },
  newPostContainer: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#374151',
    backgroundColor: '#f8fafc',
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  postButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  postButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  postsContainer: {
    margin: 16,
    marginTop: 0,
  },
  postCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  verifiedBadge: {
    color: '#3b82f6',
    fontSize: 14,
  },
  subscriberCount: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  timestamp: {
    fontSize: 14,
    color: '#64748b',
  },
  postContent: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  actionText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
});

export default CommunityScreen;
