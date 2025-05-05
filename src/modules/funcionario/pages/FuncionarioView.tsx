import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { FuncionarioViewModel } from '../../funcionario/models/FuncionarioViewModel';

const FuncionarioView: React.FC = () => {
  const {
    flights,
    loading,
    error,
  } = FuncionarioViewModel();
  const navigate = useNavigate();

  return (
    <>
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Painel do Funcionário
      </Typography>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Voos para as Próximas 48h
      </Typography>
      {loading ? (
        <Typography>Carregando voos...</Typography>
      ) : error ? (
        <Typography color="error">Erro: {error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Data/Hora</TableCell>
                <TableCell>Aeroporto Origem</TableCell>
                <TableCell>Aeroporto Destino</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {flights.map((flight) => (
                <TableRow key={flight.id}>
                  <TableCell>{flight.data.toLocaleString()}</TableCell>
                  <TableCell>{flight.origem}</TableCell>
                  <TableCell>{flight.destino}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                      >
                        Confirmar Embarque
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        color="error"
                      >
                        Cancelar Voo
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        color="success"
                      >
                        Realizar Voo
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
    </>
  );
  
};

export default FuncionarioView;