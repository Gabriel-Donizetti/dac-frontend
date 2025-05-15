// shared/components/PrivateRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  allowedRoles: ('client' | 'employee')[];
}

export const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>; // Ou um spinner
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  console.log(isAuthenticated)
  if (user && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  return <Outlet />; // Alterado de children para Outlet
};