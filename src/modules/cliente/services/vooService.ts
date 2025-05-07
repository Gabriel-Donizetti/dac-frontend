// modules/reserva/services/vooService.ts
import { reservasMock } from '../mocks/reservaMock';
import { Voo } from '../../funcionario/models/VooTypes';
import { Reserva } from '../models/ReservaTypes';
import { voosMock } from '../mocks/voosMock';

export const vooService = {
    async mockBuscarVoos(origem: string, destino: string): Promise<Voo[]> {
        return voosMock.filter(voo =>
            (!origem || voo.origem.includes(origem)) &&
            (!destino || voo.destino.includes(destino))
        );
    },

    async mockFinalizarReserva(dados: Reserva): Promise<Reserva> {
        reservasMock.push(dados);

        return dados;
    }
}

