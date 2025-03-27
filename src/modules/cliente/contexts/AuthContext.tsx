// cliente/contexts/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

interface User {
  id: string;
  nome: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean; // Adicione esta propriedade
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Calcula se o usuário está autenticado
  const isAuthenticated = !!user;

  const login = async (email: string, password: string) => {
    const userData = await authService.login(email, password);
    setUser(userData);
    navigate('/cliente/reservas');
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    navigate('/cliente/login');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated, // Disponibiliza o valor
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}