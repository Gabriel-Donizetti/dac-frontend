import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useCheckinViewModel } from "../view-models/useCheckinViewModel";

function CheckinView() {
    const { reservasProximas, fazerCheckin } = useCheckinViewModel();

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                Voos nas próximas 48h
            </Typography>

            {reservasProximas.length === 0 ? (
                <Typography>Nenhum voo disponível para check-in.</Typography>
            ) : (
                reservasProximas.map((reserva) => (
                    <Card key={reserva.id} sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="subtitle1">
                                {reserva.origem} → {reserva.destino}
                            </Typography>
                            <Typography variant="body2">
                                Data/Hora: {new Date(reserva.dataHora).toLocaleString()}
                            </Typography>
                            <Typography variant="body2">Código: {reserva.codigo}</Typography>
                            <Typography variant="body2">Estado: {reserva.estado}</Typography>
                            <Button
                                variant="contained"
                                sx={{ mt: 1 }}
                                onClick={() => fazerCheckin(reserva.id)}
                                disabled={reserva.estado === "CHECK-IN"}
                            >
                                Fazer Check-in
                            </Button>
                        </CardContent>
                    </Card>
                ))
            )}
        </Box>
    );
}

export default CheckinView;
