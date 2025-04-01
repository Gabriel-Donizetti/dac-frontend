// modules/cliente/views/ReservaDetalheView.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useReservaDetalheViewModel } from '../view-models/useReservaDetalheViewModel';

function ReservaDetalheView() {
  const { reservaId } = useParams<{ reservaId: string }>();
  const navigate = useNavigate();
  const { reserva, loading, error } = useReservaDetalheViewModel(reservaId || '');

  const handleVoltar = () => {
    navigate(-1);
  };

  return (
    <div className="reserva-detalhe-container">
      <button onClick={handleVoltar} className="btn-voltar">
        &larr; Voltar para Perfil
      </button>

      {loading && <p>Carregando detalhes da reserva...</p>}
      {error && <p className="error">{error}</p>}

      {reserva && (
        <div className="detalhe-reserva">
          <h2>Detalhes da Reserva</h2>
          
          <div className="reserva-grid">
            <div className="info-group">
              <h3>Código</h3>
              <p>{reserva.codigo}</p>
            </div>

            <div className="info-group">
              <h3>Data/Hora</h3>
              <p>
                {new Date(reserva.dataHora).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            <div className="info-group">
              <h3>Rota</h3>
              <p>
                {reserva.origem} → {reserva.destino}
              </p>
            </div>

            <div className="info-group">
              <h3>Valor</h3>
              <p>R$ {reserva.valorReais.toFixed(2)}</p>
            </div>

            <div className="info-group">
              <h3>Milhas utilizadas</h3>
              <p>{reserva.milhasGastas.toLocaleString()}</p>
            </div>

            <div className="info-group">
              <h3>Status</h3>
              <p className={`status ${reserva.estado}`}>
                {reserva.estado.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReservaDetalheView;