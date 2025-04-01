import { Box, Typography, Paper, Button, TextField, Alert } from '@mui/material';
import { LoginForm } from '../components/LoginForm';
import { useLoginViewModel } from '../view-models/useLoginViewModel';
import { useNavigate } from 'react-router-dom';

const paperStyle = {
  backgroundColor: "#C8D8E6",
  width: 400,
  border: "2px solid #567C8D",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const buttonStyle = {
  bgcolor: "#567C8D",
  color: "white",
  mb: 2,
  "&:hover": { bgcolor: "#2F4156" },
};

export function LoginView() {
  const { error, loading, handleLogin } = useLoginViewModel();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{
      backgroundColor: "#C8D8E6",
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Paper elevation={3} sx={paperStyle}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontFamily: "Montserrat", color: "#2F4156", mb: 2 }}
          align="center"
        >
          Login
        </Typography>
        
        <LoginForm 
          onSubmit={handleLogin}
          error={error}
          loading={loading}
        />
        
        <Button
          fullWidth
          variant="contained"
          onClick={handleBack}
          sx={buttonStyle}
        >
          Voltar
        </Button>
      </Paper>
    </Box>
  );
}