import { mockDatabase, MockUser } from "../../auth/mocks/mockDatabase";
import { Cliente } from "../models/ClienteTypes";

export const clienteService = {
  async getSaldoMilhas(clienteId: string): Promise<number> {
    console.log(clienteId)
    return 3000;
  },

  async restituirMilhas() {},

  async debitarMilhas() {},

  async cadastrar(cliente: Cliente & { password: string }) {
    const novoCliente: MockUser = {
      id: `user-${Date.now()}`,
      nome: cliente.nome,
      email: cliente.email,
      role: "client",
      password: cliente.password,
      cpf: cliente.cpf,
      cep: cliente.cep,
      endereco: cliente.endereco,
      cidade: cliente.cidade,
      estado: cliente.estado,
      saldoMilhas: cliente.saldoMilhas || 0
    };

    mockDatabase[cliente.email] = novoCliente;
    
    console.log('Cliente cadastrado:', novoCliente);
    console.log('Database atual:', mockDatabase);

    return novoCliente;
  },
};
;
