import { useAuth } from '../../../shared/contexts/AuthContext';
import { Button } from '@mui/material';

export function FuncionarioHeader() {
  const { user, logout } = useAuth();

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem',
      backgroundColor: '#f0f0f0'
    }}>
      <div style={{ fontSize: '1.5rem' }}>Sua Viagem</div>
      
      {user && (
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>Olá, {user.nome}</span>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={logout}
          >
            Sair
          </Button>
        </nav>
      )}
    </header>
  );
}