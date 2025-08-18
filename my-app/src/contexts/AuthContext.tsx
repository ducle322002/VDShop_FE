import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import axios from 'axios';

// Create axios instance directly
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loading: boolean;
  testConnection: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);


  const testConnection = async (): Promise<boolean> => {
    try {
      // Test connection by making a simple GET request
      await api.get('/health');
      return true;
    } catch (error) {
      console.error('Backend connection test failed:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log('Attempting login with:', { email, password });
      
      const response = await api.post('/auth/login', { email, password });
      const data = response.data;
      console.log('Login response:', data);

      if (data.success) {
        const userData: User = {
          id: data.data.userId,
          username: data.data.username,
          firstName: data.data.firstName || data.data.username,
          lastName: data.data.lastName || '',
          email: data.data.email || data.data.username,
          role: data.data.roles?.[0] || 'user',
          token: data.data.token
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', data.data.token);
        
        return { success: true };
      } else {
        const errorMessage = data.message || 'Đăng nhập thất bại';
        console.error('Login failed:', errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Lỗi kết nối. Vui lòng kiểm tra backend.';
      return { success: false, error: errorMessage };
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // For now, we'll simulate registration since the backend doesn't have this endpoint yet
      console.log('Registration not implemented in backend yet');
      return { success: false, error: 'Chức năng đăng ký chưa được hỗ trợ' };
    } catch (error) {
      return { success: false, error: 'Đăng ký thất bại' };
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    register,
    loading,
    testConnection
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
