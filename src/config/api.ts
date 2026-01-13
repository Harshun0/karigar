const API_BASE_URL = import.meta.env.PROD 
  ? '' // In production, use relative URLs for Vercel serverless functions
  : 'http://localhost:3001'; // In development, use local backend server

export const API_ENDPOINTS = {
  // Workers
  REGISTER_WORKER: `${API_BASE_URL}/api/workers/register`,
  GET_WORKERS: `${API_BASE_URL}/api/workers`,
  
  // Auth
  REGISTER_USER: `${API_BASE_URL}/api/auth/register`,
  LOGIN_USER: `${API_BASE_URL}/api/auth/login`,
  
  // Bookings
  CREATE_BOOKING: `${API_BASE_URL}/api/bookings/create`,
  GET_BOOKINGS: `${API_BASE_URL}/api/bookings`,
  
  // Health
  HEALTH: `${API_BASE_URL}/api/health`,
};

export default API_BASE_URL;
