import { useState, useEffect } from "react";
import { TextField, Button, Typography, Container, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { Voo } from "../models/VooTypes";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { vooService } from "../services/vooService";
import aeroportos from "../../auth/components/airport.json";

export default function VooFormView() {
    const [dataHora, setDataHora] = useState<string>("");
    const [origem, setOrigem] = useState<string>("");
    const [destino, setDestino] = useState<string>("");
    const [valorReais, setValorReais] = useState<string>("");
    const [poltronas, setPoltronas] = useState<string>("");
    const [codigoGerado, setCodigoGerado] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const dataAtual = new Date();
        const dataHoraFormatada = dataAtual.toISOString().slice(0, 16);
        setDataHora(dataHoraFormatada);
    }, []);

    const handleSubmit = async () => {
        const codigoVoo = "TADS" + Math.floor(Math.random() * 10000);
        const valorMilhas = Math.floor(parseFloat(valorReais) * 100);
        const poltronasOcupadas = 0;
        const status = "CONFIRMADO";

        const voo: Voo = {
            codigo: codigoVoo,
            dataHora,
            origem,
            destino,
            valorReais: parseFloat(valorReais),
            valorMilhas,
            poltronas: parseInt(poltronas),
            poltronasOcupadas,
            status,
        };

        await vooService.adicionar(voo);
        setCodigoGerado(codigoVoo);

        navigate("/funcionario/voos");

        setDataHora("");
        setOrigem("");
        setDestino("");
        setValorReais("");
        setPoltronas("");
    };

    return (
        <Container>
            <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={2}>
                <Button onClick={() => navigate("/funcionario/voos")} size="small" sx={{ color: 'primary.main', width: "fit-content", textTransform: "none" }}>
                    <ArrowBack />
                </Button>

                <Typography variant="h5" gutterBottom sx={{ flexGrow: 1, textAlign: "center" }}>
                    Novo Voo
                </Typography>
            </Box>

            <Container maxWidth="sm">
                <TextField
                    fullWidth
                    label="Data/Hora"
                    type="datetime-local"
                    value={dataHora}
                    onChange={(e) => setDataHora(e.target.value)}
                />

                <FormControl>
                    <InputLabel>Origem</InputLabel>
                    <Select
                        value={origem}
                        onChange={(e) => setOrigem(e.target.value)}
                        label="Origem"
                    >
                        {aeroportos.map((aeroporto) => (
                            <MenuItem key={aeroporto.codigoIATA} value={aeroporto.codigoIATA}>
                                {aeroporto.nome} ({aeroporto.codigoIATA})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel>Destino</InputLabel>
                    <Select
                        value={destino}
                        onChange={(e) => setDestino(e.target.value)}
                        label="Destino"
                    >
                        {aeroportos.map((aeroporto) => (
                            <MenuItem key={aeroporto.codigoIATA} value={aeroporto.codigoIATA}>
                                {aeroporto.nome} ({aeroporto.codigoIATA})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    label="Valor (R$)"
                    type="number"
                    value={valorReais}
                    onChange={(e) => setValorReais(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Poltronas"
                    type="number"
                    value={poltronas}
                    onChange={(e) => setPoltronas(e.target.value)}
                />

                <Box display="flex" justifyContent="center">
                    <Button variant="contained" fullWidth onClick={handleSubmit}>
                        Cadastrar
                    </Button>
                </Box>
            </Container>

            {codigoGerado && (
                <Box marginTop={2} textAlign="center">
                    <Typography variant="h6" color="primary">
                        Voo cadastrado com código: {codigoGerado}
                    </Typography>
                </Box>
            )}
        </Container>
    );
}
