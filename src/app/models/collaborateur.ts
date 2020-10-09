import { Site } from './site';
import { Uo } from './uo';

export interface Collaborateur {
    uid:string;
    nom:string;
    prenom:string;
    numeroligne:string;
    uo:Uo;
    site:Site;
    
}