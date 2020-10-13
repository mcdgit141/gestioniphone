import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { AnyNsRecord } from 'dns';
import { LoggerService } from '../logger.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private loggerService:LoggerService) {

    }

    handleError(error): void {

        if (error.rejection.status != 401 && error.rejection.status != 403) {
            let monErreur = {
                erreur: error.rejection.error,
                url: error.rejection.url
                //idealement ajouter le body de la requête qui a provoqué l'erreur, mais pour l'instant je ne trouve pas cette info dans error
            }
            this.loggerService.journaliserError(monErreur);
        }
        

        
    }
    
    

}
