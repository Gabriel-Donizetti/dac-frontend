import { useEffect, useState } from "react";
import { Voo } from "../../funcionario/models/Voo";
import { vooService } from "../services/vooService";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";

export default function VooPageView() {
  const [voos, setVoos] = useState<Voo[]>([]);

  useEffect(() => {
    setVoos(vooService.listar());
  }, []);

  const formatarData = (dataHora: string) => {
    if (!dataHora) return "Data inválida";

    const [data, hora] = dataHora.split("T");
    if (!data || !hora) return "Data inválida";

    const [ano, mes, dia] = data.split("-");
    const [horaFormatada, minuto] = hora.split(":");

    return `${dia}/${mes}/${ano} ${horaFormatada}:${minuto}`;
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Typography variant="h5">Voos</Typography>
        <Button variant="contained" href="cadastro-voo" size="small" sx={{ width: "fit-content", textTransform: "none" }}>
          Novo
        </Button>
      </Box>

      {voos.length === 0 ? (
        <Typography variant="subtitle1" color="textSecondary">
          Nenhum voo cadastrado.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Origem</TableCell>
                <TableCell>Destino</TableCell>
                <TableCell>Data/Hora</TableCell>
                <TableCell>Valor (R$)</TableCell>
                <TableCell>Poltronas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {voos.map((v) => (
                <TableRow key={v.codigo}>
                  <TableCell>{v.codigo}</TableCell>
                  <TableCell>{v.origem}</TableCell>
                  <TableCell>{v.destino}</TableCell>
                  <TableCell>{formatarData(v.dataHora)}</TableCell>
                  <TableCell>{v.valorReais}</TableCell>
                  <TableCell>{v.poltronas}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
