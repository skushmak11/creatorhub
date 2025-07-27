export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    tiktok?: string;
  };
  preferences: {
    emailNotifications: boolean;
    darkMode: boolean;
    language: string;
  };
  subscription: {
    plan: 'free' | 'pro' | 'enterprise';
    status: 'active' | 'cancelled' | 'expired';
    expiresAt?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  name: string;
  bio?: string;
  location?: string;
  website?: string;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    tiktok?: string;
  };
}
