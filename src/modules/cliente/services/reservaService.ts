import { FiltrosReserva, Voo, Reserva } from '../models/ReservaTypes';

export const reservaService = {
  async buscarVoos(filtros: FiltrosReserva): Promise<Voo[]> {
    // Implementação real ou mock
    return [];
  },
  
  async reservarVoo(vooId: string): Promise<Reserva> {
    // Implementação real ou mock
    return {} as Reserva;
  },

  async listarReservas(): Promise<Reserva> {
    // Implementação real ou mock
    return {} as Reserva;
  }
};