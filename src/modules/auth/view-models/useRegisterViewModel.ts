import { RegisterFormData } from '../models/AuthTypes';
import { clienteService } from '../../cliente/services/clienteService';
import { viacepService } from '../services/viacepService';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Cliente } from '../../cliente/models/ClienteTypes';
import { authService } from '../services/authService';

export function useRegisterViewModel() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (formData: RegisterFormData) => {
    setLoading(true);
    setError('');

    try {
      const endereco = await viacepService.buscarEndereco(formData.cep);
      console.log(endereco)

      const senha = await authService.generatePassword();

      authService.sendEmailPassword(senha)

      console.log(`Senha enviada para ${formData.email}: ${senha}`);
      const cliente: Cliente & { password: string } = {
        id: '',
        role: 'client',
        password: senha,
        cpf: formData.cpf,
        cep: formData.cep,
        endereco: endereco.logradouro,
        cidade: endereco.localidade,
        estado: endereco.uf,
        nome: formData.nome,
        email: formData.email,
        saldoMilhas: 0
      };

      await clienteService.cadastrar(cliente);
      //COLOCAR VERIFICAÇÃO DE SUCESSO DEPOIS DA VALIDAÇÃO DO BACKEND
      setSuccess(true);
      setSuccessMessage(`Cadastro realizado com sucesso! Sua senha é: ${senha} (também foi enviada para seu email). Redirecionando para login...`);

      //COLOCAR IF DEPOIS DO SUCESSO PARA NAVEGAÇÃO CORRETA
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro no cadastro');
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, success, successMessage, handleRegister };
}