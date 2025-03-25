export interface FiltrosReserva {
    origem?: string;
    destino?: string;
    dataIda?: string;
    dataVolta?: string;
    passageiros?: number;
  }
  
  export interface Voo {
    id: string;
    origem: string;
    destino: string;
    dataPartida: string;
    dataChegada: string;
    preco: number;
    assentosDisponiveis: number;
  }
  
  export interface Reserva {
    id: string;
    voo: Voo;
    dataReserva: string;
    status: 'confirmada' | 'pendente' | 'cancelada';
  }