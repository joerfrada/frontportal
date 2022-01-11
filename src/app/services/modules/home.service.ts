import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiHome = this.api.getBaseUrl + "index";
  constructor(private http: HttpClient, private api: ApiService) { }

  public home(data: any): Observable<any> {
    return this.http.post<Usuario>(this.apiHome, JSON.stringify(data), this.api.getHttpOptions())
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
