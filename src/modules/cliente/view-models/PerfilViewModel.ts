import { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { User } from '../models/AuthTypes';

export function usePerfilViewModel() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      setError('');
      
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (err) {
        setError('Failed to load profile');
        console.error('Profile load error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  return {
    user,
    loading,
    error,
    // Adicione outras funções se necessário
  };
}