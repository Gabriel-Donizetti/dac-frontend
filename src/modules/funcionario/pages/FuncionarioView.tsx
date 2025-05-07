import React from 'react';
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
import { FuncionarioViewModel } from '../view-models/useFuncionarioViewModel';

const FuncionarioView: React.FC = () => {
  const { flights, loading, error } = FuncionarioViewModel();

  return (
    <Box sx={{ padding: 2 }}>
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
                <TableRow key={flight.codigo}>
                  <TableCell>{new Date(flight.dataHora).toLocaleString()}</TableCell>
                  <TableCell>{flight.origem}</TableCell>
                  <TableCell>{flight.destino}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex' }}>
                      <Button variant="contained" size="small" color="primary">
                        Confirmar Embarque
                      </Button>
                      <Button variant="contained" size="small" color="error">
                        Cancelar Voo
                      </Button>
                      <Button variant="contained" size="small" color="success">
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
  );
};

export default FuncionarioView;
