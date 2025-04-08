import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { authService } from '../../modules/auth/services/authService';
import { AuthUser } from '../../modules/auth/models/AuthTypes';



interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean; // Adicione isso;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
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

  const login = (userData: AuthUser, token: string) => {
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