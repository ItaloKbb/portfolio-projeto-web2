import { Conhecimento } from "./Conhecimento";

export interface UserConhecimentos {
    id: number;
    nivel: number;
    conhecimentoId: number;
    conhecimento: Conhecimento;
}