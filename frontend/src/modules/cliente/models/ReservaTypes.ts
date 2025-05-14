export type EstadoReserva = 'CHECK-IN'|'NÃO REALIZADA'| 'CANCELADA VOO'| 'EMBARCADA'| 'CRIADA' | 'REALIZADA' | 'CANCELADA';

export interface Reserva {
  id: string;
  codigo: string;
  dataHora: string; // ISO string
  origem: string;
  destino: string;
  valorReais: number;
  milhasGastas: number;
  estado: EstadoReserva;
}

export interface FiltroReservas {
  estados?: EstadoReserva[];
  ordenarPor?: 'dataHora' | 'valor';
}