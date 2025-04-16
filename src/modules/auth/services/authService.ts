// modules/auth/services/authService.ts
// modules/auth/services/authService.ts
import { Cliente } from '../../cliente/models/ClienteTypes';
import { Funcionario } from '../../funcionario/models/FuncionarioTypes';
import { AuthResponse, AuthUser, LoginFormData } from '../models/AuthTypes';

// Defina um tipo para o mock database
type MockUser = (Cliente | Funcionario) & { password: string };

const mockDatabase: Record<string, MockUser> = {
  "cliente@example.com": {
    id: "user-123",
    nome: "João Silva",
    email: "cliente@example.com",
    role: "client",
    password: "senha123",
    cpf: "123.456.789-00",
    cep: "80000-000",
    endereco: "Rua Exemplo, 123",
    cidade: "Curitiba",
    estado: "PR",
    saldoMilhas: 11000
  },
  "funcionario@empresa.com": {
    id: "user-456",
    nome: "Maria Souza",
    email: "funcionario@empresa.com",
    role: "employee",
    password: "senha456",
    cpf: "123.456.789-00",
    telefone: "11111111"
  }
};

export const authService = {
  async login(formData: LoginFormData): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!formData.email || !formData.password) {
      throw new Error('Email e senha são obrigatórios');
    }

    const user = mockDatabase[formData.email];
    
    if (!user || user.password !== formData.password) {
      throw new Error('Credenciais inválidas');
    }

    const token = `mock-token-${user.id}`;
    localStorage.setItem('token', token);

    // Remove a senha antes de retornar
    const { password, ...userWithoutPassword } = user;

    return {
      token,
      user: userWithoutPassword
    };
  },

  async getCurrentUser(): Promise<AuthUser> {
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






