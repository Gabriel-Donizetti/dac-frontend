import { Container, Paper, TextField, Typography, Box } from "@mui/material";

const MeuPerfilView = () => {
    const dadosPerfil = {
        nome: "Fulano da Silva",
        cpf: "123.456.789-00",
        email: "cliente@example.com",
        senha: "****",
        cep: "12345-678",
        rua: "Rua Exemplo",
        numero: "100",
        complemento: "Apto 101",
        cidade: "Curitiba",
        estado: "PR",
    };

    return (
        <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingY: 4 }} >
            <Paper sx={{ padding: 4, width: "100%", maxWidth: 800 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Meu Perfil
                </Typography>

                <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={2}>
                    <TextField fullWidth label="Nome" value={dadosPerfil.nome} InputProps={{ readOnly: true }} />
                    <TextField fullWidth label="CPF" value={dadosPerfil.cpf} InputProps={{ readOnly: true }} />
                    <TextField fullWidth label="E-mail" value={dadosPerfil.email} InputProps={{ readOnly: true }} />
                    <TextField fullWidth label="Senha" value={dadosPerfil.senha} InputProps={{ readOnly: true }} />
                    <TextField fullWidth label="CEP" value={dadosPerfil.cep} InputProps={{ readOnly: true }} />
                    <TextField fullWidth label="Rua" value={dadosPerfil.rua} InputProps={{ readOnly: true }} />
                    <TextField fullWidth label="Número" value={dadosPerfil.numero} InputProps={{ readOnly: true }} />
                    <TextField fullWidth label="Complemento" value={dadosPerfil.complemento} InputProps={{ readOnly: true }} />
                    <TextField fullWidth label="Cidade" value={dadosPerfil.cidade} InputProps={{ readOnly: true }} />
                    <TextField fullWidth label="Estado" value={dadosPerfil.estado} InputProps={{ readOnly: true }} />
                </Box>
            </Paper>
        </Container>
    );
};

export default MeuPerfilView;
