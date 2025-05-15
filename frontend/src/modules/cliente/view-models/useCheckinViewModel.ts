import { useEffect, useState } from "react";
import { Reserva } from "../models/ReservaTypes";
import { reservaService } from "../services/reservaService";
import { useAuth } from "../../../shared/contexts/AuthContext";
export function useCheckinViewModel() {
    const [reservasProximas, setReservasProximas] = useState<Reserva[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { user } = useAuth();
    const clienteId = user?.id as string;

    useEffect(() => {

        async function carregarReservas() {
            try {
                const now = new Date();
                const limite = new Date(now.getTime() + 48 * 60 * 60 * 1000);

                const todasReservas = await reservaService.getReservas(clienteId, {
                    estados: ['CRIADA'],
                });

                const proximas = todasReservas.filter((r) => {
                    const dataReserva = new Date(r.dataHora);
                    return dataReserva > now && dataReserva <= limite;
                });

                setReservasProximas(proximas);
            } catch (e) {
                console.error("Erro ao buscar reservas para check-in:", e);
            } finally {
                setLoading(false);
            }
        }

        carregarReservas();
    }, [clienteId]);

    const fazerCheckin = async (reservaId: string) => {
        try {
            await reservaService.atualizarEstadoReserva(reservaId, "CHECK-IN");
            setReservasProximas((prev) =>
                prev.map((r) =>
                    r.id === reservaId ? { ...r, estado: "CHECK-IN" } : r
                )
            );
        } catch (e) {
            console.error("Erro ao fazer check-in:", e);
        }
    };

    return {
        reservasProximas,
        loading,
        fazerCheckin,
    };
}
