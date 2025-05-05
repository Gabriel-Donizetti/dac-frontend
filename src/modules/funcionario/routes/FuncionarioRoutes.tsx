import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../shared/contexts/AuthContext';
import FuncionarioCRUDView from '../pages/FuncionarioCRUDView';
import FuncionarioView from '../pages/FuncionarioView';


function ProtectedLayout() {
  return (
    <>
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </>
  );
}

export function FuncionarioRoutes() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || user?.role !== 'employee') {
    console.log("Acesso negado:", isAuthenticated, user?.role);
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route element={<ProtectedLayout />}>
        <Route index element={<Navigate to="initial-page" replace />} />
        <Route path="initial-page" element={<FuncionarioView />} />
        <Route path="crud" element={<FuncionarioCRUDView />} />
        <Route path="*" element={<Navigate to="/funcionario/initial-page" replace />} />
      </Route>
    </Routes>
  );
}