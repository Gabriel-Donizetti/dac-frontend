import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { authService } from '../../modules/auth/services/authService';

interface User {
  id: string;
  email: string;
  nome: string; // Adicionado
  role: 'client' | 'employee';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean; // Adicione isso;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch {
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false); // Sempre define como false quando termina
      }
    };

    initializeAuth();
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading, // Adicione isso
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};