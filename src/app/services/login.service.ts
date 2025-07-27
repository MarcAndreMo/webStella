import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private apiUrl = 'http://localhost:5000/login';

  constructor( private http: HttpClient) { }

  login(name: string, price: number): Observable<any> {
    return this.http.post(this.apiUrl, { name, price });
  }
}
