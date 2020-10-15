import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private http:HttpClient) { }

  journaliserError(monErreur){
    this.http.post(environment.API_URL+"/logging/log",monErreur).subscribe()
  }
}
