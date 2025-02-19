"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Define a interface para o objeto de filtro
interface FilterObject {
  id?: number;
  nome?: string;
  email?: string;
}

// Define os tipos para o contexto
interface FilterContextType {
  filter: FilterObject;
  updateFilter: (data: FilterObject) => void;
}

// Cria o contexto com um valor padrão
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Provedor do contexto
export function FilterProvider({ children }: { children: ReactNode }) {
  // Inicializa o estado com um objeto vazio
  const [filter, setFilter] = useState<FilterObject>({});

  // Método para atualizar o filtro
  const updateFilter = (data: FilterObject) => {
    setFilter(data);
  };

  return (
    <FilterContext.Provider value={{ filter, updateFilter }}>
      {children}
    </FilterContext.Provider>
  );
}

// Hook personalizado para acessar o contexto
export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter deve ser usado dentro de um FilterProvider");
  }
  return context;
}