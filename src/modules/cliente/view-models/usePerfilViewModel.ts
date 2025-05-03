// modules/cliente/view-models/usePerfilViewModel.ts
import { useState, useEffect } from 'react';
import { useAuth } from '../../../shared/contexts/AuthContext';
import { reservaService } from '../services/reservaService';
import { Reserva } from '../models/ReservaTypes';
import { Cliente } from '../models/ClienteTypes';

export function usePerfilViewModel() {
  const { user } = useAuth();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saldoMilhas, setSaldoMilhas] = useState(Number)

  const cliente = user?.role === 'client' ? user as Cliente : null;
  const carregarDadosReservas = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const reservasData = await reservaService.getReservas(user.id, {
      });
      setReservas(reservasData);
    } catch (err) {
      setError('Erro ao carregar reservas');
    } finally {
      setLoading(false);
    }
  };

  const carregarDadosCliente = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      // const saldoMilhas = await clienteService.getSaldoMilhas(user!.id)
      const saldoMilhas = cliente?.saldoMilhas
      setSaldoMilhas(saldoMilhas ?? 0)
    } catch (err) {
      setError('Erro ao carregar reservas');
    } finally {
      setLoading(false);
    }
  };

  const cancelarReserva = async (reservaId: string) => {
    try {
      const reserva = reservas.find(r => r.id === reservaId);
  
      // Verificação de estado permitido
      if (!reserva || !['CRIADA', 'CHECK-IN'].includes(reserva.estado)) {
        setError('Reserva não pode ser cancelada');
        return;
      }
  
      // Cancela a reserva no backend
      await reservaService.cancelarReserva(reservaId);
  
      const milhasRestituir = reserva.milhasGastas ?? 0;
      if (milhasRestituir > 0 && user?.id) {
        // await clienteService.restituirMilhas(user.id, milhasRestituir, {
        //   motivo: 'Cancelamento de reserva',
        //   reservaId,
        //   data: new Date().toISOString(),
        // });
      }
      // Atualiza saldo de milhas no frontend
      setSaldoMilhas(prev => prev + milhasRestituir);
  
    } catch (err) {
      setError('Erro ao cancelar reserva');
    }
  };
  
  const carregarDados = async () => {
    carregarDadosReservas();
    carregarDadosCliente();
  };
  useEffect(() => {
    carregarDados();
  }, [user?.id]);

  return {
    user,
    reservas,
    loading,
    error,
    saldoMilhas,
    cancelarReserva,
    recarregar: carregarDados
  };
}