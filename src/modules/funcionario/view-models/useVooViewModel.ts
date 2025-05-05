import { vooService } from "../services/vooService.ts";
import { Voo } from "../../funcionario/models/Voo.ts";

export class VooViewModel {
  adicionarVoo(
    dataHora: string,
    origem: string,
    destino: string,
    valorReais: number,
    poltronas: number
  ): Voo {
    const codigo = "TADS" + Math.floor(1000 + Math.random() * 9000);
    const valorMilhas = Math.floor(valorReais * 100); 

    const novoVoo: Voo = {
      codigo,
      dataHora,
      origem,
      destino,
      valorReais,
      valorMilhas,
      poltronas,
      poltronasOcupadas: 0,
      status: "CONFIRMADO",
    };

    vooService.adicionar(novoVoo);
    return novoVoo;
  }
}
