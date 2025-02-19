"use client";
import React, { createContext, useContext, useState } from 'react';

// Criação do contexto de carregamento
const LoadingContext = createContext();

// Provider para envolver a aplicação
export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

// Custom Hook para facilitar o uso do contexto em outros componentes
export const useLoading = () => {
    return useContext(LoadingContext);
};
