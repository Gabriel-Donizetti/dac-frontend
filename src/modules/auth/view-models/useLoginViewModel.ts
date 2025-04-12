import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuth } from '../../../shared/contexts/AuthContext';
import { LoginFormData } from '../models/AuthTypes';

// modules/auth/view-models/useLoginViewModel.ts
export function useLoginViewModel() {
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (formData: LoginFormData) => {
    setLoading(true);
    setError('');

    try {
      const { token, user } = await authService.login(formData);
      await authLogin(user, token); // Espera a atualização do contexto
      navigate(user.role === 'client' ? '/cliente/initial-page' : '/funcionario/painel');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro no login');
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, handleLogin };
}