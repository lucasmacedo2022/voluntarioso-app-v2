import { ONGVoluntario } from './ONGVoluntario';
import { Voluntario } from './Voluntario';

export interface ONG {
    id: number;
    name: string;
    email: string;
    cnpj: string;
    category: string;
    ongVolunteers: ONGVoluntario[];
    volunteers: Voluntario[];
    mission: string;
    actions: string;
    cause: string;
}
