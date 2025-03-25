import { useMinhasReservasViewModel } from '../view-models/MinhasReservasViewModel';

function MinhasReservasView() {
  const { reservas, loading, error } = useMinhasReservasViewModel();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <h2>Minhas Reservas</h2>
      {reservas.map(reserva => (
        <div key={reserva.id}>
          <p>Voo: {reserva.voo.origem} → {reserva.voo.destino}</p>
          <p>Status: {reserva.status}</p>
        </div>
      ))}
    </div>
  );
}

export default MinhasReservasView;