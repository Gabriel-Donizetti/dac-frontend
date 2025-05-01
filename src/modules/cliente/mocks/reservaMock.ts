// Dados mockados
import { Reserva } from "../models/ReservaTypes";
export const reservasMock: Reserva[] = [
    {
      id: '1',
      codigo: 'RES-2023-001',
      dataHora: '2023-12-10T14:30:00Z',
      origem: 'GRU (São Paulo)',
      destino: 'GIG (Rio de Janeiro)',
      valorReais: 350.00,
      milhasGastas: 5000,
      estado: 'CRIADA'
    },
    {
      id: '2',
      codigo: 'RES-2023-002',
      dataHora: '2023-11-15T08:45:00Z',
      origem: 'BSB (Brasília)',
      destino: 'REC (Recife)',
      valorReais: 420.00,
      milhasGastas: 7000,
      estado: 'CONFIRMADA'
    }
  ];
