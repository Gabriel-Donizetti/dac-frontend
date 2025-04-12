export interface Voo {
    id: string;
    codigo: string;
    origem: string;
    destino: string;
    dataHora: string;
    preco: number;
    milhasNecessarias: number;
    assentosDisponiveis: number;
}

export interface Reserva {
    id: string;
    codigo: string;
    voo: Voo;
    quantidade: number;
    milhasUsadas: number;
    valorPago: number;
    estado: 'CRIADA' | 'CONFIRMADA' | 'CANCELADA';
}

export interface DadosReserva {
    vooId: string;
    clienteId?: string;
    quantidade: number;
    milhasUsadas: number;
}