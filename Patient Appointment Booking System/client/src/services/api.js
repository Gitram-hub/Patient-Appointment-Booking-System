import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://patient-appointment-booking-system-qxvb.onrender.com/api',
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('patient-booking-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});