import { useAuth } from "../../../shared/contexts/AuthContext";
export const useCliente = () => {
  const { user, isAuthenticated, updateUser } = useAuth();

  if (!isAuthenticated || !user || user.role !== 'client') {
    throw new Error('useCliente só pode ser usado quando o usuário logado é um cliente.');
  }

  const updateClientData = (data: Partial<typeof user>) => {
    updateUser(data);
  };

  return {
    cliente: user,
    updateClientData,
  };
};
