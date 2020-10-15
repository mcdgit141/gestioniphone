import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { AnyNsRecord } from 'dns';
import { LoggerService } from '../logger.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private loggerService:LoggerService) {

    }

    handleError(error): void {
        if (Object.getOwnPropertyNames(error).includes('rejection')) {
            window.location.reload();
            if (error.rejection.status != 401 && error.rejection.status != 403) {
                let monErreur = {
                    erreur: error.rejection.error,
                    url: error.rejection.url
                }
                this.loggerService.journaliserError(monErreur);
            }
        }

    }
    
    

}
