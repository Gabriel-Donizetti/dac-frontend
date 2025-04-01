// modules/cliente/routes/ClienteRoutes.tsx
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../shared/contexts/AuthContext';
import { ClienteHeader } from '../components/ClienteHeader';
import DashboardClienteView from '../pages/ReservaDetalheView';
import PerfilView from '../pages/PerfilView';
import ReservaDetalheView from '../pages/ReservaDetalheView';

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
        <Route path="dashboard" element={<DashboardClienteView />} />
        <Route path="reservas/:reservaId" element={<ReservaDetalheView />} />
        <Route path="perfil" element={<PerfilView />} />
        <Route path="*" element={<Navigate to="/cliente/perfil" replace />} />
      </Route>
    </Routes>
  );
}