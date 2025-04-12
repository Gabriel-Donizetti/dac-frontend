import { usePerfilViewModel } from '../view-models/usePerfilViewModel';
import { TabelaReservas } from '../components/TabelaReservas';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

function PerfilView() {
  const navigate = useNavigate();
  const { user, reservas, loading, error, saldoMilhas, cancelarReserva, recarregar } = usePerfilViewModel();

  const handleVerDetalhes = (reservaId: string) => {
    navigate(`/cliente/reservas/${reservaId}`);
  };

  if (loading && !user) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!user) return <div>Usuário não encontrado</div>;


  return (
      <Box sx={{ display: "flex", flexDirection: "column",  }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Saldo em milhas
          </Typography>
          <Typography variant="h3" sx={{ color: "#374151", fontWeight: "bold" }}>
            {saldoMilhas.toLocaleString()}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">Voos e Reservas</Typography>
          <Button onClick={recarregar} variant="contained" color="primary" size="small" sx={{ width: 20, textTransform: "none" }} disabled={loading}>
            <RefreshIcon fontSize="small" />
          </Button>
        </Box>

        {error && <Typography color="error">{error}</Typography>}

        {loading && !reservas.length ? (
          <Typography>Carregando reservas...</Typography>
        ) : (
          <Box>
            <TabelaReservas reservas={reservas} onVerDetalhes={handleVerDetalhes} onCancelar={cancelarReserva} />
          </Box>
        )}
      </Box>
  );
}

export default PerfilView;
