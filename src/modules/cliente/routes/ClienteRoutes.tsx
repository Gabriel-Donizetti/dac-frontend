// modules/cliente/routes/ClienteRoutes.tsx
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import PerfilView from '../pages/InitialPageView';
import ReservaDetalheView from '../pages/ReservaDetalheView';
import MeuPerfilView from '../pages/MeuPerfilView';
import { useAuth } from '../../../shared/contexts/AuthContext';
import { BuscaVoosView } from '../pages/BuscaVoosView';
import { ConfirmarReservaView } from '../pages/ConfirmarReservaView';
import MilhasView from '../pages/ClienteMilhas';
import ClienteLayout from '../../../shared/components/Layout';
// import ConsultarExtratoView from '../pages/ConsultarExtratoView';
import  ComprarMilhasView from '../pages/ClienteMilhas';
import CheckinView from '../pages/CheckinView';

export function ClienteRoutes() {
  const { isAuthenticated, user } = useAuth();

  // Redireciona imediatamente se não estiver autenticado ou não for cliente
  if (!isAuthenticated || user?.role !== 'client') {
    console.log(isAuthenticated, user?.role)
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<ClienteLayout role={user.role} />}>
        <Route index element={<Navigate to="initial-page" replace />} />
        <Route path="initial-page" element={<PerfilView />} />
        <Route path="reservas/:reservaId" element={<ReservaDetalheView />} />
        <Route path="meu-perfil" element={<MeuPerfilView />} />
        <Route path="reservar" element={<BuscaVoosView />} />
        <Route path="reservar/confirmar/:vooId" element={<ConfirmarReservaView />} />
        <Route path="milhas" element={<MilhasView />} />
        <Route path="reservar">
          <Route index element={<BuscaVoosView />} />
          <Route path="confirmar/:vooId" element={<ConfirmarReservaView />} />
        </Route>
        <Route path="initial-page" element={<PerfilView />} />
        {/* <Route path="consulta-extrato" element={<ConsultarExtratoView />} /> */}
        <Route path="comprarMilhas" element={<ComprarMilhasView />} />
        <Route path="checkin" element={<CheckinView />} />
        <Route path="*" element={<Navigate to="/cliente/initial-page" replace />} />
      </Route>
    </Routes>
  );
}