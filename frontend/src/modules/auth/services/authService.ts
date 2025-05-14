// modules/auth/services/authService.ts
import { AuthResponse, AuthUser, LoginFormData } from '../models/AuthTypes';
import { mockDatabase } from '../mocks/mockDatabase';


export const authService = {
  async login(formData: LoginFormData): Promise<AuthResponse> {

    if (!formData.email || !formData.password) {
      throw new Error('Email e senha são obrigatórios');
    }

    const user = mockDatabase[formData.email];
    
    if (!user || user.password !== formData.password) {
      throw new Error('Credenciais inválidas');
    }

    const token = `mock-token-${user.id}`;
    localStorage.setItem('token', token);

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

  async generatePassword(): Promise<string>{
    return Math.floor(1000 + Math.random() * 9000).toString();
  },

  async sendEmailPassword(password: string){
    // const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    // const data = await response.json();
  },
  async logout(): Promise<void> {
    localStorage.removeItem('token');
  }
};