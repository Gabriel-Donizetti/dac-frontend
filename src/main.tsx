import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './shared/contexts/AuthContext';
import { PrivateRoute } from './shared/components/PrivateRoute';
import { HomeView } from './modules/home';
import { LoginView } from './modules/auth/pages/LoginView';
import { ClienteRoutes } from './modules/cliente';
import { ThemeProvider } from '@mui/material/styles';
import { Theme } from './Theme';
import { FuncionarioRoutes } from './modules/funcionario/routes/FuncionarioRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeView />
  },
  {
    path: '/login',
    element: <LoginView />
  },

  {
    path: '/funcionario',
    element: <PrivateRoute allowedRoles={['employee']} />,
    children: [
      {
      path: '*', // Captura todas as sub-rotas
          element: <FuncionarioRoutes />
      }
    ]

  },
  
  {
    path: '/cliente',
    element: <PrivateRoute allowedRoles={['client']} />, // Sem children
    children: [
      {
        path: '*', // Captura todas as sub-rotas
        element: <ClienteRoutes />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider theme={Theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);