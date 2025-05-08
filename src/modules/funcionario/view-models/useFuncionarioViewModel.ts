import { useState, useEffect } from "react";
import { Voo } from "../models/VooTypes"; 
import { voosMock } from "../../cliente/mocks/voosMock";
import { EstadoReserva, Reserva } from "../../cliente/models/ReservaTypes";
import { reservasMock } from "../../cliente/mocks/reservaMock";

export const FuncionarioViewModel = () => {
  const [flights, setFlights] = useState<Voo[]>([]);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error] = useState<string>("");

  const loadFlights = () => {
    setLoading(true);
    setTimeout(() => {
      const voos: Voo[] = JSON.parse(localStorage.getItem("voos") || "[]");
      const sortedFlights = voos.sort((a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime());
      setFlights(sortedFlights);
      setLoading(false);
    }, 1000);
  };

  const initializeFlights = () => {
    let voos: Voo[] = JSON.parse(localStorage.getItem("voos") || "[]");

    if (voos.length === 0) {
      voos = voos.concat(voosMock);
      localStorage.setItem("voos", JSON.stringify(voos));
    } else {
      voosMock.forEach((vooMock: Voo) => { 
        const vooExistente = voos.some(voo => voo.codigo === vooMock.codigo);
        if (!vooExistente) {
          voos.push(vooMock);
        }
      });
      localStorage.setItem("voos", JSON.stringify(voos));
    }
  };

  const loadReservas = () => {
    const todas = JSON.parse(localStorage.getItem("reservas") || "[]") as any[];
    const convertidas = todas.map(r => ({
      ...r,
      estado: r.estado as EstadoReserva,
    }));
    const apenasCheckin = convertidas.filter(r => r.estado === "CHECK-IN");
    setReservas(apenasCheckin);
  };

  const initializeReservas = () => {
    let armazenadas: Reserva[] = JSON.parse(localStorage.getItem("reservas") || "[]");
    if (armazenadas.length === 0) {
      armazenadas = reservasMock;
      localStorage.setItem("reservas", JSON.stringify(armazenadas));
    }
    loadReservas();
  };

  const atualizarReserva = (id: string, novoEstado: EstadoReserva) => {
    const todas = JSON.parse(localStorage.getItem("reservas") || "[]") as any[];
    const atualizadas = todas.map(r => {
      if (r.id === id) return { ...r, estado: novoEstado };
      return r;
    }).map(r => ({ ...r, estado: r.estado as EstadoReserva }));
  
    localStorage.setItem("reservas", JSON.stringify(atualizadas));
    setReservas(atualizadas.filter(r => r.estado === "CHECK-IN"));
  };

  useEffect(() => {
    initializeFlights();  
    initializeReservas();
    loadFlights();        
  }, []);

  return {
    flights,
    reservas,
    setReservas,
    atualizarReserva,
    loading,
    error,
    loadFlights,
    loadReservas
  };
};
