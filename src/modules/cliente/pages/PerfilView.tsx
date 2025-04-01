// modules/cliente/views/PerfilView.tsx
import { usePerfilViewModel } from '../view-models/usePerfilViewModel';
import { TabelaReservas } from '../components/TabelaReservas';
import { useNavigate } from 'react-router-dom';

function PerfilView() {
  const navigate = useNavigate();
  const { user, reservas, loading, error, cancelarReserva, recarregar } = usePerfilViewModel();

  const handleVerDetalhes = (reservaId: string) => {
    navigate(`/cliente/reservas/${reservaId}`);
  };

  if (loading && !user) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!user) return <div>Usuário não encontrado</div>;

  return (
    <div className="perfil-container">
      <div className="dados-pessoais">
        <h2>Meu Perfil</h2>
        <p><strong>Nome:</strong> {user.nome}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <div className="reservas-section">
        <div className="reservas-header">
          <h3>Minhas Reservas</h3>
          <button onClick={recarregar} disabled={loading}>
            {loading ? 'Atualizando...' : 'Atualizar'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
        
        {loading && !reservas.length ? (
          <p>Carregando reservas...</p>
        ) : (
          <TabelaReservas
            reservas={reservas}
            onVerDetalhes={handleVerDetalhes}
            onCancelar={cancelarReserva}
          />
        )}
      </div>
    </div>
  );
}

export default PerfilView;