import { useState, useEffect } from "react";
import { Voo } from "../models/VooTypes"; 
import { voosMock } from "../../cliente/mocks/voosMock";

export const FuncionarioViewModel = () => {
  const [flights, setFlights] = useState<Voo[]>([]);
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

  useEffect(() => {
    initializeFlights();  
    loadFlights();        
  }, []);

  return { flights, loading, error, loadFlights };
};
