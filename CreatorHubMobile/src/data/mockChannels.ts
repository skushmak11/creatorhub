export interface Channel {
  id: string;
  name: string;
  description: string;
  subscribers: number;
  videos: number;
  views: number;
  avatar: string;
  verified: boolean;
}

export const mockChannels: Channel[] = [
  {
    id: '1',
    name: 'Tech Reviews Pro',
    description: 'Latest tech reviews and unboxings',
    subscribers: 125000,
    videos: 89,
    views: 2500000,
    avatar: 'https://via.placeholder.com/60',
    verified: true,
  },
  {
    id: '2',
    name: 'Creative Cooking',
    description: 'Delicious recipes and cooking tips',
    subscribers: 89000,
    videos: 156,
    views: 1800000,
    avatar: 'https://via.placeholder.com/60',
    verified: false,
  },
  {
    id: '3',
    name: 'Fitness Journey',
    description: 'Workout routines and health tips',
    subscribers: 67000,
    videos: 203,
    views: 1200000,
    avatar: 'https://via.placeholder.com/60',
    verified: true,
  },
];

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};
