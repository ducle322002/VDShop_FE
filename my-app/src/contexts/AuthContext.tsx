import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { apiService } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
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
      await apiService.testConnection();
      return true;
    } catch (error) {
      console.error('Backend connection test failed:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log('Attempting login with:', { email, password });
      
      const data = await apiService.login(email, password);
      console.log('Login response:', data);

      if (data.success) {
        const userData: User = {
          id: data.data.userId,
          name: data.data.username,
          email: data.data.username,
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
