import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';

interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
    subscribers: number;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  tags: string[];
  isLiked: boolean;
}

interface Creator {
  id: string;
  name: string;
  avatar: string;
  subscribers: number;
  category: string;
  isFollowing: boolean;
  verified: boolean;
}

const Community: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [creators, setCreators] = useState<Creator[]>([]);
  const [newPost, setNewPost] = useState('');
  const [activeTab, setActiveTab] = useState<'feed' | 'creators' | 'discussions'>('feed');

  useEffect(() => {
    // Mock community posts
    const mockPosts: CommunityPost[] = [
      {
        id: '1',
        author: {
          name: 'Tech Reviewer Pro',
          avatar: 'https://via.placeholder.com/40x40/4F46E5/FFFFFF?text=TR',
          verified: true,
          subscribers: 125000
        },
        content: 'Just hit 125K subscribers! 🎉 Thank you all for the amazing support. Working on some exciting new content about AI tools for creators. What would you like to see next?',
        timestamp: '2024-01-15T10:30:00Z',
        likes: 234,
        comments: 45,
        shares: 12,
        tags: ['milestone', 'ai', 'creators'],
        isLiked: false
      },
      {
        id: '2',
        author: {
          name: 'Creative Cooking',
          avatar: 'https://via.placeholder.com/40x40/EF4444/FFFFFF?text=CC',
          verified: true,
          subscribers: 89000
        },
        content: 'New recipe video is live! 🍝 Italian Carbonara with a twist. The secret ingredient will surprise you. Link in bio!',
        timestamp: '2024-01-15T08:15:00Z',
        likes: 156,
        comments: 28,
        shares: 8,
        tags: ['recipe', 'italian', 'cooking'],
        isLiked: true
      },
      {
        id: '3',
        author: {
          name: 'Fitness Journey',
          avatar: 'https://via.placeholder.com/40x40/10B981/FFFFFF?text=FJ',
          verified: false,
          subscribers: 67000
        },
        content: 'Morning workout complete! 💪 Remember, consistency beats perfection. Even 15 minutes of movement is better than nothing. What\'s your favorite quick workout?',
        timestamp: '2024-01-15T06:45:00Z',
        likes: 89,
        comments: 15,
        shares: 5,
        tags: ['fitness', 'motivation', 'workout'],
        isLiked: false
      }
    ];

    const mockCreators: Creator[] = [
      {
        id: '1',
        name: 'Design Master',
        avatar: 'https://via.placeholder.com/50x50/8B5CF6/FFFFFF?text=DM',
        subscribers: 234000,
        category: 'Design',
        isFollowing: false,
        verified: true
      },
      {
        id: '2',
        name: 'Code Wizard',
        avatar: 'https://via.placeholder.com/50x50/F59E0B/FFFFFF?text=CW',
        subscribers: 189000,
        category: 'Programming',
        isFollowing: true,
        verified: true
      },
      {
        id: '3',
        name: 'Music Producer',
        avatar: 'https://via.placeholder.com/50x50/EF4444/FFFFFF?text=MP',
        subscribers: 156000,
        category: 'Music',
        isFollowing: false,
        verified: false
      },
      {
        id: '4',
        name: 'Travel Vlogger',
        avatar: 'https://via.placeholder.com/50x50/06B6D4/FFFFFF?text=TV',
        subscribers: 298000,
        category: 'Travel',
        isFollowing: true,
        verified: true
      }
    ];

    setPosts(mockPosts);
    setCreators(mockCreators);
  }, []);

  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleFollowCreator = (creatorId: string) => {
    setCreators(prev => prev.map(creator =>
      creator.id === creatorId
        ? { ...creator, isFollowing: !creator.isFollowing }
        : creator
    ));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post: CommunityPost = {
      id: Date.now().toString(),
      author: {
        name: user?.name || 'You',
        avatar: user?.avatar || 'https://via.placeholder.com/40x40/4F46E5/FFFFFF?text=U',
        verified: false,
        subscribers: 0
      },
      content: newPost,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      tags: [],
      isLiked: false
    };

    setPosts(prev => [post, ...prev]);
    setNewPost('');
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Community Hub</h1>
        <p className="text-gray-600 mt-1">
          Connect with fellow creators, share insights, and grow together
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'feed', label: 'Feed', icon: '📰' },
            { id: 'creators', label: 'Creators', icon: '👥' },
            { id: 'discussions', label: 'Discussions', icon: '💬' }
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

      {/* Feed Tab */}
      {activeTab === 'feed' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <Card>
              <form onSubmit={handleCreatePost} className="space-y-4">
                <div className="flex items-start space-x-3">
                  <img
                    src={user?.avatar || 'https://via.placeholder.com/40x40/4F46E5/FFFFFF?text=U'}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder="Share something with the community..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={!newPost.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Share Post
                  </Button>
                </div>
              </form>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-4">
              {posts.map(post => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <div className="flex items-start space-x-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">{post.author.name}</h4>
                          {post.author.verified && (
                            <span className="text-blue-500">✓</span>
                          )}
                          <span className="text-sm text-gray-500">
                            {formatNumber(post.author.subscribers)} subscribers
                          </span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">
                            {formatTimeAgo(post.timestamp)}
                          </span>
                        </div>
                        
                        <p className="mt-2 text-gray-800">{post.content}</p>
                        
                        {post.tags.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {post.tags.map(tag => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="mt-4 flex items-center space-x-6">
                          <button
                            onClick={() => handleLikePost(post.id)}
                            className={`flex items-center space-x-1 text-sm ${
                              post.isLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                            }`}
                          >
                            <span>{post.isLiked ? '❤️' : '🤍'}</span>
                            <span>{post.likes}</span>
                          </button>
                          
                          <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600">
                            <span>💬</span>
                            <span>{post.comments}</span>
                          </button>
                          
                          <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-green-600">
                            <span>🔄</span>
                            <span>{post.shares}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card title="Trending Topics">
              <div className="space-y-2">
                {['#CreatorTips', '#YouTubeGrowth', '#ContentStrategy', '#VideoEditing', '#Analytics'].map(topic => (
                  <div key={topic} className="flex items-center justify-between">
                    <span className="text-blue-600 hover:text-blue-800 cursor-pointer">{topic}</span>
                    <span className="text-xs text-gray-500">1.2K posts</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Community Stats">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Creators</span>
                  <span className="font-semibold">2,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posts Today</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Discussions</span>
                  <span className="font-semibold">12,394</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Creators Tab */}
      {activeTab === 'creators' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map(creator => (
            <Card key={creator.id}>
              <div className="text-center">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                />
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <h3 className="font-semibold text-gray-900">{creator.name}</h3>
                  {creator.verified && <span className="text-blue-500">✓</span>}
                </div>
                <p className="text-sm text-gray-600 mb-2">{creator.category}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {formatNumber(creator.subscribers)} subscribers
                </p>
                <Button
                  onClick={() => handleFollowCreator(creator.id)}
                  className={creator.isFollowing 
                    ? "bg-gray-200 text-gray-800 hover:bg-gray-300" 
                    : "bg-blue-600 hover:bg-blue-700"
                  }
                  size="sm"
                >
                  {creator.isFollowing ? 'Following' : 'Follow'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Discussions Tab */}
      {activeTab === 'discussions' && (
        <Card>
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">💬</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Discussion Forums Coming Soon
            </h3>
            <p className="text-gray-600 mb-4">
              We're building dedicated discussion forums for different creator topics
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Get Notified
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Community;
