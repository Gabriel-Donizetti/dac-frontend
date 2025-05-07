import { Reserva, FiltroReservas, EstadoReserva } from '../models/ReservaTypes';
import { reservasMock } from '../mocks/reservaMock';


export const reservaService = {
  async getReservas(filtros?: FiltroReservas): Promise<Reserva[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return reservasMock.filter(r => 
      !filtros?.estados || filtros.estados.includes(r.estado)
    );
  },

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
  },

  async atualizarEstadoReserva(id: string, novoEstado: EstadoReserva): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const reserva = reservasMock.find(r => r.id === id);
    if (reserva) reserva.estado = novoEstado;
  }
};