export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export async function fetchAddressByCep(cep: string): Promise<ViaCepResponse> {
  const cleanCep = cep.replace(/\D/g, "");

  const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);

  if (!response.ok) {
    throw new Error("Falha ao buscar o CEP.");
  }

  return response.json();
}