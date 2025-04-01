import { Reserva } from '../models/ReservaTypes';

interface Props {
  reservas: Reserva[];
  saldoMilhas?: number;
  onVerDetalhes: (id: string) => void;
  onCancelar: (id: string) => void;
}
export function TabelaReservas({
  reservas,
  saldoMilhas,
  onVerDetalhes,
  onCancelar
}: Props) {
  const formatarData = (dataISO: string) => {
    return new Date(dataISO).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="tabela-reservas-container">
      {saldoMilhas !== undefined && (
        <div className="saldo-milhas">
          <strong>Saldo de Milhas:</strong> {saldoMilhas.toLocaleString()}
        </div>
      )}

      <div className="tabela-wrapper">
        <table className="tabela-reservas">
          <thead>
            <tr>
              <th>Código</th>
              <th>Data/Hora</th>
              <th>Origem</th>
              <th>Destino</th>
              <th>Estado</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {reservas.length > 0 ? (
              reservas.map(reserva => (
                <tr key={reserva.id}>
                  <td>{reserva.codigo}</td>
                  <td>{formatarData(reserva.dataHora)}</td>
                  <td>{reserva.origem}</td>
                  <td>{reserva.destino}</td>
                  <td>
                    <span className={`status-badge ${reserva.estado}`}>
                      {reserva.estado}
                    </span>
                  </td>
                  <td className="acoes">
                    <button
                      className="btn-ver"
                      onClick={() => onVerDetalhes(reserva.id)}
                    >
                      Ver
                    </button>
                    {reserva.estado === 'reservada' && (
                      <button
                        className="btn-cancelar"
                        onClick={() => onCancelar(reserva.id)}
                      >
                        Cancelar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="sem-registros">
                  Nenhuma reserva encontrada
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}