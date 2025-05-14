import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from '@mui/material';
import { FuncionarioController, Employee } from '../models/FuncionarioController';

const FuncionarioCRUDView: React.FC = () => {
  const { employees, createEmployee, updateEmployee, removeEmployee } = FuncionarioController();

  const [activeTab, setActiveTab] = useState<string>('list');

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    cpf: '',
    email: '',
    telephone: '',
  });

  const [updateId, setUpdateId] = useState('');
  const [updateData, setUpdateData] = useState({
    name: '',
    email: '',
    telephone: '',
  });

  const isValidName = (name: string): boolean => {
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/; 
    return nameRegex.test(name);
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    return phoneRegex.test(phone);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, cpf, email, telephone } = newEmployee;
    if (!name || !cpf || !email || !telephone) {
      alert('Preencha todos os campos para inserir um funcionário.');
      return;
    }

    if (!isValidName(name)) {
      alert('O nome deve conter apenas letras e espaços.');
      return;
    }
    if (!isValidEmail(email)) {
      alert('Email inválido.');
      return;
    }
    if (!isValidPhone(telephone)) {
      alert('Telefone inválido. Somente dígitos, espaços, hifens, parênteses e + são permitidos.');
      return;
    }

    const cpfExists = employees.some(emp => emp.cpf === cpf);
    if (cpfExists) {
      alert('CPF já cadastrado. Informe um CPF único.');
      return;
    }

    createEmployee(newEmployee);
    setNewEmployee({ name: '', cpf: '', email: '', telephone: '' });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateId) {
      alert('Informe o ID do funcionário a ser alterado.');
      return;
    }
    if (updateData.name && !isValidName(updateData.name)) {
      alert('O nome deve conter apenas letras e espaços.');
      return;
    }
    if (updateData.email && !isValidEmail(updateData.email)) {
      alert('Email inválido.');
      return;
    }
    if (updateData.telephone && !isValidPhone(updateData.telephone)) {
      alert('Telefone inválido. Somente dígitos, espaços, hifens, parênteses e + são permitidos.');
      return;
    }
    
    updateEmployee(updateId, updateData);
    setUpdateId('');
    setUpdateData({ name: '', email: '', telephone: '' });
  };

  return (
    <>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Página do Funcionário</Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Button variant="contained" color="secondary" onClick={() => setActiveTab('create')}>
            Inserir Funcionário
          </Button>
          <Button variant="contained" color="secondary" onClick={() => setActiveTab('update')}>
            Alterar Funcionário
          </Button>
          <Button variant="contained" color="secondary" onClick={() => setActiveTab('list')}>
            Lista de Funcionários
          </Button>
        </Box>

        {activeTab === 'create' && (
          <Box component="form" onSubmit={handleCreate} sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Inserir Funcionário</Typography>
            <TextField
              label="Nome"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="CPF"
              value={newEmployee.cpf}
              onChange={(e) => setNewEmployee({ ...newEmployee, cpf: e.target.value })}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              value={newEmployee.email}
              onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Telefone"
              value={newEmployee.telephone}
              onChange={(e) => setNewEmployee({ ...newEmployee, telephone: e.target.value })}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button variant="contained" type="submit">Inserir Funcionário</Button>
          </Box>
        )}
        
        {activeTab === 'update' && (
          <Box component="form" onSubmit={handleUpdate} sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Alterar Funcionário</Typography>
            <TextField
              label="ID do Funcionário"
              value={updateId}
              onChange={(e) => setUpdateId(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Nome"
              value={updateData.name}
              onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              value={updateData.email}
              onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Telefone"
              value={updateData.telephone}
              onChange={(e) => setUpdateData({ ...updateData, telephone: e.target.value })}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button variant="contained" type="submit">Alterar Funcionário</Button>
          </Box>
        )}
        
        {activeTab === 'list' && (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>Lista de Funcionários</Typography>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>CPF</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Telefone</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((emp: Employee) => (
                    <TableRow key={emp.id}>
                      <TableCell>{emp.id}</TableCell>
                      <TableCell>{emp.name}</TableCell>
                      <TableCell>{emp.cpf}</TableCell>
                      <TableCell>{emp.email}</TableCell>
                      <TableCell>{emp.telephone}</TableCell>
                      <TableCell>{emp.active ? 'Ativo' : 'Inativo'}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => removeEmployee(emp.id)}
                        >
                          Remover
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </>
        )}
      </Box>
    </>
  );
};

export default FuncionarioCRUDView;
