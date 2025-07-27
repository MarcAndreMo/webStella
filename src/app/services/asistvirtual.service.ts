import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicios } from '../models/servicios';

@Injectable({
  providedIn: 'root'
})
export class AsistvirtualService {

  private apiUrl = 'http://localhost:5000/asistvirtual';

  constructor(private http: HttpClient) { }

  // Obtener todos los servicios
getServicioPorId(id: string): Observable<Servicios> {
  return this.http.get<Servicios>(`${this.apiUrl}/servicios/${id}`);
}

//actualizar servicio
putServicioporId(id:String, data: Partial<Servicios>): Observable<Servicios> {
  return this.http.put<Servicios>(`${this.apiUrl}/servicios/${id}/update`, data);
}
}
