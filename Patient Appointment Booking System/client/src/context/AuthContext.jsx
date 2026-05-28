import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('patient-booking-token'));
  const [loading, setLoading] = useState(true);

  const persistSession = (sessionToken, nextUser) => {
    localStorage.setItem('patient-booking-token', sessionToken);
    setToken(sessionToken);
    setUser(nextUser);
  };

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    persistSession(data.token, data.user);
    toast.success('Logged in successfully');
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    persistSession(data.token, data.user);
    toast.success('Account created');
  };

  const logout = () => {
    localStorage.removeItem('patient-booking-token');
    setToken(null);
    setUser(null);
    toast.success('Logged out');
  };

  const refreshUser = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get('/auth/me');
      setUser(data.user);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return <AuthContext.Provider value={{ user, token, loading, login, register, logout, refreshUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};