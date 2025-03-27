import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LoginFormValues } from '../models/AuthTypes';

export function useLoginViewModel() {
  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login(formValues.email, formValues.password);
    } catch (err) {
      setError('Credenciais inválidas. Por favor, tente novamente.');
      setLoading(false);
    }
  };

  return {
    formValues,
    error,
    loading,
    handleInputChange,
    handleSubmit
  };
}