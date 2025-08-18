// API service for making HTTP requests to Spring Boot backend

const API_BASE_URL = 'http://localhost:8080/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (response.ok) {
    return await response.json();
  } else {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
};

// API service object
export const apiService = {
  // Login user
  login: async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      return await handleResponse(response);
    } catch (error) {
      console.error('Login API error:', error);
      throw error;
    }
  },

  // Test API connection
  testConnection: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/test`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Test connection error:', error);
      throw error;
    }
  },

  // Make authenticated request
  authenticatedRequest: async (endpoint, options = {}) => {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      return await handleResponse(response);
    } catch (error) {
      console.error('Authenticated request error:', error);
      throw error;
    }
  },

  // Get user profile (example of authenticated request)
  getUserProfile: async () => {
    return await apiService.authenticatedRequest('/user/profile');
  },
};

export default apiService;
