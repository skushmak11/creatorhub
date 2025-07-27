export interface Channel {
  id: string;
  name: string;
  description: string;
  subscriberCount: number;
  videoCount: number;
  totalViews: number;
  thumbnail: string;
  isConnected: boolean;
  createdAt: string;
  lastSyncAt: string;
}

export interface ChannelStats {
  channelId: string;
  views: number;
  subscribers: number;
  videos: number;
  revenue: number;
  engagement: number;
}
