import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Alert,
  Modal,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const style = {
  backgroundColor: "#C8D8E6", 
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  border: "2px solid #567C8D",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const Register = () => {
  const [formData, setFormData] = useState({
    cpf: "",
    nome: "",
    email: "",
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    cidade: "",
    estado: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCEP = async () => {
    if (formData.cep.length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${formData.cep}/json/`
        );
        const data = await response.json();
        setFormData((prev) => ({
          ...prev,
          rua: data.logradouro,
          cidade: data.localidade,
          estado: data.uf,
        }));
      } catch {
        setError("Erro ao buscar o CEP.");
      }
    }
  };

  const generatePassword = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const generatedPassword = generatePassword();
      // Simulação do envio de e-mail com a senha:
      console.log(`Senha gerada: ${generatedPassword}`);
      console.log(
        `E-mail enviado para ${formData.email} com a senha ${generatedPassword}.`
      );
      setSuccess("Cadastro realizado e senha enviada por e-mail!");
    } catch {
      setError("Ocorreu um erro ao realizar o cadastro.");
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
            Cadastro
          </Typography>
          <form onSubmit={handleRegister}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="CPF"
                  variant="outlined"
                  type="text"
                  name="cpf"
                  onChange={handleChange}
                  required
                  sx={{ bgcolor: "white" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Nome"
                  variant="outlined"
                  type="text"
                  name="nome"
                  onChange={handleChange}
                  required
                  sx={{ bgcolor: "white" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="E-mail"
                  variant="outlined"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  required
                  sx={{ bgcolor: "white" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="CEP"
                  variant="outlined"
                  type="text"
                  name="cep"
                  onBlur={handleCEP}
                  onChange={handleChange}
                  required
                  sx={{ bgcolor: "white" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Rua"
                  variant="outlined"
                  type="text"
                  name="rua"
                  value={formData.rua}
                  disabled
                  required
                  sx={{ bgcolor: "white" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Número"
                  variant="outlined"
                  type="text"
                  name="numero"
                  onChange={handleChange}
                  required
                  sx={{ bgcolor: "white" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Complemento"
                  variant="outlined"
                  type="text"
                  name="complemento"
                  onChange={handleChange}
                  sx={{ bgcolor: "white" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Cidade"
                  variant="outlined"
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  disabled
                  required
                  sx={{ bgcolor: "white" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Estado"
                  variant="outlined"
                  type="text"
                  name="estado"
                  value={formData.estado}
                  disabled
                  required
                  sx={{ bgcolor: "white" }}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#567C8D",
                color: "white",
                mt: 2,
                "&:hover": { bgcolor: "#2F4156" },
              }}
            >
              Cadastrar
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={handleBack}
              sx={{
                mt: 2,
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
          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {success}
            </Alert>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Register;
