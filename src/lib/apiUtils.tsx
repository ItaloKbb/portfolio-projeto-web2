import { getToken } from './auth';
import ConfigManager from "./ConfigManager";

const config = ConfigManager.getInstance();

// Definindo tipos para os parâmetros da função
interface QueryParams {
  [key: string]: string | number | boolean;
}

export const getDataApi = async  (
  rota: string,
  parametro: string = '',
  query?: QueryParams
): Promise<any> => {
  try {
    // Monta a URL base com rota e parâmetro
    let endpoint = `${config.url_api}${rota}${parametro}`;

    if (query) {
      // Convert query object to URLSearchParams
      const queryParams = new URLSearchParams(query as Record<string, string>);
      const queryString = queryParams.toString();
    
      // Append query string only if it's not empty
      if (queryString) {
        endpoint += `?${queryString}`;
      }
    }

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao acessar API: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json(); // Armazena o resultado do JSON
    console.log('Dados retornado (endpoint: ' + endpoint + ')'); // Loga os dados
    console.log(data); // Loga os dados
    return data; // Retorna os dados em JSON
  } catch (error) {
    console.error('Erro na função getDataApi:', error);
    return { success: false, errorMessage: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
};