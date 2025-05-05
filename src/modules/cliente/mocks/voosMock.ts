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
  },
  {
    id: '3',
    codigo: 'G31425',
    origem: 'POA (Porto Alegre)',
    destino: 'CWB (Curitiba)',
    dataHora: '2025-08-10T10:30-03:00',
    preco: 350.00,
    milhasNecessarias: 5000,
    assentosDisponiveis: 20
  },
  {
    id: '4',
    codigo: 'G31425',
    origem: 'CWB (Curitiba)',
    destino: 'GIG (Rio de Janeiro)',
    dataHora: '2025-09-11T09:30Z-03:00',
    preco: 350.00,
    milhasNecessarias: 5000,
    assentosDisponiveis: 20
  },
  {
    id: '5',
    codigo: 'G31425',
    origem: 'CWB (Curitiba)',
    destino: 'POA (Porto Alegre)',
    dataHora: '2025-10-12T08:30Z-03:00',
    preco: 350.00,
    milhasNecessarias: 5000,
    assentosDisponiveis: 20
  }
];
