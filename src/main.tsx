import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { HomeView } from './modules/home'
import { ClienteRoutes, AuthProvider } from './modules/cliente'
import Login from './modules/login/Login';
import Register from './modules/login/Register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/cliente/*", // Note o /* para permitir sub-rotas
    element: (
      <AuthProvider> 
        <ClienteRoutes />
      </AuthProvider>
    )
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
