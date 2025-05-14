import { useState, useEffect } from "react";

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

  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  const getSaldoMilhas = () => {
    return transactions.reduce((total, t) => {
      return t.tipo === "ENTRADA" ? total + t.milhas : total - t.milhas;
    }, 0);
  };

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

    setTransactions((prev) => {
      const updatedTransactions = [...prev, newTransaction];
      localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
      return updatedTransactions;
    });
  };

  return { transactions, buyMiles, getSaldoMilhas };
};

