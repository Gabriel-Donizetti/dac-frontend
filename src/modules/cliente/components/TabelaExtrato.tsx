import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Box,
    Chip
} from "@mui/material";

const dadosExtrato = [
    {
        data: "2025-04-10",
        codigoReserva: "ABC123",
        valorReais: 500.0,
        milhas: 0,
        descricao: "CWB->GRU",
        tipo: "SAÍDA",
    },
    {
        data: "2025-04-08",
        codigoReserva: "",
        valorReais: 0.0,
        milhas: 10000,
        descricao: "COMPRA DE MILHAS",
        tipo: "ENTRADA",
    },
];

export default function TabelaExtrato() {
    return (
        <Container >
            <Box >
                <Typography variant="h4" gutterBottom>
                    Extrato de milhas
                </Typography>

                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Data</TableCell>
                                <TableCell>Código</TableCell>
                                <TableCell align="right">Valor</TableCell>
                                <TableCell align="right">Milhas</TableCell>
                                <TableCell>Descrição</TableCell>
                                <TableCell>Tipo</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dadosExtrato.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.data}</TableCell>
                                    <TableCell>{item.codigoReserva || "-"}</TableCell>
                                    <TableCell align="right">
                                        {item.valorReais.toFixed(2)}
                                    </TableCell>
                                    <TableCell align="right">{item.milhas}</TableCell>
                                    <TableCell>{item.descricao}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={item.tipo}
                                            color={item.tipo === "ENTRADA" ? "success" : "error"}
                                            size="small"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Box>
        </Container>
    );
}


