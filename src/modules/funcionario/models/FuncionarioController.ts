import { useState } from 'react';

export interface Employee {
  id: string;
  name: string;
  cpf: string;
  email: string;
  telephone: string;
  active: boolean;
  password: string;
}

/**
 * Simula o envio de e-mail com a senha.
 * Em um sistema real, aqui você invocaria um serviço de e-mail.
 */
const sendPasswordEmail = (email: string, password: string) => {
  console.log(`Enviando e-mail para ${email} com a senha: ${password}`);
};

/**
 * Gera um número aleatório de 4 dígitos em formato de string.
 */
const generateRandomPassword = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export function FuncionarioController() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  /**
   * Insere um novo funcionário.
   * Gera um ID (aqui usando Date.now para simplificar),
   * define o status ativo, gera uma senha aleatória e envia essa senha por e-mail.
   */
  const createEmployee = (
    employeeData: Omit<Employee, 'id' | 'active' | 'password'>
  ): Employee => {
    const newEmployee: Employee = {
      id: Date.now().toString(),
      ...employeeData,
      active: true,
      password: generateRandomPassword(),
    };

    setEmployees((prev) => [...prev, newEmployee]);
    sendPasswordEmail(newEmployee.email, newEmployee.password);
    return newEmployee;
  };

  /**
   * Atualiza dados de um funcionário, exceto os campos CPF, id e password.
   */
  const updateEmployee = (
    id: string,
    updatedData: Partial<Omit<Employee, 'cpf' | 'id' | 'password'>>
  ) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, ...updatedData } : emp))
    );
  };

  /**
   * "Remove" um funcionário, marcando-o como inativo.
   */
  const removeEmployee = (id: string) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, active: false } : emp))
    );
  };

  return { employees, createEmployee, updateEmployee, removeEmployee };
}
