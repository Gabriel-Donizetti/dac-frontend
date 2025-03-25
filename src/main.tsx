import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { HomeView } from './modules/home'
import { ClienteRoutes, AuthProvider } from './modules/cliente'

// Criação do router principal
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />
  },
  {
    path: "/cliente/*", // Note o /* para permitir sub-rotas
    element: (
      <AuthProvider> {/* Envolve as rotas do cliente com o provedor de autenticação */}
        <ClienteRoutes />
      </AuthProvider>
    )
  }
])

// Renderização da aplicação
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)