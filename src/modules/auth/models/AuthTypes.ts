export interface LoginFormData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  nome: string;
  email: string;
  role: 'client' | 'employee';
}

export interface AuthResponse {
  token: string;
  user: User;
}