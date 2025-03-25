import { useState, useEffect } from 'react';
import { reservaService } from '../services/reservaService';
import { Reserva } from '../models/ReservaTypes';

export function useMinhasReservasViewModel() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadReservations = async () => {
      setLoading(true);
      setError('');
      
      try {
        const reservations = await reservaService.listarReservas();
      } catch (err) {
        setError('Failed to load reservations');
        console.error('Reservation load error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadReservations();
  }, []);

  return {
    reservas,
    loading,
    error,
    // Adicione outras funções se necessário
  };
}