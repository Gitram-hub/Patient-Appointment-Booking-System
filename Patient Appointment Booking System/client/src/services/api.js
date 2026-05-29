import axios from 'axios';

const normalizeApiBaseUrl = (value) => {
  const baseUrl = (value || 'https://patient-appointment-booking-system-qxvb.onrender.com').replace(/\/$/, '');
  return baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
};

export const api = axios.create({
  baseURL: normalizeApiBaseUrl(import.meta.env.VITE_API_URL),
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('patient-booking-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});