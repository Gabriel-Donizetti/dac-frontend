// modules/reserva/services/vooService.ts
import { Voo, Reserva, DadosReserva } from '../models/VooTypes';

export const vooService = {
    async mockBuscarVoos(origem: string, destino: string): Promise<Voo[]> {
        const hoje = new Date();
        const voosMock: Voo[] = [
            {
                id: '1',
                codigo: 'G31425',
                origem: origem || 'GRU (São Paulo)',
                destino: destino || 'GIG (Rio de Janeiro)',
                dataHora: new Date(hoje.setHours(10, 0)).toISOString(),
                preco: 350.00,
                milhasNecessarias: 5000,
                assentosDisponiveis: 20
            },
            {
                id: '2',
                codigo: 'L51478',
                origem: origem || 'GRU (São Paulo)',
                destino: destino || 'BSB (Brasília)',
                dataHora: new Date(hoje.setHours(14, 30)).toISOString(),
                preco: 420.00,
                milhasNecessarias: 7000,
                assentosDisponiveis: 15
            }
        ];

        return voosMock.filter(voo =>
            (!origem || voo.origem.includes(origem)) &&
            (!destino || voo.destino.includes(destino))
        );
    },

    async mockFinalizarReserva(dados: DadosReserva): Promise<Reserva> {
        // Gera um código de reserva aleatório (3 letras + 3 números)
        const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numeros = '0123456789';
        let codigo = '';

        for (let i = 0; i < 3; i++) {
            codigo += letras.charAt(Math.floor(Math.random() * letras.length));
        }
        for (let i = 0; i < 3; i++) {
            codigo += numeros.charAt(Math.floor(Math.random() * numeros.length));
        }

        const voos = await this.mockBuscarVoos('', '');
        const voo = voos.find(v => v.id === dados.vooId);

        if (!voo) {
            throw new Error('Voo não encontrado');
        }

        return {
            id: 'mock-id',
            codigo,
            voo,
            quantidade: dados.quantidade,
            milhasUsadas: dados.milhasUsadas,
            valorPago: voo.preco * dados.quantidade - (dados.milhasUsadas * voo.preco / voo.milhasNecessarias),
            estado: 'CRIADA'
        };
    }
};