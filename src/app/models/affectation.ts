import { Collaborateur } from './collaborateur';
import { Iphone } from './iphone';

export interface Affectation {
    numeroAffectation:string;
    dateAffectation:Date;
    dateRenouvellementPrevue:Date;
    dateFin:Date;
    commentaire:string;
    motifFin:string;
    collaborateur:Collaborateur;
    iphone:Iphone;
       
}