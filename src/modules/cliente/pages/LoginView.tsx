import { useLoginViewModel } from '../view-models/LoginViewModel';

function LoginView() {
  const {
    formValues,
    error,
    loading,
    handleInputChange,
    handleSubmit
  } = useLoginViewModel();

  return (
    <div className="login-container">
      <h1>Login do Cliente</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Senha:</label>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Carregando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

export default LoginView;