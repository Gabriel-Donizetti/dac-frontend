import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../shared/contexts/AuthContext';
import { vooService } from '../services/vooService';
import { Voo } from '../../funcionario/models/VooTypes';
import { Reserva } from '../models/ReservaTypes';
import { Cliente } from '../../cliente/models/ClienteTypes';

export function useReservaViewModel() {
    const navigate = useNavigate();
    const { vooId } = useParams();
    const { user, updateUser } = useAuth();

    // Estados
    const [origem, setOrigem] = useState('');
    const [destino, setDestino] = useState('');
    const [voos, setVoos] = useState<Voo[]>([]);
    const [vooSelecionado, setVooSelecionado] = useState<Voo | null>(null);
    const [quantidade, setQuantidade] = useState(1);
    const [milhasUsadas, setMilhasUsadas] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Calculados
    const cliente = user?.role === 'client' ? user as Cliente : null;
    const saldoMilhas = cliente?.saldoMilhas || 0;
    const valorTotal = vooSelecionado ? vooSelecionado.preco * quantidade : 0;
    const milhasTotais = vooSelecionado ? vooSelecionado.milhasNecessarias * quantidade : 0;
    const valorComMilhas = vooSelecionado ?
        Math.max(0, valorTotal - (milhasUsadas * vooSelecionado.preco / vooSelecionado.milhasNecessarias)) : 0;

    // Efeitos
    useEffect(() => {
        if (vooId) {
            carregarVooSelecionado(vooId);
        }
    }, [vooId]);

    // Métodos
    const buscarVoos = async () => {
        setLoading(true);
        setError('');
        try {
            const voosEncontrados = await vooService.mockBuscarVoos(origem, destino);
            setVoos(voosEncontrados);
        } catch (err) {
            setError('Erro ao buscar voos');
        } finally {
            setLoading(false);
        }
    };

    const carregarVooSelecionado = async (id: string) => {
        setLoading(true);
        try {
            const voos = await vooService.mockBuscarVoos('', '');
            const voo = voos.find(v => v.codigo === id);
            if (voo) {
                setVooSelecionado(voo);
            } else {
                navigate('/cliente/reservar');
            }
        } catch (err) {
            setError('Erro ao carregar voo');
            navigate('/cliente/reservar');
        } finally {
            setLoading(false);
        }
    };

    const selecionarVoo = (voo: Voo) => {
        navigate(`/cliente/reservar/confirmar/${voo.codigo}`);
    };

    const atualizarMilhasUsadas = (value: number) => {
        if (!vooSelecionado) return;
        const maxMilhas = Math.min(saldoMilhas, milhasTotais);
        setMilhasUsadas(Math.min(value, maxMilhas));
    };

    const finalizarReserva = async () => {
        if (!vooSelecionado || !user) return;

        //levar essa parte pro back?
        const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numeros = '0123456789';
        let codigo = '';

        for (let i = 0; i < 3; i++) {
            codigo += letras.charAt(Math.floor(Math.random() * letras.length));
        }
        for (let i = 0; i < 3; i++) {
            codigo += numeros.charAt(Math.floor(Math.random() * numeros.length));
        }
        setLoading(true);
        try {
            const dadosReserva: Reserva = {
                id: Math.floor(1000 + Math.random() * 9000).toString(),
                codigo: codigo,
                dataHora: vooSelecionado.dataHora,
                origem: vooSelecionado.origem,
                destino: vooSelecionado.destino,
                valorReais: valorComMilhas,
                milhasGastas: milhasUsadas,
                estado: 'CRIADA'
            };
            console.log(dadosReserva)

            const reserva = await vooService.mockFinalizarReserva(dadosReserva);

            // await clienteService.debitarMilhas(user.id, milhasUsadas, 'Reserva de voo');

            // VERIFICAR SE TEM MILHA PARA DESCONTAR

            // Atualiza o estado local
            updateUser({
                ...user,
                saldoMilhas: cliente?.saldoMilhas ?? - milhasUsadas
            });
            // Navega para a página de confirmação
            // navigate(`/cliente/reservas/${reserva.codigo}`);
            navigate(`/cliente/initial-page`)
        } catch (err) {
            setError('Erro ao finalizar reserva');
        } finally {
            setLoading(false);
        }
    };

    return {
        // Estados
        origem,
        setOrigem,
        destino,
        setDestino,
        voos,
        vooSelecionado,
        quantidade,
        setQuantidade,
        milhasUsadas,
        setMilhasUsadas: atualizarMilhasUsadas,
        loading,
        error,

        // Calculados
        saldoMilhas,
        valorTotal,
        milhasTotais,
        valorComMilhas,

        // Métodos
        buscarVoos,
        selecionarVoo,
        finalizarReserva
    };
}