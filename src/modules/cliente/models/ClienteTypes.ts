import { User } from "../../auth/models/AuthTypes";

export interface Cliente extends User {
  cpf: string;
  cep: string;
  endereco: string;
  cidade: string;
  estado: string;
  saldoMilhas: number;
}