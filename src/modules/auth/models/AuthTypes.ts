import { Cliente } from "../../cliente/models/ClienteTypes";
import { Funcionario } from "../../funcionario/models/FuncionarioTypes";

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

export type AuthUser = User | Cliente | Funcionario;

export interface AuthResponse {
  token: string;
  user: AuthUser;
}