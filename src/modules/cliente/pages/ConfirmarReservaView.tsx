import { Box, Typography, Paper, TextField, Button, Alert, Divider, useTheme, CircularProgress } from '@mui/material';
import { useReservaViewModel } from '../view-models/useReservaViewModel';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

export function ConfirmarReservaView() {
    const theme = useTheme();
    const navigate = useNavigate();
    const {
        vooSelecionado,
        quantidade,
        setQuantidade,
        milhasUsadas,
        setMilhasUsadas,
        saldoMilhas,
        valorTotal,
        milhasTotais,
        valorComMilhas,
        finalizarReserva,
        loading,
        error
    } = useReservaViewModel();

    if (!vooSelecionado) {
        return null;
    }

    return (
        <Box sx={{ p: 4 }}>
            <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate('/cliente/reservar')}
                sx={{ mb: 2 }}
            >
                Voltar para Busca
            </Button>

            <Paper elevation={3} sx={{ p: 3, borderRadius: theme.shape.borderRadius }}>
                <Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.main }}>
                    Confirmar Reserva
                </Typography>

                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6">Detalhes do Voo</Typography>
                    <Divider sx={{ my: 1 }} />
                    <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
                        <Box>
                            <Typography><strong>Código:</strong> {vooSelecionado.codigo}</Typography>
                            <Typography><strong>Origem:</strong> {vooSelecionado.origem}</Typography>
                            <Typography><strong>Destino:</strong> {vooSelecionado.destino}</Typography>
                        </Box>
                        <Box>
                            <Typography><strong>Data/Hora:</strong> {new Date(vooSelecionado.dataHora).toLocaleString('pt-BR')}</Typography>
                            <Typography><strong>Preço unitário:</strong> R$ {vooSelecionado.preco.toFixed(2)}</Typography>
                            <Typography><strong>Milhas por passagem:</strong> {vooSelecionado.milhasNecessarias.toLocaleString()}</Typography>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6">Informações da Reserva</Typography>
                    <Divider sx={{ my: 1 }} />

                    <TextField
                        label="Quantidade de passagens"
                        type="number"
                        value={quantidade}
                        onChange={(e) => setQuantidade(Math.max(1, parseInt(e.target.value) || 1))}
                        inputProps={{ min: 1, max: vooSelecionado.assentosDisponiveis }}
                        sx={{ mb: 2 }}
                        fullWidth
                    />

                    <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
                        <Box>
                            <Typography><strong>Valor total:</strong></Typography>
                            <Typography variant="h6">R$ {valorTotal.toFixed(2)}</Typography>
                        </Box>
                        <Box>
                            <Typography><strong>Milhas necessárias:</strong></Typography>
                            <Typography variant="h6">{milhasTotais.toLocaleString()}</Typography>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6">Pagamento com Milhas</Typography>
                    <Divider sx={{ my: 1 }} />

                    <Typography><strong>Saldo disponível:</strong> {saldoMilhas.toLocaleString()} milhas</Typography>

                    <TextField
                        label="Milhas a usar"
                        type="number"
                        value={milhasUsadas}
                        onChange={(e) => setMilhasUsadas(parseInt(e.target.value) || 0)}
                        inputProps={{
                            min: 0,
                            max: Math.min(saldoMilhas, milhasTotais),
                            step: 100
                        }}
                        sx={{ my: 2 }}
                        fullWidth
                        helperText={`Máximo: ${Math.min(saldoMilhas, milhasTotais).toLocaleString()} milhas`}
                    />

                    <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
                        <Box>
                            <Typography><strong>Valor a pagar:</strong></Typography>
                            <Typography variant="h6" color="primary">
                                R$ {valorComMilhas.toFixed(2)}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography><strong>Milhas restantes:</strong></Typography>
                            <Typography variant="h6">
                                {(saldoMilhas - milhasUsadas).toLocaleString()}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    onClick={finalizarReserva}
                    disabled={loading}
                    sx={{
                        borderRadius: theme.shape.borderRadius,
                        py: 2,
                        fontSize: '1.1rem'
                    }}
                    fullWidth
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Confirmar Reserva'}
                </Button>
            </Paper>
        </Box>
    );
}