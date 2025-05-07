export type Voo = {
    codigo: string;
    dataHora: string;
    origem: string;
    destino: string;
    valorReais: number;
    valorMilhas: number;
    poltronas: number;
    poltronasOcupadas: number;
    status: string;
    preco?: number;
    milhasNecessarias?: number;
    assentosDisponiveis?: number;
  };
  