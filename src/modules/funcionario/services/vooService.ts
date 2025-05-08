import { Voo } from "../models/VooTypes";

const VOOS_STORAGE_KEY = "voos";

export class VooService {
  listar(): Promise<Voo[]> {
    return new Promise((resolve) => {
      const data = localStorage.getItem(VOOS_STORAGE_KEY);
      const voos = data ? JSON.parse(data) : [];
      setTimeout(() => resolve(voos), 0);
    });
  }

  async adicionar(voo: Voo): Promise<void> {
    const voos = await this.listar();
    voos.push(voo);
    localStorage.setItem(VOOS_STORAGE_KEY, JSON.stringify(voos));
  }

  async adicionarCadastro(vooCadastro: any): Promise<void> {
    const voo: Voo = {
      codigo: vooCadastro.codigo,
      dataHora: vooCadastro.dataHora,
      origem: vooCadastro.origem,
      destino: vooCadastro.destino,
      valorReais: vooCadastro.valorReais,
      valorMilhas: vooCadastro.valorMilhas,
      poltronas: vooCadastro.poltronas,
      poltronasOcupadas: vooCadastro.poltronasOcupadas,
      status: vooCadastro.status,
      preco: 0,
      milhasNecessarias: 0
    };

    await this.adicionar(voo);
  }
}

export const vooService = new VooService();
