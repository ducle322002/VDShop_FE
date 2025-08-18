// App Configuration
export const APP_CONFIG = {
  name: 'VDShop',
  version: '1.0.0',
  api: {
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
    timeout: 10000,
  },
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 20, 50],
  },
  theme: {
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    errorColor: '#EF4444',
    warningColor: '#F59E0B',
  },
};

// Environment Configuration
export const ENV_CONFIG = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
};

// Feature Flags
export const FEATURE_FLAGS = {
  enableCart: true,
  enableOrders: true,
  enableUserProfile: true,
  enableSearch: true,
};
