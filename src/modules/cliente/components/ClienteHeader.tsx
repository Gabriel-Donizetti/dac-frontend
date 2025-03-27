import { useAuth } from '../contexts/AuthContext';

function ClienteHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="cliente-header">
      <div className="logo">Sua Viagem</div>
      
      {user && (
        <nav>
          <span>Olá, {user.nome}</span>
          <button onClick={logout}>Sair</button>
        </nav>
      )}
    </header>
  );
}

export default ClienteHeader;