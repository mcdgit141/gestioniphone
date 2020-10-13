import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { error } from 'protractor';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class HttperrInterceptor implements HttpInterceptor {

  constructor(private route:Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("je suis dans l'interceptor httpErr");
    return next.handle(request).pipe(
      
      catchError((error) => {
        console.log("status : ", error.status);
        console.log("ERROR :", error);
        console.error(error);
      
        // return next.handle(request)
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 0:
                alert("Serveur non disponible : Rééssayer ultérieurement");
                console.error(error)
            break;
            case 400:
              alert("Informations incorrectes transmises dans la requête");
              console.error(error)
              break;
            case 401:
              alert("erreur d'authentification, merci de vous authentifier à nouveau");
              this.route.navigate(["/login"]);
              console.error(error)
              break;
            case 403:
              alert(error.error.message);
              console.error(error)
              break;
            case 404:
              alert("La ressource demandé n'a pas été trouvé");
              console.error(error)
              break;
            case 409:
               alert("Action impossible, car déjà réalisé");
               console.error(error)
               break;
            case 500:
              alert("Erreur serveur : Rééssayez ultérieurement");
              console.error(error)
              break;
            default:
              alert("Erreur serveur : Rééssayez ultérieurement");
              break;
          }
        } else {
          console.log("erreur autre que HttpErrorResponse");
        }
          return next.handle(request);    
      })
    )
  }
}
