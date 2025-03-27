import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  Alert,
} from "@mui/material";

const style = {
  backgroundColor: "#C8D8E6", 
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid #567C8D",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (1 === 1) {
        console.log("iiiiiirra temos q arrumar aq");
        // navigate("/home");
      } else {
        setError("Credenciais inválidas");
      }
    } catch {
      setError("Ocorreu um erro ao tentar fazer login");
    }
  };

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <div
      style={{
        backgroundColor: "#C8D8E6", 
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Modal open={true} sx={{ overflow: "hidden" }}>
        <Box sx={style}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontFamily: "Montserrat", color: "#2F4156", mb: 2 }}
          >
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="E-mail"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2, bgcolor: "white" }}
            />
            <TextField
              fullWidth
              label="Senha"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2, bgcolor: "white" }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#567C8D",
                color: "white",
                mb: 2,
                "&:hover": { bgcolor: "#2F4156" },
              }}
            >
              Entrar
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={handleBack}
              sx={{
                bgcolor: "#567C8D",
                color: "white",
                "&:hover": { bgcolor: "#2F4156" },
              }}
            >
              Voltar
            </Button>
          </form>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Login;
