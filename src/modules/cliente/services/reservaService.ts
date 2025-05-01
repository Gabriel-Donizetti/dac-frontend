import { Reserva, FiltroReservas } from '../models/ReservaTypes';
import { reservasMock } from '../mocks/reservaMock';


export const reservaService = {
  async getReservas(clienteId: string, filtros?: FiltroReservas): Promise<Reserva[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return reservasMock.filter(r => 
      !filtros?.estados || filtros.estados.includes(r.estado)
    );
  },

  //Exemplo quando o back estiver pronto
  // async getReservas(clienteId: string, filtros?: FiltroReservas): Promise<Reserva[]> {
  //   const response = await api.get(`/clientes/${clienteId}/reservas`, { 
  //     params: filtros 
  //   });
  //   return response.data;
  // },

  async getReservaDetalhes(reservaId: string): Promise<Reserva> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const reserva = reservasMock.find(r => r.id === reservaId);
    if (!reserva) throw new Error('Reserva não encontrada');
    return reserva;
  },

  async cancelarReserva(reservaId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const reserva = reservasMock.find(r => r.id === reservaId);
    if (reserva) reserva.estado = 'CANCELADA';
  }
};