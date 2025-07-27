export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  views: number;
  likes: number;
  comments: number;
  publishedAt: string;
  status: 'draft' | 'published' | 'private' | 'unlisted' | 'scheduled';
  channelId: string;
  tags: string[];
  category: string;
}

export interface VideoUpload {
  file: File;
  title: string;
  description: string;
  tags: string[];
  category: string;
  privacy: 'public' | 'private' | 'unlisted';
}

export interface VideoAnalytics {
  videoId: string;
  views: number;
  watchTime: number;
  engagement: number;
  revenue: number;
  date: string;
}
