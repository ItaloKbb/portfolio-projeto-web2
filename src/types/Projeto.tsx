export interface Usuario {
    id: number;
    email: string;
    nome: string;
    bio: string;
    role: string;
    emprego: string;
    area: string;
    nacionalidade: string;
  }
  
  export interface PalavraChave {
    id: number;
    texto: string;
  }
  
  export interface Projeto {
    id: number;
    nome: string;
    resumo: string;
    link_externo: string;
    users: Usuario[];
    palavras_chave: PalavraChave[];
  }
  