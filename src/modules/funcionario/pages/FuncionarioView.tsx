import React, { useState } from 'react';
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
import { Voo } from '../models/VooTypes';
import ConfirmarEmbarqueModal from '../components/ConfirmarEmbarqueModal';
import { Reserva } from '../../cliente/models/ReservaTypes';
import { reservaService } from '../../cliente/services/reservaService';

const FuncionarioView: React.FC = () => {
  const { flights, loading, error } = FuncionarioViewModel();

  const [openModal, setOpenModal] = useState(false);
  const [vooSelecionado, setVooSelecionado] = useState<Voo | null>(null);

  const handleAbrirModal = (voo: Voo) => {
    setVooSelecionado(voo);
    setOpenModal(true);
  };

  const handleFecharModal = () => {
    setOpenModal(false);
    setVooSelecionado(null);
  };

  const handleConfirmarEmbarque = (reservaAtualizada: Reserva) => {
    console.log("Reserva atualizada:", reservaAtualizada);

    reservaService.atualizarEstadoReserva(reservaAtualizada.id, 'EMBARCADA')
      .then(() => {
        setOpenModal(false); 
        loadFlights(); 
      })
      .catch(error => {
        console.error("Erro ao atualizar o estado da reserva:", error);
      });
  };
  

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
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() => handleAbrirModal(flight)}
                      >
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

      <ConfirmarEmbarqueModal
        open={openModal}
        onClose={handleFecharModal}
        onConfirmar={handleConfirmarEmbarque} vooSelecionado={{
          dataHora: '',
          origem: '',
          destino: ''
        }} reservas={[]}      />
    </Box>
  );
};

export default FuncionarioView;
function loadFlights() {
  throw new Error('Function not implemented.');
}

