import { User } from '../types/Auth';
import { emailService } from './emailService';

// Mock user database
const mockUsers: Array<User & { password: string }> = [
  {
    id: '1',
    email: 'demo@creatorhub.com',
    name: 'Demo User',
    password: 'password123',
    avatar: 'https://via.placeholder.com/150x150/4F46E5/FFFFFF?text=DU',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

// Mock reset tokens
const resetTokens = new Map<string, { email: string; expiresAt: number }>();

export const authService = {
  async login(email: string, password: string): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = user;
    
    // Store user in localStorage for persistence
    localStorage.setItem('auth_user', JSON.stringify(userWithoutPassword));
    localStorage.setItem('auth_token', 'mock_jwt_token_' + user.id);

    return userWithoutPassword;
  },

  async register(name: string, email: string, password: string): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    if (mockUsers.find(u => u.email === email)) {
      throw new Error('User with this email already exists');
    }

    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      email,
      name,
      password,
      avatar: `https://via.placeholder.com/150x150/4F46E5/FFFFFF?text=${name.charAt(0).toUpperCase()}`,
      createdAt: new Date().toISOString()
    };

    mockUsers.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;

    // Store user in localStorage
    localStorage.setItem('auth_user', JSON.stringify(userWithoutPassword));
    localStorage.setItem('auth_token', 'mock_jwt_token_' + newUser.id);

    // Send welcome email
    try {
      await emailService.sendWelcomeEmail(email, name);
    } catch (error) {
      console.error('Failed to send welcome email:', error);
    }

    return userWithoutPassword;
  },

  async initiatePasswordReset(email: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      // Don't reveal if email exists or not for security
      return;
    }

    // Generate reset token
    const resetToken = 'reset_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    const expiresAt = Date.now() + (60 * 60 * 1000); // 1 hour

    resetTokens.set(resetToken, { email, expiresAt });

    // Send password reset email
    try {
      await emailService.sendPasswordResetEmail(email, resetToken);
    } catch (error) {
      console.error('Failed to send password reset email:', error);
      throw new Error('Failed to send password reset email');
    }
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const tokenData = resetTokens.get(token);
    if (!tokenData || tokenData.expiresAt < Date.now()) {
      throw new Error('Invalid or expired reset token');
    }

    const user = mockUsers.find(u => u.email === tokenData.email);
    if (!user) {
      throw new Error('User not found');
    }

    // Update password
    user.password = newPassword;

    // Remove used token
    resetTokens.delete(token);
  },

  async getCurrentUser(): Promise<User | null> {
    const userStr = localStorage.getItem('auth_user');
    const token = localStorage.getItem('auth_token');

    if (!userStr || !token) {
      return null;
    }

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  async logout(): Promise<void> {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
  },

  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    return !!token;
  }
};
