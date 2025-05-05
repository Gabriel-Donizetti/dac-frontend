// modules/funcionarios/routes/FuncionarioRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../../shared/contexts/AuthContext';
import FuncionarioCRUDView from '../pages/FuncionarioCRUDView';
import FuncionarioView from '../pages/FuncionarioView';
import FuncionarioLayout from '../../../shared/components/Layout';

import VooFormView from '../pages/VooFormView';
import VooPageView from '../pages/VooPageView';

export function FuncionarioRoutes() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || user?.role !== 'employee') {
    console.log("Acesso negado:", isAuthenticated, user?.role);
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route element={<FuncionarioLayout role="funcionario" />}>
        <Route index element={<Navigate to="initial-page" replace />} />
        <Route path="initial-page" element={<FuncionarioView />} />
        <Route path="crud" element={<FuncionarioCRUDView />} />
        <Route path="voos" element={<VooPageView />} />
        <Route path="cadastro-voo" element={<VooFormView />} />
        <Route path="*" element={<Navigate to="/funcionario/initial-page" replace />} />
      </Route>
    </Routes>
  );
}
