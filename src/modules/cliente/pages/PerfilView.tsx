import { usePerfilViewModel } from '../view-models/PerfilViewModel';

function PerfilView() {
  const { user, loading, error } = usePerfilViewModel();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!user) return <div>Usuário não encontrado</div>;

  return (
    <div>
      <h2>Meu Perfil</h2>
      <p>Nome: {user.nome}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default PerfilView;