// modules/cliente/routes/ClienteRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../../shared/contexts/AuthContext';
import VooPageView from '../pages/VooPageView';
import VooFormView from '../pages/VooFormView';

export function VooRoutes() {
  // const { isAuthenticated, user } = useAuth();

  // Redireciona imediatamente se não estiver autenticado ou não for funcionario
  // if (!isAuthenticated || user?.role !== 'employee') {
  //   console.log(isAuthenticated, user?.role)
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <Routes>
      <Route path="/">
        <Route index element={<Navigate to="initial-page" replace />} />
        <Route path="voos" element={<VooPageView />} />
        <Route path="cadastro-voo" element={<VooFormView />} />
        <Route path="*" element={<Navigate to="/voo/initial-page" replace />} />
      </Route>
    </Routes>
  );  
}