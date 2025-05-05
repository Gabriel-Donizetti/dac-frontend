import React, { useState } from "react";
import {
  Alert,
  Button,
  Container,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Chip,
} from "@mui/material";
import { useMilhas } from "../view-models/useClienteMilhasViewModel";

const MilhasView: React.FC = () => {
  const { transactions, buyMiles } = useMilhas();
  const [valor, setValor] = useState<string>("");
  const [purchaseMessage, setPurchaseMessage] = useState<string>("");

  const handleCompra = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = parseFloat(valor);
    if (isNaN(value) || value <= 0) {
      alert("Digite um valor válido!");
      return;
    }
    buyMiles(value);
    setValor("");
    setPurchaseMessage("Compra de milhas realizada com sucesso!");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Comprar Milhas
      </Typography>

      <form onSubmit={handleCompra}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            type="number"
            label="Valor (R$)"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Comprar
          </Button>
        </Stack>
      </form>

      {purchaseMessage && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {purchaseMessage}
        </Alert>
      )}


      <Typography variant="h5" sx={{ mt: 4 }}>
        Extrato de Milhas
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Data/Hora</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Código</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Valor (R$)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Milhas</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Descrição</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Tipo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((trans, idx) => (
              <TableRow key={idx}>
                <TableCell>{trans.data.toLocaleString()}</TableCell>
                <TableCell>{trans.codigoReserva}</TableCell>
                <TableCell>{trans.valor.toFixed(2)}</TableCell>
                <TableCell>{trans.milhas.toFixed(2)}</TableCell>
                <TableCell>{trans.descricao}</TableCell>
                <TableCell>
                  <Chip
                    label={trans.tipo}
                    color={trans.tipo === "ENTRADA" ? "success" : "error"}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Container>
  );
};

export default MilhasView;
