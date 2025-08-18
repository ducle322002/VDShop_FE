// Auth Feature Module
export { default as LoginModal } from './LoginModal';
export { default as LoginPage } from './LoginPage';
export { default as RegisterPage } from './RegisterPage';
export { default as ProfilePage } from './ProfilePage';

// Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
