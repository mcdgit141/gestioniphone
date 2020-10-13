import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor() {

    }

    handleError(error): void {
        console.log("Je suis dans Global Error Handler : ", error);

        
        if (error.status == undefined) {
            console.log(error.status);
            console.log("je suis dans la gestion d'erreur Front", error); 
        } else {
            console.log(error.status);
            console.log("erreur Http géré par l'intercepteur");
        }
        
    }
    
    

}
