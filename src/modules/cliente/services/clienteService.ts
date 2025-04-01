// import api from '../../../services/api';
// import { Cliente } from '../models/ClienteTypes';

// export const clienteService = {
//   async getSaldoMilhas(clienteId: string): Promise<number> {
//     const response = await api.get(`/clientes/${clienteId}/milhas`);
//     return response.data.saldo;
//   }
// };

export const clienteService = {
  async getSaldoMilhas(clienteId: string): Promise<number> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return 2000; // Saldo mockado
  }
};