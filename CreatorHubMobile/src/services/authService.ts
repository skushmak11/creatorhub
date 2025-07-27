import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      // Mock authentication - in real app, this would be an API call
      if (credentials.email === 'demo@creatorhub.com' && credentials.password === 'password123') {
        const user: User = {
          id: '1',
          name: 'Demo User',
          email: credentials.email,
          avatar: 'https://via.placeholder.com/40'
        };
        
        await AsyncStorage.setItem('auth_token', 'mock_token_123');
        await AsyncStorage.setItem('auth_user', JSON.stringify(user));
        
        return user;
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(data: RegisterData): Promise<User> {
    try {
      // Mock registration - in real app, this would be an API call
      const user: User = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        avatar: 'https://via.placeholder.com/40'
      };

      await AsyncStorage.setItem('auth_token', `mock_token_${user.id}`);
      await AsyncStorage.setItem('auth_user', JSON.stringify(user));

      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed. Please try again.');
    }
  }

  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('auth_user');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const userStr = await AsyncStorage.getItem('auth_user');
      
      if (token && userStr) {
        return JSON.parse(userStr);
      }
      
      return null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  async initiatePasswordReset(email: string): Promise<void> {
    try {
      // Mock password reset - in real app, this would send an email
      console.log('Password reset initiated for:', email);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Password reset error:', error);
      throw new Error('Failed to send password reset email');
    }
  }

  async resetPassword(token: string, password: string): Promise<void> {
    try {
      // Mock password reset - in real app, this would validate token and update password
      console.log('Password reset for token:', token);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Password reset error:', error);
      throw new Error('Failed to reset password');
    }
  }
}

export const authService = new AuthService();
