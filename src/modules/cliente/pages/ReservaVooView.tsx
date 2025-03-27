import { useReservaVooViewModel } from '../view-models/ReservaVooViewModel';
import ClienteHeader from '../components/ClienteHeader';

function ReservaVooView() {
  const {
    voos,
    filtros,
    loading,
    error,
    handleFiltrosChange,
    handleReservar
  } = useReservaVooViewModel();

  return (
    <div className="reserva-voo-container">
      <ClienteHeader />
      
      <h1>Reservar Voo</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="filtros">
        <div className="filtro-group">
          <label>Origem:</label>
          <input
            type="text"
            value={filtros.origem || ''}
            onChange={(e) => handleFiltrosChange('origem', e.target.value)}
          />
        </div>
        
        <div className="filtro-group">
          <label>Destino:</label>
          <input
            type="text"
            value={filtros.destino || ''}
            onChange={(e) => handleFiltrosChange('destino', e.target.value)}
          />
        </div>
        
        {/* Adicione mais filtros conforme necessário */}
      </div>
      
      <div className="voos-list">
        {loading ? (
          <p>Carregando voos...</p>
        ) : (
          voos.map(voo => (
            <div key={voo.id} className="voo-card">
              <h3>{voo.origem} → {voo.destino}</h3>
              <p>Partida: {new Date(voo.dataPartida).toLocaleString()}</p>
              <p>Chegada: {new Date(voo.dataChegada).toLocaleString()}</p>
              <p>Preço: R$ {voo.preco.toFixed(2)}</p>
              <button 
                onClick={() => handleReservar(voo.id)}
                disabled={loading}
              >
                Reservar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReservaVooView;