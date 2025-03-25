import { User } from '../models/AuthTypes';

// Mock data - substitua por chamadas API reais
const mockUser: User = {
  id: '1',
  nome: 'João Silva',
  email: 'joao@example.com'
};

export const authService = {
  async login(email: string, password: string): Promise<User> {
    // Simulação de chamada API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'joao@example.com' && password === 'senha123') {
          localStorage.setItem('token', 'mock-token');
          resolve(mockUser);
        } else {
          reject(new Error('Credenciais inválidas'));
        }
      }, 500);
    });
  },

  async logout(): Promise<void> {
    localStorage.removeItem('token');
    return Promise.resolve();
  },

  async getCurrentUser(): Promise<User> {
    if (localStorage.getItem('token')) {
      return Promise.resolve(mockUser);
    }
    return Promise.reject(new Error('Usuário não autenticado'));
  }
};