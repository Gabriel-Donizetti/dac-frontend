import { useState, useEffect } from 'react';
import { reservaService } from '../services/reservaService';
import { FiltrosReserva, Voo } from '../models/ReservaTypes';

export function useReservaVooViewModel() {
  const [voos, setVoos] = useState<Voo[]>([]);
  const [filtros, setFiltros] = useState<FiltrosReserva>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const carregarVoos = async () => {
      setLoading(true);
      try {
        const voosDisponiveis = await reservaService.buscarVoos(filtros);
        setVoos(voosDisponiveis);
      } catch (err) {
        setError('Erro ao carregar voos');
      } finally {
        setLoading(false);
      }
    };
    
    carregarVoos();
  }, [filtros]);

  const handleFiltrosChange = (name: string, value: any) => {
    setFiltros(prev => ({ ...prev, [name]: value }));
  };

  const handleReservar = async (vooId: string) => {
    setLoading(true);
    try {
      await reservaService.reservarVoo(vooId);
      // Atualiza a lista após reserva
      const voosAtualizados = await reservaService.buscarVoos(filtros);
      setVoos(voosAtualizados);
    } catch (err) {
      setError('Erro ao realizar reserva');
    } finally {
      setLoading(false);
    }
  };

  return {
    voos,
    filtros,
    loading,
    error,
    handleFiltrosChange,
    handleReservar
  };
}