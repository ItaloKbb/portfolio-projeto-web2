import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';

// Função para armazenar o token nos cookies
export const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    // Define o token no cookie com expiração de 7 dias
    Cookies.set(TOKEN_KEY, token, { expires: 7, secure: true });
  }
};

// Função para armazenar o ID do usuário nos cookies
export const setIdUser = (id: string): void => {
  if (typeof window !== 'undefined') {
    // Define o ID do usuário no cookie com expiração de 7 dias
    Cookies.set("USERID", id, { expires: 7, secure: true });
  }
};

// Função para recuperar o ID do usuário dos cookies
export const getIdUser = (): string | null => {
  if (typeof window !== 'undefined') {
    return Cookies.get("USERID") || null; // Obtém o ID do usuário dos cookies
  }
  return null;
};

// Função para recuperar o token dos cookies
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return Cookies.get(TOKEN_KEY) || null; // Obtém o token dos cookies
  }
  return null;
};

// Função para remover o token dos cookies
export const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    Cookies.remove(TOKEN_KEY); // Remove o token dos cookies
  }
};