import api from './api';
import { User, LoginCredentials } from '../features/auth';

class AuthService {
  private readonly baseUrl = '/auth';

  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    try {
      const response = await api.post(`${this.baseUrl}/login`, credentials);
      return response.data;
    } catch (error) {
      throw new Error('Đăng nhập thất bại');
    }
  }

  async register(userData: Partial<User> & { password: string }): Promise<{ user: User; token: string }> {
    try {
      const response = await api.post(`${this.baseUrl}/register`, userData);
      return response.data;
    } catch (error) {
      throw new Error('Đăng ký thất bại');
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post(`${this.baseUrl}/logout`);
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get(`${this.baseUrl}/me`);
      return response.data;
    } catch (error) {
      throw new Error('Không thể lấy thông tin người dùng');
    }
  }

  async updateProfile(userData: Partial<User>): Promise<User> {
    try {
      const response = await api.put(`${this.baseUrl}/profile`, userData);
      return response.data;
    } catch (error) {
      throw new Error('Cập nhật thông tin thất bại');
    }
  }

  async changePassword(passwordData: { currentPassword: string; newPassword: string }): Promise<void> {
    try {
      await api.put(`${this.baseUrl}/change-password`, passwordData);
    } catch (error) {
      throw new Error('Đổi mật khẩu thất bại');
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      await api.post(`${this.baseUrl}/forgot-password`, { email });
    } catch (error) {
      throw new Error('Gửi email khôi phục mật khẩu thất bại');
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await api.post(`${this.baseUrl}/reset-password`, { token, newPassword });
    } catch (error) {
      throw new Error('Đặt lại mật khẩu thất bại');
    }
  }

  // Helper methods
  setToken(token: string): void {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export default new AuthService();
