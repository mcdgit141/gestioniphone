import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private loginService:LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let clonedRequest=request
    if (request.url.includes(environment.API_URL)) {
      clonedRequest=request.clone();
      clonedRequest.headers.set("Authorization","Bearer "+this.loginService.getToken());
    }
    
    return next.handle(clonedRequest);
  }
}
