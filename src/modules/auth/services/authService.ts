// modules/auth/services/authService.ts
import { AuthResponse, LoginFormData, User } from '../models/AuthTypes';

// Mock de banco de dados em memória
const mockDatabase: { [email: string]: User & { password: string } } = {
  "cliente@example.com": {
    id: "user-123",
    nome: "João Silva",
    email: "cliente@example.com",
    role: "client",
    password: "senha123"
  },
  "funcionario@empresa.com": {
    id: "user-456",
    nome: "Maria Souza",
    email: "funcionario@empresa.com",
    role: "employee",
    password: "senha456"
  }
};

export const authService = {
  async login(formData: LoginFormData): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));

    // Validação
    if (!formData.email || !formData.password) {
      throw new Error('Email e senha são obrigatórios');
    }

    const user = mockDatabase[formData.email];
    
    if (!user || user.password !== formData.password) {
      throw new Error('Credenciais inválidas');
    }

    // Gera token mockado consistente
    const token = `mock-token-${user.id}`;
    localStorage.setItem('token', token); // Persiste o token

    return {
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: user.role
      }
    };
  },

  async getCurrentUser(): Promise<User> {
    const token = localStorage.getItem('token');
    console.log(token)
    
    if (!token) {
      throw new Error('Não autenticado');
    }

    // Extrai ID do token mockado
    const userId = token.replace('mock-token-', '');
    const user = Object.values(mockDatabase).find(u => u.id === userId);

    if (!user) {
      localStorage.removeItem('token'); // Limpa token inválido
      throw new Error('Usuário não encontrado');
    }

    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      role: user.role
    };
  },

  async logout(): Promise<void> {
    localStorage.removeItem('token');
  }
};