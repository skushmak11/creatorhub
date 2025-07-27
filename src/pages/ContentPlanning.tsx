import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'scheduled' | 'published';
  scheduledDate: string;
  platform: string;
  tags: string[];
  createdAt: string;
}

const ContentPlanning: React.FC = () => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newContent, setNewContent] = useState({
    title: '',
    description: '',
    scheduledDate: '',
    platform: 'youtube',
    tags: ''
  });

  useEffect(() => {
    // Mock data
    const mockContent: ContentItem[] = [
      {
        id: '1',
        title: 'React 18 New Features Tutorial',
        description: 'Comprehensive guide to React 18 features including Suspense, Concurrent Rendering, and more',
        status: 'scheduled',
        scheduledDate: '2024-01-20T10:00:00Z',
        platform: 'YouTube',
        tags: ['react', 'javascript', 'tutorial'],
        createdAt: '2024-01-15T09:00:00Z'
      },
      {
        id: '2',
        title: 'TypeScript Best Practices',
        description: 'Advanced TypeScript patterns and best practices for large applications',
        status: 'draft',
        scheduledDate: '2024-01-25T14:00:00Z',
        platform: 'YouTube',
        tags: ['typescript', 'javascript', 'best-practices'],
        createdAt: '2024-01-16T11:30:00Z'
      },
      {
        id: '3',
        title: 'Building Modern UIs with Tailwind',
        description: 'Create beautiful, responsive interfaces using Tailwind CSS utility classes',
        status: 'published',
        scheduledDate: '2024-01-10T16:00:00Z',
        platform: 'YouTube',
        tags: ['css', 'tailwind', 'ui-design'],
        createdAt: '2024-01-08T13:15:00Z'
      }
    ];
    setContentItems(mockContent);
  }, []);

  const handleCreateContent = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: ContentItem = {
      id: Date.now().toString(),
      title: newContent.title,
      description: newContent.description,
      status: 'draft',
      scheduledDate: newContent.scheduledDate,
      platform: newContent.platform,
      tags: newContent.tags.split(',').map(tag => tag.trim()),
      createdAt: new Date().toISOString()
    };
    
    setContentItems(prev => [newItem, ...prev]);
    setNewContent({
      title: '',
      description: '',
      scheduledDate: '',
      platform: 'youtube',
      tags: ''
    });
    setShowCreateForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'published':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Planning</h1>
          <p className="text-gray-600 mt-1">
            Plan, schedule, and manage your content calendar
          </p>
        </div>
        <Button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Create Content
        </Button>
      </div>

      {/* Create Content Form */}
      {showCreateForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card title="Create New Content">
            <form onSubmit={handleCreateContent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={newContent.title}
                  onChange={(e) => setNewContent(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newContent.description}
                  onChange={(e) => setNewContent(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Scheduled Date
                  </label>
                  <input
                    type="datetime-local"
                    value={newContent.scheduledDate}
                    onChange={(e) => setNewContent(prev => ({ ...prev, scheduledDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform
                  </label>
                  <select
                    value={newContent.platform}
                    onChange={(e) => setNewContent(prev => ({ ...prev, platform: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="youtube">YouTube</option>
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="twitter">Twitter</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={newContent.tags}
                  onChange={(e) => setNewContent(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="react, javascript, tutorial"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex space-x-3">
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Create Content
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}

      {/* Content Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Draft Content */}
        <Card title="Draft Content" className="h-fit">
          <div className="space-y-3">
            {contentItems.filter(item => item.status === 'draft').map(item => (
              <div key={item.id} className="p-3 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                  <span className="text-xs text-gray-500">{item.platform}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Scheduled Content */}
        <Card title="Scheduled Content" className="h-fit">
          <div className="space-y-3">
            {contentItems.filter(item => item.status === 'scheduled').map(item => (
              <div key={item.id} className="p-3 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                <p className="text-xs text-blue-600 mt-1">
                  Scheduled: {formatDate(item.scheduledDate)}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                  <span className="text-xs text-gray-500">{item.platform}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Published Content */}
        <Card title="Published Content" className="h-fit">
          <div className="space-y-3">
            {contentItems.filter(item => item.status === 'published').map(item => (
              <div key={item.id} className="p-3 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                <p className="text-xs text-green-600 mt-1">
                  Published: {formatDate(item.scheduledDate)}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                  <span className="text-xs text-gray-500">{item.platform}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Content Ideas */}
      <Card title="Content Ideas & Inspiration">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900">Trending Topics</h4>
            <ul className="mt-2 space-y-1 text-sm text-blue-700">
              <li>• AI and Machine Learning</li>
              <li>• Web3 and Blockchain</li>
              <li>• Remote Work Tools</li>
              <li>• Sustainable Technology</li>
            </ul>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900">Content Types</h4>
            <ul className="mt-2 space-y-1 text-sm text-green-700">
              <li>• Tutorial Videos</li>
              <li>• Behind the Scenes</li>
              <li>• Q&A Sessions</li>
              <li>• Product Reviews</li>
            </ul>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-900">Engagement Ideas</h4>
            <ul className="mt-2 space-y-1 text-sm text-purple-700">
              <li>• Live Streams</li>
              <li>• Community Polls</li>
              <li>• Collaborations</li>
              <li>• User-Generated Content</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ContentPlanning;
