export const viacepService = {
    async buscarEndereco(cep: string) {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
  
      if (data.erro) throw new Error('CEP não encontrado');
  
      return {
        logradouro: data.logradouro,
        numero: '', 
        complemento: data.complemento,
        localidade: data.localidade,
        uf: data.uf,
      };
    },
  };
  