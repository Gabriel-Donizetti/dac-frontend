import { useState } from "react";
import { Reserva } from "../cliente/models/ReservaTypes";

const [reservas] = useState<Reserva[]>([]); // remover dps se n for usado.
