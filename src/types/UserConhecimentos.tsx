import { Conhecimentos } from "./Conhecimentos";

export interface UserConhecimentos {
    id: number;
    nivel: number;
    conhecimentos: Conhecimentos[];
}