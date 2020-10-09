import { Site } from './site';
import { Uo } from './uo';

export interface Collaborateur {
    uid:string;
    nom:string;
    prenom:string;
    numeroLigne:string;
    uo:Uo;
    
    
}