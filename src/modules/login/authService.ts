const authService = {
    login: async (email: string, password: string) => {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) throw new Error("Login falhou");
      const data = await response.json();
      localStorage.setItem("token", data.access_token);
    },
  
    register: async (userData: any) => {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });
      if (!response.ok) throw new Error("Falha no cadastro");
    }
  };
  
  export default authService;
  