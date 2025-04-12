import { useState } from "react";

export interface Transaction {
  data: Date;
  codigoReserva: string; 
  valor: number;
  milhas: number;
  descricao: string;
  tipo: string; 
}

export const useMilhas = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const buyMiles = (valor: number) => {
    const milhas = valor / 5; 
    const newTransaction: Transaction = {
      data: new Date(),
      codigoReserva: "",
      valor,
      milhas,
      descricao: "COMPRA DE MILHAS",
      tipo: "ENTRADA",
    };
    setTransactions((prev) => [...prev, newTransaction]);
  };

  return { transactions, buyMiles };
};
