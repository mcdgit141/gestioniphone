import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';
import { environment } from '../../../environments/environment';
import { LoaderService } from '../loader.service';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private _location:Location

  constructor(private loginService:LoginService, private loaderService:LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.showLoader();
    let clonedRequest=request
    
    if (request.url.includes(environment.API_URL)) {
      clonedRequest = request.clone(
        {
        headers : request.headers.set('Authorization', 'Bearer '+ this.loginService.getToken()
        )}
      )
    }
    
    return next.handle(clonedRequest).pipe(
      tap(
        (event:HttpEvent<any>) => {
          if (event instanceof HttpResponse || event instanceof HttpErrorResponse) {
            this.loaderService.hideLoader();


          }
        }
      )
    );
  }
}
