import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, retry, tap } from 'rxjs/operators';
import { error } from 'protractor';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class HttperrInterceptor implements HttpInterceptor {
  
  constructor(private route:Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      
      catchError(
        (error) => {    
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 0:
                alert("Serveur non disponible : Rééssayer ultérieurement");
             
            break;
            case 400:
              // alert("Informations incorrectes transmises dans la requête");
              alert(error.error.message);
              
              break;
            case 401:
              alert("erreur d'authentification, merci de vous authentifier à nouveau");
              this.route.navigate(["/login"]);
              
              break;
            case 403:
              alert(error.error.message);
              break;
            case 404:
              alert(error.error.message);
              
              break;
            case 409:
               alert(error.error.message);
               
               break;
            case 500:
              alert("Erreur serveur : Rééssayez ultérieurement");
             
              break;
            default:
              alert("Erreur serveur : Rééssayez ultérieurement");
              break;
          }
        }
          return throwError(error);    
      })
    )
  }
}
