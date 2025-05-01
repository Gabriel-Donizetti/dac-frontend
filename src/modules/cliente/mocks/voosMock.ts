// modules/voo/mocks/voosMock.ts

import { Voo } from "../models/VooTypes";

const hoje = new Date();

export const voosMock: Voo[] = [
  {
    id: '1',
    codigo: 'G31425',
    origem: 'GRU (São Paulo)',
    destino: 'GIG (Rio de Janeiro)',
    dataHora: new Date(hoje.setHours(10, 0)).toISOString(),
    preco: 350.00,
    milhasNecessarias: 5000,
    assentosDisponiveis: 20
  },
  {
    id: '2',
    codigo: 'L51478',
    origem: 'GRU (São Paulo)',
    destino: 'BSB (Brasília)',
    dataHora: new Date(hoje.setHours(14, 30)).toISOString(),
    preco: 420.00,
    milhasNecessarias: 7000,
    assentosDisponiveis: 15
  }
];
