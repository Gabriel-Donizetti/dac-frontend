import { Reserva, FiltroReservas } from '../models/ReservaTypes';

// Dados mockados
const reservasMock: Reserva[] = [
  {
    id: '1',
    codigo: 'RES-2023-001',
    dataHora: '2023-12-10T14:30:00Z',
    origem: 'GRU (São Paulo)',
    destino: 'GIG (Rio de Janeiro)',
    valorReais: 350.00,
    milhasGastas: 5000,
    estado: 'reservada'
  },
  {
    id: '2',
    codigo: 'RES-2023-002',
    dataHora: '2023-11-15T08:45:00Z',
    origem: 'BSB (Brasília)',
    destino: 'REC (Recife)',
    valorReais: 420.00,
    milhasGastas: 7000,
    estado: 'concluída'
  }
];

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
    if (reserva) reserva.estado = 'cancelada';
  }
};