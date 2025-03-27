import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ClienteHeader from '../components/ClienteHeader';

// Importações normais (substitua pelos seus caminhos corretos)
import LoginView from '../pages/LoginView';
import ReservaVooView from '../pages/ReservaVooView';
import MinhasReservasView from '../pages/MinhasReservasView';
import PerfilView from '../pages/PerfilView';

function ProtectedLayout() {
  return (
    <>
      <ClienteHeader />
      <Outlet />
    </>
  );
}

export default function ClienteRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/cliente/reservas" /> : <LoginView />
      } />

      <Route element={<ProtectedLayout />}>
        <Route path="/reservas" element={
          isAuthenticated ? <ReservaVooView /> : <Navigate to="/cliente/login" />
        } />

        <Route path="/minhas-reservas" element={
          isAuthenticated ? <MinhasReservasView /> : <Navigate to="/cliente/login" />
        } />

        <Route path="/perfil" element={
          isAuthenticated ? <PerfilView /> : <Navigate to="/cliente/login" />
        } />
      </Route>

      <Route path="/" element={
        <Navigate to={isAuthenticated ? "/cliente/reservas" : "/cliente/login"} />
      } />

      <Route path="/initial-page" element={
        <InitialPageView />
      } />
    </Routes>
  );
}