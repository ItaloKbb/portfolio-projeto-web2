"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, removeToken, setToken, setIdUser } from '@/lib/auth';

// Definindo tipos
type User = {
  token: string;
} | null;

type AuthContextType = {
  user: User;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

// Criando o contexto com um valor padrão
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(null);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = async (email: string, senha: string) => {
    const token = getToken();

    const response = await fetch('http://localhost:1010/api/users/login/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // Adicione o token de autenticação
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();
    if (response.ok) {
      removeToken(); // Remove o token anterior, se houver
      setToken(data.token); // Armazena o novo token nos cookies
      setIdUser(data.userId);
      setUser({ token: data.token }); // Atualiza o estado do usuário
      router.push('/menu'); // Redireciona para a página de upload
    } else {
      throw new Error(data.error || 'Erro ao fazer login');
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};