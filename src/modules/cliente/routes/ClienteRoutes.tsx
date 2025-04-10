// modules/cliente/routes/ClienteRoutes.tsx
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ClienteHeader } from '../components/ClienteHeader';
import PerfilView from '../pages/PerfilView';
import ReservaDetalheView from '../pages/ReservaDetalheView';
import MeuPerfilView from '../pages/MeuPerfilView';
import { useAuth } from '../../../shared/contexts/AuthContext';
import { BuscaVoosView } from '../pages/BuscaVoosView';
import { ConfirmarReservaView } from '../pages/ConfirmarReservaView';
import ConsultarExtratoView from '../pages/ConsultarExtratoView';
function ProtectedLayout() {
  return (
    <>
      <ClienteHeader />
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </>
  );
}

export function ClienteRoutes() {
  const { isAuthenticated, user } = useAuth();

  // Redireciona imediatamente se não estiver autenticado ou não for cliente
  if (!isAuthenticated || user?.role !== 'client') {
    console.log(isAuthenticated, user?.role)
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route element={<ProtectedLayout />}>
        <Route index element={<Navigate to="perfil" replace />} />
        <Route path="reservas/:reservaId" element={<ReservaDetalheView />} />
        <Route path="meu-perfil" element={<MeuPerfilView />} />
        <Route path="reservar">
          <Route index element={<BuscaVoosView />} />
          <Route path="confirmar/:vooId" element={<ConfirmarReservaView />} />
        </Route>
        <Route path="initial-page" element={<PerfilView />} />
        <Route path="consulta-extrato" element={<ConsultarExtratoView />} />
        <Route path="*" element={<Navigate to="/cliente/initial-page" replace />} />
      </Route>
    </Routes>
  );
}