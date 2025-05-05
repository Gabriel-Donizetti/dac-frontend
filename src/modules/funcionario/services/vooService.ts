import { Voo } from "../../funcionario/models/Voo";

const VOOS_STORAGE_KEY = "voos";

export class VooService {
  listar(): Voo[] {
    const voos = localStorage.getItem(VOOS_STORAGE_KEY);
    return voos ? JSON.parse(voos) : [];
  }

  adicionar(voo: Voo): void {
    const voos = this.listar();
    voos.push(voo);
    localStorage.setItem(VOOS_STORAGE_KEY, JSON.stringify(voos));
  }
}

export const vooService = new VooService();
