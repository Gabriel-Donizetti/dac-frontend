import React, { useState } from "react";
import { Alert, Button } from "@mui/material";
import { useMilhas } from "../view-models/useClienteMilhasViewModel";

const ComprarMilhasView: React.FC = () => {
  const { transactions, buyMiles } = useMilhas();
  const [valor, setValor] = useState<string>("");
  const [purchaseMessage, setPurchaseMessage] = useState<string>("");
  const [showExtrato, setShowExtrato] = useState<boolean>(false);

  const handleCompra = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = parseFloat(valor);
    if (isNaN(value) || value <= 0) {
      alert("Digite um valor válido!");
      return;
    }
    buyMiles(value);
    setValor("");
    setPurchaseMessage("Compra de milhas realizada com sucesso!");
  };

  const handleConsultarExtrato = () => {
    setShowExtrato(!showExtrato);
  };

  return (
    <div className="comprar-milhas-container">
      <h1>Comprar Milhas</h1>
      <form onSubmit={handleCompra} className="compra-form">
        <input
          type="number"
          placeholder="Valor (R$)"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="input-valor"
        />
        <button type="submit" className="btn-comprar">
          Comprar
        </button>
        <Button
          variant="contained"
          onClick={handleConsultarExtrato}
          style={{
            marginLeft: "1rem",
            backgroundColor: "#567c8d",
            color: "white",
            height: "100%",
          }}
        >
          Consultar Extrato
        </Button>
      </form>

      {purchaseMessage && (
        <Alert severity="success" style={{ marginTop: "1rem" }}>
          {purchaseMessage}
        </Alert>
      )}

      {showExtrato && (
        <>
          <h2 style={{ marginTop: "2rem" }}>Extrato de Milhas</h2>
          <table className="extrato-table">
            <thead>
              <tr>
                <th>Data/Hora</th>
                <th>Código da Reserva</th>
                <th>Valor (R$)</th>
                <th>Milhas</th>
                <th>Descrição</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trans, idx) => (
                <tr key={idx}>
                  <td>{trans.data.toLocaleString()}</td>
                  <td>{trans.codigoReserva}</td>
                  <td>{trans.valor.toFixed(2)}</td>
                  <td>{trans.milhas.toFixed(2)}</td>
                  <td>{trans.descricao}</td>
                  <td>{trans.tipo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ComprarMilhasView;
