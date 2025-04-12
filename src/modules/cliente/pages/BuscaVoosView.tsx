import { Box, TextField, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme, Alert, CircularProgress } from '@mui/material';
import { useReservaViewModel } from '../view-models/useReservaViewModel';

export function BuscaVoosView() {
    const theme = useTheme();
    const {
        origem,
        setOrigem,
        destino,
        setDestino,
        voos,
        buscarVoos,
        selecionarVoo,
        loading,
        error
    } = useReservaViewModel();

    return (
        <Box sx={{ p: 4 }}>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h5" >
                    Buscar Voos
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField
                        label="Origem (opcional)"
                        value={origem}
                        onChange={(e) => setOrigem(e.target.value)}
                        fullWidth
                        variant="outlined"
                        placeholder="Ex: GRU"
                    />
                    <TextField
                        label="Destino (opcional)"
                        value={destino}
                        onChange={(e) => setDestino(e.target.value)}
                        fullWidth
                        variant="outlined"
                        placeholder="Ex: GIG"
                    />
                </Box>

                <Button
                    variant="contained"
                    onClick={buscarVoos}
                    disabled={loading}
                    sx={{ borderRadius: theme.shape.borderRadius }}
                    fullWidth
                >
                    {loading ? <CircularProgress size={24} /> : 'Buscar Voos'}
                </Button>

                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}
            </Paper>

            {loading && voos.length === 0 ? (
                <Box display="flex" justifyContent="center" py={4}>
                    <CircularProgress />
                </Box>
            ) : voos.length > 0 ? (
                <Paper elevation={3} >
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Código</TableCell>
                                    <TableCell>Origem</TableCell>
                                    <TableCell>Destino</TableCell>
                                    <TableCell>Data/Hora</TableCell>
                                    <TableCell>Preço (R$)</TableCell>
                                    <TableCell>Milhas Necessárias</TableCell>
                                    <TableCell>Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {voos.map((voo) => (
                                    <TableRow key={voo.id}>
                                        <TableCell>{voo.codigo}</TableCell>
                                        <TableCell>{voo.origem}</TableCell>
                                        <TableCell>{voo.destino}</TableCell>
                                        <TableCell>
                                            {new Date(voo.dataHora).toLocaleString('pt-BR')}
                                        </TableCell>
                                        <TableCell>{voo.preco.toFixed(2)}</TableCell>
                                        <TableCell>{voo.milhasNecessarias.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => selecionarVoo(voo)}
                                                disabled={loading}
                                            >
                                                {loading ? <CircularProgress size={24} /> : 'Selecionar'}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            ) : (
                <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                    <Typography>Nenhum voo encontrado. Faça uma busca para ver os voos disponíveis.</Typography>
                </Paper>
            )}
        </Box>
    );
}