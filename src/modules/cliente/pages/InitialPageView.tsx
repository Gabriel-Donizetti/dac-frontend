function InitialPageView() {
    const dataAtual = new Date().toLocaleString();
  
    return (
      <div className="container-fluid py-4 px-3 vh-100">
        <div className="row">
          <div className="col-md-5 pl-2 p-5">
            <div className="border p-3 rounded">
              <h5>Serviços</h5>
  
              <ul className="list-unstyled">
                <li className="mt-4 mb-2 mx-5"><button className="btn btn-lg rounded border">Comprar milhas</button></li>
                <li className="mt-4 mb-2 mx-5"><button className="btn btn-lg rounded border">Reservar voos</button></li>
                <li className="mt-4 mb-2 mx-5"><button className="btn btn-lg rounded border">Consultar reserva por código</button></li>
                <li className="mt-4 mb-2 mx-5"><button className="btn btn-lg rounded border">Fazer check-in</button></li>
              </ul>
            </div>
          </div>
  
          <div className="col-md-7 py-5">
            <div className="mb-5">
              <h3>Saldo em milhas</h3>
  
              <h2>12.900</h2>
            </div>
  
            <div className="mt-5">
              <h4>Voos e reservas</h4>
  
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="fs-7">Data/hora</th>
                    <th>Aeroporto origem</th>
                    <th>Aeroporto destino</th>
                    <th></th>
                  </tr>
                </thead>
  
                <tbody>
                  <tr>
                    <td>{dataAtual}</td>
                    <td>Aeroporto Internacional Afonso Pena</td>
                    <td>GRU - Aeroporto de Guarulhos</td>
                    <td className="d-flex gap-1">
                      <button className="btn btn-sm rounded border">Visualizar</button>
                      <button className="btn btn-sm rounded border">Cancelar</button>
                    </td>
                  </tr>
                  <tr>
                    <td>{dataAtual}</td>
                    <td>Aeroporto Internacional Afonso Pena</td>
                    <td>GRU - Aeroporto de Guarulhos</td>
                    <td className="d-flex gap-1">
                      <button className="btn btn-sm rounded border">Visualizar</button>
                      <button className="btn btn-sm rounded border">Cancelar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  
    );
  }
  
  export default InitialPageView;
  