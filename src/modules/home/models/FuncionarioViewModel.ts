import { useState, useEffect } from "react";

export interface Flight {
  id: string;
  data: Date;
  origem: string;
  destino: string;
}

export const FuncionarioViewModel = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const loadFlights = () => {
    setLoading(true);
    // SUBSTITUIR ISSO POR UMA API!!!!!!!!!! SO P APARECER ALGUMA COISA POR AGORA
    setTimeout(() => {
      const now = new Date();
      const simulatedFlights: Flight[] = [
        {
          id: "1",
          data: new Date(now.getTime() + 2 * 60 * 60 * 1000), 
          origem: "CWB",
          destino: "GRU",
        },
        {
          id: "2",
          data: new Date(now.getTime() + 10 * 60 * 60 * 1000), 
          origem: "GRU",
          destino: "CNF",
        },
        {
          id: "3",
          data: new Date(now.getTime() + 47 * 60 * 60 * 1000), 
          origem: "GIG",
          destino: "SSA",
        },
      ];
      const sortedFlights = simulatedFlights.sort(
        (a, b) => a.data.getTime() - b.data.getTime()
      );
      setFlights(sortedFlights);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    loadFlights();
  }, []);

 
  return { flights, loading, error, loadFlights };
};
