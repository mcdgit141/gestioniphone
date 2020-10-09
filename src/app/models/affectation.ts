import { Collaborateur } from './collaborateur';
import { Iphone } from './iphone';

export interface Affectation {
    numeroaffectation:string;
    dateaffectation:Date;
    daterenouvellement:Date;
    datefin:Date;
    commentaire:string;
    motiffin:string;
    collaborateur:Collaborateur;
    iphone:Iphone;
       
}