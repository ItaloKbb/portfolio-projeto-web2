interface Palavras_chave {
    id: number;
    texto: string;
}

export interface Projeto {
    id: number;
    nome: string;
    resumo: string;
    link_externo: string;
    palavras_chave: Palavras_chave[];
}