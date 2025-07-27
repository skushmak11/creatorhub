import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';
import { youtubeService } from '../services/youtubeService';
import { Video } from '../types/Video';

const Videos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft' | 'scheduled'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'views' | 'likes'>('newest');

  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    tags: '',
    category: 'Education',
    thumbnail: null as File | null
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      // Mock video data since we don't have a specific channel ID
      const mockVideos: Video[] = [
        {
          id: '1',
          title: 'Getting Started with React 18 - Complete Tutorial',
          description: 'Learn the fundamentals of React 18 including new features like Suspense, Concurrent Rendering, and Automatic Batching. Perfect for beginners and intermediate developers.',
          thumbnail: 'https://via.placeholder.com/320x180/4F46E5/FFFFFF?text=React+18',
          duration: 1245,
          views: 15420,
          likes: 892,
          comments: 156,
          publishedAt: '2024-01-10T10:00:00Z',
          status: 'published',
          channelId: '1',
          tags: ['react', 'javascript', 'tutorial', 'web-development'],
          category: 'Education'
        },
        {
          id: '2',
          title: 'Advanced TypeScript Tips and Tricks',
          description: 'Discover advanced TypeScript patterns, utility types, and best practices that will make you a more productive developer.',
          thumbnail: 'https://via.placeholder.com/320x180/3B82F6/FFFFFF?text=TypeScript',
          duration: 892,
          views: 8750,
          likes: 445,
          comments: 89,
          publishedAt: '2024-01-08T14:30:00Z',
          status: 'published',
          channelId: '1',
          tags: ['typescript', 'javascript', 'programming', 'tips'],
          category: 'Education'
        },
        {
          id: '3',
          title: 'Building Modern UIs with Tailwind CSS',
          description: 'Create beautiful, responsive interfaces using Tailwind CSS utility classes. Learn component patterns and best practices.',
          thumbnail: 'https://via.placeholder.com/320x180/06B6D4/FFFFFF?text=Tailwind',
          duration: 1567,
          views: 12300,
          likes: 678,
          comments: 123,
          publishedAt: '2024-01-05T09:15:00Z',
          status: 'published',
          channelId: '1',
          tags: ['css', 'tailwind', 'design', 'ui'],
          category: 'Education'
        },
        {
          id: '4',
          title: 'Next.js 14 App Router Deep Dive',
          description: 'Explore the new App Router in Next.js 14, including server components, streaming, and advanced routing patterns.',
          thumbnail: 'https://via.placeholder.com/320x180/000000/FFFFFF?text=Next.js',
          duration: 2134,
          views: 0,
          likes: 0,
          comments: 0,
          publishedAt: '2024-01-20T16:00:00Z',
          status: 'scheduled',
          channelId: '1',
          tags: ['nextjs', 'react', 'app-router', 'server-components'],
          category: 'Education'
        },
        {
          id: '5',
          title: 'JavaScript Performance Optimization',
          description: 'Learn how to optimize JavaScript performance with practical examples and real-world scenarios.',
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
      console.error('Failed to fetch videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadVideo = (e: React.FormEvent) => {
    e.preventDefault();
    
    const video: Video = {
      id: Date.now().toString(),
      title: newVideo.title,
      description: newVideo.description,
      thumbnail: 'https://via.placeholder.com/320x180/6B7280/FFFFFF?text=New+Video',
      duration: 0,
      views: 0,
      likes: 0,
      comments: 0,
      publishedAt: '',
      status: 'draft',
      channelId: '1',
      tags: newVideo.tags.split(',').map(tag => tag.trim()),
      category: newVideo.category
    };

    setVideos(prev => [video, ...prev]);
    setNewVideo({
      title: '',
      description: '',
      tags: '',
      category: 'Education',
      thumbnail: null
    });
    setShowUploadForm(false);
  };

  const filteredVideos = videos.filter(video => {
    if (filterStatus === 'all') return true;
    return video.status === filterStatus;
  });

  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime();
      case 'oldest':
        return new Date(a.publishedAt || '').getTime() - new Date(b.publishedAt || '').getTime();
      case 'views':
        return b.views - a.views;
      case 'likes':
        return b.likes - a.likes;
      default:
        return 0;
    }
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
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
          <h1 className="text-2xl font-bold text-gray-900">Video Management</h1>
          <p className="text-gray-600 mt-1">
            Upload, edit, and manage your video content
          </p>
        </div>
        <Button
          onClick={() => setShowUploadForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Upload Video
        </Button>
      </div>

      {/* Upload Video Form */}
      {showUploadForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card title="Upload New Video">
            <form onSubmit={handleUploadVideo} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Title
                </label>
                <input
                  type="text"
                  value={newVideo.title}
                  onChange={(e) => setNewVideo(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newVideo.description}
                  onChange={(e) => setNewVideo(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newVideo.category}
                    onChange={(e) => setNewVideo(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Education">Education</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Music">Music</option>
                    <option value="News">News</option>
                    <option value="Sports">Sports</option>
                    <option value="Technology">Technology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newVideo.tags}
                    onChange={(e) => setNewVideo(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="react, javascript, tutorial"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="space-y-2">
                    <div className="text-4xl">📹</div>
                    <div>
                      <p className="text-sm text-gray-600">
                        Drag and drop your video file here, or click to browse
                      </p>
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        id="video-upload"
                      />
                      <label
                        htmlFor="video-upload"
                        className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                      >
                        Choose File
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Upload Video
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}

      {/* Filters and Sorting */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Videos</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="views">Most Views</option>
                <option value="likes">Most Likes</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            {sortedVideos.length} video{sortedVideos.length !== 1 ? 's' : ''}
          </div>
        </div>
      </Card>

      {/* Videos Grid */}
      {sortedVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedVideos.map(video => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedVideo(video)}
              className="cursor-pointer"
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(video.duration)}
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(video.status)}`}>
                      {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {video.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{formatDate(video.publishedAt)}</span>
                    <span>{video.category}</span>
                  </div>

                  {video.status === 'published' && (
                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      <div>
                        <p className="font-semibold text-gray-900">{formatNumber(video.views)}</p>
                        <p className="text-gray-500">Views</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{formatNumber(video.likes)}</p>
                        <p className="text-gray-500">Likes</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{formatNumber(video.comments)}</p>
                        <p className="text-gray-500">Comments</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-3 flex flex-wrap gap-1">
                    {video.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                    {video.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        +{video.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card>
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">📹</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No videos found
            </h3>
            <p className="text-gray-600 mb-4">
              {filterStatus === 'all' 
                ? "Upload your first video to get started"
                : `No ${filterStatus} videos found`
              }
            </p>
            <Button
              onClick={() => setShowUploadForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Upload Video
            </Button>
          </div>
        </Card>
      )}

      {/* Video Detail Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Video Details</h2>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <img
                src={selectedVideo.thumbnail}
                alt={selectedVideo.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {selectedVideo.title}
              </h3>

              <p className="text-gray-600 mb-4">
                {selectedVideo.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedVideo.status)}`}>
                    {selectedVideo.status.charAt(0).toUpperCase() + selectedVideo.status.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium">{selectedVideo.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{formatDuration(selectedVideo.duration)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Published</p>
                  <p className="font-medium">{formatDate(selectedVideo.publishedAt)}</p>
                </div>
              </div>

              {selectedVideo.status === 'published' && (
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{formatNumber(selectedVideo.views)}</p>
                    <p className="text-sm text-gray-500">Views</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{formatNumber(selectedVideo.likes)}</p>
                    <p className="text-sm text-gray-500">Likes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{formatNumber(selectedVideo.comments)}</p>
                    <p className="text-sm text-gray-500">Comments</p>
                  </div>
                </div>
              )}

              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {selectedVideo.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Edit Video
                </Button>
                <Button variant="outline">
                  View Analytics
                </Button>
                <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;
