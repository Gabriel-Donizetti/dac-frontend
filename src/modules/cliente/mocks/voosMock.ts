import { Voo } from "../../funcionario/models/VooTypes";

const hoje = new Date();

export const voosMock: Voo[] = [
  {
    codigo: 'TADS0001',
    dataHora: new Date(hoje.setHours(10, 0)).toISOString(),
    origem: 'GRU (São Paulo)',
    destino: 'GIG (Rio de Janeiro)',
    valorReais: 350.00,
    valorMilhas: 5000,
    poltronas: 20,
    poltronasOcupadas: 0,
    status: "CONFIRMADO",
    preco: 350.00,
    milhasNecessarias: 5000,
    assentosDisponiveis: 20
  },
  {
    codigo: 'TADS0002',
    dataHora: new Date(hoje.setHours(14, 30)).toISOString(),
    origem: 'GRU (São Paulo)',
    destino: 'BSB (Brasília)',
    valorReais: 420.00,
    valorMilhas: 7000,
    poltronas: 15,
    poltronasOcupadas: 0,
    status: "CONFIRMADO",
    preco: 350.00,
    milhasNecessarias: 5000,
    assentosDisponiveis: 20
  },
  {
    codigo: 'TADS0003',
    dataHora: '2025-08-10T10:30-03:00',
    origem: 'POA (Porto Alegre)',
    destino: 'CWB (Curitiba)',
    valorReais: 350.00,
    valorMilhas: 5000,
    poltronas: 20,
    poltronasOcupadas: 0,
    status: "CONFIRMADO",
    preco: 350.00,
    milhasNecessarias: 5000,
    assentosDisponiveis: 20
  },
  {
    codigo: 'TADS0004',
    dataHora: '2025-09-11T09:30Z-03:00',
    origem: 'CWB (Curitiba)',
    destino: 'GIG (Rio de Janeiro)',
    valorReais: 350.00,
    valorMilhas: 5000,
    poltronas: 20,
    poltronasOcupadas: 0,
    status: "CONFIRMADO",
    preco: 350.00,
    milhasNecessarias: 5000,
    assentosDisponiveis: 20
  },
  {
    codigo: 'TADS0005',
    dataHora: '2025-10-12T08:30Z-03:00',
    origem: 'CWB (Curitiba)',
    destino: 'POA (Porto Alegre)',
    valorReais: 350.00,
    valorMilhas: 5000,
    poltronas: 20,
    poltronasOcupadas: 0,
    status: "CONFIRMADO",
    preco: 350.00,
    milhasNecessarias: 5000,
    assentosDisponiveis: 20
  }
];
