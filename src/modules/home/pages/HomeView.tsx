import { AppBar, Toolbar, Button, Container, Typography, Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const HomeView = () => {
  return (
    <Box sx={{
      color: "background",
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
    }}>
      <AppBar position="static" color="secondary">
        <Toolbar sx={{ gap: 2, justifyContent: "flex-start" }}>
          <IconButton href="/" edge="start" >
            ✈️
          </IconButton>
          <Button component={Link} to="/register" variant="contained" sx={{ width: 200 }} >
              Cadastro
          </Button>
          <Button component={Link} to="/login" variant="contained" sx={{ width: 200 }}>
              Login
          </Button>
          <Button component={Link} to="/about" variant="contained" sx={{ width: 200 }}>
              Sobre o App
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ textAlign: "center", flexGrow: 1, py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bem-vindo ao nosso site de passagens aéreas!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Escolha sua próxima viagem e decole conosco.
        </Typography>
        <Typography variant="h1">✈️</Typography>
      </Container>

      <Box component="footer" textAlign={"center"}>
        <Typography variant="body2">&copy; 2025 Empresa Aérea DAC®</Typography>
      </Box>
    </Box>
  );
};

export default HomeView;
