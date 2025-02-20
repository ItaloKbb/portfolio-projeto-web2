"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { getToken, removeToken, setToken, setIdUser } from "../lib/auth";

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
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = async (email: string, senha: string) => {
    const token = getToken();

    const response = await fetch("http://localhost:1010/api/users/login/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();
    if (response.ok) {
      removeToken();
      setToken(data.token);
      setIdUser(data.userId);
      setUser({ token: data.token });
      navigate("/projetos");
    } else {
      console.log("Falha ao realizar login: " + data.error.status)
      console.log(data); // Debug: verifique o que a API realmente retorna
      console.log(data.error.message);
      throw new Error(data.error.message || "Erro ao fazer login");
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
    navigate("/login");
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
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
