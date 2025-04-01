import { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { LoginFormData } from '../models/AuthTypes';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  error?: string;
  loading: boolean;
}

const textFieldStyle = {
    mb: 2,
    bgcolor: "white"
  };
  
  const buttonStyle = {
    bgcolor: "#567C8D",
    color: "white",
    mb: 2,
    "&:hover": { bgcolor: "#2F4156" },
  };

export function LoginForm({ onSubmit, error, loading }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="E-mail"
        variant="outlined"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        sx={textFieldStyle}
      />
      
      <TextField
        fullWidth
        label="Senha"
        variant="outlined"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        sx={textFieldStyle}
      />
      
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      
      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={loading}
        sx={buttonStyle}
      >
        {loading ? 'Carregando...' : 'Entrar'}
      </Button>
    </Box>
  );
}