import { User } from "../../auth/models/AuthTypes";

export interface Funcionario extends User {
  cpf: string;
  telefone: string;
}