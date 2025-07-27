import { Channel } from '../types/Channel';

export const mockChannels: Channel[] = [
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
