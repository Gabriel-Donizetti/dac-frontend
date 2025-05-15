import { Reserva, EstadoReserva } from '../models/ReservaTypes';
import { reservasMock } from '../mocks/reservaMock';
import { vooService } from './vooService';

export const reservaService = {
  async getReservas(clienteId: string, filtros?: any): Promise<Reserva[]> {
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
  },

  async cancelarReservasPorVoo(codigoVoo: string): Promise<void> {
    const voos = await vooService.listar();
    const voo = voos.find((v) => v.codigo === codigoVoo);

    if (!voo) {
      throw new Error("Voo não encontrado");
    }

    if (voo.status !== "CONFIRMADO") {
      throw new Error("Somente voos confirmados podem ser cancelados");
    }

    voo.status = "CANCELADO";
    await vooService.adicionar(voo);  

    const reservas = reservasMock.filter(r => r.codigo === voo.codigo);
    reservas.forEach(reserva => {
      reserva.estado = "CANCELADA";  // Altera o estado das reservas
    });

    localStorage.setItem("reservas", JSON.stringify(reservasMock));
  }
};
