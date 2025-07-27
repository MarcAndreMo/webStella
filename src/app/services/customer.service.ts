import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agenda } from '../models/agenda';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  private apiUrl = 'http://localhost:5000/agenda';

  
  constructor( private http: HttpClient) { 

    
  }

  //obtener la agenda
  getAgenda(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  //ingresar
  addAgenda(telefono: string, fecha: Date, hora: string): Observable<any>{
    return this.http.post(`${this.apiUrl}/create`,{telefono,fecha,hora});
  }

  //agenda por id
  getAgendaID(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  //actualizar
  updateAgenda(id: string, agenda:Agenda): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/update/${id}`, agenda);

  }
  
  //eliminar
  deleteAgenda(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
