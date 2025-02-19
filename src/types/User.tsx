interface Conhecimento {
    titulo: string;
    nivel: number;
}

interface Projetos {
    id: number;
    nome: string;
    resumo: string;
    link_externo: string;
}

export interface User {
    id: number;
    nome: string;
    bio: string;
    email: string;
    emprego: string;
    area: string;
    nacionalidade: string;
    conhecimentos: Conhecimento[];
    projetos: Projetos[];
}