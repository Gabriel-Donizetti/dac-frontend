// modules/cliente/view-models/usePerfilViewModel.ts
import { useState, useEffect } from 'react';
import { authService } from '../../auth/services/authService';
import { useAuth } from '../../../shared/contexts/AuthContext';
import { reservaService } from '../services/reservaService';
import { Reserva } from '../models/ReservaTypes';

export function usePerfilViewModel() {
  const { user } = useAuth();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const carregarDados = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const reservasData = await reservaService.getReservas(user.id, {
        estados: ['reservada', 'concluída', 'cancelada']
      });
      setReservas(reservasData);
    } catch (err) {
      setError('Erro ao carregar reservas');
    } finally {
      setLoading(false);
    }
  };

  const cancelarReserva = async (reservaId: string) => {
    try {
      await reservaService.cancelarReserva(reservaId);
      setReservas(reservas.map(r => 
        r.id === reservaId ? { ...r, estado: 'cancelada' } : r
      ));
    } catch (err) {
      setError('Erro ao cancelar reserva');
    }
  };

  useEffect(() => {
    carregarDados();
  }, [user?.id]);

  return {
    user,
    reservas,
    loading,
    error,
    cancelarReserva,
    recarregar: carregarDados
  };
}