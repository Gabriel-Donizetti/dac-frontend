import { Voo } from '../../funcionario/models/VooTypes';
import { reservasMock } from '../mocks/reservaMock';
import { voosMock } from '../mocks/voosMock';
import { Reserva } from '../models/ReservaTypes';

export const vooService = {
    async listar(): Promise<Voo[]> {
        return voosMock;
    },

    async mockBuscarVoos(origem: string, destino: string): Promise<Voo[]> {
        return voosMock.filter(voo =>
            (!origem || voo.origem.includes(origem)) &&
            (!destino || voo.destino.includes(destino))
        );
    },

    async mockFinalizarReserva(dados: Reserva): Promise<Reserva> {
        reservasMock.push(dados);
        return dados;
    },

    async cancelarVoo(codigoVoo: string): Promise<void> {
        const voo = voosMock.find((v) => v.codigo === codigoVoo);

        if (!voo) {
            throw new Error("Voo não encontrado");
        }

        if (voo.status !== "CONFIRMADO") {
            throw new Error("Somente voos confirmados podem ser cancelados");
        }

        voo.status = "CANCELADO";

        const reservasAssociadas = reservasMock.filter(r => r.codigo === voo.codigo);
        reservasAssociadas.forEach(reserva => {
            reserva.estado = "CANCELADA";
        });

        const vooIndex = voosMock.findIndex(v => v.codigo === codigoVoo);
        voosMock[vooIndex] = voo;

        localStorage.setItem("reservas", JSON.stringify(reservasMock));
        localStorage.setItem("voos", JSON.stringify(voosMock));
    },

    async adicionar(voo: Voo): Promise<void> {
        voosMock.push(voo);
        localStorage.setItem("voos", JSON.stringify(voosMock));
    }
};
